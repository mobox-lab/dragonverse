import { MovementContext } from "./MovementContext";

export interface FollowContext extends MovementContext {


    target: mw.GameObject;


    radius: number;
}