/*
 * @Author       : dal
 * @Date         : 2024-02-26 17:31:43
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-06 16:17:00
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\route\RouteDefine.ts
 * @Description  : 
 */
import { BagItemData } from "../bag/BagDefine";
import { RouteModuleC, RouteModuleS } from "./RouteModule";

export class RouteDefine {

    /** 恐惧币改变成功的回调 */
    public static onFearCoinChangeAction: Action = new Action();

    /** 恐惧币改变成功的回调 */
    public static onItemChange: Action = new Action();

    private static get selfModuleC() {
        return ModuleService.getModule(RouteModuleC);
    }

    private static get selfModuleS() {
        return ModuleService.getModule(RouteModuleS);
    }

    private constructor() { }

    /**
     * 获取恐惧币数 ( 同时支持客户端、服务端调用 )
     * @param userId 玩家id
     */
    public static async getFearCoin(userId: string): Promise<number> {
        return SystemUtil.isClient() ? this.selfModuleC.getFearCoin(userId) : this.selfModuleS.net_getFearCoin(userId);
    }

    /**
     * 改变恐惧币数量 ( 同时支持客户端、服务端调用 )
     * @param userId 玩家id
     * @param changeCount 改变数量
     * @returns 
     */
    public static async changeFearCoin(userId: string, changeCount: number): Promise<boolean> {
        return SystemUtil.isClient() ? this.selfModuleC.reqChangeFearCoin(userId, changeCount) : this.selfModuleS.net_changeFearCoin(userId, changeCount);
    }

    /**
     * 获取特殊道具
     */
    public static async getSpecialItemDataList(userId: string): Promise<BagItemData[]> {
        return SystemUtil.isClient() ? (await this.selfModuleC.reqRouteData(userId)).specialItemDataList : (await this.selfModuleS.net_reqRouteData(userId)).specialItemDataList;
    }

    /**
     * 获得特殊道具
     * @param userId 
     * @param cfgId 配置id
     * @param count 新增数量
     */
    public static async addSpecialItem(userId: string, cfgId: number, count: number, showTips: boolean = true) {
        SystemUtil.isClient() ? (await this.selfModuleC.reqAddSpecialItem(userId, cfgId, count, showTips)) : (await this.selfModuleS.net_reqAddSpecialItem(userId, cfgId, count, showTips));
    }

    /**
     * 移除特殊道具
     * @param userId 
     * @param guid 道具的guid
     */
    public static async removeSpecialItem(userId: string, cfgId: number, count: number) {
        SystemUtil.isClient() ? (await this.selfModuleC.reqRemoveSpecialItem(userId, cfgId, count)) : (await this.selfModuleS.net_reqRemoveSpecialItem(userId, cfgId, count));
    }
}
