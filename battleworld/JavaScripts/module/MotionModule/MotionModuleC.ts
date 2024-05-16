import { LogManager, oTraceError } from "odin";
import { GameConfig } from "../../config/GameConfig";
import { EAreaId, EAttributeEvents_C, EBagSkillEvents, EBagSkillEvents_C, ELogName, EModule_Events, EMotionEvents_C, EPlayerEvents_C, EWeaponEvent_C } from "../../const/Enum";
import { EMotion_Events } from "../../const/Enum";
import { MotionDataManager } from "../../editors/motionEditor/MotionDataManager";
import { EventManager } from "../../tool/EventManager";
import { MotionProcess } from "./MotionModule";
import { MotionModuleS } from "./MotionModuleS";
import { MotionUtil } from "./MotionUtil";
import { AbstractMotion, ActionContext } from "./motionBase/MotionBase";
import { IMotionSkillElement } from "../../config/MotionSkill";
import { Globaldata } from "../../const/Globaldata";
import { TriggerHelper } from "../../tool/TriggerHelper";
import { PlayerModuleC, noSkillCallBackSet } from "../PlayerModule/PlayerModuleC";
import { Notice } from "../../tool/Notice";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { Constants } from "../../tool/Constants";
import { PlayerManager } from "../PlayerModule/PlayerManager";
import { EWorldType, GlobalWorld } from "../../const/GlobalWorld";
import { AreaModuleC } from "../AreaModule/AreaModuleC";
import { NpcProcess } from "./NpcProcess";
import { util } from "../../tool/Utils";
import { THurtData } from "../PlayerModule/PlayerModuleS";
import { MascotModuleC } from "../npc/mascotNpc/MascotModuleC";
import { UnitManager } from "../npc/UnitManager";
import DamageManger from "../../tool/DamageManger";
import { EventSyncTool } from "../../tool/EventSyncTool";
import { MotionProxyC } from "./MotionProxyC";
import { AttributeModuleC } from "../AttributeModule/AttributeModuleC";
import ActionUI from "../PlayerModule/UI/ActionUI";


export class MotionModuleC extends ModuleC<MotionModuleS, null>{

    // private mAreaNpc: AreaNpcModuleC = null;
    private mPlayer: PlayerModuleC = null;
    private mArea: AreaModuleC = null;
    private mAttr: AttributeModuleC = null;

    private mMascot: MascotModuleC = null;


    private process: MotionProcess;

    /**用于缓存预释放技能回调函数 */
    private prestoreCallFunc: any = null;

    /**上次释放技能时间 */
    private preReleaseSkillTime: number = 0;


    private _currentMotion: AbstractMotion | undefined
    get currentMotion(): AbstractMotion | undefined { return this._currentMotion }


    private _lockUnits: mw.GameObject[] = [];

    /**玩家动效代理 */
    private moitionProxyMap: Map<number, MotionProxyC> = new Map();

    protected onAwake(): void {
        MotionDataManager.instance.init();

        // 初始化角色
        let players = mw.Player.getAllPlayers();
        for (let index = 0; index < players.length; index++) {
            const tmpPlayer = players[index];
            this.listen_playerJoin(tmpPlayer.playerId, null, null);
        }

        EventManager.instance.add(EPlayerEvents_C.player_syncPlayerid_c, this.listen_playerJoin, this);
        mw.Player.onPlayerLeave.add(this.listen_playerLeave.bind(this));
    }

    private listen_playerLeave(player: mw.Player) {
        if (this.moitionProxyMap.has(player.playerId) == false) {
            return;
        }

        let proxy = this.moitionProxyMap.get(player.playerId);
        proxy.onDestroy();

        this.moitionProxyMap.delete(player.playerId);
    }

    /**监听玩家进入游戏 */
    private listen_playerJoin(pId: number, name: string, lv: number) {

        if (this.moitionProxyMap.has(pId)) {
            return;
        }

        this.moitionProxyMap.set(pId, new MotionProxyC(pId));
    }

