/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-04-24 16:48:00
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-04-25 15:08:48
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\gameplay\interactiveObj\ActiveMode.ts
 * @Description  : 交互物触发模式
 */

import Log4Ts from "../../depend/log4ts/Log4Ts";
import { InteractiveObjModuleC, InteractiveObjModuleS } from "./InteractiveObjModule";

/** 
 * @description: 激活方式基类
 */
export abstract class ActivateMode {
    protected _interactiveObj: GameObject;

    private _canActivate: boolean = true;

    constructor(interactiveObj: GameObject) {
        this._interactiveObj = interactiveObj;
    }

    public get canActivate(): boolean {
        return this._canActivate;
    }

    public set canActivate(value: boolean) {
        this._canActivate = value;
    }
}

/** 
 * @description: 触发器环境
 */
export enum TriggerType {
    TriggerInServer,
    TriggerInClient
}

/** 
 * @description: 通过触发器触发
 */
export class ActivateByTrigger extends ActivateMode {
    protected trigger: mw.Trigger;
    private _triggerType: TriggerType;
    constructor(interactiveObj: GameObject, triggerType: TriggerType) {
        super(interactiveObj);

        this.trigger = this._interactiveObj as mw.Trigger;
        this._triggerType = triggerType;

        if (SystemUtil.isServer() && this._triggerType === TriggerType.TriggerInServer) {
            this.trigger.onEnter.add(this.onEnterInServer);
            this.trigger.onLeave.add(this.onLeaveInServer);
        } else if (SystemUtil.isClient() && this._triggerType === TriggerType.TriggerInClient) {
            this.trigger.onEnter.add(this.onEnterInClient);
            this.trigger.onLeave.add(this.onLeaveInClient);
        }
    }

    set canActivate(value: boolean) {
        super.canActivate = value;
        this.canActivate ? this.enableTrigger() : this.disableTrigger();
    }

    private enableTrigger() {
        if (SystemUtil.isServer() && this._triggerType === TriggerType.TriggerInServer) {
            this.trigger.onEnter.clear();
            this.trigger.onLeave.clear();
            this.trigger.onEnter.add(this.onEnterInServer);
            this.trigger.onLeave.add(this.onLeaveInServer);
        } else if (SystemUtil.isClient() && this._triggerType === TriggerType.TriggerInClient) {
            this.trigger.onEnter.clear();
            this.trigger.onLeave.clear();
            this.trigger.onEnter.add(this.onEnterInClient);
            this.trigger.onLeave.add(this.onLeaveInClient);
        }
    }

    private disableTrigger() {
        if (SystemUtil.isServer() && this._triggerType === TriggerType.TriggerInServer) {
            this.trigger.onEnter.clear();
            this.trigger.onLeave.clear();
        } else if (SystemUtil.isClient() && this._triggerType === TriggerType.TriggerInClient) {
            this.trigger.onEnter.clear();
            this.trigger.onLeave.clear();
        }
    }

    onEnterInServer = (go: mw.GameObject) => {
        Log4Ts.log(ActivateByTrigger, `active by trigger in server:${go.name}`);
        if (((go) instanceof mw.Character)) {
            let player = go.player;
            if (player) {
                ModuleService.getModule(InteractiveObjModuleS).net_startInteraction(player.playerId, this._interactiveObj.gameObjectId);
            }
        }
    }

    onLeaveInServer = (go: mw.GameObject) => {
        if (((go) instanceof mw.Character)) {
            let player = go.player;
            if (player) {
                ModuleService.getModule(InteractiveObjModuleS).net_stopInteraction(player.playerId, this._interactiveObj.gameObjectId);
            }
        }
    }

    onEnterInClient = (go: mw.GameObject) => {
        Log4Ts.log(ActivateByTrigger, `active by trigger in client:${go.name}`);
        if ((go) instanceof mw.Character) {
            let player = go.player;
            if (player && player.playerId === Player.localPlayer.playerId) {
                ModuleService.getModule(InteractiveObjModuleC).startInteraction(this._interactiveObj.gameObjectId);
            }
        }
    }

    onLeaveInClient = (go: mw.GameObject) => {
        if ((go) instanceof mw.Character) {
            let player = (go as mw.Character).player;
            if (player && player.playerId === Player.localPlayer.playerId) {
                ModuleService.getModule(InteractiveObjModuleC).stopInteraction(this._interactiveObj.gameObjectId);
            }
        }
    }
}

/** 
 * @description: 通过UI触发交互
 */
export class ActivateByUI extends ActivateMode {

    private _isInteractionUIShowing: boolean;//当前显示的UI

    protected showUI: () => void;
    protected hideUI: () => void;

    constructor(interactiveObj: GameObject, showUI: () => void, hideUI: () => void) {
        super(interactiveObj);
        this.showUI = showUI;
        this.hideUI = hideUI;

        //插入到四叉树
        ModuleService.ready().then(() => {
            ModuleService.getModule(InteractiveObjModuleC).insertInteractionIntoQuadTree(this._interactiveObj.worldTransform.position, this._interactiveObj.gameObjectId);
        })

    }

    set canActivate(value: boolean) {
        super.canActivate = value;
        if (!SystemUtil.isClient()) return;
        if (value) {
            this.canShowUI();
        } else {
            this.canHideUI();
        }
    }

    /**
     * @description: showUI
     * @return {*}
     */
    private canShowUI(): void {

        if (this._isInteractionUIShowing) return;

        this._isInteractionUIShowing = true;

        this.showUI();
    }

    /**
     * @description: 隐藏ui
     * @return {*}
     */
    protected canHideUI(): void {

        if (!this._isInteractionUIShowing) return;

        this._isInteractionUIShowing = false;

        this.hideUI();
    }

    public clickToStartInteraction() {
        ModuleService.getModule(InteractiveObjModuleC).startInteraction(this._interactiveObj.gameObjectId);
    }

    public clickToEndInteraction() {
        ModuleService.getModule(InteractiveObjModuleC).stopInteraction(this._interactiveObj.gameObjectId);
    }
}

/** 
 * @description: 触发器触发显示UI，UI显示后点击触发
 */
export class ActivateByUIAndTrigger extends ActivateByUI {
    private _trigger: mw.Trigger;

    constructor(interactiveObj: GameObject, showUI: () => void, hideUI: () => void) {
        super(interactiveObj, showUI, hideUI);
        if (SystemUtil.isClient()) {

            this._trigger = this._interactiveObj as mw.Trigger;
            this._trigger.onEnter.add(this.onEnter.bind(this));
            this._trigger.onLeave.add(this.onLeave.bind(this));
        }
    }

    onEnter(go: mw.GameObject) {
        if (((go) instanceof mw.Character)) {
            let player = (go as mw.Character).player;
            //是空的就是别人，刚进游戏的时候会有这种情况
            if (!player) return;
            //判断是不是自己
            if (player.playerId === Player.localPlayer.playerId) {
                this.showUI();
            }
        }
    }

    onLeave(go: mw.GameObject) {
        if (((go) instanceof mw.Character)) {
            let player = (go as mw.Character).player;
            //是空的就是别人，刚进游戏的时候会有这种情况
            if (!player) return;
            if (player.playerId === Player.localPlayer.playerId) {
                this.hideUI();
            }
        }
    }
}



