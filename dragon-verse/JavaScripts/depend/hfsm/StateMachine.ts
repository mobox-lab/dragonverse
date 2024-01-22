import { CanExitFunc, State, StateAction } from './State';
import { Transition } from './Transition';
import { IStateMachine } from './base/IStateMachine';
import { ITriggerable } from './base/ITriggerable';
import { StateBase } from './base/StateBase';
import { TransitionBase } from './base/TransitionBase';
import { ExceptionFormatter } from './exceptions/ExceptionFormatter';
import { StateMachineNotInitializedException } from './exceptions/StateMachineNotInitializedException';
import { StateNotFoundException } from './exceptions/StateNotFoundException';

export type TransitionCondition<TStateId> = (args: TransitionBase<TStateId>) => boolean;

function is<T>(o: unknown, method: string): o is T {
    if (!o) {
        return false;
    }
    return method in (o as any);
}
const noTransitions: [] = [];

const noTriggerTransitions = new Map();

/**
 * 状态机实例
 */

export class StateMachine<TOwnId = string, TStateId = string, TEvent = string> extends StateBase<TOwnId> implements ITriggerable<TEvent>, IStateMachine<TStateId> {




    private _startState = { hasState: false, state: null };

    private _pendingState = { isPending: false, state: null };


    private _nameToStateBundle: Map<TStateId, StateBundle<TStateId, TEvent>> = new Map();

    private _activeState: StateBase<TStateId> = null;

    private _activeTransitions: TransitionBase<TStateId>[] = null

    private _activeTriggerTransitions: Map<TEvent, TransitionBase<TStateId>[]> = null

    private _transitionsFromAny: TransitionBase<TStateId>[] = [];

    private _triggerTransitionsFromAny: Map<TEvent, TransitionBase<TStateId>[]> = new Map();

    public constructor(needsExitTimes = true) {
        super(needsExitTimes);
    }



    private get isRootFsm(): boolean {
        return !this.fsm;
    }

    public get currentState() {

        return this._activeState;
    }

    public get activeState() {
        return this.currentState ? this.currentState.name : undefined;
    }



    /**
     * 通知状态机可以执行退出了，
     * 如果有个状态正在等待切换，会开始切换到这个状态
     */
    public stateCanExit() {
        const { _pendingState: pendingState } = this;
        if (pendingState.isPending) {
            this.changeState(pendingState.state);
            pendingState.isPending = false;
            pendingState.state = null;
        }
        this.fsm?.stateCanExit();
    }

    /**
     * 如果有当前状态，请求让当前状态退出
     * 否则直接退出
     */
    public requestExit() {
        if (this.currentState.needsExitTimes) {
            this.currentState.requestExit();
            return;
        }
        this.fsm?.stateCanExit();
    }

    /**
     * 请求切换状态
     * @param name 要切换的状态名
     * @param forceInstantly 是否立即强制切换 
     */
    public requestStateChange(name: TStateId, forceInstantly: boolean) {
        if (!this.currentState?.needsExitTimes || forceInstantly) {
            this.changeState(name);
        } else {
            this._pendingState.state = name;
            this._pendingState.isPending = true;
            this.currentState.requestExit();
        }
    }


    /**
     * 设置初始状态
     * @param name 初始状态名
     */
    public setStartState(name: TStateId) {
        this._startState.state = name;
        this._startState.hasState = true;
    }

    /**
     * 初始化
     * @returns 
     */
    public init() {
        if (!this.isRootFsm) {
            return;
        }
        this.enter();
    }

    /**
     * 状态机作为状态的生命周期
     */
    public enter() {
        if (!this._startState.hasState) {
            throw new Error(
                ExceptionFormatter.format(
                    'Running OnEnter of the state machine.',
                    `No start state is selected. 
                        'The state machine needs at least one state to function properly.`,
                    `Make sure that there is at least one state in the state machine 
                         before running Init() or OnEnter() by calling fsm.AddState(...).`
                )
            );
        }

        this.changeState(this._startState.state);
        this._transitionsFromAny.forEach((value) => {
            value.enter();
        });
        this._triggerTransitionsFromAny.forEach((transitions) => {
            transitions.forEach((value) => {
                value.enter();
            });
        });
    }

