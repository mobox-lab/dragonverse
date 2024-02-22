import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { oTrace, oTraceError } from "odin";
import { GameConfig } from "../../config/GameConfig";
import { EAnalyticsEvents_S, EAreaId, EAttributeEvents_S, EBulletEvents_S, EDefineType, EEquipPartType, EItemAddType, EModule_Events_S, ENotice_Events_S, EPlayerEvents_S, EPlayerFightState } from "../../const/Enum";
import { Globaldata } from "../../const/Globaldata";
import { Constants } from "../../tool/Constants";
import DamageManger from "../../tool/DamageManger";
import { EventManager } from "../../tool/EventManager";
import { updater } from "../../tool/Updater";
import { util } from "../../tool/Utils";
import { AnalyticsTool, EFirstDo, EHurtSource, THurtSourceData } from "../AnalyticsModule/AnalyticsTool";
import { BulletMgrS } from "../BulletModule/bullet/BulletMgrS";
import { EquipModuleData } from "../EquipModule/EquipModuleData";
import { RecoveryLifeBuffS } from "../buffModule/Buff/CustomBuff/RecoveryLifeBuff";
import { BuffModuleS } from "../buffModule/BuffModuleS";
import { PlayerManager } from "./PlayerManager";
import { PlayerModuleC } from "./PlayerModuleC";
import { EnumDamageType, HitDamageInfo, BattleWorldPlayerModuleData } from "./PlayerModuleData";
import { Attribute } from "./sub_attribute/AttributeValueObject";
import EnumAttributeType = Attribute.EnumAttributeType;
import { AttributeModuleS } from '../AttributeModule/AttributeModuleS';
import { SkillModuleS } from '../SkillModule/SkillModuleS';
import { WeaponModuleS } from '../WeaponModule/WeaponModuleS';
import { WeaponModuleData } from '../WeaponModule/WeaponModuleData';
import { PlayerProxyS } from './PlayerProxyS';
import { EPlayerState } from './FSM/PlyerState';
import { IMotionEffectElement } from '../../config/MotionEffect';
import { MascotModuleS } from '../npc/mascotNpc/MascotModuleS';
import { ShopModuleS } from '../ShopModule/ShopModuleS';
import { EquipModuleS } from '../EquipModule/EquipModuleS';
import { ERankNoticeType } from './UI/rank/RankNotice';
import { MotionModuleS } from '../MotionModule/MotionModuleS';


/**玩家伤害信息 */
export type THurtData = {
    /**技能id */
    skillId?: number,
    /**技能motionid */
    motionId?: number,
    /**技能效果表id */
    motionEffectId?: number,
    /**伤害值 */
    atkVal_replace?: number,
    /**子弹id */
    bulletId?: number,
    /**触发器坐标或 子弹坐标 */
    triggerPos?: mw.Vector,
    /**触发器最大检测距离 */
    maxCheckDis?: number,
}

export class PlayerModuleS extends ModuleS<PlayerModuleC, BattleWorldPlayerModuleData> {

    /**玩家代理类map */
    private playerProxyMap: Map<number, PlayerProxyS> = new Map();

    private playerAttributeMap: Map<number, Attribute.AttributeValueObject> = new Map();
    private deadPlayer: Set<number> = new Set();

    onPlayerExpChanged: Action = new Action();

    private buffModuleS: BuffModuleS;
    /**属性同步模块 */
    private mAttribute: AttributeModuleS = null;
    /**技能模块 */
    private mSkill: SkillModuleS = null;
    /**武器模块 */
    private mWeapon: WeaponModuleS = null;
    /**商店模块 */
    private _shopS: ShopModuleS = null;
    private mMotion: MotionModuleS = null;


    onStart() {
        this.mAttribute = ModuleService.getModule(AttributeModuleS);
        this.mSkill = ModuleService.getModule(SkillModuleS);
        this.mWeapon = ModuleService.getModule(WeaponModuleS);

        this.buffModuleS = ModuleService.getModule(BuffModuleS);
        this._shopS = ModuleService.getModule(ShopModuleS);
        this.mMotion = ModuleService.getModule(MotionModuleS);

        TimeUtil.setInterval(this.onLogicUpdate.bind(this), Constants.LogicFrameInterval);


        EventManager.instance.add(EModule_Events_S.player_beAttack, this.listen_attackPlayer.bind(this));
        EventManager.instance.add(EModule_Events_S.player_addAttribute, this.listen_addAttribute.bind(this));
        EventManager.instance.add(EModule_Events_S.player_AddAttributeValue, this.addPlayerAttr.bind(this));
        EventManager.instance.add(EModule_Events_S.add_Money_S, this.listen_addMoney.bind(this));
        EventManager.instance.add(EPlayerEvents_S.player_setMovement_s, this.listen_setMovement, this);
        EventManager.instance.add(EPlayerEvents_S.player_recalculateEquip, this.listen_recalculate_Equip, this);

        EventManager.instance.add(EPlayerEvents_S.player_frist_enterGame, this.listen_player_frist_enterGame, this);


        EventManager.instance.add(EPlayerEvents_S.PlayerEvent_CalculateAttr_S, this.listen_calculateAttr, this);

        // 增加玩家金币
        EventManager.instance.add(EPlayerEvents_S.PlayerEvent_AddGold_S, this.listen_addGold, this);
        // 减少玩家金币
        EventManager.instance.add(EPlayerEvents_S.PlayerEvent_SubGold_S, this.listen_subGold, this);

        // 监听武器加成
        EventManager.instance.add(EPlayerEvents_S.PlayerEvent_WeaponAdd_S,
            this.listen_recalculate_equipWeapon, this);

        // 监听技能库属性加成
        EventManager.instance.add(EPlayerEvents_S.PlayerEvent_CalculateSkillLibAdd_S,
            this.listen_recalculate_equipSkill, this);
        // 俯冲表现开关
        EventManager.instance.add(EPlayerEvents_S.PlayerEvent_DiveVisible_S,
            this.listen_diveVisible, this);
        // 玩家状态机切换
        EventManager.instance.add(EPlayerEvents_S.PlayerEvent_ChangePlayerFSMState_S,
            this.listen_playerChangeFSMState, this);
        // 获取玩家名字，发段位公告
        EventManager.instance.add(EPlayerEvents_S.PlayerEvent_GetPlayerName_S, this.listen_getPlayerName, this);
    }

    /**定时器 不受帧率影响  */
    private onLogicUpdate() { }

    protected onUpdate(dt: number): void {
        for (const [key, value] of this.playerProxyMap) {
            try {
                value.onUpdate(dt);
            } catch (error) {
                console.error("PlayerModuleS:onUpdate ", key, error);
                this.playerProxyMap.delete(key);
            }
        }
    }

    /**玩家切换FSM状态 */
    private listen_playerChangeFSMState(pId: number, state: EPlayerState) {
        if (this.playerProxyMap.has(pId) == false) {
            return;
        }
        this.playerProxyMap.get(pId).changeState(state);
    }

    /**
     * 增加玩家金币
     * @param pId 玩家id
     * @param addGold 增加金币数量
     */
    private listen_addGold(pId: number, addGold: number, isNotice: boolean = true) {
        this.calculateAttrValue(pId, Attribute.EnumAttributeType.money, addGold);
    }
    /**
     * 减少玩家金币
     * @param pId 玩家id
     * @param addGold 金币数量
     */
    public listen_subGold(pId: number, subGold: number) {
        this.calculateAttrValue(pId, Attribute.EnumAttributeType.money, subGold);
    }

    /**
     * 计算玩家属性
     * @param pId 玩家id
     * @param type 属性类型
     * @param value 属性值
     */
    private listen_calculateAttr(pId: number, type: Attribute.EnumAttributeType, value: number) {
        this.calculateAttrValue(pId, type, value);
    }

    /**
     * 计算玩家属性
     * @param attrType 属性类型 
     * @param value 属性值 正数或负数 （整数）
     */
    public calculateAttrValue(pId: number, attrType: Attribute.EnumAttributeType, value: number) {

        // 如果不为存储类型直接去属性同步模块进行计算
        if (Attribute.IsStashAttribute(attrType) == false) {
            // 同步给属性同步模块
            EventManager.instance.call(EAttributeEvents_S.AttrEvent_CalculateAttr_S, pId, attrType, value);
            return;
        }

        let playerData = this.getPlayerData(pId);
        if (playerData == null) {
            return;
        }

        value = Math.floor(value);

        let curValue = playerData.getAttrValue(attrType);
        let endValue = curValue + value;

        // 根据类型进行计算结果限制
        switch (attrType) {
            case Attribute.EnumAttributeType.money:
                {
                    endValue = MathUtil.clamp(endValue, 0, Globaldata.playerMaxMoney);
                    // 同步给属性同步模块
                    EventManager.instance.call(EAttributeEvents_S.attr_change_s, pId, attrType, endValue);
                }
                break;
            default:
                break;
        }
        playerData.setAttrValue(attrType, endValue, true);
    }


    /**玩家第一次加入游戏*/
    private listen_player_frist_enterGame(playerID: number) {
        this.getPlayerData(playerID).setNotNewPlayer();
    }

    /**设置玩家移动 */
    private listen_setMovement(pId: number, move: boolean, jump: boolean) {
        let player = Player.getPlayer(pId);
        if (player == null) return;
        if (player.character == null) return;
        if (move) {
            let curHp = this.getPlayerAttr(pId, Attribute.EnumAttributeType.hp);
            if (curHp > 0) {
                player.character.movementEnabled = true;
            }
        } else {
            player.character.movementEnabled = false;
        }
        if (jump) {
            let curHp = this.getPlayerAttr(pId, Attribute.EnumAttributeType.hp);
            if (curHp > 0) {
                player.character.jumpEnabled = true;
            }
        } else {
            player.character.jumpEnabled = false;
        }
    }


