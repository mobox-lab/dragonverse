import { SpawnManager, SpawnInfo, } from '../Modified027Editor/ModifiedSpawn';
/*
 * @Author: chen.liang chen.liang@appshahe.com
 * @Date: 2023-10-09 17:04:06
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2023-10-16 10:38:05
 * @FilePath: \catcompanion\JavaScripts\utils\UtilEx.ts
 * @Description: 
 */


/**
 * 实用拓展命名空间
 * @desc MapEx:	可以数据传输的Map类型拓展
 * @desc UIEx:	UI拓展
 * @desc TimeEx:时间拓展(await sleep)
 * @desc MathEx:数学拓展
 * @desc SoundEx:声音拓展
 * @desc TypeEx:类型拓展(包括Vector2,Vector3,Vector4,Quaternion,Color,Rect,RectOffset,Matrix4x4,Plane,Ray,Ray2D)
 */
export namespace UtilEx {

	/**
	 * 异步加载资源
	 * @param guid 被加载的 guid
	 * @returns 是否加载成功
	 */
	export async function asyncLoadAsset(guid: string) {
		if (!AssetUtil.assetLoaded(guid)) {
			await AssetUtil.asyncDownloadAsset(guid);
			if (!AssetUtil.assetLoaded(guid)) {
				console.error("MyTypeError load asset error:", guid);
			}
		}
	}
	/**
	 * MapEx(可序列化)
	 * @exp map:MapExClass<T> = {}
	 * @exp MapEx.get(map,key)
	 * @exp MapEx.set(map,key,val)
	 * @exp MapEx.del(map,key)
	 */
	export namespace MapEx {

		export type MapExClass<T> = {
			[key: string | number]: T
		}

		/**
		 * 是否为空
		 * @param map 
		 * @returns 是/否 
		 */
		export function isNull<T>(map: MapExClass<T>): boolean {
			return !map || map == null || map == undefined;
		}

		/**
		 * 获取对象
		 * @param map 
		 * @param key 
		 * @returns 
		 */
		export function get<T>(map: MapExClass<T>, key: string | number): T {
			if (map[key]) {
				return map[key];
			}
			return null;
		}

		/**
		 * 设置对象
		 * @param map 
		 * @param key 
		 * @param val 
		 */
		export function set<T>(map: MapExClass<T>, key: string | number, val: T) {
			map[key] = val;
		}

		/**
		 * 删除对象
		 * @param map 
		 * @param key 
		 * @returns 成功/失败
		 */
		export function del<T>(map: MapExClass<T>, key: string | number): boolean {
			if (map[key]) {
				delete map[key];
				return true;
			}
			return false;
		}

		/**
		 * 是否有指定对象
		 * @param map 
		 * @param key 
		 * @returns 
		 */
		export function has<T>(map: MapExClass<T>, key: string | number): boolean {
			return map[key] != null;
		}

		/**
		 * 获取count数量
		 * @param map 
		 * @param key 
		 * @returns 
		 */
		export function count<T>(map: MapExClass<T>): number {
			let res = 0;
			forEach(map, e => {
				++res;
			})
			return res;
		}

		/**
		 * 遍历map
		 * @param map 
		 * @param callback 
		 */
		export function forEach<T>(map: MapExClass<T>, callback: (key: string | number, element: T) => void) {
			for (let key in map) {
				if (map[key]) {
					callback(key, map[key]);
				}
			}
		}

		/**
		 * 拷贝，Val还是引用出来的，只是Map换了
		 * @param map 
		 * @returns 
		 */
		export function copy<T>(map: MapExClass<T>): MapExClass<T> {
			let res = {};
			for (let key in map) {
				res[key] = map[key];
			}
			return res;
		}
	}

	/**
	 * 对于UI功能的拓展
	 */
	export namespace UIEx {
		/** 浮动位置 */
		export enum TipsFloatPos {
			Top,
			Bottom,
			Left,
			Right,
			/** 根据所在位置自动确认位置（超出位置后修改方向，直到最后一个方向） */
			Auto,
		}

		/** 飞行UI 在一个范围内随机生成并飞行到目标位置
			 * @param flyUI 飞行的UI面板
			 * @param startPos 开始位置
			 * @param endPos 结束位置
			 * @returns 返回Tween
			*/
		export function flyUI<T extends mw.UIScript>(flyUI: T, startPos: mw.Vector2, endPos: mw.Vector2, completeCallBack: () => void = null) {
			const centerPos = mw.Vector2.add(startPos, endPos).multiply(0.5).add(new mw.Vector2(MathEx.rangeFloat(-300, 300), MathEx.rangeFloat(-300, 300)));
			startPos = new mw.Vector2(MathEx.rangeFloat(- 200, 200), MathEx.rangeFloat(-200, 200)).add(startPos);
			endPos = new mw.Vector2(MathEx.rangeFloat(-10, 10), MathEx.rangeFloat(-10, 10)).add(endPos);
			const tween = new mw.Tween({ t: 0 }).to({ t: 1 }, 1000).delay(MathEx.rangeFloat(10, 500)).onStart(() => {
				if (!flyUI.uiObject.parent)
					flyUI.uiObject.position = (startPos);
			}).onUpdate((t) => {
				if (!flyUI || !flyUI.uiObject || !flyUI.uiObject.position) { tween.stop(); return; }
				let pos = TypeEx.getBezier2d(startPos, centerPos, endPos, t.t);
				flyUI.uiObject.position = (pos);

			}).onComplete(() => {
				flyUI.uiObject.position = (new mw.Vector2(-100, -100));
				if (completeCallBack) {
					completeCallBack();
				}
			}).start();
			return tween;
		}

		/** 周期性放大缩小img 
			  * @param img 图片
			  * @param maxScale 最大大小
			  * @param minScale 最小大小
			  * @param changeValue 插值
			  * @param intervalTime 间隔时间
			  * @returns 返回句柄，不需要的时候使用CleanInterval清除(渲染大小不会还原)
			 */
		export function imgRenderScale(img: mw.Image, maxScale: number, minScale: number, changeValue: number, intervalTime: number = 100) {
			let scaleFlag = true;
			let scale = img.renderScale.x;
			const inter = setInterval(() => {
				if (scale >= maxScale) scaleFlag = false;
				if (scale <= minScale) scaleFlag = true;
				scale = changeValue * (scaleFlag ? 1 : -1);
				img.renderScale = (new mw.Vector2(scale));
			}, intervalTime);
			return inter;
		}

		/** 浮动提示 （根据tipsUI的画板大小来确定位置）
		   * @param target 要显示浮动信息的按钮
		   * @param tipsUI 浮动信息UI类(Canvas需要关闭自动大小)
		   * @param posType 浮动位置
		   * @param offset ui偏移
		   * @param userdata 用户信息(传入tipsUI的数据)
		   */
		export function floatTips<T extends mw.UIScript>(ui: T, target: mw.StaleButton | mw.Button, posType: TipsFloatPos, offset: mw.Vector2 = mw.Vector2.zero) {
			target.onHovered.add(() => {
				ui.visible = true;
				// 画板
				const tips = ui.uiObject;
				// 面板大小
				const tipsSize = new mw.Vector2(tips.size.x, tips.size.y);

				// 目标ui大小
				const targetSize = new mw.Vector2(target.size.x, target.size.y);

				// 当前窗口大小 不能获取，自己加个数据
				const viewSize = mw.getViewportSize();

				// 获取目标ui的世界坐标
				let pos = getWorldPosition(target);

				switch (posType) {
					case TipsFloatPos.Top:
						pos.subtract(new mw.Vector2(0, tipsSize.y));
						break;
					case TipsFloatPos.Bottom:
						pos.add(new mw.Vector2(0, targetSize.y));
						break;
					case TipsFloatPos.Left:
						pos.subtract(new mw.Vector2(tipsSize.x, 0));
						break;
					case TipsFloatPos.Right:
						pos.add(new mw.Vector2(targetSize.x, 0));
						break;
					case TipsFloatPos.Auto:

						// bottom
						if (pos.y + targetSize.y + tipsSize.y < viewSize.y) {
							pos.add(new mw.Vector2(0, targetSize.y));
							break;
						}
						// right
						if (pos.x + targetSize.x + tipsSize.x < viewSize.x) {
							pos.add(new mw.Vector2(targetSize.x, 0));
							break;
						}
						// left 
						if (pos.x - tipsSize.x > 0) {
							pos.subtract(new mw.Vector2(tipsSize.x, 0));
							break;
						}
						//top
						if (pos.y - tipsSize.y > 0) {
							pos.subtract(new mw.Vector2(0, tipsSize.y));
							break;
						}

						break;
				}

				// 添加偏移
				pos.add(offset);

				tips.position = (pos);
			});

			// 在没有覆盖的时候取消
			target.onUnhovered.add(() => {
				ui.visible = false;
			});
		}
		const flag = "grid_visible_flag";
		export class GridContainer<T extends mw.UIScript> {
			/**子节点 */
			public nodes: T[] = [];

			private size: mw.Vector2 = null;

			/**初始化GridLayout */
			constructor(private _canvas: mw.Canvas, private cls: TypeName<T>) {
			}

