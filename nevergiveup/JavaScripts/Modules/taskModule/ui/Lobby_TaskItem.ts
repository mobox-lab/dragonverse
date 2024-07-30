/*
 * @Author: shifu.huang
 * @Date: 2023-12-29 17:25:11
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-29 11:04:28
 * @FilePath: \nevergiveup\nevergiveup\JavaScripts\Modules\taskModule\ui\Lobby_TaskItem.ts
 * @Description: 修改描述
 */

/** 
 * AUTHOR: 泪染倾城（找闺）
 * TIME: 2023.11.12-10.43.36
 * ATTENTION: Functions such as onStart cannot be executed asynchronously. 
 * 	If you need to use asynchronous logic, please encapsulate a function and use it internally through its interface.
 */

import LobbyUI from "../../../UI/LobbyUI";
import Utils from "../../../Utils";
import { GameConfig } from "../../../config/GameConfig";
import Lobby_Taskitem_Generate from "../../../ui-generate/task/Lobby_Taskitem_generate";
import { Task } from "../Task";
import { EmTaskState } from "../TaskModuleC";
import UI_TaskMain from "./UI_TaskMain";

/**
 * 主面板中左侧展示的任务UI
 */
export default class Lobby_TaskItem extends Lobby_Taskitem_Generate {
    /**
     * 获取点击的按钮
     */
    get clickObj(): mw.StaleButton {
        return null;
    }

    /**
     * 设置选中状态
     * @param bool 是否选中
     */
    setSelect(bool: boolean): void {

    }
    /** 
     * The function is called once during the game for non-template instances
     */
    protected onStart() {
        //can control onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
        this.mButton_OpenUI.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mButton_OpenUI.onClicked.add(() => {
            UIService.getUI(LobbyUI).taskBtn.onClicked.broadcast();
        })
    }

    /**
     * 设置这个UI对应的任务信息
     * @param data 任务的数据
     */
    setData(data: Task): void {
        if (data == null || data.taskID == null) return;
        let cfg = GameConfig.Task.getElement(data.taskID);
        // this.mTextBlock_TaskName.text = StringUtil.format(cfg.taskName, data.totalSolveTime);
        this.mTextBlock_TaskName.text = data.taskNameUI;
        this.mTextBlock_TaskContent.text = data.taskInfoUI;
        // this.mTextBlock_TaskContent.text = StringUtil.format(cfg.taskInfo, data.totalSolveTime);
        if (data.taskState == EmTaskState.Reward) {
            this.mTextBlock_TaskSchedule.visibility = SlateVisibility.Collapsed;
            this.mTextBlock_Finish.visibility = SlateVisibility.Visible;
        } else if (data.taskState == EmTaskState.Doing) {
            this.mTextBlock_Finish.visibility = SlateVisibility.Collapsed;
            this.mTextBlock_TaskSchedule.visibility = SlateVisibility.Visible;
            this.mTextBlock_TaskSchedule.text = Utils.formatNumber(data.curSolveTime) + "/" + Utils.formatNumber(data.totalSolveTime);
        }
    }

}
