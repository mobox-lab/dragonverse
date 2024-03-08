import { D4 } from "./Interpolator";

/** 
 * 颜色插值器 Vector2
 */
export class ColorInterpolator {

    protected points: LinearColor[];
    protected time: number[];

    /**
      * 重新计算插值器参数
      * @param points 插值点
      * @returns 自身
      */
    public reCompute(points?: LinearColor[], time?: number[]): ColorInterpolator {
        // 赋值与合法性校验
        if (points && time && points.length == time.length && points.length > 0) {
            this.points = points;
            this.time = time;
        } else {
            console.error("[ColorInterpolator] No points or time to compute.");
            return;
        }
        return this;
    }

    /**
     * 获取目标点的值
     * @param t 时间点
     * @returns 目标点的值
     */
    public interpolate(t: number, outer?: LinearColor): LinearColor {
        if (t < this.time[0]) {
            return this.points[0];
        }
        else if (t > this.time[this.points.length - 1]) {
            return this.points[this.points.length - 1];
        }
        if (outer == undefined) outer = new LinearColor(1, 1, 1);
        const index = this.findIndex(t);
        const t0 = this.time[index];
        const t1 = this.time[index + 1];
        const p0 = this.points[index];
        const p1 = this.points[index + 1];
        const k = (t - t0) / (t1 - t0);
        outer.r = p0.r + (p1.r - p0.r) * k;
        outer.g = p0.g + (p1.g - p0.g) * k;
        outer.b = p0.b + (p1.b - p0.b) * k;
        outer.a = p0.a + (p1.a - p0.a) * k;
        return outer;
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