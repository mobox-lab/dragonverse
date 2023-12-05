import { SteeringBehavior } from "./SteeringBehavior";
import { SteeringTarget } from "./SteeringTarget";

export class AvoidLandBehavior extends SteeringBehavior {



    public calculate(target: SteeringTarget, force: mw.Vector): mw.Vector {


        return force;
    }


}