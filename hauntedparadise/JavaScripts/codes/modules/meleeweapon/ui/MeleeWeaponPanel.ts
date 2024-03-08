/*
 * @Author       : dal
 * @Date         : 2023-12-24 15:06:52
 * @LastEditors  : dal
 * @LastEditTime : 2024-02-04 15:36:52
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\meleeweapon\ui\MeleeWeaponPanel.ts
 * @Description  : 
 */

import MeleeWeaponPanel_Generate from "../../../../ui-generate/ShareUI/hud/MeleeWeaponPanel_generate";
import { MainUI } from "../../../ui/MainUI";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { ObjInterModuleC } from "../../inter/ObjInterModuleC";
import { PlayerInterModuleC } from "../../inter/PlayerInterModule";
import PickHud from "../../inter/ui/PickHud";
import MeleeWeaponModuleC from "../MeleeWeaponC";

export default class MeleeWeaponPanel extends MeleeWeaponPanel_Generate {

    private _lastTriggerTime: number = 0;

    protected onStart() {
        Event.addLocalListener("SetHandVisible", (visible) => { this.canvas_catch.visibility = visible ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed; });
        this.canvas_catch.visibility = SlateVisibility.Collapsed;
        this.btn_catch.clickMethod = mw.ButtonClickMethod.MouseDown;
        this.btn_catch.onClicked.add(() => {
            let curTIme = TimeUtil.elapsedTime();
            if (curTIme - this._lastTriggerTime < 0.5) {
                console.error("操作过于频繁")
                return;
            }
            this._lastTriggerTime = curTIme;
            let res = ModuleService.getModule(PlayerInterModuleC).reqStopInter(true);
            if (res) {
                return;
            }
            ModuleService.getModule(ObjInterModuleC).triggerSelectItem();
        })

        this.btn_attack.onClicked.clear();

        this.btn_attack.onClicked.add(() => {
            if (!this.selfModule.myWeapon || !this.selfModule.myWeapon["weaponCfg"]) { return; }
            GhostTraceHelper.itemTrace(this.selfModule.myWeapon["weaponCfg"].id, 10);
            ModuleService.getModule(MeleeWeaponModuleC).reqAtk();
        });

        this.btn_melee.onClicked.clear();

        this.btn_melee.onClicked.add(() => {
            if (!this.selfModule.myWeapon || !this.selfModule.myWeapon["weaponCfg"]) { return; }
            GhostTraceHelper.itemTrace(this.selfModule.myWeapon["weaponCfg"].id, 10);
            ModuleService.getModule(MeleeWeaponModuleC).reqAtk();
        });
    }

    private get selfModule() {
        return ModuleService.getModule(MeleeWeaponModuleC);
    }

    protected onShow() {

        if (UIService.getUI(MainUI).canvas_catch.visible) { this.canvas_catch.visibility = mw.SlateVisibility.SelfHitTestInvisible; }

        // 可以捡，但是不会选中
        Event.dispatchToLocal("EnableNeedSelectWhenPick", false);
        // 和交互按钮互斥
        UIService.hide(PickHud);
        UIService.getUI(MainUI).setHandVisible(false, 9, false);
        UIService.getUI(MainUI).banHandUIVisible = true;
    }

    protected onHide() {
        // 可以捡，但是不会选中
        Event.dispatchToLocal("EnableNeedSelectWhenPick", true);
        // 和交互按钮互斥
        UIService.getUI(MainUI).banHandUIVisible = false;
        // 如果有物品，打开拾取交互按钮
        this.canvas_catch.visible && UIService.getUI(MainUI).setHandVisible(true);
    }

    public shiftBtnImg(imageGuid: string) {
        this.btn_attack.normalImageGuid = imageGuid;
        this.btn_attack.pressedImageGuid = imageGuid;
        this.btn_attack.disableImageGuid = imageGuid;
    }
}