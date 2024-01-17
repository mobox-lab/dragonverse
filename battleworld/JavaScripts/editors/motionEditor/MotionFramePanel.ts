import { MapEx } from "odin";
import { EventManager } from "../../tool/EventManager";
import { Singleton } from "../../tool/FunctionUtil";
import { IItemRender, UIMultiScroller } from "../../tool/UIMultiScroller";
import MotionEditorWindow_Generate from "../../ui-generate/editor_motion/MotionEditorWindow_generate";
import MotionFrameClip_Generate from "../../ui-generate/editor_motion/MotionFrameClip_generate";
import { MotionManager } from "./MotionManager";
import { UIEvent_editMotion } from "./UIEvent_editMotion";


interface IFrameData {
    index: number;
    isHasData: boolean;
}

/**动画帧片段 */
class MotionFrameClip extends MotionFrameClip_Generate implements IItemRender {
    updateData(): void {

    }
    realIndex: number;

    onStart() {
        this.mSelected.visibility = mw.SlateVisibility.Collapsed;

        this.mBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;

        this.mDataTag.visibility = mw.SlateVisibility.Collapsed;
    }

    public data: IFrameData = null;

    setData(data: IFrameData): void {
        this.data = data;
        this.mFrameText.text = data.index.toString();
        if (this.mDataTag.visible != this.data.isHasData) {
            this.mDataTag.visibility = this.data.isHasData ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        }
    }

    get clickObj(): mw.StaleButton {
        return this.mBtn;
    }

    setSelect(bool: boolean): void {
        if (this.mSelected.visible == bool) {
            return;
        }
        let visibility = bool ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;

        this.mSelected.visibility = visibility;
    }

}


/**技能帧节点功能UI */
@Singleton()
export class MotionFramePanel {
    public static instance: MotionFramePanel = null;


    private motionEditorWindow: MotionEditorWindow_Generate = null;

    /**帧节点列表 */
    private frameNodeScroll: UIMultiScroller = null;

    /**帧数据 */
    private frameDatas: IFrameData[] = [];

    public init() {
        this.motionEditorWindow = mw.UIService.getUI(MotionEditorWindow_Generate, false);

        let scrollView = this.motionEditorWindow.mFrameScroll;
        let content = this.motionEditorWindow.mFrameContent;

        this.frameNodeScroll = new UIMultiScroller(scrollView, content, MotionFrameClip);

        this.frameNodeScroll.InitCallback.add(this.onInitItem, this);
        this.frameNodeScroll.ItemCallback.add(this.onRefeshItem, this);

        this.refresh_frameScroll();

        EventManager.instance.add(UIEvent_editMotion.Change_MotionIndex, this.listen_changeMontion.bind(this));
        EventManager.instance.add(UIEvent_editMotion.Motion_UpdateLogic, this.listen_updateLogic.bind(this));
        EventManager.instance.add(UIEvent_editMotion.Refresh_Motion, this.listen_refreshMotiom.bind(this));
    }
    /**montionindex改变 */
    private listen_changeMontion() {
        this.refresh_frameScroll();
    }

    private listen_updateLogic(frameIndex: number) {
        this.refresh_updateLogic(frameIndex, true);
    }

    private listen_refreshMotiom() {
        this.refresh_frameScroll();
    }

    /**
     * 初始化
     * @param index 
     * @param renderItem 
     */
    private onInitItem(index: number, renderItem: IItemRender) {
        if (renderItem instanceof MotionFrameClip) {
            let btn = renderItem.clickObj;
            if (btn) {

                /**点击帧片段 */
                btn.onClicked.add(() => {
                    EventManager.instance.call(UIEvent_editMotion.Select_FrameNodexIndex, renderItem.data.index);

                    this.refresh_frameScroll(false);
                });
            }
            renderItem.setSelect(false);
        }

    }

    /**
     * 刷新任务item数据
     * @param index 
     * @param renderItem 
     */
    private onRefeshItem(index: number, renderItem: IItemRender) {
        renderItem.setData(this.frameDatas[index]);

        renderItem.setSelect(this._curFrameIndex == index);
    }

    private _curFrameIndex: number = 0;

    /**刷新帧列表 */
    public refresh_frameScroll(reset: boolean = true) {
        this.refresh_updateLogic(MotionManager.instance.curSelectFrameNodexIndex, reset);
    }


    private refresh_updateLogic(frameIndex: number, reset: boolean = true) {

        this.frameDatas.length = 0;

        this._curFrameIndex = frameIndex;

        let curMotionClip = MotionManager.instance.getCurSelectMotionClip();

        //let curMotionClip = MotionDataManager.instance._motionClips[MotionManager.instance.curSelectMotionListIndex];

        EventManager.instance.call(UIEvent_editMotion.RefreshFrameNode);
        if (curMotionClip == null) {
            this.frameNodeScroll.setData(this.frameDatas);
            return;
        }


        for (let index = 0; index < curMotionClip.frameCount; index++) {
            let motionNodes = MapEx.get(curMotionClip.motionNodeMap, index);
            let has = motionNodes != null && motionNodes.length > 0;

            this.frameDatas.push({
                index: index,
                isHasData: has
            });

        }

        this.frameNodeScroll.setData(this.frameDatas, reset);
    }

}
