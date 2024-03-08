import { GameConfig } from "../../../../../config/GameConfig";
import Color_UI_Generate from "../../../../../ui-generate/ShareUI/Color_UI_generate";
import { MainUI } from "../../../../ui/MainUI";
import { LanUtil } from "../../../../utils/LanUtil";
import { ArchiveDataType, ArchiveHelper } from "../../../archive/ArchiveHelper";
import ArchiveModuleC from "../../../archive/ArchiveModuleC";
import { InterSaveModuleC } from "../../InterSaveHelper";
import { ObjInterDefine } from "../../ObjInterDefine";
import ReckLock, { ReckLockData } from "../RecLock";
import RecNoColorLock from "../RecNoColorLock";
import { BaseRecUI } from "./BaseRecUI";

export class RecUI extends BaseRecUI {
    protected get bindGo(): mw.GameObject {
        return this._bindScript.gameObject;
    }
    private _bindScript: RecNoColorLock;

    /** 当前的旋转量 */
    private _curRot: number;

    private _delayTime: number = 0;

    onShow(script: RecNoColorLock) {
        UIService.hide(MainUI);
        this._bindScript = script;
        this.resetUI();
        let e = script.targetData;
        let maskBtn = this.maskBtn_0 as MaskButton;
        let bingBtn = this.maskBtn_2 as MaskButton;
        maskBtn.visibility = SlateVisibility.SelfHitTestInvisible;
        maskBtn.renderTransformAngle = e.area.y;
        maskBtn.fanShapedValue = 1 - (e.area.y - e.area.x) / 360;
        bingBtn.renderTransformAngle = e.area.y;
        bingBtn.fanShapedValue = 1 - (e.area.y - e.area.x) / 360;
        this.text_tip.text = LanUtil.getText("ts_tips_108");

        this._curRot = 0;
        this.canvas_rotate1.visibility = SlateVisibility.SelfHitTestInvisible;
        this.canvas_rotate1.renderTransformAngle = this._curRot;
        if (script.isUnlocked) {
            this.canUpdate = false;
            let targetData = script.targetData;
            this._curRot = (targetData.area.x + targetData.area.y) / 2;
            let maskBtn = this.maskBtn_0 as MaskButton;
            maskBtn.visibility = SlateVisibility.SelfHitTestInvisible;
            this.maskBtn_2.visibility = SlateVisibility.SelfHitTestInvisible;
            this.canvas_rotate1.renderTransformAngle = this._curRot;
        }
        else {
            this.canUpdate = true;
            this._delayTime = 0;
        }
    }
    onHide() {
        UIService.show(MainUI);
        this.canUpdate = false;
        this.mVirtualJoystickPanel.resetJoyStick();
    }

    onUpdate(dt: number) {
        if (this._delayTime > 0) {
            this._delayTime -= dt;
            return;
        }
        this._curRot += dt * this._bindScript.rotSpeed;
        this.canvas_rotate1.renderTransformAngle = this._curRot;
    }

    protected onCheckRotation() {
        if (this._bindScript.isUnlocked) {
            return;
        }
        this._delayTime = 1.5;
        let curRot = this._curRot % 360
        if (curRot < 0) {
            curRot -= 360;
        }
        console.log("[RectLock]" + `${curRot}`);
        let targetData = this._bindScript.targetData;
        let isOk = false;
        if (targetData.area.x > targetData.area.y) {
            if (curRot >= targetData.area.x || curRot <= targetData.area.y) {
                isOk = true;
            }
        }
        else if (curRot >= targetData.area.x && curRot <= targetData.area.y) {
            isOk = true;
        }
        if (!isOk) {
            console.log("[rectLock]解锁失败]")
            ObjInterDefine.dispatchClientByData(this._bindScript.failEvtDataArr, this._bindScript.gameObject.gameObjectId);
            this.maskBtn_2.visibility = SlateVisibility.Collapsed;
            return;
        }
        console.log("[rectLock]解锁成功]")
        this.maskBtn_2.visibility = SlateVisibility.SelfHitTestInvisible;
        this._bindScript.isUnlocked = true;
        this._bindScript.save2Archive(1);
        ObjInterDefine.dispatchClientByData(this._bindScript.sucEvtDataArr, this._bindScript.gameObject.gameObjectId);
        setTimeout(() => {
            UIService.hideUI(this);
        }, 1500);
    }
}