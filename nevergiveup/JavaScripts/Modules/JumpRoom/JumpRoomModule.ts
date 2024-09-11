import Log4Ts from "mw-log4ts";
import LobbyUI from "../../UI/LobbyUI";
import { GameConfig } from "../../config/GameConfig";
import { TipsManager } from "../../UI/Tips/CommonTipsManagerUI";
import { UIMain } from "../../stage/ui/UIMain";

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
        TeleportService.asyncTeleportToRoom(roomId, [this.currentPlayer.userId], null).then(() => {
        }, onFailed);

    }

    protected onPlayerEnterGame(player: mw.Player): void {
        TeleportService.asyncGetPlayerRoomInfo(player.userId).then((roomInfo) => {
            this.getClient(player).net_showRoomId(roomInfo.roomId);
        });

    }
}

export class JumpRoomModuleC extends ModuleC<JumpRoomModuleS, null> {

    public net_jumpRoomFailed(msg: string) {
        TipsManager.showTips(GameConfig.Language.JumpGameFailed.Value);
        Log4Ts.log(JumpRoomModuleC, "onJumpRoomFailed", msg);
    }

    public jumpRoom(roomId: string) {
        this.server.net_jumpRoom(roomId);
    }

    public net_showRoomId(roomId: string) {
        UIService.getUI(LobbyUI).text_roomid.text = StringUtil.format(GameConfig.Language.CurrentRoomId.Value, roomId);
        UIService.getUI(UIMain).text_roomid.text = StringUtil.format(GameConfig.Language.CurrentRoomId.Value, roomId);
    }
}