/** 
 * @Author       : fengqi.han
 * @Date         : 2023-11-30 11:25:34
 * @LastEditors  : fengqi.han
 * @LastEditTime : 2023-12-08 13:23:20
 * @FilePath     : \battleworld\JavaScripts\module\npc\UnitStateMachine.ts
 * @Description  : 修改描述
 */

import { IMascotNpcElement } from "../../config/MascotNpc";
import SceneUnit from "./SceneUnit";
import { EUnitState, UnitStateBase, UnitStateBlowUp, UnitStateEscape, UnitStatePath, UnitStateStun } from "./UnitState";


export class UnitStateMachine {
    /** 当前状态 */
    private _curState: UnitStateBase = null;
    /** 下一个状态 */
    private _nextState: UnitStateBase = null;
    /** 状态列表 */
    private _stateList: UnitStateBase[] = [];
    /** 场景单位脚本 */
    public unit: SceneUnit = null;

    constructor(model: Character, cfg: IMascotNpcElement, unit: SceneUnit) {
        this._stateList.push(new UnitStatePath(model, cfg, this, EUnitState.Path));
        this._stateList.push(new UnitStateEscape(model, cfg, this, EUnitState.Escape));
        this._stateList.push(new UnitStateStun(model, cfg, this, EUnitState.Stun));
        this._stateList.push(new UnitStateBlowUp(model, cfg, this, EUnitState.BlowUp));
        this.unit = unit;
        this._curState = this._stateList[0];
        this._curState.enter();
    }

    /**
     * 修改状态
     */
    public changeState(state: EUnitState, param?: any) {
        if (this._curState && this._curState.state == state) {
            return;
        }
        this._nextState = this.getState(state);
        if (this._nextState && this._nextState.canEnter()) {
            if (this._curState) {
                this._curState.exit(param);
            }
            this._curState = this._nextState;
            this._curState.enter(param);
        }
    }

    /**
     * 锁定状态,不能进入
     */
    public lockState(state: EUnitState) {
        let stateObj = this.getState(state);
        if (stateObj) {
            stateObj.canEnterState = false;
        }
    }
    /**
     * 解除锁定
     */
    public unlockState(state: EUnitState) {
        let stateObj = this.getState(state);
        if (stateObj) {
            stateObj.canEnterState = true;
        }
    }

    /**
     * 更新状态机
     */
    public update(dt: number) {
        if (this._curState) {
            this._curState.update(dt);
        }
    }

    /**
     * 获取状态脚本
     */
    public getState(state: EUnitState): UnitStateBase {
        return this._stateList.find((v) => {
            return v.state == state;
        });
    }

    /**
     * 获取当前状态
     */
    public getCurState(): EUnitState {
        return this._curState.state;
    }

    /**
     * 更新逃跑状态
     */
    public updateEscape() {
        if (!this._curState) return;
        if (this._curState.state == EUnitState.Escape) {
            this._curState.stateTime = 0;
        }
        else {
            this.changeState(EUnitState.Escape);
        }
    }

    protected onDestroy() {
        this._stateList.length = 0;
        this.unit = null;
    }
}