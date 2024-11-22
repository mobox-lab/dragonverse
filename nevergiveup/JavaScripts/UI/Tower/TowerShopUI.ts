
/** 
 * AUTHOR: 泪染倾城（找闺）
 * TIME: 2023.12.14-15.48.17
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import Gtk from "gtoolkit";
import CardModuleC, { CardState } from "../../Modules/CardModule/CardModuleC";
import { TweenCommon } from "../../TweenCommon";
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { ITowerElement } from "../../config/Tower";
import { GlobalData } from "../../const/GlobalData";
import { TowerDamageType, TowerElementType, TowerStrategyType, TowerTargetType } from "../../const/enum";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import TowerShopUI_Generate from "../../ui-generate/Tower/TowerShopUI_generate";
import TowerTagItem_Generate from "../../ui-generate/Tower/TowerTagItem_generate";
import TextItemUI from "../TextItemUI";
import ShopItemUI from "./ShopItemUI";

export default class TowerShopUI extends TowerShopUI_Generate {
	private _textItemUIs: TextItemUI[] = [];	
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
				if([3, 4].includes(towerCfg.adap)) continue; // 产出塔和增益塔跳过
				if(options.target === TowerTargetType.Single && towerCfg.attackCount[0] > 1) continue; // 为1则为单体
				if(options.target === TowerTargetType.Multiple && towerCfg.attackCount[0] <= 1) continue; // 1以上则为aoe
			}
			if(options?.damage && options.damage !== towerCfg.adap) continue;
			if(options?.strategy) {
				const sInfo = GlobalData.Shop.getStrategyInfo(towerCfg.id);
				if(options.strategy !== (sInfo?.strategyKey as TowerStrategyType)) continue;
			}
			const state = ModuleService.getModule(CardModuleC).getCardState(towerCfg.id);
			// if(this.isShop && state !== CardState.Lock) continue;
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
		this.layer = UILayerMiddle;
		this._selectLevel = 0;
        this.closeBtn.onClicked.add(() => this.hideTween());
		this.infoBtn.onClicked.add(() => {
			ModuleService.getModule(CardModuleC).btnExecute(this._cfgID, this._state, this.isShop);
		});
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

	public resetShopOpts() {
		this.opts = {};
		this.mDropdown_1.selectedOptionIndex = 0;
		this.mDropdown_2.selectedOptionIndex = 0;
		this.mDropdown_3.selectedOptionIndex = 0;
		this.mDropdown_4.selectedOptionIndex = 0;
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
		this.infoLv1.renderOpacity = this.infoLv2.renderOpacity = this.infoLv3.renderOpacity = 0;
		if (level == 0)
			this.infoLv1.renderOpacity = 1;
		else if(level == 1)
			this.infoLv2.renderOpacity = 1;
		else if(level == 2)
			this.infoLv3.renderOpacity = 1;
		
		this.updateStrategyUI();
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
			const { title, value } = GlobalData.Shop.getTowerBuffTextItem(this._cfg, this._selectLevel, i) ?? {};
			this.createTextUI(title, value);
		}
	}

	public updateStrategyUI() {
		const sInfo = GlobalData.Shop.getStrategyInfo(this._cfg.id);
		if(!sInfo?.strategyKey && this._cfg?.adap === 4) {
			Gtk.trySetVisibility(this.can_strategy, mw.SlateVisibility.Visible);
			const { value } = GlobalData.Shop.getTowerBuffTextItem(this._cfg, this._selectLevel, 0) ?? {};
			this.textTitle.text = GameConfig.Language.DamageType_4.Value; 
			this.textDesc.text = Utils.Format(GameConfig.Language.StrategyDesc_11.Value, value);
			return;
		}
		if(sInfo?.strategyKey) {
			Gtk.trySetVisibility(this.can_strategy, mw.SlateVisibility.Visible);
			const descArr = sInfo.strategyDesc;
			
			this.textTitle.text = sInfo.strategyTitle;
			this.textDesc.text = descArr?.length === 3 ? descArr[this._selectLevel] : descArr[0];
		} else {
			Gtk.trySetVisibility(this.can_strategy, mw.SlateVisibility.Collapsed);
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
		if(cfg?.attackCount?.length && ![3, 4].includes(cfg.adap))
			tags.push(cfg.attackCount[0] > 1 ? GlobalData.Shop.shopTagIconGuid[1] : GlobalData.Shop.shopTagIconGuid[0]); // shopTagIconGuid[0] 单体 shopTagIconGuid[1] 群体
		// adap 1为物理伤害，2为法术伤害，3为产出，4为增益
		if(cfg?.adap) {
			tags.push(GlobalData.Shop.shopTagIconGuid[cfg.adap + 1]);// 1-物理 2-法术 3-产出 4-增益
		}
		return tags;
	}

	/**
	 * 展示塔的信息
	 * @param cfgID cfgid
	 */
	public showTowerInfo(cfgID: number, state: CardState) {
		let cfg = GameConfig.Tower.getElement(cfgID);
		if (!cfg) return;
		for (let i = 0; i < this.showShopItemUIs.length; i++) {
			this.showShopItemUIs[i].setChoose(cfgID == this.showShopItemUIs[i].cfgID);
		}
		// Utils.setImageByAsset(this.infoImg, cfg);`
		this.infoImg.imageGuid = cfg.imgGuid;
		this.infoTxt.text = cfg.name;
		this._cfgID = cfgID;
		this._cfg = cfg;
		this._state = state;
		this.elementBgImg.imageGuid = GlobalData.Shop.shopItemBgGuid[(this._cfg?.elementTy || 1) - 1];
		this.elementImg.imageGuid = GlobalData.Shop.shopItemCornerIconGuid[(this._cfg?.elementTy || 1) - 1];
		this.updateTexts();
		this.updateStrategyUI();
		switch (state) {
			case CardState.Lock:
				this.infoBtn.text = GameConfig.Language.getElement("Text_BuyCard").Value;
				break;
			case CardState.Equip:
				this.infoBtn.text = this.isShop ? GameConfig.Language.Text_BtnTowerReturn.Value : GameConfig.Language.getElement("Text_UnEquipCard").Value;
				break;
			case CardState.Unlock:
				this.infoBtn.text = this.isShop ? GameConfig.Language.Text_BtnTowerReturn.Value : GameConfig.Language.getElement("Text_EquipCard").Value;
				break;
			default: break;
		}
		const tags = this.getTags();
		let len = tags?.length ?? 0;
		this.tagCanvas.removeAllChildren();
		for (let i = 0; i < len; i++) {
			let item = UIService.create(TowerTagItem_Generate);
			item.img_tag.imageGuid = tags[i];
			this.tagCanvas.addChild(item.uiObject);
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
			if(this.isShop && aState !== bState) {
				if(aState === CardState.Lock || bState === CardState.Lock) {
					if(aState !== CardState.Lock) return 1;
					if(bState !== CardState.Lock) return -1;
				}
			} 		
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
			item.init(id, this.isShop);
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
		console.log("#debug isShop:"+isShop+" cfgId:"+cfgId)
		this.setIsShop(isShop);
		this.resetShopOpts();
		this.setShopItemUIs();
		const target = cfgId ? this.showShopItemUIs.find(item => item.cfgID == cfgId) : this.showShopItemUIs[0];
		target?.chooseBtn?.onClicked?.broadcast();
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => this.hideTween());
	}

    /**
     * 关闭动画
     * @private
     */
    public hideTween() {
        TweenCommon.popUpHide(this.rootCanvas, () => UIService.hideUI(this));
    }

    onHide() {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }
}
