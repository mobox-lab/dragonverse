import { GameConfig } from "../../config/GameConfig";
import { IMotionSkillElement } from "../../config/MotionSkill";
import {
    EMotion_Events,
    EModule_Events,
    EPlayerEvents_C,
    EPlayerFightState,
    EAttributeEvents_C,
    EAreaEvent_C,
    EAreaId,
    EAnalyticsEvents,
} from "../../const/Enum";
import { Globaldata } from "../../const/Globaldata";
import { EventManager } from "../../tool/EventManager";
import { Notice } from "../../tool/Notice";
import { TriggerHelper } from "../../tool/TriggerHelper";
import { updater } from "../../tool/Updater";
import { util } from "../../tool/Utils";
import { MotionModuleC } from "../MotionModule/MotionModuleC";
import { FSMManager } from "./FSM/FSMManager";
import { BattleWorldPlayerModuleData, HitDamageInfo } from "./PlayerModuleData";
import { PlayerModuleS } from "./PlayerModuleS";
import ActionUI from "./UI/ActionUI";
import { DamageDigit, EnumDamageAppearanceType } from "./UI/DamageDigit";
import { MainUI } from "./UI/MainUI";
import { Attribute } from "./sub_attribute/AttributeValueObject";
import EnumAttributeType = Attribute.EnumAttributeType;
import {
    AnalyticsTool,
    ECoreStep,
    EHurtSource,
    EMovementType,
    THurtSourceData,
} from "../AnalyticsModule/AnalyticsTool";
import { PlayerManager } from "./PlayerManager";
import { AttributeModuleC } from "../AttributeModule/AttributeModuleC";
import { EnergyShield_Stun } from "./FSM/PlayerStates/EnergyShield_Stun";
import { State_BeParry } from "./FSM/PlayerStates/State_BeParry";
import { State_Center } from "./FSM/PlayerStates/State_Center";
import { State_ChangeMolde } from "./FSM/PlayerStates/State_ChangeMolde";
import { State_Dead } from "./FSM/PlayerStates/State_Dead";
import { State_Defense } from "./FSM/PlayerStates/State_Defense";
import { State_Idle } from "./FSM/PlayerStates/State_Idle";
import { State_Parry } from "./FSM/PlayerStates/State_Parry";
import { State_Stun } from "./FSM/PlayerStates/State_Stun";
import { State_downAttack } from "./FSM/PlayerStates/State_downAttack";
import { State_jump } from "./FSM/PlayerStates/State_jump";
import { State_run } from "./FSM/PlayerStates/State_run";
import { State_sprint } from "./FSM/PlayerStates/State_sprint";
import { EPlayerState, PlyerState } from "./FSM/PlyerState";
import { ChangeMoldeBuffC } from "../buffModule/Buff/CustomBuff/ChangeMoldeBuff";
import { CameraShakeManger } from "../../tool/CameraShakeManger";
import CameraArmManger from "../../tool/CameraArmManger";
import { State_Skill } from "./FSM/PlayerStates/State_Skill";
import State_Action from "./FSM/PlayerStates/State_Action";
import TriggerLand from "../LandModule/Land/TriggerLand";
import { MainDeadMask } from "./UI/MainDeadMask";
import { CameraManger } from "../../tool/CameraManger";
import { UnitManager } from "../npc/UnitManager";
import { SpiderEffect } from "./UI/SpiderEffect";
import { ERankNoticeType, RankNotice } from "./UI/rank/RankNotice";
import { BuffModuleC } from "../buffModule/BuffModuleC";

/**不执行Motion回调的技能状态MotionID*/
export const noSkillCallBackSet: Set<number> = new Set<number>([
    1, //地面冲刺
    2, //跳跃
    4, //空中冲刺
    5, //空中冲刺
]);

//不能释放技能状态
const NoSkillState: Set<EPlayerState> = new Set([
    //EPlayerState.Center,
    EPlayerState.ChangeMolde,
    EPlayerState.Stun,
    EPlayerState.EnergyShield,
]);

//不能跳跃状态
const NoJumpState: Set<EPlayerState> = new Set([EPlayerState.Stun, EPlayerState.EnergyShield]);

//技能状态
const SkillState: Set<EPlayerState> = new Set([
    // EPlayerState.normalAttack,
    EPlayerState.downAttack,
    // EPlayerState.heavyAttack,
    EPlayerState.sprint,
    EPlayerState.Defense,
    EPlayerState.Parry,
]);

export class PlayerModuleC extends ModuleC<PlayerModuleS, BattleWorldPlayerModuleData> {
    /**当前玩家位置 */
    public static playerLazyLocation: mw.Vector;
    /**所有技能cd key:技能MotionID value:冷却时间*/
    private lastUseMotionTimeStamp: Map<number, number> = new Map();
    /**属性变化 */
    public onAttributeChanged: mw.Action = new mw.Action();
    /**属性变化 */
    public onAttributeInit: mw.Action = new mw.Action();
    /**动画模块*/
    private motionMD: MotionModuleC;
    /**属性模块*/
    private atrributeMD: AttributeModuleC;
    /**buff模块 */
    private mBuff: BuffModuleC = null;

    /**属性字典*/
    private attribute: Attribute.AttributeValueObject;
    /**属性*/
    private playerStashedAttrBuffer = {};
    /**升级特效key */
    private _upgradeLvEffect: any[] = [];

    /**主控*/
    public mainUI: MainUI = null;
    /**技能*/
    public acitonUI: ActionUI = null;

    /**遥杆方向*/
    public v2: mw.Vector = mw.Vector.zero;
    /**监听摇杆输入方法 */
    private onInputDirfunc: any = null;

    /**玩家状态机 */
    public mStateManager: FSMManager;
    /**当前玩家跳跃高度*/
    public jump_distance: number = 0;

    /**防御*/
    private defenseTimer: number = null;
    private isDefensePress: boolean = false;

    /**是否首次变化金币数量 */
    private isFirstChange: boolean = true;

    /**俯冲屏幕特效 */
    public diveEffect: mw.Effect = null;

    /**上局结束的段位分 */
    private _oldRankScore: number = 0;

    /**段位门票刷新标记 */
    public rankTicket: boolean = true;

