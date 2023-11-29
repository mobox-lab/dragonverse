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

    constructor(public evader: SteeringTarget, public predictionFactor: number) {

        super();
        this._arrive = new ArriveBehavior(mw.Vector.zero, 1, 1);
    }

    calculate(target: SteeringTarget, force: mw.Vector) {


        const evader = this.evader;

        displacement.set(evader.position).subtract(target.position);

        // 1. if the evader is ahead and facing the agent then we can just seek for the evader's current position

        target.rotation.getForce(vehicleDirection);
        evader.rotation.getForce(evaderDirection);

        // first condition: evader must be in front of the pursuer

        const evaderAhead = mw.Vector.dot(displacement, vehicleDirection) > 0;

        // second condition: evader must almost directly facing the agent

        const facing = mw.Vector.dot(vehicleDirection, evaderDirection) < - 0.95;

        if (evaderAhead === true && facing === true) {

            this._arrive.target.set(target.position);

            this._arrive.calculate(target, force);
            return force;

        }

        // 2. evader not considered ahead so we predict where the evader will be

        // the lookahead time is proportional to the distance between the evader
        // and the pursuer. and is inversely proportional to the sum of the
        // agent's velocities

        let lookAheadTime = displacement.length / (target.maxSpeed + evader.velocity.length);
        lookAheadTime *= this.predictionFactor; // tweak the magnitude of the prediction

        // calculate new velocity and predicted future position

        newEvaderVelocity.set(evader.velocity).multiply(lookAheadTime);
        predictedPosition.set(evader.position).add(newEvaderVelocity);

        // now seek to the predicted future position of the evader

        this._arrive.target.set(predictedPosition);
        this._arrive.calculate(target, force);

        return force;
    }
}