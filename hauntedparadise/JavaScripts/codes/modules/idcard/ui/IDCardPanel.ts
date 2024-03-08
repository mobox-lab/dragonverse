/*
 * @Author       : dal
 * @Date         : 2024-02-28 16:37:08
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-04 14:18:19
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\idcard\ui\IDCardPanel.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import Avatar_UI_Generate from "../../../../ui-generate/ShareUI/card/Avatar_UI_generate";
import Tips from "../../../utils/Tips";
import { GridSelectContainer } from "../../../utils/UIPool";
import { RouteModuleC } from "../../route/RouteModule";
import { OnCardGameThemeList } from "../IDCardConst";
import { IDCardData, IDCardDataType } from "../IDCardDataHelper";
import IDCardDefine from "../IDCardDefine";
import { IDCardModuleC } from "../IDCardModule";
import AddFriendHud from "./AddFriendPanel";
import GameThemeItem from "./GameThemeItem";
import {GiftItem, GiftSendItem} from "./GiftItem";
import { RecentGiftInfoItem, RecentLikeInfoItem } from "./RecentInfoItem";

export default class IDCardPanel extends Avatar_UI_Generate {

    protected onAwake(): void {
        // 反转一下经验表用于查找计算
        GameConfig.PopularExp.getAllElement().reverse();
        GameConfig.PlayerExp.getAllElement().reverse();
    }

    protected onStart() {
        this.btn_close.onClicked.add(() => { UIService.hideUI(this); });
        this.btn_good.onClicked.add(this.onLikeClick.bind(this));
        this.btn_gift.onClicked.add(this.onGiftClick.bind(this));
        this.btn_more.onClicked.add(this.onMoreClick.bind(this));
        this.btn_pexp.onClicked.add(this.onPexpClick.bind(this));
        this.btn_off1.onClicked.add(() => { this.canvas_like.visibility = SlateVisibility.Collapsed; });
        this.btn_off2.onClicked.add(() => { this.canvas_sendgift.visibility = SlateVisibility.Collapsed; });
        this.btn_off3.onClicked.add(() => { this.canvas_giftItems.visibility = SlateVisibility.Collapsed; });
        this.stalebtnedit.onClicked.add(this.enterEditMode.bind(this));
        this.stalebtn_BeFriend.onClicked.add(this.onAddFriendClick.bind(this));
        this.inputBox_sign.onTextCommitted.add(this.onSignCommitted.bind(this));
        this.initContainer();
    }

    private onAddFriendClick() {
        UIService.show(AddFriendHud, this.userId, this.idCardData.baseInfo.nickName);
    }

    private enterEditMode() {
        this.inputBox_sign.focus();
    }

    private onSignCommitted() {
        if (!this.isSelfIDCard) { return; }
        this.selfModule.reqSetData(this.userId, [IDCardDataType.SignTxt], [this.inputBox_sign.text]);
    }

    /** 当前名片的玩家id */
    private userId: string;

    private idCardData: IDCardData;

    protected async onShow(userId: string) {
        this.userId = userId;
        this.updateIDCardInfo(await IDCardDefine.reqIDCardData(userId));
    }

    protected onHide() {
        this.userId = null;
        this.idCardData = null;
    }

    private get isSelfIDCard() {
        return this.userId === Player.localPlayer.userId;
    }

    private hideLikeAndGiftCanvas() {
        this.canvas_like.visibility = SlateVisibility.Collapsed;
        this.canvas_sendgift.visibility = SlateVisibility.Collapsed;
        this.canvas_giftItems.visibility = SlateVisibility.Collapsed;
    }

    public async updateIDCardInfo(data: IDCardData) {
        this.idCardData = data;
        this.hideLikeAndGiftCanvas();
        this.beLikeContainer.clear();
        // 自己无法改变人的个性签名
        if (this.isSelfIDCard) {
            this.stalebtn_chage.visibility = SlateVisibility.Collapsed;
            this.stalebtnedit.visibility = SlateVisibility.Collapsed;
            this.stalebtn_BeFriend.visibility = SlateVisibility.Collapsed;
            this.inputBox_sign.enable = true;
            this.inputBox_love.enable = false;
            this.inputBox_sign.hintString = "请在此输入您的个性签名（记得改多语言）"
        } else {
            this.stalebtn_chage.visibility = SlateVisibility.Collapsed;
            this.stalebtnedit.visibility = SlateVisibility.Collapsed;
            this.stalebtn_BeFriend.visibility = SlateVisibility.Visible;
            this.inputBox_sign.enable = false;
            this.inputBox_sign.hintString = ""
            AccountService.isFriend((isSuccess: boolean, jsonData: string) => {
                if (isSuccess) {
                    this.stalebtn_BeFriend.text = "已是好友(记得接多语言)";
                    this.stalebtn_BeFriend.enable = false;
                }
            }, this.userId);
        }

        this.txt_cardname.text = this.idCardData.baseInfo.nickName + "的身份卡";
        if (SystemUtil.isPIE) {
            this.img_head.imageGuid = this.idCardData.baseInfo.headImgUrl;
        } else {
            this.img_head["imageInfo"]["asyncSetByUrl"](this.idCardData.baseInfo.headImgUrl);
        }
        this.txt_name.text = "昵称" + "：" + this.idCardData.baseInfo.nickName;
        this.txt_gender.text = "性别" + "：";
        if (this.idCardData.baseInfo.sex === 0) {
            this.img_girl.visibility = SlateVisibility.SelfHitTestInvisible;
            this.img_boy.visibility = SlateVisibility.Collapsed;
        } else {
            this.img_girl.visibility = SlateVisibility.Collapsed;
            this.img_boy.visibility = SlateVisibility.SelfHitTestInvisible;
        }
        this.txt_ID.text = "好友ID" + "：" + this.idCardData.baseInfo.userId;
        this.inputBox_sign.text = this.idCardData.signTxt;
        this.inputBox_love.text = "暂无";
        this.txt_goodnum.text = this.idCardData.beLikedCount + "";
        this.txt_giftnum.text = IDCardDefine.getAllGiftCount(this.idCardData) + "";
        this.giftContainer.nodes.forEach(node => {
            node.setCount(this.idCardData.giftInfoList.find(v => { return node["cfgId"] === v.id })?.count);
        });
        this.setCharmValue();
        this.updateRouteDataInfo();
    }

    /** 人气等级到下一级所需经验 */
    private nextCharmLevelDis: number = 0;

    /** 计算鬼魅值 */
    private setCharmValue() {
        this.txt_popuEP.text = "鬼魅值" + "：" + this.idCardData.charmVal;
        const curLevelCfg = GameConfig.PopularExp.getAllElement().find(v => { return this.idCardData.charmVal >= v.charmVal });
        const curLevel = curLevelCfg ? curLevelCfg.level : 0;
        const nextLevelCfg = GameConfig.PopularExp.getElement(curLevel + 1);
        this.nextCharmLevelDis = nextLevelCfg ? nextLevelCfg.charmVal - this.idCardData.charmVal : -1;
        this.txt_populevel.text = "人气等级" + "：" + (curLevel) + "级";
    }

    private async updateRouteDataInfo() {
        const allGameRouteDataList = (await ModuleService.getModule(RouteModuleC).reqAllGameRouteData())
        const exp = allGameRouteDataList.map(v => { return v.totalExp }).reduce((v1, v2) => { return v1 + v2 }, 0);
        this.setPlayerValue(Math.floor(exp));
        const newArr = allGameRouteDataList.sort((v1, v2) => { return v2.totalGameTime - v1.totalGameTime });
        newArr.forEach((v, id) => {
            this.gameThemeInfoContainer.nodes[id].setData(v);
        });
    }

    /** 人气等级到下一级所需经验 */
    private nextPlayerLevelDis: number = 0;

    /** 计算鬼魅值 */
    private setPlayerValue(exp: number) {
        this.txt_EP.text = "经验" + "：" + exp;
        const curLevelCfg = GameConfig.PlayerExp.getAllElement().find(v => { return exp >= v.val });
        const curLevel = curLevelCfg ? curLevelCfg.level : 0;
        const nextLevelCfg = GameConfig.PlayerExp.getElement(curLevel + 1);
        this.txt_level.text = "等级" + "：" + curLevel + "级";
        this.nextPlayerLevelDis = nextLevelCfg ? nextLevelCfg.val - exp : -1;
    }

    private get selfModule() {
        return ModuleService.getModule(IDCardModuleC);
    }

    private onLikeClick() {
        if (this.isSelfIDCard) {
            this.canvas_like.visibility = this.canvas_like.visible ? SlateVisibility.Collapsed : SlateVisibility.SelfHitTestInvisible;
            this.canvas_sendgift.visibility = SlateVisibility.Collapsed;
            for (let index = this.idCardData.recentLikeInfoList.length - 1; index >= 0; index--) {
                const recentLikeInfo = this.idCardData.recentLikeInfoList[index];
                this.beLikeContainer.addNode().setData(recentLikeInfo);
            }
        } else {
            this.selfModule.reqLike(this.userId);
        }
    }

    private onGiftClick() {
        if (this.isSelfIDCard) {
            this.canvas_sendgift.visibility = this.canvas_sendgift.visible ? SlateVisibility.Collapsed : SlateVisibility.SelfHitTestInvisible;
            this.canvas_like.visibility = SlateVisibility.Collapsed;
        } else {
            this.canvas_giftItems.visibility = this.canvas_giftItems.visible ? SlateVisibility.Collapsed : SlateVisibility.SelfHitTestInvisible;
            this.selfModule.reqGift();
        }
    }

    /** 经验值的问号 */
    private onMoreClick() {
        Tips.show(`到下一级还需要${this.nextPlayerLevelDis}经验（记得接多语言）`);
    }

    /** 鬼魅值的问号 */
    private onPexpClick() {
        Tips.show(`到下一级还需要${this.nextCharmLevelDis}经验（记得接多语言）`);
    }

    /** 点赞 */
    private beLikeContainer: GridSelectContainer<RecentLikeInfoItem>;
    /** 礼物墙 */
    private giftContainer: GridSelectContainer<GiftItem>;
    /** 游戏记录 */
    private gameThemeInfoContainer: GridSelectContainer<GameThemeItem>;
    /** 送礼 */
    private sendGiftContainer: GridSelectContainer<GiftSendItem>;
    /** 最近收礼 */
    private recentGiftContainer: GridSelectContainer<RecentGiftInfoItem>;

    private initContainer() {
        // 所有礼物展示
        this.canvas_gift.removeAllChildren();
        this.giftContainer = new GridSelectContainer(this.canvas_gift, GiftItem);
        GameConfig.Gift.getAllElement().forEach(v => {
            let node = this.giftContainer.addNode();
            node.init(v.id, v.imageGuid);
        });

        // 游戏记录
        this.canvas_record.removeAllChildren();
        this.gameThemeInfoContainer = new GridSelectContainer(this.canvas_record, GameThemeItem);
        OnCardGameThemeList.forEach(v => {
            this.gameThemeInfoContainer.addNode();
        })

        // 最近被点赞
        this.canvas_likeName.removeAllChildren();
        this.beLikeContainer = new GridSelectContainer(this.canvas_likeName, RecentLikeInfoItem);

        // 最近的收礼
        this.recentGiftContainer = new GridSelectContainer(this.canvas_giftName, RecentGiftInfoItem);
        
        // 礼物列表
        this.sendGiftContainer = new GridSelectContainer(this.canvas_giftItem, GiftSendItem);
        GameConfig.Gift.getAllElement().forEach((v) => {
            this.sendGiftContainer.addNode().init(v);
        });
    }
}