    onStart() {
        this.motionMD = ModuleService.getModule(MotionModuleC);
        this.atrributeMD = ModuleService.getModule(AttributeModuleC);
        this.mBuff = ModuleService.getModule(BuffModuleC);

        this.localPlayer.character.displayName = "";
        this.localPlayer.character.walkableFloorAngle = Globaldata.playerSlopeAngle;
        this.localPlayer.character.gravityScale = Globaldata.dfgravityScale;

        this.lazyUpdatePlayerPosition();

        this.mainUI = mw.UIService.getUI(MainUI);
        this.mainUI.mVirtualJoystickPanel.controlType = mw.CameraControlType.None;
        this.setMove(true);
        this.acitonUI = mw.UIService.create(ActionUI);

        mw.UIService.show(MainDeadMask);

        this.attribute = new Attribute.AttributeValueObject();

        this.attribute.attributeChangeAC.add((type, curHp) => {
            if (type == EnumAttributeType.state) {
                let state = this.getAttr(EnumAttributeType.state);
                switch (state) {
                    case EPlayerState.None:
                        this.localPlayer.character.movementEnabled = true;
                        this.localPlayer.character.jumpEnabled = true;
                        break;
                    case EPlayerState.Stun:
                        //oTrace("眩晕,===========")
                        this.localPlayer.character.movementEnabled = false;
                        this.localPlayer.character.jumpEnabled = false;
                        break;
                    case EPlayerState.Center:
                        //oTrace("中心汇聚集,===========")
                        this.localPlayer.character.movementEnabled = false;
                        this.localPlayer.character.jumpEnabled = false;
                        break;
                    default:
                        break;
                }
            }
        });

        this.createFSM();

        EventManager.instance.add(EMotion_Events.EventPlayerJump, this.listen_jump.bind(this));
        EventManager.instance.add(EMotion_Events.EventPlayerCanMove, this.listen_playerCanMove.bind(this, true));
        EventManager.instance.add(EMotion_Events.EventPlayerCanNotMove, this.listen_playerCanMove.bind(this, false));
        EventManager.instance.add(EMotion_Events.onDefensePressed, this.listen_onDefensePressed.bind(this));
        EventManager.instance.add(EMotion_Events.onDefenseRelease, this.listen_onDefenseRelease.bind(this));
        EventManager.instance.add(EMotion_Events.sprint, this.listen_sprit.bind(this));
        EventManager.instance.add(EMotion_Events.sprintSpeed, this.listen_spriteSpeed.bind(this));
        EventManager.instance.add(EModule_Events.ui_openMainView, this.listen_openMainView.bind(this));
        EventManager.instance.add(EModule_Events.add_money, this.listen_add_money.bind(this));
        EventManager.instance.add(EModule_Events.sub_money, this.listen_Reduce_Money.bind(this));
        EventManager.instance.add(EModule_Events.hurtPlayer, this.listen_Sub_Hp.bind(this));
        EventManager.instance.add(EPlayerEvents_C.player_setMovement_c, this.listen_setMovement, this);
        EventManager.instance.add(EPlayerEvents_C.player_syncPlayerName_c, this.listen_playerJoin, this);
        EventManager.instance.add(EPlayerEvents_C.player_beAttack_clientNpc_c, this.listen_beAttackClientNpc, this);
        EventManager.instance.add(EPlayerEvents_C.player_syncPlayerid_c, this.listen_playerJoin, this);
        EventManager.instance.add(EModule_Events.changetoBaseState, this.listen_changetoBaseStae.bind(this));
        EventManager.instance.add(EModule_Events.changeState, this.changeState.bind(this));
        EventManager.instance.add(EAttributeEvents_C.Attribute_Money_Change_C, this.listen_money_change, this);
        EventManager.instance.add(EPlayerEvents_C.Player_ChangePlayerState, this.listen_changePlayerState, this);

        Player.onPlayerLeave.add(this.listen_onplayerLeft.bind(this));

        CameraArmManger.instance.init();

        this.init_effect();
    }

    private async init_effect() {
        if (this.diveEffect == null) {
            // this.diveEffect = await mw.GameObject.asyncSpawn("146322") as mw.Effect;
            // this.diveEffect.parent = mw.Camera.currentCamera;
            // this.diveEffect.localTransform.position = new mw.Vector(50, 0, 50);
            // this.diveEffect.localTransform.rotation = new mw.Rotation(0, 0, 90);
            // this.diveEffect.setVisibility(false);
        }
    }

    onEnterScene(sceneType: number): void {
        //注册玩家Trigger
        Player.getAllPlayers().forEach((player) => {
            if (player == this.localPlayer) return;
            TriggerHelper.setTentativeArea(player.playerId, player.character);
        });

        Player.onPlayerLeave.add((player: mw.Player) => {
            TriggerHelper.deleteTentativeArea(player.playerId);
        });

        this._oldRankScore = this.getAttr(Attribute.EnumAttributeType.rankScore);
    }

    onUpdate(dt: number) {
        DamageDigit.update();
        this.mStateManager.update(dt);
        this.updateJumpHight();
        this.defenseUpdate(dt);
        this.updateRecover(dt);
        PlayerManager.instance.update(dt);
    }

    /**
     * 监听玩家状态修改
     * @param state
     */
    private listen_changePlayerState(state: EPlayerState) {
        this.server.net_changeFSMState(state);
    }

    /**
     * 玩家金币数量发生变化
     * @param value 当前值
     * @param oldValue 旧的值
     */
    private listen_money_change(value: number, oldValue: number) {
        if (this.isFirstChange) {
            this.isFirstChange = false;
            oldValue = this.data.getAttrValue(Attribute.EnumAttributeType.money);
        }

        let addValue = value - oldValue;
        if (addValue > 0) {
            addValue = Math.abs(addValue);
            let msg = util.getLanguageById("SkillSelect_2", [addValue]);
            Notice.showDownNotice(msg);
        } else {
            addValue = Math.abs(addValue);
            let msg = util.getLanguageById("WeaponTip_3", [addValue]);
            Notice.showDownNotice(msg);
        }
    }

    /**监听其它玩家进入游戏 */
    public listen_playerJoin(pId: number, name: string, lv: number) {
        let player = Player.getPlayer(pId);
        if (player && player.character) {
            TriggerHelper.setTentativeArea(pId, player.character);
        }
    }

