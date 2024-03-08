import { KeyFrame } from "../model/KeyFrame";
import { Log } from "../utils/Log";
import { CSSettingType, CSSettings } from "../CSSettings";
import { CameraCG } from "../CameraCG";
import { InterpolatorFactory, InterpolatorType } from "../simplepathing/interpolator/InterpolatorFactory";
import { Interpolator3 } from "../simplepathing/interpolator/Interpolator";
import { CameraHelper } from "../camera/CameraHelper";
import { MyQuaternion } from "../utils/MyQuaternion";
import { UICSEditor } from "../ui/UICSEditor";
import { EventFrameInfo } from "../model/info/EventFrameInfo";
import { EventsHelper } from "../frameHandle/events/EventsHelper";

/**
 * 关键帧动画播放器（动画有状态）
 */
export class CSPlayer {

    /** 单例 */
    private static _instance: CSPlayer;
    public static get instance(): CSPlayer {
        if (!CSPlayer._instance) {
            CSPlayer._instance = new CSPlayer();
        }
        return CSPlayer._instance;
    }

    /** 公共0向量 */
    private readonly VECTOR_ZERO = mw.Vector.zero;

    /** 当前动画 */
    private _currentAnim: KeyFrame;
    /** 当前播放帧索引 */
    private _currentPlayIndex: number;
    /** 当前播放帧时间 */
    private _currentKeyFrameTime: number;
    /** 当前播放帧剩余时间 */
    private _currentPlayResidueTime: number;
    /** 当前播放总时间 */
    private _currentPlayTotalTime: number = 0;

    private _offsetLoc: mw.Vector;
    private _offsetRot: mw.Rotation;
    private _offsetGo: mw.GameObject;
    /** 应用到摄像机时的偏移量 */
    private _offsetMQua: MyQuaternion = new MyQuaternion();

    /** 播放完成回调 */
    public handleComplete: Function;

    /** 当前是否正在播放 */
    private _isPlaying = false;
    /** 是否循环播放 */
    private _isCyclePlay = false;

    /** 是否完成还原摄像机设置 */
    private _isCompleteReductionCameraSetting = false;

    /** 插值时临时变量 */
    private _cameraAnchorMoveLoc: Vector = new Vector();
    private _cameraAnchorMoveRot: Rotation = new Rotation();
    private _cameraAnchorFov: number = 0;

    /** 后续事件临时存储 */
    private _nextEventInfo: EventFrameInfo[];

    /** 位置插值器 */
    locInter: Interpolator3<Vector>;
    /** 旋转插值器 */
    rotInter: Interpolator3<Rotation>;

    init() {
        this.locInter = InterpolatorFactory.createInterpolator(CSSettings.interpolation);
        this.rotInter = InterpolatorFactory.createInterpolator(CSSettings.interpolation);
        CSSettings.onChange.add((type, value) => {
            if (type === CSSettingType.Interpolation) {
                this.locInter = InterpolatorFactory.createInterpolator(value as InterpolatorType);
                this.rotInter = InterpolatorFactory.createInterpolator(value as InterpolatorType);
            }
        });
        KeyFrame.onChange.add(() => {
            if (!this._currentAnim) return;
            this.locInter.reCompute(this._currentAnim.getLocations(), this._currentAnim.getTimes());
            this.rotInter.reCompute(this._currentAnim.getRotations(), this._currentAnim.getTimes());
            EventsHelper.instance.refresh(this._currentAnim.eventFrameInfos);
        });
    }

    setCurrentAnim(anim: KeyFrame) {
        this._currentAnim = anim;
    }

    /**
     * 设置当前播放时间 以计算姿态
     * @param currentTime 当前播放总时间
     * @returns 
     */
    setCurrentPlayTotalTime(currentTime: number) {
        // 同步与非同步不同的过滤条件
        if (this._currentAnim.getLength() <= 1 || currentTime > this._currentAnim.getEnd().time) {
            CameraHelper.virtualCamera.setLocation(new Vector(0, 0, -10000));
            return;
        }
        if (!CameraHelper.isFreeCamera) {
            this._isCompleteReductionCameraSetting = true;
            CameraCG.instance.enterFreeCamera();
        }

        // 寻找当前时间处于哪个关键帧
        let isFind = false;
        for (let i = 1; i < this._currentAnim.getLength(); i++) {
            if (this._currentAnim.get(i).time > currentTime) {
                this._currentPlayIndex = i;
                isFind = true;
                break;
            }
        }
        // 未找到则置为最大帧（逻辑上仅在代理摄像机时）
        if (!isFind) {
            this._currentPlayIndex = this._currentAnim.getLength() - 1;
            // 计算当前帧播放剩余时间
            this._currentKeyFrameTime = this._currentAnim.getFrameTime(this._currentPlayIndex);
            this._currentPlayResidueTime = 0;
        } else {
            // 计算当前帧播放剩余时间
            this._currentKeyFrameTime = this._currentAnim.getFrameTime(this._currentPlayIndex);
            this._currentPlayResidueTime = this._currentAnim.get(this._currentPlayIndex).time - currentTime;
        }
        this.calculationState();
    }

