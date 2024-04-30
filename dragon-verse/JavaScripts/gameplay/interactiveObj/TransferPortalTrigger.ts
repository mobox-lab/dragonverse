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
import EnvironmentManager from "./SkyBoxManager";

enum Destination {
    anyCowLevel = 1,
    mainScene = 2,
    TransferScene = 3,
}

export class TransferPortalTrigger extends PortalTriggerWithProgress {
    @Property({
        displayName: "传送地点",
        group: "Config-Destination",
        enumType: {
            任意奶牛关: Destination.anyCowLevel,
            主场景: Destination.mainScene,
            中转关: Destination.TransferScene,
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

    onStartPortalInServer(playerId: number): void {}
    onStartPortalInClient(): void {}
    onInterruptProgressInClient(): void {}
    onInterruptProgressInServer(playerId: number): void {}
    onProgressDoneInClient(): void {
        let pos: Vector;
        switch (this.portalDestination) {
            case Destination.TransferScene:
                {
                    pos = GameConfig.Scene.getElement(GameServiceConfig.TRANSFER_SCENE_ID).bornLocation;
                    this.showTransitionAnimation(() => {
                        this.transferPlayer(Player.localPlayer.character, pos);
                    });
                }
                break;
            case Destination.mainScene:
                {
                    pos = GameConfig.Scene.getElement(GameServiceConfig.MAIN_SCENE_ID).bornLocation;
                    this.showTransitionAnimation(() => {
                        this.transferPlayer(Player.localPlayer.character, pos);
                    });
                }
                break;
            case Destination.anyCowLevel:
                {
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
                    let tips = GameConfig.TipsPlaylist.findElement("environment", scene.id);
                    if (tips) GlobalTips.getInstance().showGlobalTips(i18n.lan(tips.content));
                    TimeUtil.delaySecond(GameServiceConfig.COW_LEVEL_PORTAL_SHOW_TIPS_DURATION).then(() => {
                        this.showTransitionAnimation(() => {
                            //传送
                            this.transferPlayer(Player.localPlayer.character, scene.bornLocation);
                            //改变天空盒
                            EnvironmentManager.getInstance().setEnvironment(scene.id);
                            GlobalTips.getInstance().showGlobalTips(i18n.lan(scene.name), {
                                duration: GameServiceConfig.COW_LEVEL_PORTAL_SHOW_SCENE_NAME_DURATION,
                                only: true,
                            });
                        });
                    });
                }
                break;
            default:
                break;
        }
    }
    onProgressDoneInServer(playerId: number): void {}

    private showTransitionAnimation(callBack: () => void) {
        let ui = UIService.show(JumpGameTransition_Generate);
        actions
            .tween(ui.bImage)
            .set({ renderOpacity: 0 })
            .to(GameServiceConfig.TRANSITION_FADE_IN_DURATION, { renderOpacity: 100 })
            .delay(GameServiceConfig.TRANSITION_DELAY_DURATION)
            .to(GameServiceConfig.TRANSITION_FADE_OUT_DURATION, { renderOpacity: 0 })
            .union()
            .call(() => {
                callBack();
            })
            .start();
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
                    character.worldTransform.scale
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
