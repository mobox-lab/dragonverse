import { LanguageConfig } from "../config/Language";
import { TowerElementType, TowerTargetType } from "./enum";

export namespace GlobalData {
    /**商店 */
    export class Shop {
        /**筛选 - 元素选项 all, 光暗火水木土 */
        public static shopElementsOpts: string[] = ["Sift_1", "Element_1", "Element_2", "Element_3", "Element_4", "Element_5", "Element_6"];
        
        /**筛选 - 目标选项 all, 单体/aoe */
        public static shopTargetOpts: string[] = ["Sift_1", "Target_1", "Target_2"];
        
        /**筛选 - 类型 all, 物理/法术 */
        public static shopDamageOpts: string[] = ["Sift_1", "DamageType_1", "DamageType_2"];
        
        /**筛选 - 对策 all, ... */
        public static shopStrategyOpts: string[] = ["Sift_1", "Strategy_1", "Strategy_2", "Strategy_3", "Strategy_4", "Strategy_5", "Strategy_6", "Strategy_7", "Strategy_8", "Strategy_9","Strategy_10"];
    }
}