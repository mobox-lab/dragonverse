import Log4Ts from "mw-log4ts";
import GameServiceConfig from "../../const/GameServiceConfig";
import { AuthModuleS } from "../auth/AuthModule";
import Gtk, { GtkTypes, Regulator } from "gtoolkit";
import ModuleService = mwext.ModuleService;
import { Yoact } from "../../depend/yoact/Yoact";
import createYoact = Yoact.createYoact;
import { addGMCommand } from "mw-god-mod"; 
import { utils } from "../../util/uitls";

addGMCommand(
    "Change Energy",
    "string",
    undefined,
    (player, value) => {
        let v = parseInt(value);
        if (Number.isNaN(v)) {
            v = 200;
        }
        Log4Ts.log(EnergyModuleS, `try add energy to player ${player.userId}. by GM. value: ${v}`);

        ModuleService.getModule(EnergyModuleS).addEnergy(player.userId, v);
    },
    undefined,
    "Energy",
);

addGMCommand(
    "Add Points",
    "string",
    undefined,
    (player, value) => {
        let v = parseInt(value);
        if (Number.isNaN(v)) {
            v = 0;
        }
        Log4Ts.log(EnergyModuleS, `try set points to player ${player.userId}. by GM. value: ${v}`);

        ModuleService.getModule(EnergyModuleS).addPoints(player.userId, {taskPoint: v, subGameId: 'pet', taskId: "0"});
    },
    undefined,
    "Energy",
);

export default class PSEnergyModuleData extends mwext.Subdata {
    //@Decorator.persistence()
    //public isSave: bool;

    @Decorator.persistence()
    public lastRecoveryTime: number = 0;

    @Decorator.persistence()
    public energy: number = 0;

    @Decorator.persistence()
    public lastMaxStamina: number = undefined;

    @Decorator.persistence()
    public restitution: number = 0;

    @Decorator.persistence()
    public points: number = 0;

    public isAfford(cost: number = 1): boolean {
        return this.energy >= cost;
    }

    public consume(count: number = 1): number {
        if (count <= 0) return 0;
        const curr = this.energy;
        if (curr < count) {
            this.energy = 0;
            return curr;
        } else {
            this.energy -= count;
            return count;
        }
    }

    /**
     * 检查超额增加.
     * @param {number} currentLimit
     * @return {boolean} 是否发生任何变动.
     * @private
     */
    public tryUpdateLimit(currentLimit: number): boolean {
        if ((this.lastMaxStamina === undefined ||
                this.lastMaxStamina < currentLimit) &&
            this.energy < currentLimit) {
            this.energy = Math.min(this.energy + currentLimit - (this.lastMaxStamina ?? 0), currentLimit);
        }
        if (this.lastMaxStamina !== currentLimit) {
            this.lastMaxStamina = currentLimit;
            return true;
        }
        return false;
    }

    protected initDefaultData(): void {
        super.initDefaultData();
        this.energy = 0;
        this.lastRecoveryTime = Date.now();
    }
}

