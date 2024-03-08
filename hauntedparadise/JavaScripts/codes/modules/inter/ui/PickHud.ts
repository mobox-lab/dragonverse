/*
 * @Author       : dal
 * @Date         : 2024-01-08 14:17:31
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-29 17:11:11
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\inter\ui\PickHud.ts
 * @Description  : 
 */

import PickUp_UI_Generate from "../../../../ui-generate/ShareUI/PickUp_UI_generate";
import MusicMgr from "../../../utils/MusicMgr";
import { ObjInterModuleC } from "../ObjInterModuleC";
import { PlayerInterModuleC } from "../PlayerInterModule";


export default class PickHud extends PickUp_UI_Generate {

    private pressTime: number = 0;

    onStart() {
        this.layer = mw.UILayerScene;
        this.canUpdate = false;
        this.btn_catch.touchMethod = mw.ButtonTouchMethod.DownAndUp;
        this.btn_catch.onPressed.add(() => {
            this.onPress();
            this.pressTime = TimeUtil.elapsedTime();
        });

        this.btn_catch.onReleased.add(() => {
            this.onRelease();
            if (TimeUtil.elapsedTime() - this.pressTime > 0.5) { return; }
            let res = ModuleService.getModule(PlayerInterModuleC).reqStopInter(true);
            if (res) { return; }
            ModuleService.getModule(ObjInterModuleC).triggerSelectItem();
        })
    }

    /** 是否在蓄力中 */
    isPowering: boolean = false;

    private onPress() {
        if (this.visible) {
            this.canUpdate = true;
            this.isPowering = true;
        }
    }

    private onRelease() {
        this.isPowering = false;
    }

    protected onUpdate(dt) {

        // 蓄力
        if (this.isPowering) {
            this.maskBtn_color.fanShapedValue -= dt;
            if (this.maskBtn_color.fanShapedValue <= 0) {
                MusicMgr.instance.play(2003);
                ModuleService.getModule(ObjInterModuleC).longClickTriggerItem();
                UIService.hideUI(this);
            }
        }

        // 没有蓄力就慢慢缩回去
        else {
            if (this.maskBtn_color.fanShapedValue >= 1) { return; }
            this.maskBtn_color.fanShapedValue += (dt / 5);
            if (this.maskBtn_color.fanShapedValue >= 1) {
                this.canUpdate = false;
            }
        }
    }

    /** 
     * pickHud 的开关
     * @param isShow 显示或关闭
     * @param go 用来判断这个的banHandUIView属性判断是否被禁止显示
     */
    public switch(isShow: boolean, go: GameObject) {
        if (go["banHandUIView"] != null && go["banHandUIView"] === true) {
            return;
        }
        if (isShow) {
            UIService.showUI(this);
        } else {
            UIService.hideUI(this);
        }
    }

    onShow() {
        this.maskBtn_color.fanShapedValue = 1;
        this.isPowering = false;
    }

    onHide() {
        this.maskBtn_color.fanShapedValue = 1;
        this.isPowering = false;
    }
}