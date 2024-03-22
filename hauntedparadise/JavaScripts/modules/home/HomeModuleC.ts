/*
 * @Author       : dal
 * @Date         : 2024-01-11 10:11:27
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-29 11:40:26
 * @FilePath     : \hauntedparadise\JavaScripts\modules\home\HomeModuleC.ts
 * @Description  : 
 */


import {MailBoxPanel} from "../mailbox/UIMailBox";
import {HomeModuleS} from "./HomeModuleS";
import HomeScript from "./component/HomeScript";

/**
 * Home模块Client端
 */
export class HomeModuleC extends ModuleC<HomeModuleS, null> {

    protected onStart(): void {
        Event.addLocalListener("Ghost_Local_GameEnd", () => {
            UIService.hide(MailBoxPanel);
        });
    }

    /**
     * 玩家家园节点
     */
    homeMap = new Map<string, HomeScript>();

    /**
     * 可能是没家的流浪汉,得判断
     */
    get localHome() {
        return this.homeMap.get(this.localPlayer.userId);
    }

    setHome(home: HomeScript) {
        console.log("client setHome", home.ownerId, home.gameObject.gameObjectId);
        for (const [playerId, h] of this.homeMap) {
            if (home === h) {
                this.homeMap.delete(playerId);
                break;
            }
        }
        home.setHomeInfo("");
        if (StringUtil.isEmpty(home.ownerId)) return;
        this.homeMap.set(home.ownerId, home);
    }

    public transportPlayerToHome(player: Player, targetUserId: string) {
        const home = this.homeMap.get(targetUserId) ?? null;
        if (!home) return;
        home.teleportToHome(player);
    }

    public net_transportPlayerToHome(player: Player, targetUserId: string) {
        this.transportPlayerToHome(player, targetUserId);
    }
}
