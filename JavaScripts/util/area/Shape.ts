import { orient2d } from "robust-predicates";
import GToolkit from "../GToolkit";

export type AnyShape = IShape2 | IShape3;

/**
 * Point in 2D.
 */
export interface IPoint2 {
    x: number;
    y: number;
}

/**
 * Point in 3D.
 */
export interface IPoint3 {
    x: number;
    y: number;
    z: number;
}

const RANDOM_MAX_TRIAL = 20;

/**
 * I Shape in 2D.
 * 2D 形状.
 * @desc 提供形状的基本操作.
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
export interface IShape2 {
    /**
     * 定义点.
     * 不允许更改.
     */
    points(): IPoint2[];

    /**
     * 是否 给定点在 Shape 内.
     * @param point
     */
    inShape(point: IPoint2): boolean;

    /**
     * 随机获取 Shape 内一点.
     * @desc Monte Carlo 法.
     * @param trial 最大尝试次数.
     */
    randomPoint(trial: number): IPoint2 | null;

    /**
     * 包围盒.
     * @return [IPoint2, IPoint2] [{x 最小值,y 最小值},{x 最大值,y 最大值}]
     */
    boundingBox(): [IPoint2, IPoint2];

    /**
     * 包围盒面积.
     */
    boundingBoxArea(): number;
}

/**
 * I Shape in 3D.
 * 3D 形状.
 * @desc 提供形状的基本操作.
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
export interface IShape3 {
    /**
     * 定义点.
     * 不允许更改.
     */
    points(): IPoint3[];

    /**
     * 是否 给定点在 Shape 内.
     * @param point
     */
    inShape(point: IPoint3): boolean;

    /**
     * 随机获取 Shape 内一点.
     * @desc Monte Carlo 法.
     * @param trial 最大尝试次数.
     */
    randomPoint(trial: number): IPoint3 | null;

    /**
     * 包围盒.
     * @return [IPoint3, IPoint3] [{x 最小值, y 最小值, z 最小值},{x 最大值, y 最大值, z 最大值}]
     */
    boundingBox(): [IPoint3, IPoint3];

    /**
     * 包围盒体积.
     */
    boundingBoxVolume(): number;
}

