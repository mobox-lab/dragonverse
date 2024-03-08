import { CSSettingType, CSSettings } from "../CSSettings";
import { CSAssets } from "../CameraCG";
import { KeyAction, KeyActionManager } from "../KeyActionManager";
import { CameraHelper } from "./CameraHelper";
import { CameraProxy } from "./CameraProxy";

/**
 * 可控制的摄像机对象
 * 用于自由视角的真实摄像机
 */
export class ControlCamera extends CameraProxy {

    /** 摄像机锚点移动速度 */
    public speed: number;

    /** 移动叠加向量 */
    private _moveDirection: Vector = Vector.zero;
    /** 移动临时位置 */
    private _moveLoc: Vector = Vector.zero;
    /** 比值用常量 */
    private readonly VECTOR_ZERO = Vector.zero;

    /** 
     * 初始化摄像机对象
     */
    public override init() {
        this.go = GameObject.spawn(CSAssets.CAMERA) as Camera;
        this.go.springArm.localTransform = Transform.identity;

        // const temp = GameObject.spawn(CSAssets.MESH_BLOCK) as Camera;
        // temp.worldTransform.scale = new Vector(0.1, 0.1, 0.1);
        // temp.parent = this.go;
        // temp.localTransform.position = new Vector(0, 0, 0);

        // Config
        this.go.upAngleLimit = 89.9;
        this.go.downAngleLimit = 89.9;
        this.go.localTransform = Transform.identity;
        this.go.springArm.localTransform = Transform.identity;
        this.go.springArm.length = 0;
        this.go.springArm.collisionEnabled = false;
        TimeUtil.onEnterFrame.add(this.update, this);

        // CSSettings
        this.speed = CSSettings.cameraMoveSpeed;
        CSSettings.onChange.add((type, value) => {
            if (type === CSSettingType.CameraMoveSpeed) {
                this.speed = <number>value;
            }
        });
    }

    /** 
     * 销毁摄像机对象
     */
    public override destroy() {
        TimeUtil.onEnterFrame.remove(this.update, this);
        this.go.destroy();
    }

    /** 
     * 帧更新，计算&改变摄像机位置
     * @param dt 间隔时间
     */
    public update(dt: number) {
        if (!CameraHelper.isFreeCamera) return;
        // 监听按键并叠加控制锚点位移的向量
        if (KeyActionManager.instance.isPress(KeyAction.CameraForward)) {
            // 将三维向量压缩至二维使用
            const forward = this.go.worldTransform.clone().getForwardVector().clone();
            this._moveDirection.x += forward.x;
            this._moveDirection.y += forward.y;
        }
        if (KeyActionManager.instance.isPress(KeyAction.CameraBack)) {
            const back = this.go.worldTransform.clone().getForwardVector().clone().multiply(-1);
            this._moveDirection.x += back.x;
            this._moveDirection.y += back.y;
        }
        if (KeyActionManager.instance.isPress(KeyAction.CameraLeft)) {
            const left = this.go.worldTransform.clone().getRightVector().clone().multiply(-1);
            this._moveDirection.x += left.x;
            this._moveDirection.y += left.y;
        }
        if (KeyActionManager.instance.isPress(KeyAction.CameraRight)) {
            const right = this.go.worldTransform.clone().getRightVector().clone();
            this._moveDirection.x += right.x;
            this._moveDirection.y += right.y;
        }
        if (KeyActionManager.instance.isPress(KeyAction.CameraUp)) {
            this._moveDirection.z += 1;
        }
        if (KeyActionManager.instance.isPress(KeyAction.CameraDown)) {
            this._moveDirection.z -= 1;
        }

        // 为锚点设置叠加后向量，实现无限制位移
        if (!this._moveDirection.equals(this.VECTOR_ZERO)) {
            this._moveLoc = Vector.add(this._moveLoc, this._moveDirection.normalized.multiply(this.speed * dt));
            (<Camera>this.go).springArm.worldTransform.position = this._moveLoc;
            this._moveDirection.x = 0;
            this._moveDirection.y = 0;
            this._moveDirection.z = 0;
        }
    }

    /** 
     * 获取摄像机位置
     * @returns 摄像机位置
     */
    public override getLocation(): Vector {
        return (<Camera>this.go).springArm.worldTransform.position.clone();
    }

    /** 
     * 获取摄像机视角场
     * @returns 摄像机视角场
     */
    public override getFov(): number {
        return (<Camera>this.go).fov;
    }

    /** 
     * 设置摄像机位置
     * @param location 摄像机位置
     */
    public override setLocation(location: Vector) {
        this._moveLoc = location;
        (<Camera>this.go).springArm.worldTransform.position = location;
    }

    /** 
     * 设置摄像机旋转
     * @param rotation 摄像机旋转
     */
    public override setRotation(rotation: Rotation) {
        Player.setControllerRotation(rotation);
    }

    /** 
     * 设置摄像机视角场
     * @param fov 摄像机视角场
     */
    public override setFOV(fov: number) {
        (<Camera>this.go).fov = fov;
    }

}