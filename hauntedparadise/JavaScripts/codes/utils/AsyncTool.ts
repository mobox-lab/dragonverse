/*
 * @Author       : feifei.song
 * @Date         : 2022-07-19 18:08:31
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-05 14:33:31
 * @Description  : 异步工具
 */

/**
 *  异步等待时间
 */
export class WaitTime {
    /**
     *  执行异步等待
     * @param time: 需要等待的时间，单位 秒
     */
    public static wait(time: number): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, Math.floor(time * 1000));
            time = null;
        });
    }
}

/**
 * 异步等待一个回调
 */
export class WaitCall {

    /**
     * 异步等待一个回调
     * @param call 执行需要等待的函数
     * @returns 
     */
    public static async wait<T>(call: (resolve, reject) => void) {
        const promise = new Promise<T>((resolve, reject) => {
            call(resolve, reject);
        });
        return promise;
    }

}

/**
 * 异步等待回调队列类
 */
export class WaitCallList<T>{

    /** 执行中时，缓存异步回调 */
    private _actionList: { resolve: (a: T) => void; reject: (a: any) => void }[] = [];

    /**
     * 等待回调
     * @returns 
     */
    public wait(): Promise<T> {
        return new Promise((resolve: (b: T) => void, reject: (b: any) => void) => {
            this._actionList.push({ resolve: resolve, reject: reject });
        });
    }

    /**
     * 等待结束
     * @param a 回调参数
     */
    public resolve(a?: T) {
        this._actionList.forEach((item) => {
            item.resolve(a);
        });
        this._actionList.length = 0;
    }

    /**
     * 等待拒绝
     * @param a 参数
     */
    public reject(a?: any) {
        this._actionList.forEach((item) => {
            item.reject(a);
        });
        this._actionList.length = 0;
    }

}

/**
 * 使计时器句柄唯一
 */
export class TimerOnly {
    /** 是否在计时中 */
    public isRunning: boolean = false;

    /** 计时器句柄 */
    protected handler: number;

    /** 是否只执行一次 */
    protected isOnce: boolean;

    /** 重复次数 */
    protected count: number;

    /**
     * 停止计时器
     */
    public stop(): void {
        if (this.handler) {
            if (this.isOnce) {
                clearTimeout(this.handler);
            } else {
                clearInterval(this.handler);
            }
            this.isRunning = false;
            this.handler = null;
        }
    }

    /**
     * 延迟执行一次
     * @description: 参数参照 api setTimeout
     */
    public setTimeout(action: (...arg: any[]) => void, timeout: number, ...arg: any[]): void {
        this.stop();
        this.isOnce = true;
        this.isRunning = true;
        this.handler = setTimeout(
            (...arg) => {
                this.handler = null;
                this.isRunning = false;
                action(...arg);
                action = null;
            },
            timeout,
            ...arg
        );
    }

    /**
     * 延迟循环执行
     * @description: 参数参照 api setInterval
     */
    public setInterval(action: (...arg: any[]) => void, timeout: number, ...arg: any[]): void {
        this.stop();
        this.isOnce = false;
        this.isRunning = true;
        this.handler = setInterval(action, timeout, ...arg);
    }

    /**
     * 延迟循环执行,函数调用时会首次执行一次
     * @description: 参数参照 api setInterval
     */
    public setIntervalSoon(action: (...arg: any[]) => void, timeout: number, ...arg: any[]): void {
        this.stop();
        this.isOnce = false;
        this.isRunning = true;
        this.handler = setInterval(action, timeout, ...arg);
        action(...arg);
    }

    /**
     * 延迟循环执行,函数调用时会首次执行一次
     * @description: 参数参照 api setInterval
     */
    public setIntervalCount(action: (...arg: any[]) => void, timeout: number, count: number, ...arg: any[]): void {
        this.stop();
        this.isOnce = false;
        this.isRunning = true;
        this.count = count;
        this.handler = setInterval(
            (...arg) => {
                action(...arg);
                this.count--;
                if (this.count <= 0) {
                    this.stop();
                }
            },
            timeout,
            ...arg
        );
    }
}

