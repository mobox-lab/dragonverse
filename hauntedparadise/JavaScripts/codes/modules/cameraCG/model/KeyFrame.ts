import { InterpolatorType } from "../simplepathing/interpolator/InterpolatorFactory";
import { Log } from "../utils/Log";
import { EventFrameInfo } from "./info/EventFrameInfo";
import { KeyFrameInfo } from "./info/KeyFrameInfo";

/**
 * 关键帧动画类
 */
export class KeyFrame {

    /** 数据变更回调 */
    static onChange: Action = new Action();

    /** 汇总tick内变动计时器 */
    static tickChangeTimer: number = null;

    /** 相机关键帧列表 */
    private _frameInfos: Array<KeyFrameInfo> = [];

    /** 插值类型 */
    public interpolation: InterpolatorType = InterpolatorType.Cubic;

    /** 事件帧列表 */
    public eventFrameInfos: Array<EventFrameInfo> = [];

    /** 
     * 汇总tick内变动 
     */
    static callChange() {
        if (this.tickChangeTimer) return;
        this.tickChangeTimer = setTimeout(() => {
            KeyFrame.onChange.call();
            this.tickChangeTimer = null;
        }, 0)
    }

    /**
     * 反序列化本对象（注意：反序列化会引起错误，请在外部捕获）
     * @param animJsonStr 源文本
     * @returns 返回序列化后的对象
     */
    public static deserialize(animJsonStr: string): KeyFrame {
        // 逐层反序列化
        const object = JSON.parse(animJsonStr);
        const anim = new KeyFrame();
        const interpolation = object['interpolation'];
        anim.interpolation = interpolation ? interpolation : InterpolatorType.Linear;
        const frameInfos = object['_frameInfos'];
        frameInfos.forEach(element => {
            anim.push(KeyFrameInfo.deserialize(JSON.stringify(element)), true);
        });
        const eventFrameInfos = object['eventFrameInfos'];
        eventFrameInfos?.forEach(element => {
            anim.eventFrameInfos.push(EventFrameInfo.deserialize(JSON.stringify(element)));
        });
        this.callChange();
        return anim;
    }

    //#region 组操作

    /** 
     * 插入关键帧
     * @param keyFrameInfo 关键帧信息
     * @param isDeserialize 是否反序列化
     */
    push(keyFrameInfo: KeyFrameInfo, isDeserialize = false): boolean {
        // 判断时是否重复插入
        for (let i = 0; i < this.getLength(); i++) {
            if (this._frameInfos[i].time === keyFrameInfo.time) {
                Log.err("在相同时间重复插入");
                return false;
            }
        }
        // 将帧放入，并排序将时间重解算
        this._frameInfos.push(keyFrameInfo);
        this.sort();
        if (!isDeserialize) Log.info("加入关键帧", JSON.stringify(keyFrameInfo));
        KeyFrame.callChange();
        return true;
    }

    /** 
     * 删除关键帧
     * @param index 索引
     */
    del(index: number) {
        this._frameInfos.splice(index, 1);
        KeyFrame.callChange();
    }

    /** 
     * 获取指定关键帧
     * @param index 索引
     * @returns 关键帧
     */
    get(index: number): KeyFrameInfo {
        return this._frameInfos[index];
    }

    /** 
     * 获取末尾帧
     * @returns 关键帧
     */
    getEnd(): KeyFrameInfo {
        return this._frameInfos[this._frameInfos.length - 1];
    }

    /** 
     * 获取关键帧数量
     * @returns 关键帧数量
     */
    getLength(): number {
        return this._frameInfos.length;
    }

    /** 
     * 遍历关键帧
     * @param callbackfn 回调函数
     */
    forEach(callbackfn: (value: KeyFrameInfo, index: number, array: KeyFrameInfo[]) => void) {
        this._frameInfos.forEach((value, index, arr) => {
            callbackfn(value, index, arr);
        })
    }

    /**
     * 对动画帧以时间进行排序
     */
    private sort() {
        this._frameInfos.sort((aInfo, bInfo) => {
            return aInfo.time - bInfo.time;
        })
    }

    /**
     * 查找指定关键帧索引
     */
    indexOf(info: KeyFrameInfo) {
        return this._frameInfos.indexOf(info);
    }

    /**
     * 清空所有关键帧信息
     */
    clear() {
        this._frameInfos.length = 0;
        this.eventFrameInfos.length = 0;
        KeyFrame.callChange();
    }

    /** 
     * 将另一对象拷贝到本地
     * @param keyFrame 关键帧
     */
    copy(keyFrame: KeyFrame) {
        this.clear();
        keyFrame.forEach((value: KeyFrameInfo) => {
            this.push(value);
        })
    }

    //#endregion

    //#region 帧操作

    /** 
     * 修改关键帧时间
     * @param index 索引
     * @param time 时间
     * @returns 修改后的索引
     */
    modifyTime(index: number, time: number): number {
        let info = this._frameInfos[index];
        this._frameInfos[index].time = time;
        Log.info("修改关键帧时间", JSON.stringify(this._frameInfos[index]));
        this.sort();
        KeyFrame.callChange();
        return this.indexOf(info);
    }

