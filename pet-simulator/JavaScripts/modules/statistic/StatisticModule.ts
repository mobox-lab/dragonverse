import { GlobalEnum } from "../../const/Enum";
import GameServiceConfig from "../../const/GameServiceConfig";
import { JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";
import Log4Ts from "mw-log4ts";
import Gtk, { GtkTypes, NoOverride, Regulator } from "gtoolkit";
import { EnergyModuleS } from "../Energy/EnergyModule";
import { CreSourceStr, PSStatisticPetKey, PetBagModuleData, petItemDataNew } from "../PetBag/PetBagModuleData";
import { PetSimulatorPlayerModuleData } from "../Player/PlayerModuleData";
import AuthModuleData, { AuthModuleS, PetSimulatorStatisticNeedFill, PetSimulatorStatisticPetObj } from "../auth/AuthModule";
import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import { utils } from "../../util/uitls";

/** 一次上下线期间用户行为记录 */
type PlayerConsumeData = {
    diamondAdd: number; // 钻石总获取
    diamondRed: number; // 钻石总消耗
    gold_1_add: number; // 世界1金币总获取
    gold_1_red: number; // 世界1金币总消耗
    gold_2_add: number; // 世界2金币总获取
    gold_2_red: number; // 世界2金币总消耗
    gold_3_add: number; // 世界3金币总获取
    gold_3_red: number; // 世界3金币总消耗
    staPotAdd: number; // 体力药水增加体力
    staPotCnt: number; // 体力药水使用次数
    petAdd: number; // 本次增加宠物数量

    levelDiaRed: number;    // 升级台消耗钻石数量
    levelCnt: number;       // 升级台次数
    fuseDiaRed: number;      // 合成台消耗钻石数量
    fuseCnt: number;         // 合成台次数
    enchantDiaRed: number;   // 附魔台消耗钻石数量
    enchantCnt: number;      // 附魔台次数
    loveDiaRed: number;      // 爱心化台消耗钻石数量
    loveCnt: number;         // 爱心化台次数
    rainbowDiaRed: number;   // 彩虹化台消耗钻石数量
    rainbowCnt: number;      // 彩虹化台次数
}
// 赛季总统计 - 持久化 log用
type PersistTotalStatisticData = {
    hatchCnt?: number; // 赛季总买蛋次数（一次可以买多个蛋）
    eggCnt?: number; // 赛季总孵化次数
    fuseCnt?: number; // 赛季总合成次数
    fuseCostPetNum?: number; // 赛季合成时总消耗宠物数量
    loveCnt?: number; // 赛季总爱心化次数
    loveCostPetNum?: number; // 赛季爱心化时总消耗宠物数量
    rainbowCnt?: number; // 赛季总彩虹化次数
    rainbowCostPetNum?: number; // 赛季彩虹化时总消耗宠物数量
    levelCnt?: number; // 赛季总升级次数
    enchantCnt?: number; // 赛季总附魔次数
    achievementCnt?: number; // 赛季总成就完成次数
    onlineRewardCount?: number; // 赛季总领取在线奖励次数
    unlockAreaCount?: number; // 赛季总解锁关卡次数
    unlockPortalCount?: number; // 赛季总解锁传送门次数
}
export default class PsStatisticModuleData extends JModuleData {
    //@Decorator.persistence()
    //public isSave: bool;
    /**
     * 玩家进入游戏计数. 
     * @type {number}
     */
    @Decorator.persistence()
    playerEnteredCounterS: number = 0;

    /**
     * 玩家游戏时长. ms
     * @type {number}
     */
    @Decorator.persistence()
    playerElapsedTimeS: number = 0;

    /**
     * 玩家登录记录. ms
     * [进入时间, 离开时间].
     * @type {[number, number][]}
     */
    @Decorator.persistence()
    playerLoginRecord: [number, number][] = [];

    @Decorator.persistence()
    totalStatisticData: PersistTotalStatisticData = {};
    /**
     * 上次登录时间. ms
     * @return {number}
     */
    public get playerLastEnteredTime(): number {
        return this.playerLoginRecord[0][0];
    }
    /**
     * 本次游玩时长. ms
     * @return {number}
     */
    public get playerLastedPlayTime(): number {
        return (this.playerLoginRecord[0][1] ?? Date.now()) - this.playerLoginRecord[0][0];
    }

    /**
     * 总游玩时长. ms
     * @return {number}
     */
    public get playerTotalOnlineTime(): number {
        return this.playerElapsedTimeS + (this.playerLoginRecord[0][1] === undefined ? this.playerLastedPlayTime : 0);
    }

    /**
     * 获取今日总在线时长. ms
     * @return {number}
     */
    public get playerTodayOnlineTime(): number {
        const now = Date.now();
        let todayCounter = 0;
        for (let i = 0; i < this.playerLoginRecord.length; ++i) {
            const [enter, leave] = this.playerLoginRecord[i];
            if (i === 0 && Gtk.isNullOrUndefined(leave)) continue;

            if (!Gtk.isSameTime(leave, now, GtkTypes.Tf.D)) break;

            if (Gtk.isSameTime(enter, now, GtkTypes.Tf.D)) {
                todayCounter = todayCounter + (leave ?? now) - enter;
            } else {
                todayCounter = todayCounter + (leave ?? now) - new Date().setHours(0, 0, 0, 0);
                break;
            }
        }
        return todayCounter;
    }
    protected onJDataInit() {
        if(!this.totalStatisticData) this.totalStatisticData = {};
    }
 
    public recordEnter(now: number) {
        ++this.playerEnteredCounterS;
        const records = this.playerLoginRecord;
        if (!records?.length) {
            records.unshift([now, undefined]);
            return;
        }
        const [_, lastLeave] = records[0];
        if (Gtk.isNullOrUndefined(lastLeave)) records[0][1] = now; // 若上次没记录到 leave 数据则补数据
        records.unshift([now, undefined]);
    }
    public recordLeave(now: number) {
        this.playerLoginRecord[0][1] = now;
        this.playerElapsedTimeS += this.playerLastedPlayTime;
        while (this.playerLoginRecord.length > GameServiceConfig.MAX_LOGIN_RECORD_STATISTIC_COUNT) {
            this.playerLoginRecord.pop();
        }
        this.save(false);
    }

    public recordTotalData(data: PersistTotalStatisticData) {
        Object.assign(this.totalStatisticData, data);
        this.save(false);
    }
    // /**
    //  * 疑似作弊原因.
    //  * @type {string[]}
    //  */
    // @Decorator.persistence()
    // maybeCheatingReason: string[] = [];
}

interface PlayerIntervalData {
    elapsedTime: number;
}

/**
 * Statistic Module 全局玩家统计模块.
 *
 * @desc # Statistic Module
 * @desc
 * @desc ## 统计字段规范
 * @desc
 * @desc 统计字段的来源可能是 客户端 C 、服务端 S 或 双端 CS.
 * @desc
 * @desc - **客户端 C** 仅在客户端 C 影响存储. 禁止敏感数据.
 * @desc - **服务端 S** 仅在客户端 S 影响存储. 允许敏感数据
 * @desc - **双端 CS** 取劣值的值影响存储. 允许敏感数据
 * @desc      - 劣质：取作弊时不会倾向于修改的方向的值.
 * @desc ---
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
export class StatisticModuleC extends JModuleC<StatisticModuleS, PsStatisticModuleData> {
    //#region Member
    private _eventListeners: EventListener[] = [];

    private _elapsedTime: number = 0;

    private _autoReportRegulator = new Regulator(GtkTypes.Interval.PerMin * 5);
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();

        //#region Inner Member init
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onJStart(): void {
        //#region Member init
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
        //#region Event Subscribe
        // this._eventListeners.push(Event.addLocalListener(EventDefine.EVENT_NAME, CALLBACK));
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
        this._elapsedTime += dt;

        if (this._autoReportRegulator.request()) {
            this.reportPlayerDataInterval();
        }
    }

    protected onEnterScene(sceneType: number): void {
        super.onEnterScene(sceneType);

        const now = Date.now();
        this.data.recordEnter(now);
    }

    protected onDestroy(): void {
        super.onDestroy();
        //#region Event Unsubscribe
        this._eventListeners.forEach((value) => value.disconnect());
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Method

    public getPlayerData(): PsStatisticModuleData {
        return super.data;
    }

    private reportPlayerDataInterval() {
        this.server.net_reportPlayerDataInterval({elapsedTime: this._elapsedTime});
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class StatisticModuleS extends JModuleS<StatisticModuleC, PsStatisticModuleData> {
    public destroyPetsMap: { [userId: string]: { [key: number]: PetSimulatorStatisticPetObj } } = {};
    /** 消费统计数据 */
    private _playerConsumeStatistics: Map<string, PlayerConsumeData> = new Map();

    //#region Member
    private _eventListeners: EventListener[] = [];
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onJStart(): void {
        //#region Member init
        //#endregion ------------------------------------------------------------------------------------------
        //#region Event Subscribe
        // this._eventListeners.push(Event.addLocalListener(EventDefine.EVENT_NAME, CALLBACK));
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    protected onDestroy(): void {
        super.onDestroy();
        //#region Event Unsubscribe
        this._eventListeners.forEach((value) => value.disconnect());
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

    protected onPlayerJoined(player: Player): void {
        super.onPlayerJoined(player);
        const d = DataCenterS.getData(player, PetBagModuleData)
        console.log(d.CurBagCapacity); // 触发 PetBag 的 onDataInit
    }

    public getPlayerConsumeRecord(userId: string) {
        if(!userId) return;
        if(!this._playerConsumeStatistics.has(userId)) {
            this.resetConsumeRecord(userId);
        }
        return this._playerConsumeStatistics.get(userId);
    }

    public resetConsumeRecord(userId: string) {
        if(!userId) return;
        this._playerConsumeStatistics.set(userId, {
            diamondAdd: 0,
            diamondRed: 0,
            gold_1_add: 0,
            gold_1_red: 0,
            gold_2_add: 0,
            gold_2_red: 0,
            gold_3_add: 0,
            gold_3_red: 0,
            staPotAdd: 0,
            staPotCnt: 0,
            petAdd: 0,
            levelDiaRed: 0,
            levelCnt: 0,
            fuseDiaRed: 0,
            fuseCnt: 0,
            enchantDiaRed: 0,
            enchantCnt: 0,
            loveDiaRed: 0,
            loveCnt: 0,
            rainbowDiaRed: 0,
            rainbowCnt: 0,
        });
    }

    public addPlayerConsumeData(userId: string, key: keyof PlayerConsumeData, val: number) {
        const consumeData = this.getPlayerConsumeRecord(userId);
        consumeData[key] += val;
    }

    public recordConsume(coinType: GlobalEnum.CoinType, value: number, userId: string) {
        Log4Ts.log(PsStatisticModuleData, `record consume. type: ${coinType}. value: ${value} userId: ${userId} #record_consume`);
        const isAdd = value > 0;
        const val = Math.abs(value);
        let key: keyof PlayerConsumeData = "diamondAdd"; 
        switch (coinType) {
            case GlobalEnum.CoinType.Diamond:
                isAdd ? key = "diamondAdd": key = "diamondRed";
                break;
            case GlobalEnum.CoinType.FirstWorldGold:
                isAdd ? key = "gold_1_add" : key = "gold_1_red";
                break;
            case GlobalEnum.CoinType.SecondWorldGold:
                isAdd ? key = "gold_2_add" : key = "gold_2_red";
                break;
            case GlobalEnum.CoinType.ThirdWorldGold:
                isAdd ? key = "gold_3_add" : key = "gold_3_red";
                break;
            default:
                break;
        }
        this.addPlayerConsumeData(userId, key, val)
    }

    public recordAddPet(userId: string) {
        this.addPlayerConsumeData(userId, "petAdd", 1);
    }

    public recordStaPotConsume(val: number, userId: string) {
        this.addPlayerConsumeData(userId, "staPotAdd", val);
        this.addPlayerConsumeData(userId, "staPotCnt", 1);
    }

    public recordLevelConsume(costDiamond: number, userId: string) {
        this.addPlayerConsumeData(userId, "levelCnt", 1);
        this.addPlayerConsumeData(userId, "levelDiaRed", costDiamond);
    }

    public recordFuseConsume(costDiamond: number, userId: string, type: "fuse" | "rainbow" | "love") {
        let cntKey: keyof PlayerConsumeData = "fuseCnt";
        let redKey: keyof PlayerConsumeData = "fuseDiaRed";
        if(type === "rainbow") {
            cntKey = "rainbowCnt";
            redKey = "rainbowDiaRed";
        } else if(type === "love") {
            cntKey = "loveCnt";
            redKey = "loveDiaRed";
        }
        this.addPlayerConsumeData(userId, cntKey, 1);
        this.addPlayerConsumeData(userId, redKey, costDiamond);
    }

    public recordEnchantConsume(costDiamond: number, userId: string) {
        this.addPlayerConsumeData(userId, "enchantCnt", 1);
        this.addPlayerConsumeData(userId, "enchantDiaRed", costDiamond);
    }

    protected onPlayerEnterGame(player: Player): void {
        super.onPlayerEnterGame(player);
        // const petStatisticData = DataCenterS.getData(player, PsStatisticModuleData)
        // petStatisticData.resetConsumeData()
        const now = Date.now();
        const d = this.getPlayerData(player);
        this.resetConsumeRecord(player?.userId);
        d.recordEnter(now);
        d.save(false);
    }
    public getPetMaxInfo(pets: petItemDataNew[]) {
        const emptyData = { petMax: 0, petMaxEnchanted: "", petMaxEnchantScore: 0, totalScore: 0 };
        if(!pets?.length) return emptyData;
        let petMax = 0;
        let petMaxEnchantScore = 0;
        let petMaxEnchanted = "";
        for (const pet of pets) {
            if (pet.p.a > petMax) {
                petMax = pet.p.a;
                const { score } = this.getStatisticEnchantedInfo(pet);
                petMaxEnchantScore = score;
                petMaxEnchanted = score > 0 ? pet.p.b.join(',') : "";
            } else if (pet.p.a === petMax) {
                const { score } = this.getStatisticEnchantedInfo(pet);
                if(score > petMaxEnchantScore) {
                    petMaxEnchantScore = score;
                    petMax = pet.p.a;
                    petMaxEnchanted = score > 0 ? pet.p.b.join(',') : "";
                }
            }
        }
        return { petMax, petMaxEnchanted, petMaxEnchantScore, totalScore: petMax + petMaxEnchantScore }
    }
    public shouldReportPsStatistic(userId: string) {
        try {
            const petBagData = DataCenterS.getData(userId, PetBagModuleData);
            const curPets = petBagData.PetStatisticArr ?? [];
            const destroyPets = Object.values(this.destroyPetsMap?.[userId] || {});
            const totalLen = (curPets?.length ?? 0) + (destroyPets?.length ?? 0);
            if(totalLen <= GlobalData.Statistic.petArrMaxLength) return; // 未达到上限，不需要上报
            const player = Player.getPlayer(userId);
            const petStatistics: PetSimulatorStatisticPetObj[] = curPets.map((p) => {
                const petInfo = petBagData.bagItemsByKey(p[PSStatisticPetKey.petKey])
                const info: PetSimulatorStatisticPetObj = {
                    petkey: p[PSStatisticPetKey.petKey],
                    proId: petInfo.I,
                    name: petInfo.p.n,
                    attack: petInfo.p.a,
                    enchanted: this.getStatisticEnchantedInfo(petInfo).enchanted,
                    status: "exist",
                    creSource: CreSourceStr[p[PSStatisticPetKey.creSource]] as "合成" | "爱心化" | "彩虹化" | "孵化" | "初始化",
                    desSource: "",
                    create: p[PSStatisticPetKey.create],
                    update: p[PSStatisticPetKey.update],
                }
                return info;
            }).concat(destroyPets)
    
            Log4Ts.log( 
                StatisticModuleS,
                "overStatistic shouldReportPsStatistic petStatistics:" + JSON.stringify(petStatistics) + " userId:" + userId,
            );
            // destroyed
            this.destroyPetsMap[userId] = {};
            const authData = DataCenterS.getData(player, AuthModuleData);
            const authInfo = {address: authData?.holdAddress ?? '', nickname: authData?.holdNickName ?? ''};
            ModuleService.getModule(AuthModuleS).reportPetSimulatorPetDataStatistic(player.userId, petStatistics, authInfo);
        } catch (err) {
            utils.logP12Info("P_Error", {
                userId: userId,
                timestamp: Date.now(),
                errorMsg: "StatisticModuleS overStatistic shouldReportPsStatistic error: " + err,
            }, "error");
        }
    }

    public getStatisticEnchantedInfo(petInfo: petItemDataNew) {
		const buffs = Array.from(petInfo.p.b);
        if(!buffs?.length) return { enchanted: "", score: 0 };
		const enchanted: string = buffs.join(",");
        const score = buffs.reduce((pre, cur) => pre + (GameConfig.Enchants.getElement(cur)?.RankScore ?? 0), 0);
        return { enchanted: enchanted ?? "", score };
    }

    // 更新宠物销毁数据
    public updateDestroyPetsInfo(userId: string, delPets: petItemDataNew[],desSource: "删除" | "合成" | "爱心化" | "彩虹化") {
        try {
            if(!delPets?.length) return;
            if(!this.destroyPetsMap[userId]) this.destroyPetsMap[userId] = {};
            const destroyPets = this.destroyPetsMap[userId];
            const petBagData = DataCenterS.getData(userId, PetBagModuleData);
            const now = Math.floor(Date.now() / 1000);
            const delKeys = [];
            for (let i = 0; i < delPets.length; i++) {
                const delPet = delPets[i];
                if(!delPet?.k || !delPet?.I || !delPet?.p) {
                    Log4Ts.error(StatisticModuleS, `updateDestroyPetsInfo delPet error: ${JSON.stringify(delPet)} userId: ${userId} desSource: ${desSource}`);
                    continue;
                }
                const key = delPet?.k ?? 0;
                const persistInfo = petBagData.getPersistStatisticInfoByKey(key);
                const destroyPetsInfo: PetSimulatorStatisticPetObj = {
                    petkey: key,
                    proId: delPet?.I ?? 0,
                    name: delPet?.p?.n ?? "",
                    attack: delPet?.p?.a ?? 0,
                    enchanted: this.getStatisticEnchantedInfo(delPet).enchanted,
                    status: "destroyed",
                    creSource: CreSourceStr[persistInfo[PSStatisticPetKey.creSource]] as "合成" | "爱心化" | "彩虹化" | "孵化" | "初始化",
                    desSource,
                    create: persistInfo[PSStatisticPetKey.create],
                    update: now,
                }
                destroyPets[key] = destroyPetsInfo;
                delKeys.push(key);
            }
            petBagData.delPersistPetStatisticByKeys(delKeys);
            this.shouldReportPsStatistic(userId); // 检查数据是否超过限制，超过的话则上报后清理
            petBagData.save(true);
        } catch (e) {
            utils.logP12Info("P_Error", {
                userId: userId,
                timestamp: Date.now(),
                errorMsg: "StatisticModuleS updateDestroyPetsInfo error: " + e,
            }, "error");
        }
    }
    protected onPlayerLeft(player: Player): void {
        super.onPlayerLeft(player);
        try {

            let now = Date.now();
            const playerData = DataCenterS.getData(player, PetSimulatorPlayerModuleData);
            const petBagData = DataCenterS.getData(player, PetBagModuleData);
            const authData = DataCenterS.getData(player, AuthModuleData);
            const petStatisticData = DataCenterS.getData(player, PsStatisticModuleData);
            const energyS = ModuleService.getModule(EnergyModuleS);
            const [stamina, staMax, staRed] = energyS.getPlayerEnergy(player.playerId);
            const playerConsumeData = this.getPlayerConsumeRecord(player?.userId);
            const login = Math.floor((petStatisticData.playerLoginRecord[0][0] || 0) / 1000);
            const logout = Math.floor((now || 0) / 1000);
            const online = logout - login;
            const petBagSortedItems = petBagData.sortBag();
            const { petMax, petMaxEnchanted, petMaxEnchantScore, totalScore } = this.getPetMaxInfo(petBagSortedItems)
    
            const curPets = petBagData.PetStatisticArr ?? [];
            const destroyPets = Object.values(this.destroyPetsMap?.[player.userId] || {});
            const petStatisticsCur: PetSimulatorStatisticPetObj[] = curPets.map((p) => {
                const petInfo = petBagData.bagItemsByKey(p[PSStatisticPetKey.petKey])
                const info: PetSimulatorStatisticPetObj = { 
                    petkey: p[PSStatisticPetKey.petKey],
                    proId: petInfo.I,
                    name: petInfo.p.n,
                    attack: petInfo.p.a,
                    enchanted: this.getStatisticEnchantedInfo(petInfo).enchanted,
    
                    status: "exist",
                    creSource: CreSourceStr[p[PSStatisticPetKey.creSource]] as "合成" | "爱心化" | "彩虹化" | "孵化" | "初始化",
                    desSource: "",
                    create: p[PSStatisticPetKey.create],
                    update: p[PSStatisticPetKey.update],
                }
                return info;
            })
            const petStatistics = petStatisticsCur.concat(destroyPets)
            const statisticData: PetSimulatorStatisticNeedFill = {
                diamond: playerData?.diamond ?? 0,
                gold_1: playerData?.gold ?? 0,
                gold_2: playerData.gold2 ?? 0,
                gold_3: playerData.gold3 ?? 0,
                ...playerConsumeData,
                login,
                logout,
                online,
                pet: petStatisticsCur,
                petCnt: petBagSortedItems?.length ?? 0,
                petMax,
                petMaxEnchanted,
                petMaxEnchantScore,
                totalScore,
                staMax,
                staRed,
                stamina,
            };
            petStatisticData.recordLeave(now);
            const userId = player?.userId ?? "";

            const auth = {address: authData?.holdAddress ?? '', nickname: authData?.holdNickName ?? ''};
            ModuleService.getModule(AuthModuleS).reportPetSimulatorStatistic(userId, statisticData, auth);
            ModuleService.getModule(AuthModuleS).reportPetSimulatorPetDataStatistic(userId, petStatistics, auth);    
            Log4Ts.log( 
                StatisticModuleS,
                " reportPetSimulatorStatistic statisticData:" + JSON.stringify(statisticData) + " userId:" + userId
            );
            Log4Ts.log( 
                StatisticModuleS,
                " reportPetSimulatorPetDataStatistic petStatistics:" + JSON.stringify(petStatistics) + " userId:" + userId
            );
        } catch (err) {
            const userId = player?.userId ?? '';
            utils.logP12Info("P_Error", {
                userId,
                timestamp: Date.now(),
                errorMsg: "StatisticModuleS reportPetSimulatorStatistic error: " + err,
            }, "error");
        }
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Method
    public getPlayerData(player: mw.Player | string | number): PsStatisticModuleData {
        return super.getPlayerData(player);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    public net_reportPlayerDataInterval(data: PlayerIntervalData) {
        let playerId = this.currentPlayerId;

        const d = this.getPlayerData(playerId);
        if (!d) {
            Log4Ts.warn(StatisticModuleS, `player data not found. playerId: ${playerId}`);
            return;
        }
        let enteredTime = d.playerLastEnteredTime;
        if (Math.abs(Date.now() - enteredTime - data.elapsedTime) > GtkTypes.Interval.PerHour) {
            let playerMaybeCheatingReason = [
                `player maybe cheating.`,
                `playerId: ${playerId}`,
                `client elapsedTime: ${data.elapsedTime}`,
                `server elapsedTime: ${Date.now() - enteredTime}`,
            ];
            // this.getPlayerData(playerId).maybeCheatingReason.push(playerMaybeCheatingReason.join());
            Log4Ts.warn(StatisticModuleS, ...playerMaybeCheatingReason);
        }
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}
