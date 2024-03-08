/*
 * @Author       : dal
 * @Date         : 2024-01-23 17:28:12
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-06 17:43:13
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\route\RouteModule.ts
 * @Description  : 
 */
import { GameConfig } from "../../../config/GameConfig";
import { EGameTheme } from "../../Defines";
import GameStart from "../../GameStart";
import { WaitLoop } from "../../utils/AsyncTool";
import { GlobalSwitch } from "../../utils/GlobalSwitch";
import TimeTransferUtil from "../../utils/TimeTransferUtil";
import Tips from "../../utils/Tips";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { BagDefine, BagItemData } from "../bag/BagDefine";
import { BagModuleC } from "../bag/BagModuleC";
import { DegreeType } from "../blackboard/BoardDefine";
import { OnCardGameThemeList } from "../idcard/IDCardConst";
import { PlayerAttr } from "../player/PlayerAttr";
import { GraveyardExpIndex, DiffExpIndex } from "../procedure/const/ClueDefine";
import RouteConst from "./RouteConst";
import { RouteDataHelper, RouteDataType, PassInfo, RouteData } from "./RouteData";
import { RouteDefine } from "./RouteDefine";

export class RouteModuleC extends ModuleC<RouteModuleS, null> {

    public reqJumpGame(gameTheme: EGameTheme) {
        const gameThemeCfg = RouteConst.getGameThemeCfg(gameTheme);
        // TODO: 这里dead是队伍人数，现在就一个单人跳游戏所以先发固定的1后面有组队需求来改
        const teamPlayerNum: number = 1;
        const disTime: number = Math.floor((Date.now() - this.startTime) / 1000);
        GhostTraceHelper.uploadMGS("ts_game_over", "开始跳转", { round_id: 997, dead: teamPlayerNum, kill_player: disTime, skill_id: gameThemeCfg.id });
        RouteService.enterNewGame(GameStart.isGPark ? gameThemeCfg["gameIdGPark"] : gameThemeCfg.gameId);
    }

    public reqSavePassInfo(degree: DegreeType, endCfgId: number) {
        if (endCfgId === null || endCfgId === 0) { return; }
        this.server.net_reqSavePassInfo(this.localPlayer.userId, degree, endCfgId);
    }

    public async reqUnlockedGraphList(): Promise<number[]> {
        if (this.unlockedGraphList.length != 0) { return this.unlockedGraphList; }
        this.unlockedGraphList = await this.server.net_reqGraphData(this.localPlayer.userId);
        return this.unlockedGraphList;
    }

    /** 开始时间戳 */
    private startTime: number = Date.now();

    protected onStart(): void {
        DataCenterC.ready().then(async () => {
            this.unlockedGraphList = await this.server.net_reqGraphData(this.localPlayer.userId);
        })
        RouteDefine.onFearCoinChangeAction.add((coinNum: number) => {
            console.log(`DEBUG>>> 监听到玩家 ${this.localPlayer.userId} 恐惧币数量改变：${coinNum}`);
        });
    }

    /** 已解锁的图录列表 */
    private unlockedGraphList: number[] = [];

    /** 检查一下是否需要保存这个图录 */
    private checkNeedSaveGraph(newGraphList: number[]): number[] {
        if (newGraphList.length === 0) { return []; }
        return newGraphList.filter(v => { return !this.unlockedGraphList.includes(v); });
    }

    public async reqSaveGraph(newGraphList: number[]) {
        const tempGraphList = this.checkNeedSaveGraph(newGraphList);
        // 如果不需要保存直接return
        if (tempGraphList.length === 0) {
            // 不是初次来解锁
            newGraphList.forEach(() => {
                GhostTraceHelper.uploadMGS("ts_action_sell", "按下快门", { goods: 0 });
            });
            return;
        } else {
            // 初次解锁
            tempGraphList.forEach((v, id) => {
                GhostTraceHelper.uploadMGS("ts_action_sell", "按下快门", { goods: 1, totalgoods: this.unlockedGraphList.length + id + 1 });
            })
        }
        this.unlockedGraphList = await this.server.net_reqSaveGraph(this.localPlayer.userId, tempGraphList);
    }

    /** 获取恐惧币 */
    public async getFearCoin(userId: string) {
        return await this.server.net_getFearCoin(userId);
    }

    public async reqChangeFearCoin(userId: string, changeCount: number): Promise<boolean> {
        if (changeCount === 0) { return false; }
        if (changeCount < 0) {
            const curCoin = await this.getFearCoin(userId);
            if (curCoin + changeCount < 0) { Tips.show("差点钱啊小老弟！（请把这个接多语言）"); return false; }
        }
        this.server.net_changeFearCoin(userId, changeCount);
    }

    /** 改变恐惧币成功的回调 */
    public net_onChangeFearCoin(fearCoin: number) {
        RouteDefine.onFearCoinChangeAction.call(fearCoin);
    }

    /** 改变道具数量成功的回调 */
    public net_onItemChange(itemData: BagItemData) {
        RouteDefine.onItemChange.call(itemData.cfgId, itemData.count);
        ModuleService.getModule(BagModuleC).net_removeItem(itemData.guid, itemData.count);
    }

    /** 特殊道具增加 */
    public net_resAddItem(itemData: BagItemData, showTips: boolean = true) {
        ModuleService.getModule(BagModuleC).net_resAddItem(false, itemData, showTips);
    }

