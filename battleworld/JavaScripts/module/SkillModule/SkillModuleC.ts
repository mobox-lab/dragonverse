import { GameConfig } from "../../config/GameConfig";
import { EAnalyticsEvents, EAttributeEvents_C, EPlayerEvents_C, ESkillEvent_C } from "../../const/Enum";
import { Globaldata } from "../../const/Globaldata";
import { EventManager } from "../../tool/EventManager";
import { Notice } from "../../tool/Notice";
import { AnalyticsTool, EClickEvent, EFirstDo } from "../AnalyticsModule/AnalyticsTool";
import { AttributeModuleC } from "../AttributeModule/AttributeModuleC";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { SkillModuleS } from "./SkillModuleS";
import { SkillPanel } from "./UI/SkillPanel";
import { SkillSelectPanel } from "./UI/SkillSelectPanel";


export class SkillModuleC extends ModuleC<SkillModuleS, null>{

    /**属性同步模块 */
    private mAttribute: AttributeModuleC = null;

    /**随机的技能库id数组 */
    private randomSkillLibIds: number[] = [];
    /**当前装备的技能库id */
    private equipSkillLibIds: number[] = [];

    protected onStart(): void {

        this.mAttribute = ModuleService.getModule(AttributeModuleC);


        EventManager.instance.add(EAttributeEvents_C.Attribute_RandomSkillLibIds_Change_C,
            this.listen_randomSkillLibIds_Change, this);
        EventManager.instance.add(EAttributeEvents_C.Attribute_EquipSkillLibIds_Change_C,
            this.listen_equipSkillLibIdsChange, this);

        EventManager.instance.add(ESkillEvent_C.SkillEvent_OpenSelectSkill_C,
            this.listen_openSelectSkill, this);
        EventManager.instance.add(EPlayerEvents_C.Player_ChangeDeadState_C,
            this.listen_playerDead, this);

        EventManager.instance.add(EAttributeEvents_C.Attribute_SkillPoints_Change_C,
            this.listen_askillPoints_change, this);

        EventManager.instance.add(ESkillEvent_C.SkillEvent_PickUpSkillBall_C,
            this.listen_addSkillBall, this);

        EventManager.instance.add(ESkillEvent_C.SkillEvent_AddSkillPoint_C,
            this.listen_pickUpSkillBall, this);
    }

    private listen_addSkillBall() {
        this.server.net_addSkillPoint();
    }

    /**玩家拾取一个技能求 */
    private listen_pickUpSkillBall() {
        this.server.net_pickUpSkillBall();
    }

