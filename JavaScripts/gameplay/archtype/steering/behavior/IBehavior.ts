import { ISteeringTarget, SteeringOutput } from "../ISteeringTarget";

export interface IBehavior {


    calculate(entity: ISteeringTarget, output: SteeringOutput): SteeringOutput;

    clear(): void;
}