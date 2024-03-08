import { KeyAction, KeyActionManager } from "../KeyActionManager";
import { KeyFrame } from "../model/KeyFrame";
import { UITimeText } from "./item/UITimeText";
import { UITimePoint, UITimePointState } from "./item/UITimePoint";
import { UIKeyFrame } from "./item/UIKeyFrame";
import { UIUtils } from "../utils/UIUtils";
import { CSPlayer } from "../player/CSPlayer";
import { CSEditor } from "../CSEditor";
import { UICSDialogLoad } from "./UICSDialogLoad";
import { CSSettingType, CSSettings } from "../CSSettings";
import { KeyFrameInfo } from "../model/info/KeyFrameInfo";
import { CSEditorUI_Generate } from "./generate/CSEditorUI_generate";
import { GridContainer, GridSelectContainer } from "../utils/UIPool";
import { InterpolatorType } from "../simplepathing/interpolator/InterpolatorFactory";
import { UICSEditorInfo } from "./UICSEditorInfo";
import { EventFrameInfo } from "../model/info/EventFrameInfo";
import { FrameType } from "../model/FrameType";
import { UICSEvent } from "../frameHandle/events/ui/UICSEvent";
import { CameraHelper } from "../camera/CameraHelper";
import { EventsHelper } from "../frameHandle/events/EventsHelper";

/**
 * 编辑器主UI
 */
export class UICSEditor extends CSEditorUI_Generate {

    static readonly EVENT_UPDATE_TIME = "EVENT_UPDATE_TIME";

    // 显示的总时间时长（s）
    private _totalTime = 60;
    private _currentTime = 0;
    get currentTime(): number {
        return this._currentTime;
    }

    // 需要移动的UI引用
    private _moveNode: mw.Widget;

    // 被的选中移动的关键帧光标根节点
    private _moveKeyFramesUIObject: mw.Widget;
    // 关键帧光标移动结束延迟
    private _keyFramesNodeMoveTime: number = 0;

    /* UIPool */
    private _keyFramesUIPool: GridSelectContainer<UIKeyFrame>;
    private _timePointUIPool: GridContainer<UITimePoint>;
    private _timTextUIPool: GridContainer<UITimeText>;

    private handleSetChange = (type, value) => {
        switch (type) {
            case CSSettingType.Interpolation:
                if (value == InterpolatorType.Linear) {
                    this.textSpline.text = "插值 [<color=#3881fa>线性</color>]";
                } else {
                    this.textSpline.text = "插值 [<color=#3881fa>三次</color>]";
                }
                break;
            case CSSettingType.CameraSync:
                if (value) {
                    this.textCameraSync.text = "相机同步 [<color=#3fa066>开</color>]";
                } else {
                    this.textCameraSync.text = "相机同步 [<color=#fb757b>关</color>]";
                }
                break;
        }
    }

    protected onStart(): void {
        this.layer = UILayerTop;
        this.initUI();
        // 注册移动选中监听
        this.addHoverListener(this.mBtnBar, this.mBtnCurrentTime);
        // 初始化绘制
        this.updateTimeLine();
        this.setCurrentTime(0);
        this.canUpdate = true;
    }

    protected onUpdate(dt: number): void {
        // 延迟执行关键帧光标值修改（防止过度调用）
        if (this._keyFramesNodeMoveTime > 0) {
            this._keyFramesNodeMoveTime -= dt;
            if (this._keyFramesNodeMoveTime <= 0) {
                if (!this._moveKeyFramesUIObject) return;
                const index = this._moveKeyFramesUIObject["index"] as number;
                const type = this._moveKeyFramesUIObject["type"] as FrameType;
                const time = UIUtils.moveXInParent(this._moveKeyFramesUIObject) * this._totalTime;
                let newIndex = -1;
                switch (type) {
                    case FrameType.Camera:
                        newIndex = CSEditor.instance.modifyKeyFramesTime(index, time);
                        break;
                    case FrameType.Events:
                        newIndex = CSEditor.instance.modifyEventFramesTime(index, time);
                        break;
                }
                if (newIndex > 0) CSEditor.instance.selectFrames(newIndex, type);
            }
        }
        // 监听控制光标操作并移动对应元素
        if (KeyActionManager.instance.isPress(KeyAction.HoldUINode)) {
            if (!this._moveNode) { return }
            // 移动后关于父布局的X位置比（0~1）
            const progress = UIUtils.moveXInParent(this._moveNode);
            if (this._moveNode.name === "mBtnCurrentTime") {
                // 时间光标移动
                this._currentTime = this._totalTime * progress;
                CSPlayer.instance.setCurrentPlayTotalTime(this._currentTime);
                return;
            } else {
                // 关键帧光标移动
                if (this._moveKeyFramesUIObject !== this._moveNode) {
                    this._moveKeyFramesUIObject = this._moveNode;
                }
                // 延迟0.1s执行应用值修改（防止过度调用）
                this._keyFramesNodeMoveTime = 0.1;
                return;
            }
        }
    }

