/*
 * @Author       : dal
 * @Date         : 2024-01-04 18:28:31
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-04 18:32:02
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\procedure\ui\UnlockNewDegreePanel.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import UnlockDiffi_UI_Generate from "../../../../ui-generate/ShareUI/UnlockDiffi_UI_generate";
import { DegreeType } from "../../blackboard/BoardDefine";
import { ProcedureModuleC } from "../ProcedureModuleC";

export class UnlockNewDegreePanel extends UnlockDiffi_UI_Generate {

    protected onStart(): void {
        this.layer = UILayerTop;
        this.btn_back.onClicked.add(() => {
            UIService.hideUI(this);
            ModuleService.getModule(ProcedureModuleC).removeNewDegree(this.newDegree);
        });
    }

    newDegree: DegreeType;

    protected onShow(degree: DegreeType) {
        this.newDegree = degree;
        this.text_diffiUnlock.text = StringUtil.format(GameConfig.Language["diffilock_02"].Value, GameConfig.Difficulty.getElement(degree).name);
    }
}