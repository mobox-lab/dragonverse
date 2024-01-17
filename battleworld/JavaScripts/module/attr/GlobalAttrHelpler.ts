import { GlobalAttributeType } from "../../const/Enum";
import GlobalAttribute from "./GlobalAttribute";

export class GlobalAttrHelpler {

    /**服务端唯一全局脚本 */
    private static _attr: GlobalAttribute = null;

    /**
     * 修改脚本属性 
     */
    public static changeAttr(type: GlobalAttributeType, value: number | string) {
        if (this._attr == null) {
            return;
        }
        this._attr.changeAttr(type, value);
    }

    /**
     * 获取脚本
     */
    public static get attr() {
        return this._attr;
    }

    /**
     * 设置脚本
     */
    public static setAttr(value: GlobalAttribute) {
        this._attr = value;
    }

    /**
     * 获取属性
     */
    public static getAttr(type: GlobalAttributeType): number | string {
        if (this._attr == null) {
            return 0;
        }
        return this._attr.getAttr(type);
    }
}