			/**
			 * 添加节点
			 * @param node 节点
			 */
			public addNode(...params): T {
				for (var i = 0; i < this.nodes.length; i++) {
					if (!this.nodes[i][flag]) {
						this.nodes[i].uiObject.size = (this.size);
						this.nodes[i].setVisible(true);
						this.nodes[i][flag] = true;
						return this.nodes[i];
					}
				}
				let node: T = UIService.create(this.cls);
				if (this.size == null)
					this.size = node.rootCanvas.size.clone().add(mw.Vector2.zero);
				this._canvas.addChild(node.uiObject);
				node.uiObject.size = (this.size);
				node.setVisible(true);
				node[flag] = true;
				this.nodes.push(node);
				return node;
			}

			/**
			 * 移除所有节点
			 */
			public removeAllNode() {
				for (var i = 0; i < this.nodes.length; i++) {
					this.nodes[i].uiObject.size = (mw.Vector2.zero);
					this.nodes[i].setVisible(false);
					this.nodes[i][flag] = false;
				}
			}
		}
		/**
			 * item UI抽象类
			 */
		export abstract class AbstractUIItem extends mw.UIScript {

			menu: any;
			index: number;
			abstract get clickObj(): mw.StaleButton | mw.Button;
			abstract setSelect(bool: boolean): void;
			abstract setData(data: any): void;

			abstract creat<T extends AbstractUIItem>(): T;
		}

		type DropdownElement = {
			panel: mw.ScrollBox;
			button: mw.StaleButton;
			label: mw.StaleButton;
		}
		/**
	* 下拉列表菜单 Item需要继承AbstractUIItem
	*/
		export class DropdownList<Item extends AbstractUIItem> {

			/**
			 * 不显示的缓存道具
			 */
			private _cache: Item[];
			/**
			 * 显示的道具
			 */
			private _items: Item[];
			private _itemSize: mw.Vector2;
			private _isDropdown: boolean;
			private _select: Item;

			constructor(private _itemCls: { creat(): Item }, private _root: DropdownElement, private space: number = 0) {
				this._cache = [];
				this._items = [];
				this._addExpandEvent();
			}

			/**
			 * 添加展开按钮事件
			 */
			private _addExpandEvent() {
				this._root.button.onClicked.add(() => {
					this._isDropdown = !this._isDropdown;
					this._invalidateLayout();
				});
			}

			/**
			 * 获得选择项
			 */
			public get selectItem() {
				return this._select;
			}

			/**
			 * 添加一个选项
			 * @param node 
			 * @param index 索引
			 */
			public addItem(data: { label: string }, index: number = -1) {
				let itemUI = this._cache.length > 0 ? this._cache.shift()! : this._itemCls.creat();
				if (!itemUI.menu) {
					itemUI.menu = this;
					itemUI.clickObj.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
					itemUI.clickObj.onClicked.add(() => {
						this._select = itemUI;
						this._root.label.text = (data.label)
						this._isDropdown = !this._isDropdown;
						this._invalidateLayout();
					});
					this._root.panel.addChild(itemUI.uiObject);
				}
				itemUI.visible = true;
				itemUI.setData(data);
				itemUI.uiObject.autoSizeEnable = (true);
				if (!this._itemSize) {
					this._itemSize = itemUI.uiObject.size;
					const height = this._root.panel.size.y;
					this._root.panel.size = (new mw.Vector2(this._itemSize.x, height));
				}
				if (index >= 0) {
					this._items.splice(index, 0, itemUI);
				} else {
					this._items.push(itemUI);
				}
				if (this._items.length == 1) {
					this._select = itemUI;
					this._root.label.text = (data.label)
				}
				this._invalidateLayout();
			}
			/**
			 * 删除一个选项
			 * @param node 
			 */
			public removeItem(node: Item) {
				const index = this._items.indexOf(node);
				if (index >= 0) {
					node.visible = false;
					this._cache.push(...this._items.splice(index, 1));
					this._invalidateLayout();
				}

			}
			/**
			 * 删除一个指定索引
			 * @param index 
			 */
			public removeItemAt(index: number) {
				const node = this.getItem(index);
				if (node) {
					this.removeItem(node);
				}
			}

			/**
			 * 获取一个选项,超出范围则返回undefined
			 * @param index 
			 */
			public getItem(index: number) {
				if (index >= 0 && index < this._items.length) return this._items[index];
			}

			/**
			 * 重新对齐面板
			 */
			private _invalidateLayout() {
				if (this._isDropdown) {
					let offset = 0;
					this._root.panel.visibility = (mw.SlateVisibility.Visible);
					for (let i = 0; i < this._items.length; i++) {
						this._items[i].uiObject.position = (new mw.Vector2(0, offset))
						offset += this._itemSize.y + this.space;
					}
				} else {
					this._root.panel.visibility = (mw.SlateVisibility.Collapsed);
				}

			}
		}


		/** 循环列表 */
		export class MultiScrollerTable<TItem extends AbstractUIItem> {

			private _index: number = -1;

			private _dataCount: number;

			private _sBox: mw.ScrollBox;

			private _scrollRoot: mw.Canvas;

			private _movement: mw.Orientation;

			private _itemArr: TItem[] = [];

			// 将未显示出来的Item存入未使用队列里面，等待需要使用的时候直接取出
			private _unUsedArray: TItem[] = [];


			private _maxPerLine: number = 3;

			// 距离左侧和上册的起始距离
			private _leftSpace: number = 30;
			private _topSpace: number = 30;

			// Item的宽高
			private _cellWidth = 500;
			private _cellHeight = 100;

			// 行间距X
			private _spacingX = 40;
			// 行间距Y
			private _spacingY = 20;

			//默认加载行数，一般比可显示行数大2~3行
			private _viewLine = 6;

			private _itemPrefab;
			private _dataArray: any[];
			/**
			* 循环列表构造函数
			* @param sbox       ScrollBox对象ui的引用
			* @param sr         ScrollBox下的节点的引用
			* @param prefab     ScrollBoxItem预制体
			* @param maxPerLine 每行显示的数量
			* @param leftSpace  左边界间距
			* @param topSpace   上边界间距
			* @param cellWidth  ScrollBox下子节点的宽
			* @param cellHeight ScrollBox下子节点的高
			* @param viewCount  ScrollBox的默认加载行数
			* @param spacingX   ScrollBox的行间距X
			* @param spacingY   ScrollBox的行间距Y
			*/
			constructor(itemCls: { new(...args: any[]): TItem }, sbox: mw.ScrollBox, sr: mw.Canvas, leftSpace: number = 30, topSpace: number = 30, cellWidth: number = 150, cellHeight: number = 150, spacingX: number = 40, spacingY: number = 20) {
				this._itemPrefab = itemCls;
				this._sBox = sbox;
				this._scrollRoot = sr;
				this._leftSpace = leftSpace;
				this._topSpace = topSpace;
				this._movement = sbox.orientation;
				this._cellWidth = cellWidth;
				this._cellHeight = cellHeight;
				this._spacingX = spacingX;
				this._spacingY = spacingY;
				this._maxPerLine = Math.floor((sr.size.x - leftSpace) / (cellWidth + spacingX));
				this._viewLine = Math.ceil((sr.size.y - topSpace) / (cellHeight + spacingY)) + 1;
				this._unUsedArray = [];
				this._sBox.onUserScrolled.add((curOffset) => {
					this.onValueChange();
				})
			}
			private mInitCallback: mw.Action2<number, TItem> = new mw.Action2();
			/**调用InitData第一次初始化时的回调 */
			public get InitCallback(): mw.Action2<number, TItem> {
				return this.mInitCallback;
			}

			private mItemCallback: mw.Action2<number, TItem> = new mw.Action2();
			/**每个Item刷新时的回调 */
			public get ItemCallback(): mw.Action2<number, TItem> {
				return this.mItemCallback;
			}

			setData(val: any[]) {
				this._dataCount = val.length;
				this._dataArray = val;
				this.updateTotalWidth();
				this._index = -1;
				this.resetSBoxPos();

				if (this._itemArr != null) {
					for (let i = this._itemArr.length; i > 0; i--) {
						let item: TItem = this._itemArr[i - 1];
						this._itemArr.splice(i - 1, 1);
						this._unUsedArray.push(item);
						item.uiObject.visibility = (mw.SlateVisibility.Collapsed);
					}

					this.onValueChange();
				}
			}

			onValueChange() {
				if (this._itemArr == null || this._dataCount == 0) return;

				let index = this.getPosIndex();
				if (index < 0 && this._index > 0) {
					index = 0;
				}

				if (this._index != index && index > -1) {
					this._index = index;
					for (let i = this._itemArr.length; i > 0; i--) {
						let item = this._itemArr[i - 1];
						if (item["scorllIndex"] < index * this._maxPerLine || (item["scorllIndex"] >= (index + this._viewLine) * this._maxPerLine)) {
							this._itemArr.splice(i - 1, 1);
							this._unUsedArray.push(item);
						}
					}

					for (let i = this._index * this._maxPerLine; i < (this._index + this._viewLine) * this._maxPerLine; i++) {
						if (i < 0) continue;
						if (i > this._dataCount - 1) continue;
						let isOk = false;
						for (let item of this._itemArr) {
							if (item["scorllIndex"] == i) isOk = true;
						}
						if (isOk) continue;
						this.createItem(i);
					}
				}
			}

