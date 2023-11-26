import { orient2d } from "robust-predicates";
import GToolkit from "../GToolkit";

/**
 * Point.
 */
interface IPoint {
    x: number;
    y: number;
}

/**
 * Shape.
 * @desc 一个区域. 由一系列点 依先后顺序构成.
 * @desc ---
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
export default class Shape {
    /**
     * 顺序点.
     * @desc 按顺序存储的点.
     * @desc 按顺序构成一个图形。
     * @private
     */
    private readonly _seqPoints: IPoint[];

    /**
     * 将给定点转换为凸包并作为 Shape.
     * 仅接受有效参数. 有效参数指:
     *   - 设定输入点为 p0,p1...pn. 定义其构成边 l, 其中 li 由两相邻点 (pi-1,pi) i>1 或 (pn,p0) 构成.
     *   - 输入点个数 n>=3 且任意两边 li,lj 不相交.
     * @desc Graham's Scan 法构建.
     * @param points
     * @constructor
     */
    public static toConvexHull(points: IPoint[]): Shape {
        if (!this.lengthCheck(points)) {
            return null;
        }

        const minPoint = this.getMinPoint(points);
        this.sortByPolarAngle(points, minPoint);
        const convexHull: IPoint[] = [points[0], points[1], points[2]];

        for (let i = 3; i < points.length; i++) {
            let point = points[i];
            if (i < 2) {
                convexHull.push(point);
                continue;
            }
            while (
                orient2d(
                    convexHull[convexHull.length - 2].x,
                    convexHull[convexHull.length - 2].y,
                    convexHull[convexHull.length - 1].x,
                    convexHull[convexHull.length - 1].y,
                    point.x,
                    point.y) > 0
                ) {
                convexHull.pop();
            }

            convexHull.push(point);
        }

        return new Shape(convexHull);
    }

    /**
     * 将给定点作为 Shape.
     * 仅接受有效参数. 有效参数指:
     * - 设定输入点为 p0,p1...pn. 定义其构成边 l, 其中 li 由两相邻点 (pi-1,pi) i>1 或 (pn,p0) 构成.
     * - 输入点个数 n>=3 且任意两边 li,lj 不相交.
     *
     * @param points
     * @constructor
     */
    public static toSeqPoint(points: IPoint[]): Shape {
        if (!this.lengthCheck(points)) {
            return null;
        }

        return new Shape(points);
    }

    /**
     * 给定组合图形中的随机一点.
     * @desc 包装盒权重法. 根据包装盒面积作为权重计算所选的区域.
     * @param shapes
     */
    public static randomPoint(shapes: Shape[]): IPoint {
        const weight: number[] = shapes.map(value => value.boundingBoxArea());
        const i = GToolkit.randomWeight(weight);
        if (i !== -1) {
            return shapes[i].randomPoint();
        } else {
            return null;
        }
    }

    constructor(seqPoints: IPoint[]) {
        this._seqPoints = seqPoints;
    }

    /**
     * 是否 给定点在 Shape 内.
     * @param point
     */
    public inShape(point: IPoint): boolean {
        let inside = false;

        for (let i = 0, j = this._seqPoints.length - 1; i < this._seqPoints.length; j = i++) {
            const pi = this._seqPoints[i];
            const pj = this._seqPoints[j];

            const intersect =
                (pi.y > point.y) !== (pj.y > point.y) &&
                point.x < (pj.x - pi.x) * (point.y - pi.y) / (pj.y - pi.y) + pi.x;

            if (intersect) {
                inside = !inside;
            }
        }

        return inside;
    }

    /**
     * 随机获取 Shape 内一点.
     * @desc Monte Carlo 法.
     * @param trial 最大尝试次数.
     */
    public randomPoint(trial: number = 20): IPoint {
        const [pointMin, pointMax] = this.boundingBox();
        let tried = 0;

        let x: number = null;
        let y: number = null;

        while (x === null || this.inShape({x, y}) && tried < trial) {
            x = Math.random() * (pointMax.x - pointMin.x) + pointMin.x;
            y = Math.random() * (pointMax.y - pointMin.y) + pointMin.y;
            ++tried;
        }

        return {x, y};
    }

    /**
     * 包围盒.
     * @return [IPoint, IPoint] [左下点,右下点]
     */
    public boundingBox(): [IPoint, IPoint] {
        return Shape.boundingBox(this._seqPoints);
    }

    /**
     * 包围盒面积.
     */
    public boundingBoxArea(): number {
        const [p1, p2] = this.boundingBox();
        return (p2.y - p1.y) * (p2.x - p1.x);
    }

//#region Util
    /**
     * 参数长度检查.
     * @desc 区域至少需要 3 个点.
     * @param points
     */
    public static lengthCheck(points: IPoint[]): boolean {
        return points.length >= 3;
    }

    /**
     * 获取最小点.
     * @desc 最小点指 y 值最小的点，如果 y 值相同则取 x 值最小的点.
     * @param points
     */
    public static getMinPoint(points: IPoint[]) {
        let minPoint = points[0];
        let i = 1;
        for (; i < points.length; i++) {
            const curr = points[i];
            if (curr.y < minPoint.y || (curr.y === minPoint.y && curr.x < minPoint.x)) {
                minPoint = curr;
            }
        }

        return minPoint;
    }

    /**
     * 极角排序.
     * @param points
     * @param center
     */
    public static sortByPolarAngle(points: IPoint[], center: IPoint) {
        points.sort((a, b) => {
            let aAngle = Math.atan2(a.y - center.y, a.x - center.x);
            let bAngle = Math.atan2(b.y - center.y, b.x - center.x);
            if (aAngle < 0) aAngle += Math.PI * 2;
            if (bAngle < 0) bAngle += Math.PI * 2;
            return aAngle - bAngle;
        });
    }

    /**
     * 包围盒.
     * @desc 获取点集中最小和最大的 x,y 值.
     * @param points
     */
    public static boundingBox(points: IPoint[]): [IPoint, IPoint] {
        let minX: number = points[0]?.x ?? 0;
        let minY: number = points[0]?.y ?? 0;
        let maxX: number = points[0]?.x ?? 0;
        let maxY: number = points[0]?.y ?? 0;

        for (const point of points) {
            if (point.x < minX) {
                minX = point.x;
            }
            if (point.y < minY) {
                minY = point.y;
            }
            if (point.x > maxX) {
                maxX = point.x;
            }
            if (point.y > maxY) {
                maxY = point.y;
            }
        }

        return [
            {x: minX, y: minY},
            {x: maxX, y: maxY},
        ];
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}