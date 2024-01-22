import { PlayerManager } from "../PlayerModule/PlayerManager";
import { InteractiveModuleS } from "./InteractiveModuleS";

export class InteractiveModuleC extends ModuleC<InteractiveModuleS, null>
{
    protected onStart(): void {

    }


    public listen_enterTransfer(tweenTIme: number, effectGuid: string, scale: mw.Vector): void {

        this.server.net_enterTransfer(tweenTIme, effectGuid, scale);

        this.net_enterTransfer(this.localPlayerId, tweenTIme, effectGuid, scale);
    }


    public net_enterTransfer(pId: number, tweenTIme: number, effectGuid: string, scale: mw.Vector) {
        let player = mw.Player.getPlayer(pId);
        if (player == null) {
            return;
        }
        if (player.character == null) {
            return;
        }

        PlayerManager.instance.setPlayerVisible(pId, false);

        // 编辑器问题，需要延时处理
        setTimeout(() => {
            let effectId = mw.EffectService.playOnGameObject(effectGuid, player.character, {
                loopCount: 999,
                scale: scale
            });

            setTimeout(() => {
                mw.EffectService.stop(effectId);
            }, tweenTIme * 1000);
        }, 0);

        setTimeout(() => {

            PlayerManager.instance.setPlayerVisible(pId, true);

        }, (tweenTIme + 0.5) * 1000);
    }

}