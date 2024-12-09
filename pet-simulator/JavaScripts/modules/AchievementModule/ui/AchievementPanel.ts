/**
 * AUTHOR: 穿迷彩服的鲨鱼
 * TIME: 2023.07.04-17.51.54
 */

import Gtk from "gtoolkit";
import {ObjectPoolServices} from "../../../Tools/ObjectPool";
import {IAchievementsElement} from "../../../config/Achievements";
import {GameConfig} from "../../../config/GameConfig";
import {GlobalData} from "../../../const/GlobalData";
import KeyOperationManager from "../../../controller/key-operation-manager/KeyOperationManager";
import AchievementMain_Generate from "../../../ui-generate/Achievement/AchievementMain_generate";
import {oTraceError} from "../../../util/LogManager";
import {utils} from "../../../util/uitls";
import {Achievement, AchievementNew} from "../AchievementData";
import AchievementModuleC, {CoinType} from "../AchievementModuleC";

export default class AchievementPanel extends AchievementMain_Generate {
    private achievementModuleC: AchievementModuleC = null;

    private mContentCanvasSizeX: number = 0;

    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    protected onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initDatas();
        this.bindButtons();
    }

    private initDatas(): void {
        this.achievementModuleC = ModuleService.getModule(AchievementModuleC);
        this.mContentCanvasSizeX = this.mContentCanvas.size.x;
    }

    /**按钮绑定 */
    private bindButtons(): void {
        this.mCloseButton.onClicked.add(() => {
            this.hide();
        });

    }

    protected onShow(...params: any[]): void {
        oTraceError("[AchievementPanel--onShow]");
        this.updatePanelData();
        utils.showUITween(this);
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            this.hide();
        });
    }

    protected onHide(): void {
        oTraceError("[AchievementPanel--onHide]");
        this.recycleAchievementItems();
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }

    private achievementItems: AchievementItem[] = [];

    /**更新面板数据 */
    private updatePanelData() {
        this.currentItemIndex = 0;
        this.mScrollBox.scrollOffset = 0;
        this.mContentCanvas.position = mw.Vector2.zero;
        this.mContentCanvas.size = new mw.Vector(this.mContentCanvasSizeX, 0);

        let achievementGradeMap = this.achievementModuleC.getAchievementGradeMap();
        let onCompleteAchievement: AchievementNew[] = [];
        for (let [key, value] of achievementGradeMap) {
            for (let i = 0; i < value.length; ++i) {
                if (value[i].o) {
                    onCompleteAchievement.push(value[i]);
                    continue;
                }
                this.sapwnAchievementItems(value[i]);
            }
        }
        for (let i = 0; i < onCompleteAchievement.length; ++i) {
            this.sapwnAchievementItems(onCompleteAchievement[i]);
        }
        this.mContentCanvas.size = new mw.Vector(this.mContentCanvasSizeX,
            this.currentItemIndex * GlobalData.Achievement.itemPositionInterval);
        oTraceError("[this.currentItemIndex] = ", this.currentItemIndex);
    }

    /**生成成就Item */
    private sapwnAchievementItems(achievement: AchievementNew): void {
        let achievementItem = ObjectPoolServices.getPool(AchievementItem).spawn();
        achievementItem.initAchievementItemData(achievement);
        this.mContentCanvas.addChild(achievementItem.achievementItem);
        achievementItem.achievementItem.position = this.getCurrentItemPosition();
        this.achievementItems.push(achievementItem);
    }

    private currentItemIndex: number = 0;

    private getCurrentItemPosition(): mw.Vector2 {
        return new mw.Vector2(0, this.currentItemIndex++ * GlobalData.Achievement.itemPositionInterval);
    }

    /**回收成就item */
    private recycleAchievementItems(): void {
        if (this.achievementItems.length <= 0) return;
        for (let i = 0; i < this.achievementItems.length; ++i) {
            this.achievementItems[i].recycle();
            this.mRecycleCanvas.addChild(this.achievementItems[i].achievementItem);
        }
        this.achievementItems.length = 0;
    }
}

/**二级背包列表 */
class AchievementItem {
    public achievementItem: mw.UserWidgetPrefab;

