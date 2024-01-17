import { EModule_Events_S, ENotice_Events_S } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { NoticeModuleC } from "./NoticeModuleC";
import { TKillData } from "./UI/NoticeView";

/**
 * 公告模块
 * 1. 服务器传 多语言id+参数
 * 2.合并消息
 * 
 * 目前只适合：多语言+数字参数方式
 * 
 * TODO:群发消息
 */


export interface ITipMsg {
    languageId: number | string;
    params: any[]
}

export class NoticeModuleS extends ModuleS<NoticeModuleC, null>
{
    /**消息数组 */
    private _msgArray: Map<number, ITipMsg[]> = new Map();

    private _checkMsgUpdateKey: any = null;

    protected onStart(): void {

        EventManager.instance.add(ENotice_Events_S.NoticeEvent_TipMsg_S, this.listen_tipMsg, this);
        EventManager.instance.add(ENotice_Events_S.NoticeEvent_KillTip_S, this.listen_killTip, this);
        this._checkMsgUpdateKey =
            TimeUtil.setInterval(this.update_checkMsg.bind(this), 1);
    }

    protected onPlayerLeft(player: mw.Player): void {
        let pId = player.playerId;
        if (this._msgArray.has(pId)) {
            this._msgArray.delete(pId);
        }

    }

    /**
     * 监听玩家击杀信息
     * @param killerId 
     * @param killerWeaponId 
     * @param beKillerId 
     * @param killerCount 
     */
    private listen_killTip(killerId: number, killerWeaponId: number, beKillerId: number, killerCount: number) {
        this.getAllClient().net_killTip(killerId, killerWeaponId, beKillerId, killerCount);
    }

    /**
     * 监听tips播报
     * @param pId 播报的玩家对象
     * @param languageId 播报的多语言id
     * @param params 播报参数
     */
    private listen_tipMsg(pId: number, languageId: number, params: any[]) {
        // 约定首位是 多语言id
        // 后续参数数组
        let msg: ITipMsg = {
            languageId: languageId,
            params: params
        }

        if (this._msgArray.has(pId) == false) {
            this._msgArray.set(pId, []);
        }

        this._msgArray.get(pId).push(msg);
    }

    protected update_checkMsg(): void {
        if (this._msgArray.size == 0) return;

        for (const [pId, msgs] of this._msgArray.entries()) {

            let player = Player.getPlayer(pId);
            if (player == null) continue;

            this.getClient(pId).net_receiveTipMsg(msgs);
        }

        this._msgArray.clear();
    }

    @Decorator.noReply()
    net_Mgs_Room(text: string) {
        ChatService.asyncBroadcastMessage(MessageType.Room, text);
    }

    @Decorator.noReply()
    net_Mgs_Game(text: string) {
        ChatService.asyncBroadcastMessage(MessageType.Game, text);
    }

}