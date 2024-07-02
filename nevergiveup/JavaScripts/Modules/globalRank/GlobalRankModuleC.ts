/*
 * @Author       : chen.liang chen.liang@appshahe.com
 * @Date         : 2023-05-11 13:24:45
 * @FilePath: \globalRank\JavaScripts\modules\globalRank\GlobalRankModuleC.ts
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2023-12-19 10:13:46
 * @Description  : 
 */


import { RankInfoBase } from "./GlobalRankCustomData";
import { GlobalRankDataHelper } from "./GlobalRankDataHelper";
import { GlobalRankModuleS } from "./GlobalRankModuleS";
import { EmRankType, EmRankTypeMap } from "./const/EmRankType";

// AddGMCommand("setRank", (player, params) => {
//     let arr = params.split("|");
//     ModuleManager.getInstance().getModule(GlobalRankModuleC).reqSetData(arr[0], { id: player.getUserId(), name: "aa", score: +arr[1], level: 1, isMale: true });
// }, null, "gm");
/**
 * GlobalRank模块Client端
 */
export class GlobalRankModuleC extends ModuleC<GlobalRankModuleS, GlobalRankDataHelper> {


    /** 本地缓存的数据 */
    dataMap: Map<string, RankInfoBase[]> = new Map();

    /** 事件同步 */
    private _actionMap: Map<string, Action2<string, RankInfoBase[]>> = new Map();

    /** 自身事件同步 */
    private _selfActionMap: Map<string, Action3<string, number, RankInfoBase>> = new Map();

    /** 本地缓存的数据 */
    private cacheData: Map<string, RankInfoBase> = new Map();

    /** 本地缓存的数据 */
    private cacheFlags: Map<string, boolean> = new Map();


    protected onStart(): void {
        this.data.onDataChange.add(() => {
            for (let key in this.data["_selfDataMap"]) {
                const info = this.data["_selfDataMap"][key];
                if (!info) return;
                let index = -1;
                if (this.dataMap.has(key)) {
                    index = this.dataMap.get(key).findIndex((item) => item.id === info.id);
                }
                this._selfActionMap.get(key).call(key, index, info);
            }
        })
    }
    /**
     * 仅设置积分
     * @param key 排行榜key 
     * @param score 积分
     * @returns 
     */
    reqSetScore(type: EmRankType, score: number) {
        if (Number.isNaN(score)) return;
        let key = EmRankTypeMap.get(type).key;
        this.reqSetData(key,
            {
                id: this.localPlayer.userId,
                name: this.localPlayer.character.displayName,
                score: score
            });
    }

    /**
     * 需要自定义数据的使用这个api
     * @param key 排行榜key
     * @param data 数据类型继承自GlobalRankDataInfoBase
     * @returns 
     */
    reqSetData<Info extends RankInfoBase>(key: string, data: Info) {
        this.cacheData.set(key, data);
        if (this.cacheFlags.has(key)) {
            return;
        }
        this.cacheFlags.set(key, true);
        //延迟100毫秒发送,避免频繁发送
        setTimeout(() => {
            this.cacheFlags.delete(key);
            const cacheData = this.cacheData.get(key);
            this.server.net_reqSetData(key, cacheData);
            if (!this._selfActionMap.has(key)) {
                this._selfActionMap.set(key, new Action3<string, number, Info>());
            }
            let index = -1;
            if (this.dataMap.has(key)) {
                index = this.dataMap.get(key).findIndex((item) => item.id === cacheData.id);
            }
            this._selfActionMap.get(key).call(key, index, cacheData);
        }, 100);
    }

    /**
     * 当数据被同步时触发
     * @param key 排行榜的key
     * @param action 回调函数
     */
    onDataChanged<Info extends RankInfoBase>(key: string, action: (key: string, info: Info[]) => void) {

        if (!this._actionMap.has(key)) {
            this._actionMap.set(key, new Action2<string, Info[]>());
            this.server.net_tryInitData(key);
        }
        if (this.dataMap.has(key)) {
            action(key, this.dataMap.get(key) as Info[]);
        }
        this._actionMap.get(key).add(action);
    }
    /**
     * 同步自己的数据
     * @param key 
     * @param action 
     */
    onSelfDataChanged<Info extends RankInfoBase>(key: string, action: (key: string, index, info: Info) => void) {
        if (!this._selfActionMap.has(key)) {
            this._selfActionMap.set(key, new Action3<string, number, Info>());
        }
        this._selfActionMap.get(key).add(action);
    }
    /** 收到数据
     * @ps 这是专用于数据同步的
     */
    actionCall<Info extends RankInfoBase>(key: string, data: Info[]) {
        this.dataMap.set(key, data);
        if (!this._actionMap.has(key)) {
            this._actionMap.set(key, new Action2<string, Info[]>());
        }
        this._actionMap.get(key).call(key, data);
    }
}