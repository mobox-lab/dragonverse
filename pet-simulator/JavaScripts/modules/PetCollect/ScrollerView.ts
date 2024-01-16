/**Item约束类型 */
type ItemClass = mw.UIScript & IItemRender;

/**如果使用List,那么Item必须实现该接口 */
export interface IItemRender {
    /**索引位置（get/set） */
    index: number;
    /**设置数据 */
    setData(seq: number | string): void;
    /**设置item选中 */
    setSelect(isSelect: boolean): void;
    /**
     点击成功的回调(调用这个函数就会刷新List并且回调给主UI)
     - 注意该函数由List注册不需要手动注册
     */
    onclickSuccess: (idx: number) => void;
}

/**list组件(滑动列表) */
export class List {
    /**刷新时间 秒 */
    readonly intervalTime = 0.15;
    /**item池 */
    private _pool: ItemClass[] = [];
    /**datas */
    private _datas: any[] = [];
    /**滑动组件 */
    private _scroll: mw.ScrollBox = null!;
    /**容器 */
    private _content: mw.Canvas = null!;
    /**上间距 */
    private _topDis = 0;
    /**下间距 */
    private _bottomDis = 0;
    /**左间距 */
    private _leftDis = 0;
    /**右间距 */
    private _rightDis = 0;
    /**item间隔 */
    private _itemDis = 0;
    /**item大小 */
    private _size: mw.Vector2 = null!;
    /**当前偏移 */
    private _curOffset = -1;
    /**阻击滑动 */
    private _pause = true;
    /**更新时间 */
    private _timer = 0;
    /**垂直或者水平的大小 */
    private _fixItemSize = 0;
    /**与_fixItemSize相反（如果上面是垂直这个就是水平） */
    private _fixRowOrColSize = 0;
    /**当前行或者列的item数目 */
    private _fixItemCount = 0;
    /**同屏最大的列或者行 */
    private _maxShowRowOrColCount = 0;
    /**当前选择的索引 */
    private _selectIdx = -1;
    //================================================//
    /**当前多选的索引 */
    private _selectIndexes: number[] = [];
    /**多选索引数组 */
    public get selectIndexes() {
        let datas = [];
        this._selectIndexes.forEach(v => {
            datas.push(this._datas[v]);
        });
        return datas;
    }

    private _allowMultipleSelection = false;
    /**设置多选开启与关闭 */
    public set allowMultipleSelection(v: boolean) {
        if (this._allowMultipleSelection === v) return;
        this._allowMultipleSelection = v;

        if (this._allowMultipleSelection) {
            this._selectIdx = -1;
            this._selectIndexes.length = 0;
            this.refresh();
        }


    }

    /**主UI注册可以监听item点击事件 返回-1就是当前没有任何可以显示的 */
    onSelected: (idx: number) => void;

    //==================================================//

    /**
     * @param scroll 滚动框
     * @param content 容器
     */
    constructor(scroll: mw.ScrollBox, content: mw.Canvas, cls: new () => ItemClass) {
        this._scroll = scroll;
        this._content = content;

        // 滑动事件监听
        this._scroll.onUserScrolled.add((currentOffset: number) => {
            this._curOffset = currentOffset;
            this._pause = false;
        });

        if (this._content.autoLayoutEnable) {// 获取设置
            this._topDis = this._content.autoLayoutPadding.top;
            this._leftDis = this._content.autoLayoutPadding.left;
            this._bottomDis = this._content.autoLayoutPadding.bottom;
            this._rightDis = this._content.autoLayoutPadding.right;
            this._itemDis = this._content.autoLayoutSpacing;

            this._content.autoLayoutEnable = false;
        }

        this.initItems(cls);
        TimeUtil.onEnterFrame.add(this.update, this);
    }

    /**设置item数量（会刷新列表） */
    setDatas(seqArr: any[]) {
        this._datas = seqArr.map(v => v);
        this._curOffset = 0;
        this._scroll.scrollOffset = 0;
        this._content.position = mw.Vector.zero;
        this.setContent();
        this.refresh();
    }

    /**跳转到指定item索引位置的行或者列 */
    // scrollToIndex(index: number) {
    //     // 索引要小于数量才能跳转
    //     if (index <= this._datas.length - 1) {
    //         const rowOrCol = Math.floor(index / this._fixItemCount);
    //         const offset = rowOrCol * this._fixItemSize;
    //         setTimeout(() => {
    //             this._curOffset = offset;
    //             this._scroll.scrollOffset = offset;
    //             this.refresh();
    //         }, 0);
    //     }
    // }

    /**
     * 点击Item的界面刷新
     * @param idx item索引位置
     */
    onclickItem(idx: number) {
        if (this._datas.length < 1) {
            this.onSelected && this.onSelected(-1);
            return;
        }

        let item = this._pool.filter(val => val.index === idx)[0];
        if (item) {
            if (this._allowMultipleSelection) {
                const index = this._selectIndexes.indexOf(idx);
                if (index === -1) {
                    item.setSelect(true);
                    this._selectIndexes.push(idx);
                } else {
                    item.setSelect(false);

                    this._selectIndexes.splice(index, 1);
                }
            } else {
                if (this._selectIdx === idx) {
                    return;
                }

                const lastItem = this._pool.filter(val => val.index === this._selectIdx)[0];
                if (lastItem) {
                    lastItem.setSelect(false);
                }

                item.setSelect(true);
                this._selectIdx = idx;
                this.onSelected && this.onSelected(idx);
            }

        }
    }

