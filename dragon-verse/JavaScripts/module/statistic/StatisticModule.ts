import { JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";
import Gtk, { GtkTypes, Regulator } from "gtoolkit";
import Log4Ts from "mw-log4ts";
import GameServiceConfig from "../../const/GameServiceConfig";
import { CreSourceStr, PSStatisticPetKey, PetBagModuleData, PetSimulatorStatisticPetObj, petItemDataNew } from "./PetBagModuleData";

export default class DvStatisticModuleData extends JModuleData {
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
     * 本次游玩时长. ms
     * @return {number}
     */
    public get playerLastedPlayTime(): number {
        return (this.playerLoginRecord[0][1] ?? Date.now()) -
            this.playerLoginRecord[0][0];
    }

    /**
     * 总游玩时长. ms
     * @return {number}
     */
    public get playerTotalOnlineTime(): number {
        return this.playerElapsedTimeS +
            (this.playerLoginRecord[0][1] === undefined ?
                this.playerLastedPlayTime :
                0);
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
            if (i === 0 &&
                Gtk.isNullOrUndefined(leave))
                continue;

            if (!Gtk.isSameTime(leave,
                now,
                GtkTypes.Tf.D))
                break;

            if (Gtk.isSameTime(enter,
                now,
                GtkTypes.Tf.D)) {
                todayCounter = todayCounter + (leave ?? now) - enter;
            } else {
                todayCounter = todayCounter + (leave ?? now) - new Date().setHours(0, 0, 0, 0);
                break;
            }
        }
        return todayCounter;
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
export class StatisticModuleC extends JModuleC<StatisticModuleS, DvStatisticModuleData> {
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
        this._eventListeners.forEach(value => value.disconnect());
//#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Method

    public getPlayerData(): DvStatisticModuleData {
        return super.data;
    }

    private reportPlayerDataInterval() {
        this.server.net_reportPlayerDataInterval({elapsedTime: this._elapsedTime});
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Net Method
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class StatisticModuleS extends JModuleS<StatisticModuleC, DvStatisticModuleData> {
    public destroyPetsMap: { [key: number]: PetSimulatorStatisticPetObj } = {};
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
        this._eventListeners.forEach(value => value.disconnect());
//#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

    protected onPlayerJoined(player: Player): void {
        super.onPlayerJoined(player);
        const d = DataCenterS.getData(player, PetBagModuleData);
        console.log(d.BagCapacity);
    }

    protected onPlayerEnterGame(player: Player): void {
        super.onPlayerEnterGame(player);

        const now = Date.now();
        const d = this.getPlayerData(player);
        d.recordEnter(now);
        d.save(false);
    }

    protected onPlayerLeft(player: Player): void {
        super.onPlayerLeft(player);
        let now = Date.now();
        Gtk.queryModuleData<{
            playerLoginRecord: [number, number][],
            playerElapsedTimeS: number
        }>(DvStatisticModuleData.name, player.userId).then((d) => {
            d.playerLoginRecord[0][1] = now;
            d.playerElapsedTimeS += (d.playerLoginRecord[0][1] ?? now) - d.playerLoginRecord[0][0];
            if (d.playerLoginRecord.length >= GameServiceConfig.MAX_LOGIN_RECORD_STATISTIC_COUNT) {
                d.playerLoginRecord.pop();
            }
            Gtk.updateModuleData(DvStatisticModuleData.name, player.userId, d);
        });

    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Method
    public getPlayerData(player: mw.Player | string | number): DvStatisticModuleData {
        return super.getPlayerData(player);
    }

    // 更新宠物销毁数据
    public updateDestroyPetsInfo(userId: number, delPets: petItemDataNew[],desSource: "删除" | "合成" | "爱心化" | "彩虹化") {
        if(!delPets?.length) return;
        const petBagData = DataCenterS.getData(userId, PetBagModuleData);
		const now = Math.floor(Date.now() / 1000);
        for (let i = 0; i < delPets.length; i++) {
            const delPet = delPets[i];
            const key = delPet.k;
            const persistInfo = petBagData.getPersistStatisticInfoByKey(key);
            const destroyPetsInfo: PetSimulatorStatisticPetObj = {
                petkey: key,
                proId: delPet.I,
                name: delPet.p.n,
                attack: delPet.p.a,
                enchanted: "",
                status: "destroyed",
                creSource: CreSourceStr[persistInfo[PSStatisticPetKey.creSource]] as "合成" | "爱心化" | "彩虹化" | "孵化" | "初始化",
                desSource,
                create: persistInfo[PSStatisticPetKey.create],
                update: now,
            }
            this.destroyPetsMap[key] = destroyPetsInfo;
            petBagData.delPersistPetStatisticByKey(key);
        }
        petBagData.save(true);
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
            let playerMaybeCheatingReason = [`player maybe cheating.`,
                `playerId: ${playerId}`,
                `client elapsedTime: ${data.elapsedTime}`,
                `server elapsedTime: ${Date.now() - enteredTime}`];
            // this.getPlayerData(playerId).maybeCheatingReason.push(playerMaybeCheatingReason.join());
            Log4Ts.warn(StatisticModuleS, ...playerMaybeCheatingReason);
        }
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}