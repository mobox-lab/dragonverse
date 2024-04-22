import { GameConfig } from "../../../config/GameConfig";
import { GlobalEnum } from "../../../const/Enum";
import KeyOperationManager from "../../../controller/key-operation-manager/KeyOperationManager";
import P_Game_Buff_Generate from "../../../ui-generate/Buff/P_Game_Buff_generate";
import BuffEnergyTips_Generate from "../../../ui-generate/common/BuffEnergyTips_generate";
import MessageBox from "../../../util/MessageBox";
import { BuffInfo, BuffItem } from "./BuffItem";

export class P_Game_Buff extends P_Game_Buff_Generate {

	// buff列表
	private buffItemList: Array<BuffItem> = [];
	// buff到期的Action
	public onBuffEndAction: Action = new Action();

	onStart() {

	}

	onUpdate(dt: number) {

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
		item.btn.onClicked.clear();
		item.btn.onClicked.add(() => {
			// MessageBox.showOneBtnMessage(GameConfig.Language.Buff_Rule_2.Value, () => { }, GameConfig.Language.Buff_Rule_1.Value);
			let ui = UIService.show(BuffEnergyTips_Generate);
			ui.title.text = GameConfig.Language.Buff_Rule_1.Value;
			ui.mText_message.text = GameConfig.Language.Buff_Rule_2.Value;
			ui.mBtn_OK.onClicked.clear();
			ui.mBtn_OK.onClicked.add(() => {
				UIService.hideUI(ui);
				KeyOperationManager.getInstance().unregisterKey(null, Keys.Escape);
			});
			KeyOperationManager.getInstance().onKeyUp(Keys.Escape, null, () => {
				UIService.hideUI(ui);
				KeyOperationManager.getInstance().unregisterKey(null, Keys.Escape);
			});
		});
	}

	/**
	 * 移除一个Buff
	 */
	private removeBuff(buffId: number) {
		let item = this.buffItemList.find(a => a.data != null && a.data.id == buffId);
		if (item != null) {
			item.uiObject.visibility = mw.SlateVisibility.Collapsed;
			item.onBuffEnd.clear();
			item.setData(null);
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
