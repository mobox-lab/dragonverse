import { CompanionContext } from "../../context/CompanionContext";
import { FleeBehavior } from "../../steering/FleeBehavior";
import { PursuitBehavior } from "../../steering/PursuitBehavior";
import { SteeringMovementAction } from "./SteeringMovementAction";

interface IRandomProvider {

    random(min?: number, max?: number, integer?: boolean): number
}

const origin = new mw.Vector();

/**
 * 一个最基础的跟随动作，首先会在
 */
export class FollowAction extends SteeringMovementAction {


    private _arrive: PursuitBehavior;

    private _flee: FleeBehavior;

    private _offset: mw.Vector = new mw.Vector();


    constructor(
        public radius: number = 150,
        public predictionFactor: number = 2.5,

    ) {
        super();
        this._arrive = new PursuitBehavior(null, this.predictionFactor);
        this._flee = new FleeBehavior(mw.Vector.zero, this.radius);
    }



    private radomFollowPoint(context: IRandomProvider, r: number, offset: mw.Vector) {
        let theta = context.random(0, Math.PI * 2, false)
        let phi = context.random(0, Math.PI / 2);

        let x = r * Math.sin(phi) * Math.cos(theta);
        let y = r * Math.sin(phi) * Math.sin(theta);
        let z = r * Math.cos(phi);

        offset.set(x, y, z)

        return offset;
    }

    protected onExecuted(context: CompanionContext) {
        this._offset = this.radomFollowPoint(context.syncedState, 70, this._offset);
    }

    protected onUpdate(context: CompanionContext): void {

        origin.set(context.follower.position);
        context.follower.position.add(this._offset);
        this._arrive.evader = context.follower;
        this._flee.target.set(context.follower.position);

        this.addBehavior(this._arrive);
        this.addBehavior(this._flee);

        super.onUpdate(context);
        if (mw.Vector.squaredDistance(context.entity.position, context.follower.position) <= 100 ** 2) {
            this.endInSuccess(context);
        }

        context.follower.position.set(origin);
    }

    protected onStop(context: CompanionContext) {
        super.onStop(context);
    }


}