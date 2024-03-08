/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-12-28 17:31:09
 * @LastEditors  : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @LastEditTime : 2024-01-04 19:14:38
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\help\ui\HelpUI.ts
 * @Description  : 
 */
import { GameConfig } from "../../../../config/GameConfig";
import GhostsState_UI_Generate from "../../../../ui-generate/ShareUI/GhostsState_UI_generate";
import { MainUI } from "../../../ui/MainUI";
import SetUI from "../../../ui/SetUI";
import { CommonUtils } from "../../../utils/CommonUtils";
import { LanUtil } from "../../../utils/LanUtil";
import { NotebookPanel } from "../../procedure/ui/NotebookPanel";
import HelpModuleC from "../HelpModuleC";

export default class HelpUI extends GhostsState_UI_Generate {
    /**上一帧按下的位置在哪 */
    public preLocation: Vector2 = new Vector2
    /**是否正在主动按下死亡 */
    public activeDieing: boolean = false;
    /**主动死亡计时器 */
    public activeDieTimer: number = 0

    private sosCoolDownTimer: number = 0;

    // /**按下屏幕的监听 */
    // toughLister: EventListener

    // toughEndLister: EventListener

    private _restTimer: number = 0;


    onStart() {
        this.canUpdate = true;
        this.btn_sos.onClicked.add(() => {
            if (this.sosCoolDownTimer > 0) return;
            ModuleService.getModule(HelpModuleC).reqShowHelpMessage();
            //给冷却事件
            this.sosCoolDownTimer = 0.3;
        })
        this.mBtn_giveup.onPressed.add(() => { this.activeDieing = true })
        this.mBtn_giveup.onReleased.add(() => {
            this.activeDieing = false
            this.activeDieTimer = 0;
            this.progressBar.currentValue = 0
            this.progressBar.visibility = SlateVisibility.Collapsed
        })
    }
    onShow(time: number) {
        this._restTimer = time;
        this.startDieCountDown();
        UIService.hide(MainUI);
        UIService.hide(SetUI);
        UIService.hide(NotebookPanel);
        this.progressBar.visibility = SlateVisibility.Collapsed
    }
    onHide() {
        UIService.show(MainUI);
    }
    /**
     * 开启死亡倒计时
     */
    startDieCountDown() {

        // this.toughLister = InputUtil.onTouch((index: number, location: mw.Vector2, touchType: mw.TouchInputType) => {
        //     if (location.equals(this.preLocation)) {
        //         console.log("按下了")
        //         this.activeDieing = true
        //     }
        //     if (!location.equals(this.preLocation)) {
        //         console.log("移动了")
        //         this.activeDieing = false
        //         this.activeDieTimer = 0;
        //         this.progressBar.currentValue = 0
        //     }
        //     this.preLocation = location;
        // })
        // this.toughEndLister = InputUtil.onTouchEnd((index: number, location: mw.Vector2, touchType: mw.TouchInputType) => {
        //     console.log("抬起了")
        //     this.activeDieing = false
        //     this.activeDieTimer = 0;
        //     this.progressBar.currentValue = 0
        // })
    }

    endDieCountDown() {
        // this.toughLister.disconnect();
        // this.toughEndLister.disconnect();
        UIService.hideUI(this);
        this.activeDieing = false
        this.activeDieTimer = 0;
        this.progressBar.currentValue = 0
    }

    onUpdate(dt) {
        //倒计时
        this._restTimer -= dt;
        if (this._restTimer <= 0) {
            this.mText_GhostGuide.text = "";
        }
        else {
            this.mText_GhostGuide.text = CommonUtils.formatString(LanUtil.getText("help_07"), this._restTimer.toFixed(1));
        }
        if (this.activeDieing) {
            //TODO 主动死亡长按事件考虑配表
            this.activeDieTimer += dt;
            this.progressBar.currentValue = (this.activeDieTimer - 0.5) / 3;
            if (this.progressBar.visibility == SlateVisibility.Collapsed && this.activeDieTimer > 0.5) {
                this.progressBar.visibility = SlateVisibility.Visible
            }
            if (this.activeDieTimer >= 3.5) {
                this.endDieCountDown();
                ModuleService.getModule(HelpModuleC).reqNoHelp();
            }
        }
        if (this.sosCoolDownTimer > 0) {
            this.sosCoolDownTimer -= dt;
        }
    }

}