    /**玩家离开*/
    private listen_onplayerLeft(player: mw.Player) {
        if (player == null) {
            return;
        }
        let playerID = player.playerId;
        if (playerID == null || playerID == undefined) {
            return;
        }
        PlayerManager.instance.removePlayer(playerID);
    }

    /**玩家被单端npc攻击 */
    private listen_beAttackClientNpc(attkerid: number, beAttackpId: number, motionEffectId: number) {}

    /**
     * 控制玩家移动
     */
    private listen_setMovement(move: boolean, jump: boolean) {
        if (move) {
            let curHp = this.getAttr(Attribute.EnumAttributeType.hp);

            if (curHp > 0 && this.mBuff.isHasLockBuff() == false) {
                this.localPlayer.character.movementEnabled = true;
            }
        } else {
            this.localPlayer.character.movementEnabled = false;
        }

        if (jump) {
            let curHp = this.getAttr(Attribute.EnumAttributeType.hp);
            if (curHp > 0 && this.mBuff.isHasLockBuff() == false) {
                this.localPlayer.character.jumpEnabled = true;
            }
        } else {
            this.localPlayer.character.jumpEnabled = false;
        }
    }

    /**主控界面控制 */
    private listen_openMainView(open: boolean) {
        if (this.mainUI == null) return;

        if (open) {
            mw.UIService.showUI(this.mainUI);
            mw.UIService.showUI(this.acitonUI);
        } else {
            mw.UIService.hideUI(this.mainUI);
            mw.UIService.hideUI(this.acitonUI);
        }
    }

    private listen_add_money(value: number) {
        this.server.net_addPlayerAttr(Attribute.EnumAttributeType.money, value);
    }

    private listen_Reduce_Money(value: number) {
        this.reduceAttr(Attribute.EnumAttributeType.money, value);
    }

    private listen_Sub_Hp(value: number) {
        let hp = this.getAttr(Attribute.EnumAttributeType.hp);
        if (hp <= 0) {
            return;
        }
        this.server.net_reducePlayerAttr(Attribute.EnumAttributeType.hp, value);
    }

    /**设置玩家移动输入 */
    public setMove(isMove: boolean) {
        if (isMove) {
            this.onInputDirfunc = this.onInputDir.bind(this);
            this.mainUI.mVirtualJoystickPanel.onInputDir.add(this.onInputDir.bind(this));
        } else {
            if (this.onInputDirfunc) {
                this.mainUI.mVirtualJoystickPanel.onInputDir.remove(this.onInputDirfunc);
                this.onInputDirfunc = null;
            }
            if (this.v2 == null) {
                this.v2 = mw.Vector.zero;
            } else {
                this.v2.x = 0;
                this.v2.y = 0;
                this.v2.z = 0;
            }
        }
    }
    /**
     * 监听摇杆输入
     */
    private onInputDir(v2: mw.Vector2) {
        // 这里不要直接修改v2 其它模块还要使用
        this.v2.y = v2.x; // MathUtil.clamp(v2.x, -0.8, 0.8);
        this.v2.x = v2.y; //MathUtil.clamp(v2.y, -0.8, 0.8);
        this.v2.z = 0;
        //this.v2 = v2;

        this.localPlayer.character.addMovement(this.v2);
        EventManager.instance.call(EModule_Events.player_move, this.v2);
    }

    /**刷新玩家高度 */
    public updateJumpHight() {
        if (this.localPlayer.character.isJumping) {
            let playerLoc = PlayerManager.instance.getPlayerLoc(this.localPlayerId);
            if (playerLoc == null) {
                return;
            }

            Globaldata.tmpVector.x = 0;
            Globaldata.tmpVector.y = 0;
            Globaldata.tmpVector.z = -10000;

            mw.Vector.add(playerLoc, Globaldata.tmpVector, Globaldata.tmpVector);

            let hitResults = QueryUtil.lineTrace(
                playerLoc,
                Globaldata.tmpVector,
                false,
                false,
                [],
                false,
                false,
                this.localPlayer.character
            );

            if (hitResults && hitResults.length > 0) {
                this.jump_distance = hitResults[0].distance - this.localPlayer.character.collisionExtent.z;
            }
        } else {
            this.jump_distance = 0;
        }
    }

    /**属性相关------------------------------------------------------------------------------------------------------------------------------ */

    /**
     * 设置玩家属性（单个）
     * @param type
     * @param value
     */
    public setAttr(type: Attribute.EnumAttributeType, value: number, isasync: boolean = true) {
        if (isasync) {
            this.server.net_setPlayerAttr(type, value);
        } else {
            this.attribute.setAttribute(Number(type), value);
            this.onAttributeChanged.call(type);
        }
    }
    /**
     * 增加玩家属性（单个）
     */
    public addAttr(type: Attribute.EnumAttributeType, value: number, isasync: boolean = true) {
        if (isasync) {
            this.server.net_addPlayerAttr(type, value);
        } else {
            if (type == Attribute.EnumAttributeType.hp) {
                let curHp = this.getAttr(Attribute.EnumAttributeType.hp);
                let maxHp = this.getAttr(Attribute.EnumAttributeType.maxHp);
                if (curHp >= maxHp) {
                    //this.net_stop_recover_Hp(EPlayerFightState.none, false);
                    return;
                }
                value = Math.min(maxHp - curHp, value);
            }

            if (type == Attribute.EnumAttributeType.energy) {
                let curHp = this.getAttr(Attribute.EnumAttributeType.energy);
                let maxHp = this.getAttr(Attribute.EnumAttributeType.maxEnergy);
                if (curHp >= maxHp) {
                    this.net_stop_recover_Energy();
                    return;
                }
                value = Math.min(maxHp - curHp, value);
            }

            this.attribute.addValue(type, value);
            this.onAttributeChanged.call(type);
        }
    }
    /**
     *减少玩家属性（单个）
     */
    public reduceAttr(
        type: Attribute.EnumAttributeType,
        value: number,
        isasync: boolean = true,
        sceneID?: number,
        hurtSourceData: THurtSourceData = null
    ) {
        if (isasync) {
            this.server.net_reducePlayerAttr(type, value, sceneID, hurtSourceData);
        } else {
            if (type == Attribute.EnumAttributeType.energy) {
                this.net_stop_recover_Energy();
            }
            this.attribute.reduceValue(type, value);
            this.onAttributeChanged.call(type);
        }
    }
    /**
     *增加玩家属性（多个）
     */
    public addAttrByArray(attrArray: Attribute.AttributeArray) {
        this.server.net_addPlayerAttrByArray(attrArray);
    }
    /**
     *减少玩家属性（多个）
     */
    public reduceAttrByArray(attrArray: Attribute.AttributeArray) {
        this.server.net_reducePlayerAttrByArray(attrArray);
    }
    /**
     * 获取玩家属性
     * @param type
     * @returns
     */
    public getAttr(type: Attribute.EnumAttributeType, isAdd: boolean = true): number {
        if (Attribute.IsStashAttribute(type)) return this.data.getAttrValue(type) || 0;

        if (type >= 100) {
            //Globaldata.addAttribueTypeVale
            //console.error("加成类型-",type)
            return this.attribute.getValue(type);
        }

        if (isAdd) {
            //加成类型
            let t_addType = type + 100; //Globaldata.addAttribueTypeVale
            let t_MultipleType = type + 200; //Globaldata.multiplyAttribueTypeVale

            //没有加成类型的属性   hp  state
            if (t_addType in EnumAttributeType == false || t_MultipleType in EnumAttributeType == false) {
                //console.error("没有加成类型的属性-",type)
                return this.attribute.getValue(type);
            } else {
                let t_normalValue = this.attribute.getValue(type);
                let t_addValue = this.attribute.getValue(t_addType);
                let t_MultipleValue = this.attribute.getValue(t_MultipleType);
                //let t_finalValue = t_normalValue * (1 + t_MultipleValue / 100) + t_addValue;
                let t_finalValue = t_normalValue + t_addValue;
                if (type == Attribute.EnumAttributeType.speed) {
                    t_finalValue = t_finalValue * (1 + t_MultipleValue / 100);
                }

                //oTrace(`加成类型${type}属性: ${t_finalValue},${t_normalValue},${t_addValue},${t_MultipleValue}`);
                return t_finalValue;
            }
        } else {
            //console.error("一般属性类型-",type)
            return this.attribute.getValue(type);
        }
    }

