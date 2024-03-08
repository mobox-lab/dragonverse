/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-12-27 14:13:00
 * @LastEditors  : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @LastEditTime : 2024-01-04 16:20:26
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\help\HelpModuleS.ts
 * @Description  : 
 */
import { GhostModuleC } from "../ghost/GhostModuleC";
import { PlayerModuleS } from "../player/PlayerModuleS";
import HelpModuleC, { HelpTime } from "./HelpModuleC";

export default class HelpModuleS extends ModuleS<HelpModuleC, null> {
    net_showHelpMessage(playerId: number) {
        this.getAllClient().net_showHelpMessage(playerId);
    }


    private needHelpMap: Map<number, number> = new Map();

    protected onStart(): void {

    }
    protected onPlayerLeft(player: mw.Player): void {
        this.net_deleteHelpPlayer(player.playerId);
    }

    net_needHelp(playerId: number) {
        if (!this.needHelpMap.has(playerId)) {
            this.needHelpMap.set(playerId, HelpTime);
        }
        this.getAllClient().net_needHelpPerformance(playerId);
    }
    /**
     * 
     * @param playerId 死亡的玩家
     * @param helpPlayerId 帮助复活的玩家
     */
    net_getHelp(playerId: number, helpPlayerId: number) {
        if (!this.needHelpMap.has(playerId)) {
            return;
        }
        this.net_deleteHelpPlayer(playerId);
        this.getAllClient().net_getHelp(playerId, helpPlayerId);
    }
    net_noHelp(playerId: number) {
        if (!this.needHelpMap.has(playerId)) {
            return;
        }
        this.net_deleteHelpPlayer(playerId);
        this.getAllClient().net_noHelp(playerId, false);
    }
    protected onUpdate(dt: number): void {
        for (let i of this.needHelpMap) {
            i[1] -= dt;
            if (i[1] <= 0) {
                this.getAllClient().net_noHelp(i[0], true)
                this.needHelpMap.delete(i[0]);
            }
            if (i[1] > 0)
                this.needHelpMap.set(i[0], i[1]);
        }
    }
    net_deleteHelpPlayer(playerId: number) {
        if (this.needHelpMap.has(playerId)) {
            this.needHelpMap.delete(playerId);
        }
    }
}