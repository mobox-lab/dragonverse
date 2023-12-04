export interface SteeringTarget {


    /** 运动体当前位置 */
    position: mw.Vector;

    /** 移动速度 */
    velocity: mw.Vector;

    /** 最大速度 */
    maxSpeed: number;

    /**
     * 当前朝向
     */
    rotation: mw.Rotation;


    /**最大加速度 */
    maxForce: number;


}