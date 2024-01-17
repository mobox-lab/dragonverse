import { oTraceError } from "odin";
import { EAttributeEvents_C } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";

@mw.Component
export class AttrPlayerStateSync extends mw.PlayerState {

    /**玩家金币数量*/
    @mw.Property({ replicated: true, onChanged: "client_call_attr_52" })
    public attr52: number = 0;
    private async client_call_attr_52(path: string[], value: number, oldVal: number) {
        await ModuleService.ready();
        EventManager.instance.call(EAttributeEvents_C.Attribute_Money_Change_C, value, oldVal);
    }


    /**技能点数量*/
    @mw.Property({ replicated: true, onChanged: "client_call_attr_78" })
    public attr78: number = 0;
    private async client_call_attr_78(path: string[], value: number, oldVal: number) {
        await ModuleService.ready();
        EventManager.instance.call(EAttributeEvents_C.Attribute_SkillPoints_Change_C, value, oldVal);
    }

    /**玩家能否切换武器 0可以 1不可以*/
    @mw.Property({
        replicated: true,
        onChanged: `client_call_attr_${Attribute.EnumAttributeType.isCanChangeWeapon}`
    })
    public attr81: number = 0;
    // private async client_call_attr_81() {

    // }

    /**玩家fsm状态机状态*/
    @mw.Property({
        replicated: true,
        onChanged: `client_call_attr_${Attribute.EnumAttributeType.fsmState}`
    })
    public attr82: number = 0;
    // private async client_call_attr_82() {

    // }

    /**玩家今日已获取段位分 */
    @mw.Property({ replicated: true })
    public attr61: number = -1;

    /**更新属性 */
    public setAttrValue(attrType: Attribute.EnumAttributeType, value: number | string) {

        let funcStr = `attr${attrType}`;

        if (this[funcStr] == null) {
            oTraceError("AttributeSync.updateAttr", "属性不存在", attrType);
            return;
        }

        this[funcStr] = value;
    }

    /**获取属性值 */
    public getAttrValue(attrType: Attribute.EnumAttributeType) {
        let funcStr = `attr${attrType}`;

        if (this[funcStr] == null) {
            oTraceError("AttrPlayerStateSync.getAttrValue", "属性不存在", attrType);
            return;
        }
        return this[funcStr];
    }

}