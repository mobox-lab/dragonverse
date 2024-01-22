import { ICameraShakeElement } from "../config/CameraShake";
import { GameConfig } from "../config/GameConfig";
import { MotionFrameNode_Shake } from "../editors/motionEditor/MotionFrameNodeBase";
import { Tween } from "../tool/Tween";

export class ShakeScreenHelper {
    private static cameraTweenFunc: Tween<unknown>
    static shake(camera: Camera, force: number) {

        if (this.cameraTweenFunc && this.cameraTweenFunc.isPlaying()) {
            this.cameraTweenFunc.stop()
        }
        let originOffset = camera.springArm.localTransform.position.clone()
        let dir = new mw.Vector(Math.random() * force, Math.random() * force, 0)
        let start = camera.springArm.localTransform.position.clone().add(dir)
        let end = camera.springArm.localTransform.position.clone().add(dir.multiply(-1))
        this.cameraTweenFunc = new Tween({ x: 0 })
            .to({ x: 1 }, 200)
            .onUpdate((obj) => {
                let d = Math.abs(((obj.x + 0.75) % 1) * 2 - 1)
                camera.springArm.localTransform.position = mw.Vector.lerp(start, end, d)
            })
            .onComplete(() => {
                this.cameraTweenFunc.stop()
            })
            .onStop(() => {
                camera.springArm.localTransform.position = originOffset
            })
            .start()
    }

    private static shakeTimeOut: number = null;

    /**上次震屏时间 */
    private static preShakeTime: number = 0;

    /**
     * 震屏
     * @param horizontalMin 相机抖动-水平(min/max)
     * @param horizontalMax 相机抖动-水平(min/max)
     * @param recoilCameraShake 相机抖动-后坐力幅度
     * @param verticalMin 相机抖动-垂直(min/max)
     * @param verticalMax 相机抖动-垂直(min/max)
     * @param time 相机抖动-单次时间(毫秒)
     */
    public static shakeScene(camCfg: ICameraShakeElement, time) {



        let tmpValue = 5;

        let info: mw.CameraShakeInfo = {
            rotationYAmplitude: camCfg.rotPitchAmplitude,
            rotationYFrequency: camCfg.rotPitchFrequency * tmpValue,

            rotationZAmplitude: camCfg.rotYawAmplitude,
            rotationZFrequency: camCfg.rotYawFrequency * tmpValue,

            rotationXAmplitude: camCfg.rotRollAmplitude,
            rotationXFrequency: camCfg.rotRollFrequency * tmpValue,

            positionXAmplitude: camCfg.rotRollAmplitude,
            positionXFrequency: camCfg.rotRollFrequency * tmpValue,

            positionYAmplitude: camCfg.locXAmplitude,
            positionYFrequency: camCfg.locXFrequency * tmpValue,

            positionZAmplitude: camCfg.locZAmplitude,
            positionZFrequency: camCfg.locZFrequency * tmpValue,

        }

        Camera.shake(info, time);
    }


    /**
   * 震屏

   */
    public static shakeScene_motion(camCfg: MotionFrameNode_Shake, time) {

        let camSys = Camera.currentCamera;


        let tmpValue = 5;

        let info: mw.CameraShakeInfo = {
            rotationYAmplitude: camCfg.pitchAmplitude,
            rotationYFrequency: camCfg.pitchFrequency * tmpValue,

            rotationZAmplitude: camCfg.yawAmplitude,
            rotationZFrequency: camCfg.yawFrequency * tmpValue,

            rotationXAmplitude: camCfg.rollAmplitude,
            rotationXFrequency: camCfg.rollFrequency * tmpValue,

            positionXAmplitude: camCfg.xAmplitude,
            positionXFrequency: camCfg.xFrequency * tmpValue,

            positionYAmplitude: camCfg.yAmplitude,
            positionYFrequency: camCfg.yFrequency * tmpValue,

            positionZAmplitude: camCfg.zAmplitude,
            positionZFrequency: camCfg.zFrequency * tmpValue,

        }

        Camera.shake(info, time);



    }


    public static clearShakeTimeOut() {
        if (this.shakeTimeOut) {
            TimeUtil.clearDelayExecute(this.shakeTimeOut);
            this.shakeTimeOut = null;
        }

    }


    public static shakeScene_cfg(cfgId: number) {

        let shakeCfg = GameConfig.CameraShake.getElement(cfgId);
        if (shakeCfg == null || shakeCfg.keepTime == 0) {
            return;
        }


        ShakeScreenHelper.shakeScene(shakeCfg, shakeCfg.keepTime);
    }


}