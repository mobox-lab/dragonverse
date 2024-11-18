
/*
 * @Author: shifu.huang
 * @Date: 2022-12-12 14:11:40
 * @LastEditTime: 2024-01-03 11:26:50
 * @Description: Avatar Creator Development
 */

import { GameConfig } from "../../config/GameConfig";
import { Reward } from "../../tool/Reward";
import Utils from "../../Utils";
import { TimerModuleUtils } from "../TimeModule/time";
import { EmTaskType, TaskModuleC } from "./TaskModuleC";
import { TaskModuleDataHelper } from "./TaskModuleDataHelper";

/**
 * 任务模块的服务端
 */
export class TaskModuleS extends ModuleS<TaskModuleC, TaskModuleDataHelper> {
	protected onStart(): void {
		TimerModuleUtils.addOnlineDayListener(this.clearFinishDailyTask, this);
	}

	//清空data中已经完成的日常任务
	private clearFinishDailyTask() {
		console.log('hsf111====================== s端日常任务刷新', (111))
		for (let player of Player.getAllPlayers()) {
			this.clearFinishDailyTaskByPlayer(player);
		}
	}

	/**
	 * 清空某个玩家的已完成的日常任务
	 */
	public net_clearTaskTodayIfNewDay() {
		// this.clearFinishDailyTaskByPlayer(this.currentPlayer);
		const player = this.currentPlayer;
        const data = this.currentData;
        if(!data || !player) return false;
        data.clearTaskTodayIfNewDay(player);
	}

	private clearFinishDailyTaskByPlayer(player: Player) {
		let data = this.getPlayerData(player);
		if (!data) return;
		data.finishTasks = data.finishTasks.filter(taskId => GameConfig.Task.getElement(taskId).taskType != EmTaskType.Daily);
		data.save(false);
	}

	/**
	 * 玩家完成某个任务
	 * @param taskId 完成的任务ID
	 * @returns 是否完成
	 */
	public net_finishTask(taskId: number): boolean {
		const userId = this.currentPlayer?.userId ?? '';
		const data = this.currentData;
		try {
			if(!data) return false;
			if (!data.finishTasks.includes(taskId)) {
				data.finishTasks.push(taskId);
				const cfg = GameConfig.Task.getElement(taskId);
				Utils.logP12Info("A_QuestFinish", {
					timestamp: Date.now(),
					userId,
					questid: taskId,
					questtype: cfg?.taskType, // 1主线 2日常
				})
				Reward.grantReward(this.currentPlayer, cfg.rewards, null, taskId)
				data.save(false);
				return true;
			}
			return false;
		} catch (e) {
			Utils.logP12Info("A_Error","net_finishTask error" + " userId:" + userId + " error:" + e);
			return false;
		}
	}

}