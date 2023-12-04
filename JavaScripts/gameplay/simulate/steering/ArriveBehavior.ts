import { SteeringBehavior } from "./SteeringBehavior";
import { SteeringTarget } from "./SteeringTarget";

const desiredVelocity = new mw.Vector();
const displacement = new mw.Vector();

export class ArriveBehavior extends SteeringBehavior {

    public target: mw.Vector = new mw.Vector()

    constructor(

        target: mw.Vector = new mw.Vector(),
        public deceleration: number = 2,
        public tolerance: number = 100
    ) {
        super()
        this.target.set(target);
    }


    public calculate(entity: SteeringTarget, force: mw.Vector): mw.Vector {

        const target = this.target;
        const deceleration = this.deceleration;

        displacement.set(target).subtract(entity.position);

        const distance = displacement.length;

        if (distance > this.tolerance) {


            let speed = distance / deceleration;

            speed = Math.min(speed, entity.maxSpeed);

            desiredVelocity.set(displacement).multiply(speed / distance);

        } else {

            desiredVelocity.set(0, 0, 0);

        }

        return force.set(desiredVelocity).subtract(entity.velocity);
    }
}