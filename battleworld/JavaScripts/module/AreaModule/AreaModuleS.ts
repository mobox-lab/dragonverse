import { GameConfig } from "../../config/GameConfig";
import { EAreaEvents_S, EAreaId, EAttributeEvents_S, EBuffEvent_S, EModule_Events_S, EPlayerEvents_S } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { PlayerManager } from "../PlayerModule/PlayerManager";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { AreaModuleC } from "./AreaModuleC";
import { PlayerModuleData } from "../PlayerModule/PlayerModuleData";
import { AttributeModuleS } from "../AttributeModule/AttributeModuleS";
import { Globaldata } from "../../const/Globaldata";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { EHurtSource, THurtSourceData } from "../AnalyticsModule/AnalyticsTool";
import { LandModuleS } from "../LandModule/LandModuleS";

/**
 * 区域判定模块
 * 1. 判定玩家在哪个大区域
 * 
 * 注意：
 * 玩家如果存在传送行为，记得主动改下区域id
 */

export class AreaModuleS extends ModuleS<AreaModuleC, null>{



    protected onStart(): void {


        EventManager.instance.add(EAreaEvents_S.Area_SetBattleAreaId, this.listen_SetBattleAreaId, this);

    }

    private listen_SetBattleAreaId(pId: number) {
        this.setPlayerAreaId(pId, EAreaId.Battle);
    }

    /**
     * 设置玩家区域id
     */
    @Decorator.noReply()
    public net_setPlayerAreaId(areaId: EAreaId) {
        this.setPlayerAreaId(this.currentPlayerId, areaId);
    }

    private setPlayerAreaId(pId: number, areaId: EAreaId) {
        EventManager.instance.call(EAttributeEvents_S.attr_change_s, pId, Attribute.EnumAttributeType.areaId, areaId);
        EventManager.instance.call(EModule_Events_S.area_changeArea, pId, areaId);



        if (areaId == EAreaId.Battle) {
            // 设置玩家不能切换武器
            EventManager.instance.call(EAttributeEvents_S.attr_change_s, pId, Attribute.EnumAttributeType.isCanChangeWeapon, 1);

            // 记录进入战斗区域时时间戳
            let playerData = DataCenterS.getData(pId, PlayerModuleData);
            if (playerData) {
                playerData.enterBattleTime();
            }
        } else if (areaId == EAreaId.Safe) {

            // 清理玩家所有buff
            EventManager.instance.call(EBuffEvent_S.BuffEvent_RemoveAllBuff_S, pId);
        }
    }


    /**
     * 设置玩家回到安全区
     */
    @Decorator.noReply()
    public net_transmitSafeArea() {
        let cfg = GameConfig.Area.getElement(EAreaId.Safe);
        if (cfg == null || cfg.bornPoint == null) {
            return;
        }
        // 清理玩家所有buff
        EventManager.instance.call(EBuffEvent_S.BuffEvent_RemoveAllBuff_S, this.currentPlayerId);
        this.currentPlayer.character.worldTransform.position = cfg.bornPoint;


        EventManager.instance.call(EAttributeEvents_S.attr_change_s, this.currentPlayerId, Attribute.EnumAttributeType.areaId, EAreaId.Safe);
        EventManager.instance.call(EModule_Events_S.area_changeArea, this.currentPlayerId, EAreaId.Safe);
    }



}