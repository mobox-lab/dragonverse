import { BuffManagerS, BuffSpawnInPlayerData, BuffSpawnInObjData, BuffSpawnInPlaceData, EBuffHostType, BuffS, EBuffSpawnRule, EBuffLifecycleType, EBuffParamType, EBuffPropertyType, buffArgs, BuffManagerC, convertArrayToRotation, convertArrayToVector } from "module_buff";
import { GameConfig } from "../../config/GameConfig";
import { BuffModuleC } from "./BuffModuleC";
import { oTraceError } from "odin";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { EBuffCreatType, EBuffEffectType, EBuffGameType, EBuffRmoveType, getBuffClass, /* getBuffClass2 */ } from "./Util/BuffUtil";
import { EventManager } from "../../tool/EventManager";
import { EBuffEvent_S, EDefineType, EModule_Events_S, EPlayerEvents_S } from "../../const/Enum";
import { RecoveryLifeBuffS } from "./Buff/CustomBuff/RecoveryLifeBuff";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { Globaldata } from "../../const/Globaldata";
import { BattleWorldPlayerModuleData } from "../PlayerModule/PlayerModuleData";
import { util } from "../../tool/Utils";
import { MascotModuleS } from "../npc/mascotNpc/MascotModuleS";
import { Tools } from "../../tool/Tools";


export class BuffModuleS extends ModuleS<BuffModuleC, null> {

    /**特殊处理：重新创建 且只能存在一个configId的buff, 会销毁所有已经有的 21,27,*/
    private refashCreateBuffConfigId: number[] = [];

    /**切换职业需要销毁的buff */
    private jobChageDestroyConfigIds: number[] = []

    /**占补buff*/
    private divineBuffConfigId: number[] = [];

    /**被动Buff*/
    private passiveBuffConfigId: number[] = [];

    /**社团*/
    private clubBuffConfigId: number[] = [];

    private playerModuleS: PlayerModuleS = null;

    protected override onAwake(): void {
        super.onAwake();
        //初始化服务端的buff管理器
        BuffManagerS.instance.init(GameConfig.Buff.getAllElement(), true, false, false);
        //监听buff开始创建特效，可以外部来生成特效
        BuffManagerS.instance.onBuffEffectPreCreate.add(this.listen_onBuffEffectPreCreate, this);
        //监听当buff生成了
        BuffManagerS.instance.onBuffCreated.add(this.listen_onBuffCreated, this);
        //监听当buff将要销毁时
        BuffManagerS.instance.onBuffPreDestroy.add(this.listen_onBuffPreDestroy, this);
        //监听当buff触发了一次效果
        BuffManagerS.instance.onBuffEffectTrigger.add(this.listen_onBuffEffectTrigger, this);
        //监听当buff要创建子buff时
        BuffManagerS.instance.onSubBuffPreCreate.add((buff: BuffS) => { });
        //监听当buff要调用施放技能
        BuffManagerS.instance.onSkillTrigger.add((buff: BuffS) => { });

        //玩家死亡销毁buff
        EventManager.instance.add(EPlayerEvents_S.player_deadState_s, this.listen_playerDead, this);
        //退出角斗场销毁buff
        EventManager.instance.add(EPlayerEvents_S.player_RemoveCenterBuff, this.listen_removeCentrBuff, this);
        //清理掉所有buff
        EventManager.instance.add(EBuffEvent_S.BuffEvent_RemoveAllBuff_S, this.listen_removeAllBuff, this);


        let buffCfgs = GameConfig.Buff.getAllElement();
        for (let index = 0; index < buffCfgs.length; index++) {
            const element = buffCfgs[index];
            if (element.changeJobDestrory == 1 || element.changeJobDestrory == null) {
                this.jobChageDestroyConfigIds.push(element.id);
            }

            //占卜 
            if (element.buffGameType == EBuffGameType.divineBuff) {
                this.divineBuffConfigId.push(element.id);
            }

            //被动
            if (element.buffGameType == EBuffGameType.passiveBuff) {
                this.passiveBuffConfigId.push(element.id);
            }

            //社团
            if (element.buffGameType == EBuffGameType.clutBuff) {
                this.clubBuffConfigId.push(element.id);
            }

            //特殊处理：重新创建  
            if (element.overlayType == 4) {
                this.refashCreateBuffConfigId.push(element.id);
            }
        }

        this.playerModuleS = ModuleService.getModule(PlayerModuleS);
    }


