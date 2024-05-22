import { GameConfig } from "../../config/GameConfig";
import { EAreaEvents_S, EAreaId, EAttributeEvents_S, EBuffEvent_S, EDefineType, EModule_Events_S, EPlayerEvents_S } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { PlayerManager } from "../PlayerModule/PlayerManager";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { AreaModuleC } from "./AreaModuleC";
import { BattleWorldPlayerModuleData } from "../PlayerModule/PlayerModuleData";
import { AttributeModuleS } from "../AttributeModule/AttributeModuleS";
import { Globaldata } from "../../const/Globaldata";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { EHurtSource, THurtSourceData } from "../AnalyticsModule/AnalyticsTool";
import { LandModuleS } from "../LandModule/LandModuleS";
import GameServiceConfig from "../../const/GameServiceConfig";
import Log4Ts from "../../depend/log4ts/Log4Ts";

/**
 * 区域判定模块
 * 1. 判定玩家在哪个大区域
 * 
 * 注意：
 * 玩家如果存在传送行为，记得主动改下区域id
 */

export class AreaModuleS extends ModuleS<AreaModuleC, null> {



    protected onStart(): void {
        EventManager.instance.add(EAreaEvents_S.Area_SetBattleAreaId, this.listen_SetBattleAreaId, this);
        this.initTrigger();
    }

    private initTrigger() {
        Log4Ts.log(AreaModuleS, `initTrigger`);
        let triggers = GameObject.findGameObjectsByTag("DeadTrigger");
        for (let i = 0; i < triggers.length; i++) {
            let trigger = triggers[i] as mw.Trigger;
            trigger.onEnter.add(this.deadTriggerEnter.bind(this));
        }

        let magmaTriggers = GameObject.findGameObjectsByTag("MagmaTrigger");
        for (let i = 0; i < magmaTriggers.length; i++) {
            Log4Ts.log(AreaModuleS, `set magma trigger`);
            let trigger = magmaTriggers[i] as mw.Trigger;
            trigger.onEnter.add(this.magmaTriggerEnter.bind(this));
            trigger.onLeave.add(this.magmaTriggerLeave.bind(this));
        }

    }

    private _currentInMagmaPlayers: Map<number, number> = new Map();
    protected onUpdate(dt: number): void {

    }
    protected onPlayerLeft(player: mw.Player): void {
        if (this._currentInMagmaPlayers.has(player.playerId)) {
            let interval = this._currentInMagmaPlayers.get(player.playerId);
            if (interval) {
                TimeUtil.clearInterval(interval);
            }
            this._currentInMagmaPlayers.delete(player.playerId);
        }
    }

    /** 
     * @description: 岩浆触发器进入
     * @param obj
     * @return 
     */
    private magmaTriggerEnter(obj: GameObject) {
        if (obj instanceof Character && obj.player !== undefined) {
            //如果已经在岩浆里面了，就不再扣血
            //加个interval
            if (this._currentInMagmaPlayers.has(obj.player.playerId)) return;
            Log4Ts.log(AreaModuleS, `enter magma trigger`);
            let flag = TimeUtil.setInterval(() => {
                let hurtSourceData: THurtSourceData = {
                    source: EHurtSource.sea,
                    skillId: 0,
                    skillEffectId: 0,
                }
                ModuleService.getModule(PlayerModuleS).reducePlayerAttr(obj.player.playerId, Attribute.EnumAttributeType.hp, GameServiceConfig.MAGMA_TRIGGER_HURT, 0, EDefineType.none, hurtSourceData);

            }, GameServiceConfig.MAGMA_TRIGGER_HURT_INTERVAL / 1e3);
            //立即扣一次
            let hurtSourceData: THurtSourceData = {
                source: EHurtSource.sea,
                skillId: 0,
                skillEffectId: 0,
            }
            ModuleService.getModule(PlayerModuleS).reducePlayerAttr(obj.player.playerId, Attribute.EnumAttributeType.hp, GameServiceConfig.MAGMA_TRIGGER_HURT, 0, EDefineType.none, hurtSourceData);

            this._currentInMagmaPlayers.set(obj.player.playerId, flag);
        }
    }
    /** 
     * @description: 岩浆触发器离开
     * @param obj
     * @return 
     */
    private magmaTriggerLeave(obj: GameObject) {
        if (obj instanceof Character && obj.player !== undefined) {
            //需要检测所有触发器是否在里面
            if (this._currentInMagmaPlayers.has(obj.player.playerId) && GameObject.findGameObjectsByTag("MagmaTrigger").filter((trigger) => (trigger as Trigger).checkInArea(obj)).length === 0) {

                Log4Ts.log(AreaModuleS, `leave magma trigger`);
                let interval = this._currentInMagmaPlayers.get(obj.player.playerId);
                if (interval) {
                    TimeUtil.clearInterval(interval);
                }
                this._currentInMagmaPlayers.delete(obj.player.playerId);
            }
        }
    }

    /** 
     * @description: 地底死亡触发器
     * @param obj
     * @return 
     */
    private deadTriggerEnter(obj: GameObject) {
        if (obj instanceof Character && obj.player !== undefined) {
            let player = obj.player;
            if (obj.player.playerId === player.playerId) {
                //掉一半血传送回战场随机点位
                // let hp = ModuleService.getModule(PlayerModuleS).getPlayerAttr(player.playerId, Attribute.EnumAttributeType.hp);
                // if (hp <= 0) {
                //     return;
                // }
                let maxHP = ModuleService.getModule(PlayerModuleS).getPlayerAttr(player.playerId, Attribute.EnumAttributeType.maxHp);

                // let position = ModuleService.getModule(LandModuleS).getRandomPosition(player);

                // player.character.worldTransform.position = position;
                this.getClient(player).net_dropLand();
                let hurtSourceData: THurtSourceData = {
                    source: EHurtSource.sea,
                    skillId: 0,
                    skillEffectId: 0,
                }
                ModuleService.getModule(PlayerModuleS).reducePlayerAttr(player.playerId, Attribute.EnumAttributeType.hp, maxHP * 0.5, 0, EDefineType.none, hurtSourceData);
            }
        }
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

    public setPlayerAreaId(pId: number, areaId: EAreaId) {
        EventManager.instance.call(EAttributeEvents_S.attr_change_s, pId, Attribute.EnumAttributeType.areaId, areaId);
        EventManager.instance.call(EModule_Events_S.area_changeArea, pId, areaId);



        if (areaId == EAreaId.Battle) {
            // 设置玩家不能切换武器
            EventManager.instance.call(EAttributeEvents_S.attr_change_s, pId, Attribute.EnumAttributeType.isCanChangeWeapon, 1);

            // 记录进入战斗区域时时间戳
            let playerData = DataCenterS.getData(pId, BattleWorldPlayerModuleData);
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

        let currentHp = ModuleService.getModule(PlayerModuleS).getPlayerAttr(this.currentPlayerId, Attribute.EnumAttributeType.hp);
        let maxHp = ModuleService.getModule(PlayerModuleS).getPlayerAttr(this.currentPlayerId, Attribute.EnumAttributeType.maxHp);
        if (currentHp < maxHp) {
            //说明不是战斗状态
            ModuleService.getModule(PlayerModuleS).exitFight(this.currentPlayerId);
        }
        EventManager.instance.call(EAttributeEvents_S.attr_change_s, this.currentPlayerId, Attribute.EnumAttributeType.areaId, EAreaId.Safe);
        EventManager.instance.call(EModule_Events_S.area_changeArea, this.currentPlayerId, EAreaId.Safe);
    }



}