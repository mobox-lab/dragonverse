import { GameConfig } from "../../config/GameConfig";
import { ISkillLibElement } from "../../config/SkillLib";
import { EAttributeEvents_S, EModule_Events_S, EPlayerEvents_S } from "../../const/Enum";
import { Globaldata } from "../../const/Globaldata";
import { EventManager } from "../../tool/EventManager";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";

/**玩家技能代理类 
 * 
*/
export class SkillPlayerProxy {

    /**玩家id */
    private pId: number = 0;
    /**玩家武器id */
    private weaponId: number = 0;

    /**玩家自己的技能库配置数组 */
    private randomSkillLibCfgs: ISkillLibElement[] = [];

    /**当前随机的技能库id数组 */
    private curRandomLibIds: number[] = [];
    /**当前随机的技能库id数组 */
    public get CurRandomLibIds() {
        return this.curRandomLibIds;
    }

    /**当前装备的技能库id数组 */
    private curEquipSkillLibIds: number[] = [];
    /**当前装备的技能库id数组 */
    public get CurEquipSkillLibIds() {
        return this.curEquipSkillLibIds;
    }

    constructor(pId: number) {
        this.pId = pId;
    }

    /**设置玩家武器id */
    public setWeaponId(weaponId: number) {
        this.weaponId = weaponId;

        // 只要换武器，技能库都要初始化，并刷新3个新的
        this.init_randomLib();

        // 每次切换武器都要随机一次
        this.random_skillLib();
    }

    /**初始化技能库 */
    private init_randomLib() {

        let weaponCfg = GameConfig.Weapon.getElement(this.weaponId);
        if (weaponCfg == null) {
            console.error("SkillPlayerProxy:init_randomLib weaponCfg == null ", this.pId, this.weaponId);
            return;
        }

        let skillCfgs = GameConfig.SkillLib.findElements("weaponType", weaponCfg.weaponType);
        if (skillCfgs == null || skillCfgs.length == 0) {
            return;
        }

        this.randomSkillLibCfgs.length = 0;
        for (let index = 0; index < skillCfgs.length; index++) {
            const cfg = skillCfgs[index];
            this.randomSkillLibCfgs.push(cfg);
        }
    }

    /**生成随机技能库id */
    public random_skillLib() {
        this.curRandomLibIds.length = 0;

        for (let index = 0; index < Globaldata.maxRandomSkillLibCount; index++) {
            let randomLibId = this.random_weight();
            this.curRandomLibIds.push(randomLibId.id);
        }

        // 随机完成
        let randomLibIds = this.curRandomLibIds.toString();
        EventManager.instance.call(EAttributeEvents_S.attr_change_s, this.pId, Attribute.EnumAttributeType.randomSkillLibIds, randomLibIds);
    }

    /**根据权重进行随机 */
    private random_weight() {

        if (this.randomSkillLibCfgs.length == 0) {
            this.init_randomLib();
        }

        // 除非不正常 一定会随机到
        if (this.randomSkillLibCfgs.length == 0) {
            return;
        }

        // 当前缓存内的总权重
        let allWeight = 0;
        this.randomSkillLibCfgs.forEach((cfg) => {
            allWeight += cfg.weight;
        });

        // 随机值
        let randomValue = MathUtil.randomInt(0, allWeight);

        let curValue = 0;
        let selectIndex = 0;
        for (let index = 0; index < this.randomSkillLibCfgs.length; index++) {
            const libCfg = this.randomSkillLibCfgs[index];

            let nextValue = curValue + libCfg.weight;

            // 随机到了
            if (randomValue >= curValue && randomValue <= nextValue) {
                selectIndex = index;
                break;
            }
            curValue = nextValue;
        }

        let libCfg = this.randomSkillLibCfgs[selectIndex];

        this.randomSkillLibCfgs.splice(selectIndex, 1);

        return libCfg;
    }

