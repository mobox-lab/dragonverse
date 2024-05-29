import { Singleton } from "../../tool/FunctionUtil";
import { IUnitBase } from "./IUnitBase";

/**
 * 场景单位管理单例，双端
 */
@Singleton()
export class UnitManager {
    public static instance: UnitManager = null;

    private _unitMap: Map<number, IUnitBase> = new Map();

    /** 添加场景单位 */
    public addUnit(unitId: number, unit: IUnitBase) {
        if (this._unitMap.has(unitId)) {
            return;
        }
        this._unitMap.set(unitId, unit);
    }

    /** 删除场景单位 */
    public removeUnit(unitId: number) {
        if (this._unitMap.has(unitId) == false) {
            return;
        }
        let unit = this._unitMap.get(unitId);
        this._unitMap.delete(unitId);

        return unit;
    }

    /** 获取场景单位 */
    public getUnit(unitId: number): IUnitBase {
        if (!this._unitMap.has(unitId)) return null;
        return this._unitMap.get(unitId);
    }

    /** 获取所有场景单位 */
    public getAllUnit(): IUnitBase[] {
        return Array.from(this._unitMap.values());
    }

}