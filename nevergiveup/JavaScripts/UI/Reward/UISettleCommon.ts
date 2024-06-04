/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-05-10 13:50:10
 * @LastEditors  : bao.zhang bao.zhang@appshahe.com
 * @LastEditTime : 2023-06-25 17:22:11
 * @FilePath     : \stumbleguys\JavaScripts\modules\quest\ui\UISettleCommon.ts
 * @Description  : 修改描述
 */

import Utils from "../../Utils";
import { ZwtTween } from "../../ZwtTween";
import { GameConfig } from "../../config/GameConfig";
import { RewardUIInfo } from "../../tool/Reward";
import SettleCommon_Generate from "../../ui-generate/Reward/SettleCommon_generate";
import { UICommonItem } from "./UICommonItem";

/**
 * 结算奖励，用于展示的UI
 */
export class UISettleCommon extends SettleCommon_Generate {
    /** 回调，在关闭时会执行 */
    private _callBack: Function;
    /** 通用奖励的UI数组 */
    private _commonItems: UICommonItem[] = [];
    /** canvas的大小 */
    private _canvasSize: mw.Vector2;

    /**
     * 初始化UI，并给一些按钮添加点击事件
     */
    onAwake() {
        this.layer = mw.UILayerSystem;
        this.enUI_1.imageGuid = GameConfig.Language.getElement("Img_Reward").Value;
        this.btnScreen.onClicked.add(() => {
            // this._callBack && this._callBack();
            new ZwtTween(this.rootCanvas)
                .UIOpacityTo(0, 0.2, mw.TweenUtil.Easing.Linear.None, true)
                .scaleTo(new Vector(1.1), 0.15, false)
                .scaleTo(Vector.one, 0.15, false)
                .call(() => {
                    mw.UIService.hideUI(this);
                })
                .start()
        });

        // for (let i = 0; i < 5; i++) {
        //     let item = mw.UIService.create(UICommonItem);
        //     this._commonItems.push(item);
        //     this.mCommon.addChild(item.uiObject);
        // }
        this.mCommon.visibility = mw.SlateVisibility.Collapsed;
        this.rewardText1.visibility = mw.SlateVisibility.Collapsed;
        this.rewardText2.visibility = mw.SlateVisibility.Collapsed;
        this._canvasSize = this.mCommon.size;
    }

    /**
     * 隐藏，如果有回调，就执行回调
     */
    onHide() {
        if (this._callBack) {
            this._callBack();
        }
    }

    /**
     * 在显示时被调用
     * @param callBack 在隐藏后执行的回调
     * @param rewards 奖励数组
     */
    onShow(callBack: Function, rewards: RewardUIInfo[]) {
        this.rewardText1.visibility = mw.SlateVisibility.Collapsed;
        this.rewardText2.visibility = mw.SlateVisibility.Collapsed;
        // merge rewards by guid
        let mergeRewards: RewardUIInfo[] = [];
        for (let i = 0; i < rewards.length; i++) {
            let reward = rewards[i];
            // if (reward.isHave) {
            //     this.rewardText1.visibility = mw.SlateVisibility.Visible;
            //     // this.rewardText2.visibility = mw.SlateVisibility.Visible;
            // }
            let find = false;
            for (let j = 0; j < mergeRewards.length; j++) {
                let mergeReward = mergeRewards[j];
                if (mergeReward.guid == reward.guid) {
                    mergeReward.count += reward.count;
                    find = true;
                    break;
                }
            }
            if (!find) {
                mergeRewards.push(reward);
            }
        }


        this._callBack = callBack;
        this.btnScreen.visibility = mw.SlateVisibility.Visible;
        this.rootCanvas.renderOpacity = 0;
        new ZwtTween(this.rootCanvas)
            .UIOpacityTo(1, 0.2, mw.TweenUtil.Easing.Linear.None, true)
            .scaleTo(new Vector(1.1), 0.15, false)
            .scaleTo(Vector.one, 0.15, false)
            .start();

        // let canvasSize = mw.getViewportSize();
        // let canvasSize = mw.getViewportSize().divide(mw.getViewportScale());
        // console.log('hsfgetViewportSize====================== ', mw.getViewportScale(), mw.getViewportSize(), JSON.stringify(canvasSize))
        // x denpens on the number of items, if there are 1 item, put it in the middle of the canvas
        // middle of the canvas is canvasSize / 2

        this.mCommon.visibility = mw.SlateVisibility.Visible;
        for (let i = this._commonItems.length - 1; i < mergeRewards.length; i++) {//弹性扩容
            let item = mw.UIService.create(UICommonItem);
            this._commonItems.push(item);
            this.mCommon.addChild(item.uiObject);
        }
        for (let i = 0; i < this._commonItems.length; i++) {
            this._commonItems[i].uiObject.visibility = mw.SlateVisibility.Collapsed;
        }

        let itemWidth = 180.114;
        let padding = 20;
        for (let i = 0; i < mergeRewards.length; i++) {
            if (this._commonItems[i]) {
                this._commonItems[i].init(mergeRewards[i]);
                // x denpens on the number of items, if there are 1 item, put it in the middle of the canvas
                // middle of the canvas is canvasSize / 2
                if (mergeRewards.length > 10) {
                    this._commonItems[i].uiObject.position = Utils.TEMP_VECTOR2.set((itemWidth + padding) * i - padding, 0);
                } else {
                    this._commonItems[i].uiObject.position = Utils.TEMP_VECTOR2.set((i - (mergeRewards.length - 1) / 2) * (itemWidth + padding) + this._canvasSize.x / 2 - itemWidth / 2, 0);
                }
                this._commonItems[i].uiObject.visibility = mw.SlateVisibility.Visible;
            }
        }
        if (mergeRewards.length > 10) {
            this.mCommon.size = Utils.TEMP_VECTOR2.set(padding + (itemWidth + padding) * mergeRewards.length, 0);
        } else {
            this.mCommon.size = this._canvasSize;
        }
    }
}