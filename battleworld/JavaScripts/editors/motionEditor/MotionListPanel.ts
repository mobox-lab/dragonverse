import { EventManager } from "../../tool/EventManager";
import { Singleton } from "../../tool/FunctionUtil";
import { IItemRender, UIMultiScroller } from "../../tool/UIMultiScroller";
import ItemMotionGroup_Generate from "../../ui-generate/editor_motion/ItemMotionGroup_generate";

import MotionEditorWindow_Generate from "../../ui-generate/editor_motion/MotionEditorWindow_generate";
import MotionListItem_Generate from "../../ui-generate/editor_motion/MotionListItem_generate";
import { EFrameNodeType } from "./MontionEnum";
import { motionClip, MotionDataManager } from "./MotionDataManager";
import { MotionManager } from "./MotionManager";
import { UIEvent_editMotion } from "./UIEvent_editMotion";


class ItemMotionGroup extends ItemMotionGroup_Generate implements IItemRender {
    updateData(): void {

    }
    realIndex: number;

    onStart() {
        this.mBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mDelBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mSelect.visibility = mw.SlateVisibility.Collapsed;
    }

    setData(data: any): void {
        this.mText.text = data;
    }

    get clickObj(): mw.Button | mw.StaleButton {
        return this.mBtn;
    }
    setSelect(bool: boolean): void {

        let visibility = bool ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        this.mSelect.visibility = visibility;
    }

}

type TListData = {
    index: number;
    data: motionClip;
}

class MotionListItem extends MotionListItem_Generate implements IItemRender {
    updateData(): void {

    }
    realIndex: number;
    /**选中item */
    public action_btn: Action = new Action();
    /**删除item */
    public action_deleteBtn: Action = new Action();

    public data: TListData = null;

    onStart() {
        this.mSelected.visibility = mw.SlateVisibility.Collapsed;
        this.mBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mDelete.touchMethod = mw.ButtonTouchMethod.PreciseTap;

        this.mBtn.onClicked.add(() => {
            this.action_btn.call();
        });
        this.mDelete.onClicked.add(() => {
            this.action_deleteBtn.call();
        });
    }

    setData(data: TListData): void {
        this.data = data;
        this.mIndex.text = data.index.toString();
        this.mName.text = data.data.name;
        this.mFrameCount.text = data.data.frameCount.toString();
    }

    get clickObj(): mw.StaleButton {
        return null;
    }

    setSelect(bool: boolean): void {
        if (this.mSelected.visible == bool) {
            return;
        }
        let visibility = bool ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
        this.mSelected.visibility = visibility;
    }
}

/**montionUI列表 */
@Singleton()
export class MotionListPanel {
    public static instance: MotionListPanel = null;

    private motionEditorWindow: MotionEditorWindow_Generate = null;

    private _groupScroll: UIMultiScroller = null;

    /**帧节点列表 */
    private listScroll: UIMultiScroller = null;

    private _groupNames: string[] = [];

    private _curClips: motionClip[] = [];

    public init() {
        this.motionEditorWindow = mw.UIService.getUI(MotionEditorWindow_Generate, false);



        let scrollView_group = this.motionEditorWindow.mGroupScrollBox;
        let content_group = this.motionEditorWindow.mGroupContent;

        this._groupScroll = new UIMultiScroller(scrollView_group, content_group, ItemMotionGroup);
        this._groupScroll.InitCallback.add(this.onInitItem_group, this);
        this._groupScroll.ItemCallback.add(this.onRefeshItem_group, this);


        let scrollView = this.motionEditorWindow.mMotionListScroll;
        let content = this.motionEditorWindow.mMotionListContent;

        this.listScroll = new UIMultiScroller(scrollView, content, MotionListItem);

        this.listScroll.InitCallback.add(this.onInitItem, this);
        this.listScroll.ItemCallback.add(this.onRefeshItem, this);






        EventManager.instance.add(UIEvent_editMotion.AddMontion, this.listen_addMontion.bind(this));
        EventManager.instance.add(UIEvent_editMotion.Change_MotionIndex, this.listen_changeMontion.bind(this));

        EventManager.instance.add(UIEvent_editMotion.MotionAddGroupName, this.listen_addGroupName.bind(this));

        EventManager.instance.add(UIEvent_editMotion.Change_GroupIndex, this.listen_changeGroupIndex.bind(this));


        this.refresh_groupList();
    }
    private listen_changeGroupIndex() {
        this.refresh_groupList(false);
    }
    private listen_addGroupName(groupName: string) {
        this.refresh_groupList();
    }

    /**增加一个montion */
    private listen_addMontion(name: string, frameCount: number) {
        this.refresh_motionList();
    }
    /**montionindex改变 */
    private listen_changeMontion() {
        this.refresh_motionList(false);
    }


    /**
     * 初始化
     * @param index 
     * @param renderItem 
     */
    private onInitItem_group(index: number, renderItem: IItemRender) {

        if (renderItem instanceof ItemMotionGroup) {
            renderItem.mBtn.onClicked.add(() => {
                EventManager.instance.call(UIEvent_editMotion.Select_GroupIndex, renderItem.realIndex);
            });
            renderItem.mDelBtn.onClicked.add(() => {
                EventManager.instance.call(UIEvent_editMotion.Delete_GroupIndex, renderItem.realIndex);
            });
        }

        renderItem.setSelect(false);
    }

    /**
     * 刷新任务item数据
     * @param index 
     * @param renderItem 
     */
    private onRefeshItem_group(index: number, renderItem: IItemRender) {
        renderItem.setData(this._groupNames[index]);
        renderItem.setSelect(index == MotionManager.instance.curGroupIndex);
    }


    /**刷新组 */
    private refresh_groupList(isReset: boolean = true) {
        this._groupNames = Array.from(MotionDataManager.instance._groupClipMap.keys());

        if (this._groupNames == null) {
            this._groupScroll.setData([]);
            EventManager.instance.call(UIEvent_editMotion.Select_MontionIndex, 0);
            return;
        }

        this._groupScroll.setData(this._groupNames, isReset);

        EventManager.instance.call(UIEvent_editMotion.Select_MontionIndex, 0);
    }

    /**
     * 初始化
     * @param index 
     * @param renderItem 
     */
    private onInitItem(index: number, renderItem: IItemRender) {

        if (renderItem instanceof MotionListItem) {
            renderItem.action_btn.add(() => {
                EventManager.instance.call(UIEvent_editMotion.Select_MontionIndex, renderItem.data.index);
            });
            renderItem.action_deleteBtn.add(() => {
                EventManager.instance.call(UIEvent_editMotion.Delete_MotionIndex, renderItem.data.index);
            });
        }

        renderItem.setSelect(false);
    }

    /**
     * 刷新任务item数据
     * @param index 
     * @param renderItem 
     */
    private onRefeshItem(index: number, renderItem: IItemRender) {

        let data = this._curClips[index];
        let itemData: TListData = {
            index: index,
            data: data
        }
        renderItem.setData(itemData);
        renderItem.setSelect(index == MotionManager.instance.curSelectMotionListIndex);

    }



    /**刷新帧列表 */
    public refresh_motionList(isReset: boolean = true) {

        let names = Array.from(MotionDataManager.instance._groupClipMap.keys());


        let name = names[MotionManager.instance.curGroupIndex];

        if (name == null || MotionDataManager.instance._groupClipMap.has(name) == false) {
            this.listScroll.setData([]);
            return;
        }

        this._curClips = MotionDataManager.instance._groupClipMap.get(name);

        this.listScroll.setData(this._curClips, isReset);
    }


}
