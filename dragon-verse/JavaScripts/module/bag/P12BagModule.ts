import Log4Ts from "mw-log4ts";
import GameServiceConfig from "../../const/GameServiceConfig";
import { AuthModuleS, ConsumeId, P12ItemResId } from "../auth/AuthModule";
import { JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";
import { BagModuleS } from "./BagModule";

export class DvP12BagModuleData extends JModuleData {
}

export class P12BagModuleC extends JModuleC<P12BagModuleS, DvP12BagModuleData> {
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

export class P12BagModuleS extends JModuleS<P12BagModuleC, DvP12BagModuleData> {
    private _authS: AuthModuleS;
    private _bagS: BagModuleS;

    private get authS(): AuthModuleS | null {
        if (!this._authS) this._authS = ModuleService.getModule(AuthModuleS);
        return this._authS;
    }

    private get bagS(): BagModuleS | null {
        if (!this._bagS) this._bagS = ModuleService.getModule(BagModuleS);
        return this._bagS;
    }

    protected onPlayerEnterGame(player: mw.Player) {
        super.onPlayerEnterGame(player);

        this.authS.queryUserP12Bag(player.userId, GameServiceConfig.SCENE_NAME).then(res => {
            const map: Map<P12ItemResId, number> = new Map([
                [P12ItemResId.DragonEgg, 0],
                [P12ItemResId.CaptureBall, 0],
                [P12ItemResId.StaminaPotion, 0],
                [P12ItemResId.SweepToken, 0],
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
            if (res) {
                this.bagS.addItem(player.playerId, GameServiceConfig.DRAGON_BALL_BAG_ID, count);
            }
            return res;
        } catch (error) {
            Log4Ts.error(P12BagModuleS, error);
            return false;
        }
    }

}