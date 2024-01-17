import { LogManager } from "odin";
import { util } from "../../../../tool/Utils";
import { EPlayerState, PlyerState } from "../PlyerState";


/**
 * 格挡状态
 */
export class State_Parry extends PlyerState {

    private curDefineSkillId: number = null;
    private curEffectId: number = null
    private curSoundId: number = null
    private curParrySuccMotionID: number = null;
 
    protected onEnter() {
        this.curDefineSkillId = this.curBagSkillCfg.ParryMotion;
        this.curParrySuccMotionID = this.curBagSkillCfg.ParrySuccMotion;
        this.parry();
    }
    protected onExit() {
        // this.stopEff();
        util.ParryBoolean.canParry = true;
    }
    public onUpdate(dt: number) {
        this.baseStateUpdate(dt);
        this.parryUpdate();
    }

    private parry() {
        if (!this.nextMotionCanRelease()) return
        if (!this.curDefineSkillId) {
            LogManager.instance.logError("In State_Parry curWeaponID = " + this.curBagSkillCfg.id + " curDefineSkillId = " + this.curDefineSkillId)
            return
        }
        util.ParryBoolean.canParry = false;

        this.realseSkill(this.curDefineSkillId, () => {
            if (!util.ParryBoolean.canParry) {
                util.ParryBoolean.canParry = true;
            }
            this.playerModulec.changeState(PlyerState.dfaultState,-1)
        })

    }
 
    private parryUpdate() {
        if (util.ParryBoolean.isParrySucc) {
            util.ParryBoolean.isParrySucc = false;
            // 容错处理
            if (this.motionMD.currentMotion) {
                this.motionMD.currentMotion.finish();
            }

            //播格挡特效
            this.realseSkill(this.curParrySuccMotionID, () => {
                util.ParryBoolean.canParry = true;
            })

        }
        if (this.motionMD.currentMotion &&
            this.motionMD.currentMotion.MotionData &&
            this.motionMD.currentMotion.MotionData.motionId == this.curDefineSkillId &&
            this.motionMD.currentMotion.CurrentFrame == this.motionMD.currentMotion.MotionData.frameCount) {
            util.ParryBoolean.canParry = true;
        }
    }
 
    private stopEff() {
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