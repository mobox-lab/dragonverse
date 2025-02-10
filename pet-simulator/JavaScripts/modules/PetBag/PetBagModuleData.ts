import Log4Ts from "mw-log4ts";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import { oTraceError } from "../../util/LogManager";
import { utils } from "../../util/uitls";
import { StatisticModuleS } from "../statistic/StatisticModule";
import { EnchantBuff } from "./EnchantBuff";
import dayjs from "dayjs";
import { TimerModuleUtils } from "../TimeModule/time";

export enum BagItemKey {
    itemStart = 100,
}

/**宠物item废弃  */
export class petItemData {
    key: number;
    Id: number;
    petInfo: petInfo;

    constructor(key: number, id: number) {
        this.key = key;
        this.Id = id;
        this.petInfo = new petInfo();
    }
}

export class petItemDataNew {
    /**key */
    k: number;
    /**ID */
    I: number;
    /**petInfo */
    p: petInfoNew;
    /**首次获得宠物时间，合成的宠物用合成项最早获得的时间 */
    obtainTime: number;
    /**已附魔次数 */
    enchantCnt: number;

    constructor(key: number, id: number) {
        this.k = key;
        this.I = id;
        this.p = new petInfoNew();
        this.enchantCnt = 0;
    }
}

/**宠物训练 */
export class petTrain {
    petData: petItemDataNew;
    startTime: number;

    constructor(petInfo: petItemDataNew, startTime: number) {
        this.petData = petInfo;
        this.startTime = startTime;
    }
}

/**废弃 */
export class petInfo {
    /**战力 */
    aTk: number;
    /**buff */
    buff: number[];
    /**名字 */
    name: string;

    constructor() {
        this.name = "";
        this.buff = [];
    }
}

export class petInfoNew {
    /**战力 */
    a: number;
    /**buff */
    b: number[];
    /**名字 */
    n: string;

    constructor() {
        this.n = "";
        this.b = [];
    }
}

/**
 * 宠物模拟器 统计信息 宠物对象.
 */
export interface PetSimulatorStatisticPersistPetObj {
    /**
     * 背包 Key.
     */
    petkey: number;
    /**
     * 创建来源.
     * "删除" 为主动删除.
     * 其余为合成时被动删除.
     */
    creSource: "孵化" | "合成" | "爱心化" | "彩虹化" | "初始化";
    /**
     * 创建时间.
     */
    create: number;
    /**
     * 更新时间.
     * 任何触发以上属性更新的操作都应更新这个时间.
     */
    update: number;
}

/**
 * 宠物模拟器 统计信息 压缩信息 宠物对象.
 */
export enum PSStatisticPetKey {
    /**
     * 背包 Key.
     */
    petKey = 0,
    /**
     * 创建来源.
     * "删除" 为主动删除.
     * 其余为合成时被动删除.
     */
    creSource = 1,
    create = 2,
    update = 3,
}
/**
 * 宠物模拟器 统计信息 压缩信息 creSourceStr.
 */
export enum CreSourceStr {
    "孵化" = 0,
    "合成" = 1,
    "爱心化" = 2,
    "彩虹化" = 3,
    "初始化" = 4,
}
//物品容器
//100-200 为宠物槽位
export class PetBagModuleData extends Subdata {
    /**true:装备 id,Key */
    public BagItemChangeAC: Action2<boolean, number[]> = new Action2();
    public PetTrainChangeAC: Action = new Action();
    /**词条改变事件 key,词条id */
    public PetEnchantChangeAC: Action2<number, number[]> = new Action2();
    /**true:装备 false: 卸下 */
    public PetEquipChangeAC: Action2<boolean, number[]> = new Action2();

    /**新获得宠物的Key */
    @Decorator.persistence()
    public newPetKey: number = 1000;
    /**跟随数量变化事件 */
    public PetFollowCountChangeAC: Action = new Action();

    @Decorator.persistence()
    private bagContainer: { [key: number]: petItemData };

    @Decorator.persistence()
    private bagContainerNew: { [key: number]: petItemDataNew } = {};

    @Decorator.persistence()
    private petStatisticMap: { [key: number]: PetSimulatorStatisticPersistPetObj } = {};

    @Decorator.persistence()
    private petStatisticMapNew: number[][] = []; // PSStatisticPersistPetKey

