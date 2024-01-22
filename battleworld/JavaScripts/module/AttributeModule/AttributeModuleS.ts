import { oTraceError } from "odin";
import { EAttributeEvents_S } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { AttributeModuleC } from "./AttributeModuleC";
import AttributeSync from "./AttributeSync";
import { AttrPlayerStateSync } from "./AttrPlayerStateSync";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";

/**
 * 设计所有玩家需要进行属性同步的模块
 * 1.单向属性同步
 * 2.广播属性同步
 */
export class AttributeModuleS extends ModuleS<AttributeModuleC, null> {

    /**玩家属性同步对象 */
    private _attrSyncMap: Map<number, AttributeSync> = new Map();
    /**玩家模块S */
    private _playerS: PlayerModuleS = null;

    onStart() {
        EventManager.instance.add(EAttributeEvents_S.attr_change_s, this.listen_attr_change, this);
        EventManager.instance.add(EAttributeEvents_S.AttrEvent_CalculateAttr_S, this.listen_calculateAttr, this);
        this._playerS = ModuleService.getModule(PlayerModuleS);
    }

    /**
     * 玩家进入游戏时监听
     * @param player 玩家对象
     */
    protected async onPlayerJoined(player: mw.Player) {
        let pId = player.playerId;
        if (this._attrSyncMap.has(pId)) return;

        let attrSync = await mw.Script.spawnScript(AttributeSync);

        attrSync.server_init(pId);

        this._attrSyncMap.set(pId, attrSync);

    }

    protected onPlayerEnterGame(player: mw.Player): void {
        let pId = player.playerId;
        this.setAttrValue(pId, Attribute.EnumAttributeType.rankScore, this._playerS.getPlayerAttr(player.playerId, Attribute.EnumAttributeType.rankScore));
        this.setAttrValue(pId, Attribute.EnumAttributeType.dayRankScore, this._playerS.getPlayerAttr(player.playerId, Attribute.EnumAttributeType.dayRankScore));
        this.setAttrValue(pId, Attribute.EnumAttributeType.isShowRank, this._playerS.getPlayerAttr(player.playerId, Attribute.EnumAttributeType.isShowRank));
    }

    /**
      * 玩家离开游戏时监听
      * @param player 玩家对象
      */
    protected onPlayerLeft(player: mw.Player): void {
        let pId = player.playerId;
        if (this._attrSyncMap.has(pId) == false) return;

        let attrSync = this._attrSyncMap.get(pId);

        attrSync.destroy();

        this._attrSyncMap.delete(pId);
    }


    /**
     * 玩家属性发生变化
     * @param pId 玩家id
     * @param attrType 属性类型
     * @param value 属性值
     */
    private async listen_attr_change(pId: number, attrType: Attribute.EnumAttributeType, value: number | string) {
        this.setAttrValue(pId, attrType, value);
    }

    /**监听玩家属性值修改 */
    private listen_calculateAttr(pId: number, attrType: Attribute.EnumAttributeType, value: number) {
        this.calculateAttrValue(pId, attrType, value);
    }

    /**
     * 设置玩家属性值
     * @param pId 玩家id
     * @param attrType 属性类型
     * @param value 属性值
     */
    public setAttrValue(pId: number, attrType: Attribute.EnumAttributeType, value: number | string) {
        if (this._attrSyncMap.has(pId) == false) {
            oTraceError("AttributeModuleS.setAttrValue", "玩家属性同步对象不存在", pId);
            return;
        }

        // 属性值修改前做一次校验
        switch (attrType) {
            case Attribute.EnumAttributeType.angerValue:
                {
                    if (typeof (value) == "number") {
                        // 该值不得超过最大怒气值
                        let maxAngerValue = this.getAttrValue(pId, Attribute.EnumAttributeType.maxAngerValue);
                        value = MathUtil.clamp(value, 0, maxAngerValue);
                    }
                }
                break;

            default:
                break;
        }

        // 判断是否为定向同步属性
        if (Attribute.IsPlayStateAttribute(attrType)) {
            let player = mw.Player.getPlayer(pId);

            if (player == null) {
                return;
            }

            player.getPlayerState(AttrPlayerStateSync).setAttrValue(attrType, value);
            return;
        }

        // 广播同步属性
        let attrSync = this._attrSyncMap.get(pId);
        attrSync.setAttrValue(attrType, value);
    }

    /**
     * 获取属性值
     * @param pId 玩家id
     * @param attrType 属性类型
     * @returns 属性值
     */
    public getAttrValue(pId: number, attrType: Attribute.EnumAttributeType) {
        if (this._attrSyncMap.has(pId) == false) {
            oTraceError("AttributeModuleS.getAttrValue", "玩家属性同步对象不存在", pId);
            return;
        }

        // 判断是否为定向同步属性
        if (Attribute.IsPlayStateAttribute(attrType)) {
            let player = mw.Player.getPlayer(pId);
            if (player == null) {
                return;
            }
            return player.getPlayerState(AttrPlayerStateSync).getAttrValue(attrType);
        }

        // 广播同步属性
        let attrSync = this._attrSyncMap.get(pId);
        return attrSync.getAttrValue(attrType)
    }

    /**
     * 计算玩家属性
     * @param attrType 属性类型 
     * @param value 属性值 正数或负数 （整数）
     */
    public calculateAttrValue(pId: number, attrType: Attribute.EnumAttributeType, value: number) {

        // 如果不为存储类型直接去属性同步模块进行计算
        if (Attribute.IsStashAttribute(attrType)) {
            console.error("AttributeModuleS:calculateAttrValue 存储类型数据都通过playermoduleS模块统一计算 ", pId, attrType, value);
            return;
        }

        if (this._attrSyncMap.has(pId) == false) {
            oTraceError("AttributeModuleS.calculateAttrValue", "玩家属性同步对象不存在", pId);
            return;
        }

        value = Math.floor(value);

        let curValue = this.getAttrValue(pId, attrType);
        let endValue = curValue + value;

        this.setAttrValue(pId, attrType, endValue);
    }


}