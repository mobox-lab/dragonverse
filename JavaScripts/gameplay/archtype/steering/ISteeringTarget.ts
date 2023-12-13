export class SteeringOutput {

    linear: mw.Vector = new mw.Vector();

    rotation: mw.Rotation = new mw.Rotation();


    reset() {

        this.linear.set(0, 0, 0);
        this.rotation.set(0, 0, 0);
    }

}

export interface ISteeringTarget {



    /** 最大线性移动速度 */
    maxLinearSpeed: number;


    /** 最大线性加速度 */
    maxAcceleration: number;


    /**最大角速度 */
    angularMaxSpeed: number;


    /** 最大角加速度 */
    angularMaxAcceleration: number;

    /** 当前速度 */
    velocity: mw.Vector;

    /** 当前角速度 */
    angularVelocity: number;


    /**半径 */
    radius: number;

}