    /** 获取所有游戏的路由数据 */
    public async reqAllGameRouteData() {
        return this.server.net_reqAllGameRouteData(Player.localPlayer.userId);
    }

    public async reqRouteData(userId: string) {
        return this.server.net_reqRouteData(userId);
    }

    public reqSetRouteData(userId: string, gameTheme: EGameTheme, properties: string[], values: any[]) {
        this.server.net_reqSetRouteData(userId, gameTheme, properties, values);
    }

    public async reqAddSpecialItem(userId: string, cfgId: number, count: number, showTips: boolean = true) {
        return await this.server.net_reqAddSpecialItem(userId, cfgId, count, showTips);
    }

    public async reqRemoveSpecialItem(userId: string, cfgId: number, count: number) {
        const routeData = await this.reqRouteData(userId);
        const specialItemData = routeData.specialItemDataList.find(v => { return v.cfgId === cfgId });
        if (!specialItemData || specialItemData.count < count) {
            Tips.show(`道具${cfgId}不够`);
            return false;
        }
        return this.server.net_reqRemoveSpecialItem(userId, cfgId, count);
    }
}

export class RouteModuleS extends ModuleS<RouteModuleC, null> {

    public async net_reqAllGameRouteData(userId: string) {
        const routeDataList: RouteData[] = [];
        OnCardGameThemeList.forEach(async v => {
            routeDataList.push(await RouteDataHelper.reqGetData(userId, v));
        })
        await WaitLoop.loop(() => { return routeDataList.length === OnCardGameThemeList.length });
        return routeDataList;
    }

    @Decorator.noReply()
    public async net_reqAddSpecialItem(userId: string, cfgId: number, count: number, showTips: boolean = true) {
        const routeData = await this.net_reqRouteData(userId);
        let specialItemData = routeData.specialItemDataList.find(v => { return v.cfgId === cfgId });
        if (!specialItemData) {
            specialItemData = new BagItemData();
            specialItemData.guid = `${Date.now()}_${cfgId}`
            specialItemData.cfgId = cfgId;
            specialItemData.count = count;
            routeData.specialItemDataList.push(specialItemData);
        } else {
            specialItemData.count += count;
        }
        this
        // 触发一次保存即可
        RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [], []);

        const player = Player.getPlayer(userId);
        player && this.getClient(player).net_resAddItem(specialItemData, showTips);
    }

    @Decorator.noReply()
    public async net_reqRemoveSpecialItem(userId: string, cfgId: number, count: number) {
        const routeData = await this.net_reqRouteData(userId);
        const specialItemData = routeData.specialItemDataList.find(v => { return v.cfgId === cfgId });
        if (!specialItemData || specialItemData.count < count) {
            return false;
        } else {
            specialItemData.count -= count;
            const player = Player.getPlayer(userId);
            player && this.getClient(player).net_onItemChange(specialItemData);
        }
        // 触发一次保存即可
        RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [], []);
        return true;
    }

    public async net_reqGraphData(userId: string): Promise<number[]> {
        return (await RouteDataHelper.reqGetData(userId, EGameTheme.Hall)).unlockedGraphList;
    }

    /** 通关了保存一下通关的这个结局信息 */
    @Decorator.noReply()
    public net_reqSavePassInfo(userId: string, degree: DegreeType, endCfgId: number) {
        if (!endCfgId || endCfgId === 0) { return; }
        RouteDataHelper.reqSetData(userId, GameStart.GameTheme, [RouteDataType.PassInfoMap], [new PassInfo(degree, endCfgId, 1)]);
    }

    /** 保存图录并返回已保存的图录 */
    public async net_reqSaveGraph(userId: string, newGraphList: number[]): Promise<number[]> {
        const unlockedGraphList: number[] = (await RouteDataHelper.reqGetData(userId, EGameTheme.Hall)).unlockedGraphList;
        // 再过滤一遍，确保不存在解锁了相同的图录
        const tempGraphList = newGraphList.filter(v => { return !unlockedGraphList.includes(v); });
        // 拼凑出新的解锁列表
        const newUnlockedGraphList = unlockedGraphList.concat(tempGraphList);
        // 保存
        RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [RouteDataType.UnlockedGraphList], [newUnlockedGraphList]);
        return newUnlockedGraphList;
    }

    public async net_getFearCoin(userId: string) {
        return (await RouteDataHelper.reqGetData(userId, EGameTheme.Hall)).fearCoin;
    }

    public async net_changeFearCoin(userId: string, changeCount: number): Promise<boolean> {
        const curCoin = await this.net_getFearCoin(userId);
        if (changeCount < 0) {
            if (curCoin + changeCount < 0) { return false; }
        }
        (await RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [RouteDataType.FearCoin], [changeCount]));
        const player = Player.getPlayer(userId);
        player && this.getClient(player).net_onChangeFearCoin(await this.net_getFearCoin(userId));
    }

    public async net_reqRouteData(userId: string) {
        return RouteDataHelper.reqGetData(userId, EGameTheme.Hall);
    }

    @Decorator.noReply()
    public net_reqSetRouteData(userId: string, gameTheme: EGameTheme, properties: string[], values: any[]) {
        RouteDataHelper.reqSetData(userId, gameTheme, properties, values);
    }
}
