import { StateMachine } from "../../../../depend/hfsm/StateMachine";
import { StateBase } from "../../../../depend/hfsm/base/StateBase";
import { CompanionState } from "../../../archtype/companion/CompanionState";
import { ActionCollection } from "../../action/base/ActionCollection";
import { ActionStatus } from "../../action/base/ActionStatus";
import { IAction } from "../../action/base/IAction";
import { IActionCollection } from "../../action/base/IActionCollection";
import { FollowAction } from "../../action/movement/DynamicFollowAction";
import { SteeringMovementAction } from "../../action/movement/SteeringMovementAction";
import { CompanionContext } from "../../context/CompanionContext";
import { CompanionStateEnum } from "./CompanionStateEnum";


export class CompanionStateRoot extends StateMachine<string, CompanionStateEnum, string> {


    public onPreStateChanged: mw.Action2<CompanionStateEnum, CompanionStateEnum> = new mw.Action2();
    public onPostedStateChanged: mw.Action1<CompanionStateEnum> = new mw.Action();

    constructor(public readonly context: CompanionContext) {
        super()

        this.addState(CompanionStateEnum.Idle, new CompanionStateIdle());
        this.addState(CompanionStateEnum.Follow, new CompanionStateFollowState());
        this.setStartState(CompanionStateEnum.Follow);
    }



    protected changeState(name: CompanionStateEnum): void {
        this.onPreStateChanged.call(this.activeState, name)
        super.changeState(name);
        this.onPostedStateChanged.call(this.activeState);
    }


    public collection(source: CompanionState): CompanionState {

        let activeState = this.currentState as BaseCompanionState;
        return activeState.collection(source);
    }


}


abstract class BaseCompanionState extends StateBase<CompanionStateEnum> implements IActionCollection {


    private _actionCollection: ActionCollection = new ActionCollection();

    declare fsm: CompanionStateRoot;


    private _currentAction: IAction;





    public logic() {


        if (this._currentAction) {
            this._currentAction.execute(this.fsm.context);

            if (this._currentAction.actionStatus === ActionStatus.Success) {

            }
        }
    }

    public collection(source: CompanionState): CompanionState {
        return source;
    }





    add(action: SteeringMovementAction): boolean {
        return this._actionCollection.add(action);
    }


    remove(actionId: string): boolean {

        return this._actionCollection.remove(actionId);
    }

    contains(actionId: string): boolean {

        return this._actionCollection.contains(actionId);
    }

    protected select() {

        let cacheArr: IAction[] = [];
        let select: IAction = null;
        for (const [k, v] of this._actionCollection) {
            if (v.coolDown) {
                select = v;
                break;
            }
            cacheArr.push(v);
        }

        if (!select) {
            cacheArr.sort((a, b) => {
                return a.coolDown - b.coolDown;
            })

            select = cacheArr[0];
        }

        this._currentAction = select;

    }

    protected abstract onActionSuccess(action: IAction): void


    protected get currentActionStatus() {
        return this._currentAction?.actionStatus;
    }

    clear(): void {
        this._actionCollection.clear();
    }

    create(actionId: string) {

    }




}


class CompanionStateFollowState extends BaseCompanionState {




    constructor() {
        super(true);
    }



    public init() {

        this.add(new FollowAction());
    }

    public enter() {

        this.select();
    }


    public exit() {

    }

    public requestExit() {

    }

    protected onActionSuccess(action: IAction): void {
    }
}



class CompanionStateIdle extends BaseCompanionState {


    constructor() {
        super(true);
    }

    public init() {

    }
    public enter() {

    }



    public exit() {

    }
    public requestExit() {

    }

    protected onActionSuccess(action: IAction): void {

    }



}