    /**销毁组件 */
    destroyList() {
        this._pool.length = 0;
        this._datas.length = 0;
        this._content.removeAllChildren();
        TimeUtil.onEnterFrame.remove(this.update, this);


        this._size = null!;
        this._scroll = null!;
        this._content = null!;
    }

    private update(dt) {
        if (this._pause) {
            return;
        }

        this._timer += dt;
        if (this._timer < this.intervalTime) {
            return;
        }

        this._timer = 0;
        this._pause = true;
        this.refresh();
    }

    /**设置content大小 */
    private setContent() {
        const size = this._content.size;
        if (this._scroll.orientation === mw.Orientation.OrientVertical) {// 垂直
            // 垂直数量
            const cntV = Math.ceil(this._datas.length / this._fixItemCount);
            const h = this._fixItemSize * cntV + this._topDis + this._bottomDis;
            this._content.size = new mw.Vector2(size.x, h);
        } else if (this._scroll.orientation === mw.Orientation.OrientHorizontal) {// 水平
            // 水平数量
            const cntV = Math.ceil(this._datas.length / this._fixItemCount);
            const h = this._fixItemSize * cntV + this._leftDis + this._rightDis;
            this._content.size = new mw.Vector2(h, size.y);
        }
        //console.error('lwj size ' + this._content.size.x + ' ' + this._content.size.y + ' ');
    }

    /**初始化item */
    private initItems(cls: new () => ItemClass) {
        // 获取item大小
        const ui = this.createItem(cls);
        this._size = ui.uiObject.size;

        const size = this._scroll.size;
        if (this._scroll.orientation === mw.Orientation.OrientVertical) {// 垂直
            this._fixRowOrColSize = this._size.x + this._itemDis;
            // 水平数量
            this._fixItemCount = Math.floor((size.x - this._rightDis - this._leftDis + this._itemDis) / this._fixRowOrColSize);
            this._fixItemSize = this._size.y + this._itemDis;
            // 垂直数量
            this._maxShowRowOrColCount = Math.ceil((size.y - this._topDis) / this._fixItemSize);
            //console.log(" item Y " + this._fixItemSize + "  水平数量 " + this._fixItemCount + "  垂直数量 " + this._maxShowRowOrColCount);
        } else if (this._scroll.orientation === mw.Orientation.OrientHorizontal) {// 水平
            this._fixRowOrColSize = this._size.y + this._itemDis;
            // 竖直数量
            this._fixItemCount = Math.floor((size.y - this._topDis - this._bottomDis + this._itemDis) / this._fixRowOrColSize);
            this._fixItemSize = this._size.x + this._itemDis;
            // 水平数量
            this._maxShowRowOrColCount = Math.ceil((size.x - this._leftDis) / this._fixItemSize);
        }

        let count = (this._maxShowRowOrColCount + 1) * this._fixItemCount - 1;
        //console.error('lwj count ' + count);
        while (count--) {
            this.createItem(cls);
        }
    }

    /**刷新 */
    private refresh() {
        let idx = 0;
        const rowOrColIndex = Math.floor(this._curOffset / this._fixItemSize);
        //console.error("rowOrColIndex " + rowOrColIndex + " " + this._curOffset + " 大小：" + this._fixItemSize);
        let dataIndex = rowOrColIndex * this._fixItemCount;
        //console.log("dataIndex " + dataIndex);
        // 多加一行跟丝滑
        for (let i = rowOrColIndex; i < (rowOrColIndex + this._maxShowRowOrColCount + 1); i++) {
            for (let j = 0; j < this._fixItemCount; j++) {
                if (dataIndex >= this._datas.length) {// 溢出控制   
                    break;
                }

                const item = this._pool[idx++];
                if (item) {
                    if (!item.uiObject.parent) {
                        this._content.addChild(item.uiObject);
                    }

                    const y = this._fixItemSize * i;
                    const x = this._fixRowOrColSize * j;
                    if (this._scroll.orientation === mw.Orientation.OrientVertical) {// 垂直
                        item.uiObject.position = new mw.Vector2(x + this._leftDis, y + this._topDis);
                    } else if (this._scroll.orientation === mw.Orientation.OrientHorizontal) {// 水平
                        item.uiObject.position = new mw.Vector2(y + this._leftDis, x + this._topDis);
                    }

                    item.uiObject.visibility = mw.SlateVisibility.Visible;
                    this.updateItem(dataIndex++, item);
                }
            }
        }

        this.hideItem(idx);
    }

    /**隐藏多余的item */
    private hideItem(idx: number) {
        for (let i = idx; i < this._pool.length; i++) {
            this._pool[i].uiObject.visibility = mw.SlateVisibility.Hidden;
        }
    }

    /**创建Item */
    private createItem(cls: new () => ItemClass) {
        const uiScript = mw.UIService.create(cls) as ItemClass;
        uiScript.uiObject.size = uiScript.rootCanvas.size;
        //uiScript.onclickSuccess = (idx: number) => this.onclickItem(idx);
        this._pool.push(uiScript);
        return uiScript;
    }

    /**刷新Item */
    private updateItem(idx: number, item: ItemClass) {
        item.index = idx;
        item.setData(this._datas[idx]);
        // if (this._allowMultipleSelection) {
        //     item.setSelect(this._selectIndexes.includes(idx));
        // } else {
        //     item.setSelect(idx === this._selectIdx);
        // }
    }
}