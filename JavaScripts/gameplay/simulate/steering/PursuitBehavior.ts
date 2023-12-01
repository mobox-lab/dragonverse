import { ArriveBehavior } from "./ArriveBehavior";
import { SteeringBehavior } from "./SteeringBehavior";
import { SteeringTarget } from "./SteeringTarget";

const displacement = new mw.Vector()
const vehicleDirection = new mw.Vector()
const evaderDirection = new mw.Vector()
const newEvaderVelocity = new mw.Vector()
const predictedPosition = new mw.Vector()

export class PursuitBehavior extends SteeringBehavior {


    private _arrive: ArriveBehavior;

    constructor(public evader: SteeringTarget = null, public predictionFactor: number = 1) {

        super();
        this._arrive = new ArriveBehavior(mw.Vector.zero, 1, 1);
    }

    calculate(target: SteeringTarget, force: mw.Vector) {


        const evader = this.evader;

        displacement.set(evader.position).subtract(target.position);


        target.rotation.getForce(vehicleDirection);
        evader.rotation.getForce(evaderDirection);


        const evaderAhead = mw.Vector.dot(displacement, vehicleDirection) > 0;


        const facing = mw.Vector.dot(vehicleDirection, evaderDirection) < - 0.95;

        if (evaderAhead === true && facing === true) {

            this._arrive.target.set(target.position);

            this._arrive.calculate(target, force);
            return force;

        }

        let lookAheadTime = displacement.length / (target.maxSpeed + evader.velocity.length);
        lookAheadTime *= this.predictionFactor;


        newEvaderVelocity.set(evader.velocity).multiply(lookAheadTime);
        predictedPosition.set(evader.position).add(newEvaderVelocity);

        this._arrive.target.set(predictedPosition);
        this._arrive.calculate(target, force);

        return force;
    }
}