    /**装备技能库id */
    public equipSkillLibId(skillLibId: number) {
        if (this.curEquipSkillLibIds.length >= Globaldata.maxEquipSkillCount) {
            console.error("equipSkillLibId 超过最大装备技能数量");
            return;
        }
        this.curEquipSkillLibIds.push(skillLibId);

        let curEquipSkillLibIdsStr = this.curEquipSkillLibIds.toString();
        EventManager.instance.call(EAttributeEvents_S.attr_change_s,
            this.pId, Attribute.EnumAttributeType.equipSkillLibIds, curEquipSkillLibIdsStr);
        // 减技能点
        EventManager.instance.call(EPlayerEvents_S.PlayerEvent_CalculateAttr_S,
            this.pId, Attribute.EnumAttributeType.weaponSkillPoints, -1);
        // 每次装备技能都要随机一次
        this.random_skillLib();
    }

    /**
     * 替换技能库id
     * @param skillLibId 技能库id  
     * @param replaceIndex 要替换的索引位
     */
    public replaceSkillLibId(skillLibId: number, replaceIndex: number) {
        if (this.curEquipSkillLibIds.length != Globaldata.maxEquipSkillCount) {
            console.error("replaceSkillLibId 目前技能还没装配满");
            return -1;
        }

        let preSkillLibId = this.curEquipSkillLibIds[replaceIndex];
        if (preSkillLibId == null) {
            console.error("replaceSkillLibId 替换失败 preSkillLibId == null", replaceIndex);
            return -1;
        }
        this.curEquipSkillLibIds[replaceIndex] = skillLibId;

        let curEquipSkillLibIdsStr = this.curEquipSkillLibIds.toString();
        EventManager.instance.call(EAttributeEvents_S.attr_change_s,
            this.pId, Attribute.EnumAttributeType.equipSkillLibIds, curEquipSkillLibIdsStr);
        // 减技能点
        EventManager.instance.call(EPlayerEvents_S.PlayerEvent_CalculateAttr_S,
            this.pId, Attribute.EnumAttributeType.weaponSkillPoints, -1);
        // 每次替换技能都要随机一次
        this.random_skillLib();


        return preSkillLibId;
    }

    /**清理掉当前装备的技能id数组 */
    public clear_curEquipSkillLibIdss() {

        this.curEquipSkillLibIds.length = 0;
        let curEquipSkillLibIdsStr = "";
        EventManager.instance.call(EAttributeEvents_S.attr_change_s,
            this.pId, Attribute.EnumAttributeType.equipSkillLibIds, curEquipSkillLibIdsStr);
    }

    /**
     * 丢弃一个技能
     * @param skillLibId 需要丢弃的技能id
     */
    public discardSkillLibId(skillLibId: number) {
        const idx = this.curEquipSkillLibIds.indexOf(skillLibId);
        if (idx >= 0) {
            this.curEquipSkillLibIds.splice(idx, 1);
            let curEquipSkillLibIdsStr = this.curEquipSkillLibIds.toString();
            EventManager.instance.call(EAttributeEvents_S.attr_change_s, this.pId, Attribute.EnumAttributeType.equipSkillLibIds, curEquipSkillLibIdsStr);
        }
    }

    /**放弃随机的技能库id */
    public giveUpRandomSkillLibIds() {

        let addGold = 0;

        for (let index = 0; index < this.curRandomLibIds.length; index++) {
            const skillLibId = this.curRandomLibIds[index];
            let skillLibCfg = GameConfig.SkillLib.getElement(skillLibId);
            if (skillLibCfg == null) {
                console.error("SkillPlayerProxy:giveUpRandomSkillLibIds skillLibCfg == null ", skillLibId);
                continue;
            }
            addGold += skillLibCfg.sellValue;
        }

        // 随机新的技能库id
        this.random_skillLib();

        // 减技能点
        EventManager.instance.call(EPlayerEvents_S.PlayerEvent_CalculateAttr_S,
            this.pId, Attribute.EnumAttributeType.weaponSkillPoints, -1);
        // 增加玩家金币
        EventManager.instance.call(EPlayerEvents_S.PlayerEvent_AddGold_S,
            this.pId, addGold);
    }


}