			/**
			* 根据索引号 获取当前item的位置
			* @param i   索引
			* @return 返回Pos
			*/
			getPosition(i: number): mw.Vector2 {
				let xpos = (i % this._maxPerLine);
				let ypos = Math.floor(i / this._maxPerLine);
				switch (this._movement) {
					case mw.Orientation.OrientHorizontal:
						return new mw.Vector2((this._cellWidth + this._spacingX) * xpos + this._leftSpace, ((this._cellHeight + this._spacingY) * ypos) + this._topSpace);
					case mw.Orientation.OrientVertical:
						return new mw.Vector2((this._cellWidth + this._spacingX) * xpos + this._leftSpace, ((this._cellHeight + this._spacingY) * ypos) + this._topSpace);
					default:
						break;
				}
				return mw.Vector2.zero;
			}

			onDestroy() {
				this._itemArr = null;
				this._unUsedArray = null;
			}

			getItemCount(): number {
				return this._maxPerLine * this._viewLine;
			}

			private setItemIndex(item: TItem, index: number) {
				item["scorllIndex"] = index;
				item.uiObject.position = (this.getPosition(index));
			}
			private createItem(i: number) {
				let itemBase: TItem;
				if (this._unUsedArray.length > 0) {
					itemBase = this._unUsedArray.pop();
					itemBase.uiObject.visibility = (mw.SlateVisibility.Visible);

				}
				else {
					if (this._itemPrefab.Gain != null) {
						itemBase = this._itemPrefab.Gain();
					}
					else {
						itemBase = this._itemPrefab["creat"]();
					}


					(this._scrollRoot.addChild(itemBase.uiObject));
					itemBase.uiObject.size = (new mw.Vector2(this._cellWidth, this._cellHeight));
					this.mInitCallback.call(i, itemBase);

				}

				this.setItemIndex(itemBase, i);
				if (this._dataArray && itemBase["scorllIndex"] < this._dataArray.length) {
					itemBase.setData(this._dataArray[itemBase["scorllIndex"]]);
					this.mItemCallback.call(i, itemBase);
				}
				this._itemArr.push(itemBase);
				return;
			}

			/**
			* 获取最上位置的索引
			 * @return 返回Pos
			*/
			private getPosIndex(): number {
				let pos = this._scrollRoot.position;
				switch (this._movement) {
					case mw.Orientation.OrientHorizontal:
						{
							return Math.floor(pos.x / -(this._cellWidth + this._spacingX));
						}
					case mw.Orientation.OrientVertical:
						{
							let ret = pos.y / -(this._cellHeight + this._spacingY);
							return Math.floor(ret);
						}
					default:
						break;
				}
				return 0;
			}

			// 这个方法的目的 就是根据总数量 行列 来计算content的真正宽度或者高度
			private updateTotalWidth() {
				switch (this._movement) {
					case mw.Orientation.OrientHorizontal:
						let width = this._cellWidth * this._dataCount + this._spacingX * (this._dataCount - 1);
						let height = this._scrollRoot.size.y;
						this._scrollRoot.size = (new mw.Vector2(width, height));
						break;
					case mw.Orientation.OrientVertical:
						let lineCount = Math.ceil(this._dataCount / this._maxPerLine);
						this._scrollRoot.size = (new mw.Vector2(this._scrollRoot.size.x, this._cellHeight * lineCount + this._spacingY * (lineCount - 1) + this._topSpace));
						break;
					default:
						break;
				}
			}

			private resetSBoxPos() { // 默认不会到顶部(暂时还原)
				// 两句配合才能达到重置到顶部的效果
				this._scrollRoot.position = (new mw.Vector2(0, 0));
				this._sBox.scrollToStart();
			}

			public reset2BoxTop() { // 需要的时候再主动回到顶部(暂未启用)
				// 两句配合才能达到重置到顶部的效果
				this._scrollRoot.position = (new mw.Vector2(0, 0));
				this._sBox.scrollToStart();
			}

			/** 重置到列表尾部 */
			public reset2BoxEnd() {
				this._sBox.scrollToEnd();
			}
		}

		/*
 * @Author: pengcheng.zhang 
 * @Date: 2022-11-30 17:44:54 
 * @Last Modified by: pengcheng.zhang
 * @Last Modified time: 2022-11-30 19:37:24
 */
		const FontDefinition = {
			'originSize': 24,
			"32": { 'char': '空格', 'width': 8, xoffset: 0 },
			"33": { 'char': '!', 'width': 8, xoffset: 0 },
			"34": { 'char': '"', 'width': 10.667, xoffset: 0 },
			"35": { 'char': '#', 'width': 18.667, xoffset: 0 },
			"36": { 'char': '$', 'width': 18.667, xoffset: 0 },
			"37": { 'char': '%', 'width': 24, xoffset: 0 },
			"38": { 'char': '&', 'width': 18.667, xoffset: 0 },
			"39": { 'char': '\'', 'width': 8, xoffset: 0 },
			"40": { 'char': '(', 'width': 10.667, xoffset: 0 },
			"41": { 'char': ')', 'width': 10.667, xoffset: 0 },
			"42": { 'char': '*', 'width': 13.333, xoffset: 0 },
			"43": { 'char': '+', 'width': 18.667, xoffset: 0 },
			"44": { 'char': ',', 'width': 5.333, xoffset: 0 },
			"45": { 'char': '-', 'width': 13.333, xoffset: 0 },
			"46": { 'char': '.', 'width': 8, xoffset: 0 },
			"47": { 'char': '/', 'width': 13.333, xoffset: 0 },

			"48": { 'char': '0', 'width': 18.667, xoffset: 0 },
			"49": { 'char': '1', 'width': 18.667, xoffset: 0 },
			"50": { 'char': '2', 'width': 18.667, xoffset: 0 },
			"51": { 'char': '3', 'width': 18.667, xoffset: 0 },
			"52": { 'char': '4', 'width': 18.667, xoffset: 0 },
			"53": { 'char': '5', 'width': 18.667, xoffset: 0 },
			"54": { 'char': '6', 'width': 18.667, xoffset: 0 },
			"55": { 'char': '7', 'width': 18.667, xoffset: 0 },
			"56": { 'char': '8', 'width': 18.667, xoffset: 0 },
			"57": { 'char': '9', 'width': 18.667, xoffset: 0 },

			"65": { 'char': "A", 'width': 21.333, xoffset: 0 },
			"66": { 'char': "B", 'width': 21.333, xoffset: 0 },
			"67": { 'char': "C", 'width': 21.333, xoffset: 0 },
			"68": { 'char': "D", 'width': 21.333, xoffset: 0 },
			"69": { 'char': "E", 'width': 18.667, xoffset: 0 },
			"70": { 'char': "F", 'width': 18.667, xoffset: 0 },
			"71": { 'char': "G", 'width': 21.333, xoffset: 0 },
			"72": { 'char': "H", 'width': 21.333, xoffset: 0 },
			"73": { 'char': "I", 'width': 8, xoffset: 0 },
			"74": { 'char': "J", 'width': 18.667, xoffset: 0 },
			"75": { 'char': "K", 'width': 21.333, xoffset: 0 },
			"76": { 'char': "L", 'width': 18.667, xoffset: 0 },
			"77": { 'char': "M", 'width': 26.667, xoffset: 0 },
			"78": { 'char': "N", 'width': 21.333, xoffset: 0 },
			"79": { 'char': "O", 'width': 21.333, xoffset: 0 },
			"80": { 'char': "P", 'width': 21.333, xoffset: 0 },
			"81": { 'char': "Q", 'width': 21.333, xoffset: 0 },
			"82": { 'char': "R", 'width': 21.333, xoffset: 0 },
			"83": { 'char': "S", 'width': 18.667, xoffset: 0 },
			"84": { 'char': "T", 'width': 18.667, xoffset: 0 },
			"85": { 'char': "U", 'width': 21.333, xoffset: 0 },
			"86": { 'char': "V", 'width': 21.333, xoffset: 0 },
			"87": { 'char': "W", 'width': 26.667, xoffset: 0 },
			"88": { 'char': "X", 'width': 21.333, xoffset: 0 },
			"89": { 'char': "Y", 'width': 21.333, xoffset: 0 },
			"90": { 'char': "Z", 'width': 18.667, xoffset: 0 },
			"91": { 'char': "[", 'width': 8.667, xoffset: 0 },
			"92": { 'char': "\\", 'width': 13.333, xoffset: 0 },
			"93": { 'char': "]", 'width': 8.667, xoffset: 0 },
			"94": { 'char': "^", 'width': 13.333, xoffset: 0 },
			"95": { 'char': "_", 'width': 13.333, xoffset: 0 },
			"96": { 'char': "`", 'width': 10.667, xoffset: 0 },

			"97": { 'char': 'a', 'width': 18.667, xoffset: 0 },
			"98": { 'char': 'b', 'width': 18.667, xoffset: 0 },
			"99": { 'char': 'c', 'width': 18.667, xoffset: 0 },
			"100": { 'char': 'd', 'width': 18.667, xoffset: 0 },
			"101": { 'char': 'e', 'width': 16, xoffset: 0 },
			"102": { 'char': 'f', 'width': 10.667, xoffset: 1 },
			"103": { 'char': 'g', 'width': 18.667, xoffset: 0 },
			"104": { 'char': 'h', 'width': 18.667, xoffset: 0 },
			"105": { 'char': 'i', 'width': 8, xoffset: 0 },
			"106": { 'char': 'j', 'width': 8, xoffset: 0 },
			"107": { 'char': 'k', 'width': 16, xoffset: 0 },
			"108": { 'char': 'l', 'width': 8, xoffset: 0 },
			"109": { 'char': 'm', 'width': 26.667, xoffset: 0 },
			"110": { 'char': 'n', 'width': 18.667, xoffset: 0 },
			"111": { 'char': 'o', 'width': 18.667, xoffset: 0 },
			"112": { 'char': 'p', 'width': 18.667, xoffset: 0 },
			"113": { 'char': 'q', 'width': 18.667, xoffset: 0 },
			"114": { 'char': 'r', 'width': 10.667, xoffset: 0 },
			"115": { 'char': 's', 'width': 16, xoffset: 0 },
			"116": { 'char': 't', 'width': 10.667, xoffset: 0 },
			"117": { 'char': 'u', 'width': 18.667, xoffset: 0 },
			"118": { 'char': 'v', 'width': 16, xoffset: 0 },
			"119": { 'char': 'w', 'width': 24, xoffset: 0 },
			"120": { 'char': 'x', 'width': 16, xoffset: 0 },
			"121": { 'char': 'y', 'width': 16, xoffset: 0 },
			"122": { 'char': 'z', 'width': 16, xoffset: 0 },
			"123": { 'char': '{', 'width': 10.667, xoffset: 0 },
			"124": { 'char': '|', 'width': 8, xoffset: 0 },
			"125": { 'char': '}', 'width': 10.667, xoffset: 0 },
			"126": { 'char': '~', 'width': 21.333, xoffset: 0 },
		}