    /** 
     * 修改关键帧位置
     * @param index 索引
     * @param loc 位置
     */
    modifyLoc(index: number, loc: mw.Vector) {
        this._frameInfos[index].location.set(loc);
        Log.info("修改关键帧位置", JSON.stringify(this._frameInfos[index]));
        KeyFrame.callChange();
    }

    /** 
     * 修改关键帧旋转
     * @param index 索引
     * @param rot 旋转
     */
    modifyRot(index: number, rot: mw.Rotation) {
        this._frameInfos[index].rotation.set(rot);
        Log.info("修改关键帧旋转", JSON.stringify(this._frameInfos[index]));
        KeyFrame.callChange();
    }

    /** 
     * 修改关键帧FOV
     * @param index 索引
     * @param fov FOV
     */
    modifyFOV(index: number, fov: number) {
        this._frameInfos[index].fov = fov;
        Log.info("修改关键帧FOV", JSON.stringify(this._frameInfos[index]));
        KeyFrame.callChange();
    }

    /** 
     * 修改插值类型
     * @param interpolation 插值类型
     */
    setInterpolation(interpolation: InterpolatorType) {
        this.interpolation = interpolation;
        KeyFrame.callChange();
    }

    //#endregion

    /** 
     * 获取插值坐标点集
     * @returns 插值坐标点集
     */
    getLocations(): Vector[] {
        let locations = [];
        this.forEach((value: KeyFrameInfo) => {
            locations.push(value.location);
        })
        return locations;
    }

    /** 
     * 获取插值旋转点集
     * @returns 插值旋转点集
     */
    getRotations(): Rotation[] {
        let rotations = [];
        this.forEach((value: KeyFrameInfo) => {
            rotations.push(value.rotation);
        })
        return rotations;
    }

    /** 
     * 获取关键帧时间集
     * @returns 关键帧时间集
     */
    getTimes(): number[] {
        let times = [];
        this.forEach((value: KeyFrameInfo) => {
            times.push(value.time);
        })
        return times;
    }

    /**
     * 获取两关键帧之间距离
     * @param index1 在该动画中的索引
     * @param index2 在该动画中的索引
     */
    getLocationDifference(index1: number, index2: number): number {
        return mw.Vector.distance(
            this._frameInfos[index1].location,
            this._frameInfos[index2].location
        );
    }

    /**
     * 获取从获取上一帧到该帧的时间
     * @param index 当前帧下标（为空则是动画总时间）
     * @returns 时间
     */
    getFrameTime(index: number): number {
        if (index === 0) {
            Log.err("对第一帧进行帧间时间获取")
            return 0;
        }
        return this.get(index).time - this.get(index - 1).time;
    }

    //#region 事件帧操作

    /**
     * 插入事件帧
     * @param keyFrameInfo 关键帧信息
     */
    pushEvent(keyFrameInfo: EventFrameInfo): boolean {
        // 判断时是否重复插入
        for (let i = 0; i < this.eventFrameInfos.length; i++) {
            if (this.eventFrameInfos[i].time === keyFrameInfo.time) {
                Log.err("在相同时间重复插入");
                return false;
            }
        }
        this.eventFrameInfos.push(keyFrameInfo);
        this.sortEvent();
        KeyFrame.callChange();
        return true;
    }

    /**
     * 删除事件帧
     * @param index 索引
     */
    delEvent(index: number) {
        this.eventFrameInfos.splice(index, 1);
        KeyFrame.callChange();
    }

    /**
     * 事件帧排序
     */
    sortEvent() {
        this.eventFrameInfos.sort((aInfo, bInfo) => {
            return aInfo.time - bInfo.time;
        })
    }

    /**
     * 修改事件帧时间
     * @param index 索引
     * @param time 时间
     * @returns 修改后的索引
     */
    modifyEventTime(index: number, time: number): number {
        let info = this.eventFrameInfos[index];
        this.eventFrameInfos[index].time = time;
        Log.info("修改事件帧时间", JSON.stringify(this.eventFrameInfos[index]));
        this.sortEvent();
        KeyFrame.callChange();
        return this.eventFrameInfos.indexOf(info);
    }

    /**
     * 修改事件帧名称
     * @param index 索引
     * @param name 名称
     */
    modifyEventName(index: number, name: string) {
        this.eventFrameInfos[index].name = name;
        Log.info("修改事件帧名称", JSON.stringify(this.eventFrameInfos[index]));
        KeyFrame.callChange();
    }

    /**
     * 修改事件帧参数
     * @param index 索引
     * @param param 参数
     */
    modifyEventParams(index: number, params: string) {
        this.eventFrameInfos[index].params = params;
        Log.info("修改事件帧参数", JSON.stringify(this.eventFrameInfos[index]));
        KeyFrame.callChange();
    }

    //#endregion

}