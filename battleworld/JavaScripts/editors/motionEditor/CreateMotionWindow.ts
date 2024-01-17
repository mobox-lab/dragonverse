import { EventManager } from "../../tool/EventManager";
import { VList } from "../../tool/NodeList";
import Tips from "../../tool/P_Tips";
import CreateMotionWindow_Generate from "../../ui-generate/editor_motion/CreateMotionWindow_generate";
import ItemDropGroup_Generate from "../../ui-generate/editor_motion/ItemDropGroup_generate";
import { MotionDataManager } from "./MotionDataManager";
import { UIEvent_editMotion } from "./UIEvent_editMotion";

export class ItemGroupDrop extends ItemDropGroup_Generate implements VList.IItemRender {
    realIndex: number;

    onStart() {
        this.mBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
    }

    setData(data: any): void {
        this.mBtn.text = data;
    }

    get clickObj(): mw.Button | mw.StaleButton {
        return this.mBtn;
    }

    setSelect(bool: boolean): void {

    }

}

export class CreateMotionWindow extends CreateMotionWindow_Generate {


    private _dropList: VList.NodeList = null;

    onStart() {
        this.layer = mw.UILayerSystem + 1;

        this.bg.onClicked.add(() => {
            mw.UIService.hide(CreateMotionWindow)
        })

        this.btn_create.onClicked.add(this.onClickCreate.bind(this));


        this.mDropBtn.onClicked.add(() => {
            let visibility = this.mDropScroll.visible ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.Visible;
            this.mDropScroll.visibility = visibility;
        });

        this.mDropScroll.visibility = mw.SlateVisibility.Collapsed;

        this._dropList = new VList.NodeList(this.mDropContent, ItemGroupDrop);

        this._dropList.InitCallback.add(this.listen_initCallback, this);
        this._dropList.ItemCallback.add(this.listen_itemCallback, this);
    }

    private listen_initCallback(index: number, item: ItemGroupDrop) {
        item.mBtn.onClicked.add(() => {
            this._groupIndex = item.realIndex;
            this.refresh_dropText();
        });
    }

    private listen_itemCallback(index: number, item: ItemGroupDrop) {
        item.setData(this._groupNames[index]);
    }


    private _groupNames: string[] = [];

    private _groupIndex: number = 0;

    onShow() {

        this._groupNames.length = 0;
        this._groupIndex = 0;
        for (const [key, value] of MotionDataManager.instance._groupClipMap.entries()) {
            this._groupNames.push(key);
        }

        this.refresh_dropText();

        this._dropList.setData(this._groupNames);
    }

    private refresh_dropText() {
        this.mDropScroll.visibility = mw.SlateVisibility.Collapsed;
        if (this._groupNames[this._groupIndex]) {
            this.mDropBtn.text = this._groupNames[this._groupIndex];
        }
    }

    private onClickCreate() {

        let groupName = this._groupNames[this._groupIndex];
        if (StringUtil.isEmpty(groupName)) {
            Tips.show("请先创建组名");
            return;
        }

        let name = this.input_name.text
        let frame = this.input_frame_count.text
        // 未输入
        if (StringUtil.isEmpty(name)) return
        if (Number(frame) <= 0) {
            Tips.show("帧数必须大于0");
            return;
        }


        let mConfigId = this.mConfigId.text;
        if (StringUtil.isEmpty(mConfigId)) {
            return;
        }
        let numConfigId = Number(mConfigId);
        if (numConfigId <= 0) {
            Tips.show("配表id必须大于0");
            return;
        }


        // 重名
        for (let index = 0; index < MotionDataManager.instance._motionClips.length; index++) {
            const clip = MotionDataManager.instance._motionClips[index];
            if (clip.name == name) {
                Tips.show("已有同名的Montion");
                return;
            }
            if (clip.motionId == numConfigId) {
                Tips.show("配表id重复");
                return;
            }
        }




        // 生成
        mw.UIService.hide(CreateMotionWindow);

        EventManager.instance.call(UIEvent_editMotion.AddMontion, numConfigId, groupName, name, frame);
    }
}