    onPlayerEnterGame(player: mw.Player) {

        this.init_playerProxy(player.playerId);

        this.recalculateAllAttribute(player, true, null, null);

        this.resetdayRankScore(player.playerId);

        this.checkRankReward(player.playerId);
    }


    onPlayerLeft(player: mw.Player) {

        let playerID = player.playerId;

        PlayerManager.instance.removePlayer(playerID);

        this.deadPlayer.delete(playerID);
        this.playerAttributeMap.delete(playerID);

        EventManager.instance.call(EModule_Events_S.player_LeftGame, playerID);
        this.stop_recover_Hp(playerID);

        this.left_playerProxy(playerID);
    }


    /**初始化玩家代理类 */
    private init_playerProxy(pId: number) {
        if (this.playerProxyMap.has(pId)) {
            return;
        }
        let proxy = new PlayerProxyS(pId);
        this.playerProxyMap.set(pId, proxy);
    }

    /**玩家离开清理代理类 */
    private left_playerProxy(pId: number) {
        if (this.playerProxyMap.has(pId) == false) {
            return;
        }
        this.playerProxyMap.get(pId).destroy();
        this.playerProxyMap.delete(pId);
    }


    @Decorator.noReply()
    net_StartDefense() {
        this.currentData.isDefense = true;
    }

    @Decorator.noReply()
    net_OverDefense() {
        this.currentData.isDefense = false;
    }

    @Decorator.noReply()
    net_StartParry() {
        this.currentData.isParry = true;
        this.currentData.clickBtnTime = TimeUtil.elapsedTime();
    }

    @Decorator.noReply()
    net_AddImpurce(value: mw.Vector) {
        this.currentPlayer.character.addImpulse(value, true);
    }


    isDead(playerID: number): boolean {
        return this.deadPlayer.has(playerID);
    }


    /**
     * 伤害玩家 
     * @param attackId 
     * @param beAttackpIds 
     * @param motionId 
     * @param motionEffectId 
     * @param bulletloc 
     */
    private listen_attackPlayer(attackId: number, beAttackpIds: number[], hurtData: THurtData) {
        for (let index = 0; index < beAttackpIds.length; index++) {
            const beAttackpId = beAttackpIds[index];
            this.test_HurtPlayerByMotion(attackId, beAttackpId, hurtData);
        }
    }



    /**
     *  伤害玩家
     * @param releaseId  释放技能的玩家id
     * @param beHurtId  玩家id
     * @param motionEffectId 
     * @param bulletId 子弹id
     * @param atkVal_replace 替换伤害值
     * @param bulletloc 子弹位置
     * @returns 
     */
    public test_HurtPlayerByMotion(releaseId: number, beHurtId: number, hurtData: THurtData) {

        // 是否存活
        if (this.getPlayerAttr(beHurtId, Attribute.EnumAttributeType.hp) == 0) {
            return;
        }

        // 判断玩家是否在非战斗区域
        let beHurtPlayerAreaId = this.mAttribute.getAttrValue(beHurtId, Attribute.EnumAttributeType.areaId);
        if (beHurtPlayerAreaId != EAreaId.Battle) {
            return;
        }


        let beHurtPlayer = Player.getPlayer(beHurtId);
        if (beHurtPlayer == null || beHurtPlayer.character == null) {
            return;
        }
        let releasePlayer = mw.Player.getPlayer(releaseId);
        if (releasePlayer == null || releasePlayer.character == null) {
            return;
        }

        /**动效效果表id */
        let motionEffectId = hurtData.motionEffectId;

        if (hurtData.bulletId != null &&
            hurtData.bulletId >= 0) {
            let bullet = BulletMgrS.instance.findBullet(hurtData.bulletId);
            if (bullet) {
                let bulletCfg = GameConfig.Bullet.getElement(bullet.staticConfig.id);
                motionEffectId = bulletCfg.Dmg;
            }
        }

        let motionEffectCfg = GameConfig.MotionEffect.getElement(motionEffectId);

        // buff增加
        if (motionEffectCfg && motionEffectCfg.BuffID && motionEffectCfg.BuffID.length > 0) {
            for (let index = 0; index < motionEffectCfg.BuffID.length; index++) {
                const buffId = motionEffectCfg.BuffID[index];
                this.buffModuleS.createBuff(buffId, releaseId, beHurtId,
                    { castPId: releaseId, buffParamType: null, value: null, pos: hurtData.triggerPos });
            }
        }

        if (motionEffectCfg && motionEffectCfg.Damage == 0) {
            return;
        }
        // if (motionEffectCfg == null) {
        //     oTraceError("playermodules:test_HurtPlayerByMotion", motionEffectId, hurtData.bulletId);
        //     return;
        // }

        // 判定格挡
        let result: EDefineType = this.defense(beHurtId, releaseId, motionEffectId, hurtData.bulletId > 0);
        if (result == EDefineType.parry) {
            // 格挡反弹子弹
            this.define_bullet(beHurtPlayer, releasePlayer.character, hurtData.bulletId);
            return;
        }

        let playerPos = PlayerManager.instance.getPlayerLoc(beHurtId);
        if (playerPos == null) {
            return;
        }

        if (motionEffectCfg) {
            // 技能冲量计算
            this.addImpulse_motion(releasePlayer, beHurtId, motionEffectCfg, hurtData);
        }



        let atkVal = DamageManger.instance.getAtkAndCrit(releaseId, beHurtId, motionEffectId, hurtData.atkVal_replace)[0];

        if (motionEffectCfg && motionEffectCfg.Damage > 0) {
            //吸血
            this.drainLifeHp(releaseId, atkVal)

            //灼烧
            this.buffModuleS.checkCauterizeSelfBuff(releaseId, beHurtId)
        }

        if (atkVal < 0) {
            this.addPlayerAttrIT(beHurtId, Attribute.EnumAttributeType.hp, Math.abs(atkVal));
            this.dispatchSceneUnitInjure(beHurtId, [{ from: releaseId, target: beHurtId, value: atkVal, type: EnumDamageType.normal }], [beHurtId])
            return;
        }

        // 道具类伤害衰减
        if (motionEffectCfg && motionEffectCfg.DamageReduction > 0) {
            atkVal *= motionEffectCfg.DamageReduction;
        }

        let skillId = hurtData.skillId == null ? 0 : hurtData.skillId;

        let hurtSourceData: THurtSourceData = {
            source: EHurtSource.player,
            skillEffectId: motionEffectId,
            skillId: skillId
        }

        // 扣血
        this.reducePlayerAttr(beHurtId, Attribute.EnumAttributeType.hp, atkVal, releaseId, result, hurtSourceData);

    }

    /**
     * 技能冲量计算(玩家，npc)
     * @param releasePlayer 
     * @param beHurtPlayer 
     * @param motionEffectCfg 
     * @param hurtData 
     * @returns 
     */
    public addImpulse_motion(releasePlayer: mw.Player, beHurtId: number, motionEffectCfg: IMotionEffectElement, hurtData: THurtData) {

        if (motionEffectCfg == null) {
            return;
        }
        let beHurtUnitpos: Vector = null;
        let beHurtUnit: Character = null;
        //玩家
        if (beHurtId > 0) {
            // 禁锢buff影响受不到冲量
            if (this.buffModuleS.isHasLockBuff(beHurtId)) {
                return;
            }

            beHurtUnitpos = PlayerManager.instance.getPlayerLoc(beHurtId);
            beHurtUnit = Player.getPlayer(beHurtId).character;
        }
        //npc
        else {
            let unit = ModuleService.getModule(MascotModuleS).getUnit(beHurtId);
            if (!unit) return;
            beHurtUnit = unit.getModel() as Character;
            beHurtUnitpos = beHurtUnit.worldTransform.position;
        }
        if (beHurtUnitpos == null || beHurtUnit == null) {
            return;
        }

        let releasePlayerPos = PlayerManager.instance.getPlayerLoc(releasePlayer.playerId);
        if (releasePlayerPos == null) {
            return;
        }

        if (motionEffectCfg.Impulse == 0 && motionEffectCfg.ImpulseZ == 0) {
            return;
        }

        // 计算冲量衰减系数
        let impulseCoefficient: number = 1;
        if (hurtData.triggerPos != null && hurtData.maxCheckDis != null) {
            let distance2 = mw.Vector2.distance(beHurtUnitpos, hurtData.triggerPos);
            distance2 = distance2 - beHurtUnit.collisionExtent.x;
            if (distance2 <= 0) {
                distance2 = 0;
            }
            impulseCoefficient = 1 - (distance2 / (hurtData.maxCheckDis * 100));
            impulseCoefficient = MathUtil.clamp(impulseCoefficient, 0, impulseCoefficient);
        }

        // 受击者视角转向攻击者
        mw.Vector.subtract(releasePlayerPos, beHurtUnitpos, Globaldata.tmpVector1);
        let rot = Globaldata.tmpVector1.toRotation();
        rot.x = 0;
        rot.y = 0;
        //beHurtUnit.worldTransform.lookAt(releasePlayerPos);
        beHurtUnit.worldTransform.rotation = rot;

        if (motionEffectCfg.Impulse > 0) {

            Globaldata.tmpVector2.x = beHurtUnitpos.x;
            Globaldata.tmpVector2.y = beHurtUnitpos.y;
            Globaldata.tmpVector2.z = beHurtUnitpos.z;

            Globaldata.tmpVector2.z += motionEffectCfg.ImpulseZ;

            let releaseLoc = releasePlayer.character.worldTransform.position;;

            mw.Vector.subtract(Globaldata.tmpVector2, releaseLoc, Globaldata.tmpVector2);
            Globaldata.tmpVector2.normalize();

            let endValue = motionEffectCfg.Impulse * impulseCoefficient;
            endValue = MathUtil.clamp(endValue, motionEffectCfg.Impulse_min, endValue);

            mw.Vector.multiply(Globaldata.tmpVector2, motionEffectCfg.Impulse * impulseCoefficient, Globaldata.tmpVector2);

            beHurtUnit.addImpulse(Globaldata.tmpVector2, true);

            // 玩家切换击飞状态
            if (beHurtId > 0) {
                this.changeFSMState(beHurtId, EPlayerState.BlowUp);
            }
            // npc切换击飞状态
            else {
                // ModuleService.getModule(MascotModuleS).unitChangeState(beHurtId, EUnitState.BlowUp);
            }

        } else if (motionEffectCfg.ImpulseZ > 0) {

            let endValue = motionEffectCfg.ImpulseZ * impulseCoefficient;
            endValue = MathUtil.clamp(endValue, motionEffectCfg.Impulse_min, endValue);

            Globaldata.tmpVector2.x = 0;
            Globaldata.tmpVector2.y = 0;
            Globaldata.tmpVector2.z = endValue;

            beHurtUnit.addImpulse(Globaldata.tmpVector2, true);

            // 玩家切换击飞状态
            if (beHurtId > 0) {
                this.changeFSMState(beHurtId, EPlayerState.BlowUp);
            }
            // npc切换击飞状态
            else {
                // ModuleService.getModule(MascotModuleS).unitChangeState(beHurtId, EUnitState.BlowUp);
            }
        }


    }


