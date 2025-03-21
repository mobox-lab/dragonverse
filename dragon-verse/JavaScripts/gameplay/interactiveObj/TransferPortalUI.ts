/**
 * @Author       : zewei.zhang
 * @Date         : 2024-05-06 18:28:34
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-05-08 09:55:18
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\gameplay\interactiveObj\TransferPortalUI.ts
 * @Description  : 奶牛关去中转关交互物
 */

import { GameConfig } from "../../config/GameConfig";
import { EventDefine } from "../../const/EventDefine";
import GameServiceConfig from "../../const/GameServiceConfig";
import Log4Ts from "mw-log4ts";
import Nolan from "../../depend/nolan/Nolan";
import MainPanel from "../../ui/main/MainPanel";
import { ActivateByUI, ActivateMode } from "./ActiveMode";
import { InteractiveObjModuleC } from "./InteractiveObjModule";
import { PortalTriggerWithProgress } from "./PortalTriggerWithProgress";
import { showTransitionAnimation } from "./TransferPortalTrigger";
import AreaManager from "../../depend/area/AreaManager";
import CowLevelPortalTrigger from "./CowLevelPortalTrigger";
import { SceneDragonModuleS } from "../../module/scene-dragon/SceneDragonModule";

export default class TransferPortalUI extends PortalTriggerWithProgress {
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

    /**
     * 客户端存当前玩家所在奶牛关
     */
    private _currentCowLevelId: number = 0;
    /**
     * 服务端存玩家和对应的奶牛关
     */
    private _currentCowLevel: Map<number, number> = new Map();

    onStartPortalInServer(playerId: number): void {

    }

    onStartPortalInClient(): void {

    }

    onInterruptProgressInClient(): void {
        this.activeMode.clickToEndInteraction();
    }

    onInterruptProgressInServer(playerId: number): void {

    }

    onProgressDoneInClient(): void {
        this.transferPlayer();
        this.activeMode.clickToEndInteraction();
        this.activeMode.hideInteractionUI();
    }

    onProgressDoneInServer(playerId: number): void {
        if (this._currentCowLevel.has(playerId)) {
            ModuleService.getModule(SceneDragonModuleS).habitatDestroy(this._currentCowLevel.get(playerId), playerId);
            this._currentCowLevel.delete(playerId);
        }
    }

    activeMode: ActivateByUI;

    protected onStart(): void {
        super.onStart();
        this.activeMode = new ActivateByUI(this.gameObject, this.showUI, this.hideUI, false);
        if (SystemUtil.isClient()) {
            this._nolan = Nolan.getInstance();
            Event.addLocalListener(EventDefine.PlayerEnterCowLevel, (sceneId: number) => {
                this._currentCowLevelId = sceneId;
                this.activeMode.showInteractionUI();
            });
        }
        Event.addLocalListener(EventDefine.PlayerEnterCowLevel, (playerId: number, sceneId: number) => {
            this._currentCowLevel.set(playerId, sceneId);
        });
    }

    showUI = () => {
        UIService.getUI(MainPanel)?.switchToCowLevel(this.clickToStartInteraction, this.respawn);
    };

    private clickToStartInteraction = () => {

        if (this._isPlayingProgress) {
            ModuleService.getModule(InteractiveObjModuleC).stopInteraction(this.gameObject.gameObjectId);
        } else {
            ModuleService.getModule(InteractiveObjModuleC).startInteraction(this.gameObject.gameObjectId);
        }
    };

    hideUI = () => {
        UIService.getUI(MainPanel)?.switchToTransferLevel();
    };

    respawn = () => {
        if (this._currentCowLevelId) {
            let dest = AreaManager.getInstance().getRandomPoint(GameConfig.Scene.getElement(this._currentCowLevelId).bornAreaId);
            if (!("z" in dest)) {
                Log4Ts.error(CowLevelPortalTrigger, `currently only support 3D point as spawn point`);
                return;
            }
            Player.localPlayer.character.worldTransform.position = new mw.Vector(dest.x, dest.y, dest.z);
        }
    };

    protected transferPlayer = () => {
        let dest = AreaManager.getInstance().getRandomPoint(GameConfig.Scene.getElement(GameServiceConfig.TRANSFER_SCENE_ID).bornAreaId);
        if (!("z" in dest)) {
            Log4Ts.error(CowLevelPortalTrigger, `currently only support 3D point as spawn point`);
            return;
        }
        //展示过场动画
        showTransitionAnimation(() => {
            let character = Player.localPlayer.character;
            Log4Ts.log(TransferPortalUI, `player enter. playerId: ${character?.player?.playerId ?? "null"}`);
            if (character) {
                const player = character.player;
                if (player) {
                    const velocity = character.velocity;

                    character.addImpulse(velocity.clone().multiply(Vector.negOne), true);
                    character.worldTransform = new Transform(
                        new mw.Vector(dest.x, dest.y, dest["z"]),
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
        });

    };
}