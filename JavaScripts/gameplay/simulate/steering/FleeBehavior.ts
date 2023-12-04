import { SteeringBehavior } from "./SteeringBehavior";
import { SteeringTarget } from "./SteeringTarget";


const desiredVelocity = mw.Vector.zero;

export class FleeBehavior extends SteeringBehavior {

    constructor(
        public target: mw.Vector = new mw.Vector(),
        public panicDistance: number = 100
    ) {
        super();
    }

    calculate(entity: SteeringTarget, force: mw.Vector) {

        const target = this.target;


        const distanceToTargetSq = mw.Vector.squaredDistance(entity.position, target);

        if (distanceToTargetSq <= (this.panicDistance * this.panicDistance)) {


            desiredVelocity.set(entity.position).subtract(target).normalize();



            if (desiredVelocity.sqrLength === 0) {

                desiredVelocity.set(0, 0, 1);

            }

            desiredVelocity.multiply(entity.maxSpeed);

            force.set(desiredVelocity).subtract(entity.velocity);

        }

        return force;
    }
}