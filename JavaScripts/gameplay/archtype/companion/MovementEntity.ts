import { VisualizeDebug } from "../../../util/VisualizeDebug";
import { Smoother } from "../Smoother";
import ClientDisplayEntity from "../base/ClientDisplayEntity";
import { IState } from "../base/IState";


const displacement = mw.Vector.zero;
const target = mw.Vector.zero;
const velocitySmooth = mw.Vector.zero;

export default abstract class MovementEntity<T extends IState> extends ClientDisplayEntity<T> {



    /**
     * 移动向量
     */
    public velocity: mw.Vector = new mw.Vector();


    /**
     * 最大速度
     */
    public maxSpeed: number = 600;


    /**
     * 最大转向角度
     */
    public maxTurnAngle: number = 30;


    /**
     * 加速度
     */
    public acceleration: mw.Vector = new mw.Vector();


    /**
     * 平滑器
     */
    private _smoother: Smoother = new Smoother(10);


    /**
     * 最大加速度
     */
    public maxForce: number = 5000;


    public get position() {
        return this.gameObject.worldTransform.position;
    }

    public get rotation() {
        return this.gameObject.worldTransform.rotation;
    }


    protected onInitialize(): void {
        super.onInitialize();
        (this.gameObject as mw.Character).complexMovementEnabled = false;
    }


    public onUpdate(dt: number): void {

        velocitySmooth.set(this.velocity);
        this.velocity.add(this.acceleration.multiply(dt));

        if (this.velocity.sqrLength <= Number.EPSILON) {
            return;
        }

        if (this.velocity.sqrLength >= this.maxSpeed ** 2) {
            this.velocity.normalize();
            this.velocity.multiply(this.maxSpeed);
        }

        VisualizeDebug.drawArrow(this.position, this.position.clone().add(this.velocity), 10);
        let worldTransform = this.gameObject.worldTransform;
        displacement.set(this.velocity).multiply(dt);
        target.set(worldTransform.position).add(displacement);

        worldTransform.position = worldTransform.position.set(target);

        this._smoother.calculate(this.velocity, velocitySmooth);
        displacement.set(velocitySmooth).multiply(dt);
        target.set(worldTransform.position).add(displacement);

        this.lookAt(target);
        this.acceleration.set(0, 0, 0);
    }


    public lookAt(target: mw.Vector) {

        let worldTransform = this.gameObject.worldTransform;
        worldTransform.lookAt(target);
        worldTransform.rotation = worldTransform.rotation;
    }









}