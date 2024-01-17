import { GameConfig } from "../../config/GameConfig";
import { EModule_Events, EMotion_Events } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { ActionModuleS } from "./ActionModuleS";
import { P_Game_Action } from "./ui/P_Game_Action";









import { EPlayerState, playCurrentPlayerAnimationAndChangeActionState } from "../PlayerModule/FSM/PlyerState";

export class ActionModuleC extends ModuleC<ActionModuleS, null> {

    // 动作UI
    private actionUI: P_Game_Action;
    // 当前播放的动作
    private curAnimation: mw.Animation;

    onEnterScene(sceneType: number): void {
        this.init();
        this.registerEvent();
    }

    /**
     * 初始化
     */
    private init() {
        this.actionUI = mw.UIService.getUI(P_Game_Action);
    }

    /**
     * 注册事件
     */
    private registerEvent() {
        EventManager.instance.add(EModule_Events.action_open, this.openAction, this);
        EventManager.instance.add(EModule_Events.playAction, this.playAction, this);
        EventManager.instance.add(EModule_Events.player_move, this.onPlayerMove, this);
        EventManager.instance.add(EModule_Events.ui_openMainView, this.onMainVisChange, this);
    }

    /**
     * 打开动作界面
     */
    private openAction() {
        mw.UIService.showUI(this.actionUI);
        this.actionUI.isOpenAction = true;
    }

    /**
     * 主界面显示隐藏
     */
    private onMainVisChange(vis: boolean) {
        if (vis == false) {
            mw.UIService.hideUI(this.actionUI);
        } else {
            if (this.actionUI.isOpenAction) this.openAction();
        }
    }

    /**
     * 播放动作
     */
    private async playAction(cfgId: number) {
        mw.UIService.hideUI(this.actionUI);
        let ele = GameConfig.Action.getElement(cfgId);
        if (ele == null) return;
        if (this.curAnimation != null) {
            this.curAnimation.stop();
            this.curAnimation = null;
        }

        if (StringUtil.isEmpty(ele.actionId)) {
            return;
        }

        if (AssetUtil.assetLoaded(ele.actionId) == false) {
            await AssetUtil.asyncDownloadAsset(ele.actionId);
        }

        this.curAnimation = playCurrentPlayerAnimationAndChangeActionState(ele.actionId, ele.loopNum, ele.speed, true)
    }

    /**
     * 玩家移动, 打断动作
     */
    private onPlayerMove(v2: mw.Vector2) {
        if (this.curAnimation != null) {
            this.curAnimation.stop();
            this.curAnimation = null;
            EventManager.instance.call(EModule_Events.changetoBaseState, -1);
        }
    }

}