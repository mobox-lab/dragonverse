import { MapEx, oTraceError } from "odin";
import { GlobalEnum } from "../../const/Enum";
import { petItemDataNew } from "../PetBag/PetBagModuleData";
import { PetBagModuleS } from "../PetBag/PetBagModuleS";
import { Task_ModuleS } from "../Task/Task_ModuleS";
import PlayerBehavior from "./PlayerBehavior";
import { PlayerModuleC } from "./PlayerModuleC";
import { PlayerModuleData } from "./PlayerModuleData";
import { AreaDivideManager } from "../AreaDivide/AreaDivideManager";
import { GlobalData } from "../../const/GlobalData";
import { GameConfig } from "../../config/GameConfig";
import { AuthModuleS, ConsumeTypes } from "../auth/AuthModule";


export class PlayerModuleS extends ModuleS<PlayerModuleC, PlayerModuleData> {

    /**宠物背包模块 */
    public petBagModule: PetBagModuleS = null;

    protected onStart(): void {
        this.petBagModule = ModuleService.getModule(PetBagModuleS);
        this.petBagModule.onEquipChangeAC.add((playerId, isEquip, petItems) => {
            if (isEquip) {
                this.equipPets(playerId, petItems);
            } else {
                this.unEquipPet(playerId, petItems);
            }
        })
        this.petBagModule.onPetRenameAC.add((playerId, key, id, name) => {
            this.renamePet(playerId, key, id, name);
        });
        this.initScence();
    }
    /**当前游戏中玩家 */
    private gamePlayerBehaviors: Map<string, PlayerBehavior> = new Map<string, PlayerBehavior>();

    public net_enterGame(name: string): void {
        this.playerInit(this.currentPlayer, name);
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        let data = this.getPlayerData(player);
        let total = data.totalLevel;
        this.checkPlayerWealth(player);
        ModuleService.getModule(Task_ModuleS).strengthenCount(player, total);
    }
    /**检查玩家财富埋点 */
    private checkPlayerWealth(player: mw.Player): void {
        let data = this.getPlayerData(player);
        if (MapEx.count(data.buryingPoint) > 0) return;

        data.buryingPoint[GlobalEnum.BuryingPointCoin.FirstWorldGold] = 0;
        data.buryingPoint[GlobalEnum.BuryingPointCoin.SecondWorldGold] = 0;
        data.buryingPoint[GlobalEnum.BuryingPointCoin.Diamond] = 0;
        data.buryingPoint[GlobalEnum.BuryingPointCoin.Star] = 0;

        this.checkCoinCount(data, data.gold, GlobalEnum.BuryingPointCoin.FirstWorldGold);
        this.checkCoinCount(data, data.gold2, GlobalEnum.BuryingPointCoin.SecondWorldGold);
        this.checkCoinCount(data, data.diamond, GlobalEnum.BuryingPointCoin.Diamond);
        // let passData = DataCenterS.getData(player, PassData);
        // this.checkCoinCount(data, passData.starCount, GlobalEnum.BuryingPointCoin.Star);
        data.save(true);

        this.getClient(player).net_sendPoint();
    }
    private checkCoinCount(data: PlayerModuleData, value: number, coinType: GlobalEnum.BuryingPointCoin): void {
        let id = 1;

        while (true) {
            let cfg = GameConfig.Gradient.getElement(id);
            if (!cfg) break;
            let tar: number = 0
            switch (coinType) {
                case GlobalEnum.BuryingPointCoin.FirstWorldGold:
                    tar = cfg.Coinnum_1;
                    break;
                case GlobalEnum.BuryingPointCoin.SecondWorldGold:
                    tar = cfg.Coinnum_2;
                    break;
                case GlobalEnum.BuryingPointCoin.Diamond:
                    tar = cfg.DMnum;
                    break;
                case GlobalEnum.BuryingPointCoin.Star:
                    tar = cfg.PassNum;
                    break;
                default:
                    break;
            }
            if (value >= tar) {
                data.buryingPoint[coinType] = id;
            } else {
                break;
            }
            id++;
        }

    }

    /**设置埋点等级 */
    public net_setPointLevel(id: number, level: number): void {
        this.currentData.buryingPoint[id] = level;
        this.currentData.save(true);
    }

    public net_playerTeleport(id: number): void {
        let guid = this.currentPlayer.character.gameObjectId;
        let be = this.gamePlayerBehaviors.get(guid);
        be.teleport(id);
    }
    public net_setPlaza(isPlaza: boolean): void {
        this.currentData.isPlaza = isPlaza;
        this.currentData.save(false);
    }

    private async playerInit(player: mw.Player, name: string): Promise<void> {
        let be = await this.playerCreateBehavirs(player.character.gameObjectId);
        if (!name) name = "三七"
        be.nickName = name;
        let petIds = this.petBagModule.getPlayerCurEquipPets(player.playerId);
        petIds.forEach(petItem => {
            be.equipPet(petItem.k + "_" + petItem.I, petItem.p.a, petItem.p.n);
        })
    }

    /**升级 */
    public net_levelUp(id: number): void {
        ModuleService.getModule(Task_ModuleS).strengthen(this.currentPlayer, GlobalEnum.StrengthenType.LevelUp);
        this.currentData.levelUp(id);

        this.levelUpNotice(this.currentPlayerId);
    }
    /**升级公告 */
    public levelUpNotice(playerId: number) {

        let count = this.currentData.totalLevel;

        if (GlobalData.Notice.levelUpTipsCount.includes(count)) {
            this.getAllClient().net_levelNotice(playerId, count);
        }
    }

