/* eslint-disable @typescript-eslint/no-empty-function */

import { IStateMachine } from './IStateMachine';

/**
 * 基础的状态类，所有的状态都应该继承自这个类
 */
export abstract class StateBase<TStateId>{

    /**
     * 此属性决定状态是否需要退出时间。
     * 如果 needsExitTime 为 true，则状态机在状态改变时应该等待，直到状态准备好进行状态改变；
     * 如果为 false，则在转换时状态可以立即退出。
     */
    public needsExitTimes: boolean;

    /**
     * 状态名
     */
    public name: TStateId;

    /**
     * 状态机的引用
     */
    public fsm: IStateMachine<TStateId>;


    constructor(needsExitTime: boolean) {
        this.needsExitTimes = needsExitTime;
    }

    /**
     * 初始化函数，当状态被设置了owner或者fsm后调用
     */
    public abstract init()

    public abstract enter()

    public abstract logic()

    public abstract exit()

    /**
     * 如果 needsExitTime 为 true，则当从此状态转换到另一状态应发生时调用此方法。如果它可以退出，
     * 应调用 this.fsm.stateCanExit()；
     * 如果现在不能退出，那么它应该在 onLogic() 中稍后调用 this.fsm.stateCanExit()。
     */
    public abstract requestExit()

}

