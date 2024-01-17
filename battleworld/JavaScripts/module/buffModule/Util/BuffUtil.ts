import { BuffC, BuffData, BuffS, EBuffLifecycleType, EBuffSpawnRule } from "module_buff";
import { GameConfig } from "../../../config/GameConfig";
import { AttributeBuffC, AttributeBuffS } from "../Buff/CustomBuff/AttributeBuff";
import { CauterizeBuffC, CauterizeBuffS } from "../Buff/CustomBuff/CauterizeBuff";
import { CenterBuffC, CenterBuffS } from "../Buff/CustomBuff/CenterBuff";
import { ChangeMoldeBuffC, ChangeMoldeBuffS } from "../Buff/CustomBuff/ChangeMoldeBuff";
import { ChangeScaleBuffC, ChangeScaleBuffS } from "../Buff/CustomBuff/ChangeScaleBuff";
import { EnergyShieldC, EnergyShieldS } from "../Buff/CustomBuff/EnergyShieldBuff";
import { FlashBuffC, FlashBuffCS } from "../Buff/CustomBuff/FlashBuff";
import { LockUpBuffC, LockUpBuffS } from "../Buff/CustomBuff/LockUpBuff";
import { RecoveryLifeBuffC, RecoveryLifeBuffS } from "../Buff/CustomBuff/RecoveryLifeBuff";
import { StunBuffC, StunBuffS } from "../Buff/CustomBuff/StunBuff";
import { ChangeV1MonsterBuffC, ChangeV1MonsterBuffS } from "../Buff/CustomBuff/ChangeV1MonsterBuff";
import { BuffS_Base } from "../Buff/BuffS_Base";
import { BuffC_Base } from "../Buff/BuffC_Base";
import { CauterizeSelfBuffC, CauterizeSelfBuffS } from "../Buff/CustomBuff/CauterizeSelfBuff";
import { HPTriggerBuffC, HPTriggerBuffS } from "../Buff/CustomBuff/HPTriggerBuff";
// import { CenterBuff2C, CenterBuff2S } from "../Buff/CustomBuffClient/CenterBuff2";
// import { CauterizeBuff2C, CauterizeBuff2S } from "../Buff/CustomBuffClient/CauterizeBuff2";
// import { AttributeBuff2C, AttributeBuff2S } from "../Buff/CustomBuffClient/AttributeBuff2";
// import { LockUpBuff2C, LockUpBuff2S } from "../Buff/CustomBuffClient/LockUpBuff2";
// import { ChangeMoldeBuffC2, ChangeMoldeBuffS2 } from "../Buff/CustomBuffClient/ChangeMoldeBuff2";
import { Attribute } from "../../PlayerModule/sub_attribute/AttributeValueObject";


/**buff移除方式 */
export enum EBuffRmoveType {
    configId = 1, //配置id
    buffEffectType, //影响类型
}


/**buff创建类型 Buff类型（） */
export enum EBuffGameType {
    game = 1, //普通buff
    passiveBuff,//职业被动
    divineBuff,// 占卜
    clutBuff,//4社团
}


/**buff创建类型 */
export enum EBuffCreatType {
    createBuffInPlayer, //玩家身上创建
    createBuffInPlace,//场景中创建
    createBuffInGameObject//物体上创建
}


/**
 * buff效果类型
 */
export enum EBuffEffectType {
    /**
     * 无效的
     */
    None = 0,
    /**
     * 基础属性有变化
     */
    PropertyChange = 1,
    /**
     * 生成一些新buff
     */
    SpawnNewBuff = 2,
    /**
     * 调用释放技能
     */
    CallSkill = 3,
    /**
     * 切换自身的模型
     */
    ChangeScale = 4,
    /**
     * 晕眩
     */
    Stun = 5,
    /**
     * 中心点汇聚
     */
    Center = 6,
    /**
    * 变形
    */
    ChangeMolde = 7,
    /**
    * 能量护盾
    */
    EnergyShield = 8,
    /**
     * 灼烧效果-敌人次数触发
     */
    Cauterize = 9,
    /**
     * 禁锢
     */
    LockUp = 10,
    /**
      * 闪现 帝江之翼 
      */
    Flash = 11,
    /**
      * 千珏大招-阿斯克勒庇俄斯之杖
      */
    RecoveryLife = 12,
    /**
      * 变成V1怪物
      */
    ChangeV1Monster = 13,
    /**
     * 灼烧效果-自生持续一段时间
     */
    CauterizeSelf = 14,
    /**
     * 血量触发
     */
    HPTrigger = 15,
}

