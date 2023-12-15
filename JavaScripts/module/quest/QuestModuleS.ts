import { GameConfig } from "../../config/GameConfig";
import MovementController from "../../gameplay/interactive/MovementController";
import { BagModuleS } from "../bag/BagModule";
import { QuestStateEnum } from "./Config";
import { QuestData } from "./QuestData";
import { QuestModuleC } from "./QuestModuleC";

export class QuestModuleS extends ModuleS<QuestModuleC, QuestData> {


    protected onPlayerJoined(player: mw.Player): void {

        //创建一个移动控制器
        mw.Script.spawnScript(MovementController, true).then(val => {
            val.gameObject = player.character;
        });

    }

    public net_UpdateTaskStatus(taskId: number, progress: number, customData: string): Promise<QuestStateEnum> {
        let taskInfo = this.currentData.getTaskInfo(taskId);
        if (!taskInfo) {
            return;
        }
        let taskConfig = GameConfig.Task.getElement(taskInfo.questCfgId);
        let oldState = taskInfo.status;
        if (oldState === QuestStateEnum.Complete && !taskConfig.repeat) {
            return;
        }
        let status = (progress === taskConfig.count) ? QuestStateEnum.Complete : QuestStateEnum.Running;
        if (oldState !== status && status === QuestStateEnum.Complete) {
            this.onTaskStatusComplete(taskId, this.currentPlayerId);
        }

        if (taskConfig.repeat && status === QuestStateEnum.Complete) {
            // 如果可以重复完成就再度标记成可完成
            status = QuestStateEnum.Running;
        }

        this.currentData.updateTaskInfo(taskId, progress, status, customData);

        return Promise.resolve(status);
    }


    /**
     * 下发奖励
     * @param taskId
     */
    private onTaskStatusComplete(taskId: number, playerId: number) {

        let reward = GameConfig.Task.getElement(taskId).reward;


        for (let i = 0; i < reward.length; i += 2) {
            let bagId = reward[i];
            let count = reward[i + 1];

            mwext.ModuleService.getModule(BagModuleS).addItem(playerId, bagId, count);
        }
    }
}