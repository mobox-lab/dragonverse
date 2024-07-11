import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { oTraceError } from "../../util/LogManager";
import { stringToNumberArr, utils } from "../../util/uitls";
import PsStatisticModuleData from "../statistic/StatisticModule";
import { EnchantBuff } from "./EnchantBuff";

export enum BagItemKey {
    itemStart = 100
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
interface PetSimulatorStatisticPetObj {
    /**
     * 背包 Key.
     */
    petkey: number;
    /**
     * Config Id.
     */
    proId: number;
    name: string;
    attack: number;
    /**
     * 当前状态，销毁、存在.
     */
    status: "destroyed" | "exist";
    
    /**
     * 创建来源.
     * "删除" 为主动删除.
     * 其余为合成时被动删除.
     */
    creSource: "孵化" | "合成" | "爱心化" | "彩虹化" | "初始化";
    /**
     * 销毁来源.
     */
    desSource: "删除" | "合成" | "爱心化" | "彩虹化" | "";

    /**
     * 创建时间.
     */
    create: number;
    /**
     * 更新时间.
     * 任何触发以上属性更新的操作都应更新这个时间.
     */
    update: number;
    /**
     * 附魔信息.
     */
    enchanted: string;
}

//物品容器
//100-200 为宠物槽位
export class PetBagModuleData extends Subdata {
    /**true:装备 id,Key */
    public BagItemChangeAC: Action3<boolean, number, number> = new Action3();
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
    private petStatisticMap: { [key: number]: PetSimulatorStatisticPetObj } = {};

    /**训练宠物集合 */
    @Decorator.persistence()
    trainPet: petTrain[];

    /**背包容量 */
    @Decorator.persistence()
    private capacity: number;

    @Decorator.persistence()
    private curEquipPet: number[];

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

    /**当前背包容量 */
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
    public get PetStatisticArr(): PetSimulatorStatisticPetObj[] {
        let arr: PetSimulatorStatisticPetObj[] = [];
        const curPets = this.sortBag();
		curPets.forEach((petInfo) => {
			this.updatePetStatistic(petInfo, undefined, false);
		})
		for (let key in this.petStatisticMap) {
			const obj = this.petStatisticMap[key];
            if(obj) arr.push(obj);
        }
		Log4Ts.log(PetBagModuleData, " 宠物统计数据: ", JSON.stringify(arr));
        return arr;
    }

    get version(): number {
        return 5;
    }

    protected onDataInit(): void {
        while (this.currentVersion != this.version) {
            if (this.currentVersion == 1) {
                this.refreshID();
                this.initBuff();
                this.initpetFollowCount();
                this.currentVersion = 2;
            }
            if (this.currentVersion == 2) {
                this.changeDataName();
                this.currentVersion = 3;
            }
            if (this.currentVersion == 3 || this.currentVersion == 4) {
                this.checkBagCapacity();
                this.currentVersion = 5;
            }

        }
		if(this.petStatisticMap == null) this.petStatisticMap = {};
        this.save(false);
    }
    /**清理宠物统计数据 去除已经销毁的 */
	public cleanPetStatistic() {
        for (let key in this.petStatisticMap) {
            const obj = this.petStatisticMap[key];
            if(obj.status === "destroyed")
                delete this.petStatisticMap[key];
        }
        Log4Ts.log(PetBagModuleData, " 清理宠物统计数据", JSON.stringify(this.petStatisticMap));
        this.save(true);
    }
	/**更新宠物统计数据 - 新增宠物 */
	public updatePetStatistic(petInfo: petItemDataNew, status?: "destroyed" | "exist", isUpdate = true, source?: {
        /**
         * 创建来源.
         * "删除" 为主动删除.
         * 其余为合成时被动删除.
         */
        creSource?: "孵化" | "合成" | "爱心化" | "彩虹化" | "初始化";
        /**
         * 销毁来源.
         */
        desSource?: "删除" | "合成" | "爱心化" | "彩虹化" | "";
    }) {
		const key = petInfo?.k;
		if(!key) {
			Log4Ts.warn(PetBagModuleData, " 更新宠物统计数据 - key错误:", key);
			return;
		}
		const now = Math.floor(Date.now() / 1000);
		const buffs = Array.from(petInfo.p.b);
		const enchanted: string[] = buffs?.length ? buffs.map((b) => {
			const cfg = GameConfig.Enchants.getElement(b);
			const name = cfg.Name;
			return `${b}-${name}`
		}): [];  // id-name arr
		const { creSource = "孵化", desSource = "" } = source ?? {}; 
		const petStatistic: PetSimulatorStatisticPetObj = {
			petkey: key,
			proId: petInfo?.I ?? 0,
			name: petInfo?.p?.n ?? "",
			attack: petInfo?.p?.a ?? 0,
			status: status ?? "exist",
            creSource,
            desSource,
			create: now ?? 0,
			update: now ?? 0,
			enchanted: enchanted?.join(",") ?? "",
		}
		if(!this.petStatisticMap[key]) {
			this.petStatisticMap[key] = petStatistic;
		} else { // 宠物已存在 更新信息。
            const prePetData = this.petStatisticMap[key];
			petStatistic.create = prePetData.create;
			if(!status) petStatistic.status = prePetData.status;
			if(!isUpdate) petStatistic.update = prePetData.update; // 不是update则不更新更新时间
            if(!source?.desSource) petStatistic.desSource = prePetData.desSource;
            if(!source?.creSource) petStatistic.creSource = prePetData.creSource;
			this.petStatisticMap[key] = petStatistic;
		} 
		Log4Ts.log(PetBagModuleData, " 更新宠物统计数据 petInfo:", JSON.stringify(petInfo) + " petStatistic:", JSON.stringify(petStatistic));
		return petStatistic;
	}

