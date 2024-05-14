import { OnlineModuleC } from "./OnlineModuleC";
import { OnlineModuleData } from "./OnlineModuleData";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import { GameConfig } from "../../config/GameConfig";
import { PetBagModuleS } from "../PetBag/PetBagModuleS";
import { numberArrToString, utils } from "../../util/uitls";
import { RewardState } from "./P_RewardPanel";
import { GlobalEnum } from "../../const/Enum";
import { oTraceError } from "../../util/LogManager";
import { AreaModuleData } from "../AreaDivide/AreaModuleData";

export class OnlineModuleS extends ModuleS<OnlineModuleC, OnlineModuleData> {

    /**玩家在线时间Map */
    private playerOnlineTimeMap: Map<number, number> = new Map();

    private _playerModuleS: PlayerModuleS;

    private get playerModuleS(): PlayerModuleS | null {
        if (!this._playerModuleS) this._playerModuleS = ModuleService.getModule(PlayerModuleS);
        return this._playerModuleS;
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.startOnlineTime(player);
        this.setPlayerOnline(player);
    }

    protected onPlayerLeft(player: mw.Player): void {
        try {
            this.stopOnlineTime(player);
        } catch (error) {
            oTraceError(error);
        }
    }

    /** 开始计时玩家在线时间 */
    private startOnlineTime(player: mw.Player) {
        let id = player.playerId;
        let nowTime = TimeUtil.elapsedTime();

        if (!this.playerOnlineTimeMap.has(id)) {
            this.playerOnlineTimeMap.set(id, nowTime);
        }
    }

    /** 停止计时玩家在线时间 */
    private stopOnlineTime(player: mw.Player) {
        let id = player.playerId;
        let data = this.getPlayerData(player);
        let nowTime = TimeUtil.elapsedTime();

        if (this.playerOnlineTimeMap.has(id)) {
            let startTime = this.playerOnlineTimeMap.get(id);
            let onlineTime = nowTime - startTime;
            this.playerOnlineTimeMap.delete(id);
            data.addOnlineTime(onlineTime);
            console.log("lwj  玩家退出 游玩时间：" + onlineTime);
        }
    }

    /** 设置玩家上线 */
    public setPlayerOnline(player: mw.Player) {
        let data = this.getPlayerData(player);

        let curDay = utils.getTodayNumber();
        let curHour = utils.getTodayHour();

        if (curDay > data.curLoginTime) {  //新的一天
            if (data.curLoginHour < 4 || curHour > 4) {
                data.setCurDay(curDay, curHour, true);
                this.playerModuleS.addGold(player.playerId, 1, GlobalEnum.CoinType.SummerGold);
                return;
            }
            data.setCurDay(curDay, curHour, false);
        } else {  //不是新的一天
            if (data.curLoginHour < 4 && curHour >= 4) {
                data.setCurDay(curDay, curHour, true);
                return;
            }
            data.setCurDay(curDay, curHour, false);
        }
    }

    // net_StateChange(id: number, state: RewardState) {
    //     switch (state) {
    //         case RewardState.canReward:
    //             this.currentData.addWaitGet(id);
    //             break;
    //         case RewardState.rewarded:
    //             this.currentData.addHasGet(id);
    //             this.getReward(this.currentPlayerId, id);
    //             // ModuleService.getModule(PassModuleS).onTaskUpdateAC.call(
    //             //   this.currentPlayerId, GlobalEnum.VipTaskType.OnlineTime, id);
    //             break;
    //         default:
    //             break;
    //
    //     }
    // }

    net_requestAccept(id: number) {

    }

    //判断金币类型
    private judgeGold(playerId: number) {
        let level = DataCenterS.getData(playerId, AreaModuleData).getAreaDataById(2001);
        if (level > 1)
            return GlobalEnum.CoinType.SecondWorldGold;
        else
            return GlobalEnum.CoinType.FirstWorldGold;
    }
}