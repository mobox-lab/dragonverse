/*
 * @Author: shifu.huang
 * @Date: 2022-12-12 14:11:33
 * @LastEditTime: 2024-01-15 10:03:54
 * @Description: Avatar Creator Development
 */

import { GameConfig } from "../../config/GameConfig";
import { Task } from "./Task";
import { TaskModuleDataHelper } from "./TaskModuleDataHelper";
import { TaskModuleS } from "./TaskModuleS";
import UI_TaskMain from "./ui/UI_TaskMain";
import LobbyUI from "../../UI/LobbyUI";
import { EmTaskEvent, ItemType } from "../../tool/Enum";
import { TimerModuleUtils } from "../TimeModule/time";
import { MGSTool } from "../../tool/MGSTool";
import { Reward } from "../../tool/Reward";
import Utils from "../../Utils";
import { GameManager } from "../../GameManager";
import { addGMCommand } from "mw-god-mod";
import Gtk from "gtoolkit";
import { SoundUtil } from "../../tool/SoundUtil";

/**任务类型 */
export enum EmTaskWay {
    /**通过某关卡id */
    PassLevel = 1,
    /**解锁科技树某id科技 */
    UnlockTech = 2,
    /**解锁多少个塔 */
    UnlockTower = 3,
    /**副本获得多少星星 */
    GainStar = 4,
    /**游玩几局游戏 */
    PlayCount = 5,
    /**击败多少只怪物 */
    KillCount = 6,
    /**完美通过某关卡id */
    PerfectPassLevel = 7,
    /**完美游玩几局游戏 */
    PerfectPlayCount = 8,
    /**部署光塔次数 */
    LightTowerCount = 9,
    /**部署暗塔次数 */
    DarkTowerCount = 10,
    /**部署水塔次数 */
    WaterTowerCount = 11,
    /**部署火塔次数 */
    FireTowerCount = 12,
    /**部署木塔次数 */
    WoodTowerCount = 13,
    /**部署土塔次数 */
    EarthTowerCount = 14,
    /**部署土塔次数 */
    UserLevel = 15,
    /**无尽模式的波次 */
    InfinityWaveTimes = 16,
    /**升级lv3 次数 */
    LevelThreeCount = 17,
    /**击败多少只复原力怪物  */
    KillHealCount = 18,
    /**击败多少只狂暴怪物 */
    KillBerserkCount = 19,
    /**击败多少只飞行怪物 */
    KillFlyCount = 20,
    /**击败多少只隐身怪物 */
    KillStealthCount = 21,
    /**挑战无尽关卡的次数 */
    InfinityGameTimes = 22,
    /**无尽关卡的boss击杀次数 */
    InfinityBossCount = 23,
    /**升级防御塔的次数 */
    TowerLevelUpCount = 24,
    /**日常解锁一次塔 */
    UnlockTowerDaily = 25,
    /**天赋总解锁数量 */
    TalentCount = 26,
    /** 人物完成一次升级 */
    LevelUp = 27,
    /**终极天赋物理 */
    TalentUlti01 = 1047,
    /**终极天赋魔法 */
    TalentUlti02 = 1048,
    /**终极天赋耐久 */
    TalentUlti03 = 1049,
}

/**任务状态 */
export enum EmTaskState {
    /**待领取奖励 */
    Reward = 1,
    /**正在做 */
    Doing = 2,
    /**未激活 */
    Lock = 3,
    /**任务完成 */
    Finish = 4,
}

export enum EmTaskType {
    Main = 1,
    Daily = 2,
}

/**
 * 任务模块客户端，处理玩家的任务相关逻辑
 */
export class TaskModuleC extends ModuleC<TaskModuleS, TaskModuleDataHelper> {
    /**任务map */
    private _tasks: Map<number, Task> = new Map();

    /**
     * 获取任务的map
     */
    public get task(): Map<number, Task> {
        return this._tasks;
    }

    /**
     * 获取完成的任务
     */
    public get finishTasks(): number[] {
        return this.data.finishTasks;
    }

    protected onStart(): void {
        TimerModuleUtils.addOnlineDayListener(() => this.clearFinishDailyTask(false), this);
        TimerModuleUtils.addLoginDayListener(() => this.clearFinishDailyTask(true), this);
    }

    /**
     * 初始化任务记录的map
     */
    protected onEnterScene(): void {
        this.initTask();
    }

