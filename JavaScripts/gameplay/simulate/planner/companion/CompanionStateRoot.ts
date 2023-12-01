import seedrandom from "seedrandom";
import { StateMachine } from "../../../../depend/hfsm/StateMachine";
import { StateBase } from "../../../../depend/hfsm/base/StateBase";
import { CompanionState } from "../../../archtype/companion/CompanionState";
import { ActionCollection } from "../../action/base/ActionCollection";
import { IActionCollection } from "../../action/base/IActionCollection";
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

    private _rng: seedrandom.PRNG = null;

    private _seed: number = 0;

    public enter() {
        this._seed = this.fsm.context.syncedState.seed;
        this.generateRNG();
    }

    public collection(source: CompanionState): CompanionState {
        return source;
    }



    public random(min: number = undefined, max: number = undefined, integer: boolean = true): number {
        if (min === undefined) {
            min = 0;
        }
        if (max === undefined) {
            max = min + 1;
        }

        let result = this._rng() * (max - min) + min;

        this._seed++;
        this.generateRNG();
        return integer ? Math.floor(result) | 0 : result;
    }


    private generateRNG() {
        this._rng = seedrandom(this._seed.toString());
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


    clear(): void {

    }

    create(actionId: string) {

    }



}


class CompanionStateFollowState extends BaseCompanionState {


    private _desire: mw.Vector = new mw.Vector();

    constructor() {
        super(true);
    }



    public init() {

    }



    private radomFollowPoint(radius: number, center: mw.Vector, outer: mw.Vector) {
        let theta = this.random() * 2 * Math.PI;
        let phi = this.random() * Math.PI / 2;
        let r = Math.cbrt(this.random()) * radius;

        let x = r * Math.sin(phi) * Math.cos(theta);
        let y = r * Math.sin(phi) * Math.sin(theta);
        let z = r * Math.cos(phi);

        outer.set(x, y, z).add(center);

        return outer;
    }


    public enter() {
        super.enter()
        this.radomFollowPoint(this.random(150, 300, true), this.fsm.context.follower.position, this._desire);

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


