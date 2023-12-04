import { IState } from "./IState";

export interface IClientDisplayHosted<T extends IState> {


    /**
     * 客户端申请改变逻辑状态
     * @param state 
     */
    changeLogicState(state: T): void;


    /**
     * 状态改变被同步
     */
    onLogicStateSynced: mw.Action1<T>;


    isLocalPlayer(): boolean;


    get state(): T;

}