import { GameConfig } from "../config/GameConfig";
import Utils from "../Utils";
import { StageMonsterSkillType, TowerStrategyType } from "./enum";

export namespace GlobalData {
    export class Global {
        public static worldLangInitDelay: number = 1500;
        // 游戏结束传送回大厅的位置 / 脱离卡死的位置
        public static resetWorldPosition: Vector = new Vector(413, 151.25, 317);
    }
    export class Stage {
        /** 关卡推荐元素图标 各元素对应 光 暗 水 火 木 土 guid */
        public static stageRecommendElementIcon: string[] = ["425601", "425604", "425603", "425605", "425600", "425597"];

        public static stageMonsterSkillTitleArr = ["MonsterSkill_1", "MonsterSkill_2", "MonsterSkill_3", "MonsterSkill_4"];
        public static stageMonsterSkillDescArr = ["MonsterSkillDesc_1", "MonsterSkillDesc_2", "MonsterSkillDesc_3", "MonsterSkillDesc_4"];
        public getStageMonsterSkillInfo(type: StageMonsterSkillType) {
            return {
                title: Stage.stageMonsterSkillTitleArr[type],
                desc: Stage.stageMonsterSkillDescArr[type]
            };
        }
    }
    export class Tower {
        public static initUnlockTower = 1008; // 最初解锁的塔
    }
    export class Anim {
        public static stageCrossAnimSeconds = 1; // Stage 过场过渡动画时间
        public static logoCrossAnimSeconds = 1; // Logo 过场黑屏渐进过渡动画时间
        public static logoScaleAnimSeconds = 0.8; // Logo 缩放过渡动画时间
    }
    export class Bless {
        /** Bless item 背景 各元素对应 光 暗 水 火 木 土 guid */
        public static blessItemBgGuid: string[] = ["405044", "405054", "405050", "405041", "405049", "405045"]; 
        /** Bless item位置对应进度 3% 6% 10% 0则不显示*/
        public static blessProgress: number[] = [3, 3, 6, 6, 6, 6, 10]; 
    }
    /**商店 */
    export class Shop {
        /** 局外金币、局内金币图标 guid */
        public static priceGoldIconGuid: string[] =["376847", "385388"];
        // 商店 tag 图标： 单体、群体、物理、魔法
        public static shopTagIconGuid: string[] = ["418947", "418886", "418960", "418940"];
        /** 商店item背景 各元素对应 光 暗 水 火 木 土 guid */
        public static shopItemBgGuid: string[] = ["426438", "426435", "426447", "426437", "426433", "426434"];
        /** 商店item角标 各元素对应 光 暗 水 火 木 土 guid */
        public static shopItemCornerIconGuid: string[] = ["392791", "392792", "392800", "392788", "392801", "392804"];
        /** 商店攻击力图标 攻击/产出/增益 guid */
        public static shopItemFightIconGuid: string[] = ["423971", "421493", "424749"];

        /**筛选 - 元素选项 all, 光暗水火木土 */
        public static shopElementsOpts: string[] = [
            "Sift_1",
            "Element_1",
            "Element_2",
            "Element_3",
            "Element_4",
            "Element_5",
            "Element_6",
        ];

        /**筛选 - 目标选项 all, 单体/aoe */
        public static shopTargetOpts: string[] = ["Sift_1", "Target_1", "Target_2"];

        /**筛选 - 类型 all, 物理/法术 */
        public static shopDamageOpts: string[] = [
            "Sift_1",
            "DamageType_1",
            "DamageType_2",
            "DamageType_3",
            "DamageType_4",
        ];

        /**筛选 - 对策 all, ... */
        public static shopStrategyOpts: string[] = [
            "Sift_1",
            "Strategy_1",
            "Strategy_2",
            "Strategy_3",
            "Strategy_4",
            "Strategy_5",
            "Strategy_6",
            "Strategy_7",
            "Strategy_8",
            "Strategy_9",
            "Strategy_10",
        ];

        public static shopStrategyDescLangs: string[] = [
            "Sift_1",
            "StrategyDesc_1",
            "StrategyDesc_2",
            "StrategyDesc_3",
            "StrategyDesc_4",
            "StrategyDesc_5",
            "StrategyDesc_6",
            "StrategyDesc_7",
            "StrategyDesc_8",
            "StrategyDesc_9",
            "StrategyDesc_10",
        ];

        // 柯里化函数，用于根据多语言之后的文本，获取选中的Index
        public static getSelectedType =
            (opts: string[]) =>
            (selectedOpt: string): number | null => {
                const languages = opts.map((opt) => GameConfig.Language[opt]?.Value);
                const idx = languages.findIndex((item) => item === selectedOpt);
                if (idx === -1) return null;
                return idx;
            };
        public static getSelectedTowerElementType = this.getSelectedType(this.shopElementsOpts);
        public static getSelectedTowerTargetType = this.getSelectedType(this.shopTargetOpts);
        public static getSelectedTowerDamageType = this.getSelectedType(this.shopDamageOpts);
        public static getSelectedTowerStrategyType = this.getSelectedType(this.shopStrategyOpts);