    async onStart() {

        // this.mAreaNpc = ModuleService.getModule(AreaNpcModuleC);
        this.mPlayer = ModuleService.getModule(PlayerModuleC);
        this.mMascot = ModuleService.getModule(MascotModuleC);
        this.mAttr = ModuleService.getModule(AttributeModuleC);

        this.mArea = ModuleService.getModule(AreaModuleC);

        TriggerHelper.init(2);

        this.process = new MotionProcess();

        // NPC单端动效 初始化
        NpcProcess.instance.init();

        TimeUtil.setInterval(this.process.updateLogic.bind(this.process), Constants.LogicFrameInterval);


        EventManager.instance.add(EMotion_Events.MotionInvokeMotionId, this.listen_MotionInvokeMotionId.bind(this));

        EventManager.instance.add(EModule_Events.motion_stop, this.listen_stopMotion.bind(this));

        EventManager.instance.add(EModule_Events.motion_attack, this.listen_motionAttack.bind(this));

        EventManager.instance.add(EMotion_Events.MotionInvokeMotion, this.invoke_motion.bind(this));

        EventManager.instance.add(EBagSkillEvents_C.bagSkill_putWeaponCond, this.listen_call_putWeaponCond, this);

        EventManager.instance.add(EMotionEvents_C.motion_setMovement_c, this.listen_setMovement, this);

        EventManager.instance.add(EMotionEvents_C.motion_addPrestore, this.listen_addPrestore, this);
        EventManager.instance.add(EMotionEvents_C.motion_invokePrestore, this.listen_invokePrestore, this);

        EventManager.instance.add(EBagSkillEvents.change_bagSkill, this.listen_change_bagSkill, this);

        EventManager.instance.add(EPlayerEvents_C.player_stop_sprintEffect, this.stopSprint, this);
        /**释放终极大招 */
        EventManager.instance.add(EMotionEvents_C.MotionEvent_ReleaseFinalSkill_C, this.listen_releaseFinalSkill, this);


        EventManager.instance.add(EAttributeEvents_C.Attribute_gasExplosion_C, this.listen_gasExplosion, this);

        // 监听到玩家死亡了
        EventManager.instance.add(EPlayerEvents_C.Player_ChangeDeadState_C,
            this.listen_playerDead, this);
        Player.onPlayerLeave.add(this.listen_playerLeft.bind(this));

    }

    /**
    * 监听玩家爆气状态 
    * @param pId 玩家id
    * @param state 爆气状态 0未爆气 1爆气中
    * @returns 
    */
    private listen_gasExplosion(pId: number, state: number) {
        if (this.moitionProxyMap.has(pId) == false) {
            this.moitionProxyMap.get(this.localPlayerId).clear_finalSkillKey();
            return;
        }

        this.moitionProxyMap.get(pId).refresh_gasExplosion(state);
    }

    /**玩家死亡 */
    private listen_playerDead() {
        if (this.moitionProxyMap.has(this.localPlayerId) == false) {
            return;
        }
        this.moitionProxyMap.get(this.localPlayerId).clear_finalSkillKey();
    }

    /**释放终极大招 */
    private async listen_releaseFinalSkill() {

        let weaponId = this.mAttr.getAttributeValue(Attribute.EnumAttributeType.weaponId);
        let weaponCfg = GameConfig.Weapon.getElement(weaponId);
        if (weaponCfg == null) {
            return;
        }

        let result = await this.invoke_motion(weaponCfg.ultimateSkillId, () => {

        });

        if (result == false) {
            return;
        }

        let actionUI = UIService.getUI(ActionUI, false);
        if (actionUI) {
            actionUI.showVisibleFinalSkill(false);
        }

        this.server.net_releaseFinalSkill();

        if (this.moitionProxyMap.has(this.localPlayerId)) {
            this.moitionProxyMap.get(this.localPlayerId).releaseFinalSkill();
        }
    }



