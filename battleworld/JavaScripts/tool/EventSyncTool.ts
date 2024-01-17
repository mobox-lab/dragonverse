import { EventManager } from "./EventManager";

/**
 * 异步事件发送工具
 * 针对属性同步脚本，需要等模块初始化完毕，才发送事件的情况
 * 属性同步可能同步两次，此刻需要针对消息进行唯一处理
 */
@Decorator.autoExecute("init")
export class EventSyncTool {

    private static eventCaches: Map<string, any> = new Map();

    /**会自动初始化 */
    public static async init() {

        if (SystemUtil.isClient() == false) {
            return;
        }
        await ModuleService.ready();

        for (const [key, value] of EventSyncTool.eventCaches) {
            EventManager.instance.call(key, ...value);
        }

        EventSyncTool.eventCaches.clear();
    }

    /**
    * @description 发送本地事件（客户端调用），用来解决属性同步等待模块加载完成的问题
    * @groups SCRIPTING
    * @effect 调用端生效
    * @param eventName usage:事件名
    * @param params usage:事件内容
    */
    public static dispatchToLocal(eventName: string, ...params: unknown[]) {
        if (ModuleService["getInstance"]()["isReady"] == false) {

            // 注意这里会产生覆盖，目前就是处理这个问题的
            EventSyncTool.eventCaches.set(eventName, params);
        } else {
            EventManager.instance.call(eventName, ...params);
        }
    }



}