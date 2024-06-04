import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import { buffToString } from "../../util/uitls";
import { CollectModuleData } from "../PetCollect/CollectModuleData";
import { petItemDataNew } from "./PetBagModuleData";

export enum EnchantType {

}
export class BagTool {
    /**随机生成词条等级 */
    // public static randomEnchantLevel(id: number): number {
    //     //特殊词条
    //     const data = GlobalData.Enchant.specialEnchantId;
    //     if (id >= data[0] && id <= data[1]) {
    //         return 1;
    //     }
    //     let cfg = GameConfig.Enchants.getElement(id);
    //     let totalWeight = 0;
    //     for (let i = 0; i < cfg.Weight.length; i++) {
    //         totalWeight += cfg.Weight[i];
    //     }

    //     let petVariantId = 0;
    //     let random = Math.random() * totalWeight;
    //     let probability = 0;
    //     for (let i = 0; i < cfg.Weight.length; i++) {
    //         probability += cfg.Weight[i];
    //         if (random <= probability) {
    //             petVariantId = cfg.Level[i];
    //             break;
    //         }
    //     }
    //     return petVariantId;
    // }

    public static getStr(petData: petItemDataNew): string {
        let str = "";
        let ids = petData.p.b;
        for (let i = 0; i < ids.length; i++) {
            const element = ids[i];
            let level = GameConfig.Enchants.getElement(element).Level;
            str += buffToString(ids[i], level);
        }
        return str;
    }
    /**计算权重  返回索引*/
    public static calculateWeight(curWeight: number[]): number {
        let totalWeight = 0;
        for (let i = 0; i < curWeight.length; i++) {
            totalWeight += curWeight[i];
        }

        let petVariantId = 1;
        let random = Math.random() * totalWeight;
        let probability = 0;
        for (let i = 0; i < curWeight.length; i++) {
            probability += curWeight[i];
            if (random <= probability) {
                petVariantId = i
                break;
            }
        }
        return petVariantId;
    }


    /**根据等级1-5 ，返回对应的罗马等级 */
    public static getRomanLevel(level: number): string {
        let romanLevel: string = "";
        switch (level) {
            case 1:
                romanLevel = "Ⅰ";
                break;
            case 2:
                romanLevel = "Ⅱ";
                break;
            case 3:
                romanLevel = "Ⅲ";
                break;
            case 4:
                romanLevel = "Ⅳ";
                break;
            case 5:
                romanLevel = "Ⅴ";
                break;
        }
        return romanLevel;

    }

    /**获取玩家最强宠物id */
    public static getStrongestPetId(playerId: number): number {
        let arr = DataCenterS.getData(playerId, CollectModuleData).HasArr;
        let maxAtk = 0;
        let maxId = 0;
        arr.forEach(element => {
            let atk = GameConfig.PetARR.getElement(element).PetAttack[0];
            if (atk > maxAtk) {
                maxAtk = atk;
                maxId = element;
            }
        })
        return maxId;
    }
}