/**
 *  仅执行一次的异步类
 */
export class WaitReady<T> {
    /** 执行结果 */
    private _rst: T;

    /** 是否执行完成 */
    public padded: boolean = false;

    /** 执行中时，缓存异步回调 */
    private _waitCall: WaitCallList<T> = new WaitCallList<T>();

    /**
     * 异步执行
     */
    public async ready(): Promise<T> {
        if (this.padded) {
            return this._rst;
        }

        return this._waitCall.wait();
    }

    /**
     * 调用结束结束
     * @descrption 仅支持了成功调用
     */
    public over(arg: T): void {
        if (this.padded) {
            return;
        }
        this.padded = true;
        this._waitCall.resolve(arg);
    }

    /**
     * 重置等待
     * @param clearOld 是否清理旧的等待
     */
    public reset(clearOld: boolean = false) {
        if (clearOld) {
            this._waitCall.reject(null);
        }
        this._rst = null;
        this.padded = false;
    }

    /**
     * 清理
     */
    public clear() {
        this._waitCall.reject(null);
    }
}

/**
 *  多步骤等待
 */
export class WaitStep {
    /** 回调参数 */
    private _arg: { [key: number | string]: any };

    /** 总计数 */
    public all: number;

    /** 计数完成后回调 */
    public action: (arg?: { [key: number | string]: any }) => void;

    /** 当前计数 */
    public now: number;

    /** 执行中时，缓存异步回调 */
    private _waitCall = new WaitCallList();

    constructor(allCount: number, action?: (arg?: { [key: number | string]: any }) => void) {
        this.now = 0;
        this.all = allCount;
        this.action = action;
    }

    public step(arg?: { [key: number | string]: any }): void {
        this.now++;
        if (arg) {
            this._arg = this._arg || {};
            for (const k in arg) {
                this._arg[k] = arg[k];
            }
        }
        if (this.now == this.all) {
            this.action && this.action(this._arg);
            this._waitCall.resolve(this._arg);
        }
    }

    public async ready() {
        if (this.now >= this.all) {
            return;
        }

        return this._waitCall.wait();
    }
}

/**
 *  多步骤等待
 */
export class WaitStepBit {
    /** 回调参数 */
    protected arg: { [key: number | string]: any };

    /** 总计数 */
    public all: number;

    /** 计数完成后回调 */
    public action: (arg?: { [key: number | string]: any }) => void;

    /** 当前计数 */
    public now: number;

    constructor(allCount: number, action?: (arg?: { [key: number | string]: any }) => void) {
        this.now = 0;
        this.all = (1 << (allCount + 1)) - 1;
        this.action = action;
    }

    public step(bit: number, arg?: { [key: number | string]: any }): void {
        this.now |= 1 << bit;
        if (arg) {
            this.arg = this.arg || {};
            for (const k in arg) {
                this.arg[k] = arg[k];
            }
        }
        if (this.now == this.all && this.action) {
            this.action(this.arg);
        }
    }
}

/**
 *  成功与否的异步调用类
 */
export class WaitAsyncBool {
    /**
     *  异步处理回调
     */
    protected hAction: { resolve: (b: boolean) => void; reject: (b: boolean) => void };

    /**
     *  开始异步调用
     */
    public async start(call?: () => void): Promise<boolean> {
        if (this.hAction) {
            this.hAction.resolve(false);
            this.hAction = null;
        }

        if (call) {
            call();
        }

        return new Promise((resolve: (b: boolean) => void, reject: (b: boolean) => void) => {
            this.hAction = { resolve: resolve, reject: reject };
        });
    }

    /**
     *  异步结束
     */
    public over(rst: boolean = true): void {
        if (this.hAction) {
            this.hAction.resolve(rst);
            this.hAction = null;
        }
    }
}

/**
 * 新轮询工具
 */
export class WaitLoop {
    /** 轮询计时器 */
    private _timer: TimerOnly = new TimerOnly();