/**
 * Energy Module.
 *
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
export class EnergyModuleC extends mwext.ModuleC<EnergyModuleS, PSEnergyModuleData> {
    //#region Member
    private _eventListeners: EventListener[] = [];

    public viewEnergy: { data: number } = createYoact({data: 0});

    public viewEnergyLimit: { data: number } = createYoact({data: 0});

    public viewPoints: { data: number } = createYoact({data: 0});

    private _requestRegulator = new Regulator(1e3);
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();

        //#region Inner Member init
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onStart(): void {
        super.onStart();

        //#region Member init
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

        //#region Event Subscribe
        // this._eventListeners.push(Event.addLocalListener(EventDefine.EVENT_NAME, CALLBACK));
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    protected onEnterScene(sceneType: number): void {
        super.onEnterScene(sceneType);

        this.viewEnergy.data = this.data.energy;
        this.viewEnergyLimit.data = this.data.lastMaxStamina;
        this.viewPoints.data = this.data.points;
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
    /**
     * 是否 足够消耗.
     * @param {number} cost
     *  - 1 default.
     * @return {boolean}
     */
    public isAfford(cost?: number): boolean {
        return this.data.isAfford(cost);
    }

    /**
     * 模拟消耗.
     * @desc 不影响存储.
     * @param {number} cost
     * @param {boolean} syncInstant  是否 立即同步.
     * @return {number} 实际扣除数量.
     */
    public consumeViewEnergy(cost: number = 1, syncInstant: boolean = false): number {
        let result = this.data.consume(cost);
        this.viewEnergy.data = this.data.energy;
        return result;
    }

    /**
     * 当前体力值.
     * @return {number}
     */
    public currEnergy(): number {
        return this.data.energy;
    }

    public refreshStaminaLimit() {
        if (this._requestRegulator.request()) {
            this.server.net_requestRefreshStaminaLimit();
        }
    }

    /**
     * 获取玩家体力 C
     * @returns {[number, number]} -- [当前体力, 最大体力]
     */
    public getPlayerEnergy(): [number, number] {
        return [this.viewEnergy.data, this.viewEnergyLimit.data];
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method

    public net_syncEnergy(energy: number, energyLimit?: number) {
        this.data.energy = energy;
        this.viewEnergy.data = energy;

        Log4Ts.log(EnergyModuleC, `synced energy from server. current is ${energy}.`);

        if (energyLimit !== undefined) {
            this.data.lastMaxStamina = energyLimit;
            this.viewEnergyLimit.data = energyLimit;
            Log4Ts.log(EnergyModuleC, `synced energy limit from server. current is ${energyLimit}.`);
        }
    }

    public net_syncPoints(points: number) {
        this.data.points = points;
        this.viewPoints.data = points;
        Log4Ts.log(EnergyModuleC, `synced points from server. current is ${points}.`);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    // 获取当前积分
    public getCurrentPoints(): number {
        return this.viewPoints.data;
    }
}

export class EnergyModuleS extends mwext.ModuleS<EnergyModuleC, PSEnergyModuleData> {
    //#region Member
    private _eventListeners: EventListener[] = [];

    private _intervalHolder: Map<string, number> = new Map();

    private _playerConsumeMap: Map<string, number> = new Map();

    private _authModuleS: AuthModuleS;

    private get authModuleS(): AuthModuleS | null {
        if (!this._authModuleS) this._authModuleS = ModuleService.getModule(AuthModuleS);
        return this._authModuleS;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onStart(): void {
        super.onStart();

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
    }

    protected onPlayerEnterGame(player: Player): void {
        super.onPlayerEnterGame(player);
        this.initPlayerEnergyData(player);
    }

    protected onPlayerLeft(player: Player): void {
        super.onPlayerLeft(player);
        clearTimeout(this._intervalHolder.get(player.userId));
        this._intervalHolder.delete(player.userId);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Method

    private initPlayerEnergyData(player: mw.Player) {
        const d = this.getPlayerData(player);
        if (Gtk.isNullOrUndefined(d)) return;
        let refreshInterval =
            GameServiceConfig.isRelease || GameServiceConfig.isBeta
                ? GameServiceConfig.ENERGY_RECOVERY_INTERVAL_MS
                : 5 * GtkTypes.Interval.PerSec;
        this.authModuleS.requestRefreshStaminaLimit(player.userId, GameServiceConfig.SCENE_NAME).then(() => {
            let autoRecoveryHandler = () => {
                const now = Date.now();
                let limit = this.authModuleS.playerStaminaLimitMap.get(player.userId) ?? 0;
                let changed = d.tryUpdateLimit(limit);

                let recoveryDuration = this.authModuleS.playerStaminaRecoveryMap.get(player.userId) ?? 0;
                if (recoveryDuration > 0) {
                    const duration = now - d.lastRecoveryTime;
                    let delay: number = 0;
                    if (d.energy < limit) {
                        Log4Ts.log(EnergyModuleS, `prepare add energy. current is ${d.energy}`);
                        d.energy = Math.min(
                            limit,
                            d.energy +
                            (limit / recoveryDuration / 1e3) *
                            refreshInterval *
                            Math.max(Math.floor(duration / refreshInterval), 0),
                        );

                        delay = duration % refreshInterval;
                        d.lastRecoveryTime = now - delay;
                        Log4Ts.log(EnergyModuleS, `${player.playerId} add energy done. current is ${d.energy}`);
                        changed = true;
                    }
                    if (this._intervalHolder.has(player.userId)) mw.clearTimeout(this._intervalHolder.get(player.userId));
                    this._intervalHolder.set(player.userId, mw.setTimeout(autoRecoveryHandler, refreshInterval - delay));
                }

                if (changed) {
                    d.save(false);
                    this.syncEnergyToClient(player.userId, d.energy, limit);
                }
            };

            if ((d.restitution ?? 0) > 0) {
                let limit = this.authModuleS.playerStaminaLimitMap.get(player.userId) ?? 0;
                d.energy = Math.min(d.energy + d.restitution, limit);
                d.restitution = 0;
                this.syncEnergyToClient(player.userId, d.energy);
            }
            autoRecoveryHandler();
        });
        this.authModuleS.requestUserPoints(player.userId, GameServiceConfig.SCENE_NAME).then(() => {
            this.setPoints(player.userId, this.authModuleS.playerPointsMap.get(player.userId) ?? 0);
            console.log("#point init d.points:", d.points);
            Log4Ts.log(EnergyModuleS, `synced points from server. current is ${d.points}.`);
        });

        this._playerConsumeMap.set(player.userId, 0);
    }

    /**
     * 是否 足够消耗.
     * @param playerId
     * @param {number} cost
     *  - 1 default.
     * @return {boolean}
     */
    public isAfford(playerId: number, cost?: number): boolean {
        return this.getPlayerData(playerId)?.isAfford(cost) ?? false;
    }

    public consume(playerId: number, cost: number, firstTime: number = undefined) {
        firstTime = firstTime ?? Date.now();
        const d = this.getPlayerData(playerId);
        if (!d) return;
        const player = mw.Player.getPlayer(playerId);
        if (!player) return;

        let needRefresh = d.energy >= (this.authModuleS.playerStaminaLimitMap.get(player.userId) ?? 0);
        if (d.consume(cost) > 0 && needRefresh) d.lastRecoveryTime = firstTime;
        const totalCost = this._playerConsumeMap.get(player.userId) ?? 0;
        this._playerConsumeMap.set(player.userId, totalCost + cost);

        d.save(false);
        this.syncEnergyToClient(player.userId, d.energy);
        Log4Ts.log(EnergyModuleS, `consume ${cost} energy for player ${playerId}.`, `current: ${d.energy}`);
    }

    public addEnergy(userId: string, val: number, limitRefresh?: number) {
        const player = Player.getPlayer(userId);
        const d = this.getPlayerData(userId);
        if (!d || !player) return;
        if (limitRefresh !== undefined) d.tryUpdateLimit(limitRefresh);
        d.energy += val;
        d.save(false);
        this.syncEnergyToClient(player.userId, d.energy, limitRefresh);
        Log4Ts.log(EnergyModuleS, `add ${val} energy to player ${userId}.`, ` current: ${d.energy}`);
    }

    public syncEnergyToClient(userId: string, energy: number, energyLimit?: number) {
        const player = Player.getPlayer(userId);
        this.getClient(player.playerId)?.net_syncEnergy(energy, energyLimit);
    }

    /**
     * 获取玩家体力 S
     * @param {number} playerId  -- 玩家 id
     * @returns {[number, number, number]} -- [当前体力, 最大体力, 本次消耗的体力]
     */
    public getPlayerEnergy(playerId: number): [number, number, number] {
        const data = this.getPlayerData(playerId);
        const player = Player.getPlayer(playerId);
        const maxStamina = this.authModuleS.playerStaminaLimitMap.get(player?.userId) ?? 0;
        const cost = this._playerConsumeMap.get(player?.userId) ?? 0;
        return [data.energy, maxStamina, cost];
    }

    public resetPlayerEnergyConsumeMap(userId: string) {
        this._playerConsumeMap.set(userId, 0);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    @mwext.Decorator.noReply()
    public net_requestRefreshStaminaLimit() {
        let player = this.currentPlayer;
        this.authModuleS.requestRefreshStaminaLimit(player.userId, GameServiceConfig.SCENE_NAME).then(() => {
            let limit = this.authModuleS.playerStaminaLimitMap.get(player.userId) ?? 0;
            let d = this.getPlayerData(player);
            if (d?.tryUpdateLimit(limit) ?? false)
                this.syncEnergyToClient(player.userId, d.energy, limit);
        });
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    // 添加积分
    public async addPoints(userId: string, info: { taskId: string, taskPoint: number, subGameId: 'pet' | 'defense',  }) : Promise<boolean> {
        const player = Player.getPlayer(userId);
        const d = this.getPlayerData(userId);
        if (!d || !player) return false;
        Log4Ts.log(EnergyModuleS," addPoint d.points:" + d.points + JSON.stringify(info));
        const { taskId, taskPoint, subGameId } = info ?? {};
        const timestamp = Math.floor(Date.now() / 1000);
        try{
            const res = await ModuleService.getModule(AuthModuleS).addDragonPoint(player.userId, GameServiceConfig.SCENE_NAME, info);
            d.points += taskPoint;
            d.save(false);
            this.syncPointsToClient(player.userId, d.points);
            Log4Ts.log(EnergyModuleS, `add ${taskPoint} points to player ${userId}.`, ` current: ${d.points}`);
            utils.logP12Info("A_Points", {
                userId,
                taskId,
                taskPoint,
                timestamp,
                subGameId,
            }, "info");
            return res;
        } catch (e) {
            utils.logP12Info("A_Points_Error", {
                userId,
                timestamp,
                taskId,
                taskPoint,
                subGameId,
            }, "error");
            return false;
        }
    }

    // 设置积分
    public setPoints(userId: string, val: number) {
        const player = Player.getPlayer(userId);
        const d = this.getPlayerData(userId);
        if (!d || !player) return;
        
        d.points = val;
        d.save(false);
        this.syncPointsToClient(player.userId, d.points);
        Log4Ts.log(EnergyModuleS, `set points for player ${userId} to ${val}`);
    }

    // 同步积分到客户端
    public syncPointsToClient(userId: string, points: number) {
        const player = Player.getPlayer(userId);
        this.getClient(player)?.net_syncPoints(points);
    }

    // 获取玩家积分
    public getPlayerPoints(playerId: number): number {
        const data = this.getPlayerData(playerId);
        return data?.points ?? 0;
    }
}
