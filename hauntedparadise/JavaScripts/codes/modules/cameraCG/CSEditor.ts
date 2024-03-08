import {KeyAction, KeyActionManager} from "./KeyActionManager";
import {KeyFrame} from "./model/KeyFrame";
import {KeyFrameInfo} from "./model/info/KeyFrameInfo";
import {CSPlayer} from "./player/CSPlayer";
import {UICSEditor} from "./ui/UICSEditor";
import {Log} from "./utils/Log";
import {UICSDialog} from "./ui/UICSDialog";
import {CSSettings, CSSettingType} from "./CSSettings";
import {UICSDialogSave} from "./ui/UICSDialogSave";
import {CameraCG, CSAssets} from "./CameraCG";
import {CSConfig} from "./CSConfig";
import {GoPool} from "./utils/GoPoole";
import {CameraHelper} from "./camera/CameraHelper";
import {TempStorageLoader} from "./model/TempStorageLoader";
import {UICSEditorInfo} from "./ui/UICSEditorInfo";
import {EventFrameInfo} from "./model/info/EventFrameInfo";
import {FrameType} from "./model/FrameType";
import {UICSEvent} from "./frameHandle/events/ui/UICSEvent";

/**
 * 编辑器主控制类
 */
export class CSEditor {

    private static _instance: CSEditor;
    public static get instance(): CSEditor {
        if (!CSEditor._instance) {
            CSEditor._instance = new CSEditor();
        }
        return CSEditor._instance;
    }

    private _ui: UICSEditor;

    /* 当前选中动画（帧信息组） */
    private _currentAnim: KeyFrame;
    /* 路径渲染用模型组 */
    private _currentPathRenders: Array<mw.GameObject> = [];

    /* 是否启用相机旋转周数记录 */
    private _isRecordCameraCycle: boolean = false;
    private _cameraCycle: number = 0;
    private _lastCameraRotZ: number;
    private _cameraCycleDifference: number = 300;

    /** 被的选中修改的关键帧光标节点 */
    public selectFramesIndex: number = -1;
    public selectFramesType: FrameType;

    private handleSetChange = (type, value) => {
        switch (type) {
            case CSSettingType.CameraSync:
                if (!value) {
                    // 动画非空则显示代理相机模型
                    if (this._currentAnim.getLength() > 1) {
                        CSPlayer.instance.setCurrentPlayTotalTime(this._ui.currentTime);
                    }
                }
                break;
            case CSSettingType.Interpolation:
                this._currentAnim.setInterpolation(value);
                break;
        }
    }

    private handleDataChange = () => {
        this.updatePathRender();
        this._ui.updateKeyFrameNode(this._currentAnim);
        TempStorageLoader.instance.saveData(this._currentAnim);
    }

    public init() {
        this._ui = mw.UIService.getUI(UICSEditor);
        this.initKeyboardKeys();

        this._currentAnim = new KeyFrame();
        CSPlayer.instance.setCurrentAnim(this._currentAnim);

        CSSettings.onChange.add(this.handleSetChange, this);
        KeyFrame.onChange.add(this.handleDataChange, this);

        TempStorageLoader.instance.tryLoadData();
        this._ui.show();
    }

    public destroy() {
        for (const go of this._currentPathRenders) {
            go.destroy();
        }
        this._currentPathRenders.length = 0;
        this._ui?.destroy();
        CSSettings.onChange.remove(this.handleSetChange, this);
        KeyFrame.onChange.remove(this.handleDataChange, this);
        this.unSelectFrames();
    }

