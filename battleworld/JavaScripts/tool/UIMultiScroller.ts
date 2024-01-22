import { Queue } from "./Queue";

/**
 * 无限滚动列表_vae
 */


export interface IItemRender {
    /**真实数据索引 */
    realIndex: number;
    setData(data: any): void;
    get uiObject(): mw.Widget;
    get clickObj(): mw.StaleButton | mw.Button;
    setSelect(bool: boolean): void;

    updateData(): void;
}


export class UIMultiScroller {

    private _index: number = -1;

    private _dataCount: number;

    private _scrollBox: mw.ScrollBox;

    private _scrollContent: mw.Canvas;

    private _movement: mw.Orientation;

    private _itemArr: Array<IItemRender> = [];

    // 将未显示出来的Item存入未使用队列里面，等待需要使用的时候直接取出
    private _unUsedQueue: Queue<IItemRender>;

    // 距离左侧和上册的起始距离
    private _leftSpace: number = 0;
    private _topSpace: number = 0;

    // Item的宽高
    private _cellSize: mw.Vector2 = null;

    // 行间距X
    private _spacingX = 0;
    // 行间距Y
    private _spacingY = 0;

    private _itemPrefab;
    private _dataArray: any[];

    /**构造函数里创建的item 临时处理方案  避免修改结构 TODO 单独开一个初始化函数 */
    private _firstItem: IItemRender = null;

    /**
    * 循环列表构造函数
    * @param sbox       ScrollBox对象ui的引用
    * @param sr         ScrollBox下的节点的引用 content
    * @param prefab     ScrollBoxItem预制体
    * @param size       格子大小 默认空以item UI为参考
    */
    constructor(sbox: mw.ScrollBox,
        sr: mw.Canvas,
        preafab: TypeName<IItemRender>,
        size: mw.Vector2 = null, leftSpace: number = 0, topSpace: number = 0) {

        this._unUsedQueue = new Queue<IItemRender>();
        this._scrollBox = sbox;
        this._scrollContent = sr;


        if (this._scrollContent.autoLayoutEnable == false) {
            console.error("=====>>>_scrollContent.autoLayoutEnable==false", preafab.name);
        }
        this._itemPrefab = preafab;
        let layout: mw.UILayout = this._scrollContent.autoLayoutRule;


        if (size == null) {
            let itemBase: IItemRender = this.createItemBase();
            this._unUsedQueue.push(itemBase);
            size = itemBase.uiObject.size;
            itemBase.uiObject.visibility = mw.SlateVisibility.Collapsed;
            this._firstItem = itemBase;
        }
        this._cellSize = size;

        if (leftSpace == 0) {
            this._leftSpace = this._scrollContent.autoLayoutPadding.left;
        } else {
            this._leftSpace = leftSpace;
        }

        if (topSpace == 0) {
            this._topSpace = this._scrollContent.autoLayoutPadding.top;
        } else {
            this._topSpace = topSpace;
        }


        this._movement = sbox.orientation;

        this._spacingX = layout.layoutSpace;
        this._spacingY = layout.layoutSpace;

        this._scrollBox.onUserScrolled.add((curOffset) => {
            this.onValueChange();
        })
        this._scrollBox.onScrollEnd.add(() => {
            this.onValueChange();
        })

        this._scrollContent.autoLayoutEnable = false;
    }



    private mInitCallback: mw.Action2<number, IItemRender> = new mw.Action2();
    /**调用InitData第一次初始化时的回调 */
    public get InitCallback(): mw.Action2<number, IItemRender> {
        return this.mInitCallback;
    }

    private mItemCallback: mw.Action2<number, IItemRender> = new mw.Action2();
    /**每个Item刷新时的回调 */
    public get ItemCallback(): mw.Action2<number, IItemRender> {
        return this.mItemCallback;
    }

