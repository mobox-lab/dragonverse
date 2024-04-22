import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import { oTraceError } from "../../util/LogManager";
import { stringToNumberArr, utils } from "../../util/uitls";
import { CollectModuleS } from "../PetCollect/CollectModuleS";
import { Task_ModuleS } from "../Task/Task_ModuleS";
import { petInfo } from "../Trading/TradingScript";
import { AuthModuleS } from "../auth/AuthModule";
import { PetBagModuleC } from "./PetBagModuleC";
import { PetBagModuleData, petItemDataNew } from "./PetBagModuleData";


export class PetBagModuleS extends ModuleS<PetBagModuleC, PetBagModuleData> {

    /**玩家id、 true:装备 false: 卸下 、宠物数据*/
    public onEquipChangeAC: Action3<number, boolean, petItemDataNew[]> = new Action3();

    /**改名事件 playerId、key、id、name  */
    public onPetRenameAC: Action = new Action();
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

    net_addPet(id: number, atk: number, name: string, type?: GlobalEnum.PetGetType, addTime?: number) {
        this.addPet(this.currentPlayerId, id, atk, name, type, addTime);
    }


    public addPet(playerID: number, id: number, atk: number, name: string, type?: GlobalEnum.PetGetType, addTime?: number) {
        let data = this.getPlayerData(playerID);
        data.addBagItem(id, atk, name, addTime);
        this.taskMS.getPet(Player.getPlayer(playerID), id, type);
        ModuleService.getModule(CollectModuleS).addPet(playerID, id, type);
        this.onGetPetAC.call(type, playerID);
        //找到最高的战力
        const currRound = data.calRound(Date.now());
        let petKey = data.getMaxAttackPet(currRound);
        if (petKey != 0) {
            let pet = data.bagItemsByKey(petKey);
            let petConfig = GameConfig.PetARR.getElement(pet.I);
            if (petConfig) {
                ModuleService.getModule(AuthModuleS).reportPetRankData(playerID, pet.p.n, petConfig.QualityType, pet.p.a, pet.obtainTime, currRound);
            }
        }

        // if (type > 1000) {
        //     //扭蛋
        //     this.passMS.onTaskUpdateAC.call(playerID, GlobalEnum.VipTaskType.OpenEgg, 1);
        // } else if (type == GlobalEnum.PetGetType.Fusion) {
        //     this.passMS.onTaskUpdateAC.call(playerID, GlobalEnum.VipTaskType.PetFusion, 1);
        // } else if (type == GlobalEnum.PetGetType.Love) {
        //     this.passMS.onTaskUpdateAC.call(playerID, GlobalEnum.VipTaskType.LovePet, 1);
        // } else if (type == GlobalEnum.PetGetType.Rainbow) {
        //     this.passMS.onTaskUpdateAC.call(playerID, GlobalEnum.VipTaskType.RainbowPet, 1);
        // }

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

    /**删除\添加宠物  交易用*/
    public deleteAddPet(playerID: number, delPets: number[], addPets: petInfo[]) {
        let data = this.getPlayerData(playerID);

        let unEquipPets: number[] = [];
        for (let i = 0; i < delPets.length; i++) {
            const element = delPets[i];
            if (data.CurFollowPets.includes(element)) {
                unEquipPets.push(element);
            }
        }
        data.unEquipPet(unEquipPets);
        data.removeBagItem(delPets);

        for (let i = 0; i < addPets.length; i++) {
            const element = addPets[i];
            let isSuccess = this.getPlayerData(playerID).addBagItemByTrade(element.id, element.attack, "Trade");
            if (!isSuccess) break;
        }
        this.getPlayerData(playerID).save(true);
        if (addPets.length > 0)
            this.getPlayerData(playerID).BagItemChangeAC.call(true, 1, 1);
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

        let unEquipPets: number[] = [];
        for (let i = 0; i < keys.length; i++) {
            const element = keys[i];
            if (data.CurFollowPets.includes(element)) {
                unEquipPets.push(element);
            }
        }
        if (unEquipPets.length > 0) {
            data.unEquipPet(unEquipPets);
        }
        data.removeBagItem(keys);

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

    net_addBagCapacity(count: number, player: mw.Player = null) {
        if (player) {
            return this.getPlayerData(player).addCapacity(count);
        }
        this.currentData.addCapacity(count);
    }

    net_addSlot(player: mw.Player = null, num: number = 1) {
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
        let id = this.currentData.bagItemsByKey(key).I;
        this.onPetRenameAC.call(this.currentPlayerId, key, id, name);
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

    /**宠物更改攻击力 */
    net_changeAtk(keys: string, atk: number) {
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
        let petKey = this.currentData.getMaxAttackPet(1);
        if (petKey != 0) {
            let pet = this.currentData.bagItemsByKey(petKey);
            let petConfig = GameConfig.PetARR.getElement(pet.I);
            if (petConfig) {
                const currRound = this.currentData.calRound(Date.now());
                ModuleService.getModule(AuthModuleS).reportPetRankData(this.currentPlayerId, pet.p.n, petConfig.DevType, pet.p.a, pet.obtainTime, currRound);
            }
        }

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

}