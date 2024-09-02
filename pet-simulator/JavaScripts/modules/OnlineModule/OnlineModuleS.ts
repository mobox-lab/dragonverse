import Log4Ts from "mw-log4ts";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { numberArrToString, utils } from "../../util/uitls";
import { AreaModuleData } from "../AreaDivide/AreaModuleData";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import { StatisticModuleS } from "../statistic/StatisticModule";
import { OnlineModuleC } from "./OnlineModuleC";
import { OnlineModuleData } from "./OnlineModuleData";

export class OnlineModuleS extends ModuleS<OnlineModuleC, OnlineModuleData> {

    private _statisticModuleS: StatisticModuleS;

    private get statisticModuleS(): StatisticModuleS | null {
        if (!this._statisticModuleS) this._statisticModuleS = ModuleService.getModule(StatisticModuleS);
        return this._statisticModuleS;
    }
 
    private _playerModuleS: PlayerModuleS;

    private get playerModuleS(): PlayerModuleS | null {
        if (!this._playerModuleS) this._playerModuleS = ModuleService.getModule(PlayerModuleS);
        return this._playerModuleS;
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.setPlayerOnline(player);
    }

    /** 设置玩家上线 */
    public setPlayerOnline(player: mw.Player) {
        let data = this.getPlayerData(player);
				let curDay = utils.getTodayNumber();
        let curHour = utils.getTodayHour();
     		data.setCurDay(curDay, curHour);
    }

    net_requestAccept(id: number) { 
        let cfg = GameConfig.TimeReward.getElement(id);
        if (!cfg) {
            Log4Ts.warn(OnlineModuleS, `reward not exist. config id: ${id}`);
            return;
        } 
        const playerTotalOnlineTime = this.statisticModuleS.getPlayerData(this.currentPlayerId)?.playerTotalOnlineTime
        // console.log('=====net_requestAccept=== playerTotalOnlineTime', playerTotalOnlineTime)
        if (cfg.Time > (playerTotalOnlineTime ?? 0)) {
            Log4Ts.warn(OnlineModuleS, `reward insufficient time requirement`);
            return;
        }
        this.getReward(this.currentPlayerId, id);
    }

    private getReward(playerId: number, id: number) {
        let cfg = GameConfig.TimeReward.getElement(id);
        if (!cfg) {
            Log4Ts.log(OnlineModuleS, `reward not exist. config id: ${id}`);
            return;
        }
        this.currentData.addHasGet(id);
        const arr = cfg.RewardArr;
        const type = this.judgeGold(playerId);
        const tipsArr: number[] = [];
        const rewardCount: number[] = [];
        const logRewardCountArr: number[] = [0, 0];
        const userId = Player.getPlayer(playerId)?.userId ?? '';
        if (arr[0]) {
            this.playerModuleS.addGold(playerId, arr[0], type);
            tipsArr.push(267);
            rewardCount.push(arr[0]);
            logRewardCountArr[0] = arr[0];
        }
        if (arr[1]) {
            this.playerModuleS.addDiamond(playerId, arr[1]);
            tipsArr.push(268);
            rewardCount.push(arr[1]);
            logRewardCountArr[1] = arr[1];
        }
        utils.logP12Info("P_ClaimLoginReward", {
            userId,
            timestamp: Date.now(),
            cfgId: id,
            coinType: type,
            reward: logRewardCountArr,
            // TODO: "claimLoginRewardCount": 4 // 新增赛季总领取登录奖励次数
        });
        this.getClient(playerId).net_showTips(numberArrToString(tipsArr), numberArrToString(rewardCount));

        if (cfg.buff.length == 0) return;
        // this.getClient(playerId).net_getBuff(id);
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