    /**训练宠物集合 */
    @Decorator.persistence()
    trainPet: petTrain[];

    /**背包容量 */
    @Decorator.persistence()
    private capacity: number;

    @Decorator.persistence()
    private curEquipPet: number[];

    /** 今日已合成次数 每天刷新 */
    @Decorator.persistence()
    public fuseNumToday: number = 0;

    /** 今日已合成次数 每天刷新 */
    @Decorator.persistence()
    public lastFuseRefreshTimestamp: number | null = null;

    /**宠物跟随数量 */
    @Decorator.persistence()
    private petFollowCount: number;

    protected initDefaultData(): void {
        this.bagContainer = {};
        this.trainPet = [];
        this.curEquipPet = [];
        this.petFollowCount = 4;
        this.capacity = GlobalData.Bag.bagCapacity;
        this.initPet();
    }

    /**当前背包宠物数量 */
    public get CurBagCapacity(): number {
        return Object.keys(this.bagContainerNew).length;
    }

    /**总容量 */
    public get BagCapacity(): number {
        return this.capacity;
    }

    /**当前装备跟随数量 */
    public get CurPetFollowCount(): number {
        return this.curEquipPet.length;
    }

    /**可跟随数量 */
    public get MaxFollowCount(): number {
        return this.petFollowCount;
    }

    /**当前装备的宠物 */
    public get CurFollowPets(): number[] {
        return this.curEquipPet;
    }

    /**宠物统计数据 */
    public get PetStatisticArr(): number[][] {
        return this.petStatisticMapNew;
    }

    /**合成时获取 作为备份用 */
    public get BagItems(): { [key: number]: petItemDataNew } {
        return Object.assign({}, this.bagContainerNew);
    }

    get version(): number {
        return 8;
    }

    protected onDataInit(): void {
        let dataSave = false;
        while (this.currentVersion != this.version) {
            if (this.currentVersion == 1) {
                dataSave = true;
                this.refreshID();
                this.initBuff();
                this.initpetFollowCount();
                this.currentVersion = 2;
            }
            if (this.currentVersion == 2) {
                dataSave = true;
                this.changeDataName();
                this.currentVersion = 3;
            }
            if (this.currentVersion == 3 || this.currentVersion == 4) {
                dataSave = true;
                this.checkBagCapacity();
                this.currentVersion = 5;
            }
            if (this.currentVersion == 5) {
                dataSave = true;
                // if(SystemUtil.isServer()) this.cleanPetOverBag();
                this.currentVersion = 6;
            }
            if (this.currentVersion == 6) {
                dataSave = true;
                // if(SystemUtil.isServer()) this.cleanOldPetStatistic();
                this.currentVersion = 7;
            }
            if (this.currentVersion == 7) {
                dataSave = true;
                // if(SystemUtil.isServer()) this.reduceDataSize();
                this.currentVersion = 8;
            }
        }
        // this.petStatisticMap = {};
        mw.setTimeout(() => {
            this.save(dataSave);
        }, 0.5e3);
    }
    /** 合成时使用 备份恢复 */
    public recoverBagItems(preBagItems: { [key: number]: petItemDataNew }) {
        this.bagContainerNew = preBagItems;
        this.save(true);
    }
    // public reduceDataSize() {
    //     if(this.petStatisticMap) {
    //         for (const key in this.petStatisticMap) {
    //             const preObj = this.petStatisticMap[key];
    //             this.petStatisticMapNew.push([preObj.petkey, CreSourceStr[preObj.creSource], preObj.create, preObj.update]);
    //         }
    //         this.petStatisticMap = {};
    //     }
    // }
    // public cleanPetOverBag() {// 补救措施
    //     if(this.CurBagCapacity <= this.BagCapacity) return; // 当前背包宠物数量 <= 总容量 不需要裁剪
    //     // 裁剪 先排序 超出的销毁并记录
    //     const sortedPets = this.sortBag();
    //     sortedPets.filter(p => !this.curEquipPet.includes(p.k)).sort((a, b) => {
    //         const bAtk = b.p.a;
    //         const aAtk = a.p.a;
    //         if(bAtk === aAtk) {
    //             const bId = b.I;
    //             const aId = a.I;
    //             if(bId === aId) {
    //                 return b.obtainTime - a.obtainTime;
    //             }
    //             return bId - aId;
    //         };
    //         return bAtk - aAtk;
    //     });
    //     const delNum = this.CurBagCapacity - this.BagCapacity;
    //     const delPets = sortedPets.slice(sortedPets.length - delNum);
    //     Log4Ts.log(PetBagModuleData, " cleanPetOverBag delPets:" + JSON.stringify(delPets) +  " delPetsKeys:" + JSON.stringify(delPets.map(p => p.k)));
    //     const userId = this["mUserId"] as string;
    //     const delKeys = delPets.map((p) => p.k);
    //     mw.setTimeout(()=>{
    //         ModuleService.getModule(StatisticModuleS).updateDestroyPetsInfo(userId, delPets, "删除");
    //     },0.5e3)
    //     delKeys.forEach( (key) => {
    //         delete this.bagContainerNew[key];

