
/** 
 * AUTHOR: 泪染倾城（找闺）
 * TIME: 2023.12.14-14.31.49
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import Gtk from "gtoolkit";
import { PlayerActions } from "../Actions";
import { GameManager } from "../GameManager";
import PlayerModuleC from "../Modules/PlayerModule/PlayerModuleC";
import PlayerModuleData from "../Modules/PlayerModule/PlayerModuleData";
import { PlayerUtil } from "../Modules/PlayerModule/PlayerUtil";
import { Task } from "../Modules/taskModule/Task";
import Lobby_TaskItem from "../Modules/taskModule/ui/Lobby_TaskItem";
import UI_TaskMain from "../Modules/taskModule/ui/UI_TaskMain";
import Utils from "../Utils";
import { GameConfig } from "../config/GameConfig";
import { Yoact } from "../depend/yoact/Yoact";
import { MGSTool } from "../tool/MGSTool";
import { UIMultiScroller } from "../tool/UIMultiScroller";
import LobbyUI_Generate from "../ui-generate/HUD/LobbyUI_generate";
import SettingUI from "./SettingUI";
import TowerUI from "./Tower/TowerUI";
import { EnergyModuleC } from "../Modules/Energy/EnergyModule";
import GameServiceConfig from "../const/GameServiceConfig";
import KeyOperationManager from "../controller/key-operation-manager/KeyOperationManager";

export default class LobbyUI extends LobbyUI_Generate {
	/**任务滑动列表 */
	private _scrollTask: UIMultiScroller;
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		PlayerActions.onPlayerDataChanged.add(() => {
			this.updateCurrency();
			this.updateExp();
		});
		this.cardBtn.onClicked.add(() => {
			UIService.getUI(TowerUI).shopBtn.onClicked.broadcast();
		})
		this.settingBtn.onClicked.add(() => {
			UIService.show(SettingUI);
		})

		this.techTreeBtn.onClicked.add(() => {
			ModuleService.getModule(PlayerModuleC).techTree.show();
		});
		//打开任务
		this.mButton_TaskSmall.onClicked.add(this.showTaskPanel.bind(this))
		this.taskBtn.onClicked.add(this.showTaskPanel.bind(this))
		this.mButton_Taskreturn2.onClicked.add(() => {
			this.mCanvas_NewTaskList.visibility = SlateVisibility.Collapsed;
			this.mButton_Taskexpand.visibility = SlateVisibility.Visible;
			this.mButton_Taskreturn2.visibility = SlateVisibility.Collapsed;
		})
		this.mButton_Taskexpand.onClicked.add(() => {
			this.mCanvas_NewTaskList.visibility = SlateVisibility.SelfHitTestInvisible;
			this.mButton_Taskexpand.visibility = SlateVisibility.Collapsed;
			this.mButton_Taskreturn2.visibility = SlateVisibility.Visible;
		})
        Yoact.bindYoact(() =>
            Gtk.trySetText(this.mStamina_2,
                Math.floor(ModuleService.getModule(EnergyModuleC).viewEnergyLimit.data)
                    .toString()));
        Yoact.bindYoact(() =>
            Gtk.trySetText(this.mStamina,
                (GameServiceConfig.isRelease || GameServiceConfig.isBeta ?
                        Math.floor(ModuleService.getModule(EnergyModuleC).viewEnergy.data) :
                        ModuleService.getModule(EnergyModuleC).viewEnergy.data.toFixed(2)
                ).toString()));
        this.freshBtn.onClicked.add(() => {
            ModuleService.getModule(EnergyModuleC).refreshStaminaLimit();
        });
		
        KeyOperationManager.getInstance().onKeyUp(this, Keys.O, () => {
			UIService.show(SettingUI);
        });
        KeyOperationManager.getInstance().onKeyUp(this, Keys.L, () => {
			this.showTaskPanel();
        });
	}
	public showTaskPanel() {
		Utils.checkLevel(GameConfig.Global.getElement(1).unlockTaskLevel) && mw.UIService.show(UI_TaskMain);
	}
	updateCurrency() {
		let data = DataCenterC.getData(PlayerModuleData);
		if (data) {
			this.goldTxt.text = Utils.formatNumber(DataCenterC.getData(PlayerModuleData).gold);
			this.techPointTxt.text = Utils.formatNumber(DataCenterC.getData(PlayerModuleData).techPoint);
		}
	}

	updateExp() {
		let data = DataCenterC.getData(PlayerModuleData);
		let levels = GameConfig.Level.getAllElement();
		let currentExp = data.exp;
		let level = 1;
		for (let i = 0; i < levels.length; i++) {
			if (currentExp < levels[i].needPower) {
				level = levels[i].id - 1;
				break;
			}
		}

		if (currentExp >= levels[levels.length - 1].needPower) {
			level = levels[levels.length - 1].id;
		}

		let prevLevelExp = level > 1 ? levels[level - 1].needPower : 0;
		let currentLevelExp = currentExp - prevLevelExp;
		let nextLevelExp = levels[level].needPower - prevLevelExp;
		let percent = currentLevelExp / nextLevelExp;
		this.mExpbar.percent = percent;
		this.mExp.text = `${currentLevelExp.toFixed(0)}/${nextLevelExp.toFixed(0)} XP`;
		this.mLevel.text = `Lv. ${level.toFixed(0)}`;
	}

	/**
	 * 数据设置
	 * @param tasks 任务数据
	 */
	taskSetData(tasks: Task[]) {
		for (let i = tasks.length - 1; i >= 0; i--) {
			if (tasks[i] === null) {
				tasks.splice(i, 1);
			}
		}
		UIService.getUI(LobbyUI).mCanvas_TaskAll.visibility = tasks.length <= 0 ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.SelfHitTestInvisible;
		if (tasks.length <= 0) {
			return;
		}
		if (!this._scrollTask) {
			this._scrollTask = new UIMultiScroller(	//初始化动作滑动框
				this.mScrollBox_NewTask,
				this.mCanvas_NewTask,
				Lobby_TaskItem,
				1, 0, 0, 1, 112, 3, 0, 8);
		}
		this._scrollTask.setData(tasks);
	}

	protected onShow() {
        MGSTool.page("main");
		this.updateCurrency();
	}

	/** 
	 * 构造UI文件成功后，onStart之后 
	 * 对于UI的根节点的添加操作，进行调用
	 * 注意：该事件可能会多次调用
	 */
	protected onAdded() {
	}

	/** 
	 * 构造UI文件成功后，onAdded之后
	 * 对于UI的根节点的移除操作，进行调用
	 * 注意：该事件可能会多次调用
	 */
	protected onRemoved() {
	}

	/** 
	* 构造UI文件成功后，UI对象再被销毁时调用 
	* 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
	*/
	protected onDestroy() {
	}

	/**
	* 每一帧调用
	* 通过canUpdate可以开启关闭调用
	* dt 两帧调用的时间差，毫秒
	*/
	//protected onUpdate(dt :number) {
	//}

	/**
	 * 设置显示时触发
	 */
	//protected onShow(...params:any[]) {
	//}

	/**
	 * 设置不显示时触发
	 */
	//protected onHide() {
	//}

	/**
	 * 当这个UI界面是可以接收事件的时候
	 * 手指或则鼠标触发一次Touch时触发
	 * 返回事件是否处理了
	 * 如果处理了，那么这个UI界面可以接收这次Touch后续的Move和End事件
	 * 如果没有处理，那么这个UI界面就无法接收这次Touch后续的Move和End事件
	 */
	//protected onTouchStarted(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent) :mw.EventReply{
	//	return mw.EventReply.unHandled; //mw.EventReply.handled
	//}

	/**
	 * 手指或则鼠标再UI界面上移动时
	 */
	//protected onTouchMoved(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent) :mw.EventReply{
	//	return mw.EventReply.unHandled; //mw.EventReply.handled
	//}

	/**
	 * 手指或则鼠标离开UI界面时
	 */
	//protected onTouchEnded(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent) :mw.EventReply{
	//	return mw.EventReply.unHandled; //mw.EventReply.handled
	//}

	/**
	 * 当在UI界面上调用detectDrag/detectDragIfPressed时触发一次
	 * 可以触发一次拖拽事件的开始生成
	 * 返回一次生成的拖拽事件 newDragDrop可以生成一次事件
	 */
	//protected onDragDetected(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent):mw.DragDropOperation {
	//	return this.newDragDrop(null);
	//}

	/**
	 * 拖拽操作生成事件触发后经过这个UI时触发
	 * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
	 */
	//protected onDragOver(InGeometry :mw.Geometry,InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation):boolean {
	//	return true;
	//}

	/**
	 * 拖拽操作生成事件触发后在这个UI释放完成时
	 * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
	 */
	//protected onDrop(InGeometry :mw.Geometry,InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation):boolean {
	//	return true;
	//}

	/**
	 * 拖拽操作生成事件触发后进入这个UI时触发
	 */
	//protected onDragEnter(InGeometry :mw.Geometry,InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation) {
	//}

	/**
	 * 拖拽操作生成事件触发后离开这个UI时触发
	 */
	//protected onDragLeave(InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation) {
	//}

	/**
	 * 拖拽操作生成事件触发后，没有完成完成的拖拽事件而取消时触发
	 */
	//protected onDragCancelled(InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation) {
	//}

}