    public update(dt: number) {
        if (this._isRecordCameraCycle) {
            let difference = CameraHelper.controlCamera.getRotation().z - this._lastCameraRotZ;
            if (difference > this._cameraCycleDifference) {
                this._cameraCycle -= 1;
                console.log("cameraCycle", this._cameraCycle);

            } else if (difference < -this._cameraCycleDifference) {
                this._cameraCycle += 1;
                console.log("cameraCycle", this._cameraCycle);

            }
            this._lastCameraRotZ = CameraHelper.controlCamera.getRotation().z;
        }
        // 处理按键
        if (CameraHelper.isFreeCamera) {
            if (KeyActionManager.instance.isPress(KeyAction.CameraLeftRoll)) {
                const rot = CameraHelper.controlCamera.getRotation();
                rot.x -= 1;
                CameraHelper.controlCamera.setRotation(rot);
            }
            if (KeyActionManager.instance.isPress(KeyAction.CameraRightRoll)) {
                const rot = CameraHelper.controlCamera.getRotation();
                rot.x += 1;
                CameraHelper.controlCamera.setRotation(rot);
            }
        }
    }

    /** 初始化键盘按键映射 */
    private initKeyboardKeys() {
        // 响应关键帧记录
        InputUtil.onKeyDown(CSConfig.KEY_ACTION_MAP.get(KeyAction.KeyFrame)[0], () => {
            this.recordKeyframe();
        })

        // 响应事件帧记录
        InputUtil.onKeyDown(CSConfig.KEY_ACTION_MAP.get(KeyAction.EventFrame)[0], () => {
            this.recordEventFrame();
        })

        // 响应删除选中的关键帧
        InputUtil.onKeyDown(CSConfig.KEY_ACTION_MAP.get(KeyAction.DelKeyFrame)[0], () => {
            this.delKeyframe();
        });

        // 响应播放
        InputUtil.onKeyDown(CSConfig.KEY_ACTION_MAP.get(KeyAction.PlayKeyFrames)[0], () => {
            CSPlayer.instance.switchPlayStop();
        })

        // 响应从头播放
        InputUtil.onKeyDown(CSConfig.KEY_ACTION_MAP.get(KeyAction.PlayKeyFramesFromStart)[0], () => {
            CSPlayer.instance.playFromStart();
        })

        // 响应停止播放
        InputUtil.onKeyDown(CSConfig.KEY_ACTION_MAP.get(KeyAction.StopKeyFrames)[0], () => {
            CSPlayer.instance.stop();
        })

        // 响应回到最末帧
        InputUtil.onKeyDown(CSConfig.KEY_ACTION_MAP.get(KeyAction.Back2LastFrame)[0], () => {
            if (this._currentAnim.getLength() <= 0) {
                return;
            }
            // 当前未处于自由视角则进行切换
            if (!CameraHelper.isFreeCamera) {
                CameraCG.instance.enterFreeCamera();
            }
            CameraHelper.curCamera.setLocation(this._currentAnim.getEnd().location);
            CameraHelper.curCamera.setRotation(this._currentAnim.getEnd().rotation);

            // 重解算周数
            let cycle = Math.floor(this._currentAnim.getEnd().rotation.z / 360);
            if (cycle < 0) {
                cycle += 1;
            }
            this._cameraCycle = cycle;
        })

        // 响应保存
        InputUtil.onKeyDown(CSConfig.KEY_ACTION_MAP.get(KeyAction.SaveAnim)[0], () => {
            this.saveCurrentAnim(true)
        })

        // 响应清空当前动画
        InputUtil.onKeyDown(CSConfig.KEY_ACTION_MAP.get(KeyAction.ClearAnim)[0], () => {
            this.clearCurrentAnim();
        })

        // 隐藏编辑器播放
        InputUtil.onKeyDown(CSConfig.KEY_ACTION_MAP.get(KeyAction.HideViewPlay)[0], () => {
            this.unSelectFrames();
            this._ui.hide();
            CSPlayer.instance.playFromStart();
            for (const go of this._currentPathRenders) {
                GameObjPool.despawn(go);
            }
            CSPlayer.instance.handleComplete = () => {
                this._ui.show();
                this.updatePathRender();
            }
        })
    }