    //     });
    //     const now = new Date().getTime();
    //     const recordInfo = {
    //         [userId]: delPets.map((p) => {
    //             const persistInfo = this.getPersistStatisticInfoByKey(p.k);
    //             const source = persistInfo[PSStatisticPetKey.creSource]
    //             return {
    //                 petKey: p.k,
    //                 source: CreSourceStr[source] ?? "",
    //                 attack: p.p.a,
    //                 delTime: now
    //             }
    //         })
    //     };
    //     const dataKey = "PS_CLEAN_PET_OVER_BAG_RECORD"
    //     DataStorage.asyncGetData(dataKey).then((dataStorageResult) => {
    //         const { data } = dataStorageResult
    //         if(data) {
    //             if(data?.userId) {
    //                 data[userId] = data[userId].concat(recordInfo[userId]);
    //             } else Object.assign(data, recordInfo);
    //             DataStorage.asyncSetData(dataKey, data);
    //         } else
    //             DataStorage.asyncSetData(dataKey, recordInfo);
    //     });
    // }
    public clearFuseTodayIfNewDay(log: { userId: string }) {
        const nowTime = dayjs.utc().valueOf();
        if (this.lastFuseRefreshTimestamp) {
            const preTime = this.lastFuseRefreshTimestamp;
            const isNewDay = TimerModuleUtils.judgeIsNewDay(preTime, nowTime);
            if (isNewDay) {
                console.log(
                    "#time clearFuseTodayIfNewDay fuseNumToday:" +
                        this.fuseNumToday +
                        " lastFuseRefreshTimestamp:" +
                        this.lastFuseRefreshTimestamp
                );
                const oldFuseNumToday = this.fuseNumToday;
                const oldFuseRefreshTime = this.lastFuseRefreshTimestamp;
                this.fuseNumToday = 0;
                this.lastFuseRefreshTimestamp = nowTime;
                utils.logP12Info("P_refreshDaily", {
                    isNewDay: true,
                    ...log,
                    oldFuseNum: oldFuseNumToday,
                    newFuseNum: this.fuseNumToday,
                    oldRefreshTime: oldFuseRefreshTime,
                    newRefreshTime: this.lastFuseRefreshTimestamp,
                });
                this.save(true);
            }
        } else {
            console.log(
                "#time clearFuseTodayIfNewDay first fuseNumToday:" +
                    this.fuseNumToday +
                    " lastFuseRefreshTimestamp:" +
                    this.lastFuseRefreshTimestamp
            );
            const oldFuseNumToday = this.fuseNumToday;
            const oldFuseRefreshTime = this.lastFuseRefreshTimestamp;
            this.fuseNumToday = 0;
            this.lastFuseRefreshTimestamp = nowTime;
            utils.logP12Info("P_refreshDaily", {
                isNewDay: false,
                ...log,
                oldFuseNum: oldFuseNumToday,
                newFuseNum: this.fuseNumToday,
                oldRefreshTime: oldFuseRefreshTime,
                newRefreshTime: this.lastFuseRefreshTimestamp,
            });
            this.save(true);
        }
    }
    public fusePetStatistic() {
        console.log("#time fusePetStatistic fuseNumToday:" + this.fuseNumToday);
        this.fuseNumToday++;
        console.log("#time fusePetStatistic after fuseNumToday:" + this.fuseNumToday);
        this.save(true);
    }
    /**宠物统计数据 */
    public getPersistStatisticInfoByKey(key: number): number[] {
        return this.petStatisticMapNew?.find((p) => p[PSStatisticPetKey.petKey] === key) ?? [];
    }

