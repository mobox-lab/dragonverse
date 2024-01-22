
import { PlyerState, EPlayerState } from "../PlyerState";

/**跑状态 */
export class State_run extends PlyerState {

    constructor() {
        super();

    }

    protected onEnter() {

    }

    protected onExit() {

    }

    public onUpdate(dt: number) {
        this.baseStateUpdate(dt);
        if (PlyerState.dfaultState == EPlayerState.Idle) {
            this.playerModulec.changeState(EPlayerState.Idle);
        }
    }

    onDestory(): void {

    }

}
