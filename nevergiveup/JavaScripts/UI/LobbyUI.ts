/**
 * AUTHOR: 泪染倾城（找闺）
 * TIME: 2023.12.14-14.31.49
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import Gtk from "gtoolkit";
import { PlayerActions } from "../Actions";
import PlayerModuleData from "../Modules/PlayerModule/PlayerModuleData";
import UI_TaskMain from "../Modules/taskModule/ui/UI_TaskMain";
import Utils from "../Utils";
import { GameConfig } from "../config/GameConfig";
import { Yoact } from "../depend/yoact/Yoact";
import { MGSTool } from "../tool/MGSTool";
import LobbyUI_Generate from "../ui-generate/HUD/LobbyUI_generate";
import SettingUI from "./SettingUI";
import TowerUI from "./Tower/TowerUI";
import { EnergyModuleC } from "../Modules/Energy/EnergyModule";
import GameServiceConfig from "../const/GameServiceConfig";
import KeyOperationManager from "../controller/key-operation-manager/KeyOperationManager";
import { TalentTreeContainer } from "../TalentTree/ui/TalentTreeContainer";
import { GameManager } from "../GameManager";
import TowerShopUI from "./Tower/TowerShopUI";
import { JumpGamePanel } from "./JumpGame/JumpGamePanel";
import SenzuBeanConfirmPanel from "./Bag/SenzuBeanConfirmPanel";
import P12ShopPanel from "./Shop/P12ShopPanel";
import { GlobalData } from "../const/GlobalData";
import JumpProgress_Generate from "../ui-generate/JumpProgress_generate";
import { AuthModuleC } from "../Modules/auth/AuthModule";
import QuestionUI from "./QuestionUI";

const progressTag = "LobbyTransmitProgress";
export default class LobbyUI extends LobbyUI_Generate {
    private _progressBar: ProgressBar;
    private _cnvProgressBar: Canvas;
    private inProgress: boolean = false;

    private _authModuleC: AuthModuleC;
    private get authModuleC(): AuthModuleC | null {
        if (!this._authModuleC) this._authModuleC = ModuleService.getModule(AuthModuleC);
        return this._authModuleC;
    }
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
            if (GameManager.getStageClient()) {
                return;
            }
            UIService.show(TowerShopUI, { isShop: true });
        });
        this.settingBtn.onClicked.add(() => {
            UIService.show(SettingUI);
        });

        this.techTreeBtn.onClicked.add(() => {
            UIService.show(TalentTreeContainer);
        });
        //打开任务
        this.taskBtn.onClicked.add(this.showTaskPanel.bind(this));
        Gtk.trySetVisibility(this.teamCanvas, mw.SlateVisibility.Collapsed);
        this.addTowerBtn.onClicked.add(() => {
            Gtk.trySetVisibility(this.teamCanvas, mw.SlateVisibility.Collapsed);
            UIService.show(TowerUI);
        });
        this.questionBtn.onClicked.add(() => {
            UIService.show(QuestionUI);
        });

        Yoact.bindYoact(() =>
            Gtk.trySetText(
                this.mStamina_2,
                Math.floor(ModuleService.getModule(EnergyModuleC).viewEnergyLimit.data).toString()
            )
        );
        Yoact.bindYoact(() =>
            Gtk.trySetText(this.mStamina, Math.floor(ModuleService.getModule(EnergyModuleC).viewEnergy.data).toString())
        );
        this.freshBtn.onClicked.add(() => {
            ModuleService.getModule(EnergyModuleC).refreshStaminaLimit();
        });
        // 脱离卡死
        this.returnBtn.onClicked.add(() => {
            if (this.inProgress) {
                this.closeProgress();
                return;
            }
            // 展示进度条
            const ui = UIService.show(JumpProgress_Generate);
            this._progressBar = ui.progressBar;
            this._cnvProgressBar = ui.cnvProgressBar;
            this._progressBar.percent = 0;
            this._cnvProgressBar.renderOpacity = 0;
            this.playProgress();
        });

        this.jumpBtn.onClicked.add(() => {
            if (UIService.getUI(JumpGamePanel).isShowing) {
                UIService.hide(JumpGamePanel);
            } else {
                UIService.show(JumpGamePanel);
            }
        });

        // this.shopBtn.onClicked.add(() => {
        //     if (UIService.getUI(P12ShopPanel)?.isShowing) {
        //         UIService.hide(P12ShopPanel);
        //     } else {
        //         UIService.show(P12ShopPanel);
        //     }
        // });

        this.addBtn.onClicked.add(() => {
            UIService.show(SenzuBeanConfirmPanel);
        });
        UIService.show(TowerShopUI, { isShop: true });
        UIService.hide(TowerShopUI);

        // MDBL Token
        Yoact.bindYoact(() =>
            Gtk.trySetText(this.mToken, Utils.formatEtherInteger(BigInt(this.authModuleC?.currency.count ?? 0)))
        );
        this.freshTokenBtn.onClicked.add(() => this.authModuleC?.refreshCurrency());
    }

    public closeProgress() {
        this.inProgress = false;
        //关闭进度条
        actions.tweens.stopAllByTag(progressTag);
        UIService.hide(JumpProgress_Generate);
    }

    /**
     * 播放 Progress 动画.
     */
    public playProgress() {
        if (this.inProgress) return;
        this.inProgress = true;
        const progressTask = actions
            .tween(this._progressBar)
            .setTag(progressTag)
            .to(GameServiceConfig.SUB_GAME_SCENE_JUMP_PROGRESS_DURATION, { percent: 1 })
            .call(() => {
                this.onProgressDone();
            });
        actions
            .tween(this._cnvProgressBar)
            .setTag(progressTag)
            .to(100, { renderOpacity: 1 })
            .call(() => {
                progressTask.start();
            })
            .start();
    }

    onProgressDone() {
        this.inProgress = false;
        UIService.hide(JumpProgress_Generate);
        const character = Player.localPlayer.character;
        if (!character) return;
        console.log("reset position, onProgressDone");
        character.worldTransform.position = GlobalData.Global.resetWorldPosition.clone();
    }

    public showTaskPanel() {
        // if (!Utils.checkLevel(GameConfig.Global.getElement(1).unlockTaskLevel)) return;
        const ui = UIService.getUI(UI_TaskMain);
        if (ui.visible) ui.hide();
        else ui.show();
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

    protected onShow() {
        // 打开商店
        KeyOperationManager.getInstance().bindButton(this, Keys.T, this.returnBtn);
        // KeyOperationManager.getInstance().bindButton(this, Keys.M, this.shopBtn);
        // KeyOperationManager.getInstance().onKeyUp(this, Keys.B, () => {
        //     if (GameManager.getStageClient()) {
        //         return;
        //     }
        //     const ui = UIService.getUI(TowerShopUI);
        //     if (ui.visible) ui.hideTween();
        //     else UIService.show(TowerShopUI, { isShop: true });
        // });
        KeyOperationManager.getInstance().onKeyUp(this, Keys.I, () => {
            const ui = UIService.getUI(SettingUI);
            if (ui.visible) ui.hide();
            else ui.show();
        });
        KeyOperationManager.getInstance().onKeyUp(this, Keys.L, () => {
            this.showTaskPanel();
        });
        KeyOperationManager.getInstance().onKeyUp(this, Keys.O, () => {
            const ui = UIService.getUI(JumpGamePanel);
            if (ui.visible) ui.hide();
            else ui.show();
        });
        KeyOperationManager.getInstance().onKeyUp(this, Keys.G, () => {
            const ui = UIService.getUI(QuestionUI);
            if (ui.visible) ui.hide();
            else ui.show();
        });
        this.updateCurrency();
    }

    protected onHide() {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.T);
        KeyOperationManager.getInstance().unregisterKey(this, Keys.M);
        // KeyOperationManager.getInstance().unregisterKey(this, Keys.B);
        KeyOperationManager.getInstance().unregisterKey(this, Keys.I);
        KeyOperationManager.getInstance().unregisterKey(this, Keys.L);
        KeyOperationManager.getInstance().unregisterKey(this, Keys.O);
        KeyOperationManager.getInstance().unregisterKey(this, Keys.G);
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    protected onAdded() {}

    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    protected onRemoved() {}

    /**
     * 构造UI文件成功后，UI对象再被销毁时调用
     * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
     */
    protected onDestroy() {}

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
