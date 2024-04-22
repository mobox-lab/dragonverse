import { oTraceError } from "../../util/LogManager";
import { PlayerModuleC } from "../Player/PlayerModuleC";
import { PlayerModuleS } from "../Player/PlayerModuleS";




export class PlayerNameManager {

    private static _instance: PlayerNameManager;
    public static get instance(): PlayerNameManager {
        if (!this._instance) {
            this._instance = new PlayerNameManager();
        }
        return this._instance;
    }

    private _playerNameMap: Map<number, string> = new Map<number, string>();


    /**add玩家名字 */
    public addPlayerName(playerID: number, name: string) {

        this._playerNameMap.set(playerID, name);
    }


    /**获取玩家名字 */
    public async getPlayerName(playerID: number): Promise<string> {
        if (this._playerNameMap.has(playerID))
            return this._playerNameMap.get(playerID);
        // map中无玩家名
        let player = await Player.asyncGetPlayer(playerID);
        if (!player) {
            oTraceError('lwj getPlayerName ' + playerID + " 没有名字");
            return "三七";
        }
        let cName = player.character.displayName;
        if (cName) {
            console.warn("map中获取失败, 获取到玩家人物名称为: " + cName);
            return cName;
        }
        oTraceError('lwj getPlayerName ' + playerID + " 没有名字");
        return "三七";

    }


    /**异步获取玩家名字(如果map获取不到则重新获取并添加到map) */
    public async getPlayerNameAsync(playerID: number): Promise<string> {
        let name = null;
        let player = (await Player.asyncGetPlayer(playerID))
        if (!player) {
            console.error("获取不到玩家 " + playerID);
            return "233";
        }
        let cName = player.character.displayName;
        // 如果可以获取到玩家的名称直接返回玩家名称
        // map里有
        if (this._playerNameMap.has(playerID)) {
            console.log("map中成功获取到玩家名");
            return this._playerNameMap.get(playerID);
        }
        // map里没有
        if (cName) {
            this._playerNameMap.set(playerID, cName);
            return cName;
        } else {
            console.error("获取不到character名 " + playerID);
        }

        // 获取不到玩家名重新获取
        if (SystemUtil.isClient()) {
            name = await ModuleService.getModule(PlayerModuleC).getPlayerNameById(playerID);
        } else {
            name = await ModuleService.getModule(PlayerModuleS).net_getPlayerNameById(playerID);
        }
        if (name) {
            this._playerNameMap.set(playerID, name);
            return name;
        }
        // 怎么也获取不到
        console.error("获取失败!!" + playerID);
        return "233";
    }


    /**删除玩家名字 */
    public removePlayerName(playerID: number) {
        this._playerNameMap.delete(playerID);
    }


    /**清空map */
    public clearMap() {
        this._playerNameMap.clear();
    }



}