    /**
     * 接收玩家属性初始化
     * @param attrArray
     */
    public net_init_attr(attrArray: Attribute.AttributeArray, isinit: boolean) {
        //oTrace("net_init_attr_____________", attrArray)

        let maxEnergy1 = this.getAttr(Attribute.EnumAttributeType.maxEnergy);

        for (let type in attrArray) {
            if (!isinit && Number(type) == Attribute.EnumAttributeType.energy) {
                continue;
            }
            let val = attrArray[type];
            this.attribute.setAttribute(Number(type), val);
            // if (AttrName[type]) oTraceError(`玩家${AttrName[type]}: ${val}`);
        }

        if (isinit == false) {
            let maxEnergy2 = this.getAttr(Attribute.EnumAttributeType.maxEnergy);
            let endEnergy = maxEnergy2 - maxEnergy1;
            if (endEnergy > 0) {
                let curEnergy = this.getAttr(Attribute.EnumAttributeType.energy);
                curEnergy += endEnergy;
                let perEnergy = curEnergy / maxEnergy2;
                this.setAttr(Attribute.EnumAttributeType.energy, curEnergy, false);
                this.mainUI.refresh_curMagicPer(perEnergy);
            }
        }

        this.onAttributeInit.call();
        this.attribute.log();
    }

    /**
     * 玩家属性变更
     * @param type
     * @param value
     */
    public net_change_attr(type: Attribute.EnumAttributeType, value: number) {
        // oTrace("net_change_attr_________________________________", type, value)
        let percent = this.getEnergypercent(type);
        this.attribute.setAttribute(type, value);
        if (percent != null) {
            this.recalculateEnergy(type, percent);
        }
        this.onAttributeChanged.call(type);
        this.attribute.log();
    }

    /**
     * 重新计算玩家属性加点
     */
    public recalculateAttr(attrArray: Attribute.AttributeArray, isAdd: boolean) {
        this.server.net_recalculateAttr(attrArray, isAdd);
    }

    /**
     * 获取玩家能量百分比
     * @param type
     * @param value
     * @returns
     */
    public getEnergypercent(type: Attribute.EnumAttributeType): number {
        if (!Attribute.IsrEnergyAttribute(Number(type))) {
            return;
        }
        let maxEnergy = this.getAttr(Attribute.EnumAttributeType.maxEnergy);
        let energy = this.getAttr(Attribute.EnumAttributeType.energy);
        if (maxEnergy && energy) {
            return energy / maxEnergy;
        } else {
            return null;
        }
    }

    /**
     * 重新计算玩家能量
     * @param hp
     * @param energy
     */
    public recalculateEnergy(type: Attribute.EnumAttributeType, pecent: number) {
        if (!Attribute.IsrEnergyAttribute(Number(type))) {
            return;
        }
        let maxEnergy = this.getAttr(Attribute.EnumAttributeType.maxEnergy);
        let energy = maxEnergy * pecent;
        this.attribute.setAttribute(Attribute.EnumAttributeType.energy, energy);
    }

    public net_showAtkValue(msg: string) {
        this.mainUI.mAttackNum.text = msg;
    }

    /**状态机&&技能------------------------------------------------------------------------------------------------------------------------------ */
    /**
     * 注册状态机
     */
    protected async createFSM() {
        this.mStateManager = new FSMManager();
        this.mStateManager.register(EPlayerState.Idle, new State_Idle());
        this.mStateManager.register(EPlayerState.downAttack, new State_downAttack());
        this.mStateManager.register(EPlayerState.Skill, new State_Skill());
        this.mStateManager.register(EPlayerState.Action, new State_Action());
        this.mStateManager.register(EPlayerState.jump, new State_jump());
        this.mStateManager.register(EPlayerState.sprint, new State_sprint());
        this.mStateManager.register(EPlayerState.Dead, new State_Dead());
        this.mStateManager.register(EPlayerState.Defense, new State_Defense());
        this.mStateManager.register(EPlayerState.Parry, new State_Parry());
        this.mStateManager.register(EPlayerState.run, new State_run());
        this.mStateManager.register(EPlayerState.BeParry, new State_BeParry());
        this.mStateManager.register(EPlayerState.ChangeMolde, new State_ChangeMolde());
        this.mStateManager.register(EPlayerState.Center, new State_Center());
        this.mStateManager.register(EPlayerState.Stun, new State_Stun());
        this.mStateManager.register(EPlayerState.EnergyShield, new EnergyShield_Stun());
        this.changeState(EPlayerState.Idle);
    }

