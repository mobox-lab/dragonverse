/*
 * @Author       : dal
 * @Date         : 2024-01-22 17:03:46
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-01 19:06:41
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\route\RouteData.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import { EGameTheme } from "../../Defines";
import GameStart from "../../GameStart";
import { MapEx } from "../../utils/MapEx";
import { BagItemData } from "../bag/BagDefine";
import RouteConst from "./RouteConst";

/** 成功通关的信息 */
export class PassInfo {
    /** 难度 */
    diff: number;
    /** 结局 */
    endingType: number;
    /** 次数 */
    passTimes: number;

    constructor(diff, endingType, passTimes) {
        this.diff = diff;
        this.endingType = endingType;
        this.passTimes = passTimes;
    }
}

export const RouteDataType = {
    PassInfoMap: "passInfoMap",
    TotalGameTime: "totalGameTime",
    GameTheme: "gameTheme",
    TotalExp: "totalExp",
    UnlockedGraphList: "unlockedGraphList",
    FearCoin: "fearCoin",
    SpecialItemDataList: "specialItemDataList",
}

/** 数据实体 */
export class RouteData {

    /** 怕数据升级，方便后面打补丁， 数据升级记得更新版本号 */
    version: number = 1;

    // ------------------------v1.0---------------------------

    /** 通关难度 - 结局 1 : 0次, key 是”难度_结局“，===========分游戏的key */
    passInfoMap: MapEx.MapExClass<PassInfo> = {};

    /** 总游戏时长，这个是分游戏存放的 ===========分游戏的key*/
    totalGameTime: number = 0;

    /** 这个是统一存放在 ===========大厅Hall的key*/
    unlockedGraphList: number[] = [];

    // ------------------------v2.0---------------------------

    /** 恐惧币 ===========大厅Hall的key*/
    fearCoin: number = 0;

    /** 特殊道具数据 ===========大厅Hall的key*/
    specialItemDataList: BagItemData[] = [];

    /** 存的哪个游戏主题===========分游戏的key */
    gameTheme: EGameTheme = EGameTheme.Empty;

    /** 经验 ===========分游戏的key（所以最后要计算总经验才行）*/
    totalExp: number = 0;
}

/** 类似与存档工具类 */
export class RouteDataHelper {
    private constructor() { }

    /** 当前的数据版本 - 数据升级记得更新版本号 */
    private static readonly CURRENT_VERSION: number = 2;

    private static getKey(userId: string, gameTheme: EGameTheme) {
        return `${userId}_RouteData_${gameTheme}`;
    }

    public static isSelfGame(gameTheme: EGameTheme) {
        return GameStart.GameTheme === gameTheme;
    }

    /** 每隔10分钟清理一次或主动清理的存档缓存 */
    private static cacheDataMap: Map<string, RouteData> = new Map();

    public static async reqGetData(userId: string, gameTheme: EGameTheme) {
        const key = this.getKey(userId, gameTheme);

        let routeData: RouteData;

        // 有缓存就拿
        if (this.cacheDataMap.has(key)) {
            routeData = this.cacheDataMap.get(key);
        }
        // 没有就创建
        else {
            routeData = await this.getRouteDataFromDB(userId, gameTheme);
            this.cacheDataMap.set(key, routeData);
            // 创建的时候设置一个延迟销毁的定时器
            setTimeout(() => { if (this.cacheDataMap.has(key)) { this.cacheDataMap.delete(key) } }, 6e5);
        }

        // 加个补丁
        this.checkUpdate(routeData, gameTheme);

        return routeData;
    }

    private static checkUpdate(routeData: RouteData, gameTheme: EGameTheme) {
        if (routeData.version && routeData.version >= this.CURRENT_VERSION) { return; }
        switch (routeData.version) {
            case 1:
                this.updateDataVersion1(routeData, gameTheme);
                break;
            default:
                routeData.version = 1;
                break;
        }
        this.checkUpdate(routeData, gameTheme);
    }

