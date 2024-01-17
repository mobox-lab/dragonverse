
export namespace VList {

    export interface IItemRender {
        /**真实数据索引 */
        realIndex: number;
        setData(data: any): void;
        get uiObject(): mw.Widget;
        get clickObj(): mw.StaleButton | mw.Button;
        setSelect(bool: boolean): void;
    }



    export class NodeList {

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


        private _cachePool: IItemRender[] = [];

        private _showItems: IItemRender[] = [];

        private _dataCount: number;

        private _prefab: any = null;
        private _listCanvas: mw.Canvas = null;

        constructor(list: mw.Canvas, prefab: TypeName<IItemRender>) {
            this._listCanvas = list;
            this._prefab = prefab;
        }

        public setData(datas: any[]) {
            this._dataCount = datas.length;

            if (this._showItems.length > this._dataCount) {
                for (let index = this._showItems.length - 1; index >= this._dataCount; index--) {
                    let oldItem = this._showItems[index];
                    oldItem.uiObject.visibility = mw.SlateVisibility.Collapsed;
                    oldItem.uiObject.removeObject();
                    this._cachePool.push(oldItem);
                }

                let splitCount = this._showItems.length - this._dataCount;
                for (let index = 0; index < splitCount; index++) {
                    this._showItems.pop();
                }
            }

            for (let index = 0; index < this._dataCount; index++) {
                this.createItem(index);
            }

        }

        /**创建item */
        private createItem(i: number) {
            let itemBase: IItemRender = this._showItems[i];

            if (itemBase) {
                this.mItemCallback.call(i, itemBase);
                return;
            }

            if (this._cachePool.length > 0) {
                itemBase = this._cachePool.pop();
                itemBase.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this._listCanvas.addChild(itemBase.uiObject);
            }
            else {
                itemBase = mw.UIService.create(this._prefab) as any;
                this._listCanvas.addChild(itemBase.uiObject);
                this.mInitCallback.call(i, itemBase);
            }
            itemBase.realIndex = i;
            this.mItemCallback.call(i, itemBase);

            this._showItems.push(itemBase);
        }

    }




}