		function caculateStringWidth(str: string, fontSize: number) {
			let length = 0
			for (let i = 0; i < str.length; ++i) {
				let unicode = str.charCodeAt(i)
				if (unicode < 127) {
					if (FontDefinition[unicode] != undefined) {
						length += (FontDefinition[unicode].width + FontDefinition[unicode].xoffset) * fontSize / FontDefinition.originSize
					}
				} else {
					length += 32 * fontSize / FontDefinition.originSize
				}
			}
			return length
		}

		export interface RichTextElementParams {
			text: string
			color?: mw.LinearColor
			inParam?: any
			clickCb?: (param: any) => void
		}

		class TextElement {
			width: number
			private _fontSize: number
			private _parent: mw.Canvas
			private _params: RichTextElementParams
			private _text: mw.TextBlock
			private _touchBtn: mw.Button

			constructor(parent: mw.Canvas, params: RichTextElementParams, fontSize: number) {
				this._parent = parent
				this._params = params
				this._fontSize = fontSize

				this.width = caculateStringWidth(this._params.text, fontSize)
			}

			public render() {
				this._text = mw.TextBlock.newObject(this._parent)
				this._text.fontSize = this._fontSize
				this._text.text = this._params.text
				this._text.size = new mw.Vector2(2000, 50)
				this._text.textHorizontalLayout = mw.UITextHorizontalLayout.NoClipping
				this._text.textAlign = mw.TextJustify.Left
				this._text.textVerticalAlign = mw.TextVerticalJustify.Center
				if (this._params.color) {
					this._text.fontColor = this._params.color
				}
				if (this._params.clickCb) {
					this._touchBtn = mw.Button.newObject(this._parent)
					this._touchBtn.size = new mw.Vector2(this.width, this._text.textHeight)
					this._touchBtn.renderOpacity = 0
					this._touchBtn.onClicked.add(() => {
						this._params.clickCb(this._params.inParam)
					})
				}
			}

			public setPosition(pos: mw.Vector2) {
				this._text.position = pos.clone()
				if (this._touchBtn) {
					this._touchBtn.position = pos.clone()
				}
			}

			public enabledClicked() { return this._params.clickCb }
			public getString() { return this._params.text }
			public getFontSize() { return this._fontSize }

			public split(firstWidth: number) {
				let text1 = ''
				let text2 = ''
				let length = 0
				for (let i = 0; i < this._params.text.length; i++) {
					let unicode = this._params.text.charCodeAt(i)
					if (unicode < 127) {
						if (FontDefinition[unicode] != undefined) {
							length += FontDefinition[unicode].width * this._fontSize / FontDefinition.originSize
						}
					} else {
						length += 32 * this._fontSize / FontDefinition.originSize
					}
					if (length < firstWidth) {
						text1 = text1 + this._params.text[i]
					} else {
						text2 = text2 + this._params.text[i]
					}
				}
				let ret = [new TextElement(this._parent, { text: text1, color: this._params.color }, this._fontSize)]
				if (text2.length > 0) {
					ret.push(new TextElement(this._parent, { text: text2, color: this._params.color }, this._fontSize))
				}
				return ret
			}
			public canSplit() { return !this._params.clickCb }
			public setFontSize(size: number) { this._text.fontSize = size }
			public getText() { return this._text }
		}

		class ElementLine {
			private _width: number = 0
			private _elements: TextElement[] = []

			public pushbackElement(element: TextElement) {
				this._width += caculateStringWidth(element.getString(), element.getFontSize())
				this._elements.push(element)
			}

			public getWidth() {
				return this._width
			}

			public setPosition(pos: mw.Vector2) {
				let newPos = pos.clone()
				for (let i = 0; i < this._elements.length; i++) {
					const element = this._elements[i];
					element.setPosition(newPos.clone())
					newPos.x += element.width + 2
				}
			}

			public render() {
				for (let i = 0; i < this._elements.length; i++) {
					const element = this._elements[i];
					element.render()
				}
			}
		}

		/**
		 * 富文本类
		 */
		export class RichText {
			private _root: mw.Canvas
			private _width: number
			private _originElements: TextElement[] = []
			private _lineElements: ElementLine[] = []
			private _fontSize: number
			private _lineHeight: number
			private _contentBg: mw.Image

			/**
			 * 构造函数
			 * @param parent 父节点 
			 * @param width 富文本宽度，高度会根据文本长度自动计算
			 * @param fontSize 文字的尺寸
			 */
			constructor(parent: mw.Canvas, width: number, fontSize: number) {
				this._root = mw.Canvas.newObject(parent)
				this._contentBg = mw.Image.newObject(this._root)

				this._root.position = mw.Vector2.zero
				this._width = width
				this._fontSize = fontSize

				let tempText = mw.TextBlock.newObject(parent)
				tempText.fontSize = fontSize
				this._lineHeight = tempText.textHeight
				tempText.destroyObject()
			}

			/**
			 * 设置背景颜色
			 * @param color 
			 */
			public setBackgroundColor(color: { x: number, y: number, z: number, a?: number }) {
				if (!color.a) {
					color.a = 1
				}
				this._contentBg.imageColor = new mw.LinearColor(color.x, color.y, color.z, color.a)
			}

			/**
			 * 添加文本元素
			 * @param params 
			 * @returns 
			 */
			public pushbackElement(params: RichTextElementParams) {
				if (!params.text) { return }
				let element = new TextElement(this._root, params, this._fontSize)
				this._originElements.push(element)
			}

			/**
			 * 渲染文本内容
			 */
			public render() {
				let line = this.createLine()
				for (let i = 0; i < this._originElements.length; i++) {
					let element = this._originElements[i]
					if (line.getWidth() + element.width > this._width) {
						if (element.canSplit()) {
							let inElements: TextElement[] = []
							this.splitElement(element, inElements, this._width - line.getWidth())
							for (let i = 0; i < inElements.length; i++) {
								const element = inElements[i];
								line.pushbackElement(element)
								if (i < inElements.length - 1) {
									line = this.createLine()
								}
							}
						} else {
							line = this.createLine()
							line.pushbackElement(element)
						}
					} else {
						line.pushbackElement(element)
					}
				}
				for (let i = 0; i < this._lineElements.length; i++) {
					const line = this._lineElements[i];
					line.render()
					line.setPosition(new mw.Vector2(0, this._lineHeight * i))
				}
				this._contentBg.size = this.getSize().clone()
			}

			public getSize() {
				return new mw.Vector2(this._width, this._lineElements.length * this._lineHeight)
			}

			public setFontSize(size: mw.Vector2) {

			}

			private createLine() {
				let line = new ElementLine()
				this._lineElements.push(line)
				return line
			}

			private splitElement(element: TextElement, outElements: TextElement[], firstWidth: number) {
				if (!element) {
					return
				}

				if (element.width < firstWidth) {
					outElements.push(element)
					return
				}

				let newElements = element.split(firstWidth)
				outElements.push(newElements[0])
				this.splitElement(newElements[1], outElements, this._width)
			}
		}


		/** 显示或者隐藏ui 
		 * @param ui ui控件
		 * @param flag 是否显示ui
		*/
		export function show(ui: mw.Widget, flag: boolean = true) {
			if (flag) {
				ui.visibility = (mw.SlateVisibility.Visible);
			} else {
				ui.visibility = (mw.SlateVisibility.Hidden);
			}
		}

		/** 获取ui的世界坐标 */
		export function getWorldPosition(ui: mw.Widget) {
			let pos = ui.position;
			while (ui.parent != null) {
				ui = ui.parent;
				pos = pos.add(ui.position);
			}
			return pos;
		}