    /**
     * 从头播放动画
     */
    playFromStart() {
        this._currentPlayIndex = 1;
        this._currentKeyFrameTime = this._currentAnim.getFrameTime(this._currentPlayIndex);
        this._currentPlayResidueTime = this._currentKeyFrameTime;
        this._currentPlayTotalTime = 0;
        this.play()
    }

    /**
     * 从当前状态进行播放
     */
    play() {
        if (this._currentAnim.getLength() <= 1) {
            Log.err("动画关键帧缺失");
            return;
        }
        // 超出时间从头播放
        if (this._currentPlayTotalTime >= this._currentAnim.getEnd().time) {
            this.playFromStart();
            return;
        }
        // 当前未处于自由视角则进行切换
        if (!CameraHelper.isFreeCamera) {
            this._isCompleteReductionCameraSetting = true;
            CameraCG.instance.enterFreeCamera();
        }
        // 首次播放进行播放状态初始化
        if (!this._currentPlayIndex) {
            this.setCurrentPlayTotalTime(0);
        }
        // 后续事件
        this._nextEventInfo = this._currentAnim.eventFrameInfos.filter((item) => {
            return item.time >= this._currentPlayTotalTime;
        });
        EventsHelper.instance.reSet();
        this._isPlaying = true;
    }

    exPlayOnGo(offsetLoc: mw.GameObject, anim: KeyFrame, isReductionCamera: boolean, handleComplete?: () => void) {
        this._offsetGo = offsetLoc;
        this.exPlay(anim, isReductionCamera, handleComplete);
    }

    /**
     * 带偏移值的完整播放动画
     * @param offsetLoc
     * @param offsetRot
     * @param anim
     * @param isReductionCamera
     * @param handleComplete
     */
    exPlayOnOffset(offsetLoc: mw.Vector, offsetRot: mw.Rotation, anim: KeyFrame, isReductionCamera: boolean, handleComplete?: () => void) {
        // 无旋转偏移时的Loc
        this._offsetLoc = offsetLoc.clone();
        this._offsetRot = offsetRot.clone();
        this._offsetMQua.setEulerAngles(new mw.Vector(this._offsetRot.x, this._offsetRot.y, this._offsetRot.z));
        this.exPlay(anim, isReductionCamera, handleComplete);
    }

    /**
     * 完整播放动画
     * @param anim
     * @param isReductionCamera
     * @param handleComplete
     */
    async exPlay(anim: KeyFrame, isReductionCamera: boolean, handleComplete?: () => void) {
        if (anim.getLength() <= 1) {
            Log.err("动画关键帧缺失");
            return;
        }

        this.handleComplete = handleComplete;
        this._currentAnim = anim;
        this._currentPlayIndex = 1;
        // 将描点移动到初始帧位置
        this._currentPlayIndex = 1;
        this._currentKeyFrameTime = this._currentAnim.getFrameTime(this._currentPlayIndex);
        this._currentPlayResidueTime = this._currentKeyFrameTime;

        this._currentPlayTotalTime = 0;
        // 后续事件
        this._nextEventInfo = this._currentAnim.eventFrameInfos.filter((item) => {
            return item.time >= this._currentPlayTotalTime;
        });
        EventsHelper.instance.reSet();

        this.locInter.reCompute(this._currentAnim.getLocations(), this._currentAnim.getTimes());
        this.rotInter.reCompute(this._currentAnim.getRotations(), this._currentAnim.getTimes());

        this._isCompleteReductionCameraSetting = isReductionCamera;
        // 当前未处于自由视角则进行切换
        if (!CameraHelper.isFreeCamera) {
            CameraCG.instance.enterFreeCamera();
            // await CameraHelper.enterFreeCamera(0.4, CameraSwitchBlendFunction.Linear, 0, () => {
            //     TimeUtil.onEnterFrame.add(this.calculationState, this);
            // }).then(() => {
            //     TimeUtil.onEnterFrame.remove(this.calculationState, this);
            //     this._isPlaying = true;
            // }).catch((err) => {
            //     TimeUtil.onEnterFrame.remove(this.calculationState, this);
            // });
        }
        this._isPlaying = true;
    }


    /**
     * 停止播放
     */
    stop() {
        this._isPlaying = false;
        this._offsetLoc = null;
        this._offsetRot = null;
        if (this._isCompleteReductionCameraSetting) {
            CameraCG.instance.exitFreeCamera();
        }
        EventsHelper.instance.reSet();
    }

    stopToEnd() {
        this._isPlaying = false;
        this._currentPlayIndex = this._currentAnim.getLength() - 1;
        this._currentKeyFrameTime = this._currentAnim.getFrameTime(this._currentPlayIndex);
        this._currentPlayResidueTime = 0;
        this.handleComplete && this.handleComplete()
        this.calculationState();
        this._offsetGo = null;
        this._offsetLoc = null;
        this._offsetRot = null;
        this.handleComplete = null;
    }

