import { GameConfig } from "../../../config/GameConfig";
import { Globaldata } from "../../../const/Globaldata";
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
            let ui = this.mSelectPanel.getChildAt(index);
            if (ui instanceof StaleButton || ui instanceof Button) {
                ui.onClicked.add(() => {
                    UIService.hide(SkillSelectPanel);
                    this.mSkill.replaceSkillLibId(this.selectSkillLibId, index);
                });
            }
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

        this.mClosebtn.onClicked.add(() => {
            UIService.hide(SkillSelectPanel);
        })


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
        this.bg.imageGuid = this.getBgImageGuid(skillLibCfg.weaponType);
        let msg = GameConfig.Language.SkillSelect_1.Value;

        let msg2 = StringUtil.format(msg, skillCfg.Name);

        this.mTipText.text = msg2;

        let skillIds = ModuleService.getModule(SkillModuleC).getEquipSkillLibIds();
        if (skillIds.length === 4) {
            for (let i = 1; i < 5; i++) {
                let skillLibCfg = GameConfig.SkillLib.getElement(skillIds[i - 1]);
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
                (this[`mSelectBtn${i}`] as Button).normalImageGuid = skillLibCfg.changeIconGuid;
                (this[`skill${i}`] as TextBlock).text = skillCfg.Name;
            }
        }

        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            UIService.hide(SkillSelectPanel);
        })
    }

    onHide() {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }

    private getBgImageGuid(weaponId: number): string {
        switch (weaponId) {
            case 1: return Globaldata.punchBgImgGuid;
            case 2: return Globaldata.singleSwordBgImgGuid;
            case 3: return Globaldata.wandBgImgGuid;
            case 4: return Globaldata.twoHandedSwordBgImgGuid;
            default: return Globaldata.punchBgImgGuid;
        }
    }
}