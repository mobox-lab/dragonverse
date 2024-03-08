/*
 * @Author       : aolin.dai aolin.dai@appshahe.com
 * @Date         : 2023-07-17 18:05:25
 * @LastEditors  : dal
 * @LastEditTime : 2023-11-20 13:49:36
 * @FilePath     : \hauntedparadise\JavaScripts\modules\globalRank\PlayerRankData.ts
 * @Description  : 玩家的本地排行榜数据
 */

import { MapEx } from "../../utils/MapEx";
import { DegreeType } from "../blackboard/BoardDefine";
import { rankDataTypeList } from "./GlobalRankModuleC";

export class PlayerPassDataItem {
    public passTimeMap: MapEx.MapExClass<number> = {};

    /**
     * 
     * @param degree 
     * @param passTime 
     * @returns 是否设置有效
     */
    public static setPassTime(item: PlayerPassDataItem, degree: DegreeType, passTime: number) {
        if (!this.isBreakingRecord(item, degree, passTime)) { return false; }
        MapEx.set(item.passTimeMap, degree, passTime);
        return true;
    }

    /** 是否打破记录 */
    public static isBreakingRecord(item: PlayerPassDataItem, degree: DegreeType, passTime: number) {
        return this.getRankScore(item, degree) === -1 || this.getRankScore(item, degree) > passTime;
    }

    /**
     * 获取某难度的通关时间
     * @param type 难度类型
     * @returns 通关时间 如果是-1 代表当前难度未通关
     */
    public static getRankScore(item: PlayerPassDataItem, type: DegreeType) {
        // 有新模式排行榜数据，直接添加
        if (!MapEx.has(item.passTimeMap, type)) {
            MapEx.set(item.passTimeMap, type, -1);
        }
        return MapEx.get(item.passTimeMap, type);
    }
}

export default class PlayerRankData extends Subdata {

    /** 各难度的最佳成绩 */
    @Decorator.persistence()
    rankDataMap: MapEx.MapExClass<number> = {};

    @Decorator.persistence("endRankDataMap")
    endRankDataMap: MapEx.MapExClass<PlayerPassDataItem> = {};

    protected override initDefaultData(): void {
        rankDataTypeList.forEach(type => { MapEx.set(this.rankDataMap, type, -1); })
        this.save(true);
    }

    protected onDataInit(): void {
        if (!this.endRankDataMap) {
            this.endRankDataMap = {};
        }
    }

    /**
     * 获取某难度的通关时间
     * @param type 难度类型
     * @returns 通关时间 如果是-1 代表当前难度未通关
     */
    public getRankScore(type: DegreeType) {
        // 有新模式排行榜数据，直接添加
        if (!MapEx.has(this.rankDataMap, type)) {
            MapEx.set(this.rankDataMap, type, -1);
            this.save(true);
        }
        return MapEx.get(this.rankDataMap, type);
    }

    public setRankData(type: DegreeType, passTime: number) {
        if (!this.isBreakingRecord(type, passTime)) { return; }
        MapEx.set(this.rankDataMap, type, passTime);
        this.save(true);
    }

    /** 是否打破记录 */
    public isBreakingRecord(degree: DegreeType, passTime: number) {
        return this.getRankScore(degree) === -1 || this.getRankScore(degree) > passTime;
    }

    public updateEndingData(passId: number, degree: number, time: number) {
        if (!MapEx.has(this.endRankDataMap, passId)) {
            MapEx.set(this.endRankDataMap, passId, new PlayerPassDataItem());
        }
        let item = MapEx.get(this.endRankDataMap, passId)
        if (PlayerPassDataItem.setPassTime(item, degree, time)) {
            this.save(true);
        }
    }

    public getEndData(passId: number) {
        return MapEx.get(this.endRankDataMap, passId);
    }

    /**
     * 查询是否通关了指定的额结局
     * @param passId 结局id
     */
    public isClearEnd(passId: number) {
        return MapEx.has(this.endRankDataMap, passId);
    }
}