    /**
     * 状态机作为状态的生命周期
     */
    public logic() {
        if (!this.currentState) {
            throw new StateMachineNotInitializedException('running logic');
        }
        const { _transitionsFromAny: transitionsFromAny, _activeTransitions: activeTransitions } = this;
        let length = transitionsFromAny.length;

        for (let i = 0; i < length; i++) {
            const transition = transitionsFromAny[i];
            if (transition.to === this.currentState.name) {
                continue;
            }
            if (this.tryTransition(transition)) {
                break;
            }
        }


        length = activeTransitions.length;
        for (let i = 0; i < length; i++) {
            const transition = activeTransitions[i];

            if (this.tryTransition(transition)) {
                break;
            }
        }


        this.currentState.logic();

    }

    public exit() {
        if (this.currentState) {
            this.currentState.exit();
            this._activeState = null;
        }
    }

    /**
     * 添加状态
     * @param name 状态标识
     * @param state 状态的实例
     */
    public addState(name: TStateId, state: StateBase<TStateId>);

    /**
     * 添加状态
     * @param name 状态标识 
     * @param onEnter 状态的onEnter回调
     * @param canExit 状态的canExit回调
     * @param onLogic 状态的logic回调
     * @param onExit 状态的退出回调
     * @param needsExitTime 
     */
    public addState(
        name: TStateId,
        onEnter: StateAction<State<TStateId>>,
        canExit: CanExitFunc<TStateId>,
        onLogic?: StateAction<State<TStateId>>,
        onExit?: StateAction<State<TStateId>>,
        needsExitTime?: boolean,
    )

    public addState(
        name: TStateId,
        state: StateBase<TStateId> | StateAction<State<TStateId>> | undefined,
        onLogic?: StateAction<State<TStateId>>,
        onExit?: StateAction<State<TStateId>>,
        canExit?: CanExitFunc<TStateId>,
        needsExitTime?: boolean) {

        if (state instanceof StateBase) {
            state.fsm = this;
            state.name = name;
            state.init();
            const bundle = this.getOrCreateStateBundle(name);
            bundle.state = state;
            return state;
        } else {

            this.addState(name, new State<TStateId>(state, onLogic, onExit, canExit, needsExitTime));
        }

    }


    /**
     * 添加转换条件
     * @param transition 
     */
    public addTransition(transition: TransitionBase<TStateId>);

    /**
     * 添加一个转换条件
     * @param from 转换条件来源
     * @param to 转换条件目标
     * @param condition 切换时机
     * @param forceInstantly 是否立即切换
     */
    public addTransition(
        from: TStateId,
        to: TStateId,
        condition?: TransitionCondition<TStateId>,
        forceInstantly?: boolean)


    public addTransition(
        transition: TransitionBase<TStateId> | TStateId,
        to?: TStateId,
        condition: TransitionCondition<TStateId> = null,
        forceInstantly = false) {
        if (transition instanceof TransitionBase) {
            this.initTransition(transition);
            if (!transition.from) {
                this.addTransitionFromAny(transition);
                return;
            }
            const bundle = this.getOrCreateStateBundle(transition.from);
            bundle.addTransition(transition);
        } else {
            this.addTransition(this.createOptimizedTransition(transition, to, condition, forceInstantly));
        }

    }

    /**
     * 添加一个任意来源的转换条件,任意状态下都会检测这个转换条件的合法性
     * @param transition 
     */
    public addTransitionFromAny(transition: TransitionBase<TStateId>);

    /**
     * 添加一个任意来源的转换条件,任意状态下都会检测这个转换条件的合法性
     * @param to 要切换的目标
     * @param condition 条件
     * @param forceInstantly 是否理解切换 
     */
    public addTransitionFromAny(to: TStateId, condition?: TransitionCondition<TStateId>, forceInstantly?: boolean)

