import { D2, D3, Interpolator2, Interpolator3 } from "./Interpolator";

/** 
 * 三次样条插值器参数组
 */
type CubicSplineSegment = {
    a: number;
    b: number;
    c: number;
    d: number;
};


/** 
 * 三次样条插值器 Vector3
 */
export class CubicInterpolator<T extends D3> extends Interpolator3<T> {

    /** 需要计算的三维数据 */
    protected points: T[];
    /** 需要计算的时间数据 */
    protected time: number[];

    /** 拆解轴 */
    protected xPoints: D2[] = [];
    protected yPoints: D2[] = [];
    protected zPoints: D2[] = [];

    /** 插值器 */
    protected cubicInterpolator2x: CubicInterpolator2<D2> = new CubicInterpolator2<D2>();
    protected cubicInterpolator2y: CubicInterpolator2<D2> = new CubicInterpolator2<D2>();
    protected cubicInterpolator2z: CubicInterpolator2<D2> = new CubicInterpolator2<D2>();

    /**
     * 重新计算插值器参数
     * @param points 插值点
     * @param time 时间点
     */
    public reCompute(points?: T[], time?: number[]): CubicInterpolator<T> {
        // 赋值与合法性校验
        if (points && time && points.length == time.length && points.length > 0) {
            this.points = points;
            this.time = time;
        } else {
            console.error("[CubicInterpolator] No points or time to compute.");
            return;
        }

        // 拆解轴
        this.xPoints.length = 0;
        this.yPoints.length = 0;
        this.zPoints.length = 0;
        for (let i = 0; i < points.length; i++) {
            this.xPoints.push(new D2(time[i], points[i].x));
            this.yPoints.push(new D2(time[i], points[i].y));
            this.zPoints.push(new D2(time[i], points[i].z));
        }

        this.cubicInterpolator2x.reCompute(this.xPoints);
        this.cubicInterpolator2y.reCompute(this.yPoints);
        this.cubicInterpolator2z.reCompute(this.zPoints);
        return this;
    }

    /**
     * 获取目标点的值
     * @param t 时间点
     * @param outer 接收向量
     */
    interpolate(t: number, outer: T): T {
        if (t < this.time[0]) {
            return null;
        }
        else if (t > this.time[this.points.length - 1]) {
            return null
        }
        // if (outer == undefined) outer = new Vector();
        outer.x = this.cubicInterpolator2x.interpolate(t);
        outer.y = this.cubicInterpolator2y.interpolate(t);
        outer.z = this.cubicInterpolator2z.interpolate(t);
        return outer;
    }

}


/** 
 * 三次样条插值器 Vector2
 * 需线性扫描X轴作为t值
 */
export class CubicInterpolator2<T extends D2> extends Interpolator2<T> {

    /** 需要计算的二维数据 */
    protected points: T[];

    /** 计算后的参数组 */
    protected segments: CubicSplineSegment[];

    protected h: number[];

    /**
     * 获取目标点的值
     * @param t 时间点
     * @returns 目标点的值
     */
    public interpolate(t: number): number {
        if (t < this.points[0].x) {
            return null;
        }
        else if (t > this.points[this.points.length - 1].x) {
            return null
        }
        const i = this.findIndex(t);
        const dx = t - this.points[i].x;
        const segment = this.segments[i];
        const result = segment.a + segment.b * dx + segment.c * dx ** 2.0 + segment.d * dx ** 3.0;
        return result;
    }

    /**
     * 重新计算插值器参数
     * @param points 插值点
     * @returns 自身
     */
    public reCompute(points?: T[]): CubicInterpolator2<T> {
        // 赋值与合法性校验
        if (points) {
            this.points = points;
        } else {
            console.error("[CubicInterpolator2] No points to compute.");
            return;
        }

        this.h = new Array(points.length - 1);
        this.segments = new Array(points.length - 1);

        for (let i = 0; i < this.h.length; i++) {
            this.h[i] = points[i + 1].x - points[i].x;
        }

        const a = new Array(points.length);
        for (let i = 1; i < a.length - 1; i++) {
            a[i] =
                (3 / this.h[i]) * (points[i + 1].y - points[i].y) -
                (3 / this.h[i - 1]) * (points[i].y - points[i - 1].y);
        }

        // Compute segments
        const l = new Array(points.length - 1);
        const mu = new Array(points.length - 1);
        const z = new Array(points.length);

        l[0] = 1;
        mu[0] = 0;
        z[0] = 0;

        for (let i = 1; i < this.segments.length; i++) {
            l[i] = 2 * (points[i + 1].x - points[i - 1].x) - this.h[i - 1] * mu[i - 1];
            mu[i] = this.h[i] / l[i];
            z[i] =
                (a[i] - this.h[i - 1] * z[i - 1]) /
                l[i];
        }

        l[this.segments.length] = 1;
        z[this.segments.length] = 0;
        this.segments[this.segments.length - 1] = { a: 0, b: 0, c: 0, d: 0 };

        for (let i = this.segments.length - 1; i >= 0; i--) {
            this.segments[i] = {
                a: points[i].y,
                b: (points[i + 1].y - points[i].y) / this.h[i] - (this.h[i] * (z[i + 1] + 2 * z[i])) / 3,
                c: z[i],
                d: (z[i + 1] - z[i]) / (3 * this.h[i]),
            };
        }
        return this;
    }

    /** 
     * 查找当前值所处区间
     */
    protected findIndex(x: number): number {
        for (let i = 0; i < this.points.length; i++) {
            console.log(this.points[i].x, x);
            if (this.points[i].x - x >= 0) {
                return i - 1
            }
        }
        return -1;
    }

}