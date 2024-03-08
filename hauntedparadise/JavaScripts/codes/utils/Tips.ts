import Tips_Generate from "../../ui-generate/ShareUI/Tips_generate";

/**
 * 系统提示，一个顶一个向上跳动，然后消失，最多三条。继承自Tips_Generate
 */
export default class Tips extends Tips_Generate {
	/**Y轴开始位置 */
	private static readonly Y_START = 400;
	/**Y轴结束位置 */
	private static readonly Y_OVER = 150;
	/**移动速度 */
	private static readonly MOVE_SPEED = 500;
	/**停留时间 */
	private static readonly KEEP_TIME = 0.5;
	/**Tips单例 */
	private static _instance: Tips;
	/**当前空闲的条目*/
	private freeCellArr: Array<mw.Canvas> = [];
	/**当前激活的条目*/
	private activeCellArr: Array<mw.Canvas> = [];
	/**已经完成的条目*/
	private overCellArr: Array<mw.Canvas> = [];

	/**
	 * 获得提示单例
	 * @returns 返回提示单例
	 *  */
	private static get instance(): Tips {
		if (Tips._instance == null) {
			Tips._instance = mw.UIService.create(Tips);
		}
		return Tips._instance;
	}

	/**
	 * 初始化当前空闲的条目，隐藏UI
	 */
	onStart() {
		this.freeCellArr = [this.mCell1, this.mCell2, this.mCell3];
		this.canUpdate = true;
		this.onLayout();
	}

	/**
	 * 隐藏的对象不参与UI布局，所以要布局完成后再隐藏
	*/
	onLayout() {
		for (let i = 0; i < this.freeCellArr.length; i++) {
			this.freeCellArr[i].visibility = (mw.SlateVisibility.Collapsed);
		}
	}

	/**
	 * 显示系统提示 (Client Only)
	 * @param content 提示内容
	 */
	public static show(content: string) {
		if (mw.SystemUtil.isServer()) return;
		mw.UIService.showUI(Tips.instance, mw.UILayerSystem);
		Tips.instance.showMsg(content);
	}

	/**
	 * 显示Msg提示，如果没有空闲的条目，就把最后一个条目移动到最上面，然后显示提示内容
	 * @param content 提示内容
	 */
	private showMsg(content: string) {
		let cell: mw.Canvas = null;
		if (this.freeCellArr.length > 0) {
			cell = this.freeCellArr.shift();
		} else {
			cell = this.activeCellArr.shift();
		}
		/**Fix 动态计算Canvas居中位置*/
		cell.position = new mw.Vector2(mw.WindowUtil.getViewportSize().x / 2 - cell.size.x / 2, cell.position.y);
		let text: mw.TextBlock = cell.findChildByPath('Content_txt') as mw.TextBlock;
		text.text = content;
		cell["state"] = 0;
		cell["stopTime"] = 0;
		this.activeCellArr.push(cell);
	}

	/**
	 * 计算条目canvas的位置，移动Tips，如果条目移动到最上面，就隐藏
	 * @param dt 两帧之间的时间差
	 */
	onUpdate(dt: number) {

		if (this.activeCellArr.length == 0) return;
		let pos: mw.Vector2 = null;
		for (let i = 0; i < this.activeCellArr.length; i++) {
			let cell = this.activeCellArr[i];
			switch (cell["state"]) {
				case 0:
					cell.visibility = mw.SlateVisibility.Visible;
					pos = cell.position;
					pos.y = Tips.Y_START;
					cell.position = pos;
					cell["state"]++;
					break;
				case 1:
					pos = cell.position;
					pos.y -= Tips.MOVE_SPEED * dt;
					cell.position = pos
					if (i == 0) {
						if (pos.y <= Tips.Y_OVER) {
							pos.y = Tips.Y_OVER;
							cell["state"]++;
						}
					} else {
						let lastCellPos = this.activeCellArr[i - 1].position;
						if (pos.y <= lastCellPos.y + 60) {
							pos.y = lastCellPos.y + 60;
							cell["stopTime"] += dt;
							if (cell["stopTime"] >= Tips.KEEP_TIME) {
								cell["state"] += 2;
							}
						}
					}
					cell.position = (pos);
					break;
				case 2:
					cell["stopTime"] += dt;
					if (cell["stopTime"] >= Tips.KEEP_TIME) {
						cell["state"]++;
					}
					break;
				case 3:
					cell.visibility = mw.SlateVisibility.Collapsed;
					this.overCellArr.push(cell);
					break;
			}
		}
		while (this.overCellArr.length > 0) {
			let cell = this.overCellArr.shift();
			let index = this.activeCellArr.indexOf(cell);
			this.activeCellArr.splice(index, 1);
			this.freeCellArr.push(cell);
		}
	}
}