    /**
     * 改变状态
     * @param state 状态
     * @param paramEniter 进入参数
     * @param paramExit 退出参数
     */
    public changeState(state: EPlayerState, paramEniter?: any, paramExit?: any): void {
        if (this.isSkillState(state)) {
            if (this.isCanSkill()) {
                if (this.mStateManager) {
                    this.mStateManager.changeState(state, paramEniter, paramExit);
                }
            } else {
                //oTrace("当前状态" + this.mStateManager.currentStateType + "不能切换到技能", state)
                return;
            }
        } else {
            if (state == EPlayerState.jump) {
                if (this.isCanJump()) {
                    if (this.mStateManager) {
                        this.mStateManager.changeState(state, paramEniter, paramExit);
                    }
                } else {
                    //oTrace("当前状态" + this.mStateManager.currentStateType + "不能切换到跳跃", state)
                    return;
                }
            } else {
                if (this.mStateManager) {
                    this.mStateManager.changeState(state, paramEniter, paramExit);
                }
            }
        }
    }

    /**能否切换*/
    public canEnterFSMState(type: EPlayerState) {
        return this.mStateManager.canEnterState(type);
    }
    /**能否退出*/
    public canExitFSMState(type: EPlayerState) {
        return this.mStateManager.canEixtState(type);
    }

    /**能否放技能 */
    public isCanSkill() {
        return !NoSkillState.has(this.mStateManager.currentStateType);
    }
    public isCanJump() {
        return !NoJumpState.has(this.mStateManager.currentStateType);
    }
    /**技能 */
    public isSkillState(state: EPlayerState) {
        return SkillState.has(state);
    }

    /**
     * 攻击-普通&&下落
     */
    public attack() {
        if (this.isDead()) {
            return;
        }

        if (this.motionMD.isHasPlayMotion()) {
            return;
        }

        if (this.jump_distance > Globaldata.fallAttackHeight) {
            this.changeState(EPlayerState.downAttack);
        }
    }
    /**
     * 跳跃(weaponSkill后事件执行)
     * @returns
     */
    public listen_jump() {
        let currentStateType = this.mStateManager.currentStateType;

        if (currentStateType == EPlayerState.ChangeMolde) {
            EventManager.instance.call(ChangeMoldeBuffC.State_ChangeMolde_onCheck);
            return;
        }
        if (this.mBuff.isHasLockBuff()) {
            return;
        }

        if (currentStateType) {
            this.changeState(EPlayerState.jump, currentStateType);
        } else {
            this.changeState(EPlayerState.jump, null);
        }
    }

    public listen_playerCanMove(canMove: boolean) {
        if (canMove) {
            this.localPlayer.character.movementEnabled = true;
        } else {
            this.localPlayer.character.movementEnabled = false;
        }
    }
    /**
     * 技能todo
     * @param id
     */
    public async weaponSkill(
        skillCfg: IMotionSkillElement,
        release: boolean,
        charge: boolean = false
    ): Promise<boolean> {
        if (this.mStateManager.currentStateType == EPlayerState.downAttack) {
            return false;
        }

        //特殊技能状态
        if (noSkillCallBackSet.has(skillCfg.id) == false) {
            this.changeState(EPlayerState.Skill);
        }

        let result = false;

        if (release) {
            if (charge == false) {
                result = await this.motionMD.invoke_motion(skillCfg.id, () => {});
            } else {
                result = await this.motionMD.invoke_motion_charge(skillCfg.id, () => {
                    this.changeState(EPlayerState.Idle);
                });
            }
        } else {
            result = await this.motionMD.invoke_motion(skillCfg.id, () => {});
        }

        // 释放成功才记录
        if (result) {
            // 普攻不算技能，临时写死，TODO 配到技能表，标记技能是否为普攻还是技能
            if (skillCfg && skillCfg.id > 13 && skillCfg.magicPoints > 0) {
                // 埋点 核心循环步骤
                EventManager.instance.call(EAnalyticsEvents.coreStep, ECoreStep.useSkill);
            }

            this.registerMotionUsed(skillCfg.motionId);
        }

        return result;
    }

    /**
     * 冲刺
     */
    private listen_sprit() {
        if (TriggerLand.isPlayerInSpeedTriggerLand) {
            return false;
        }

        if (this.mStateManager.currentStateType == EPlayerState.downAttack) {
            return false;
        }

        if (this.motionMD.isHasPlayMotion()) {
            return;
        }

        if (this.check_sprint_energy() == false) {
            return;
        }

        if (this.mBuff.isHasLockBuff()) {
            return;
        }

        this.changeState(EPlayerState.sprint);
    }
    /**
     * 冲刺-加速
     */
    private listen_spriteSpeed() {
        if (TriggerLand.isPlayerInSpeedTriggerLand) {
            return false;
        }

        if (this.mStateManager.currentStateType == EPlayerState.downAttack) {
            return false;
        }

        if (this.motionMD.isHasPlayMotion()) {
            return;
        }

        if (this.mBuff.isHasLockBuff()) {
            return;
        }

        if (Player.localPlayer.character.isMoving) {
            if (this.check_sprint_energy() == false) {
                return;
            }

            this.changeState(EPlayerState.sprint, true);
        } else {
            if (this.check_sprint_energy() == false) {
                return;
            }
            this.changeState(EPlayerState.sprint);
        }
    }
    /**
     * 检测冲刺能量
     */
    private check_sprint_energy() {
        let skillCfg = GameConfig.MotionSkill.getElement(Globaldata.sprintMotionID);

        let curEnergy = this.getAttr(Attribute.EnumAttributeType.energy);
        let needEnergy = skillCfg.magicPoints;

        if (curEnergy < needEnergy) {
            Notice.showDownNotice(util.getLanguageByKey("Text_MainUI_2"));
            return false;
        }
        return true;
    }

