
/**
     * 状态实例类
*/
export class GhostBaseState {
    enter (...params: any[]) {};
    update(dt: number) { };
    exit() { };
}

/**
 * 状态机
 */
export class GhostBaseStateMachine<T> {
    private _states: Map<T, GhostBaseState>
    private currentState: T = undefined;

    constructor() {
        this._states = new Map<T, GhostBaseState>()
    }

    /**
     * 注册状态
     * @param state 状态
     * @param func 回调
     */
    public register(state: T, func: GhostBaseState) {
        this._states.set(state, func)
    }

    public update(dt): void {
        if (this.currentState) {
            let func = this._states.get(this.currentState)
            func.update && func.update(dt)
        }
    }

    /**
    * 切换状态
    * @param state 状态
    * @param data 参数
    */
    public switch(state: T, ...data: any[]): void {
        console.log("切换状态 : " + state);
        if (!this._states.has(state)) {
            console.error("没找到对应状态 : " + state);
            return
        }

        if (this.currentState != null) {
            let func = this._states.get(this.currentState)
            func.exit && func.exit()
        }
        this.currentState = state

        let func = this._states.get(state)
        func.enter && func.enter(data)
    }

    /**
     * 清楚状态列表
     */
    public destroy(): void {
        if (this.currentState) {
            let func = this._states.get(this.currentState)
            func.exit && func.exit();
        }
        this._states.clear()
    }

    /**
     * 获取当前状态
     * @returns 当前状态
     */
    public getState(): T {
        return this.currentState
    }
}
