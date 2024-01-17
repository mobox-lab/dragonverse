import { EAttributeEvents_S, EPlayerEvents_S } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { PlayerHeadUIModuleC } from "./PlayerHeadUIModuleC";



export class PlayerHeadUIModuleS extends ModuleS<PlayerHeadUIModuleC, null> {

    private playerModuleS: PlayerModuleS = null;

    private playerName: Map<number, string> = new Map();

    onStart() {
        this.playerModuleS = ModuleService.getModule(PlayerModuleS);
    }

    onPlayerEnterGame(player: mw.Player) {

    }

    onPlayerLeft(player: mw.Player) {
        let playerID = player.playerId;
        this.playerName.delete(playerID);
    }

    /**
    * 获取玩家名字
    */
    public getPlayerName(playerId: number) {
        if (this.playerName.has(playerId)) {
            return this.playerName.get(playerId);
        }
        return "";
    }

    /**玩家加入游戏 */
    @Decorator.noReply()
    public net_PlayerJoin(name: string) {
        this.playerName.set(this.currentPlayerId, name);
        EventManager.instance.call(EAttributeEvents_S.attr_change_s, this.currentPlayerId, Attribute.EnumAttributeType.playerName, name);
        EventManager.instance.call(EPlayerEvents_S.PlayerEvent_GetPlayerName_S, this.currentPlayerId, name);
    }

    @Decorator.noReply()
    public net_setPlayerHeadUI(isShow: number) {
        EventManager.instance.call(EAttributeEvents_S.attr_change_s, this.currentPlayerId, Attribute.EnumAttributeType.isPlayerHeadUI, isShow ? 1 : 0);
    }

    @Decorator.noReply()
    public net_GetLv() {
        let lv = this.playerModuleS.getPlayerAttr(this.currentPlayerId, Attribute.EnumAttributeType.lv);
        EventManager.instance.call(EAttributeEvents_S.attr_change_s, this.currentPlayerId, Attribute.EnumAttributeType.lv, lv);
    }

    @Decorator.noReply()
    public net_setRankVis(isShow: number) {
        EventManager.instance.call(EAttributeEvents_S.attr_change_s, this.currentPlayerId, Attribute.EnumAttributeType.isShowRank, isShow ? 1 : 0);
        this.playerModuleS.setPlayerAttr(this.currentPlayerId, Attribute.EnumAttributeType.isShowRank, isShow ? 1 : 0);
    }

}


