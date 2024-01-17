import { GameConfig } from "../../config/GameConfig";
import { EAttributeEvents_S, EModule_Events_S, ENotice_Events_C, ENotice_Events_S, EPlayerEvents_S, ESkillEvent_S, EWeaponEvent_S } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { AnalyticsTool, EClickEvent } from "../AnalyticsModule/AnalyticsTool";
import { AttributeModuleS } from "../AttributeModule/AttributeModuleS";
import DressUpModuleS from "../DressUpModule/DressUpModuleS";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { WeaponModuleData } from "../WeaponModule/WeaponModuleData";
import { SkillModuleC } from "./SkillModuleC";
import { SkillPlayerProxy } from "./SkillPlayerProxy";

/**
 * 玩家技能分配、切换相关管理
 */
export class SkillModuleS extends ModuleS<SkillModuleC, null>{

    /**玩家技能代理缓存数组 */
    private skillPlayerProxyMap: Map<number, SkillPlayerProxy> = new Map();

    /**属性同步模块 */
    private mAttribute: AttributeModuleS = null;

    /**装扮模块 */
    private dressUpModule: DressUpModuleS = null;

    protected onStart(): void {
        this.mAttribute = ModuleService.getModule(AttributeModuleS);
        this.dressUpModule = ModuleService.getModule(DressUpModuleS);

        EventManager.instance.add(EWeaponEvent_S.WeaponEvent_WeaponChange_S, this.listen_weaponChange, this);
        EventManager.instance.add(ESkillEvent_S.SkillEvent_PickUpSkillBall_S, this.listen_pickUpSkillBall, this);
        EventManager.instance.add(EPlayerEvents_S.player_deadState_s, this.listen_playerDead, this);
    }

    /**玩家进入游戏 */
    protected onPlayerEnterGame(player: mw.Player): void {
        this.init_skillPlayerProxy(player.playerId);
    }

    /**玩家离开游戏 */
    protected onPlayerLeft(player: mw.Player): void {
        if (this.skillPlayerProxyMap.has(player.playerId) == false) {
            return;
        }

        this.clearSkillPointsToGold(player.playerId);

        this.skillPlayerProxyMap.delete(player.playerId);
    }

    /**初始化技能代理类 */
    private init_skillPlayerProxy(pId: number) {

        if (this.skillPlayerProxyMap.has(pId)) {
            return;
        }

        let data = DataCenterS.getData(pId, WeaponModuleData);
        if (data == null) {
            return;
        }

        let proxy = new SkillPlayerProxy(pId);
        proxy.setWeaponId(data.getEquipWeaponId());
        this.skillPlayerProxyMap.set(pId, proxy);
    }

    /**
     * 玩家武器id发生变化
     * @param pId 玩家id
     * @param weaponId 武器id
     */
    private listen_weaponChange(pId: number, weaponId: number) {
        if (this.skillPlayerProxyMap.has(pId) == false) {
            return;
        }
        this.skillPlayerProxyMap.get(pId).setWeaponId(weaponId);
    }

    /**
     * 拾取一个技能求
     * @param pId 玩家id
     */
    private listen_pickUpSkillBall(pId: number) {
        // 增加技能点
        EventManager.instance.call(EPlayerEvents_S.PlayerEvent_CalculateAttr_S
            , pId, Attribute.EnumAttributeType.weaponSkillPoints, 1);

        // 通知客户端打开技能选择界面
        this.getClient(pId).net_pickUpSkillBall();
    }


    /**
     * 监听玩家死亡
     * @param pId 玩家对象id
     */
    private listen_playerDead(pId: number) {

        let player = mw.Player.getPlayer(pId);
        if (player) {
            let data = DataCenterS.getData(pId, WeaponModuleData);
            if (data == null) {
                return;
            }
            // 埋点
            AnalyticsTool.send_ts_game_result(data.getEquipWeaponId(), player);
        }


        this.clearSkillPointsToGold(pId);
    }

    /**
     * 清除当前所有的技能
     * @param playerId 玩家id
     */
    public discardAllCurEquipSkills(playerId: number) {
        const proxy = this.skillPlayerProxyMap.get(playerId);
        if (proxy) {
            EventManager.instance.call(EPlayerEvents_S.PlayerEvent_CalculateSkillLibAdd_S, playerId, false);
            proxy.clear_curEquipSkillLibIdss();
        }
    }

    /**选择一个技能库id */
    @Decorator.noReply()
    public net_selectSkillLibId(skillLibId: number) {
        let pId = this.currentPlayerId;
        if (this.skillPlayerProxyMap.has(pId) == false) {
            return;
        }

        let proxy = this.skillPlayerProxyMap.get(pId);
        proxy.equipSkillLibId(skillLibId);
        EventManager.instance.call(EPlayerEvents_S.PlayerEvent_CalculateSkillLibAdd_S,
            pId, skillLibId, true);
    }

    /**
     * 给指定玩家一个技能
     * @param playerId 玩家id
     * @param skillLibId 技能库的id
     */
    public selectSkillLibId(playerId: number, skillLibId: number) {
        if (this.skillPlayerProxyMap.has(playerId) == false) {
            return;
        }
        EventManager.instance.call(EPlayerEvents_S.PlayerEvent_CalculateSkillLibAdd_S,
            playerId, false);
        let proxy = this.skillPlayerProxyMap.get(playerId);
        proxy.equipSkillLibId(skillLibId);
        EventManager.instance.call(EPlayerEvents_S.PlayerEvent_CalculateSkillLibAdd_S,
            playerId, true);
    }

