/** 
 * @Author       : fengqi.han
 * @Date         : 2023-12-12 15:50:18
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-01-30 16:55:27
 * @FilePath     : \DragonVerse\battleworld\JavaScripts\module\PlayerModule\UI\rank\RankPanel.ts
 * @Description  : 段位系统ui面板
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IRankElement } from "../../../../config/Rank";
import KeyOperationManager from "../../../../controller/key-operation-manager/KeyOperationManager";
import Rank_main_Generate from "../../../../ui-generate/Rank/Rank_main_generate";
import { AnalyticsTool, EClickEvent, EPageName } from "../../../AnalyticsModule/AnalyticsTool";
import { PlayerHeadUIModuleC } from "../../../PlayerHeadUIModule/PlayerHeadUIModuleC";
import { PlayerModuleC } from "../../PlayerModuleC";
import { Attribute } from "../../sub_attribute/AttributeValueObject";
import { RankItem } from "./RankItem";

export class RankPanel extends Rank_main_Generate {
    /** 段位item存储map，key为配置id */
    private _itemMap: Map<number, RankItem> = new Map<number, RankItem>();
    /** 每个段位进度条比例 */
    private _perRankRate: number = 0;
    /** 段位配置 */
    private _cfgArr: IRankElement[] = [];

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.layer = UILayerOwn;
        this._cfgArr = GameConfig.Rank.getAllElement();
        let headUIC = ModuleService.getModule(PlayerHeadUIModuleC);
        let sizeX = 0;
        for (let i = 0; i < this._cfgArr.length; i++) {
            let cfg = this._cfgArr[i];
            let item = UIService.create(RankItem);
            item.init(cfg.id);
            this.itemCanvas.addChild(item.uiObject);
            sizeX += item.uiObject.size.x;
            this._itemMap.set(cfg.id, item);
        }
        //进度条长度设置
        this.mrank_ProgressBar.size = new Vector(sizeX, this.mrank_ProgressBar.size.y);
        this._perRankRate = 1 / this._cfgArr.length;
        this.mbtn_esc.onClicked.add(() => {
            UIService.hideUI(this);
        })
        //段位显示按钮
        this.mBtn_Rank.onClicked.add(() => {
            this.mBtn_Rank.visibility = SlateVisibility.Collapsed;
            this.mBtn_Rank_On.visibility = SlateVisibility.Visible;
            headUIC.setRankVis(1);
            //埋点
            AnalyticsTool.send_ts_action_click(EClickEvent.rankset);
        })
        //段位隐藏按钮
        this.mBtn_Rank_On.onClicked.add(() => {
            this.mBtn_Rank_On.visibility = SlateVisibility.Collapsed;
            this.mBtn_Rank.visibility = SlateVisibility.Visible;
            headUIC.setRankVis(0);
        })
        let isshowRank = ModuleService.getModule(PlayerModuleC).getAttr(Attribute.EnumAttributeType.isShowRank);
        this.mBtn_Rank_On.visibility = isshowRank ? SlateVisibility.Visible : SlateVisibility.Collapsed;
        this.mBtn_Rank.visibility = isshowRank ? SlateVisibility.Collapsed : SlateVisibility.Visible;


    }


    protected onShow(): void {
        let [rank, rankScore, dayRankScore] = ModuleService.getModule(PlayerModuleC).getRank();
        this._itemMap.forEach((item, key) => {
            if (key <= rank) {
                item.unLock();
            } else {
                item.lock();
            }
        })
        //当前ui设置
        this.mRanktext.text = this._cfgArr[rank - 1].rankName;
        this.mRestPoints.text = StringUtil.format(GameConfig.Language.Rank_text_11.Value, dayRankScore);
        this.mRankImage.imageGuid = this._cfgArr[rank - 1].rankImgID;
        for (let i = rank - 1; i < this._cfgArr.length; i++) {
            if (i == rank - 1 && i != this._cfgArr.length - 1) continue;
            if (this._cfgArr[i].shopId) {
                this.mUnlock.text = StringUtil.format(GameConfig.Language.Rank_text_12.Value, this._cfgArr[i].rankName);
                let shopCfg = GameConfig.Shop.getElement(this._cfgArr[i].shopId);
                if (shopCfg.Img) {
                    this.mUnlockImg.imageGuid = shopCfg.Img;
                }
                else {
                    // 获得资源Icon信息
                    let res = mw.getAssetIconDataByAssetID(shopCfg.Icon);
                    if (res) {
                        this.mUnlockImg.setImageByAssetIconData(res);
                    }
                }
                break;
            }
        }
        // 最大段位时处理
        if (rank >= this._cfgArr.length) {
            this.mrank_ProgressBar.currentValue = 1 - this._perRankRate / 2;
            this.mProgressBar.currentValue = 1;
            this.maxHide(false);
            this.mUnlock.text = GameConfig.Language.Rank_text_15.Value;
            return;
        }
        this.maxHide(true);
        this.mNextRank.text = StringUtil.format(GameConfig.Language.Rank_text_10.Value, this._cfgArr[rank].rankName);
        this.mProgressText.text = StringUtil.format(GameConfig.Language.Rank_text_14.Value, rankScore, this._cfgArr[rank].integral);
        // 进度条
        let curScore = this._cfgArr[rank - 1].integral;
        let nextScore = this._cfgArr[rank].integral;
        let curRate = (rankScore - curScore) / (nextScore - curScore);
        this.mrank_ProgressBar.currentValue = rank * this._perRankRate + curRate * this._perRankRate - this._perRankRate / 2;
        this.mProgressBar.currentValue = curRate;

        //埋点
        AnalyticsTool.send_ts_page(EPageName.rank);

        KeyOperationManager.getInstance().onKeyUp(Keys.Escape, this, () => {
            UIService.hideUI(this);
            KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
        })
    }

    /**
     * 最大段位时要隐藏的ui
     */
    private maxHide(visible: boolean) {
        this.mProgressBar.visibility = visible ? SlateVisibility.Visible : SlateVisibility.Collapsed;
        this.mProgressText.visibility = visible ? SlateVisibility.Visible : SlateVisibility.Collapsed;
        this.mNextRank.visibility = visible ? SlateVisibility.Visible : SlateVisibility.Collapsed;
        this.upProgress_Text.visibility = visible ? SlateVisibility.Visible : SlateVisibility.Collapsed;
    }
}