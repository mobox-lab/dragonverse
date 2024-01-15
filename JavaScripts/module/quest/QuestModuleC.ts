import { GameConfig } from "../../config/GameConfig";
import PickerController from "../../gameplay/interactive/PickerController";
import { Quest, QuestReporter } from "../../gameplay/quest/Quest";
import GToolkit from "../../util/GToolkit";
import { QuestStateEnum } from "./Config";
import { QuestData } from "./QuestData";
import { QuestModuleS } from "./QuestModuleS";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { EventDefine } from "../../const/EventDefine";
import UnifiedRoleController from "../role/UnifiedRoleController";

export class QuestModuleC extends ModuleC<QuestModuleS, QuestData> implements QuestReporter {

    private _questMap: Map<number, Quest> = new Map();

    protected onStart(): void {
        Log4Ts.log(QuestModuleC, `initialize tasks.`);

        this.initializeTasks();
    }

    private async initializeTasks() {
        let character = Player.localPlayer.character;

        for (const task of this.data) {
            Log4Ts.log(QuestModuleC, `initialize task.`, `task id: ${task.questCfgId}`);
            let config = GameConfig.Task.getElement(task.questCfgId);
            if (!config) {
                Log4Ts.warn(QuestModuleC,
                    `sub task not found.`,
                    `questCfgId: ${task.questCfgId}`);
                break;
            }

            let go = await mw.GameObject.asyncSpawn(config.questObjectGuid);

            let script: Quest = GToolkit.getFirstScript(go, Quest);
            if (!script) {
                Log4Ts.error(QuestModuleC, `预制体中没有绑定 Quest 脚本${config.name}`);
                return;
            }

            script.gameObject = character;
            script.setUp(this, task.questCfgId, task.status, task.customData);
            this._questMap.set(task.questCfgId, script);
        }
    }

    public async tryToUpdateTaskInfo(taskId: number, progress: number, customData?: string) {
        let info = this.data.getTaskInfo(taskId);
        if (!info) return;

        let config = GameConfig.Task.getElement(info.questCfgId);

        if (info.status === QuestStateEnum.Complete && !config.repeat) {
            // 已经完成了的任务，不允许再完成了
            return;
        }

        info.status = await this.server.net_UpdateTaskStatus(taskId, progress, customData);
        this._questMap.get(taskId).status = info.status;

        if (info.status === QuestStateEnum.Complete) {
            Event.dispatchToLocal(EventDefine.OnDragonQuestsComplete);
        }
    }

    /**
     * 获取元素龙任务解锁情况
     */
    public getDragonsQuestIscomplete(): { configId: number, isComplete: boolean }[] {
        let res: { configId: number, isComplete: boolean }[] = [];
        for (const task of this.data) {
            if (task.questCfgId <= 4) {
                res.push({ configId: task.questCfgId, isComplete: task.status === QuestStateEnum.Complete });
            }
        }
        return res;
    }


    /**
     * 更新小游戏分数
     */
    public updateRunningGameScore(score: number) {
        //获取龙奖励
        this.server.net_getRunningGameReward(score);
        const flag = this.data.isNewRecord(score);
        if (flag) {
            this.server.net_UpdateRunningGameScore(score);
        }
        return flag;
    }
}