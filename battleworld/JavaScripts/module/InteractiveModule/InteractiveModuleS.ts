import { EAttributeEvents_C } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { InteractiveModuleC } from "./InteractiveModuleC";

export class InteractiveModuleS extends ModuleS<InteractiveModuleC, null>
{
    protected onStart(): void {

    }

    @Decorator.noReply()
    public net_enterTransfer(tweenTIme: number, effectGuid: string, scale: mw.Vector) {

        let pId = this.currentPlayerId;

        let players = mw.Player.getAllPlayers();
        for (let index = 0; index < players.length; index++) {
            const tmpPlayer = players[index];
            if (tmpPlayer.playerId == pId) {
                continue;
            }

            let tmpClient = this.getClient(tmpPlayer);
            if (tmpClient == null) {
                continue;
            }

            tmpClient.net_enterTransfer(pId, tweenTIme, effectGuid, scale);
        }



    }

}