		/** 判断ui是否可见 */
		export function isShow(ui: mw.Widget): boolean {
			switch (ui.visibility) {
				case mw.SlateVisibility.Visible:
				case mw.SlateVisibility.HitTestInvisible:
				case mw.SlateVisibility.SelfHitTestInvisible:
					return true;
				case mw.SlateVisibility.Hidden:
				case mw.SlateVisibility.Collapsed:
					return false;
				default:
					return false;
			}
		}

		/** Widget进出的方位 */
		export enum Direction {
			/** 从上到下进出场 */
			Top,
			/** 从下到上进出场 */
			Bottom,
			/** 从左向右进出场 */
			Left,
			/** 从右向左进出场 */
			Right,
			/** 中心 */
			Center,
			/** 左上 */
			TopLeft,
			/** 右上 */
			TopRight,
			/** 左下 */
			BottomLeft,
			/** 右下 */
			BottomRight,
		}

		/* 动画播放器 */
		class UIAnimePlayer {
			/** 正在播放动画的Widget载入map保证一个widget一次性只能执行一个动画 */
			static playing: Map<string, mw.Tween<UIAnimInfo>> = new Map();

			/**
			 * 使用Tween播放插值动画
			 * @param widget 应用动画的Widget
			 * @param startInfo 插值初始状态类
			 * @param endInfo 插值结束状态类
			 * @param easing Tween插值曲线
			 * @param time 动画持续时间
			 * @param onComplete 动画完成后回调
			 * @returns 
			 */
			static playAnim(widget: mw.Widget, startInfo: UIAnimInfo, endInfo: UIAnimInfo, easing: TweenEasingFunction, time?: number, onComplete?: () => void): void {
				// 同一Widget不同动画中不重复执行 - 防止用户多次点击同一按钮连续触发还没执行完的动画
				if (UIAnimePlayer.playing.has(widget.guid)) {
					return;
				}
				startInfo.applyToWidget(widget);
				const tween = new mw.Tween(startInfo).to(endInfo)
					.easing(easing)
					.onComplete(() => {
						UIAnimePlayer.playing.delete(widget.guid);
						if (onComplete) {
							endInfo.applyToWidget(widget);
							onComplete();
						}
					})
					.onUpdate((info) => {
						info.applyToWidget(widget);
					})
				if (time) {
					tween.duration(time);
				}
				UIAnimePlayer.playing.set(widget.guid, tween);
				tween.start();
			}
		}

		/**
		 * UI可变换状态类
		 */
		class UIAnimInfo {
			/** widget的 位置 用于相应变换 */
			position: mw.Vector2;
			/** widget的 渲染透明度 用于相应变换 */
			renderOpacity: number;
			/** widget的 渲染透缩放 用于相应变换 */
			renderScale: mw.Vector2;
			/** widget的 渲染透错切形变 用于相应变换 */
			renderShear: mw.Vector2;
			/** widget的 旋转角度 用于相应变换 */
			renderTransformAngle: number;

			constructor(infoProvider: UIAnimInfo | mw.Widget) {
				if (infoProvider instanceof UIAnimInfo) {
					// 通过 UIAnimInfo 创建，实现克隆
					this.position = infoProvider.position.clone();
					this.renderOpacity = infoProvider.renderOpacity;
					this.renderScale = infoProvider.renderScale.clone();
					this.renderShear = infoProvider.renderShear.clone();
					this.renderTransformAngle = infoProvider.renderTransformAngle;
				} else if (infoProvider instanceof mw.Widget) {
					// 通过 Widget 创建，使其保有默认值
					this.position = infoProvider.position.clone();
					this.renderOpacity = infoProvider.renderOpacity;
					this.renderScale = infoProvider.renderScale.clone();
					this.renderShear = infoProvider.renderShear.clone();
					this.renderTransformAngle = infoProvider.renderTransformAngle;
				}
			}

			setPosition(position: mw.Vector2): UIAnimInfo {
				this.position = position.clone();
				return this;
			}

			setRenderOpacity(renderOpacity: number): UIAnimInfo {
				this.renderOpacity = renderOpacity;
				return this;
			}

			setRenderScale(renderScale: mw.Vector2): UIAnimInfo {
				this.renderScale = renderScale.clone();
				return this;
			}

			setRenderShear(renderShear: mw.Vector2): UIAnimInfo {
				this.renderShear = renderShear.clone();
				return this;
			}

			setRenderTransformAngle(renderTransformAngle: number): UIAnimInfo {
				this.renderTransformAngle = renderTransformAngle;
				return this;
			}

			clone(): UIAnimInfo {
				return new UIAnimInfo(this);
			}

			/**
			 * 将一个 UIAnimInfo 数据应用到 Widget
			 * @param widget 可以是Widget，Img等
			 */
			applyToWidget(widget: mw.Widget): void {
				widget.position = this.position.clone();
				widget.renderOpacity = this.renderOpacity;
				widget.renderScale = this.renderScale.clone();
				widget.renderShear = this.renderShear.clone();
				widget.renderTransformAngle = this.renderTransformAngle;
			}
		}

		/**
		 * UI文本变换状态类
		 */
		class UITextAnimInfo extends UIAnimInfo {

			/** 数字文本的缓动 */
			textNum: number;

			constructor(infoProvider: UITextAnimInfo | mw.TextBlock) {
				super(infoProvider);
				if (infoProvider instanceof UITextAnimInfo) {
					this.textNum = infoProvider.textNum;
				} else if (infoProvider instanceof mw.TextBlock) {
					this.textNum = Number(infoProvider.text);
				}
			}

			setText(textNum: number): UIAnimInfo {
				this.textNum = textNum;
				return this;
			}

			override applyToWidget(widget: mw.Widget): void {
				super.applyToWidget(widget);
				(<mw.TextBlock>widget).text = Math.floor(this.textNum) + "";
			}
		}



		/**
		 * 淡入
		 * @param widget 应用动画的Widget
		 * @param time 动画持续时间
		 * @param onComplete 动画完成后回调
		 */
		export function fadeIn(widget: mw.Widget, time?: number, onComplete?: () => void): void {
			const startInfo = new UIAnimInfo(widget)
				.setRenderOpacity(0);
			const endInfo = new UIAnimInfo(widget)
				.setRenderOpacity(1);
			const easing = mw.TweenUtil.Easing.Linear.None;
			UIAnimePlayer.playAnim(widget, startInfo, endInfo, easing, time, onComplete);
		}

		/**
		 * 从一侧平移进场
		 * @param widget 应用动画的Widget
		 * @param dir 进场方向
		 * @param time 动画持续时间
		 * @param onComplete 动画完成后回调
		 * @param easingFun 动画函数 - 默认线性
		 */
		export function transformIn(
			widget: mw.Widget,
			dir: Direction,
			time?: number, onComplete?: () => void,
			easingFun: TweenEasingFunction = mw.TweenUtil.Easing.Linear.None
		): void {
			const startInfo = new UIAnimInfo(widget);
			const endInfo = new UIAnimInfo(widget).setPosition(widget.position);
			switch (dir) {
				case Direction.Top:
					startInfo.setPosition(new mw.Vector2(0, -widget.size.y));
					break;
				case Direction.Bottom:
					startInfo.setPosition(new mw.Vector2(0, mw.getViewportSize().y + widget.size.y));
					break;
				case Direction.Left:
					startInfo.setPosition(new mw.Vector2(-widget.size.x, 0));
					break;
				case Direction.Right:
					startInfo.setPosition(new mw.Vector2(mw.getViewportSize().x + widget.size.x, 0));
					break;
				default:
					console.error("[UIAnimUtil] 该动画不能使用此方向");
					return;
			}
			UIAnimePlayer.playAnim(widget, startInfo, endInfo, easingFun, time, onComplete);
		}

		/**
		 * 从一侧缩放进场
		 * @param widget 应用动画的Widget
		 * @param dir 进场方向
		 * @param time 动画持续时间
		 * @param onComplete 动画完成后回调
		 * @returns 
		 */
		export function scaleIn(widget: mw.Widget, dir: Direction, time?: number, onComplete?: () => void) {
			const startInfo = new UIAnimInfo(widget);
			const endInfo = new UIAnimInfo(widget).setRenderScale(mw.Vector2.one);
			switch (dir) {
				case Direction.Top:
					startInfo.setPosition(new mw.Vector2(0, -widget.size.y / 2))
						.setRenderScale(new mw.Vector2(1, 0));
					break;
				case Direction.Bottom:
					startInfo.setPosition(new mw.Vector2(0, widget.size.y / 2))
						.setRenderScale(new mw.Vector2(1, 0));
					break;
				case Direction.Left:
					startInfo.setPosition(new mw.Vector2(-widget.size.x / 2, 0))
						.setRenderScale(new mw.Vector2(0, 1));
					break;
				case Direction.Right:
					startInfo.setPosition(new mw.Vector2(widget.size.x / 2, 0))
						.setRenderScale(new mw.Vector2(0, 1));
					break;
				case Direction.Center:
					startInfo.setRenderScale(mw.Vector2.zero);
					break;
				default:
					console.error("[UIAnimUtil] 该动画不能使用此方向");
					return;
			}
			const easing = mw.TweenUtil.Easing.Linear.None;
			UIAnimePlayer.playAnim(widget, startInfo, endInfo, easing, time, onComplete);
		}



