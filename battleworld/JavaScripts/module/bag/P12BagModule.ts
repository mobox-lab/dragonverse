import Log4Ts from "mw-log4ts";
import { EnergyModuleS } from "../Energy/EnergyModule";
import { AuthModuleS, ConsumeId, P12ItemResId } from "../auth/AuthModule";
import { JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";
import { StatisticModuleS } from "../statistic/StatisticModule";
import GameServiceConfig from "../../const/GameServiceConfig";
import { Regulator } from "gtoolkit";

export class BwP12BagModuleData extends JModuleData {
}

export class P12BagModuleC extends JModuleC<P12BagModuleS, BwP12BagModuleData> {
    private _requestRegulator = new Regulator(1e3);

    // 缓存背包道具
    private _itemsMap: Map<P12ItemResId, number> = new Map([
        [P12ItemResId.DragonEgg, 0],
        [P12ItemResId.CaptureBall, 0],
        [P12ItemResId.StaminaPotion, 0],
        [P12ItemResId.SweepToken, 0],
    ]);

    /**
     * 消费货币
     * @param {ConsumeId} consumeId -- 商品 id
     * @param {number} count -- 购买数量
     * @returns {Promise<boolean>}
     */
    public consumeCurrency(consumeId: ConsumeId, count: number): Promise<boolean> {
        return this.server.net_consumeCurrency(consumeId, count);
    }

    /**
     * 获取背包道具
     * @param {P12ItemResId} itemId  -- 道具id
     * @returns {number}
     */
    public getItem(itemId: P12ItemResId): number {
        return this._itemsMap.get(itemId);
    }

    /**
     * 变更道具， 维护本地缓存
     * @param {P12ItemResId} itemId -- 道具 id
     * @param {number} deltaValue -- 变化值，需要增加/减少改变正负值
     */
    public changeItemCount(itemId: P12ItemResId, deltaValue: number) {
        const count = this._itemsMap.get(itemId);
        this._itemsMap.set(itemId, count + deltaValue);
    }

    public consumePotion(count: number) {
        return this.server.net_consumePotion(count);
    }

    public consumeSweep(count: number) {
        return this.server.net_consumeSweep(count);
    }

    public net_setData(map: Map<P12ItemResId, number>) {
        this._itemsMap = map;
    }

    public net_setItem(key: P12ItemResId, value: number) {
        this._itemsMap.set(key, value);
    }

    /**
     * 刷新背包物品
     */
    public refreshBagItem() {
        if (this._requestRegulator.request()) {
            return this.server.net_refreshBagItem();
        }
    }
}

export class P12BagModuleS extends JModuleS<P12BagModuleC, BwP12BagModuleData> {
    private _authS: AuthModuleS;
    private _energyS: EnergyModuleS;
    private _statisticS: StatisticModuleS;

    private get authS(): AuthModuleS | null {
        if (!this._authS) this._authS = ModuleService.getModule(AuthModuleS);
        return this._authS;
    }

    private get energyS(): EnergyModuleS | null {
        if (!this._energyS) this._energyS = ModuleService.getModule(EnergyModuleS);
        return this._energyS;
    }

    private get statisticS(): StatisticModuleS | null {
        if (!this._statisticS) this._statisticS = ModuleService.getModule(StatisticModuleS);
        return this._statisticS;
    }

    protected onPlayerEnterGame(player: mw.Player) {
        super.onPlayerEnterGame(player);

        this.queryP12BagItem(player);
    }

    /**
     * 查询背包物品
     * @param {mw.Player} player
     * @private
     */
    private async queryP12BagItem(player: mw.Player) {
        try {
            const res = await this.authS.queryUserP12Bag(player.userId, GameServiceConfig.SCENE_NAME);
            const map: Map<P12ItemResId, number> = new Map([
                [P12ItemResId.DragonEgg, 0],
                [P12ItemResId.CaptureBall, 0],
                [P12ItemResId.StaminaPotion, 0],
                [P12ItemResId.SweepToken, 0],
            ]);
            res.list.forEach(item => map.set(item.resId, item.unuse));
            this.getClient(player).net_setData(map);
        } catch (error) {
            Log4Ts.error(P12BagModuleS, error);
        }
    }

    public net_consumeCurrency(consumeId: ConsumeId, count: number): Promise<boolean> {
        const player = this.currentPlayer;
        if (!player) return;
        Log4Ts.log(P12BagModuleS, `player ${player.userId} purchase ${count} ${ConsumeId[consumeId]} props`);
        return this.authS.consumeCurrency(player.userId, GameServiceConfig.SCENE_NAME, consumeId, count);
    }

    /**
     * 使用体力药水
     * @param {mw.Player} player
     * @param {number} count 使用数量
     */
    private async consumePotion(player: mw.Player, count: number) {
        try {
            const res = await this.authS.consumePotion(player.userId, GameServiceConfig.SCENE_NAME, count);
            this.energyS.addEnergy(player.userId, res.recoveryStaminaAmount, res.stamina);
            this.reportStatistic(player.userId, count, res.recoveryStaminaAmount);
            this.getClient(player).net_setItem(P12ItemResId.StaminaPotion, res.balance);
        } catch (error) {
            Log4Ts.error(P12BagModuleS, error);
        }
    }

    public net_consumePotion(count: number) {
        const player = this.currentPlayer;
        if (!player) return;
        Log4Ts.log(P12BagModuleS, `player ${player.userId} use senzu bean ${count}`);
        return this.consumePotion(player, count);
    }

    /**
     * 使用扫荡券
     * @param {mw.Player} player
     * @param {number} count 使用数量
     */
    public async consumeSweep(player: mw.Player, count: number) {
        const res = await this.authS.consumeSweep(player.userId, GameServiceConfig.SCENE_NAME, count);
        this.getClient(player).net_setItem(P12ItemResId.SweepToken, res.balance);
    }

    public net_consumeSweep(count: number) {
        const player = this.currentPlayer;
        if (!player) return;
        Log4Ts.log(P12BagModuleS, `player ${player.userId} use sweep token ${count}`);
        return this.consumeSweep(player, count);
    }

    public net_refreshBagItem() {
        const player = this.currentPlayer;
        return this.queryP12BagItem(player);
    }

    /**
     * 上报数据
     * @param {string} userId 用户 id
     * @param {number} count 使用数量
     * @param {number} recovery 恢复体力
     * @private
     */
    private reportStatistic(userId: string, count: number, recovery: number) {
        this.statisticS.setAttributeChange(userId, "staPotCnt", count);
        this.statisticS.setAttributeChange(userId, "staPotAdd", recovery);
        Log4Ts.log(P12BagModuleS, `player ${userId} used ${count} recovery stamina ${recovery}`);
    }
}