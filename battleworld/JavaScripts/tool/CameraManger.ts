import { ModifiedCameraSystem } from '../Modified027Editor/ModifiedCamera';
import { Globaldata } from '../const/Globaldata';
/**相机信息处理 */
export class CameraManger {

    private static _instance: CameraManger;
    public static get instance() {
        return this._instance || (this._instance = new CameraManger());
    }
    private camera: Camera = null;

    public data: CameraSystemData = null;

    private _tmpTran: mw.Transform = new mw.Transform();
    private _tmpTran1: mw.Transform = new mw.Transform();

    /**默认fov */
    private defaultFov: number = 0;
    private fovTween = null;

    private default_cam_relative_pos: mw.Vector = null;


    constructor() {

    }

    public init(): void {
        this.camera = Camera.currentCamera;

        let clonePos = this.camera.localTransform.position.clone();
        clonePos.z = 0;
        this.camera.localTransform.position = clonePos;
        this.default_cam_relative_pos = clonePos;

        this.camera.springArm.localTransform.position = new mw.Vector(0, 0, 60);


        this.defaultFov = mw.Camera.currentCamera.fov;
    }


    /**
     * 相机fov修改
     */
    public playCameraFovTween(targetFov: number, time: number = 0.5) {

        if (this.fovTween) {
            this.fovTween.stop();
            this.fovTween = null;
        }

        let start = this.camera.fov;
        this.fovTween = new mw.Tween({ fov: start }).to({ fov: targetFov }, time * 1000).onUpdate(fov => {
            this.camera.fov = fov.fov;
        }).start();
    }

    /**
     * 停止相机FOV动画
     */
    public stopCameraFovTween(tween: boolean = true) {
        if (this.fovTween) {
            this.fovTween.stop();
            this.fovTween = null;
        }

        if (mw.Camera.currentCamera.fov == this.defaultFov) {
            return;
        }

        if (tween == false) {
            this.camera.fov = this.defaultFov;
            return;
        }

        this.playCameraFovTween(this.defaultFov)
    }



    /**保存当前摄像机信息 */
    public saveCamera(): CameraSystemData {
        if (!this.camera) this.init();
        let camera = mw.Camera.currentCamera;
        let data2: CameraSystemData = {}
        data2.cameraRelativeTransform = camera.localTransform.clone();
        data2.springArmLen = camera.springArm.length;
        data2.fov = camera.fov;
        data2.enableCameraCollision = camera.springArm.collisionEnabled;
        return data2;
    }


    private _cameraTween: mw.Tween<any> = null;

    /**还原至上次保存的摄像机信息 */
    public resetCamera(camData: CameraSystemData, resetTime: number = 0): void {
        if (!this.camera) this.init();

        if (resetTime > 0) {
            this.tweenAnim(camData, resetTime);
            return;
        }

        this.applySettings(camData);
    }

    private tweenAnim(camData: CameraSystemData, time: number) {

        if (this._cameraTween) {
            this._cameraTween.stop();
        }
        this._cameraTween = null;

        if (camData.cameraRelativeTransform == null) return;

        let tweenStartPos = this.camera.localTransform.position.clone();
        let tweenStartRot = this.camera.localTransform.rotation.clone();

        this._cameraTween = new mw.Tween({ value: 0 }).to({ value: 1 }, time * 1000).onUpdate((data) => {

            let lerpPos = mw.Vector.lerp(tweenStartPos, camData.cameraRelativeTransform.position, data.value, Globaldata.tmpVector);

            let lerpRot = mw.Rotation.lerp(tweenStartRot, camData.cameraRelativeTransform.rotation, data.value);

            this.camera.localTransform.position = lerpPos;
            this.camera.localTransform.rotation = lerpRot;
        }).onComplete(() => {
            this._cameraTween = null;
            this.applySettings(camData);
        });

        ModifiedCameraSystem.followTargetEnable = true;
        this._cameraTween.start();
    }


    private applySettings(camData: CameraSystemData) {
        mw.Camera.currentCamera.localTransform.position = this.default_cam_relative_pos;
        mw.Camera.currentCamera.localTransform.rotation = mw.Rotation.zero;

        mw.Camera.currentCamera.springArm.length = camData.springArmLen;
        mw.Camera.currentCamera.fov = camData.fov;
        mw.Camera.currentCamera.springArm.collisionEnabled = camData.enableCameraCollision;
        this.camera.rotationMode = mw.CameraRotationMode.RotationControl;
    }

    /**停止相机动画 */
    public stopCameraTween() {
        if (this._cameraTween) {
            this._cameraTween.stop();
            this._cameraTween = null;
        }
    }

    /** 设置相机偏移 */
    public setCameraOffset(offset: mw.Vector) {
        this.camera.localTransform.position = offset;
    }



    public bindTarget(target: mw.GameObject, camBindData?: CameraBindData) {
        if (target == null) return;
        mw.Camera.currentCamera.parent = target;

        mw.Camera.currentCamera.springArm.localTransform.position = mw.Vector.zero;

        if (camBindData == null) {
            return;
        }

        if (camBindData.rotMode != null) {
            mw.Camera.currentCamera.rotationMode = camBindData.rotMode;
        }


        if (camBindData.springLen != null) {
            mw.Camera.currentCamera.springArm.length = camBindData.springLen;
        }

        if (camBindData.relativeRot != null) {
            mw.Camera.currentCamera.springArm.localTransform.rotation = camBindData.relativeRot;
        }

        if (camBindData.springArmLen != null) {
            mw.Camera.currentCamera.springArm.length = camBindData.springArmLen;
        }

    }

    public unBindTarget() {
        let chrac = mw.Player.localPlayer.character;
        if (mw.Camera.currentCamera.parent == chrac) {
            return;
        }
        mw.Camera.currentCamera.parent = chrac;
        mw.Camera.currentCamera.springArm.localTransform.position = mw.Vector.zero;

        if (mw.Camera.currentCamera.rotationMode == mw.CameraRotationMode.RotationFixed) {
            mw.Camera.currentCamera.rotationMode = mw.CameraRotationMode.RotationControl;
        }

    }
}

export interface CameraBindData {
    springLen?: number;
    relativeRot?: mw.Rotation;
    rotMode?: mw.CameraRotationMode;
    springArmLen?: number;
}

export type CameraSystemData = {
    cameraRelativeTransform?: Transform,
    springArmLen?: number,
    fov?: number,
    enableCameraCollision?: boolean,
}