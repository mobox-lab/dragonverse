import { GtkTypes } from "gtoolkit";
import { addGMCommand } from "mw-god-mod";

/**
 * 定时调用的参数数据结构
 */
class PeriodItem {
    /**
     * 构造函数
     * @param periodCount 调用次数
     * @param periodMinute 每隔多久调用一次，单位分钟
     * @param actionDate Action1<Date>
     * @param fn 回调
     * @param thisArg 参数
     */
    constructor(
        public periodCount: number,
        public periodMinute: number,
        public actionDate: Action1<Date>,
        public fn: (a: Date) => void,
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
    readonly onDayRefresh: Action1<Date>;
    /** 时刷新调用 */
    readonly onHourRefresh: Action1<Date>;
    /** 分刷新调用 */
    readonly onMinuteRefresh: Action1<Date>;
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
    export function getLastTimeStamp(playerId: number = -1): number {
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
    export function addOnlineDayListener(fn: (a: Date) => void, thisArg?: any): void {
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
    export function addHourListener(fn: (a: Date) => void, thisArg?: any): void {
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
    export function addMinuteListener(fn: (a: Date) => void, thisArg?: any): void {
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
    export function removeDayListener(fn: (a: Date) => void, thisArg?: any): void {
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
    export function removeHourListener(fn: (a: Date) => void, thisArg?: any): void {
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
    export function removeMinuteListener(fn: (a: Date) => void, thisArg?: any): void {
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
        fn: (a: Date) => void,
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
        let act = new PeriodItem(periodCount, periodMinute, new Action1<Date>(), fn, thisArg);
        act.actionDate.add(fn, thisArg);
        acts.push(act);
    }

    /**
     * 检查是否有可用的定时器，如果有的话，则进行调用通知
     * @param timerModule ITimerModule
     * @param date Date
     */
    export function checkTimer(timerModule: ITimerModule, date: Date): void {
        // console.log("#time onMinuteRefresh date:", date + " lastHour:" + timerModule?.lastHour + " lastTime:" + timerModule?.lastTime + " data.getHours:" + date?.getHours());
    
        //借用分钟改变的回调判断小时刷新
        if (timerModule.lastHour == null) {
            timerModule.lastHour = date.getHours();
        }
        if (date.getHours() != timerModule.lastHour) {
            //小时改变
            timerModule.lastHour = date.getHours();
            timerModule.onHourRefresh.call(date);// 会在里面设置 lastTime
        } else timerModule.lastTime = date.getTime();

        //处理定时器相关内容
        const key = `${date.getFullYear()}-${
            date.getMonth() + 1
        }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        let acts = timerModule.onTimerMap.get(key);
        timerModule.onTimerMap.delete(key);
        if (!acts) return; 
        for (let i = 0; i < acts.length; i++) {
            const act = acts[i];
            if (!act) continue;
            act.actionDate.call(date);

            //检查周期次
            let nextCallDate = null;
            if (act.periodCount == -1 || --act.periodCount > 0) {
                //添加下一个周期时间
                nextCallDate = new Date(date.getTime() + 1000 * 60 * act.periodMinute);
            }
            if (nextCallDate) {
                //添加下一个周期的执行时间
                addTimer(
                    nextCallDate.getFullYear(),
                    nextCallDate.getMonth() + 1,
                    nextCallDate.getDate(),
                    nextCallDate.getHours(),
                    nextCallDate.getMinutes(),
                    act.fn,
                    act.thisArg,
                    act.periodCount,
                    act.periodMinute
                );
            }
        }
    }

    /**
     * 判断给定的两个date对象表示的是否是同一分钟内
     * @param date1 date1
     * @param date2 date2
     * @returns 是否相同
     */
    export function dateEquals(date1: Date, date2: Date): boolean {
        if (!date1 || !date2) return false;
        return (
            date1.getFullYear() == date2.getFullYear() &&
            date1.getMonth() == date2.getMonth() &&
            date1.getDate() == date2.getDate() &&
            date1.getHours() == date2.getHours() &&
            date1.getMinutes() == date2.getMinutes()
        );
    }

    /**
     * 判断两个时间戳是否是同一天
     * @param time1 时间戳1
     * @param time2 时间戳2
     * @returns 是否是同一天
     */
    export function judgeSameDay(time1: number, time2: number): boolean {
        const d1 = new Date(time1);
        const d2 = new Date(time2);
        return d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate();
    }

    /**
     * 判断 newTime 是否为新的一天
     * @param oldTime 旧的时间
     * @param newTime 新的时间
     * @returns 是否是新的一天
     */
    export function judgeIsNewDay(oldTime: number, newTime: number): boolean {
        if(!oldTime) return false;
        const ddlDate = new Date(newTime);
        const ddlTime = ddlDate.setUTCHours(8, 0, 0, 0);
        console.log("#judge judgeNewDay oldTime:" + oldTime + " newTime:" + newTime + " ddl:" + ddlTime);
        if (newTime > ddlTime && oldTime < ddlTime) return true;
        else return false;
    }

    //=====================================================工具函数==========================================================

    /**
     * 获取从startTime开始，经过interval时间后的时间
     * @param startTime 开始时间（ms）
     * @param interval 经过的时间（ms）
     * @returns 结果
     */
    export function getNextExpire(startTime: number, interval: number): number {
        // get relative timestamp from the Monday 00:00:00 of the start time to start time
        // const start = startTime - (startTime - 8 * 3600 * 1000) % (7 * 24 * 3600 * 1000);
        let currentTime = Date.now();
        let timeDiff = currentTime - startTime;
        let cycles = Math.ceil(timeDiff / interval);
        return startTime + cycles * interval;
    }

    /**
     * 获取下一天的刷新时间
     * 如果刷新时间是凌晨5点，现在是凌晨4点，则返回的是今日的凌晨5点，否则返回次日的凌晨5点
     * @param time 当前时间
     * @param nextHour 下一天的刷新的小时
     * @param nextMinute 下一天的刷新的分钟
     * @returns Date
     */
    export function getNextDayDate(time: number, nextHour: number, nextMinute: number = 0): Date {
        const date = new Date(time);
        const dayOfWeek = date.getDate();
        const currentTime = date.getTime();

        const nextHourToday = new Date(date.getFullYear(), date.getMonth(), dayOfWeek, nextHour, nextMinute, 0, 0);

        if (currentTime < nextHourToday.getTime()) {
            return nextHourToday;
        }
        //返回次日
        const nexHourTomorrow = new Date(
            date.getFullYear(),
            date.getMonth(),
            dayOfWeek + 1,
            nextHour,
            nextMinute,
            0,
            0
        );
        return nexHourTomorrow;
    }

    /**
     * 获取下一次周刷新的时间
     * 如果刷新时间是周一凌晨5点，现在是周一凌晨4点，则返回的是这周周一的凌晨5点，否则返回下周周一的凌晨5点
     * @param time 需要计算的时间
     * @param nextHour 下一天的刷新的小时
     * @param nextMinute 下一天的刷新的分钟
     * @returns Date
     */
    export function getNextWeekDate(time: number, nextHour: number, nextMinute: number = 0): Date {
        const date = new Date(time);
        let dayOfWeek = date.getDay(); // 0 表示周日，1 表示周一，依此类推
        if (dayOfWeek == 1) {
            const nextDate = new Date(time);
            nextDate.setHours(nextHour, nextMinute);
            if (date.getTime() < nextDate.getTime()) {
                return nextDate;
            }
        }
        if (dayOfWeek == 0) dayOfWeek = 7;
        // 如果当前日期不是周一，则返回下一个周一的指定时间
        date.setDate(date.getDate() + (1 - dayOfWeek + 7)); // 调整日期到下一周的周一
        date.setHours(nextHour, nextMinute, 0, 0); // 设置时间为指定的下一个小时和分钟
        return date;
    }
}

/**
 * 时间管理模块的客户端，在客户端需要感知时间相关的内容时用到，其时间由服务端下发
 */
export class TimerModuleC extends ModuleC<TimerModuleS, TimerModuleData> implements ITimerModule {
    /** 玩家登录游戏后进入后是新的一天，客户端侧会调用 */
    public readonly onPlayerEnterSceneIsNewDay: Action1<number> = new Action1();

    /** 天刷新调用 */
    public readonly onDayRefresh: Action1<Date> = new Action1<Date>();
    /** 时刷新调用 */
    public readonly onHourRefresh: Action1<Date> = new Action1<Date>();
    /** 分刷新调用 */
    public readonly onMinuteRefresh: Action1<Date> = new Action1<Date>();

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
            const newDay = await this.server.net_setLastTimestampIfFirst();
            this.lastTime = this.data.lastTimeStamp;
            if (newDay) {
                this.onPlayerEnterSceneIsNewDay.call(this.localPlayerId);
                //触发一次后就可以清空了
                this.onPlayerEnterSceneIsNewDay.clear();
                // console.error(`rkc----TimerModuleC新的一天了`);
            } else {
                // console.error(`rkc----TimerModuleC同一天`);
            }
        }, 3000);
    }

    /**
     * 分钟改变进行调用
     * @param nowDate 当前时间
     */
    private onMinuteChanged(nowDate: Date): void {
        TimerModuleUtils.checkTimer(this, nowDate);
    }

    /**
     * 小时改变进行调用
     * @param nowDate 当前时间
     */
    private onHourChanged(nowDate: Date): void {
        //利用小时改变的回调判断天刷新
        const isNewDay = TimerModuleUtils.judgeIsNewDay(this.lastTime, nowDate.getTime());
        console.log("#hour TimerModuleC onHourChanged isNewDay:" + isNewDay + " lastTime:" + this.lastTime + " nowTime:" + nowDate.getTime());
        if (isNewDay) this.onDayRefresh.call(nowDate);
        this.lastTime = nowDate.getTime(); 
    }

    /**
     * 天改变进行调用
     * @param nowDate 当前时间
     */
    private onDayChanged(nowDate: Date): void {}

    /**
     * 服务器调用刷新
     * @param serverTime 当前服务器的时间
     */
    public net_refresh(serverTime: number): void {
        this.onMinuteRefresh.call(new Date(serverTime));
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
    public readonly onDayRefresh: Action1<Date> = new Action1<Date>();
    /** 时刷新调用 */
    public readonly onHourRefresh: Action1<Date> = new Action1<Date>();
    /** 分刷新调用 */
    public readonly onMinuteRefresh: Action1<Date> = new Action1<Date>();
    /** 定时器回调map */
    public readonly onTimerMap: Map<string, Array<PeriodItem>> = new Map();
    /** 30s刷新一次 */
    private _refreshTime: number = 30;
    /** 当前计时 */
    private _curTime: number = this._refreshTime;

    /** 上一个日期 */
    private _lastTempDate: Date = null;
    
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
            let nowDate = new Date();
            if (!TimerModuleUtils.dateEquals(this._lastTempDate, nowDate)) {
                //保证在一分钟内只调用一次
                this.refresh(nowDate);
            }
            this._lastTempDate = nowDate;
        }
    }

    /**
     * 刷新时间，按分刷新，也就是说一分钟内只会调用一次
     * @param nowDate 刷新时间
     */
    private refresh(nowDate: Date): void {
        // console.error(`rkc----refresh: ${nowDate}`);
        //每分钟改变进行调用
        this.onMinuteRefresh.call(nowDate);
        this.getAllClient().net_refresh(nowDate.getTime());
    }

    /**
     * 分钟改变进行调用
     * @param nowDate 当前时间
     */
    private onMinuteChanged(nowDate: Date): void {
        TimerModuleUtils.checkTimer(this, nowDate);
    }

    /**
     * 小时改变进行调用
     * @param nowDate 当前时间
     */
    private onHourChanged(nowDate: Date): void {
        //利用小时改变的回调判断天刷新 
        const isNewDay = TimerModuleUtils.judgeIsNewDay(this.lastTime, nowDate.getTime())
        console.log("#hour TimerModuleS onHourChanged isNewDay:" + isNewDay + " lastTime:" + this.lastTime + " nowTime:" + nowDate.getTime());
        if (isNewDay) this.onDayRefresh.call(nowDate);
        this.lastTime = nowDate.getTime();
    }

    /**
     * 天改变进行调用
     * @param nowDate 当前时间
     */
    private onDayChanged(nowDate: Date): void {
        // console.log("#hour onDayChanged date:", nowDate);
        //对在线的玩家主动更新一下数据，避免已经跨天后因为lastTimeStamp没有更新而导致当前上线再次触发新一天登录的逻辑，不在线的玩家在新一天登录时会主动调用net_setLastTimestampIfFirst来进行数据处理
        Player.getAllPlayers().forEach((player) => {
            const data = this.getPlayerData(player);
            if (data) {
                data.lastTimeStamp = nowDate.getTime();
                data.save(true);
            }
        });
    }

    /**
     * 玩家进入游戏后主动调用，用于判断是否是新的一天上号
     * @returns 是否是新的一天登录
     */
    public net_setLastTimestampIfFirst(): boolean {
        const nowDate = new Date();
        const nowTime = nowDate.getTime();
        const oldTime = this.currentData.lastTimeStamp;
        this.currentData.lastTimeStamp = nowTime;
        this.currentData.save(true);
        const isNewDay = TimerModuleUtils.judgeIsNewDay(oldTime, nowTime)
        if (isNewDay) {
            //当天第一次登录
            this.onPlayerEnterSceneIsNewDay.call(this.currentPlayerId);
            // console.error(`rkc----玩家${this.currentPlayerId}新的一天登录`);
            return true;
        }
        // console.error(`rkc----玩家${this.currentPlayerId}同一天登录`);
        return false;
    }

    /**
     * 获取最后一次登录时间
     * @param playerId 玩家id
     * @returns 最后一次登录时间
     */
    public getLastTimeStamp(playerId: number): number {
        const data = this.getPlayerData(playerId);
        if (data) {
            return data.lastTimeStamp;
        }
        return -1;
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
        ModuleService.getModule(TimerModuleC).onDayRefresh.call(new Date());
    },
    () => {
        ModuleService.getModule(TimerModuleS).onDayRefresh.call(new Date());
    }
);
