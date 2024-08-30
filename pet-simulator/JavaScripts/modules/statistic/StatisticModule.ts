import { GlobalEnum } from "../../const/Enum";
import GameServiceConfig from "../../const/GameServiceConfig";
import { JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";
import Log4Ts from "mw-log4ts";
import Gtk, { GtkTypes, Regulator } from "gtoolkit";
import { EnergyModuleS } from "../Energy/EnergyModule";
import { CreSourceStr, PSStatisticPetKey, PetBagModuleData, petItemDataNew } from "../PetBag/PetBagModuleData";
import { PetSimulatorPlayerModuleData } from "../Player/PlayerModuleData";
import { AuthModuleS, PetSimulatorStatisticNeedFill, PetSimulatorStatisticPetObj } from "../auth/AuthModule";
import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";

type PlayerConsumeData = {
    diamondAdd: number;
    diamondRed: number;
    gold_1_add: number;
    gold_1_red: number;
    gold_2_add: number;
    gold_2_red: number;
    gold_3_add: number;
    gold_3_red: number;
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

    /**
     * 上次登录时间. ms
     * @return {number}
     */
    public get playerLastEnteredTime(): number {
        return this.playerLoginRecord[0][0];
    }

    /**
     * 钻石增加
     * @type {number}
     */
    @Decorator.persistence()
    playerDiamondAdd: number = 0;

    /**
     * 钻石减少
     * @type {number}
     */
    @Decorator.persistence()
    playerDiamondRed: number = 0;

    /**
     * 金币1增加
     * @type {number}
     */
    @Decorator.persistence()
    playerGoldAdd: number = 0;

    /**
     * 金币1减少
     * @type {number}
     */
    @Decorator.persistence()
    playerGoldRed: number = 0;

    /**
     * 金币2增加
     * @type {number}
     */
    @Decorator.persistence()
    playerGold2Add: number = 0;

    /**
     * 金币2减少
     * @type {number}
     */
    @Decorator.persistence()
    playerGold2Red: number = 0;

    /**
     * 金币3增加
     * @type {number}
     */
    @Decorator.persistence()
    playerGold3Add: number = 0;

    /**
     * 金币3减少
     * @type {number}
     */
    @Decorator.persistence()
    playerGold3Red: number = 0;

    /**
     * 当前增加宠物数量
     * @type {number}
     */
    @Decorator.persistence()
    playerPetAdd: number = 0;

    /**
     * 体力药水增加体力
     * @type {number}
     */
    @Decorator.persistence()
    playerStaPotAdd: number = 0;

    /**
     * 体力药水使用次数
     * @type {number}
     */
    @Decorator.persistence()
    playerStaPotCnt: number = 0;

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

    /**
     * 获取玩家消费数据
     * @return {PlayerConsumeData}
     */
    public get playerConsumeData(): PlayerConsumeData {
        return {
            diamondAdd: this.playerDiamondAdd,
            diamondRed: this.playerDiamondRed,
            gold_1_add: this.playerGoldAdd,
            gold_1_red: this.playerGoldRed,
            gold_2_add: this.playerGold2Add,
            gold_2_red: this.playerGold2Red,
            gold_3_add: this.playerGold3Add,
            gold_3_red: this.playerGold3Red,
        };
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

    public recordConsume(coinType: GlobalEnum.CoinType, value: number) {
        Log4Ts.log(PsStatisticModuleData, `record consume. type: ${coinType}. value: ${value}. `);
        const isAdd = value > 0;
        const val = Math.abs(value);
        switch (coinType) {
            case GlobalEnum.CoinType.Diamond:
                isAdd ? this.playerDiamondAdd += val : this.playerDiamondRed += val;
                break;
            case GlobalEnum.CoinType.FirstWorldGold:
                isAdd ? this.playerGoldAdd += val : this.playerGoldRed += val;
                break;
            case GlobalEnum.CoinType.SecondWorldGold:
                isAdd ? this.playerGold2Add += val : this.playerGold2Red += val;
                break;
            case GlobalEnum.CoinType.ThirdWorldGold:
                isAdd ? this.playerGold3Add += val : this.playerGold3Red += val;
                break;
            default:
                break;
        }
    }

    public recordAddPet() {
        ++this.playerPetAdd;
    }

    public recordStaPotConsume(val: number) {
        ++this.playerStaPotCnt;
        this.playerStaPotAdd += val;        
    }

    public resetConsumeRecord() {
        this.playerDiamondAdd = 0;
        this.playerDiamondRed = 0;
        this.playerGoldAdd = 0;
        this.playerGoldRed = 0;
        this.playerGold2Add = 0;
        this.playerGold2Red = 0;
        this.playerGold3Add = 0;
        this.playerGold3Red = 0;

        this.playerPetAdd = 0;
        this.playerStaPotAdd = 0;
        this.playerStaPotCnt = 0;
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

    protected onPlayerEnterGame(player: Player): void {
        super.onPlayerEnterGame(player);
        // const petStatisticData = DataCenterS.getData(player, PsStatisticModuleData)
        // petStatisticData.resetConsumeData()
        const now = Date.now();
        const d = this.getPlayerData(player);
        d.resetConsumeRecord();
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
            ModuleService.getModule(AuthModuleS).reportPetSimulatorPetDataStatistic(player.userId, petStatistics);
        } catch (err) {
            Log4Ts.error(StatisticModuleS, " overStatistic shouldReportPsStatistic error:" + err + " userId:" + userId);
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
        } catch (error) {
            Log4Ts.error(StatisticModuleS, " userId:" + userId + " updateDestroyPetsInfo:" + error);
        }
    }
    protected onPlayerLeft(player: Player): void {
        super.onPlayerLeft(player);
        try {

            let now = Date.now();
            const playerData = DataCenterS.getData(player, PetSimulatorPlayerModuleData);
            const petBagData = DataCenterS.getData(player, PetBagModuleData);
            const petStatisticData = DataCenterS.getData(player, PsStatisticModuleData);
            const energyS = ModuleService.getModule(EnergyModuleS);
            const [stamina, staMax, staRed] = energyS.getPlayerEnergy(player.playerId);
            const playerConsumeData = petStatisticData.playerConsumeData ?? {
                diamondAdd: 0,
                diamondRed: 0,
                gold_1_add: 0,
                gold_1_red: 0,
                gold_2_add: 0,
                gold_2_red: 0,
                gold_3_add: 0,
                gold_3_red: 0,
            };
            const login = Math.floor((petStatisticData.playerLoginRecord[0][0] || 0) / 1000);
            const logout = Math.floor((now || 0) / 1000);
            const online = logout - login;
            const petBagSortedItems = petBagData.sortBag();
            const { petMax, petMaxEnchanted, petMaxEnchantScore, totalScore } = this.getPetMaxInfo(petBagSortedItems)
    
            const curPets = petBagData.PetStatisticArr ?? [];
            const destroyPets = Object.values(this.destroyPetsMap?.[player.userId] || {});
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
            const statisticData: PetSimulatorStatisticNeedFill = {
                diamond: playerData?.diamond ?? 0,
                diamondAdd: playerConsumeData?.diamondAdd ?? 0,
                diamondRed: playerConsumeData?.diamondRed ?? 0,
                gold_1: playerData?.gold ?? 0,
                gold_1_add: playerConsumeData?.gold_1_add ?? 0,
                gold_1_red: playerConsumeData?.gold_1_red ?? 0,
                gold_2: playerData.gold2 ?? 0,
                gold_2_add: playerConsumeData?.gold_2_add ?? 0,
                gold_2_red: playerConsumeData?.gold_2_red ?? 0,
                gold_3: playerData.gold3 ?? 0,
                gold_3_add: playerConsumeData?.gold_3_add ?? 0,
                gold_3_red: playerConsumeData?.gold_3_red ?? 0,
                login,
                logout,
                online,
                pet: [],
                petAdd: petStatisticData?.playerPetAdd ?? 0,
                petCnt: petBagSortedItems?.length ?? 0,
                petMax,
                petMaxEnchanted,
                petMaxEnchantScore,
                totalScore,
                staMax,
                staPotAdd: petStatisticData.playerStaPotAdd ?? 0,
                staPotCnt: petStatisticData.playerStaPotCnt ?? 0,
                staRed,
                stamina,
            };
            petStatisticData.recordLeave(now);
            const userId = player?.userId ?? "";
            Log4Ts.log( 
                StatisticModuleS,
                " reportPetSimulatorStatistic statisticData:" + JSON.stringify(statisticData) + " userId:" + userId
            );
            Log4Ts.log( 
                StatisticModuleS,
                " reportPetSimulatorPetDataStatistic petStatistics:" + JSON.stringify(petStatistics) + " userId:" + userId
            );
            ModuleService.getModule(AuthModuleS).reportPetSimulatorStatistic(userId, statisticData);
            ModuleService.getModule(AuthModuleS).reportPetSimulatorPetDataStatistic(userId, petStatistics);    
        } catch (err) {
            Log4Ts.error(StatisticModuleS, " reportPetSimulatorStatistic error:" + err + " userId:" + player?.userId ?? '');
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
