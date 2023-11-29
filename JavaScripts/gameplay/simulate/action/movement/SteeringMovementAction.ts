import { MovementContext } from "../../context/MovementContext";
import { SteeringBehavior } from "../../steering/SteeringBehavior";
import { SteeringTarget } from "../../steering/SteeringTarget";
import { AAction } from "../base/Action";


const force = new mw.Vector();


export abstract class SteeringMovementAction extends AAction<MovementContext> {



    private behaviors: SteeringBehavior[] = [];

    private _steeringForce: mw.Vector = new mw.Vector();



    protected addBehavior(behavior: SteeringBehavior) {
        this.behaviors.push(behavior);
    }

    protected removeBehavior(name: string) {
        let index = this.behaviors.findIndex((value) => {
            return value.name === name;
        })
        if (index >= 0) {
            this.behaviors.splice(index, 1);
        }
    }


    protected onUpdate(context: MovementContext) {

        this.calculate(context);

        context.force.add(this._steeringForce);

    }


    private calculate(context: MovementContext): mw.Vector {
        const behaviors = this.behaviors;


        this._steeringForce.set(0, 0, 0);


        for (let i = 0, l = behaviors.length; i < l; i++) {

            const behavior = behaviors[i];

            if (behavior.active === true) {

                force.set(0, 0, 0);

                behavior.calculate(context.entity, force);

                force.multiply(behavior.weight);

                if (this.accumulate(context.entity, force) === false) return;

            }

        }
    }


    private accumulate(entity: SteeringTarget, forceToAdd: mw.Vector): boolean {
        // calculate how much steering force the vehicle has used so far

        const magnitudeSoFar = this._steeringForce.length;

        // calculate how much steering force remains to be used by this vehicle

        const magnitudeRemaining = entity.maxForce - magnitudeSoFar;

        // return false if there is no more force left to use

        if (magnitudeRemaining <= 0) return false;

        // calculate the magnitude of the force we want to add

        const magnitudeToAdd = forceToAdd.length;

        // restrict the magnitude of forceToAdd, so we don't exceed the max force of the vehicle

        if (magnitudeToAdd > magnitudeRemaining) {

            forceToAdd.normalize().multiply(magnitudeRemaining);

        }

        // add force

        this._steeringForce.add(forceToAdd);

        return true;
    }





} 