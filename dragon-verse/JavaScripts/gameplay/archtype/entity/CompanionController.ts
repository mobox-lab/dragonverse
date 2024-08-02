import { State } from "../../../depend/hfsm/State";
import { StateMachine } from "../../../depend/hfsm/StateMachine";
import { CompanionState } from "./CompanionState";
import Log4Ts from "mw-log4ts";

export enum CompanionStateEnum {


    Initialize = 0,


    Follow,

    Idle,


}

/**
 * 伙伴控制器
 */
export class CompanionViewController extends StateMachine<void, CompanionStateEnum, string> {

    public context: CompanionState;

    public owner: mw.GameObject;

    public target: mw.GameObject;


    constructor() {
        super(false);
        this.addState(CompanionStateEnum.Initialize, new CompanionInitializeState());
        this.addState(CompanionStateEnum.Follow, new CompanionFollowState());
        this.addState(CompanionStateEnum.Idle, new CompanionIdleState());
        this.setStartState(CompanionStateEnum.Initialize);
    }


}


class BaseCompanionState extends State<CompanionStateEnum> {


    declare fsm: CompanionViewController;

    get context() {
        return this.fsm.context;
    }
}


class CompanionFollowState extends BaseCompanionState {


    constructor() {
        super(false);
    }

    public onEnter(): void {

        mw.Navigation.follow(this.fsm.owner, this.fsm.target, this.context.offsetNum, this.onStart, this.onFailed);
    }

    private onStart = () => {
        Log4Ts.log(CompanionFollowState, `start follow`);
    };

    private onFailed = () => {
        Log4Ts.log(CompanionFollowState, `failed follow`);
    };

    protected onExit(): void {
        mw.Navigation.stopFollow(this.fsm.owner);
    }
}


class CompanionInitializeState extends BaseCompanionState {

    constructor() {
        super(false);
    }

    public onEnter(): void {

    }

    protected onExit(): void {

    }
}

class CompanionIdleState extends BaseCompanionState {

    constructor() {
        super(false);
    }

    public onEnter(): void {

    }

    protected onExit(): void {

    }
}