		/**
		 * 淡出
		 * @param widget 应用动画的Widget
		 * @param time 动画持续时间
		 * @param onComplete 动画完成后回调
		 */
		export function fadeOut(widget: mw.Widget, time?: number, onComplete?: () => void): void {
			const startInfo = new UIAnimInfo(widget)
				.setRenderOpacity(1);
			const endInfo = new UIAnimInfo(widget)
				.setRenderOpacity(0);
			const easing = mw.TweenUtil.Easing.Linear.None;
			UIAnimePlayer.playAnim(widget, startInfo, endInfo, easing, time, onComplete);
		}

		/**
		 * 从一侧平移出场
		 * @param widget 应用动画的Widget
		 * @param dir 进场方向
		 * @param time 动画持续时间
		 * @param onComplete 动画完成后回调
		 * @param easingFun 动画函数 - 默认线性
		 */
		export function transformOut(
			widget: mw.Widget,
			dir: Direction,
			time?: number,
			onComplete?: () => void,
			easingFun: TweenEasingFunction = mw.TweenUtil.Easing.Linear.None
		): void {
			const startInfo = new UIAnimInfo(widget).setPosition(widget.position);
			const endInfo = new UIAnimInfo(widget);
			const defInfo = startInfo.clone();
			switch (dir) {
				case Direction.Top:
					endInfo.setPosition(new mw.Vector2(0, mw.getViewportSize().y + widget.size.y));
					break;
				case Direction.Bottom:
					endInfo.setPosition(new mw.Vector2(0, -widget.size.y));
					break;
				case Direction.Left:
					endInfo.setPosition(new mw.Vector2(mw.getViewportSize().x + widget.size.x, 0));
					break;
				case Direction.Right:
					endInfo.setPosition(new mw.Vector2(-widget.size.x, 0));
					break;
				default:
					console.error("[UIAnimUtil] 该动画不能使用此方向");
					return;
			}
			UIAnimePlayer.playAnim(widget, startInfo, endInfo, easingFun, time, () => {
				// 出场后需还原状态
				defInfo.applyToWidget(widget);
				if (onComplete) {
					onComplete();
				}
			});
		}

		/**
		 * 从一侧缩放出场
		 * @param widget 应用动画的Widget
		 * @param dir 出场方向
		 * @param time 动画持续时间
		 * @param onComplete 动画完成后回调
		 * @returns 
		 */
		export function scaleOut(widget: mw.Widget, dir: Direction, time?: number, onComplete?: () => void) {
			const startInfo = new UIAnimInfo(widget);
			const endInfo = new UIAnimInfo(widget);
			const defInfo = startInfo.clone();
			switch (dir) {
				case Direction.Top:
					endInfo.setPosition(new mw.Vector2(0, -widget.size.y / 2))
						.setRenderScale(new mw.Vector2(1, 0));
					break;
				case Direction.Bottom:
					endInfo.setPosition(new mw.Vector2(0, widget.size.y / 2))
						.setRenderScale(new mw.Vector2(1, 0));
					break;
				case Direction.Left:
					endInfo.setPosition(new mw.Vector2(-widget.size.x / 2, 0))
						.setRenderScale(new mw.Vector2(0, 1));
					break;
				case Direction.Right:
					endInfo.setPosition(new mw.Vector2(widget.size.x / 2, 0))
						.setRenderScale(new mw.Vector2(0, 1));
					break;
				case Direction.Center:
					endInfo.setRenderScale(mw.Vector2.zero);
					break;
				default:
					console.error("[UIAnimUtil] 该动画不能使用此方向");
					return;
			}
			const easing = mw.TweenUtil.Easing.Linear.None;
			UIAnimePlayer.playAnim(widget, startInfo, endInfo, easing, time, () => {
				// 出场后需还原状态
				defInfo.applyToWidget(widget);
				if (onComplete) {
					onComplete();
				}
			});
		}
		/**
		 * 文本数字缓动
		 * @param widget 应用动画的Widget
		 * @param toTextNum 目标数字值
		 * @param time 动画持续时间
		 * @param onComplete 动画完成后回调
		 */
		export function textNumTo(widget: mw.TextBlock, toTextNum: number, time?: number, onComplete?: () => void): void {
			const startInfo = new UITextAnimInfo(widget);
			const endInfo = new UITextAnimInfo(widget).setText(toTextNum);
			const easing = mw.TweenUtil.Easing.Linear.None;
			UIAnimePlayer.playAnim(widget, startInfo, endInfo, easing, time, onComplete);
		}
		/**
		 * 缩放动画
		 * @param widget 应用动画的Widget
		 * @param scale 目标缩放值
		 * @param time 动画持续时间
		 * @param onComplete 动画完成后回调
		 */
		export function scaleTo(widget: mw.Widget, scale: mw.Vector2, time?: number, onComplete?: () => void) {
			const startInfo = new UIAnimInfo(widget);
			const endInfo = new UIAnimInfo(widget).setRenderScale(scale);
			const easing = mw.TweenUtil.Easing.Linear.None;
			UIAnimePlayer.playAnim(widget, startInfo, endInfo, easing, time, onComplete);
		}
	}


	export namespace TimeEx {
		// 固定帧参数
		const FPS = 30; //  30帧每秒的情况
		const singleFrameTime = (1 / FPS);
		let timeStamp = 0;
		let _onFixedUpdate: Action1<number>;
		/** 固定帧 */
		export function onFixedUpdate(action: (dt: number) => void) {
			if (!_onFixedUpdate) {
				_onFixedUpdate = new Action();
				TimeUtil.onEnterFrame.add((dt) => {
					timeStamp += dt;
					let count = 0;
					while (timeStamp > singleFrameTime) {
						// 追帧速度
						if (count++ > 5) break;
						_onFixedUpdate.call(singleFrameTime);
						timeStamp = (timeStamp - singleFrameTime);
					}
				})
			}
			_onFixedUpdate.add(action);
		}
		/**
		 * 分帧加载
		 */
		export class WaitSpawn {
			/**
			 * 每帧加载个数
			 */
			public static spawnCount: number = 100;
			private static _instance: WaitSpawn;
			/**
			 * 生成物体
			 * @param spawnInfo 生成信息
			 * @returns 
			 */
			public static spawn(spawnInfo: SpawnInfo): Promise<mw.GameObject> {
				if (!this._instance) {
					this._instance = new WaitSpawn();
				}
				return this._instance.addSpawn(spawnInfo);
			}
			constructor() {
				TimeUtil.onEnterFrame.add(this.onEnterFrame.bind(this));
			}
			/**
			 * 等待列表
			 */
			private _waitList: { spawnInfo: SpawnInfo, resolve }[] = [];
			/**
			 * 添加异步生成物体
			 * @param spawnInfo 
			 * @returns 
			 */
			private addSpawn(spawnInfo: SpawnInfo) {
				return new Promise<mw.GameObject>((resolve) => this._waitList.push({ spawnInfo: spawnInfo, resolve: resolve }));
			}
			/**
			 * 每帧执行
			 * @param dt 
			 * @returns 
			 */
			private onEnterFrame(dt: number) {
				console.log("frame time:", dt)
				if (dt >= 100) return;
				for (let index = 0; index < WaitSpawn.spawnCount && this._waitList.length > 0; index++) {
					const waitData = this._waitList.shift();
					SpawnManager.asyncSpawn(waitData.spawnInfo).then(async (go) => {
						await go.asyncReady();
						waitData.resolve(go);
					});
				}
			}
		}

		/**
		 *  异步等待
		 */
		export class WaitReady {

			/** 是否有执行 */
			public padded: boolean = false;
			/** 执行中时，缓存异步回调 */
			protected actionList: { resolve: (b) => void, reject: (b) => void }[] = [];

			/**
			 * 异步执行
			 */
			public async ready(): Promise<null> {
				if (this.padded) {
					return null;
				}
				return new Promise((resolve, reject) => {
					this.actionList.push({ resolve: resolve, reject: reject });
				});
			}

			/**
			 * 调用结束结束
			 * @description 仅支持了成功调用
			 */
			public over(): void {
				if (this.padded) {
					return;
				}
				this.padded = true;
				let ls = this.actionList, len = ls.length;
				for (let i = 0; i < len; i++) {
					ls[i].resolve(null);
				}
				this.actionList = [];
			}

		}
	}

	/**
	 * 张大佬做的lerp工具,声音淡入淡出
	 */
	export namespace SoundEx {
		enum BGMState {
			Stop,
			Playing,
			Pause
		}

		class BGMInfo {
			guid: string
			sound: mw.Sound
			volume: number
			state: BGMState
		}

		class SoundInfo {
			soundArr: mw.Sound[] = []
			volume: number
			loop: boolean
		}


		const DefaultVolume = 100
		const DefaultVolumeScale = 100;
		/**
		 * 背景音乐
		 */
		let _bgmMap: Map<string, BGMInfo> = new Map()
		let _musicVolume: number = DefaultVolumeScale
		let _currentMusic: BGMInfo
		let _musicFadeTween: mw.Tween<{ volume: number }>
		let _musicLoop: boolean = true

		/**
		 * 音效
		 */
		let _soundMap: Map<string, SoundInfo> = new Map()
		let _soundVolume: number = DefaultVolumeScale;

