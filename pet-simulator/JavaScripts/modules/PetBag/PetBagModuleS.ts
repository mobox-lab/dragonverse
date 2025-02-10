import Gtk from "gtoolkit";
import Log4Ts from "mw-log4ts";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import GameServiceConfig from "../../const/GameServiceConfig";
import { GlobalData } from "../../const/GlobalData";
import { oTraceError } from "../../util/LogManager";
import { numberArrToString, stringToNumberArr, utils } from "../../util/uitls";
import { CollectModuleS } from "../PetCollect/CollectModuleS";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import { Task_ModuleS } from "../Task/Task_ModuleS";
import { TimerModuleUtils } from "../TimeModule/time";
import { AuthModuleS } from "../auth/AuthModule";
import PsStatisticModuleData, { StatisticModuleS } from "../statistic/StatisticModule";
import { BagTool } from "./BagTool";
import { EnchantBuff } from "./EnchantBuff";
import { EnchantPetState } from "./P_Enchants";
import { PetBagModuleC } from "./PetBagModuleC";
import { PetBagModuleData, petItemDataNew } from "./PetBagModuleData";

export class PetBagModuleS extends ModuleS<PetBagModuleC, PetBagModuleData> {
    private _playerModuleS: PlayerModuleS;

    private get playerModuleS(): PlayerModuleS | null {
        if (!this._playerModuleS) this._playerModuleS = ModuleService.getModule(PlayerModuleS);
        return this._playerModuleS;
    }

    private _petBagModuleS: PetBagModuleS;

    private get petBagModuleS(): PetBagModuleS | null {
        if (!this._petBagModuleS) this._petBagModuleS = ModuleService.getModule(PetBagModuleS);
        return this._petBagModuleS;
    }

    /**玩家id、 true:装备 false: 卸下 、宠物数据*/
    public onEquipChangeAC: Action3<number, boolean, petItemDataNew[]> = new Action3();

    // private passMS: PassModuleS = null;
    private taskMS: Task_ModuleS = null;

