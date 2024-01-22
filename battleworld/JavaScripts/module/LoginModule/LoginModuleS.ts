import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { EAreaEvents_S, EPlayerEvents_S } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { LoginModuleC } from "./LoginModuleC";
import { Globaldata } from "../../const/Globaldata";


export class LoginModuleS extends ModuleS<LoginModuleC, null> {

    protected onStart(): void {

    }

    /**玩家第一次加入游戏*/
    @Decorator.noReply()
    public net_firstLogin() {
        EventManager.instance.call(EPlayerEvents_S.player_frist_enterGame, this.currentPlayerId);
    }

    /**玩家开始游戏 */
    @Decorator.noReply()
    public net_startGame() {
        EventManager.instance.call(EAreaEvents_S.area_enterGame, this.currentPlayerId);
    }

    /**
     * 播放出生特效
     */
    @Decorator.noReply()
    public net_playEffect() {
        //  GeneralManager.rpcPlayEffectOnPlayer(Globaldata.jumpBornEffectGuid, this.currentPlayer, Globaldata.jumpBornSlot, Globaldata.jumpBornPlayTime * (-1), Globaldata.jumpBornOffset, Globaldata.jumpBornRotation, Globaldata.jumpBornScale);
    }
}