import { CSEditor } from "./CSEditor";
import { KeyAction, KeyActionManager } from "./KeyActionManager";
import { KeyFrame } from "./model/KeyFrame";
import { CSPlayer } from "./player/CSPlayer";
import { Log } from "./utils/Log";
import { CSConfig } from "./CSConfig";
import { CameraHelper } from "./camera/CameraHelper";
import { TempStorageLoader } from "./model/TempStorageLoader";
import { CSSettings } from "./CSSettings";

/**
 * 需要的预加载资源
 */
export const CSAssets = {
    MESH_BLOCK: "197386",
    MESH_CONES: "197422",
    MESH_BALL: "197388",
    MATERIAL_TRANSPARENT: "198674",
    CAMERA: "Camera"
}

/**
 * 对外主控类，初始化模块，提供API
 */
export class CameraCG {

    /** 单例 */
    private static _instance: CameraCG = new CameraCG();
    public static get instance(): CameraCG {
        if (!CameraCG._instance) {
            CameraCG._instance = new CameraCG();
        }
        return CameraCG._instance;
    }

    /** 临时存储加载器实例 */
    public tempStorageLoader: TempStorageLoader;

    /* 模块是否准备完成 */
    public isReady: boolean = false;
    /* 模块是正在初始化 */
    public initializing: boolean = false;

    /* 保有当前角色对象 */
    private _character: mw.Character;

    /** 
     * 构造方法，创建数据相关的事件监听
     */
    constructor() {
        TempStorageLoader.instance;
        if (SystemUtil.isPIE && SystemUtil.isClient()) {
            // Init Keyboard Keys
            InputUtil.onKeyDown(CSConfig.KEY_ACTION_MAP.get(KeyAction.OpenEditor)[0], () => {
                this.openEditor();
            });
            InputUtil.onKeyDown(CSConfig.KEY_ACTION_MAP.get(KeyAction.CloseEditor)[0], () => {
                this.closeEditor();
            });
            Log.info("预实例化完成");
        }
    }

    /** 
     * 初始化模块，预加载资源，注册默认事件
     */
    public async init() {
        if (this.isReady) return true;
        if (this.initializing) return false;
        this.initializing = true;
        // 预加载资源
        // for (const key in CSAssets) {
        //     if (CSAssets.hasOwnProperty(key)) {
        //         const element = CSAssets[key];
        //         await AssetUtil.asyncDownloadAsset(element);
        //     }
        // }
        // Enable Update
        TimeUtil.onEnterFrame.add(this.update, this);
        this._character = (await Player.asyncGetLocalPlayer()).character;

        // 自由视角功能初始化
        InputUtil.onKeyDown(CSConfig.KEY_ACTION_MAP.get(KeyAction.ChangeView)[0], () => {
            if (CameraHelper.isFreeCamera) {
                this.exitFreeCamera();
            } else {
                // 首次切换初始化至玩家位置
                if (CameraHelper.curCamera.getLocation().equals(Vector.zero)) {
                    const characterLoc = this._character.worldTransform.position.clone();
                    characterLoc.z += 100;
                    CameraHelper.curCamera.setLocation(characterLoc);
                }
                this.enterFreeCamera();
            }
        });
        KeyActionManager.instance.init();
        CSPlayer.instance.init();
        this.initializing = false;
        this.isReady = true;
        return true;
    }

    /** 
     * 销毁方法，销毁数据相关的事件监听
     */
    destroy(): void {
        this.tempStorageLoader?.destroy();
        TimeUtil.onEnterFrame.remove(this.update, this);;
        CSEditor.instance?.destroy();
    }

    /** 
     * 每帧更新，用于编辑器相关生命周期
     */
    update(dt: number): void {
        // 编辑器相关生命周期
        CSEditor.instance?.update(dt);
        CSPlayer.instance?.update(dt);
    }

    //#region 提供API

    /**
     * 启用编辑器
     */
    public async openEditor() {
        if (!await this.init()) return;
        CSEditor.instance.init();
    }

    /**
     * 关闭编辑器
     */
    public async closeEditor() {
        if (!await this.init()) return;
        CSEditor.instance.destroy();
    }

    /**
     * 播放动画
     * @param jsonStr 动画Json文本
     * @param handleComplete 完成回调
     * @param isReduction 播放完成是否恢复摄像机
     */
    public async play(jsonStr: string, handleComplete?: () => void, isReduction: boolean = true) {
        if (!await this.init()) return;
        try {
            // 反序列化并播放对象
            const anim = KeyFrame.deserialize(jsonStr);
            if (anim) {
                CSSettings.interpolation = anim.interpolation;
                CSPlayer.instance.exPlay(anim, isReduction, handleComplete);
            }
        } catch (error) {
            Log.err("摄像机轨迹动画播放失败", error);
        }
    }

    activeCGCamera() {
        Camera.switch(<Camera>CameraHelper.curCamera.go)
    }

    /**
     * 将游戏对象位置作为播放偏移点进行动画播放
     * @param obj 作为偏移点的对象
     * @param jsonStr 动画Json文本
     * @param handleComplete 完成回调
     * @param isReduction 播放完成是否恢复摄像机
     */
    public async playOnGameObject(obj: mw.GameObject, jsonStr: string, handleComplete?: () => void, isReduction: boolean = true) {
        if (!await this.init()) return;
        try {
            // 反序列化并播放对象
            const anim = KeyFrame.deserialize(jsonStr);
            if (anim) {
                CSPlayer.instance.exPlayOnGo(obj, anim, isReduction, handleComplete);
            }
        } catch (error) {
            Log.err("摄像机轨迹动画播放失败", error);
        }
    }

    /**
     * 带偏移点进行播放
     * @param offsetLoc 坐标偏移
     * @param offsetRot 旋转偏移
     * @param jsonStr 动画Json文本
     * @param handleComplete 完成回调
     * @param isReduction 播放完成是否恢复摄像机
     */
    public async playOnOffset(offsetLoc: mw.Vector, offsetRot: mw.Rotation, jsonStr: string, handleComplete?: () => void, isReduction: boolean = true) {
        if (!await this.init()) return;
        try {
            // 反序列化并播放对象
            const anim = KeyFrame.deserialize(jsonStr);
            if (anim) {
                CSPlayer.instance.exPlayOnOffset(offsetLoc, offsetRot, anim, isReduction, handleComplete);
            }
        } catch (error) {
            Log.err("摄像机轨迹动画播放失败", error);
        }
    }

    /**
    * 停止播放当前动画
    * @param toEnd 是否直接跳到最后一帧
    */
    public async stop(toEnd = false) {
        if (!await this.init()) return;
        if (toEnd) {
            CSPlayer.instance.stopToEnd();
        } else {
            CSPlayer.instance.stop();
        }
    }

    /**
     * 进入自由视角（但暂未提供触屏控制方式）
     */
    public async enterFreeCamera(blendTime?: number, blendFunc?: mw.CameraSwitchBlendFunction, blendExp?: number) {
        if (!await this.init()) return;
        await CameraHelper.enterFreeCamera(blendTime, blendFunc, blendExp);
    }

    /**
     * 退出自由视角，还原摄像机设置
     */
    public async exitFreeCamera(blendTime?: number, blendFunc?: mw.CameraSwitchBlendFunction, blendExp?: number) {
        if (!await this.init()) return;
        await CameraHelper.exitFreeCamera(blendTime, blendFunc, blendExp);
    }

    //#endregion

}
