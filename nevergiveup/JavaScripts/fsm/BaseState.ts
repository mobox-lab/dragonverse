import { Fsm } from "./Fsm";
import { IState } from "./IState";

/** 
 * @Author       : lei.zhao
 * @Date         : 2023-09-20 11:26:00
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-09-20 11:37:58
 * @FilePath     : \RPWorld\JavaScripts\fsm\BaseState.ts
 * @Description  : 修改描述
 */
export abstract class BaseState<K, T extends Fsm<K>> implements IState {
    constructor(protected fsm: T) {

    }
    /**
     * 进入状态
     * @param params 
     */
    onEnter(...params: any[]): void {

    }
    /**
     * 更新状态
     * @param dt
     * @returns
     * @memberof IState
     */
    abstract onUpdate(dt: number): void;
    /**
     * 退出状态
     * @memberof IState
     */
    onExit(): void {

    }
}