    /**清理宠物统计数据 去除已经销毁的 */
    public delPersistPetStatisticByKeys(delKeys: number[]) {
        this.petStatisticMapNew = this.petStatisticMapNew.filter((p) => !delKeys.includes(p[PSStatisticPetKey.petKey]));
    }
    // public cleanOldPetStatistic() {
    //     const petStatisticMap = this.petStatisticMap;
    //     for (const key in petStatisticMap) {
    //         const petInfo = petStatisticMap[key] as any;
    //         if(petInfo?.status === "destroyed") {
    //             delete petStatisticMap[key];
    //         }
    //     }
    // }

    /**更新宠物统计数据 - 新增宠物 */
    public updatePetStatistic(
        petInfo: petItemDataNew,
        isUpdate = true,
        creSource?: "孵化" | "合成" | "爱心化" | "彩虹化" | "初始化"
    ) {
        const key = petInfo?.k;
        if (!key) {
            Log4Ts.warn(PetBagModuleData, " 更新宠物统计数据 - key错误:", key);
            return;
        }
        const now = Math.floor(Date.now() / 1000);

        const petStatistic = [key, CreSourceStr[creSource] ?? CreSourceStr["孵化"], now ?? 0, now ?? 0];
        const prePetDataIdx = this.petStatisticMapNew.findIndex((p) => p[PSStatisticPetKey.petKey] === key);
        if (prePetDataIdx === -1) {
            this.petStatisticMapNew.push(petStatistic);
        } else {
            // 宠物已存在 更新信息。
            const prePetData = this.petStatisticMapNew[prePetDataIdx];
            petStatistic[PSStatisticPetKey.create] = prePetData[PSStatisticPetKey.create];
            if (!isUpdate) petStatistic[PSStatisticPetKey.update] = prePetData[PSStatisticPetKey.update]; // 不是update则不更新更新时间
            if (!creSource) petStatistic[PSStatisticPetKey.creSource] = prePetData[PSStatisticPetKey.creSource];
            this.petStatisticMapNew[prePetDataIdx] = petStatistic;
        }
        Log4Ts.log(
            PetBagModuleData,
            " 更新宠物统计数据 petInfo:",
            JSON.stringify(petInfo) + " petStatistic:",
            JSON.stringify(petStatistic)
        );
        return petStatistic;
    }

    public getFilteredDelAbleKeys(keys: number[], sortByAttack: boolean = false): number[] | undefined {
        if (keys.length == this.CurBagCapacity) return undefined;

        let resultPetInfo: petItemDataNew[] = keys
            .map((k) => this.bagItemsByKey(k) ?? undefined)
            .filter((item) => item != undefined);
        if (sortByAttack) {
            resultPetInfo.sort((a, b) => b.p.a - a.p.a);
        }
        return resultPetInfo.map((item) => item.k);
    }

    /**根据Key获取物品 */
    public bagItemsByKey(key: number): petItemDataNew {
        return this.bagContainerNew[key];
    }

    /**添加宠物背包元素
     * @param id 宠物表id
     * @param atk 宠物战力
     * @param name 宠物名字
     */
    public addBagItem(
        id: number,
        atk: number,
        name: string,
        addTime: number | undefined,
        logInfo: { logObj: Object; logName: string } | undefined,
        playerID: number,
        creSource?: "孵化" | "合成" | "爱心化" | "彩虹化" | "初始化"
    ): boolean {
        if (this.CurBagCapacity >= this.BagCapacity) {
            return false;
        }
        // let index = this.getFirstEmptyIndex();
        // if (index == -1) {
        //     oTraceError('lwj 背包已满');
        //     return false;
        // }
        this.newPetKey++;
        let index = this.newPetKey;
        this.bagContainerNew[index] = new petItemDataNew(index, id);
        if (atk) {
            this.bagContainerNew[index].p.a = atk;
        }
        if (name) {
            this.bagContainerNew[index].p.n = name;
        }
        if (addTime) {
            this.bagContainerNew[index].obtainTime = addTime;
        } else {
            this.bagContainerNew[index].obtainTime = Date.now();
        }
        let type = GameConfig.PetARR.getElement(id).QualityType;
        this.bornRandomEnchant(this.bagContainerNew[index], type);

        const logPetInfo = {
            I: id,
            k: index,
            petAtk: atk,
            petName: name,
            petBuffs: Array.from(this.bagContainerNew[index]?.p?.b ?? []),
        };
        if (["P_Merge", "P_Rainbow", "P_Heart"].includes(logInfo?.logName))
            Object.assign(logInfo.logObj, {
                outputPet: logPetInfo,
            });
        else if (logInfo?.logName) Object.assign(logInfo.logObj, logPetInfo);
        if (logInfo?.logName) utils.logP12Info(logInfo.logName, logInfo.logObj);

        this.updatePetStatistic(this.bagContainerNew[index], true, creSource);
        const userId = Player.getPlayer(playerID)?.userId ?? "";
        if (SystemUtil.isServer()) ModuleService.getModule(StatisticModuleS).recordAddPet(userId);
        this.save(true);
        this.BagItemChangeAC.call(true, [index]);
        return true;
    }

