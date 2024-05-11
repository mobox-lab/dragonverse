import { GameConfig } from "../../../config/GameConfig";
import { EAnalyticsEvents, EPlayerEvents_C } from "../../../const/Enum";
import { Globaldata } from "../../../const/Globaldata";
import KeyOperationManager from "../../../controller/key-operation-manager/KeyOperationManager";
import { EventManager } from "../../../tool/EventManager";
import { VList } from "../../../tool/NodeList";
import { TimerTool } from "../../../tool/TimerTool";
import ItemSkillSelect_Generate from "../../../ui-generate/Skill/ItemSkillSelect_generate";
import SkillPanel_Generate from "../../../ui-generate/Skill/SkillPanel_generate";
import { AnalyticsTool, EClickEvent, EFirstDo } from "../../AnalyticsModule/AnalyticsTool";
import { AttributeModuleC } from "../../AttributeModule/AttributeModuleC";
import { SkillModuleC } from "../SkillModuleC";
import { SkillSelectPanel } from "./SkillSelectPanel";

class ItemSkillSelect extends ItemSkillSelect_Generate implements VList.IItemRender {

    public realIndex: number = 0;

    /**技能库id */
    public skillLibId: number = 0;

    private mSkill: SkillModuleC = null;

    onStart() {
        this.mSkill = ModuleService.getModule(SkillModuleC);
    }

    setData(skillLibId: number): void {
        this.skillLibId = skillLibId;

        // 技能库配置信息
        let skillLibCfg = GameConfig.SkillLib.getElement(skillLibId);
        if (skillLibCfg == null) {
            return;
        }

        // 技能按钮配置信息
        let btnDataCfg = GameConfig.MotionBtnData.getElement(skillLibCfg.motionBtnDataId);
        if (btnDataCfg == null) {
            return;
        }

        // 技能信息
        let motionSkillId = btnDataCfg.skillIds[0];
        let motionSkillCfg = GameConfig.MotionSkill.getElement(motionSkillId);
        if (motionSkillCfg == null) {
            return;
        }

        this.bg_1_1.imageGuid = skillLibCfg.selectIconGuid

        this.mSkillName.text = motionSkillCfg.Name;

        if (SkillPanel.isSimple) {
            this.mSkillDesc.text = motionSkillCfg.desc_lan_simple;
        } else {
            this.mSkillDesc.text = motionSkillCfg.desc_lan;
        }

        this.mHasBtn.visibility = mw.SlateVisibility.Collapsed;
        this.mSelectBtn.visibility = mw.SlateVisibility.Collapsed;
        this.mReplaceBtn.visibility = mw.SlateVisibility.Collapsed;

        // 当前装备的技能数组
        let equipSkillLibIds = this.mSkill.getEquipSkillLibIds();

        if (equipSkillLibIds.includes(this.skillLibId)) {
            this.mHasBtn.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            return;
        }

        if (equipSkillLibIds.length >= Globaldata.maxEquipSkillCount) {
            this.mReplaceBtn.visibility = mw.SlateVisibility.Visible;
            return;
        }
        this.mSelectBtn.visibility = mw.SlateVisibility.Visible;
    }

    get clickObj(): mw.StaleButton | mw.Button {
        return null;
    }

    setSelect(bool: boolean): void {

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

export class SkillPanel extends SkillPanel_Generate {

    /**是否为详细介绍 */
    public static isSimple: boolean = true;

    private mSelectNodeList: VList.NodeList = null;

    private mAttribute: AttributeModuleC = null;
    private mSkillModule: SkillModuleC = null;


    /**关闭当前界面的回调 */
    public onAction_closePanel: Action = new Action();

    private isGuiding: boolean = false;


    onStart() {
        this.layer = mw.UILayerTop;
        this.rootCanvas.visibility = mw.SlateVisibility.Visible;
        this.mAttribute = ModuleService.getModule(AttributeModuleC);
        this.mSkillModule = ModuleService.getModule(SkillModuleC);

        this.mSelectNodeList = new VList.NodeList(this.mSelectList, ItemSkillSelect);
        this.mSelectNodeList.InitCallback.add(this.initCall_selectNodeList, this);
        this.mSelectNodeList.ItemCallback.add(this.itemCall_selectNodeList, this);

        this.mCollapsedBtn.onClicked.add(() => {

            if (this.isGuiding == true) {
                return;
            }

            UIService.hideUI(this);

            // 埋点
            AnalyticsTool.send_ts_action_click(EClickEvent.skillretract);

            // 埋点
            EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.skillretract);
        });


        this.mWaiveBtn.onClicked.add(() => {

            if (this.isGuiding == true) {
                return;
            }

            UIService.hideUI(this);
            this.mSkillModule.discardSkillLib();
        });

        // 显示详情
        this.mInfoBtn.onClicked.add(() => {

            if (TimerTool.isInCD("SkillInfo") == false) {
                TimerTool.recrodCD("SkillInfo");
                SkillPanel.isSimple = !SkillPanel.isSimple;
                this.refresh_nodeList();
            }
        });

    }


    /**被动技能列表初始化 */
    private initCall_selectNodeList(index: number, item: ItemSkillSelect) {
        item.mSelectBtn.onClicked.add(() => {
            if (item instanceof ItemSkillSelect) {
                this.mSkillModule.selectSkillLibId(item.skillLibId);
            }
        });

        item.mReplaceBtn.onClicked.add(() => {
            if (item instanceof ItemSkillSelect) {
                UIService.hideUI(this);
                UIService.show(SkillSelectPanel, item.skillLibId);
            }
        });
    }

    /**被动技能列表刷新 */
    private itemCall_selectNodeList(index: number, item: ItemSkillSelect) {
        let weaponBtnDataIds = this.mSkillModule.getRandomSkillLibIds();
        item.setData(weaponBtnDataIds[index]);

    }

    onShow(...param: any[]) {

        if (param[0]) {
            this.isGuiding = param[0];

        } else {
            this.isGuiding = false;
        }

        if (this.isGuiding) {
            this.mCollBox.visibility = mw.SlateVisibility.Collapsed;
            this.mSelectBox.visibility = mw.SlateVisibility.Collapsed;
        } else {
            this.mCollBox.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mSelectBox.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        }

        this.refresh_nodeList();

        EventManager.instance.call(EPlayerEvents_C.Player_RefreshSkillPoints);
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            UIService.hideUI(this);
        })
    }

    private refresh_nodeList() {

        this.mInfoBtn.text = SkillPanel.isSimple ? GameConfig.Language.SkillSelect_5.Value : GameConfig.Language.SkillSelect_6.Value;
        if (SkillPanel.isSimple == false) {
            // 埋点
            EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.skillexplanation);
        }

        let randomSkillIds = this.mSkillModule.getRandomSkillLibIds();
        this.mSelectNodeList.setData(randomSkillIds);
    }

    onHide() {
        EventManager.instance.call(EPlayerEvents_C.Player_RefreshSkillPoints);
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);

        this.onAction_closePanel.call();
        this.onAction_closePanel.clear();
    }

}