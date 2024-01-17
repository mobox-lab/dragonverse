import { Globaldata } from "../../../../const/Globaldata";
import { PlayerState_S } from "../PlayerState_S";

/**
 * 待机状态
 */
export class State_Idle_S extends PlayerState_S {

    enter() {
        let player = mw.Player.getPlayer(this.playerProxy.PId);
        if (player == null) {
            return;
        }
        if (player.character == null) {
            return;
        }
        if (player.character.worldTransform == null) {
            return;
        }
        let chara = player.character;
        let curRotation = chara.worldTransform.rotation;
        if (curRotation.x == 0 && curRotation.y == 0) {
            return;
        }
        Globaldata.tmpRotation1.x = 0;
        Globaldata.tmpRotation1.y = 0;
        Globaldata.tmpRotation1.z = curRotation.z;
        chara.worldTransform.rotation = Globaldata.tmpRotation1;
    }



}