    public show() {
        mw.UIService.showUI(this);
        UIService.getUI(UICSEditorInfo).setPos(new Vector2(WindowUtil.getViewportSize().x / 2, this.mCanvasFramesEdit.position.y));
        UIService.getUI(UICSEvent).setPos(new Vector2(WindowUtil.getViewportSize().x / 2, this.mCanvasFramesEdit.position.y));
    }

    public hide() {
        mw.UIService.hideUI(this);
    }

    private initUI(): void {
        this._keyFramesUIPool = new GridSelectContainer<UIKeyFrame>(this.mCanvasKeyFrame, UIKeyFrame);
        this._timePointUIPool = new GridContainer<UITimePoint>(this.mCanvasTimePoint, UITimePoint);
        this._timTextUIPool = new GridContainer<UITimeText>(this.mCanvasTimePoint, UITimeText);
        // 处理原生按钮监听
        this.mBtnPlay.onClicked.add(() => {
            CSPlayer.instance.switchPlayStop();
        });
        this.mBtnRecord.onClicked.add(() => {
            CSEditor.instance.recordKeyframe();
        });
        this.mBtnEvent.onClicked.add(() => {
            CSEditor.instance.recordEventFrame();
        });
        this.mBtnClear.onClicked.add(() => {
            CSEditor.instance.clearCurrentAnim();
        });
        this.mBtnSetting.onClicked.add(() => {
            if (this.mCanvasSetting.visibility === mw.SlateVisibility.Hidden) {
                this.mCanvasSetting.visibility = mw.SlateVisibility.Visible;
            } else {
                this.mCanvasSetting.visibility = mw.SlateVisibility.Hidden;
            }
        });
        // Setting
        CSSettings.onChange.add(this.handleSetChange, this);
        this.inSpeed.text = CSSettings.cameraMoveSpeed.toString();
        this.inSpeed.onTextChanged.add(() => {
            const value = parseInt(this.inSpeed.text);
            if (value && value > 0) {
                CSSettings.cameraMoveSpeed = value;
            }
        });
        this.mBtnSpline.onClicked.add(() => {
            // 更改插值器
            CSSettings.interpolation = CSSettings.interpolation == InterpolatorType.Linear
                ? InterpolatorType.Cubic : InterpolatorType.Linear;
        });
        this.mBtnCameraSync.onClicked.add(() => {
            // 更改摄像机同步设置
            CameraHelper.switch();
        });
        this.mBtnResetFOV.onClicked.add(() => {
            CSEditor.instance.resetCamera();
        });
        this.mBtnLoad.onClicked.add(() => {
            UIService.getUI(UICSDialogLoad).show();
        });
        this.mBtnSave.onClicked.add(() => {
            CSEditor.instance.saveCurrentAnim(true);
        });
        // 关键帧编辑区输入框映射
        // TimeCtrl
        this.mBtnAddTime.onClicked.add(() => {
            if (this._totalTime >= 150) {
                return;
            }
            if (CSEditor.instance.checkUpdateTimeline(this._totalTime + 30)) {
                this._totalTime += 30;
                this.updateTimeLine();
                CSEditor.instance.updateTimeline();
            }
        });
        this.mBtnSubTime.onClicked.add(() => {
            if (this._totalTime <= 30) {
                return;
            }
            if (CSEditor.instance.checkUpdateTimeline(this._totalTime - 30)) {
                this._totalTime -= 30;
                this.updateTimeLine();
                CSEditor.instance.updateTimeline();
            }
        });
    }

