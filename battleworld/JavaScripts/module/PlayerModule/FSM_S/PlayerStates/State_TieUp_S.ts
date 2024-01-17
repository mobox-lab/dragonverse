import { PlayerState_S } from "../PlayerState_S";

/**
 * 禁锢状态
 */
export class State_TieUp_S extends PlayerState_S {

    public enter() {
        let player = mw.Player.getPlayer(this.playerProxy.PId);
        if (player == null) {
            return;
        }
        player.character.jumpEnabled = false;
        player.character.movementEnabled = false;
    }

    public exit(param?: any): void {
        let player = mw.Player.getPlayer(this.playerProxy.PId);
        if (player == null) {
            return;
        }
        player.character.jumpEnabled = true;
        player.character.movementEnabled = true;
    }

    public onUpdate(dt: number) {


    }

    onDestory(): void {

    }

}