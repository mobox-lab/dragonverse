/** 
 * @Author       : fengqi.han
 * @Date         : 2023-11-30 10:06:15
 * @LastEditors  : fengqi.han
 * @LastEditTime : 2023-12-11 11:01:23
 * @FilePath     : \battleworld\JavaScripts\module\npc\UnitState.ts
 * @Description  : 修改描述
 */

import { GameConfig } from "../../config/GameConfig";
import { IMascotNpcElement } from "../../config/MascotNpc";
import { Globaldata } from "../../const/Globaldata";
import { Constants } from "../../tool/Constants";
import { util } from "../../tool/Utils";
import { LandModuleS } from "../LandModule/LandModuleS";
import { MotionModuleS } from "../MotionModule/MotionModuleS";
import { IFSMState } from "../PlayerModule/FSM/IFSMState";
import { PlayerManager } from "../PlayerModule/PlayerManager";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { UnitStateMachine } from "./UnitStateMachine";
import { MascotModuleS } from "./mascotNpc/MascotModuleS";

export enum EUnitState {
    /** 正常寻路 */
    Path = 1,
    /** 逃跑 */
    Escape = 2,
    /** 眩晕 */
    Stun = 3,
    /** 被击飞 */
    BlowUp = 4,
}
export abstract class UnitStateBase implements IFSMState {
    public name: string = this.constructor.name;
    /** 当前状态 */
    public state: EUnitState = null;
    /** 场景单位 */
    public model: Character = null;
    /** 配置数据 */
    public cfg: IMascotNpcElement = null;
    /** 是否在寻路 */
    public isPath: boolean = false;
    /** npc变换引用 */
    public trans: Transform = null;
    /** 状态机 */
    public machine: UnitStateMachine = null;
    /** 状态维持时间 */
    public stateTime: number = 0;
    /** 寻路失败记录 */
    private _pathFailNum: number = 0;
    /** 动效模块服务端 */
    public motionS: MotionModuleS = null;
    /** 能否进入状态 */
    public canEnterState: boolean = true;
    /** 能否退出状态 */
    public canExitState: boolean = true;

    constructor(model: Character, cfg: IMascotNpcElement, machine: UnitStateMachine, state: EUnitState) {
        this.model = model;
        this.cfg = cfg;
        this.machine = machine;
        this.state = state;
        this.motionS = ModuleService.getModule(MotionModuleS);
    }
    /**
     * 状态进入，外部调用
     * @param context 战斗实体
     */
    public enter(param?: any) {
        this.trans = this.model.worldTransform;
        this.onEnter(param);
    }
    /**
     * 退出状态外部调用
     */
    public exit(param: any) {
        this.trans = null;
        this.stateTime = 0;
        Navigation.stopNavigateTo(this.model);
        this.isPath = false;
        this._pathFailNum = 0;
        this.onExit(param);
    }
    /**
     * 能否进入
     */
    public canEnter() {
        return this.canEnterState;
    }
    /**
    * 能否退出
    */
    public canEixt() {
        return this.canExitState;
    }
    /**
     * 更新
     */
    public update(dt: number) {
        this.stateTime += dt;
        Globaldata.tmpVector = this.model.velocity;
        if (Math.pow(Globaldata.tmpVector.x, 2) + Math.pow(Globaldata.tmpVector.y, 2) < 400) {
            this.isPath = false;
        }
        this.onUpdate(dt); //子状态更新
    }
    /**
     * 寻路移动
     */
    public move(targetPos: Vector) {
        this.isPath = true;
        Navigation.navigateTo(this.model, targetPos, 20, () => {
            this.isPath = false;
            this._pathFailNum = 0;
        }, () => {
            //寻路失败
            this.isPath = false;
            this._pathFailNum++;
            if (this._pathFailNum >= 8) {
                let posArr = ModuleService.getModule(LandModuleS).noRunRandom(1);
                this.model.worldTransform.position = posArr[0];
                this._pathFailNum = 0;
            }
        })

    }
    /**
     * 子状态重写，enter之后触发
     */
    protected abstract onEnter(param?: any);
    /**
    * 子状态重写，exit之后触发
    */
    protected abstract onExit(param: any);
    /**
     * 更新，外部驱动
     */
    public abstract onUpdate(dt: number);

