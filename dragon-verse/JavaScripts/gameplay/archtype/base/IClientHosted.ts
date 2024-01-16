import { IState } from "./IState";

export interface IClientDisplayHosted<T extends IState> {




    /**
     * 状态改变被同步
     */
    onLogicStateSynced: mw.Action1<T>;


    isLocalPlayer(): boolean;


    get state(): T;

}