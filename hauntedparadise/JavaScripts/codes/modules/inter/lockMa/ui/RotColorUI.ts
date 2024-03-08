import Color_UI_Generate from "../../../../../ui-generate/ShareUI/Color_UI_generate";
import { MainUI } from "../../../../ui/MainUI";
import { LanUtil } from "../../../../utils/LanUtil";
import { InterSaveModuleC } from "../../InterSaveHelper";
import { ObjInterDefine } from "../../ObjInterDefine";
import RotLock from "../RotLock";
import { BaseRecUI } from "./BaseRecUI";

export class RotColorUI extends BaseRecUI {
    protected get bindGo(): mw.GameObject {
        return this._bindScript.gameObject;
    }
    private _bindScript: RotLock;

    /** 当前的旋转量 */
    private _curRot: number;

    private _targetRotZ: number = 0;

    private _tween;

    onStart(): void {
        super.onStart();
        let ori = this.maskBtn_0.maskImageGuid;
        for (let index = 0; index < 4; index++) {
            let btn = this[`maskBtn_${index}`];
            this._maskBtnArray.push(btn);
            btn.maskImageGuid = ori;
        }
    }

    onShow(rotLoc: RotLock) {
        UIService.hide(MainUI);
        this._bindScript = rotLoc;
        this.resetUI();

        for (let index = 0; index < rotLoc.targetDataArr.length; index++) {
            let elm = rotLoc.targetDataArr[index];
            let maskBtn = this[`maskBtn_${index}`] as MaskButton;
            maskBtn.visibility = SlateVisibility.SelfHitTestInvisible;
            maskBtn.renderTransformAngle = elm.area + rotLoc.targetRot + 1.8;
            maskBtn.fanShapedValue = 0.99;
            if (index != 0) {
                this._cavsRotArray[index].visibility = SlateVisibility.SelfHitTestInvisible;
                this._cavsRotArray[index].renderTransformAngle = elm.area;
            }
        }
        this.text_tip.text = LanUtil.getText("ts_tips_108");

        this._curRot = 0;
        this._targetRotZ = 0;
        this.canvas_rotate1.visibility = SlateVisibility.SelfHitTestInvisible;
        this.canvas_rotate1.renderTransformAngle = this._curRot;
        if (rotLoc.isUnlocked) {
            this.canUpdate = false;
            this._curRot = this._bindScript.targetRot;
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


    public onCheckRotation(): void {
        if (this._bindScript.isUnlocked) {
            return;
        }
        this._targetRotZ = Math.round(this._targetRotZ + this._bindScript.rotRate);
        if (this._tween) {
            this._tween.stop()
            TweenUtil.TWEEN.remove(this._tween);
            this._tween = null;
        }
        this._tween = new Tween({ rot: this._curRot })
            .to({ rot: this._targetRotZ }, this._bindScript.rotSpeed == 0 ? 0 : this._bindScript.rotRate / this._bindScript.rotSpeed * 1000)
            .onUpdate((t) => {
                this._curRot = t.rot;
                this.canvas_rotate1.renderTransformAngle = this._curRot;
            })
            .onComplete(() => {
                let curRot = this._curRot % 360
                if (curRot < 0) {
                    curRot -= 360;
                }
                console.log("RotLoc" + curRot)
                if (curRot == this._bindScript.targetRot) {
                    UIService.hideUI(this);
                    this._bindScript.isUnlocked = true;
                    this._bindScript.save2Archive(1);
                    ObjInterDefine.dispatchClientByData(this._bindScript.evtDataArr, this._bindScript.gameObject.gameObjectId);
                }
                TweenUtil.TWEEN.remove(this._tween);
                this._tween = null;
            }).start();
    }
}
