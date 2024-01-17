import { EAttributeEvents_S } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { FSMManager } from "./FSM/FSMManager";
import { EPlayerState } from "./FSM/PlyerState";
import { State_BlowUp_S } from "./FSM_S/PlayerStates/State_BlowUp_S";
import { State_Dive_S } from "./FSM_S/PlayerStates/State_Dive_S";
import { State_Idle_S } from "./FSM_S/PlayerStates/State_Idle_S";
import { State_TieUp_S } from "./FSM_S/PlayerStates/State_TieUp_S";
import { Attribute } from "./sub_attribute/AttributeValueObject";

/**
 * 玩家操作代理类
 * 
 */
export class PlayerProxyS {

    /**玩家id */
    private pId: number = 0;
    public get PId() {
        return this.pId;
    }

    /**玩家状态机 */
    public mStateManager: FSMManager;

    constructor(pId: number) {
        this.pId = pId;

        this.init_fsm();
    }

    /**初始化状态机 */
    private init_fsm() {
        this.mStateManager = new FSMManager();
        this.mStateManager.register(EPlayerState.Idle, new State_Idle_S(this));
        this.mStateManager.register(EPlayerState.BlowUp, new State_BlowUp_S(this));
        this.mStateManager.register(EPlayerState.Dive, new State_Dive_S(this));
        this.mStateManager.register(EPlayerState.TieUp, new State_TieUp_S(this));
        this.changeState(EPlayerState.Idle);
    }


    /**
     * 改变状态
     * @param state 状态
     * @param paramEniter 进入参数
     * @param paramExit 退出参数
     */
    public changeState(state: EPlayerState, paramEniter?: any, paramExit?: any): void {

        // 条件检测
        let isCan = this.isCanChangeState(state);
        if (isCan == false) {
            return;
        }

        this.mStateManager.changeState(state, paramEniter, paramExit);
        // 同步玩家属性 FSM状态到客户端
        EventManager.instance.call(EAttributeEvents_S.attr_change_s,
            this.pId, Attribute.EnumAttributeType.fsmState, state);
    }

    private isCanChangeState(state: EPlayerState) {
        if (this.mStateManager.currentStateType == 0) {
            return true;
        }

        if (state == EPlayerState.BlowUp && this.mStateManager.currentStateType == EPlayerState.TieUp) {
            return false;
        }

        return true;
    }



    public onUpdate(dt) {
        if (this.mStateManager == null) return;
        this.mStateManager.update(dt);
    }

    /**
     * 玩家死亡
     */
    public playerDead() {

        if (this.mStateManager &&
            this.mStateManager.currentStateType == EPlayerState.BlowUp) {
            this.changeState(EPlayerState.Idle);
        }

    }

    public destroy() {
        this.changeState(EPlayerState.Idle);
    }

}