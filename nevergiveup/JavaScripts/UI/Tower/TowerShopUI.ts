
/** 
 * AUTHOR: 泪染倾城（找闺）
 * TIME: 2023.12.14-15.48.17
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import Gtk from "gtoolkit";
import CardModuleC, { CardState } from "../../Modules/CardModule/CardModuleC";
import { TweenCommon } from "../../TweenCommon";
import { GameConfig } from "../../config/GameConfig";
import { ITowerElement } from "../../config/Tower";
import { GlobalData } from "../../const/GlobalData";
import { TowerDamageType, TowerElementType, TowerStrategyType, TowerTargetType } from "../../const/enum";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import { MGSTool } from "../../tool/MGSTool";
import TowerShopUI_Generate from "../../ui-generate/Tower/TowerShopUI_generate";
import TowerTagItem_Generate from "../../ui-generate/Tower/TowerTagItem_generate";
import TextItemUI from "../TextItemUI";
import ShopItemUI from "./ShopItemUI";
import Utils from "../../Utils";

export default class TowerShopUI extends TowerShopUI_Generate {
	private _textItemUIs: TextItemUI[] = [];
	private _tagItemUIs: TowerTagItem_Generate[] = [];
	
	private _cfgID: number;
	private _state: CardState;
	private _cfg: ITowerElement;
	private _selectLevel: number = 0; // 0 1 2
	public isShop: boolean = true;
	public showTowerIds: number[] = [];
	public shopItemUIs: ShopItemUI[] = [];
	public showShopItemUIs: ShopItemUI[] = [];
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
		this.showTowerIds = [];
		const cfg = GameConfig.Tower.getAllElement();
		for (let i = 0; i < cfg.length; i++) {
			const towerCfg = cfg[i];
			if(options?.ele && options.ele != towerCfg.elementTy) continue;
			if(options?.target) {
				if(options.target === TowerTargetType.Single && towerCfg.attackCount[0] > 1) continue; // 为1则为单体
				if(options.target === TowerTargetType.Multiple && towerCfg.attackCount[0] <= 1) continue; // 1以上则为aoe
			}
			if(options?.damage && options.damage !== towerCfg.adap) continue;
			if(options?.strategy) {
				const sInfo = GlobalData.Shop.getStrategyInfo(towerCfg.id);
				if(options.strategy !== (sInfo?.strategyKey as TowerStrategyType)) continue;
			}
			const state = ModuleService.getModule(CardModuleC).getCardState(towerCfg.id);
			if(this.isShop && state !== CardState.Lock) continue;
			if(!this.isShop && state === CardState.Lock) continue;
			this.showTowerIds.push(towerCfg.id);
		}
		this.sortItems();
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
		}); 
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
		const selectedGuid = "376828";
		const normalGuid = "376853";
		this.infoLv1.normalImageGuid = this.infoLv2.normalImageGuid = this.infoLv3.normalImageGuid = normalGuid;
		if (level == 0)
			this.infoLv1.normalImageGuid = selectedGuid;
		else if(level == 1)
			this.infoLv2.normalImageGuid = selectedGuid;
		else if(level == 2)
			this.infoLv3.normalImageGuid = selectedGuid;
		this.updateTexts();
	}
	public updateTexts() {		
		const textItemLen = this._cfg?.infoTestsCn?.length ?? 0;
		if(this._textItemUIs?.length) this._textItemUIs.forEach(v => v?.destroy());
		this._textItemUIs = [];
		this.infoItemCanvas.removeAllChildren();
		if(!textItemLen) return;
		
		this.createTextUI(GameConfig.Language.getElement("Tower_attackTags_11").Value,  GameConfig.Language.getElement(GlobalData.Shop.shopElementsOpts[this._cfg?.elementTy])?.Value);
		this.createTextUI(GameConfig.Language.getElement("Tower_attackTags_12").Value, Utils.formatNumber(this._cfg?.spend?.[this._selectLevel]), { isCost: true });
		for (let i = 0; i < textItemLen; i++) {
			const title = GameConfig.Language.getElement(this._cfg.infoTestsCn[i]).Value
			const value = this._cfg[this._cfg.infoTexts[i]][this._selectLevel];
			this.createTextUI(title, value);
		}
	}
	public createTextUI(title: string, value: string, options?:{ isInfo?: boolean, isCost?:boolean }) {
		const ui = UIService.create(TextItemUI);
		ui.initText(title, value, options);
		this.infoItemCanvas.addChild(ui.uiObject);
		this._textItemUIs.push(ui);
	}
	public getTags() {
		const cfg = this._cfg;
		const tags = [];
		if(cfg?.attackCount?.length)
			tags.push(GlobalData.Shop.shopTargetOpts[cfg.attackCount[0] > 1 ? 2 : 1]);
		if(cfg?.adap)
			tags.push(GlobalData.Shop.shopDamageOpts[cfg.adap]);
		return tags
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
		this._state = state;
		this.updateTexts();
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
		const sInfo = GlobalData.Shop.getStrategyInfo(cfg.id);
		if(sInfo?.strategyKey) {
			Gtk.trySetVisibility(this.canvas_Desc, SlateVisibility.HitTestInvisible);
			this.textTitle.text = sInfo.strategyTitle;
			this.textDesc.text = sInfo.strategyDesc;
		} else Gtk.trySetVisibility(this.canvas_Desc, SlateVisibility.Collapsed);

		const tags = this.getTags();
		let len = tags?.length ?? 0;
		for (let i = 0; i < this._tagItemUIs.length; i++) {
			this._tagItemUIs[i].visible = (i < len);
			if (i < len) {
				this._tagItemUIs[i].txt_tag.text = GameConfig.Language.getElement(tags[i])?.Value
			}
		}
	}

	/**
	 * 更新商店里的item
	 */
	public refreshItemsState() {
		for (let item of this.showShopItemUIs) {
			item.refreshState();
		}
		this.sortItems();
		if(this.isShop) { // 商店 购买成功刷新列表
			this.setShopItemUIs({ ...this.opts });
			this.showShopItemUIs[0]?.chooseBtn?.onClicked?.broadcast();
		} else { // 兵营 装备/卸载
			const target = this.showShopItemUIs.find((item) => item.cfgID === this._cfgID) ?? this.shopItemUIs[0];
			target?.chooseBtn?.onClicked?.broadcast();
		}
	}

	public sortItems() {
		this.showTowerIds.sort((a, b) => {
			const aCfg = GameConfig.Tower.getElement(a)
			const bCfg = GameConfig.Tower.getElement(b);
			const aState = ModuleService.getModule(CardModuleC).getCardState(a);
			const bState = ModuleService.getModule(CardModuleC).getCardState(b);
			if(aState == bState) {
				const aPrice = aCfg?.shopPrice ?? 0;
				const bPrice = bCfg?.shopPrice ?? 0;
				if(aPrice == bPrice)
					return (aCfg?.elementTy ?? 0) - (bCfg?.elementTy ?? 0);
				return aPrice - bPrice;
			}
			return bState - aState;
		});
		this.showShopItemUIs = [];
		this.towerItemCanvas.removeAllChildren();
		for (let i = 0; i < this.showTowerIds.length; i++) {
			const id = this.showTowerIds[i];
			const item = UIService.create(ShopItemUI);
			item.init(id);
			this.towerItemCanvas.addChild(item.uiObject);
			this.showShopItemUIs.push(item);
		}
	}

	// 兵营/商店
	public setIsShop(isShop?: boolean) {
		this.isShop = isShop ?? false;
		if (this.isShop) { // 商店
			this.txt_title.text = GameConfig.Language.getElement("UI_5").Value;
		} else { // 兵营
			this.txt_title.text = GameConfig.Language.getElement("Tower_setting_3").Value;
		}
	}
	/**
	 * 设置显示时触发
	 */
	protected onShow(options:{isShop?: boolean, cfgId?: number}, ...params: any[]) {
		TweenCommon.popUpShow(this.rootCanvas);
		const { isShop, cfgId } = options ?? {}
		this.setIsShop(isShop);
		this.setShopItemUIs({...this.opts});
		const target = cfgId ? this.showShopItemUIs.find(item => item.cfgID == cfgId) : this.showShopItemUIs[0];
		target?.chooseBtn?.onClicked?.broadcast();
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            TweenCommon.popUpHide(this.rootCanvas, () => {
                UIService.hideUI(this);
            })
        });
	}

    onHide() {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }
}