/**
 * 获取buff类
 * @param  type
 * @returns 
 */
export function getBuffClass(buffId: number): [any, EBuffSpawnRule, EBuffCreatType] {

    let cfg = GameConfig.Buff.getElement(buffId);
    let type = cfg.buffEffectType

    let cls = null;
    let spawnRule = null
    let creatType = EBuffCreatType.createBuffInPlayer;

    switch (Number(type)) {
        case EBuffEffectType.PropertyChange:
            cls = SystemUtil.isClient() ? AttributeBuffC : AttributeBuffS;
            //特殊处理易伤属性
            if (Attribute.IsVulnerableAttribute(cfg.affectPropertyType)) {
                spawnRule = EBuffSpawnRule.Server
            } else {
                spawnRule = EBuffSpawnRule.Client
            }
            break;
        case EBuffEffectType.SpawnNewBuff:
        case EBuffEffectType.CallSkill:
            cls = SystemUtil.isClient() ? BuffC_Base : BuffS_Base;
            spawnRule = EBuffSpawnRule.Server
            break;
        case EBuffEffectType.Stun:
            cls = SystemUtil.isClient() ? StunBuffC : StunBuffS;
            spawnRule = EBuffSpawnRule.Client
            break;
        case EBuffEffectType.ChangeScale:
            cls = SystemUtil.isClient() ? ChangeScaleBuffC : ChangeScaleBuffS;
            spawnRule = EBuffSpawnRule.Client
            break;
        case EBuffEffectType.Center:
            cls = SystemUtil.isClient() ? CenterBuffC : CenterBuffS;
            spawnRule = EBuffSpawnRule.Client
            break;
        case EBuffEffectType.ChangeMolde:
            cls = SystemUtil.isClient() ? ChangeMoldeBuffC : ChangeMoldeBuffS;
            spawnRule = EBuffSpawnRule.Client
            break;
        case EBuffEffectType.EnergyShield:
            cls = SystemUtil.isClient() ? EnergyShieldC : EnergyShieldS;
            spawnRule = EBuffSpawnRule.Client
            break;
        case EBuffEffectType.Cauterize:
            cls = SystemUtil.isClient() ? CauterizeBuffC : CauterizeBuffS;
            spawnRule = EBuffSpawnRule.Client
            break;
        case EBuffEffectType.LockUp:
            cls = SystemUtil.isClient() ? LockUpBuffC : LockUpBuffS;
            spawnRule = EBuffSpawnRule.Client
            break;
        case EBuffEffectType.Flash:
            cls = SystemUtil.isClient() ? FlashBuffC : FlashBuffCS;
            spawnRule = EBuffSpawnRule.Client
            break;
        case EBuffEffectType.RecoveryLife:
            cls = SystemUtil.isClient() ? RecoveryLifeBuffC : RecoveryLifeBuffS;
            spawnRule = EBuffSpawnRule.Client
            // creatType = EBuffCreatType.createBuffInPlace
            break;
        case EBuffEffectType.ChangeV1Monster:
            cls = SystemUtil.isClient() ? ChangeV1MonsterBuffC : ChangeV1MonsterBuffS;
            spawnRule = EBuffSpawnRule.Client
            break;

        case EBuffEffectType.CauterizeSelf:
            cls = SystemUtil.isClient() ? CauterizeSelfBuffC : CauterizeSelfBuffS;
            spawnRule = EBuffSpawnRule.Client
            break;

        case EBuffEffectType.HPTrigger:
            cls = SystemUtil.isClient() ? HPTriggerBuffC : HPTriggerBuffS;
            spawnRule = EBuffSpawnRule.Client;
            break;
        default:
            cls = SystemUtil.isClient() ? BuffC_Base : BuffS_Base;
            spawnRule = EBuffSpawnRule.Server
            break;
    }

    // oTrace("根据id todo", type, spawnRule)
    return [cls, spawnRule, creatType];
}




// /**
//  * 获取buff类 秘境
//  * @param  type
//  * @returns 
//  */
// export function getBuffClass2(buffId: number): [any, EBuffSpawnRule, EBuffCreatType] {

//     let cfg = GameConfig.Buff.getElement(buffId);
//     let type = cfg.buffEffectType

//     let cls = null;
//     let spawnRule = null
//     let creatType = EBuffCreatType.createBuffInPlayer;

