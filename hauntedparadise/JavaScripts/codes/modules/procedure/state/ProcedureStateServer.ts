/*
 * @Author       : dal
 * @Date         : 2023-11-17 10:53:04
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-07 14:42:44
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\procedure\state\ProcedureStateServer.ts
 * @Description  : 
 */

import GameStart from "../../../GameStart";
import { TimerOnly } from "../../../utils/AsyncTool";
import { GlobalSwitch } from "../../../utils/GlobalSwitch";
import { ArchiveDataType, ArchiveHelper } from "../../archive/ArchiveHelper";
import { BuffModuleS } from "../../buff/BuffModule";
import { RouteDataHelper, RouteDataType } from "../../route/RouteData";
import { ProcedureModuleS } from "../ProcedureModuleS";
import { DiffExpIndex, GraveyardExpIndex } from "../const/ClueDefine";
import { EndType } from "../const/EmProcedureState";
import { ProcedureStateBase } from "./ProcedureState";

/** 初始化 */
export class InitProcedureStateServer extends ProcedureStateBase {

    enter: (data?: any) => void = async () => {
        ModuleService.getModule(ProcedureModuleS).net_setPlayerVisible(this.owner.pid, false);
    }
}

/** 加载中 */
export class LoadingProcedureStateServer extends ProcedureStateBase {

    enter?: (data?: any) => void = async () => {
        this.owner.server_startTimestamp = Date.now();
    };
}

/** 开始游戏 */
export class StartProcedureStateServer extends ProcedureStateBase {

    private countPlayerTimer: TimerOnly = new TimerOnly();

    private countTime: number = 0;

    enter: (data?: any) => void = async () => {
        ArchiveHelper.reqSetData(this.owner.userId, [ArchiveDataType.DEGREE], [this.owner.degree]);
        this.owner.startIntervalSave();
        let aliveDay = (await ArchiveHelper.reqGetData(this.owner.userId, this.owner.archiveID)).aliveDay;
        Event.dispatchToLocal("StartProcedureServer", this.owner.userId, aliveDay);
        // 每隔十秒存储一下游戏时间
        this.countPlayerTimer.setInterval(async () => {
            this.countTime += 1;
            if (this.countTime >= 10) {
                this.saveGameTime();
            }
        }, 1e3);
    }

    private saveGameTime() {
        // 同时保存一下经验
        // 难度倍率
        let diffExpMul = 1;
        if (GlobalSwitch.isDynamicDegree()) {
            diffExpMul = GraveyardExpIndex;
        } else {
            diffExpMul = DiffExpIndex[this.owner.degree - 1];
        }
        let exp = Number(((this.countTime / 60) * diffExpMul).toFixed(3));
        if (Number.isNaN(exp) || exp === Infinity) { return; }
        exp *= BuffModuleS.getAttr(this.owner.userId).expIndex;
        RouteDataHelper.reqSetData(this.owner.userId, GameStart.GameTheme, [RouteDataType.TotalGameTime, RouteDataType.TotalExp], [this.countTime, exp]);
        this.countTime = 0;
    }

    exit: () => void = () => {
        this.owner.endSave();
        this.countPlayerTimer.stop();
        this.saveGameTime();
    }
}

/** 结束 */
export class EndProcedureStateServer extends ProcedureStateBase {

    enter: (data?: any) => void = async (data?: any) => {
        ModuleService.getModule(ProcedureModuleS).net_setPlayerVisible(this.owner.pid, false);
        Event.dispatchToLocal("EndProcedureServer", this.owner.userId);
        // 是过关或者死亡的才删档
        // 这个data是endType，endType是Success代表通关
        if (data) {
            this.owner.countUseTime();
            ArchiveHelper.reqDeleteData(this.owner.userId, this.owner.archiveID);
            this.owner.endType = data;
        }
        // 没有数据传入的应该是返回主菜单的操作执行了
        else {
            ArchiveHelper.reqSetData(this.owner.userId, [], []);
        }
        this.owner.archiveID = -1;
    }

    exit: (nextState?: any) => void = () => {
        this.owner.server_useTime = 0;
        this.owner.endType = EndType.None;
    };
}