    public batchAddBagItem(
        playerID: number,
        creSource: "孵化" | "合成" | "爱心化" | "彩虹化" | "初始化",
        infos: { id: number; atk: number; name: string; addTime: number | undefined }[],
        logInfo?: { logObj: Object; logName: string }
    ): boolean {
        if (!infos?.length) return false;
        if (this.CurBagCapacity + infos.length > this.BagCapacity) {
            return false;
        }
        const keys = [];
        const userId = Player.getPlayer(playerID)?.userId ?? "";
        const pets: petItemDataNew[] = [];
        for (let i = 0; i < infos.length; i++) {
            this.newPetKey++;
            let index = this.newPetKey;
            const { id, atk, name, addTime } = infos[i];
            keys.push(index);
            this.bagContainerNew[index] = new petItemDataNew(index, id);
            if (atk) {
                this.bagContainerNew[index].p.a = atk;
            }
            if (name) {
                this.bagContainerNew[index].p.n = name;
            }
            if (addTime) {
                this.bagContainerNew[index].obtainTime = addTime;
            } else {
                this.bagContainerNew[index].obtainTime = Date.now();
            }
            let type = GameConfig.PetARR.getElement(id).QualityType;
            this.bornRandomEnchant(this.bagContainerNew[index], type);
            pets.push(this.bagContainerNew[index]);
            this.updatePetStatistic(this.bagContainerNew[index], true, creSource);
            ModuleService.getModule(StatisticModuleS).recordAddPet(userId);
        }
        if (logInfo?.logName) {
            const hatchPets = pets.map((p) => ({
                petKey: p?.k,
                petId: p?.I,
                petAtk: p?.p?.a,
                petName: p?.p?.n,
                petBuffs: Array.from(p?.p?.b),
            }));
            Object.assign(logInfo.logObj, {
                timestamp: Date.now(),
                userId,
                hatchPets,
            });
            utils.logP12Info(logInfo.logName, logInfo.logObj);
        }
        this.save(true);
        this.BagItemChangeAC.call(true, keys);
        return true;
    }

    public getPetEnchantScore(enchantIds: number[]): number {
        if (!enchantIds?.length) return 0;
        const score = enchantIds.reduce((total, id) => {
            return total + (GameConfig.Enchants.getElement(id)?.RankScore ?? 0);
        }, 0);
        return score;
    }

    /**
     * @description: 根据赛季获取拥有的最高战力的宠物
     * @param round 赛季
     * @return 宠物id
     */
    public getMaxAttackPet(currRound: number): number {
        let maxAttack = 0;
        let petKey = 0;
        for (let key in this.bagContainerNew) {
            //筛出这个赛季获取的
            const curPet = this.bagContainerNew[key];
            if (this.calRound(curPet.obtainTime) === currRound && curPet.p.a >= maxAttack) {
                const prePet = petKey ? this.bagContainerNew[petKey] : null;
                // 相同 atk 则看附魔分数
                if (
                    curPet.p.a === maxAttack &&
                    prePet &&
                    this.getPetEnchantScore(curPet.p.b) <= this.getPetEnchantScore(prePet.p.b)
                )
                    continue;
                maxAttack = curPet.p.a;
                petKey = curPet.k;
            }
        }
        return petKey;
    }

    public calRound(obtainTime: number): number {
        return 0;
    }

