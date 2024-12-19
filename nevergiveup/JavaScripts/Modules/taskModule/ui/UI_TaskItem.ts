/*
 * @Author: shifu.huang
 * @Date: 2022-12-12 11:37:45
 * @LastEditTime: 2024-01-10 13:43:34
 * @Description: Avatar Creator Development
 */

import { GuideManager } from "../../../Guide/GuideManager";
import { TipsManager } from "../../../UI/Tips/CommonTipsManagerUI";
import Utils from "../../../Utils";
import { GameConfig } from "../../../config/GameConfig";
import { ItemType } from "../../../tool/Enum";
import { Reward } from "../../../tool/Reward";
import { IItemRender } from "../../../tool/UIMultiScroller";
import TaskItem_Generate from "../../../ui-generate/task/TaskItem_generate";
import { Task } from "../Task";
import { EmTaskState, TaskModuleC } from "../TaskModuleC";

/**
 * 任务项的UI，用于展示
 */
export default class UI_TaskItem extends TaskItem_Generate implements IItemRender {
    /**任务数据 */
    private _taskData: Task;

    /**
     * 获取点击的btnReward
     */
    get clickObj(): mw.StaleButton {
        return this.btnReward;
    }

    /**
     * 设置选中
     * @param bool 是否选中
     */
    setSelect(bool: boolean): void {}

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.btnLock.touchMethod = ButtonTouchMethod.PreciseTap;
        this.btnReward.touchMethod = ButtonTouchMethod.PreciseTap;
        this.btnReward.onClicked.add(async () => {
            await ModuleService.getModule(TaskModuleC).taskFinishAction(this._taskData);
        });
        // this.btnDoing.onClicked.add(() => {
        //     GuideManager.guideToTask(this._taskData.taskID);
        //     // TipsManager.showTips(GameConfig.Language.getElement("Text_NoFinishTaskTips").Value);
        // })
        this.btnLock.onClicked.add(() => {
            TipsManager.showTips(GameConfig.Language.getElement("Text_TaskLock").Value);
        });
    }

    /**
     * 设置ui的任务data
     * @param data 任务数据
     * @returns
     */
    setData(data: Task): void {
        if (data == null || data.taskID == null) return;
        this._taskData = data;
        let cfg = GameConfig.Task.getElement(data.taskID);
        // this.txt_Name.text = StringUtil.format(cfg.taskName, data.totalSolveTime);
        this.txt_Name.text = data.taskNameUI;
        this.txt_Des.text = data.taskInfoUI;
        // this.txt_Des.text = StringUtil.format(cfg.taskInfo, data.totalSolveTime);
        this.txt_Process.text = Utils.formatNumber(data.curSolveTime) + "/" + Utils.formatNumber(data.totalSolveTime);
        const percent = data?.totalSolveTime ? (data?.curSolveTime ?? 0) / data.totalSolveTime : 0;
        this.progressBar.percent = percent;
        this.progressBar.currentValue = percent;
        switch (data.taskState) {
            case EmTaskState.Doing:
                this.btnReward.visibility = mw.SlateVisibility.Hidden;
                this.txt_doing.visibility = mw.SlateVisibility.Visible;
                break;
            case EmTaskState.Reward:
                this.btnReward.visibility = mw.SlateVisibility.Visible;
                this.txt_doing.visibility = mw.SlateVisibility.Hidden;
                break;
            default:
                this.btnReward.visibility = mw.SlateVisibility.Hidden;
                this.txt_doing.visibility = mw.SlateVisibility.Visible;
                break;
        }
        this.setReward(data);
        let keys = Object.values(EmTaskState).filter((key) => isNaN(Number(key)));
        for (let i = 0; i < keys.length; i++) {
            this["canvas" + keys[i]].visibility =
                EmTaskState[keys[i]] == data.taskState ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
        }
        // if (data.isMain && (data.taskState == EmTaskState.Doing || data.taskState == EmTaskState.Reward)) {
        //     mw.UIService.getUI(MainUI).setMainTask(data);
        // }
    }

    /**
     * 设置奖励UI
     * @param data 任务对象
     */
    private setReward(data: Task) {
        this.mCanvas_reward1.visibility = mw.SlateVisibility.Collapsed;
        this.mCanvas_reward2.visibility = mw.SlateVisibility.Collapsed;
        this.mCanvas_reward3.visibility = mw.SlateVisibility.Collapsed;
        this.mCanvas_reward4.visibility = mw.SlateVisibility.Collapsed;
        if (data.cfg) {
            if (data.cfg.dragonPoints) {
                this.mCanvas_reward4.visibility = mw.SlateVisibility.Visible;
                this.txt_num4.text = data.cfg.dragonPoints.toString();
            }
            data.cfg.rewards?.forEach((i, index) => {
                if (index < 3) {
                    const reward = GameConfig.Item.getElement(i[0]);
                    if (reward) {
                        //开始设置奖励UI
                        this[`mCanvas_reward${index + 1}`].visibility = mw.SlateVisibility.Visible;
                        this[`txt_num${index + 1}`].text = i[1];
                        if (reward.itemType == ItemType.Card) {
                            //塔的图标额外处理
                            const cfg = GameConfig.Tower.getElement(reward.itemTypeid);
                            if (cfg) {
                                Utils.setImageByAsset(this[`img_Icon${index + 1}`], cfg);
                            }
                            // this[`img_Bg${index + 1}`].imageGuid = Reward.getGuid(reward.itemLevel);
                        } else {
                            this[`img_Icon${index + 1}`].imageGuid = reward.itemImgGuid;
                            // this[`img_Bg${index + 1}`].imageGuid = Reward.getGuid(reward.itemLevel);
                        }
                    } else {
                        console.log("hsf=======UI显示找不到奖励=============== ", JSON.stringify(i[0]));
                    }
                }
            });
        }
    }
}
