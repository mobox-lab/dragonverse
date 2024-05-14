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
import { StatisticModuleS } from "../statistic/StatisticModule";
import Log4Ts from "../../depend/log4ts/Log4Ts";

export class OnlineModuleS extends ModuleS<OnlineModuleC, OnlineModuleData> {

    private _statisticModuleS: StatisticModuleS;

    private get statisticModuleS(): StatisticModuleS | null {
        if (!this._statisticModuleS) this._statisticModuleS = ModuleService.getModule(StatisticModuleS);
        return this._statisticModuleS;
    }

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

    net_requestAccept(id: number) {
        let cfg = GameConfig.TimeReward.getElement(id);
        if (!cfg) {
            Log4Ts.warn(OnlineModuleS, `reward not exist. config id: ${id}`);
            return;
        }
        if (cfg.Time >
            (this.statisticModuleS.getPlayerData(this.currentPlayerId)?.playerTodayOnlineTime ?? 0)) {
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
        let arr = cfg.RewardArr;
        let type = this.judgeGold(playerId);
        let tipsArr: number[] = [];
        let rewardCount: number[] = [];

        if (arr[0]) {
            this.playerModuleS.addGold(playerId, arr[0], type);
            tipsArr.push(267);
            rewardCount.push(arr[0]);
        }
        if (arr[1]) {
            this.playerModuleS.addDiamond(playerId, arr[1]);
            tipsArr.push(268);
            rewardCount.push(arr[1]);
        }
        if (arr[2]) {
            let arrAtk = GameConfig.PetARR.getElement(arr[2]).PetAttack;
            let atk = 0;
            if (arrAtk.length > 1)
                atk = utils.GetRandomNum(arrAtk[0], arrAtk[1]);
            else
                atk = arrAtk[0];
            let nameId = utils.GetRandomNum(1, 200);
            let name = GameConfig.Language.getElement(nameId).Value;
            ModuleService.getModule(PetBagModuleS).addPet(playerId, arr[2], atk, name);
            tipsArr.push(269);
            rewardCount.push(0);
        }
        if (arr[3]) {
            this.playerModuleS.addGold(playerId, arr[3], GlobalEnum.CoinType.SummerGold);
            tipsArr.push(766);
            rewardCount.push(0);
        }

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