    public addBagItemByPetData(petData: petItemDataNew): boolean {
        // let index = this.getFirstEmptyIndex();
        // if (index == -1) {
        //     oTraceError('lwj 背包已满');
        //     return false;
        // }
        this.newPetKey++;
        let index = this.newPetKey;
        this.bagContainerNew[index] = petData;
        this.updatePetStatistic(this.bagContainerNew[index]);

        return true;
    }

    /**删除元素 */
    public removeBagItem(playerId: number, keys: number[], desSource: "删除" | "合成" | "爱心化" | "彩虹化") {
        if (SystemUtil.isServer()) {
            const userId = Player.getPlayer(playerId).userId;
            const delPets = [];
            keys.forEach((key) => {
                const petItem = { ...this.bagContainerNew[key] };
                // this.updatePetStatistic(petItem, "destroyed", true, { desSource });
                delPets.push(petItem);
                delete this.bagContainerNew[key];
            });
            ModuleService.getModule(StatisticModuleS).updateDestroyPetsInfo(userId, delPets, desSource);
            this.save(true);
        }
    }

    /**添加宠物 交易用 */
    public addBagItemByTrade(id: number, atk: number, name: string): boolean {
        // let index = this.getFirstEmptyIndex();
        // if (index == -1) {
        //     oTraceError('lwj 背包已满');
        //     return false;
        // }
        this.newPetKey++;
        let index = this.newPetKey;

        this.bagContainerNew[index] = new petItemDataNew(index, id);
        if (atk) {
            this.bagContainerNew[index].p.a = atk;
        }
        if (name) {
            this.bagContainerNew[index].p.n = name;
        }
        let type = GameConfig.PetARR.getElement(id).QualityType;
        this.bornRandomEnchant(this.bagContainerNew[index], type);
        this.updatePetStatistic(this.bagContainerNew[index]);
        return true;
    }

    /**返回第一个空的索引，否则返回-1 */
    private getFirstEmptyIndex(): number {
        return this.newPetKey;
    }

    /**背包排序 */
    public sortBag(): petItemDataNew[] {
        let arr: petItemDataNew[] = [];
        let index_1 = 0;
        let index_2 = 0;
        for (let key in this.bagContainerNew) {
            arr.push(this.bagContainerNew[key]);
        }
        arr.sort((a, b) => {
            if (GlobalData.Enchant.bestPets.includes(a.I)) {
                return -1;
            }
            if (GlobalData.Enchant.bestPets.includes(b.I)) {
                return 1;
            }
            let atk = b.p.a - a.p.a;
            return atk;
        });
        arr.sort((a, b) => {
            index_1 = this.curEquipPet.findIndex((value) => {
                return value == a.k;
            });
            index_2 = this.curEquipPet.findIndex((value) => {
                return value == b.k;
            });
            if (index_1 > 0) {
                index_1 = 0;
            }
            if (index_2 > 0) {
                index_2 = 0;
            }
            if (GlobalData.Enchant.bestPets.includes(a.I) && index_1 == 0) {
                index_1 = 1;
            }
            if (GlobalData.Enchant.bestPets.includes(b.I) && index_2 == 0) {
                index_2 = 1;
            }
            return index_2 - index_1;
        });
        return arr;
    }

    /**战力排序 */
    public sortBagByAtk(): petItemDataNew[] {
        let arr: petItemDataNew[] = [];
        for (let key in this.bagContainerNew) {
            arr.push(this.bagContainerNew[key]);
        }
        arr.sort((a, b) => {
            let atk = b.p.a - a.p.a;
            return atk;
        });
        return arr;
    }

    /**初始化宠物 */
    private initPet() {}

    /**添加背包容量 */
    public addCapacity(count: number) {
        if (this.capacity + count > GlobalData.Bag.bagMaxCapacity) {
            this.capacity = GlobalData.Bag.bagMaxCapacity;
            return;
        }
        this.capacity += count;
        this.save(true);
    }

    /**添加宠物跟随数量 */
    public addPetFollowCount(num: number) {
        this.petFollowCount += num;
        this.save(true);
        this.PetFollowCountChangeAC.call();
        return true;
    }

    /**添加宠物训练 */
    public addTrainPet(key: number) {
        this.trainPet.push(new petTrain(this.bagContainerNew[key], utils.GetCurSec()));
    }

