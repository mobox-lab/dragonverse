/* eslint-disable @typescript-eslint/no-empty-function */

import { IStateMachine } from './IStateMachine';


/**
 * 基础的状态转换类，所有的状态类都应该继承这个类
 */
export abstract class TransitionBase<TStateId>{

    /**
     * 转换的起始状态
     */
    public from: TStateId;

    /**
     * 转换的目标状态
     */
    public to: TStateId;

    /**
     * 如果此属性为 true，则状态转换将无视当前活动状态的 needsExitTime 属性
     * 即强制立即执行状态转换。
     */
    public forceInstantly: boolean;

    /**
     * 对状态机的引用
     */
    public fsm: IStateMachine<TStateId>;


    public constructor(from: TStateId, to: TStateId, forceInstantly = false) {
        this.from = from;
        this.to = to;
        this.forceInstantly = forceInstantly;
    }

    public abstract init()

    /**
     * 当状态机进入 from 状态时调用此方法。
     */
    public abstract enter()

    /**
     * 用于判断是否应该执行状态转换。如果返回 true，
     * 则状态机应该进行状态转换。
     */
    public abstract shouldTransition(): boolean


    public toString() {
        return `${this.constructor.name}：${this.from ? this.from : "any"} -> ${this.to}`
    }
}


