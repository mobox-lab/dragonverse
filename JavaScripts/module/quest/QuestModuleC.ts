import { GameConfig } from "../../config/GameConfig";
import PickerController from "../../gameplay/interactive/PickerController";
import { Quest } from "../../gameplay/quest/Quest";
import GToolkit from "../../util/GToolkit";
import { QuestStateEnum } from "./Config";
import { QuestData } from "./QuestData";
import { QuestModuleS } from "./QuestModuleS";

export class QuestModuleC extends ModuleC<QuestModuleS, QuestData> {


    protected onStart(): void {

        this.initializeTasks();
    }


    private async initializeTasks() {

        let character = Player.localPlayer.character;
        let script = await mw.Script.spawnScript(PickerController);
        script.gameObject = character;
        for (const task of this.data) {

            let config = GameConfig.Task.getElement(task.questId);

            let go = await mw.GameObject.asyncSpawn(config.script);

            let script: Quest = GToolkit.getFirstScript(go, Quest);

            if (!script) {
                throw new Error("预制体中没有绑定Quest脚本");
            }
            script.gameObject = character;
            script.setUp(this, task.questId, task.progress, task.status, task.customData);
        }

    }


    public tryToUpdateTaskInfo(taskId: number, progress: number, customData?: string) {

        let info = this.data.getTaskInfo(taskId);

        if (!info) {
            return;
        }

        let config = GameConfig.Task.getElement(info.questCfgId);

        if (info.status === QuestStateEnum.Complete && !config.repeat) {

            // 已经完成了的任务，不允许再完成了
            return;
        }

        this.server.net_UpdateTaskStatus(taskId, progress, customData);
    }


}