    public addTransitionFromAny(transition: TransitionBase<TStateId> | TStateId, condition: TransitionCondition<TStateId> = null, forceInstantly = false) {
        if (transition instanceof TransitionBase) {
            this.initTransition(transition);
            this._transitionsFromAny.push(transition);
        } else {
            this.addTransitionFromAny(this.createOptimizedTransition(null, transition, condition, forceInstantly));
        }

    }

    /**
     * 添加一个触发式的转换条件
     * @param trigger 事件
     * @param transition 转换
     */
    public addTriggerTransition(trigger: TEvent, transition: TransitionBase<TStateId>);

    /**
     * 添加一个触发式的转换条件
     * @param trigger 事件
     * @param from 转换来源
     * @param to 转换目标
     * @param condition 条件
     * @param forceInstantly 是否立即切换 
     */
    public addTriggerTransition(trigger: TEvent, from: TStateId, to: TStateId, condition?: TransitionCondition<TStateId>, forceInstantly?: boolean);



    public addTriggerTransition(trigger: TEvent, transition: TransitionBase<TStateId> | TStateId, to?: TStateId, condition?: TransitionCondition<TStateId>, forceInstantly?: boolean) {
        if (transition instanceof TransitionBase) {
            this.initTransition(transition);
            const bundle = this.getOrCreateStateBundle(transition.from);
            bundle.addTriggerTransition(trigger, transition);
            return;
        }
        this.addTriggerTransition(trigger, this.createOptimizedTransition(transition, to, condition, forceInstantly));

    }

    /**
     * 添加一个从任意状态切换的事件转换
     * @param trigger 事件
     * @param to 要切换的状态
     * @param condition 条件
     * @param forceInstantly 是否立即切换 
     */
    public addTriggerTransitionFromAny(trigger: TEvent, to: TStateId, condition?: TransitionCondition<TStateId>, forceInstantly?: boolean);

    /**
     * 添加一个从任意状态切换的事件转换
     * @param trigger 事件
     * @param transition 转换条件
     */
    public addTriggerTransitionFromAny(trigger: TEvent, transition: TransitionBase<TStateId>);

    public addTriggerTransitionFromAny(trigger: TEvent, transition: TransitionBase<TStateId> | TStateId, condition?: TransitionCondition<TStateId>, forceInstantly?: boolean) {
        if (transition instanceof TransitionBase) {
            this.initTransition(transition);

            if (!this._triggerTransitionsFromAny.has(trigger)) {
                this._triggerTransitionsFromAny.set(trigger, [])
            }
            this._triggerTransitionsFromAny.get(trigger).push(transition);

            return;
        }
        this.addTriggerTransitionFromAny(trigger, this.createOptimizedTransition(null, transition, condition, forceInstantly));
    }



    /**
     * 触发事件，如果当前激活状态同样可以被触发事件，那么会同时触发当前激活类的事件
     * @param trigger 
     * @returns 
     */
    public trigger(trigger: TEvent) {
        if (!this._activeState) {
            // 状态机没被激活
            return;
        }
        if (this.tryTrigger(trigger)) {
            return;
        }
        const state = this.currentState;
        if (is<ITriggerable<TEvent>>(state, "trigger")) {
            state.trigger(trigger);
        }
    }

    /**
     * 触发事件 但是不会触发state的事件，只在当前状态机内触发
     * @param trigger 
     */
    public triggerLocally(trigger: TEvent) {
        this.tryTrigger(trigger);
    }

    /**
     * 通过状态标识获取指定状态
     * @param name 
     * @returns 
     */
    public getState(name: TStateId): StateBase<TStateId> {
        const bundle = this._nameToStateBundle.get(name);
        if (!bundle || !bundle.state) {
            throw new StateNotFoundException<TStateId>(name, 'Getting a state');
        }
        return bundle.state;
    }