    /**
     * 格挡反弹子弹
     * @param beHurtPlayer 
     * @param hurter 
     * @param bulletId 
     */
    private define_bullet(beHurtPlayer: mw.Player, hurter: mw.Character /**| SceneUnitModelBase */, bulletId: number) {

        if (bulletId <= 0) {
            return;
        }

        let targetLoc = null;
        let hurterId = 0;
        // if (PlayerManagerExtesion.isCharacter(hurter)) {

        targetLoc = (hurter as mw.Character).worldTransform.position;
        hurterId = (hurter as mw.Character).player.playerId;
        // } else {
        //     targetLoc = (hurter as SceneUnitModelBase).modelLocaction;
        //     hurterId = (hurter as SceneUnitModelBase).unitCfg.ID;
        // }

        let beHurtId = beHurtPlayer.playerId;
        let startLoc = beHurtPlayer.character.localTransform.transformPosition(new mw.Vector(100, 0, 0));

        EventManager.instance.call(EBulletEvents_S.bullet_define_s, beHurtId, beHurtId, 0, bulletId, true, startLoc,
            targetLoc, hurterId);

    }

    /**玩家吸血 */
    @Decorator.noReply()
    net_drainLifeHp(atkVal: number) {
        this.drainLifeHp(this.currentPlayerId, atkVal);
    }

    /**
     * 玩家吸血
     * @param playerID 
     * @param atkVal 
     * @returns 
     */
    public drainLifeHp(playerID: number, atkVal: number) {
        if (playerID < 0) {
            return;
        }
        // let drainLifeHpMultiple = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.drainLifeHpMultiple);
        // let drainLifeHpAdd = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.drainLifeHpAdd);
        let drainLifeHpMultiple = this.playerAttributeMap.get(playerID).getValue(Attribute.EnumAttributeType.drainLifeHpMultiple);
        let drainLifeHpAdd = this.playerAttributeMap.get(playerID).getValue(Attribute.EnumAttributeType.drainLifeHpAdd);
        // let drainLifeHp = (atkVal + drainLifeHpAdd) * (drainLifeHpMultiple / 100);
        let drainLifeHp = drainLifeHpAdd + atkVal * (drainLifeHpMultiple / 100);
        if (drainLifeHp > 0) {
            this.addPlayerAttr(playerID, Attribute.EnumAttributeType.hp, drainLifeHp);
            this.dispatchSceneUnitInjure(playerID, [{ from: playerID, target: playerID, value: -drainLifeHp, type: EnumDamageType.normal }], [playerID])
        }
    }

    /**
     * 设置玩家属性（单个） 
     * @param type 
     * @param value 
     */
    @Decorator.noReply()
    net_setPlayerAttr(type: Attribute.EnumAttributeType, value: number) {
        this.setPlayerAttr(this.currentPlayerId, type, value)
    }
    /**
     * 增加玩家属性（单个）
     */
    @Decorator.noReply()
    net_addPlayerAttr(type: Attribute.EnumAttributeType, value: number) {
        this.addPlayerAttr(this.currentPlayerId, type, value)
    }
    /**
     *减少玩家属性（单个）
     */
    @Decorator.noReply()
    net_reducePlayerAttr(type: Attribute.EnumAttributeType, value: number, sceneID?: number, hurtSourceData: THurtSourceData = null) {
        this.reducePlayerAttr(this.currentPlayerId, type, value, sceneID, EDefineType.none, hurtSourceData);
    }
    /**
     *增加玩家属性（多个）
     */
    @Decorator.noReply()
    net_addPlayerAttrByArray(attrArray: Attribute.AttributeArray) {
        this.addPlayerAttrByArray(this.currentPlayerId, attrArray)
    }
    /**
     *减少玩家属性（多个）
     */
    @Decorator.noReply()
    net_reducePlayerAttrByArray(attrArray: Attribute.AttributeArray) {
        this.reducePlayerAttrByArray(this.currentPlayerId, attrArray)
    }

    /**
     * 获取玩家属性
     * @param playerID 
     * @param type 
     * @param isAdd 是否是加成后属性
     * @param t_normalValue_replace 一般属性类型的值替换(如根据伤害值计算吸血) 【注意：t_normalValue_replace < 100】
     * @returns 
     */
    getPlayerAttr(playerID: number, type: Attribute.EnumAttributeType, isAdd: boolean = true, t_normalValue_replace: number = null): number {

        let player = Player.getPlayer(playerID);
        if (player == null) {
            oTraceError("获取玩家属性失败，玩家不存在", playerID)
            return 0;
        }

        // 是否为存储属性
        if (Attribute.IsStashAttribute(type)) {
            //console.error("存储属性类型-",type)
            let date = this.getPlayerData(playerID);
            if (date == null) {
                return 0;
            }
            return date.getAttrValue(type) || 0;
        }

        if (!this.playerAttributeMap.has(playerID)) {
            oTraceError("获取玩家属性失败，Map玩家不存在", playerID)
            return 0;
        }

        if (type >= 100) {
            return this.playerAttributeMap.get(playerID).getValue(type);
        }

        if (isAdd) {
            //加成类型
            let t_addType = type + 100; //Globaldata.addAttribueTypeVale
            let t_MultipleType = type + 200;// Globaldata.multiplyAttribueTypeVale

            //没有加成类型的属性   hp  state
            if ((t_addType in EnumAttributeType) == false || (t_MultipleType in EnumAttributeType) == false) {
                return this.playerAttributeMap.get(playerID).getValue(type);
            }
            else {
                let t_normalValue = t_normalValue_replace ? t_normalValue_replace : this.playerAttributeMap.get(playerID).getValue(type);
                let t_addValue = this.playerAttributeMap.get(playerID).getValue(t_addType);
                //let t_MultipleValue = this.playerAttributeMap.get(playerID).getValue(t_MultipleType);

                let t_finalValue = 0;
                let playerData = this.getPlayerData(playerID);
                if (playerData == null) {
                    return 0;
                }

                t_finalValue = (t_normalValue + t_addValue);

                let multipleRecords = playerData.getPerGainRecord(t_MultipleType);
                if (multipleRecords) {
                    let endPerValue = 0;
                    for (let index = 0; index < multipleRecords.length; index++) {
                        const per = multipleRecords[index];
                        if (per > 0) {
                            endPerValue += t_normalValue * ((per / 100))
                        } else {
                            endPerValue -= t_normalValue * ((Math.abs(per) / 100));
                        }
                    }
                    t_finalValue += endPerValue;
                }


                return t_finalValue;
            }

        } else {

            return this.playerAttributeMap.get(playerID).getValue(type);
        }
    }

    /**
     * 增加玩家属性（单个）
     * @param playerID
     * @param type
     * @param value
     */
    public addPlayerAttr(playerID: number, type: Attribute.EnumAttributeType, value: number) {
        let player = Player.getPlayer(playerID);
        if (player == null) {
            return;
        }

        if (Attribute.IsStashAttribute(type)) {
            if (Number(type) == Attribute.EnumAttributeType.exp) {

            } else {
                this.addPlayerAttrStash(playerID, type, value);
            }
            return;
        }
        this.addPlayerAttrIT(playerID, type, value, true);
    }
    /**
     * 增加玩家属性（多个）
     * @param playerID
     * @param attrArray
     */
    addPlayerAttrByArray(playerID: number, attrArray: Attribute.AttributeArray) {
        //oTrace("addPlayerAttrByArray______________", Reflect.ownKeys(attrArray).length, JSON.stringify(attrArray));
        let player = Player.getPlayer(playerID);
        if (player == null) {
            return;
        }

        let attStashArr: Attribute.AttributeArray = {};
        let attITArr: Attribute.AttributeArray = {};

        for (let type in attrArray) {
            let val = attrArray[type];
            if (Attribute.IsStashAttribute(Number(type))) {
                if (Number(type) == Attribute.EnumAttributeType.exp) {

                } else {
                    attStashArr[type] = val;
                }
            } else {
                attITArr[type] = val;
            }
        }

        let lengthStas = Reflect.ownKeys(attStashArr).length;
        for (let type in attStashArr) {
            let val = attStashArr[type];
            let isSave = lengthStas <= 1 ? true : false;
            this.addPlayerAttrStash(playerID, Number(type), val, isSave);
            lengthStas--;
        }
        //oTrace("addPlayerAttrByArray______________", Reflect.ownKeys(attStashArr).length, JSON.stringify(attStashArr));

        let lengthIT = Reflect.ownKeys(attITArr).length;
        for (let type in attITArr) {
            let val = attITArr[type];
            let isSave = lengthIT <= 1 ? true : false;
            this.addPlayerAttrIT(playerID, Number(type), val, isSave);
            lengthIT--;
        }
        //oTrace("addPlayerAttrByArray______________", Reflect.ownKeys(attITArr).length, JSON.stringify(attITArr));
    }

