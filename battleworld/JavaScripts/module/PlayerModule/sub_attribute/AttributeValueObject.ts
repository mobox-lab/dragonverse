import { oTrace } from "odin"
import { EventManager } from "../../../tool/EventManager"
import { EAttributeEvents_S } from "../../../const/Enum"
import { BattleWorldPlayerModuleData } from "../PlayerModuleData";


export namespace Attribute {
    export enum EnumAttributeType {

        /**=========固定加成值=========[100-200]*/
        //移动速度
        speedAdd = 101,
        // 血量加成
        maxHpAdd = 102,
        // 减伤 
        defAdd = 103,
        // 近战攻击力 && 技能攻击力 
        atkAdd = 104,
        // 暴击率[0-100]
        critAdd = 105,
        // 增加伤害类道具效果
        atkSkillAdd = 106,
        // 最大能量
        maxEnergyAdd = 107,
        //生命偷取
        drainLifeHpAdd = 108,
        //怪物追击玩家速度 :(一个逻辑帧移动长度为x个单位的向量)
        scenceUnitspeedAdd = 109,
        //玩家经验加成
        experienceAdd = 110,
        //暴击伤害  
        critdmgeAdd = 111,
        //暴击抵抗
        critResistanceAdd = 112,
        //真实伤害
        tureDamageAdd = 113,
        //易伤
        VulnerableAdd = 114,

        /**=========百分比加成=========[200-300]*/
        //移动速度
        speedMultiple = 201,
        // 血量加成
        maxHpMultiple = 202,
        // 减伤 
        defMultiple = 203,
        //近战攻击力 && 技能攻击力 
        atkMultiple = 204,
        // 暴击率[0-100]
        critMultiple = 205,
        // 增加伤害类道具效果
        atkSkillMultiple = 206,
        // 最大能量
        maxEnergyMultiple = 207,
        //生命偷取
        drainLifeHpMultiple = 208,
        //怪物追击玩家速度 :(一个逻辑帧移动长度为x个单位的向量)
        scenceUnitspeedMultiple = 209,
        //玩家经验加成
        experienceMultiple = 210,
        //暴击伤害  
        critdmgeMultiple = 211,
        //暴击抵抗
        critResistanceMultiple = 212,
        //真实伤害
        tureDamageMultiple = 213,
        //易伤
        VulnerableMultiple = 214,

        /*=========实际&&初始值=========[0-50]*/
        //移动速度, 怪物巡逻移动速度:(一个逻辑帧移动长度为x个单位的向量), 角色:(编辑器默认速度+speed)(增量)
        speed = 1,
        // 最大生命值
        maxHp = 2,
        // 减伤 
        def = 3,
        // 近战攻击力 && 技能攻击力 
        atk = 4,
        // 暴击率[0-100]
        crit = 5,
        // 增加伤害类道具效果
        atkSkill = 6,
        // 最大能量
        maxEnergy = 7,
        // 生命偷取
        drainLifeHp = 8,
        //怪物追击玩家速度 :(一个逻辑帧移动长度为x个单位的向量)
        scenceUnitspeed = 9,
        //玩家经验加成
        experience = 10,
        //暴击伤害  
        critdmge = 11,
        //暴击抵抗
        critResistance = 12,
        //真实伤害
        tureDamage = 13,
        //易伤
        Vulnerable = 14,

        /*=========玩家存储值=========[50-70]*/
        // 经验值
        exp = 50,
        // 等级
        lv = 51,
        // 钱
        money = 52,
        //拥有属性点
        attributeCount = 53,
        //属性点-能量值(能量)
        attributeEnergy = 54,
        //属性点-防御值(生命值)
        attributeHp = 55,
        //属性点-物理(斥候类型职业的攻击力)
        attributeAtk = 56,
        //属性点-魔法(魔法师类型职业的攻击力)
        attributeMagic = 57,
        //属性点-御物(增加伤害类道具效果)
        attributeAtkSkill = 58,
        /** 段位分 */
        rankScore = 59,
        /** 玩家登录时间戳 */
        loginTime = 60,
        /** 今日玩家已获取段位分 */
        dayRankScore = 61,
        /**玩家是否显示段位 */
        isShowRank = 62,

