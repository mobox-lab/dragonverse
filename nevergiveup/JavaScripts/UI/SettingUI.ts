﻿/**
 * AUTHOR: 泪染倾城（找闺）
 * TIME: 2023.12.20-19.26.48
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import PlayerModuleData from "../Modules/PlayerModule/PlayerModuleData";
import { TowerManager } from "../Modules/TowerModule/TowerManager";
import { TweenCommon } from "../TweenCommon";
import KeyOperationManager from "../controller/key-operation-manager/KeyOperationManager";
import { EffectEvent, VoiceEvent } from "../tool/SoundUtil";
import Setting_Generate from "../ui-generate/Setting/Setting_generate";

export default class SettingUI extends Setting_Generate {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    protected onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
        this.closeBtn.onClicked.add(() => {
            TweenCommon.popUpHide(this.rootCanvas, () => {
                UIService.hideUI(this);
            });
        });
        this.attackSelectTrue.onClicked.add(() => {
            this.attackSelectTrue.visibility = SlateVisibility.Collapsed;
            this.attackSelectFalse.visibility = SlateVisibility.Visible;
            Event.dispatchToLocal(VoiceEvent.Attack, 0);
        });
        this.attackSelectFalse.onClicked.add(() => {
            this.attackSelectFalse.visibility = SlateVisibility.Collapsed;
            this.attackSelectTrue.visibility = SlateVisibility.Visible;
            Event.dispatchToLocal(VoiceEvent.Attack, 1);
        });
        this.attackSelectFalse.visibility = SlateVisibility.Collapsed;
        this.attackSelectTrue.visibility = SlateVisibility.Visible;
        this.bgmSelectTrue.onClicked.add(() => {
            this.bgmSelectTrue.visibility = SlateVisibility.Collapsed;
            this.bgmSelectFalse.visibility = SlateVisibility.Visible;
            this.txtVoiceOn.visibility = SlateVisibility.Hidden;
            this.txtVoiceOff.visibility = SlateVisibility.Visible;
            Event.dispatchToLocal(VoiceEvent.Bgm, 0);
        });
        this.bgmSelectFalse.onClicked.add(() => {
            this.bgmSelectFalse.visibility = SlateVisibility.Collapsed;
            this.bgmSelectTrue.visibility = SlateVisibility.Visible;
            this.txtVoiceOn.visibility = SlateVisibility.Visible;
            this.txtVoiceOff.visibility = SlateVisibility.Hidden;
            Event.dispatchToLocal(VoiceEvent.Bgm, 0.3);
        });

        this.sFXSelectTrue.onClicked.add(() => {
            this.sFXSelectTrue.visibility = SlateVisibility.Collapsed;
            this.sFXSelectFalse.visibility = SlateVisibility.Visible;
            this.txtSFXOn.visibility = SlateVisibility.Hidden;
            this.txtSFXOff.visibility = SlateVisibility.Visible;
            Event.dispatchToLocal(VoiceEvent.Attack, 0);
        });
        this.sFXSelectFalse.onClicked.add(() => {
            this.sFXSelectFalse.visibility = SlateVisibility.Collapsed;
            this.sFXSelectTrue.visibility = SlateVisibility.Visible;
            this.txtSFXOn.visibility = SlateVisibility.Visible;
            this.txtSFXOff.visibility = SlateVisibility.Hidden;
            Event.dispatchToLocal(VoiceEvent.Attack, 1);
        });
        const bgmVoiceFactor = DataCenterC.getData(PlayerModuleData).bgmVoiceFactor;
        const attackVoiceFactor = DataCenterC.getData(PlayerModuleData).attackVoiceFactor;
        if (bgmVoiceFactor === 0) {
            this.bgmSelectFalse.visibility = SlateVisibility.Visible;
            this.bgmSelectTrue.visibility = SlateVisibility.Collapsed;
        } else {
            this.bgmSelectFalse.visibility = SlateVisibility.Collapsed;
            this.bgmSelectTrue.visibility = SlateVisibility.Visible;
        }
        if (attackVoiceFactor === 0) {
            this.sFXSelectFalse.visibility = SlateVisibility.Visible;
            this.sFXSelectTrue.visibility = SlateVisibility.Collapsed;
            this.txtSFXOn.visibility = SlateVisibility.Hidden;
            this.txtSFXOff.visibility = SlateVisibility.Visible;
        } else {
            this.sFXSelectFalse.visibility = SlateVisibility.Collapsed;
            this.sFXSelectTrue.visibility = SlateVisibility.Visible;
            this.txtSFXOn.visibility = SlateVisibility.Visible;
            this.txtSFXOff.visibility = SlateVisibility.Hidden;
        }

        const attackEffect = DataCenterC.getData(PlayerModuleData).attackEffect;
        const attackDamage = DataCenterC.getData(PlayerModuleData).attackDamage;
        if (attackEffect === 0) {
            this.effectSelectFalse.visibility = SlateVisibility.Visible;
            this.effectSelectTrue.visibility = SlateVisibility.Collapsed;
            this.txtEffectOn.visibility = SlateVisibility.Hidden;
            this.txtEffectOff.visibility = SlateVisibility.Visible;
        } else {
            this.effectSelectFalse.visibility = SlateVisibility.Collapsed;
            this.effectSelectTrue.visibility = SlateVisibility.Visible;
            this.txtEffectOn.visibility = SlateVisibility.Visible;
            this.txtEffectOff.visibility = SlateVisibility.Hidden;
        }
        this.effectSelectTrue.onClicked.add(() => {
            this.effectSelectTrue.visibility = SlateVisibility.Collapsed;
            this.effectSelectFalse.visibility = SlateVisibility.Visible;
            this.txtEffectOn.visibility = SlateVisibility.Hidden;
            this.txtEffectOff.visibility = SlateVisibility.Visible;
            Event.dispatchToLocal(EffectEvent.AttackEffect, 0);
            TowerManager.towerMap?.forEach((tower) => {
                tower.destroyEffect();
            });
        });
        this.effectSelectFalse.onClicked.add(() => {
            this.effectSelectFalse.visibility = SlateVisibility.Collapsed;
            this.effectSelectTrue.visibility = SlateVisibility.Visible;
            this.txtEffectOn.visibility = SlateVisibility.Visible;
            this.txtEffectOff.visibility = SlateVisibility.Hidden;
            Event.dispatchToLocal(EffectEvent.AttackEffect, 1);
            TowerManager.towerMap?.forEach((tower) => {
                tower.showEffect();
            });
        });

        if (attackDamage === 0) {
            this.numberSelectFalse.visibility = SlateVisibility.Visible;
            this.numberSelectTrue.visibility = SlateVisibility.Collapsed;
            this.txtNumberOn.visibility = SlateVisibility.Hidden;
            this.txtNumberOff.visibility = SlateVisibility.Visible;
        } else {
            this.numberSelectFalse.visibility = SlateVisibility.Collapsed;
            this.numberSelectTrue.visibility = SlateVisibility.Visible;
            this.txtNumberOn.visibility = SlateVisibility.Visible;
            this.txtNumberOff.visibility = SlateVisibility.Hidden;
        }
        this.numberSelectTrue.onClicked.add(() => {
            this.numberSelectTrue.visibility = SlateVisibility.Collapsed;
            this.numberSelectFalse.visibility = SlateVisibility.Visible;
            this.txtNumberOn.visibility = SlateVisibility.Hidden;
            this.txtNumberOff.visibility = SlateVisibility.Visible;
            Event.dispatchToLocal(EffectEvent.AttackDamage, 0);
        });
        this.numberSelectFalse.onClicked.add(() => {
            this.numberSelectFalse.visibility = SlateVisibility.Collapsed;
            this.numberSelectTrue.visibility = SlateVisibility.Visible;
            this.txtNumberOn.visibility = SlateVisibility.Visible;
            this.txtNumberOff.visibility = SlateVisibility.Hidden;
            Event.dispatchToLocal(EffectEvent.AttackDamage, 1);
        });
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
    protected onShow(...params: any[]) {
        TweenCommon.popUpShow(this.rootCanvas);
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            TweenCommon.popUpHide(this.rootCanvas, () => {
                UIService.hideUI(this);
            });
        });
    }

    protected onHide() {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }
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
