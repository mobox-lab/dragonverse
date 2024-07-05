import Log4Ts from "../../depend/log4ts/Log4Ts";
import { EnergyModuleS } from "../Energy/EnergyModule";
import { AuthModuleS, ConsumeId, P12ItemResId } from "../auth/AuthModule";
import { JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";
import PsStatisticModuleData from "../statistic/StatisticModule";
import GameServiceConfig from "../../const/GameServiceConfig";

export class PsP12BagModuleData extends JModuleData {
}

export class P12BagModuleC extends JModuleC<P12BagModuleS, PsP12BagModuleData> {
    // 缓存背包道具
    private _itemsMap: Map<P12ItemResId, number> = new Map([
        [P12ItemResId.DragonEgg, 0],
        [P12ItemResId.CaptureBall, 0],
        [P12ItemResId.StaminaPotion, 0],
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

    public net_setData(map: Map<P12ItemResId, number>) {
        this._itemsMap = map;
    }
}

export class P12BagModuleS extends JModuleS<P12BagModuleC, PsP12BagModuleData> {
    private _authS: AuthModuleS;
    private _energyS: EnergyModuleS;

    private get authS(): AuthModuleS | null {
        if (!this._authS) this._authS = ModuleService.getModule(AuthModuleS);
        return this._authS;
    }

    private get energyS(): EnergyModuleS | null {
        if (!this._energyS) this._energyS = ModuleService.getModule(EnergyModuleS);
        return this._energyS;
    }

    protected onPlayerEnterGame(player: mw.Player) {
        super.onPlayerEnterGame(player);

        this.authS.queryUserP12Bag(player.userId, GameServiceConfig.SCENE_NAME).then(res => {
            const map: Map<P12ItemResId, number> = new Map([
                [P12ItemResId.DragonEgg, 0],
                [P12ItemResId.CaptureBall, 0],
                [P12ItemResId.StaminaPotion, 0],
            ]);
            res.list.forEach(item => map.set(item.resId, item.unuse));
            this.getClient(player).net_setData(map);
        });
    }

    public net_consumeCurrency(consumeId: ConsumeId, count: number): Promise<boolean> {
        const player = this.currentPlayer;
        if (!player) return;
        Log4Ts.log(P12BagModuleS, `player ${player.userId} purchase ${count} ${ConsumeId[consumeId]} props`);
        return this.authS.consumeCurrency(player.userId, GameServiceConfig.SCENE_NAME, consumeId, count);
    }

    /**
     * 使用体力药水
     * @param {string} userId -- 用户Id
     * @param {number} count 使用数量
     */
    private async consumePotion(userId: string, count: number) {
        try {
            const res = await this.authS.consumePotion(userId, GameServiceConfig.SCENE_NAME, count);
            this.energyS.addEnergy(userId, res.recoveryStaminaAmount, res.stamina);
            this.reportStatistic(userId, count, res.recoveryStaminaAmount);
        } catch (error) {
            Log4Ts.error(P12BagModuleS, error);
        }
    }

    public net_consumePotion(count: number) {
        const player = this.currentPlayer;
        if (!player) return;
        Log4Ts.log(P12BagModuleS, `player ${player.userId} use senzu bean ${count}`);
        return this.consumePotion(player.userId, count);
    }

    /**
     * 上报数据
     * @param {string} userId 用户 id
     * @param {number} count 使用数量
     * @param {number} recovery 恢复体力
     * @private
     */
    private reportStatistic(userId: string, count: number, recovery: number) {
        const statisticData = DataCenterS.getData(userId, PsStatisticModuleData);
        statisticData.recordStaPotConsume(recovery);
        Log4Ts.log(P12BagModuleS, `player ${userId} used ${count} recovery stamina ${recovery}`);
    }

}