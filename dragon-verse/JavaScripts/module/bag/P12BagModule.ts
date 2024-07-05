import Log4Ts from "../../depend/log4ts/Log4Ts";
import { AuthModuleS, ConsumeId, P12ItemResId } from "../auth/AuthModule";
import { JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";
import { StatisticModuleS } from "../statistic/StatisticModule";
import GameServiceConfig from "../../const/GameServiceConfig";

export class BwP12BagModuleData extends JModuleData {
}

export class P12BagModuleC extends JModuleC<P12BagModuleS, BwP12BagModuleData> {
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
     * 变更道具， 维护本地缓存
     * @param {P12ItemResId} itemId -- 道具 id
     * @param {number} deltaValue -- 变化值，需要增加/减少改变正负值
     */
    public changeItemCount(itemId: P12ItemResId, deltaValue: number) {
        const count = this._itemsMap.get(itemId);
        this._itemsMap.set(itemId, count + deltaValue);
    }

    public net_setData(map: Map<P12ItemResId, number>) {
        this._itemsMap = map;
    }
}

export class P12BagModuleS extends JModuleS<P12BagModuleC, BwP12BagModuleData> {
    private _authS: AuthModuleS;

    private get authS(): AuthModuleS | null {
        if (!this._authS) this._authS = ModuleService.getModule(AuthModuleS);
        return this._authS;
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

    public async net_consumeCurrency(consumeId: ConsumeId, count: number): Promise<boolean> {
        const player = this.currentPlayer;
        if (!player) return;
        try {
            Log4Ts.log(P12BagModuleS, `player ${player.userId} purchase ${count} ${ConsumeId[consumeId]} props`);
            const res = await this.authS.consumeCurrency(player.userId, GameServiceConfig.SCENE_NAME, consumeId, count);
            // TODO: 处理精灵球
            return res;
        } catch (error) {
            Log4Ts.error(P12BagModuleS, error);
            return false;
        }
    }

}