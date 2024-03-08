
import { CSEditor } from "../CSEditor";
import { CSDialogLoad_Generate } from "./generate/CSDialogLoad_generate";

/**
 * 导入时使用的弹出对话框
 */
export class UICSDialogLoad extends CSDialogLoad_Generate {

    /** 默认的文本显示 */
    private _defHintStr: string;

    /** 
     * UI初始化时调用，记录默认文本，初始化按钮事件
     */
    protected override onAwake(): void {
        this._defHintStr = this.mInput.hintString;

        this.mBtnClose.onClicked.add(() => {
            this.hide()
        });
        this.mBtnLoad.onClicked.add(() => {
            if (CSEditor.instance.loadAnim(this.mInput.text, true)) {
                this.hide();
            } else {
                this.mInput.text = "";
                this.mInput.hintString = "字符串异常，导入失败";
            }
        });
    }

    /** 
     * 显示
     */
    public show() {
        this.mInput.hintString = this._defHintStr
        mw.UIService.showUI(this);
    }

    /** 
     * 隐藏 
     */
    public hide() {
        mw.UIService.hideUI(this);
    }
}
