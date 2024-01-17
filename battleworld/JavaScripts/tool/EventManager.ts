import { LogManager } from "odin";
import { Singleton } from "./FunctionUtil";

/**回调体，用于Action和Event系统的辅助功能*/
export class CallBack {
    private fun: Function;
    private thisArg: any;

    /**时序值 */
    public timing: number = 0;
    /**事件类型 */
    public eventType: EEventType = EEventType.normal;
    /**脏标记 */
    public dirty: boolean = false;

    constructor(fun: Function, thisArg: any) {
        this.fun = fun;
        this.thisArg = thisArg;
    }


    public call(...prames: any[]): any {
        if (!this.dirty) {
            if (this.thisArg != null) {
                return this.fun.call(this.thisArg, ...prames);
            } else {
                this.fun(...prames);
            }
        }
    }
    //判断是否构建于fun和thisArg
    public isOriginFrom(fun: Function, thisArg: any): boolean {
        return this.fun == fun && this.thisArg == thisArg;
    }
    public get originFun(): Function {
        return this.fun;
    }
    public get originThisArg(): any {
        return this.thisArg;
    }
}

/**事件类型 */
export enum EEventType {
    /**常驻类型 */
    resident,
    /**普通类型*/
    normal,
}

@Singleton()
export class EventManager {
    public static instance: EventManager = null;


    private callBackMap: Map<string, CallBack[]> = new Map();


    /**
     * 添加一个监听方法(有重复过滤),支持异步调用
     * @param eventName 事件名(唯一)
     * @param fn 方法
     * @param thisArg 域
     * @param eventType 事件类型：主要用于清理
     * @param timing 时序，事件调用从小达到开始执行 
     */
    public add(eventName: string, fn: Function,
        thisArg?: any,
        eventType: EEventType = EEventType.normal,
        timing: number = 1): void {
        if (StringUtil.isEmpty(eventName)) {
            LogManager.instance.logErrorWithTag("VAE", "EventManager add isEmpty(eventName) ", eventName);
            return;
        }
        if (fn == null) {
            return;
        }


        if (this.includes(eventName, fn, thisArg)) {
            return;
        }

        if (this.callBackMap.has(eventName) == false) {
            this.callBackMap.set(eventName, []);
        }

        let callBackList = this.callBackMap.get(eventName);
        let newCallback = new CallBack(fn, thisArg);
        newCallback.eventType = eventType;
        newCallback.timing = timing;
        callBackList.push(newCallback);

        // 排序下 根据timing排序 从小到大
        callBackList.sort((v1, v2) => {
            return v1.timing - v2.timing;
        });

    }

    /**
     * 移除一个监听方法
     * @param fn 方法
     * @param thisArg 域
     */
    public remove(eventName: string, fn: Function, thisArg: any): void {
        if (StringUtil.isEmpty(eventName)) {
            LogManager.instance.logErrorWithTag("VAE", "EventManager remove isEmpty(eventName) ", eventName);
            return;
        }
        if (fn == null) return;

        let index = this.getFunIndex(eventName, fn, thisArg)
        if (index == -1) {
            return;
        }
        let callBackList = this.callBackMap.get(eventName);
        callBackList.splice(index, 1);

        if (callBackList.length == 0) {
            this.callBackMap.delete(eventName);
        }
    }

    /**
     * 执行事件
     * @param eventName 事件名
     * @param param 参数序列
     */
    public call(eventName: string, ...param: any) {
        if (StringUtil.isEmpty(eventName)) {
            LogManager.instance.logErrorWithTag("VAE", "EventManager remove isEmpty(eventName) ", eventName);
            return;
        }

        if (this.callBackMap.has(eventName) == false) {
            return;
        }

        let callBackList = this.callBackMap.get(eventName);

        for (let index = 0; index < callBackList.length; index++) {
            callBackList[index].call(...param);
        }
    }

    /**
     * 判断是否包含某个监听方法
     * @param eventName 事件名
     * @param fn 方法
     * @param thisArg 域 
     * @returns 结果
     */
    public includes(eventName: string, fn: Function, thisArg: any): boolean {
        if (fn == null) return false;
        return this.getFunIndex(eventName, fn, thisArg) != -1;
    }


    /**
     * 清理监听事件
     * @param eventName 事件名
     * @param eventType 如果事件名为 对应类型，只清理对应事件，否则全部清理
     */
    public clear(eventName: string, eventType: EEventType): void {

        if (this.callBackMap.has(eventName) == false) {
            return;
        }

        let callBackList = this.callBackMap.get(eventName);
        if (callBackList.length > 0) {
            callBackList.length = 0;
        }

    }


    private getFunIndex(eventName: string, fn: Function, thisArg: any): number {

        if (this.callBackMap.has(eventName) == false) {
            return -1;
        }

        let callBackList = this.callBackMap.get(eventName);

        for (let i = 0; i < callBackList.length; i++) {
            if (callBackList[i].isOriginFrom(fn, thisArg)) return i;
        }

        return -1;
    }

    private getCallBack(eventName: string, fn: Function, thisArg: any): CallBack {

        if (this.callBackMap.has(eventName) == false) {
            return null;
        }

        let callBackList = this.callBackMap.get(eventName);
        for (let i = 0; i < callBackList.length; i++) {
            if (callBackList[i].isOriginFrom(fn, thisArg)) return callBackList[i];
        }

        return null;
    }

    /**
     * 判断是否不受条件限制
     * @param eventName 
     * @returns true 不受限制  false 受限制
     */
    public async check_condition(eventName: string) {
        if (this.callBackMap.has(eventName) == false) {
            return false;
        }

        let callBackList = this.callBackMap.get(eventName);

        for (let index = 0; index < callBackList.length; index++) {
            const resultCall = callBackList[index];
            let result = await resultCall.call();

            if (result == false) {
                return false;
            }
        }

        return true;
    }

}