import { GlobalDefine } from "../../../../DefNoSubModule";
import { CSSettings } from "../CSSettings";
import { CameraProxy } from "./CameraProxy";
import { ControlCamera } from "./ControlCamera";
import { VirtualCamera } from "./VirtualCamera";

/** 
 * 摄像机帮助类
 * 用于生成自由视角摄像机，管理摄像机的切换
 */
export class CameraHelper {

    /** 是否处于自由视角状态 */
    public static isFreeCamera = false;
    /** 原游戏摄像机 */
    public static originCamera: Camera;

    /** 自由视角摄像机 */
    private static _controlCamera: ControlCamera;
    public static get controlCamera() {
        if (!this._controlCamera) {
            this._controlCamera = new ControlCamera();
            this._controlCamera.init();
        }
        return this._controlCamera;
    }

    /** 游戏对象表示的虚拟相机 */
    private static _virtualCamera: VirtualCamera;
    public static get virtualCamera() {
        if (!this._virtualCamera) {
            this._virtualCamera = new VirtualCamera();
            this._virtualCamera.init();
        }
        return this._virtualCamera;
    }

    /** 当前受控摄像机 */
    static get curCamera(): CameraProxy {
        if (CSSettings.isCameraSync) {
            return this.controlCamera;
        } else {
            return this.virtualCamera;
        }
    }

    /** 
     * 切换摄像机同步方式
     */
    static switch() {
        CSSettings.isCameraSync = !CSSettings.isCameraSync;
        if (CSSettings.isCameraSync) {
            this.controlCamera.setVisibility(true);
            this.virtualCamera.setVisibility(false);
        } else {
            this.controlCamera.setVisibility(false);
            this.virtualCamera.setVisibility(true);
        }
    }

    /**
     * 切换至自由视角摄像机（暂未提供触屏控制方式）
     */
    public static async enterFreeCamera(blendTime: number = 0, blendFunc?: mw.CameraSwitchBlendFunction, blendExp?: number, onControl?: () => void) {
        if (!this.originCamera) {
            this.originCamera = Camera.currentCamera;
        }
        this.originCamera.springArm.useControllerRotation = false;
        (<Camera>this.controlCamera.go).springArm.useControllerRotation = true;
        if (onControl) {
            setTimeout(() => {
                onControl();
            }, 1);
        }
        this.isFreeCamera = true;
        Player.asyncGetLocalPlayer().then(async (player) => {
            player.character.movementEnabled = false;
            player.character.jumpEnabled = false;
        });
        Camera.switch((<Camera>this.controlCamera.go), blendTime, blendFunc, blendExp);
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                (<Camera>this.controlCamera.go).onSwitchComplete.clear();
                reject(null);
            }, 15000);
            (<Camera>this.controlCamera.go).onSwitchComplete.clear();
            (<Camera>this.controlCamera.go).onSwitchComplete.add(() => {
                clearTimeout(timer);
                resolve(null);
            });
        });
    }

    /**
     * 退出自由视角摄像机
     */
    public static exitFreeCamera(blendTime: number = 0, blendFunc?: mw.CameraSwitchBlendFunction, blendExp?: number) {
        if (!this.originCamera) return
        if (blendTime == 0) {
            Camera.switch(this.originCamera, 0);
            this.originCamera.springArm.useControllerRotation = true;
            (<Camera>this.controlCamera.go).springArm.useControllerRotation = false;
            this.isFreeCamera = false;
            Player.asyncGetLocalPlayer().then(async (player) => {
                player.character.movementEnabled = true;
                player.character.jumpEnabled = true;
            });
            return;
        }
        Camera.switch(this.originCamera, blendTime, blendFunc, blendExp);
        return new Promise((resolve, reject) => {
            this.originCamera.onSwitchComplete.add(() => {
                this.originCamera.springArm.useControllerRotation = true;
                (<Camera>this.controlCamera.go).springArm.useControllerRotation = false;
                this.isFreeCamera = false;
                Player.asyncGetLocalPlayer().then(async (player) => {
                    player.character.movementEnabled = true;
                    player.character.jumpEnabled = true;
                });
                resolve(null);
            });
        });
    }

}