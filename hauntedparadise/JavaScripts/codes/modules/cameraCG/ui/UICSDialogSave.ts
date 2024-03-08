import { CSDialogSave_Generate } from "./generate/CSDialogSave_generate";

/**
 * 导入时使用的弹出对话框
 */
export class UICSDialogSave extends CSDialogSave_Generate {

    /** 
     * UI初始化时调用，初始化按钮事件
     */
    protected onAwake(): void {
        this.mBtnClose.onClicked.add(() => {
            this.hide()
        });
    }

    /** 
     * 显示
     * @param jsonStr json字符串
     */
    public show(jsonStr: string) {
        this.mInput.text = jsonStr;
        mw.UIService.showUI(this);
    }

    /** 
     * 隐藏 
     */
    public hide() {
        mw.UIService.hideUI(this);
    }

}