        /*=========无加成计算值=========[70-100]*/
        // 当前血量
        hp = 70,
        // 当前能量
        energy = 71,
        //状态  0 默认  15Stun眩晕  16Center中心聚集
        state = 72,
        //武器ID
        weaponId = 73,
        /**玩家区域id*/
        areaId = 74,
        /**玩家名称 */
        playerName = 75,
        /**玩家随机的技能库id数组字符串 */
        randomSkillLibIds = 76,
        /**玩家当前装备的技能库id数组字符串 */
        equipSkillLibIds = 77,
        /**技能点 */
        weaponSkillPoints = 78,
        /**玩家是否再竞速 */
        isPlayerInSprintrRace = 79,
        /**玩家是否显示头顶UI */
        isPlayerHeadUI = 80,
        /**玩家能否切换武器 0可以 1不可以*/
        isCanChangeWeapon = 81,
        /**玩家状态机状态 */
        fsmState = 82,
        /**玩家杀戮值 */
        massacreValue = 83,
        /**玩家显示隐藏状态 0显示状态 1隐藏状态 */
        playerVisible = 85,
        /**玩家怒气值 */
        angerValue = 86,
        /**玩家最大怒气值 */
        maxAngerValue = 87,
        /**爆气状态  0未爆气 1爆气 */
        gasExplosion = 88,
        /**玩家霸体状态，0无霸体，1霸体 */
        bodyHold = 89,
    }

    // 存储属性
    const PlayerStashAttribute: Set<EnumAttributeType> = new Set([
        Attribute.EnumAttributeType.exp,
        Attribute.EnumAttributeType.lv,
        Attribute.EnumAttributeType.money,
        Attribute.EnumAttributeType.attributeCount,
        Attribute.EnumAttributeType.attributeEnergy,
        Attribute.EnumAttributeType.attributeHp,
        Attribute.EnumAttributeType.attributeAtk,
        Attribute.EnumAttributeType.attributeMagic,
        Attribute.EnumAttributeType.attributeAtkSkill,
        Attribute.EnumAttributeType.rankScore,
        Attribute.EnumAttributeType.loginTime,
        Attribute.EnumAttributeType.dayRankScore,
        Attribute.EnumAttributeType.isShowRank,
    ])
    // 此属性是否需要存储
    export function IsStashAttribute(type: Attribute.EnumAttributeType): boolean {
        return PlayerStashAttribute.has(type)
    }
    // 重新计算属性
    const recalculateAttribute: Set<EnumAttributeType> = new Set([
        Attribute.EnumAttributeType.lv, //升级后 需要重新计算属性
        Attribute.EnumAttributeType.attributeEnergy,//属性点 
        Attribute.EnumAttributeType.attributeHp,
        Attribute.EnumAttributeType.attributeAtk,
        Attribute.EnumAttributeType.attributeMagic,
        Attribute.EnumAttributeType.attributeAtkSkill,
    ])
    // 此属性是否需要重新计算属性
    export function IsrecalculateAttribute(type: Attribute.EnumAttributeType): boolean {
        return recalculateAttribute.has(type)
    }

    //血量能量属性
    const hpAttribute: Set<EnumAttributeType> = new Set([
        Attribute.EnumAttributeType.maxHpAdd,//最大生命值 
        Attribute.EnumAttributeType.maxHpMultiple,
        Attribute.EnumAttributeType.maxHp,
    ])
    export function IsrhpAttribute(type: Attribute.EnumAttributeType): boolean {
        return hpAttribute.has(type)
    }
    //血量能量属性
    const energyAttribute: Set<EnumAttributeType> = new Set([
        Attribute.EnumAttributeType.maxEnergyAdd,//最大能量 
        Attribute.EnumAttributeType.maxEnergyMultiple,//最大能量 
        Attribute.EnumAttributeType.maxEnergy,//最大能量 
    ])
    // 此属性是否血量能量属性
    export function IsrEnergyAttribute(type: Attribute.EnumAttributeType): boolean {
        return energyAttribute.has(type)
    }

    //属性点属性 
    export function IsVulnerableAttribute(mytype: Attribute.EnumAttributeType): boolean {
        if (mytype == Attribute.EnumAttributeType.Vulnerable ||
            mytype == Attribute.EnumAttributeType.VulnerableAdd ||
            mytype == Attribute.EnumAttributeType.VulnerableMultiple
        ) {
            return true;
        } else {
            return false;
        }
    }