    /**装备宠物 */
    public equipPet(keys: number[]): boolean {
        console.warn(`lwj  数据装备  ${keys}`);
        let arr: number[] = [];

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (this.curEquipPet.length >= this.petFollowCount) {
                oTraceError("lwj 装备宠物数量已满");
                return false;
            }
            let petData = this.bagContainerNew[key];
            if (!petData) {
                oTraceError("lwj 背包中没有该宠物");
                return false;
            }
            if (this.curEquipPet.indexOf(key) != -1) {
                oTraceError("lwj 该宠物已装备");
                return false;
            }
            arr.push(key);
            this.curEquipPet.push(key);
        }

        this.save(true);
        console.warn(`lwj 保存 数据`);
        this.PetEquipChangeAC.call(true, arr);
        return true;
    }

    /**取消装备 */
    public unEquipPet(keys: number[]): boolean {
        if (keys.length == 0) return false;
        let arr: number[] = [];
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            let petData = this.bagContainerNew[key];
            if (!petData) {
                oTraceError("lwj 背包中没有该宠物");
                return false;
            }
            let index = this.curEquipPet.indexOf(key);
            if (index == -1) {
                oTraceError("lwj 该宠物没有装备");
                return false;
            }
            arr.push(key);
            this.curEquipPet.splice(index, 1);
        }

        this.save(true);
        this.PetEquipChangeAC.call(false, arr);
        return true;
    }

    public petRename(key: number, name: string) {
        let petData = this.bagContainerNew[key];
        if (!petData) {
            oTraceError("lwj 背包中没有该宠物");
            return false;
        }
        petData.p.n = name;

        this.updatePetStatistic(this.bagContainerNew[key]);
        this.save(true);
        return true;
    }

    /**附魔 仅S端
     * @param key 宠物key
     * @param ids 附魔id数组
     */
    public addEnchant(key: number, ids: number[], playerId: number) {
        this.addPetEnchant(key, ids);
        let keys = this.CurFollowPets;
        EnchantBuff.equipUnPet(playerId, keys, true);
        this.save(true);
        this.PetEnchantChangeAC.call(key, ids);
    }

    /**单个宠物附魔 */
    private addPetEnchant(key: number, ids: number[]) {
        let item = this.bagItemsByKey(key);
        item.p.b.length = 0;
        item.p.b = ids;
        item.enchantCnt++; // 已附魔次数++
        this.updatePetStatistic(item);
        this.save(true);
    }

    // 按照配置的 Weight 随机返回一个附魔词条id，
    private randomEnchant(type: "default" | "normal" | "special" | "myth" = "default", excludeIds?: number[]): number {
        const enchantCfg = GameConfig.Enchants.getAllElement();
        const filterEnchantCfg = enchantCfg.filter((enchantCfg) => {
            const id = enchantCfg.id;
            if (GlobalData.Enchant.filterIds.includes(id)) return false;
            if (excludeIds?.length && excludeIds.includes(id)) return false;
            switch (type) {
                case "normal": {
                    const [min, max] = GlobalData.Enchant.normalEnchantIdRange;
                    return id >= min && id <= max;
                }
                case "special": {
                    const [min, max] = GlobalData.Enchant.specialEnchantIdRange;
                    return id >= min && id <= max;
                }
                case "myth": {
                    const [min, max] = GlobalData.Enchant.mythEnchantIdRange;
                    return id >= min && id <= max;
                }
                default: {
                    return enchantCfg?.QualityType == 0; // normal & special
                }
            }
        });

        const idArr: number[] = [];
        const weightArr: number[] = [];
        for (const cfg of filterEnchantCfg) {
            weightArr.push(cfg.Weight);
            idArr.push(cfg.id);
        }

        let totalWeight = 0;
        for (let i = 0; i < weightArr.length; i++) {
            totalWeight += weightArr[i];
        }

        const random = Math.random() * totalWeight;
        Log4Ts.log(
            PetBagModuleData,
            `PetBagModuleData randomEnchant - type:${type}, excludeIds:${excludeIds}, random:${random}, totalWeight:${totalWeight}`
        );
        let probability = 0;
        for (let i = 0; i < idArr.length; i++) {
            probability += weightArr[i];
            if (random <= probability) {
                return idArr[i];
            }
        }

        return idArr[idArr.length - 1];
    }

    /** addPed 时的随机附魔 */
    public bornRandomEnchant(petItem: petItemDataNew, type: GlobalEnum.PetQuality) {
        const quality = GlobalEnum.PetQuality;
        if (type != quality.Myth && type != quality.Legend) return; // 非神话/传说品质宠物没有附魔
        const enchantData = GlobalData.Enchant;

        let buff: number[] = [];
        const firstBuffId = this.randomEnchant("normal");
        buff.push(firstBuffId);
        const secondBuffId = this.randomEnchant("normal", [firstBuffId]);
        buff.push(secondBuffId);

        if (type == quality.Myth) {
            let thirdBuffId = 0; // 该词条为神话特有的第三条词条 不可重铸
            if (enchantData.bestPets.includes(petItem.I)) thirdBuffId = enchantData.bestEnchantId; // 46词条
            else thirdBuffId = this.randomEnchant("special"); // 或者 可附魔出的特殊词条
            buff.push(thirdBuffId);
        }
        petItem.p.b = buff;
    }

    /**刷新id */
    private refreshID() {
        for (let key in this.bagContainer) {
            let curID = this.bagContainer[key].Id;
            let newID = utils.refreshPetId(curID);
            this.bagContainer[key].Id = newID;
        }
    }

    /**初始化buff */
    private initBuff() {
        for (let key in this.bagContainer) {
            this.bagContainer[key].petInfo.buff = [];
            //this.randomEnchant(this.bagContainer[key], GameConfig.PetARR.getElement(this.bagContainer[key].I).QualityType);
        }
    }

    /**初始化跟随数量 */
    private initpetFollowCount(): void {
        if (this.petFollowCount > 4) {
            this.petFollowCount = 4;
            this.curEquipPet.length = 4;
        }
    }

    private changeDataName() {
        for (let i = BagItemKey.itemStart; i < BagItemKey.itemStart + this.capacity; i++) {
            if (!this.bagContainer[i]) {
                continue;
            }
            let item = this.bagContainer[i];
            this.bagContainerNew[i] = new petItemDataNew(item.key, item.Id);
            if (item.petInfo.aTk) {
                this.bagContainerNew[item.key].p.a = item.petInfo.aTk;
            } else {
                this.bagContainerNew[item.key].p.a = 111;
            }
            if (item.petInfo.name) {
                this.bagContainerNew[item.key].p.n = item.petInfo.name;
            } else {
                this.bagContainerNew[item.key].p.n = "pet";
            }
            if (item.petInfo.buff) {
                this.bagContainerNew[item.key].p.b = item.petInfo.buff;
            } else {
                this.bagContainerNew[item.key].p.b = [];
            }
        }
        this.bagContainer = {};
    }

    /**检测背包容量 */
    public checkBagCapacity(): void {
        oTraceError("lwj 检测背包容量");
        let max = GlobalData.Bag.bagMaxCapacity;
        if (this.capacity > max) {
            this.capacity = max;
        }
    }

    /**
     * 计算体力系数.
     * @return {number}
     */
    public getEnergyRecoveryCoefficient(): number {
        const qsq: number[] = [];
        for (const key of Object.keys(this.bagContainerNew)) {
            const pet = this.bagContainerNew[key] as petItemDataNew;
            const q = GameConfig.PetARR.getElement(pet.I).QualityType + GameConfig.PetARR.getElement(pet.I).DevType;
            if (qsq.length < GlobalData.Energy.ENERGY_RECOVERY_SAMPLE_COUNT) qsq.push(q);
            else if (qsq[qsq.length - 1] >= q) continue;
            else {
                for (let i = 0; i < qsq.length; ++i) {
                    if (qsq[i] < q) {
                        qsq.splice(i, 0, q);
                        break;
                    }
                }
                if (qsq.length > GlobalData.Energy.ENERGY_RECOVERY_SAMPLE_COUNT)
                    qsq.length = GlobalData.Energy.ENERGY_RECOVERY_SAMPLE_COUNT;
            }
        }
        let result = 0;
        for (const val of qsq) {
            result += Math.floor(val * GlobalData.Energy.ENERGY_RATIO);
        }
        return Math.min(result, GlobalData.Energy.ENERGY_RECOVERY_MAX_COUNT);
    }
}
