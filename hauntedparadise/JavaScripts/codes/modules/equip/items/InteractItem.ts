/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-29 10:48:22
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-04 17:23:08
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\equip\items\InteractItem.ts
 * @Description  : 
 */

import { IItemElement } from "../../../../config/Item";
import { EquipModuleC } from "../EquipModuleC";
import { Item, registerItem } from "./Item";

@registerItem
export class InteractItem extends Item {
    protected onHand(element: IItemElement, itemIns: mw.GameObject, ownerId: number): void {
        if (ownerId != Player.localPlayer.playerId) return
        ModuleService.getModule(EquipModuleC).scanTarget()
    }

    protected onRemoveHand(element: IItemElement, ownerId: number): void {
        ModuleService.getModule(EquipModuleC).stopScanTarget()
    }

    protected onUse(element: IItemElement): boolean {
        return ModuleService.getModule(EquipModuleC).reqUseInteractItem(element.id)
    }

}