    /** 轮询计时器 */
    private _reject: (b) => void;

    /**
     * 静态轮询
     * @param interval 间隔时间，毫秒
     * @param call 每帧检测函数
     * @param count 检测最大次数，-1 不限制次数
     * @returns
     */
    public static async loop<T>(call: () => T, interval: number = 100, count: number = 600): Promise<T> {
        const rst = call();
        if (rst) return rst;

        return new Promise((resolve, reject) => {
            const handler = setInterval(() => {
                if (count > 0) {
                    count--;
                }
                const rst = call();
                if (count == 0 || rst) {
                    clearInterval(handler);
                    resolve(rst);
                }
            }, interval);
        });
    }

    /**
     * 静态轮询
     * @param interval 间隔时间，毫秒
     * @param call 每帧检测函数
     * @param count 检测最大次数，-1 不限制次数
     * @returns
     */
    public async loop<T>(call: () => T, interval: number = 100, count: number = 2400): Promise<T> {
        const promise = new Promise<T>((resolve: (b: T) => void, reject: (b: T) => void) => {
            this._reject = reject;
            this._timer.setIntervalSoon(() => {
                if (count > 0) {
                    count--;
                }
                const rst = call();
                if (count == 0 || rst) {
                    this._timer.stop();
                    this._reject = null;
                    resolve(rst);
                    (call = null), (resolve = null);
                }
            }, interval);
        });

        return promise;
    }

    /**
     * 停止轮询
     */
    public stop() {
        this._timer.stop();
        if (this._reject) {
            this._reject(null);
        }
    }
}

/**
 * 多个等待监听
 */
export class WaitBitch<T> {
    /** 等待回调 */
    protected waitCall: { resolve: (rst: T) => void; reject: (rst: any) => void }[] = [];

    /**
     * 等待一个值
     * @returns
     */
    public async wait(): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.waitCall.push({ resolve: resolve, reject: reject });
        });
    }

    /**
     * 等待结束
     * @param go 返回的值
     */
    public resolve(go: T) {
        this.waitCall.forEach((v) => {
            v.resolve(go);
        });
        this.waitCall.length = 0;
    }
}

/**
 * 异步等待一个回调
 */
export class WaitCallback {

    /**
     * 异步等待一个回调
     * @param call 执行需要等待的函数
     * @returns 
     */
    public static async wait(call: (resolve, reject) => void, timeout?: number) {
        const promise = new Promise<void>((resolve, reject) => {
            if (timeout) {
                setTimeout(() => {
                    resolve();
                }, timeout)
            }
            call(resolve, reject);
        });
        return promise;
    }

}

export class WaitTimeOut {

    /**
     * 超时异步
     * @param time 
     * @param arg 
     * @returns 
     */
    public static waitOne<T>(time, arg: Promise<T>[]): Promise<T> {
        const promise = new Promise<T>((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, time);
            time = null;
        });
        arg.splice(0, 0, promise);
        return Promise.race(arg);
    }

    /**
     * 超时异步
     * @param time 
     * @param arg 
     * @returns 
     */
    public static waitAll<T>(time, arg: (Promise<T>)[]) {
        const promise = new Promise<T>((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, time);
            time = null;
        });
        arg.splice(0, 0, promise);
        return Promise.all(arg);
    }

}
export class WaitOut {

    /**
     * 等待多个中一个执行，并有超时限制
     * @param time 
     * @param arg 
     * @returns 
     */
    public static one<T>(time, arg: Promise<T>[]): Promise<T> {
        const promise = new Promise<T>((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, time);
            time = null;
        });
        arg.splice(0, 0, promise);
        return Promise.race(arg);
    }

    /**
     * 等待多个异步执行，并有超时限制
     * @param time 
     * @param arg 
     * @returns 
     */
    public static all<T>(time, arg: (Promise<T>)[]) {
        const promise = new Promise<T>((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, time);
            time = null;
        });
        arg.splice(0, 0, promise);
        return Promise.all(arg);
    }

}