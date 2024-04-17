import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';
import { SpawnManager } from '../../../Modified027Editor/ModifiedSpawn';
import { ModifiedCameraSystem, CameraSystemData, } from '../../../Modified027Editor/ModifiedCamera';
import { MapEx, oTraceError } from "odin";
import { motionClip } from "../../../editors/motionEditor/MotionDataManager";
import { Constants } from "../../../tool/Constants";
import { Tween } from "../../../tool/Tween";
import { util } from "../../../tool/Utils";
import { MotionFrameNode_AnimPause, MotionFrameNode_Animation, MotionFrameNode_BreakPoint, MotionFrameNode_Camera, MotionFrameNode_Charge, MotionFrameNode_ChargeMotion, MotionFrameNode_Effect, MotionFrameNode_Equip, MotionFrameNode_Event, MotionFrameNode_Fly, MotionFrameNode_FlyEntity, MotionFrameNode_Move, MotionFrameNode_PlayWeaponAnim, MotionFrameNode_RemoveEquip, MotionFrameNode_Shake, MotionFrameNode_SkillRect, MotionFrameNode_3DSound, MotionFrameNode_TimeDilate, MotionFrameNode_VisibleWeapon, MotionFrameNode_impulse, MotioniFrameNode_ModelAnim, MotionFrameNode_Sound } from "../../../editors/motionEditor/MotionFrameNodeBase";
import { MotionEditConst } from "../../../editors/motionEditor/MotionEditConst";
import { EventManager } from "../../../tool/EventManager";
import { UIEvent_editMotion } from "../../../editors/motionEditor/UIEvent_editMotion";
import { EFrameNodeType, EMotionBreakType } from "../../../editors/motionEditor/MontionEnum";
import { TriggerHelper } from "../../../tool/TriggerHelper";
import { EBulletEvents_C, EEquipEvents_C, EModule_Events, EModule_Events_S, EMotionEvents_C, EMotion_Events, EPlayerEvents_C, EWeaponEvent_C, EbackType } from "../../../const/Enum";
import { CameraManger } from "../../../tool/CameraManger";
import { Globaldata } from "../../../const/Globaldata";
import { PlayerModuleC, noSkillCallBackSet } from "../../PlayerModule/PlayerModuleC";
import { PlayerModuleS, THurtData } from "../../PlayerModule/PlayerModuleS";
import { MotionUtil } from "../MotionUtil";
import { AreaIntersect } from "./AreaIntersect";
import { ShakeScreenHelper } from "../../../tool/ShakeScreenHelper";
import { PlayerManager } from "../../PlayerModule/PlayerManager";
import { MotionEffectManager } from "./MotionEffectManager";
import { MotionModuleC } from "../MotionModuleC";
import DressUpModuleC from '../../DressUpModule/DressUpModuleC';
import { BuffModuleC } from '../../buffModule/BuffModuleC';


// 行为发起方及目标
export class ActionContext {
    constructor(public from: number, public to: number | string) {
        this.from = from;
        this.to = to;
    }
}

// 行为基类(处理帧数据)
export abstract class AbstractMotion {

    /**
     * 当前玩家动画guid  key:palyID  vlalue:动画guid
     * fix 火炮BUG: 玩家播放同一guid动画,A动画停止会打断B动画
     *     this.A = util.playAnimationLocally2(this.currentPlayer.character, "218383", 1,2.5);
     *     this.B = util.playAnimationLocally2(this.currentPlayer.character, "218383", 1,2.5);
     *     this.A.stop();
     */
    public static curPlayerAnimationGuid: Map<number, string> = new Map<number, string>();

    /**行为状态：是否回收状态 */
    stage: boolean;
    /**行为数据 */
    private motionData: motionClip;
    public get MotionData() {
        return this.motionData;
    }

    /**当前帧 */
    private currentFrame: number;
    /**当前帧 */
    public get CurrentFrame() {
        return this.currentFrame;
    }
    public set CurrentFrame(value: number) {
        this.currentFrame = value;
    }

    /**从哪个技能释放过来的 可能为0 */
    private bindSkillId: number = 0;
    public set BindSkillId(value: number) {
        this.bindSkillId = value;
    }

    /**行为上下文 */
    private motionContext: ActionContext;
    /**上下文 */
    public get MotionContext() {
        return this.motionContext;
    }
    public set MotionContext(value: ActionContext) {
        this.motionContext = value;
    }

    levitateRemainFrame: number;
    canExit: boolean;

    cameraEaseTween: Tween<{ x: number }>
    cameraEaseStartPosition: mw.Vector
    cameraEaseEndPosition: mw.Vector
    cameraEaseStartRotation: mw.Rotation
    cameraEaseEndRotation: mw.Rotation

    // 当前玩家对象
    private _currentPlayer: mw.Player;
    protected get currentPlayer(): mw.Player {
        if (!this._currentPlayer) this._currentPlayer = Player.localPlayer;
        return this._currentPlayer;
    }
    // 当前玩家ID
    private _currentPlayerID: number;
    public get currentPlayerID(): number {
        if (!this._currentPlayerID) this._currentPlayerID = Player.localPlayer.playerId;
        return this._currentPlayerID;
    }
    // 摄像机
    private _camera: Camera
    protected get camera(): Camera {
        if (!this._camera) this._camera = Camera.currentCamera
        return this._camera
    }

    get isOwner(): boolean {
        return this.currentPlayerID == this.motionContext.from;
    }

    /**完成事件*/
    private finishAction: Action = new Action();

    /**特效计时map */
    private _effectMap: Map<number, number> = new Map();
    /**特效播放次数 */
    private _effectCountMap: Map<number, number> = new Map();

