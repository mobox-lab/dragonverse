import Log4Ts from "../../depend/log4ts/Log4Ts";
import { ActivateMode } from "./ActiveMode";
import { InteractiveObjModuleS, InteractiveObjModuleC } from "./InteractiveObjModule";

/** 
 * @description: 开始交互事件，结束交互由于都走服务端，所以客户端不需要实现
 */
interface IInteractiveObj {
    someOneStartInteractionInClient(playerId: number): void;
    someOneStartInteractionInServer(playerId: number): void;
    someOneStopInteractionInServer(playerId: number): void;
    someOneStopInteractionInClient(playerId: number): void;
}
export abstract class BaseInteractiveObj extends mw.Script implements IInteractiveObj {

    protected abstract startInteractionInServer(playerId: number): void;
    protected abstract startInteractionInClient(playerId: number): void;
    protected abstract stopInteractionInServer(playerId: number, finishCallBack?: () => void): void;
    protected abstract stopInteractionInClient(playerId: number, finishCallBack?: () => void): void;

    abstract someOneStartInteractionInClient(playerId: number): void;
    abstract someOneStartInteractionInServer(playerId: number): void;
    abstract someOneStopInteractionInServer(playerId: number): void;
    abstract someOneStopInteractionInClient(playerId: number): void;

    abstract canActivate(value: boolean): void;

    abstract activeMode: ActivateMode;

    protected onStart(): void {
        if (SystemUtil.isServer()) {
            ModuleService.ready().then(() => {
                ModuleService.getModule(InteractiveObjModuleS).registerInteractiveObj(this.gameObject.gameObjectId, this);
            });
        } else if (SystemUtil.isClient()) {
            ModuleService.ready().then(() => {
                ModuleService.getModule(InteractiveObjModuleC).registerInteractiveObj(this.gameObject.gameObjectId, this);
            });
        }

    }

    onDestroy(): void {
        if (SystemUtil.isServer()) {
            ModuleService.getModule(InteractiveObjModuleS).unRegisterInteractiveObj(this.gameObject.gameObjectId);
        } else if (SystemUtil.isClient()) {
            ModuleService.getModule(InteractiveObjModuleC).unRegisterInteractiveObj(this.gameObject.gameObjectId);
        }
    }
}

/** 
 * @description: 独享交互物，需要借助module管理控制权实现独享
 */
export abstract class IndividualInteractiveObj extends BaseInteractiveObj {
    private static EndInteractionFlag: number = -1;
    /**
     * 正在交互的玩家id，
     */
    @mw.Property({ replicated: true, onChanged: "onOwnerPlayerIdChanged", hideInEditor: true })
    protected ownerPlayerId: number = IndividualInteractiveObj.EndInteractionFlag;//当前与之交互的玩家id（独享模式下）
    /**
     * 上一次记录下来在交互的玩家id
     */
    private _lastOwnerPlayerId = IndividualInteractiveObj.EndInteractionFlag;//上一次的ownerPlayerId

    /**
     * @description: owenPlayerId改变,属性同步
     * @return {*}
     */
    onOwnerPlayerIdChanged(): void {
        if (this.ownerPlayerId === IndividualInteractiveObj.EndInteractionFlag) {
            //有人结束交互了
            this.someOneStopInteractionInClient(this._lastOwnerPlayerId);
        } else {
            //有人开始交互了，之前没人交互过
            this.startInteractionInClient(this.ownerPlayerId);
        }
        this._lastOwnerPlayerId = this.ownerPlayerId;
    }



    /**
     * @description: 客户端设置正在交互的玩家
     * @param {number} playerId
     * @param {string} goGuid
     * @return {*}
     */
    someOneStartInteractionInClient(playerId: number): void {

        Log4Ts.log(this, `playerId:${playerId} start interaction on ${this.gameObject.name}`);
        this.startInteractionInClient(playerId);
    }

    /**
     * 某一交互物服务端开始交互事件
     * @param playerId 玩家id
     * @param goGuid 交互物id
     * @returns 
     */
    someOneStartInteractionInServer(playerId: number): void {
        Log4Ts.log(this, `playerId:${playerId} start interaction on ${this.gameObject.name}`);
        //这里控制独享
        if (this.ownerPlayerId === IndividualInteractiveObj.EndInteractionFlag) {
            this.ownerPlayerId = playerId;
            ModuleService.getModule(InteractiveObjModuleS).recordStartInteraction(playerId, this.gameObject.gameObjectId);
            this.startInteractionInServer(playerId);
        }
    }

