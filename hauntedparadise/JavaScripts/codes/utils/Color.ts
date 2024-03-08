
/**
 * 表示颜色的工具类
 * 该类提供了一些颜色相关的工具方法。
 */
export class ColorUtils {

    /**
     * 将线性颜色转换为十六进制颜色字符串。
     * @param linearColor 要转换的线性颜色。
     * @returns 转换后的十六进制颜色字符串。
     */
    public static linearColorToHexColor(linearColor: LinearColor): string {
        return linearColor.toString();
    }

    /**
     * 将十六进制颜色字符串转换为线性颜色。
     * @param hexColor 要转换的十六进制颜色字符串。
     * @returns 转换后的线性颜色。
     */
    public static colorHexToLinearColor(hexColor: string): LinearColor {

        var res = new LinearColor(0, 0, 0, 0);
        LinearColor.colorHexToLinearColor(hexColor, res);
        return res;
    }

    /**
     * 在两个线性颜色之间进行线性插值。
     * @param startColor 起始颜色。
     * @param endColor 结束颜色。
     * @param t 插值系数，范围为 [0, 1]。
     * @returns 插值后的颜色。
     */
    public static lerp(startColor: LinearColor, endColor: LinearColor, t: number): LinearColor {
        let clampedT = Math.max(0, Math.min(1, t)); // 确保 t 在 [0, 1] 范围内
        let r = startColor.r + (endColor.r - startColor.r) * clampedT;
        let g = startColor.g + (endColor.g - startColor.g) * clampedT;
        let b = startColor.b + (endColor.b - startColor.b) * clampedT;
        let a = startColor.a + (endColor.a - startColor.a) * clampedT;
        return new LinearColor(r, g, b, a);
    }

}