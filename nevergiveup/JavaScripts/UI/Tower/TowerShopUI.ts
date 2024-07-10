
/** 
 * AUTHOR: 泪染倾城（找闺）
 * TIME: 2023.12.14-15.48.17
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import CardModuleC, { CardState } from "../../Modules/CardModule/CardModuleC";
import { TweenCommon } from "../../TweenCommon";
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { ITowerElement } from "../../config/Tower";
import { MGSTool } from "../../tool/MGSTool";
import TowerShopUI_Generate from "../../ui-generate/Tower/TowerShopUI_generate";
import TowerTagItem_Generate from "../../ui-generate/Tower/TowerTagItem_generate";
import TextItemUI from "../TextItemUI";
import ShopItemUI from "./ShopItemUI";

export default class TowerShopUI extends TowerShopUI_Generate {
	private _textItemUIs: TextItemUI[] = [];
	private _tagItemUIs: TowerTagItem_Generate[] = [];
	
	private _cfgID: number;
	private _state: CardState;
	private _cfg: ITowerElement;
	private _selectLevel: number = 0; // 0 1 2
	private _shopItemUIs: ShopItemUI[] = [];
	public get shopItemUIs() {
		if (!this._shopItemUIs || this._shopItemUIs.length == 0) {
			this._shopItemUIs = [];
			let cfg = GameConfig.Tower.getAllElement();
			for (let i = 0; i < cfg.length; i++) {
				let item = UIService.create(ShopItemUI);
				this._shopItemUIs.push(item);
				item.init(cfg[i].id);
			}
			let maxCount = Math.floor(this.towerItemCanvas.size.x / (this._shopItemUIs[0].rootCanvas.size.x + 10));
			this.towerItemCanvas.size = Utils.TEMP_VECTOR2.set
				(this.towerItemCanvas.size.x,
					(this._shopItemUIs[0].rootCanvas.size.y + 20) * Math.ceil(this._shopItemUIs.length / maxCount));
			for (let i = 0; i < this._shopItemUIs.length; i++) {
				let item = this._shopItemUIs[i];
				let size = item.uiObject.size;
				this.towerItemCanvas.addChild(item.uiObject);
				item.uiObject.size = size;
			}
		}
		return this._shopItemUIs;
	}

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerTop;
		this._selectLevel = 0;
		this.closeBtn.onClicked.add(() => {
			TweenCommon.popUpHide(this.rootCanvas, () => {
				UIService.hideUI(this);
			})
		});
		this.infoBtn.onClicked.add(() => {
			ModuleService.getModule(CardModuleC).btnExecute(this._cfgID, this._state);
			this.sortItems();
		});

		for (let i = 0; i < 4; i++) {
			let item = UIService.create(TextItemUI);
			item.visible = false;
			this.infoItemCanvas.addChild(item.uiObject);
			this._textItemUIs.push(item);
		}
		for (let i = 0; i < 4; i++) {
			let item = UIService.create(TowerTagItem_Generate);
			item.visible = false;
			this.tagCanvas.addChild(item.uiObject);
			this._tagItemUIs.push(item);
		}
		this.infoLv1.onClicked.add(() => {
			this.updateInfo(0);
		})
		this.infoLv2.onClicked.add(() => {
			this.updateInfo(1);
		})
		this.infoLv3.onClicked.add(() => {
			this.updateInfo(2);
		})
	}
	public updateInfo(level: number = 0) {
		this._selectLevel = level;
		const cfg = this._cfg;
		for (let i = 0; i < this._textItemUIs.length; i++) {
			if (i < cfg.infoTexts.length) {
				this._textItemUIs[i].initText(GameConfig.Language.getElement(this._cfg.infoTestsCn[i]).Value + this._cfg[this._cfg.infoTexts[i]][this._selectLevel]);
			} else {
				this._textItemUIs[i].visible = false;
			}
		}
		const selectedGuid = "376828";
		const normalGuid = "376853";
		this.infoLv1.normalImageGuid = this.infoLv2.normalImageGuid = this.infoLv3.normalImageGuid = normalGuid;
		if (level == 0)
			this.infoLv1.normalImageGuid = selectedGuid;
		else if(level == 1)
			this.infoLv2.normalImageGuid = selectedGuid;
		else if(level == 2)
			this.infoLv3.normalImageGuid = selectedGuid;
	}

	/**
	 * 展示塔的信息
	 * @param cfgID cfgid
	 */
	public showTowerInfo(cfgID: number, state: CardState) {
		let cfg = GameConfig.Tower.getElement(cfgID);
		if (!cfg) return;
		for (let i = 0; i < this.shopItemUIs.length; i++) {
			this.shopItemUIs[i].setChoose(cfgID == this.shopItemUIs[i].cfgID);
		}
		// Utils.setImageByAsset(this.infoImg, cfg);`
		this.infoImg.imageGuid = cfg.imgGuid;
		this.infoTxt.text = cfg.name;
		this._cfgID = cfgID;
		this._cfg = cfg;

		for (let i = 0; i < this._textItemUIs.length; i++) {
			if (i < cfg.infoTexts.length) {
				this._textItemUIs[i].visible = true;
				this._textItemUIs[i].initText(GameConfig.Language.getElement(cfg.infoTestsCn[i]).Value + cfg[cfg.infoTexts[i]][0]);
			} else {
				this._textItemUIs[i].visible = false;
			}
		}

		this._state = state;
		switch (state) {
			case CardState.Lock:
				this.infoBtn.text = GameConfig.Language.getElement("Text_BuyCard").Value;
				break;
			case CardState.Equip:
				this.infoBtn.text = GameConfig.Language.getElement("Text_UnEquipCard").Value;
				break;
			case CardState.Unlock:
				this.infoBtn.text = GameConfig.Language.getElement("Text_EquipCard").Value;
				break;
			default: break;
		}
		let length = cfg.attackTags?.length ? cfg.attackTags.length : 0;
		for (let i = 0; i < this._tagItemUIs.length; i++) {
			this._tagItemUIs[i].visible = (i < length);
			if (i < length) {
				this._tagItemUIs[i].txt_tag.text = GameConfig.Language.getElement("Text_AttackTag" + cfg.attackTags[i]).Value
			}
		}
	}

	/**
	 * 更新商店里的item
	 */
	public refreshItemsState() {
		for (let item of this.shopItemUIs) {
			item.refreshState();
		}
		this.sortItems();
	}

	public sortItems() {
		this.shopItemUIs.sort((a, b) => {
			return b.state - a.state;
		});

		for (let i = 0; i < this.shopItemUIs.length; i++) {
			this.rootCanvas.addChild(this.shopItemUIs[i].uiWidgetBase);
			this.towerItemCanvas.addChild(this.shopItemUIs[i].uiWidgetBase);
		}
	}

	/**
	 * 设置显示时触发
	 */
	protected onShow(...params: any[]) {
		TweenCommon.popUpShow(this.rootCanvas);
		MGSTool.page("bag");
		if (!this._cfgID) {//没有点过的话默认第一个
			this.shopItemUIs[0].chooseBtn.onClicked.broadcast();
		}
		this.sortItems();
	}

}
