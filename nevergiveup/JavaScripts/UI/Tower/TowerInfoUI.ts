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

import Gtk from "gtoolkit";
import { GameManager } from "../../GameManager";
import TowerBase from "../../Modules/TowerModule/Tower/TowerBase";
import { TowerEvent } from "../../Modules/TowerModule/TowerEnum";
import { TowerModuleC } from "../../Modules/TowerModule/TowerModuleC";
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { ITowerElement } from "../../config/Tower";
import { GlobalData } from "../../const/GlobalData";
import { MGSTool } from "../../tool/MGSTool";
import TowerInfoUI_Generate from "../../ui-generate/Tower/TowerInfoUI_generate";
import TowerSmallTagItem_Generate from "../../ui-generate/Tower/TowerSmallTagItem_generate";
import TextItemUI from "../TextItemUI";

export default class TowerInfoUI extends TowerInfoUI_Generate {

    private _cfg: ITowerElement;
    private _tower: TowerBase;
    private _upgradeCount: number = 0;
    // private _textItemUIs: TextItemUI[] = [];
    private _tagItemUIs: TowerSmallTagItem_Generate[] = [];

    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    protected onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
        this.closeBtn.onClicked.add(() => {
            UIService.hideUI(this);
        });
        this.sellBtn.onClicked.add(() => {
            MGSTool.clickBtn("8");
            ModuleService.getModule(TowerModuleC).destroyTowerByUI(this._tower.info);
            UIService.hideUI(this);
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
            let item = UIService.create(TowerSmallTagItem_Generate);
            item.visible = false;
            this.icontagCanvas.addChild(item.uiObject);
            this._tagItemUIs.push(item);
        }
    }

    protected onHide() {
        this._upgradeCount = 0;
        ModuleService.getModule(TowerModuleC).setAttackEffect(null);
    }

	public getTags() {
		const cfg = this._cfg;
		const tags = [];
		if(cfg?.attackCount?.length)
			tags.push(cfg.attackCount[0] > 1 ? GlobalData.Shop.shopTagIconGuid[1] : GlobalData.Shop.shopTagIconGuid[0]); // shopTagIconGuid[0] 单体 shopTagIconGuid[1] 群体
		// adap 1为物理伤害，2为法术伤害，3为产出，4为增益
		if(cfg?.adap === 1)
			tags.push(GlobalData.Shop.shopTagIconGuid[2]);
		else if(cfg?.adap === 2)
			tags.push(GlobalData.Shop.shopTagIconGuid[3]);
		return tags;
	}

	public updateStrategyUI() {
        this.bg.size = new Vector2(490.00, 347.00);
        const sInfo = GlobalData.Shop.getStrategyInfo(this._cfg.id);
        if(!sInfo?.strategyKey && this._cfg?.adap === 4) {
		
            Gtk.trySetVisibility(this.can_strategy, mw.SlateVisibility.Visible);
            this.bg.size = new Vector2(490.00, 427.00);
		
            const { value } = GlobalData.Shop.getTowerBuffTextItem(this._cfg, this._tower.level, 0) ?? {};
            this.txt_Strategy.text = GameConfig.Language.DamageType_4.Value; 
			this.txt_Strategy_Desc.text = Utils.Format(GameConfig.Language.StrategyDesc_11.Value, value);
            return;
        }

        if(!sInfo) {
            Gtk.trySetVisibility(this.can_strategy, mw.SlateVisibility.Collapsed);
            return;
        }
        
        Gtk.trySetVisibility(this.can_strategy, mw.SlateVisibility.Visible);
        this.bg.size = new Vector2(490.00, 427.00);

		const { strategyKey, strategyTitle, strategyDescArgs, strategyDesc } = sInfo
        if(strategyDesc?.length === 1) {
            this.txt_Strategy.text = strategyTitle;
            this.txt_Strategy_Desc.text = strategyDesc[0];
            return;
        }
        const curLevel = this._tower.level;
        const desc = Utils.Format(GameConfig.Language.getElement(GlobalData.Shop.shopStrategyDescLangs[strategyKey])?.Value ?? "", curLevel === 2 ? strategyDescArgs[curLevel]: `${strategyDescArgs[curLevel]} → ${strategyDescArgs[curLevel + 1]}`);
        this.txt_Strategy.text = strategyTitle;
        this.txt_Strategy_Desc.text = desc;
	}

