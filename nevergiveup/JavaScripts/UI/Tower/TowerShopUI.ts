
/** 
 * AUTHOR: 泪染倾城（找闺）
 * TIME: 2023.12.14-15.48.17
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import CardModuleC, { CardState } from "../../Modules/CardModule/CardModuleC";
import { TweenCommon } from "../../TweenCommon";
import { UIPool } from "../../UIPool";
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { ITowerElement } from "../../config/Tower";
import { GlobalData } from "../../const/GlobalData";
import { TowerDamageType, TowerElementType, TowerStrategyType, TowerTargetType } from "../../const/enum";
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
	public shopItemUIs: ShopItemUI[] = [];
	public opts: {
		ele?: TowerElementType; // 不存在则为All
		target?: TowerTargetType; // 不存在则为All
		damage?: TowerDamageType; // 不存在则为All
		strategy?: TowerStrategyType; // 不存在则为All
	} = {};
	public setShopItemUIs(options?: {
		ele?: TowerElementType; // 不存在则为All
		target?: TowerTargetType; // 不存在则为All
		damage?: TowerDamageType; // 不存在则为All
		strategy?: TowerStrategyType; // 不存在则为All
	}) {
		this.opts = options ?? {};
		this.shopItemUIs = [];
		let cfg = GameConfig.Tower.getAllElement();
		for (let i = 0; i < cfg.length; i++) {
			const item = UIService.create(ShopItemUI);
			const towerCfg = cfg[i];
			if(options?.ele && options.ele != towerCfg.elementTy) continue;
			if(options?.target) {
				if(options.target === TowerTargetType.Single && towerCfg.attackCount[0] > 1) continue; // 为1则为单体
				if(options.target === TowerTargetType.Multiple && towerCfg.attackCount[0] <= 1) continue; // 1以上则为aoe
			}
			if(options?.damage) {
				if(options.damage === TowerDamageType.Physical && towerCfg.adap !== 1) continue;
				if(options.damage === TowerDamageType.Magical && towerCfg.adap !== 2) continue;
			}
			if(options?.strategy && options.strategy !== towerCfg.towerStrategy) {
				continue;
			}
			this.shopItemUIs.push(item);
			item.init(towerCfg.id);
		}
		this.towerItemCanvas.removeAllChildren();
		for (let i = 0; i < this.shopItemUIs.length; i++) {
			const item = this.shopItemUIs[i];
			this.towerItemCanvas.addChild(item.uiObject);
		}
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
		this.setShopItemUIs();
		this.initDropdowns();		
	}

	public initDropdowns() {
		this.mDropdown_1.clearOptions();
		GlobalData.Shop.shopElementsOpts.map((item) => {
			this.mDropdown_1.addOption(GameConfig.Language[item]?.Value);
		})
		this.mDropdown_1.onSelectionChangedEvent.add((selectedItem: string) => {
			const ele = GlobalData.Shop.getSelectedTowerElementType(selectedItem) || undefined;
			if(selectedItem === GameConfig.Language.Sift_1.Value) this.setShopItemUIs({ ...this.opts, ele: undefined })
			else this.setShopItemUIs( { ...this.opts, ele } );
		})
		this.mDropdown_1.selectedOptionIndex = 0;

		this.mDropdown_2.clearOptions();		
		GlobalData.Shop.shopTargetOpts.map((item) => {
			this.mDropdown_2.addOption(GameConfig.Language[item]?.Value);
		})
		this.mDropdown_2.onSelectionChangedEvent.add((selectedItem: string) => {
			const target = GlobalData.Shop.getSelectedTowerTargetType(selectedItem) || undefined;
			if(selectedItem === GameConfig.Language.Sift_1.Value) this.setShopItemUIs({ ...this.opts, target: undefined })
			else this.setShopItemUIs( { ...this.opts, target } );
		})
		this.mDropdown_2.selectedOptionIndex = 0;

		
		this.mDropdown_3.clearOptions();		
		GlobalData.Shop.shopDamageOpts.map((item) => {
			this.mDropdown_3.addOption(GameConfig.Language[item]?.Value);
		})
		this.mDropdown_3.onSelectionChangedEvent.add((selectedItem: string) => {
			const damage = GlobalData.Shop.getSelectedTowerDamageType(selectedItem) || undefined;
			if(selectedItem === GameConfig.Language.Sift_1.Value) this.setShopItemUIs({ ...this.opts, damage: undefined })
			else this.setShopItemUIs( { ...this.opts, damage } );
		})
		this.mDropdown_3.selectedOptionIndex = 0;

		
		this.mDropdown_4.clearOptions();		
		GlobalData.Shop.shopStrategyOpts.map((item) => {
			this.mDropdown_4.addOption(GameConfig.Language[item]?.Value);
		})
		this.mDropdown_4.onSelectionChangedEvent.add((selectedItem: string) => {
			const strategy = GlobalData.Shop.getSelectedTowerStrategyType(selectedItem) || undefined;
			if(selectedItem === GameConfig.Language.Sift_1.Value) this.setShopItemUIs({ ...this.opts, strategy: undefined })
			else this.setShopItemUIs( { ...this.opts, strategy } );
		})
		this.mDropdown_4.selectedOptionIndex = 0;

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
