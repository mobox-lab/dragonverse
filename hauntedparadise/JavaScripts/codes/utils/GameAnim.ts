/*
 * @Author       : feifei.song
 * @Date         : 2023-01-19 10:18:31
 * @LastEditors: yudong.wu yudong.wu@appshahe.com
 * @LastEditTime: 2024-02-01 11:15:20
 * @FilePath: \partymonster\JavaScripts\submodule\game\GameAnim.ts
 * @Description  : 
 */

import { PoolFactory, ObjectPool } from "./ObjectPool";


class ImageFactory extends PoolFactory<mw.Image> {

    /** 创建元素 */
    public create(): mw.Image {
        const animImg = mw.Image.newObject(GameAnim.flyRoot.rootContent);
        animImg.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        return animImg;
    }

    show(obj: mw.Image, ...arg: any[]): void {
        obj.visibility = mw.SlateVisibility.SelfHitTestInvisible;
    }
    hide(obj: mw.Image): void {
        obj.visibility = mw.SlateVisibility.Collapsed;
    }
    destroy(obj: mw.Image): void {
        obj.destroyObject();
    }
}

export class GameAnim {

    /**
     * 单例
     */
    private static _inst: GameAnim;
    public static get instance() {
        if (!this._inst) {
            this._inst = new GameAnim();
        }
        return this._inst;
    }

    /**  */
    protected popBook: Map<mw.Canvas, mw.Tween<any>> = new Map();

    /** 飞花根节点 */
    public static flyRoot: mw.UserWidget;

    /** 对象池 */
    public flyUiPool: ObjectPool<mw.Image, ImageFactory>;


    constructor() {
        this.flyUiPool = new ObjectPool(new ImageFactory(mw.Image));
    }

    /**
     * 连续飞金币动画
     * @param count 飞行数量，最大10个
     * @param start 起点，可以是世界坐标或者UI控件
     * @param tag 目标点，可以是世界坐标或者UI控件
     * @param imgIcon 图片资源，不填，且目标点是 image 的时候，会自动获取 image 的图片资源
     * @param size 图片大小，默认100*100
     * @param ofst 起点偏移
     * @param over 结束回调
     * @param rang 散开范围
     */
    public static async flySequence(count: number, start: mw.Widget | mw.Vector, tag: mw.Image | mw.Widget, imgIcon?: string, size?: mw.Vector2, ofst?: mw.Vector2, over?: () => void, rang = 100) {

        // 校正参数
        count = Math.min(count, 10);
        if (!imgIcon && tag instanceof mw.Image) { imgIcon = tag.imageGuid; }
        if (!AssetUtil.assetLoaded(imgIcon)) { await AssetUtil.asyncDownloadAsset(imgIcon); }
        if (!size) { size = new mw.Vector2(100, 100); }

        // 计算动画位置
        let startPos = new mw.Vector2(), pixelPos = new mw.Vector2(), overPos = new mw.Vector2();
        if (start instanceof (mw.Widget)) {
            mw.localToViewport(start.tickSpaceGeometry, mw.Vector2.zero, mw.Vector2.zero, startPos);
        } else {
            startPos = InputUtil.projectWorldPositionToWidgetPosition(start, true).screenPosition;
        }
        mw.localToViewport(tag.tickSpaceGeometry, mw.Vector2.zero, pixelPos, overPos);
        ofst && startPos.add(ofst);

        // 创建UI
        if (!this.flyRoot) {
            const screen = mw.WindowUtil.getViewportSize();
            const root = this.flyRoot = mw.UserWidgetPrefab.newObject();
            root.size = screen;
            root.rootContent = mw.Canvas.newObject();
            root.rootContent.size = screen;
            root.rootContent.position = Vector2.zero;
            root.addToViewport(mw.UILayerSystem);
            root.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            root.rootContent.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        }

        // 创建图片
        for (let i = 0; i < count; i++) {
            const img = GameAnim.instance.flyUiPool.get();
            img.imageGuid = imgIcon;
            img.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            img.size = size;
            img.position = startPos.clone();
            let offsetPos = new mw.Vector2(MathUtil.randomInt(-rang, rang), MathUtil.randomInt(-rang, rang)).add(startPos);

            // 散开
            new mw.Tween(startPos.clone()).to(offsetPos, 300).onUpdate((pos: mw.Vector) => {
                img.position = pos;
            }).onComplete(() => {
                // 上下抖动
                let upPos = new mw.Vector2(offsetPos.x, offsetPos.y + 20);
                let downPos = new mw.Vector2(offsetPos.x, offsetPos.y - 20);
                new mw.Tween(upPos).to(downPos, 200).onUpdate((pos1: mw.Vector2) => {
                    img.position = pos1;
                }).yoyo(true).repeat(MathUtil.randomInt(2, 5)).onComplete(() => {
                    // 移动到目标点
                    let curPos = img.position.clone();
                    new mw.Tween(curPos).to(overPos, 400).onUpdate((pos2: mw.Vector2) => {
                        img.position = pos2
                    }).onComplete(() => {
                        ObjectPool.hide(img);
                        i + 1 == count && over && over();
                    }).easing(mw.TweenUtil.Easing.Sinusoidal.InOut).start();
                }).easing(mw.TweenUtil.Easing.Sinusoidal.Out).start();
            }).easing(mw.TweenUtil.Easing.Sinusoidal.InOut).start();

            await new Promise<void>(resolve => setTimeout(resolve, 100));
        }
    }

}   