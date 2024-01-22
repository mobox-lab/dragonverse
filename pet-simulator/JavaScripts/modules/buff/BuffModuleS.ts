import { MapEx, oTraceError } from "odin";
import { GlobalEnum } from "../../const/Enum";
import { BuffData } from "./BuffData";
import { BuffModuleC } from "./BuffModuleC";
import { GlobalData } from "../../const/GlobalData";

// 玩家buff计时 服务端用
class Timer {
    public constructor(
        public playerId: number,
        public buffs: GlobalEnum.BuffType[],
        public time: number = 1
    ) { }
}

export class BuffModuleS extends ModuleS<BuffModuleC, BuffData> {

    // 玩家计时器
    private playerTimer: Map<number, Timer> = new Map();

    onPlayerEnterGame(player: mw.Player): void {
        let playerId = player.playerId;
        let data = this.getPlayerData(player);
        let buffs: GlobalEnum.BuffType[] = [];
        let times: number[] = [];

        MapEx.forEach(data.buffInfo, (type: GlobalEnum.BuffType) => {
            this.addBuffTimer(playerId, type);
            buffs.push(Number(type));
            times.push(MapEx.get(data.buffInfo, type));
        });

        if (MapEx.count(data.buffInfo) > 0) {
            this.getClient(playerId).net_addPlayerBuff(buffs, times);
        }

        // this.giveBuff(playerId);  // 暂时去掉每日奖励赠送buff
    }

    onUpdate(dt: number): void {
        this.playerBuffTimerUpdate(dt);
    }

    onPlayerLeft(player: mw.Player): void {
        try {
            let playerId = player.playerId;
            let data = this.getPlayerData(playerId);
            this.playerTimer.delete(playerId);
            if (data == null) {
                oTraceError("BuffModuleS.onPlayerLeft: data is null  ", playerId, player.userId);
                return;
            }
            data.stamp = Date.now();
            data.save(false);
        } catch (error) {
            oTraceError(error);
        }

    }

    /**
     * 玩家buff计时器
     */
    private playerBuffTimerUpdate(dt: number) {
        for (let [playerId, timer] of this.playerTimer) {
            timer.time -= dt;
            if (timer.time <= 0) {
                timer.time = 1;
                let data = this.getPlayerData(playerId);
                if (data == null) continue;
                for (let type of timer.buffs) {
                    if (!MapEx.has(data.buffInfo, type)) continue;
                    let cur = MapEx.get(data.buffInfo, type);
                    MapEx.set(data.buffInfo, type, cur - 1);
                }
            }
        }
    }

    /**
     * 增加一个buff
     */
    public net_addBuff(type: GlobalEnum.BuffType, time: number) {
        this.addBuffTimer(this.currentPlayerId, type);
        this.currentData.setBuffStamp(type, time);
    }

    /**
     * 增加buff时间
     */
    public net_addBuffTime(type: GlobalEnum.BuffType, addTime: number) {
        let time = this.currentData.getBuffTime(type);
        if (time == null) return;
        this.currentData.setBuffStamp(type, time + addTime);
    }

    public addBuff(playerId: number, type: GlobalEnum.BuffType, time: number) {
        let timer = this.playerTimer.get(playerId);
        let data = this.getPlayerData(playerId);
        if (timer == null) {
            timer = new Timer(playerId, [Number(type)]);
            this.playerTimer.set(playerId, timer);
        } else {
            if (!timer.buffs.includes(Number(type)))
                timer.buffs.push(Number(type));
        }
        let ishas = data.getBuffTime(type);
        if (ishas == null) {
            data.setBuffStamp(type, time);
        } else {

            data.setBuffStamp(type, ishas + time);
        }
        this.getClient(playerId).net_addPlayerBuff([type], [data.getBuffTime(type)]);
    }


    /**
     * 移除buff
     */
    public net_removeBuff(type: GlobalEnum.BuffType) {
        if (this.playerTimer.has(this.currentPlayerId)) {
            let timer = this.playerTimer.get(this.currentPlayerId);
            let index = timer.buffs.indexOf(Number(type));
            if (index != -1) {
                timer.buffs.splice(index, 1);
            }
        }
        this.currentData.removeBuff(type);
    }

    /**
     * 增加buff-Timer
     */
    private addBuffTimer(playerId: number, type: GlobalEnum.BuffType) {
        let timer = this.playerTimer.get(playerId);
        if (timer == null) {
            timer = new Timer(playerId, [Number(type)]);
            this.playerTimer.set(playerId, timer);
        } else {
            if (timer.buffs.includes(Number(type))) return;
            timer.buffs.push(Number(type));
        }
    }

    /**
     * 进入游戏赠送buff
     */
    private giveBuff(playerId: number) {
        if (this.checkBuffTime(playerId) == false) return;

        let dailyBuff = GlobalData.Buff.dailyBuff;
        let data = this.getPlayerData(playerId);
        for (let i = 0; i < dailyBuff.length; i++) {
            this.addBuffTimer(playerId, dailyBuff[i]);
            if (MapEx.has(data.buffInfo, dailyBuff[i])) {
                let cur = MapEx.get(data.buffInfo, dailyBuff[i]);
                MapEx.set(data.buffInfo, dailyBuff[i], cur + GlobalData.Buff.dailyBuffTime[i]);
            } else {
                MapEx.set(data.buffInfo, dailyBuff[i], GlobalData.Buff.dailyBuffTime[i]);
            }
        }
        data.save(true);
        this.getClient(playerId).net_addPlayerBuff(GlobalData.Buff.dailyBuff, GlobalData.Buff.dailyBuffTime);
    }

    /**
     * 检测上次离开游戏的时间距离现在是否超过过了一天以上
     */
    private checkBuffTime(playerId: number) {
        let data = this.getPlayerData(playerId);
        if (data.stamp == -1) return true;
        let now = new Date();
        let stamp = new Date(data.stamp);
        // 距离现在是否过了一年
        let isYear = now.getFullYear() > stamp.getFullYear();
        // 距离现在是否过了一个月
        let isMonth = now.getMonth() > stamp.getMonth();
        // 距离现在是否过了两天
        let isDay = now.getDate() > stamp.getDate() + 1;
        // 距离现在过了一天并且现在过了凌晨四点
        let isFour = now.getHours() >= 4 && now.getDate() > stamp.getDate();
        return isYear || isMonth || isDay || isFour;
    }

    /**
     * 获取buff信息
     */
    public net_getBuff(): any {
        if (this.currentData == null) return "";
        return this.stringify(this.currentData.buffInfo);
    }

    /**
     * 格式化
     */
    private stringify(buffInfo: MapEx.MapExClass<number>) {
        let res: string = "";
        MapEx.forEach(buffInfo, (type: GlobalEnum.BuffType, time: number) => {
            res = res.concat(type + ":" + time + "|");
        });
        return res;
    }
}