    /**内容介绍 */
    public mText_AMdetial: mw.TextBlock = undefined;
    /**奖励数量 */
    public mText_Award: mw.TextBlock = undefined;
    /**奖励数量2 */
    public mText_Award2: mw.TextBlock = undefined;
    /**奖励图标类型 */
    public mImage_AwardType: mw.Image = undefined;
    /**奖励图标类型2 */
    public mImage_AwardType2: mw.Image = undefined;
    /**背景 */
    public mImage_GradeBG: mw.Image = undefined;
    /**进度条 */
    public mProgressBar: mw.ProgressBar = undefined;
    /**难易程度类型 */
    public mText_Grade: mw.TextBlock = undefined;
    /**当前任务名字 */
    public mText_AMname: mw.TextBlock = undefined;
    /**下一个任务显示的Canvas */
    public mCanvas_Pointto: mw.Canvas = undefined;
    /**下一个任务的名字 */
    public mText_NextLevel: mw.TextBlock = undefined;
    /**指向下一个任务的箭头 */
    public mImage_Point: mw.Image = undefined;
    /**进度百分比 */
    public mText_lording: mw.TextBlock = undefined;

    /**生成Item */
    constructor() {
        this.achievementItem = mw.createUIByName("Achievement/AchievementItem");

        this.mText_AMdetial = this.achievementItem.findChildByPath("RootCanvas/Canvas/DetailCanvas/mText_AMdetial") as mw.TextBlock;
        this.mText_Award = this.achievementItem.findChildByPath("RootCanvas/Canvas/DetailCanvas/mText_Award") as mw.TextBlock;
        this.mText_Award2 = this.achievementItem.findChildByPath("RootCanvas/Canvas/DetailCanvas/mText_Award2") as mw.TextBlock;
        this.mText_Grade = this.achievementItem.findChildByPath("RootCanvas/Canvas/mText_Grade") as mw.TextBlock;
        this.mText_AMname = this.achievementItem.findChildByPath("RootCanvas/Canvas/mText_AMname") as mw.TextBlock;
        this.mCanvas_Pointto = this.achievementItem.findChildByPath("RootCanvas/Canvas/mCanvas_Pointto") as mw.Canvas;
        this.mText_NextLevel = this.achievementItem.findChildByPath("RootCanvas/Canvas/mCanvas_Pointto/mText_NextLevel") as mw.TextBlock;
        this.mImage_Point = this.achievementItem.findChildByPath("RootCanvas/Canvas/mCanvas_Pointto/mImage_Point") as mw.Image;
        this.mText_lording = this.achievementItem.findChildByPath("RootCanvas/Canvas/mText_lording") as mw.TextBlock;
        this.mImage_AwardType = this.achievementItem.findChildByPath("RootCanvas/Canvas/DetailCanvas/mImage_AwardType") as mw.Image;
        this.mImage_AwardType2 = this.achievementItem.findChildByPath("RootCanvas/Canvas/DetailCanvas/mImage_AwardType2") as mw.Image;
        this.mImage_GradeBG = this.achievementItem.findChildByPath("RootCanvas/Canvas/mImage_GradeBG") as mw.Image;
        this.mProgressBar = this.achievementItem.findChildByPath("RootCanvas/Canvas/mProgressBar") as mw.ProgressBar;
    }

    /**填充item数据 */
    public initAchievementItemData(achievement: AchievementNew): void {
        let achievementsElement = GameConfig.Achievements.getElement(achievement.i);
        this.mText_AMdetial.text = utils.Format(achievementsElement.AMdetail, achievementsElement.TragetNum);
        this.updateRewardTextImage(achievementsElement);
        let gradeType = (achievement.o) ? GradeType.Complete : achievementsElement.Grade;
        this.updateGradeBGColorAndText(gradeType);
        this.updateAchievementProgressAndName(achievement, achievementsElement);
    }

