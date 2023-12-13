import { SteeringOutput } from "./ISteeringTarget";

export class SteeringAgent {

    public go: mw.GameObject;

    public orientation: number = 0;

    /** 最大线性移动速度 */
    maxLinearSpeed: number = 100


    /** 最大线性加速度 */
    maxAcceleration: number = 100


    /**最大角速度 */
    angularMaxSpeed: number = 100


    /** 最大角加速度 */
    angularMaxAcceleration: number = 100

    /** 当前速度 */
    velocity: mw.Vector = mw.Vector.zero;

    /** 当前角速度 */
    angularVelocity: number = 0


    /**半径 */
    radius: number = 100

    public applySteering(steering: SteeringOutput, dt: number) {

        if (steering.linear.sqrLength >= this.maxAcceleration ** 2) {
            steering.linear.normalize().multiply(this.maxAcceleration);
        }



        // apply velocity
        this.velocity.add(steering.linear.multiply(dt));
        if (this.velocity.sqrLength >= this.maxLinearSpeed ** 2) {
            this.velocity.normalize().multiply(this.maxLinearSpeed);
        }

        // apply angular velocityQ
        const rotation = this.go.worldTransform.rotation;

    }
}