    /**
     * 切换播放与暂停
     */
    switchPlayStop() {
        if (this._isPlaying) {
            this.stop();
        } else {
            this.play();
        }
    }

    /** 计算姿态 */
    public calculationState() {
        this._currentPlayTotalTime = this._currentAnim.get(this._currentPlayIndex).time - this._currentPlayResidueTime;
        // 位置运动插值
        this.locInter.interpolate(this._currentPlayTotalTime, this._cameraAnchorMoveLoc);
        // 旋转运动插值
        this.rotInter.interpolate(this._currentPlayTotalTime, this._cameraAnchorMoveRot);

        // FOV运动插值
        const lastInfo = this._currentAnim.get(this._currentPlayIndex - 1);
        const nextInfo = this._currentAnim.get(this._currentPlayIndex);
        // 计算当前关键帧播放比（0 ~ 1）
        const currentPlayProgress = 1 - this._currentPlayResidueTime / this._currentKeyFrameTime;
        this._cameraAnchorFov = MathUtil.lerp(lastInfo.fov, nextInfo.fov, currentPlayProgress);
        // 通过旋转偏移解算正确位置
        if (this._offsetGo) {
            if (!this._offsetLoc) {
                this._offsetLoc = new mw.Vector();
                this._offsetRot = new mw.Rotation();
            }
            this._offsetLoc.set(this._offsetGo.worldTransform.position);
            this._offsetRot.set(this._offsetGo.worldTransform.rotation);
            this._offsetMQua.setEulerAngles(new mw.Vector(this._offsetRot.x, this._offsetRot.y, this._offsetRot.z));
        }
        if (this._offsetRot) {
            let dir: mw.Vector = mw.Vector.subtract(this._cameraAnchorMoveLoc, this.VECTOR_ZERO);
            MyQuaternion.multiplyVector(dir, this._offsetMQua, this._cameraAnchorMoveLoc);
        }
        if (this._offsetLoc) {
            this._cameraAnchorMoveLoc.add(this._offsetLoc);
        }
        if (this._offsetRot) {
            // 不再对Z以外的轴进行旋转修正（会造成视野倾斜导致恢复摄像机异常）
            // this._cameraAnchorMoveRot.addition(this._offsetRot, this._cameraAnchorMoveRot);
            this._cameraAnchorMoveRot.z += this._offsetRot.z;
        }
        CameraHelper.curCamera.setLocation(this._cameraAnchorMoveLoc);
        CameraHelper.curCamera.setRotation(this._cameraAnchorMoveRot);
        CameraHelper.curCamera.setFOV(this._cameraAnchorFov);
        // 更新事件时间
        EventsHelper.instance.updateTime(this._currentPlayTotalTime);
    }

    private setNextFrameInfo() {
        this._currentPlayIndex += 1;
        this._currentKeyFrameTime = this._currentAnim.getFrameTime(this._currentPlayIndex);
        this._currentPlayResidueTime = this._currentKeyFrameTime;
    }

    private hasNextFrameInfo(): boolean {
        return this._currentPlayIndex + 1 < this._currentAnim.getLength();
    }

    /** 
     * 播放更新，每帧重新计算摄像机姿态
     */
    update(dt: number) {
        // 播放生命周期
        if (!this._isPlaying) {
            return;
        }
        if (this._currentPlayResidueTime > 0) {
            this._currentPlayResidueTime -= dt;
            if (this._currentPlayResidueTime < 0) this._currentPlayResidueTime = 0;
            this.calculationState();
            // 触发后续事件
            if (this._nextEventInfo.length > 0 && this._currentPlayTotalTime >= this._nextEventInfo[0].time) {
                const eventInfo = this._nextEventInfo.shift();
                if (eventInfo) {
                    Event.dispatchToLocal(eventInfo.name, eventInfo.params);
                    Log.info("触发事件：" + eventInfo.name + " 参数：" + eventInfo.params);
                }
            }
            // 播放时回显UI时间进度
            UIService.getUI(UICSEditor).setCurrentTime(
                this._currentAnim.get(this._currentPlayIndex).time - this._currentPlayResidueTime
            )
        } else {
            if (this.hasNextFrameInfo()) {
                this.setNextFrameInfo();
            } else {
                // 整个帧动画播放完成
                this._isPlaying = false;
                // 循环播放
                if (this._isCyclePlay) {
                    this.playFromStart();
                    return;
                }
                // Callback
                if (this.handleComplete) {
                    this.handleComplete();
                    this.handleComplete = null;
                }
                this._offsetGo = null;
                this._offsetLoc = null;
                this._offsetRot = null;
                // 解锁时检测是否需要移动模式还原
                if (this._isCompleteReductionCameraSetting) {
                    this._isCompleteReductionCameraSetting = false;
                    CameraCG.instance.exitFreeCamera();
                }
                EventsHelper.instance.reSet();
            }
        }
    }

}