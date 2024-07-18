/*
 * @Author: shifu.huang
 * @Date: 2024-01-03 14:03:02
 * @LastEditors: haoran.zhang haoran.zhang@appshahe.com
 * @LastEditTime: 2024-07-02 09:41:08
 * @FilePath: \nevergiveup\JavaScripts\UI\Tower\ShopItemUI.ts
 * @Description: 修改描述
 */
/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-29 15:43:49
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-03 16:16:01
 * @FilePath     : \nevergiveup\JavaScripts\UI\Tower\ShopItemUI.ts
 * @Description  : 修改描述
 */

/** 
 * AUTHOR: 泪染倾城（找闺）
 * TIME: 2023.12.14-16.49.03
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

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

	private _state: CardState;
	public get state(): CardState {
		return this._state;
	}
	public set state(v: CardState) {
		if (this._state == v) return;
		this._state = v;
		this.equipTxt.visibility = v == CardState.Equip ? SlateVisibility.Visible : SlateVisibility.Collapsed;
		this.canvasLock.visibility = v == CardState.Lock ? SlateVisibility.Visible : SlateVisibility.Collapsed;
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
		this.equipTxt.visibility = SlateVisibility.Collapsed;
		this.chooseBtn.onClicked.add(() => {
			UIService.getUI(TowerShopUI).showTowerInfo(this._cfgID, this.state);
		});
		
		for (let i = 0; i < 4; i++) {
			let item = UIService.create(TowerTagItem_Generate);
			item.visible = false;
			this.tagCanvas.addChild(item.uiObject);
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

	public init(cfgID: number) {
		if (cfgID) {
			this._cfgID = cfgID;
			this.initObj();
		}
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
	 * 初始化组件
	 */
	private initObj() {
		this._cfg = GameConfig.Tower.getElement(this._cfgID);
		//Utils.setImageByAsset(this.towerImg, this._cfg);
		this.towerImg.imageGuid = this._cfg.imgGuid;
		this.nameTxt.text = this._cfg.name;
		this.txt_sell.text = this._cfg.shopPrice.toFixed(0);
		this.txt_sell_1.text = Utils.formatNumber(this._cfg.attackDamage[0]);
		this.refreshState();
		const tags = this.getTags();
		const len = tags?.length ?? 0;
		for (let i = 0; i < this._tagItemUIs.length; i++) {
			this._tagItemUIs[i].visible = (i < len);
			if (i < len) {
				this._tagItemUIs[i].txt_tag.text = GameConfig.Language.getElement(tags[i])?.Value
			}
		}
	}

	/**
	 * 刷新UI的state
	 */
	public refreshState() { 
		this.state = ModuleService.getModule(CardModuleC).getCardState(this._cfgID);
		if (this.chooseImg?.visible) {//代表现在这个item现在被选中
			this.chooseBtn.onClicked.broadcast();
		}
	}

}
