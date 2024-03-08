/**
 * 气泡UI脚本，用于定于气泡UI的属性
 */

export interface IBubbleUI extends mw.UIScript {
	/**显示文本的Textblock */
	text: mw.TextBlock;
	/**文本边界背景 */
	border: mw.Image;
	/**文本背景 */
	bg: mw.Image;
	/**箭头图片 */
	array: mw.Image;
	/**喇叭图片 */
	horn: mw.Image;
}