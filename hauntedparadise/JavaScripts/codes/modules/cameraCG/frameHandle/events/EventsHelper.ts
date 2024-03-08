import { EventFrameInfo } from "../../model/info/EventFrameInfo";
import { Log } from "../../utils/Log";
import { EventsHandle } from "./EventsHandle";

/** 事件触发类型 */
export enum EventTriggerType {
    /** 通常 */
    Normal = 0,
    /** 插值 */
    Interpolation,
}


export function registerCSEvent(event: string, name: string, panelClass: TypeName<UIScript>, listenType: EventTriggerType[] = [EventTriggerType.Normal]) {
    return function <T extends { new(...args: any[]): EventsHandle }>(constructor: T): T {
        if (SystemUtil.isServer()) return constructor;
        EventsHelper.instance.registerEvent(event, name, panelClass, constructor, listenType);
        Log.info("Events Reg: " + event);
        return constructor;
    };
}


export type EventInfo = {
    event: string,
    name: string,
    panelClass: TypeName<UIScript>,
    handle: TypeName<EventsHandle>
}


export class EventsHelper {

    static readonly EVENT_RESET = "CS.Reset";

    private static _instance: EventsHelper;
    public static get instance(): EventsHelper {
        if (!this._instance) {
            this._instance = new EventsHelper();
        }
        return this._instance;
    }

    public eventInfoMap: Map<string, EventInfo> = new Map();
    public eventHandleMap: Map<string, EventsHandle> = new Map();

    private _handleUpdateList: EventsHandle[] = [];

    public registerEvent(event: string, name: string, panelClass: TypeName<UIScript>, handle: TypeName<EventsHandle>, listenType: EventTriggerType[]) {
        this.eventInfoMap.set(event, { event, name, panelClass, handle });
        const handleInstance = new handle(event);
        for (const type of listenType) {
            switch (type) {
                case EventTriggerType.Normal:
                    Event.addLocalListener(event, (params) => {
                        handleInstance.onEvent(params);
                    });
                    break;
                case EventTriggerType.Interpolation:
                    this._handleUpdateList.push(handleInstance);
                    break;
            }
        }
        this.eventHandleMap.set(event, handleInstance);
    }

    public needUpdate(event: string) {
        return this._handleUpdateList.some((handle) => handle.event == event);
    }

    public reSet() {
        Event.dispatchToLocal(EventsHelper.EVENT_RESET);
        this.eventHandleMap.forEach((handle) => {
            handle.onReSet();
        });
    }

    public refresh(infos: EventFrameInfo[]) {
        this.eventHandleMap.forEach((handle) => {
            const curTypeInfos = infos.filter((info) => info.name == handle.event);
            if (curTypeInfos.length == 0) return;
            handle.onDataChange(curTypeInfos);
        });
    }

    public updateTime(currentPlayTotalTime: number) {
        this._handleUpdateList.forEach((handle) => {
            handle.onTime(currentPlayTotalTime);
        });
    }

}