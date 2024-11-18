import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { addGMCommand } from "mw-god-mod";
import { TipsManager } from "../../UI/Tips/CommonTipsManagerUI";

dayjs.extend(utc);

/**
 * 定时调用的参数数据结构
 */
class PeriodItem {
    /**
     * 构造函数
     * @param periodCount 调用次数
     * @param periodMinute 每隔多久调用一次，单位分钟
     * @param actionDate Action1<number>
     * @param fn 回调
     * @param thisArg 参数
     */
    constructor(
        public periodCount: number,
        public periodMinute: number,
        public actionDate: Action1<number>,
        public fn: (a: number) => void,
        public thisArg: any
    ) {}
}

/**
 * 提取的公共部分作为接口
 */
interface ITimerModule {
    /** 定时器回调map */
    readonly onTimerMap: Map<string, Array<PeriodItem>>;
    /** 天刷新调用 */
    readonly onDayRefresh: Action1<number>;
    /** 时刷新调用 */
    readonly onHourRefresh: Action1<number>;
    /** 分刷新调用 */
    readonly onMinuteRefresh: Action1<number>;
    /** 上一次的时间 */
    lastTime: number;
    /** 记录了上一个小时 */
    lastHour: number;
}

/**
 * 提供的对外的函数，不建议直接操作TimerModuleC或者TimerModuleS
 */
export namespace TimerModuleUtils {
    /**
     * 获取玩家最后一次登录时间
     * @param playerId 玩家id，服务端需要填写，客户端保持默认
     * @returns 最后一次登录时间
     */
    export function getLastTimeStamp(playerId: number = -1) {
        if (SystemUtil.isClient()) return ModuleService.getModule(TimerModuleC).getLastTimeStamp();
        return ModuleService.getModule(TimerModuleS).getLastTimeStamp(playerId);
    }

    /**
     * 添加一个监听，玩家进入游戏时是新的一天的客户端回调，与addOnlineDayListener不同的是，该函数只会在刚进入游戏时调用一次，
     * 而addOnlineDayListener会在玩家在线时每次刷新到新一天进行回调
     * @param fn 回调
     * @param thisArg this
     */
    export function addLoginDayListener(fn: (a: number) => void, thisArg?: any): void {
        if (SystemUtil.isClient()) {
            ModuleService.getModule(TimerModuleC).onPlayerEnterSceneIsNewDay.add(fn, thisArg);
        } else if (SystemUtil.isServer()) {
            ModuleService.getModule(TimerModuleS).onPlayerEnterSceneIsNewDay.add(fn, thisArg);
        }
    }

    /**
     * 天刷新
     * @param fn 回调
     * @param thisArg this
     */
    export function addOnlineDayListener(fn: (a: number) => void, thisArg?: any): void {
        if (SystemUtil.isClient()) {
            ModuleService.getModule(TimerModuleC).onDayRefresh.add(fn, thisArg);
        } else if (SystemUtil.isServer()) {
            ModuleService.getModule(TimerModuleS).onDayRefresh.add(fn, thisArg);
        }
    }

    /**
     * 时刷新
     * @param fn 回调
     * @param thisArg this
     */
    export function addHourListener(fn: (a: number) => void, thisArg?: any): void {
        if (SystemUtil.isClient()) {
            ModuleService.getModule(TimerModuleC).onHourRefresh.add(fn, thisArg);
        } else if (SystemUtil.isServer()) {
            ModuleService.getModule(TimerModuleS).onHourRefresh.add(fn, thisArg);
        }
    }

    /**
     * 分刷新
     * @param fn 回调
     * @param thisArg this
     */
    export function addMinuteListener(fn: (a: number) => void, thisArg?: any): void {
        console.error(`rkc--------------是否是客户端：${SystemUtil.isClient()}`);
        if (SystemUtil.isClient()) {
            ModuleService.getModule(TimerModuleC).onMinuteRefresh.add(fn, thisArg);
        } else if (SystemUtil.isServer()) {
            ModuleService.getModule(TimerModuleS).onMinuteRefresh.add(fn, thisArg);
        }
    }

