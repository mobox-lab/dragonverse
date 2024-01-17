/** 
 * @Author       : MengYao.Zhao
 * @Date         : 2022/05/11 16:22:21
 * @Description  : 简单的时间轮定时器,支持独立时间轮中的定时器暂停/继续，
 */

let baseTimerId = 0;
class TimerTask {
    id: number;
    func: Function;
    arg: any;
    deadlineStamp: number;//到期的时刻  
    interval: number = 0;//延迟间隔
    repeat: number = 0;//重复标记
    times: number = 0;//当前已经执行的次数
    constructor() {
        this.id = baseTimerId++;
    }
}

/**
 * 时间轮
 */
export class TimerWheel {

    /**
     * 任务插槽
     */
    private slots: Map<number, TimerTask[]>;

    /**
     * timer的id对应的插槽
     */
    private timerIdDic: Map<number, number>;

    /**
     * 当前时间
     */
    private curTime: number;

    /**
     * 是否暂停了
     */
    private _pause: boolean = false;

    constructor() {
        this.slots = new Map<number, TimerTask[]>();
        this.timerIdDic = new Map<number, number>();
        this.curTime = this.getGameTimeStamp();
        //this.asyncRunWheel();

        // vae优化
        TimeUtil.onEnterFrame.add(this.runWheel, this);
    }

    /**
     * 获取当前的时间戳 ms
     */
    private getGameTimeStamp(): number {
        return mw.TimeUtil.elapsedTime() * 1000;
    }

    /**
     * 异步运行,更新时间刻度
     */
    // private async asyncRunWheel() {
    //     while (true) {
    //         this.runWheel();
    //         await this.sleep(1);
    //     }
    // }

    /**
     * 执行timer检查
     */
    private runWheel() {
        if (this._pause)
            return;
        let timeStamp = this.getGameTimeStamp();
        let timeDiff = timeStamp - this.curTime;
        while (timeDiff >= 0) {
            this.checkTimer();
            this.curTime++;
            timeDiff--;
        }
    }

    /**
     *休眠一会
     * @param ms 
     * @returns 
     */
    private sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    /**
     * 暂停
     */
    pause() {
        this._pause = true;
    }

    /**
     * 恢复
     */
    continue() {
        let timeStamp = this.getGameTimeStamp();
        let timeDiff = timeStamp - this.curTime;
        this.curTime = timeStamp;
        let newSlots: Map<number, TimerTask[]> = new Map<number, TimerTask[]>();
        let newIdMap: Map<number, number> = new Map<number, number>();
        this.slots.forEach((timers, slotIndex) => {
            let newSlotIndex = slotIndex + timeDiff;
            timers.forEach((timer) => {
                timer.deadlineStamp += timeDiff;
                newIdMap.set(timer.id, newSlotIndex);
            })
            newSlots.set(newSlotIndex, timers);
        })
        this.slots.clear();
        this.slots = newSlots;
        this.timerIdDic.clear();
        this.timerIdDic = newIdMap;

        this._pause = false;
    }



    /**
     * 创建一个timer
     * @param delayTime 延迟s
     * @param callBack  回调
     * @param arg 回调参数
     * @param repeat 0表示一次性的，>0表示有循环次数，<0表示无限循环
     * @returns timer的id,可用于撤销定时器
     */
    createTimer(delayTime: number, callBack: (args: any) => void, arg: any = null, repeat: number = 0): number {
        if (delayTime <= 0)
            return null;
        delayTime *= 1000;
        delayTime = Math.floor(delayTime);
        let timer: TimerTask = new TimerTask();
        timer.func = callBack;
        timer.arg = arg;
        timer.interval = delayTime;
        timer.deadlineStamp = this.curTime + delayTime;
        timer.repeat = Math.floor(repeat);
        this.addTimer(timer);
        return timer.id;
    }

    /**
     * 取消一个timer
     * @param timerId timer的id 
     */
    cancleTimer(timerId: number) {
        let slotIdx = this.timerIdDic.get(timerId);
        if (slotIdx) {
            let container = this.slots.get(slotIdx);
            if (container) {
                container.splice(container.indexOf(container.find((timer) => timer.id == timerId)), 1);
                if (container.length == 0) {
                    this.slots.delete(slotIdx);
                }
            }
            this.timerIdDic.delete(timerId);
        }
    }

    /**
     * 清除所有的timer
     */
    clearAllTimers() {
        this.timerIdDic.clear();
        this.slots.clear();
    }

    /**
     * 添加一个timer任务
     * @param timer 
     */
    private addTimer(timer: TimerTask) {
        let deadlineStamp = timer.deadlineStamp;
        let container = this.slots.get(deadlineStamp);
        if (!container) {
            container = [];
            this.slots.set(deadlineStamp, container);
        }
        this.timerIdDic.set(timer.id, deadlineStamp);
        container.push(timer);
    }

    /**
     * 检查timer的触发情况 
     */
    private checkTimer() {
        let timers: TimerTask[] = this.slots.get(this.curTime);
        if (timers) {
            let needNextInsertTimers: TimerTask[] = [];
            timers.forEach((timer) => {
                this.timerIdDic.delete(timer.id);
                timer.func(timer.arg);
                if (timer.repeat > 0) {
                    if (timer.times == timer.repeat) {
                        timer = null;
                        return;
                    }
                    timer.times++;
                    needNextInsertTimers.push(timer);
                } else if (timer.repeat < 0) {
                    needNextInsertTimers.push(timer);
                } else {
                    timer = null;
                }
            })
            this.slots.delete(this.curTime);
            needNextInsertTimers.forEach((timer) => {
                timer.deadlineStamp = this.curTime + timer.interval;
                this.addTimer(timer);
            })
        }
    }
}

