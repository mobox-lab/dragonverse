/*
 * @Author: shifu.huang
 * @Date: 2023-07-31 15:40:02
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-07 11:08:07
 * @FilePath: \nevergiveup\JavaScripts\UI\Reward\UICommonItem.ts
 * @Description: 修改描述
 */

import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { Reward, RewardUIInfo } from "../../tool/Reward";
import CommonItem_Generate from "../../ui-generate/Reward/CommonItem_generate";

/**
 * 通用奖励icon
 */
export class UICommonItem extends CommonItem_Generate {
    /**
     * 初始化奖励icon
     * @param info 奖励信息
     */
    init(info: RewardUIInfo) {
        //背景图片根据等级更换
        if (info.assetID) {
            const cfg = GameConfig.Tower.getElement(info.assetID);
            if (cfg) {
                Utils.setImageByAsset(this.mImg_common, cfg);
            }
        } else {
            this.mImg_common.imageGuid = info.guid.toFixed();
        }
        this.mImageBack.imageGuid = Reward.getGuid(info.level);
        this.txt_common.text = Utils.formatNumber(info.count);

    }
}