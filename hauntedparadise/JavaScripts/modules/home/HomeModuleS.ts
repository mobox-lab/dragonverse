/*
 * @Author       : dal
 * @Date         : 2024-01-18 14:25:53
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-18 15:58:28
 * @FilePath     : \hauntedparadise\JavaScripts\modules\home\HomeModuleS.ts
 * @Description  : 
 */


import {HomeModuleC} from "./HomeModuleC";
import HomeScript from "./component/HomeScript";

/**
 * Home模块Server端
 */
export class HomeModuleS extends ModuleS<HomeModuleC, null> {
    /**
     * 空的家园节点
     */
    emptyHomes: HomeScript[] = [];
    /**
     * 玩家家园节点
     */
    homeMap = new Map<string, HomeScript>();

    protected onAwake(): void {
        Event.addLocalListener("StartProcedureServer", this.initHome.bind(this));
        Event.addLocalListener("EndProcedureServer", this.recycleHome.bind(this));
        Event.addClientListener("OnPlayerAliveDayChange", (player: Player, aliveDay: number) => {
            if (!this.homeMap.has(player.userId)) {
                console.error(`DEBUG ERROR>>> 同步玩家 ${player.userId} 存活天数失败，这个玩家没有登记户口信息`);
                return;
            }
            this.homeMap.get(player.userId).aliveDay = aliveDay;
        });
    }

    protected onPlayerLeft(player: mw.Player): void {
        // 移除玩家家园
        this.recycleHome(player.userId);
    }

    /** 初始化玩家的家园 */
    private initHome(userId: string, aliveDay: number) {
        const home = this.emptyHomes.pop();
        if (!home) {
            let index = 0;
            const timer = setInterval(() => {
                index++;
                if (index > 10) {
                    clearInterval(timer);
                    // 这是一个无家可归的倒霉流浪汉
                    console.error(`MyTypeError can not set home  hometMapCount:` + this.homeMap.size);
                    return;
                }
                const home = this.emptyHomes.pop();
                if (home) {
                    clearInterval(timer);
                    console.log("server initHome", userId, home.gameObject.gameObjectId);
                    this.homeMap.set(userId, home);
                    home.ownerId = userId;
                    home.aliveDay = aliveDay;
                    return;
                }
            }, 100);
            return;
        }

        console.log("server initHome", userId, home.gameObject.gameObjectId);
        this.homeMap.set(userId, home);
        home.ownerId = userId;
        home.aliveDay = aliveDay;
    }

    /** 回收玩家的家园 */
    private recycleHome(userId: string) {
        const home = this.homeMap.get(userId);
        if (!home) return;
        this.homeMap.delete(userId);
        home.ownerId = "";
        home.aliveDay = -1;
        this.emptyHomes.push(home);
    }

    public transportPlayerToHome(player: Player, targetUserId: string) {
        this.getClient(player).transportPlayerToHome(player, targetUserId);
    }
}