    /**
     * 减少玩家属性（单个）
     * @param playerID
     * @param type
     * @param value
     * @param sceneID
     * @param defineType 
     */
    reducePlayerAttr(playerID: number, type: Attribute.EnumAttributeType, value: number,
        sceneID?: number, defineType: EDefineType = EDefineType.none, hurtSourceData: THurtSourceData = null) {
        let player = Player.getPlayer(playerID);
        if (player == null) {
            return;
        }

        if (Attribute.IsStashAttribute(type)) {
            this.reducePlayerAttrStash(playerID, type, value);
            return null;
        }
        this.reducePlayerAttrIT(playerID, type, value, sceneID, defineType, true, hurtSourceData);
    }

    /**
     * 减少玩家属性（多个）
     * @param playerID
     * @param attrArray
     */
    reducePlayerAttrByArray(playerID: number, attrArray: Attribute.AttributeArray) {
        //oTrace("reducePlayerAttrByArray______________", Reflect.ownKeys(attrArray).length, JSON.stringify(attrArray));
        let player = Player.getPlayer(playerID);
        if (player == null) {
            return;
        }

        let attStashArr: Attribute.AttributeArray = {};
        let attITArr: Attribute.AttributeArray = {};

        for (let type in attrArray) {
            let val = attrArray[type];
            if (Attribute.IsStashAttribute(Number(type))) {
                attStashArr[type] = val;
                // this.reducePlayerAttrStash(playerID, Number(type), val);
            } else {
                attITArr[type] = val;
                //this.reducePlayerAttrIT(playerID, Number(type), val, null, null, true); // TODO 改成合并发送
            }
        }

        let lengthStas = Reflect.ownKeys(attStashArr).length;
        for (let type in attStashArr) {
            let val = attStashArr[type];
            let isSave = lengthStas <= 1 ? true : false;
            this.reducePlayerAttrStash(playerID, Number(type), val, isSave);
            lengthStas--;
        }
        //oTrace("reducePlayerAttrByArray______________", Reflect.ownKeys(attStashArr).length, JSON.stringify(attStashArr));

        let lengthIT = Reflect.ownKeys(attITArr).length;
        for (let type in attITArr) {
            let val = attITArr[type];
            let isSave = lengthIT <= 1 ? true : false;
            this.reducePlayerAttrIT(playerID, Number(type), val, null, null, isSave);
            lengthIT--;
        }
        //oTrace("reducePlayerAttrByArray______________", Reflect.ownKeys(attITArr).length, JSON.stringify(attITArr));
    }

    /**
     * 设置玩家属性（单个） 
     * @param playerID 
     * @param type 
     * @param value 
     */
    setPlayerAttr(playerID: number, type: Attribute.EnumAttributeType, value: number, isasync: boolean = true) {

        let player = Player.getPlayer(playerID);
        if (player == null) {
            return;
        }

        if (Attribute.IsStashAttribute(type)) {
            let data = this.getPlayerData(playerID);
            if (data == null) {
                return;
            }
            data.setAttrValue(type, value);
            data.save(true);
            return;
        }

        if (!this.playerAttributeMap.has(playerID)) {
            return;
        }

        let vo = this.playerAttributeMap.get(playerID);
        vo.setAttribute(type, value);

        if (isasync) {
            this.syncChangePlayerAttr(playerID, type);
        }

        this.syncPlayerSpeed(playerID, type);
    }


    /**
     * 减少玩家储存属性(不随游戏结束清空的属性)
     * @param playerID 
     * @param type 
     * @param value 
     */
    private reducePlayerAttrStash(playerID: number, type: Attribute.EnumAttributeType, value: number, isSave: boolean = true) {
        let player = Player.getPlayer(playerID);
        if (player == null) {
            return;
        }

        let data = this.getPlayerData(playerID);
        if (data == null) {
            return;
        }

        let calValue = data.getAttrValue(type) - value;
        // 段位分处理
        if (type == Attribute.EnumAttributeType.rankScore || type == Attribute.EnumAttributeType.dayRankScore) {
            calValue = Math.round(Math.max(0, calValue));
        }
        if (type == Attribute.EnumAttributeType.rankScore) {
            this.reducePlayerAttr(playerID, Attribute.EnumAttributeType.dayRankScore, value);
            data.setAttrValue(type, calValue);
            EventManager.instance.call(EAttributeEvents_S.attr_change_s, playerID, Attribute.EnumAttributeType.rankScore, data.getAttrValue(Attribute.EnumAttributeType.rankScore));
            return;
        }

        data.setAttrValue(type, calValue);

        if (isSave) {
            data.save(true);

            if (Attribute.IsAddAttribute(type)) {
                data.onattributeCountChange.call();
            }
        }

        if (type == Attribute.EnumAttributeType.money || type == Attribute.EnumAttributeType.dayRankScore) {
            //this.getClient(playerID).net_MoneyChange(data.getAttrValue(Attribute.EnumAttributeType.money), value);
            // 同步给属性同步模块
            EventManager.instance.call(EAttributeEvents_S.attr_change_s, playerID, type, data.getAttrValue(type));
        }
    }

    /**
     * 增加玩家储存属性(不随游戏结束清空的属性)
     * @param playerID 
     * @param type 
     * @param value 
     */
    private addPlayerAttrStash(playerID: number, type: Attribute.EnumAttributeType, value: number, isSave: boolean = true) {

        let player = Player.getPlayer(playerID);
        if (player == null) {
            return;
        }
        let data: BattleWorldPlayerModuleData = this.getPlayerData(playerID);
        if (data == null) {
            return;
        }
        let curAttrValue = data.getAttrValue(type);
        //获得金币{0}
        if (type == Attribute.EnumAttributeType.money) {

            let money = data.getAttrValue(type);

            if (money >= Globaldata.playerMaxMoney) {
                EventManager.instance.call(ENotice_Events_S.NoticeEvent_TipMsg_S, playerID, 156);
                return;
            }

            if (money + value >= Globaldata.playerMaxMoney) {
                data.setAttrValue(type, Globaldata.playerMaxMoney, true);

                EventManager.instance.call(ENotice_Events_S.NoticeEvent_TipMsg_S, playerID, 156);
            } else {

                curAttrValue += value;
                data.setAttrValue(type, curAttrValue, true);

                // if (value != 0) {
                //     EventManager.instance.call(ENotice_Events_S.NoticeEvent_TipMsg_S, playerID, 11, [value]);
                // }
            }
            //this.getClient(playerID).net_MoneyChange(data.getAttrValue(Attribute.EnumAttributeType.money), value);
            // 同步给属性同步模块
            EventManager.instance.call(EAttributeEvents_S.attr_change_s, playerID, Attribute.EnumAttributeType.money, data.getAttrValue(Attribute.EnumAttributeType.money));

            return;
        }
        // 段位分处理
        if (type == Attribute.EnumAttributeType.rankScore) {
            value = Math.round(Math.min(value, Globaldata.maxRankScore - data.getAttrValue(Attribute.EnumAttributeType.dayRankScore)));
            this.addPlayerAttr(playerID, Attribute.EnumAttributeType.dayRankScore, value);
            let oldRank = PlayerManager.instance.getRankLevel(curAttrValue);
            curAttrValue = Math.round(curAttrValue + value);
            data.setAttrValue(type, curAttrValue, isSave);
            //升段位发公告
            let newRank = PlayerManager.instance.getRankLevel(curAttrValue);
            if (newRank > oldRank) {
                this.getAllClient().net_startNotice(ERankNoticeType.LevelUp, newRank, this.mAttribute.getAttrValue(playerID, Attribute.EnumAttributeType.playerName));
            }
            this.checkRankReward(playerID);
            // 同步
            EventManager.instance.call(EAttributeEvents_S.attr_change_s, playerID, Attribute.EnumAttributeType.rankScore, data.getAttrValue(Attribute.EnumAttributeType.rankScore));
            return;
        }

        curAttrValue += value;
        data.setAttrValue(type, curAttrValue, isSave);

        if (isSave) {

            if (Attribute.IsAddAttribute(type)) {
                data.onattributeCountChange.call();
            }

            if (type == Attribute.EnumAttributeType.lv || type == Attribute.EnumAttributeType.dayRankScore) {
                EventManager.instance.call(EAttributeEvents_S.attr_change_s, playerID, type, data.getAttrValue(type));
            }
        }

    }

