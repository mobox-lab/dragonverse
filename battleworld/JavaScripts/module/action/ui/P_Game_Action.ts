import { IActionElement } from "../../../config/Action";
import { GameConfig } from "../../../config/GameConfig";
import { EModule_Events } from "../../../const/Enum";
import { EventManager } from "../../../tool/EventManager";
import { Notice } from "../../../tool/Notice";
import { util } from "../../../tool/Utils";
import P_Game_Action_Generate from "../../../ui-generate/action/P_Game_Action_generate";

// import { VehicleManager } from "../../VehicleModule/VehicleManager";
import { ActionItem } from "./ActionItem";

export class P_Game_Action extends P_Game_Action_Generate {

    // 动作列表
    private mActionList: ActionItem[] = [];
    // 当前是否在打开动作界面
    public isOpenAction: boolean = false;

    onStart() {
        this.createItem();
        this.registerEvent();
    }

    /**
     * 创建item
     */
    private createItem() {
        let all = GameConfig.Action.getAllElement();
        for (let i = 0; i < all.length; i++) {
            let item = mw.UIService.create(ActionItem);
            item.setData(all[i]);
            this.mActionList.push(item);
            this.mContent.addChild(item.uiObject);
            item.onClick.clear();
            item.onClick.add(this.clickItem, this);
        }
    }

    /**
     * 注册事件
     */
    private registerEvent() {
        this.mCloseBtn.onClicked.add(() => {
            mw.UIService.hideUI(this);
            this.isOpenAction = false;
        });
    }

    /**
     * 点击item
     */
    private clickItem(item: ActionItem) {
        // if (VehicleManager.DriveType == EDriveType.driving) {
        //     let noteTxt = util.getLanguageByKey("Vehicle_tip_8");//"当前状态受限"
        //     Notice.showDownNotice(noteTxt);
        //     return;
        // }
        item.mBtn.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        TimeUtil.delaySecond(0.5).then(() => { item.mBtn.visibility = mw.SlateVisibility.Visible; });
        EventManager.instance.call(EModule_Events.playAction, item.data.ID);
        this.isOpenAction = false;
    }
}