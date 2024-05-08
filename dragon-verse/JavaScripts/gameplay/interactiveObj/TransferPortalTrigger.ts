/**
 * @Author       : zewei.zhang
 * @Date         : 2024-04-30 15:33:15
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-04-30 15:33:17
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\gameplay\interactiveObj\TransferPortalTrigger.ts
 * @Description  : 中转传送门交互物
 */

import { GameConfig } from "../../config/GameConfig";
import GameServiceConfig from "../../const/GameServiceConfig";
import GlobalTips from "../../depend/global-tips/GlobalTips";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import Nolan from "../../depend/nolan/Nolan";
import i18n from "../../language/i18n";
import JumpGameTransition_Generate from "../../ui-generate/jumpGame/JumpGameTransition_generate";
import { ActivateByTrigger, ActivateMode, TriggerType } from "./ActiveMode";
import { PortalTriggerWithProgress } from "./PortalTriggerWithProgress";
import EnvironmentManager from "./EnvironmentManager";
import { EventDefine } from "../../const/EventDefine";
import UnifiedRoleController from "../../module/role/UnifiedRoleController";
import MainPanel from "../../ui/main/MainPanel";
import AreaManager from "../../depend/area/AreaManager";
import CowLevelPortalTrigger from "./CowLevelPortalTrigger";

enum Destination {
    anyCowLevel = 1,
    mainScene = 2,
    // TransferScene = 3,
}

export default class TransferPortalTrigger extends PortalTriggerWithProgress {
    @Property({
        displayName: "传送地点",
        group: "Config-Destination",
        enumType: {
            "任意奶牛关": Destination.anyCowLevel,
            "主场景": Destination.mainScene,
        },
    })
    public portalDestination: number = 2;

    @Property({
        displayName: "是否刷新玩家物体旋转",
        tooltip: "true 时 将玩家物体旋转调整为 endRotation.",
        group: "Config-rotation",
    })
    public isRefreshObjectRotation: boolean = true;

    @Property({
        displayName: "是否刷新相机旋转",
        tooltip: "true 时 将玩家相机调整为 endRotation.",
        group: "Config-rotation",
    })
    public isRefreshCameraRotation: boolean = true;

    @Property({ displayName: "角色目标旋转", group: "Config-rotation" })
    public endRotation: Rotation = Rotation.zero;

    @Property({
        displayName: "是否保持原有速度",
        tooltip: "若目的地过于贴近地面 原有速度将受摩擦力影响\n旋转将跟随 isRefreshObjectRotation",
        group: "Config-speed",
    })
    public isHoldVelocity: boolean = false;

    private _nolan: Nolan;

    protected onStart(): void {
        super.onStart();
        this.activeMode = new ActivateByTrigger(this.gameObject, TriggerType.TriggerInClient);
        if (SystemUtil.isClient()) {
            this._nolan = Nolan.getInstance();
        }
    }

    activeMode: ActivateMode;

    onStartPortalInServer(playerId: number): void {
    }

    onStartPortalInClient(): void {
    }

    onInterruptProgressInClient(): void {
    }

    onInterruptProgressInServer(playerId: number): void {
    }

    onProgressDoneInClient(): void {

        switch (this.portalDestination) {
            case Destination.mainScene: {
                let scene = GameConfig.Scene.getElement(1);
                showTransitionAnimation(() => {
                    //改变天空盒
                    EnvironmentManager.getInstance().setEnvironment(scene.sceneEnvId);
                    //显示场景名
                    GlobalTips.getInstance().showGlobalTips(i18n.lan(scene.name), {
                        duration: GameServiceConfig.COW_LEVEL_PORTAL_SHOW_SCENE_NAME_DURATION,
                        only: true,
                    });
                    UIService.getUI(MainPanel)?.backToMainScene();
                    Event.dispatchToLocal(EventDefine.PlayerReset, Player.localPlayer.playerId);
                    Event.dispatchToServer(EventDefine.PlayerReset, Player.localPlayer.playerId);
                    Player.localPlayer.getPlayerState(UnifiedRoleController)?.respawn();
                });

            }
                break;
            case Destination.anyCowLevel: {
                let scenes = GameConfig.Scene.getAllElement();
                let cowLevelScene = scenes.map((element) => {
                    if (
                        element.id !== GameServiceConfig.MAIN_SCENE_ID &&
                        element.id !== GameServiceConfig.TRANSFER_SCENE_ID
                    ) {
                        return element;
                    }
                });

                let cowLevel = Math.floor(Math.random() * cowLevelScene.length);
                let scene = cowLevelScene[cowLevel];
                //播tips

                if (scene.foreshow) GlobalTips.getInstance().showGlobalTips(i18n.lan(scene.foreshow));
                TimeUtil.delaySecond(GameServiceConfig.COW_LEVEL_PORTAL_SHOW_TIPS_DURATION).then(() => {
                    showTransitionAnimation(() => {
                        //传送
                        let dest = AreaManager.getInstance().getRandomPoint(scene.bornAreaId);
                        if (!("z" in dest)) {
                            Log4Ts.error(CowLevelPortalTrigger, `currently only support 3D point as spawn point`);
                            return;
                        }
                        this.transferPlayer(Player.localPlayer.character, new Vector(dest.x, dest.y, dest.z));
                        //改变天空盒
                        EnvironmentManager.getInstance().setEnvironment(scene.sceneEnvId);
                        GlobalTips.getInstance().showGlobalTips(i18n.lan(scene.name), {
                            duration: GameServiceConfig.COW_LEVEL_PORTAL_SHOW_SCENE_NAME_DURATION,
                            only: true,
                        });
                        Event.dispatchToLocal(EventDefine.PlayerEnterCowLevel, scene.id);
                    });
                });
            }
                break;
            default:
                break;
        }
    }

    onProgressDoneInServer(playerId: number): void {
    }

    protected transferPlayer(character: Character, location: Vector) {
        Log4Ts.log(TransferPortalTrigger, `player enter. playerId: ${character?.player?.playerId ?? "null"}`);

        if (character) {
            const player = character.player;
            if (player) {
                const velocity = character.velocity;

                character.addImpulse(velocity.clone().multiply(Vector.negOne), true);
                character.worldTransform = new Transform(
                    location,
                    this.isRefreshObjectRotation ? this.endRotation : character.worldTransform.rotation,
                    character.worldTransform.scale,
                );

                if (this.isRefreshCameraRotation) this._nolan.lookToward(this.endRotation.rotateVector(Vector.forward));

                if (this.isHoldVelocity) {
                    let v = this.isRefreshObjectRotation
                        ? this.endRotation.rotateVector(Vector.forward).multiply(velocity.length)
                        : velocity;

                    character.addImpulse(v, true);
                }
            }
        }
    }
}

export function showTransitionAnimation(callBack: () => void) {
    let ui = UIService.show(JumpGameTransition_Generate);
    actions
        .tween(ui.bImage)
        .set({ renderOpacity: 0 })
        .to(GameServiceConfig.TRANSITION_FADE_IN_DURATION, { renderOpacity: 1 })
        .call(() => {
            callBack();
        })
        .delay(GameServiceConfig.TRANSITION_DELAY_DURATION)
        .to(GameServiceConfig.TRANSITION_FADE_OUT_DURATION, { renderOpacity: 0 })
        .call(() => {
            UIService.hide(JumpGameTransition_Generate);
        })
        .union()
        .start();
}