    /**技能切换 清理下缓存技能*/
    private listen_change_bagSkill(bagSkillId: number) {
        this.prestoreCallFunc = null;
    }

    private listen_addPrestore(callFunc) {
        if (this.prestoreCallFunc) {
            return;
        }
        this.prestoreCallFunc = callFunc;
    }

    /**释放预缓存技能*/
    private listen_invokePrestore() {
        if (this.prestoreCallFunc == null) {
            return;
        }

        let func = this.prestoreCallFunc;
        this.prestoreCallFunc = null;

        this.clear_delayChageStateKey();
        // 延迟下保证 玩家动画先停止再播放
        setTimeout(() => {
            this.clear_delayChageStateKey();
            func();
        }, 0);
    }

    /**是否有预缓存技能 */
    public isPrestore(): boolean {
        return this.prestoreCallFunc != null;
    }

    /**监听控制玩家移动 */
    private listen_setMovement(move: boolean, motion: AbstractMotion) {
        if (move == false) {
            EventManager.instance.call(EPlayerEvents_C.player_setMovement_c, false, false);
            return;
        }

        // 如果玩家还在播放其它动画，设置可移动失败
        if (this.process.isPlayOtherMotion(this.localPlayerId, motion)) {
            return;
        }

        EventManager.instance.call(EPlayerEvents_C.player_setMovement_c, true, true);
    }


    /**注册 玩家把武器收倒背部 条件检测 注意一定要有回调值 */
    private listen_call_putWeaponCond() {

        if (this.process.isHasPlayMotion(this.localPlayerId)) {
            return false;
        }

        return true;
    }


    /**
     * 监听动效攻击
     * @param pIds 攻击到的所有目标id数组
     * @param hurtData 伤害信息
     * @returns 
     */
    // TODO: CL - 服务端验证 hurtData
    private listen_motionAttack(pIds: number[], hurtData: THurtData) {
        if (pIds == null || pIds.length == 0) {
            LogManager.instance.logError(ELogName.VAE, "MotionModuleC:listen_motionAttack pIds is null");
            return;
        }

        if (pIds[0] <= Globaldata.guide_npcId) {
            this.hurtNpc(pIds, hurtData);
            return;
        }

        this.server.net_motionAttackInfo(pIds, hurtData);
    }


    private hurtNpc(pIds: number[], hurtData: THurtData) {

        let moitionEffectCfg = GameConfig.MotionEffect.getElement(hurtData.motionEffectId);
        if (moitionEffectCfg == null) {
            return;
        }

        for (let index = 0; index < pIds.length; index++) {
            const unitId = pIds[index];
            let unit = UnitManager.instance.getUnit(unitId);
            if (unit) {
                //计算伤害！！
                let atkarr: [number, boolean] = DamageManger.instance.getAtkAndCrit(this.localPlayerId, unitId, hurtData.motionEffectId, null);
                let atkVal = atkarr[0] // 伤害 
                unit.onHurt(atkVal);
            }
        }
    }


    /**motion调用motionid */
    private listen_MotionInvokeMotionId(motionId: number) {
        let motionSkillCfg = MotionUtil.getMotionSkillCfg(motionId);
        this.invoke_motion(motionSkillCfg.id);
    }

    /**监听 停止播放动效 */
    private listen_stopMotion() {
        this.process.stopMotion(this.localPlayerId);
    }

    /**设置当前动效 */
    setCurrentMotion(motion?: AbstractMotion) {
        this._currentMotion = motion
    }

    onUpdate(dt: number) {
        this.process.updatePerformant();
    }


