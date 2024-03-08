/*
 * @Author       : dal
 * @Date         : 2023-11-13 17:11:29
 * @LastEditors  : dal
 * @LastEditTime : 2023-11-14 13:43:38
 * @FilePath     : \hauntedparadise\JavaScripts\modules\archive\ui\DeletePanel.ts
 * @Description  : 
 */
import Delarchive_UI_Generate from "../../../../ui-generate/ShareUI/procedure/Delarchive_UI_generate";
import Tips from "../../../utils/Tips";
import ArchiveModuleC from "../ArchiveModuleC";
import { ArchivePanel } from "./ArchivePanel";

export class DeletePanel extends Delarchive_UI_Generate {

    _archiveId: number;

    protected onShow(archiveId: number) {
        this._archiveId = archiveId;
    }

    protected onAwake(): void {
        this.initButtons();
        this.layer = UILayerTop;
        this.btn_no.onClicked.add(() => {
            UIService.hideUI(this);
        });

        Event.addServerListener("DeleteArchiveSuccess", () => {
            UIService.getUI(ArchivePanel).reqRefreshArchiveInfo();
            UIService.hideUI(this);
        });

        this.btn_yes.onClicked.add(async () => {
            ModuleService.getModule(ArchiveModuleC).reqDeleteData(this._archiveId);
        });
    }
}