    /**
     * 通过状态标识获取状态机
     * @param name 
     * @returns 
     */
    public get<T extends StateMachine<unknown, unknown, unknown>>(name: TStateId): T {
        const state = this.getState(name);
        if (state instanceof StateMachine) {
            return state as T;
        }
        throw new Error(
            ExceptionFormatter.format(
                'Getting a nested state machine with the indexer',
                'The selected state is not a state machine.',
                `This method is only there for quickly accessing a nested state machine.
                    To get the selected state, use GetState(${name}).`
            )
        );
    }



    protected changeState(name: TStateId) {
        this.currentState?.exit();
        const bundle: StateBundle<TStateId, TEvent> = this._nameToStateBundle.get(name);
        if (!bundle || !bundle.state) {
            throw new StateNotFoundException(name, 'Switching states');
        }
        this._activeTransitions = bundle.transitions ?? noTransitions;
        this._activeTriggerTransitions = bundle.triggerToTransitions ?? noTriggerTransitions;

        this._activeState = bundle.state;

        this.currentState.enter();

        this._activeTransitions.forEach((value) => {
            value.enter();
        });

        this._activeTriggerTransitions.forEach((transitions) => {
            transitions.forEach((value) => {
                value.enter();
            });
        });


    }

    protected tryTransition(transition: TransitionBase<TStateId>) {
        if (!transition.shouldTransition()) {
            return false;
        }
        this.requestStateChange(transition.to, transition.forceInstantly);
        return true;
    }

    private getOrCreateStateBundle(name: TStateId) {
        let bundle = this._nameToStateBundle.get(name);
        if (!bundle) {
            bundle = new StateBundle();
            this._nameToStateBundle.set(name, bundle);
        }
        return bundle;
    }

    private initTransition(transition: TransitionBase<TStateId>) {
        transition.fsm = this;
        transition.init();
    }

    private tryTrigger(trigger: TEvent) {


        let triggerTransitions = this._triggerTransitionsFromAny.get(trigger);
        if (triggerTransitions) {
            const length = triggerTransitions.length;
            for (let i = 0; i < length; i++) {
                const transition = triggerTransitions[i];
                if (transition.to === this.activeState) {
                    continue;
                }
                if (this.tryTransition(transition)) {
                    return true;
                }
            }
        }
        triggerTransitions = this._activeTriggerTransitions.get(trigger);
        if (triggerTransitions) {
            const length = triggerTransitions.length;
            for (let i = 0; i < length; i++) {
                const transition = triggerTransitions[i];

                if (this.tryTransition(transition)) {
                    return true;
                }
            }
        }
        return false;
    }

    private createOptimizedTransition(
        from: TStateId,
        to: TStateId,
        condition: TransitionCondition<TStateId> = null,
        forceInstantly = false): TransitionBase<TStateId> {
        return new Transition<TStateId>(from, to, condition, forceInstantly);

    }


    public toString() {

        return `${this.name}.${this.currentState}`
    }






}


class StateBundle<TStateId, TEvent> {

    /**
     * bundle对应的state
     */
    public state: StateBase<TStateId>;

    /**
     * 拥有的转换的集合
     */
    public transitions: TransitionBase<TStateId>[] = [];

    /**
     * 拥有的事件转换集合
     */
    public triggerToTransitions: Map<TEvent, TransitionBase<TStateId>[]> = new Map();


    /**
     * 添加一个常驻转换
     * @param t 
     */
    public addTransition(t: TransitionBase<TStateId>) {


        this.transitions.push(t);
    }

    /**
     * 添加一个触发式转换
     * @param trigger 
     * @param transition 
     */
    public addTriggerTransition(trigger: TEvent, transition: TransitionBase<TStateId>) {
        if (!this.triggerToTransitions) {
            this.triggerToTransitions = new Map();
        }
        if (!this.triggerToTransitions.has(trigger)) {
            this.triggerToTransitions.set(trigger, []);
        }
        this.triggerToTransitions.get(trigger).push(transition);

    }
}