    /**自定义Buff 特效管理 */
    private listen_onBuffEffectPreCreate(data: BuffSpawnInPlayerData | BuffSpawnInObjData | BuffSpawnInPlaceData, hostType: EBuffHostType): void {
        if (hostType == 1) {
            let spawnInPlayerData = data as BuffSpawnInPlayerData;
            let pId = Number(spawnInPlayerData.playerId);
            if (pId > 0) {
                let player = mw.Player.getPlayer(pId);
                if (player == null) {
                    return;
                }
            }

            let buffCfg = GameConfig.Buff.getElement(data.configId);
            if (buffCfg == null) {
                return;
            }

            if (buffCfg.effectGuids) {
                for (let index = 0; index < buffCfg.effectGuids.length; index++) {
                    const effectId = buffCfg.effectGuids[index];
                    if (pId > 0) {
                        util.playEffectOnPlayer(pId, effectId);
                    }
                    else {
                        let unit = ModuleService.getModule(MascotModuleS).getUnit(pId);
                        if (unit && unit.getModel()) {
                            util.playEffectOnScenceUint(unit.getModel(), effectId);
                        }
                    }
                }
            }

        }
    }

    /**监听buff 创建回调 */
    private listen_onBuffCreated(buff: BuffS): void {

    }

    /**监听buff 销毁回调 */
    private listen_onBuffPreDestroy(buff: BuffS): void {

    }

    /**监听buff 触发回调*/
    private listen_onBuffEffectTrigger(buff: BuffS): void {

    }

    /**net 创建buff*/
    @Decorator.noReply()
    public net_createBuff(buffId: number, sceneUnitroPlayerID: number, isClient: boolean, pos?: mw.Vector): void {
        this.createBuff(buffId, this.currentPlayerId, sceneUnitroPlayerID, { castPId: this.currentPlayerId, buffParamType: null, value: null, pos: pos }, isClient);
    }


    /**
     * 玩家是配置id的buff
     * @param pid 
     * @param configId 
     * @returns 
     */
    public isPlayerHaveConfigIdBuff(pid: number, configId: number): boolean {
        if (pid == null) {
            return false;
        }
        let buffs = BuffManagerS.instance.findBuffByHostId(pid.toString())
        if (buffs) {
            for (let index = 0; index < buffs.length; index++) {
                const buff = buffs[index];
                if (buff.configId == configId) {
                    return true;
                }
            }
        }
        return false;
    }


    /**
     * NPC死亡-- 销毁所有buff
     * @param hurts
     */
    public destroyAllplayerOrScencUnitBuffs(playerOrScencUnitID: number) {
        this.removeBuff(playerOrScencUnitID, null);
    }

    /**
     * 监听清理掉所有buff
     * @param pId 玩家id
     * @returns 
     */
    private listen_removeAllBuff(pId: number) {
        let player = Player.getPlayer(pId);
        if (player == null) {
            return;
        }
        this.removeBuff(pId, (configId) => {
            return !this.passiveBuffConfigId.includes((configId)) && !this.divineBuffConfigId.includes((configId)) && !this.clubBuffConfigId.includes((configId));
        })
    }

    /**
     * 监听玩家死亡-- 销毁buff(被动，占卜之外所有)
     */
    private listen_playerDead(pId: number) {
        let player = Player.getPlayer(pId);
        if (player == null) {
            return;
        }
        this.removeBuff(pId, (configId) => {
            return !this.passiveBuffConfigId.includes((configId)) && !this.divineBuffConfigId.includes((configId)) && !this.clubBuffConfigId.includes((configId));
        })
    }

    private listen_removeCentrBuff(pId: number) {
        let player = Player.getPlayer(pId);
        if (player == null) {
            return;
        }
        this.removeBuff(pId, (buffEffectType) => {
            return buffEffectType == EBuffEffectType.Center;
        }, EBuffRmoveType.buffEffectType)
    }


    /**
     * 移除buff
     * @param pId 
     * @param filterFunction 
     */
    public removeBuff(pId: number, filterFunction: (configId) => boolean, removeType: EBuffRmoveType = EBuffRmoveType.configId) {

        if (pId == null || pId == undefined) {
            return;
        }

        if (pId > 0 && Player.getPlayer(pId) == null) {
            return;
        }

        let buffs = BuffManagerS.instance.findBuffByHostId(pId.toString())
        if (buffs) {
            let buffIDs = [];
            for (let index = 0; index < buffs.length; index++) {
                const buff = buffs[index];
                if (filterFunction == null) {
                    buffIDs.push(buff.id);
                    continue;
                }

                if (removeType == EBuffRmoveType.configId) {
                    if (filterFunction && filterFunction(buff.configId) == true) {
                        buffIDs.push(buff.id);
                    }
                }

                if (removeType == EBuffRmoveType.buffEffectType) {
                    if (filterFunction && filterFunction(buff.buffEffectType) == true) {
                        buffIDs.push(buff.id);
                    }
                }

            }
            BuffManagerS.instance.removeBuffsById(buffIDs);
        }
    }