    /**装备map */
    private _equipMap: mw.GameObject[] = [];


    /**相机初始化时的数据 */
    private _initCameraData: CameraSystemData = null;
    /**相机持续帧数 */
    protected _cameraTranKeepCount: number = -1;
    /**相机重置时间 */
    protected _cameraResetTime: number = 0;

    /**动效中断类型 */
    public breakType: number = 0;
    /**是否设置过移动 */
    private _isSetMove: boolean = false;
    /**是否执行了技能预存 */
    private _isPrestore: boolean = false;

    /**子弹延迟缓存 */
    private _bulletDelayKey: Set<any> = new Set();

    /**冲量延迟key */
    private addImpulseDelayKey: any = null;

    public invoke(motionClip: motionClip, finisFunc: () => void = null) {

        this.motionData = motionClip;
        this.stage = false;
        this.currentFrame = 0;

        this._isSetMove = false;
        this._isPrestore = false;

        this.canExit = false;
        this.finishAction.add(finisFunc);

        this.curAniGuid = null;
        this.displacement = null;
        this.displacementCount = 0;
        this.breakType = 0;

        this.clear_effectCache();

        let skillCfg = MotionUtil.getMotionSkillCfg(this.motionData.motionId);
        if (skillCfg && this.isOwner && skillCfg.move == 0) {
            EventManager.instance.call(EMotionEvents_C.motion_setMovement_c, false, this);
        }

        this.clear_checkEffectBreak();
    }

    public finish() {

        this.bindSkillId = 0;

        /**清理子弹延迟key */
        this.clear_bulletDelay();

        this.clear_checkEffectBreak();

        this.currentPlayer.character.groundFriction = 8;
        this.breakType = 0;
        this._isPrestore = false;

        this.player_canMove(true);

        // 特效关闭
        this.clear_effectCache();

        // 装备
        this.clear_equipCache();

        // 停止时间膨胀效果
        MotionEffectManager.clear_timeDilation();

        this.stopAllAnimation();

        this.finishAction.call();
        this.finishAction.clear();

        this.ispause = false;

        this._chargeTimeStamp = 0;

        if (this.levitateRemainFrame) {
            this.levitateRemainFrame = undefined;
            this.currentPlayer.character.switchToWalking();
        }
        // 清理相机缓存
        this.clear_cameraTranCache();
    }


    /**当前Motion播放过的动画*/
    private animationMap: Map<string, mw.Animation> = new Map<string, mw.Animation>();
    /**当前玩家动画数据*/
    private curAniGuid: string = null;
    /**当前玩家动画是否暂停中*/
    public ispause: boolean = false;
    /**暂停当前玩家动画*/
    public pause_CurrentAnimation() {
        if (this.ispause) {
            return;
        }
        let ani = this.animationMap.get(this.curAniGuid);
        ani.pause();

        this.ispause = true;
    }
    /**恢复当前玩家动画*/
    public resume_CurrentAnimation() {
        if (!this.ispause) {
            return;
        }
        let ani = this.animationMap.get(this.curAniGuid);
        ani.resume();

        this.ispause = false;
    }
    /**停止当前Motion动画*/
    private stopAllAnimation() {
        for (const [key, value] of this.animationMap) {
            if (AbstractMotion.curPlayerAnimationGuid.has(this.motionContext.from) && AbstractMotion.curPlayerAnimationGuid.get(this.motionContext.from) == key) {
                //fix:必须延迟帧，上一个motion动画guid和当前motion的动画guid相等时，延迟stop,判断上一个motion动画guid是否执行Stop，防止打断当前motion动画。
                setTimeout(() => {
                    let motionMD = ModuleService.getModule(MotionModuleC);
                    if (motionMD.isHasPlayMotion(this.motionContext.from) == false) {
                        value.stop();
                    }
                    AbstractMotion.curPlayerAnimationGuid.delete(this.motionContext.from);
                }, 100);
                continue;
            }
            value.stop();
        }
        this.animationMap.clear();
    }