		/**
		 * 播放背景音乐
		 * @param guid 
		 * @param volume 
		 * @param autoLoop 
		 */
		export function playMusic(guid: string, volume: number = DefaultVolume, autoLoop: boolean = true) {
			_musicLoop = autoLoop

			let info: BGMInfo
			if (_bgmMap.has(guid)) {
				info = _bgmMap.get(guid)
				if (volume != info.volume) {
					info.volume = volume
				}
				if (info.state == BGMState.Stop) {
					changeMusic(info)
				} else if (info.state == BGMState.Pause) {
					//todo pause
					resumeMusic()
				} else if (info.state == BGMState.Playing) {
					info.sound.volume = caculateMusicVolume(volume)
				}
			} else {
				info = new BGMInfo()
				info.guid = guid
				info.volume = volume
				SpawnManager.wornAsyncSpawn(guid).then((sound) => {
					info.sound = sound as mw.Sound
					changeMusic(info)
				})
				_bgmMap.set(guid, info)
			}
		}

		/**
		 * 设置BGM音量大小
		 * @param volume 
		 */
		export function setMusicVolume(volume: number) {
			_musicVolume = volume
			if (_currentMusic) {
				_currentMusic.sound.volume = caculateMusicVolume(volume)
			}
		}

		/**
		 * 停止BGM
		 */
		export function stopMusic() {
			if (_currentMusic) {
				_currentMusic.sound.stop()
				_currentMusic.state = BGMState.Stop
			}
		}

		/**
		 * 暂停BGM
		 */
		export function pauseMusic() {
			if (_currentMusic) {
				if (_currentMusic.state == BGMState.Pause) {
					return
				}
				_currentMusic.sound.pause()
				_currentMusic.state = BGMState.Pause
			}
		}

		/**
		 * 恢复音乐
		 */
		export function resumeMusic() {
			if (_currentMusic) {
				if (_currentMusic.state == BGMState.Playing) {
					return
				}
				_currentMusic.sound.play()
				_currentMusic.state = BGMState.Playing
			}
		}

		/**
		 * 获取背景音乐的音量大小
		 * @returns 
		 */
		export function getMusicVolume() { return _musicVolume }


		/**
		 * 播放音效
		 * @param guid 
		 * @param volume 音量
		 * @param autoLoop 是否循环
		 */
		export function playSound(guid: string, volume: number = DefaultVolume, autoLoop: boolean = false) {
			if (!_soundMap.has(guid)) {
				let info = new SoundInfo()
				info.volume = volume
				info.loop = autoLoop
				info.soundArr = []
				_soundMap.set(guid, info)
			}
			const soundInfo = _soundMap.get(guid)
			if (soundInfo.volume != volume) {
				soundInfo.volume = volume
			}

			let sound: mw.Sound
			for (let i = 0; i < soundInfo.soundArr.length; i++) {
				const element = soundInfo.soundArr[i];
				if (!element.playState) {
					sound = element
					break
				}
			}
			if (!sound) {
				SpawnManager.wornAsyncSpawn(guid).then((obj) => {
					sound = obj as mw.Sound
					sound.isLoop = soundInfo.loop
					sound.volume = caculateSoundVolume(soundInfo.volume)
					sound.play()
					if (soundInfo.soundArr.length < 5) {
						soundInfo.soundArr.push(sound)
					} else {
						sound.onFinish.add(() => {
							sound.destroy()
						})
					}
				})
			} else {
				sound.volume = caculateSoundVolume(soundInfo.volume)
				sound.play()
			}
		}

		export function printAllSoundCounts() {
			console.log("BMG COUNTS=" + _bgmMap.size)
			let counts = 0
			_soundMap.forEach((soundInfo) => {
				counts += soundInfo.soundArr.length
			})
			console.log("Sound COUNTS=" + counts)
		}

		/**************************************************私有方法********************************************************************** */

		function caculateMusicVolume(volume: number) {
			return volume / 100 * 5 * _musicVolume / DefaultVolumeScale
		}

		function caculateSoundVolume(volume: number) {
			return volume / 100 * 5 * _soundVolume / DefaultVolumeScale
		}

		/**
		 * 切换背景音乐
		 * @param newMusic 
		 */
		function changeMusic(newMusic: BGMInfo) {
			if (_musicFadeTween) {
				_musicFadeTween.stop()
			}
			if (_currentMusic && _currentMusic.state) {
				musicFadeOut(() => {
					musicFadeIn(newMusic)
				})
			} else {
				musicFadeIn(newMusic)
			}
		}

		/**
		 * 淡出
		 * @param callback 
		 */
		function musicFadeOut(callback?: () => void) {
			_musicFadeTween = new mw.Tween({ volume: _currentMusic.volume })
				.to({ volume: 0 }, 1500)
				.onUpdate((obj) => {
					_currentMusic.sound.volume = caculateMusicVolume(obj.volume)
				})
				.onComplete(() => {
					_currentMusic.state = BGMState.Stop
					_currentMusic.sound.stop()
					callback && callback()
				})
				.start()
		}

		/**
		 * 淡入
		 * @param callback 
		 */
		function musicFadeIn(newMusic: BGMInfo, callback?: () => void) {

			_musicFadeTween = new mw.Tween({ volume: 0 })
				.to({ volume: newMusic.volume }, 1500)
				.onStart(() => {
					newMusic.state = BGMState.Playing
					newMusic.sound.isLoop = _musicLoop
					newMusic.sound.play()
					_currentMusic = newMusic
				})
				.onUpdate((obj) => {
					newMusic.sound.volume = caculateMusicVolume(obj.volume)
				})
				.onComplete(() => {
					callback && callback()
				})
				.start()
		}
	}

	/**
	 * Type类工具
	 */
	export namespace TypeEx {

		export function quaternionMul(a: mw.Quaternion, b: mw.Quaternion) {
			let result = new mw.Quaternion();
			result.x = a.x * b.w + a.y * b.z - a.z * b.y + a.w * b.x;
			result.y = -a.x * b.z + a.y * b.w + a.z * b.x + a.w * b.y;
			result.z = a.x * b.y - a.y * b.x + a.z * b.w + a.w * b.z;
			result.w = -a.x * b.x - a.y * b.y - a.z * b.z + a.w * b.w;
			return result;
		}

		/**
		 * 线性插值
		 * @param from 初始位置
		 * @param to 目标位置
		 * @param t 插值
		 * @param generator 生成返回值对象
		 * @returns result
		 */
		export function vectorLerp<V>(from: V, to: V, t: number, generator: new () => V) {
			let result = new generator();
			for (var k in result) {
				let value0 = from[k] as unknown as number;
				let value1 = to[k] as unknown as number;
				if (null != value0 && null != value1) {
					(result as any)[k] = value0 + (value1 - value0) * t;
				}
			}
			return result;
		}
		/**
		 * 点乘
		 * @param a 
		 * @param b 
		 * @returns 
		 */
		export function dotMul(a: mw.Vector, b: mw.Vector) {
			return a.x * b.x + a.y * b.y + a.z * b.z;
		}
		/**
		 * 反射向量
		 * @param inV 
		 * @param normalV 
		 * @returns 
		 */
		export function getReflectVector(inV: mw.Vector, normalV: mw.Vector) {
			normalV = normalV.normalized;
			return inV.clone().subtract(normalV.multiply(dotMul(inV, normalV) * 2));
		}
		/**
		 * 数组转vector
		 * @param arr 
		 * @returns 
		 */
		export function arr2Vec3(arr: number[]) {
			if (arr == null || arr.length != 3) {
				return null;
			}
			let vec = new mw.Vector(arr[0], arr[1], arr[2]);
			return vec;
		}
		/**
		 * 数组转Rotation
		 * @param arr 
		 * @returns 
		 */
		export function arr2Rot3(arr: number[]) {
			if (arr == null || arr.length != 3) {
				return null;
			}
			let vec = new mw.Rotation(arr[0], arr[1], arr[2]);
			return vec;
		}
		/**
		 * Vector转数组
		 * @param vec 
		 * @returns 
		 */
		export function vec2Arr(vec: mw.Vector) {
			return [vec.x, vec.y, vec.z];
		}

		/**
		 * 获取3维向量的长度 
		 * @param v3 3维向量
		 * @returns 长度
		 */
		export function v3Magnitude(v3: mw.Vector): number {
			let result = v3.x * v3.x + v3.y * v3.y + v3.z * v3.z;
			return Math.sqrt(result);
		}

