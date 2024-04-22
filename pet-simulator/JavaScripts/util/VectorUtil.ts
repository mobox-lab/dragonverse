export class VectorUtil {

    /**二维空间距离平方 */
    public static squaredDistancePlane(v1: mw.Vector, v2: mw.Vector): number {
        if (v1 == null || v2 == null) return null;
        const dx = v1.x - v2.x;
        const dy = v1.y - v2.y;
        return dx * dx + dy * dy;
    }

    /**二维空间距离 */
    public static distancePlane(v1: mw.Vector, v2: mw.Vector): number {
        return Math.sqrt(this.squaredDistancePlane(v1, v2));
    }

    /**二维平面方向 */
    public static directionPlane(v1: mw.Vector, v2: mw.Vector): mw.Vector {
        const dx = v2.x - v1.x;
        const dy = v2.y - v1.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        return new mw.Vector(dx / len, dy / len);
    }

}