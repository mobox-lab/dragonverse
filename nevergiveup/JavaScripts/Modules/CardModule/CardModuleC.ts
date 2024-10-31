/*
 * @Author: shifu.huang
 * @Date: 2023-12-14 14:06:56
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-21 18:07:55
 * @FilePath: \nevergiveup\JavaScripts\Modules\CardModule\CardModuleC.ts
 * @Description: 修改描述
 */
import { TweenCommon } from "../../TweenCommon";
import LobbyUI from "../../UI/LobbyUI";
import QuestionUI from "../../UI/QuestionUI";
import { TipsManager } from "../../UI/Tips/CommonTipsManagerUI";
import TowerShopUI from "../../UI/Tower/TowerShopUI";
import TowerUI, { TowerConfigConstants } from "../../UI/Tower/TowerUI";
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { MGSTool } from "../../tool/MGSTool";
import { SoundUtil } from "../../tool/SoundUtil";
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
    private _canSellCard: boolean = true;

    public get unlockCards(): number[] {
        return this.data.unlockCards;
    }

    public get equipCards(): number[] {
        return this.data.equipCards;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        console.log("hsfCardModuleC====================== ", "启动");
        UIService.getUI(TowerUI).setTowerUI(this.data.equipCards);
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {}

    public btnExecute(cardID: number, state: CardState, isShop: boolean) {
        if(isShop && [CardState.Unlock, CardState.Equip].includes(state)) {
            const text = Utils.Format(GameConfig.Language.Text_TowerReturn.Value, Math.floor((GameConfig.Tower.getElement(cardID)?.shopPrice ?? 0) / 2));
            UIService.show(QuestionUI, {text, onConfirm: () => {
                if(state === CardState.Equip) this.equipCard(cardID, false); // 先卸载
                this.sellCard(cardID);
            }});
            return;
        }
        switch (state) {
            case CardState.Unlock:
                SoundUtil.PlaySoundById(2002);
                this.equipCard(cardID, true);
                break;
            case CardState.Equip:
                SoundUtil.PlaySoundById(2003);
                this.equipCard(cardID, false);
                break;
            case CardState.Lock:
                SoundUtil.PlaySoundById(2001);
                this.buyCard(cardID);
                break;
            default:
                break;
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
            if (this.data.equipCards.length >= TowerConfigConstants.maxEquip) {
                TipsManager.showTips(GameConfig.Language.Text_CardsFull.Value);
                return;
            }
            if (!this.data.equipCards.includes(cardID)) {
                this.data.equipCards.push(cardID);
                flag = true;
            }
        } else {
            const index = this.data.equipCards.indexOf(cardID);
            if (index >= 0) {
                if (this.data.equipCards.length <= 1) {
                    TipsManager.showTips(GameConfig.Language.Text_CardNotEmpty.Value);
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

    public net_equipCard(cardID: number, isEquip: boolean) {
        this.equipCard(cardID, isEquip);
    }

    /**
     * 卖卡牌
     * @param cardID 卡牌ID
     * @returns
     */
    private async sellCard(cardID: number) {
        if (!this._canSellCard) {
            TipsManager.showTips(GameConfig.Language.Text_TooFase.Value);
            return;
        }
        console.log("#debug sellCard:", cardID);
        if (this.data.unlockCards.includes(cardID)) {
            this._canSellCard = false;
            try {
                let flag = await this.server.net_sellCard(cardID);
                TipsManager.showTips(
                    flag ? GameConfig.Language.Text_TowerReturn_1.Value : GameConfig.Language.Text_TowerReturn_2.Value
                ); 
                if(flag) UIService.getUI(TowerShopUI).refreshItemsState();
            } catch (error) {
                console.error(`hsf----net_buyCard:${error}`);
            } finally {
                this._canSellCard = true;
            }
        } else TipsManager.showTips(GameConfig.Language.Text_TowerReturn_2.Value);
    }

    /**
     * 买卡牌
     * @param cardID 卡牌ID
     * @returns
     */
    private async buyCard(cardID: number) {
        MGSTool.clickBtn("6");
        if (!this._canBuyCard) {
            TipsManager.showTips(GameConfig.Language.Text_TooFase.Value);
            return;
        }
        const cfg = GameConfig.Tower.getElement(cardID);
        let checkFlag = ModuleService.getModule(PlayerModuleC).checkGold(cfg.shopPrice);
        if (checkFlag && !this.data.unlockCards.includes(cardID)) {
            this._canBuyCard = false;
            try {
                let flag = await this.server.net_buyCard(cardID);
                if (flag) {
                    TipsManager.showTips(GameConfig.Language.Text_BuyAndEquip.Value);
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
            !checkFlag && TweenCommon.goldFailedShow(UIService.getUI(LobbyUI).goldTxt);
            TipsManager.showTips(
                !checkFlag ? GameConfig.Language.Text_Less_1.Value : GameConfig.Language.Text_CardIsUnlock.Value
            );
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
    protected onDestroy(): void {}
}