    async setData(val: any[], isReset: boolean = true) {
        this._dataCount = val.length;
        this._dataArray = val;
        this.updateTotalWidth();
        this._index = -1;
        if (isReset) {
            this.resetSBoxPos();
        } else {
            this._scrollContent.position = (new mw.Vector2(0, 0));
            await TimeUtil.delaySecond(0.01);
        }


        if (this._itemArr != null) {
            for (let i = this._itemArr.length; i > 0; i--) {
                let item: IItemRender = this._itemArr[i - 1];
                this._itemArr.splice(i - 1, 1);
                this._unUsedQueue.push(item);
                item.uiObject.visibility = mw.SlateVisibility.Collapsed;
            }

            this.onValueChange();
        }

    }


    /**
    * 获取头部最后一个位置的索引
     * @return 返回获取头部最后一个位置的索引
    */
    private getPosIndex(): number {
        let pos = this._scrollContent.position;
        switch (this._movement) {
            case mw.Orientation.OrientHorizontal:
                {
                    // 列索引
                    let colIndex = Math.floor(pos.x / (this._cellSize.x + this._spacingX));

                    return colIndex;
                }
            case mw.Orientation.OrientVertical:
                {
                    // 行索引
                    let rowIndex = Math.floor(pos.y / -(this._cellSize.y + this._spacingY));

                    return rowIndex;
                }
            default:
                break;
        }
        return 0;
    }


    onValueChange() {
        if (this._itemArr == null || this._dataCount == 0) return;

        let index = Math.abs(this.getPosIndex());
        if (index < 0 && this._index > 0) {
            index = 0;
        }

        // 滑动列表  横向---------

        if (this._index != index && index > -1) {
            this._index = index;

            let cullIndex = (this._index + 1) * this._colOrRowCount + this._maxColOrRowCount * this._colOrRowCount;

            //console.error("===onValueChange ", this._index, cullIndex, this._itemPrefab.name);

            for (let i = this._itemArr.length; i > 0; i--) {
                let item = this._itemArr[i - 1];

                let minIndex = this._index - this._colOrRowCount;
                minIndex = MathUtil.clamp(minIndex, 0, minIndex);

                if (item.realIndex < minIndex || item.realIndex > cullIndex) {
                    this._itemArr.splice(i - 1, 1);
                    this._unUsedQueue.push(item);
                    item.uiObject.visibility = mw.SlateVisibility.Collapsed;
                }
            }


            for (let i = this._index; i < cullIndex; i++) {
                if (i < 0) continue;
                if (i > this._dataCount - 1) continue;
                let isOk = false;
                for (let item of this._itemArr) {
                    if (item.realIndex == i) isOk = true;
                }
                if (isOk) continue;
                this.createItem(i);
            }
        }
    }


    onDestroy() {
        this._itemArr = null;
        this._unUsedQueue = null;
    }


    /**
     * 根据索引号 获取当前item的位置
     * @param i   索引
     * @return 返回Pos
     */
    getPosition(i: number): mw.Vector2 {


        switch (this._movement) {
            case mw.Orientation.OrientHorizontal:
                {
                    let realColIndex = Math.floor(i / this._colOrRowCount);    // 真实行索引

                    let readRowIndex = i % this._colOrRowCount;             // 真实列索引

                    return new mw.Vector2(
                        (this._cellSize.x + this._spacingX) * realColIndex + this._leftSpace,
                        (this._cellSize.y + this._spacingY) * readRowIndex + this._topSpace
                    );

                }
            case mw.Orientation.OrientVertical:
                {
                    let realColIndex = Math.floor(i / this._colOrRowCount);     // 真实列索引
                    let readRowIndex = i % this._colOrRowCount;                 // 真实行索引

                    return new mw.Vector2(
                        (this._cellSize.x + this._spacingX) * readRowIndex + this._leftSpace,
                        (this._cellSize.y + this._spacingY) * realColIndex + this._topSpace
                    );
                }
            default:
                break;
        }
        return mw.Vector2.zero;
    }
    private setItemIndex(item: IItemRender, index: number) {
        item.realIndex = index;
        let pos = this.getPosition(index);

        //console.error("===setItemIndex ", index, pos, this._itemPrefab.name);

        item.uiObject.position = pos;
    }

