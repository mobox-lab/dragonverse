/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-18 16:49:09
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-12-20 10:50:19
 * @FilePath     : \nevergiveup\JavaScripts\Modules\CardModule\CardModuleData.ts
 * @Description  : 修改描述
 */
/*
 * @Author: shifu.huang
 * @Date: 2023-12-14 18:58:41
 * @LastEditors: shifu.huang
 * @LastEditTime: 2023-12-29 18:57:47
 * @FilePath: \nevergiveup\JavaScripts\Modules\CardModule\CardModuleData.ts
 * @Description: 修改描述
 */

import { CardActions } from "../../Actions";
import { GlobalData } from "../../const/GlobalData";
import PlayerModuleC from "../PlayerModule/PlayerModuleC";

export default class CardModuleData extends Subdata {
    /**已解锁的塔 */
    @Decorator.persistence()
    private _unlockCards: number[];
    public get unlockCards(): number[] {
        return this._unlockCards;
    }
    public set unlockCards(v: number[]) {
        this._unlockCards = v;
    }

    /**已解锁的塔 */
    @Decorator.persistence()
    private _equipCards: number[];
    public get equipCards(): number[] {
        return this._equipCards;
    }
    public set equipCards(v: number[]) {
        this._equipCards = v;
    }

    /**
     * 数据初始化，给这些数据一个默认值
     */
    protected override initDefaultData(): void {
        this._unlockCards = [GlobalData.Tower.initUnlockTower];
        this._equipCards = [GlobalData.Tower.initUnlockTower];
    }

    protected onDataInit(): void {
        console.error("数据初始化");
        console.error("Card Module Data _unlockCards", JSON.stringify(this._unlockCards));
        console.error("Card Module Data _equipCards", JSON.stringify(this._equipCards));
        if (this._unlockCards == undefined) this._unlockCards = [GlobalData.Tower.initUnlockTower];
        if (this._equipCards == undefined) this._equipCards = [GlobalData.Tower.initUnlockTower];
    }

    public addUnlockCard(cardID: number) {
        if (!this._unlockCards.includes(cardID)) {
            this._unlockCards.push(cardID);
            if(SystemUtil.isClient()) ModuleService.getModule(PlayerModuleC).onCardUnlock();
            CardActions.onCardChanged.call(cardID);
        }
    }
}
