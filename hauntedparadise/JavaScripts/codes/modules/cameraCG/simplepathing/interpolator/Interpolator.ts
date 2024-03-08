
/** 
 * Dimensions 2
 */
export class D2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number) {
        this.x = x;
        this.y = y;
    }
}

/** 
 * Dimensions 3
 */
export class D3 extends D2 {
    z: number
    constructor(x?: number, y?: number, z?: number) {
        super(x, y);
        this.z = z;
    }
}

/** 
 * Dimensions 4
 */
export class D4 extends D3 {
    w: number
    constructor(x?: number, y?: number, z?: number, w?: number) {
        super(x, y, z);
        this.w = w;
    }
}


/**
 * 二维插值器基类
 */
export abstract class Interpolator2<T extends D2> {

    /**
     * 重新计算插值器参数
     * @param points 插值点
     * @returns 自身
     */
    public abstract reCompute(points?: T[]): Interpolator2<T>;

    /**
     * 获取目标点的值
     * @param t 时间点
     * @returns 目标点的值
     */
    public abstract interpolate(t: number): number;

}


/** 
 * 三维插值器基类
 */
export abstract class Interpolator3<T extends D3> {

    /** 
     * 重新计算插值器参数
     * @param points 插值点
     * @param time 时间点
     * @returns 自身
     */
    public abstract reCompute(points?: T[], time?: number[]): Interpolator3<T>;

    /** 
     * 获取目标点的值
     * @param t 时间点
     * @param outer 接收向量
     * @returns 目标点的值
     */
    public abstract interpolate(t: number, outer?: T): T;

}


