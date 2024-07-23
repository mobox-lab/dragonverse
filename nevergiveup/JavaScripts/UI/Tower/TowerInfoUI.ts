/*
 * @Author: shifu.huang
 * @Date: 2023-12-12 20:08:28
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-22 16:42:04
 * @FilePath: \nevergiveup\JavaScripts\UI\Tower\TowerInfoUI.ts
 * @Description: 修改描述
 */

/** 
 * AUTHOR: 泪染倾城（找闺）
 * TIME: 2023.12.12-19.32.40
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { GameManager } from "../../GameManager";
import TowerBase from "../../Modules/TowerModule/Tower/TowerBase";
import { TowerEvent } from "../../Modules/TowerModule/TowerEnum";
import { TowerModuleC } from "../../Modules/TowerModule/TowerModuleC";
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { ITowerElement } from "../../config/Tower";
import { MGSTool } from "../../tool/MGSTool";
import TowerInfoUI_Generate from "../../ui-generate/Tower/TowerInfoUI_generate";
import TowerTagItem_Generate from "../../ui-generate/Tower/TowerTagItem_generate";
import TextItemUI from "../TextItemUI";

export default class TowerInfoUI extends TowerInfoUI_Generate {

	private _cfg: ITowerElement;
	private _tower: TowerBase;
	private _upgradeCount: number = 0;
	private _textItemUIs: TextItemUI[] = [];
	private _tagItemUIs: TowerTagItem_Generate[] = [];
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.closeBtn.onClicked.add(() => { UIService.hideUI(this) });
		this.sellBtn.onClicked.add(() => {
			MGSTool.clickBtn("8");
			ModuleService.getModule(TowerModuleC).destroyTowerByUI(this._tower.info);
			UIService.hideUI(this)
		});
		this.levelBtn.onClicked.add(() => {
			MGSTool.clickBtn("7");
			if (ModuleService.getModule(TowerModuleC).upgradeTowerByUI(this._tower.info, ++this._upgradeCount)) {
				this.showLevel();
			} else {
				--this._upgradeCount;
			}
		});
		Event.addLocalListener(TowerEvent.UpdateInfo, (v: TowerBase) => {
			if (this.visible && v == this._tower) {
				v.level >= this._tower.level + this._upgradeCount && this.onShow(v);
			}
		});
		for (let i = 0; i < 4; i++) {
			let item = UIService.create(TowerTagItem_Generate);
			item.visible = false;
			this.tagCanvas.addChild(item.uiObject);
			this._tagItemUIs.push(item);
		}
	}

	protected onHide() {
		this._upgradeCount = 0;
		ModuleService.getModule(TowerModuleC).setAttackEffect(null);
	}


	/**
	 * 设置显示时触发
	 */
	protected onShow(tower: TowerBase) {
		const cfg = GameConfig.Tower.getElement(tower?.info.configID);
		if (!tower || !cfg) {
			UIService.hideUI(this);
			return;
		}
		this._upgradeCount = 0;
		this._cfg = cfg;
		this._tower = tower;
		this.txt_title.text = this._cfg.name;
		let length = tower.attackTags?.length ? tower.attackTags.length : 0;
		for (let i = 0; i < this._tagItemUIs.length; i++) {
			this._tagItemUIs[i].visible = (i < length);
			if (i < length) {
				this._tagItemUIs[i].txt_tag.text = GameConfig.Language.getElement("Text_AttackTag" + tower.attackTags[i]).Value
			}
		}
		// this._tower = Utils.shallowCopy(towerInfo);
		Utils.setImageByAsset(this.towerImg, this._cfg);
		this.ownerTxt.text = StringUtil.format(GameConfig.Language.getElement("Text_CreatePlayerName").Value, Utils.truncateString(this._tower.info.playerName, 13));
		this.showLevel();
		if (Utils.isLocalPlayer(tower.info.playerID)) {
			this.canvas_levelup.visibility = SlateVisibility.Visible;
			let stage = GameManager.getStageClient();
			if (stage && stage.stageWorldIndex == 99) {
				this.canvas_sell.visibility = SlateVisibility.Collapsed;
			}
			else {
				// this.sellBtn.text = "拆除:+" + this._cfg.sellBack[tower.level + this._upgradeCount];
				this.canvas_sell.visibility = SlateVisibility.Visible;
			}
		} else {
			this.canvas_levelup.visibility = SlateVisibility.Collapsed;
			this.canvas_sell.visibility = SlateVisibility.Collapsed;
		}
		ModuleService.getModule(TowerModuleC).setAttackEffect(tower);
		this.valueTxt.text = tower.outputStr;
	}

	private initText() {
		this.levelTxt.text = "Lv. " + (this._tower.level + 1 + this._upgradeCount);
		const textItemLen = this._cfg?.infoTestsCn?.length ?? 0;
		if(this._textItemUIs?.length) this._textItemUIs.forEach(v => v?.destroy());
		this._textItemUIs = [];
		this.infoCanvas.removeAllChildren();
		if(!textItemLen) return;
		for (let i = 0; i < textItemLen; i++) {
			const ui = UIService.create(TextItemUI);
			const text = this._cfg?.infoTexts[i];
			const title = GameConfig.Language.getElement(this._cfg.infoTestsCn[i]).Value
			let value = ""+Utils.numTofix(this._tower.property[text], 2);
			this._cfg[text][this._tower.level + 1] != null && (value += " → " +
				Utils.numTofix((this._tower.property[text] + this._cfg[text][this._tower.level + 1] - this._cfg[text][this._tower.level]), 2));
			ui.initText(title, value, true);
			this.infoCanvas.addChild(ui.uiObject);
			this._textItemUIs.push(ui);
		}
	}

	/**
	 * 等级相关UI
	 */
	private showLevel() {
		if (this._cfg.spend[this._tower.level + 1 + this._upgradeCount] != null) {
			this.txt_cost.text = this._cfg.spend[this._tower.level + 1 + this._upgradeCount].toFixed();
			this.levelBtn.visibility = SlateVisibility.Visible;
			this.levelBtn.text = GameConfig.Language.getElement("Text_Upgrade").Value;
			this.levelBtn.enable = true;
		} else {
			this.txt_cost.text = "0";
			this.levelBtn.text = GameConfig.Language.getElement("Text_MaxLevel").Value;
			this.levelBtn.enable = false;

		}
		this.txt_price.text = this._cfg.sellBack[this._tower.level + this._upgradeCount].toFixed();
		this.initText();
	}

}
