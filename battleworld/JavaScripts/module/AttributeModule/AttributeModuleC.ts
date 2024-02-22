import { oTraceError } from "odin";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { AttrPlayerStateSync } from "./AttrPlayerStateSync";
import { AttributeModuleS } from "./AttributeModuleS";
import AttributeSync from "./AttributeSync";
import { EventManager } from "../../tool/EventManager";
import { EAttributeEvents_C } from "../../const/Enum";
import { BattleWorldPlayerModuleData } from "../PlayerModule/PlayerModuleData";


export class AttributeModuleC extends ModuleC<AttributeModuleS, null> {

    onAwake() {
        EventManager.instance.add(EAttributeEvents_C.Attribute_SetAttribute_C, this.listen_setAttribute, this);
    }

    protected onStart(): void {
        // 初始化属性相关

        // 同步基础属性
        let playerData = DataCenterC.getData(BattleWorldPlayerModuleData);
        if (playerData == null) {
            return;
        }

        let money = playerData.getAttrValue(Attribute.EnumAttributeType.money);
        this.setAttrValue(Attribute.EnumAttributeType.money, money);
    }

    /**
     * 修改玩家属性
     * @param attrType 属性类型 
     * @param value 属性值
     * @param pId 对象id
     */
    private listen_setAttribute(attrType: Attribute.EnumAttributeType,
        value: number | string, pId: number = this.localPlayerId, callOnChange: boolean = false) {
        this.setAttrValue(attrType, value, pId, callOnChange);
    }


    /**获取玩家属性 */
    public getAttributeValue(attrType: Attribute.EnumAttributeType, pId: number = this.localPlayerId) {


        // 判断是否为定向同步属性
        if (Attribute.IsPlayStateAttribute(attrType)) {
            let player = mw.Player.getPlayer(pId);
            if (player == null) {
                return;
            }

            // 注意 attrPlayerState 可能有为null的情况
            let attrPlayerState = player.getPlayerState(AttrPlayerStateSync);
            if (attrPlayerState == null) {
                return 0;
            }
            return attrPlayerState.getAttrValue(attrType);
        }

        if (AttributeSync.AttributeMap.has(pId) == false) return 0;

        let attrScript = AttributeSync.AttributeMap.get(pId);

        return attrScript.getAttrValue(attrType);
    }


    /**
     * 设置玩家属性值
     * @param pId 玩家id
     * @param attrType 属性类型
     * @param value 属性值
     */
    public setAttrValue(attrType: Attribute.EnumAttributeType, value: number | string,
        pId: number = this.localPlayerId, callOnChange: boolean = false) {

        // 判断是否为定向同步属性
        if (Attribute.IsPlayStateAttribute(attrType)) {
            let player = mw.Player.getPlayer(pId);

            if (player == null) {
                return;
            }
            let attrPlayerState = player.getPlayerState(AttrPlayerStateSync);
            if (attrPlayerState == null) {
                return
            }
            attrPlayerState.setAttrValue(attrType, value, callOnChange);
            return;
        }

        if (AttributeSync.AttributeMap.has(pId) == false) {
            oTraceError("AttributeModuleS.setAttrValue", "玩家属性同步对象不存在", pId);
            return;
        }

        let attrSync = AttributeSync.AttributeMap.get(pId);
        attrSync.setAttrValue(attrType, value, callOnChange);
    }

}