    public updateLogic() {


        if (MotionEditConst.isUseEdit) {
            EventManager.instance.call(UIEvent_editMotion.Motion_UpdateLogic, this.currentFrame);
        }

        // 动画暂停过
        for (const [animGuid, animData] of this.animationMap) {
            if (animData["pauseCount"] == null) {
                continue;
            }
            animData["pauseCount"]--;
            if (animData["pauseCount"] <= 0) {
                animData.resume();
                animData["pauseCount"] = null;
            }
        }

        // 特效
        for (const [guidId, count] of this._effectMap) {
            this._effectMap.set(guidId, count - 1);
            if (count <= 0) {
                EffectService.stop(guidId);
                this._effectMap.delete(guidId);
            }
        }


        // 相机
        if (this._cameraTranKeepCount > -1) {
            this._cameraTranKeepCount--;
            if (this._cameraTranKeepCount <= 0) {
                this.clear_cameraTranCache();
            }
        }

        // 无信息
        let sheets = MapEx.get(this.motionData.motionNodeMap, this.currentFrame);

        if (sheets == null) {
            return;
        }

        for (let index = 0; index < sheets.length; index++) {
            const sheet = sheets[index];

            switch (sheet.frameNodeType) {
                case EFrameNodeType.MotionFrameNode_Animation:
                    this.playAnimationByID(this.motionContext.from, sheet as MotionFrameNode_Animation);
                    break;
                case EFrameNodeType.MotionFrameNode_AnimPause:
                    this.motion_animPause(sheet as MotionFrameNode_AnimPause);
                    break;
                case EFrameNodeType.MotionFrameNode_TimeDilate:
                    {
                        if (this.isOwner) {
                            this.motion_timeDilate(sheet as MotionFrameNode_TimeDilate)
                        }
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_Charge:
                    {
                        this.motion_charge(sheet as MotionFrameNode_Charge);
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_ChargeMotion:
                    {
                        if (this.isOwner) {
                            //this.motion_chargeMotion(sheet as MotionFrameNode_ChargeMotion);
                        }
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_Effect:

                    this.playEffectByID(this.motionContext.from, sheet as MotionFrameNode_Effect);
                    break;
                case EFrameNodeType.MotionFrameNode_3DSound:
                    {
                        const dressUpModule = ModuleService.getModule(DressUpModuleC);
                        const soundSheet = sheet as MotionFrameNode_3DSound;
                        if (dressUpModule.dressUpInfo && dressUpModule.dressUpInfo && dressUpModule.dressUpInfo.specialSound != "") {
                            //变装时，如果有配置音效，需要走变装道具的音效
                            soundSheet.guid = dressUpModule.dressUpInfo.specialSound;
                        }
                        this.play3DSoundByID(this.motionContext.from, soundSheet);
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_Sound:
                    {
                        this.playSoundByID(sheet as MotionFrameNode_Sound);
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_Move:
                    if (this.isOwner) {
                        this.motion_move(sheet as MotionFrameNode_Move);
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_impulse:
                    if (this.isOwner) {
                        this.motion_impulse(sheet as MotionFrameNode_impulse);
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_Fly:
                    if (this.isOwner) {
                        this.motion_fly(sheet as MotionFrameNode_Fly);
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_Equip:
                    {
                        this.motion_equip(this.motionContext.from, sheet as MotionFrameNode_Equip);
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_RemoveEquip:
                    {
                        this.motion_removeEquip(sheet as MotionFrameNode_RemoveEquip);
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_FlyEntity:
                    {
                        if (this.isOwner) {
                            this.motion_bullet(sheet as MotionFrameNode_FlyEntity);

                        }
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_Camera:
                    if (this.isOwner) {
                        this.motoin_easeTranslateCamera(sheet as MotionFrameNode_Camera);
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_SkillRect:
                    if (this.isOwner) {
                        this.motion_areaCheck(sheet as MotionFrameNode_SkillRect);
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_BreakPoint:
                    {
                        let data = sheet as MotionFrameNode_BreakPoint;
                        this.breakType = data.breakType;
                        if (this.breakType == EMotionBreakType.CanBreak_NoStop) {
                            this.player_canMove();
                        }
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_Event:
                    {
                        if (this.isOwner) {
                            this.motion_event(sheet as MotionFrameNode_Event);
                        }
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_Shake:
                    {
                        if (this.isOwner) {
                            this.motion_shake(sheet as MotionFrameNode_Shake);
                        }
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_VisibleWeapon:
                    {
                        this.motion_visibleWeapon(sheet as MotionFrameNode_VisibleWeapon);
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_PlayWeaponAnim:
                    {
                        this.motion_playWeaponAnim(sheet as MotionFrameNode_PlayWeaponAnim);
                    }
                    break;
                case EFrameNodeType.MotioniFrameNode_ModelAnim:
                    {
                        this.motion_playModelAnim(sheet as MotioniFrameNode_ModelAnim);
                    }
                    break;
            }

        }

        // 浮空持续时间判断
        if (this.levitateRemainFrame) {
            this.levitateRemainFrame--;
            if (this.levitateRemainFrame <= 0) {
                this.levitateRemainFrame = undefined;
                this.currentPlayer.character.switchToWalking();
            }
        }

        this.update_checkBreak();
    }

    private _checkEffectBreakKey = null;

    /**校验打断情况 */
    private update_checkBreak() {


        switch (this.breakType) {
            case EMotionBreakType.CanBreak_Stop:
                {
                    this.player_canMove();

                    if (this._checkEffectBreakKey) {
                        return;
                    }
                    this.check_effectBreak();

                    this._checkEffectBreakKey = TimeUtil.setInterval(() => {
                        this.check_effectBreak();
                    }, 0)
                }
                break;
            case EMotionBreakType.CanBreak_NoStop:
                {
                    this.player_canMove();

                }
                break;
            default:
                break;
        }

        // 检测技能预存
        if (this.breakType != EMotionBreakType.None && this._isPrestore == false) {
            this._isPrestore = true;
            EventManager.instance.call(EMotionEvents_C.motion_invokePrestore);
        }

    }

    private clear_checkEffectBreak() {
        if (this._checkEffectBreakKey) {
            TimeUtil.clearInterval(this._checkEffectBreakKey);
            this._checkEffectBreakKey = null;
        }
    }

    private check_effectBreak() {
        let player = Player.getPlayer(this.motionContext.from);

        // 容错处理
        if (player == null) return;
        if (player.character == null) return;
        let velocity = player.character.velocity;
        if (velocity == null) return;
        if (velocity.x == 0 && velocity.y == 0) {
            return;
        }

        if (this.currentFrame >= this.motionData.frameCount) {
            return;
        }

        //console.error("===check_effectBreak ", this.currentFrame, this.breakType, this.motionData.frameCount);
        this.clear_checkEffectBreak();

        this.currentFrame = this.motionData.frameCount;

    }

    /**控制玩家可移动 */
    private player_canMove(isFinised: boolean = false) {

        if (this._isSetMove) {
            return;
        }

        this._isSetMove = true;

        let skillCfg = MotionUtil.getMotionSkillCfg(this.motionData.motionId);
        if (skillCfg && this.isOwner && skillCfg.move == 0) {
            EventManager.instance.call(EMotionEvents_C.motion_setMovement_c, true, this);
        }

        //中途可移动打断技能，提前进入基础状态(怪skillCfg判空)
        if (skillCfg && noSkillCallBackSet.has(skillCfg.id) == false && this.motionContext.from > 0 && isFinised == false) {
            //所有玩家收武器
            EventManager.instance.call(EWeaponEvent_C.WeaponEvent_TakeWeaponToBack_C, this.motionContext.from);
            //自己切状态
            if (this.isOwner) {
                let motionMD = ModuleService.getModule(MotionModuleC);
                let playerMD = ModuleService.getModule(PlayerModuleC);
                if (motionMD.isHasPlayMotion() == false && playerMD.isDead() == false) {
                    EventManager.instance.call(EModule_Events.changetoBaseState, -1)
                }
            }
        }

    }

    private motion_move(sheet: MotionFrameNode_Move) {
        if (sheet.move_isFlash == 0) {
            let endLoc = this.currentPlayer.character.localTransform.transformPosition(sheet.move_offsetPos);
            this.currentPlayer.character.worldTransform.position = endLoc;
        } else {
            this.displacement = sheet.move_offsetPos;
            this.displacementCount = sheet.move_count;
        }
    }

    private displacement: mw.Vector = null;
    private displacementCount: number = 0;

    updatePerformant() {
        this.onPerformantUpdate();

        if (!this.isOwner) return;


        if (this.displacement == null) {
            return;
        }

        if (this.displacementCount <= 0) {
            return;
        }
        this.displacementCount--;

        // 防止客户端帧率巨低导致冲刺距离无限大，限制帧率补偿最多3倍
        let x = Math.min(this.displacement.x * 3, this.displacement.x * Constants.LPBalance());
        let y = Math.min(this.displacement.y * 3, this.displacement.y * Constants.LPBalance());
        let z = Math.min(this.displacement.z * 3, this.displacement.z * Constants.LPBalance());


        let playerDir = this.currentPlayer.character.worldTransform.rotation.z * 0.017453;


        Globaldata.tmpVector1.x = x * Math.cos(playerDir) + y * Math.sin(playerDir);
        Globaldata.tmpVector1.y = x * Math.sin(playerDir) - y + Math.cos(playerDir)
        Globaldata.tmpVector1.z = z;


        let displacement = Globaldata.tmpVector1;

        // 腰部射线
        let playerLoc = this.currentPlayer.character.worldTransform.position;

        Globaldata.copyVector(playerLoc);

        mw.Vector.add(Globaldata.tmpVector, displacement, Globaldata.tmpVector);

        let middleHitResult = QueryUtil.lineTrace(playerLoc, Globaldata.tmpVector, true, false);

        // 脚部射线
        Globaldata.copyVector(playerLoc);
        Globaldata.tmpVector.z -= this.currentPlayer.character.getBoundingBoxExtent().z / 3;

        mw.Vector.add(Globaldata.tmpVector, displacement, Globaldata.tmpVector);

        let downHitResult = QueryUtil.lineTrace(playerLoc, Globaldata.tmpVector, true, false);

        // 腰前方有碰撞
        for (let hit of middleHitResult) {
            if (hit.gameObject == this.currentPlayer.character) continue;
            if (hit.gameObject instanceof mw.Trigger) continue;
            return;
        }
        // 脚前方有碰撞
        for (let hit of downHitResult) {
            if (hit.gameObject == this.currentPlayer.character) continue;
            if (hit.gameObject instanceof mw.Trigger) continue;
            return;
        }

        mw.Vector.add(playerLoc, displacement, Globaldata.tmpVector)

        this.currentPlayer.character.worldTransform.position = Globaldata.tmpVector;

    }

    protected onPerformantUpdate() {
        if (this.breakType != EMotionBreakType.CanBreak_NoStop) {
            return;
        }

        let motionPlayer = mw.Player.getPlayer(this.motionContext.from);
        if (motionPlayer == null) {
            return;
        }

        if (motionPlayer.character.velocity.x == 0
            && motionPlayer.character.velocity.y == 0
            && motionPlayer.character.velocity.z == 0) {
            return;
        }
        this.stopAllAnimation();
    }

    // 冲量
    private motion_impulse(sheet: MotionFrameNode_impulse) {

        // 判断禁锢，禁锢条件下 之类不能添加冲量
        let mBuff = ModuleService.getModule(BuffModuleC);
        if (mBuff && mBuff.isHasLockBuff()) {
            return;
        }
        PlayerManager.instance.addImpulse(sheet.offsetPos, sheet.forceNum, sheet.groundFriction);
    }



    // 浮空
    private motion_fly(sheet: MotionFrameNode_Fly) {
        this.currentPlayer.character.switchToFlying();
        this.levitateRemainFrame = sheet.frameCount;
    }

    // 播放动画
    protected async playAnimationByID(playerID: number, sheet: MotionFrameNode_Animation) {
        let target: mw.Character;
        // let isSceneUnit = SceneUnitUtil.isSceneUnit(playerID);
        // // 怪物发起的Motion
        // if (isSceneUnit) {
        //     let unit = ModuleService.getModule(SceneUnitModuleC).getSceneUnit(playerID);
        //     if (!unit || unit.isReady == false) return
        //     target = (unit.model instanceof mw.Character) ? unit.model : null;
        // }
        // // 玩家发起的Motion
        // else {
        let player = Player.getPlayer(playerID);
        target = player?.character;
        // }

        if (!target) return;

        this.curAniGuid = sheet.guid;

        if (!AssetUtil.assetLoaded(this.curAniGuid)) {
            await AssetUtil.asyncDownloadAsset(this.curAniGuid);
        }

        let ani = util.playAnimationLocally2(target,
            sheet.guid,
            1,
            sheet.duration * Constants.LogicFrameInterval,
            sheet.animSlot);

        if (ani) {
            this.animationMap.set(sheet.guid, ani);

            // if (!isSceneUnit) {
            AbstractMotion.curPlayerAnimationGuid.set(playerID, sheet.guid);
            // }
        }
    }

    /**动画暂停 */
    protected motion_animPause(sheet: MotionFrameNode_AnimPause) {
        if (this.animationMap.has(sheet.guid) == false) {
            return;
        }
        let anim = this.animationMap.get(sheet.guid);
        anim["pauseCount"] = sheet.pauseCount;
        anim.pause();
    }

    /**驱动时间膨胀 */
    protected motion_timeDilate(sheet: MotionFrameNode_TimeDilate) {
        let player = Player.getPlayer(this.motionContext.from);
        if (player == null) {
            return;
        }

        MotionEffectManager.start_timeDilation(sheet.dilationSpeed, sheet.dilationCount);
    }



    private _chargeKey: any = null;

    /**蓄力开始时的时间戳 */
    private _chargeTimeStamp: number = 0;

    /**蓄力 */
    protected motion_charge(sheet: MotionFrameNode_Charge) {
        this._chargeKey = setTimeout(() => {
            this._chargeKey = null;
            this.clear_chargeKey();

            // 进入蓄力状态
            if (StringUtil.isEmpty(sheet.chargeEvent) == false) {
                EventManager.instance.call(sheet.chargeEvent);
            }

            this._chargeTimeStamp = Date.now();

            this.pause_CurrentAnimation();

            // 自动释放蓄力
            if (sheet.autoRelease > 0) {

                this._chargeKey = setTimeout(() => {
                    this._chargeKey = null;
                    this.invoke_chargeRelease();

                    if (StringUtil.isEmpty(sheet.releaseEvent) == false) {
                        EventManager.instance.call(sheet.releaseEvent);
                    }
                }, sheet.autoRelease * 1000);

            }

        }, sheet.listenTime * 1000);
    }

    /**清理key */
    private clear_chargeKey() {
        if (this._chargeKey) {
            clearTimeout(this._chargeKey);
            this._chargeKey = null;
        }
    }

    /**蓄力释放结束 */
    public invoke_chargeRelease(finisFunc: () => void = null) {
        this.clear_chargeKey();
        this.resume_CurrentAnimation();
        this.finishAction.add(finisFunc);

    }

    /**蓄力状态后续检测motion执行 */
    protected motion_chargeMotion(sheet: MotionFrameNode_ChargeMotion) {

        if (this._chargeTimeStamp == 0) {
            EventManager.instance.call(EMotion_Events.MotionInvokeMotionId, sheet.normalMotionId);
            return;
        }

        // 蓄力了多长时间
        let time = (Date.now() - this._chargeTimeStamp) / 1000;

        let endMotionId = 0;
        for (let index = 0; index < sheet.chargeMotionTimes.length; index++) {
            const checkTime = sheet.chargeMotionTimes[index];
            if (time >= checkTime) {
                endMotionId = sheet.chargeMotionIds[index];
            }
        }

        if (endMotionId > 0) {
            EventManager.instance.call(EMotion_Events.MotionInvokeMotionId, endMotionId);
        }

    }


    // 特效
    private async playEffectByID(playerID: number, effSheet: MotionFrameNode_Effect) {

        let target: mw.Character | mw.GameObject;

        let effectKey = null;

        // // 怪物发出的Motion
        // if (SceneUnitUtil.isSceneUnit(playerID)) {
        //     let unit = ModuleService.getModule(SceneUnitModuleC).getSceneUnit(playerID);

        //     if (unit == null) {
        //         return;
        //     }

        //     if (unit.model == null) {
        //         return;
        //     }
        //     // 容错处理，npcready bug，026修复
        //     if (unit.isReady == false) {
        //         return;
        //     }



        //     target = unit.model;
        // }
        // // 玩家发出的Motion
        // else {
        let player = Player.getPlayer(playerID);
        if (player == null) {
            return;
        }
        target = player.character;
        // }

        if (!target) return;

        if (AssetUtil.assetLoaded(effSheet.guid) == false) {
            await AssetUtil.asyncDownloadAsset(effSheet.guid);
        }

        // 原地播放特效
        if (effSheet.slotIndex <= -1) {

            if (target instanceof mw.Player) {
                target = target.character;
            }
            if (target == null) {
                return;
            }

            if (target.localTransform == null) {
                return;
            }

            let loc = target.localTransform.transformPosition(effSheet.offsetPos);

            let tarRot = target.localTransform.getForwardVector().toRotation();
            Globaldata.tmpRotation.x = effSheet.offsetRotation.x;
            Globaldata.tmpRotation.y = effSheet.offsetRotation.y;
            Globaldata.tmpRotation.z = effSheet.offsetRotation.z;
            let tmpRotation = mw.Rotation.add(tarRot, Globaldata.tmpRotation);

            effectKey = GeneralManager.rpcPlayEffectAtLocation(effSheet.guid,
                loc, effSheet.count, tmpRotation, effSheet.offsetScale);
        }
        // 单位身上播放
        else {
            let effectCount = effSheet.count <= 0 ? 0 : effSheet.count;
            if (target instanceof mw.Character) {
                let target1 = target as any;
                effectKey = EffectService
                    .playOnGameObject(effSheet.guid, target1, {

                        slotType: effSheet.slotIndex,
                        loopCount: effectCount,
                        position: effSheet.offsetPos,
                        rotation: new mw.Rotation(effSheet.offsetRotation),
                        scale: effSheet.offsetScale
                    });
            }
        }

        if (effectKey) {
            if (effSheet.count <= 0) {
                this._effectMap.set(effectKey, Math.abs(effSheet.count));
            } else {
                this._effectCountMap.set(effectKey, effSheet.count);
            }

            if (StringUtil.isEmpty(effSheet.colorHex) == false) {

                EffectService.getEffectById(effectKey).then((effect) => {
                    if (effect) {
                        effect.maskcolor = mw.LinearColor.colorHexToLinearColor(effSheet.colorHex);
                    }
                });
            } else {
                EffectService.getEffectById(effectKey).then((effect) => {
                    if (effect) {
                        effect.maskcolor = mw.LinearColor.white;
                    }
                });
            }


            if (StringUtil.isEmpty(effSheet.colorHex1) == false) {
                let effectStrs = effSheet.colorHex1.split("|");
                if (effectStrs.length == 2) {
                    let colorKey = effectStrs[0];
                    let color = effectStrs[1];
                    EffectService.getEffectById(effectKey).then((effect) => {
                        // 注意搜索下日志 看是不是表填错了
                        if (effect) {
                            effect.setColor(colorKey, mw.LinearColor.colorHexToLinearColor(color));
                        } else {
                            oTraceError("playEffectByID effect ==null ",)
                        }
                    });
                }
            }

        }

    }

    /**清理特效缓存 */
    private clear_effectCache() {
        // 特效关闭
        for (const [guidId, count] of this._effectMap) {
            //console.error("===effect stop1 ", guidId);
            EffectService.stop(guidId);
        }
        this._effectMap.clear();

        for (const [guidId, count] of this._effectCountMap) {
            //console.error("===effect stop2 ", guidId);
            EffectService.stop(guidId);
        }
        this._effectCountMap.clear();
    }

    /**装备 */
    protected async motion_equip(playerID: number, sheet: MotionFrameNode_Equip) {
        let obj = await SpawnManager.modifyPoolAsyncSpawn(sheet.guid, sheet.sourceType);

        if (obj == null) {
            console.error("===motion_equip obj is null ",
                this.motionData.name, this.currentFrame, sheet.guid);
            return;
        }
        let target: mw.Character;
        // // 怪物发起的Motion
        // if (SceneUnitUtil.isSceneUnit(playerID)) {
        //     let unit = ModuleService.getModule(SceneUnitModuleC).getSceneUnit(playerID);
        //     target = (unit.model instanceof mw.Character) ? unit.model : null;
        // }
        // // 玩家发起的Motion
        // else {
        let player = Player.getPlayer(playerID);
        target = player?.character;
        // }
        if (!target) return;

        this._equipMap.push(obj);

        //sheet.equip_socket = -1;

        obj.setVisibility(mw.PropertyStatus.On, true);
        if (sheet.equip_socket == -1) {
            obj.worldTransform.scale = sheet.equip_offsetScale;
            let loc = target.localTransform.transformPosition(sheet.equip_offsetPos);

            // 忽略胶囊体半高
            //loc.z -= target.capsuleHalfHeight;

            obj.worldTransform.position = loc;


            Globaldata.tmpRotation.x = sheet.equip_offsetRotation.x;
            Globaldata.tmpRotation.y = sheet.equip_offsetRotation.y;
            Globaldata.tmpRotation.z = sheet.equip_offsetRotation.z;

            Globaldata.tmpRotation.getForce(Globaldata.tmpVector)

            let dir = target.localTransform.transformDirection(Globaldata.tmpVector);
            Globaldata.tmpRotation.z = dir.toRotation().z;
            obj.worldTransform.rotation = Globaldata.tmpRotation;//dir.toRotation();
            return;
        }
        target.attachToSlot(obj, sheet.equip_socket);
        obj.localTransform.position = (sheet.equip_offsetPos);
        obj.localTransform.rotation = (new mw.Rotation(sheet.equip_offsetRotation));
        obj.worldTransform.scale = sheet.equip_offsetScale;

    }

    /**清理装备缓存 */
    private clear_equipCache() {
        for (let index = 0; index < this._equipMap.length; index++) {
            const element = this._equipMap[index];
            element.setVisibility(mw.PropertyStatus.On, true);
            GameObjPool.despawn(element);
        }

        this._equipMap.length = 0;
    }

    /**移除装备 */
    private motion_removeEquip(sheet: MotionFrameNode_RemoveEquip) {
        for (let index = 0; index < this._equipMap.length; index++) {
            const element = this._equipMap[index];
            if (element.assetId == sheet.guid) {
                element.setVisibility(mw.PropertyStatus.Off, true);
                GameObjPool.despawn(element);
                this._equipMap.splice(index, 1);
                return;
            }
        }
        // if (this._equipMap.has(sheet.guid) == false) {
        //     return;
        // }
        // GameObjPool.despawn(this._equipMap.get(sheet.guid));
        // this._equipMap.delete(sheet.guid);
    }

    /**发射子弹技能 */
    private motion_bullet(sheet: MotionFrameNode_FlyEntity) {

        if (sheet.delayTime <= 0) {
            EventManager.instance.call(EModule_Events.skill_fireBullet,
                this.bindSkillId,
                this.motionData.motionId,
                sheet, this.motionContext.to);
            return;
        }

        let key = setTimeout(() => {
            if (this._bulletDelayKey.has(key)) {
                this._bulletDelayKey.delete(key);
            }
            EventManager.instance.call(EModule_Events.skill_fireBullet,
                this.bindSkillId,
                this.motionData.motionId, sheet, this.motionContext.to);
        }, sheet.delayTime * 1000);

        this._bulletDelayKey.add(key);
    }

    /**清理子弹延迟key */
    private clear_bulletDelay() {
        this._bulletDelayKey.forEach((key) => {
            clearTimeout(key);
        });
        this._bulletDelayKey.clear();
    }


    // 摄像机缓动
    private motoin_easeTranslateCamera(sheet: MotionFrameNode_Camera) {

        /**
         * 一个motion可能存在播放多个相机动画情况
         * 1.只记录第一次相机重置信息
         * 2.播放第二次暂停第一次的动画
         */
        if (this._initCameraData == null) {
            this._initCameraData = CameraManger.instance.saveCamera();
        }

        this._cameraTranKeepCount = sheet.camrea_keepFrame;

        // 停止相机 重置动画
        CameraManger.instance.stopCameraTween();
        if (this.cameraEaseTween && this.cameraEaseTween.isPlaying()) {
            this.cameraEaseTween.stop();
        }
        this.cameraEaseTween = null;
        this.cameraEaseTween = new Tween({ x: 0 }).to({ x: 1 }).onUpdate(obj => {
            mw.Vector.lerp(this.cameraEaseStartPosition, this.cameraEaseEndPosition, obj.x, Globaldata.tmpVector);
            let tmpRot = mw.Rotation.lerp(this.cameraEaseStartRotation, this.cameraEaseEndRotation, obj.x)
            this.camera.worldTransform.position = Globaldata.tmpVector;
            this.camera.worldTransform.rotation = tmpRot;
        })

        let playerTran = this.currentPlayer.character.localTransform;

        this.cameraEaseStartPosition = this.camera.worldTransform.position.clone();
        this.cameraEaseEndPosition = playerTran.transformPosition(sheet.camrea_offsetPos);
        this.cameraEaseStartRotation = this.camera.worldTransform.rotation.clone();
        let worldDir = playerTran.transformDirection(sheet.camrea_offsetRotation);
        this.cameraEaseEndRotation = worldDir.toRotation();
        this.camera.rotationMode = mw.CameraRotationMode.RotationFixed;
        this.cameraEaseTween.duration(sheet.camrea_during * 1000);
        this.cameraEaseTween.start();

        this._cameraResetTime = sheet.resetTime;

    }

    /**清理相机tran缓存 */
    private clear_cameraTranCache(force: boolean = false) {
        if (this._initCameraData == null) {
            return;
        }

        this.cameraEaseTween.stop();

        CameraManger.instance.resetCamera(this._initCameraData, this._cameraResetTime);

        this._initCameraData = null;
        this._cameraTranKeepCount = -1;
    }


    // 3D音效
    protected play3DSoundByID(playerID: number, sound: MotionFrameNode_3DSound) {
        let player = Player.getPlayer(playerID);
        if (!player) return;

        let playerLoc = PlayerManager.instance.getPlayerLoc(playerID);
        if (playerLoc == null) return;

        mw.SoundService.play3DSound(sound.guid, playerLoc, 1, sound.sound_volume, { radius: sound.sound_innerRadius, falloffDistance: sound.sound_maxDistance });
    }

    protected playSoundByID(sound: MotionFrameNode_Sound) {
        mw.SoundService.playSound(sound.guid, 1, sound.sound_volume);
    }


    /**区域检测 */
    protected motion_areaCheck(sheet: MotionFrameNode_SkillRect) {
        AreaIntersect.getAreaIntersect().start_checkTrigger(this.bindSkillId, this.motionData.motionId, sheet);
    }

    /**运动事件 */
    protected motion_event(sheet: MotionFrameNode_Event) {
        EventManager.instance.call(sheet.eventName);
    }
    /**运动事件 */
    protected motion_shake(sheet: MotionFrameNode_Shake) {
        ShakeScreenHelper.shakeScene_motion(sheet, sheet.keepTime);
    }

    /**控制隐藏武器 */
    protected motion_visibleWeapon(sheet: MotionFrameNode_VisibleWeapon) {
        EventManager.instance.call(EEquipEvents_C.equip_visibleWeapon_c, this.motionContext.from, sheet.weaponIndex, sheet.hideTime);
    }

    /**播放武器动画 */
    protected motion_playWeaponAnim(sheet: MotionFrameNode_PlayWeaponAnim) {
        EventManager.instance.call(EEquipEvents_C.equip_playWeaponTween, this.motionContext.from);
    }


    /**播放武器动画 */
    protected async motion_playModelAnim(sheet: MotioniFrameNode_ModelAnim) {


        let player = await Player.asyncGetPlayer(this.motionContext.from);
        if (player == null) {
            return;
        }

        MotionEffectManager.motion_playModelAnim(player.character, sheet);
    }



}

// 原始帧数据的实例基类
export class RowMotion extends AbstractMotion {
    constructor() {
        super();
    }
}

// 自定义行为基类(处理帧回调)
export abstract class ExtendsMotion extends AbstractMotion {


    invoke(motionClip: motionClip,) {
        super.invoke(motionClip);
        if (this.isOwner) {
            this.onOwnerInvoke();
        } else {
            this.onInvoke();
        }
    }

    updateLogic() {
        super.updateLogic();
        if (this.isOwner) {
            this.onOwnerUpdateLogic();
        } else {
            this.onUpdateLogic();
        }
    }

    updatePerformant() {
        super.updatePerformant();
        if (this.isOwner) {
            this.onOwnerPerformantUpdate();
        } else {
            this.onPerformantUpdate();
        }
    }

    finish() {
        super.finish();
        if (this.isOwner) {
            this.onOwnerFinish();
        } else {
            this.onFinish();
        }
    }

    // 开始
    protected onInvoke() { }
    protected onOwnerInvoke() { }
    // 逻辑帧
    protected onUpdateLogic() { }
    protected onOwnerUpdateLogic() { }
    // 渲染帧
    protected onPerformantUpdate() { }
    protected onOwnerPerformantUpdate() { }
    // 结束
    protected onFinish() { }
    protected onOwnerFinish() { }
}

// 服务器Motion,过滤表现效果,仅执行位移与伤害判定相关Sheet
export class ServerMotion {
    owner: any /* ISceneUnitBase */;
    stage: boolean;
    motionData: motionClip;
    currentFrame: number;

    private to: number = 0;

    private readonly attackEffectedUnit: Set<number> | undefined;

    private _hurtCheckKeepCount: number = -1;
    /**伤害判定该key */
    private _hurtCheckKey: any = null;

    constructor() {

        this.attackEffectedUnit = new Set();
    }

    public invoke(owner: any /* ISceneUnitBase */, moitionData: motionClip, to: number) {
        this.owner = owner;
        this.motionData = moitionData;
        this.currentFrame = 0;
        this.to = 0;
        this.to = to;
    }

    public stop() {
        this.currentFrame = this.motionData.frameCount;
    }

    public updateLogic() {

        // 伤害检测
        if (this._hurtCheckKeepCount > -1) {
            this._hurtCheckKeepCount--;
            if (this._hurtCheckKeepCount <= 0) {
                this.clear_areaCheckKey();
            }
        }

        let sheets = MapEx.get(this.motionData.motionNodeMap, this.currentFrame);
        if (sheets == null) return;

        for (let index = 0; index < sheets.length; index++) {
            const sheet = sheets[index];
            switch (sheet.frameNodeType) {
                case EFrameNodeType.MotionFrameNode_SkillRect:
                    {
                        this.areaIntersect(sheet as MotionFrameNode_SkillRect);
                    }
                    break;
                case EFrameNodeType.MotionFrameNode_FlyEntity:
                    {
                        if (SystemUtil.isServer()) {
                            EventManager.instance.call(EModule_Events_S.skill_fireBullet, this.owner.sceneId,
                                this.motionData.motionId, sheet, this.to);
                        } else {
                            EventManager.instance.call(EBulletEvents_C.bullet_npc_fireBullet_c, this.owner.sceneId,
                                this.motionData.motionId, sheet, this.to);
                        }
                    }
                    break;
            }
        }

    }

    public finish() {
        // 伤害检测
        this.clear_areaCheckKey();
    }


    /**区域检测 */
    protected motion_areaCheck(sheet: MotionFrameNode_SkillRect) {
        if (sheet.checkCount > 1) {
            this._hurtCheckKeepCount = sheet.keepFrameCount - 1;
            this.areaIntersect(sheet);
            this._hurtCheckKey = TimeUtil.setInterval(() => {
                this.areaIntersect(sheet);
            }, sheet.checkInterval);
        } else {
            this.areaIntersect(sheet)
        }
    }


    protected async areaIntersect(sheet: MotionFrameNode_SkillRect) {


        if (this.owner.model == null) {
            return;
        }

        let dir = this.owner.getForward;

        let from = this.owner.modelLocaction;;


        let result = await TriggerHelper.isInAreaInd(sheet, from, dir);

        if (result == null || result.length == 0) {
            return;
        }


        this.filter_server(result, sheet.effectid);

        this.filter_client(this.owner.sceneId, result, this.motionData.motionId, this.currentFrame, sheet.effectid);
        //
    }

    /**筛选服务器攻击 */
    private filter_server(result: number[], motionEffectId: number) {

        if (SystemUtil.isClient()) {
            return;
        }

        let playerMD = ModuleService.getModule(PlayerModuleS);

        // if (GlobalWorld.worldType == EWorldType.world1) {
        //     let mAreans = ModuleService.getModule(ArenasModuleS);
        //     if (mAreans.isUnitInArenas(this.owner.sceneId)) {
        //         result = result.filter((pId: number) => {
        //             return mAreans.isInSameTeam(this.owner.sceneId, pId) == false;
        //         });
        //     }
        // }

        for (let playerID of result) {
            if (this.motionData.areaEffectOnce && this.attackEffectedUnit.has(playerID)) continue;


            let hurtData: THurtData = {
                motionEffectId: motionEffectId
            }

            playerMD.test_HurtPlayerByMotion(this.owner.sceneId, playerID, hurtData);
            if (this.motionData.areaEffectOnce) this.attackEffectedUnit.add(playerID);
        }

    }

    /**筛选客户端攻击 */
    private filter_client(attackId: number,
        result: number[], motionId: number, currentFrame: number, motionEffectId: number) {
        if (SystemUtil.isServer()) {
            return;
        }

        EventManager.instance.call(EPlayerEvents_C.player_beAttack_clientNpc_c, attackId, result[0], motionEffectId);
    }


    /**清理区域检测key */
    private clear_areaCheckKey() {
        if (this._hurtCheckKey) {
            TimeUtil.clearInterval(this._hurtCheckKey);
        }
        this._hurtCheckKey = null;
        this._hurtCheckKeepCount = -1;
    }

}