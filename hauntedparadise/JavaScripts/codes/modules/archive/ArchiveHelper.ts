/*
 * @Author       : dal
 * @Date         : 2023-11-09 11:24:50
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2023-12-28 18:35:43
 * @FilePath: \hauntedparadise\JavaScripts\codes\modules\archive\ArchiveHelper.ts
 * @Description  : 学校的存档
 */

import { GlobalDefine } from "../../../DefNoSubModule";
import { GameConfig } from "../../../config/GameConfig";
import { Const } from "../../Defines";
import { MapEx } from "../../utils/MapEx";
import { BagItemData } from "../bag/BagDefine";
import { DegreeType } from "../blackboard/BoardDefine";
import { INIT_HP_NUM, INIT_LIFE_NUM } from "../player/PlayerData";
import { ProcedureModuleS } from "../procedure/ProcedureModuleS";
import ArchiveModuleS from "./ArchiveModuleS";

/** 功能性前缀 */
const FunPrefix = "Archive_";

/** 存档总前缀 */
const TotalPrefix = GlobalDefine.TitlePrefix + FunPrefix;

/** 没人的最多存档数 */
export const MaxArchiveNum: number = 3;

/**
 * 存档数据属性值property类型
 */
export const ArchiveDataType = {
    // 版本
    VERSION: "version",
    // 难度
    DEGREE: "degree",
    // 复活点
    BIRTHPOS: "birthPos",
    //复活点朝向
    BIRTHROT: "birthRot",
    // 是否初始化过背包初始物品
    BAGITEMINIT: "bagItemInit",
    // 背包道具
    BAGITEMS: "bagItems",
    //
    INITSCENEPROPS: "initSceneProps",
    // 线索(生成的时候给一个id)
    CLUES: "clues",
    //是否初始化过线索
    CLUESINIT: "isInitClues",
    // 交互物
    INTER: "interObjs",
    // 密码
    PASSWORD: "password",
    // 复活次数
    LIFE: "lifeNum",
    // 生命值
    HP: "hp",
    // 生存天数
    ALIVEDAY: "aliveDay",
    // 游戏进行时长
    TIME: "gameTime",
    // 已解锁的笔记
    UNLOCKEDNOTES: "unlockedNotes",
}

export class ClueSaveData {
    public assid: number;
    public loc: number[];
    public rot: number[];
}

/**
 * 存档数据实体类
 */
export class ArchiveData {

    /** 经过第一次存档才初始化，用来判断有没有这个存档 */
    isInit: boolean = false;

    // 难度
    degree: number = DegreeType.Simple;

    //版本
    version: number = 0;

    // 复活点
    birthPos: Vector = GameConfig.Global.StartPos.vector;

    //复活点的旋转
    birthRot: number[] = [];

    //是否初始化过背包初始物品
    bagItemInit: boolean = false;

    // 背包道具
    bagItems: BagItemData[] = [];

    //是否初始化了场景物品
    initSceneProps: boolean = false;

    // 线索(生成的时候给一个id)
    clues: MapEx.MapExClass<ClueSaveData> = {}

    // 是否初始化过线索
    isInitClues: boolean = false;

    // 交互物
    interObjs: MapEx.MapExClass<number> = {};

    // 密码
    password: MapEx.MapExClass<string> = {};

    // 复活次数
    lifeNum: number = INIT_LIFE_NUM;

    // 生命值
    hp: number = INIT_HP_NUM;

    // 启用了时间系统会用到的生存天数
    aliveDay: number = 0;

    // 游戏进行时长
    gameTime: number = 0;

    // 创建日期的时间戳
    createTime: number;

    // 已解锁的笔记
    unlockedNotes: number[] = [];
}

/** 十分钟 */
const DELETE_CACHE_TIME = 6e5;

/**
 * 存档条工具类，辅助完成存档的增删改查操作，仅供服务端调用
 * 存档key规则：前缀Prefix + "Archive_" + userId + "_" + 存档序号，如：ScarySchool_Archive_46813651_1
 * 存档内容value：难度、画面风格、道具、交互物、生命值、游戏进行时长等
 */
export class ArchiveHelper {

    private constructor() { }


    /** 每隔10分钟清理一次或主动清理的存档缓存 */
    private static _cacheArchiveDataMap: Map<string, ArchiveData> = new Map();

    public static async reqQueryDataExist(userId: string, id: number): Promise<boolean> {
        let archiveData = await this.reqGetData(userId, id);
        return archiveData.isInit;
    }

