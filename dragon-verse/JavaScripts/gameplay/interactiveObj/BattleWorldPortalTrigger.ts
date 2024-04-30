/**
 * @Author       : zewei.zhang
 * @Date         : 2024-04-30 10:12:43
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-04-30 10:12:45
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\gameplay\interactiveObj\BattleWorldPortalTrigger.ts
 * @Description  : Battle World传送门
 */

import AudioController from "../../controller/audio/AudioController";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { ActivateByTrigger, ActivateMode, TriggerType } from "./ActiveMode";
import { PortalTriggerWithProgress } from "./PortalTriggerWithProgress";

export default class BattleWorldPortalTrigger extends PortalTriggerWithProgress {
    onProgressDoneInServer(playerId: number): void {
        let player = Player.getPlayer(playerId);
        const onFailed = (result: mw.TeleportResult) => {
            // 将错误信息发给所有参与的客户端
            if (player) {
                Event.dispatchToClient(player, "onJumpGameFailed", result.message);
                Log4Ts.log(this, "onJumpGameFailed", result.message);
            }
        };

        TeleportService.asyncTeleportToScene(this.getJumpSceneName(2), [player.userId]).then(() => {}, onFailed);
    }
    onStartPortalInServer(playerId: number): void {}
    onStartPortalInClient(): void {
        //控制运动器
        //停特效播特效
        //播音效
    }
    onInterruptProgressInClient(): void {}
    onInterruptProgressInServer(playerId: number): void {}
    onProgressDoneInClient(): void {}
    activeMode: ActivateMode;

    protected onStart(): void {
        super.onStart();
        this.activeMode = new ActivateByTrigger(this.gameObject, TriggerType.TriggerInServer);
    }

    getJumpSceneName(id: number): string {
        switch (id) {
            case 1:
                return "pet-simulator";
            case 2:
                return "battleworld";
            case 3:
                return "hauntedparadise";
            default:
                return "dragon-verse";
        }
    }
}