    /**更新奖励的Image和Text */
    private updateRewardTextImage(achievementsElement: IAchievementsElement): void {
        let rewardicon: string = "";
        let rewardAmount: string = "1";
        if (achievementsElement.CoinType) {
            switch (achievementsElement.CoinType) {
                case CoinType.FirstWorld:
                    rewardicon = GlobalData.Achievement.firstWorldCoinImageIcon;
                    break;
                case CoinType.SecondWorld:
                    rewardicon = GlobalData.Achievement.secondWorldCoinImageIcon;
                    break;
                case CoinType.ThirdWorld:
                    rewardicon = GlobalData.Achievement.thirdWorldCoinImageIcon;
                    break;
                default:
                    break;
            }
            rewardAmount = achievementsElement.CoinAward.toString();
        } else if (achievementsElement.DMAward) {
            rewardicon = GlobalData.Achievement.diamondImageIcon;
            rewardAmount = achievementsElement.DMAward.toString();
        } else if (achievementsElement.BagAward) {
            rewardicon = GlobalData.Achievement.knapsackImageIcon;
            rewardAmount = achievementsElement.BagAward.toString();
        } else if (achievementsElement.PetAward) {
            rewardicon = GlobalData.Achievement.petImageIcon;
        }
        this.mText_Award.text = rewardAmount;
        this.mImage_AwardType.imageGuid = rewardicon;

        if(achievementsElement?.dragonPoints){
            Gtk.trySetVisibility(this.mText_Award2, SlateVisibility.HitTestInvisible);
            Gtk.trySetVisibility(this.mImage_AwardType2, SlateVisibility.HitTestInvisible);
            this.mText_Award2.text = achievementsElement.dragonPoints.toString();
            this.mImage_AwardType2.imageGuid = '480835';
        } else {
            Gtk.trySetVisibility(this.mText_Award2, SlateVisibility.Collapsed);
            Gtk.trySetVisibility(this.mImage_AwardType2, SlateVisibility.Collapsed);
        }
    }

    /**根据难易程度更新背景颜色 */
    private updateGradeBGColorAndText(gradeType: GradeType): void {
        let gradeBGColor: number[] = [];
        let gradeText: string = "";
        switch (gradeType) {
            case GradeType.Easy:
                gradeBGColor = GlobalData.Achievement.easyImageBgColor;
                gradeText = GameConfig.Language.Achievement_Grade_1.Value;
                break;
            case GradeType.Simple:
                gradeBGColor = GlobalData.Achievement.simpleImageBgColor;
                gradeText = GameConfig.Language.Achievement_Grade_2.Value;
                break;
            case GradeType.Medium:
                gradeBGColor = GlobalData.Achievement.mediumImageBgColor;
                gradeText = GameConfig.Language.Achievement_Grade_3.Value;
                break;
            case GradeType.Difficult:
                gradeBGColor = GlobalData.Achievement.difficultImageBgColor;
                gradeText = GameConfig.Language.Achievement_Grade_4.Value;
                break;
            case GradeType.Crazy:
                gradeBGColor = GlobalData.Achievement.crazyImageBgColor;
                gradeText = GameConfig.Language.Achievement_Grade_5.Value;
                break;
            case GradeType.Complete:
                gradeBGColor = GlobalData.Achievement.completeImageBgColor;
                gradeText = GameConfig.Language.Achievement_UIname_2.Value;
                break;
            default:
                break;
        }
        this.mImage_GradeBG.setImageColorDecimal(gradeBGColor[0], gradeBGColor[1], gradeBGColor[2], gradeBGColor[3]);
        this.mText_Grade.text = gradeText;
    }

    /**更新进度条和成就名字 */
    private updateAchievementProgressAndName(achievement: AchievementNew, achievementsElement: IAchievementsElement): void {
        if (achievement.o) {
            this.mProgressBar.visibility = mw.SlateVisibility.Collapsed;
            this.mText_lording.visibility = mw.SlateVisibility.Collapsed;
            this.mCanvas_Pointto.visibility = mw.SlateVisibility.Collapsed;

            this.mText_AMname.text = achievementsElement.Name;
        } else {
            this.mProgressBar.visibility = mw.SlateVisibility.HitTestInvisible;
            this.mText_lording.visibility = mw.SlateVisibility.SelfHitTestInvisible;

            let currentValue = 0;
            if (achievementsElement.TragetNum == 0) {
                currentValue = 0;
            } else {
                currentValue = achievement.p / achievementsElement.TragetNum;
            }
            this.mProgressBar.currentValue = currentValue;
            this.mText_lording.text = Math.round(currentValue * 100) + "%";
            this.mText_AMname.text = achievementsElement.Name;
            if (achievementsElement.NextId) {
                this.mText_NextLevel.text = GameConfig.Achievements.getElement(achievementsElement.NextId).Name;
                this.mCanvas_Pointto.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            } else {
                this.mCanvas_Pointto.visibility = mw.SlateVisibility.Collapsed;
            }
        }
    }

    /**回收 */
    public recycle(): void {
        ObjectPoolServices.getPool(AchievementItem).return(this);
    }
}

export enum GradeType {
    /**容易 */
    Easy = 1,
    /**简单 */
    Simple = 2,
    /**中等 */
    Medium = 3,
    /**困难 */
    Difficult = 4,
    /**疯狂 */
    Crazy = 5,
    /**已完成 */
    Complete = 6,
}