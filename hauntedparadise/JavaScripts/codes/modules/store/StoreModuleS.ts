/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-23 10:12:55
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-05 14:39:05
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\store\StoreModuleS.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import { CommonUtils } from "../../utils/CommonUtils";
import { RouteDefine } from "../route/RouteDefine";
import StoreData from "./StoreData";
import StoreModuleC from "./StoreModuleC";

export default class StoreModuleS extends ModuleS<StoreModuleC, StoreData> {

    protected onStart(): void {

    }

    protected onUpdate(dt: number): void {

    }

    //=======================================rpc=========================================//

    @Decorator.noReply()
    public net_initPlayerShop() {
        this.currentData.checkDataRefresh();
    }

    /**
     * 
     * @param itemID 道具id
     * @param count 购买数量
     * @returns 
     */
    public async net_buyItem(itemID: number, count: number) {
        let playerId = this.currentPlayer.userId
        let data = GameConfig.Shop.getElement(itemID)
        let totalPrice = data.price * count
        let money = await RouteDefine.getFearCoin(playerId)
        if (money < totalPrice) return 0
        RouteDefine.changeFearCoin(playerId, -totalPrice);
        RouteDefine.addSpecialItem(playerId, data.itemID, count)
        return data.itemID
    }

    /**
     * 白嫖
     * @param itemID 
     * @returns 
     */
    public net_wantItem(itemID: number) {
        if (this.currentData.wantTimes <= 0) return
        let data = GameConfig.Shop.getElement(itemID);
        let newItemID = -1
        if (Math.random() <= GameConfig.SubGlobal.wantParams.array1d[1]) { //获得物品
            newItemID = data.itemID
        } else {  //未获得道具给恐惧币
            RouteDefine.changeFearCoin(this.currentPlayer.userId, MathUtil.randomInt(GameConfig.SubGlobal.wantParams.array1d[2], GameConfig.SubGlobal.wantParams.array1d[3]));
        }
        this.currentData.changeWantsTimes(-1);
        return newItemID;
    }

    public async net_getBuyLimit(shopID: number) {
        let data = GameConfig.Shop.getElement(shopID)
        let bagItems = await RouteDefine.getSpecialItemDataList(this.currentPlayerId.toString())
        let count = 0;
        if (bagItems) {
            let item = bagItems.find(e => { return e.cfgId == data.itemID })
            count = item ? item.count : 0
        }
        return data.buyLimit - count
    }

    /**
     * 打开礼包
     * @param itemID 
     * @returns 
     */
    public net_openGiftPack(itemID: number, count: number) {
        let data = GameConfig.Shop.getAllElement().find(e => e.itemID == itemID);
        let result = new Map()
        let tempItems = []; let tempItemCount = []
        //开启多个礼包
        for (let i = 0; i < count; ++i) {
            let index = CommonUtils.weightRandom(data.giftWeights);
            tempItems = tempItems.concat(data.giftList[index])
            tempItemCount = tempItemCount.concat(data.giftNum[index])
        }
        //重叠重复的物品
        for (let i = 0; i < tempItems.length; ++i) {
            let itemID = tempItems[i]
            if (result.has(itemID)) {
                let newCount = result.get(itemID) + tempItemCount[i];
                result.set(itemID, newCount)
            } else {
                result.set(itemID, tempItemCount[i])
            }
        }
        let finalItems: number[] = []
        let finalCounts: number[] = []
        result.forEach((count, itemID) => {
            finalItems.push(itemID)
            finalCounts.push(count)
            RouteDefine.addSpecialItem(this.currentPlayer.userId, itemID, count);
        })
        RouteDefine.removeSpecialItem(this.currentPlayer.userId, itemID, count);
        return [finalItems, finalCounts];
    }

}