/*
 * @Author: shifu.huang
 * @Date: 2023-07-25 18:39:09
 * @LastEditors: shifu.huang
 * @LastEditTime: 2023-12-29 15:28:38
 * @FilePath: \nevergiveup\JavaScripts\Modules\taskModule\TaskModuleDataHelper.ts
 * @Description: 修改描述
 */

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { TimerModuleUtils } from "../TimeModule/time";
import { GameConfig } from "../../config/GameConfig";
import { EmTaskType } from "./TaskModuleC";
import TalentModuleS from "../talent/TalentModuleS";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import Utils from "../../Utils";

dayjs.extend(utc);

/**
 * 记录了玩家完成的主线任务
 */
export class TaskModuleDataHelper extends Subdata {
    /**当前完成的主线任务id */
    @Decorator.persistence()
    finishTasks: number[];

    /** 日常任务上次刷新时间戳 每天刷新 */
    @Decorator.persistence()
    public lastDailyTaskRefreshTimestamp: number | null = null;

    @Decorator.persistence()
    finishTaskRecords: { time: number; taskId: number; taskType: number; points: number }[];

    @Decorator.persistence()
    totalPoints: number;

    /**
     * 初始化当前完成的主线任务
     */
    protected initDefaultData(): void {
        this.finishTasks = [];
        this.finishTaskRecords = [];
        this.totalPoints = 0;
    }

    protected onDataInit(): void {
        if (this.finishTasks == null) this.finishTasks = [];
        if (this.finishTaskRecords == null) this.finishTaskRecords = [];
        if (this.totalPoints == null) this.totalPoints = 0;
    }

    public clearAllDaily(player: Player, nowTime: number) {
        if (!player) return;
        console.log("#time clearAllDaily player userId:" + player.userId + " nowTime:" + nowTime);
        ModuleService.getModule(TalentModuleS)?.clearDailyCountByPlayer(player);
        ModuleService.getModule(PlayerModuleS)?.clearDailyCountByPlayer(player);
        this.finishTasks = this.finishTasks.filter(
            (taskId) => GameConfig.Task.getElement(taskId).taskType != EmTaskType.Daily
        );
        this.lastDailyTaskRefreshTimestamp = nowTime;
        console.log(
            "#time clearTaskTodayIfNewDay after finishTasks:" +
                JSON.stringify(this.finishTasks) +
                " lastDailyTaskRefreshTimestamp:" +
                this.lastDailyTaskRefreshTimestamp
        );
        this.save(true);
    }

    public clearTaskTodayIfNewDay(player: Player) {
        const nowTime = dayjs.utc().valueOf();
        console.log(
            "#time clearTaskTodayIfNewDay finishTasks:" +
                JSON.stringify(this.finishTasks) +
                " lastDailyTaskRefreshTimestamp:" +
                this.lastDailyTaskRefreshTimestamp
        );
        if (this.lastDailyTaskRefreshTimestamp) {
            const preTime = this.lastDailyTaskRefreshTimestamp;
            const isNewDay = TimerModuleUtils.judgeIsNewDay(preTime, nowTime);
            console.log("#debug judgeIsNewDay isNewDay:", isNewDay);
            if (isNewDay) {
                this.clearAllDaily(player, nowTime);
                Utils.logP12Info("A_refreshDaily", {
                    isNewDay: true,
                    userId: player.userId,
                    preTime: preTime,
                    nowTime: nowTime,
                });
                return true;
            }
            return false;
        }
        Utils.logP12Info("A_refreshDaily", {
            isNewDay: false,
            userId: player.userId,
            nowTime: nowTime,
        });
        this.clearAllDaily(player, nowTime);
        return true;
    }
}
