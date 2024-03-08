import Color_UI_Generate from "../../../../../ui-generate/ShareUI/Color_UI_generate";
import { MainUI } from "../../../../ui/MainUI";
import { LanUtil } from "../../../../utils/LanUtil";
import { ArchiveDataType, ArchiveHelper } from "../../../archive/ArchiveHelper";
import ArchiveModuleC from "../../../archive/ArchiveModuleC";
import { InterSaveModuleC } from "../../InterSaveHelper";
import { ObjInterDefine } from "../../ObjInterDefine";
import ReckLock, { ReckLockData } from "../RecLock";
import { BaseRecUI } from "./BaseRecUI";

export class RecColorUI extends BaseRecUI {
    protected get bindGo(): mw.GameObject {
        return this._bindScript.gameObject;
    }
    private _bindScript: ReckLock;

    /** 当前的旋转量 */
    private _curRot: number;

    private _unlockIndex: number = 0;

    onShow(script: ReckLock) {
        UIService.hide(MainUI);
        this._bindScript = script;
        this.resetUI();

        script.targetDataArr.forEach(e => {
            let maskBtn = this[`maskBtn_${e.goId}`] as MaskButton;
            let bingBtn = this[`maskBtn_bingo${e.goId}`] as MaskButton;
            maskBtn.visibility = SlateVisibility.SelfHitTestInvisible;
            maskBtn.renderTransformAngle = e.area.y;
            maskBtn.fanShapedValue = 1 - (e.area.y - e.area.x) / 360;
            if (bingBtn) {
                bingBtn.renderTransformAngle = e.area.y;
                bingBtn.fanShapedValue = 1 - (e.area.y - e.area.x) / 360;
            }
        })
        this.text_tip.text = LanUtil.getText("ts_tips_109");

        this._curRot = 0;
        this.canvas_rotate1.visibility = SlateVisibility.SelfHitTestInvisible;
        this.canvas_rotate1.renderTransformAngle = this._curRot;
        if (script.isUnlocked) {
            this.canUpdate = false;
            let targetData = script.targetDataArr[script.targetDataArr.length - 1];
            this._curRot = (targetData.area.x + targetData.area.y) / 2;
            script.targetDataArr.forEach(e => {
                let maskBtn = this[`maskBtn_${e.goId}`] as MaskButton;
                maskBtn.visibility = SlateVisibility.SelfHitTestInvisible;

                let bingBtn = this[`maskBtn_bingo${e.goId}`] as MaskButton;
                if (bingBtn) {
                    bingBtn.visibility = SlateVisibility.SelfHitTestInvisible;
                }
            })
            this.canvas_rotate1.renderTransformAngle = this._curRot;
        }
        else {
            this.canUpdate = true;
        }
    }
    onHide() {
        UIService.show(MainUI);
        this.canUpdate = false;
        this.mVirtualJoystickPanel.resetJoyStick();
    }

    onUpdate(dt: number) {
        this._curRot += dt * this._bindScript.rotSpeed;
        this.canvas_rotate1.renderTransformAngle = this._curRot;
    }

    private setDataEffect(data: ReckLockData, visiable: boolean) {
        let go = this[`maskBtn_bingo${data.goId}`] as mw.MaskButton;
        if (!go) {
            return;
        }
        go.visibility = visiable ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }

    protected onCheckRotation() {
        if (this._bindScript.isUnlocked) {
            return;
        }
        let curRot = this._curRot % 360
        if (curRot < 0) {
            curRot -= 360;
        }
        console.log("[RectLock]" + `${curRot}`);
        let targetData = this._bindScript.targetDataArr[this._unlockIndex];
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
            this._unlockIndex = 0;
            this._bindScript.targetDataArr.forEach(e => {
                this.setDataEffect(e, false);
            })
            return;
        }
        console.log("[rectLock]解锁成功]")
        this.setDataEffect(targetData, true);
        this._unlockIndex++;
        if (this._unlockIndex == this._bindScript.targetDataArr.length) {
            this._bindScript.isUnlocked = true;
            this._unlockIndex = 0;
            this._bindScript.save2Archive(1);
            ObjInterDefine.dispatchClientByData(this._bindScript.sucEvtDataArr, this._bindScript.gameObject.gameObjectId);
            UIService.hideUI(this);
        }
        else {
            ObjInterDefine.dispatchClientByData(this._bindScript.sucOnceEvtDataArr, this._bindScript.gameObject.gameObjectId);
        }
    }
}