    /**替换装备的技能库id */
    @Decorator.noReply()
    public net_replaceSkillLibId(skillLibId: number, replaceIndex: number) {
        let pId = this.currentPlayerId;
        if (this.skillPlayerProxyMap.has(pId) == false) {
            return;
        }

        let proxy = this.skillPlayerProxyMap.get(pId);
        let preSkillLibId = proxy.replaceSkillLibId(skillLibId, replaceIndex);

        if (preSkillLibId > -1) {
            EventManager.instance.call(EPlayerEvents_S.PlayerEvent_CalculateSkillLibAdd_S,
                pId, preSkillLibId, false);
        }

        EventManager.instance.call(EPlayerEvents_S.PlayerEvent_CalculateSkillLibAdd_S,
            pId, skillLibId, true);
    }

    /**放弃随机库的技能 */
    @Decorator.noReply()
    public net_giveUpRandomSkill() {
        if (this.skillPlayerProxyMap.has(this.currentPlayerId) == false) {
            return;
        }

        let proxy = this.skillPlayerProxyMap.get(this.currentPlayerId);
        proxy.giveUpRandomSkillLibIds();
    }

    /**清理所有技能点并装换成金币 */
    private clearSkillPointsToGold(pId: number) {
        if (this.skillPlayerProxyMap.has(pId) == false) {
            return;
        }

        let proxy = this.skillPlayerProxyMap.get(pId);

        // 增加的玩家金币数量
        let addGold = 0;

        // 将技能转换成金币
        for (let index = 0; index < proxy.CurEquipSkillLibIds.length; index++) {
            const equipSkillLibId = proxy.CurEquipSkillLibIds[index];
            let skillLibCfg = GameConfig.SkillLib.getElement(equipSkillLibId);
            if (skillLibCfg == null) {
                continue;
            }
            addGold += skillLibCfg.sellValue;

            // 减去技能加成
            EventManager.instance.call(EPlayerEvents_S.PlayerEvent_CalculateSkillLibAdd_S,
                pId, equipSkillLibId, false);
        }
        // // 减去技能加成
        // EventManager.instance.call(EPlayerEvents_S.PlayerEvent_CalculateSkillLibAdd_S,
        //     pId, false);
        // 清理掉玩家装备的技能
        this.discardAllCurEquipSkills(pId);

        // 剩余的技能id数量
        let skillPointCount = this.mAttribute.getAttrValue(pId, Attribute.EnumAttributeType.weaponSkillPoints);
        if (skillPointCount == null || skillPointCount <= 0) {
            if (addGold > 0) {

                // 增加玩家金币
                EventManager.instance.call(EPlayerEvents_S.PlayerEvent_AddGold_S,
                    pId, addGold, false);
                // 提示 //欢迎归来！上一局你一共获得了{}金币，继续加油！
                EventManager.instance.call(ENotice_Events_S.NoticeEvent_TipMsg_S, pId, "battal_dead_04", [addGold]);
            }
            return;
        }

        // 设置技能点属为0
        this.mAttribute.setAttrValue(pId, Attribute.EnumAttributeType.weaponSkillPoints, 0);

        let skillLibId = proxy.CurRandomLibIds[0];
        let skillLibCfg = GameConfig.SkillLib.getElement(skillLibId);
        if (skillLibCfg == null) {
            if (addGold > 0) {
                // 增加玩家金币
                EventManager.instance.call(EPlayerEvents_S.PlayerEvent_AddGold_S,
                    pId, addGold, false);
                // 提示 //欢迎归来！上一局你一共获得了{}金币，继续加油！
                EventManager.instance.call(ENotice_Events_S.NoticeEvent_TipMsg_S, pId, "battal_dead_04", [addGold]);
            }
            return;
        }

        addGold += skillLibCfg.sellValue * skillPointCount;

        if (addGold > 0) {
            // 增加玩家金币
            EventManager.instance.call(EPlayerEvents_S.PlayerEvent_AddGold_S,
                pId, addGold, false);
            EventManager.instance.call(ENotice_Events_S.NoticeEvent_TipMsg_S, pId, "battal_dead_04", [addGold]);
        }
    }

    /**
     * 获取当前玩家装备的技能库id数组
     * @param pId 玩家id
     */
    public getCurEquipSkillLibIds(pId: number) {
        if (this.skillPlayerProxyMap.has(pId) == false) {
            return null;
        }

        return this.skillPlayerProxyMap.get(pId).CurEquipSkillLibIds;
    }

    /**拾取一个技能求 */
    @Decorator.noReply()
    public net_pickUpSkillBall() {
        this.listen_pickUpSkillBall(this.currentPlayerId);
    }

    @Decorator.noReply()
    public net_addSkillPoint() {
        EventManager.instance.call(EAttributeEvents_S.AttrEvent_CalculateAttr_S, this.currentPlayerId, Attribute.EnumAttributeType.weaponSkillPoints, 1);
    }

}