    /**
     * 防御-按下
     * @returns
     */
    private listen_onDefensePressed() {
        if (this.mStateManager.currentStateType == EPlayerState.downAttack) {
            return false;
        }

        this.defenseTimer = 0;
        this.isDefensePress = false;
    }
    /**
     * 防御-释放
     * @returns
     */
    private listen_onDefenseRelease() {
        if (this.mStateManager.currentStateType == EPlayerState.downAttack) {
            return false;
        }
        this.defenseTimer = null;
        if (!this.isDefensePress && util.ParryBoolean.canParry) {
            if (this.motionMD.isHasPlayMotion()) return;

            this.changeState(EPlayerState.Parry);
            this.server.net_StartParry();
            this.isDefensePress = true;
        }
        if (this.mStateManager.currentStateType == EPlayerState.Defense) {
            this.mStateManager.eixtState(EPlayerState.Defense);
            this.server.net_OverDefense();
        }
    }
    /**
     * 防御-更新
     * @returns
     */
    private defenseUpdate(dt: number) {
        if (this.defenseTimer == null || this.isDefensePress) return;
        this.defenseTimer += dt;
        if (this.defenseTimer > Globaldata.defenseLongPressTime) {
            this.changeState(EPlayerState.Defense);
            this.server.net_StartDefense();
            this.defenseTimer = null;
            this.isDefensePress = true;
        }
    }
    /**
     * 弹反成功表现
     */
    net_ParrySucc(propId: number) {
        util.ParryBoolean.isParrySucc = true;
        CameraShakeManger.instance.customTimeAndCamera(propId);
    }
    /**
     * 玩家被弹反
     */
    public net_BeParry() {
        if (this.isDead()) {
            return;
        }
        this.changeState(EPlayerState.BeParry);
    }
    /**
     * 防御成功
     */
    net_DefenseSucc() {
        util.ParryBoolean.isDefenseSucc = true;
    }

    /**
     * 刷新基本状态
     */
    public updateBaseState() {
        if (this.localPlayer.character.isJumping) {
            PlyerState.dfaultState = EPlayerState.jump;
        } else {
            let ve = this.localPlayer.character.velocity;
            let speed = ve.length;
            if (speed <= 0) {
                if (this.v2.x != 0 || this.v2.y != 0) {
                    PlyerState.dfaultState = EPlayerState.run;
                } else {
                    PlyerState.dfaultState = EPlayerState.Idle;
                }
            } else {
                PlyerState.dfaultState = EPlayerState.run;
            }
        }
    }

    /**
     * 切换到基本状态
     */
    public listen_changetoBaseStae(param: any = null) {
        this.updateBaseState();
        let currentStateType = this.mStateManager.currentStateType;
        if (currentStateType == PlyerState.dfaultState) {
            return;
        }
        this.changeState(PlyerState.dfaultState, param);
    }

    /**能量恢复----------------------------------------------------------------------------------------------------------------------------- */
    /**玩家战斗状态 */
    private state: EPlayerFightState = EPlayerFightState.none;
    /**记录减少后的能量值 */
    private preEnergy: number = 0;
    /**次数*/
    private count: number = 0;
    /**恢复能量中*/
    private isRecoverEnergy: boolean = false;
    /**开始恢复能量key */
    private recover_Energy_interval: any = null;
    /*恢复能量检测*/
    private updateRecover(dt: number) {
        if (this.getAttr(Attribute.EnumAttributeType.energy) > this.getAttr(Attribute.EnumAttributeType.maxEnergy)) {
            this.setAttr(
                Attribute.EnumAttributeType.energy,
                this.getAttr(Attribute.EnumAttributeType.maxEnergy),
                false
            );
            this.net_stop_recover_Energy();
            return;
        }

        if (this.getAttr(Attribute.EnumAttributeType.hp) <= 0) {
            this.net_stop_recover_Energy();
            this.net_change_attr(Attribute.EnumAttributeType.energy, 0);
            return;
        }

        if (this.isRecoverEnergy) {
            return;
        }
        if (this.preEnergy == this.getAttr(Attribute.EnumAttributeType.energy)) {
            this.count += dt;
            if (this.count >= Globaldata.energyDelayRecoverTime) {
                this.startrecovyEnergy();
                this.count = 0;
            }
        } else {
            this.count = 0;
        }

        this.preEnergy = this.getAttr(Attribute.EnumAttributeType.energy);
    }
    /**每秒恢复能量检测*/
    private startrecovyEnergy() {
        if (this.isRecoverEnergy) {
            return;
        }

        let maxEnergy = this.getAttr(Attribute.EnumAttributeType.maxEnergy);
        let energy = this.getAttr(Attribute.EnumAttributeType.energy);

        if (energy >= maxEnergy) {
            this.net_stop_recover_Energy();
            return;
        }

        let addValue = this.getAddEnergy();

        // 战斗状态减半
        if (this.state == EPlayerFightState.fight || this.state == EPlayerFightState.beHurt) {
            this.net_start_recover_Energy(0.5, addValue);
        } else if (this.state == EPlayerFightState.normal || this.state == EPlayerFightState.none) {
            this.net_start_recover_Energy(0.2, addValue);
        }

        if (energy + addValue >= maxEnergy) {
            addValue = maxEnergy - energy;
        }
    }
    /**
     * 获取加能量
     * @param playerID
     */
    private getAddEnergy(): number {
        let leveladd: number = 0;

        if (this.state == EPlayerFightState.fight || this.state == EPlayerFightState.beHurt) {
            leveladd = Globaldata.energyRecover * Globaldata.energyRecoverfightRate;
        } else if (this.state == EPlayerFightState.normal || this.state == EPlayerFightState.none) {
            leveladd = Globaldata.energyRecover;
        }
        return leveladd;
    }
    /**
     * 恢复能量
     * @param interval 恢复间隔 秒 0.2 、0.5
     */
    public net_start_recover_Energy(interval: number, value: number) {
        this.net_stop_recover_Energy();
        this.recover_Energy_interval = TimeUtil.setInterval(() => {
            this.addAttr(Attribute.EnumAttributeType.energy, value, false);
        }, interval);

        this.isRecoverEnergy = true;
    }
    /**
     * 停止恢复能量
     */
    public net_stop_recover_Energy() {
        if (this.recover_Energy_interval) {
            TimeUtil.clearInterval(this.recover_Energy_interval);
            this.recover_Energy_interval = null;
            this.isRecoverEnergy = false;
        }
    }
    //检查玩家能量是否足够
    checkEnergyEnough(useEnergy: number): boolean {
        let energy = this.getAttr(Attribute.EnumAttributeType.energy);
        return energy >= useEnergy;
    }

