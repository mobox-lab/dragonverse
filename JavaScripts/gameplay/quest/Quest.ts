import { QuestStateEnum } from "../../module/quest/Config";
import { InitializeCheckerScript } from "../archtype/base/InitializeCheckScript";



interface QuestReporter {


    tryToUpdateTaskInfo(id: number, progress: number, customData?: string)
}


export abstract class Quest extends InitializeCheckerScript {


    @Quest.required
    private _id: number;

    @Quest.required
    private _progress: number;

    @Quest.required
    private _status: QuestStateEnum;

    private _sender: QuestReporter;


    public get taskId() {
        return this._id;
    }

    public get progress() {
        return this._progress;
    }

    public get status() {
        return this._status;
    }

    public setUp(sender: QuestReporter, id: number, progress: number, status: QuestStateEnum, customData: string = '') {

        this._sender = sender;
        this._id = id;
        this._progress = progress;
        this._status = status;
        this.onSerializeCustomData(customData);
    }


    protected onSerializeCustomData(customData: string) {

    }

    protected onInitialize(): void {
        if (this._status === QuestStateEnum.Running) {
            this.onActivated();
        } else if (this._status === QuestStateEnum.Complete) {
            this.onComplete();
        }
    }


    protected updateTaskProgress(progress: number, customData: string = '') {
        this._progress = progress;
        this._sender.tryToUpdateTaskInfo(this._id, progress, customData);

    }


    /** 当任务被激活时回调 */
    abstract onActivated(): void;



    /** 当任务被激活时回调 */
    abstract onComplete(): void;



}