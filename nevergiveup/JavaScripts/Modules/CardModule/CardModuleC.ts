﻿/*
 * @Author: shifu.huang
 * @Date: 2023-12-14 14:06:56
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-21 18:07:55
 * @FilePath: \nevergiveup\JavaScripts\Modules\CardModule\CardModuleC.ts
 * @Description: 修改描述
 */
import { TweenCommon } from "../../TweenCommon";
import LobbyUI from "../../UI/LobbyUI";
import { TipsManager } from "../../UI/Tips/CommonTipsManagerUI";
import TowerShopUI from "../../UI/Tower/TowerShopUI";
import TowerUI from "../../UI/Tower/TowerUI";
import { GameConfig } from "../../config/GameConfig";
import { MGSTool } from "../../tool/MGSTool";
import PlayerModuleC from "../PlayerModule/PlayerModuleC";
import CardModuleData from "./CardModuleData";
import CardModuleS from "./CardModuleS";

export enum CardState {
    Lock = 0,
    Unlock = 1,
    Equip = 2,
}

export default class CardModuleC extends ModuleC<CardModuleS, CardModuleData> {


    private _canBuyCard: boolean = true;

    public get unlockCards(): number[] {
        return this.data.unlockCards;
    }

    public get equipCards(): number[] {
        return this.data.equipCards;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        console.log('hsfCardModuleC====================== ', "启动")
        UIService.getUI(TowerUI).setTowerUI(this.data.equipCards);
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    public btnExecute(cardID: number, state: CardState) {
        switch (state) {
            case CardState.Unlock:
                this.equipCard(cardID, true);
                break;
            case CardState.Equip:
                this.equipCard(cardID, false);
                break;
            case CardState.Lock:
                this.buyCard(cardID);
                break;
            default: break;
        }
    }

    /**
     * 装备或卸下卡牌
     * @param cardID 卡牌id
     * @param isEquip 是否装备上
     */
    private equipCard(cardID: number, isEquip: boolean) {
        let flag = false;
        if (isEquip) {
            MGSTool.clickBtn("4");
            if (this.data.equipCards.length >= 6) {
                TipsManager.showTips(GameConfig.Language.getElement("Text_CardsFull").Value);
                return;
            }
            if (!this.data.equipCards.includes(cardID)) {
                this.data.equipCards.push(cardID);
                flag = true;
            }
        } else {
            MGSTool.clickBtn("5");
            const index = this.data.equipCards.indexOf(cardID);
            if (index >= 0) {
                if (this.data.equipCards.length <= 1) {
                    TipsManager.showTips(GameConfig.Language.getElement("Text_CardNotEmpty").Value);
                    return;
                } else {
                    this.data.equipCards.splice(index, 1);
                    flag = true;
                }
            }
        }
        this.server.net_setEquipCard(this.data.equipCards);
        UIService.getUI(TowerUI).setTowerUI(this.data.equipCards);
        UIService.getUI(TowerShopUI).refreshItemsState();
    }


    /**
     * 买卡牌
     * @param cardID 卡牌ID
     * @returns 
     */
    private async buyCard(cardID: number) {
        MGSTool.clickBtn("6");
        if (!this._canBuyCard) {
            TipsManager.showTips(GameConfig.Language.getElement("Text_TooFase").Value)
            return;
        }
        const cfg = GameConfig.Tower.getElement(cardID);
        let checkFlag = ModuleService.getModule(PlayerModuleC).checkGold(cfg.shopPrice);
        if (checkFlag && !this.data.unlockCards.includes(cardID)) {
            this._canBuyCard = false;
            try {
                let flag = await this.server.net_buyCard(cardID);
                if (flag) {
                    TipsManager.showTips(GameConfig.Language.getElement("Text_BuyAndEquip").Value);
                    MGSTool.goldChange(2, cfg.shopPrice, 2);
                    this.net_addUnlockCard(cardID);
                    this.equipCard(cardID, true);
                }
            } catch (error) {
                console.error(`hsf----net_buyCard:${error}`);
            } finally {
                this._canBuyCard = true;
            }
        } else {
            !checkFlag &&
                TweenCommon.goldFailedShow(UIService.getUI(LobbyUI).goldTxt);
            TipsManager.showTips(!checkFlag ? GameConfig.Language.getElement("Text_LessGold").Value : GameConfig.Language.getElement("Text_CardIsUnlock").Value)
        }
    }

    public net_addUnlockCard(cardID: number) {
        this.data.addUnlockCard(cardID);
        UIService.getUI(TowerShopUI).refreshItemsState();
        MGSTool.cardChange(cardID);
    }

    /**
     * 获取卡牌状态
     * @param cardID 卡牌ID
     * @returns 卡牌状态
     */
    public getCardState(cardID: number): CardState {
        if (this.data.equipCards.indexOf(cardID) >= 0) {
            return CardState.Equip;
        } else if (this.data.unlockCards.indexOf(cardID) >= 0) {
            return CardState.Unlock;
        }
        return CardState.Lock;
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}