//     switch (Number(type)) {
//         case EBuffEffectType.PropertyChange:
//             cls = SystemUtil.isClient() ? AttributeBuff2C : AttributeBuff2S; //  AttributeBuffC : AttributeBuffS;
//             //特殊处理易伤属性【秘境客户端伤害逻辑，减少RPC，易伤暂时不生效】
//             if (Attribute.IsVulnerableAttribute(cfg.affectPropertyType)) {
//                 spawnRule = EBuffSpawnRule.Server
//             } else {
//                 spawnRule = EBuffSpawnRule.Client
//             }
//             break;
//         case EBuffEffectType.SpawnNewBuff:
//         case EBuffEffectType.CallSkill:
//             cls = SystemUtil.isClient() ? BuffC_Base : BuffS_Base;
//             spawnRule = EBuffSpawnRule.Server
//             break;
//         case EBuffEffectType.Stun:
//             cls = SystemUtil.isClient() ? StunBuffC : StunBuffS;
//             spawnRule = EBuffSpawnRule.Client
//             break;
//         case EBuffEffectType.ChangeScale:
//             cls = SystemUtil.isClient() ? ChangeScaleBuffC : ChangeScaleBuffS;
//             spawnRule = EBuffSpawnRule.Client
//             break;
//         case EBuffEffectType.Center:
//             cls = SystemUtil.isClient() ? CenterBuff2C : CenterBuff2S;  // CenterBuffC : CenterBuffS;
//             spawnRule = EBuffSpawnRule.Client
//             break;
//         case EBuffEffectType.ChangeMolde:
//             cls = SystemUtil.isClient() ? ChangeMoldeBuffC2 : ChangeMoldeBuffS2;
//             spawnRule = EBuffSpawnRule.Client
//             break;
//         case EBuffEffectType.EnergyShield:
//             cls = SystemUtil.isClient() ? EnergyShieldC : EnergyShieldS;
//             spawnRule = EBuffSpawnRule.Client
//             break;
//         case EBuffEffectType.Cauterize:
//             cls = SystemUtil.isClient() ? CauterizeBuff2C : CauterizeBuff2S; //CauterizeBuffC : CauterizeBuffS;
//             spawnRule = EBuffSpawnRule.Client
//             break;
//         case EBuffEffectType.LockUp:
//             cls = SystemUtil.isClient() ? LockUpBuff2C : LockUpBuff2S; //  LockUpBuffC : LockUpBuffS;
//             spawnRule = EBuffSpawnRule.Client
//             break;
//         case EBuffEffectType.Flash:
//             cls = SystemUtil.isClient() ? FlashBuffC : FlashBuffCS;
//             spawnRule = EBuffSpawnRule.Client
//             break;
//         case EBuffEffectType.RecoveryLife:
//             cls = SystemUtil.isClient() ? RecoveryLifeBuffC : RecoveryLifeBuffS;
//             spawnRule = EBuffSpawnRule.Client
//             // creatType = EBuffCreatType.createBuffInPlace
//             break;
//         case EBuffEffectType.ChangeV1Monster:
//             cls = SystemUtil.isClient() ? ChangeV1MonsterBuffC : ChangeV1MonsterBuffS;
//             spawnRule = EBuffSpawnRule.Client
//             break;

//         case EBuffEffectType.CauterizeSelf:
//             cls = SystemUtil.isClient() ? CauterizeSelfBuffC : CauterizeSelfBuffS;
//             spawnRule = EBuffSpawnRule.Client
//             break;

//         case EBuffEffectType.HPTrigger:
//             cls = SystemUtil.isClient() ? HPTriggerBuffC : HPTriggerBuffS;
//             spawnRule = EBuffSpawnRule.Client;
//             break;
//         default:
//             cls = SystemUtil.isClient() ? BuffC_Base : BuffS_Base;
//             spawnRule = EBuffSpawnRule.Server
//             break;
//     }

//     // oTrace("根据id todo", type, spawnRule)
//     return [cls, spawnRule, creatType];
// }

/**
 *  霸体怪不生效buff类型
 */
export let stoicunitNotEfffBuffs: Set<EBuffEffectType> = new Set<EBuffEffectType>([
    EBuffEffectType.Center,
    EBuffEffectType.LockUp,
    EBuffEffectType.Stun
])

/**
 * 获取霸体怪是否buff影响 
 * @param buffId 
 * @returns 
 */
export function isStoicUnitEffect(buffId: number): boolean {
    let cfg = GameConfig.Buff.getElement(buffId);
    let type = cfg.buffEffectType;
    return !stoicunitNotEfffBuffs.has(type);
}