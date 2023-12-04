import { CompanionState } from "../../archtype/companion/CompanionState";
import { SteeringTarget } from "../steering/SteeringTarget";
import { IContext } from "./IContext";
import { MovementContext } from "./MovementContext";
import { TalkContext } from "./TalkContext";


class Follower implements SteeringTarget {

    position: mw.Vector = new mw.Vector();
    velocity: mw.Vector = new mw.Vector();
    maxSpeed: number
    rotation: mw.Rotation = new mw.Rotation();
    maxForce: number;

}


export class CompanionContext extends MovementContext implements IContext, TalkContext {



    /**
     * 跟随者
     */
    follower: Follower = new Follower();



    /**
     * 网络同步状态
     */
    syncedState: CompanionState;


    talker: string;



}