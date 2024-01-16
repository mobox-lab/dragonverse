

export interface IStateMachine<TStateId> {


    /**
     * 告诉状态机，如果有状态转换正在等待，那么现在是执行它的时候了。
     * 这个方法可以被视为一个触发器，当状态机处于可以转换到新状态的条件时，调用此方法实施转换。
     */
    stateCanExit(): void

    /**
     * 请求切换状态
     * @param name 要切换的状态名
     * @param forceInstantly 是否强制切换，如果不是的话，状态机可能会等到某个条件满足才切换
     */
    requestStateChange(name: TStateId, forceInstantly: boolean);

    readonly activeState: TStateId;
}