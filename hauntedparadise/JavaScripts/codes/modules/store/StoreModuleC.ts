/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-23 10:13:05
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-05 14:35:50
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\store\StoreModuleC.ts
 * @Description  : 
 */
import { AddGMCommand } from "module_gm";
import { GameConfig } from "../../../config/GameConfig";
import { IShopElement } from "../../../config/Shop";
import ShopBean from "./ShopBean";
import StoreData from "./StoreData";
import StoreModuleS from "./StoreModuleS";
import { UIGainItem } from "./ui/UIGaintem";
import { UIShopTips } from "./ui/UIShopTips";
import { RouteDefine } from "../route/RouteDefine";
import { UIGiftBagOpen } from "./ui/UIGiftBagOpen";
import { UIGiftDisplay } from "./ui/UIGiftDisplay";
import { GameAnim } from "../../utils/GameAnim";
import UIShop from "./ui/UIShop";
import Tips from "../../utils/Tips";
import { UIBuyGiftBag } from "./ui/UIBuyGiftBag";


AddGMCommand("加恐惧币", (player: mw.Player, val: string) => {
    RouteDefine.changeFearCoin(Player.localPlayer.userId, Number(val))
})

AddGMCommand("设置模型旋转", (player: mw.Player, val: string) => {
    ModuleService.getModule(StoreModuleC).setModelRotate(val)
})

AddGMCommand("设置模型缩放", (player: mw.Player, val: string) => {
    ModuleService.getModule(StoreModuleC).setModelScale(val)
})
AddGMCommand("设置模型位置", (player: mw.Player, val: string) => {
    ModuleService.getModule(StoreModuleC).setModelPosition(val)
})


AddGMCommand("兑换礼包", (player: mw.Player, val: string) => {
    UIService.show(UIBuyGiftBag, Number(val))
})


export enum EShopItemType {
    /**buff类道具 */
    BuffType = 1,
    /**消耗品 */
    Consumables = 2,
    /**互动道具 */
    Interaction = 3,
    /**礼包 */
    Gift = 4
}

export default class StoreModuleC extends ModuleC<StoreModuleS, StoreData> {

    static skipDisplay: boolean = false
    private _curShopID: number = 1;
    private _shops: Map<number, ShopBean> = new Map();
    private _defaultColor: mw.LinearColor
    protected onStart(): void {
        this._defaultColor = mw.Lighting.skyLightColor;
        GameConfig.Shop.getAllElement().forEach(async e => {
            let camera = await mw.GameObject.asyncFindGameObjectById(e.cameraGuid) as Camera
            let point = await mw.GameObject.asyncFindGameObjectById(e.itemPoint)
            if (camera && point && !this._shops.has(e.shopID)) {
                let shop = new ShopBean(e.shopID, camera, point);
                this._shops.set(e.shopID, shop)
            }
        })
        this.server.net_initPlayerShop();
        Event.addLocalListener("evt_openShop", (guid: string, shopID: string) => {
            this.openStore(Number(shopID))
        })
    }

    public openStore(shopID: number) {
        if (!this._shops.has(shopID)) return
        Lighting.skyLightColor = mw.LinearColor.white;
        this._curShopID = shopID
        this._shops.get(this._curShopID).openStore();
    }

    public closeStore() {
        Lighting.skyLightColor = this._defaultColor;
        this._shops.get(this._curShopID).closeStore();
    }

    public selectItem(itemID: number) {
        this._shops.get(this._curShopID).selectItem(itemID);
    }

    public rotateModel(state: boolean) {
        this._shops.get(this._curShopID).rotateModel(state)
    }

    //====================================rpc================================================//

    public async reqBuyItem(data: IShopElement, count: number) {
        let result = await this.server.net_buyItem(data.id, count);
        switch (result) {
            case -1:
                console.log("道具id不存在！！！");
                break;
            case 0:
                console.log("金币不足！！！");

                break;
            default:
                let itemData = GameConfig.Item.getElement(result)
                UIService.show(UIGainItem, itemData.icon, itemData.name, count)
                break;
        }
    }

    public async reqWantedItem(ItemID: number) {
        let result = await this.server.net_wantItem(ItemID)
        if (result != -1) {
            let itemData = GameConfig.Item.getElement(result)
            UIService.show(UIGainItem, itemData.icon, itemData.name, 1)
        } else {
            let shopUI = UIService.getUI(UIShop)
            GameAnim.flySequence(5, shopUI.btn_want, shopUI.canvas_freemoney, "303467", new Vector2(50, 50), new Vector(50, -100))
            Tips.show(GameConfig.SubLanguage.shop_16.Value);
        }
    }

    public async reqGetBuyLimit(shopID: number) {
        return await this.server.net_getBuyLimit(shopID)
    }

    /**
     * 打开礼包
     * @param itemID 
     */
    public async reqOpenGiftPack(itemID: number, count: number) {
        let curGiftItemID = itemID
        let result = await this.server.net_openGiftPack(itemID, count);
        UIService.hide(UIGiftBagOpen)
        UIService.show(UIGiftDisplay, result, curGiftItemID)
    }

    protected onUpdate(dt: number): void {

    }

    setModelRotate(val: string) {
        let strs = val.split(",")
        let rotation = new Rotation(Number(strs[0]), Number(strs[1]), Number(strs[2]))
        this._shops.get(this._curShopID).setRotate(rotation)
    }
    setModelScale(val: string) {
        let strs = val.split(",")
        let scale = new Vector(Number(strs[0]), Number(strs[1]), Number(strs[2]))
        this._shops.get(this._curShopID).setScale(scale)
    }
    setModelPosition(val: string) {
        let strs = val.split(",")
        let pos = new Vector(Number(strs[0]), Number(strs[1]), Number(strs[2]))
        this._shops.get(this._curShopID).setPosition(pos)
    }
}