    /**修改玩家状态*/
    public net_changePlayerState(state: EPlayerFightState) {
        this.state = state;
        this.isRecoverEnergy = false;
        this.startrecovyEnergy();
    }

    /**伤害飘字---------------------------------------------------------------------------------------------------------------------------- */

    /**
     * 同步怪物玩家伤害飘字
     * @param hitIds
     * @param damages
     */
    public async scene_unit_injured(hitIds: number[], damages: HitDamageInfo[], offect: Vector = Vector.zero) {
        // 只要飘字玩家就进入战斗 蓝不考虑
        // this.data.changeFightStatus(true);

        for (let i = 0; i < hitIds.length; i++) {
            let hitId = hitIds[i];

            let hitLocation = null;
            if (hitId > 0) {
                let player = await Player.asyncGetPlayer(hitId);
                hitLocation = player == null ? null : player.character.worldTransform.position.clone().add(offect);
            } else {
                EventManager.instance.call(EModule_Events.playerHitNpc);
                let unit = UnitManager.instance.getUnit(hitId);
                if (unit == null) {
                    return;
                }
                hitLocation = unit.getModelLocaction();
            }

            if (hitLocation == null) {
                continue;
            }

            // 增加伤害随机偏移
            let randomX = (Math.random() - 0.5) * 30;
            let randomY = (Math.random() - 0.5) * 30;
            let randomZ = (Math.random() - 0.5) * 30;
            let worldPos = new mw.Vector(hitLocation.x + randomX, hitLocation.y + randomY, hitLocation.z + randomZ);

            let damage = damages[i];

            // 这个没必要加把
            //if (damage.from == null || damage.from == undefined) continue // 服务器判定的无效伤害

            damage.value = Math.round(damage.value);
            let msg: string = null;
            let addHp: boolean = false;
            if (damage.value < 0) {
                msg = `+${Math.abs(damage.value)}`;
                addHp = true;
            } else {
                msg = `-${damage.value}`;
            }

            if (damage.target == this.localPlayerId) {
                DamageDigit.showDamage(worldPos, msg, EnumDamageAppearanceType.player, addHp);
            } else {
                DamageDigit.showDamage(worldPos, msg);
            }

            if (damage.soundId) {
                // 播放命中音效
                util.playSoundByConfig(damage.soundId, worldPos);
            }
            if (damage.effectId) {
                // 播放命中特效
                util.playEffectAtLocation(damage.effectId, worldPos);
            }
        }
    }

    /**
     * 服务器返回伤害飘字
     */
    net_receive_scene_unit_injured(hitIds: number[], damages: HitDamageInfo[]) {
        this.scene_unit_injured(hitIds, damages);
    }

    /**玩家死亡&&复活&&受伤------------------------------------------------------------------------------------------------------------------ */

    /**玩家死亡 */
    public async net_playerDead(dead: number, npcId: number, rankScore: number) {
        this.net_stop_recover_Energy();
        this.net_change_attr(Attribute.EnumAttributeType.energy, 0);
        this.net_change_attr(Attribute.EnumAttributeType.hp, 0);

        this.mainUI.setJoystickDisable(true);

        //本次段位分变化
        let score = rankScore - this._oldRankScore;
        this._oldRankScore = rankScore;
        this.rankTicket = true;

        this.changeState(EPlayerState.Dead, [dead, npcId, score]);
        EventManager.instance.call(EPlayerEvents_C.Player_ChangeDeadState_C);
        EventManager.instance.call(EModule_Events.land_pickUp_pill, -1);

        // 埋点：核心循环结束
        EventManager.instance.call(EAnalyticsEvents.coreStepEnd);

        // 玩家死亡动作
        if (AssetUtil.assetLoaded(Globaldata.player_deadAnim) == false) {
            await AssetUtil.assetLoaded(Globaldata.player_deadAnim);
        }
        let deadAnim = this.localPlayer.character.loadAnimation(Globaldata.player_deadAnim);
        if (deadAnim) {
            deadAnim.play();
        }

        // let gasExplosion = this.atrributeMD.getAttributeValue(Attribute.EnumAttributeType.gasExplosion);
        // if (gasExplosion == 1) {
        //     return;
        // }
        //ToDO  服务器设置后 为啥不会同步 需要排查下
        //EventManager.instance.call(EAttributeEvents_C.Attribute_SetAttribute_C,Attribute.EnumAttributeType.gasExplosion, 0, this.localPlayerId, true);
    }

    public async net_otherPlayerDead(deadPlayerId: number) {
        // 玩家死亡动作
        if (AssetUtil.assetLoaded(Globaldata.player_deadAnim) == false) {
            await AssetUtil.assetLoaded(Globaldata.player_deadAnim);
        }
        let deadPlayer = mw.Player.getPlayer(deadPlayerId);
        if (deadPlayer == null) {
            return;
        }
        if (deadPlayer.character == null) {
            return;
        }
        let deadAnim = deadPlayer.character.loadAnimation(Globaldata.player_deadAnim);
        if (deadAnim) {
            deadAnim.play();
        }
    }

    /**玩家复活 */
    public net_Resurgence(sceneID: number) {
        //先本地设置防止Update蓝量问题
        this.attribute.setAttribute(Attribute.EnumAttributeType.hp, this.getAttr(Attribute.EnumAttributeType.maxHp));
        this.attribute.setAttribute(
            Attribute.EnumAttributeType.energy,
            this.getAttr(Attribute.EnumAttributeType.maxEnergy)
        );
        this.onAttributeChanged.call(Attribute.EnumAttributeType.energy);

        this.mainUI.setJoystickDisable(false);

        this.listen_changetoBaseStae(-1);

        EventManager.instance.call(EAreaEvent_C.area_transmit, EAreaId.Safe);
    }

    /**玩家首次复活 */
    public net_playerFirstResurgence() {
        EventManager.instance.call(EModule_Events.playerFirstResurgence);
    }

    /**玩家是否死亡 */
    public isDead() {
        return this.attribute.getValue(Attribute.EnumAttributeType.hp) <= 0;
    }

    /**玩家是否死亡 */
    public isPlayerDead(pId: number = this.localPlayerId) {
        let curHp = this.atrributeMD.getAttributeValue(EnumAttributeType.hp, pId);
        return curHp <= 0;
    }

    /**吸血*/
    public drainLifeHp(atkVal: number) {
        this.server.net_drainLifeHp(atkVal);
    }

