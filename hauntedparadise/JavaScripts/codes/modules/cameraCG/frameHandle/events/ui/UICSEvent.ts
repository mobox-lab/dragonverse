import { CSEditor } from "../../../CSEditor";
import { EventsHelper } from "../EventsHelper";
import { FrameType } from "../../../model/FrameType";
import { CSEventUI_Generate } from "../../../ui/generate/frameInfo/CSEventUI_generate";
import { UICSCommInfo } from "./UICSCommInfo";
import { UIEvents } from "../EventsHandle";
import { Log } from "../../../utils/Log";
import { GridSelectContainer } from "../../../utils/UIPool";
import { UICSEventItem } from "./UICSEventItem";

export class UICSEvent extends CSEventUI_Generate {

    private eventsGrid: GridSelectContainer<UICSEventItem>;

    /** 是用过的UI池 */
    private catchMap: Map<string, mw.Widget> = new Map();
    /** 上次显示的UI */
    private lastUI: string;

    /** 默认高度 */
    private defHeight: number;
    /** 默认Y坐标 */
    private defPosY: number;

    protected onStart(): void {
        this.layer = UILayerTop;
        this.initUI();
    }

    private initUI(): void {
        this.eventsGrid = new GridSelectContainer(this.cav_events, UICSEventItem);
        this.cav_eventsParents.visibility = mw.SlateVisibility.Collapsed;
        this.btn_eventType.onClicked.add(() => {
            this.eventsGrid.removeAllNode();
            const item = this.eventsGrid.addNode();
            item.setData("自定义");
            item.onSelect.add(() => {
                this.txt_eventName.text = "自定义";
                this.cav_eventsParents.visibility = mw.SlateVisibility.Collapsed;
                CSEditor.instance.modifyEventFramesName(CSEditor.instance.selectFramesIndex, "EventName");
                this.selectFrames(CSEditor.instance.selectFramesIndex);
            });
            EventsHelper.instance.eventInfoMap.forEach((eventInfo, key) => {
                if (eventInfo.name == this.txt_eventName.text) return;
                const item = this.eventsGrid.addNode();
                item.setData(eventInfo.name);
                item.onSelect.add(() => {
                    this.txt_eventName.text = eventInfo.name;
                    this.cav_eventsParents.visibility = mw.SlateVisibility.Collapsed;
                    CSEditor.instance.modifyEventFramesName(CSEditor.instance.selectFramesIndex, key);
                    // 参数处理
                    const defParams = EventsHelper.instance.eventHandleMap.get(key).getDefParams();
                    CSEditor.instance.modifyEventFramesParams(CSEditor.instance.selectFramesIndex, JSON.stringify(defParams));
                    this.selectFrames(CSEditor.instance.selectFramesIndex);
                });
            });
            this.cav_eventsParents.visibility = this.cav_eventsParents.visibility == mw.SlateVisibility.SelfHitTestInvisible ?
                mw.SlateVisibility.Collapsed :
                mw.SlateVisibility.SelfHitTestInvisible;
        });
        // Del
        this.mBtnDelKeyFrame.onClicked.add(() => {
            CSEditor.instance.delKeyframe(FrameType.Events);
        });
    }

    public setPos(pos: Vector2): void {
        UIService.showUI(this);
        this.uiObject.position = pos;
        this.rootCanvas.visibility = mw.SlateVisibility.Hidden;
        this.defPosY = this.uiObject.position.y;
        this.defHeight = this.cav_content.size.y;
    }

    /** 
     * 选中帧
     * @param index
     */
    selectFrames(index: number) {
        const info = CSEditor.instance.getEventFrames(index);
        if (this.rootCanvas.visibility != mw.SlateVisibility.Visible) {
            this.rootCanvas.visibility = mw.SlateVisibility.Visible;
        }
        const eventInfo = EventsHelper.instance.eventInfoMap.get(info.name);
        const ui: UIScript = !eventInfo ? UIService.getUI(UICSCommInfo) : UIService.getUI(eventInfo.panelClass);
        const key = !eventInfo ? "UICSComm" : eventInfo.name;
        const name = !eventInfo ? "自定义" : eventInfo.name;
        if (!this.catchMap.has(key)) {
            this.catchMap.set(key, ui.uiObject);
            this.cav_content.addChild(ui.uiObject);
        }
        try {
            this.txt_eventName.text = name;
            (ui as unknown as UIEvents).setData(info);
        } catch (e) {
            Log.err(e);
        }
        if (this.lastUI) this.catchMap.get(this.lastUI).visibility = mw.SlateVisibility.Collapsed;
        this.cav_content.size = ui.rootCanvas.size;
        this.catchMap.get(key).visibility = mw.SlateVisibility.SelfHitTestInvisible;
        // 自适应高低
        this.uiObject.position = new Vector2(this.uiObject.position.x, this.defPosY - (this.cav_content.size.y - this.defHeight));
        this.lastUI = key;
    }

    /**
     * 取消帧选中
     */
    public unSelectFrames() {
        // 将选中用于修改的节点置为空
        if (this.rootCanvas.visibility != mw.SlateVisibility.Hidden) {
            this.rootCanvas.visibility = mw.SlateVisibility.Hidden;
        }
    }

}