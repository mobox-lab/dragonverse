import { EPlayerEvents_C } from "../../../../const/Enum";
import { Globaldata } from "../../../../const/Globaldata";
import { EventManager } from "../../../../tool/EventManager";
import { EPlayerState, PlyerState } from "../PlyerState";

/**
 * 被格挡状态
 */
export class State_BeParry extends PlyerState {

    private isInAnim: boolean = false;
 
    protected onEnter() {
        this.isInAnim = true;

        this.motionMD.invoke_motion_single(Globaldata.beParryMotionSkillId, () => {
            this.isInAnim = false;
            this.playerModulec.changeState(PlyerState.dfaultState,EPlayerState.Parry)
            EventManager.instance.call(EPlayerEvents_C.player_setMovement_c, true, true);
        })
    }

    protected onExit() {
        EventManager.instance.call(EPlayerEvents_C.player_setMovement_c, true, true);
        this.playerModulec.changeState(PlyerState.dfaultState,-1)
    }

    public onUpdate(dt: number) {
        this.baseStateUpdate(dt);
        if (!this.isInAnim) return
        if (this.currentPlayer.character.movementEnabled) this.currentPlayer.character.movementEnabled = false;
        if (this.currentPlayer.character.jumpEnabled) this.currentPlayer.character.jumpEnabled = false;
    }

}