        /** 获取对策对应的 buff数组 */
        public static getTowerStrategyBuffs = () => {
            const buffs = GameConfig.Buff.getAllElement();
            const strategyBuffs: { [key: number]: number[] } = {};
            function setStrategyBuffs(key: TowerStrategyType, value: number) {
                if (strategyBuffs?.[key]) {
                    strategyBuffs[key].push(value);
                } else {
                    strategyBuffs[key] = [value];
                }
            }
            for (const buff of buffs) {
                if (buff.warmUp !== 0) {
                    setStrategyBuffs(TowerStrategyType.WarmUp, buff.id);
                    continue;
                }
                if (buff.armorPen !== 0) {
                    setStrategyBuffs(TowerStrategyType.ArmorBreak, buff.id);
                    continue;
                }
                if (buff.speed === -999) {
                    setStrategyBuffs(TowerStrategyType.StunEffect, buff.id);
                    continue;
                }
                if (buff.armorReduction !== 0) {
                    setStrategyBuffs(TowerStrategyType.ArmorShred, buff.id);
                    continue;
                }
                if (buff.speed !== 0 && buff.speed !== -999) {
                    setStrategyBuffs(TowerStrategyType.SlowEffect, buff.id);
                    continue;
                }
                if (buff.magicPen !== 0) {
                    setStrategyBuffs(TowerStrategyType.MagicPenetration, buff.id);
                    continue;
                }
                if (buff.flyingDamageBoost !== 0) {
                    setStrategyBuffs(TowerStrategyType.AntiAir, buff.id);
                    continue;
                }
                if (buff.multiHit !== 0) {
                    setStrategyBuffs(TowerStrategyType.MultiHit, buff.id);
                    continue;
                }
                if (buff.flyFirst !== 0) {
                    setStrategyBuffs(TowerStrategyType.PriorityAir, buff.id);
                    continue;
                }
            }
            return strategyBuffs;
        };
        // key 为 TowerStrategyType 的枚举, value 为 buffId 的数组
        public static towerStrategyBuffs: { [key: number]: number[] } = this.getTowerStrategyBuffs();
        // 获取塔的buff对策
        public static getStrategyInfo = (
            towerId: number
        ): {
            strategyTitle: string;
            strategyDesc: string[]; // 不同等级对应的 desc
            strategyDescArgs: string[][]; // 不同等级对应的 args
            strategyKey: TowerStrategyType;
        } | null => {
            const cfg = GameConfig.Tower.getElement(towerId);
            if (cfg?.attackTags?.includes(1)) {
                const { desc, args } = this.getStrategyDesc(TowerStrategyType.AntiHidden)
                return {
                    // 反隐
                    strategyTitle: GameConfig.Language.getElement(
                        GlobalData.Shop.shopStrategyOpts[TowerStrategyType.AntiHidden]
                    )?.Value,
                    strategyDesc: [desc],
                    strategyDescArgs: [args],
                    strategyKey: TowerStrategyType.AntiHidden,
                };
            }
            if (!cfg?.attackBuff?.length) return null;
            const levelBuffs = cfg.attackBuff;
            const strategyBuffs = this.towerStrategyBuffs;
            let strategyKey = null;
            let title = null;
            const descArr = [] // 每级对应的描述
            const argsArr = [] // 每级对应的参数
            for(const level in levelBuffs){
                const levelBuff = levelBuffs[level];
                if(levelBuff?.length){
                    const buffId = levelBuff[0];
                    const buffCfg = GameConfig.Buff.getElement(buffId);
                    if(!buffCfg) continue;
                    for (const key in strategyBuffs) {
                        if (strategyBuffs[key]?.includes(buffCfg.id)) {
                            strategyKey = Number(key) as TowerStrategyType;
                            title = GameConfig.Language.getElement(
                                GlobalData.Shop.shopStrategyOpts[strategyKey]
                            )?.Value;
                            const { desc, args } = this.getStrategyDesc(strategyKey, buffId);
                            descArr.push(desc);
                            argsArr.push(args);
                            break;
                        }
                    }
                }
                
            }
            return {
                strategyTitle: title,
                strategyDesc: descArr,
                strategyDescArgs: argsArr,
                strategyKey,
            };
        };
        public static getStrategyDesc(strategyKey: TowerStrategyType, buffId?: number): { desc: string; args: any[]}  {
            const desc =
                GameConfig.Language.getElement(GlobalData.Shop.shopStrategyDescLangs[strategyKey])?.Value ?? "";

            const formatDesc = (buffCfg: any, props: string[], formatter?: (value: number) => void) => {
                const args = props.map(prop => formatter ? formatter(buffCfg[prop]): buffCfg[prop]);
                return { desc: Utils.Format(desc, ...args), args: args };
            };
            const processBuffs = (props: string[], formatter?: (value: number) => number) => {
                if(!buffId) return { desc, args: [] };
                const buffCfg = GameConfig.Buff.getElement(buffId);
                if(!buffCfg) return { desc, args: [] };
                return formatDesc(buffCfg, props, formatter);
            };
        
            switch (strategyKey) {
                case TowerStrategyType.WarmUp:
                    return processBuffs(["warmUp", "warmUpFindRange", "warmUpAttackDamage", "warmUpAttackTime"]);
                case TowerStrategyType.ArmorBreak:
                    return processBuffs(["armorPen"]);
                case TowerStrategyType.StunEffect:
                    return processBuffs(["duration"]);
                case TowerStrategyType.ArmorShred:
                    return processBuffs(["armorReduction"]);
                case TowerStrategyType.SlowEffect:
                    return processBuffs(["speed"], value => -value);
                case TowerStrategyType.MagicPenetration:
                    return processBuffs(["magicPen"]);
                case TowerStrategyType.AntiAir:
                    return processBuffs(["flyingDamageBoost"]);
                case TowerStrategyType.MultiHit:
                    return processBuffs(["multiHit"]);
                case TowerStrategyType.AntiHidden:
                case TowerStrategyType.PriorityAir:
                default:
                    return { desc: desc, args: [] };
            }
        }
    }
}