    private createItemBase() {

        if (this._firstItem) {
            this.mInitCallback.call(0, this._firstItem);
            this._firstItem = null;
        }

        let itemBase: IItemRender = mw.UIService.create(this._itemPrefab) as any;

        //itemBase.uiObject.name = "prefab" + len;
        this._scrollContent.addChild(itemBase.uiObject);
        this.mInitCallback.call(0, itemBase);

        return itemBase;
    }

    private createItem(i: number) {
        let itemBase: IItemRender;
        if (this._unUsedQueue.size() > 0) {
            itemBase = this._unUsedQueue.pop();
            itemBase.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            itemBase.uiObject.size = this._cellSize;
        }
        else {
            itemBase = this.createItemBase();
            itemBase.uiObject.size = this._cellSize;
        }

        this.setItemIndex(itemBase, i);
        if (this._dataArray && itemBase.realIndex < this._dataArray.length) {
            this.mItemCallback.call(i, itemBase);
        }
        this._itemArr.push(itemBase);
        return;
    }


    // 这个方法的目的 就是根据总数量 行列 来计算content的真正宽度或者高度

    /**列或行最大数量数量 */
    private _colOrRowCount: number = 0;
    /**可视conetnet最大显示行列数量 */
    private _maxColOrRowCount: number = 0;

    private updateTotalWidth() {

        switch (this._movement) {
            case mw.Orientation.OrientHorizontal:
                {
                    // 考虑行间距
                    //let height = this._scrollBox.size.y;
                    let height = this._scrollBox.size.y + this._spacingY - this._topSpace;

                    this._colOrRowCount = Math.floor(height / (this._cellSize.y + this._spacingY));
                    if (this._colOrRowCount <= 0) {
                        this._colOrRowCount = 1;
                    }
                    let horizontalCount = Math.floor(this._dataCount / this._colOrRowCount);

                    if (this._dataCount % this._colOrRowCount > 0) {
                        horizontalCount++;
                    }

                    let width = this._cellSize.x * (horizontalCount) + this._spacingX * (horizontalCount);

                    this._scrollContent.size = new mw.Vector2(width, height);

                    this._maxColOrRowCount = Math.floor(this._scrollBox.size.x / (this._cellSize.x + this._spacingX));
                    if (this._scrollBox.size.x % (this._cellSize.x + this._spacingX) > 0) {
                        this._maxColOrRowCount++;
                    }
                }
                break;
            case mw.Orientation.OrientVertical:
                {
                    // 考虑行间距
                    //let width = this._scrollBox.size.x
                    let width = this._scrollBox.size.x + this._spacingX - this._leftSpace;

                    this._colOrRowCount = Math.floor(width / (this._cellSize.x + this._spacingX));
                    if (this._colOrRowCount <= 0) {
                        this._colOrRowCount = 1;
                    }
                    let verticalCount = Math.floor(this._dataCount / this._colOrRowCount);

                    if (this._dataCount % this._colOrRowCount > 0) {
                        verticalCount++;
                    }

                    let height = this._cellSize.y * (verticalCount) + this._spacingY * (verticalCount);

                    this._scrollContent.size = new mw.Vector2(width, height);

                    this._maxColOrRowCount = Math.floor(this._scrollBox.size.y / (this._cellSize.y + this._spacingY));

                    if (this._scrollBox.size.y % (this._cellSize.y + this._spacingY) > 0) {
                        this._maxColOrRowCount++;
                    }
                }
                break;
            default:
                break;
        }



    }

    private resetSBoxPos() { // 默认不会到顶部(暂时还原)
        // 两句配合才能达到重置到顶部的效果
        this._scrollContent.position = (new mw.Vector2(0, 0));
        this._scrollBox.scrollToStart();
    }

    public reset2BoxTop() { // 需要的时候再主动回到顶部(暂未启用)
        // 两句配合才能达到重置到顶部的效果
        this._scrollContent.position = (new mw.Vector2(0, 0));
        this._scrollBox.scrollToStart();
    }

    /**刷新所有item的数据 */
    public updateItemData() {
        if (this._itemArr == null)
            return;

        for (let index = 0; index < this._itemArr.length; index++) {
            this._itemArr[index].updateData();
        }
    }
}