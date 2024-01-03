import { QuestStateEnum } from "../../module/quest/Config";
import { InitializeCheckerScript } from "../archtype/base/InitializeCheckScript";
import GameObject = mw.GameObject;

export interface QuestReporter {
    tryToUpdateTaskInfo(id: number, progress: number, customData?: string): void;
}

export abstract class Quest extends InitializeCheckerScript {
    @Quest.required
    private _id: number;

    private _gameObject;

    public get gameObject() {
        return this._gameObject;
    }

    public set gameObject(value: GameObject) {
        this._gameObject = value;
    }

    protected abstract get progress(): number ;

    @Quest.required
    private _status: QuestStateEnum;

    private _sender: QuestReporter;

    public get taskId() {
        return this._id;
    }

    public get status() {
        return this._status;
    }

    public set status(value: QuestStateEnum) {
        if (value === this._status) {
            return;
        }
        this._status = value;
        if (value === QuestStateEnum.Complete) {
            this.onComplete();
        }
    }

    public setUp(sender: QuestReporter, id: number, status: QuestStateEnum, customData: string = "") {
        this._sender = sender;
        this._id = id;
        this._status = status;
        this.onSerializeCustomData(customData);
        this.onStart();
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

    protected updateTaskProgress(customData: string = "") {
        this._sender.tryToUpdateTaskInfo(this._id, this.progress, customData);
    }

    /** 当任务激活时回调 */
    abstract onActivated(): void;

    /** 当任务完成时回调 */
    abstract onComplete(): void;
}