import { SteeringBehavior } from "./SteeringBehavior";
import { SteeringTarget } from "./SteeringTarget";

const desiredVelocity = new mw.Vector();


export class SeekBehavior extends SteeringBehavior {

    public constructor(public target: mw.Vector = mw.Vector.zero) {

        super();
    }

    public calculate(agent: SteeringTarget, force: mw.Vector): mw.Vector {

        const target = this.target;


        desiredVelocity.set(target).subtract(agent.position).normalize();
        desiredVelocity.multiply(agent.maxSpeed);



        return force.set(desiredVelocity).subtract(agent.velocity);
    }


}