import { IFsm } from "./IFsm";
import { IState } from "./IState";

/** 
 * @Author       : lei.zhao
 * @Date         : 2023-09-20 11:27:26
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-09-20 11:29:42
 * @FilePath     : \RPWorld\JavaScripts\fsm\Fsm.ts
 * @Description  : 修改描述
 */
export abstract class Fsm<T> implements IFsm<T> {
    private stateMap: Map<string, IState> = new Map<string, IState>();
    private _nextState: IState;
    private _nextStateParam: any[];
    protected currentState: IState;

    constructor(public owner: T) {

    }
    /**
     * 强制状态切换
     * @param stateClass 
     * @param params 
     */
    public forceState(stateClass: { new(fsm): IState }, ...params) {
        this._nextState = this.stateMap.get(stateClass.name);
        if (!this._nextState) {
            this._nextState = new stateClass(this);
            this.stateMap.set(stateClass.name, this._nextState);
        }
        this._nextStateParam = params;
    }

    /**
     * 切换状态
     * @param stateClass
     * @param params
     * @returns
     * @memberof Fsm
     *  
     * 1. 如果当前状态和要切换的状态一致，不做任何处理
     * 2. 如果当前状态和要切换的状态不一致，切换到新状态
     **/
    public changeState(stateClass: { new(fsm): IState }, ...params) {
        if (this.currentState && this.currentState.constructor.name == stateClass.name) return;
        this.forceState(stateClass, ...params);
    }
    /**
    * 更新主逻辑
    * @param dt 
    */
    public onUpdate(dt: number) {
        if (this._nextState) {
            this.currentState && this.currentState.onExit();
            this._nextState.onEnter(...this._nextStateParam);
            this.currentState = this._nextState;
            this._nextState = null;
        }
        this.currentState && this.currentState.onUpdate(dt);
    }

    public getCurrentState(){
        return this.currentState;
    }
}