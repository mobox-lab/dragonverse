import { GameConfig } from "../../config/GameConfig";
import { EAttributeEvents_S, EPlayerEvents_S, EWeaponEvent_S } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { PlayerModuleData } from "../PlayerModule/PlayerModuleData";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { WeaponModuleC } from "./WeaponModuleC";
import { WeaponModuleData } from "./WeaponModuleData";

export class WeaponModuleS extends ModuleS<WeaponModuleC, WeaponModuleData>{


    protected onStart(): void {

    }

    protected onPlayerEnterGame(player: mw.Player): void {
        let pId = player.playerId;
        let pData = this.getPlayerData(pId);
        if (pData == null) {
            return;
        }

        EventManager.instance.call(EAttributeEvents_S.attr_change_s, pId, Attribute.EnumAttributeType.weaponId, pData.getEquipWeaponId());
        // 武器加成
        EventManager.instance.call(EPlayerEvents_S.PlayerEvent_WeaponAdd_S, pId, true);

        let weaponId = pData.getEquipWeaponId();
        this.update_anger(pId, weaponId);
    }

    /**更新玩家怒气值 */
    private update_anger(pId: number, weaponId: number) {
        let weaponCfg = GameConfig.Weapon.getElement(weaponId);
        if (weaponCfg == null) {
            return;
        }
        // 更新最大怒气值
        EventManager.instance.call(EAttributeEvents_S.attr_change_s, pId, Attribute.EnumAttributeType.maxAngerValue, weaponCfg.maxAngerValue);
        EventManager.instance.call(EAttributeEvents_S.attr_change_s, pId, Attribute.EnumAttributeType.angerValue, 0);
    }

    /**
     * 购买武器
     * @param weaponId 武器id
     */
    @Decorator.noReply()
    public net_changeWeaponId(weaponId: number) {
        this.changeWeaponId(this.currentPlayerId, weaponId);
    }

    /**
     * 装备武器
     * @param pId 玩家id
     * @param weaponId 武器id
     */
    public changeWeaponId(pId: number, weaponId: number) {
        let pData = this.getPlayerData(pId);
        if (pData == null) {
            return;
        }
        if (pData.getEquipWeaponId() == weaponId) {
            return;
        }
        // 清理掉武器的加成
        EventManager.instance.call(EPlayerEvents_S.PlayerEvent_WeaponAdd_S, pId, false);
        // 先把玩家技能价差清理掉
        EventManager.instance.call(EPlayerEvents_S.PlayerEvent_CalculateSkillLibAdd_S, pId, false);

        pData.changeWeaponId(weaponId, true, true);
        EventManager.instance.call(EAttributeEvents_S.attr_change_s, pId, Attribute.EnumAttributeType.weaponId, weaponId);

        // 武器加成
        EventManager.instance.call(EPlayerEvents_S.PlayerEvent_WeaponAdd_S, pId, true);

        // 通知其它模块 武器修改
        EventManager.instance.call(EWeaponEvent_S.WeaponEvent_WeaponChange_S, pId, weaponId);

        this.update_anger(pId, weaponId);
    }

    /**
     * 购买武器
     * @param weaponId 武器id
     */
    @Decorator.noReply()
    public net_shopWeapon(weaponId: number) {
        let weaponTriggerCfg = GameConfig.WeaponTrigger.findElement("weaponId", weaponId);
        if (weaponTriggerCfg == null) {
            return;
        }

        let playerData = DataCenterS.getData(this.currentPlayerId, PlayerModuleData);
        if (playerData == null) {
            return;
        }

        let money = playerData.getAttrValue(Attribute.EnumAttributeType.money);
        if (money < weaponTriggerCfg.sellValue) {
            return;
        }

        let pData = this.currentData;
        let ownWeaponIds = pData.getOwnWeaponIds();
        if (ownWeaponIds.includes(weaponId)) {
            return;
        }
        pData.addWeaponId(weaponId, true);
        // 购买减金币后并装备
        EventManager.instance.call(EPlayerEvents_S.PlayerEvent_SubGold_S, this.currentPlayerId, -weaponTriggerCfg.sellValue)

        // 直接装备
        this.changeWeaponId(this.currentPlayerId, weaponId);
    }

}