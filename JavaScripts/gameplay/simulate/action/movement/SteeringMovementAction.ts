import { MovementContext } from "../../context/MovementContext";
import { ObstacleAvoidanceBehavior } from "../../steering/ObstacleAvoidanceBehavior";
import { SteeringBehavior } from "../../steering/SteeringBehavior";
import { SteeringTarget } from "../../steering/SteeringTarget";
import { AAction } from "../base/Action";
import { IAction } from "../base/IAction";


const force = new mw.Vector();


export abstract class SteeringMovementAction extends AAction<MovementContext> implements IAction {



    private behaviors: SteeringBehavior[] = [];

    private _steeringForce: mw.Vector = new mw.Vector();

    private _avoidance: ObstacleAvoidanceBehavior = new ObstacleAvoidanceBehavior([
        { rotation: new mw.Rotation(0, 30, 0), length: 200 },
        { rotation: new mw.Rotation(0, 0, -40), length: 400 }
    ])



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


    /**
     * 每次更新完后会移除所有update,需要在update中重新添加
     * @param context 
     */
    protected onUpdate(context: MovementContext) {

        this._avoidance.ignoreGuid.length = 0;

        this._avoidance.ignoreGuid.push(context.ownerGuid);

        this.addBehavior(this._avoidance);

        this.calculate(context);

        context.force.add(this._steeringForce);

        this.behaviors.length = 0;
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

        const magnitudeSoFar = this._steeringForce.length;
        const magnitudeRemaining = entity.maxForce - magnitudeSoFar;

        if (magnitudeRemaining <= 0) return false;

        const magnitudeToAdd = forceToAdd.length;

        if (magnitudeToAdd > magnitudeRemaining) {
            forceToAdd.normalize().multiply(magnitudeRemaining);
        }

        this._steeringForce.add(forceToAdd);
        return true;
    }


    protected onStop(context: MovementContext) {
        this.behaviors.length = 0;
    }





} 