import { State } from './State';
import { StateMachine } from './StateMachine';
import { TransitionBase } from './base/TransitionBase';

enum AIState {

    Eat,

    Work,

    Sleep
}


export class EatState extends State<AIState>{


    public constructor(private owner: SimpleAI) {
        super()
    }

    public enter(): void {
        console.log("enter eat state")
    }

    public logic(): void {
        this.owner.hungry -= 1;
    }

    public exit(): void {

    }

}


export class WorkState extends State<AIState>{

    public constructor(private owner: SimpleAI) {
        super()
    }

    public enter(): void {
        console.log("enter work state")
    }

    public logic(): void {
        this.owner.hungry += 1;
        this.owner.sleep += 1;
    }

    public exit(): void {

    }

}

export class SleepState extends State<AIState>{
    public constructor(private owner: SimpleAI) {
        super()
    }

    public enter(): void {
        console.log("enter sleep state")
    }

    public logic(): void {
        this.owner.sleep -= 1;
    }

    public exit(): void {

    }
}


enum WorkAIState {

    GetEquip,

    LoadEquip,

    Do
}


export class SimpleAI {


    /**
     * 能量
     */
    public hungry: number;


    /**
     * 困意
     */
    public sleep: number;


    private _fsm = new StateMachine<null, AIState, string>();

    setUp() {
        this._fsm.addState(AIState.Eat, new EatState(this));
        this._fsm.addState(AIState.Work, new WorkState(this));
        this._fsm.addState(AIState.Sleep, new SleepState(this));
        this._fsm.setStartState(AIState.Eat);

        // 分层
        const workFsm = new StateMachine<AIState, WorkAIState, string>();

        workFsm.addState(WorkAIState.Do, new State<WorkAIState>());
        workFsm.addState(WorkAIState.LoadEquip, new State<WorkAIState>());
        workFsm.addState(WorkAIState.GetEquip, new State<WorkAIState>());

        workFsm.setStartState(WorkAIState.GetEquip);

        this._fsm.addState(AIState.Work, workFsm);

        this._fsm.addTransition(AIState.Work, AIState.Eat, (owner: TransitionBase<AIState>) => {

            return this.hungry >= 100;
        })

        this._fsm.addTransition(AIState.Work, AIState.Sleep, (owner: TransitionBase<AIState>) => {
            return this.sleep >= 100;
        })

        this._fsm.addTransitionFromAny(AIState.Work, (owner: TransitionBase<AIState>) => {
            return this.hungry <= 50 && this.sleep <= 50;
        })
        this._fsm.init();
    }

}