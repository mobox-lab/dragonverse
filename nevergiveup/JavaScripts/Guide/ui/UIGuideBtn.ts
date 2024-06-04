/*
 * @Author: shifu.huang
 * @Date: 2024-01-11 17:38:35
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-15 18:40:50
 * @FilePath: \nevergiveup\JavaScripts\Guide\ui\UIGuideBtn.ts
 * @Description: 修改描述
 */
/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-20 14:43:57
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-12-29 15:48:33
 * @FilePath     : \nevergiveup\JavaScripts\Guide\ui\UIGuideBtn.ts
 * @Description  : 修改描述
 */
import Utils from "../../Utils";
import OverheadBtn_Generate from "../../ui-generate/Sundry/OverheadBtn_generate";

export namespace GuideUI {
    export function showAtPos(pos: Vector, lookPos: Vector) {
        UIService.show(UIGuideBtn, pos, lookPos);
    }

    export function hide() {
        UIService.hide(UIGuideBtn);
    }

    export function getBtn() {
        return UIService.getUI(UIGuideBtn).mbtn;

    }
}

export class UIGuideBtn extends OverheadBtn_Generate {
    pos: Vector = Vector.zero;
    lookPos: Vector = Vector.zero;
    onStart() {
        this.canUpdate = true;
    }

    onUpdate() {
        this.updatePos();
    }

    onShow(pos: Vector, lookPos: Vector) {
        this.pos = pos;
        lookPos.z -= 100;
        this.lookPos = lookPos.clone();
        this.updatePos();
    }

    updatePos() {
        let w = 128;
        let h = 128;
        let result = InputUtil.projectWorldPositionToWidgetPosition(this.pos);
        if (result.screenPosition.x > 1920 - w / 2) {
            result.screenPosition.x = 1920 - w / 2;
        }
        if (result.screenPosition.x < 0 + w / 2) {
            result.screenPosition.x = 0 + w / 2;
        }
        if (result.screenPosition.y > 1080 - h / 2) {
            result.screenPosition.y = 1080 - h / 2;
        }
        if (result.screenPosition.y < 0 + h / 2) {
            result.screenPosition.y = 0 + h / 2;
        }
        this.rootCanvas.position = result.screenPosition;
        Utils.faceCameraToTarget(this.lookPos);
    }
}