    /**
    * 销毁
    */
    onDestory() {
        this.model = null;
        this.machine = null;
        this.trans = null;
    }
}
/**
 * 寻路状态
 */
export class UnitStatePath extends UnitStateBase {


    public onEnter(param?: any) {
        if (this.model instanceof Character) {
            this.model.movementEnabled = true;
        }
    }
    public onExit(param?: any) {

    }
    public onUpdate(dt: number) {
        let [nearPlayer, distance] = getNearPlayerXY(this.trans.position);
        if (distance && distance <= Math.pow(this.cfg.CheckRange, 2)) {
            this.machine.changeState(EUnitState.Escape);
            return;
        }

        //寻路
        if (this.isPath) return;
        let targetPos = util.getPointByRange(this.trans.position, this.cfg.WayRange, Globaldata.npc_pathRangeX, Globaldata.npc_pathRangeY);
        this.move(targetPos);
    }
}
/**
 * 逃跑状态
 */
export class UnitStateEscape extends UnitStateBase {

    public onEnter(param?: any) {
        if (this.model instanceof Character) {
            this.machine.unit.setAttribute(Attribute.EnumAttributeType.speed, this.cfg.EscapeSpeed);
        }
    }
    public onExit(param: any) {
        if (this.model instanceof Character) {
            this.machine.unit.setAttribute(Attribute.EnumAttributeType.speed, this.cfg.DefaultSpeed);
        }
    }
    public onUpdate(dt: number) {
        let [nearPlayer, distance] = getNearPlayerXY(this.trans.position);
        if (distance && distance <= Math.pow(this.cfg.CheckRange, 2)) {
            this.stateTime = 0;
        }
        if (this.stateTime >= this.cfg.EscapeTime) {
            this.machine.changeState(EUnitState.Path);
            return;
        }
        //寻路
        if (this.isPath) return;
        let targetPos = util.getOutCircleP(this.trans.position, this.cfg.EscapeRange, Globaldata.npc_pathRangeX, Globaldata.npc_pathRangeY);
        if (targetPos == null) return;
        this.move(targetPos);
    }

}
/**
 * 眩晕状态
 */
export class UnitStateStun extends UnitStateBase {
    public onEnter(param?: any) {
        this.machine.lockState(EUnitState.Escape);
        if (this.model instanceof Character) {
            this.model.movementEnabled = false;
        }
    }
    public onExit(param: any) {
        this.machine.unlockState(EUnitState.Escape);
    }
    public onUpdate(dt: number) {
    }
}
/**
 * 被击飞状态
 */
export class UnitStateBlowUp extends UnitStateBase {
    private _blowUpKey: number = 0;
    public onEnter(param?: any) {
        let lastState = this.machine.getCurState();
        let motionCfg = GameConfig.MotionClip.getElement(Globaldata.blowUpOverMotionId);
        if (this.model instanceof Character) {
            this.model.movementEnabled = false;
        }
        this._blowUpKey = setTimeout(() => {
            this._blowUpKey = null;
            this.machine.changeState(lastState);
        }, motionCfg.frameCount * Constants.LogicFrameInterval * 1000);
        // this.motionS.invokeServerMotion(motionCfg.id, this.machine.unit.unitId, 0);
    }
    public onExit(param: any) {
        if (this._blowUpKey) {
            clearTimeout(this._blowUpKey);
            this._blowUpKey = 0;
        }
    }
    public onUpdate(dt: number) {
    }
}

/** 
 * 获取最近的玩家的距离
 */
function getNearPlayerXY(center: mw.Vector): [mw.Player | undefined, number] {
    let dis: number = null
    let p: mw.Player
    let playerMD = ModuleService.getModule(PlayerModuleS)
    if (!center) return [null, null]
    for (let player of Player.getAllPlayers()) {
        // 已死亡
        if (playerMD.isDead(player.playerId)) continue
        // 判断距离
        let loc = PlayerManager.instance.getPlayerLoc(player.playerId);
        // 容错 可能为空
        if (loc == null) {
            continue;
        }
        // let d = util.distanceNumberXY(loc.x, loc.y, centerX, centerY)
        let d = mw.Vector.squaredDistance(loc, center);
        if (d < dis || dis == null) {
            dis = d
            p = player
        }
    }
    return [p, dis]
}