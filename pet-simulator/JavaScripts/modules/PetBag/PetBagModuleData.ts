import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import { oTraceError } from "../../utils/LogManager";
import { stringToNumberArr, utils } from "../../utils/uitls";
import PetQuality = GlobalEnum.PetQuality;
import PetDevType = GlobalEnum.PetDevType;
import Energy = GlobalData.Energy;

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
    ObtainTime: number;

    constructor(key: number, id: number) {
        this.k = key;
        this.I = id;
        this.p = new petInfoNew();
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

//物品容器
//100-200 为宠物槽位
export class PetBagModuleData extends Subdata {
    /**true:装备 id,Key */
    public BagItemChangeAC: Action3<boolean, number, number> = new Action3();
    public PetTrainChangeAC: Action = new Action();
    /**词条改变事件 key,词条id */
    public PetEnchantChangeAC: Action2<number[], string[]> = new Action2();
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
        this.save(false);
    }


    /**根据Key获取物品 */
    public bagItemsByKey(key: number): petItemDataNew {
        return this.bagContainerNew[key];
    }

    setItem(key: number, item: petItemDataNew) {
        this.bagContainerNew[key] = item;
    }


    /**添加宠物背包元素
     * @param id 宠物表id
     * @param atk 宠物战力
     * @param name 宠物名字
     */
    public addBagItem(id: number, atk: number, name: string, addTime?: number): boolean {

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
            this.bagContainerNew[index].ObtainTime = addTime;
        } else {
            this.bagContainerNew[index].ObtainTime = Date.now();
        }
        let type = GameConfig.PetARR.getElement(id).QualityType;
        this.randomEnchant(this.bagContainerNew[index], type);

        this.save(true);
        this.BagItemChangeAC.call(true, id, index);
        return true;
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
        return true;
    }

    /**删除元素 */
    public removeBagItem(keys: number[]) {
        keys.forEach((key) => {
            delete this.bagContainerNew[key];
        });
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
        this.randomEnchant(this.bagContainerNew[index], type);

        return true;
    }

    /**根据表id 获取item数量 */
    private getBagItemNumById(id: number): number {
        let num = 0;
        for (let key in this.bagContainerNew) {
            if (this.bagContainerNew[key].I == id) {
                num++;
            }
        }
        return num;
    }

    /**根据id 获取item所在的key */
    private getBagItemKeyById(id: number): number {
        for (let key in this.bagContainerNew) {
            if (this.bagContainerNew[key].I == id) {
                return Number(key);
            }
        }
        return -1;
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
        this.save(true);
        return true;
    }

    /**附魔
     * @param key 宠物key
     * @param id 附魔id
     */
    public addEnchant(keys: number[], ids: string[]) {
        for (let i = 0; i < keys.length; i++) {
            this.addSingleEnchant(keys[i], stringToNumberArr(ids[i]));
        }

        this.save(true);
        this.PetEnchantChangeAC.call(keys, ids);
    }

    /**单个附魔 */
    private addSingleEnchant(key: number, ids: number[]) {
        let item = this.bagItemsByKey(key);
        item.p.b.length = 0;
        item.p.b = ids;
    }

    /**随机附魔 */
    public randomEnchant(petItem: petItemDataNew, type: GlobalEnum.PetQuality) {
        const quality = GlobalEnum.PetQuality;
        if (type != quality.Myth && type != quality.Legend) return;
        const enchantData = GlobalData.Enchant;

        let buff: number[] = [];
        let cfgs = GameConfig.Enchants.getAllElement();
        let index = MathUtil.randomInt(enchantData.normalEnchantId[0], enchantData.normalEnchantId[1]);
        if (enchantData.filterIds.includes(index)) {
            index = enchantData.normalEnchantId[0];
        }
        buff.push(index);

        if (enchantData.passportPets.includes(petItem.I)) {
            buff.push(enchantData.passportEnchantId);
        } else {
            index = MathUtil.randomInt(enchantData.normalEnchantId[0], enchantData.normalEnchantId[1]);
            if (enchantData.filterIds.includes(index)) {
                index = enchantData.normalEnchantId[0];
            }
            buff.push(index);
        }


        if (type == quality.Myth) {
            if (enchantData.bestPets.includes(petItem.I))
                index = enchantData.bestEnchantId;
            else
                index = MathUtil.randomInt(enchantData.specialEnchantId[0], enchantData.specialEnchantId[1]);
            buff.push(index);
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
            if (qsq.length === 0) qsq.push(q);
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
            result += val;
        }
        return result;
    }
}