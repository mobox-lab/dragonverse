
/** 
 * @Author       : lei.zhao
 * @Date         : 2023-09-20 11:26:00
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-09-20 11:27:13
 * @FilePath     : \RPWorld\JavaScripts\fsm\IState.ts
 * @Description  : 修改描述
 */
export interface IState {
    /**
     * 进入状态
     * @param params 
     */
    onEnter(...params: any[]): void;
    /**
     * 更新状态
     * @param dt
     * @returns
     * @memberof IState
     */
    onUpdate(dt: number): void;
    /**
     * 退出状态
     * @memberof IState
     */
    onExit(): void;
}