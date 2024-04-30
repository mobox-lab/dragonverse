/**
 * @Author       : zewei.zhang
 * @Date         : 2024-04-26 17:01:39
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-04-26 18:28:25
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\gameplay\interactiveObj\CowLevelPortalTrigger.ts
 * @Description  : 奶牛关传送门
 */

import { AddGMCommand } from "module_gm";
import { GameConfig } from "../../config/GameConfig";
import GameServiceConfig from "../../const/GameServiceConfig";
import GlobalTips from "../../depend/global-tips/GlobalTips";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import Nolan from "../../depend/nolan/Nolan";
import i18n from "../../language/i18n";
import { BagModuleC, BagModuleS } from "../../module/bag/BagModule";
import CutScenePanel from "../../ui/jump-game/CutScenePanel";
import MainPanel from "../../ui/main/MainPanel";
import { ActivateByUIAndTrigger, ActivateMode } from "./ActiveMode";
import { PortalTrigger } from "./PortalTrigger";
import SkyBoxManager from "./SkyBoxManager";

export default class CowLevelPortalTrigger extends PortalTrigger {
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

    activeMode: ActivateMode;

    private _nolan: Nolan;

    protected onStart(): void {
        super.onStart();
        this.activeMode = new ActivateByUIAndTrigger(this.gameObject, this.showUI.bind(this), this.hideUI.bind(this));
        if (SystemUtil.isClient()) {
            this._nolan = Nolan.getInstance();
        }
    }

    private showUI() {
        mw.UIService.getUI(MainPanel)?.enableTransport(this.activeMode);
    }

    private hideUI() {
        mw.UIService.getUI(MainPanel)?.disableTransport();
    }

    async onStartPortalInServer(playerId: number): Promise<void> {
        if (ModuleService.getModule(BagModuleS).hasDragonBall(playerId)) {
        } else {
            //播一个爆炸特效
            let player = await Player.asyncGetPlayer(playerId);
            EffectService.playAtPosition(
                GameServiceConfig.COW_LEVEL_PORTAL_EXPLODE_EFFECT_GUID,
                player.character.worldTransform.position,
                {
                    loopCount: 1,
                    scale: GameServiceConfig.COW_LEVEL_PORTAL_EXPLODE_EFFECT_SCALE,
                }
            );
            //加个冲量
            player.character.addImpulse(GameServiceConfig.COW_LEVEL_PORTAL_EXPLODE_FORCE);
            Event.dispatchToClient(player, GlobalTips.EVENT_NAME_GLOBAL_TIPS, i18n.resolves.hasNoDragonBall());
        }
    }
    async onStartPortalInClient(): Promise<void> {
        if (ModuleService.getModule(BagModuleC).hasDragonBall()) {
            let effect = (await GameObject.asyncSpawn(GameServiceConfig.COW_LEVEL_PORTAL_EFFECT_GUID)) as Effect;
            effect.worldTransform.position = GameServiceConfig.COW_LEVEL_PORTAL_EFFECT_POS;
            actions
                .tween(effect.worldTransform)
                .set({ scale: Vector.zero })
                .to(GameServiceConfig.COW_LEVEL_PORTAL_EFFECT_DURATION, {
                    scale: GameServiceConfig.COW_LEVEL_PORTAL_EFFECT_SCALE_MAX,
                })
                .union()
                .call(() => {
                    //随机奶牛关
                    let cowLevel = Math.floor(Math.random() * GameServiceConfig.COW_LEVEL_SCENE_INDEX.length) + 1;
                    let sceneIndex = GameServiceConfig.COW_LEVEL_SCENE_INDEX[cowLevel - 1];
                    let scene = GameConfig.Scene.getElement(sceneIndex);
                    //播tips
                    let tips = GameConfig.TipsPlaylist.findElement("environment", sceneIndex);
                    if (tips) GlobalTips.getInstance().showGlobalTips(i18n.lan(tips.content));
                    TimeUtil.delaySecond(GameServiceConfig.COW_LEVEL_PORTAL_SHOW_TIPS_DURATION).then(() => {
                        //显示一个转场ui动画
                        UIService.show(CutScenePanel, () => {
                            //传送
                            this.transferPlayer(Player.localPlayer.character, scene.bornLocation);
                            //改变天空盒
                            SkyBoxManager.getInstance().setSkyBox(sceneIndex);
                            GlobalTips.getInstance().showGlobalTips(i18n.lan(scene.name), {
                                duration: GameServiceConfig.COW_LEVEL_PORTAL_SHOW_SCENE_NAME_DURATION,
                                only: true,
                            });
                            effect.destroy();
                        });
                    });
                })
                .start();
        }
    }

    protected transferPlayer(character: Character, location: Vector) {
        Log4Ts.log(PortalTrigger, `player enter. playerId: ${character?.player?.playerId ?? "null"}`);

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

AddGMCommand("tips", () => {
    GlobalTips.getInstance().showGlobalTips("i18n.lan(scene.name)", { duration: 2e3, only: true });
});
