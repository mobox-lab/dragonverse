/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-03-01 14:12:29
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-01 16:13:50
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\module\jump-room\JumpRoomModule.ts
 * @Description  : 跳房间模块
 */

import Log4Ts from "mw-log4ts";
import i18n from "../../language/i18n";
import { PromotTips } from "../../ui/common/PromotTips";
import MainPanel from "../../ui/main/MainPanel";

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
        PromotTips.showTips(i18n.lanKeys.JumpGameFailed);
        setTimeout(() => {
            PromotTips.hideTips();
        }, 3000);
        Log4Ts.log(JumpRoomModuleC, "onJumpRoomFailed", msg);
    }

    public net_showRoomId(roomId: string) {
        UIService.getUI(MainPanel).roomIdText.text = i18n.lan("CurrentRoomId", roomId);
    }
}