export enum ETimerName {
    timer_initReadyState = "timer_initReadyState",
    /**游戏进行中倒计时 */
    timer_Gaming = "timer_Gaming",
    /**局内准备倒计时 */
    timer_GameReady = "timer_GameReady",
}

export interface TimerData {
    timerAction: Action,
    cdTime: number,
    timerKey: any,
}

export interface ICDTimerData {
    /**时间key */
    timerKey: string,
    /**触发时间 */
    timeStamp: number,
}

export class TimerTool {

    private static timerMap: Map<string, TimerData> = new Map();
    private static timerCDMap: Map<string, ICDTimerData> = new Map();

    /**
     * 创建倒计时timer
     * @param timerKey 
     * @returns 
     */
    public static createTimer(timerKey: string) {
        if (this.timerMap.has(timerKey)) {
            return;
        }
        let timerData: TimerData = {
            timerAction: new Action(),
            cdTime: 0,
            timerKey: null,
        }
        this.timerMap.set(timerKey, timerData);
    }

    /**
     * 刷新倒计时timer
     * @param timerKey timerkey
     * @param time 剩余时间
     */
    public static refreshTimer(timerKey: string, time: number) {
        if (this.timerMap.has(timerKey) == false) {
            return;
        }

        if (time == 0) {
            return;
        }
        time = Math.abs(time);

        let timerData = this.timerMap.get(timerKey);
        timerData.cdTime = time;
        timerData.cdTime = Math.floor(timerData.cdTime);
        timerData.timerAction.call(timerData.cdTime);

        timerData.timerKey = setInterval(() => {
            timerData.cdTime--;

            timerData.timerAction.call(timerData.cdTime);

            if (timerData.cdTime <= 0) {
                clearInterval(timerData.timerKey);
                timerData.timerKey = null;
            }
        }, 1000);
    }

    /**
    * 刷新倒计时timer根据时间戳
    * @param timerKey timerkey
    * @param time 时间戳
    * @param limitTime 限制时间长度
    */
    public static refreshTimerStamp(timerKey: string, timeStamp: number, limitTime: number) {
        if (this.timerMap.has(timerKey) == false) {
            return;
        }

        if (timeStamp == 0) {
            return;
        }

        let timerData = this.timerMap.get(timerKey);
        timerData.cdTime = timeStamp;

        let time = Date.now() - timerData.cdTime;
        let remainTime = Math.floor((limitTime - time) / 1000);

        if (remainTime <= 0) {
            return;
        }

        timerData.timerAction.call(remainTime);

        timerData.timerKey = setInterval(() => {
            let time = Date.now() - timerData.cdTime;
            let remainTime = Math.floor((limitTime - time) / 1000);

            timerData.timerAction.call(remainTime);

            if (remainTime <= 0) {
                clearInterval(timerData.timerKey);
                timerData.timerKey = null;
            }
        }, 1000);
    }


    /**
     * 清理计时器
     * @param timerKey key 
     * @returns 
     */
    public static clearTimer(timerKey) {
        if (this.timerMap.has(timerKey) == false) {
            return;
        }
        let timerData = this.timerMap.get(timerKey);
        if (timerData.timerKey) {
            clearInterval(timerData.timerKey);
            timerData.timerKey = null;
        }
    }

    /**
     * 获取指定timer
     * @param timerKey 
     * @returns 
     */
    public static getTimer(timerKey: string) {
        if (this.timerMap.has(timerKey) == false) {
            return null;
        }
        let timerData = this.timerMap.get(timerKey);
        return timerData.timerAction;
    }



    public static getFormatTime__HM(num: number): string {
        return `${num / 60 < 10 ? "0" + Math.floor(num / 60) : Math.floor(num / 60)}:${num % 60 < 10 ? "0" + Math.floor(num % 60) : Math.floor(num % 60)}`
    }

    /**是否正在执行 */
    public static isPlayingTimer(timerKey: string) {
        if (this.timerMap.has(timerKey) == false) {
            return false;
        }
        let timerData = this.timerMap.get(timerKey);
        return timerData.timerKey != null;
    }

    /**
     * 是否在CD中
     * @param timerKey cdkey
     * @param cdTime cd时间 默认500毫秒
     * @returns 
     */
    public static isInCD(timerKey: string, cdTime: number = 500) {
        if (this.timerCDMap.has(timerKey) == false) {
            return false;
        }

        let data = this.timerCDMap.get(timerKey);

        let walkTime = Date.now() - data.timeStamp;

        return walkTime < cdTime;
    }

    /**
     * 记录时间
     * @param timerKey cdkey 
     */
    public static recrodCD(timerKey: string) {
        if (this.timerCDMap.has(timerKey) == false) {
            let data: ICDTimerData = {
                timerKey: timerKey,
                timeStamp: 0
            }
            this.timerCDMap.set(timerKey, data);
        }

        this.timerCDMap.get(timerKey).timeStamp = Date.now();
    }

    /**
   * 定时器
   * @param handler 回调函数 
   * @param timeout 秒
   * @returns 
   */
    public static setTimeout(handler: any, timeout?: number) {
        return TimeUtil.delayExecute(handler, (timeout / 1000) * 30);
    }

    public static clearTimeout(key: number) {
        TimeUtil.clearDelayExecute(key);
    }

}