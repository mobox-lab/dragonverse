import { D2, D3, D4, Interpolator2, Interpolator3 } from "./Interpolator";
import { CubicInterpolator } from "./CubicInterpolator";
import { LinearInterpolator, LinearInterpolator2 } from "./LinearInterpolator";
import { ColorInterpolator } from "./ColorInterpolator";

/** 
 * 插值器接口
 */
export enum InterpolatorType {
    Linear = 0,
    Cubic
}

/**
 * 插值器工厂
 */
export class InterpolatorFactory {

    /**
     * 生成插值器3D
     * @param type 插值器类型
     * @returns 插值器
     */
    public static createInterpolator<T extends D3>(type: InterpolatorType): Interpolator3<T> {
        switch (type) {
            case InterpolatorType.Linear:
                return new LinearInterpolator<T>();
            case InterpolatorType.Cubic:
                return new CubicInterpolator<T>();
            default:
                return null;
        }
    }

    /**
     * 生成插值器2D
     * @param type 插值器类型
     * @returns 插值器
     */
    public static createInterpolator2<T extends D2>(type: InterpolatorType): Interpolator2<T> {
        switch (type) {
            case InterpolatorType.Linear:
                return new LinearInterpolator2<T>();
            default:
                return null;
        }
    }

    /**
     * 生成颜色插值器
     * @returns 插值器
     */
    public static createColorInterpolator(): ColorInterpolator {
        return new ColorInterpolator();
    }

}