import { GameConfig } from "../../config/GameConfig";
import PickerController from "../../gameplay/interactive/PickerController";
import { Quest, QuestReporter } from "../../gameplay/quest/Quest";
import GToolkit from "../../util/GToolkit";
import { QuestStateEnum } from "./Config";
import { QuestData } from "./QuestData";
import { QuestModuleS } from "./QuestModuleS";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { EventDefine } from "../../const/EventDefine";

export class QuestModuleC extends ModuleC<QuestModuleS, QuestData> implements QuestReporter {

    private _questMap: Map<number, Quest> = new Map();

    protected onStart(): void {

        this.initializeTasks();
    }

    private async initializeTasks() {
        let character = Player.localPlayer.character;
        let script = await mw.Script.spawnScript(PickerController);
        script.gameObject = character;
        for (const task of this.data) {
            let config = GameConfig.Task.getElement(task.questId);

            if (!config) {
                Log4Ts.warn(QuestModuleC,
                    `sub task not found.`,
                    `questId: ${task.questId}`);
                break;
            }

            let go = await mw.GameObject.asyncSpawn(config.questObjectGuid);

            let script: Quest = GToolkit.getFirstScript(go, Quest);
            if (!script) {
                Log4Ts.error(QuestModuleC, `预制体中没有绑定 Quest 脚本${config.name}`);
                return;
            }

            script.gameObject = character;
            script.setUp(this, task.questId, task.status, task.customData);
            this._questMap.set(task.questId, script);
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
                res.push({configId: task.questCfgId, isComplete: task.status === QuestStateEnum.Complete});
            }
        }
        return res;
    }


    /**
     * 更新小游戏分数
     */
    public updateRunningGameScore(score: number) {
        const flag = this.data.updateRunningGameScore(score);
        if (flag) {
            this.server.net_UpdateRunningGameScore(score);
        }
        return flag;
    }
}