    /**
     * 供外部直接获取存档的方法
     * @param userID 玩家唯一id
     * @param archiveId 存档序号 - 从0开始，默认是0
     * @returns 存档数据，如果是null代表还没有该存档
     */
    public static async reqGetData(userID: string, archiveId: number): Promise<ArchiveData> {
        if (archiveId === -1) { return; }
        let dataKey = TotalPrefix + userID + "_" + archiveId;
        let archiveData: ArchiveData;
        // 有缓存就拿
        if (this._cacheArchiveDataMap.has(dataKey)) {
            archiveData = this._cacheArchiveDataMap.get(dataKey);
        }
        // 没有就创建
        else {
            archiveData = await this.getDataByDataStorage(dataKey);
            // 创建的时候设置一个延迟销毁的定时器
            setTimeout(() => { if (this._cacheArchiveDataMap.has(dataKey)) { this._cacheArchiveDataMap.delete(dataKey) } }, DELETE_CACHE_TIME);
        }
        return archiveData;
    }

    /** 获取所有存档数据 */
    public static async reqGetAllData(userID: string): Promise<ArchiveData[]> {
        let archiveDataList: ArchiveData[] = [];
        for (let index = 0; index < MaxArchiveNum; index++) { archiveDataList.push(await this.reqGetData(userID, index)); }
        return archiveDataList;
    }

    /**
     * 根据存档序号id获取存档数据
     * @param userID 玩家唯一id
     * @param id 存档序号 - 从0开始，默认是0
     * @returns 存档数据，如果是null代表还没有该存档
     */
    private static async getDataByDataStorage(dataKey: string): Promise<ArchiveData> {
        let dataRes: DataStorageResult;
        // dataRes = SystemUtil.isMobile() && MainPackageGameID !== "" ? await DataStorage.asyncGetOtherGameData(MainPackageGameID, dataKey) : await DataStorage.asyncGetData(dataKey);
        dataRes = await DataStorage.asyncGetData(dataKey);
        if (dataRes.code === DataStorageResultCode.Success) {
            let archiveData: ArchiveData = dataRes.data;
            // 没有这个数据或者这个数据并没有初始化，新创建一个数据
            if (!dataRes.data) { archiveData = new ArchiveData(); }
            // 有可能还没存这个key，返回的结果就是一个undefined
            this._cacheArchiveDataMap.set(dataKey, archiveData);
            return archiveData;
        } else {
            console.error("DEBUG ERROR>>>获取数据失败，错误码：" + dataRes.code);
            // 可能会请求超限
            return null;
        }
    }

    /** 临时存档数据缓存，在存入成功时会被删除，因为set和remove对同一个key的操作会导致其被锁定6秒，所以需要缓存后面push进来的操作，然后在锁定解除时继续setData */
    private static _tempArchiveDataMap: Map<string, ArchiveData> = new Map();

    /** 设置数据的限制列表 */
    private static restrictionList: string[] = [];

    /** 等待时间(毫秒) */
    private static readonly waitTime: number = 20;