    /**
     * 移除天刷新
     * @param fn 回调
     * @param thisArg this
     */
    export function removeDayListener(fn: (a: number) => void, thisArg?: any): void {
        if (SystemUtil.isClient()) {
            ModuleService.getModule(TimerModuleC).onDayRefresh.remove(fn, thisArg);
        } else if (SystemUtil.isServer()) {
            ModuleService.getModule(TimerModuleS).onDayRefresh.remove(fn, thisArg);
        }
    }

    /**
     * 移除时刷新
     * @param fn 回调
     * @param thisArg this
     */
    export function removeHourListener(fn: (a: number) => void, thisArg?: any): void {
        if (SystemUtil.isClient()) {
            ModuleService.getModule(TimerModuleC).onHourRefresh.remove(fn, thisArg);
        } else if (SystemUtil.isServer()) {
            ModuleService.getModule(TimerModuleS).onHourRefresh.remove(fn, thisArg);
        }
    }

    /**
     * 移除分刷新
     * @param fn 回调
     * @param thisArg this
     */
    export function removeMinuteListener(fn: (a: number) => void, thisArg?: any): void {
        if (SystemUtil.isClient()) {
            ModuleService.getModule(TimerModuleC).onMinuteRefresh.remove(fn, thisArg);
        } else if (SystemUtil.isServer()) {
            ModuleService.getModule(TimerModuleS).onMinuteRefresh.remove(fn, thisArg);
        }
    }

    /**
     * 添加到定时器，当到了指定时间后，会调用回调函数
     * @param year 年
     * @param month 月
     * @param day 日
     * @param hour 时
     * @param minute 分
     * @param fn 回调函数
     * @param thisArg 参数
     * @param periodCount 周期次数，1表示无限按照周期循环；其他正整数表示周期执行次数
     * @param periodMinute 周期，单位为分
     */
    export function addTimer(
        year: number,
        month: number,
        day: number,
        hour: number,
        minute: number,
        fn: (a: number) => void,
        thisArg: any = null,
        periodCount: number = 1,
        periodMinute: number = 0
    ): void {
        const timerModule = SystemUtil.isServer()
            ? ModuleService.getModule(TimerModuleS)
            : ModuleService.getModule(TimerModuleC);
        const key = `${year}-${month}-${day} ${hour}:${minute}`;
        let acts = timerModule.onTimerMap.get(key);
        if (!acts) {
            acts = [];
            timerModule.onTimerMap.set(key, acts);
        }
        let act = new PeriodItem(periodCount, periodMinute, new Action1<number>(), fn, thisArg);
        act.actionDate.add(fn, thisArg);
        acts.push(act);
    }

