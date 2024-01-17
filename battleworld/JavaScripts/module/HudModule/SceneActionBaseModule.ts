


















/**
 * 角色行为的类型
 */
export enum PlayerActionType {
    Free = 0,//空闲
    Interaction = 1,//和交互物交互
    DoublePeopleAction = 2,//双人动作
    DanceForTwoPeople = 3,//双人舞
    DancePK = 4,//斗舞
    DJ = 5//DJ
}



export class SceneActionBaseModuleC<T extends SceneActionBaseModuleS<any>> extends ModuleC<T, null> {
    private playerActionMap: Map<number, number> = new Map();
    //设置玩家的行为 0-空闲
    net_setPlayerAction(playerId: number, actionType: number) {
        if (actionType == 0) {
            this.playerActionMap.delete(playerId);
        } else {
            this.playerActionMap.set(playerId, actionType);
        }
    }
    /**
     * 判断一个player是否繁忙
     * @param player 玩家
     * @returns true-繁忙 false-空闲
     */
    public playerIsBusy(player: mw.Player | number): boolean {
        let playerId: number = (player instanceof mw.Player) ? player.playerId : player;
        return this.playerActionMap.has(playerId);
    }
}



export class SceneActionBaseModuleS<T extends SceneActionBaseModuleC<any>> extends ModuleS<T, null> {
    private playerActionMap: Map<number, number> = new Map();//玩家当前的行为类型
    onStart(): void {

    }
    onPlayerLeft(player: mw.Player): void {

        let pId = player.playerId;

        if (this.playerActionMap.has(pId)) {
            this.playerActionMap.delete(pId);
        }

        this.getAllClient().net_setPlayerAction(player.playerId, 0);//0是空闲
    }

    /**
     * 设置一个player行为状态
     * @param player 玩家
     * @param actionType 行为类型 0-空闲
     */
    public setPlayerAction(player: mw.Player | number, actionType: number) {
        let playerId: number = (player instanceof mw.Player) ? player.playerId : player;
        if (actionType == 0) {
            if (this.playerActionMap.has(playerId)) {
                this.playerActionMap.delete(playerId);
                this.getAllClient().net_setPlayerAction(playerId, actionType);
            }
        } else {
            if (!this.playerActionMap.has(playerId)) {
                this.playerActionMap.set(playerId, actionType);
                this.getAllClient().net_setPlayerAction(playerId, actionType);
            } else {
                console.error("玩家处于另一个Action type=" + this.playerActionMap.get(playerId));
            }
        }
    }
    /**
     * 判断一个player是否繁忙
     * @param player 玩家
     * @returns true-繁忙 false-空闲
     */
    public playerIsBusy(player: mw.Player | number): boolean {
        let playerId: number = (player instanceof mw.Player) ? player.playerId : player;
        return this.playerActionMap.has(playerId);
    }

}



export class SceneActionModuleS extends SceneActionBaseModuleS<SceneActionModuleC> {
    onStart(): void {
        // for (let [playerId, player] of this.enterGameplayerMap) {
        //     SceneObjManager.instance.add      
        // }
    }

}

export class SceneActionModuleC extends SceneActionBaseModuleC<SceneActionModuleS> {
    onStart(): void {
        super.onStart();

    }
}