    /**
     * 根据属性和value值存储游戏进度（对同一个key每6秒钟只能操作一次，否则会被锁定）保存除游戏进行时间以外字段时，会自动保存一次当前的游戏进行时间
     * @param userID 玩家唯一id
     * @param id 存档序号 - 从0开始，默认是0
     * @param properties string数组代表ArchiveData类的字段
     * @param values any数组ArchiveData对应字段的value值
     * @param isForce 是否强制存档，就不会考虑是否还在冷却中
     * @returns true or false
     */
    public static async reqSetData(userID: string, properties: string[], values: any[], isForce: boolean = false, curArchiveId: number = -1): Promise<boolean> {
        const procedureScript = ProcedureModuleS.getScriptByUserID(userID);
        let archiveId = procedureScript.archiveID;
        if (archiveId === -1 && curArchiveId === -1) { return false; }
        if (archiveId === -1 && curArchiveId != -1) { archiveId = curArchiveId; }
        let dataKey = TotalPrefix + userID + "_" + archiveId;

        let archiveData: ArchiveData;
        // 有缓存还没保存的情况
        if (this._tempArchiveDataMap.has(dataKey)) {
            archiveData = this._tempArchiveDataMap.get(dataKey);
        } else {
            archiveData = await this.reqGetData(userID, archiveId);
            if (!archiveData) { archiveData = new ArchiveData(); }
        }
        // 初始化
        if (!archiveData.isInit) { archiveData.isInit = true; archiveData.createTime = Date.now(); }

        // 如果没有时间，则主动保存一次时间
        if (!properties.includes(ArchiveDataType.TIME)) {
            const useTime = procedureScript.saveUseTime();
            if (useTime) {
                archiveData[ArchiveDataType.TIME] += useTime;
            }
        }

        // 时间的保存是累加的
        properties.forEach((property, id) => {
            if (property === ArchiveDataType.TIME) {
                archiveData[property] += values[id];
            } else if (property === ArchiveDataType.BAGITEMS) {
                // 特殊道具不需要在这里持久化
                archiveData[property] = values[id].filter(v => { return GameConfig.Item.getElement(v.cfgId).type != Const.SpecialItemType });
            } else {
                archiveData[property] = values[id];
            }
        });

        this._cacheArchiveDataMap.set(dataKey, archiveData);
        // 六秒钟存一次
        if (this.restrictionList.includes(dataKey) && !isForce) {
            // console.error(`DEBUG ERROR>>> 存储超频，先缓存，下次存数据的时候再存`);
            this._tempArchiveDataMap.set(dataKey, archiveData);
        } else {
            setTimeout(async () => {
                let resCode: DataStorageResultCode;
                // resCode = SystemUtil.isMobile() && MainPackageGameID !== "" ? await DataStorage.asyncSetOtherGameData(MainPackageGameID, dataKey, archiveData) : await DataStorage.asyncSetData(dataKey, archiveData);
                if (this.lockList.includes(dataKey)) {
                    console.error("DEBUG>>> 这个key正在被锁定中，存档失败");
                    return false;
                }
                resCode = await DataStorage.asyncSetData(dataKey, archiveData);
                switch (resCode) {
                    case DataStorageResultCode.Success:
                        console.log(`DEBUG>>> 存档成功，当前游戏进行时间：${JSON.stringify(archiveData[ArchiveDataType.TIME])}存档内容key: ${JSON.stringify(properties)}, value: ${JSON.stringify(values)}`);
                        // 保存成功，删除缓存
                        this._tempArchiveDataMap.delete(dataKey);
                        this.restrictionList.push(dataKey);
                        setTimeout(() => {
                            this.restrictionList.includes(dataKey) && this.restrictionList.splice(this.restrictionList.indexOf(dataKey), 1);
                        }, 6e3);
                        return true;
                    case DataStorageResultCode.RequestTooFrequent:
                        // console.error(`DEBUG ERROR>>> 存储超频，先缓存，下次存数据的时候再存`);
                        this._tempArchiveDataMap.set(dataKey, archiveData);
                        return false;
                    default:
                        console.error(`DEBUG ERROR>>> 存储数据失败，错误码${resCode}，请联系管理员解决`);
                        return false;
                }
            }, this.waitTime);
        }
    }

    /** 锁列表，在锁列表中的key短时间无法继续存档 */
    private static lockList: string[] = [];

    /**
     * 请求删档
     * @param userId 玩家唯一id
     * @param archiveId 存档序号 - 从0开始，默认是0
     */
    public static async reqDeleteData(userId: string, archiveId: number): Promise<void> {
        if (archiveId === -1) { return; }
        // 将数据复写为null
        setTimeout(async () => {
            let dataKey = TotalPrefix + userId + "_" + archiveId;
            let resCode: DataStorageResultCode;
            resCode = await DataStorage.asyncSetData(dataKey, new ArchiveData());
            switch (resCode) {
                case DataStorageResultCode.Success:
                    if (this._tempArchiveDataMap.has(dataKey)) { this._tempArchiveDataMap.delete(dataKey) }
                    if (this._cacheArchiveDataMap.has(dataKey)) { this._cacheArchiveDataMap.delete(dataKey) }
                    ModuleService.getModule(ArchiveModuleS).net_initClickCount(userId, archiveId);
                    console.log(`DEBUG>>> 删档成功, 这个key将会被暂时锁定两秒`);
                    this.lockList.push(dataKey);
                    Event.dispatchToClient(Player.getPlayer(userId), "DeleteArchiveSuccess");
                    Event.dispatchToLocal("DeleteArchiveSuccess", userId, archiveId);
                    setTimeout(() => { this.lockList.splice(this.lockList.indexOf(dataKey), 1); }, 5e2);
                    break;
                case DataStorageResultCode.RequestTooFrequent:
                    console.error(`DEBUG ERROR>>> 删档失败，请求太快了`);
                    // 6秒后再删一次
                    setTimeout(() => {
                        this.reqDeleteData(userId, archiveId);
                    }, 6e3);
                    break;
                default:
                    console.error(`DEBUG ERROR>>> 删档失败，错误码${resCode}，请联系管理员解决`);
                    break;
            }
        }, ArchiveHelper.waitTime);
    }
}