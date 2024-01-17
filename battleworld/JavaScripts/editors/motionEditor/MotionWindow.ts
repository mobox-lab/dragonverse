import { EModule_Events } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { Singleton } from "../../tool/FunctionUtil";
import Tips from "../../tool/P_Tips";
import { IItemRender, UIMultiScroller } from "../../tool/UIMultiScroller";
import FrameNodeBtn_generate from "../../ui-generate/editor_motion/FrameNodeBtn_generate";
import MotionEditorWindow_Generate from "../../ui-generate/editor_motion/MotionEditorWindow_generate";
import { CreateMotionWindow } from "./CreateMotionWindow";
import { EFrameNodeType } from "./MontionEnum";
import { MotionDataManager } from "./MotionDataManager";
import { MotionFrameNode } from "./MotionFrameNodeBase";
import { MotionFrameNodePanel } from "./MotionFrameNodePanel";
import { MotionFramePanel } from "./MotionFramePanel";
import { MotionListPanel } from "./MotionListPanel";
import { MotionManager } from "./MotionManager";
import { CreateGroupPanel } from "./UI/CreateGroupPanel";
import { UIEvent_editMotion } from "./UIEvent_editMotion";



/**帧节点功能按钮 */
class FrameNodeBtn extends FrameNodeBtn_generate implements IItemRender {
    updateData(): void {

    }
    realIndex: number;

    public data: INodeBtnData = null;

    onStart() {
        this.mBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
    }

    setData(data: INodeBtnData): void {
        this.data = data;
        this.mBtn.text = data.uiName;

    }

    get clickObj(): mw.StaleButton {
        return this.mBtn;
    }

    setSelect(bool: boolean): void {

    }

}

interface INodeBtnData {
    uiName: string;
    /**关联的节点类型 */
    nodeType: EFrameNodeType;
}

@Singleton()
export class MotionWindow {
    public static instance: MotionWindow = null;

    private motionEditorWindow: MotionEditorWindow_Generate = null;

    private _nodeScroller: UIMultiScroller = null;

    public init() {
        this.motionEditorWindow = mw.UIService.create(MotionEditorWindow_Generate);


        let nodeScroll = this.motionEditorWindow.mNodeScroll;
        let nodeContent = this.motionEditorWindow.mNodeContent;



        this._nodeScroller = new UIMultiScroller(nodeScroll, nodeContent, FrameNodeBtn);

        this._nodeScroller.InitCallback.add(this.onInitItem, this);
        this._nodeScroller.ItemCallback.add(this.onRefeshItem, this);


        this.refresh_frameNodeScroll();

        MotionListPanel.instance.init();
        MotionFramePanel.instance.init();
        MotionFrameNodePanel.instance.init();

        this.motionEditorWindow.mBtnGroup.onClicked.add(() => {
            mw.UIService.show(CreateGroupPanel);
        });
        this.motionEditorWindow.mBtnMotion.onClicked.add(() => {

            /**请先创建一个组 */
            if (MotionDataManager.instance._groupClipMap.size == 0) {

                Tips.show("请先创建一个组");
                return;
            }

            mw.UIService.show(CreateMotionWindow);
        });

        this.motionEditorWindow.btn_play.onClicked.add(() => {
            Tips.show("播放motion")
            MotionManager.instance.playMotion();
        });

        this.motionEditorWindow.mSaveDataBtn.onClicked.add(() => {
            // 保存数据
            MotionManager.instance.saveData();
        });

        this.motionEditorWindow.btn_opacity.onClicked.add(() => {

            let opacity = this.motionEditorWindow.rootCanvas.renderOpacity;
            this.motionEditorWindow.rootCanvas.renderOpacity = opacity != 1 ? 1 : 0.1;
            this.motionEditorWindow.btn_opacity.renderOpacity = 1;
        });

        this.motionEditorWindow.btn_add.onClicked.add(() => {
            EventManager.instance.call(UIEvent_editMotion.AddFrameCount);
        });
        this.motionEditorWindow.btn_minus.onClicked.add(() => {
            EventManager.instance.call(UIEvent_editMotion.SubFrameCount);
        });

        this.motionEditorWindow.btn_stop.onClicked.add(() => {
            Tips.show("停止motion")
            EventManager.instance.call(EModule_Events.motion_stop);
        });
    }

    /**
     * 初始化
     * @param index 
     * @param renderItem 
     */
    private onInitItem(index: number, renderItem: IItemRender) {
        let btn = renderItem.clickObj;
        if (btn) {
            btn.onClicked.add(() => {
                if (renderItem instanceof FrameNodeBtn) {
                    // 增加节点事件
                    EventManager.instance.call(UIEvent_editMotion.AddFrameNode, renderItem.data.nodeType);
                }
            });
        }
    }

    /**
     * 刷新任务item数据
     * @param index 
     * @param renderItem 
     */
    private onRefeshItem(index: number, renderItem: IItemRender) {

        let nodes = MotionFrameNode.nodeClassArr[index];
        //this._nodeDatas[index]
        renderItem.setData(nodes);

    }

    public refresh_frameNodeScroll() {
        let nodes = MotionFrameNode.nodeClassArr;
        //this._nodeDatas
        this._nodeScroller.setData(nodes);
    }

    public show_editView() {
        mw.UIService.showUI(this.motionEditorWindow, mw.UILayerDialog);
    }


}