    /**
     * 获取上次使用motion的时间戳(ms)
     * @param motionID
     * @returns
     */
    public getRegisteredMotionLastUseTime(motionId: number): number {
        if (!this.lastUseMotionTimeStamp.has(motionId)) return 0;
        return this.lastUseMotionTimeStamp.get(motionId);
    }

    /**注册motionid释放时间 */
    public registerMotionUsed(motionId: number) {
        this.lastUseMotionTimeStamp.set(motionId, Date.now());
    }

    public clearMotionUsed(motionId: number) {
        this.lastUseMotionTimeStamp.set(motionId, 0);
    }

    /**
     * 玩家位置
     */
    @updater.updateByFrameInterval(20)
    private lazyUpdatePlayerPosition() {
        PlayerModuleC.playerLazyLocation = this.localPlayer.character.worldTransform.position.clone();
    }

    /**开始俯冲动画 */
    public net_startDive() {
        Globaldata.defaultCamerFov = mw.Camera.currentCamera.fov;

        if (this.diveEffect) {
            this.diveEffect.setVisibility(true);
        }
        UIService.show(SpiderEffect);
        CameraManger.instance.playCameraFovTween(Globaldata.diveFovTarget, Globaldata.diveFovTweenTime);
    }

    /**关闭俯冲动画 */
    public net_closeDive() {
        if (this.diveEffect) {
            this.diveEffect.setVisibility(false);
        }

        // 显示UI动画
        UIService.hide(SpiderEffect);

        CameraManger.instance.stopCameraFovTween();

        // 埋点
        AnalyticsTool.send_ts_action_do(EMovementType.enterBattle);

        // 客户端纠正下玩家旋转，之前有个延迟导致服务器修改旋转无效问题，这里修正下容错下
        let chara = this.localPlayer.character;
        let curRotation = chara.worldTransform.rotation;
        Globaldata.tmpRotation1.x = 0;
        Globaldata.tmpRotation1.y = 0;
        Globaldata.tmpRotation1.z = curRotation.z;
        chara.worldTransform.rotation = Globaldata.tmpRotation1;
    }

    /**其它玩家复活 */
    public net_otherPlayerResurgence(pId: number) {
        let player = mw.Player.getPlayer(pId);
        if (player == null) {
            return;
        }

        if (player.character == null) {
            return;
        }

        let cfg = GameConfig.Area.getElement(EAreaId.Safe);
        if (cfg == null) {
            return;
        }
        player.character.worldTransform.position = cfg.bornPoint;
    }

    protected onDestroy(): void {
        // 埋点：核心循环结束
        EventManager.instance.call(EAnalyticsEvents.coreStepEnd);
        EventManager.instance.remove(EMotion_Events.EventPlayerJump, this.listen_jump, this);
        EventManager.instance.remove(EMotion_Events.EventPlayerCanMove, this.listen_playerCanMove, this);
        EventManager.instance.remove(EMotion_Events.EventPlayerCanNotMove, this.listen_playerCanMove, this);
        EventManager.instance.remove(EMotion_Events.onDefensePressed, this.listen_onDefensePressed, this);
        EventManager.instance.remove(EMotion_Events.onDefenseRelease, this.listen_onDefenseRelease, this);
        EventManager.instance.remove(EMotion_Events.sprint, this.listen_sprit, this);
        EventManager.instance.remove(EMotion_Events.sprintSpeed, this.listen_spriteSpeed, this);
        EventManager.instance.remove(EModule_Events.ui_openMainView, this.listen_openMainView, this);
        EventManager.instance.remove(EModule_Events.add_money, this.listen_add_money, this);
        EventManager.instance.remove(EModule_Events.sub_money, this.listen_Reduce_Money, this);
        EventManager.instance.remove(EModule_Events.hurtPlayer, this.listen_Sub_Hp, this);
        EventManager.instance.remove(EPlayerEvents_C.player_setMovement_c, this.listen_setMovement, this);
        EventManager.instance.remove(EPlayerEvents_C.player_syncPlayerName_c, this.listen_playerJoin, this);
        EventManager.instance.remove(EPlayerEvents_C.player_beAttack_clientNpc_c, this.listen_beAttackClientNpc, this);
        EventManager.instance.remove(EPlayerEvents_C.player_syncPlayerid_c, this.listen_playerJoin, this);
        EventManager.instance.remove(EModule_Events.changetoBaseState, this.listen_changetoBaseStae, this);
        EventManager.instance.remove(EModule_Events.changeState, this.changeState, this);
        EventManager.instance.remove(EAttributeEvents_C.Attribute_Money_Change_C, this.listen_money_change, this);
        EventManager.instance.remove(EPlayerEvents_C.Player_ChangePlayerState, this.listen_changePlayerState, this);
    }

    /**
     * 获取段位和段位分,今日可获取段位分
     */
    public getRank(): [number, number, number] {
        let rankScore = this.atrributeMD.getAttributeValue(Attribute.EnumAttributeType.rankScore);
        let id = PlayerManager.instance.getRankLevel(rankScore);
        let dayRankScore =
            Globaldata.maxRankScore - this.atrributeMD.getAttributeValue(Attribute.EnumAttributeType.dayRankScore);
        return [id, rankScore, dayRankScore];
    }

    /**
     * 段位公告公告
     */
    public net_startNotice(type: ERankNoticeType, rankId: number, name: string) {
        let cfg = GameConfig.Rank.getElement(rankId);
        if (!cfg) return;
        let rankName = cfg.rankName;
        let content = "";
        switch (type) {
            case ERankNoticeType.Enter:
                content = StringUtil.format(GameConfig.Language.Tips_rank_4.Value, rankName, name);
                UIService.show(RankNotice, content);
                break;
            case ERankNoticeType.LevelUp:
                content = StringUtil.format(GameConfig.Language.Tips_rank_7.Value, name, rankName);
                UIService.show(RankNotice, content);
                break;
            default:
                break;
        }
    }

    /**
     * 支付段位门票
     */
    public payRankTicket(rankCost: number) {
        this.rankTicket = false;
        this.reduceAttr(Attribute.EnumAttributeType.rankScore, rankCost);
    }

    /**
     * 支付段位门票(new)
     */
    public newPayRankTicket() {
        this.rankTicket = false;
        this.server.net_payRankTicket();
    }
}