    //加点属性
    const addAttribute: Set<EnumAttributeType> = new Set([
        Attribute.EnumAttributeType.attributeCount,
        Attribute.EnumAttributeType.attributeEnergy,
        Attribute.EnumAttributeType.attributeHp,
        Attribute.EnumAttributeType.attributeAtk,
        Attribute.EnumAttributeType.attributeMagic,
        Attribute.EnumAttributeType.attributeAtkSkill,
    ])
    // 此属性是否血量能量属性
    export function IsAddAttribute(type: Attribute.EnumAttributeType): boolean {
        return addAttribute.has(type)
    }

    // 只单向同步的属性
    const playStateAttribute: Set<EnumAttributeType> = new Set([
        /**技能点数 */
        Attribute.EnumAttributeType.weaponSkillPoints,
        /**玩家能否切换武器 */
        Attribute.EnumAttributeType.isCanChangeWeapon,
        /**玩家状态机状态 */
        Attribute.EnumAttributeType.fsmState,
        /**玩家金币数量 */
        Attribute.EnumAttributeType.money,
        /**今日玩家已获取段位分 */
        Attribute.EnumAttributeType.dayRankScore,
        /**玩家怒气值 */
        Attribute.EnumAttributeType.angerValue,
        /**玩家最大怒气值 */
        Attribute.EnumAttributeType.maxAngerValue,
    ]);
    // 此属性是否为定向同步属性
    export function IsPlayStateAttribute(type: Attribute.EnumAttributeType): boolean {
        return playStateAttribute.has(type)
    }

    export const AttributeName = {
        [Attribute.EnumAttributeType.speedAdd]: "移动速度、怪物巡逻移动速度--------------------固定加成值",
        [Attribute.EnumAttributeType.maxHpAdd]: "最大生命值--------------------固定加成值",
        [Attribute.EnumAttributeType.defAdd]: "减伤--------------------固定加成值",
        [Attribute.EnumAttributeType.atkAdd]: "近战攻击力 && 技能攻击力--------------------固定加成值",
        [Attribute.EnumAttributeType.critAdd]: "暴击率[0-100]--------------------固定加成值",
        [Attribute.EnumAttributeType.atkSkillAdd]: "增加伤害类道具效果--------------------固定加成值",
        [Attribute.EnumAttributeType.maxEnergyAdd]: "最大能量--------------------固定加成值",
        [Attribute.EnumAttributeType.drainLifeHpAdd]: "生命偷取--------------------固定加成值",
        [Attribute.EnumAttributeType.scenceUnitspeedAdd]: "怪物追击玩家速度 :(一个逻辑帧移动长度为x个单位的向量)--------------------固定加成值",
        [Attribute.EnumAttributeType.experienceAdd]: "玩家经验加成--------------------固定加成值",
        [Attribute.EnumAttributeType.critdmgeAdd]: "暴击伤害 仅有固定值加成--------------------固定加成值",
        [Attribute.EnumAttributeType.critResistanceAdd]: "暴击抵抗--------------------固定加成值",
        [Attribute.EnumAttributeType.tureDamageAdd]: "真实伤害--------------------固定加成值",
        [Attribute.EnumAttributeType.VulnerableAdd]: "易伤--------------------固定加成值",

        [Attribute.EnumAttributeType.speedMultiple]: "移动速度、怪物巡逻移动速度---------------------百分比加成",
        [Attribute.EnumAttributeType.maxHpMultiple]: "最大生命值---------------------百分比加成",
        [Attribute.EnumAttributeType.defMultiple]: "减伤-百分比加成",
        [Attribute.EnumAttributeType.atkMultiple]: "近战攻击力 && 技能攻击力 ---------------------百分比加成",
        [Attribute.EnumAttributeType.critMultiple]: "暴击率[0-100]---------------------百分比加成",
        [Attribute.EnumAttributeType.atkSkillMultiple]: "增加伤害类道具效果---------------------百分比加成",
        [Attribute.EnumAttributeType.maxEnergyMultiple]: "最大能量---------------------百分比加成",
        [Attribute.EnumAttributeType.drainLifeHpMultiple]: "生命偷取---------------------百分比加成",
        [Attribute.EnumAttributeType.scenceUnitspeedMultiple]: "怪物追击玩家速度 :(一个逻辑帧移动长度为x个单位的向量)---------------------百分比加成",
        [Attribute.EnumAttributeType.experienceMultiple]: "玩家经验加成---------------------百分比加成",
        [Attribute.EnumAttributeType.critdmgeMultiple]: "暴击伤害 仅有固定值加成---------------------百分比加成",
        [Attribute.EnumAttributeType.critResistanceMultiple]: "暴击抵抗---------------------百分比加成",
        [Attribute.EnumAttributeType.tureDamageMultiple]: "真实伤害---------------------百分比加成",
        [Attribute.EnumAttributeType.VulnerableMultiple]: "易伤---------------------百分比加成",

        [Attribute.EnumAttributeType.speed]: "移动速度、怪物巡逻移动速度",
        [Attribute.EnumAttributeType.maxHp]: "最大生命值",
        [Attribute.EnumAttributeType.def]: "减伤",
        [Attribute.EnumAttributeType.atk]: "近战攻击力 && 技能攻击力 ",
        [Attribute.EnumAttributeType.crit]: "暴击",
        [Attribute.EnumAttributeType.atkSkill]: "增加伤害类道具效果",
        [Attribute.EnumAttributeType.maxEnergy]: "最大能量",
        [Attribute.EnumAttributeType.drainLifeHp]: "生命偷取",
        [Attribute.EnumAttributeType.scenceUnitspeed]: "怪物追击玩家速度 :(一个逻辑帧移动长度为x个单位的向量)",
        [Attribute.EnumAttributeType.experience]: " 玩家经验加成",
        [Attribute.EnumAttributeType.critdmge]: "暴击伤害 仅有固定值加成",
        [Attribute.EnumAttributeType.critResistance]: "暴击抵抗",
        [Attribute.EnumAttributeType.tureDamage]: "真实伤害",
        [Attribute.EnumAttributeType.Vulnerable]: "易伤",

        [Attribute.EnumAttributeType.exp]: "经验值",
        [Attribute.EnumAttributeType.lv]: "等级",
        [Attribute.EnumAttributeType.money]: "钱",
        [Attribute.EnumAttributeType.attributeCount]: "玩家拥有属性点",
        [Attribute.EnumAttributeType.attributeEnergy]: "属性点-能量值(能量)",
        [Attribute.EnumAttributeType.attributeHp]: "属性点-防御值(生命值)",
        [Attribute.EnumAttributeType.attributeAtk]: "属性点-职业(近战攻击 && 技能攻击)",
        [Attribute.EnumAttributeType.attributeMagic]: "属性点-移速(移动速度)",
        [Attribute.EnumAttributeType.attributeAtkSkill]: "属性点-御物(增加伤害类道具效果)",


        [Attribute.EnumAttributeType.hp]: "当前血量",
        [Attribute.EnumAttributeType.energy]: "当前能量",
        [Attribute.EnumAttributeType.state]: "状态",
        [Attribute.EnumAttributeType.weaponId]: "武器id",


    }

