import { GlobalEnum } from "../../../const/Enum";
import P_Game_Buff_Generate from "../../../ui-generate/Buff/P_Game_Buff_generate";
import { BuffInfo, BuffItem } from "./BuffItem";

export class P_Game_Buff extends P_Game_Buff_Generate {

	// buff列表
	private buffItemList: Array<BuffItem> = [];
	// buff到期的Action
	public onBuffEndAction: Action = new Action();

	onStart() {
		this.canUpdate = true;
	}

	onUpdate(dt: number) {
		if (this.buffItemList == null || this.buffItemList.length <= 0) return;
		for (let i = 0; i < this.buffItemList.length; i++) {
			this.buffItemList[i].update(dt);
		}
	}

	/**
	 * 添加一个Buff
	 */
	public addBuff(data: BuffInfo) {
		let item = this.buffItemList.find(a => a.data == null);
		if (item == null) {
			item = mw.UIService.create(BuffItem);
			this.mBuffCanvas.addChild(item.uiObject);
			this.buffItemList.push(item);
		}
		item.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		item.onBuffEnd.add(this.onBuffEnd, this);
		item.setData(data);
	}

	/**
	 * 移除一个Buff
	 */
	private removeBuff(buffType: GlobalEnum.BuffType) {
		let item = this.buffItemList.find(a => a.data != null && a.data.type == buffType);
		if (item != null) {
			item.uiObject.visibility = mw.SlateVisibility.Collapsed;
			item.onBuffEnd.clear();
			item.setData(null);
		}
	}

	/**
	 * 增加一个BUFF时间
	 */
	public addBuffTime(type: GlobalEnum.BuffType, addTime: number) {
		let item = this.buffItemList.find(a => a.data && a.data.type == type);
		if (item != null) {
			item.addBuffTime(addTime);
		}
	}

	/**
	 * 设置一个BUFF时间
	 */
	public setBuffTime(type: GlobalEnum.BuffType, time: number) {
		let item = this.buffItemList.find(a => a.data && a.data.type == type);
		if (item != null) {
			item.setBuffTime(time);
		}
	}

	/**
	 * buff结束
	 */
	private onBuffEnd(type: GlobalEnum.BuffType) {
		this.removeBuff(type);
		this.onBuffEndAction.call(type);
	}
}
