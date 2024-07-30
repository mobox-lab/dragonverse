/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-26 13:10:29
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-12-26 17:21:28
 * @FilePath     : \nevergiveup\JavaScripts\Modules\globalRank\GlobalRankModuleS.ts
 * @Description  : 修改描述
 */
/*
 * @Author       : chen.liang chen.liang@appshahe.com
 * @Date         : 2023-05-11 13:24:45
 * @FilePath: \globalRank\JavaScripts\modules\globalRank\GlobalRankModuleS.ts
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2023-12-19 10:10:24
 * @Description  : 
 */


import { PlayerUtil } from "../PlayerModule/PlayerUtil";
import GlobalRankCustomData, { RankInfoBase } from "./GlobalRankCustomData";
import { GlobalRankDataHelper } from "./GlobalRankDataHelper";
import { GlobalRankModuleC } from "./GlobalRankModuleC";
import { EmRankCustomKey } from "./const/EmRankCustomKey";

/**
 * GlobalRank模块Server端
 */
export class GlobalRankModuleS extends ModuleS<GlobalRankModuleC, GlobalRankDataHelper> {
    /** 缓存的数据实例 */
    private dataMap: Map<string, GlobalRankCustomData> = new Map();

    override onStart(): void {
        // 从服务端初始化数据
        // this.createDataScript(EmRankTypeMap.get(EmRankType.Gold), 10)
    }

    protected onPlayerLeft(player: mw.Player): void {
        if (Player.getAllPlayers().length > 1) return;
        this.dataMap.forEach((value, key) => {
            value.forceUpdate();
        });
    }
    /**
     * 从服务端设置数据
     * @param key 
     * @returns 
     */
    public setScoreOnServer(key: string, score: number, playerId: number) {
        if (Number.isNaN(score)) return;
        this.net_tryInitData(key);
        const player = Player.getPlayer(playerId);
        console.log(player, "player")
        let script = PlayerUtil.getPlayerScript(playerId);
        let playerName = script ? script.playerName : player.character?.displayName;
        this.net_reqSetData(key, { id: player.userId, name: playerName, score: score }, playerId);
    }

    /**
     * 如果服务端没有初始化数据,就从客户端初始化一个数据
     * @param key 
     * @returns 
     */
    public async net_tryInitData(key: string) {
        if (this.dataMap.has(key)) return;
        this.createDataScript(key, 10);
    }

    /** 请求设置数据 */
    public async net_reqSetData(key: string, info: RankInfoBase, playerId?: number) {
        if (!playerId) playerId = this.currentPlayerId;
        const dataHelper = this.getPlayerData(playerId);
        // 设置当前玩家数据
        dataHelper.setData(key, info);
        // 设置排行榜数据
        if (this.dataMap.has(key)) {
            this.dataMap.get(key).setData(info, key);
        }
        for (let subkey in EmRankCustomKey) {
            console.log(">>>net_reqSetData" + key + subkey);
            if (this.dataMap.has(key + subkey)) {
                this.dataMap.get(key + subkey).setData(info, key);
            }
        }
    }
    /** 生成数据脚本 */
    private async createDataScript(key: string, count: number) {
        const script = await Script.spawnScript(GlobalRankCustomData);
        script.init(key, count);
        this.dataMap.set(key, script);
    }
}
