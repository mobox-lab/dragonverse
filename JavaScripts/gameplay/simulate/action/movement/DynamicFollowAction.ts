import { MovementContext } from "../../context/MovementContext";
import { ArriveBehavior } from "../../steering/ArriveBehavior";
import { SteeringMovementAction } from "./SteeringMovementAction";

export class FollowAction extends SteeringMovementAction {




    constructor() {
        super();
    }



    protected onExecuted(context: MovementContext) {
        this.addBehavior(new ArriveBehavior(context.))

    }

    protected onUpdate(context: MovementContext): void {

        super.onUpdate(context);
    }

    protected onStop(context: MovementContext) {

    }


}