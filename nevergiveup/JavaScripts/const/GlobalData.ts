import { GameConfig } from "../config/GameConfig";
import Utils from "../Utils";
import { TowerStrategyType } from "./enum";

export namespace GlobalData {
    export class Tower {
        public static initUnlockTower = 1020; // 最初解锁的塔
    }
    export class Anim {
        public static stageCrossAnimSeconds = 1; // 过场过渡动画时间
    }
    /**商店 */
    export class Shop {
        /**筛选 - 元素选项 all, 光暗火水木土 */
        public static shopElementsOpts: string[] = ["Sift_1", "Element_1", "Element_2", "Element_3", "Element_4", "Element_5", "Element_6"];

        /**筛选 - 目标选项 all, 单体/aoe */
        public static shopTargetOpts: string[] = ["Sift_1", "Target_1", "Target_2"];

        /**筛选 - 类型 all, 物理/法术 */
        public static shopDamageOpts: string[] = ["Sift_1", "DamageType_1", "DamageType_2", "DamageType_3", "DamageType_4"];

        /**筛选 - 对策 all, ... */
        public static shopStrategyOpts: string[] = ["Sift_1", "Strategy_1", "Strategy_2", "Strategy_3", "Strategy_4", "Strategy_5", "Strategy_6", "Strategy_7", "Strategy_8", "Strategy_9","Strategy_10"];
        
        public static shopStrategyDescLangs: string[] = ["Sift_1", "StrategyDesc_1", "StrategyDesc_2", "StrategyDesc_3", "StrategyDesc_4", "StrategyDesc_5", "StrategyDesc_6", "StrategyDesc_7", "StrategyDesc_8", "StrategyDesc_9","StrategyDesc_10"];

        // 柯里化函数，用于根据多语言之后的文本，获取选中的Index
        public static getSelectedType = (opts: string[]) => (selectedOpt: string): number | null => {
            const languages = opts.map(opt => GameConfig.Language[opt]?.Value);
            const idx = languages.findIndex(item => item === selectedOpt);
            if (idx === -1) return null;
            return idx;
        }
        public static getSelectedTowerElementType = this.getSelectedType(this.shopElementsOpts);
        public static getSelectedTowerTargetType = this.getSelectedType(this.shopTargetOpts);
        public static getSelectedTowerDamageType = this.getSelectedType(this.shopDamageOpts);
        public static getSelectedTowerStrategyType = this.getSelectedType(this.shopStrategyOpts);
        