    /**
     * 在世界中绘制路径显示模型
     */
    private updatePathRender() {
        for (const go of this._currentPathRenders) {
            GameObjPool.despawn(go);
        }
        this._currentPathRenders.length = 0;
        // 节点判空
        if (this._currentAnim.getLength() <= 0) {
            return;
        }
        // 绘制初始点
        const pointGo = GoPool.getInstance().spawn(CSAssets.MESH_CONES) as mw.Model;
        pointGo.setMaterial(CSAssets.MATERIAL_TRANSPARENT);
        pointGo.createMaterialInstance(0);
        pointGo.getMaterialInstance()[0].setVectorParameterValue("Main_Diffuse_Color", mw.LinearColor.blue);
        pointGo.getMaterialInstance()[0].setScalarParameterValue("Main_Opacity_Max", 0.6);
        pointGo.worldTransform.position = this._currentAnim.get(0).location.clone();
        pointGo.worldTransform.scale = new mw.Vector(0.3, 0.3, 0.2);
        pointGo.worldTransform.rotation = this._currentAnim.get(0).rotation.clone().add(new mw.Rotation(0, 90, 0));
        this._currentPathRenders.push(pointGo);
        // 绘制后续点
        for (let i = 1; i < this._currentAnim.getLength(); i++) {
            this._currentAnim.get(i)
            const frame1 = this._currentAnim.get(i - 1);
            const frame2 = this._currentAnim.get(i);

            // 关键帧点显示对象
            const pointGo = GoPool.getInstance().spawn(CSAssets.MESH_CONES) as mw.Model;
            pointGo.setMaterial(CSAssets.MATERIAL_TRANSPARENT);
            pointGo.createMaterialInstance(0);
            pointGo.getMaterialInstance()[0].setVectorParameterValue("Main_Diffuse_Color", mw.LinearColor.green);
            pointGo.getMaterialInstance()[0].setScalarParameterValue("Main_Opacity_Max", 0.6);
            pointGo.worldTransform.position = frame2.location.clone();
            pointGo.worldTransform.scale = new mw.Vector(0.3, 0.3, 0.2);
            pointGo.worldTransform.rotation = frame2.rotation.clone().add(new mw.Rotation(0, 90, 0));
            this._currentPathRenders.push(pointGo);

            // 路径显示对象
            const lineGo = GoPool.getInstance().spawn(CSAssets.MESH_BLOCK) as mw.Model;
            lineGo.setMaterial(CSAssets.MATERIAL_TRANSPARENT);
            lineGo.createMaterialInstance(0);
            lineGo.getMaterialInstance()[0].setVectorParameterValue("Main_Diffuse_Color", mw.LinearColor.red);
            pointGo.getMaterialInstance()[0].setScalarParameterValue("Main_Opacity_Max", 0.6);
            lineGo.worldTransform.position = mw.Vector.lerp(frame1.location, frame2.location, 0.5);
            lineGo.worldTransform.scale = new mw.Vector(this._currentAnim.getLocationDifference(i - 1, i) / 100, 0.02, 0.02);
            lineGo.worldTransform.rotation = mw.Rotation.fromVector(mw.Vector.subtract(frame2.location, frame1.location), lineGo.worldTransform.rotation);
            this._currentPathRenders.push(lineGo);
        }
    }

    /**
     * 时间轴增减变动合法性检测
     */
    public checkUpdateTimeline(totalTime: number) {
        if (this._currentAnim.getLength() > 0 && this._currentAnim.getEnd().time > totalTime) {
            Log.err("动画长度大于时间轴长度")
            return false;
        }
        return true;
    }

    /* 时间轴增减变动时调用 */
    public updateTimeline() {
        this._ui.updateKeyFrameNode(this._currentAnim);
    }

