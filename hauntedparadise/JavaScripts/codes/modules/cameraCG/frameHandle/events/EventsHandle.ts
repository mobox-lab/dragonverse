import { EventFrameInfo } from "../../model/info/EventFrameInfo";


export abstract class EventsHandle {

    static paramsTemplate = new Map<string, any>();

    /** 事件名 */
    event: string;

    constructor(event: string) {
        this.event = event;
        EventsHandle.paramsTemplate.set(this.event, this["getRegParams"] ? this["getRegParams"]() : this.getDefParams());
    }

    /** 参数数据 */
    abstract getDefParams(): unknown;

    /** 重运行事件 */
    onReSet(): void { }

    /** 收到事件 (EventTriggerType.Normal独占) */
    onEvent(params: unknown): void { }

    /** 刷新事件 */
    onDataChange(infos: EventFrameInfo[]): void { }

    /** 时间帧更新 (EventTriggerType.Interpolation独占) */
    onTime(time: number): void { }

}

export interface UIEvents {

    /** 参数数据 */
    data: any;

    setData(info: EventFrameInfo): void;

}