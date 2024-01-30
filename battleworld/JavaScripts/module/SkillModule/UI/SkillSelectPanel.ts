import { GameConfig } from "../../../config/GameConfig";
import KeyOperationManager from "../../../controller/key-operation-manager/KeyOperationManager";
import SkillSelectPanel_Generate from "../../../ui-generate/Skill/SkillSelectPanel_generate";
import { AnalyticsTool, EClickEvent } from "../../AnalyticsModule/AnalyticsTool";
import { SkillModuleC } from "../SkillModuleC";
import { SkillPanel } from "./SkillPanel";

export class SkillSelectPanel extends SkillSelectPanel_Generate {

    private mSkill: SkillModuleC = null;

    private selectSkillLibId: number = 0;

    onStart() {
        this.mSkill = ModuleService.getModule(SkillModuleC);

        this.layer = mw.UILayerTop;
        this.rootCanvas.visibility = mw.SlateVisibility.Visible;

        for (let index = 0; index < this.mSelectPanel.getChildrenCount(); index++) {
            let btn = this.mSelectPanel.getChildAt(index) as mw.StaleButton;
            btn.onClicked.add(() => {
                UIService.hide(SkillSelectPanel);
                this.mSkill.replaceSkillLibId(this.selectSkillLibId, index);

            });
        }

        // 重新选择按钮
        this.mSelectBtn.onClicked.add(() => {
            UIService.hide(SkillSelectPanel);
            UIService.show(SkillPanel);
        });

        // 放弃按钮
        this.mDiscardBtn.onClicked.add(() => {
            UIService.hide(SkillSelectPanel);
            this.mSkill.discardSkillLib();
        });

    }


    onShow(...param: any[]) {
        this.selectSkillLibId = param[0];

        let skillLibCfg = GameConfig.SkillLib.getElement(this.selectSkillLibId);
        if (skillLibCfg == null) {
            return;
        }

        let btnDataCfg = GameConfig.MotionBtnData.getElement(skillLibCfg.motionBtnDataId);
        if (btnDataCfg == null) {
            return;
        }


        let skillCfg = GameConfig.MotionSkill.getElement(btnDataCfg.skillIds[0]);
        if (skillCfg == null) {
            return;
        }

        let msg = GameConfig.Language.SkillSelect_1.Value;

        let msg2 = StringUtil.format(msg, skillCfg.Name);

        this.mTipText.text = msg2;

        KeyOperationManager.getInstance().onKeyUp(Keys.Escape, this, () => {
            UIService.hide(SkillSelectPanel);
            KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
        })
    }

}