    /** 更新第一版的数据 */
    private static updateDataVersion1(routeData: RouteData, gameTheme: EGameTheme) {
        routeData.version = 2;
        routeData.gameTheme = gameTheme;
        routeData.specialItemDataList = [];
        routeData.fearCoin = 0;
        // 这个经验需要根据时长计算一下
        routeData.totalExp = Number((routeData.totalGameTime / 60).toFixed(3));
        // 通关经验也保存一下
        MapEx.forEach(routeData.passInfoMap, (k, v) => {
            routeData.totalExp += v.passTimes * GameConfig.SubGlobal.PassBaseExp.number;
        })
    }

    private static async getRouteDataFromDB(userId: string, gameTheme: EGameTheme) {
        let res: DataStorageResult;
        const key = this.getKey(userId, gameTheme);
        if (SystemUtil.isPIE) {
            res = await DataStorage.asyncGetData(key);
        } else {
            res = (gameTheme === EGameTheme.Hall && GameStart.GameTheme === gameTheme) ? await DataStorage.asyncGetData(key) : await DataStorage.asyncGetOtherGameData(RouteConst.getGameIdByGameTheme(gameTheme), key);
        }
        let routeData: RouteData;
        if (!res.data) { routeData = new RouteData(); }
        else { routeData = res.data; }
        return routeData;
    }


    public static async reqSetData(userId: string, gameTheme: EGameTheme, properties: string[], values: any[]): Promise<void> {

        let resCode: DataStorageResultCode;
        // // 存数据肯定都是存到大厅主包上去
        // let gameTheme = GameStart.GameTheme;
        const key = this.getKey(userId, gameTheme);

        console.log(`DEBUG >>> 准备保存一下数据key = ${key},  ${JSON.stringify(properties)}, ${JSON.stringify(values)}`);

        // 先拿数据
        const routeData = await this.reqGetData(userId, gameTheme);

        /** 游戏id - 存到大厅上去哈 */
        let gameId = RouteConst.getGameIdByGameTheme(EGameTheme.Hall);

        if (!SystemUtil.isPIE && StringUtil.isEmpty(gameId)) {
            console.error(`DEBUG ERROR >>> 游戏Id错误 gameId不能为空`);
            return;
        }

        /** 解析并存储数据 */
        this.parseData(routeData, properties, values);

        if (this.cacheDataMap.has(key)) {
            this.cacheDataMap.set(key, routeData);
        }

        if (SystemUtil.isPIE) {
            resCode = await DataStorage.asyncSetData(key, routeData);
        } else {
            resCode = (gameTheme === EGameTheme.Hall && GameStart.GameTheme === gameTheme) ? await DataStorage.asyncSetData(key, routeData) : await DataStorage.asyncSetOtherGameData(gameId, key, routeData);
        }

        if (resCode === DataStorageResultCode.Success) {
            console.log(`DEBUG >>> 保存数据成功 ${JSON.stringify(properties)}, ${JSON.stringify(routeData)}`);
        } else {
            console.error(`DEBUG >>> 保存数据失败，错误码：${JSON.stringify(resCode)},  ${JSON.stringify(properties)}, ${JSON.stringify(values)}`);
        }
    }

    /** 解析存储的数据 */
    private static parseData(routeData: RouteData, properties: string[], values: any[]) {
        properties.forEach((property: string, id) => {
            if (property === RouteDataType.PassInfoMap) {
                const newPassInfo: PassInfo = values[id];
                const key = newPassInfo.diff + "_" + newPassInfo.endingType;
                let passInfo = MapEx.get(routeData.passInfoMap, key);
                if (!passInfo) {
                    passInfo = newPassInfo;
                } else {
                    passInfo.passTimes += newPassInfo.passTimes;
                }
                MapEx.set(routeData.passInfoMap, key, passInfo);
            } else if (property === RouteDataType.UnlockedGraphList || property === RouteDataType.SpecialItemDataList) {
                routeData[property] = values[id];
            }
            else {
                routeData[property] += values[id];
            }
        });
    }
}