    /**
     * 设置显示时触发
     */
    protected onShow(tower: TowerBase) {
        const cfg = GameConfig.Tower.getElement(tower?.info.configID);
        console.log("#debug TowerInfoUI tower level:" + JSON.stringify(tower.level) + " tower" + JSON.stringify(tower.id) + " cfg" + JSON.stringify(cfg));
        if (!tower || !cfg) {
            UIService.hideUI(this);
            return;
        }
        this._upgradeCount = 0;
        this._cfg = cfg;
        this._tower = tower;
        this.nameTxt.text = this._cfg.name;
        // this._tower = Utils.shallowCopy(towerInfo);
        this.towerImg.imageGuid = this._cfg.imgGuid;
        this.bgElementImg.imageGuid = GlobalData.Shop.shopItemBgGuid[(this._cfg?.elementTy || 1) - 1];
		this.tagElementImg.imageGuid = GlobalData.Shop.shopItemCornerIconGuid[(this._cfg?.elementTy || 1) - 1];
        
        this.nameTxt.text = this._cfg.name;
        this.ownerTxt.text = StringUtil.format(GameConfig.Language.getElement("Text_CreatePlayerName").Value, Utils.truncateString(this._tower.info.playerName, 13));
        this.valueTxt.text = tower.outputStr;
        this.txt_price_deploy.text = this._cfg.spend.slice(0, tower.level+1).reduce((pre, cur) => pre+cur,0).toFixed(0);
        this.txt_fight.text = Utils.formatNumber(this._cfg.attackDamage[tower.level]);
        this.updateStrategyUI();
		const tags = this.getTags();
		const len = tags?.length ?? 0;
		for (let i = 0; i < this._tagItemUIs.length; i++) {
			this._tagItemUIs[i].visible = (i < len);
			if (i < len) {
				// this._tagItemUIs[i].txt_tag.text = GameConfig.Language.getElement(tags[i])?.Value
				this._tagItemUIs[i].img_tag.imageGuid = tags[i];
			}
		}

        this.showLevel();
        if (Utils.isLocalPlayer(tower.info.playerID)) {
            this.canvas_levelup.visibility = SlateVisibility.Visible;
            let stage = GameManager.getStageClient();
            if (stage && stage.stageWorldIndex == 99) {
                this.canvas_sell.visibility = SlateVisibility.Collapsed;
            } else {
                // this.sellBtn.text = "拆除:+" + this._cfg.sellBack[tower.level + this._upgradeCount];
                this.canvas_sell.visibility = SlateVisibility.Visible;
            }
        } else {
            this.canvas_levelup.visibility = SlateVisibility.Collapsed;
            this.canvas_sell.visibility = SlateVisibility.Collapsed;
        }
        ModuleService.getModule(TowerModuleC).setAttackEffect(tower);
    }

    private initText() {
        const textItemLen = this._cfg?.infoTestsCn?.length ?? 0;
        // this.levelTxt.text = "Lv. " + (this._tower.level + 1 + this._upgradeCount);
 
        // if (this._textItemUIs?.length) this._textItemUIs.forEach(v => v?.destroy());
        // this._textItemUIs = [];
        // this.infoCanvas.removeAllChildren();
        if (!textItemLen) return;
            // this.createTextUI(
        //     GameConfig.Language.getElement("Tower_attackTags_13").Value,
        //     this._tower.level === 2 ? "3" : `${this._tower.level+1} → ${this._tower.level + 2}`,
        // );
        const curLevel = this._tower.level + 1; // 1 2 3
        for (let i = 0; i < 4; i++) {
            const attrTitle = this?.[`attribute${i+1}`] as mw.TextBlock;
            const vis = i < textItemLen ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
            Gtk.trySetVisibility(attrTitle, vis);
            if(i >= textItemLen) continue;
            if(attrTitle) attrTitle.text = GlobalData.Shop.getTowerBuffTextItem(this._cfg, 0, i)?.title ?? '';
        }
        const lv1Title = this?.[`txt_lv1`] as mw.TextBlock;
        const lv2Title = this?.[`txt_lv2`] as mw.TextBlock;
        const lv3Title = this?.[`txt_lv3`] as mw.TextBlock;
        const curLvTitle = this?.[`txt_lv${curLevel}`] as mw.TextBlock;
        lv1Title.renderOpacity = lv2Title.renderOpacity = lv3Title.renderOpacity = 0.7;
        curLvTitle.renderOpacity = 1;
        for(let lv = 1; lv <= 3; lv++) {
            const can = this?.[`canvas_lv${lv}`] as mw.Canvas;
            const isCurLevel = lv === curLevel;
            if (can) can.renderOpacity = isCurLevel ? 1 : 0.7;
            for(let attr = 1; attr <= 4; attr++) {
                const attrValue = this?.[`lv${lv}Attribute${attr}`] as mw.TextBlock;
                if(attrValue) {
                    const isVis = attr <= textItemLen;
                    Gtk.trySetVisibility(attrValue, isVis ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed);
                    if(isVis) {
                        attrValue.text = GlobalData.Shop.getTowerBuffTextItem(this._cfg, lv - 1, attr - 1)?.value ?? '';
                        attrValue.setFontColorByHex(isCurLevel ? "#62E063" : "#FFFFFF")
                    }
                };
            }
        }
        
    }

    // public createTextUI(title: string, value: string) {
    //     const ui = UIService.create(TextItemUI);
    //     ui.initText(title, value, {isInfo: true});
    //     this.infoCanvas.addChild(ui.uiObject);
    //     this._textItemUIs.push(ui);
    // }

    /**
     * 等级相关UI
     */
    private showLevel() {
        if (this._cfg.spend[this._tower.level + 1 + this._upgradeCount] != null) {
            this.txt_cost_value.text = "-" + this._cfg.spend[this._tower.level + 1 + this._upgradeCount].toFixed();
            this.canvas_levelup_inner_left.visibility = SlateVisibility.SelfHitTestInvisible;
            this.txt_cost.text = GameConfig.Language.getElement("Text_Upgrade").Value;
            this.levelBtn.enable = true;
        } else {
            this.txt_cost_value.text = "0";
            this.canvas_levelup_inner_left.visibility = SlateVisibility.Collapsed;
            this.txt_cost.text = GameConfig.Language.getElement("Text_MaxLevel").Value;
            this.levelBtn.enable = false;

        }
        this.txt_sell_value.text = "+" + this._cfg.sellBack[this._tower.level + this._upgradeCount].toFixed();
        this.initText();
    }

}