    /**
     * 检查是否有可用的定时器，如果有的话，则进行调用通知
     * @param timerModule ITimerModule
     * @param nowTime number
     */
    export function checkTimer(timerModule: ITimerModule, nowTime: number): void {
        console.log("#minute onMinuteRefresh init lastHour:" + timerModule?.lastHour + " lastTime:" + timerModule?.lastTime + " nowTime:" + nowTime);
        const nowDate = dayjs.utc(nowTime);
        const nowHour = nowDate.hour();
        //借用分钟改变的回调判断小时刷新
        if (timerModule.lastHour == null) {
            timerModule.lastHour = nowHour;
        }
        if (nowHour != timerModule.lastHour) {
            //小时改变
            timerModule.lastHour = nowHour;
            timerModule.onHourRefresh.call(nowTime);// 会在里面设置 lastTime
        } else timerModule.lastTime = nowTime;
        console.log("#minute onMinuteRefresh after lastHour:" + timerModule?.lastHour + " lastTime:" + timerModule?.lastTime + " nowTime:" + nowTime);
        //处理定时器相关内容
        const key = nowDate.format('YYYY-M-D H:m');
        let acts = timerModule.onTimerMap.get(key);
        timerModule.onTimerMap.delete(key);
        if (!acts) return; 
        for (let i = 0; i < acts.length; i++) {
            const act = acts[i];
            if (!act) continue;
            act.actionDate.call(nowTime);

            //检查周期次
            let nextCallDate: dayjs.Dayjs | null = null;
            if (act.periodCount == -1 || --act.periodCount > 0) {
                //添加下一个周期时间
                nextCallDate = dayjs.utc(nowTime + 1000 * 60 * act.periodMinute);
            }
            if (nextCallDate) {
                //添加下一个周期的执行时间
                addTimer(
                    nextCallDate.year(),
                    nextCallDate.month(),
                    nextCallDate.date(),
                    nextCallDate.hour(),
                    nextCallDate.minute(),
                    act.fn,
                    act.thisArg,
                    act.periodCount,
                    act.periodMinute
                );
            }
        }
    }
    /**
     * 判断 newTime 是否为新的一天
     * @param oldTime 旧的时间
     * @param newTime 新的时间
     * @returns 是否是新的一天
     */
    export function judgeIsNewDay(oldTime: number, newTime: number, utcHour = 10): boolean {
        // if (!oldTime || !newTime) return false;

        // // oldTime 和 newTime 都为 UTC 时间戳
        // const oldDate = dayjs.utc(oldTime);
        // const newDate = dayjs.utc(newTime);

        // // 直接比较两个时间的小时数是否不同
        // const oldHour = oldDate.hour();
        // const newHour = newDate.hour();

        // console.log("#judge judgeNewHour oldTime:", oldTime, " newTime:", newTime, " oldHour:", oldHour, " newHour:", newHour);

        // // 如果 newHour 和 oldHour 不同，意味着已经跨越新的一小时
        // return newHour !== oldHour;
        // // TODO: 先改成每小时重置方便测试

        if (!oldTime || !newTime) return false;
        // oldTime 和 newTime 都为 UTC 时间戳
        const oldDate = dayjs.utc(oldTime);
        const newDate = dayjs.utc(newTime);
    
        console.log("#judge judgeNewDay oldTime:", oldTime, " newTime:", newTime);
        
        if(!oldDate.isBefore(newDate)) return false; // 不可能 容错处理
       
        const isSameDay = oldDate.date() === newDate.date();
        if(isSameDay)
            return oldDate.hour() < utcHour && newDate.hour() >= utcHour

        // is not same day
        if(oldDate.diff(newDate, 'd') > 1) return true;
        
        // 昨天和今天
        if(oldDate.hour() >= utcHour && newDate.hour() < utcHour) return false;
        
        return true;
    }

    //=====================================================工具函数==========================================================
}
/**
 * 时间管理模块的客户端，在客户端需要感知时间相关的内容时用到，其时间由服务端下发
 */
export class TimerModuleC extends ModuleC<TimerModuleS, TimerModuleData> implements ITimerModule {
    /** 玩家登录游戏后进入后是新的一天，客户端侧会调用 */
    public readonly onPlayerEnterSceneIsNewDay: Action1<number> = new Action1();

    /** 天刷新调用 */
    public readonly onDayRefresh: Action1<number> = new Action1<number>();
    /** 时刷新调用 */
    public readonly onHourRefresh: Action1<number> = new Action1<number>();
    /** 分刷新调用 */
    public readonly onMinuteRefresh: Action1<number> = new Action1<number>();

    /** 定时器回调map */
    public readonly onTimerMap: Map<string, Array<PeriodItem>> = new Map();

    /** 上一次的时间 */
    public lastTime: number;
    /** 记录了上一个小时 */
    public lastHour: number;

    /**
     * 初始化，添加时间刷新的监听
     */
    protected onStart(): void {
        this.onMinuteRefresh.add(this.onMinuteChanged, this);
        this.onHourRefresh.add(this.onHourChanged, this);
        this.onDayRefresh.add(this.onDayChanged, this);
    }

    /**
     * 初始化，让服务器检查是否是新的一天
     * @param sceneType sceneType
     */
    protected onEnterScene(sceneType: number): void {
        //延迟一会是保证其它模块已经监听完毕
        setTimeout(async () => {
            const { isNewDay, lastTimeStamp } = await this.server.net_setLastTimestampIfFirst();
            console.error('#time TimerModuleC onEnterScene isNewDay:' + isNewDay + ' lastTimeStamp:' + lastTimeStamp, ' this.lastTime' + this.lastTime);
            this.lastTime = lastTimeStamp;
            if (isNewDay) {
                this.onPlayerEnterSceneIsNewDay.call(this.localPlayerId);
                //触发一次后就可以清空了
                this.onPlayerEnterSceneIsNewDay.clear();
                console.error(`#time rkc----TimerModuleC新的一天了`);
            } else {
                console.error(`#time rkc----TimerModuleC同一天`);
            }
        }, 3000);
    }