    /**
     * 将按键进行监听，鼠标进入时为选中
     * @param btn 要监听的按钮
     * @param moveUI 需要移动的UI
     */
    private addHoverListener(btn: mw.Button, moveUI: mw.Widget) {
        btn.onHovered.add(() => {
            if (KeyActionManager.instance.isPress(KeyAction.HoldUINode)) {
                return;
            }
            this._moveNode = moveUI;
            // Utils.log("Hover节点", this._moveNode.getName());
        });
        btn.onUnhovered.add(() => {
            if (KeyActionManager.instance.isPress(KeyAction.HoldUINode)) {
                return;
            }
            this._moveNode = null;
        })
    }

    /**
     * 更新时间轴绘制
     */
    private updateTimeLine() {
        this._timePointUIPool.removeAllNode();
        this._timTextUIPool.removeAllNode();
        // 区总长度减单个刻度条长度
        const spacing = (this.mCanvasTimePoint.size.x) / this._totalTime;
        for (let i = 0; i <= this._totalTime; i++) {
            if (i % 5 === 0) {
                const timePoint = this._timePointUIPool.addNode()
                timePoint.setData(new mw.Vector2(i * spacing - 2, 20), UITimePointState.Long);
                // TimeText
                const timeText = this._timTextUIPool.addNode();
                timeText.setData(new mw.Vector2(i * spacing - (70 / 2), 60), i);
            } else {
                const timePoint = this._timePointUIPool.addNode();
                timePoint.setData(new mw.Vector2(i * spacing - 2, 40), UITimePointState.Default);
            }
        }
    }

    /**
     * 设置时间光标到指定时间处
     * @param time 指定时间
     */
    public setCurrentTime(time: number) {
        this._currentTime = time;
        const x = time / this._totalTime * this.mCanvasTimeLine.size.x - (this.mBtnCurrentTime.size.x / 2);
        this.mBtnCurrentTime.position = (new mw.Vector2(x, this.mBtnCurrentTime.position.y));
    }

    /**
     * 使用关键帧动画更新帧节点显示
     * @param anim 关键帧动画
     */
    public updateKeyFrameNode(anim: KeyFrame) {
        this._keyFramesUIPool.nodes.forEach((node) => {
            node.uiObject["index"] = null;
            node.uiObject["type"] = null;
        });
        this._keyFramesUIPool.removeAllNode();
        // 区总长度减单个刻度条长度
        const spacing = (this.mCanvasTimePoint.size.x) / this._totalTime;
        anim.forEach((info: KeyFrameInfo, index) => {
            const keyFrames = this._keyFramesUIPool.addNode();
            keyFrames.setData(new mw.Vector2(info.time * spacing - 8, 0), index, FrameType.Camera);
            // 初始帧不做为可移动对象
            if (info.time !== 0) {
                this.addHoverListener(keyFrames.mBtn, keyFrames.uiObject);
                // 使用下表作为name，以便于识别选中的具体关键帧
                keyFrames.uiObject["index"] = index;
                keyFrames.uiObject["type"] = FrameType.Camera;
            }
            keyFrames.onSelect.add(() => {
                CSEditor.instance.selectFrames(index, FrameType.Camera, false);
            });
        });
        anim.eventFrameInfos.forEach((info: EventFrameInfo, index) => {
            const keyFrames = this._keyFramesUIPool.addNode();
            keyFrames.setData(new mw.Vector2(info.time * spacing - 8, 24), index,
                EventsHelper.instance.needUpdate(info.name) ? FrameType.UpdateEvents : FrameType.Events);
            keyFrames.uiObject["index"] = index;
            keyFrames.uiObject["type"] = FrameType.Events;
            keyFrames.onSelect.add(() => {
                CSEditor.instance.selectFrames(index, FrameType.Events, false);
                this.addHoverListener(keyFrames.mBtn, keyFrames.uiObject);
            });
        });
    }

    /**
     * 选中指定索引的帧UINode
     * @param index 指定索引
     * @param type 帧类型
     * @param isInternal 是否为内部调用
     */
    public selectKeyFrames(index: number, type: FrameType) {
        const node = this._keyFramesUIPool.nodes.find((node) => {
            return node.uiObject["index"] == index && node.uiObject["type"] == type;
        });
        this._keyFramesUIPool.selectNode(node);
    }

}