    protected onStart(): void {
        this.taskMS = ModuleService.getModule(Task_ModuleS);
        // this.passMS = ModuleService.getModule(PassModuleS)
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        const d = this.getPlayerData(player);
        d.PetEquipChangeAC.add((isEquip: boolean, keys: number[]) => {
            let arr: petItemDataNew[] = [];
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                let data = this.getPlayerData(player).bagItemsByKey(key);
                arr.push(data);
            }
            this.equipChange(player, isEquip);
            this.onEquipChangeAC.call(player.playerId, isEquip, arr);
        });
        this.enchantBuffInit(player);
        this.reportMaxAttackPetInfo(player.playerId, d);
    }

    /**获取玩家已经装备宠物数组 */
    public getPlayerCurEquipPets(playerId: number): petItemDataNew[] {
        let data = this.getPlayerData(playerId);
        let arr: petItemDataNew[] = [];
        for (let i = 0; i < data.CurFollowPets.length; i++) {
            let item = data.bagItemsByKey(data.CurFollowPets[i]);
            if (item) {
                arr.push(item);
            }
        }
        return arr;
    }

    public addPetWithMissingInfo(
        playerId: number,
        id: number,
        creSource: "孵化" | "合成" | "爱心化" | "彩虹化" | "初始化",
        addTime?: number,
        logInfo?: {
            logObj: Object;
            logName: string;
        },
        minAtk?: number,
        maxAtk?: number
    ): boolean {
        const petInfo = GameConfig.PetARR.getElement(id);
        const atkArr = petInfo.PetAttack;
        const [petMin, petMax] = atkArr;
        let min = petMin;
        let max = petMax;
        if (minAtk && maxAtk) {
            if (minAtk > min) {
                min = minAtk;
            }
            if (maxAtk < max) {
                max = maxAtk;
            }
        }
        let atk: number = 0;
        if (atkArr.length > 1) atk = utils.GetRandomNum(min, max);
        else atk = atkArr[0];
        let nameId = utils.GetRandomNum(1, 200);
        let name = utils.GetUIText(nameId);
        return this.addPet(playerId, id, atk, name, addTime, logInfo, creSource);
    }

    /**
     * @description: s端购买扭蛋
     * @param cfgId 扭蛋配置id
     * @return
     */
    public async net_buyEgg(cfgId: number, buyEggNum: number): Promise<number[] | "bagFull" | null> {
        const data = this.currentData;
        if (data.CurBagCapacity + buyEggNum > data.BagCapacity) {
            return "bagFull";
        }
        let cfg = GameConfig.EggMachine.getElement(cfgId);
        let price = cfg?.Price[0];
        if (!price || !buyEggNum) return null;
        const totalPrice = price * buyEggNum;
        const userId = this.currentPlayer?.userId ?? "";
        try {
            const playerId = this.currentPlayerId;
            const coinType = this.judgeGold(cfgId);
            let res = ModuleService.getModule(PlayerModuleS).reduceGold(playerId, totalPrice, coinType);
            if (res) {
                const infos = new Array(buyEggNum).fill(0).map((v) => {
                    const petId = this.calcProbability(cfgId);
                    return { id: petId };
                });
                const sData = DataCenterS.getData(userId, PsStatisticModuleData);
                const { eggCnt = 0, hatchCnt = 0 } = sData?.totalStatisticData ?? {};
                const nextEggCnt = eggCnt + buyEggNum;
                const nextHatchCnt = hatchCnt + 1;
                const addRes = this.batchAddPet(playerId, infos, "孵化", {
                    logName: "P_Hatch",
                    logObj: {
                        coinType: coinType,
                        eggId: cfg?.id,
                        eggUnitPrice: price,
                        amount: buyEggNum,
                        cost: totalPrice,
                        eggCnt: nextEggCnt,
                        hatchCnt: nextHatchCnt,
                    },
                });
                sData.recordTotalData({ eggCnt: nextEggCnt, hatchCnt: nextHatchCnt });
                if (!addRes) {
                    // 背包已满 返还资源
                    ModuleService.getModule(PlayerModuleS).addGold(playerId, totalPrice, this.judgeGold(cfgId));
                    return "bagFull";
                }
                return infos.map((info) => info.id);
            }
            return null;
        } catch (e) {
            utils.logP12Info(
                "P_Error",
                {
                    userId: userId,
                    timestamp: Date.now(),
                    errorMsg: "PetBagModuleS buyEgg Error: " + e,
                    cfgId: cfgId,
                    buyEggNum: buyEggNum,
                    totalPrice: totalPrice,
                },
                "error"
            );
        }
    }

    private hasSmallRate: boolean = false;

    /**计算最小概率 */
    private calcMinProbability(cfgId: number): boolean {
        let cfg = GameConfig.EggMachine.getElement(cfgId);
        if (cfg.Weight2 == 0) {
            this.hasSmallRate = false;
            return false;
        }
        this.hasSmallRate = true;

        let random = MathUtil.randomFloat(0, 100);
        let addRate = cfg.Weight2 + GlobalData.Buff.curSmallLuckyBuff[0] + GlobalData.Buff.curSuperLuckyBuff[0];
        if (random <= addRate) {
            return true;
        }
        return false;
    }

    /**计算概率
     * @returns 返回宠物表id
     * */
    private calcProbability(cfgId: number): number {
        let cfg = GameConfig.EggMachine.getElement(cfgId);
        if (this.calcMinProbability(cfgId)) {
            return cfg.petArr[cfg.petArr.length - 1];
        }
        //计算总权重
        let curWeight = cfg.Weight.concat();
        if (this.hasSmallRate) {
            //加后2个
            curWeight[curWeight.length - 1] +=
                GlobalData.Buff.curSmallLuckyBuff[1] + GlobalData.Buff.curSuperLuckyBuff[1];
            curWeight[curWeight.length - 2] +=
                GlobalData.Buff.curSmallLuckyBuff[1] + GlobalData.Buff.curSuperLuckyBuff[1];
        } else {
            //加后3个
            curWeight[curWeight.length - 1] +=
                GlobalData.Buff.curSmallLuckyBuff[1] + GlobalData.Buff.curSuperLuckyBuff[1];
            curWeight[curWeight.length - 2] +=
                GlobalData.Buff.curSmallLuckyBuff[1] + GlobalData.Buff.curSuperLuckyBuff[1];
            curWeight[curWeight.length - 3] +=
                GlobalData.Buff.curSmallLuckyBuff[1] + GlobalData.Buff.curSuperLuckyBuff[1];
        }

        let index = BagTool.calculateWeight(curWeight);
        return cfg.petArr[index];
    }

    private judgeGold(cfgId: number): GlobalEnum.CoinType {
        let coinType = GlobalEnum.CoinType;

        let goldType = coinType.FirstWorldGold;
        let cfg = GameConfig.EggMachine.getElement(cfgId);
        if (cfg.AreaID < 2000) {
            goldType = coinType.FirstWorldGold;
        } else if (cfg.AreaID < 3000) {
            goldType = coinType.SecondWorldGold;
        } else if (cfg.AreaID < 4000) {
            goldType = coinType.ThirdWorldGold;
        }
        return goldType;
    }

    public addPet(
        playerID: number,
        id: number,
        atk: number,
        name: string,
        addTime?: number,
        logInfo?: {
            logObj: Object;
            logName: string;
        },
        creSource?: "孵化" | "合成" | "爱心化" | "彩虹化" | "初始化"
    ): boolean {
        let data = this.getPlayerData(playerID);
        const res = data.addBagItem(id, atk, name, addTime, logInfo, playerID, creSource);
        if (!res) return false;
        // this.taskMS.getPet(Player.getPlayer(playerID), id, type);
        ModuleService.getModule(CollectModuleS).addPet(playerID, id);
        this.reportMaxAttackPetInfo(playerID, data);
        this.petNotice(playerID, id);
        return true;
    }

    public batchAddPet(
        playerID: number,
        infos: { atk?: number; id: number; name?: string; addTime?: number }[],
        creSource: "孵化" | "合成" | "爱心化" | "彩虹化" | "初始化",
        logInfo?: { logObj: Object; logName: string }
    ): boolean {
        if (!infos?.length) {
            Log4Ts.warn(PetBagModuleS, "batchAddPet infos is null");
            return false;
        }
        const addInfos = [];
        const data = this.getPlayerData(playerID);
        for (const info of infos) {
            let { atk, id, name, addTime } = info;
            if (!atk) {
                let atkArr = GameConfig.PetARR.getElement(id).PetAttack;
                if (atkArr.length > 1) atk = utils.GetRandomNum(atkArr[0], atkArr[1]);
                else atk = atkArr[0];
            }
            if (!name) {
                const nameId = utils.GetRandomNum(1, 200);
                name = utils.GetUIText(nameId);
            }
            addInfos.push({ atk, id, name, addTime });
            this.petNotice(playerID, id);
        }
        const res = data.batchAddBagItem(playerID, creSource, addInfos, logInfo);
        if (!res) return false;
        const ids = infos.map((info) => info.id);
        ModuleService.getModule(CollectModuleS).batchAddPet(playerID, ids);
        this.reportMaxAttackPetInfo(playerID, data);
        return true;
    }

    /**根据id添加宠物 自动计算名字*/
    // public addPetById(playerID: number, id: number, type?: GlobalEnum.PetGetType): boolean {
    //     let atkArr = GameConfig.PetARR.getElement(id).PetAttack;

    //     let atk: number = 0;
    //     if (atkArr.length > 1)
    //         atk = utils.GetRandomNum(atkArr[0], atkArr[1]);
    //     else
    //         atk = atkArr[0];

    //     let nameId = utils.GetRandomNum(1, 200);
    //     let name = GameConfig.Language.getElement(nameId).Value;
    //     return this.addPet(playerID, id, atk, name, type);
    // }

    /**宠物公告 */
    private petNotice(playerId: number, id: number) {
        let cfg = GameConfig.PetARR.getElement(id);
        let tipsType: GlobalEnum.PetNoticeTips = null;

        if (cfg.QualityType == GlobalEnum.PetQuality.Legend) {
            tipsType = GlobalEnum.PetNoticeTips.Legend;
            // this.passMS.onTaskUpdateAC.call(playerId, GlobalEnum.VipTaskType.LegendPet, 1);
        }
        if (cfg.QualityType == GlobalEnum.PetQuality.Myth) {
            tipsType = GlobalEnum.PetNoticeTips.Myth;
            // this.passMS.onTaskUpdateAC.call(playerId, GlobalEnum.VipTaskType.MythPet, 1);
        }
        if (GlobalData.Notice.taskPet.includes(id)) {
            tipsType = GlobalEnum.PetNoticeTips.Task;
        }
        if (GlobalData.Notice.summerPet.includes(id)) {
            tipsType = GlobalEnum.PetNoticeTips.Summer;
        }
        if (cfg.Shape == 2) {
            tipsType = GlobalEnum.PetNoticeTips.Huge;
        }
        if (tipsType != null) this.getAllClient().net_petNotice(playerId, id, tipsType);
    }

    net_deletePet(keys: number[], desSource: "删除" | "合成" | "爱心化" | "彩虹化") {
        this.deletePet(this.currentPlayerId, keys, desSource);
    }

    public deletePet(playerId: number, keys: number[], desSource: "删除" | "合成" | "爱心化" | "彩虹化") {
        const userId = Player.getPlayer(playerId)?.userId;
        Log4Ts.log(PetBagModuleS, "userId:" + userId + " deletePet keys:" + keys);
        let data = this.getPlayerData(playerId);

        let delAbleKeys = data.getFilteredDelAbleKeys(keys);
        if (Gtk.isNullOrEmpty(delAbleKeys)) return;

        let unEquipPets: number[] = delAbleKeys.filter((element) => data.CurFollowPets.includes(element));

        if (!Gtk.isNullOrEmpty(unEquipPets)) data.unEquipPet(unEquipPets);

        data.removeBagItem(playerId, keys, desSource);
        this.reportMaxAttackPetInfo(playerId, data);

        data.save(true);
        data.BagItemChangeAC.call(false, []);
    }
    public recoverFusePets(playerId: number, bagItems: { [key: number]: petItemDataNew }) {
        const userId = Player.getPlayer(playerId).userId;
        Log4Ts.log(PetBagModuleS, "userId:" + userId + " recoverFusePets:" + JSON.stringify(bagItems));
        const data = this.getPlayerData(playerId);
        data.recoverBagItems(bagItems);
    }

    /**根据概率返回本次是否成功 */
    private isSuccess(probability: number): boolean {
        let random = Math.random() * 100;
        if (random <= probability) {
            return true;
        }
        return false;
    }

    net_addBagCapacity(count: number) {
        this.addBagCapacity(this.currentPlayerId, count);
    }

    addBagCapacity(playerId: number, count: number, player: mw.Player = null) {
        const d = this.getPlayerData(playerId);
        if (!d) return;

        d.addCapacity(count);
    }

    // addSlot(player: mw.Player = null, num: number = 1) {
    //     if (player) {
    //         return this.getPlayerData(player).addPetFollowCount(num);
    //     }
    //     return this.currentData.addPetFollowCount(num);
    // }

    // /**训练 */
    // net_trainPet(keys: number[], desSource: "删除" | "合成" | "爱心化" | "彩虹化") {

    //     for (let i = 0; i < keys.length; i++) {
    //         const element = keys[i];
    //         this.currentData.addTrainPet(element);
    //         this.currentData.removeBagItem([element], desSource);
    //     }
    //     this.currentData.save(true);
    //     this.currentData.PetTrainChangeAC.call();
    // }

    net_trainComplete(key: number) {
        let index = this.currentData.trainPet.findIndex((item) => {
            return item.petData.k == key;
        });
        if (index != -1) {
            //添加到背包
            this.currentData.addBagItemByPetData(this.currentData.trainPet[index].petData);
            //删除训练中的宠物
            this.currentData.trainPet.splice(index, 1);
            this.currentData.save(true);

            this.currentData.PetTrainChangeAC.call();
        } else {
            oTraceError("lwj 找不到训练中的宠物" + key);
        }
    }

    /**装备宠物 */
    net_equipPet(keys: string) {
        this.currentData.equipPet(stringToNumberArr(keys));
    }

    net_unEquipPet(keys: string) {
        this.currentData.unEquipPet(stringToNumberArr(keys));
    }

    /**宠物改名 */
    net_petRename(key: number, name: string) {
        this.currentData.petRename(key, name);
        this.reportMaxAttackPetInfo(this.currentPlayerId, this.currentData);
        let id = this.currentData.bagItemsByKey(key).I;
        ModuleService.getModule(PlayerModuleS).renamePet(this.currentPlayerId, key, id, name);
    }

    /** 计算best friend词条战力 */
    net_bestFriendBuff() {
        const playerId = this.currentPlayerId;
        const playerData = this.getPlayerData(playerId);
        let arr = playerData.sortBag();
        let atk = 0;
        let petIds = [];
        for (let i = 0; i < arr.length; i++) {
            if (GlobalData.Enchant.bestPets.includes(arr[i].I)) {
                petIds.push(arr[i].k);
                if (atk == 0) atk = EnchantBuff.getAtk(arr);
            }
        }
        if (petIds.length == 0) return;

        let delArr: number[] = [];

        petIds.forEach((key) => {
            let data = playerData.bagItemsByKey(key);
            if (data.p.a == atk) {
                delArr.push(key);
            }
        });
        delArr.forEach((key) => {
            let index = petIds.findIndex((value) => {
                return value == key;
            });
            if (index != -1) petIds.splice(index, 1);
        });
        if (petIds.length == 0) return;
        this.changeAtk(numberArrToString(petIds), atk);
    }

    /** 计算通行证词条 *0.5 */
    net_passBuff() {
        const playerId = this.currentPlayerId;
        const data = this.getPlayerData(playerId);
        let arr = data.sortBagByAtk();
        let atk = 0;
        let petIds = [];
        for (let i = 0; i < arr.length; i++) {
            if (GlobalData.Enchant.passportPets.includes(arr[i].I)) {
                petIds.push(arr[i].k);
                if (atk == 0) atk = arr[0].p.a * 0.5;
            }
        }
        if (petIds.length == 0) return;
        this.changeAtk(numberArrToString(petIds), atk);
    }

    public getPet(playerId: number, key: number): petItemDataNew {
        return this.getPlayerData(playerId)?.bagItemsByKey(key) ?? undefined;
    }

    /**宠物更改攻击力 */
    changeAtk(keys: string, atk: number) {
        if (isNaN(atk)) atk = 0;
        let keyArr = stringToNumberArr(keys);
        for (let i = 0; i < keyArr.length; i++) {
            const element = keyArr[i];
            let item = this.currentData.bagItemsByKey(element);
            if (item) {
                item.p.a = atk;
                this.currentData.updatePetStatistic(item);
            }
        }
        //找到最高的战力
        // let petKey = this.currentData.getMaxAttackPet(1);
        // if (petKey != 0) {
        //     let pet = this.currentData.bagItemsByKey(petKey);
        //     let petConfig = GameConfig.PetARR.getElement(pet.I);
        //     if (petConfig) {
        //         const currRound = this.currentData.calRound(Date.now());
        //         ModuleService.getModule(AuthModuleS).reportPetSimulatorRankData(
        //             this.currentPlayerId,
        //             pet.p.n,
        //             petConfig.DevType,
        //             pet.p.a,
        //             pet.obtainTime,
        //             currRound);
        //     }
        // }
        this.reportMaxAttackPetInfo(this.currentPlayerId, this.currentData);

        this.currentData.save(true);
    }

    /**
     * 获取指定玩家的体力系数.
     * @param {number} playerId
     * @return {number}
     */
    public getPlayerEnergyRecoveryCoefficient(playerId: number) {
        return this.getPlayerData(playerId)?.getEnergyRecoveryCoefficient() ?? 0;
    }

    //************** 合成宠物*************/

    /**判断获得的宠物类型 普通0 黄金1 彩虹2 */
    private judgePetType(curSelectPets: petItemDataNew[]): number {
        let count = curSelectPets.length;
        let specialCount = 0;
        curSelectPets.forEach((item) => {
            let type = GameConfig.PetARR.getElement(item.I).DevType;
            if (type === GlobalEnum.PetDevType.Love || type === GlobalEnum.PetDevType.Rainbow) {
                specialCount++;
            }
        });

        //普通宠物的权重
        let normalWeight = -10 * count + 80;
        if (normalWeight < 0) normalWeight = 0;
        //黄金宠物的权重
        let goldWeight = -4 * count + 52;
        if (goldWeight < 0) goldWeight = 0;
        //彩虹宠物的权重
        // let rainbowWeight = -2 * count + 32;
        let rainbowWeight = 14 * count - 32 + 5 * specialCount;
        if (rainbowWeight < 0) rainbowWeight = 0;
        let totalWeight = normalWeight + goldWeight + rainbowWeight;
        let random = Math.random() * totalWeight;
        if (random < normalWeight) {
            return 0;
        }
        if (random < normalWeight + goldWeight) {
            return 1;
        }
        return 2;
    }

    /**根据各宠物攻击力权重获得宠物 */
    private getPetByAtkWeight(allPetIds: number[], maxCount: number): number {
        let count = maxCount / 2;
        let allPetAtk = 0;
        let petAtkWeights: number[] = [];
        allPetIds.forEach((id) => {
            let pet = GameConfig.PetARR.getElement(id);
            let wight = pet.PetAttack[0] * count;
            allPetAtk += wight;
            petAtkWeights.push(wight);
        });
        let random = Math.random() * allPetAtk;
        let totalWeight = 0;
        for (let i = 0; i < petAtkWeights.length; i++) {
            totalWeight += petAtkWeights[i];
            if (random < totalWeight) {
                return allPetIds[i];
            }
        }
    }

    /** 原 P_FusePanel.net_fusePet 合成宠物 */
    public async net_fusePet(curSelectPetKeys: number[], earliestObtainTime: number): Promise<boolean> {
        const playerId = this.currentPlayerId;
        const userId = this.currentPlayer.userId;
        const curSelectPets = curSelectPetKeys
            .map((key) => this.currentData.bagItemsByKey(key))
            .filter((item) => item !== undefined);

        if (curSelectPetKeys.length !== curSelectPets.length) {
            Log4Ts.warn(
                PetBagModuleS,
                `some pet not found.`,
                `player selected: ${curSelectPetKeys}.`,
                `found: ${curSelectPets}.`
            );
            return false;
        }
        const data = this.currentData;
        if (!data) return false;
        data.clearFuseTodayIfNewDay();
        let fuseNumToday = data?.fuseNumToday ?? 0;
        const cost = utils.fuseCostCompute(fuseNumToday);
        console.log("#time net_fusePet cost:" + cost + "  fuseNumToday:" + fuseNumToday);
        if (!this.playerModuleS.reduceDiamond(cost, playerId)) return false;

        if (curSelectPets.length >= data.CurBagCapacity) return false;

        const preBagItems = data.BagItems;

        try {
            /**最多相同id的宠物数量 */
            let maxSameIdCount = 0;
            /**所有宠物攻击力的合 */
            let allPetAtk = 0;
            let countMap = new Map<number, number>();
            let devType = this.judgePetType(curSelectPets);
            for (let i = 0; i < curSelectPets.length; i++) {
                let pet = curSelectPets[i];
                if (!countMap.has(pet.I)) {
                    countMap.set(pet.I, 1);
                } else {
                    let count = countMap.get(pet.I);
                    countMap.set(pet.I, count + 1);
                    if (count + 1 > maxSameIdCount) {
                        maxSameIdCount = count + 1;
                    }
                }
                allPetAtk += pet.p.a;
            }
            if (maxSameIdCount == 0) maxSameIdCount = 1;
            let minAtk = allPetAtk / GlobalData.Fuse.minDamageRate;
            let maxAtk = allPetAtk / GlobalData.Fuse.maxDamageRate;
            let allPetIds: number[] = [];
            /**与最大攻击力差值 */
            //获取ts最大整数数值
            let max = Number.MAX_VALUE;
            let allMaxAtkDiff = max;
            /**攻击力差值最小的宠物id */
            let allMinAtkDiffPetId = 1;
            /**稀有度相同的最大攻击力差值 */
            let sameMaxAtkDiff = max;
            /**稀有度相同的攻击力差值最小的宠物id */
            let sameMinAtkDiffPetId = 0;
            let tryCount = 0;
            const MAX_TRY = 3; // 最多尝试次数
            let endPetId: number | null = null;
            do {
                if (devType > 3) break; // 满足条件则退出循环
                GameConfig.PetARR.getAllElement().forEach((item) => {
                    if (item.IfFuse) {
                        let atks = item.PetAttack;
                        let min = atks[0];
                        let max = atks[1];
                        if (min >= minAtk && max <= maxAtk && item.DevType == devType) {
                            allPetIds.push(item.id);
                        }
                        let diff = Math.abs(max - maxAtk);
                        if (diff < allMaxAtkDiff) {
                            allMaxAtkDiff = diff;
                            allMinAtkDiffPetId = item.id;
                        }
                        if (item.DevType == devType) {
                            if (diff < sameMaxAtkDiff) {
                                sameMaxAtkDiff = diff;
                                sameMinAtkDiffPetId = item.id;
                            }
                        }
                    }
                });
                if (allPetIds.length == 0) {
                    let minAtkDiffPetId = sameMinAtkDiffPetId == 0 ? allMinAtkDiffPetId : sameMinAtkDiffPetId;
                    allPetIds.push(minAtkDiffPetId);
                }

                endPetId = this.getPetByAtkWeight(allPetIds, maxSameIdCount);
                if (!endPetId) return false;
                // 检查是否需要继续升级 devType
                const endPetAtk = GameConfig.PetARR.getElement(endPetId).PetAttack;
                if (minAtk <= endPetAtk[1]) break; // 满足条件则退出循环

                // 不满足条件时准备下次循环
                devType++;
                tryCount++;

                // 清空临时数据（重要！避免累积错误）
                allPetIds = [];
                allMaxAtkDiff = Number.MAX_VALUE;
                sameMaxAtkDiff = Number.MAX_VALUE;
            } while (tryCount < MAX_TRY); // 控制最多尝试次数防止死循环
            if (!endPetId) return false;
            const sData = DataCenterS.getData(userId, PsStatisticModuleData);
            const { fuseCostPetNum = 0, fuseCnt = 0 } = sData?.totalStatisticData ?? {};
            const nextFuseCnt = fuseCnt + 1;
            const nextFuseCostPetNum = fuseCostPetNum + curSelectPetKeys.length;
            const logInfo = {
                logName: "P_Merge",
                logObj: {
                    userId,
                    coinType: GlobalEnum.CoinType.Diamond,
                    cost,
                    inputPets: curSelectPets,
                    dailyCount: fuseNumToday + 1,
                    inputCount: nextFuseCostPetNum,
                    mergeCount: nextFuseCnt,
                },
            };
            this.petBagModuleS.deletePet(playerId, curSelectPetKeys, "合成");
            const res = this.petBagModuleS.addPetWithMissingInfo(
                playerId,
                endPetId,
                "合成",
                earliestObtainTime,
                logInfo,
                minAtk,
                maxAtk
            );
            mw.Event.dispatchToClient(this.currentPlayer, "FUSE_BROADCAST_ACHIEVEMENT_BLEND_TYPE", endPetId);
            if (!res) throw new Error("addPetWithMissingInfo error");
            sData.recordTotalData({ fuseCnt: nextFuseCnt, fuseCostPetNum: nextFuseCostPetNum });
            data.fusePetStatistic();
            ModuleService.getModule(StatisticModuleS)?.recordFuseConsume(cost, userId, "fuse");
            return true;
        } catch (e) {
            const userId = Player.getPlayer(playerId)?.userId;
            this.petBagModuleS.recoverFusePets(playerId, preBagItems);
            utils.logP12Info(
                "P_Error",
                {
                    userId: userId,
                    timestamp: Date.now(),
                    errorMsg: "PetBagModuleS fusePet error: " + e,
                    curSelectPetKeys,
                    recoverPreBagItems: preBagItems,
                },
                "error"
            );
            return false;
        }
    }

    /**词条buff初始化 */
    private enchantBuffInit(player: mw.Player) {
        const data = this.getPlayerData(player);
        let keys = data.CurFollowPets;
        EnchantBuff.equipUnPet(player.playerId, keys, true);
    }

    private equipChange(player: mw.Player, isEquip: boolean) {
        const data = this.getPlayerData(player);
        let keys = data.CurFollowPets;
        console.warn(`lwj equipChange  ${isEquip}`, keys);
        EnchantBuff.equipUnPet(player.playerId, keys, isEquip);
    }

    public changeFuseDevCost(player: mw.Player, count: number, isGold: boolean) {
        if (count <= 0) {
            mw.Event.dispatchToClient(player, "P_PET_DEV_CHANGE_PANEL_UI", 0, 0);
            return { rate: 0, cost: 0 };
        }
        let rates = GlobalData.Dev.goldProbability;
        let costs = isGold ? GlobalData.Dev.goldCost : GlobalData.Dev.rainbowCost;
        if (count > rates.length) count = rates.length;
        let rate = rates[count - 1];
        let cost = costs[count - 1];
        console.log("changeFuseDevCost cost rate isGold", cost, rate, isGold);
        mw.Event.dispatchToClient(player, "P_PET_DEV_CHANGE_PANEL_UI", cost, rate);
        return { rate, cost };
    }

    /** 原 P_Pet_Dev.startDev 合成宠物 */
    public async net_fuseDevPet(curSelectPetKeys: number[], curPetId: number, isGold: boolean): Promise<boolean> {
        const player = this.currentPlayer;
        const playerId = this.currentPlayerId;
        const userId = this.currentPlayer.userId;
        const curSelectPets = curSelectPetKeys
            .map((key) => this.currentData.bagItemsByKey(key))
            .filter((item) => item !== undefined);

        Log4Ts.log(PetBagModuleS, "net_fuseDevPet curSelectPets:" + JSON.stringify(curSelectPets));

        if (curSelectPetKeys.length !== curSelectPets.length) {
            Log4Ts.warn(
                PetBagModuleS,
                `some pet not found.`,
                `player selected: ${curSelectPetKeys}.`,
                `found: ${curSelectPets}.`
            );
            return false;
        }

        if (!curSelectPets?.length) return false;
        let petIds: number[] = curSelectPets.map((item) => item.I);
        const { rate, cost } = this.changeFuseDevCost(player, petIds.length, isGold);

        if (!this.playerModuleS.reduceDiamond(cost, playerId)) return false;

        //计算最早的获取时间
        let earliestObtainTime = curSelectPets[0].obtainTime;
        curSelectPets.forEach((item) => {
            if (item.obtainTime < earliestObtainTime) {
                earliestObtainTime = item.obtainTime;
            }
        });

        let random = GameServiceConfig.isRelease || GameServiceConfig.isBeta ? MathUtil.randomInt(0, 100) : 0;
        const petInfo = GameConfig.PetARR.getElement(curPetId);
        let isSucc: boolean = true;
        let endPetId = isGold ? petInfo.goldID : petInfo.RainBowId;
        this.petBagModuleS.deletePet(playerId, curSelectPetKeys, isGold ? "爱心化" : "彩虹化");

        const sData = DataCenterS.getData(userId, PsStatisticModuleData);
        const {
            loveCnt = 0,
            loveCostPetNum = 0,
            rainbowCnt = 0,
            rainbowCostPetNum = 0,
        } = sData?.totalStatisticData ?? {};
        const logTotalData = isGold
            ? {
                  loveCnt: loveCnt + 1,
                  loveCostPetNum: loveCostPetNum + curSelectPets.length,
              }
            : {
                  rainbowCnt: rainbowCnt + 1,
                  rainbowCostPetNum: rainbowCostPetNum + curSelectPets.length,
              };
        const logInfo = {
            logName: isGold ? "P_Heart" : "P_Rainbow",
            logObj: {
                userId,
                timestamp: Date.now(),
                coinType: GlobalEnum.CoinType.Diamond,
                chance: rate + "%",
                cost,
                inputPets: curSelectPets,
                ...logTotalData,
            },
        };
        sData.recordTotalData(logTotalData);

        if (random <= rate) {
            mw.Event.dispatchToClient(this.currentPlayer, "P_PET_DEV_SHOW_FUSE_MESSAGE", "devFuseSuccess");
            Object.assign(logInfo.logObj, { isSucc: true });
            const res = ModuleService.getModule(PetBagModuleS).addPetWithMissingInfo(
                this.currentPlayerId,
                endPetId,
                isGold ? "爱心化" : "彩虹化",
                earliestObtainTime,
                logInfo
            );
            if (!res) {
                // 一般也不会出现
                Log4Ts.error(PetBagModuleS, "net_fuseDevPet addPetWithMissingInfo failed, bag full");
                return false;
            }
            ModuleService.getModule(StatisticModuleS)?.recordFuseConsume(cost, userId, isGold ? "love" : "rainbow");
        } else {
            isSucc = false;
            utils.logP12Info(logInfo.logName, { ...logInfo.logObj, isSucc: false });
            mw.Event.dispatchToClient(this.currentPlayer, "P_PET_DEV_SHOW_FUSE_MESSAGE", "devFuseFailed");
        }
        mw.Event.dispatchToClient(
            this.currentPlayer,
            "FUSE_BROADCAST_ACHIEVEMENT_CHANGE_TYPE",
            endPetId,
            isSucc,
            petIds
        );
        return true;
    }

    public reportMaxAttackPetInfo(playerID: number, data: PetBagModuleData) {
        const currRound = data.calRound(Date.now());
        let petKey = data.getMaxAttackPet(currRound);
        if (petKey != 0) {
            let pet = data.bagItemsByKey(petKey);
            const petEnchantScore = data.getPetEnchantScore(pet.p.b);
            let petConfig = GameConfig.PetARR.getElement(pet.I);
            Log4Ts.log(
                PetBagModuleS,
                `reportMaxAttackPetInfo petName:${pet.p.n} petAtk:${pet.p.a} petKey:${
                    pet.k
                } petEnchants:${pet.p.b.toString()} petEnchantScore:${petEnchantScore}`
            );
            if (petConfig) {
                ModuleService.getModule(AuthModuleS).reportPetSimulatorRankData(
                    playerID,
                    pet.p.n,
                    petConfig.QualityType,
                    pet.p.a,
                    pet.obtainTime,
                    petEnchantScore,
                    currRound
                );
            }
        }
    }

    /** 第二世界 —— 宠物附魔 */
    public async net_petEnchant(selectPetKey: number | null): Promise<EnchantPetState> {
        const bagData = this.currentData;
        if (!selectPetKey) return EnchantPetState.NO_SELECTED_PET;
        const data = bagData.bagItemsByKey(selectPetKey);
        if (!data || !data.p) return EnchantPetState.NO_SELECTED_PET;
        const isHasEnchant = Boolean(data.p?.b?.length); //是否有附魔
        const isAllEnchant = data.p?.b?.length && data.p.b?.length >= 2; //是否全部附魔
        if (isAllEnchant) return EnchantPetState.IS_ALL_ENCHANT;
        if (isHasEnchant) return EnchantPetState.IS_HAS_ENCHANT;
        return EnchantPetState.HAS_NO_ENCHANT;
    }

    /**获取当前选中宠物所需钻石花费 */
    public getEnchantCost(selectPetKey: number | null) {
        if (!selectPetKey) return 0;
        const curSelectPetEnchantCnt = this.currentData.bagItemsByKey(selectPetKey)?.enchantCnt;
        const costCfg = GameConfig.EnchantCost.getAllElement();
        if (!costCfg?.length) return 0;
        for (let i = 0; i < costCfg.length; i++) {
            const { EnchantCnt, CostDiamond } = costCfg[i] ?? {};
            if (EnchantCnt == curSelectPetEnchantCnt) return CostDiamond;
        }
        return costCfg[costCfg.length - 1].CostDiamond;
    }

    /**获取当前选中宠物所需钻石花费 */
    public async net_getEnchantCost(selectPetKey: number | null): Promise<number> {
        return this.getEnchantCost(selectPetKey);
    }

    // 按照配置的 Weight 随机返回一个附魔词条id，如果有 excludeId 则排除其的权重
    private randomEnchant(excludeIds?: number[]): number {
        const enchantCfg = GameConfig.Enchants.getAllElement();
        const filterEnchantCfg = enchantCfg.filter(
            (enchantCfg) =>
                enchantCfg.QualityType == 0 &&
                !GlobalData.Enchant.filterIds.includes(enchantCfg.id) &&
                (excludeIds?.length ? !excludeIds.includes(enchantCfg.id) : true)
        );

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
        Log4Ts.log(PetBagModuleS, `net_enchant randomEnchant - random:${random}, totalWeight:${totalWeight}`);
        let probability = 0;
        for (let i = 0; i < idArr.length; i++) {
            probability += weightArr[i];
            if (random <= probability) {
                return idArr[i];
            }
        }

        return idArr[idArr.length - 1];
    }

    private getEnchantIds(prePetInfo: petItemDataNew, selectEnchantId: number | null): null | number[] {
        const enchantIds = [...(prePetInfo.p.b ?? [])];
        const len = enchantIds?.length ?? 0;
        const excludeIds = [];
        if (len === 3) {
            // 神话宠物，则第三个为固有词条，也不可以随到它
            excludeIds.push(enchantIds[2]);
        }
        Log4Ts.log(PetBagModuleS, "net_enchant 附魔前宠物词缀信息 preEnchantIds:" + enchantIds);

        /**
         * 选中宠物已有两条词缀
         * 则选任意词缀，附魔重铸， 新词缀与原有两词缀不同
         * 即： 不会随到已有或者相同的词缀
         */
        if (len >= 2) {
            // 神话宠物三个词条会走这里
            if (!selectEnchantId) return null;
            const tarEnchantIndex = enchantIds.findIndex((id) => id === selectEnchantId); // 要覆盖
            if (tarEnchantIndex === -1) return null;
            const excludeEnchantId = enchantIds[(tarEnchantIndex + 1) % 2]; // 不跟原有的附魔重合
            excludeIds.push(excludeEnchantId);
            Log4Ts.log(PetBagModuleS, "net_enchant 已有两条词缀 excludeEnchantIds:" + excludeIds);
            enchantIds[tarEnchantIndex] = this.randomEnchant(excludeIds);
            return enchantIds;
        }

        // 已有一条词缀
        if (len === 1) {
            const excludeEnchantId = enchantIds[0]; // 不跟原有的附魔重合
            excludeIds.push(excludeEnchantId);
            Log4Ts.log(PetBagModuleS, "net_enchant 已有一条词缀 excludeEnchantIds:" + excludeIds);
            enchantIds.push(this.randomEnchant(excludeIds));
            return enchantIds;
        }
        Log4Ts.log(PetBagModuleS, "net_enchant 还没有词缀");
        enchantIds.push(this.randomEnchant());
        return enchantIds;
    }

    /** 获取变动过的附魔词条 */
    private getNewEnchantIds(preEnchantIds: number[], enchantIds: number[]) {
        if (!preEnchantIds?.length) return enchantIds;
        const newIds = enchantIds.filter((id) => !preEnchantIds.includes(id));
        return newIds;
    }

    /** 附魔公告 */
    private enchantNotice(player: mw.Player, enchantIds: number[]) {
        if (!enchantIds?.length) return;
        const playerId = player.playerId;
        const noticeIds = enchantIds.filter((id) => GlobalData.Notice.enchantBuff.includes(id));
        if (noticeIds?.length) this.getAllClient().net_enchantNotice(playerId, noticeIds);
    }

    public async net_enchant(selectPetKey: number | null, selectEnchantId: number | null): Promise<EnchantPetState> {
        const playerId = this.currentPlayerId;
        const player = this.currentPlayer;
        const userId = player.userId;
        const data = this.currentData;
        const cost = this.getEnchantCost(selectPetKey);
        Log4Ts.log(PetBagModuleS, `net_enchant cost:` + cost);
        if (!this.playerModuleS.reduceDiamond(cost, playerId)) return EnchantPetState.NO_ENOUGH_DIAMOND;

        const curSelectPetEnchantCnt = data.bagItemsByKey(selectPetKey)?.enchantCnt;
        const curSelectPet = data.bagItemsByKey(selectPetKey);
        const prePetEnchantIds = Array.from(data.bagItemsByKey(selectPetKey).p.b);
        const enchantIds = this.getEnchantIds(data.bagItemsByKey(selectPetKey), selectEnchantId);
        if (!enchantIds?.length) return EnchantPetState.FAILED;

        data.addEnchant(selectPetKey, enchantIds, playerId);

        this.taskMS.strengthen(this.currentPlayer, GlobalEnum.StrengthenType.Enchant);
        // this.passMS.onTaskUpdateAC.call(this.currentPlayerId, GlobalEnum.VipTaskType.PetEnchant, 1);
        const newIds = this.getNewEnchantIds(prePetEnchantIds, enchantIds);
        Log4Ts.log(PetBagModuleS, "net_enchant enchantNewIds:" + newIds);

        this.reportMaxAttackPetInfo(playerId, this.currentData); // 上报附魔分数变化 这里就是要现在的currentData
        this.enchantNotice(player, newIds);
        const specialIds = newIds.filter((id) => {
            const [min, max] = GlobalData.Enchant.specialEnchantIdRange;
            return id >= min && id <= max;
        });

        const sData = DataCenterS.getData(userId, PsStatisticModuleData);
        const { enchantCnt = 0 } = sData?.totalStatisticData ?? {}; // 这个 enchantCnt 是赛季总的附魔次数
        utils.logP12Info("P_Enchants", {
            userId,
            timestamp: Date.now(),
            cost,
            coinType: GlobalEnum.CoinType.Diamond,
            curSelectPet,
            curSelectPetEnchantCnt,
            selectEnchantId,
            prePetEnchantIds,
            newEnchantIds: newIds,
            finalEnchantIds: enchantIds,
            enchantSeasonCnt: enchantCnt + 1,
        });
        sData.recordTotalData({ enchantCnt: enchantCnt + 1 });

        ModuleService.getModule(StatisticModuleS)?.recordEnchantConsume(cost, userId);
        if (specialIds?.length) mw.Event.dispatchToClient(player, "ENCHANT_BROADCAST_ACHIEVEMENT_ENCHANT_SPECIAL");
        return EnchantPetState.SUCCESS;
    }

    /**判断是否是同一种附魔
     * @param tarEnchant 目标附魔
     * @param petEnchant 当前宠物附魔
     */
    public isSameEnchant(tarEnchant: number[], petEnchant: number[]): boolean {
        if (!petEnchant) return false;
        if (tarEnchant.length == 0) return false;

        for (let index = 0; index < tarEnchant.length; index++) {
            let element = tarEnchant[index];
            if (petEnchant.indexOf(element) == -1) {
                return false;
            }
        }
        return true;
    }

    /** GM 测试用 给第一个装备的宠物添加 */
    public async gm_enchant(player: mw.Player, enchantIds: number[]) {
        const playerId = player.playerId;
        const data = DataCenterS.getData(playerId, PetBagModuleData);
        const selectPetKey = data.CurFollowPets[0];

        const prePetEnchantIds = Array.from(data.bagItemsByKey(selectPetKey).p.b);

        data.addEnchant(selectPetKey, enchantIds, playerId);

        const newIds = this.getNewEnchantIds(prePetEnchantIds, enchantIds);
        Log4Ts.log(PetBagModuleS, "gm_enchant enchantNewIds:" + newIds);

        this.reportMaxAttackPetInfo(playerId, data); // 上报附魔分数变化 这里就是要现在的currentData
        this.enchantNotice(player, newIds);
        const specialIds = newIds.filter((id) => {
            const [min, max] = GlobalData.Enchant.specialEnchantIdRange;
            return id >= min && id <= max;
        });
        if (specialIds?.length) mw.Event.dispatchToClient(player, "ENCHANT_BROADCAST_ACHIEVEMENT_ENCHANT_SPECIAL");
    }

    public net_clearFuseTodayIfNewDay() {
        const playerId = this.currentPlayerId;
        DataCenterS.getData(playerId, PetBagModuleData)?.clearFuseTodayIfNewDay();
    }
}
