import { MapEx, oTraceError } from "odin";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import { utils } from "../../util/uitls";
import { AreaDivideManager } from "../AreaDivide/AreaDivideManager";
import { EnchantBuff } from "../PetBag/EnchantBuff";
import { petItemDataNew } from "../PetBag/PetBagModuleData";
import { PetBagModuleS } from "../PetBag/PetBagModuleS";
import PsStatisticModuleData, { StatisticModuleS } from "../statistic/StatisticModule";
import { Task_ModuleS } from "../Task/Task_ModuleS";
import PlayerBehavior from "./PlayerBehavior";
import { PlayerModuleC } from "./PlayerModuleC";
import { PetSimulatorPlayerModuleData } from "./PlayerModuleData";

export class PlayerModuleS extends ModuleS<PlayerModuleC, PetSimulatorPlayerModuleData> {

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

    private checkCoinCount(data: PetSimulatorPlayerModuleData, value: number, coinType: GlobalEnum.BuryingPointCoin): void {
        let id = 1;

        while (true) {
            let cfg = GameConfig.Gradient.getElement(id);
            if (!cfg) break;
            let tar: number = 0;
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
        if (!name) name = "三七";
        be.nickName = name;
        const data = this.getPlayerData(player);
        if (!data) return;
        GlobalData.LevelUp.initPlayer(player.playerId, data.levelData);
        let petIds = this.petBagModule.getPlayerCurEquipPets(player.playerId);
        petIds.forEach(petItem => {
            be.equipPet(petItem.k + "_" + petItem.I, petItem.p.a, petItem.p.n);
        });
    }

    /**升级 */
    public async net_levelUp(id: number): Promise<boolean> {
        const cfg = GameConfig.Upgrade.getElement(id + 1);
        if (!cfg) return false;
        const userId = this.currentPlayer?.userId ?? '';
		const playerId = this.currentPlayerId;
        const curLevel = this.currentData.getLevelData(id) ?? 0;
        const cost = cfg.Diamond[curLevel] ?? 0;
        if (!this.currentData.reduceDiamond(cost, true, playerId)) return false;

        ModuleService.getModule(Task_ModuleS).strengthen(this.currentPlayer, GlobalEnum.StrengthenType.LevelUp);
        this.currentData.levelUp(id);

        const config = GameConfig.Upgrade.getAllElement()[id];
        const upgrade = config?.Upgradenum[this.currentData.getLevelData(id) - 1 ?? 0] ?? 0;
        switch (id) {
            case 0:
                GlobalData.LevelUp.levelRangeMap.set(playerId, 1 + upgrade);
                break;
            case 1:
                GlobalData.LevelUp.moreDiamondMap.set(playerId, 1 + upgrade);
                break;
            case 2:
                GlobalData.LevelUp.petDamageMap.set(playerId, 1 + upgrade);
                break;
            case 3:
                GlobalData.LevelUp.petAttackSpeedMap.set(playerId, 1 + upgrade);
                break;
            case 4:
                ModuleService.getModule(PetBagModuleS).addBagCapacity(playerId, config?.PetNum[curLevel] ?? 0);
                break;
        }

        this.levelUpNotice(playerId);
        ModuleService.getModule(StatisticModuleS).recordLevelConsume(cost, userId);
        const sData = DataCenterS.getData(userId, PsStatisticModuleData);
        const { levelCnt = 0 } = sData?.totalStatisticData ?? {};
        utils.logP12Info("P_Upgrade", {
            userId,
            timestamp: Date.now(),
            coinType: GlobalEnum.CoinType.Diamond,
            cost,
            cfgId: cfg.id,
            level: curLevel + 1,
            upgradeCount: levelCnt + 1,// 赛季总升级次数
        });
        sData.recordTotalData({ levelCnt: levelCnt + 1 });
        return true;
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
            let areaId = AreaDivideManager.instance.checkPointInArea(player.character.worldTransform.position);
            this.getPlayerData(player).playerQuitLoc = areaId;
            this.getPlayerData(player).save(false);

            let guid = player.character.gameObjectId;
            let be = this.gamePlayerBehaviors.get(guid);
            if (be) {
                be.destroy();
                this.gamePlayerBehaviors.delete(guid);
            }

            GlobalData.SceneResource.clearPlayer(player.playerId);
            GlobalData.Buff.clearPlayer(player.playerId);
            EnchantBuff.clearPlayerBuff(player.playerId);
            GlobalData.Enchant.clearPlayer(player.playerId);
            GlobalData.LevelUp.clearPlayer(player.playerId);
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

    public renamePet(playerId: number, key: number, id: number, name: string): void {
        let guid = Player.getPlayer(playerId).character.gameObjectId;
        let be = this.gamePlayerBehaviors.get(guid);
        be.renamePet(key, id, name);
    }

    public equipPets(playerId: number, petItems: petItemDataNew[]): boolean {
        if (petItems.length == 0) return false;
        if (petItems.length == 1) {
            return this.equipPet(playerId, petItems[0].k, petItems[0].I, petItems[0].p.a, petItems[0].p.n);
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
    public equipPet(playerId: number, key: number, id: number, atk: number, name: string): boolean {
        let guid = Player.getPlayer(playerId).character.gameObjectId;
        let be = this.gamePlayerBehaviors.get(guid);
        let nKey = key + "_" + id;
        return be.equipPet(nKey, atk, name);
    }

    // /**销毁所有宠物 */
    // public net_destroyAllPet(): void {
    //     let guid = this.currentPlayer.character.gameObjectId;
    //     let be = this.gamePlayerBehaviors.get(guid);
    //     be.destroyAllPet();
    // }

    /**取消装备当前宠物 */
    public unEquipPet(playerId: number, petItems: petItemDataNew[]): void {
        let guid = Player.getPlayer(playerId).character.gameObjectId;
        let be = this.gamePlayerBehaviors.get(guid);
        be.unEquipPets(petItems);
    }

    public absorbAll(gold1: number, gold2: number, gold3: number, diamond: number) {
        let data = this.currentData;
        const playerId = this.currentPlayerId;
        if (gold1 > 0) data.addGold(gold1, GlobalEnum.CoinType.FirstWorldGold, true, playerId);
        if (gold2 > 0) data.addGold(gold2, GlobalEnum.CoinType.SecondWorldGold, true, playerId);
        if (gold3 > 0) data.addGold(gold3, GlobalEnum.CoinType.ThirdWorldGold, true, playerId);
        if (diamond > 0) data.addDiamond(diamond, true, playerId);
    }

    // /**增加金币 */
    // public net_addGold(value: number, coinType: GlobalEnum.CoinType): void {
    //     this.currentData.addGold(value, coinType);
    // }

    public async net_buyDollCoin(configId: number): Promise<boolean> {
        // let config = GameConfig.GoodsTable.getElement(configId);
        // if (!config) return false;
        // let playerId = this.currentPlayerId;
        // let res = await ModuleService.getModule(AuthModuleS).pay(this.currentPlayerId, config.price, ConsumeTypes.DollMachine);
        // if (res) {
        //     this.getPlayerData(playerId).addGold(config.buyCount, GlobalEnum.CoinType.SummerGold);
        //     return true;
        // } else {
        //     return false;
        // }

        return false;

    }

    public async net_buyWorld(cfgID: number): Promise<boolean> {
        let coinType = GlobalEnum.CoinType;

        let goldType = coinType.FirstWorldGold;

        if (cfgID < 2000) {
            goldType = coinType.FirstWorldGold;
        } else if (cfgID < 3000) {
            goldType = coinType.SecondWorldGold;
        } else if (cfgID < 4000) {
            goldType = coinType.ThirdWorldGold;
        }
        const cfg = GameConfig.AreaDivide.getElement(cfgID);
		const playerId = this.currentPlayerId;
		const userId = this.currentPlayer?.userId ?? "";
        
        const sData = DataCenterS.getData(userId, PsStatisticModuleData);
        const { unlockAreaCount = 0 } = sData?.totalStatisticData ?? {};

        utils.logP12Info("P_UnlockArea", {
            userId,
            timestamp: Date.now(),
            coinType: goldType,
            cost: cfg.Gold,
            areaId: cfg.id,
            unlockAreaCount: unlockAreaCount + 1,
        })
        sData.recordTotalData({unlockAreaCount: unlockAreaCount + 1});

        return this.currentData.reduceGold(cfg.Gold, goldType, true, playerId);
    }

    public async randomDiamond(playerId: number): Promise<number> {
        let count = MathUtil.randomInt(GlobalData.Enchant.randomDiamondNum[0], GlobalData.Enchant.randomDiamondNum[1] + 1);
        const data = this.getPlayerData(playerId);
        await data.addDiamond(count, true, playerId);
        return count;
    }

    /**减少金币 */
    public reduceGold(playerId: number, value: number, coinType: GlobalEnum.CoinType): boolean {
        if (!playerId) return false;
        const data = DataCenterS.getData(playerId, PetSimulatorPlayerModuleData);
        return data.reduceGold(value, coinType, true, playerId);
    }

    /**减少钻石 */
    public reduceDiamond(value: number, playerId: number): boolean {
        return this.currentData.reduceDiamond(value, true, playerId);
    }

    public addGold(playerId: number, value: number, coinType: GlobalEnum.CoinType): void {
        let data = this.getPlayerData(playerId);
        data.addGold(value, coinType, true, playerId);
    }

    public addDiamond(playerId: number, value: number): void {
        let data = this.getPlayerData(playerId);
        data.addDiamond(value, true, playerId);
    }

    /**装卸滑板 */
    public net_skateboard(): boolean {
        let guid = this.currentPlayer.character.gameObjectId;
        let be = this.gamePlayerBehaviors.get(guid);
        return be.changeSkateboard();
    }

    /**通过id获取玩家name */
    public async net_getPlayerNameById(id: number): Promise<string> {
        return await this.getClient(id).net_getPlayerName();
    }

    /**装卸滑板 */
    public getPetArr(player?: mw.Player) {
        if (!player) return null;
        return this.getPlayerBehavior(player).PetArr;
    }

    /** GM 测试用 */
    public clearDiamondAndGold(playerId: number) {
        const data = DataCenterS.getData(playerId, PetSimulatorPlayerModuleData);
        return data.clearDiamondAndGold(playerId);
    }

    /**
     * GM 测试用 清空升级数据
     */
    public gmClearLevelUp(playerId: number) {
        const data = DataCenterS.getData(playerId, PetSimulatorPlayerModuleData);
        return data.clearLevelUp();
    }
}