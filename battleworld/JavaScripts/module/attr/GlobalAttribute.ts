import { EModule_Events, GlobalAttributeType } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { GlobalAttrHelpler } from "./GlobalAttrHelpler";




@Component
export default class GlobalAttribute extends mw.Script {

    @mw.Property({ replicated: true, multicast: true, onChanged: "client_init" })
    public attr0: number = 0; // 初始化
    private client_init() {
        GlobalAttrHelpler.setAttr(this);
    }

    /**
     * 改变属性
     */
    public changeAttr(attrType: GlobalAttributeType, value: number | string) {
        if (SystemUtil.isClient()) {
            return;
        }
        let str: string = `attr${attrType}`;
        if (this[str] == null) {
            return;
        }
        if (this[str] == value) {
            return;
        }
        this[str] = value;
    }

    /**
     * 获取属性
     */
    public getAttr(attrType: number): number | string {
        let str: string = `attr${attrType}`;
        return this[str];
    }
}