/*
 * @Author: 
 * @Date: 2022-12-12 11:37:34
 * @LastEditTime: 2024-01-11 11:00:41
 * @Description: Avatar Creator Development
 */
import Gtk from "gtoolkit";
import { PlayerActions } from "../../../Actions";
import { TweenCommon } from "../../../TweenCommon";
import Utils from "../../../Utils";
import { GameConfig } from "../../../config/GameConfig";
import KeyOperationManager from "../../../controller/key-operation-manager/KeyOperationManager";
import { MGSTool } from "../../../tool/MGSTool";
import { UIMultiScroller } from "../../../tool/UIMultiScroller";
import TaskMain_Generate from "../../../ui-generate/task/TaskMain_generate";
import { PlayerUtil } from "../../PlayerModule/PlayerUtil";
import { Task } from "../Task";
// import UIMultiScroller from "../../../utils/SuperScrollView";
import { EmTaskType, TaskModuleC } from '../TaskModuleC';
import UI_TaskItem from "./UI_TaskItem";


/**
 * 任务列表展示的UI
 */
export default class UI_TaskMain extends TaskMain_Generate {
    /**滚动任务列表 */
    private _scrollTask: UIMultiScroller = null;
    private _btnState: EmTaskType = EmTaskType.Main;
    private _isLockDaily: boolean = false;
    public set isLockDaily(v: boolean) {
        this._isLockDaily = v;
        // this.mainTaskCanvas.position = this._isLockDaily ? this._btnPos[0] : this._btnPos[1];
        // this.dailyTaskCanvas.position = this._isLockDaily ? this._btnPos[1] : this._btnPos[0];
    }
    public get btnState(): EmTaskType {
        return this._btnState;
    }
    public set btnState(newState: EmTaskType) {
        this._btnState = newState;
        const tasks = ModuleService.getModule(TaskModuleC).getTasksByType(newState);
        this.taskSetData(tasks);
        const newStateIsDaily = newState === EmTaskType.Daily;
        this.mainTaskBtn.enable = newStateIsDaily;
        this.text_Task.setFontColorByHex(newStateIsDaily ? "#F0CC9C" : "#FFFFFF");

        this.dailyTaskBtn.enable = !newStateIsDaily;
        this.text_dailyTask.setFontColorByHex(newStateIsDaily ? "#FFFFFF" : "#F0CC9C");
        Gtk.trySetVisibility(this.taskCountdown, newState === EmTaskType.Daily ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.taskCountdownTime, newState === EmTaskType.Daily ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed);
    }

    private _btnPos: Vector2[];

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.layer = mw.UILayerTop;
        // this._btnPos = [this.mainTaskCanvas.position.clone(), this.dailyTaskCanvas.position.clone()];
        this.isLockDaily = PlayerUtil.getPlayerScript(Player.localPlayer.playerId)?.level < GameConfig.Global.getElement(1).unlockDailyTask;
        PlayerActions.onPlayerLevelChangedClient.add(() => {
            let level = PlayerUtil.getPlayerScript(Player.localPlayer.playerId)?.level;
            this.isLockDaily = level < GameConfig.Global.getElement(1).unlockDailyTask;
        })
        this._scrollTask = new UIMultiScroller(	//初始化动作滑动框
            this.scroll_Task,
            this.content,
            UI_TaskItem,
            1, 0, 0, 700, 130, 5, 0, 10);
        this.btn_Close.onClicked.add(() => {
            TweenCommon.popUpHide(this.rootCanvas, () => {
                UIService.hideUI(this);
            })
        })
        this.btn_Esc.onClicked.add(() => {
            TweenCommon.popUpHide(this.rootCanvas, () => {
                UIService.hideUI(this);
            })
        })
        this.mainTaskBtn.onClicked.add(() => {
            this.btnState = EmTaskType.Main;
        });
        this.dailyTaskBtn.onClicked.add(() => {
            if (Utils.checkLevel(GameConfig.Global.getElement(1).unlockDailyTask)) {
                this.btnState = EmTaskType.Daily;
            }
        });
    }

    /**
     * 设置uidata
     * @param tasks 任务数组
     */
    private taskSetData(tasks: Task[]) {
        //sort task by state 1. reward 2. doing 3.NoAccept 4.finish
        this._scrollTask.setData(tasks.sort((a, b) => a.taskState - b.taskState));
    }

    /**
     * 刷新页面
     * @param showSame 是否展示原先的界面，默认是展示日常，未解锁展示主线
     */
    public refresh(showSame: boolean = false) {
        if (showSame) {
            this.btnState = this._btnState;
        } else {
            this.btnState = this._isLockDaily ? EmTaskType.Main : EmTaskType.Daily;
        }
    }


    /**
     * 显示该UI时调用，发送埋点
     */
    onShow() {
        TweenCommon.popUpShow(this.rootCanvas);
        const module = ModuleService.getModule(TaskModuleC);
        if (module.task.size <= 0) {
            UIService.hideUI(this);
        } else {
            this.refresh();
        }
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            TweenCommon.popUpHide(this.rootCanvas, () => {
                UIService.hideUI(this);
            })
        });
    }
    onHide() {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }
}