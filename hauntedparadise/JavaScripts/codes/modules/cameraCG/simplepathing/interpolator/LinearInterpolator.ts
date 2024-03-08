import { D2, D3, Interpolator2, Interpolator3 } from "./Interpolator";

/** 
 * 线性插值器 Vector3
 */
export class LinearInterpolator<T extends D3> extends Interpolator3<T> {

    protected points: T[];
    protected time: number[];

    /**
     * 重新计算插值器参数
     * @param points 插值点
     * @param time 时间点
     * @returns 自身
     */
    public reCompute(points?: T[], time?: number[]): LinearInterpolator<T> {
        // 赋值与合法性校验
        if (points && time && points.length == time.length && points.length > 0) {
            this.points = points;
            this.time = time;
        } else {
            console.error("[LinearInterpolator] No points or time to compute.");
            return;
        }
        return this;
    }

    /**
     * 获取目标点的值
     * @param t 时间点
     * @param outer 接收向量
     * @returns 目标点的值
     */
    public interpolate(t: number, outer?: T): T {
        if (t < this.time[0]) {
            return this.points[0];
        }
        else if (t > this.time[this.points.length - 1]) {
            return this.points[this.points.length - 1];
        }
        // if (outer == undefined) outer = new T();
        const i = this.findIndex(t);
        const t1 = this.time[i];
        const t2 = this.time[i + 1];
        const p1 = this.points[i];
        const p2 = this.points[i + 1];
        const k = (t - t1) / (t2 - t1);
        outer.x = this.interpolateValue(p1.x, p2.x, k);
        outer.y = this.interpolateValue(p1.y, p2.y, k);
        outer.z = this.interpolateValue(p1.z, p2.z, k);
        return outer;
    }

    /** 
     * 二维插值
     * @param a 起点
     * @param b 终点
     * @param t 时间点
     */
    public interpolateValue(a: number, b: number, t: number): number {
        return a + (b - a) * t;
    }

    /** 
     * 查找时间点所在的区间
     * @param t 时间点
     * @returns 区间索引
     */
    protected findIndex(t: number): number {
        for (let i = 0; i < this.time.length - 1; i++) {
            if (t >= this.time[i] && t <= this.time[i + 1]) {
                return i;
            }
        }
        return -1;
    }
}

/** 
 * 线性插值器 Vector2
 */
export class LinearInterpolator2<T extends D2> extends Interpolator2<T> {

    protected points: T[];

    /**
      * 重新计算插值器参数
      * @param points 插值点
      * @returns 自身
      */
    public reCompute(points?: T[]): Interpolator2<T> {
        // 赋值与合法性校验
        if (points && points.length > 0) {
            this.points = points;
        } else {
            console.error("[LinearInterpolator] No points or time to compute.");
            return;
        }
        return this;
    }

    /**
     * 获取目标点的值
     * @param t 时间点
     * @returns 目标点的值
     */
    public interpolate(t: number): number {
        if (t < this.points[0].y) {
            return this.points[0].x;
        }
        else if (t > this.points[this.points.length - 1].y) {
            return this.points[this.points.length - 1].x;
        }
        const i = this.findIndex(t);
        const t1 = this.points[i].y;
        const t2 = this.points[i + 1].y;
        const p1 = this.points[i].x;
        const p2 = this.points[i + 1].x;
        const k = (t - t1) / (t2 - t1);
        return this.interpolateValue(p1, p2, k);
    }

    protected interpolateValue(a: number, b: number, t: number): number {
        return a + (b - a) * t;
    }

    /** 
     * 查找时间点所在的区间
     * @param t 时间点
     * @returns 区间索引
     */
    protected findIndex(t: number): number {
        for (let i = 0; i < this.points.length - 1; i++) {
            if (t >= this.points[i].y && t <= this.points[i + 1].y) {
                return i;
            }
        }
        return -1;
    }

}