    /**
     * 释放动效
     * @param skillId 技能id
     * @param finisFunc 动效结束回调函数
     * @returns 
     */
    public async invoke_motion(skillId: number, finisFunc: () => void = null) {

        // 判断玩家是否死亡
        if (this.mPlayer.isDead()) {
            return false;
        }

        let skillCfg = GameConfig.MotionSkill.getElement(skillId);
        if (skillCfg == null) {
            return false;
        }


        // 判断cd时间
        let lastUseTime = this.mPlayer.getRegisteredMotionLastUseTime(skillCfg.motionId);
        let time = Date.now() - lastUseTime;
        if (time < skillCfg.cd * 1000) {
            return false;
        }


        if (this.process.check_playMotionCond(this.localPlayerId, skillCfg)) {
            return false;
        }


        let curEnergy = this.mPlayer.getAttr(Attribute.EnumAttributeType.energy);
        let needEnergy = skillCfg.magicPoints;

        if (curEnergy < needEnergy) {
            Notice.showDownNotice(util.getLanguageByKey("Text_MainUI_2"));//"能量不足"
            return false;
        }

        // 消耗能量
        if (needEnergy && needEnergy > 0) {
            this.mPlayer.reduceAttr(Attribute.EnumAttributeType.energy, needEnergy, false);
        }

        this.preReleaseSkillTime = Date.now();

        // 看向最近的单位
        let attackTo = this.lock_enemy(skillCfg);

        // 报告给服务器
        this.sync_invoke_motion(skillCfg);

        this.prestoreCallFunc = null;

        let attackToGuid = null;
        if (attackTo) {
            attackToGuid = attackTo.gameObjectId;
        }
        this.clear_delayChageStateKey();
        // 延迟一帧 要不会偶现 那边检测 这边还是为释放状态
        setTimeout(() => {
            if (skillCfg.putWeapon) {
                EventManager.instance.call(EWeaponEvent_C.WeaponEvent_TakeWeaponToHand_C, this.localPlayerId);
            }

            if (noSkillCallBackSet.has(skillId)) {
                EventManager.instance.call(EWeaponEvent_C.WeaponEvent_TakeWeaponToBack_C, this.localPlayerId, 0);
            }

            // 客户端预表现 延迟下要不然玩家转向不过去
            this.process.invokeMotion(skillCfg.id, skillCfg.motionId, { from: this.localPlayerId, to: attackToGuid }, () => {
                //延迟一帧不然技能没回收完
                setTimeout(() => {
                    if (finisFunc) {
                        finisFunc();
                    }

                    this.delayChageState(skillCfg.id);

                    if (this.isHasPlayMotion() == false) {
                        EventManager.instance.call(EWeaponEvent_C.WeaponEvent_TakeWeaponToBack_C, this.localPlayerId);
                    }
                }, 0);
            });

        }, 0);

        return true;
    }

    /**同步玩家释放技能 */
    private sync_invoke_motion(skillCfg: IMotionSkillElement) {
        // 报告给服务器
        if (skillCfg.isClient != null && skillCfg.isClient == false) {
            return
        }

        this.server.net_player_invoke_motion(skillCfg.id, skillCfg.motionId, 0);
    }

    /**
     * 根据动效id只单独播放动效
     */
    public invoke_motion_single(motionId: number, finisFunc: () => void = null) {
        let motionCfg = GameConfig.MotionClip.getElement(motionId);
        if (motionCfg == null) {
            oTraceError("invoke_motion_single motionCfg is null  ", motionId);
            return;
        }

        // 报告给服务器
        this.server.net_player_invoke_motion(0, motionId, 0);

        this.prestoreCallFunc = null;
        // 客户端预表现
        this.process.invokeMotion(0, motionId, { from: this.localPlayerId, to: undefined }, () => {
            if (finisFunc) {
                finisFunc();
            }
        });

    }

    public gm_invoke_motion(motionId: number, finisFunc: () => void = null) {

        this.server.net_player_invoke_motion(0, motionId, 0);

        // 客户端预表现
        this.process.invokeMotion(0, motionId, {
            from: this.localPlayerId,
            to: undefined
        }, finisFunc);
    }