		/**
		 * 距离平方
		 * @param a 
		 * @param b 
		 * @returns 
		 */
		export function distanceSquare(a: mw.Vector, b: mw.Vector) {
			return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) + (a.z - b.z) * (a.z - b.z);
		}
		/**
		 * 对比两个vector
		 * @param vecA 
		 * @param vecB 
		 * @param diff 
		 * @returns 
		 */
		export function isVectorSimilar(vecA: mw.Vector, vecB: mw.Vector, diff: number) {
			let diffX: number = Math.abs(vecA.x - vecB.x);
			let diffY: number = Math.abs(vecA.y - vecB.y);
			//oTrace("diff", diffX, diffY, diff);
			return diffX <= diff && diffY <= diff;
		}
		/**
		 * 判断
		 * @param A 
		 * @param B 
		 * @param center 
		 * @returns 
		 */
		export function isBetween(A: mw.Vector, B: mw.Vector, center: mw.Vector) {
			return ((A.x <= center.x && center.x <= B.x) || (B.x <= center.x && center.x <= A.x)) && ((A.y <= center.y && center.y <= B.y) || (B.y <= center.y && center.y <= A.y));
		}
		/**
		 * 获取圆形上随机位置
		 * @param center 
		 * @param raduis 
		 * @returns 
		 */
		export function getCircleRandomPos(center: mw.Vector, raduis: number) {
			let ret = new mw.Vector(center.x, center.y, center.z);
			let angle = MathEx.rangeFloat(0, 360);
			ret.x = center.x + Math.sin(angle * Math.PI / 180) * raduis;
			ret.y = center.y + Math.cos(angle * Math.PI / 180) * raduis;
			return ret;
		}

		export function getLinePos(start: mw.Vector, end: mw.Vector, raduis: number) {
			if (raduis == 0) {
				return end;
			}
			let dir = mw.Vector.subtract(end, start);
			let size = dir.length;
			if (size <= raduis) {
				return start;
			}
			dir = dir.normalized;
			return dir.multiply(size - raduis).add(start);
		}
		/**
		 * 3d 贝塞尔曲线
		 * @param p0 
		 * @param p1 
		 * @param p2 
		 * @param t 
		 * @returns 
		 */
		export function getBezier3d(p0: mw.Vector, p1: mw.Vector, p2: mw.Vector, t: number) {
			let x = (1 - t) * (1 - t) * p0.x + 2 * t * (1 - t) * p1.x + t * t * p2.x;
			let y = (1 - t) * (1 - t) * p0.y + 2 * t * (1 - t) * p1.y + t * t * p2.y;
			let z = (1 - t) * (1 - t) * p0.z + 2 * t * (1 - t) * p1.z + t * t * p2.z;

			return new mw.Vector(x, y, z);
		}
		/**
		 * 2d 贝塞尔曲线
		 * @param p0 
		 * @param p1 
		 * @param p2 
		 * @param t 
		 * @returns 
		 */
		export function getBezier2d(p0: mw.Vector2, p1: mw.Vector2, p2: mw.Vector2, t: number) {
			let x = (1 - t) * (1 - t) * p0.x + 2 * t * (1 - t) * p1.x + t * t * p2.x;
			let y = (1 - t) * (1 - t) * p0.y + 2 * t * (1 - t) * p1.y + t * t * p2.y;

			return new mw.Vector2(x, y);
		}

		/**获取向量的长度 */
		export function v2Magnitude(v2: mw.Vector2): number {
			let result = v2.x * v2.x + v2.y * v2.y;
			return Math.sqrt(result);
		}

		/**向量的插值计算 */
		export function v3Lerp(from: mw.Vector, to: mw.Vector, t: number): mw.Vector {

			let result = new mw.Vector(0, 0, 0);

			result.x = from.x + (to.x - from.x) * t;
			result.y = from.y + (to.y - from.y) * t;
			result.z = from.z + (to.z - from.z) * t;

			return result;
		}

		/**
		 * 依轴过滤向量,只保留绝对值最大的值
		 * @param vector 向量 
		 * @returns 轴向量
		 */
		export function getAxisAbsMax<V>(vector: V) {
			let axis = ""
			let value = 0;
			for (let k in vector) {
				let compv: number = + vector[k];
				if (Number.isNaN(compv)) {
					continue;
				}
				if (Math.abs(compv) > Math.abs(value)) {
					axis = k;
					value = compv;
				}
			}
			return { axis: axis, value: value };
		}

		/**
		* 判断2维向量是否在矩形范围内
		* @param min 矩形向量中最小的点
		* @param max 矩形向量中最大的点
		* @param pos 被判断的点
		* @returns 以两点作为边界值的比较
		*/
		export function withinRect(min: mw.Vector2, max: mw.Vector2, pos: mw.Vector2) {
			return pos.x >= min.x && pos.x <= max.x && pos.y >= min.y && pos.y <= max.y;
		}
	}

	export namespace MathEx {

		/**一个唯一编号，累+ */
		let g_s_UnitBaseGuid = 0;
		/**调用这个获取一个中的唯一id 
		 * @TakeCare 客户端可能不同，双端调用的不要在客户端创建
		 */
		export function getGuid() {
			return g_s_UnitBaseGuid++;
		}
		/**
		 * 随机浮点数（返回大于等于 min 小于 max ）
		 * @param min 最小值 
		 * @param max 最大值
		 * @returns 返回大于等于 min 小于 max
		 */
		export function rangeFloat(min: number, max: number): number {
			return Math.random() * (max - min) + min;
		}
		/**
		 * 随机整数（返回min到max中的整数）
		 * @param min 最小值
		 * @param max 最大值
		 * @returns min到max中的整数
		 */
		export function rangeInt(min: number, max: number): number {
			return Math.floor(MathEx.rangeFloat(min, max));
		}
		/**
		 * 返回数组中一个随机的item
		 * @param items 数组
		 * @param pAutoRemove 是否从数组中删除 
		 * @returns 一个随机的item
		 */
		export function rangeItem<T>(items: T[], pAutoRemove: boolean = true): T {
			const index = MathEx.rangeInt(0, items.length);
			const item = items[index];
			if (pAutoRemove) {
				items.splice(index, 1);
			}
			return item;
		}
		/**
		 * 根据权重返回一个index
		 * @param arr 
		 * @returns 
		 */
		export function rangeWeight(arr: number[]) {
			// 最大值
			let max = 0;
			arr.forEach(value => max += value);
			// 随机值
			const range = MathEx.rangeInt(0, max);
			// 最小值
			let min = 0;
			for (let index = 0; index < arr.length; index++) {
				min += arr[index];
				if (min >= range) {
					return index;
				}
			}
		}

		export function rangeVector(start: Vector, end: Vector) {
			return new Vector(
				MathEx.rangeFloat(start.x, start.x + end.x),
				MathEx.rangeFloat(start.y, start.y + end.y),
				MathEx.rangeFloat(start.z, start.z + end.z));

		}

		/**
	   * 限制值为 [min,max]
	   * @param value 被限制的值
	   * @param min 最小值
	   * @param max 最大值
	   * @returns 当min>max时不做处理
	   */
		export function clamp(value: number, min: number, max: number): number {
			if (min > max) {
				return value
			}
			return value < min ? min : value > max ? max : value;
		}
		/**
		 * 限制值为 [0,1]
		 * @param value 被限制的值
		 * @returns 越界时替换
		 */
		export function clamp01(value: number) {
			return MathEx.clamp(value, 0, 1);
		}
	}
	/**
	  * 状态实例类
	*/
	export class StateFunc {
		enter?: (data?: any) => void
		update?: (dt: number) => void
		exit?: (nextState?: any) => void
	}

	/**
	 * 状态机
	 */
	export class StateMachine<T> {
		private _states: Map<T, StateFunc>
		private currentState: T

		constructor() {
			this._states = new Map<T, StateFunc>()
		}

		/**
		 * 注册状态
		 * @param state 状态
		 * @param func 回调
		 */
		public register(state: T, func: StateFunc) {
			this._states.set(state, func)
		}

		/**
		 * 注册状态enter
		 * @param state 状态
		 * @param func enter回调
		 */
		public registerEnter(state: T, enter: (data?: any) => void) {
			let has = this._states.has(state)
			if (has) {
				let func = this._states.get(state)
				func.enter = enter
			} else {
				let func = new StateFunc()
				func.enter = enter
				this._states.set(state, func)
			}
		}

		/**
		* 注册状态update
		* @param state 状态
		* @param func update回调
		*/
		public registerUpdate(state: T, update: (dt: number) => void) {
			let has = this._states.has(state)
			if (has) {
				let func = this._states.get(state)
				func.update = update
			} else {
				let func = new StateFunc()
				func.update = update
				this._states.set(state, func)
			}
		}

		/**
		* 注册状态exit
		* @param state 状态
		* @param func exit回调
		*/
		public registerExit(state: T, exit: () => void) {
			let has = this._states.has(state)
			if (has) {
				let func = this._states.get(state)
				func.exit = exit
			} else {
				let func = new StateFunc()
				func.exit = exit
				this._states.set(state, func)
			}
		}

		public update(dt): void {
			if (this.currentState) {
				let func = this._states.get(this.currentState)
				func.update && func.update(dt)
			}
		}

		/**
		* 切换状态
		* @param state 状态
		* @param data 参数
		*/
		public switch(state: T, data?: any): void {
			console.log("切换状态 : " + state);
			if (!this._states.has(state)) {
				console.error("没找到对应状态 : " + state);
				return
			}

			if (this.currentState != null) {
				let func = this._states.get(this.currentState)
				func.exit && func.exit(state)
			}
			this.currentState = state

			let func = this._states.get(state)
			func.enter && func.enter(data)
		}

		/**
		 * 清楚状态列表
		 */
		public destroy(): void {
			if (this.currentState) {
				let func = this._states.get(this.currentState)
				func.exit && func.exit();
			}
			this._states.clear()
		}

		/**
		 * 获取当前状态
		 * @returns 当前状态
		 */
		public getState(): T {
			return this.currentState
		}
	}
}

