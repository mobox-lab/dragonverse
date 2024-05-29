import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import { oTraceError } from "../../util/LogManager";
import { numberArrToString, stringToNumberArr, utils } from "../../util/uitls";
import { CollectModuleS } from "../PetCollect/CollectModuleS";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import { Task_ModuleS } from "../Task/Task_ModuleS";
import { AuthModuleS } from "../auth/AuthModule";
import { BagTool } from "./BagTool";
import { EnchantBuff } from "./EnchantBuff";
import { PetBagModuleC } from "./PetBagModuleC";
import { PetBagModuleData, petItemDataNew } from "./PetBagModuleData";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import Gtk from "../../util/GToolkit";
import { EnchantPetState } from "./P_Enchants";

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

    /**玩家获取宠物事件 */
    public onGetPetAC: Action2<number, number> = new Action2();

    // private passMS: PassModuleS = null;
    private taskMS: Task_ModuleS = null;

    protected onStart(): void {
        this.taskMS = ModuleService.getModule(Task_ModuleS);
        // this.passMS = ModuleService.getModule(PassModuleS)
    }

    protected onPlayerEnterGame(player: mw.Player): void {

        this.getPlayerData(player).PetEquipChangeAC.add((isEquip: boolean, keys: number[]) => {
            let arr: petItemDataNew[] = [];
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                let data = this.getPlayerData(player).bagItemsByKey(key);
                arr.push(data);
            }
            this.onEquipChangeAC.call(player.playerId, isEquip, arr);
        });
        this.enchantBuffInit(player);
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

    @Decorator.noReply()
    public net_addPetWithMissingInfo(playerId: number, id: number, type?: GlobalEnum.PetGetType, addTime?: number) {
        let atkArr = GameConfig.PetARR.getElement(id).PetAttack;

        let atk: number = 0;
        if (atkArr.length > 1)
            atk = utils.GetRandomNum(atkArr[0], atkArr[1]);
        else
            atk = atkArr[0];
        let nameId = utils.GetRandomNum(1, 200);
        let name = utils.GetUIText(nameId);
        this.addPet(playerId, id, atk, name, type, addTime);
    }

    /**
     * @description: s端购买扭蛋
     * @param cfgId 扭蛋配置id
     * @return
     */
    public async net_buyEgg(cfgId: number): Promise<number | null> {
        let cfg = GameConfig.EggMachine.getElement(cfgId);
        let price = cfg.Price[0];
        if (!price || price === 0) return null;
        const playerId = this.currentPlayerId;
        let res = await ModuleService.getModule(PlayerModuleS).reduceGold(playerId, price, this.judgeGold(cfgId));
        if (res) {
            let petId = this.calcProbability(cfgId);
            this.net_addPetWithMissingInfo(playerId, petId, cfg.AreaID);
            return petId;
        }
        return null;
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
            curWeight[curWeight.length - 1] += (GlobalData.Buff.curSmallLuckyBuff[1] + GlobalData.Buff.curSuperLuckyBuff[1]);
            curWeight[curWeight.length - 2] += (GlobalData.Buff.curSmallLuckyBuff[1] + GlobalData.Buff.curSuperLuckyBuff[1]);
        } else {
            //加后3个
            curWeight[curWeight.length - 1] += (GlobalData.Buff.curSmallLuckyBuff[1] + GlobalData.Buff.curSuperLuckyBuff[1]);
            curWeight[curWeight.length - 2] += (GlobalData.Buff.curSmallLuckyBuff[1] + GlobalData.Buff.curSuperLuckyBuff[1]);
            curWeight[curWeight.length - 3] += (GlobalData.Buff.curSmallLuckyBuff[1] + GlobalData.Buff.curSuperLuckyBuff[1]);
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

    public addPet(playerID: number, id: number, atk: number, name: string, type?: GlobalEnum.PetGetType, addTime?: number) {
        let data = this.getPlayerData(playerID);
        data.addBagItem(id, atk, name, addTime);
        this.taskMS.getPet(Player.getPlayer(playerID), id, type);
        ModuleService.getModule(CollectModuleS).addPet(playerID, id, type);
        this.onGetPetAC.call(type, playerID);

        this.reportMaxAttackPetInfo(playerID, data);
        this.petNotice(playerID, id);
    }

    /**根据id添加宠物 自动计算名字*/
    public addPetById(playerID: number, id: number, type?: GlobalEnum.PetGetType) {
        let atkArr = GameConfig.PetARR.getElement(id).PetAttack;

        let atk: number = 0;
        if (atkArr.length > 1)
            atk = utils.GetRandomNum(atkArr[0], atkArr[1]);
        else
            atk = atkArr[0];

        let nameId = utils.GetRandomNum(1, 200);
        let name = GameConfig.Language.getElement(nameId).Value;
        this.addPet(playerID, id, atk, name, type);
    }

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
        if (tipsType != null)
            this.getAllClient().net_petNotice(playerId, id, tipsType);
    }

    net_deletePet(keys: number[]) {
        this.deletePet(this.currentPlayerId, keys);
    }

    public deletePet(playerId: number, keys: number[]) {
        let data = this.getPlayerData(playerId);

        let delAbleKeys = data.getFilteredDelAbleKeys(keys);
        if (Gtk.isNullOrEmpty(delAbleKeys)) return;

        let unEquipPets: number[] = delAbleKeys
            .filter(element => data.CurFollowPets.includes(element));

        if (!Gtk.isNullOrEmpty(unEquipPets)) data.unEquipPet(unEquipPets);

        data.removeBagItem(keys);
        this.reportMaxAttackPetInfo(playerId, data);

        data.save(true);
        data.BagItemChangeAC.call(false, 1, 1);
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

    addSlot(player: mw.Player = null, num: number = 1) {
        if (player) {
            return this.getPlayerData(player).addPetFollowCount(num);
        }
        return this.currentData.addPetFollowCount(num);
    }

    /**训练 */
    net_trainPet(keys: number[]) {

        for (let i = 0; i < keys.length; i++) {
            const element = keys[i];
            this.currentData.addTrainPet(element);
            this.currentData.removeBagItem([element]);
        }
        this.currentData.save(true);
        this.currentData.PetTrainChangeAC.call();
    }

    net_trainComplete(key: number) {
        let index = this.currentData.trainPet.findIndex(item => {
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
        ModuleService.getModule(PlayerModuleS)
            .renamePet(this.currentPlayerId,
                key,
                id,
                name);
    }

    /**宠物附魔 */
    net_addEnchant(keys: string, enchantIds: string[]) {

        this.currentData.addEnchant(stringToNumberArr(keys), enchantIds);

        this.taskMS.strengthen(this.currentPlayer, GlobalEnum.StrengthenType.Enchant);
        // this.passMS.onTaskUpdateAC.call(this.currentPlayerId, GlobalEnum.VipTaskType.PetEnchant, 1);

        this.enchantNotice(this.currentPlayerId, enchantIds);
    }

    /**公告 */
    private enchantNotice(playerId: number, enchantIds: string[]) {
        let id: number[] = [];
        enchantIds.forEach(ids => {

            stringToNumberArr(ids).forEach(element => {
                if (GlobalData.Notice.enchantBuff.includes(element)) {
                    id.push(element);
                }
            });
        });
        if (id.length > 0)
            this.getAllClient().net_enchantNotice(playerId, id);
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
                if (atk == 0)
                    atk = EnchantBuff.getAtk(arr);
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
            if (index != -1)
                petIds.splice(index, 1);
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
                if (atk == 0)
                    atk = arr[0].p.a * 0.5;
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
        curSelectPets.forEach(item => {
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
        allPetIds.forEach(id => {
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
    public async net_fusePet(curSelectPetKeys: number[],
        earliestObtainTime: number): Promise<boolean> {
        const playerId = this.currentPlayerId;
        const curSelectPets = curSelectPetKeys
            .map(key => this.currentData
                .bagItemsByKey(key))
            .filter(item => item !== undefined);

        if (curSelectPetKeys.length !== curSelectPets.length) {
            Log4Ts.warn(PetBagModuleS,
                `some pet not found.`,
                `player selected: ${curSelectPetKeys}.`,
                `found: ${curSelectPets}.`);
            return false;
        }
        if (!this.playerModuleS.reduceDiamond(GlobalData.Fuse.cost)) return false;

        const data = this.currentData;
        if (curSelectPets.length >= data.CurBagCapacity) return false;

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
        GameConfig
            .PetARR
            .getAllElement()
            .forEach(item => {
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
        let endPetId = this.getPetByAtkWeight(allPetIds, maxSameIdCount);
        mw.Event.dispatchToClient(this.currentPlayer,
            "FUSE_BROADCAST_ACHIEVEMENT_BLEND_TYPE",
            endPetId);

        this.petBagModuleS.deletePet(playerId, curSelectPetKeys);
        this.petBagModuleS
            .net_addPetWithMissingInfo(
                playerId,
                endPetId,
                GlobalEnum.PetGetType.Fusion,
                earliestObtainTime);
        return true;
    }

    /**词条buff初始化 */
    private enchantBuffInit(player: mw.Player) {
        const data = this.getPlayerData(player);
        let keys = data.CurFollowPets;
        for (let id = 0; id < keys.length; id++) {
            EnchantBuff.equipUnPet(player.playerId, keys[id], true);
        }
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
    public async net_fuseDevPet(curSelectPetKeys: number[],
        curPetId: number,
        isGold: boolean): Promise<boolean> {
        const player = this.currentPlayer;
        const playerId = this.currentPlayerId;
        const curSelectPets = curSelectPetKeys
            .map(key => this.currentData
                .bagItemsByKey(key))
            .filter(item => item !== undefined);

        if (curSelectPetKeys.length !== curSelectPets.length) {
            Log4Ts.warn(PetBagModuleS, `some pet not found.`,
                `player selected: ${curSelectPetKeys}.`,
                `found: ${curSelectPets}.`);
            return false;
        }

        if (!curSelectPets?.length) return false;
        let petIds: number[] = curSelectPets.map(item => item.I);
        const { rate, cost } = this.changeFuseDevCost(player, petIds.length, isGold);

        if (!this.playerModuleS.reduceDiamond(cost)) return false;

        //计算最早的获取时间
        let earliestObtainTime = curSelectPets[0].obtainTime;
        curSelectPets.forEach(item => {
            if (item.obtainTime < earliestObtainTime) {
                earliestObtainTime = item.obtainTime;
            }
        });

        let random = MathUtil.randomInt(0, 100);
        const petInfo = GameConfig.PetARR.getElement(curPetId);
        let isSucc: boolean = true;
        let endPetId = isGold ? petInfo.goldID : petInfo.RainBowId;
        this.petBagModuleS.deletePet(playerId, curSelectPetKeys);
        if (random <= rate) {
            // MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_5.Value);
            mw.Event.dispatchToClient(this.currentPlayer, "P_PET_DEV_SHOW_FUSE_MESSAGE", "devFuseSuccess");
            ModuleService.getModule(PetBagModuleS).net_addPetWithMissingInfo(
                this.currentPlayerId,
                endPetId,
                isGold ? GlobalEnum.PetGetType.Love : GlobalEnum.PetGetType.Rainbow,
                earliestObtainTime);
        } else {
            isSucc = false;
            // MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_6.Value);
            mw.Event.dispatchToClient(this.currentPlayer, "P_PET_DEV_SHOW_FUSE_MESSAGE", "devFuseFailed");
        }
        mw.Event.dispatchToClient(this.currentPlayer, "FUSE_BROADCAST_ACHIEVEMENT_CHANGE_TYPE", endPetId, isSucc, petIds);
        return true;
    }

    public reportMaxAttackPetInfo(playerID: number, data: PetBagModuleData) {
        const currRound = data.calRound(Date.now());
        let petKey = data.getMaxAttackPet(currRound);
        if (petKey != 0) {
            let pet = data.bagItemsByKey(petKey);
            let petConfig = GameConfig.PetARR.getElement(pet.I);
            if (petConfig) {
                ModuleService.getModule(AuthModuleS)
                    .reportPetSimulatorRankData(
                        playerID,
                        pet.p.n,
                        petConfig.QualityType,
                        pet.p.a,
                        pet.obtainTime,
                        currRound);
            }
        }
    }
		
    /** 第二世界 —— 宠物附魔 */
    public async net_petEnchant(selectedEnchantIds: number[], selectPetKeys: number[]): Promise<EnchantPetState> {
				let isHasEnchant = false; //是否有附魔
				let isSameEnchant = true; //是否是同一种附魔
				const bagData = this.currentData;
				for (let index = 0; index < selectPetKeys.length; index++) {
						let data = bagData.bagItemsByKey(selectPetKeys[index]);
						if (!data || !data.p) continue;
						isSameEnchant = isSameEnchant && this.isSameEnchant(selectedEnchantIds, data.p.b);

						if (data.p?.b && data.p.b?.length > 0) {
								isHasEnchant = true;
						} else {
								isHasEnchant = false;
								break;
						}
				} 
				if (isHasEnchant) {
						if (isSameEnchant) return EnchantPetState.IS_SAME_ENCHANT;
						return EnchantPetState.IS_HAS_ENCHANT;
				}
				return EnchantPetState.HAS_NO_ENCHANT;
		}

		public async net_enchantConsume(selectPetKeys: number[]): Promise<boolean> {
				return this.playerModuleS.reduceDiamond(selectPetKeys.length * GlobalData.Enchant.diamondCost);
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
}

