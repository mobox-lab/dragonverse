import { GameConfig } from "../../config/GameConfig";
import PickerController from "../../gameplay/interactive/PickerController";
import { Quest, QuestReporter } from "../../gameplay/quest/Quest";
import GToolkit from "../../util/GToolkit";
import { QuestStateEnum } from "./Config";
import { QuestData } from "./QuestData";
import { QuestModuleS } from "./QuestModuleS";
import Log4Ts from "../../depend/log4ts/Log4Ts";

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

            let go = await mw.GameObject.asyncSpawn(config.configPrefabGuid);

            let script: Quest = GToolkit.getFirstScript(go, Quest);
            if (!script) {
                Log4Ts.error(QuestModuleC, `预制体中没有绑定 Quest 脚本`);
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
    }
}