    protected onPlayerLeft(player: mw.Player): void {
        try {
            let areaId = AreaDivideManager.instance.checkPointInArea(player.character.worldTransform.position)
            this.getPlayerData(player).playerQuitLoc = areaId;
            this.getPlayerData(player).save(false);

            let guid = player.character.gameObjectId;
            let be = this.gamePlayerBehaviors.get(guid);
            if (be) {
                be.destroy();
                this.gamePlayerBehaviors.delete(guid);
            }
        } catch (error) {
            oTraceError(error);
        }
    }

    /*
    * 生成玩家行为脚本 
    * - 自定义参数需要设置默认参数，外部调用时不需要传入
   */
    private async playerCreateBehavirs(guid: string, ...args: any[]): Promise<PlayerBehavior> {
        let be = await mw.Script.spawnScript<PlayerBehavior>(PlayerBehavior, true);
        this.gamePlayerBehaviors.set(guid, be);
        be.initServer(guid, ...args);
        return be;
    }

    /**获取当前玩家行为脚本 */
    public getPlayerBehavior(player: mw.Player): PlayerBehavior {
        let guid = player.character.gameObjectId;
        return this.gamePlayerBehaviors.get(guid);
    }

    async initScence() {

    }

    private renamePet(playerId: number, key: number, id: number, name: string): void {
        let guid = Player.getPlayer(playerId).character.gameObjectId;
        let be = this.gamePlayerBehaviors.get(guid);
        be.renamePet(key, id, name);
    }

    public equipPets(playerId: number, petItems: petItemDataNew[]): boolean {
        if (petItems.length == 0) return false;
        if (petItems.length == 1) {
            return this.net_equipPet(playerId, petItems[0].k, petItems[0].I, petItems[0].p.a, petItems[0].p.n);
        }
        let guid = Player.getPlayer(playerId).character.gameObjectId;
        let be = this.gamePlayerBehaviors.get(guid);
        be.equipPets(petItems);
    }

    /**使用机器 */
    public net_useMachine(isLove: boolean): void {
        let taskModule = ModuleService.getModule(Task_ModuleS);
        taskModule.strengthen(this.currentPlayer, isLove ? GlobalEnum.StrengthenType.Love : GlobalEnum.StrengthenType.Rainbow);
    }

    /**装备当前宠物 */
    public net_equipPet(playerId: number, key: number, id: number, atk: number, name: string): boolean {
        let guid = Player.getPlayer(playerId).character.gameObjectId;
        let be = this.gamePlayerBehaviors.get(guid);
        let nKey = key + "_" + id;
        return be.equipPet(nKey, atk, name);
    }

    /**销毁所有宠物 */
    public net_destroyAllPet(): void {
        let guid = this.currentPlayer.character.gameObjectId;
        let be = this.gamePlayerBehaviors.get(guid);
        be.destroyAllPet();
    }

    /**取消装备当前宠物 */
    public unEquipPet(playerId: number, petItems: petItemDataNew[]): void {
        let guid = Player.getPlayer(playerId).character.gameObjectId;
        let be = this.gamePlayerBehaviors.get(guid);
        be.unEquipPets(petItems);
    }

    /**增加金币和钻石 */
    public net_addGoldAndDiamond(gold1: number, gold2: number, gold3: number, diamond: number): void {
        let data = this.currentData;
        if (gold1 > 0) data.addGold(gold1, GlobalEnum.CoinType.FirstWorldGold);
        if (gold2 > 0) data.addGold(gold2, GlobalEnum.CoinType.SecondWorldGold);
        if (gold3 > 0) data.addGold(gold3, GlobalEnum.CoinType.ThirdWorldGold);
        if (diamond > 0) data.addDiamond(diamond);
    }

    /**增加金币 */
    public net_addGold(value: number, coinType: GlobalEnum.CoinType): void {
        this.currentData.addGold(value, coinType);
    }

    public async net_buyDollCoin(configId: number): Promise<boolean> {
        let config = GameConfig.GoodsTable.getElement(configId);
        if (!config) return false;
        let playerId = this.currentPlayerId;
        let res = await ModuleService.getModule(AuthModuleS).pay(this.currentPlayerId, config.price,ConsumeTypes.DollMachine);
        if (res) {
            this.getPlayerData(playerId).addGold(config.buyCount, GlobalEnum.CoinType.SummerGold);
            return true;
        } else {
            return false;
        }

    }

    /**增加钻石 */
    public net_addDiamond(value: number, player: mw.Player = null): void {
        if (!player) {
            this.currentData.addDiamond(value);
            return;
        }
        let data = this.getPlayerData(player);
        data.addDiamond(value);
    }

    /**减少金币 */
    public net_reduceGold(value: number, coinType: GlobalEnum.CoinType): boolean {
        return this.currentData.reduceGold(value, coinType);
    }

    /**减少钻石 */
    public net_reduceDiamond(value: number): boolean {
        return this.currentData.reduceDiamond(value);
    }

    public addGold(playerId: number, value: number, coinType: GlobalEnum.CoinType): void {
        let data = this.getPlayerData(playerId);
        data.addGold(value, coinType);
    }
    public addDiamond(playerId: number, value: number): void {
        let data = this.getPlayerData(playerId);
        data.addDiamond(value);
    }



    /**装卸滑板 */
    public net_skateboard(): boolean {
        let guid = this.currentPlayer.character.gameObjectId;
        let be = this.gamePlayerBehaviors.get(guid);
        return be.changeSkateboard();
    }

    /**通过id获取玩家name */
    public net_getPlayerNameById(id: number) {
        this.getClient(id).net_getPlayerName();
    }
}