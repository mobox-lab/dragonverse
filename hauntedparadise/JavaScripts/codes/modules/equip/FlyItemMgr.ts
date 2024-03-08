/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-03-01 16:48:50
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-01 16:51:05
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\equip\FlyItemMgr.ts
 * @Description  : 
 */

import { IItemElement } from "../../../config/Item";
import { FlyItem } from "./FlyItem";

export class FlyItemMgr {

    static genItemID: number = 0;

    static _instance: FlyItemMgr;

    private _itemMap: Map<number, FlyItem> = new Map()

    static get instance() {
        if (!FlyItemMgr._instance) {
            FlyItemMgr._instance = new FlyItemMgr()
        }
        return FlyItemMgr._instance;
    }
    createItem(data: IItemElement, startPos: Vector, target: mw.Player) {
        let uniqueID = FlyItemMgr.genItemID++
        let item = new FlyItem(uniqueID, data, startPos, target)
        this._itemMap.set(uniqueID, item);
    }

    deleteItem(uniqueID: number) {
        if (!this._itemMap.has(uniqueID)) return
        this._itemMap.delete(uniqueID)
    }

    update(dt) {
        this._itemMap.forEach(e => {
            e.update(dt)
        })
    }
}