/** 
 * @Author       : xiaohao.li
 * @Date         : 2024-01-18 17:34:48
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-19 14:40:48
 * @FilePath     : \nevergiveup\JavaScripts\tool\FlyText.ts
 * @Description  : 修改描述
 */
// @空伊伊 （记得给帖子点个赞哦 (●'◡'●)）

import { Config } from "../GameStart";
import Utils from "../Utils";

export class FlyText {
    // 单例模式
    private static _instance: FlyText;
    public static get instance() {
        if (FlyText._instance == null) {
            FlyText._instance = new FlyText();
        }
        return FlyText._instance;
    }

    private _uiWidget: UserWidget;
    private _rootCanvas: Canvas;
    private _textPools: TextBlock[] = [];


    /**默认文本框大小（由于开启了自适应，所以文本框有多大，文本就有多大） */
    private _defaultTextSize: Vector2 = Config.hurtTextSize.clone();
    /**默认文本颜色 */
    private _defaultFontColor: LinearColor = Config.hurtTextColor.clone();


    /**
     * 展示飘字
     * @param content 内容
     * @param worldLocation 世界坐标
     * @param color 颜色（可选）
     */
    public showFlyText(content: string, worldLocation: Vector, color?: LinearColor) {
        // 将世界坐标转换为屏幕坐标
        let vec2 = InputUtil.projectWorldPositionToWidgetPosition(worldLocation, true).screenPosition;
        // 对象池处理
        let textBlock: TextBlock;
        if (this._textPools.length == 0) {
            textBlock = this.createText()
        } else {
            textBlock = this._textPools.pop();
        }
        // 给一点初始偏移，方便做动画
        vec2.x -= 30
        vec2.y -= 20;
        let toX = Utils.getRandomIntInclusive(5, 10);
        Math.random() < 0.5 ? toX = -toX : toX = toX;
        let toY = Utils.getRandomIntInclusive(-10, -5);
        // 用Tween，并结合PI来做曲线动画
        let animator = new Tween({ a: 0 }).to({ a: Math.PI }, Config.hurtTextDuration * 1000).onUpdate((object) => {
            textBlock.position = vec2.clone().add(new Vector2(toX * object.a / Math.PI, toY * Math.sin(object.a) * 2));
            textBlock.renderScale = new Vector2(Math.sin(object.a));
        }).onStart(() => {
            textBlock.fontColor = color ? color : this._defaultFontColor
            textBlock.text = content;
            textBlock.outlineColor = Config.hurtTextOutlineColor;
            textBlock.outlineSize = Config.hurtTextOutlineWidth;
            textBlock.visibility = SlateVisibility.SelfHitTestInvisible
        }).onComplete(() => {
            textBlock.visibility = SlateVisibility.Hidden
            this._textPools.push(textBlock);
        })
        animator.start();
    }


    /**创建一个文本框 */
    private createText() {
        // 首次创建，如果没有UI对象，就创建一个
        if (!this._uiWidget) {
            // 创建一个UI对象
            this._uiWidget = UserWidget.newObject();
            this._uiWidget.addToViewport(1)
            // 首次创建，如果没有rootCanvas，就创建一个
            if (!this._rootCanvas) {
                this._rootCanvas = Canvas.newObject()
                this._rootCanvas.size = new Vector2(1920, 1080);
                this._rootCanvas.position = Vector2.zero
                this._uiWidget.rootContent = this._rootCanvas
            }
        }
        // 创建一个文本框，并添加到画布上
        let textBlock = TextBlock.newObject(this._rootCanvas)
        textBlock.size = this._defaultTextSize
        textBlock.glyph = UIFontGlyph.Bold;
        // 开启文本自适应
        textBlock.autoAdjust = true
        return textBlock
    }
}

