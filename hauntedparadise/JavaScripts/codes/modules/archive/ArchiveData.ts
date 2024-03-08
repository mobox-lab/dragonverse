/*
 * @Author       : dal
 * @Date         : 2023-11-23 09:58:50
 * @LastEditors  : dal
 * @LastEditTime : 2023-11-23 10:01:24
 * @FilePath     : \hauntedparadise\JavaScripts\modules\archive\ArchiveData.ts
 * @Description  : 
 */

import { MapEx } from "../../utils/MapEx";
import { MaxArchiveNum } from "./ArchiveHelper";

export default class PlayerArchiveData extends Subdata {

    /** 各存档的点击次数，用来发埋点 */
    @Decorator.persistence()
    clickCountMap: MapEx.MapExClass<number> = {};

    protected override initDefaultData(): void {
        for (let index = 0; index < MaxArchiveNum; index++) { MapEx.set(this.clickCountMap, index, 1); }
        this.save(true);
    }

    /** 获取读档次数 */
    public getClickCount(id: number) {
        if (!MapEx.has(this.clickCountMap, id)) { return -1; }
        return MapEx.get(this.clickCountMap, id);
    }

    /** 增加读档次数 */
    public addClickCount(id: number) {
        MapEx.set(this.clickCountMap, id, this.getClickCount(id) + 1);
        this.save(true);
    }

    /** 初始化读档次数 */
    public initClickCount(id: number) {
        MapEx.set(this.clickCountMap, id, 1);
        this.save(true);
    }
}