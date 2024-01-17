import { ModifiedCameraSystem, CameraModifid, CameraSystemData, } from '../Modified027Editor/ModifiedCamera';
import { GameConfig } from "../config/GameConfig";
import { Globaldata } from '../const/Globaldata';
import { GM_ParrySuccTime } from "../module/GM/GMModule";


class ShakeData {

    /**水平抖动最小值 */
    public static recoilShakeMinX: number = -0.5;

    /**水平抖动最大值 */
    public static recoilShakeMaxX: number = 0.5;

    /**垂直抖动最小值 */
    public static recoilShakeMinY: number = -0.5;

    /**垂直抖动最大值 */
    public static recoilShakeMaxY: number = 0.5;

    /**相机后坐力震荡幅度 */
    public static recoilCameraShake: number = 10;

    /**单次后坐力回归时间（毫秒） */
    public static recoilRecoveryTime: number = 1000;
}

/**
 * 相机震屏管理器
 */
export class CameraShakeManger {

    private static _instance: CameraShakeManger;
    public static get instance() {
        return this._instance || (this._instance = new CameraShakeManger());
    }

    private camera: Camera = null;
    private character: mw.Character = null;

    private currentPlayer: mw.Player = null;


    private customWaitTime_Before: number = null;
    private customWaitTime_After: number = null;
    private customTimeDilation: number = null;
    private curJobId: number = null;

    private cameraFov_Before: number = null;
    private cameraFov_After: number = null;
    private cameraFov_Time: number[] = [];

    private customTimeOut: number = null;
    private customDoneTimeOut: number = null;
    private cameraFovTimeOut: number = null;

    private defaultCameraBroad: number;
    private cameraBroad: number;

    private fovTween = null;

    constructor() {
        this.init();

    }

    private init(): void {
        this.currentPlayer = Player.localPlayer;
        this.character = this.currentPlayer.character;
        this.camera = Camera.currentCamera;
        this.defaultCameraBroad = this.camera.springArm.length;
        this.cameraBroad = this.defaultCameraBroad;

        this.initShakeData();
    }


    private initShakeData() {
        let hor = Globaldata.cameraShakeHorizontal;
        ShakeData.recoilShakeMinX = hor[0];
        ShakeData.recoilShakeMaxX = hor[1];
        let ver = Globaldata.cameraShakeVertical;
        ShakeData.recoilShakeMinY = ver[0];
        ShakeData.recoilShakeMaxY = ver[1];
        let shake = Globaldata.cameraShakeRecoil;
        ShakeData.recoilCameraShake = shake;
        let time = Globaldata.cameraShakeTime;
        ShakeData.recoilRecoveryTime = time;
    }


    private shakeData: CameraModifid.CameraShakeData;
    private shakeTimeOut: number = null;
    private charCamera: Camera;

    /**震屏 */
    private shakeScene() {
        this.clearShakeTimeOut();
        const h = this.getHorJitter();
        const v = this.getVerJitter();
        if (!this.charCamera) this.charCamera = Camera.currentCamera
        if (!this.shakeData) this.shakeData = ModifiedCameraSystem.getDefaultCameraShakeData();
        this.shakeData.rotPitchOscillation.amplitude = v;
        this.shakeData.rotPitchOscillation.frequency = ShakeData.recoilCameraShake;
        this.shakeData.rotPitchOscillation.waveform = CameraModifid.EOscillatorWaveform.PerlinNoise
        this.shakeData.rotYawOscillation.amplitude = h;
        this.shakeData.rotYawOscillation.frequency = ShakeData.recoilCameraShake;
        this.shakeData.rotYawOscillation.waveform = CameraModifid.EOscillatorWaveform.PerlinNoise;
        ModifiedCameraSystem.startCameraShake(this.shakeData);
        this.shakeTimeOut = setTimeout(() => {
            this.shakeTimeOut = null;
            this.clearShakeTimeOut();
        }, ShakeData.recoilRecoveryTime);

    }
    /**时间膨胀，修改相机FOV */
    public async customTimeAndCamera(propId: number) {

        this.clearTimeOut();

        // vae_todo027
        //动态修改相机fov至目标点
        this.customTimeOut = setTimeout(() => {//延时开启时间膨胀
            this.customTimeOut = null;
            this.shakeScene();
            this.startCameraFov(this.cameraFov_After, this.cameraFov_Time[0]);
            this.currentPlayer.character.customTimeDilation = (this.customTimeDilation);

            this.cameraFovTimeOut = setTimeout(() => {//延时将相近的FOV改成正常
                this.cameraFovTimeOut = null;
                this.startCameraFov(this.cameraFov_Before, this.cameraFov_Time[2]);
                this.clearCameraTimeOut();
            }, this.cameraFov_Time[1] * 1000);

            this.customDoneTimeOut = setTimeout(() => {//延时关闭时间膨胀
                this.customDoneTimeOut = null;
                this.currentPlayer.character.customTimeDilation = (1);
                this.clearCustomTimeOut();
            }, this.customWaitTime_After * 1000);

        }, this.customWaitTime_Before * 1000);

    }

    clearTimeOut() {
        this.clearCameraTimeOut();
        this.clearCustomTimeOut();
    }

    clearCameraTimeOut() {
        if (this.cameraFovTimeOut) {
            clearTimeout(this.cameraFovTimeOut);
            this.cameraFovTimeOut = null;
        }
    }

    clearCustomTimeOut() {
        if (this.customTimeOut) {
            clearTimeout(this.customTimeOut);
            this.customTimeOut = null;
        }
        if (this.customDoneTimeOut) {
            if (this.currentPlayer.character.customTimeDilation != 1) this.currentPlayer.character.customTimeDilation = (1);
            clearTimeout(this.customDoneTimeOut);
            this.customDoneTimeOut = null;
        }
    }
    private clearShakeTimeOut() {
        if (this.shakeTimeOut) {
            clearTimeout(this.shakeTimeOut);
            this.shakeTimeOut = null;
        }

        // 容错处理
        if (this.charCamera) {
            Camera.stopShake();
        }
    }

    private getHorJitter() {
        return this.random(ShakeData.recoilShakeMinX, ShakeData.recoilShakeMaxX);
    }
    private getVerJitter() {
        return this.random(ShakeData.recoilShakeMinY, ShakeData.recoilShakeMaxY);
    }

    private random(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    /**
     * 相机fov修改
     */
    private startCameraFov(targetFov: number, time: number = 1) {
        //oTrace("相机fov修改", targetFov, time);
        if (this.fovTween) {
            this.fovTween.stop();
            this.fovTween = null;
        }
        let start = this.camera.fov;
        this.fovTween = new mw.Tween({ fov: start }).to({ fov: targetFov }, time * 1000).onUpdate(fov => {
            this.camera.fov = fov.fov;
        }).start();

    }

    // 设置摄像机距离,平滑过度
    public setCameraBroad(value: number) {
        this.cameraBroad = value
    }

    // 设置摄像机距离为原始距离
    public setCameraDefaultBroad() {
        this.cameraBroad = this.defaultCameraBroad
    }


}