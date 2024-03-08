/*
 * @Author       : dal
 * @Date         : 2024-02-01 13:37:34
 * @LastEditors  : dal
 * @LastEditTime : 2024-02-04 15:54:39
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\guide\ui\UIHallPopUp.ts
 * @Description  : 
 */
import Hall_Popup_UI_Generate from "../../../../ui-generate/ShareUI/hall/Hall_Popup_UI_generate";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import ExGuideModuleC from "../ExGuideModuleC";
import UIHallContent from "./UIHallContent";

export default class UIHallPopUp extends Hall_Popup_UI_Generate {

    protected onStart(): void {
        this.mBtn_Yes.onClicked.add(() => {
            GhostTraceHelper.hallAniTrace(2, false, false);
            ModuleService.getModule(ExGuideModuleC).showContentUI()
        })

        this.mBtn_No.onClicked.add(() => {
            GhostTraceHelper.hallAniTrace(2, false, false);
            this.mBtn_No.enable = false;
            SoundService.playSound("186448")
            let emoji = Image.newObject(this.mCanvas_Btn)
            emoji.imageGuid = "157214"
            emoji.size = new Vector(200, 200)
            emoji.imageColor = new LinearColor(242, 255, 0)
            emoji.position = this.mBtn_No.position;
            let params = { position: emoji.position, opacity: 1 }
            let toParams = { position: new Vector2(emoji.position.x, emoji.position.y - 200), opacity: 0 }
            new Tween(params)
                .to(toParams)
                .duration(1000)
                .onUpdate(val => {
                    emoji.position = val.position;
                    emoji.renderOpacity = val.opacity;
                    this.mBtn_No.renderOpacity = val.opacity;
                })
                .onComplete(() => {
                    this.mBtn_No.visibility = SlateVisibility.Collapsed;
                    let x = this.mCanvas_Btn.size.x / 2 - this.mBtn_Yes.size.x / 2
                    this.mBtn_Yes.position = new Vector2(x, this.mBtn_Yes.position.y)
                    emoji.destroyObject()
                })
                .start()

        })
    }


    onShow() {
        SoundService.playSound("169135")
        UIService.hide(UIHallContent)
    }

    changeContent() {
        this.mCanvas_Btn.visibility = SlateVisibility.Collapsed;
        this.mCanvas_Result.visibility = SlateVisibility.Visible;
    }

}