    /**
     * 分钟改变进行调用
     * @param nowDate 当前时间
     */
    private onMinuteChanged(nowTime: number): void {
        TimerModuleUtils.checkTimer(this, nowTime);
    }

    /**
     * 小时改变进行调用
     * @param nowDate 当前时间
     */
    private onHourChanged(nowTime: number): void {
        //利用小时改变的回调判断天刷新
        const isNewDay = TimerModuleUtils.judgeIsNewDay(this.lastTime, nowTime);
        console.log("#time TimerModuleC onHourChanged isNewDay:" + isNewDay + " lastTime:" + this.lastTime + " nowTime:" + nowTime);
        if (isNewDay) this.onDayRefresh.call(nowTime);
        this.lastTime = nowTime; 
    }

    /**
     * 天改变进行调用
     * @param nowDate 当前时间
     */
    private onDayChanged(nowTime: number): void {}

    /**
     * 服务器调用刷新
     * @param serverTime 当前服务器的时间
     */
    public net_refresh(serverTime: number): void {
        console.error(`#time net_refresh serverTime: ${serverTime}`);
        this.onMinuteRefresh.call(serverTime);
    }

    /**
     * 获取最后一次登录时间
     * @returns 最后一次登录时间
     */
    public getLastTimeStamp(): number {
        return this.data.lastTimeStamp;
    }
}

/**
 * 时间管理模块的服务端，时间的改动是这里处理，并告知给客户端让其感知，同时也提供一些action用于服务端的监听
 */
export class TimerModuleS extends ModuleS<TimerModuleC, TimerModuleData> implements ITimerModule {
    /** 玩家登录游戏后进入后是新的一天，服务端侧调用，参数指进入的玩家 */
    public readonly onPlayerEnterSceneIsNewDay: Action1<number> = new Action1<number>();

    /** 天刷新调用，不用和C端抽取出去，S端可以扩展出更精细化的时间控制 */
    public readonly onDayRefresh: Action1<number> = new Action1<number>();
    /** 时刷新调用 */
    public readonly onHourRefresh: Action1<number> = new Action1<number>();
    /** 分刷新调用 */
    public readonly onMinuteRefresh: Action1<number> = new Action1<number>();
    /** 定时器回调map */
    public readonly onTimerMap: Map<string, Array<PeriodItem>> = new Map();
    /** 30s刷新一次 */
    private _refreshTime: number = 30;
    /** 当前计时 */
    private _curTime: number = this._refreshTime;

    /** 上一个日期 */
    private _lastTempTime: number = null;
    
    /** 上一次的时间 */
    public lastTime: number = null;
    /** 上一个小时 */
    public lastHour: number = null;

    /**
     * 添加Action
     */
    protected onStart(): void {
        this.onMinuteRefresh.add(this.onMinuteChanged, this);
        this.onHourRefresh.add(this.onHourChanged, this);
        this.onDayRefresh.add(this.onDayChanged, this);
    }

    /**
     * 处理时间流逝，决定是否进行通知
     * @param dt 帧间隔
     */
    protected onUpdate(dt: number): void {
        this._curTime -= dt;
        if (this._curTime <= 0) {
            this._curTime = this._refreshTime;
            const preDate = dayjs.utc(this._lastTempTime)
            const nowDate = dayjs.utc()
            const nowTime = nowDate.valueOf();
            if (nowDate.minute() !== preDate.minute()) {
                //保证在一分钟内只调用一次
                this.refresh(nowTime);
            }
            this._lastTempTime = nowTime;
        }
    }

    /**
     * 刷新时间，按分刷新，也就是说一分钟内只会调用一次
     * @param nowDate 刷新时间
     */
    private refresh(nowTime: number): void {
        // console.error(`rkc----refresh: ${nowDate}`);
        //每分钟改变进行调用
        this.onMinuteRefresh.call(nowTime);
        this.getAllClient().net_refresh(nowTime);
    }

