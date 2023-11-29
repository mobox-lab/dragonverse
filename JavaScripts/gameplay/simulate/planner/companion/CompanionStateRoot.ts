import { StateMachine } from "../../../../depend/hfsm/StateMachine";
import { StateBase } from "../../../../depend/hfsm/base/StateBase";
import { CompanionState } from "../../../archtype/companion/CompanionState";
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


abstract class BaseCompanionState extends StateBase<CompanionStateEnum> {

    declare fsm: CompanionStateRoot;

    public collection(source: CompanionState): CompanionState {
        return source;
    }

}


class CompanionStateFollowState extends BaseCompanionState {





    constructor() {
        super(true);
    }

    public init() {

    }





    public enter() {


    }


    public logic() {

    }


    public exit() {

    }

    public requestExit() {

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

    public logic() {

    }

    public exit() {

    }
    public requestExit() {

    }

}


class CompanionStateFollow extends BaseCompanionState {



    constructor() {
        super(true);
    }

    public init() {

    }
    public enter() {

    }
    public logic() {
    }

    public exit() {
    }

    public requestExit() {
    }


}


