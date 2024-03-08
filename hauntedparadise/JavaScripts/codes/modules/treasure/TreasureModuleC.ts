/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-27 10:17:43
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-06 17:16:49
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\treasure\TreasureModuleC.ts
 * @Description  : 
 */

import { AddGMCommand } from "module_gm";
import TreasureBox from "./TreasureBox";
import TreasureData from "./TreasureData";
import TreasureModuleS from "./TreasureModuleS";
import { UIGainPrize } from "./ui/UIGainPrize";
import { UITreasureBox } from "./ui/UITreasureBox";
import Tips from "../../utils/Tips";

AddGMCommand("开宝箱", (player: mw.Player, val: string) => {
    ModuleService.getModule(TreasureModuleC).reqOpenTreasureBox(1);
}, null)

export default class TreasureModuleC extends ModuleC<TreasureModuleS, TreasureData> {
    private _boxMap: Map<number, TreasureBox> = new Map()

    protected onStart(): void {

        this.server.net_resetOpenTimes();
        Event.addLocalListener("evt_showTreasureUI", (guid: string, id: string) => {
            UIService.show(UITreasureBox, Number(id))
        })

    }

    public registerBox(boxID: number, _treasureBox: TreasureBox) {
        this._boxMap.set(boxID, _treasureBox);
    }

    public async reqOpenTreasureBox(boxID: number) {
        let result = await this.server.net_openTreasureBox(boxID);
        switch (result) {
            case 0:
                console.log("开启次数用完");
                break;
            case -1:
                console.log("宝箱数据错误");
                break;
            default:
                if (!this._boxMap.has(boxID)) return
                this._boxMap.get(boxID).active(() => {
                    UIService.show(UIGainPrize, result)
                })
        }
    }

    public watchAd(boxID: number) {
        if (AdsService.isActive(AdsType.Reward)) {
            AdsService.isReady(AdsType.Reward, (isReady: boolean) => {
                if (isReady) {
                    AdsService.showAd(AdsType.Reward, (isSuccess: boolean) => {
                        if (isSuccess) {
                            this.reqOpenTreasureBox(boxID)
                        } else {
                            Tips.show("广告播放失败")
                            console.log("#>>>>>>>广告播放失败");
                        }
                    })
                } else {
                    Tips.show("广告未准备好")
                    console.log("#>>>>>>>广告未准备好");
                }
            })
        } else {
            Tips.show("广告未激活")
            console.log("#>>>>>>>广告未激活");
        }
    }

}