    /**
     * 减少玩家即时属性
     * @param playerID 玩家id
     * @param type 属性类型
     * @param value 属性值
     * @param sceneID 攻击者id（场景单位id）
     * @param isDefineFail 格挡类型
     * @returns 
     */
    private reducePlayerAttrIT(playerID: number, type: Attribute.EnumAttributeType, value: number,
        sceneID?: number, defineType: EDefineType = EDefineType.none, isasync: boolean = true, hurtSourceData: THurtSourceData = null) {
        //oTrace("reducePlayerAttrIT______________", playerID, type, value, sceneID, defineType, isasync)
        let player = Player.getPlayer(playerID);
        if (player == null) {
            return;
        }

        let playerData = this.getPlayerData(playerID);
        if (playerData == null) {
            return;
        }

        if (!this.playerAttributeMap.has(playerID)) {
            return;
        }

        let vo = this.playerAttributeMap.get(playerID);

        let percent: number = this.getHpPercent(playerID, type);

        // 血量减少时 判断减伤属性
        if (type == Attribute.EnumAttributeType.hp) {

            if (this.getPlayerAttr(playerID, type) <= 0) {
                return;
            }

            if (defineType != EDefineType.parry) {

                // 计算百分比减伤
                let defRecords = playerData.getPerGainRecord(Attribute.EnumAttributeType.defMultiple);
                let def = 1;
                if (defRecords != null) {
                    for (let index = 0; index < defRecords.length; index++) {
                        let hurtPer = 1 - defRecords[index] / 100;
                        def *= hurtPer;
                    }
                }
                //let def = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.defMultiple);
                //let defVal = value * (1 - def / 100);
                let defVal = value * def;

                if (defVal < 0) {
                    defVal = 0;
                } else {
                    let defAdd = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.defAdd);
                    defVal -= defAdd;
                    if (defVal < 0) {
                        defVal = 0;
                    }
                }

                // 真实伤害
                if (sceneID && sceneID < 0) {

                    //+ 真实伤害 [ (atkAdd+atk)*atkMultiple ] *tureDamageMultiple 
                    let atk = DamageManger.instance.getAttr(sceneID, Attribute.EnumAttributeType.atk)
                    if (atk) {
                        let tureDamageMultiple = DamageManger.instance.getAttr(sceneID, Attribute.EnumAttributeType.tureDamageMultiple) / 100;
                        defVal += atk * tureDamageMultiple;
                        //console.error(`defVal_________________________真实伤害1${defVal}`, atk, tureDamageMultiple);
                    }

                    //+ 真实伤害  tureDamage + tureDamageAdd
                    let tureDamage = DamageManger.instance.getAttr(sceneID, Attribute.EnumAttributeType.tureDamage);
                    if (tureDamage) {
                        let tureDamageAdd = DamageManger.instance.getAttr(sceneID, Attribute.EnumAttributeType.tureDamageAdd);
                        defVal += (tureDamage + tureDamageAdd);
                        //console.error(`defVal_________________________真实伤害2${defVal}`, tureDamage, tureDamageAdd);
                    }
                }

                //易伤 
                let vulnerable = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.VulnerableMultiple);
                // 杀戮值
                let massacreValue = this.mAttribute.getAttrValue(playerID, Attribute.EnumAttributeType.massacreValue);
                vulnerable += massacreValue * Globaldata.massacre_VulnerabilityPer;
                if (vulnerable > Globaldata.vulnerableMultipleMax) {
                    vulnerable = Globaldata.vulnerableMultipleMax;
                }
                defVal = defVal * (1 + vulnerable / 100);

                if (RecoveryLifeBuffS.recoveryLifeCheck(playerID)) {
                    let hp = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.hp);
                    if (hp == 1) {
                        //oTrace(`血量为1点____________ ${value}`);
                        return;
                    }

                    if ((defVal - hp) >= 1) {
                        defVal = (hp - 1);
                    }
                    //oTrace(`recoveryLifeCheck减少血量____________${defVal}`);
                    vo.reduceValue(type, defVal);
                } else {
                    vo.reduceValue(type, defVal);
                }

                let damageData: HitDamageInfo = {
                    from: sceneID,
                    target: playerID,
                    value: defVal,
                    type: EnumDamageType.normal
                }

                if (hurtSourceData) {
                    let skillEffectConfig = GameConfig.MotionEffect.getElement(hurtSourceData.skillEffectId);
                    if (skillEffectConfig) {
                        damageData.effectId = skillEffectConfig.hitEffectId;
                        damageData.soundId = skillEffectConfig.hitSountId;


                        // 增加怒气
                        if (skillEffectConfig.angerAdd1 > 0 && this.mMotion.isExplosiveGas(sceneID) == false) {

                            // 释放该技能的增加怒气
                            let angleValue = defVal * skillEffectConfig.angerAdd1;
                            EventManager.instance.call(EAttributeEvents_S.AttrEvent_CalculateAttr_S, sceneID, Attribute.EnumAttributeType.angerValue, angleValue);
                        }

                        if (skillEffectConfig.angerAdd2 > 0 && this.mMotion.isExplosiveGas(playerID) == false) {
                            // 受到该技能伤害的增加怒气
                            let angleValue = defVal * skillEffectConfig.angerAdd2;
                            EventManager.instance.call(EAttributeEvents_S.AttrEvent_CalculateAttr_S, playerID, Attribute.EnumAttributeType.angerValue, angleValue);
                        }
                    }
                }

                // 飘字同步给受击者
                this.dispatchSceneUnitInjure(playerID, [damageData], [playerID]);
                // 飘字同步给攻击者
                this.floatTextToAttacker(sceneID, playerID, [damageData], [playerID]);

