import { oTrace } from "odin";
import { GameConfig } from "../../../../config/GameConfig";
import { PlyerState, EPlayerState } from "../PlyerState";
import { Globaldata } from "../../../../const/Globaldata";

/**
 * 下落攻击攻击状态
 */
export class State_downAttack extends PlyerState {

    /**下落攻击技能id */
    public static downAttackSkillId: number = 0;
 
    private delayStateKey:any = null;
 
    private isCanToState:boolean = false;

    protected onEnter() {
        this.downAttack();
    }

    protected onExit() {
        if (this.motionMD.currentMotion) {
            this.motionMD.currentMotion.resume_CurrentAnimation();
        }
        this.clear_delay_state_key();
    }

    public onUpdate(dt: number) {
        this.update_jumpHight(dt)

        if (this.playerModulec.jump_distance == 0) {
            this.baseStateUpdate(dt);
            
            if(this.isCanToState){
                return;
            }

            let state = null
    
            if (PlyerState.dfaultState == EPlayerState.Idle) {
                state = EPlayerState.Idle;
                this.isCanToState = true;
            }
            if (PlyerState.dfaultState == EPlayerState.run) {
                state = EPlayerState.run;
                this.isCanToState = true;
            }
            if (PlyerState.dfaultState == EPlayerState.jump) {
                state = EPlayerState.jump;
                this.isCanToState = true;
            }
 
            if(this.isCanToState && state){
               this.clear_delay_state_key();
               this.delayStateKey = setTimeout(() => {
                    this.playerModulec.changeState(state);
               }, 200);
            }

        }
    }

    /**
    * 下落攻击
    */
    public downAttack() {
        if (!this.nextMotionCanRelease()) {
            return;
        }

        // 执行攻击
        this.realseSkill(State_downAttack.downAttackSkillId, () => {

        });
    }

    /**
    * 下落攻击-高度刷新
    * @param dt 
    */
    private update_jumpHight(dt: number) {
        if (this.motionMD.currentMotion) {
            let frame = this.motionMD.currentMotion.CurrentFrame;
            if (frame >= Globaldata.jump_stopFrame) {
                if (this.playerModulec.jump_distance >=  Globaldata.jump_resumeHight) {
                    this.motionMD.currentMotion.pause_CurrentAnimation();
                } else {
                    this.motionMD.currentMotion.resume_CurrentAnimation();
                }
            }
        }
    }

    onDestory(): void {

    }
 
    private clear_delay_state_key(){
        if(this.delayStateKey){
            clearTimeout(this.delayStateKey);
            this.delayStateKey = null;
        }
    }
    
}