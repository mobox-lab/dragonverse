/*
 * @Author: shifu.huang
 * @Date: 2023-07-25 18:39:09
 * @LastEditors: shifu.huang
 * @LastEditTime: 2023-12-29 15:28:38
 * @FilePath: \nevergiveup\JavaScripts\Modules\taskModule\TaskModuleDataHelper.ts
 * @Description: 修改描述
 */

import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { TimerModuleUtils } from "../TimeModule/time";
import { GameConfig } from "../../config/GameConfig";
import { EmTaskType } from "./TaskModuleC";

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

    /**
     * 初始化当前完成的主线任务
     */
    protected initDefaultData(): void {
        this.finishTasks = [];
    }

    protected onDataInit(): void {
        if(this.finishTasks == null) this.finishTasks = [];
    }

    public clearTaskTodayIfNewDay() {
        const nowTime = dayjs.utc().valueOf();
        console.log("#time clearTaskTodayIfNewDay finishTasks:" + JSON.stringify(this.finishTasks) + " lastDailyTaskRefreshTimestamp:" + this.lastDailyTaskRefreshTimestamp);
        if(this.lastDailyTaskRefreshTimestamp) {
            const preTime = this.lastDailyTaskRefreshTimestamp;
            const isNewDay = TimerModuleUtils.judgeIsNewDay(preTime, nowTime);
            if(isNewDay) {
                this.finishTasks = this.finishTasks.filter(taskId => GameConfig.Task.getElement(taskId).taskType != EmTaskType.Daily);
                this.lastDailyTaskRefreshTimestamp = nowTime;
                this.save(true);
            }
        } else {
            this.finishTasks = this.finishTasks.filter(taskId => GameConfig.Task.getElement(taskId).taskType != EmTaskType.Daily);
            this.lastDailyTaskRefreshTimestamp = nowTime;
            this.save(true);
        }
        console.log("#time clearTaskTodayIfNewDay after finishTasks:" + JSON.stringify(this.finishTasks) + " lastDailyTaskRefreshTimestamp:" + this.lastDailyTaskRefreshTimestamp);
    }
}