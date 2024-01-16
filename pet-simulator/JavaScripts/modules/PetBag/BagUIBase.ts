
import { GlobalData } from "../../const/GlobalData";
import { utils } from "../../utils/uitls";
import { BagDataBase } from "./BagDataBase";
import BagPanelBase from "./BagPanelBase";
import { Layout } from "./IBagUI";


/**背包itemUI基类 */
export abstract class BagUIBase<Data extends BagDataBase, ItemUI extends mw.UIScript> {
    public layout: Layout = null;

    public data: Data = null;
    public ui: ItemUI = null;
    /**所属的背包panel */
    public panel: BagPanelBase<Data, ItemUI> = null;

    /**item在panel中的第几个位置 */ 
    public count: number = null;
    /**淡入 */ 
    private fadeInTween: mw.Tween<{}> = null;
    /**淡出 */ 
    private fadeOutTween: mw.Tween<{}> = null;
    /**平移 */ 
    private movetTween: mw.Tween<{}> = null;

    constructor(data: Data, ui: ItemUI, panel: BagPanelBase<Data, ItemUI>) {
        this.data = data;
        this.ui = ui;
        this.panel = panel;
    }
    

    /**初始化 */
    abstract initItem(): void;


    /**排名item淡入 */
    public itemFadeInTween(count: number) {

        if (this.fadeInTween && this.fadeInTween.isPlaying()) {
            this.fadeInTween.stop();
        }
        this.ui.uiObject.position = this.calcuItemPos(count);
        let fadeInTween = new mw.Tween({ alpha: 0 }).to({ alpha: 1 }, 300)
            .onUpdate((obj) => {
                if (this.ui.uiObject) {
                    this.ui.uiObject.renderOpacity = obj.alpha;
                }
            })
            .onComplete(() => {

            })
            .start();
        this.fadeInTween = fadeInTween;
    }

    /**排名item平移 */
    public itemMoveTween(toCount: number) {
        let toPos = this.calcuItemPos(toCount);
        if (this.movetTween && this.movetTween.isPlaying()) {
            this.movetTween.stop();
        }
        // let emptyTween = new mw.Tween(null);
        // 移动
        this.count = toCount;
        let moveTween = new mw.Tween({ pos: this.ui.uiObject.position }).to({ pos: toPos }, 200)
            .onUpdate(obj => {
                if (this.ui.uiObject) {
                    this.ui.uiObject.position = obj.pos;
                }
            });

        this.movetTween = moveTween.start();
    }


    /**排名item淡出 */
    public itemFadeOutTween() {
        // item.uiObject.position = this.calcuItemPos(count);
        if (this.fadeOutTween && this.fadeOutTween.isPlaying()) {
            this.fadeOutTween.stop();
        }
        let fadeOutTween = new mw.Tween({ alpha: 1 }).to({ alpha: 0 }, 300)
            .onUpdate((obj) => {
                if (this.ui.uiObject) {
                    this.ui.uiObject.renderOpacity = obj.alpha;
                }
            })
            .onComplete(() => {
                this.ui.destroy();
            })
            .start();
        this.fadeOutTween = fadeOutTween;
    }


    /**item设置位置 */
    private calcuItemPos(count: number): Vector2 {
        //距离左边的偏移量
        let offX = GlobalData.Bag.itemOffset[0];
        //距离上边的偏移量
        let offY = GlobalData.Bag.itemOffset[1];
        //每个item的间隔
        let space = GlobalData.Bag.itemSpace;
        //每行的个数
        let row = 4;
        //每个item的宽度
        let itemWidth = GlobalData.Bag.itemSize.x;
        //每个item的高度
        let itemHeight = GlobalData.Bag.itemSize.y;
        //计算出每个item的位置
        let index_x: number = count % row;
        if (index_x == 0) {
            index_x = row;
        }
        let x = (index_x - 1) * (itemWidth + space) + offX;  // 1* (200 + 90) + 50
        let y = Math.floor((count - 1) / row) * (itemHeight + space) + offY; // 0 * (200 + 90) + 50
        // item.position = new mw.Vector2(x, y);
        return new mw.Vector2(x, y);
    }

    /**新增itemUI */
    addUI(count: number): void {
        // 高帧率播放动画，低帧率直接刷新
        if (utils.frameCount > 20) {
            this.itemFadeInTween(count);
        } else {
            this.count = count;
            this.ui.uiObject.position = this.calcuItemPos(count);
        }
    }

    /**删除itemUI */
    delUI(): void {
        // 高帧率播放动画，低帧率直接刷新
        if (utils.frameCount > 20) {
            this.itemFadeOutTween();
        } else {
            this.ui.destroy();
        }
    }

    /**移动itemUI */
    moveUI(toCount: number): void {
        // 高帧率播放动画，低帧率直接刷新
        if (utils.frameCount > 20) {
            this.itemMoveTween(toCount);
        } else {
            this.ui.uiObject.position = this.calcuItemPos(toCount);
        }
    }
}