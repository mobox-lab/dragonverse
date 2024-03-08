/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-29 10:16:41
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-06 15:48:28
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\treasure\TreasureModuleS.ts
 * @Description  : 
 */
import { GameConfig } from "../../../config/GameConfig";
import { ITreasureBoxElement } from "../../../config/TreasureBox";
import { CommonUtils } from "../../utils/CommonUtils";
import { RouteDefine } from "../route/RouteDefine";
import TreasureData from "./TreasureData";
import TreasureModuleC from "./TreasureModuleC";


type Treasure = {
    dataList: ITreasureBoxElement[],
    weights: number[]
}

export default class TreasureModuleS extends ModuleS<TreasureModuleC, TreasureData> {

    private _treasureData: Map<number, Treasure> = new Map()

    protected onStart(): void {
        GameConfig.TreasureBox.getAllElement().forEach(e => {
            if (e.enable) {
                if (this._treasureData.has(e.boxID)) {
                    let treasure = this._treasureData.get(e.boxID)
                    treasure.dataList.push(e);
                    treasure.weights.push(e.weight);
                } else {
                    this._treasureData.set(e.boxID, { dataList: [e], weights: [e.weight] });
                }
            }
        })
    }

    @Decorator.noReply()
    public net_resetOpenTimes() {
        this.currentData.checkDate()
    }

    public net_openTreasureBox(boxID: number) {
        if (this.currentData.openTimes >= GameConfig.SubGlobal.openBoxTimes.number) return 0;
        if (!this._treasureData.has(boxID)) return -1;
        let treasure = this._treasureData.get(boxID);
        let index = CommonUtils.weightRandom(treasure.weights);
        let reward = treasure.dataList[index];
        reward.itemID.forEach(e => {
            let itemData = GameConfig.Item.getElement(e[0]);
            if (itemData.type == 5) {//货币
                RouteDefine.changeFearCoin(this.currentPlayer.userId, e[1])
            } else {
                RouteDefine.addSpecialItem(this.currentPlayer.userId, e[0], e[1], false);
            }
        })
        this.currentData.changeOpenTimes()
        return reward.id
    }

}