    /**
     * 创建buff
     * @param buffId buffid 
     * @param formPlayerId 从哪个玩家身上创建的
     * @param toPlayID 目标id
     */
    public createBuff(buffCfgId: number, formPlayerId: number, toPlayID: number, args: buffArgs = { castPId: formPlayerId, buffParamType: null, value: null, pos: null }, isClient: boolean = false) {
        if (toPlayID == null) {
            return;
        }

        if (buffCfgId == null || buffCfgId <= 0) {
            return
        }

        // buff优先级校验
        let buffCfg = GameConfig.Buff.getElement(buffCfgId);
        if (buffCfg.checkIds && buffCfg.checkIds.length > 0) {
            let buffs = BuffManagerS.instance.findBuffByHostId(toPlayID.toString())

            for (let index = 0; index < buffs.length; index++) {
                const buff = buffs[index];
                if (buffCfg.checkIds.includes(buff.configId)) {
                    return;
                }
            }
        }

        //传送中不创建吸附类buff 
        if (buffCfg.buffEffectType == EBuffEffectType.Center) {
            let data = DataCenterS.getData(toPlayID, BattleWorldPlayerModuleData);
            if (data && data.istransform) {
                return;
            }
        }

        //销毁特殊id的buff
        this.removeBuff(toPlayID, (tmpBuffCfgId) => {

            if (tmpBuffCfgId != buffCfgId) {
                return false;
            }
            let cond1 = this.refashCreateBuffConfigId.includes((buffCfgId));
            if (cond1 == false) {
                return false;
            }
            return true;
        })


        //创建
        //oTrace("createBuff=====================>>>>", isClient,buffCfg.name, buffId, formPlayerId, toPlayID, args)
        let cls = null;
        let spawnRule = null;
        let creatType = null;
        // if (isClient) {
        //     cls = getBuffClass2(buffId)[0];
        //     spawnRule = getBuffClass2(buffId)[1];
        //     creatType = getBuffClass2(buffId)[2];
        // } else {
        cls = getBuffClass(buffCfgId)[0];
        spawnRule = getBuffClass(buffCfgId)[1];
        creatType = getBuffClass(buffCfgId)[2];
        // }

        switch (creatType) {
            case EBuffCreatType.createBuffInPlayer:
                BuffManagerS.instance.createBuffInPlayer(String(toPlayID), buffCfgId, cls, [formPlayerId, args], spawnRule);
                break;
            case EBuffCreatType.createBuffInPlace:
                let pos = Player.getPlayer(formPlayerId).character.worldTransform.position;
                BuffManagerS.instance.createBuffInPlace(buffCfgId, pos, null, null, cls, [formPlayerId, args], spawnRule);
                break;
            case EBuffCreatType.createBuffInGameObject:
                BuffManagerS.instance.createBuffInGameObject(String(toPlayID), buffCfgId, cls, args != null ? args : [formPlayerId, args], spawnRule);
                break;
            default:
                break;
        }

    }


    /**
     * 创建自生属性类型buff
     * @param buffId buff配置id
     * @param toPlayID 玩家id
     * @param buffParamType buff参数的数值代表的类型(0值类型-1百分比类型)
     * @param value 加成值(50 = 50%)
     */
    public createBuffSelfAttribute(buffId: number, toPlayID: number, buffParamType: EBuffParamType, value: number) {
        this.createBuff(buffId, toPlayID, toPlayID, { castPId: toPlayID, buffParamType: buffParamType, value: value, pos: null })
    }

    /**
     * 销毁自生属性类型buff
     * @param pid 玩家id
     * @param buffids 删除的buff配置id
     */
    public destroyBuffSelfAttribute(pid: number, buffconfigIds: number[]) {
        //oTrace("destroyBuffSelfAttribute=====================>>>>", buffconfigIds);
        this.removeBuff(pid, (configId) => {
            return buffconfigIds.includes((configId));
        })
    }



