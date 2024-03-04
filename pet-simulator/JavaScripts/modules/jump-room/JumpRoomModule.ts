/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-03-01 14:12:29
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-01 16:45:46
 * @FilePath     : \DragonVerse\pet-simulator\JavaScripts\modules\jump-room\JumpRoomModule.ts
 * @Description  : 跳房间模块
 */

import { GameConfig } from "../../config/GameConfig";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { P_HudUI } from "../Hud/P_HudUI";
import { TipsManager } from "../Hud/P_TipUI";


export class JumpRoomModuleS extends ModuleS<JumpRoomModuleC, null> {

    public net_jumpRoom(roomId: string) {
        let player = this.currentPlayer;
        const onFailed = (result: mw.TeleportResult) => {
            // 将错误信息发给所有参与的客户端
            if (player) {
                this.getClient(player).net_jumpRoomFailed(result.message);
                Log4Ts.log(JumpRoomModuleS, "onJumpRoomFailed", result.message);
            }
        };
        Log4Ts.log(JumpRoomModuleS, "onJumpToRoom", this.currentPlayer.userId, roomId);
        TeleportService.asyncTeleportToRoom(roomId, [this.currentPlayer.userId], null).then(() => { }, onFailed);

    }

    protected onPlayerEnterGame(player: mw.Player): void {
        TeleportService.asyncGetPlayerRoomInfo(player.userId).then((roomInfo) => {
            this.getClient(player).net_showRoomId(roomInfo.roomId);
        });
    }
}

export class JumpRoomModuleC extends ModuleC<JumpRoomModuleS, null> {

    public jumpRoom(roomId: string) {
        this.server.net_jumpRoom(roomId);
    }

    public net_jumpRoomFailed(msg: string) {
        TipsManager.instance.showTip(GameConfig.Language.JumpGameFailed.Value);
        Log4Ts.log(JumpRoomModuleC, "onJumpRoomFailed", msg);
    }

    public net_showRoomId(roomId: string) {
        UIService.getUI(P_HudUI).roomIdText.text = StringUtil.format(GameConfig.Language.CurrentRoomId.Value, roomId);
    }
}