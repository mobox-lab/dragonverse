/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-03-01 14:12:29
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-01 16:40:15
 * @FilePath     : \DragonVerse\battleworld\JavaScripts\module\jump-room\JumpRoomModule.ts
 * @Description  : 跳房间模块
 */

import { GameConfig } from "../../config/GameConfig";
import Log4Ts from "mw-log4ts";
import Tips from "../../tool/P_Tips";
import { MainUI } from "../PlayerModule/UI/MainUI";

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

    public net_jumpRoomFailed(msg: string) {
        Tips.show(GameConfig.Language.JumpGameFailed.Value, 3);
        Log4Ts.log(JumpRoomModuleC, "onJumpRoomFailed", msg);
    }

    public jumpRoom(roomId: string) {
        this.server.net_jumpRoom(roomId);
    }

    public net_showRoomId(roomId: string) {
        UIService.getUI(MainUI).roomIdText.text = StringUtil.format(GameConfig.Language.CurrentRoomId.Value, roomId);
    }
}