import Gtk from "gtoolkit";
import CardModuleC, { CardState } from "../../Modules/CardModule/CardModuleC";
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { ITowerElement } from "../../config/Tower";
import { GlobalData } from "../../const/GlobalData";
import ShopItemUI_Generate from "../../ui-generate/Tower/ShopItemUI_generate";
import TowerTagItem_Generate from "../../ui-generate/Tower/TowerTagItem_generate";
import TowerShopUI from "./TowerShopUI";

export default class ShopItemUI extends ShopItemUI_Generate {
	private _tagItemUIs: TowerTagItem_Generate[] = [];
	public isShop: boolean = true;
	private _state: CardState;
	public get state(): CardState {
		return this._state;
	}
	public set state(v: CardState) {
		if (this._state == v) return;
		this._state = v;
		if(this.isShop) {
			if(v === CardState.Lock) {
				Gtk.trySetVisibility(this.canvasLock, SlateVisibility.Visible);
				Gtk.trySetVisibility(this.imgSelected, SlateVisibility.Collapsed);
				Gtk.trySetVisibility(this.lockImg, SlateVisibility.Visible);
				Gtk.trySetVisibility(this.lockBgImg, SlateVisibility.Visible);
				Gtk.trySetText(this.txt_sell, this._cfg.shopPrice.toFixed(0) ?? "0");
				this.img_money.imageGuid = GlobalData.Shop.priceGoldIconGuid[0];
			} else {
				Gtk.trySetVisibility(this.canvasLock, SlateVisibility.Visible);
				Gtk.trySetVisibility(this.lockImg, SlateVisibility.Collapsed);
				Gtk.trySetVisibility(this.lockBgImg, SlateVisibility.Collapsed);
				Gtk.trySetVisibility(this.imgSelected, SlateVisibility.Collapsed);
				Gtk.trySetText(this.txt_sell, this._cfg.spend[0].toFixed(0) ?? "0");
				this.img_money.imageGuid = GlobalData.Shop.priceGoldIconGuid[1];
			}
			return;
		}
		if(v === CardState.Unlock) {
			Gtk.trySetVisibility(this.canvasLock, SlateVisibility.Visible);
			Gtk.trySetVisibility(this.lockImg, SlateVisibility.Collapsed);
			Gtk.trySetVisibility(this.lockBgImg, SlateVisibility.Collapsed);
			Gtk.trySetVisibility(this.imgSelected, SlateVisibility.Collapsed);
			Gtk.trySetText(this.txt_sell, this._cfg.spend[0].toFixed(0) ?? "0");
			this.img_money.imageGuid = GlobalData.Shop.priceGoldIconGuid[1];
		} else if(v === CardState.Equip) {
			Gtk.trySetVisibility(this.canvasLock, SlateVisibility.Visible);
			Gtk.trySetVisibility(this.lockImg, SlateVisibility.Collapsed);
			Gtk.trySetVisibility(this.lockBgImg, SlateVisibility.Collapsed);
			Gtk.trySetVisibility(this.imgSelected, SlateVisibility.Visible);
			Gtk.trySetText(this.txt_sell, this._cfg.spend[0].toFixed(0) ?? "0");
			this.img_money.imageGuid = GlobalData.Shop.priceGoldIconGuid[1];
		}
	}

	private _cfgID: number;
	public get cfgID(): number {
		return this._cfgID;
	}
	private _cfg: ITowerElement;

	public get cfg(): ITowerElement {
		return this._cfg;
	}
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.chooseBtn.touchMethod = ButtonTouchMethod.PreciseTap;
		this.chooseImg.visibility = SlateVisibility.Collapsed;
		this.imgSelected.visibility = SlateVisibility.Collapsed;
		this.chooseBtn.onClicked.add(() => {
			UIService.getUI(TowerShopUI).showTowerInfo(this._cfgID, this.state);
		});
		
		for (let i = 0; i < 4; i++) {
			let item = UIService.create(TowerTagItem_Generate);
			item.visible = false;
			this.icontagCanvas.addChild(item.uiObject);
			this._tagItemUIs.push(item);
		}
	}

	/**
	 * 设置选中状态
	 * @param isChoose 是否选中
	 */
	public setChoose(isChoose: boolean) {
		this.chooseImg.visibility = isChoose ? SlateVisibility.Visible : SlateVisibility.Collapsed;
	}

	public init(cfgID: number, isShop: boolean = false) {
		this.isShop = isShop;
		if (cfgID) {
			this._cfgID = cfgID;
			this.initObj();
		}
	}
	public getTags() { 
		const cfg = this.cfg;
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
	 * 初始化组件
	 */
	private initObj() {
		this._cfg = GameConfig.Tower.getElement(this._cfgID);
		//Utils.setImageByAsset(this.towerImg, this._cfg);
		this.towerImg.imageGuid = this._cfg.imgGuid;
		this.bgElementImg.imageGuid = GlobalData.Shop.shopItemBgGuid[(this._cfg?.elementTy || 1) - 1];
		this.elementImg.imageGuid = GlobalData.Shop.shopItemCornerIconGuid[(this._cfg?.elementTy || 1) - 1];
		this.nameTxt.text = this._cfg.name;
		this.txt_sell.text = this._cfg.shopPrice.toFixed(0);
		
		const sInfo = GlobalData.Shop.getStrategyInfo(this._cfg.id);
		if(!sInfo?.strategyKey && this._cfg?.adap === 4) {
 			const { value } = GlobalData.Shop.getTowerBuffTextItem(this._cfg, 0, 0) ?? {};
			this.txt_atk.text = value;
		} else this.txt_atk.text = Utils.formatNumber(this._cfg.attackDamage[0]);

		this.fightImg.imageGuid = GlobalData.Shop.shopItemFightIconGuid[0];
		if(this._cfg.adap === 3) this.fightImg.imageGuid = GlobalData.Shop.shopItemFightIconGuid[1];
		if(this._cfg.adap === 4) this.fightImg.imageGuid = GlobalData.Shop.shopItemFightIconGuid[2];
		this.refreshState();
		const tags = this.getTags();
		const len = tags?.length ?? 0;
		for (let i = 0; i < this._tagItemUIs.length; i++) {
			this._tagItemUIs[i].visible = (i < len);
			if (i < len) {
				// this._tagItemUIs[i].txt_tag.text = GameConfig.Language.getElement(tags[i])?.Value
				this._tagItemUIs[i].img_tag.imageGuid = tags[i];
			}
		}
	}

	/**
	 * 刷新UI的state
	 */
	public refreshState() { 
		this.state = ModuleService.getModule(CardModuleC).getCardState(this._cfgID);
		if (this.chooseImg?.visible) {//代表现在这个item现在被选中
			this.chooseBtn?.onClicked?.broadcast();
		}
	}

}
