/*
 * @Author       : dal
 * @Date         : 2024-01-31 20:10:02
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-07 13:17:13
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\bag\BagDefine.ts
 * @Description  : 
 */
import { GameConfig } from "../../../config/GameConfig";
import { Const } from "../../Defines";
import { BagModuleC } from "./BagModuleC";
import { BagModuleS } from "./BagModuleS";

export class BagItemData {
    public guid: string = "";
    public cfgId: number = 0;
    public customData: string = "";
    public count: number = 0;
    /** 背包节点的id，如果没有初始化则为-1，将会根据itemList顺序默认给一个id，主要用于兼容之前玩家存档 */
    public nodeId: number = -1;
}

export class BagDefine {

    /** 物品栏显示的道具的总数量 */
    public static ViewCount: number = 5;

    /** 普通道具背包容量 */
    public static NormalItemCapacity: number = 10;

    /** 特殊道具背包容量 */
    public static SpecialItemCapacity: number = 9;

    /**
     * 当增加物品的时候发出
     * @param data 物品的自定义数据
     * @param needEquip 是否自动装备
     */
    public static AddItemEvt: string = "AddItemEvt";

    /**
     * 当移除物品的时候发出
     * @param cfgId 物品配置id
     * @param data 物品的自定义数据
     */
    public static RemoveItemEvt: string = "RemoveItemEvt";

    public static OnItemChangeEvt: string = "OnItemChangeEvt";

    public static OnItemInit: string = "OnItemInit";

    /** 是否初始化 */
    private static isInit: boolean = false;

    public static init() {
        if (this.isInit) { return; }
        BagDefine.NormalItemCapacity = GameConfig.Global.ItemMax.number - BagDefine.ViewCount;
        this.isInit = true;
    }

    /**
     * @param count 数量，默认是1
     * @param needSelect 是否需要在添加物品时选中，默认是选中的
     * @returns 
     */
    public static async AddItem(playerId: number, cfgId: number, data: string = "", clueGuid: string = "", count: number = 1, needSelect: boolean = true) {
        if (SystemUtil.isClient()) {
            return await ModuleService.getModule(BagModuleC).reqAddItem(playerId, cfgId, data, clueGuid, count, needSelect);
        }
        if (SystemUtil.isServer()) {
            return ModuleService.getModule(BagModuleS).net_reqAddItem(playerId, cfgId, data, clueGuid, count, needSelect);
        }
    }

    public static GetItemGuid(playerId: number, cfgId: number, data: string = "") {
        if (SystemUtil.isServer()) {
            return ModuleService.getModule(BagModuleS).getItemGuid(playerId, cfgId, data);
        }
    }

    public static GetItemData(playerId: number, guid: string) {
        if (SystemUtil.isServer()) {
            return ModuleService.getModule(BagModuleS).getItem(playerId, guid);
        }
    }

    public static RemoveItem(playerId: number, guid: string, removeCount?: number) {
        if (SystemUtil.isServer()) {
            return ModuleService.getModule(BagModuleS).removeItem(playerId, guid, removeCount);
        }
    }
}
