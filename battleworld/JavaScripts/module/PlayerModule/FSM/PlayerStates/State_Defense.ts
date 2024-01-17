import { GeneralManager, } from '../../../../Modified027Editor/ModifiedStaticAPI';
import { GameConfig } from "../../../../config/GameConfig";
import { Globaldata } from "../../../../const/Globaldata";
import { util } from "../../../../tool/Utils";
import { MotionUtil } from "../../../MotionModule/MotionUtil";
import { EPlayerState, PlyerState } from "../PlyerState";

/**
 * 防御状态
 */
export class State_Defense extends PlyerState {

    private defenseStopMotionFrame: number = null;
    private curDefineSkillId: number = null;
    private curEffectId: number = null
    private curSoundId: number = null
    private isPress: boolean = false
 
    protected onEnter() {
        this.curDefineSkillId = this.curBagSkillCfg.DefenseMotion;
        this.defenseStopMotionFrame = this.curBagSkillCfg.DefenseFrame;
        this.isPress = true
        //播放防御动作，根据配置帧数停止动作
        this.defense()

    }
    protected onExit() {
        //结束播放动作
        this.isPress = false;

        if (this.motionMD.currentMotion) this.motionMD.currentMotion.resume_CurrentAnimation();
        // this.stopEff();
    }


    public onUpdate(dt: number) {
        this.checkCanStopMotion()
        this.baseStateUpdate(dt);
    }


    private defense() {
        if (!this.nextMotionCanRelease()) return
        if (!this.curDefineSkillId) {
            return
        }
        //获取当前武器的防御动作ID
        //播放动作，并在配置好的帧数停止动作
        this.realseSkill(this.curBagSkillCfg.DefenseMotion, () => {
            this.playerModulec.changeState(PlyerState.dfaultState,-1)
        })

    }

    private checkCanStopMotion() {
        if (util.ParryBoolean.isDefenseSucc) {
            util.ParryBoolean.isDefenseSucc = false;
            // this.stopEff();
            let effC = GameConfig.Effect.getElement(this.curBagSkillCfg.DefenseSuccEffect)
            //播防御特效
            this.curEffectId = GeneralManager.rpcPlayEffectOnPlayer(effC.EffectID, this.character.player, effC.EffectPoint, effC.EffectTime, effC.EffectLocation, new mw.Rotation(effC.EffectRotate), effC.EffectLarge);
            this.curSoundId = SoundService.play3DSound(Globaldata.define_beAttackSound, this.character, 1, 1);
        }

        if (this.motionMD.currentMotion == null) {
            return;
        }

        let motionSkillCfg = MotionUtil.getMotionSkillCfg(this.motionMD.currentMotion.MotionData.motionId);


        if (motionSkillCfg.id != this.curBagSkillCfg.DefenseMotion) {
            return;
        }

        if (this.isPress == false) {
            return;
        }

        if (this.motionMD.currentMotion.CurrentFrame < this.defenseStopMotionFrame) {
            return;
        }

        this.motionMD.currentMotion.pause_CurrentAnimation();

    }

    stopEff() {
        if (this.curEffectId) {
            EffectService.stop(this.curEffectId);
            this.curEffectId = null;
        }
        if (this.curSoundId) {
            SoundService.stop3DSound(this.curSoundId);
            this.curSoundId = null;
        }
    }

    onDestory(): void {

    }
}