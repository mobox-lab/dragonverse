/*
 * @Author: pengfei.sun pengfei.sun@appshahe.com
 * @Date: 2023-04-14 16:18:32
 * @LastEditors: pengfei.sun pengfei.sun@appshahe.com
 * @LastEditTime: 2023-04-20 14:40:10
 * @FilePath: \testsg\JavaScripts\FSM\FSMManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { oTrace } from "odin";
import { IFSMState } from "./IFSMState";
import { PlayerStateName } from "./PlyerState";

export class FSMManager {
    //状态集合
    private stateMap = new Map<number, IFSMState>();

    //当前状态
    private _currentState: IFSMState = null;
    public get currentState (): IFSMState {
        return this._currentState;
    }
    //当前状态类型
    public _currentStateType: number = 0;
    public get currentStateType (): number {
        return this._currentStateType;
    }

    //是否正切换状态
    private _isChangingState: boolean = false;
    public get IsChangingState (): boolean {
        return this._isChangingState;
    }
 
    constructor() {

    }

    /**
     * 注册状态
     * @param type 状态机类型
     * @param newstate 状态对象
     */
    public register(type: number, newstate: IFSMState) {
        if (this.stateMap.has(type) == false) {
            this.stateMap.set(type, newstate);
        }
    }
    /**
    * 状态轮询：调用子状态
    */
    public update(dt: number) {
        if (this.currentState) {
            this.currentState.onUpdate(dt);
        }
    }

    /**
    * 切换状态：立即转换到新的状态（参数自己注册时填写）
    * @param type 新的状态
    */
    public changeState(type: number, paramEniter?: any,paramExit?:any): void {
        if (this._isChangingState) {
            return;
        }
        this._isChangingState = true;
        // 先退出当前状态
        if (this.currentState) {
            this.currentState.exit(paramExit);
             //console.error("退出当前状态_____________________________________", PlayerStateName[this.currentStateType]);
        }
        // 接着步入新状态：是否已存在了
        if (this.stateMap == null) {
            return;
        }
        let state = this.stateMap.get(type);
        if (state == null) {
            return;
        }

        //先进入防止退出不执行 
        this._currentState = state;
        this._currentStateType = type;
        state.enter(type, paramEniter);
        //console.error("进入状态_____________________________________", PlayerStateName[this.currentStateType]);
        this._isChangingState = false;
    }

    /**
     * 能否进入状态
     */
    public canEnterState(type: number): boolean {
        let state = this.stateMap.get(type);
        if (state == null) {
            return false;
        }
        return state.canEnter();
    }

    /**
     * 能否退出状态
     */
    public canEixtState(type: number): boolean {
        let state = this.stateMap.get(type);
        if (state == null) {
            return false;
        }
        return state.canEixt();
    }

    /**
     * 退出状态
     */
    public eixtState(type: number, param?: any): boolean {
        let state = this.stateMap.get(type);
        if (state == null) {
            return false;
        }
        return state.exit(param);
    }


    public destory() {
        if (this.currentState) {
            this.currentState.exit();
            this._currentState = null;
        }
        this.stateMap.forEach(state => {
            state.onDestory();
        })
        this.stateMap.clear();
        this.stateMap = null;
    }
}