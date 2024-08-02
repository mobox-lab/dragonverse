/**
 * @Author       : zewei.zhang
 * @Date         : 2024-04-24 16:48:00
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-04-28 10:09:02
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\gameplay\interactiveObj\ActiveMode.ts
 * @Description  : 交互物触发模式
 */

import Log4Ts from "mw-log4ts";
import { InteractiveObjModuleC, InteractiveObjModuleS } from "./InteractiveObjModule";

/**
 * @description: 激活方式基类
 */
export abstract class ActivateMode {
    protected _interactiveObj: GameObject;

    private _activate: boolean = true;

    constructor(interactiveObj: GameObject) {
        this._interactiveObj = interactiveObj;
    }

    public get activate(): boolean {
        return this._activate;
    }

    public set activate(value: boolean) {
        this._activate = value;
    }
}

/**
 * @description: 设置触发器在哪里触发，最终的客户端和服务端的交互函数还是都会触发，只为了防止双端都触发逻辑冗余
 */
export enum TriggerType {
    TriggerInServer,
    TriggerInClient,
}

/**
 * @description: 通过触发器触发
 */
export class ActivateByTrigger extends ActivateMode {
    protected trigger: mw.Trigger;
    protected _triggerType: TriggerType;
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

    set activate(value: boolean) {
        super.activate = value;
        this.activate ? this.enableTrigger() : this.disableTrigger();
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
        if (go instanceof mw.Character) {
            let player = go.player;
            if (player) {
                ModuleService.getModule(InteractiveObjModuleS).net_startInteraction(
                    player.playerId,
                    this._interactiveObj.gameObjectId
                );
            }
        }
    };

    onLeaveInServer = (go: mw.GameObject) => {
        if (go instanceof mw.Character) {
            let player = go.player;
            if (player) {
                ModuleService.getModule(InteractiveObjModuleS).net_stopInteraction(
                    player.playerId,
                    this._interactiveObj.gameObjectId
                );
            }
        }
    };

    onEnterInClient = (go: mw.GameObject) => {
        Log4Ts.log(ActivateByTrigger, `active by trigger in client:${go.name}`);
        if (go instanceof mw.Character) {
            let player = go.player;
            if (player && player.playerId === Player.localPlayer.playerId) {
                ModuleService.getModule(InteractiveObjModuleC).startInteraction(this._interactiveObj.gameObjectId);
            }
        }
    };

    onLeaveInClient = (go: mw.GameObject) => {
        if (go instanceof mw.Character) {
            let player = (go as mw.Character).player;
            if (player && player.playerId === Player.localPlayer.playerId) {
                ModuleService.getModule(InteractiveObjModuleC).stopInteraction(this._interactiveObj.gameObjectId);
            }
        }
    };
}

/**
 * @description: 通过UI触发交互
 */
export class ActivateByUI extends ActivateMode {
    protected _isInteractionUIShowing: boolean; //当前显示的UI

    protected _canShowUI: boolean = true;

    private showUI: () => void;
    private hideUI: () => void;

    constructor(interactiveObj: GameObject, showUI: () => void, hideUI: () => void, needControlByQuadTree: boolean) {
        super(interactiveObj);
        this.showUI = showUI;
        this.hideUI = hideUI;

        //插入到四叉树
        if (needControlByQuadTree) {
            ModuleService.ready().then(() => {
                ModuleService.getModule(InteractiveObjModuleC).insertInteractionIntoQuadTree(this._interactiveObj.worldTransform.position, this._interactiveObj.gameObjectId);
            })
        }

    }

    public showInteractionUI() {
        if (this._canShowUI) {
            this.showUI();
            this._isInteractionUIShowing = true;
        }
    }

    public hideInteractionUI() {
        this.hideUI();
        this._isInteractionUIShowing = false;
    }

    set activate(value: boolean) {
        super.activate = value;
        if (!SystemUtil.isClient()) return;
        if (value) {
            this._canShowUI = true;
        } else {
            this._canShowUI = false;
            if (this._isInteractionUIShowing) {
                this._isInteractionUIShowing = false;
                this.hideUI();
            }
        }
    }

    public clickToStartInteraction = () => {
        ModuleService.getModule(InteractiveObjModuleC).startInteraction(this._interactiveObj.gameObjectId);
    }

    public clickToEndInteraction = () => {
        ModuleService.getModule(InteractiveObjModuleC).stopInteraction(this._interactiveObj.gameObjectId);
    }
}

/**
 * @description: 触发器触发显示UI，UI显示后点击触发
 */
export class ActivateByUIAndTrigger extends ActivateByUI {
    private _trigger: mw.Trigger;

    constructor(interactiveObj: GameObject, showUI: () => void, hideUI: () => void) {
        super(interactiveObj, showUI, hideUI, false);
        if (SystemUtil.isClient()) {
            this._trigger = this._interactiveObj as mw.Trigger;
            this._trigger.onEnter.add(this.onEnter.bind(this));
            this._trigger.onLeave.add(this.onLeave.bind(this));
        }
    }

    // set activate(value: boolean) {
    //     super.activate = value;
    //     this.activate ? this.enableTrigger() : this.disableTrigger();
    // }

    // private enableTrigger() {
    //     if (SystemUtil.isClient()) {
    //         this._trigger.onEnter.clear();
    //         this._trigger.onLeave.clear();
    //         this._trigger.onEnter.add(this.onEnter);
    //         this._trigger.onLeave.add(this.onLeave);
    //     }
    // }

    // private disableTrigger() {
    //     if (SystemUtil.isClient()) {
    //         this._trigger.onEnter.clear();
    //         this._trigger.onLeave.clear();
    //     }
    // }

    onEnter(go: mw.GameObject) {
        if (go instanceof mw.Character) {
            let player = (go as mw.Character).player;
            //是空的就是别人，刚进游戏的时候会有这种情况
            if (!player) return;
            //判断是不是自己
            if (player.playerId === Player.localPlayer.playerId) {
                if (this._canShowUI) {
                    this.showInteractionUI();
                }
            }
        }
    }

    onLeave(go: mw.GameObject) {
        if (go instanceof mw.Character) {
            let player = (go as mw.Character).player;
            //是空的就是别人，刚进游戏的时候会有这种情况
            if (!player) return;
            if (player.playerId === Player.localPlayer.playerId) {
                this.hideInteractionUI();
            }
        }
    }
}