    export const AttributeIcon = {
        [Attribute.EnumAttributeType.exp]: '132547',
        [Attribute.EnumAttributeType.money]: '151306',
    }

    // type:属性类型-value:属性值
    export type AttributeArray = { [type: number]: number }

    // 后端向前端同步的场景单位属性信息
    export interface AttributeMessage {
        sceneID: number
        context: Attribute.AttributeArray
    }

    // Server属性集合
    export class AttributeValueObject {
        playerID: number
        attributeArray: Attribute.AttributeArray
        attributeChangeAC: Action2<number, number> = new Action2<number, number>();
        constructor() {
            this.attributeArray = {}
        }

        setAttribute(type: Attribute.EnumAttributeType, value: number) {
            this.attributeArray[type] = value

            if (SystemUtil.isServer()) {
                if (type == Attribute.EnumAttributeType.hp && this.playerID != 0) {
                    EventManager.instance.call(EAttributeEvents_S.attr_change_s, this.playerID, Attribute.EnumAttributeType.hp, value);
                }
                if (IsrhpAttribute(type) && this.playerID != 0) {
                    let t_normalValue = this.getValue(Attribute.EnumAttributeType.maxHp);
                    let t_addValue = this.getValue(Attribute.EnumAttributeType.maxHpAdd);
                    let t_MultipleValue = this.getValue(Attribute.EnumAttributeType.maxHpMultiple);
                    let t_finalValue = (t_normalValue + t_addValue) * (1 + t_MultipleValue / 100);

                    //oTrace("IsrhpAttribute_______100,1450,0,1550_______________", t_normalValue, t_addValue, t_MultipleValue, t_finalValue);
                    EventManager.instance.call(EAttributeEvents_S.attr_change_s, this.playerID, Attribute.EnumAttributeType.maxHp, t_finalValue);
                }
            }

            this.attributeChangeAC.call(type, value);
        }