        /** 获取对策对应的 buff数组 */
        public static getTowerStrategyBuffs = () => {
            const buffs = GameConfig.Buff.getAllElement();
            const strategyBuffs:{[key: number]: number[]} = {};
            function setStrategyBuffs(key: TowerStrategyType, value: number) {
                if(strategyBuffs?.[key]) {
                    strategyBuffs[key].push(value);
                } else {
                    strategyBuffs[key] = [value];
                }
            }
            for(const buff of buffs) {
                if(buff.warmUp !== 0) {
                    setStrategyBuffs(TowerStrategyType.WarmUp, buff.id);
                    continue;
                }
                if(buff.armorPen !== 0) {
                    setStrategyBuffs(TowerStrategyType.ArmorBreak, buff.id);
                    continue;
                }
                if(buff.speed === -999) {
                    setStrategyBuffs(TowerStrategyType.StunEffect, buff.id);
                    continue;
                }
                if(buff.armorReduction !== 0) {
                    setStrategyBuffs(TowerStrategyType.ArmorShred, buff.id);
                    continue;
                }
                if(buff.speed !== 0 && buff.speed !== -999) {
                    setStrategyBuffs(TowerStrategyType.SlowEffect, buff.id);
                    continue;
                }
                if(buff.magicPen !== 0) {
                    setStrategyBuffs(TowerStrategyType.MagicPenetration, buff.id);
                    continue;
                }
                if(buff.flyingDamageBoost !== 0) {
                    setStrategyBuffs(TowerStrategyType.AntiAir, buff.id);
                    continue;
                }
                if(buff.multiHit !== 0) {
                    setStrategyBuffs(TowerStrategyType.MultiHit, buff.id);
                    continue;
                }
                if(buff.flyFirst !== 0) {
                    setStrategyBuffs(TowerStrategyType.PriorityAir, buff.id);
                    continue;
                }
            }
            return strategyBuffs;
            // switch (towerStrategyId) {
            //     case TowerStrategyType.WarmUp: return buffs.filter((cfg) => cfg.warmUp !== 0);
            //     case TowerStrategyType.ArmorBreak: return buffs.filter((cfg) => cfg.armorPen !== 0);
            //     case TowerStrategyType.StunEffect: return buffs.filter((cfg) => cfg.speed === -999);
            //     case TowerStrategyType.ArmorShred: return buffs.filter((cfg) => cfg.armorReduction !== 0);
            //     case TowerStrategyType.SlowEffect: return buffs.filter((cfg) => cfg.speed !== 0 && cfg.speed !== -999);
            //     case TowerStrategyType.MagicPenetration: return buffs.filter((cfg) => cfg.magicPen !== 0);
            //     case TowerStrategyType.AntiAir: return buffs.filter((cfg) => cfg.flyingDamageBoost !== 0);
            //     case TowerStrategyType.MultiHit: return buffs.filter((cfg) => cfg.multiHit !== 0);
            //     case TowerStrategyType.PriorityAir: return buffs.filter((cfg) => cfg.flyFirst !== 0);
            // }
        }
        // key 为 TowerStrategyType 的枚举, value 为 buffId 的数组
        public static towerStrategyBuffs:{[key: number]: number[]} = this.getTowerStrategyBuffs();
        // 获取塔的buff对策
        public static getStrategyInfo = (towerId: number):({
            strategyTitle: string;
            strategyDesc: string;
            strategyKey: TowerStrategyType;
            buffId?: number; // 对应buff中的id，不传表示该对策 没有对应的buff
        }) => {
            const cfg = GameConfig.Tower.getElement(towerId);
            if(cfg?.attackTags?.includes(1)) return { // 反隐
                strategyTitle: GameConfig.Language.getElement(GlobalData.Shop.shopStrategyOpts[TowerStrategyType.AntiHidden])?.Value,
                strategyDesc: this.getStrategyDesc(TowerStrategyType.AntiHidden),
                strategyKey: TowerStrategyType.AntiHidden,
            }
            if(!cfg?.attackBuff?.length) return null
            const buffIds = cfg.attackBuff;
            const strategyBuffs = this.towerStrategyBuffs;

            for(let i = 0; i < buffIds.length; i++) {
                const buffId = buffIds[i];
                const buffCfg = GameConfig.Buff.getElement(buffId);
                if(!buffCfg) continue;
                for(const key in strategyBuffs) {
                    if(strategyBuffs[key]?.includes(buffCfg.id)) {
                        const strategyKey = Number(key) as TowerStrategyType;
                        const title = GameConfig.Language.getElement(GlobalData.Shop.shopStrategyOpts[strategyKey])?.Value;
                        const desc = this.getStrategyDesc(strategyKey);
                        return {
                            strategyTitle: title,
                            strategyDesc: desc,
                            strategyKey,
                            buffId,
                        }   
                    }
                }
            }
            return null;
        }
        public static getStrategyDesc(strategyKey: TowerStrategyType) {
            const args = []
            const buffs = this.towerStrategyBuffs[strategyKey]
            const desc = GameConfig.Language.getElement(GlobalData.Shop.shopStrategyDescLangs[strategyKey])?.Value ?? "";
            if(!buffs?.length || GameConfig.Buff.getElement(buffs[0])) return desc;
            const buffCfg = GameConfig.Buff.getElement(buffs[0]);
            switch(strategyKey) {
                case TowerStrategyType.WarmUp: {
                    args.push(buffCfg.warmUp, buffCfg.warmUpFindRange, buffCfg.warmUpAttackDamage, buffCfg.warmUpAttackTime);
                    break;
                }
                case TowerStrategyType.ArmorBreak: {
                    args.push(buffCfg.armorPen);
                    break;
                }
                case TowerStrategyType.StunEffect: {
                    args.push(buffCfg.duration);
                    break;
                }
                case TowerStrategyType.ArmorShred: {
                    args.push(buffCfg.armorReduction);
                    break;
                }
                case TowerStrategyType.SlowEffect: {
                    args.push(-buffCfg.speed);
                    break;
                }
                case TowerStrategyType.MagicPenetration: {
                    args.push(buffCfg.magicPen);
                    break;
                }
                case TowerStrategyType.AntiAir: {
                    args.push(buffCfg.flyingDamageBoost);
                    break;
                }
                case TowerStrategyType.MultiHit: {
                    args.push(buffCfg.multiHit);
                    break;
                }
                case TowerStrategyType.AntiHidden:
                case TowerStrategyType.PriorityAir:
                default: // 无参数
                    return desc;
            }
            return Utils.Format(desc, ...args);
        }
    }
}