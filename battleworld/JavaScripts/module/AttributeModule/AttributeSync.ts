import { oTraceError } from "odin";
import { EAreaEvent_C, EAttributeEvents_C, EPlayerEvents_C } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { EventSyncTool } from "../../tool/EventSyncTool";




@Component
export default class AttributeSync extends mw.Script {

    /**玩家属性同步对象缓存 */
    public static AttributeMap: Map<number, AttributeSync> = new Map();

    @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_pId" })
    /**当前绑定的玩家id */
    public pId: number = 0;
    private client_call_pId() {

        if (AttributeSync.AttributeMap.has(this.pId)) {
            return;
        }

        AttributeSync.AttributeMap.set(this.pId, this);

        EventSyncTool.dispatchToLocal(EPlayerEvents_C.player_syncPlayerid_c, this.pId, this.attr75, this.attr51);
    }

    /**玩家区域id */
    @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_attr_74" })
    public attr74: number = 0
    private client_call_attr_74() {
        EventSyncTool.dispatchToLocal(EAreaEvent_C.area_updateAreaId_c, this.pId, this.attr74);
    }

    /**玩家名称 */
    @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_attr_75" })
    public attr75: string = ""
    private client_call_attr_75() {
        EventSyncTool.dispatchToLocal(EPlayerEvents_C.player_syncPlayerName_c, this.pId, this.attr75, this.attr51, this.attr59);
    }

    /**玩家当前血量*/
    @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_attr_70" })
    public attr70: number = 0
    private client_call_attr_70() {

        EventSyncTool.dispatchToLocal(EPlayerEvents_C.attr_change, this.pId, Attribute.EnumAttributeType.hp, this.attr70);
    }

    /**玩家最大生命值 maxHp*/
    @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_attr_2" })
    public attr2: number = 0
    private client_call_attr_2() {

        EventSyncTool.dispatchToLocal(EPlayerEvents_C.attr_change, this.pId, Attribute.EnumAttributeType.maxHp, this.attr2);
    }


    /**玩家是否显示ui 0不显示 1显示*/
    @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_attr_80" })
    public attr80: number = 0;
    private client_call_attr_80() {
        EventSyncTool.dispatchToLocal(EPlayerEvents_C.player_syncPlayerHPVisable_c, this.pId, this.attr80);
    }

    /**玩家等级*/
    @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_attr_51" })
    public attr51: number = 0;
    private client_call_attr_51() {
        EventSyncTool.dispatchToLocal(EPlayerEvents_C.attr_change, this.pId, Attribute.EnumAttributeType.lv, this.attr51);
    }

    /**玩家武器id*/
    @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_attr_73" })
    public attr73: number = 0;
    private client_call_attr_73() {
        EventSyncTool.dispatchToLocal(EAttributeEvents_C.Attribute_WeaponId_Change_C, this.pId, this.attr73);
    }

    /**玩家随机的技能id数组字符串*/
    @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_attr_76" })
    public attr76: string = "";
    private client_call_attr_76() {
        EventSyncTool.dispatchToLocal(EAttributeEvents_C.Attribute_RandomSkillLibIds_Change_C, this.pId, this.attr76);
    }

    /**玩家当前装备的技能库id数组字符串*/
    @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_attr_77" })
    public attr77: string = "";
    private client_call_attr_77() {
        EventSyncTool.dispatchToLocal(EAttributeEvents_C.Attribute_EquipSkillLibIds_Change_C, this.pId, this.attr77);
    }

    /**玩家杀戮值*/
    @mw.Property({ replicated: true, multicast: true, onChanged: `client_call_attr_${Attribute.EnumAttributeType.massacreValue}` })
    public attr83: number = 0;
    private client_call_attr_83() {
        EventSyncTool.dispatchToLocal(EAttributeEvents_C.Attribute_MassacreValue_C, this.pId, this.attr83);
    }

    /**玩家段位分 */
    @mw.Property({ replicated: true, multicast: true, onChanged: `client_call_attr_${Attribute.EnumAttributeType.rankScore}` })
    public attr59: number = -1;
    private client_call_attr_59() {
        EventSyncTool.dispatchToLocal(EAttributeEvents_C.Attribute_RankScore_Change_C, this.pId, this.attr59);
    }

    /**玩家段位是否显示 */
    @mw.Property({ replicated: true, multicast: true, onChanged: `client_call_attr_${Attribute.EnumAttributeType.isShowRank}` })
    public attr62: number = 0;
    private client_call_attr_62() {
        EventSyncTool.dispatchToLocal(EAttributeEvents_C.Attribute_RankShow_C, this.pId, this.attr62);
    }

    /**玩家显示隐藏状态 0显示状态 1隐藏状态 */
    @mw.Property({ replicated: true, multicast: true, onChanged: `client_call_attr_${Attribute.EnumAttributeType.playerVisible}` })
    public attr85: number = 0;
    private client_call_attr_85() {
        let visible = this.attr85 == 0 ? true : false;
        EventSyncTool.dispatchToLocal(EAttributeEvents_C.Attribute_PlayerVisible_C, this.pId, visible);
    }
    /**--------------------------------------------服务器--------------------------------------------------- */


    public server_init(pId: number) {
        this.pId = pId;
    }


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
    public getAttrValue(attrType: Attribute.EnumAttributeType,) {
        let funcStr = `attr${attrType}`;

        if (this[funcStr] == null) {
            oTraceError("AttributeSync.getAttrValue", "属性不存在", attrType);
            return;
        }
        return this[funcStr];
    }


    protected onDestroy(): void {
        AttributeSync.AttributeMap.delete(this.pId);
    }

}