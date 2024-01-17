import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { ModifiedCameraSystem, CameraModifid, CameraSystemData, } from '../../../Modified027Editor/ModifiedCamera';
import { GameConfig } from "../../../config/GameConfig";
import { Globaldata } from "../../../const/Globaldata";
import { EventManager } from "../../../tool/EventManager";
import { MotionModuleC } from "../../MotionModule/MotionModuleC";
import { PlayerModuleC } from "../PlayerModuleC";
import { FSMManager } from "./FSMManager";
import { IFSMState } from "./IFSMState";
import { EModule_Events, EPlayerEvents_C, EbackType, TalkDataEnum } from "../../../const/Enum";




/**
  * 本地播放动画-当前玩家，同时切换到ActionState状态
  * @param owner 播放者
  * @param animationGuid 动画guid
  * @param loop 是否循环  注意：loop != 1  循环播放  事件不会回调的
  * @param rate 动画速率
  * @param isLocally 是否本地播放
  */
export function playCurrentPlayerAnimationAndChangeActionState(animationGuid: string, loop: number, rate: number, isLocally: boolean = false) {
    let owner = Player.localPlayer.character;
    if (owner === undefined || owner === null) return;
    EventManager.instance.call(EModule_Events.changeState, EPlayerState.Action);
    let anim = PlayerManagerExtesion.loadAnimationExtesion(owner, animationGuid, isLocally)
    anim.loop = loop;
    anim.speed = rate;
    anim.play();
    anim.onFinish.add(() => {
        EventManager.instance.call(EModule_Events.changetoBaseState, -1);
    });
    return anim;
}


/**玩家状态类型 */
export enum EPlayerState {
    /**无 */
    None,
    /**正常待机*/
    Idle,
    /**下落攻击攻击状态*/
    downAttack,
    /**技能*/
    Skill,
    /**交互状态（如打开宝箱,采集，膜拜，炼金，乘坐载具,action动作） */
    Action,
    /**跳*/
    jump,
    /**冲刺 */
    sprint,
    /**死亡 */
    Dead,
    /**防御 */
    Defense,
    /**格挡 */
    Parry,
    /**跑*/
    run,
    /**被格挡 */
    BeParry,
    /**眩晕*/
    Stun,
    /**中心*/
    Center,
    /**变身*/
    ChangeMolde,
    /**能量防护*/
    EnergyShield,
    /**击飞 */
    BlowUp,
    /**俯冲状态 */
    Dive,
    /**禁锢状态 */
    TieUp,
}

/**玩家状态类型 */
export const PlayerStateName = {
    /**无 */
    [EPlayerState.None]: "无",
    /**正常待机*/
    [EPlayerState.Idle]: "正常待机",
    /**下落攻击攻击状态*/
    [EPlayerState.downAttack]: "下落攻击攻击状态",
    /**技能*/
    [EPlayerState.Skill]: "技能",
    /**交互状态（如打开宝箱,采集，膜拜，炼金，乘坐载具,action动作） */
    [EPlayerState.Action]: "交互状态（如打开宝箱,采集，膜拜，炼金，乘坐载具,action动作）",
    /**跳*/
    [EPlayerState.jump]: "跳",
    /**冲刺 */
    [EPlayerState.sprint]: "冲刺",
    /**死亡 */
    [EPlayerState.Dead]: "死亡",
    /**防御 */
    [EPlayerState.Defense]: "防御",
    /**格挡 */
    [EPlayerState.Parry]: "格挡",
    /**跑*/
    [EPlayerState.run]: "跑",
    /**被格挡 */
    [EPlayerState.BeParry]: "被格挡",
    /**眩晕*/
    [EPlayerState.Stun]: "眩晕",
    /**中心*/
    [EPlayerState.Center]: "中心",
    /**变身*/
    [EPlayerState.ChangeMolde]: "变身",
    /**能量防护*/
    [EPlayerState.EnergyShield]: "能量防护",
}

/**玩家状态基类*/
export abstract class PlyerState implements IFSMState {

    /**之前有跑墙状态-最终切换到待机状态 每次调用*/
    public static onChangeRunwalltoIdle: Action = new Action();
    /**默认状态 */
    public static dfaultState: EPlayerState = null;
    //是否有跑墙状态退出
    public static isWallRunExit: boolean = false;
    /** 跳跃次数(落地清零)*/
    public static jumpTime: number = 0;

    /**名字 */
    public name: string = this.constructor.name;
    /**玩家模块*/
    protected playerModulec: PlayerModuleC;
    /**动画模块*/
    protected motionMD: MotionModuleC;
    /**当前角色*/
    protected currentPlayer: mw.Player;
    /**当前玩家*/
    protected character: mw.Character;
    /**状态*/
    public currentState: EPlayerState = EPlayerState.Idle;
    /**相机*/
    protected mainCamera: Camera;
    /**状态管理器*/
    public mStateManager: FSMManager;

    /**延迟key */
    private resetOverrideKey: any = null;
    /**相机默认fov*/
    private cameraDefaultFOV: number = null;
    /** 相机动画*/
    private camFOVAni: mw.Tween<any> = null;

    /**获取玩家职业配置*/
    public get curBagSkillCfg() {
        return null;
    }

