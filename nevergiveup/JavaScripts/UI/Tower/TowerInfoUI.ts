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
import Log4Ts from "mw-log4ts";
import { GameManager } from "../../GameManager";
import TowerBase from "../../Modules/TowerModule/Tower/TowerBase";
import { TowerEvent } from "../../Modules/TowerModule/TowerEnum";
import { TowerModuleC } from "../../Modules/TowerModule/TowerModuleC";
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { ITowerElement } from "../../config/Tower";
import { GlobalData } from "../../const/GlobalData";
import { MGSTool } from "../../tool/MGSTool";
import { SoundUtil } from "../../tool/SoundUtil";
import TowerInfoUI_Generate from "../../ui-generate/Tower/TowerInfoUI_generate";
import TowerTagItem_Generate from "../../ui-generate/Tower/TowerTagItem_generate";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";

export default class TowerInfoUI extends TowerInfoUI_Generate {
    private _cfg: ITowerElement;
    private _tower: TowerBase;
    private _upgradeCount: number = 0;
    // private _textItemUIs: TextItemUI[] = [];
    private _tagItemUIs: TowerTagItem_Generate[] = [];

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
            SoundUtil.PlaySoundById(2007);
            ModuleService.getModule(TowerModuleC).destroyTowerByUI(this._tower.info);
            UIService.hideUI(this);
        });
        this.levelBtn.onClicked.add(() => {
            MGSTool.clickBtn("7");
            if (ModuleService.getModule(TowerModuleC).upgradeTowerByUI(this._tower.info, ++this._upgradeCount)) {
                SoundUtil.PlaySoundById(2006);
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
            this.icontagCanvas.addChild(item.uiObject);
            this._tagItemUIs.push(item);
        }
        KeyOperationManager.getInstance().onKeyUp(undefined, Keys.Q, this.sellTower.bind(this));
        KeyOperationManager.getInstance().onKeyUp(undefined, Keys.E, this.levelUpTower.bind(this));
        KeyOperationManager.getInstance().onKeyUp(undefined, Keys.Escape, this.hideTowerInfo.bind(this));
    }

    protected onHide() {
        this._upgradeCount = 0;
        ModuleService.getModule(TowerModuleC).setAttackEffect(null);
        KeyOperationManager.getInstance().unregisterKey(this, Keys.E);
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Q);
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }

    public sellTower() {
        if (this.visible) {
            SoundUtil.PlaySoundById(2007);
            ModuleService.getModule(TowerModuleC).destroyTowerByUI(this._tower.info);
            UIService.hideUI(this);
        }
    }

    public levelUpTower() {
        if (this.visible) {
            if (ModuleService.getModule(TowerModuleC).upgradeTowerByUI(this._tower.info, ++this._upgradeCount)) {
                SoundUtil.PlaySoundById(2006);
                this.showLevel();
            } else {
                --this._upgradeCount;
            }
        }
    }

    public hideTowerInfo() {
        if (this.visible) {
            UIService.hideUI(this);
        }
    }

    public getTags() {
        const cfg = this._cfg;
        const tags = [];
        if (cfg?.attackCount?.length && ![3, 4].includes(cfg.adap))
            tags.push(cfg.attackCount[0] > 1 ? GlobalData.Shop.shopTagIconGuid[1] : GlobalData.Shop.shopTagIconGuid[0]); // shopTagIconGuid[0] 单体 shopTagIconGuid[1] 群体
        // adap 1为物理伤害，2为法术伤害，3为产出，4为增益
        if (cfg?.adap) {
            tags.push(GlobalData.Shop.shopTagIconGuid[cfg.adap + 1]); // 1-物理 2-法术 3-产出 4-增益
        }
        return tags;
    }

    // curLevel 0 1 2
    public getColoredStrategyStrDesc(descStr: string, strategyDescArgs: string[][], curLevel: number): string {
        try {
            console.log(
                "getColoredStrategyStrDesc strategyDescArgs:" +
                    JSON.stringify(strategyDescArgs) +
                    " descStr:" +
                    descStr +
                    " curLevel:" +
                    curLevel
            );
            if (!strategyDescArgs?.length || !strategyDescArgs[0]?.length) return descStr;
            const args = [];
            // 假设 strategyDescArgs 是一个矩阵，转换每一列为字符串，并在指定的 curLevel 位置加颜色
            for (let col = 0; col < strategyDescArgs[0].length; col++) {
                let combined = [];
                for (let row = 0; row < strategyDescArgs.length; row++) {
                    if (row === curLevel) {
                        // 在 curLevel 对应的值加上颜色
                        combined.push(`<color=#62E063>${strategyDescArgs[row][col]}</color>`);
                    } else {
                        combined.push(strategyDescArgs[row][col]);
                    }
                }
                args.push(combined.join("->")); // 将列中元素用 "->" 连接起来
            }
            return Utils.Format(descStr, args);
        } catch (e) {
            Log4Ts.error(TowerInfoUI, "getColoredStrategyStrDesc:" + e);
            return descStr;
        }
    }
    public updateStrategyUI() {
        this.bg.size = new Vector2(490.0, 347.0);
        const sInfo = GlobalData.Shop.getStrategyInfo(this._cfg.id);
        if (!sInfo?.strategyKey && this._cfg?.adap === 4) {
            Gtk.trySetVisibility(this.can_strategy, mw.SlateVisibility.Visible);
            this.bg.size = new Vector2(490.0, 427.0);

            const { value } = GlobalData.Shop.getTowerBuffTextItem(this._cfg, this._tower.level, 0) ?? {};
            this.txt_Strategy.text = GameConfig.Language.DamageType_4.Value;
            this.txt_Strategy_Desc.text = Utils.Format(GameConfig.Language.StrategyDesc_11.Value, value);
            return;
        }

        if (!sInfo) {
            Gtk.trySetVisibility(this.can_strategy, mw.SlateVisibility.Collapsed);
            return;
        }

        Gtk.trySetVisibility(this.can_strategy, mw.SlateVisibility.Visible);
        this.bg.size = new Vector2(490.0, 427.0);

        const { strategyKey, strategyTitle, strategyDescArgs, strategyDesc } = sInfo;
        if (strategyDesc?.length === 1) {
            this.txt_Strategy.text = strategyTitle;
            this.txt_Strategy_Desc.text = strategyDesc[0];
            return;
        }
        const curLevel = this._tower.level;
        const desc = this.getColoredStrategyStrDesc(
            GameConfig.Language.getElement(GlobalData.Shop.shopStrategyDescLangs[strategyKey])?.Value ?? "",
            strategyDescArgs,
            curLevel
        );
        this.txt_Strategy.text = strategyTitle;
        this.txt_Strategy_Desc.text = desc;
    }

    /**
     * 设置显示时触发
     */
    protected onShow(tower: TowerBase) {
        const cfg = GameConfig.Tower.getElement(tower?.info.configID);
        console.log(
            "#debug TowerInfoUI tower level:" +
                JSON.stringify(tower.level) +
                " tower" +
                JSON.stringify(tower.id) +
                " cfg" +
                JSON.stringify(cfg)
        );
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
        this.ownerTxt.text = StringUtil.format(
            GameConfig.Language.getElement("Text_CreatePlayerName").Value,
            Utils.truncateString(this._tower.info.playerName, 13)
        );
        this.valueTxt.text = tower.outputStr;
        this.txt_price_deploy.text = this._cfg.spend
            .slice(0, tower.level + 1)
            .reduce((pre, cur) => pre + cur, 0)
            .toFixed(0);

        const sInfo = GlobalData.Shop.getStrategyInfo(this._cfg.id);
        if (!sInfo?.strategyKey && this._cfg?.adap === 4) {
            const { value } = GlobalData.Shop.getTowerBuffTextItem(this._cfg, tower.level, 0) ?? {};
            this.txt_fight.text = value;
        } else this.txt_fight.text = Utils.formatNumber(this._cfg.attackDamage[tower.level]);

        this.fightImg.imageGuid = GlobalData.Shop.shopItemFightIconGuid[0];
        if (this._cfg.adap === 3) this.fightImg.imageGuid = GlobalData.Shop.shopItemFightIconGuid[1];
        if (this._cfg.adap === 4) this.fightImg.imageGuid = GlobalData.Shop.shopItemFightIconGuid[2];

        this.updateStrategyUI();
        const tags = this.getTags();
        const len = tags?.length ?? 0;
        for (let i = 0; i < this._tagItemUIs.length; i++) {
            this._tagItemUIs[i].visible = i < len;
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
            const attrTitle = this?.[`attribute${i + 1}`] as mw.TextBlock;
            const vis = i < textItemLen ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
            Gtk.trySetVisibility(attrTitle, vis);
            if (i >= textItemLen) continue;
            if (attrTitle) attrTitle.text = GlobalData.Shop.getTowerBuffTextItem(this._cfg, 0, i)?.title ?? "";
        }
        const lv1Title = this?.[`txt_lv1`] as mw.TextBlock;
        const lv2Title = this?.[`txt_lv2`] as mw.TextBlock;
        const lv3Title = this?.[`txt_lv3`] as mw.TextBlock;
        const curLvTitle = this?.[`txt_lv${curLevel}`] as mw.TextBlock;
        lv1Title.renderOpacity = lv2Title.renderOpacity = lv3Title.renderOpacity = 0.7;
        curLvTitle.renderOpacity = 1;
        for (let lv = 1; lv <= 3; lv++) {
            const can = this?.[`canvas_lv${lv}`] as mw.Canvas;
            const isCurLevel = lv === curLevel;
            if (can) can.renderOpacity = isCurLevel ? 1 : 0.7;
            for (let attr = 1; attr <= 4; attr++) {
                const attrValue = this?.[`lv${lv}Attribute${attr}`] as mw.TextBlock;
                if (attrValue) {
                    const isVis = attr <= textItemLen;
                    Gtk.trySetVisibility(attrValue, isVis ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed);
                    if (isVis) {
                        attrValue.text = GlobalData.Shop.getTowerBuffTextItem(this._cfg, lv - 1, attr - 1)?.value ?? "";
                        attrValue.setFontColorByHex(isCurLevel ? "#62E063" : "#FFFFFF");
                    }
                }
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
            Gtk.trySetVisibility(this.txt_cost_value, mw.SlateVisibility.Visible);
            Gtk.trySetVisibility(this.img_money, mw.SlateVisibility.Visible);
            this.txt_cost_value.text = "-" + this._cfg.spend[this._tower.level + 1 + this._upgradeCount].toFixed();
            this.canvas_levelup_inner_left.visibility = SlateVisibility.SelfHitTestInvisible;
            this.txt_cost.text = GameConfig.Language.getElement("Text_Upgrade").Value;
            this.levelBtn.enable = true;
        } else {
            Gtk.trySetVisibility(this.txt_cost_value, mw.SlateVisibility.Collapsed);
            Gtk.trySetVisibility(this.img_money, mw.SlateVisibility.Collapsed);
            this.txt_cost_value.text = "0";
            this.canvas_levelup_inner_left.visibility = SlateVisibility.Collapsed;
            this.txt_cost.text = GameConfig.Language.getElement("Text_MaxLevel").Value;
            this.levelBtn.enable = false;
        }
        this.txt_sell_value.text = "+" + this._cfg.sellBack[this._tower.level + this._upgradeCount].toFixed();
        this.initText();
    }
}
