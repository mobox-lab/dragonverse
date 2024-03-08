import { CSEditor } from "../CSEditor";
import { Log } from "../utils/Log";
import { CSEditorInfoUI_Generate } from "./generate/CSEditorInfoUI_generate";

/**
 * 关键帧数据类型枚举
 */
enum KeyFrameInfoType {
    Time,
    LocationX,
    LocationY,
    LocationZ,
    RotationX,
    RotationY,
    RotationZ,
    FOV
}

export class UICSEditorInfo extends CSEditorInfoUI_Generate {

    private _locCache: mw.Vector = new mw.Vector();
    private _rotCache: mw.Rotation = new mw.Rotation();

    protected onStart(): void {
        this.layer = UILayerTop;
        this.initUI();
    }

    private initUI(): void {
        // KeyFrameCtrl
        const inputs = [
            { input: this.mInputLocX, type: KeyFrameInfoType.LocationX },
            { input: this.mInputLocY, type: KeyFrameInfoType.LocationY },
            { input: this.mInputLocZ, type: KeyFrameInfoType.LocationZ },
            { input: this.mInputRotP, type: KeyFrameInfoType.RotationY },
            { input: this.mInputRotY, type: KeyFrameInfoType.RotationZ },
            { input: this.mInputRotR, type: KeyFrameInfoType.RotationX },
            { input: this.mInputFOV, type: KeyFrameInfoType.FOV },
        ]
        inputs.forEach((item) => {
            item.input.onTextChanged.add((text) => {
                this.handleKeyFrameChanged(item.type, text);
            });
        })
        // Del
        this.mBtnDelKeyFrame.onClicked.add(() => {
            CSEditor.instance.delKeyframe();
        });
    }


    /**
     * 处理关键帧编辑时的值应用
     * @param type 
     * @param text 
     * @returns 
     */
    private handleKeyFrameChanged(type: KeyFrameInfoType, text: string) {
        if (!this._locCache || !this._rotCache || CSEditor.instance.selectFramesIndex < 0) return;
        const textNumber = Number(text.trim())
        if (isNaN(textNumber) || textNumber == undefined || textNumber == null) {
            Log.warn("关键帧值设置异常");
            return
        }
        switch (type) {
            case KeyFrameInfoType.LocationX:
                this._locCache.x = textNumber;
                CSEditor.instance.modifyKeyFramesLoc(CSEditor.instance.selectFramesIndex, this._locCache);
                break;
            case KeyFrameInfoType.LocationY:
                this._locCache.y = textNumber;
                CSEditor.instance.modifyKeyFramesLoc(CSEditor.instance.selectFramesIndex, this._locCache);
                break;
            case KeyFrameInfoType.LocationZ:
                this._locCache.z = textNumber;
                CSEditor.instance.modifyKeyFramesLoc(CSEditor.instance.selectFramesIndex, this._locCache);
                break;
            case KeyFrameInfoType.RotationX:
                this._rotCache.x = textNumber;
                CSEditor.instance.modifyKeyFramesRot(CSEditor.instance.selectFramesIndex, this._rotCache);
                break;
            case KeyFrameInfoType.RotationY:
                this._rotCache.y = textNumber;
                CSEditor.instance.modifyKeyFramesRot(CSEditor.instance.selectFramesIndex, this._rotCache);
                break;
            case KeyFrameInfoType.RotationZ:
                this._rotCache.z = textNumber;
                CSEditor.instance.modifyKeyFramesRot(CSEditor.instance.selectFramesIndex, this._rotCache);
                break;
            case KeyFrameInfoType.FOV:
                CSEditor.instance.modifyKeyFramesFOV(CSEditor.instance.selectFramesIndex, textNumber);
                break;
            default:
                Log.err("未更改任何可用值");
                return;
        }
    }

    public setPos(pos: Vector2): void {
        UIService.showUI(this);
        this.uiObject.position = pos;
        this.rootCanvas.visibility = mw.SlateVisibility.Hidden;
    }

    /**
     * 选中指定索引的帧
     * @param index 
     */
    public selectFrames(index: number) {
        const info = CSEditor.instance.getKeyFrames(index);
        if (this.rootCanvas.visibility != mw.SlateVisibility.Visible) {
            this.rootCanvas.visibility = mw.SlateVisibility.Visible;
        }
        this._locCache.set(info.location);
        this._rotCache.set(info.rotation);
        this.mInputLocX.text = info.location.x.toString();
        this.mInputLocY.text = info.location.y.toString();
        this.mInputLocZ.text = info.location.z.toString();
        this.mInputRotP.text = info.rotation.y.toString();
        this.mInputRotY.text = info.rotation.z.toString();
        this.mInputRotR.text = info.rotation.x.toString();
        this.mInputFOV.text = info.fov.toString();
    }

    /**
     * 取消帧选中
     */
    public unSelectFrames() {
        // 将选中用于修改的节点置为空
        if (this.rootCanvas.visibility != mw.SlateVisibility.Hidden) {
            this.rootCanvas.visibility = mw.SlateVisibility.Hidden;
        }
    }

}