    /**
     * 技能点数量刷新
     */
    private listen_askillPoints_change(skillPointCount: number, oldValue: number) {
        if (skillPointCount > oldValue) {
            // 埋点
            EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.skillget);
        }
    }
    /**玩家死亡 */
    private listen_playerDead() {

        let skillPanel = UIService.getUI(SkillPanel, false);
        if (skillPanel && skillPanel.visible) {
            UIService.hide(SkillPanel);
        }

        let skillSelectPanel = UIService.getUI(SkillSelectPanel, false);
        if (skillSelectPanel && skillSelectPanel.visible) {
            UIService.hide(SkillSelectPanel);
        }
    }

    /**玩家当前随机的技能库id数组字符串 */
    private listen_randomSkillLibIds_Change(pId: number, attriValue: string) {
        if (pId != mw.Player.localPlayer.playerId) {
            return;
        }

        this.randomSkillLibIds.length = 0;
        if (StringUtil.isEmpty(attriValue)) {
            return;
        }

        let libIds = attriValue.split(",");
        for (let index = 0; index < libIds.length; index++) {
            const btnDataId = libIds[index];
            this.randomSkillLibIds.push(Number(btnDataId));
        }

    }

    /**玩家当前装备的技能库id数组 */
    private listen_equipSkillLibIdsChange(pId: number, attriValue: string) {
        if (pId != mw.Player.localPlayer.playerId) {
            return;
        }

        this.equipSkillLibIds.length = 0;
        if (StringUtil.isEmpty(attriValue)) {
            EventManager.instance.call(ESkillEvent_C.SkillEvent_RandomSkill_C, this.equipSkillLibIds);
            return;
        }

        let skillLibIds = attriValue.split(",");
        for (let index = 0; index < skillLibIds.length; index++) {
            const btnDataId = skillLibIds[index];
            this.equipSkillLibIds.push(Number(btnDataId));
        }

        EventManager.instance.call(ESkillEvent_C.SkillEvent_RandomSkill_C, this.equipSkillLibIds);

        if (this.equipSkillLibIds.length == Globaldata.maxEquipSkillCount) {
            // 埋点
            EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.skillmax);
        }
    }

    /**打开技能选择界面 */
    private listen_openSelectSkill() {

        let pointCount = this.mAttribute.getAttributeValue(Attribute.EnumAttributeType.weaponSkillPoints);
        if (pointCount <= 0) {
            //Notice.showDownNotice("技能点数不足");
            return;
        }

        UIService.show(SkillPanel);
        // 埋点
        EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.skillexpand);
    }


    /**随机的武器技能库id数组 */
    public getRandomSkillLibIds() {
        return this.randomSkillLibIds;
    }

    /**获取当前装备的技能按钮id数组 */
    public getEquipSkillLibIds() {
        return this.equipSkillLibIds;
    }

    /**选择技能库id */
    public selectSkillLibId(skillLibId: number) {
        UIService.hide(SkillPanel);

        this.server.net_selectSkillLibId(skillLibId);

        // 埋点
        EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.skillselect);


        // 埋点
        AnalyticsTool.send_ts_action_click(EClickEvent.skillselect);
    }

    /**替换玩家选择的技能 */
    public replaceSkillLibId(skillLibId: number, replaceIndex: number) {
        this.server.net_replaceSkillLibId(skillLibId, replaceIndex);

        // 埋点
        EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.skillreplace);

        // 埋点
        AnalyticsTool.send_ts_action_click(EClickEvent.skillreplace);

        // 埋点
        this.sendSkillAnalytics(skillLibId, false);
        this.sendSkillAnalytics(this.equipSkillLibIds[replaceIndex], true);
    }

    /**埋点 */
    private sendSkillAnalytics(skillLibId: number, replace: boolean) {
        let skillLibCfg = GameConfig.SkillLib.getElement(skillLibId);
        if (skillLibCfg == null) {
            return;
        }
        let motionBtnDatdCfg = GameConfig.MotionBtnData.getElement(skillLibCfg.motionBtnDataId);
        if (motionBtnDatdCfg == null) {
            return;
        }
        if (motionBtnDatdCfg.skillIds == null || motionBtnDatdCfg.skillIds.length == 0) {
            return;
        }
        let skillId = motionBtnDatdCfg.skillIds[0];
        let skillCfg = GameConfig.MotionSkill.getElement(skillId);
        if (skillCfg == null) {
            return;
        }
        let msg = null;
        if (replace) {
            msg = `2_${skillCfg.motionId}`;
        } else {
            msg = `1_${skillCfg.motionId}`;
        }
        AnalyticsTool.send_ts_action_click(msg);
    }

    /**放弃当前随机技能库 */
    public discardSkillLib() {
        this.server.net_giveUpRandomSkill();

        // 埋点
        EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.skillgiveup);

        // 埋点
        AnalyticsTool.send_ts_action_click(EClickEvent.skillgiveup);
    }

    /**玩家拾取到一个技能求 */
    public net_pickUpSkillBall() {

        // 判断是否选择技能中
        if (this.isSelectSkilling()) {
            return;
        }

        // 如果技能选择界面没打开就直接打开
        let skillPanel = UIService.getUI(SkillPanel);
        if (skillPanel.visible == false) {
            UIService.showUI(skillPanel);
        }

        // 技能点提示
        let tipText = GameConfig.Language.SkillSelect_4.Value;
        Notice.showDownNotice(tipText);
    }

    /**是否选择技能中 */
    private isSelectSkilling() {

        let skillPanel = UIService.getUI(SkillPanel, false);
        if (skillPanel && skillPanel.visible) {
            return true;
        }

        let skillSelectPanel = UIService.getUI(SkillSelectPanel, false);
        if (skillSelectPanel && skillSelectPanel.visible) {
            return true;
        }

        return false;
    }

}