    /**
    * buff 更改玩家属性
    * @param this 
    * @param t_pid 
    * @param isCreated 创建buff还是销毁buff
    * @returns 
    */
    private buff_changeAttr(t_pid: number, isCreated: boolean, buffid: number): void {

        let buffCfg = GameConfig.Buff.getElement(buffid);

        if ((buffCfg.affectPropertyType in Attribute.EnumAttributeType) == false) {
            oTraceError("error:buff_changeAttr_over affectPropertyType not in attr ", buffCfg.affectPropertyType);
            return;
        }

        // 标准类型
        let t_normalType = Number(buffCfg.affectPropertyType);
        //加成类型
        let t_addType = t_normalType + Globaldata.addAttribueTypeVale;
        let t_MultipleType = t_normalType + Globaldata.multiplyAttribueTypeVale;

        if ((t_normalType in Attribute.EnumAttributeType) == false) {
            oTraceError("error:buff_changeAttr_over t_normalType not in attr ", t_normalType);
            return;
        }

        //加成值类型 Percent or Value
        let t_type = buffCfg.param1_Model == EBuffParamType.Percent ? t_MultipleType : t_addType
        //玩家
        if (t_pid > 0) {

            //注意：销毁判断玩家
            let player = Player.getPlayer(t_pid);
            if (player == null) {
                oTraceError("error:buff_changeAttr_over player == null ", t_pid);
                return;
            }
            if (player.character == null) {
                oTraceError("error:buff_changeAttr_over character == nulld ", t_pid);
                return;
            }

            if (isCreated) {
                this.playerModuleS.addPlayerAttr(t_pid, t_type, buffCfg.param1)
            } else {
                this.playerModuleS.reducePlayerAttr(t_pid, t_type, buffCfg.param1, null, EDefineType.none)
            }

        }
    }



    /**
    * 移除占卜id相关buff
    * @param pid 
    */
    public remove_divine_AttributeBuffs(pid: number,) {
        //oTrace("remove_divine_AttributeBuffs");
        this.removeBuff(pid, (configId) => {
            return this.divineBuffConfigId.includes((configId));
        })
    }
    /**
     * 移除社团buff
     * @param pid 
     */
    public remove_club_AttributeBuffs(pid: number) {
        this.removeBuff(pid, (configId) => {
            return this.clubBuffConfigId.includes((configId));
        })
    }

    /**
     * 检查玩家有自生灼烧buff
     * @param toPlayID 
     */
    @Decorator.noReply()
    public net_checkCauterizeSelfBuff(toPlayID: number) {
        this.checkCauterizeSelfBuff(this.currentPlayerId, toPlayID, true)
    }
    /**
     * 检查玩家有自生灼烧buff
     * @param formPlayerId 
     * @param toPlayID 
     */
    public checkCauterizeSelfBuff(formPlayerId: number, toPlayID: number, isClient: boolean = false) {
        // oTrace("checkCauterizeSelfBuff_______________________________", formPlayerId,toPlayID);
        if (formPlayerId < 0) {
            return;
        }

        let isHave: boolean = false;
        let buffs = BuffManagerS.instance.findBuffByHostId(formPlayerId.toString())
        if (buffs) {
            let buffIDs = [];
            for (let index = 0; index < buffs.length; index++) {
                const buff = buffs[index];
                if (buff.buffEffectType == Number(EBuffEffectType.CauterizeSelf)) {
                    isHave = true;
                    buffIDs.push(buff.configId);
                }
            }

            if (isHave) {
                for (let index = 0; index < buffIDs.length; index++) {
                    const element = buffIDs[index];
                    let cfg = GameConfig.Buff.getElement(element);
                    this.createBuff(cfg.param1, formPlayerId, toPlayID, null, isClient);
                }
            }
            //oTrace("checkCauterizeSelfBuff_______________________________", buffIDs,isHave);
        }

    }


    protected onPlayerLeft(player: mw.Player): void {
        let playid = player.playerId;
        if (RecoveryLifeBuffS.InRangePlayer.has(playid)) {
            RecoveryLifeBuffS.InRangePlayer.delete(playid);
        }

    }


    /**是否包含禁锢类型buff */
    public isHasLockBuff(pId: number) {
        let buffs = BuffManagerS.instance.findBuffByHostId(pId.toString());

        if (Tools.isEmpty(buffs)) {
            return false;
        }

        for (let index = 0; index < buffs.length; index++) {
            const tmpBuff = buffs[index];
            if (tmpBuff.staticConfig.buffEffectType == EBuffEffectType.LockUp) {
                return true;
            }
        }
        return false;
    }

}
