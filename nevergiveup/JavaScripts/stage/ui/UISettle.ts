/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-18 19:19:36
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-05 18:35:45
 * @FilePath     : \nevergiveup\JavaScripts\stage\ui\UISettle.ts
 * @Description  : 修改描述
 */
import { GameManager } from "../../GameManager";
import { TweenCommon } from "../../TweenCommon";
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { SoundUtil } from "../../tool/SoundUtil";
import SettleRewardItemUI_Generate from "../../ui-generate/Level/SettleRewardItemUI_generate";
import SettleUI_Generate from "../../ui-generate/Level/SettleUI_generate";

export type SettleData = {
    hasWin: boolean;
    isPerfect: boolean;
    isFirst: boolean;
    time: number;
    waves: number;
    wavesMax: number;
    reward: { guid: string; amount: number; type: number }[];
    infinite?: {
        wave: number;
        time: number;
    };
};

export class UISettleRewardItem extends SettleRewardItemUI_Generate {
    setData(item: { guid: string; amount: number; type: number }) {
        if (item.type == 2) {
            Utils.setImageByAssetGuid(this.mRewardItem, item.guid);
            this.mAmount.text = `*${item.amount.toFixed(0)}`;
        } else {
            this.mRewardItem.imageGuid = item.guid;
            this.mAmount.text = `*${item.amount.toFixed(0)}`;
        }
    }
}

export class UISettle extends SettleUI_Generate {
    _rewardItemList: UISettleRewardItem[] = [];
    onStart() {
        this.layer = UILayerDialog;
        this.mBack.onClicked.add(() => {
            this.hideTween();
            SoundUtil.PlaySoundById(2010);
            GameManager.leaveStageClient();
        });
    }

    onShow(settleData: SettleData) {
        this.showTween();
        let result = settleData.hasWin
            ? GameConfig.Language.getElement("Text_Win").Value
            : GameConfig.Language.getElement("Text_Defeat").Value;
        if (settleData.hasWin) {
            if (settleData.isPerfect) {
                result = GameConfig.Language.getElement("Text_Perfect").Value + result;
                this.showSettleImage(0);
            } else {
                this.showSettleImage(1);
            }
            if (settleData.isFirst) {
                result = GameConfig.Language.getElement("Text_First").Value + result;
            }
        } else {
            this.showSettleImage(2);
        }
        const isInfinity = settleData.wavesMax === 9999;

        this.mResultTxt.text = result;
        let min = Math.floor(settleData.time / 60);
        let sec = Math.floor(settleData.time % 60);
        let minStr = min < 10 ? "0" + min : min.toString();
        let secStr = sec < 10 ? "0" + sec : sec.toString();
        if (isInfinity) {
            this.mInfiniteWaves.text =
                GameConfig.Language.getElement("Text_FinishWave").Value +
                `${settleData?.infinite?.wave}` +
                `(${settleData?.infinite?.time}s)`;
            this.mCanvas_ItemDetails.visibility = SlateVisibility.Hidden;
            this.mCanvas_InfiniteDetails.visibility = SlateVisibility.Visible;
        } else {
            this.mTimeTaken.text = GameConfig.Language.getElement("Text_GameTime").Value + `${minStr}:${secStr}`;
            this.mWaves.text =
                GameConfig.Language.getElement("Text_FinishWave").Value +
                `${settleData.waves}/${isInfinity ? "∞" : settleData.wavesMax}`;
            this.mCanvas_ItemDetails.visibility = SlateVisibility.Visible;
            this.mCanvas_InfiniteDetails.visibility = SlateVisibility.Hidden;
        }
        let reward = settleData.reward;
        for (let i = 0; i < reward.length; i++) {
            let item = this._rewardItemList[i];
            if (!item) {
                item = UIService.create(UISettleRewardItem);
                this._rewardItemList[i] = item;
                this.mRewardContainer.addChild(item.uiObject);
            }
            item.setData(reward[i]);
            item.setVisible(true);
        }

        for (let i = reward.length; i < this._rewardItemList.length; i++) {
            this._rewardItemList[i].setVisible(false);
        }
    }

    showTween() {
        TweenCommon.popUpShow(this.rootCanvas);
    }

    hideTween() {
        TweenCommon.popUpHide(this.rootCanvas, () => {
            mw.UIService.hideUI(this);
        });
    }

    showSettleImage(index: number) {
        if (index == 0) {
            // 完胜
            this.canvas_TotalWin.visibility = SlateVisibility.Visible;
            this.canvas_win.visibility = SlateVisibility.Collapsed;
            this.canvas_lose.visibility = SlateVisibility.Collapsed;
            this.mResultTxt.setFontColorByHex("#BAB8EF");
        } else if (index == 1) {
            // 胜利
            this.canvas_TotalWin.visibility = SlateVisibility.Collapsed;
            this.canvas_win.visibility = SlateVisibility.Visible;
            this.canvas_lose.visibility = SlateVisibility.Collapsed;
            this.mResultTxt.setFontColorByHex("#F8C000");
        } else {
            // 失败
            this.canvas_TotalWin.visibility = SlateVisibility.Collapsed;
            this.canvas_win.visibility = SlateVisibility.Collapsed;
            this.canvas_lose.visibility = SlateVisibility.Visible;
            this.mResultTxt.setFontColorByHex("#B8B7B8");
        }
    }
}
