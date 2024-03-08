
/**
 * 关键帧信息（相机插值）
 */
export class KeyFrameInfo {

    /** 动画开始到当前帧时间 */
    private _time: number;
    /** 位置 */
    private _location: mw.Vector;
    /** 旋转 */
    private _rotation: mw.Rotation;
    /** FOV */
    private _fov: number;

    /**
     * 反序列化本对象（注意：反序列化会引起错误，请在外部捕获）
     * @param jsonStr 源文本
     * @returns 返回序列化后的对象
     */
    public static deserialize(jsonStr: string): KeyFrameInfo {
        const object = JSON.parse(jsonStr);
        return new KeyFrameInfo(
            object['_time'],
            new mw.Vector(object['_location']['x'], object['_location']['y'], object['_location']['z']),
            new mw.Rotation(object['_rotation']['x'], object['_rotation']['y'], object['_rotation']['z']),
            object['_fov']
        );
    }

    /** 
     * 构造方法
     * @param time 时间
     * @param location 位置
     * @param rotation 旋转
     * @param fov FOV
     */
    constructor(time: number, location: mw.Vector, rotation: mw.Rotation, fov: number) {
        this.time = time;
        this.location = location;
        this.rotation = rotation;
        this._fov = fov;
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
     * 获取位置
     */
    get location(): mw.Vector {
        return this._location;
    }

    /** 
     * 设置位置
     * @param newLocation 新位置
     */
    set location(newLocation) {
        newLocation.x = Number(newLocation.x.toFixed(2));
        newLocation.y = Number(newLocation.y.toFixed(2));
        newLocation.z = Number(newLocation.z.toFixed(2));
        this._location = newLocation;
    }

    /**
     * 获取旋转
     * @returns 旋转
     */
    get rotation(): mw.Rotation {
        return this._rotation;
    }

    /**
     * 设置旋转
     * @param newRotation 新旋转
     */
    set rotation(newRotation) {
        newRotation.x = Number(newRotation.x.toFixed(2));
        newRotation.y = Number(newRotation.y.toFixed(2));
        newRotation.z = Number(newRotation.z.toFixed(2));
        this._rotation = newRotation;
    }

    /**
     * 获取FOV
     * @returns FOV
     */
    get fov(): number {
        return this._fov;
    }

    /**
     * 设置FOV
     * @param newFOV 新FOV
     */
    set fov(newFOV: number) {
        this._fov = Number(newFOV.toFixed(2));
    }

}
