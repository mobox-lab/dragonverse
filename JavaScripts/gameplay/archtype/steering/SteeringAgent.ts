import { InitializeCheckerScript } from "../base/InitializeCheckScript";
import { ISteeringTarget, SteeringOutput } from "./ISteeringTarget";

const tempQuat = new mw.Quaternion();
const tempQuatB = new mw.Quaternion();
const tempQuatC = new mw.Quaternion();


const displacement = new mw.Vector();


@mw.Component
export default class SteeringAgent extends InitializeCheckerScript implements ISteeringTarget {

    @SteeringAgent.required
    public go: mw.GameObject;

    private rotationTrigger = 20;

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
    angularVelocity: number = 0;


    /**半径 */
    radius: number = 100;


    public waitForRotation: boolean = false;

    public isRotating: boolean = false;

    protected onInitialize(): void {
        this.useUpdate = true;
    }

    protected onUpdate(dt: number): void {

    }

    private applySteering(steering: SteeringOutput, dt: number) {

        this.applyLinearVelocity(steering, dt);
        this.applyAngularVelocity(steering, dt);

    }


    private applyLinearVelocity(steering: SteeringOutput, dt: number) {

        if (steering.linear.sqrLength >= this.maxAcceleration ** 2) {
            steering.linear.normalize().multiply(this.maxAcceleration);
        }



        // apply velocity
        this.velocity.add(steering.linear.multiply(dt));
        if (this.velocity.sqrLength >= this.maxLinearSpeed ** 2) {
            this.velocity.normalize().multiply(this.maxLinearSpeed);
        }

        if (!this.waitForRotation || (this.waitForRotation && !this.isRotating)) {
            displacement.set(this.velocity).multiply(dt).add(this.go.worldTransform.position);
            this.go.worldTransform.position = displacement;
        }
    }

    private applyAngularVelocity(steering: SteeringOutput, dt: number) {

        if (steering.angular.sqrLength >= this.angularMaxAcceleration ** 2) {
            steering.angular.normalize().multiply(this.angularMaxAcceleration);
        }

        const targetRotation = steering.angular.toRotation().add(this.go.worldTransform.rotation)
        const maxAngular = this.angularMaxSpeed;
        this.go.worldTransform.rotation = this.rotateForward(this.go.worldTransform.rotation, targetRotation, this.go.worldTransform.rotation, maxAngular * dt);

    }

    private rotateForward(fromR: mw.Rotation, toR: mw.Rotation, outer: mw.Rotation, maxDegree: number) {

        tempQuat.fromRotation(fromR);
        tempQuatB.fromRotation(toR);
        const from = tempQuat;
        const to = tempQuatB;
        let angle = this.angle(from, to);
        if (angle === 0) {
            outer.fromQuaternion(to)
            return outer
        }

        mw.Quaternion.slerp(from, to, Math.min(1, maxDegree / angle), tempQuatC);

        outer.fromQuaternion(tempQuatC);
        return outer;
    }

    private angle(a: mw.Quaternion, b: mw.Quaternion) {

        let num = Math.min(Math.abs(mw.Quaternion.dot(a, b)), 1);
        return num > 0.9999999 ? 0 : Math.acos(num) * 2 * 57.29578;
    }
}