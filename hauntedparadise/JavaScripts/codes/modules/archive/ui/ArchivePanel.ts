/*
 * @Author       : dal
 * @Date         : 2023-11-13 15:58:14
 * @LastEditors  : dal
 * @LastEditTime : 2023-11-23 18:02:06
 * @FilePath     : \hauntedparadise\JavaScripts\modules\archive\ui\ArchivePanel.ts
 * @Description  : 
 */
import Archive_UI_Generate from "../../../../ui-generate/ShareUI/procedure/Archive_UI_generate";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { StyleType } from "../../blackboard/BoardDefine";
import { MainMenuPanel } from "../../procedure/ui/MainMenuPanel";
import { ArchiveData, MaxArchiveNum } from "../ArchiveHelper";
import ArchiveModuleC from "../ArchiveModuleC";
import ArchiveItem from "./ArchiveItem";

export class ArchivePanel extends Archive_UI_Generate {

    private _archiveItemMap: Map<number, ArchiveItem> = new Map();

    onStart(): void {
        for (let index = 0; index < MaxArchiveNum; index++) {
            // 初始化activeItem
            const archiveItem = new ArchiveItem(
                this[`btn_del${index + 1}`],
                this[`text_diffi${index + 1}`],
                this[`text_day${index + 1}`],
                this[`text_time${index + 1}`],
                this[`text_unknown${index + 1}`],
                this[`text_date${index + 1}`],
                this[`btn_start${index + 1}`],
                this[`text_start${index + 1}`]);
            archiveItem.id = index;
            archiveItem.initButtons();
            this._archiveItemMap.set(index, archiveItem);
        }

        this.btn_back.onClicked.add(this.backToMainPanel.bind(this));
    }

    private backToMainPanel() {
        UIService.hideUI(this);
        UIService.show(MainMenuPanel);
    }

    /** 请求刷新存档信息 */
    public async reqRefreshArchiveInfo() {
        const allDataList: ArchiveData[] = await ModuleService.getModule(ArchiveModuleC).reqAllData();
        this._archiveItemMap.forEach((item, id) => {
            item.setInfo(allDataList[id]);
        });
    }

    onShow(style: StyleType = StyleType.Cute) {
        GhostTraceHelper.uploadMGS("ts_action_open_box", "存档界面", { box_id: 1 });
        this._archiveItemMap.forEach(item => { item.style = style });
    }
}