    //清空data中已经完成的日常任务
    private clearFinishDailyTask(isSave: boolean) {
        console.log("hsf111====================== C端日常任务刷新", isSave);
        // setTimeout(() => {//可能出现的情况，服务器还没就绪的时候请求，有概率报错https://pandora.233leyuan.com/crashAnalysis/exceptionDetails?app_name=com.meta.box&start_time=1704816000&end_time=1704956700&request_id=1745342006802169857&requestIdDetail=1745342130244730881&kindIndex=0
        //     Utils.log2FeiShu("C端日常任务刷新" + Player?.localPlayer?.userId + "hsf" + GameManager?.playerName);
        // }, 3000)
        TimeUtil.delayExecute(() => {
            //清空已经完成的任务
            this.data.finishTasks = this.data.finishTasks.filter(
                (taskId) => GameConfig.Task.getElement(taskId).taskType != EmTaskType.Daily
            );
            isSave && this.server.net_clearFinishDailyTaskByPlayer();
            //初始化主线任务
            const allCfg = GameConfig.Task.getAllElement();
            allCfg.forEach((element) => {
                if (element.taskType != EmTaskType.Daily) return;
                const id = element.id;
                this._tasks.has(id) && this._tasks.delete(id);
                let task = new Task(id);
                this._tasks.set(id, task);
            });
            this.checkRedPoint();
        }, 1);
    }

    /**
     * 判断一个任务是否已经完成
     * @param taskId
     * @returns
     */
    public judgeFinish(taskId: number) {
        return this.data.finishTasks.includes(taskId);
    }

    /**
     * 初始化主线任务和相关UI
     */
    public initTask() {
        //初始化主线任务
        const allCfg = GameConfig.Task.getAllElement();
        // const finishTaskList = this.data.mainTasks;
        // const finishTask: Map<number, number> = new Map(finishTaskList.map((value, index) => [value, index]));
        allCfg.forEach((element) => {
            const id = element.id;
            let task = new Task(id);
            this._tasks.set(id, task);
        });
    }

    /**
     * 检测是否需要红点
     */
    public checkRedPoint() {
        let showFlag = false;
        let isMainTask = false; // 是否为主线任务
        for (let [key, value] of this._tasks) {
            if (value.taskState == EmTaskState.Reward) {
                if (value?.type == EmTaskType.Main) isMainTask = true;
                showFlag = true;
                break;
            }
        }
        Gtk.trySetVisibility(
            mw.UIService.getUI(LobbyUI).mImage_hotpoint,
            showFlag ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Collapsed
        );
        Gtk.trySetVisibility(
            mw.UIService.getUI(UI_TaskMain).mImage_hotpoint_1,
            showFlag && isMainTask ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Collapsed
        ); // 主线红点
        Gtk.trySetVisibility(
            mw.UIService.getUI(UI_TaskMain).mImage_hotpoint_2,
            showFlag && !isMainTask ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Collapsed
        ); // 日常红点
    }

    /**
     * 通过类型获取任务
     * @param type 任务类型
     * @returns 所要的任务列表
     */
    public getTasksByType(type: EmTaskType): Task[] {
        let arr: Task[] = [];
        this._tasks.forEach((value, key) => {
            if (value.type == type) {
                arr.push(value);
            }
        });
        return arr;
    }

    /**
     * 刷新主线任务的UI
     */
    public refreshUI() {
        let arr: Task[] = [null, null];
        this._tasks.forEach((value, key) => {
            if (value.taskState == EmTaskState.Doing || value.taskState == EmTaskState.Reward) {
                if (value.type <= arr.length) {
                    if (arr[value.type] == null) {
                        arr[value.type] = value;
                    }
                }
            }
        });
        if (UIService.getUI(UI_TaskMain).visible) {
            UIService.getUI(UI_TaskMain).refresh(true);
        }
    }

    /**
     * 玩家完成某个任务存档
     * @param taskId 完成的任务ID
     * @returns
     */
    public async finishTask(taskId: number) {
        const flag = await this.server.net_finishTask(taskId);
        if (!flag) return false;
        this.data.finishTasks.push(taskId);
        if (this._tasks.get(taskId)) {
            this._tasks.get(taskId).taskState = EmTaskState.Finish;
        }
        return true;
    }

    /**
     * 任务完成后的奖励和提示
     * @param task 任务
     * @returns 是否完成
     */
    async taskFinishAction(task: Task): Promise<boolean> {
        if (task.taskState != EmTaskState.Reward) return false;
        const taskId = task.taskID;
        if (this.data.finishTasks.includes(taskId)) return true;
        if (await this.finishTask(taskId)) {
            //服务器验证
            SoundUtil.PlaySoundById(2013);
            console.log("hsf====================== 领取奖励", JSON.stringify(taskId));
            Event.dispatchToLocal(EmTaskEvent.TaskFinish, taskId);
            this.refreshUI();
            return true;
        }
        return false;
    }
}

/**
 * GM 完成任务(输入ID
 */
addGMCommand(
    "完成任务(输入ID",
    "string",
    (value: string) => {
        ModuleService.getModule(TaskModuleC).finishTask(Number(value));
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "玩家"
);
