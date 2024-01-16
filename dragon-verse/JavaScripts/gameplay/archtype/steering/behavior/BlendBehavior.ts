import { ISteeringTarget, SteeringOutput } from "../ISteeringTarget";
import { IBehavior } from "./IBehavior";

const steeringOutput = new SteeringOutput();


type IBlendBehavior = {
    behavior: IBehavior,
    weight: number
}

export class BlendBehavior implements IBehavior {


    private _behaviors: IBlendBehavior[] = [];

    [Symbol.iterator](): Iterator<IBlendBehavior> {
        return this._behaviors[Symbol.iterator]();
    }

    calculate(entity: ISteeringTarget, output: SteeringOutput): SteeringOutput {

        steeringOutput.reset();

        // 补全steering逻辑
        return steeringOutput;

    }

    addBehavior(behavior: IBehavior, weight: number = 1) {

        this._behaviors.push({ behavior, weight });

    }


    getBehavior(index: number): IBlendBehavior {

        return this._behaviors[index];
    }



    removeBehavior(index: number): void {

        this._behaviors.splice(index, 1);
    }


    clear(): void {
        for (const v of this) {
            v.behavior.clear();
        }
        this._behaviors.length = 0;
    }

}