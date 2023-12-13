import { GameConfig } from "../../config/GameConfig";
import { QuestStateEnum } from "./Config";


class QuestProgressInfo {
    /**任务id */
    public questId: number = 0;

    public questCfgId: number = 0;

    public progress: number = 0;

    public status: QuestStateEnum = QuestStateEnum.Running;

    public customData: string = "";
}


export class QuestData extends mwext.Subdata implements Iterable<QuestProgressInfo> {
    public static QuestUnitId = 1;

    @Decorator.persistence()
    private _questProgressInfo: QuestProgressInfo[] = [];

    protected initDefaultData(): void {
        const tasks = GameConfig.Task.getAllElement();
        for (const task of tasks) {
            this._questProgressInfo.push({
                questId: QuestData.QuestUnitId++,
                questCfgId: task.id,
                progress: 0,
                status: QuestStateEnum.Running,
                customData: "",
            });
        }
    }

    /**
     * 更新任务进度
     * @param taskId 任务id
     * @param progress 进度
     * @param status 状态
     * @param customData 自定义数据
     */
    public updateTaskInfo(taskId: number, progress: number, status: QuestStateEnum = QuestStateEnum.Running, customData: string = "") {
        const taskInfo = this.getTaskInfo(taskId);

        if (taskInfo) {
            taskInfo.progress = progress;
            taskInfo.status = status;
        }
        if (customData) {
            taskInfo.customData = customData;
        }
        this.save(false);
    }


    public getTaskInfo(taskId: number) {
        const taskInfo = this._questProgressInfo.find((value) => {
            return value.questId === taskId;
        });
        return taskInfo;
    }


    [Symbol.iterator](): Iterator<QuestProgressInfo, any, undefined> {
        return this._questProgressInfo[Symbol.iterator]();
    }
}