                // 1.玩家被攻击切换为战斗状态且受伤  2玩家掉入陷阱掉血切换为战斗状态
                let data = this.getPlayerData(playerID);
                if (data == null) {
                    return;
                }
                data.changeFightStatus(true);

            }
            if (playerData.clickBtnTime) playerData.clickBtnTime = null;
        } else {
            //oTrace(`减少玩家即时属性-----${value}`);
            vo.reduceValue(type, value);
        }

        // 死亡判断
        if (type == Attribute.EnumAttributeType.hp && this.getPlayerAttr(playerID, type) == 0) {

            // 死亡埋点
            if (hurtSourceData && StringUtil.isEmpty(hurtSourceData.source) == false) {
                let killCount = playerData.getKillCount();
                let surviveTime = playerData.getSurviveTime();


                AnalyticsTool.send_ts_action_dead(hurtSourceData.source,
                    killCount, hurtSourceData.skillId, surviveTime, player);
            }

            this.playerDead(playerID, sceneID);
        }



        this.recalculateHp(playerID, type, percent);

        if (isasync) {
            this.syncChangePlayerAttr(playerID, type);
        }
        this.syncPlayerSpeed(playerID, type);
    }

    /**伤害飘字同步给攻击玩家 */
    private floatTextToAttacker(attackId: number, beAttackId: number, dmgInfo: HitDamageInfo[], hitIds: number[]) {
        if (attackId <= 0) {
            return;
        }
        if (attackId == beAttackId) {
            return;
        }
        let player = mw.Player.getPlayer(attackId);
        if (player == null) {
            return;
        }
        this.dispatchSceneUnitInjure(attackId, dmgInfo, hitIds);
    }



    /**
     * 增加玩家即时属性
     * @param playerID 
     * @param type 
     * @param value 
     * @param isasync  是否同步
     * @returns
     */
    private addPlayerAttrIT(playerID: number, type: Attribute.EnumAttributeType, value: number, isasync: boolean = true) {
        //oTrace("addPlayerAttrIT______________", playerID, type, value, isasync)

        if (!this.playerAttributeMap.has(playerID)) {
            return;
        }

        let vo = this.playerAttributeMap.get(playerID);

        let percent: number = this.getHpPercent(playerID, type);

        if (type == Attribute.EnumAttributeType.hp) {
            let curHp = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.hp);
            let maxHp = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.maxHp);
            value = Math.min(maxHp - curHp, value);
        }

        vo.addValue(type, value);

        this.recalculateHp(playerID, type, percent);

        if (isasync) {
            this.syncChangePlayerAttr(playerID, type);
        }
        this.syncPlayerSpeed(playerID, type);
    }

    /**
     * 获取当前血量百分比变化
     * @param playerID 
     * @param type 
     */
    private getHpPercent(playerID: number, type: Attribute.EnumAttributeType): number {
        if (!Attribute.IsrhpAttribute(Number(type))) {
            return;
        }
        let maxHp = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.maxHp);
        let hp = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.hp);
        let pecenthp = hp / maxHp;
        //oTrace(`getHpPercent______________`, maxHp, pecenthp)
        return pecenthp;
    }
    /**
    * 重新计算玩家 血量 
    * @param playerID 
    * @param vo 
    * @param type 
    */
    private recalculateHp(playerID: number, type: Attribute.EnumAttributeType, pecentHP: number) {

        if (!Attribute.IsrhpAttribute(Number(type))) {
            return;
        }

        let hp: number = 0;
        let maxHp = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.maxHp);
        hp = maxHp * pecentHP;
        //oTrace(`recalculateHpEnergy______true`, maxHp, hp);
        this.setPlayerAttr(playerID, Attribute.EnumAttributeType.hp, hp)
    }

    /***
     * 重新计算玩家 血量 能量
     */
    private recalculateHpEnergey(playerID: number) {
        let attrVo = this.playerAttributeMap.get(playerID);
        if (attrVo == null) {
            return;
        }
        oTrace(`recalculateHpEnergey______true`, this.getPlayerAttr(playerID, Attribute.EnumAttributeType.maxHp));
        attrVo.setAttribute(Attribute.EnumAttributeType.hp, this.getPlayerAttr(playerID, Attribute.EnumAttributeType.maxHp));
        attrVo.setAttribute(Attribute.EnumAttributeType.energy, this.getPlayerAttr(playerID, Attribute.EnumAttributeType.maxEnergy));

        this.syncChangePlayerAttr(playerID, Attribute.EnumAttributeType.energy);
        this.refashPlayFightestate(playerID);
    }

    /**
     *重新计算-加点属性（1加属性，重置属性）
     */
    @Decorator.noReply()
    net_recalculateAttr(attrArray: Attribute.AttributeArray, isAdd: boolean) {
        // let playerID = this.currentPlayerId;
        // this.recalculateAttr(playerID, null, false);
        // if (isAdd) {
        //     this.addPlayerAttrByArray(playerID, attrArray);
        // } else {
        //     this.reducePlayerAttrByArray(playerID, attrArray);
        // }
        // this.recalculateAttr(playerID, null, true);
        // this.syncInitPlayerAttr(playerID);
        // this.refashPlayFightestate(playerID);
    }

    /**
     * 重新计算-装备属性 (切装备，装备强化)
     * @param playerID 
     * @param attrVo 
     * @param isAdd 
     */
    private listen_recalculate_Equip(playerID: number, isAdd: boolean, equipId: number) {
        let player = Player.getPlayer(playerID);
        if (player == null) {
            return;
        }

        let equipData = DataCenterS.getData(player, EquipModuleData);
        if (equipData == null) {
            return;
        }

        let equipCfg = GameConfig.Equip.getElement(equipId);
        if (equipCfg == null || equipCfg.attrType == null) {
            return;
        }

        let attrVo = this.playerAttributeMap.get(playerID);
        if (attrVo == null) {
            return;
        }

        for (let index = 0; index < equipCfg.attrType.length; index++) {
            const attrType = equipCfg.attrType[index];

            const attrValue = equipCfg.attrValue[index];

            isAdd ? attrVo.addValue(attrType, attrValue) : attrVo.reduceValue(attrType, attrValue);
            console.error(attrType, attrValue)
        }

        this.syncInitPlayerAttr(playerID);
        this.refashPlayFightestate(playerID);

        // attrVo.log();
    }

    /**
   * 计算技能对玩家的属性加成
   * @param pId 玩家id
   * @param isAdd 增加还是减少
   * @returns 
   */
    private listen_recalculate_equipWeapon(pId: number, isAdd: boolean) {

        let weaponData = DataCenterS.getData(pId, WeaponModuleData);
        if (weaponData == null) {
            return;
        }
        let weaponCfg = GameConfig.Weapon.getElement(weaponData.getEquipWeaponId());
        if (weaponCfg == null) {
            return;
        }
        let attrVo = this.playerAttributeMap.get(pId);
        if (attrVo == null) {
            return;
        }
        if (weaponCfg.attrTypes == null) {
            return;
        }
        for (let index = 0; index < weaponCfg.attrTypes.length; index++) {
            const attrType = weaponCfg.attrTypes[index];
            const attrValue = weaponCfg.attrValues[index];
            isAdd ? attrVo.addValue(attrType, attrValue, true) : attrVo.reduceValue(attrType, attrValue, true);
        }
        this.syncInitPlayerAttr(pId);
        this.refashPlayFightestate(pId);
    }


    /**
     * 计算技能对玩家的属性加成
     * @param pId 玩家id
     * @param isAdd 增加还是减少
     * @returns 
     */
    private listen_recalculate_equipSkill(pId: number, skillLibId: number, isAdd: boolean) {

        let skillLibCfg = GameConfig.SkillLib.getElement(skillLibId);
        if (skillLibCfg == null) {
            return;
        }

        let attrVo = this.playerAttributeMap.get(pId);
        if (attrVo == null) {
            return;
        }

        if (skillLibCfg.attrTypes == null) {
            return;
        }

        for (let index = 0; index < skillLibCfg.attrTypes.length; index++) {
            const attrType = skillLibCfg.attrTypes[index];
            const attrValue = skillLibCfg.attrValues[index];
            isAdd ? attrVo.addValue(attrType, attrValue, true) : attrVo.reduceValue(attrType, attrValue, true);
        }
        this.syncInitPlayerAttr(pId);
        this.refashPlayFightestate(pId);
    }




    /**
     * 重新计算计算玩家所有属性并存储
     * @param player 
     * @param isrecalculateHpEnergy 是否重新计算当前能量血量（ 重新计算，会恢复满血满蓝）
     */
    public recalculateAllAttribute(player: mw.Player, isrecalculateHpEnergy: boolean = true, nowjobId: number = null, prejobId: number = null) {

        //oTrace(`recalculateAllAttribute______________${player.playerId}`, isrecalculateHpEnergy, nowjobId, prejobId);

        if (player == null) {
            return;
        }

        let playerID = player.playerId;

        // //6. 职业被动Buff加成
        // this.buffModuleS.refreshJobPassiveBuff(playerID, nowjobId, prejobId, false);

        let attrVo = new Attribute.AttributeValueObject();

        attrVo.playerID = playerID;

        //销毁永久属性buff
        if (this.playerAttributeMap.has(playerID)) {
            this.buffModuleS.remove_divine_AttributeBuffs(playerID);
        }

        // //销毁永久属性buff
        if (this.playerAttributeMap.has(playerID)) {
            this.buffModuleS.remove_club_AttributeBuffs(playerID);
        }


        //1.初始属性
        for (let cfg of GameConfig.InitialAttr.getAllElement()) {
            attrVo.addValue(cfg.AttrType, cfg.AttrValue);
        }


        //4.装备加成
        this.recalculateEquip(player, attrVo, true);

        //设置玩家属性
        let attroPre: Attribute.AttributeValueObject = null;
        if (this.playerAttributeMap.has(playerID)) {
            attroPre = this.playerAttributeMap.get(playerID);
        }
        this.playerAttributeMap.set(playerID, attrVo);

        //当前值
        if (isrecalculateHpEnergy) {
            attrVo.setAttribute(Attribute.EnumAttributeType.hp, this.getPlayerAttr(playerID, Attribute.EnumAttributeType.maxHp));
            attrVo.setAttribute(Attribute.EnumAttributeType.energy, this.getPlayerAttr(playerID, Attribute.EnumAttributeType.maxEnergy));
        } else {
            if (attroPre) {
                let maxHp = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.maxHp)
                let prehp = attroPre.getValue(Attribute.EnumAttributeType.hp);
                attrVo.setAttribute(Attribute.EnumAttributeType.hp, maxHp < prehp ? maxHp : prehp);
            }
        }

        this.syncInitPlayerAttr(playerID, true);

        this.refashPlayFightestate(playerID);

        attrVo.log();
    }

    /**
     * 装备加成
     */
    private recalculateEquip(player: mw.Player, attrVo: Attribute.AttributeValueObject, isAdd: boolean) {
        if (attrVo == null) {
            attrVo = this.playerAttributeMap.get(player.playerId);
        }

        if (attrVo == null) {
            return;
        }

        let equipData = DataCenterS.getData(player, EquipModuleData);

        if (equipData == null) { return; }

        for (const key in equipData.equipData) {
            let equipId = equipData.equipData[key];

            let equipCfg = GameConfig.Equip.getElement(equipId);
            if (equipCfg == null || equipCfg.attrType == null) {
                continue;
            }

            for (let index = 0; index < equipCfg.attrType.length; index++) {
                const attrType = equipCfg.attrType[index];

                const attrValue = equipCfg.attrValue[index];

                isAdd ? attrVo.addValue(attrType, attrValue) : attrVo.reduceValue(attrType, attrValue);
            }
        }

    }


    /**
     * 同步所有属性
     * @param playerID 
     */
    private syncInitPlayerAttr(playerID: number, isinit: boolean = false) {
        if (!this.playerAttributeMap.has(playerID)) {
            return;
        }

        let attrVo = this.playerAttributeMap.get(playerID);

        this.getClient(playerID).net_init_attr(attrVo.attributeArray, isinit);

        //玩家移速
        Player.getPlayer(playerID).character.maxWalkSpeed = this.getPlayerAttr(playerID, EnumAttributeType.speed);
        //oTrace("修改玩家移速,===========", this.getPlayerAttr(playerID, EnumAttributeType.speed))
    }

    /**
     * 同步属性变更(单一)
     * @param playerID 
     * @param type 
     */
    private syncChangePlayerAttr(playerID: number, type: Attribute.EnumAttributeType) {
        //oTrace("syncChangePlayerAttr______________", playerID, type)
        if (!this.playerAttributeMap.has(playerID)) {
            return;
        }

        //易伤
        if (Attribute.IsVulnerableAttribute(type)) {
            return;
        }

        //血量相关 
        if (type == Attribute.EnumAttributeType.hp || Attribute.IsrhpAttribute(type)) {
            return;
        }

        let attrVo = this.playerAttributeMap.get(playerID);

        this.getClient(playerID).net_change_attr(type, attrVo.getValue(type));
    }


    private syncPlayerSpeed(playerID: number, type: Attribute.EnumAttributeType) {
        // 设置玩家移动速度
        if (type == Attribute.EnumAttributeType.speed || type == Attribute.EnumAttributeType.speedAdd || type == Attribute.EnumAttributeType.speedMultiple) {
            let player = Player.getPlayer(playerID);
            if (player) {
                let speed = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.speed)
                if (speed < 0) {
                    speed = 0
                }
                player.character.maxWalkSpeed = speed;
            }
        }
    }



    /**
     * 输出玩家属性
     * @param playerID 
     */
    logPlayerAttr(playerID: number) {
        if (!this.playerAttributeMap.has(playerID)) {
            return;
        }
        this.playerAttributeMap.get(playerID).log()
    }

    /**
     * 玩家防御（包括弹反） 0失败 1弹反 2防御 
     */
    private defense(playerId: number, sceneID: number, motionEffectId: number, isBullet: boolean = false): EDefineType {
        return 0;
        // if (playerId == sceneID) return 0;
        // let playerData = this.getPlayerData(playerId);
        // if (playerData == null) return 0;

        // if (playerData.isDefense == false && playerData.isParry == false) {
        //     return EDefineType.none;
        // }

        // let propId = DataCenterS.getData(playerId, PropModuleData).selectId;


        // if (isBullet == false && !angleRes) return 0;

        // if (playerData.isDefense) {
        //     this.getClient(playerId).net_DefenseSucc();
        //     return EDefineType.define;
        // }


        // if (playerData.isParry == false) {
        //     return EDefineType.none;
        // }

        // let curTime = TimeUtil.elapsedTime();
        // let difTime = curTime - playerData.clickBtnTime;
        // playerData.isParry = false;

        // if (parryTime == null || parryTime.length == 0) {
        //     console.error("defense error ", parryTime);
        //     return EDefineType.none;
        // }

        // if (difTime < parryTime[0] || difTime > parryTime[1]) {
        //     return EDefineType.none;
        // }

        // let motionEffectCfg = GameConfig.MotionEffect.getElement(motionEffectId);
        // if (motionEffectCfg.BlockType == 1) {
        //     return EDefineType.none;
        // }

        // if (sceneID) {
        //     let player = Player.getPlayer(sceneID);
        //     if (isBullet == false && player == null) {
        //         // this.sceneUnitModuleS.beParry(sceneID)
        //     } else if (player) {
        //         this.getClient(sceneID).net_BeParry();
        //     }
        // }
        // this.getClient(playerId).net_ParrySucc(propId);
        // return EDefineType.parry;
    }

    private checkAngle(playerId: number, sceneID: number, angle: number) {
        let unitLoc: mw.Vector = null;
        if (!Player.getPlayer(sceneID)) {
            // unitLoc = ModuleService.getModule(SceneUnitModuleS).getLocation(sceneID);
        } else {

            unitLoc = PlayerManager.instance.getPlayerLoc(sceneID);

        }

        let playerLoc = PlayerManager.instance.getPlayerLoc(playerId);
        let character = Player.getPlayer(playerId).character;

        Globaldata.copyVector(playerLoc);

        mw.Vector.subtract(Globaldata.tmpVector, unitLoc, Globaldata.tmpVector);

        Globaldata.tmpVector.normalize();

        let dir = Globaldata.tmpVector;

        return util.checkAngle(character.worldTransform.getForwardVector(), dir, angle);
    }

    /**
     * 玩家死亡
     * @param playerID 
     * @param sceneID 
     */
    public playerDead(playerID: number, sceneID: number) {
        let player = Player.getPlayer(playerID);
        if (!player) {
            return;
        }
        let playerData = this.getPlayerData(playerID);
        if (!playerData) {
            return;
        }
        // 清理击杀数量
        playerData.clearKillCount();

        if (this.playerProxyMap.has(playerID)) {
            this.playerProxyMap.get(playerID).playerDead();
        }

        if (sceneID > 0) {

            let pData = this.getPlayerData(sceneID);
            if (pData) {
                pData.addKillCount();
            }

            // 增加技能点
            EventManager.instance.call(EPlayerEvents_S.PlayerEvent_CalculateAttr_S
                , sceneID, Attribute.EnumAttributeType.weaponSkillPoints, 1);

            // 击杀人的武器id
            let killerWeaponId = this.mAttribute.getAttrValue(sceneID, Attribute.EnumAttributeType.weaponId);

            // 击杀提示
            EventManager.instance.call(ENotice_Events_S.NoticeEvent_KillTip_S, sceneID, killerWeaponId, playerID, pData.getKillCount());
            // 击杀特效
            this.playKillEffect(sceneID, player);
            // 结算杀戮
            this.settle_massacre(sceneID, playerID);
            // 段位分结算
            this.rankScoreCal(playerID, sceneID);
        }

        this.setPlayerDeadState(playerID, sceneID);
    }

    /**结算杀戮信息 */
    private settle_massacre(killerId: number, beKillerId: number) {

        // 增加杀戮值
        EventManager.instance.call(EAttributeEvents_S.AttrEvent_CalculateAttr_S
            , killerId, Attribute.EnumAttributeType.massacreValue, Globaldata.massacre_killPlayerAddValue);

        // 增加悬赏金币
        let massacreValue = this.mAttribute.getAttrValue(beKillerId, Attribute.EnumAttributeType.massacreValue);
        if (massacreValue == 0) {
            return;
        }

        // 增加金币
        let addGold = massacreValue * Globaldata.massacre_base_moneyReward;
        this.calculateAttrValue(killerId, Attribute.EnumAttributeType.money, addGold);

        let name1 = this.mAttribute.getAttrValue(killerId, Attribute.EnumAttributeType.playerName);
        let name2 = this.mAttribute.getAttrValue(beKillerId, Attribute.EnumAttributeType.playerName);

        EventManager.instance.call(ENotice_Events_S.NoticeEvent_TipMsg_S, killerId, 318, [name1, name2, addGold]);
    }

    // 玩家死亡
    private setPlayerDeadState(playerID: number, sceneID: number) {
        let player = Player.getPlayer(playerID);
        if (!player) return;

        EventManager.instance.call(EPlayerEvents_S.player_deadState_s, playerID, sceneID);

        // 不可移动

        this.listen_setMovement(playerID, false, false);

        // 隐藏
        PlayerManagerExtesion.rpcPlayAnimation(player.character, Globaldata.player_deadAnim);
        // 怒气值清除
        EventManager.instance.call(EAttributeEvents_S.attr_change_s, playerID, Attribute.EnumAttributeType.angerValue, 0);

        this.stop_recover_Hp(playerID);
        this.deadPlayer.add(playerID);

        let time = Globaldata.reviveTime * 1000;

        setTimeout(() => {
            this.request_resurgence(playerID, sceneID)
        }, time);

        this.getClient(playerID).net_playerDead(0, sceneID, this.getPlayerAttr(playerID, Attribute.EnumAttributeType.rankScore));

        // 通知所有玩家该玩家死亡了
        let players = mw.Player.getAllPlayers();
        for (let index = 0; index < players.length; index++) {
            const tmpPlayer = players[index];
            let tmpClient = this.getClient(tmpPlayer);
            if (tmpClient == null) {
                continue;
            }
            if (playerID == tmpPlayer.playerId) {
                continue;
            }
            tmpClient.net_otherPlayerDead(playerID);
        }
    }
    // 玩家请求复活
    public request_resurgence(playerID: number, sceneID: number) {
        let player = Player.getPlayer(playerID);

        if (!player) {
            return
        }
        // 设置玩家能够切换武器
        EventManager.instance.call(EAttributeEvents_S.attr_change_s, playerID, Attribute.EnumAttributeType.isCanChangeWeapon, 0);

        this.deadPlayer.delete(playerID);

        // 回满血
        if (!this.playerAttributeMap.has(playerID)) {
            return;
        }
        let attrVo = this.playerAttributeMap.get(playerID);
        attrVo.setAttribute(Attribute.EnumAttributeType.hp, this.getPlayerAttr(playerID, Attribute.EnumAttributeType.maxHp));

        EventManager.instance.call(EAttributeEvents_S.attr_change_s, playerID, Attribute.EnumAttributeType.isPlayerHeadUI, 1);

        // 清空杀戮值
        EventManager.instance.call(EAttributeEvents_S.attr_change_s
            , playerID, Attribute.EnumAttributeType.massacreValue, 0);

        // 传送玩家位置
        this.getPlayerData(playerID)?.startTransform();

        // 移动策略玩家主控端   坐标相关放到客户端去处理 因为网络延迟影响
        //EventManager.instance.call(EAreaEvents_S.area_resurgence_s, playerID);
        // 修正下玩家角度
        let curPlayerRot = player.character.worldTransform.rotation.clone();
        curPlayerRot.x = 0;
        curPlayerRot.y = 0;
        player.character.worldTransform.rotation = curPlayerRot;

        // 通知除死亡玩家外其它玩家改玩家复活了   主控端问题（可能该玩家断线了）
        let players = mw.Player.getAllPlayers();
        for (let index = 0; index < players.length; index++) {
            const element = players[index];
            if (element == player) {
                continue;
            }
            let otherClient = this.getClient(element);
            if (otherClient == null) {
                continue;
            }
            otherClient.net_otherPlayerResurgence(playerID);
        }

        this.getClient(playerID).net_Resurgence(sceneID);
        // 可移动
        this.listen_setMovement(playerID, true, true);
    }

    // 通知玩家显示伤害飘字 TODO优化下
    public dispatchSceneUnitInjure(playerID: number, dmgInfo: HitDamageInfo[], hitIds: number[]) {
        this.getClient(playerID).net_receive_scene_unit_injured(hitIds, dmgInfo);
    }


    /**开始恢复血量key */
    public hpRecoverIntreval: Map<number, any> = new Map<number, any>();

    /**
     * 恢复血量
     * @param interval 恢复间隔 秒 0.2 、0.5
     */
    public start_recover_Hp(playerID: number, interval: number, addVal: number) {

        this.stop_recover_Hp(playerID);

        let key = TimeUtil.setInterval(() => {
            this.addPlayerAttrIT(playerID, Attribute.EnumAttributeType.hp, addVal, false);

            // 满血停止恢复
            let maxHp = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.maxHp);
            let hp = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.hp);
            if (hp >= maxHp) {
                this.stop_recover_Hp(playerID);
                this.setPlayerAttr(playerID, Attribute.EnumAttributeType.hp, maxHp, false);
            }
        }, interval)

        this.hpRecoverIntreval.set(playerID, key);
    }
    /**
     * 停止恢复血量
     */
    public stop_recover_Hp(playerID: number) {

        let player = Player.getPlayer(playerID);
        if (!player) {
            return;
        }

        if (!this.hpRecoverIntreval.has(playerID)) {
            return;
        }

        let key = this.hpRecoverIntreval.get(playerID);
        TimeUtil.clearInterval(key);
        this.hpRecoverIntreval.delete(playerID);
    }
    /**
     * 血量变化修改战斗属性
     * 玩家血量相关属性发生变化，刷新玩家战斗状态，重新同步玩家血量数据
     * 1.增加减少属性
     * 2.重新计算属性
     * @param playerID 
     * @param type 
     */
    private refashPlayFightestate(playerID: number) {
        let pData = this.getPlayerData(playerID);
        if (!pData) {
            return;
        }
        pData.state = null;
        this.checkPlayerRestTick(playerID);
    }
    /**
     * 玩家受击脱战后1秒恢复生命值1%的血量
     * 1 玩家攻击怪或被怪攻击，进入战斗状态
     * 2 战斗状态玩家恢复减半 0.5秒一回 
     * 3 战斗状态后受伤不恢复血量
     * 5 战斗状态受伤后，10秒没有受伤，开始正常血量恢复
     * 4 战斗状态受伤后，5 秒没有受伤，开始战斗血量恢复
     * 6 正常血量恢复 0.2 秒一回 
     */
    @updater.updateByFrameInterval(1 / (Constants.LogicFrameInterval * 5), "onLogicUpdate")
    private checkPlayersRestTick() {
        for (let player of this.playerAttributeMap.keys()) {
            this.checkPlayerRestTick(player);
        }
    }
    private checkPlayerRestTick(playerID: number) {

        if (!Player.getPlayer(playerID)) {
            return;
        }

        if (playerID <= 0) {
            return;
        }

        let pData = this.getPlayerData(playerID);

        if (pData == null) {
            return;
        }

        let state: EPlayerFightState = EPlayerFightState.none;

        // 未初始化
        if (!this.playerAttributeMap.has(playerID)) return
        // 死亡
        if (this.deadPlayer.has(playerID)) {
            this.stop_recover_Hp(playerID);
            return
        }

        let maxHp = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.maxHp);
        let hp = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.hp);

        if (hp >= maxHp) {
            if (pData.isFightStatus && pData.isFightStatusBeHurt) {
                state = EPlayerFightState.beHurt;
            }
            if (pData.isFightStatus && !pData.isFightStatusBeHurt) {
                state = EPlayerFightState.fight;
            }
            if (!pData.isFightStatus && !pData.isFightStatusBeHurt) {
                state = EPlayerFightState.normal;
            }

            if (state != pData.state) {
                this.stop_recover_Hp(playerID);
                this.setPlayerAttr(playerID, Attribute.EnumAttributeType.hp, maxHp, false);
                this.getClient(playerID).net_changePlayerState(state);
                pData.state = state;
            }
            return;
        }


        if (pData == null) {
            if (state != pData.state) {
                this.stop_recover_Hp(playerID);
                this.getClient(playerID).net_changePlayerState(state);
                pData.state = state;
            }
            return
        }

        if (pData.isFightStatus && pData.isFightStatusBeHurt) {
            state = EPlayerFightState.beHurt;
            if (state != pData.state) {
                this.stop_recover_Hp(playerID);
                this.getClient(playerID).net_changePlayerState(state);
                pData.state = state;
            }
            return
        }

        // 战斗状态减半 
        if (pData.isFightStatus) {
            state = EPlayerFightState.fight;
            if (state != pData.state) {
                let addVal = this.getAddHp(playerID, state);
                this.start_recover_Hp(playerID, 0.5, addVal);
                this.getClient(playerID).net_changePlayerState(state);
                pData.state = state;
            }

        } else {
            state = EPlayerFightState.normal;
            if (state != pData.state) {
                let addVal = this.getAddHp(playerID, state);
                this.start_recover_Hp(playerID, 0.2, addVal);
                this.getClient(playerID).net_changePlayerState(state);
                pData.state = state;
            }
        }
    }

    /**
     * 获取加血量
     * @param playerID 
     */
    private getAddHp(playerID: number, state: EPlayerFightState): number {
        let player = Player.getPlayer(playerID);
        if (!player) {
            return 0;
        }
        let leveladd: number = 0;
        if (state == EPlayerFightState.fight) {
            leveladd = Globaldata.hpRecover * Globaldata.hpRecoverfightRate;
        }
        if (state == EPlayerFightState.normal) {
            leveladd = Globaldata.hpRecover
        }
        return leveladd;
    }

    /**监听玩家属性增幅 */
    private listen_addAttribute(playerID: number, type: Attribute.EnumAttributeType, addType: EItemAddType, value: number) {
        switch (addType) {
            case EItemAddType.per:
                {
                    if (type == Attribute.EnumAttributeType.hp) {
                        let maxHp = this.getPlayerAttr(playerID, Attribute.EnumAttributeType.maxHp);
                        value = maxHp * value;
                    }
                }
                break;
            default:
                break;
        }

        this.addPlayerAttr(playerID, type, value);
    }

    public logToClientMsg(msg: string) {
        this.getAllClient().net_showAtkValue(msg);
    }

    private listen_addMoney(playerID: number, value: number) {
        this.addPlayerAttr(playerID, Attribute.EnumAttributeType.money, value);
    }

    /**切换玩家状态机 */
    public changeFSMState(pId: number, state: EPlayerState) {
        if (this.playerProxyMap.has(pId) == false) {
            return;
        }

        let playerProxy = this.playerProxyMap.get(pId);
        playerProxy.changeState(state);
    }

    /**
     * 修改玩家状态机
     */
    @Decorator.noReply()
    public net_changeFSMState(state: EPlayerState) {
        this.changeFSMState(this.currentPlayerId, state);
    }

    private listen_diveVisible(pId: number, visilbe: boolean) {

        let client = this.getClient(pId);
        if (client == null) return;

        if (visilbe) {
            /**开始俯冲动画 */
            client.net_startDive();
        } else {
            /**关闭俯冲动画 */
            client.net_closeDive();
        }
    }

    /** 
     * 刷新玩家今日已获取段位分
     */
    private resetdayRankScore(playerID: number) {
        let curDate = new Date();
        let lastDate = new Date(this.getPlayerAttr(playerID, Attribute.EnumAttributeType.loginTime));
        //跨天判断
        if (curDate.getDate() == lastDate.getDate() && curDate.getMonth() == lastDate.getMonth() && curDate.getFullYear() == lastDate.getFullYear()) {
            return;
        }
        this.setPlayerAttr(playerID, Attribute.EnumAttributeType.loginTime, curDate.getTime());
        this.setPlayerAttr(playerID, Attribute.EnumAttributeType.dayRankScore, 0);
    }

    /**
     * 击杀与被击杀玩家段位分计算,解锁段位奖励
     */
    private rankScoreCal(deadId: number, attackId: number) {
        let attackRank = this.getRankLevel(attackId);
        let deadRank = this.getRankLevel(deadId);
        let cfg = GameConfig.Rank.getElement(attackRank);
        if (!cfg) return;
        //双方段位分变化
        let calScore = cfg.rankIntegral[deadRank - 1];
        let mulCfg = GameConfig.MultipleKill.getAllElement();
        let addRate = mulCfg[(Math.min(this.getPlayerData(attackId).getKillCount(), mulCfg.length)) - 1].Factor;
        this.addPlayerAttr(attackId, Attribute.EnumAttributeType.rankScore, Math.round(calScore * addRate));
        this.reducePlayerAttr(deadId, Attribute.EnumAttributeType.rankScore, Math.round(calScore * Globaldata.rankScoreRate));
    }
    /**
     * 检查段位，解锁段位奖励
     */
    private checkRankReward(playerID: number) {
        let rank = this.getRankLevel(playerID);
        //段位埋点
        EventManager.instance.call(EAnalyticsEvents_S.firstDo_S, playerID, EFirstDo.rank1 + rank - 1);
        this._shopS.addRankReward(playerID, rank);
    }

    /**
     * 根据玩家id获取玩家段位
     */
    public getRankLevel(playerId: number): number {
        let rankScore = this.getPlayerAttr(playerId, Attribute.EnumAttributeType.rankScore);
        let id = PlayerManager.instance.getRankLevel(rankScore);
        return id;
    }
    /**
     * 获得玩家名字时发段位公告
     */
    private listen_getPlayerName(playerId: number, name: string) {
        let rank = this.getRankLevel(playerId);
        let cfg = GameConfig.Rank.getElement(rank);
        if (!cfg) return;
        if (!cfg.notice) return;
        this.getAllClient().net_startNotice(ERankNoticeType.Enter, rank, name);
    }

    /**
     * 服务端播放击杀特效
     */
    private playKillEffect(playerId: number, deadPlayer: Player) {
        let equipId = ModuleService.getModule(EquipModuleS).getPartEquipId(playerId, EEquipPartType.killEff);
        if (!equipId) return;
        let effCfg = GameConfig.AppearancePendant.getElement(GameConfig.Equip.getElement(equipId).pendantId[0]);
        if (!effCfg) return;
        EffectService.playOnGameObject(effCfg.assetGuid, deadPlayer.character, { slotType: effCfg.slot, position: effCfg.weaPos, rotation: effCfg.weaRot.toRotation(), scale: effCfg.weaScale });
    }
}