        getValue(type: Attribute.EnumAttributeType): number {
            return this.attributeArray[type] ? this.attributeArray[type] : 0
        }

        addValue(type: Attribute.EnumAttributeType, value: number, isSpecial: boolean = false) {


            // 计算 最最大血量升了多少
            let preMaxHp = null;
            if (SystemUtil.isServer() && isSpecial && IsrhpAttribute(type) && this.playerID != 0) {
                let t_normalValue = this.getValue(Attribute.EnumAttributeType.maxHp);
                let t_addValue = this.getValue(Attribute.EnumAttributeType.maxHpAdd);
                let t_MultipleValue = this.getValue(Attribute.EnumAttributeType.maxHpMultiple);
                preMaxHp = (t_normalValue + t_addValue) * (1 + t_MultipleValue / 100);
            }


            let val = this.getValue(type)
            this.setAttribute(type, value + val)
            // oTrace(`addValue- ${type}----${val}---${value}`, value + val);

            // 百分比减伤特殊处理下，按照最新的计算公式
            if (SystemUtil.isServer()) {
                let playerData = DataCenterS.getData(this.playerID, BattleWorldPlayerModuleData);
                if (playerData) {
                    //playerData.addDefRecord(value);

                    playerData.addPerGainRecrod(type, value);
                }
            }

            if (SystemUtil.isServer() && isSpecial && IsrhpAttribute(type) && this.playerID != 0 && preMaxHp != null) {
                let t_normalValue = this.getValue(Attribute.EnumAttributeType.maxHp);
                let t_addValue = this.getValue(Attribute.EnumAttributeType.maxHpAdd);
                let t_MultipleValue = this.getValue(Attribute.EnumAttributeType.maxHpMultiple);
                let t_finalValue = (t_normalValue + t_addValue) * (1 + t_MultipleValue / 100);
                let calAddValue = t_finalValue - preMaxHp;  // 提高了多少maxhp

                //let curHp = this.attributeArray[Attribute.EnumAttributeType.hp];
                // console.error("===calAddValuecalAddValue ", curHp, preMaxHp, t_finalValue)
                if (calAddValue > 0) {
                    //this.addMaxHp += calAddValue;

                    let curHp = this.attributeArray[Attribute.EnumAttributeType.hp];
                    curHp += calAddValue;
                    this.attributeArray[Attribute.EnumAttributeType.hp] = curHp;
                    EventManager.instance.call(EAttributeEvents_S.attr_change_s, this.playerID, Attribute.EnumAttributeType.hp, curHp);
                }
            }
        }

        /**
         * 减少属性
         * @param type 属性类型
         * @param value 属性值
         * @returns 
         */
        public reduceValue(type: Attribute.EnumAttributeType, value: number, isSpecial: boolean = false) {

            if (SystemUtil.isClient()) {
                let pData = DataCenterC.getData(BattleWorldPlayerModuleData);
                if (type == Attribute.EnumAttributeType.hp && pData.isInvincible) {
                    return;
                }
                if (type == Attribute.EnumAttributeType.energy && pData.isInfiniteEnergy) {
                    return;
                }

            } else if (SystemUtil.isServer()) {
                let pData = DataCenterS.getData(this.playerID, BattleWorldPlayerModuleData);
                if (type == Attribute.EnumAttributeType.hp && pData.isInvincible) {
                    return;
                }
                if (type == Attribute.EnumAttributeType.energy && pData.isInfiniteEnergy) {
                    return;
                }
            }

            let val = this.getValue(type)

            let endValue = val - value;
            if (type != Attribute.EnumAttributeType.speedMultiple) {
                endValue = Math.max(endValue, 0, endValue);
            }
            this.setAttribute(type, endValue);


            // 百分比减伤特殊处理下，按照最新的计算公式
            if (SystemUtil.isServer()) {
                let playerData = DataCenterS.getData(this.playerID, BattleWorldPlayerModuleData);
                if (playerData) {
                    // playerData.reduceDefRecrod(value);
                    playerData.reducePerGainRecrod(type, value);
                }
            }


        }

        public log(): void {
            let t_value = "玩家属性：\n";
            for (const key in this.attributeArray) {
                const value = this.attributeArray[key];
                t_value += `${Attribute.AttributeName[key]}--${value}\n`;
            }
            oTrace(t_value);
        }
    }

}
