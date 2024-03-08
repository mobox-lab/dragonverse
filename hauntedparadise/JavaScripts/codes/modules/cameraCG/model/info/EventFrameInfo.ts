import { EventsHandle } from "../../frameHandle/events/EventsHandle";

type ExtractTypes<T> = {
    [K in keyof T]: T[K];
};

/**
 * 事件帧信息（触发型关键帧）
 */
export class EventFrameInfo {

    /** 时间 */
    private _time: number;
    /** 事件名 */
    private _name: string;
    /** 参数 */
    private _params: string;

    /**
     * 反序列化本对象（注意：反序列化会引起错误，请在外部捕获）
     * @param jsonStr 源文本
     * @returns 返回序列化后的对象
     */
    public static deserialize(jsonStr: string): EventFrameInfo {
        const object = JSON.parse(jsonStr);
        return new EventFrameInfo(
            object['_time'],
            object['_name'],
            object['_params']
        );
    }

    /** 
     * 构造方法
     * @param time 时间
     * @param name 事件名
     */
    constructor(time: number, name: string, params: string) {
        this.time = time;
        this.name = name;
        this._params = params;
    }

    /** 
     * 获取帧时间
     */
    get time(): number {
        return this._time;
    }

    /**
     * 设置帧时间(时间不能小于0)
     * @param newTime 新时间
     */
    set time(newTime) {
        this._time = Number(newTime.toFixed(2));
    }

    /** 
     * 获取事件名
     */
    get name(): string {
        return this._name;
    }

    /**
     * 设置事件名
     * @param newName 新事件名
     */
    set name(newName) {
        this._name = newName;
    }

    /** 
     * 获取参数
     */
    get params(): string {
        return this._params;
    }

    /**
     * 设置参数T
     * @param newParam 新参数
     */
    set params(newParams) {
        this._params = newParams;
    }

    getParams<T>(): T {
        let params = JSON.parse(this._params) as T;
        // 类型修正
        const template = EventsHandle.paramsTemplate.get(this.name);
        for (const key in template) {
            if (template[key] instanceof Vector) {
                params[key] = new Vector(params[key].x, params[key].y, params[key].z);
            } else if (template[key] instanceof Rotation) {
                params[key] = new Rotation(params[key].x, params[key].y, params[key].z);
            }
        }
        return params;
    }

}