    /**
     * 分钟改变进行调用
     * @param nowDate 当前时间
     */
    private onMinuteChanged(nowTime: number): void {
        TimerModuleUtils.checkTimer(this, nowTime);
    }

    /**
     * 小时改变进行调用
     * @param nowDate 当前时间
     */
    private onHourChanged(nowTime: number): void {
        //利用小时改变的回调判断天刷新 
        const isNewDay = TimerModuleUtils.judgeIsNewDay(this.lastTime, nowTime)
        console.log("#time TimerModuleS onHourChanged isNewDay:" + isNewDay + " lastTime:" + this.lastTime + " nowTime:" + nowTime);
        if (isNewDay) this.onDayRefresh.call(nowTime);
        this.lastTime = nowTime;
    }

    /**
     * 天改变进行调用
     * @param nowDate 当前时间
     */
    private onDayChanged(nowTime: number): void {
        // console.log("#hour onDayChanged date:", nowDate);
        //对在线的玩家主动更新一下数据，避免已经跨天后因为lastTimeStamp没有更新而导致当前上线再次触发新一天登录的逻辑，不在线的玩家在新一天登录时会主动调用net_setLastTimestampIfFirst来进行数据处理
        Player.getAllPlayers().forEach((player) => {
            const data = this.getPlayerData(player);
            console.log("#time TimerS onDayChanged call userId:", player.userId + " data:", data?.lastTimeStamp ?? 0);
            if (data) {
                console.log("#time TimerS inside onDayChanged call userId:", player?.userId + " data:", data);
                data.lastTimeStamp = nowTime;
                data.save(true);
            }
        });
    }

    /**
     * 玩家进入游戏后主动调用，用于判断是否是新的一天上号
     * @returns 是否是新的一天登录
     */
    public net_setLastTimestampIfFirst() {
        const nowTime = dayjs.utc().valueOf();
        const oldTime = this.currentData.lastTimeStamp;
        const isNewDay = TimerModuleUtils.judgeIsNewDay(oldTime, nowTime)
        console.log("#time net_setLastTimestampIfFirst nowTime:" + nowTime + " oldTime:" + oldTime + " isNewDay:" + isNewDay);
        this.currentData.lastTimeStamp = nowTime;
        this.currentData.save(true);
        if (isNewDay) {
            //当天第一次登录
            this.onPlayerEnterSceneIsNewDay.call(this.currentPlayerId);
            console.log("#time net_setLastTimestampIfFirst onPlayerEnterSceneIsNewDay called nowTime:" + nowTime + " oldTime:" + oldTime + " isNewDay:" + isNewDay);
            return { isNewDay: true, lastTimeStamp: nowTime };
        }
        return { isNewDay: false, lastTimeStamp: nowTime };
    }

    /**
     * 获取最后一次登录时间
     * @param playerId 玩家id
     * @returns 最后一次登录时间
     */
    public getLastTimeStamp(playerId: number) {
        const data = this.getPlayerData(playerId);
        if (data) {
            return data.lastTimeStamp;
        }
        return null;
    }
}

/**
 * 数据，目前只记录了玩家最后一次上线的时间，用于判断是否是新的一天上号
 */
export class TimerModuleData extends Subdata {
    /** 上一次登录时间 */
    @Decorator.persistence()
    public lastTimeStamp: number = 0;
}

addGMCommand(
    "新的一天",
    "string",
    (value) => {
        ModuleService.getModule(TimerModuleC).onDayRefresh.call(dayjs.utc().valueOf());
    },
    () => {
        ModuleService.getModule(TimerModuleS).onDayRefresh.call(dayjs.utc().valueOf());
    }
);


addGMCommand(
    "Test JudgeIsNewDay",
    "string",
    (value) => {
        let [oldTime, newTime, utcHour] = value
            .trim()
            .split(/[,\s]/)
            .map((v) => Number(v)); 
        const isNewDay = TimerModuleUtils.judgeIsNewDay(oldTime, newTime, utcHour ?? 8);
        TipsManager.showTips(`oldTime ${oldTime} newTime ${newTime} oldDate:${dayjs(oldTime).format()} newDate:${dayjs(newTime).format()} utcHour:${utcHour ?? 8}  isNewDay:${isNewDay}`);
    },
);
