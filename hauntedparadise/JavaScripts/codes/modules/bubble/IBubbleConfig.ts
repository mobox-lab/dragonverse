/**
 * 气泡配置，用于配置气泡的存在时间，最大存在数量，头顶偏移
 */
export interface IBubbleConfig {
    /**存在时间 */
    time: number;
    /**最大存在数量 */
    maxCount: number;
    /**头顶偏移 */
    offset: number;
}

/**
 * 气泡皮肤UI配置，用于配置气泡的UI显示
 */
export interface IBubbleSkin {
    /**当前配置ID */
    id: number;
    /**气泡文字颜色 */
    textColor: mw.LinearColor;
    /**气泡文字大小 */
    fontSize: number;
    /**背景图片guid */
    bg: string;
    /**背景颜色 */
    bgColor: mw.LinearColor;
    /**是否显示显示边框 */
    borderVisible: boolean;
    /**边框图片guid*/
    border: string;
    /**边框颜色 */
    borderColor: mw.LinearColor;
    /**是否显示气泡箭头图片 */
    arrayVisible: boolean;
    /**气泡文字上边距 */
    borderSpaceUp: number;
    /**气泡文字下边距 */
    borderSpaceDown: number;
    /**气泡文字左边距 */
    borderSpaceLeft: number;
    /**气泡文字右边距 */
    borderSpaceRight: number;
    /**气泡的UI层级 */
    zOrder: number;
    /**是否显示气泡喇叭图片 */
    hornVisiable: boolean;
}