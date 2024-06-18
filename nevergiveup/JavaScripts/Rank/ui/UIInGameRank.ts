/*
 * @Author: shifu.huang
 * @Date: 2023-12-26 16:56:00
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-21 17:30:52
 * @FilePath: \nevergiveup\JavaScripts\Rank\ui\UIInGameRank.ts
 * @Description: 修改描述
 */
import { StageActions } from "../../Actions";
import Utils from "../../Utils";
import { MGSTool } from "../../tool/MGSTool";
import RankContainerUI_Generate from "../../ui-generate/Rank/RankContainerUI_generate";
import RankItemTitle_Generate from "../../ui-generate/Rank/RankItemTitle_generate";
import RankItem_Generate from "../../ui-generate/Rank/RankItem_generate";
import { RankItem } from "../RankManager";
import { GameConfig } from '../../config/GameConfig';

export class UIInGameRankItem extends RankItem_Generate {

}

export class UIInGameRankItemTitle extends RankItemTitle_Generate {

}

export class UIInGameRank extends RankContainerUI_Generate {
    rankItemHeading: UIInGameRankItemTitle;
    rankItemUIs: UIInGameRankItem[] = [];
    rankData: RankItem[] = [];
    shouldShow: boolean = true;
    onStart() {
        this.layer = UILayerTop;

        StageActions.onStageCreated.add(() => {
            this.rankData = [];
            UIService.show(UIInGameRank);
        });

        StageActions.onStageEndClient.add(() => {
            this.rankData = [];
            UIService.hide(UIInGameRank);
        });
    }

    updateRankItems(rankItems: RankItem[]) {
        rankItems.sort((a, b) => b.damage - a.damage);
        this.rankData = rankItems;
        this.updateUIRankItemUIs();
    }

    updateUIRankItemUI(index: number) {
        if (this.rankData.length > index) {
            let rankItem: UIInGameRankItem;
            if (this.rankItemUIs.length > index) {
                rankItem = this.rankItemUIs[index];
            }
            else {
                rankItem = UIService.create(UIInGameRankItem);
                this.rankItemUIs.push(rankItem);
                this.mRankCanvas.addChild(rankItem.uiObject);
            }
            if (this.rankData[index].userId == Player.localPlayer.userId) {
                rankItem.bg.renderOpacity = 0;
                rankItem.mName.setFontColorByHex("#63FF00");
                rankItem.mGold.setFontColorByHex("#63FF00");
                rankItem.mDamage.setFontColorByHex("#63FF00");
            }
            else {
                rankItem.bg.renderOpacity = 0;
                rankItem.mName.fontColor = new LinearColor(1, 1, 1);
                rankItem.mGold.fontColor = new LinearColor(1, 1, 1);
                rankItem.mDamage.fontColor = new LinearColor(1, 1, 1);
            }
            rankItem.mName.text = Utils.truncateString(this.rankData[index].name, 13);
            rankItem.mGold.text = this.rankData[index].gold.toFixed(0);
            rankItem.mDamage.text = this.rankData[index].damage.toFixed(0);
        }
    }

    initUIRankTitle() {
        if (!this.rankItemHeading) {
            this.rankItemHeading = UIService.create(UIInGameRankItemTitle);
            this.mRankCanvas.addChild(this.rankItemHeading.uiObject);
            this.rankItemHeading.mName.text = GameConfig.Language.getElement("Text_Name").Value;
            this.rankItemHeading.mGold.text = GameConfig.Language.getElement("Text_Gold").Value;
            this.rankItemHeading.mDamage.text = GameConfig.Language.getElement("Text_Damage").Value;
            this.rankItemHeading.mCollapseBtn.onClicked.add(() => {
                this.shouldShow = !this.shouldShow;
                this.setRankVisibility(this.shouldShow);
                !this.shouldShow && MGSTool.clickBtn("11");
            });
        }
    }

    updateUIRankItemUIs() {
        this.initUIRankTitle();
        for (let i = 0; i < this.rankData.length; i++) {
            this.updateUIRankItemUI(i);
        }
        this.setRankVisibility(this.shouldShow);
    }


    setRankVisibility(visible: boolean) {
        this.rankItemHeading.mCollapseBtn.renderTransformAngle = visible ? 0 : 180;
        for (let i = 0; i < this.rankData.length; i++) {
            this.rankItemUIs[i].setVisible(visible);
        }
        for (let i = this.rankData.length; i < this.rankItemUIs.length; i++) {
            this.rankItemUIs[i].setVisible(false);
        }
    }


    onShow() {
        this.shouldShow = true;
        this.updateUIRankItemUIs();
    }
}