    public getFilteredDelAbleKeys(keys: number[], sortByAttack: boolean = false): number[] | undefined {
        if (keys.length == this.CurBagCapacity) return undefined;

        let resultPetInfo: petItemDataNew[] = keys
            .map(k => this.bagItemsByKey(k) ?? undefined)
            .filter(item => item != undefined);
        if (sortByAttack) {
            resultPetInfo.sort((a, b) => b.p.a - a.p.a);
        }
        return resultPetInfo.map(item => item.k);
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
    public addBagItem(id: number, atk: number, name: string, addTime: number | undefined, logInfo: { logObj: Object, logName: string } | undefined, playerID: number, creSource?: "孵化" | "合成" | "爱心化" | "彩虹化" | "初始化"): boolean {

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
		if(logInfo?.logName) {
			Object.assign(logInfo.logObj, {
				petBuffs: this.bagContainerNew[index].p.b,
				petKey: index,
			});  
			utils.logP12Info(logInfo.logName, logInfo.logObj)
		}
		this.updatePetStatistic(this.bagContainerNew[index], "exist", true, { creSource });
		const statisticData = DataCenterS.getData(playerID, PsStatisticModuleData)
		statisticData.recordAddPet();
        this.save(true);
        this.BagItemChangeAC.call(true, id, index);
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
            if (
                this.calRound(curPet.obtainTime) === currRound &&
                curPet.p.a >= maxAttack
            ) {
                const prePet = petKey ? this.bagContainerNew[petKey] : null;
                // 相同 atk 则看附魔分数
                if (
                    curPet.p.a === maxAttack &&
                    prePet &&
                    this.getPetEnchantScore(curPet.p.b) <=
                    this.getPetEnchantScore(prePet.p.b)
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
    public removeBagItem(keys: number[], desSource: "删除" | "合成" | "爱心化" | "彩虹化") {
        keys.forEach( (key) => {
            const petItem = {...this.bagContainerNew[key]};
			this.updatePetStatistic(petItem, "destroyed", true, { desSource });
            delete this.bagContainerNew[key];
        });
        this.save(true);
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
    private initPet() {

    }

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
        item.enchantCnt++; 		// 已附魔次数++
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
        Log4Ts.log(PetBagModuleData, `PetBagModuleData randomEnchant - type:${type}, excludeIds:${excludeIds}, random:${random}, totalWeight:${totalWeight}`);
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
            if (enchantData.bestPets.includes(petItem.I))
                thirdBuffId = enchantData.bestEnchantId; // 46词条
            else
                thirdBuffId = this.randomEnchant("special"); // 或者 可附魔出的特殊词条
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