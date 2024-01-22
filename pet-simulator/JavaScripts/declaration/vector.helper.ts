

interface Array<T> {
    /**
     * 移除数组中predicate为true的第一个元素的索引，-1
     * 否则。
     * @param predicate 为数组的每个元素调用 predicate 一次，按升序排列
     * 顺序，直到它找到predicate返回 true 的一个。如果找到这样的元素，
     * 删除。否则，不做处理。
     * @param thisArg 如果提供，它将用作每次调用的 this 值
     * 谓词。如果未提供，则使用 undefined 代替。
     */
    remove(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): boolean
}
declare namespace mw {

    export interface Vector {



        /**
         * 确保当前向量值在给定范围内
         * @param min 最小值
         * @param max 最大值
         */
        clamp(min: mw.Vector, max: mw.Vector): this

        /**
         * 与给定向量得每个分量相比较。如果超过范围
         * 会设置对应分量值为范围值
         * @param v 
         */
        min(v: mw.Vector): this;

        /**
        * 与给定向量得每个分量相比较。如果超过范围
        * 会设置对应分量值为范围值
        * @param v 
        */
        max(v: mw.Vector): this;


        /**
         * 与目标向量混合
         * @param v 目标向量
         * @param t 混合比重
         */
        mix(v: mw.Vector, t: number): this

        /**
         * 向量点乘
         * @param v 
         */
        dot(v: mw.Vector): number;


        /**
         * 与指定向量叉乘，结果存储在本向量中
         * @param v 
         */
        cross(v: mw.Vector): this;

        /**
         * 将两个向量叉乘结果存储在本向量内
         * @param v 
         * @param a 
         */
        crossVectors(v: mw.Vector, a: mw.Vector): this


        /**
         * 计算与指定向量得夹角
         * @param v 弧度
         */
        angleTo(v: mw.Vector): number


        /**
         * 计算与指定向量之间得距离 会开方 多数情况应该使用 {@link squaredDistanceTo}
         * @param v 
         */
        distanceTo(v: mw.Vector): number;


        /**
         * 求两个向量之间得距离平方
         * @param v 
         */
        squaredDistanceTo(v: mw.Vector): number


        /**
         * 判断两个向量是否相等
         * @param v 
         */
        equal(v: mw.Vector): boolean




        /**
         * 将本向量旋转指定角度
         * @param angle 
         */
        rotate(angle: number): this;


        /**
         * 插值
         */
        lerp(v: mw.Vector, t: number, outer?: mw.Vector): this


        /**
         * 将两个向量的插值结果存储到本向量中
         * @param s  源
         * @param v  目标
         * @param t 
         */
        lerps(s: mw.Vector, v: mw.Vector, t: number): this

        fromArray(candidates: number[], start?: number): this;




        /**
         * 判定是否合法
         */
        assert(): boolean
        toUEVector(): any

    }

    export interface Rotation {

        lerp(v: mw.Rotation, t: number): mw.Vector;

        lerps(from: mw.Rotation, to: mw.Rotation, t: number): mw.Vector;

    }


    export interface Vector2 {

        lerp(to: mw.Vector2, t: number, outer?: mw.Vector2): mw.Vector2;
    }

}

