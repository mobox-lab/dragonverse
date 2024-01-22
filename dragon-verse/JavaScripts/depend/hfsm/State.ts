import { StateBase } from './base/StateBase';

export type CanExitFunc<TStateId> = (arg: State<TStateId>) => boolean;
export type StateAction<T> = (arg: T) => any;
export class State<TStateId> extends StateBase<TStateId>{
    public timer: number;

    private _onEnter: StateAction<State<TStateId>>

    private _onLogic: StateAction<State<TStateId>>

    private _onExit: StateAction<State<TStateId>>

    private _canExit: CanExitFunc<TStateId>

    public constructor(
        onEnter: StateAction<State<TStateId>>,
        onLogic?: StateAction<State<TStateId>>,
        onExit?: StateAction<State<TStateId>>,
        canExit?: CanExitFunc<TStateId>,

        needsExitTime?);

    public constructor(needsExitTime?);

    public constructor(
        onEnter: StateAction<State<TStateId>> | boolean,
        onLogic?: StateAction<State<TStateId>>,
        onExit?: StateAction<State<TStateId>>,
        canExit?: CanExitFunc<TStateId>,
        needsExitTime = false) {
        super(typeof (onEnter) === "boolean" ? onEnter : needsExitTime);
        if (typeof (onEnter) !== "boolean") {
            this._onEnter = onEnter
        }
        this._onLogic = onLogic;
        this._onExit = onExit;
        this._canExit = canExit;

    }


    public init() {

    }

    public enter() {
        this.timer = Date.now();
        this._onEnter?.call(this, this);
        this.onEnter();
    }

    public logic() {
        this._onLogic?.call(this, this);
        this.onLogic();
    }

    public exit() {
        this._onExit?.call(this, this);
        this.onExit();
    }

    public requestExit() {
        if (!this.needsExitTimes || this._canExit?.call(this, this)) {
            this.fsm.stateCanExit();
        }
    }


    protected onEnter() { };

    protected onExit() { };

    protected onLogic() { };


    public toString() {
        return `${this.name}`
    }

}