    /* 记录关键帧 */
    public recordKeyframe() {
        // 非自由视角不可记录关键帧
        if (!CameraHelper.isFreeCamera) {
            Log.err("非自由视角不可记录关键帧");
            return;
        }
        let loc = CameraHelper.controlCamera.getLocation();
        let rot = CameraHelper.controlCamera.getRotation();
        let fov = Number(CameraHelper.controlCamera.getFov().toFixed(2));
        let info: KeyFrameInfo;
        // 初始帧
        if (this._currentAnim.getLength() === 0) {
            info = new KeyFrameInfo(0, loc, rot, fov);
        } else {
            rot.z += this._cameraCycle * 360;
            info = new KeyFrameInfo(this._ui.currentTime, loc, rot, fov);
        }
        // 插入帧成功
        if (info && this._currentAnim.push(info)) {
            this.selectFrames(this._currentAnim.indexOf(info), FrameType.Camera);
            // 首个关键帧记录时重置并启用旋转周数记录
            if (!this._isRecordCameraCycle && this._currentAnim.getLength() > 0) {
                this._cameraCycle = 0;
                this._lastCameraRotZ = CameraHelper.controlCamera.getRotation().z;
                this._isRecordCameraCycle = true;
            }
        }
    }

    /* 记录事件帧 */
    public recordEventFrame() {
        const info = new EventFrameInfo(this._ui.currentTime, "YouEventName", "");
        if (info && this._currentAnim.pushEvent(info)) {
            this.selectFrames(this._currentAnim.eventFrameInfos.indexOf(info), FrameType.Events);
        }
    }

    /* 删除当前帧 */
    public delKeyframe(type: FrameType = FrameType.Camera, index?: number) {
        if (index == null) {
            index = this.selectFramesIndex;
            type = this.selectFramesType;
        }
        if (index < 0) {
            Log.err("删除关键帧无效");
            return;
        }
        if (type == FrameType.Camera) {
            if (index == 0) {
                Log.err("删除关键帧为首个关键帧");
                return;
            }
            this._currentAnim.del(index);
            // 重计算代理摄像机位置
            if (!CSSettings.isCameraSync) {
                CSPlayer.instance.setCurrentPlayTotalTime(this._ui.currentTime);
            }
        } else if (type == FrameType.Events) {
            this._currentAnim.delEvent(index);
        }
        this.unSelectFrames();
    }

    /* 清空当前动画 */
    public clearCurrentAnim() {
        CSPlayer.instance.stop();
        mw.UIService.getUI(UICSDialog).show(
            "确定要清空所有关键帧吗？", () => {
                this._currentAnim.clear();
                // 重计算代理摄像机位置
                CSPlayer.instance.setCurrentPlayTotalTime(this._ui.currentTime);
                this._isRecordCameraCycle = false;
                this.unSelectFrames();
            }
        )
    }

    public getKeyFrames(index: number): KeyFrameInfo {
        return this._currentAnim.get(index);
    }

    public getEventFrames(index: number): EventFrameInfo {
        return this._currentAnim.eventFrameInfos[index];
    }

    /**
     * 修改指定关键帧时间
     * @param index 需要修改的关键帧序号
     * @param time 修改后的时间
     */
    public modifyKeyFramesTime(index: number, time: number): number {
        if (this._currentAnim.get(index).time === time) return;
        const newIndex = this._currentAnim.modifyTime(index, time);
        // 重计算代理摄像机位置
        if (!CSSettings.isCameraSync) {
            CSPlayer.instance.setCurrentPlayTotalTime(this._ui.currentTime);
        }
        return newIndex;
    }

    public modifyKeyFramesLoc(index: number, loc: mw.Vector) {
        if (this._currentAnim.get(index).location.equals(loc)) return;
        this._currentAnim.modifyLoc(index, loc);
        // 重计算代理摄像机/锚点位置
        if (CSSettings.isCameraSync) {
            CSPlayer.instance.calculationState();
        } else {
            CSPlayer.instance.setCurrentPlayTotalTime(this._ui.currentTime);
        }
        // if (this.selectKeyFramesIndex > 0) CSEditor.instance.selectFrames(this.selectKeyFramesIndex, FrameType.Camera);
    }

