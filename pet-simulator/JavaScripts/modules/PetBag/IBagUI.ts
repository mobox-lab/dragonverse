export class Layout {
    /**距离panel左侧的偏移量 */
    leftOffsetX: number;
    /**距离panel上方的偏移量 */
    topOffsetY: number;
    /**每个item的间隔 */
    itemInterval: number;
    /**item的宽度 */
    itemWidth: number;
    /**item的高度 */
    itemHeight: number;
    /**每行item的数量 */
    itemCount: number;
}


export interface IBagUI {
    /**布局 */
    layout: Layout;

    initLayout(): Layout;
}

