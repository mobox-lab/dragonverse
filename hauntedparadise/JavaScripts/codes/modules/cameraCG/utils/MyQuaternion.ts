export class MyQuaternion {

    public w: number = 0;
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;

    /** 模长 */
    get length(): number {
        return Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
    }

    /** 共轭 */
    get conjugated(): MyQuaternion {
        return new MyQuaternion(this.w, -this.x, -this.y, -this.z);
    }

    /** 四元数的逆（共轭/模长^2）*/
    get inverted(): MyQuaternion {
        const length2 = Math.pow(this.length, 2);
        const conjugated = this.conjugated;
        return new MyQuaternion(conjugated.w / length2, conjugated.x / length2, conjugated.y / length2, conjugated.z / length2);
    }

    constructor(w?: number, x?: number, y?: number, z?: number) {
        if (w) {
            this.w = w;
        }
        if (x) {
            this.x = x;
        }
        if (y) {
            this.y = y;
        }
        if (z) {
            this.z = z;
        }
    }

    /**
     * 通过欧拉角设置四元数值
     */
    setEulerAngles(euler: mw.Vector) {
        this.euler2quat(euler.x, euler.y, euler.z);
    }

    private euler2quat(roll: number, pitch: number, yaw: number) {

        // 度数到半径
        yaw = yaw * Math.PI / 180;
        // 引擎中实际坐标方向与参考公式坐标修正
        pitch = -pitch * Math.PI / 180;
        roll = -roll * Math.PI / 180;

        // 各角度函数的缩写
        const cy = Math.cos(yaw * 0.5);
        const sy = Math.sin(yaw * 0.5);
        const cp = Math.cos(pitch * 0.5);
        const sp = Math.sin(pitch * 0.5);
        const cr = Math.cos(roll * 0.5);
        const sr = Math.sin(roll * 0.5);

        this.w = cy * cp * cr + sy * sp * sr;
        this.x = cy * cp * sr - sy * sp * cr;
        this.y = sy * cp * sr + cy * sp * cr;
        this.z = sy * cp * cr - cy * sp * sr;

    }

    /**
     * 四元数乘向量
     * @param v 
     * @param q 
     * @param out 接收值，没有则会创建
     * @returns 相乘结果向量
     */
    static multiplyVector(v: mw.Vector, q: MyQuaternion, out?: mw.Vector) {
        if (!out) {
            out = new mw.Vector();
        }
        // 扩充向量
        const vExp = new MyQuaternion(0, v.x, v.y, v.z);
        // q * v = (q) * (v扩充) * (q的逆)
        const result = this.multiply(this.multiply(q, vExp), q.inverted);
        out.x = result.x;
        out.y = result.y;
        out.z = result.z;
        return out;
    }

    /**
     * 四元数叉乘
     * @param q1 
     * @param q2 
     * @param out 接收值，没有则会创建
     */
    static multiply(q1: MyQuaternion, q2: MyQuaternion, out?: MyQuaternion) {
        if (!out) {
            out = new MyQuaternion();
        }
        out.w = q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z;
        out.x = q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y;
        out.y = q1.w * q2.y + q1.y * q2.w + q1.z * q2.x - q1.x * q2.z;
        out.z = q1.w * q2.z + q1.z * q2.w + q1.x * q2.y - q1.y * q2.x;
        return out
    }

    toString(): string {
        return `{x:${this.x},y:${this.y},z:${this.z},w:${this.w}}`
    }
}