    /**执行蓄力 */
    public async invoke_motion_charge(skillId: number, finisFunc: () => void = null): Promise<boolean> {

        // 报告给服务器
        let skillCfg = GameConfig.MotionSkill.getElement(skillId);
        if (skillCfg.isClient == false) {
            this.server.net_player_invoke_motion_charge(skillCfg.motionId);
        }

        // 客户端预表现
        this.process.invokeMotion_charge(skillCfg.motionId, {
            from: this.localPlayerId,
            to: undefined
        }, finisFunc);

        return true;
    }

    /**
     * 模拟其它对象播放动效
     * @param motionId 动效id
     * @param context 发起方 释放对象
     */
    public net_room_player_invoke_motion(motionId: number, from: number, to: number) {

        let context: ActionContext = {
            from: from,
            to: to
        }

        //if (!SceneUnitUtil.isSceneUnit(context.from)) {

        let motionSkillCfg = MotionUtil.getMotionSkillCfg(motionId)

        if (motionSkillCfg) {
            if (motionSkillCfg.putWeapon) {
                EventManager.instance.call(EWeaponEvent_C.WeaponEvent_TakeWeaponToHand_C, context.from);
            }
        }

        if (noSkillCallBackSet.has(motionId)) {
            EventManager.instance.call(EWeaponEvent_C.WeaponEvent_TakeWeaponToBack_C, context.from, 0);
        }

        this.process.invokeMotion(0, motionId, context, () => {
            setTimeout(() => {
                if (this.isHasPlayMotion(context.from) == false) {
                    EventManager.instance.call(EWeaponEvent_C.WeaponEvent_TakeWeaponToBack_C, context.from);
                }
            }, 0);
        });

    }

    public net_room_player_invoke_motion_charge(motionId: number, context: ActionContext) {
        // if (!SceneUnitUtil.isSceneUnit(context.from)) {
        this.process.invokeMotion_charge(motionId, context);
        return
        // }

    }

    /**中断motion */
    public net_server_abort_motion(sceneID: number) {
        this.process.abortMotion(sceneID)
    }

    /**锁敌 */
    public lock_enemy(motionSkillCfg: IMotionSkillElement) {
        if (Globaldata.isAutoLockEnemy == false) {
            return null;
        }

        if (motionSkillCfg == null) {
            return null;
        }

        if (motionSkillCfg.seekEnemyScope <= 0) {
            return null;
        }

        this._lockUnits.length = 0;

        let playerLoc = PlayerManager.instance.getPlayerLoc();

        this.lock_npc();

        // 玩家在战场才随机其他敌人
        if (this.mArea.curAreaId == EAreaId.Battle) {
            this.lock_player();
        }

        if (this._lockUnits.length == 0) {
            return null;
        }

        if (this._lockUnits.length > 1) {
            this._lockUnits.sort((npc1, npc2) => {

                npc1["disSeq2Player"] = mw.Vector2.squaredDistance(npc1.worldTransform.position, playerLoc);
                npc2["disSeq2Player"] = mw.Vector2.squaredDistance(npc2.worldTransform.position, playerLoc);

                return npc1["disSeq2Player"] - npc2["disSeq2Player"];
            });
        } else {
            this._lockUnits[0]["disSeq2Player"] = mw.Vector2.squaredDistance(this._lockUnits[0].worldTransform.position, playerLoc);
        }


        let near = this._lockUnits[0];
        if (near["disSeq2Player"] <= Math.pow(motionSkillCfg.seekEnemyScope, 2)) {

            let nearPos = near.worldTransform.position;
            let playerPos = this.localPlayer.character.worldTransform.position;

            mw.Vector.subtract(nearPos, playerPos, Globaldata.tmpVector1);
            let rot = Globaldata.tmpVector1.toRotation();
            rot.x = 0;
            rot.y = 0;

            this.localPlayer.character.worldTransform.rotation = rot;

            return near;
        }

        return null;
    }

