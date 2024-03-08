/*
 * @Author       : dal
 * @Date         : 2023-11-20 09:57:59
 * @LastEditors  : dal
 * @LastEditTime : 2023-11-26 16:03:48
 * @FilePath     : \hauntedparadise\JavaScripts\modules\globalRank\ui\UIGlobalRankItem.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import GlobalRankRow_Generate from "../../../../ui-generate/ShareUI/module_globalRank/GlobalRankRow_generate";
import TimeTransferUtil from "../../../utils/TimeTransferUtil";
import { GlobalRankDataInfoBase } from "../GlobalRankData";
import { GlobalRankModuleC, rankDataTypeList } from "../GlobalRankModuleC";
import UIGlobalRankPanel from "./UIGlobalRankPanel";

/** 深色 */
const DeepColor: LinearColor = LinearColor.colorHexToLinearColor("5A5555FF");

/** 浅色 */
const LightColor: LinearColor = LinearColor.colorHexToLinearColor("C6C6C6FF");

export default class UIGlobalRankItem extends GlobalRankRow_Generate {

    /** 这个item的当前排名 */
    protected rankNum: number;

    protected mFieldTxtList: Array<mw.TextBlock> = [];

    /** 
     * 设置数据
     * @params rankNum 排名
     */
    public setData<Info extends GlobalRankDataInfoBase>(info: Info) {
        this.nameTxt.text = info.n;
        this.solveTime(info.t);
    }

    /** 设置静态信息 */
    public setStaticInfo(rankNum: number) {
        this.rankNum = rankNum;
        this.rankIDText.text = rankNum + "";
        this.setImgMedalGuidByRankNum(rankNum);
    }

    /** 前五十名榜上的 */
    private setImgMedalGuidByRankNum(rankNum: number) {
        switch (rankNum) {
            case 1:
                this.img_medal.imageGuid = "230903";
                this.rankIDText.fontColor = LightColor;
                break;
            case 2:
                this.img_medal.imageGuid = "230914";
                this.rankIDText.fontColor = DeepColor;
                break;
            case 3:
                this.img_medal.imageGuid = "230911";
                this.rankIDText.fontColor = LightColor;
                break;
            default:
                this.img_medal.imageGuid = "230907";
                this.rankIDText.fontColor = DeepColor;
        }
    }

    /** 玩家自己的 */
    private setImgMedalGuidByRankNumSelf(rankNum: number) {
        this.rankIDText.fontColor = LightColor;
        switch (rankNum) {
            case 1:
                this.img_medal.imageGuid = "230903";
                break;
            case 2:
                this.img_medal.imageGuid = "230914";
                this.rankIDText.fontColor = DeepColor;
                break;
            case 3:
                this.img_medal.imageGuid = "230911";
                break;
            default:
                this.img_medal.imageGuid = "230906";
        }
        if (SystemUtil.isPIE) { this.nameTxt.text = Player.localPlayer.character.displayName }
    }

    /** 设置自己在榜上的数据 */
    public setSelfDataOnList<Info extends GlobalRankDataInfoBase>(info: Info, rankNum?: number) {
        this.rankIDText.fontSize = 38;
        this.rankIDText.text = rankNum + "";
        this.solveTime(info.t);
        this.setImgMedalGuidByRankNumSelf(rankNum);
    }

    /** 设置自己没上榜时的分数 */
    public async setSelfDataNotOnList(passTime: number) {
        let rankNum: number = -1;
        if (passTime === -1) {
            this.rankIDText.fontSize = 16;
            this.rankIDText.text = GameConfig.Language.ranktext_01.Value;
            this.solveTime(passTime);
        }
        // 可能在50-1000名之间
        else {
            rankNum = await ModuleService.getModule(GlobalRankModuleC).reqGetSelfRank(this.panel.curDegree);
            this.rankIDText.fontSize = 20;
            this.setRankTxtByRankNum(rankNum);
            this.solveTime(passTime);
        }
        this.setImgMedalGuidByRankNumSelf(rankNum);
    }

    /**
     * 设置自己在50 - 1000名之间的id显示
     * @param rankNum 排名
     */
    private setRankTxtByRankNum(rankNum: number) {
        if (rankNum > 50 && rankNum <= 100) {
            this.rankIDText.text = "50+";
        } else if (rankNum > 100 && rankNum <= 500) {
            this.rankIDText.text = "100+";
        } else if (rankNum > 500 && rankNum <= 1000) {
            this.rankIDText.text = "500+";
        } else {
            this.rankIDText.text = GameConfig.Language.ranktext_01.Value;
        }
    }

    /** 解析时间，将秒显示成为时分秒的形式 */
    private solveTime(timeSec: number) {
        let timeStr = TimeTransferUtil.getDateStrByTimeSec(timeSec);
        this.scoreTxt.text = timeStr === "" ? GameConfig.Language.ranktime_01.Value : timeStr;
    }

    /** 设置自己的静态信息 */
    public async setSelfStaticInfo() {
        this.nameTxt.fontSize = 42;
        this.scoreTxt.fontSize = 42;
        this.mContent.position = new Vector2(140, 0);
        this.canvas_bg.size = new Vector2(1460, 116);
        if (SystemUtil.isMobile()) { if (AccountService.getNickName() != null) { this.nameTxt.text = AccountService.getNickName(); } }
    }

    get panel() {
        return UIService.getUI(UIGlobalRankPanel);
    }
}