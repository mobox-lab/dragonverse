import { IFSMState } from "../FSM/IFSMState";
import { PlayerProxyS } from "../PlayerProxyS";

/**玩家状态基类*/
export abstract class PlayerState_S implements IFSMState {

    protected playerProxy: PlayerProxyS = null;

    constructor(proxy: PlayerProxyS) {
        this.playerProxy = proxy;
    }

    name: string;

    enter(currentState: number, param?: any): void {

    }

    onUpdate(dt: number) {

    }
    exit(param?: any) {

    }
    onDestory() {

    }
    canEnter() {

    }
    canEixt() {

    }

}