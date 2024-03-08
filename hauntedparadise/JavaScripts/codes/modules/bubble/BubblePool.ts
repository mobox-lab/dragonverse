import { IBubbleUI } from "./IBubbleUI";

/**
 * 气泡对象池命名空间，用于管理气泡的创建和回收
 */
export namespace BubblePool {
    /**ui文本对象大小常量 */
    export const size = new mw.Vector2(300, 74);
    /**使用Map管理不同的BubbleUI对象池 */
    let _uiPool: Map<number, mwext.ObjPool<IBubbleUI>> = new Map();
    /**世界UI对象池 */
    let _widgetPool: mwext.ObjPool<UIWidget> = null;
    /**创建UI回调 */
    let createUICall: () => IBubbleUI;
    /**当前UI对象池ID ，用来从_widgetPool中获取对应的对象池*/
    export let curId: number;
    /**
     * 获取BubbleUI对象池，判断是否有对象池，没有则创建一个对象池，控制ui对象的可见性、渲染大小和文本大小
     * @param id 对象池ID
     * @returns 返回UI对象池
     */
    export function getUIPool(id: number) {
        let uipool = _uiPool.get(id);
        /**判断是否有对象池，没有则创建一个对象池 */
        if (!uipool) {
            uipool = new mwext.ObjPool(() => {
                const ui = createUICall();
                return ui;
            }, (ui: IBubbleUI) => {
                ui.uiObject.visibility = mw.SlateVisibility.HitTestInvisible;
                ui.uiObject.renderScale = mw.Vector2.zero;
                ui.text.size = size;
            }, ui => { ui.destroy(); });
            _uiPool.set(id, uipool);
        }
        return uipool;
    }

    /**
     * 获取世界UI对象池，判断是否有对象池，没有则重新创建对象池
     * @returns 返回世界UI对象池
     */
    export function getWidgetPool() {
        /**判断是否有对象池，没有则重新创建对象池 */
        if (!_widgetPool) {
            _widgetPool = new mwext.ObjPool<UIWidget>(() => {
                let widget = GameObject.spawn("UIWidget", { replicates: false }) as UIWidget;
                widget.occlusionEnable = false;
                return widget;
            }, (widget: UIWidget) => {
                widget.setVisibility(PropertyStatus.Off)
            }, ui => { ui.destroy(); });
        }
        return _widgetPool;
    }

    /**
     * 注册BubbleUI对象池生成器 ，保存创建UI的回调和ID
     * @param createUIHandler 创建UI的回调
     * @param id 注册BubbleUI对象池的ID
     */
    export function registerUI(createUIHandler: () => IBubbleUI, id: number) {
        createUICall = createUIHandler;
        curId = id;
    }
}