import Log4Ts from "../../depend/log4ts/Log4Ts";
import { StatisticModuleS } from "./StatisticModule";

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
export interface PetSimulatorStatisticPetObj {
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
    update = 3
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
    private petStatisticMap: { [key: number]: PetSimulatorStatisticPersistPetObj } = {};

    @Decorator.persistence()
    private petStatisticMapNew: number[][] = [];// PSStatisticPersistPetKey

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
        this.capacity = 30;
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

    get version(): number {
        return 8;
    }

    protected onDataInit(): void {
        let dataSave = false;
        while (this.currentVersion != this.version) {
            if (this.currentVersion == 1) {
                dataSave = true;
                // this.refreshID();
                // this.initBuff();
                // this.initpetFollowCount();
                this.currentVersion = 2;
            }
            if (this.currentVersion == 2) {
                dataSave = true;
                // this.changeDataName();
                this.currentVersion = 3;
            }
            if (this.currentVersion == 3 || this.currentVersion == 4) {
                dataSave = true;
                // this.checkBagCapacity();
                this.currentVersion = 5;
            }
            if(this.currentVersion == 5) {
                dataSave = true;
                if(SystemUtil.isServer()) this.cleanPetOverBag();
                this.currentVersion = 6;
            }
            if(this.currentVersion == 6) {
                dataSave = true;
                if(SystemUtil.isServer()) this.cleanOldPetStatistic();
                this.currentVersion = 7;
            }
            if(this.currentVersion == 7) {
                dataSave = true;
                if(SystemUtil.isServer()) this.reduceDataSize();
                this.currentVersion = 8;
            }
        }
        // this.petStatisticMap = {};
        mw.setTimeout(()=>{
            this.save(dataSave);
        },0.5e3)
    }

    public reduceDataSize() {
        if(this.petStatisticMap) {
            for (const key in this.petStatisticMap) {
                const preObj = this.petStatisticMap[key];
                this.petStatisticMapNew.push([preObj.petkey, CreSourceStr[preObj.creSource], preObj.create, preObj.update]);
            }
            this.petStatisticMap = {};
        }
    }


    public cleanPetOverBag() {// 补救措施
        if(this.CurBagCapacity <= this.BagCapacity) return; // 当前背包宠物数量 <= 总容量 不需要裁剪 
        // 裁剪 先排序 超出的销毁并记录
        const sortedPets = this.sortBag();
        sortedPets.filter(p => !this.curEquipPet.includes(p.k)).sort((a, b) => {
            const bAtk = b.p.a;
            const aAtk = a.p.a;
            if(bAtk === aAtk) {
                const bId = b.I;
                const aId = a.I;
                if(bId === aId) {
                    return b.obtainTime - a.obtainTime;
                }
                return bId - aId;
            };
            return bAtk - aAtk;
        });
        const delNum = this.CurBagCapacity - this.BagCapacity;
        const delPets = sortedPets.slice(sortedPets.length - delNum);
        Log4Ts.log(PetBagModuleData, " cleanPetOverBag delPets:" + JSON.stringify(delPets) +  " delPetsKeys:" + JSON.stringify(delPets.map(p => p.k))); 
        const userId = this["mUserId"];
        const delKeys = delPets.map((p) => p.k);
        mw.setTimeout(()=>{
            ModuleService.getModule(StatisticModuleS).updateDestroyPetsInfo(userId, delPets, "删除");
        },0.5e3)
        delKeys.forEach( (key) => {
            delete this.bagContainerNew[key];

        });
        const now = new Date().getTime();
        const recordInfo = {
            [userId]: delPets.map((p) => {
                const persistInfo = this.getPersistStatisticInfoByKey(p.k);
                const source = persistInfo[PSStatisticPetKey.creSource]
                return {
                    petKey: p.k,
                    source: CreSourceStr[source] ?? "",
                    attack: p.p.a,
                    delTime: now
                }
            })
        };
        const dataKey = "PS_CLEAN_PET_OVER_BAG_RECORD"
        DataStorage.asyncGetData(dataKey).then((dataStorageResult) => {
            const { data } = dataStorageResult
            if(data) {
                if(data?.userId) {
                    data[userId] = data[userId].concat(recordInfo[userId]);
                } else Object.assign(data, recordInfo);
                DataStorage.asyncSetData(dataKey, data);
            } else 
                DataStorage.asyncSetData(dataKey, recordInfo);
        });
    }

    /**宠物统计数据 */
    public getPersistStatisticInfoByKey(key: number): number[] {
        return this.petStatisticMapNew?.find((p) => p[PSStatisticPetKey.petKey] === key) ?? [];
    }

    /**清理宠物统计数据 去除已经销毁的 */
	public delPersistPetStatisticByKey(key: number) {
        this.petStatisticMapNew = this.petStatisticMapNew.filter((p) => p[PSStatisticPetKey.petKey] === key);
    }

	public cleanOldPetStatistic() {
        const petStatisticMap = this.petStatisticMap;
        for (const key in petStatisticMap) {
            const petInfo = petStatisticMap[key] as any;
            if(petInfo?.status === "destroyed") { 
                delete petStatisticMap[key];
            }
        }
    }


	/**更新宠物统计数据 - 新增宠物 */
	public updatePetStatistic(petInfo: petItemDataNew, isUpdate = true, creSource?: "孵化" | "合成" | "爱心化" | "彩虹化" | "初始化") {
		const key = petInfo?.k;
		if(!key) {
			Log4Ts.warn(PetBagModuleData, " 更新宠物统计数据 - key错误:", key);
			return;
		}
		const now = Math.floor(Date.now() / 1000);

		const petStatistic = [key, CreSourceStr[creSource] ?? CreSourceStr["孵化"], now ?? 0, now ?? 0];
        const prePetDataIdx = this.petStatisticMapNew.findIndex((p) => p[PSStatisticPetKey.petKey] === key);
        if(prePetDataIdx === -1) {
            this.petStatisticMapNew.push(petStatistic);
        } else { // 宠物已存在 更新信息。
            const prePetData = this.petStatisticMapNew[prePetDataIdx];
			petStatistic[PSStatisticPetKey.create] = prePetData[PSStatisticPetKey.create];
			if(!isUpdate) petStatistic[PSStatisticPetKey.update] = prePetData[PSStatisticPetKey.update]; // 不是update则不更新更新时间
            if(!creSource) petStatistic[PSStatisticPetKey.creSource] = prePetData[PSStatisticPetKey.creSource];
			this.petStatisticMapNew[prePetDataIdx] = petStatistic;
		} 
		Log4Ts.log(PetBagModuleData, " 更新宠物统计数据 petInfo:", JSON.stringify(petInfo) + " petStatistic:", JSON.stringify(petStatistic));
		return petStatistic;
	}


    /**背包排序 */
    public sortBag(): petItemDataNew[] {
        let arr: petItemDataNew[] = [];
        let index_1 = 0;
        let index_2 = 0;
        const bestPets = [127, 128, 627, 628, 1127, 1128, 137, 203, 703, 1203]
        for (let key in this.bagContainerNew) {
            arr.push(this.bagContainerNew[key]);
        }
        arr.sort((a, b) => {
            if (bestPets.includes(a.I)) {
                return -1;
            }
            if (bestPets.includes(b.I)) {
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
            if (bestPets.includes(a.I) && index_1 == 0) {
                index_1 = 1;
            }
            if (bestPets.includes(b.I) && index_2 == 0) {
                index_2 = 1;
            }
            return index_2 - index_1;
        });
        return arr;

    }
}