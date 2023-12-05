import { SteeringTarget } from "./SteeringTarget";

export abstract class SteeringBehavior {

    public active: boolean = true;

    public weight: number = 1;


    public get name() {
        return this.constructor.name;
    }


    public abstract calculate(target: SteeringTarget, force: mw.Vector): mw.Vector;
}