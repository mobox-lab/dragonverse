
/**
 * 运行时动态配置
 */

import { InterpolatorType } from "./simplepathing/interpolator/InterpolatorFactory";

/** 
 * 配置类型枚举
 */
export enum CSSettingType {
    /** 摄像机同步 */
    CameraSync,
    /** 插值器 */
    Interpolation,
    /** 相机移动速度 */
    CameraMoveSpeed
}

/** 
 * 配置类
 */
export class CSSettings {

    /** 设置变动时回调 */
    public static onChange: Action2<CSSettingType, number | boolean> = new Action2();

    /** 摄像机同步功能 */
    private static _isCameraSync = true;
    public static get isCameraSync(): boolean {
        return this._isCameraSync;
    }
    public static set isCameraSync(value: boolean) {
        this._isCameraSync = value;
        this.onChange.call(CSSettingType.CameraSync, value);
    }

    /** 插值器 */
    private static _interpolation = InterpolatorType.Cubic;
    public static get interpolation(): InterpolatorType {
        return this._interpolation;
    }
    public static set interpolation(value: InterpolatorType) {
        this._interpolation = value;
        this.onChange.call(CSSettingType.Interpolation, value);
    }

    /** 相机移动速度 */
    private static _cameraMoveSpeed = 500;
    public static get cameraMoveSpeed(): number {
        return this._cameraMoveSpeed;
    }
    public static set cameraMoveSpeed(value: number) {
        this._cameraMoveSpeed = value;
        this.onChange.call(CSSettingType.CameraMoveSpeed, value);
    }

}