    public modifyKeyFramesRot(index: number, rot: mw.Rotation) {
        if (this._currentAnim.get(index).rotation.equals(rot)) return;
        this._currentAnim.modifyRot(index, rot);
        // 重计算代理摄像机/锚点旋转
        if (CSSettings.isCameraSync) {
            CSPlayer.instance.calculationState();
        } else {
            CSPlayer.instance.setCurrentPlayTotalTime(this._ui.currentTime);
        }
    }

    public modifyKeyFramesFOV(index: number, fov: number) {
        if (this._currentAnim.get(index).fov === fov) return;
        this._currentAnim.modifyFOV(index, fov);
        // 重计算锚点摄像机FOV
        if (CSSettings.isCameraSync) {
            CSPlayer.instance.calculationState();
        }
    }

    /**
     * 修改指定事件帧时间
     * @param index 需要修改的关键帧序号
     * @param time 修改后的时间
     */
    public modifyEventFramesTime(index: number, time: number): number {
        if (this._currentAnim.eventFrameInfos[index].time === time) return;
        return this._currentAnim.modifyEventTime(index, time);
    }

    public modifyEventFramesName(index: number, name: string) {
        if (this._currentAnim.eventFrameInfos[index].name === name) return;
        this._currentAnim.modifyEventName(index, name);
    }

    public modifyEventFramesParams(index: number, params: string) {
        if (this._currentAnim.eventFrameInfos[index].params === params) return;
        this._currentAnim.modifyEventParams(index, params);
    }

    /**
     * 通过Json字符串载入动画
     * @param animJsonStr 动画Json字符串
     * @param needReplace 是否需要替换转义字符
     * @returns 是否成功
     */
    public loadAnim(animJsonStr: string, needReplace = false): boolean {
        try {
            if (needReplace) animJsonStr = animJsonStr.replace(/\\\\/g, '\\').replace(/\\"/g, '"');
            const anim = KeyFrame.deserialize(animJsonStr);
            if (anim) {
                this._currentAnim = anim;
                CSPlayer.instance.setCurrentAnim(this._currentAnim);
                CSSettings.interpolation = this._currentAnim.interpolation;
                // 重计算代理摄像机位置
                if (!CSSettings.isCameraSync) {
                    CSPlayer.instance.setCurrentPlayTotalTime(this._ui.currentTime);
                }
                // 取消选中
                this.unSelectFrames();
                this._isRecordCameraCycle = true;
                return true;
            }
            return false;
        } catch (error) {
            Log.err("反序列化对象失败", error);
            return false;
        }
    }

    /* 保存当前动画数据 */
    public saveCurrentAnim(needReplace = false) {
        let text = JSON.stringify(this._currentAnim);
        if (needReplace) text = text.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        mw.UIService.getUI(UICSDialogSave).show(text);
    }

    /* 重置摄像机 */
    public resetCamera() {
        const fov = CameraHelper.originCamera ? CameraHelper.originCamera.fov : 90;
        CameraHelper.controlCamera.setFOV(fov);
        const curRot = CameraHelper.controlCamera.getRotation().clone();
        curRot.x = 0;
        CameraHelper.controlCamera.setRotation(curRot);
    }

    /**
     * 选中指定索引的帧
     */
    public selectFrames(index: number, type: FrameType, needSetUI = true) {
        this.unSelectFrames();
        this.selectFramesIndex = index;
        this.selectFramesType = type;
        // 外部调用需要设置UI状态
        if (needSetUI) this._ui.selectKeyFrames(index, type);
        switch (type) {
            case FrameType.Camera:
                UIService.getUI(UICSEditorInfo).selectFrames(index);
                break;
            case FrameType.Events:
                UIService.getUI(UICSEvent).selectFrames(index);
                break;
        }
    }

    /**
     * 取消选中的帧
     */
    public unSelectFrames() {
        this.selectFramesIndex = -1;
        UIService.getUI(UICSEditorInfo).unSelectFrames();
        UIService.getUI(UICSEvent).unSelectFrames();
    }

}