    //检测npc
    private lock_npc() {

        let areaNpcs = UnitManager.instance.getAllUnit();

        if (areaNpcs == null || areaNpcs.length == 0) {
            return;
        }

        let npcs = areaNpcs.filter((npc) => {
            if (npc.isDead()) return false;

            let modelLoc = npc.getModelLocaction();
            if (modelLoc == null) {
                return false;
            }

            let notInScreen = this.check_inCameraArea(npc.getModelLocaction());

            return notInScreen;
        });

        for (let index = 0; index < npcs.length; index++) {
            const element = npcs[index];
            let npcModel = element.getModel();
            if (npcModel == null) {
                continue;
            }
            this._lockUnits.push(npcModel);
        }

    }

    // 检测玩家
    private lock_player() {
        if (GlobalWorld.worldType == EWorldType.world1) {
            // if (this.mArenas.isPlayerInArenas()) {
            let player = Player.getAllPlayers();
            for (let index = 0; index < player.length; index++) {
                const tmpPlayer = player[index];
                // tserror   获取玩家对象后 ，对象不可靠 注意容错
                if (tmpPlayer.character == null) {
                    continue;
                }
                if (tmpPlayer.character.isReady == false) {
                    continue;
                }
                if (tmpPlayer.character.worldTransform == null) {
                    continue;
                }
                if (tmpPlayer.playerId == this.localPlayerId) continue;

                this._lockUnits.push(tmpPlayer.character);
            }
        }

    }

    private check_inCameraArea(loc: mw.Vector) {
        if (loc == null) {
            return false;
        }
        let resut = mw.InputUtil.projectWorldPositionToWidgetPosition(loc);

        if (resut.result == false) {
            return false;
        }

        let viewSize = mw.WindowUtil.getViewportSize();

        if (resut.screenPosition.x < 0 || resut.screenPosition.y < 0 ||
            resut.screenPosition.x > viewSize.x || resut.screenPosition.y > viewSize.y) {

            return false;
        }
        return true;
    }


    /**是否正在播放motion */
    public isHasPlayMotion(pId: number = this.localPlayerId) {
        return this.process.isHasPlayMotion(pId);
    }
    /**是否正在播放motion 包含回收中，中断 */
    public isHasPlayMotion2(pId: number = this.localPlayerId) {
        return this.process.isHasPlayMotion2(pId);
    }

    /**是否在释放技能时间范围内 */
    public isInReleaseSkillTime() {
        // 0.5 秒
        // 用来处理 玩家 来回切卡职业卡情况，因为释放技能条件有异步
        let time = Date.now() - this.preReleaseSkillTime;
        return time < 500;
    }


    /**延迟切换状态 */
    private delayChageStateKey: any = null;
    public delayChageState(skillId: number) {
        this.clear_delayChageStateKey();
        this.delayChageStateKey = setTimeout(() => {
            this.delayChageStateKey = null;
            //console.error("delayChageState======",skillId,this.isHasPlayMotion()); 
            if (noSkillCallBackSet.has(skillId) == false && this.isHasPlayMotion() == false && this.mPlayer.isDead() == false) {
                EventManager.instance.call(EModule_Events.changetoBaseState, -1)
            }
        }, 10);
    }
    private clear_delayChageStateKey() {
        if (this.delayChageStateKey != null) {
            clearTimeout(this.delayChageStateKey);
            this.delayChageStateKey = null;
        }
    }

    /**玩家离开游戏 */
    private listen_playerLeft(player: mw.Player) {
        let pId = player.playerId;
        AbstractMotion.curPlayerAnimationGuid.delete(pId);
    }


    private stopSprint() {

        if (this.isHasPlayMotion() == false) {
            return;
        }
        if (this.currentMotion == null) {
            return;
        }

        if (this.currentMotion.MotionData.motionId != Globaldata.sprintMotionID) {
            return;
        }

        this.process.abortMotion(this.localPlayerId);
    }


}
