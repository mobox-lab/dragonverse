import { SteeringTarget } from "../steering/SteeringTarget";
import { IContext } from "./IContext";

export class MovementContext implements IContext {




    /**
     * 加速度
     */
    public force: mw.Vector = new mw.Vector();



    /**
     * 移动目标
     */
    public entity: SteeringTarget;


    /**
     * 最近的地面距离
     */
    public closesFloorDist: number = 0;


    ownerGuid: string;

}