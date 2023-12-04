import { IContext } from "../../context/IContext";
import { ActionStatus } from "./ActionStatus";



export abstract class AAction<T extends IContext>  {



    private _coolDown: number = 0;

    private _startTime: number = 0;


    private _actionStatus: ActionStatus = ActionStatus.Idle;

    public get nameId() {
        return this.constructor.name;
    }


    public get elapsedTime() {


        return Date.now() - this._startTime;

    }


    public get coolDown() {

        return this._coolDown;
    }

    public set coolDown(value: number) {

        this._coolDown = Math.max(value, 0);
    }


    public get inCoolDown() {

        if (this._actionStatus === ActionStatus.Running || this._actionStatus === ActionStatus.Idle) {

            return false;
        }

        return this.elapsedTime < this._coolDown;
    }

    protected set actionStatus(value: ActionStatus) {

        this._actionStatus = value;
    }

    public get actionStatus() {

        return this._actionStatus;
    }

    public execute(context: T) {

        if (!this.canExecute()) {
            return;
        }

        if (!this.tryUpdate(context)) {
            this._startTime = Date.now();
            this.actionStatus = ActionStatus.Running;
            this.onExecuted(context);
        }
    }


    protected abstract onExecuted(context: T)
    protected abstract onUpdate(context: T)
    protected abstract onStop(context: T)

    protected endInSuccess(context: T) {

        if (this._actionStatus !== ActionStatus.Running) {
            return;
        }

        this._actionStatus = ActionStatus.Success;
        this.finalizeAction(context);
    }

    protected endInFailure(context: T) {
        if (this._actionStatus != ActionStatus.Running)
            return;

        this._actionStatus = ActionStatus.Failure;
        this.finalizeAction(context);
    }


    private canExecute(): boolean {
        if (this.inCoolDown) {
            this.actionStatus = ActionStatus.Failure;
            return false;
        }

        return true;
    }


    private tryUpdate(context: T): boolean {

        if (this._actionStatus === ActionStatus.Running) {

            this.onUpdate(context);
            return true;
        }

        return false;
    }


    private finalizeAction(context: T) {
        this.onStop(context);
    }



}