/**
 * PolygonShape.
 * 多边形.
 * @desc 由一系列点 依先后顺序构成.
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
export default class PolygonShape implements IShape2 {
    /**
     * 顺序点.
     * @desc 按顺序存储的点.
     * @desc 按顺序构成一个图形。
     * @private
     */
    private readonly _seqPoints: IPoint2[];

    /**
     * 将给定点转换为凸包并作为 PolygonShape.
     * 仅接受有效参数. 有效参数指:
     *   - 设定输入点为 p0,p1...pn. 定义其构成边 l, 其中 li 由两相邻点 (pi-1,pi) i>1 或 (pn,p0) 构成.
     *   - 输入点个数 n>=3 且任意两边 li,lj 不相交.
     * @desc Graham's Scan 法构建.
     * @param points
     * @constructor
     */
    public static toConvexHull(points: IPoint2[]): PolygonShape {
        if (!this.lengthCheck(points)) {
            return null;
        }

        const minPoint = this.getMinPoint(points);
        this.sortByPolarAngle(points, minPoint);
        const convexHull: IPoint2[] = [points[0], points[1], points[2]];

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

        return new PolygonShape(convexHull);
    }

    /**
     * 将给定点作为 PolygonShape.
     * 仅接受有效参数. 有效参数指:
     * - 设定输入点为 p0,p1...pn. 定义其构成边 l, 其中 li 由两相邻点 (pi-1,pi) i>1 或 (pn,p0) 构成.
     * - 输入点个数 n>=3 且任意两边 li,lj 不相交.
     *
     * @param points
     * @constructor
     */
    public static toSeqPoint(points: IPoint2[]): PolygonShape {
        if (!this.lengthCheck(points)) {
            return null;
        }

        return new PolygonShape(points);
    }

    constructor(seqPoints: IPoint2[]) {
        this._seqPoints = seqPoints;
    }

    public points(): IPoint2[] {
        return [...this._seqPoints];
    }

    public inShape(point: IPoint2): boolean {
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

    public randomPoint(trial: number = RANDOM_MAX_TRIAL): IPoint2 | null {
        const [pointMin, pointMax] = this.boundingBox();
        let tried = 0;

        let x: number = null;
        let y: number = null;

        while (tried < trial) {
            x = Math.random() * (pointMax.x - pointMin.x) + pointMin.x;
            y = Math.random() * (pointMax.y - pointMin.y) + pointMin.y;
            if (this.inShape({x, y})) return {x: x, y: y};
            ++tried;
        }

        return null;
    }

    public boundingBox(): [IPoint2, IPoint2] {
        return pointsBoundingBoxIn2D(this._seqPoints);
    }

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
    private static lengthCheck(points: IPoint2[]): boolean {
        return points.length >= 3;
    }

    /**
     * 获取最小点.
     * @desc 最小点指 y 值最小的点，如果 y 值相同则取 x 值最小的点.
     * @param points
     */
    private static getMinPoint(points: IPoint2[]) {
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
    private static sortByPolarAngle(points: IPoint2[], center: IPoint2) {
        points.sort((a, b) => {
            let aAngle = Math.atan2(a.y - center.y, a.x - center.x);
            let bAngle = Math.atan2(b.y - center.y, b.x - center.x);
            if (aAngle < 0) aAngle += Math.PI * 2;
            if (bAngle < 0) bAngle += Math.PI * 2;
            return aAngle - bAngle;
        });
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

/**
 * Point3SetShape.
 * 三维点集.
 * @desc 组成一系列离散点.
 * @desc 允许重复点.
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
export class Point3SetShape implements IShape3 {
    private readonly _points: IPoint3[];

    constructor(points: IPoint3[]) {
        this._points = points;
    }

    public points(): IPoint3[] {
        return [...this._points];
    }

    public boundingBox(): [IPoint3, IPoint3] {
        return pointsBoundingBoxIn3D(this._points);
    }

    public boundingBoxVolume(): number {
        const [p1, p2] = this.boundingBox();
        return (p2.x - p1.x) * (p2.y - p1.y) * (p2.z - p1.z);
    }

    public inShape(point: IPoint3): boolean {
        return this._points
                .find(value =>
                    value.x === point.x &&
                    value.y === point.y &&
                    value.z === point.z)
            !== undefined;
    }

    public randomPoint(trial: number = 1): IPoint3 | null {
        const rand = this._points[this._points.length * Math.random() | 0];
        return {x: rand.x, y: rand.y, z: rand.z};
    }
}

/**
 * 给定组合图形中的随机一点.
 * @desc 包装盒权重法. 根据包装盒面积作为权重计算所选的区域.
 * @param shapes
 * @param maxTrial 尝试次数.
 */
export function randomPointInShapes2(shapes: IShape2[], maxTrial: number = RANDOM_MAX_TRIAL): IPoint2 {
    const weight: number[] = shapes.map(value => value.boundingBoxArea());
    const i = GToolkit.randomWeight(weight);
    if (i !== -1) {
        return shapes[i].randomPoint(maxTrial);
    } else {
        return null;
    }
}

function pointsBoundingBoxIn2D(points: IPoint2[]): [IPoint2, IPoint2] {
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

function pointsBoundingBoxIn3D(points: IPoint3[]): [IPoint3, IPoint3] {
    let minX: number = points[0]?.x ?? 0;
    let minY: number = points[0]?.y ?? 0;
    let minZ: number = points[0]?.z ?? 0;
    let maxX: number = points[0]?.x ?? 0;
    let maxY: number = points[0]?.y ?? 0;
    let maxZ: number = points[0]?.z ?? 0;

    for (const point of points) {
        if (point.x < minX) {
            minX = point.x;
        }
        if (point.y < minY) {
            minY = point.y;
        }
        if (point.z < minZ) {
            minZ = point.z;
        }
        if (point.x > maxX) {
            maxX = point.x;
        }
        if (point.y > maxY) {
            maxY = point.y;
        }
        if (point.z > maxZ) {
            maxZ = point.z;
        }
    }

    return [
        {x: minX, y: minY, z: minZ},
        {x: maxX, y: maxY, z: maxZ},
    ];
}

export function Point3FromArray(point: number[]): IPoint3 {
    return {
        x: point[0],
        y: point[1],
        z: point[2],
    };
}