    /**
     * @description: 服务端停止交互逻辑
     * @param {number} playerId
     * @param {string} goGuid
     * @return {*}
     */
    someOneStopInteractionInServer(playerId: number): void {
        this.ownerPlayerId = IndividualInteractiveObj.EndInteractionFlag;
        this.stopInteractionInServer(playerId, () => {
            ModuleService.getModule(InteractiveObjModuleS).net_recordEndInteraction(playerId);
        });
    }

    /**
     * @description: 客户端停止交互逻辑
     * @param {number} playerId
     * @param {string} goGuid
     * @return {*}
     */
    someOneStopInteractionInClient(playerId: number): void {
        this.stopInteractionInClient(playerId, () => {
            ModuleService.getModule(InteractiveObjModuleC).endInteraction();
        });
    }

    canActivate(value: boolean): void {
        if (value) {
            if (this.ownerPlayerId === IndividualInteractiveObj.EndInteractionFlag) {
                this.activeMode.activate = true;
            }
        } else {
            this.activeMode.activate = false;
        }
    }

}

/** 
 * @description: 共享交互物
 */
export abstract class SharedInteractiveObj extends BaseInteractiveObj {
    /**
     * 正在交互的玩家数量,
     */
    @mw.Property({ replicated: true, onChanged: 'onOwnerPlayerCountChanged', hideInEditor: true })
    protected ownerPlayerCount: number = 0;

    /**
     * 上一次记录下来在交互的玩家数量
     */
    private _lastOwnerPlayerCount: number = 0;

    /**
     * @description: 没有人交互了
     * @return {*}
     */
    abstract allPlayerEndInteractionInClient(): void;

    /**
     * @description: 第一个人开始交互
     * @return {*}
     */
    abstract firstStartInteractionInClient(): void;

    abstract maxPlayerCount: number;

    /**
     * @description: owenPlayerId改变,属性同步
     * @return {*}
     */
    onOwnerPlayerCountChanged() {
        //console.log("onOwnerPlayerIdsChanged", this.ownerPlayerIdCount);
        if (this.ownerPlayerCount === 0 && this._lastOwnerPlayerCount == 1) {
            this.allPlayerEndInteractionInClient();
        } else if (this.ownerPlayerCount > 0 && this._lastOwnerPlayerCount == 0) {
            //同步过来大于0说明有人正在交互
            this.firstStartInteractionInClient();
        }
        this._lastOwnerPlayerCount = this.ownerPlayerCount;
    }

    /**
     * @description: 服务端停止交互逻辑
     * @param {number} playerId
     * @param {string} goGuid
     * @return {*}
     */
    someOneStopInteractionInServer(playerId: number): void {
        this.ownerPlayerCount--;
        this.stopInteractionInServer(playerId, () => {
            ModuleService.getModule(InteractiveObjModuleS).net_recordEndInteraction(playerId);
        });
        ModuleService.getModule(InteractiveObjModuleS).stopSharedInteraction(playerId, this.gameObject.gameObjectId);
    }

    /**
     * @description: 某一交互物客户端开始交互事件
     * @param {number} playerId
     * @param {string} goGuid
     * @return {*}
     */
    someOneStartInteractionInClient(playerId: number): void {
        this.startInteractionInClient(playerId);
    }

    /**
     * 某一交互物服务端开始交互事件
     * @param playerId 玩家id
     * @param goGuid 交互物id
     * @returns 
     */
    someOneStartInteractionInServer(playerId: number): void {
        if (this.ownerPlayerCount >= this.maxPlayerCount) {
            return;
        }
        this.ownerPlayerCount++;
        this.startInteractionInServer(playerId);
        ModuleService.getModule(InteractiveObjModuleS).startSharedInteraction(playerId, this.gameObject.gameObjectId);
        //设置上玩家在交互
        ModuleService.getModule(InteractiveObjModuleS).recordStartInteraction(playerId, this.gameObject.gameObjectId);
    }

    someOneStopInteractionInClient(playerId: number): void {
        this.stopInteractionInClient(playerId, () => {
            ModuleService.getModule(InteractiveObjModuleC).endInteraction();
        });
    }

    canActivate(value: boolean): void {
        if (value) {
            if (this.ownerPlayerCount < this.maxPlayerCount) {
                this.activeMode.activate = true;
            }
        } else {
            this.activeMode.activate = false;
        }
    }
}