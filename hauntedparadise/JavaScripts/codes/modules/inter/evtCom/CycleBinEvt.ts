/*
 * @Author       : dal
 * @Date         : 2023-11-12 14:59:22
 * @LastEditors  : dal
 * @LastEditTime : 2023-11-12 16:20:04
 * @FilePath     : \hauntedparadise\JavaScripts\modules\inter\evtCom\CycleBinEvt.ts
 * @Description  : 
 */
import { GameConfig } from "../../../../config/GameConfig";
import { CommonUtils } from "../../../utils/CommonUtils";
import Tips from "../../../utils/Tips";
import { BagDefine } from "../../bag/BagDefine";
import { IEvtCom, RegisterEvt } from "./IEvtCom";

@RegisterEvt
export class CycleBinEvt implements IEvtCom {
    evtName: string = "evt_ProbabilityGetItemsByID";

    onGetCall(goid: string, bagIds: string, countIds: string, rates: string) {
        console.log(bagIds + " : " + countIds + " : " + rates);
        let bagIdList: number[] = bagIds.split("|").map(Number);
        let countList: number[] = countIds.split("|").map(Number);
        let rateList: number[] = rates.split("|").map(Number);
        let id = CommonUtils.getIdByRateList(rateList);
        if (id === -1) {
            Tips.show(GameConfig.Language.tips_show_05.Value);
        }else {
            // Tips.show(`你翻找了一会垃圾桶，恭喜你找到了${GameConfig.Item.getElement(bagIdList[id]).name}`);
            BagDefine.AddItem(Player.localPlayer.playerId, bagIdList[id]);
        }
    }
}