    constructor() {
        this.currentPlayer = Player.localPlayer;
        this.character = this.currentPlayer.character;
        this.mainCamera = Camera.currentCamera;
        this.playerModulec = ModuleService.getModule(PlayerModuleC);
        this.motionMD = ModuleService.getModule(MotionModuleC);
        this.mStateManager = this.playerModulec.mStateManager;
        this.cameraDefaultFOV = this.mainCamera.fov;
    }

    /**
     * motion可执行/当前释放的motion可以被中断
     * @returns 
     */
    public nextMotionCanRelease(): boolean {
        return !this.motionMD.currentMotion || this.motionMD.currentMotion.canExit == true;
    }

    /**
     *  释放技能 
     * @param motionID 技能id
     * @param onAnimFinished 完成回调
     */
    public realseSkill(skillId: number, onAnimFinished: () => void) {
        let motionSkillCfg = GameConfig.MotionSkill.getElement(skillId)
        if (this.curBagSkillCfg) {
            this.motionMD.invoke_motion(motionSkillCfg.id, () => {
                EventManager.instance.call(EPlayerEvents_C.player_figthState_checek);
                if (onAnimFinished != null) {
                    onAnimFinished();
                }
            });
        }
    }

    /**
     * 默认状态更新
     * @param dt 
     */
    public baseStateUpdate(dt: number) {
        this.playerModulec.updateBaseState();
    }


    /**
     *  切换相机
     * @param iswall 是否上墙
     * @param isChangeFov 是否修改fov
     *  @param isfloor 是否修改相机跟随
     */
    public switchCamera(iswall: boolean, isChangeFov: boolean, isfloor: boolean = true) {

        if (iswall) {
            if (isChangeFov) {
                this.startCameraFov(Globaldata.runWallCameraFov, Globaldata.runWallCameraFovSwitchTime)
                this.mainCamera.upAngleLimit = Globaldata.wallRun_cameraUpLimitAngle
                this.mainCamera.downAngleLimit = Globaldata.wallRun_cameraDownLimitAngle
            }

            if (isfloor) {

                //BUG：相机抽搐
                if (this.mainCamera.rotationMode == mw.CameraRotationMode.RotationFollow) {
                    return;
                }

                this.mainCamera.rotationMode = mw.CameraRotationMode.RotationFollow;
                this.mainCamera.rotationLagEnabled = true;
                this.mainCamera.rotationLagSpeed = Globaldata.runWallCameraFollowDelay;

            }

        } else {
            if (isChangeFov) {
                this.startCameraFov(this.cameraDefaultFOV, Globaldata.runWallCameraFovSwitchTime)
                this.mainCamera.upAngleLimit = Globaldata.df_cameraUpLimitAngle
                this.mainCamera.downAngleLimit = Globaldata.df_cameraDownLimitAngle
            }

            if (isfloor) {

                //BUG：相机抽搐
                if (this.mainCamera.rotationMode == mw.CameraRotationMode.RotationControl) {
                    return;
                }

                //BUG:切换模式自动恢复角度
                this.mainCamera.rotationMode = mw.CameraRotationMode.RotationControl;
                this.mainCamera.rotationLagEnabled = false;

                let rot = this.character.localTransform.getForwardVector().toRotation();
                ModifiedCameraSystem.setOverrideCameraRotation(rot);

                this.resetOverrideKey = setTimeout(() => {
                    ModifiedCameraSystem.resetOverrideCameraRotation();
                    this.resetOverrideKey = null;
                }, 100);

            }

        }
    }

    /**
     * 相机fov修改
     */
    private startCameraFov(targetFov: number, time: number = 1) {
        let start = this.mainCamera.fov;
        if (this.camFOVAni) {
            this.camFOVAni.stop();
            this.camFOVAni = null;
        }
        this.camFOVAni = new mw.Tween({ fov: start }).to({ fov: targetFov }, time * 1000).onUpdate(fov => {
            this.mainCamera.fov = fov.fov;
        }).start();
    }

    /**
     * 状态进入，外部调用
     * @param context 战斗实体
     */
    enter(currentState, param?: any) {
        this.currentState = currentState;
        if (this.currentState != EPlayerState.Idle && this.currentState != EPlayerState.Action) {
            EventManager.instance.call(EPlayerEvents_C.player_back_brake, EbackType.selfCancle);
        }
        this.onEnter(param);
    }
    /**
     * 退出状态外部调用
     */
    exit(param: any) {
        this.onExit(param);
    }
    /**
     * 能否进入
     */
    canEnter() {
        return true;
    }
    /**
    * 能否退出
    */
    canEixt() {
        return true;
    }
    /**
     * 子状态重写，enter之后触发
     */
    protected abstract onEnter(param?: any);
    /**
    * 子状态重写，exit之后触发
    */
    protected abstract onExit(param: any);
    /**
     * 更新，外部驱动
     */
    public abstract onUpdate(dt: number);

    /**
    * 销毁
    */
    onDestory() {
        this.currentPlayer = null;
        this.character = null;
        this.playerModulec = null;
        // this.sceneUnitMD = null;
        this.motionMD = null;
        this.mStateManager = null;
    }

}
