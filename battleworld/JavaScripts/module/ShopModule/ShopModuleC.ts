import { GameConfig } from "../../config/GameConfig";
import { EAnalyticsEvents, EModule_Events } from "../../const/Enum";
import { Globaldata } from "../../const/Globaldata";
import { EventManager } from "../../tool/EventManager";
import { EFirstDo } from "../AnalyticsModule/AnalyticsTool";
import { EquipModuleC } from "../EquipModule/EquipModuleC";
import { ShopModuleData } from "./ShopModuleData";
import { ShopModuleS } from "./ShopModuleS";
import { IItemData } from "./UI/ShopItem";
import { ShopView } from "./UI/ShopView";

/**
 * 商城模块C
 */
export class ShopModuleC extends ModuleC<ShopModuleS, ShopModuleData> {

    /**物品数据缓存 这个会根据格子叠加数量创建新的格子  */
    public _itemMap: Map<number, IItemData[]> = new Map<number, IItemData[]>

    /**商店界面*/
    private _shopView: ShopView = null;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this._shopView = mw.UIService.create(ShopView);
        this.init_itemData();

        // InputUtil.onKeyDown(Keys.F4, () => {
        //     mw.UIService.showUI(this._shopView);
        // })

        //商店进入触发器
        let trigger = GameObject.findGameObjectById(Globaldata.shop_trigger_guid) as Trigger;
        if (trigger) {
            trigger.onEnter.add((cha: Character) => {
                if (cha && cha.player) {
                    if (cha.player != this.localPlayer) return;
                    mw.UIService.showUI(this._shopView);
                }
            })
            trigger.onLeave.add((cha: Character) => {
                if (cha && cha.player) {
                    if (cha.player != this.localPlayer) return;
                    mw.UIService.hideUI(this._shopView);
                }
            })
        }
    }

    /**
     *是否装备
     * @param id 
     * @returns 
     */
    public isEquip(id: number) {
        if (!id) return false;
        let res = ModuleService.getModule(EquipModuleC).isEquiped(id);
        if (res) return true;
        return false;
    }

    /**
     * 是否拥有 
     * @param id
     * @returns 
     */
    public isHave(id: number) {
        if (this.data.ownItemArr.includes(id)) return true;
        return false;
    }


    /**通过页签索引获取数据 */
    public getDataByTab(index: number) {
        if (this._itemMap.has(index) == false) {
            return null;
        }
        return this._itemMap.get(index);
    }

    /**
     * 初始化item数据
     */
    private async init_itemData() {
        let itemCfgs = GameConfig.Shop.getAllElement();
        itemCfgs.sort((a, b) => {
            return a.Price - b.Price;
        })
        let iconArr: string[] = [];
        for (let index = 0; index < itemCfgs.length; index++) {
            const itemCfg = itemCfgs[index];
            let data = new IItemData(itemCfg.id, itemCfg.Price, itemCfg.Icon, itemCfg.Img, itemCfg.Des, itemCfg.pendantId, itemCfg.pendantName, itemCfg.Type);
            iconArr.push(itemCfg.Icon);
            if (this._itemMap.has(itemCfg.Type) == false) {
                this._itemMap.set(itemCfg.Type, []);
            }
            this._itemMap.get(itemCfg.Type).push(data);

            if (this._shopView.visible) {
                this._shopView.refresh_bagList();
            }
        }
        //重置按钮item数据
        let data = new IItemData(0, 0, "", Globaldata.shop_reset, "", [], "", 0);
        this._itemMap.forEach((value, key) => {
            value.unshift(data);
        })
        //统一请求资源的ICON信息
        await mw.assetIDChangeIconUrlRequest(iconArr);
    }

    /**
     * 购买物品
     */
    public async buyItem(itemId: number) {
        if (await this.server.net_purchaseItem(itemId)) {
            this.equipItem(itemId);
            this._shopView.showBuyTips(true);

            // 埋点
            EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.bought);
        }
        else {
            //提示
            this._shopView.showBuyTips(false);
        }
    }

    /**
     * 装备物品
     */
    public equipItem(itemId: number) {
        EventManager.instance.call(EModule_Events.equip_addEquip, itemId);
        this._shopView.equipBtn();
    }


    public async buyBattleTimes(itemId: number): Promise<boolean> {
        return await this.server.net_buyBattleTimes(itemId);
    }

}