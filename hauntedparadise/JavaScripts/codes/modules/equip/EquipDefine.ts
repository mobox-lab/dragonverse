/*
 * @Author       : dal
 * @Date         : 2024-02-27 14:40:03
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-05 16:11:43
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\equip\EquipDefine.ts
 * @Description  : 
 */
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { BagItemData } from "../bag/BagDefine";
import { EquipModuleC } from "./EquipModuleC";
import { EquipModuleS } from "./EquipModuleS";


export class EquipDefine {
    public static EquipEvt = "EquipEvt";

    public static curPlayerEquipItem: BagItemData;
    static _lastActiveTime: number;

    public static EquipItem(guid: string) {
        if (SystemUtil.isClient()) {
            ModuleService.getModule(EquipModuleC).equip(guid);
        }
    }

    public static getCurItem(playerId: number) {
        if (SystemUtil.isClient()) {
            return ModuleService.getModule(EquipModuleC).getPlayerEquip();
        }
        if (SystemUtil.isServer()) {
            return ModuleService.getModule(EquipModuleS).getPlayerEquip(playerId);
        }
    }

    public static useItem(playerId: number, useCount = 1) {
        if (SystemUtil.isClient()) {
            ModuleService.getModule(EquipModuleC).useItem(playerId, useCount);
        }
        if (SystemUtil.isServer()) {
            ModuleService.getModule(EquipModuleS).net_useItem(playerId, useCount);
        }
    }

    /**
     * 客户端主动使用物品
     */
    public static async activeUseEquip(useCount: number = 1) {
        let curTIme = TimeUtil.elapsedTime();
        if (curTIme - this._lastActiveTime < 0.5) {
            console.error("操作过于频繁")
            return false;
        }
        this._lastActiveTime = curTIme;
        if (this.curPlayerEquipItem) {
            return ModuleService.getModule(EquipModuleC).useItem(Player.localPlayer.playerId, useCount);
        }
    }

    public static discardEquip() {
        ModuleService.getModule(EquipModuleC).discard();
    }
}

Event.addLocalListener(EquipDefine.EquipEvt, (equipData: BagItemData) => {
    EquipDefine.curPlayerEquipItem = equipData;
})