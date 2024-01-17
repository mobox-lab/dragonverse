import { GameConfig } from "../../config/GameConfig";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { ShopModuleC } from "./ShopModuleC";
import { ShopModuleData } from "./ShopModuleData";


/**
 * 商城模块S
 */
export class ShopModuleS extends ModuleS<ShopModuleC, ShopModuleData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }
    /**
     * 购买物品
     * @param itemId 物品id
     */
    public async net_purchaseItem(itemId: number): Promise<boolean> {
        let playerS = ModuleService.getModule(PlayerModuleS);
        let needMoney = GameConfig.Shop.getElement(itemId).Price;
        if (playerS.getPlayerAttr(this.currentPlayerId, Attribute.EnumAttributeType.money) >= needMoney) {
            playerS.reducePlayerAttr(this.currentPlayerId, Attribute.EnumAttributeType.money, needMoney);
            this.addOwnItem(this.currentPlayerId, itemId);
            return true;
        }
        else {
            return false;
        }

    }
    /**
     * 添加物品
     * @param itemId 物品id
     */
    public addOwnItem(pId: number, itemId: number) {

        let shopData = this.getPlayerData(pId);
        if (shopData == null) {
            return;
        }

        if (!GameConfig.Shop.getElement(itemId)) return;

        if (shopData.ownItemArr.includes(itemId)) return;
        shopData.ownItemArr.push(itemId);
        shopData.save(true);
    }

    /**
     * 解锁段位奖励
     */
    public addRankReward(pId: number, rank: number) {
        for (let i = 1; i <= rank; i++) {
            let cfg = GameConfig.Rank.getElement(i);
            if (!cfg || !cfg.shopId) continue;
            this.addOwnItem(pId, cfg.shopId);
        }
    }
}