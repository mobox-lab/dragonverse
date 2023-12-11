import { GameConfig } from "../../config/GameConfig";
import { QuestStateEnum } from "./Config";
import { QuestData } from "./QuestData";
import { QuestModuleC } from "./QuestModuleC";

export class QuestModuleS extends ModuleS<QuestModuleC, QuestData>{



    public net_UpdateTaskStatus(taskId: number, progress: number, customData: string) {
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
            this.onTaskStatusComplete(taskId);
        }

        if (taskConfig.repeat && status === QuestStateEnum.Complete) {

            // 如果可以重复完成就再度标记成可完成
            status = QuestStateEnum.Running;
        }

        this.currentData.updateTaskInfo(taskId, progress, status, customData);


        return status;



    }


    /**
     * 下发奖励
     * @param taskId 
     */
    private onTaskStatusComplete(taskId: number) {

    }
}