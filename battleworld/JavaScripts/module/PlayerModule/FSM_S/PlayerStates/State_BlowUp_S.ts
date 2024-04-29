import { GameConfig } from "../../../../config/GameConfig";
import { IMotionClipElement } from "../../../../config/MotionClip";
import { Globaldata } from "../../../../const/Globaldata";
import { Constants } from "../../../../tool/Constants";
import { util } from "../../../../tool/Utils";
import { MotionModuleS } from "../../../MotionModule/MotionModuleS";
import { EPlayerState } from "../../FSM/PlyerState";
import { PlayerProxyS } from "../../PlayerProxyS";
import { PlayerState_S } from "../PlayerState_S";

/**
 * 击飞状态
 */
export class State_BlowUp_S extends PlayerState_S {
    /**动画模块 */
    private mMotion: MotionModuleS = null;

    /**击飞动画对象 */
    private anim: mw.Animation = null;
    /**是否被击飞了 */
    private isBlowUp: boolean = false;
    /**被击飞后要播放的动效配置 */
    private blowUpMotionCfg: IMotionClipElement = null;
    /**击飞延迟key */
    private blowUpKey: any = null;
    /**当前播放的时间 */
    private curPlayTime: number = 0;

    constructor(playerProxy: PlayerProxyS) {
        super(playerProxy);

        this.mMotion = ModuleService.getModule(MotionModuleS);

        this.blowUpMotionCfg = GameConfig.MotionClip.getElement(Globaldata.blowUpOverMotionId);
    }

    public enter() {
        let player = mw.Player.getPlayer(this.playerProxy.PId);
        if (player == null) {
            return;
        }
        player.character.jumpEnabled = false;
        player.character.movementEnabled = false;
        this.anim = player.character.loadAnimation(Globaldata.blowUpAnim);
        this.anim.speed = Globaldata.blowUpAnimSpeed;
        this.anim.play();
        this.isBlowUp = false;
        this.curPlayTime = 0;

        this.clear_blowUpKey();
        this.blowUpKey = setTimeout(() => {
            this.blowUpKey = null;
            this.anim.pause();
        }, Globaldata.blowUpAnimPauseTime * 1000);

        // 播放击飞特效在玩家身上
        //util.playEffectOnPlayer(this.playerProxy.PId, Globaldata.blowUpEffectId);
    }

    public onUpdate(dt: number) {
        if (this.isBlowUp) {
            return;
        }

        if (this.playerProxy == null) {
            this.playerProxy.changeState(EPlayerState.Idle);
            return;
        }
        let player = mw.Player.getPlayer(this.playerProxy.PId);
        if (player == null) {
            this.playerProxy.changeState(EPlayerState.Idle);
            return;
        }
        let chara = player.character;
        if (chara == null) {
            this.playerProxy.changeState(EPlayerState.Idle);
            return;
        }

        if (chara.worldTransform == null) {
            return;
        }

        this.curPlayTime += dt;
        if (this.anim && this.curPlayTime <= Globaldata.blowUpAnimPauseTime) {
            return;
        }

        let playerLoc = chara.worldTransform.position;
        let extenZ = chara.collisionExtent.z / 2 + Globaldata.blowUpCheckOffsetZ;
        Globaldata.tmpVector2.x = playerLoc.x;
        Globaldata.tmpVector2.y = playerLoc.y;
        Globaldata.tmpVector2.z = playerLoc.z - extenZ;

        let results = QueryUtil.lineTrace(
            chara.worldTransform.position,
            Globaldata.tmpVector2,
            true,
            false,
            null,
            false,
            false,
            chara
        );

        if (results.length > 0) {
            this.isBlowUp = true;

            if (this.anim) {
                this.anim.stop();
                this.anim = null;
            }
            this.clear_blowUpKey();
            // 开始起飞
            this.mMotion.playMotion(this.playerProxy.PId, Globaldata.blowUpOverMotionId);

            this.blowUpKey = setTimeout(() => {
                this.blowUpKey = null;
                this.stateOver();
            }, this.blowUpMotionCfg.frameCount * Constants.LogicFrameInterval * 1000);
        }
    }

    private stateOver() {
        let player = mw.Player.getPlayer(this.playerProxy.PId);
        if (player == null) {
            this.playerProxy.changeState(EPlayerState.Idle);
            return;
        }
        if (player.character == null) {
            return;
        }
        player.character.jumpEnabled = true;
        player.character.movementEnabled = true;
        this.playerProxy.changeState(EPlayerState.Idle);
    }

    private clear_blowUpKey() {
        if (this.blowUpKey) {
            clearTimeout(this.blowUpKey);
            this.blowUpKey = null;
        }
    }

    exit(param?: any): void {
        this.clear_blowUpKey();
    }
}
