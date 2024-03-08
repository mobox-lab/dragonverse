import { CSDialog_Generate } from "./generate/CSDialog_generate";

/**
 * 通用确认对话框
 */
export class UICSDialog extends CSDialog_Generate {
    /** 确认回调 */
    private _handleYes: Function;
    /** 取消回调 */
    private _handleNo: Function;

    /** 
     * UI初始化时调用，初始化按钮事件
     */
    protected onStart(): void {
        this.mBtnClose.onClicked.add(() => {
            this.hide();
        });
        this.mBtnNo.onClicked.add(() => {
            this.hide();
            if (this._handleNo) {
                this._handleNo();
                this._handleNo = null;
            }
        });
        this.mBtnYes.onClicked.add(() => {
            this.hide();
            if (this._handleYes) {
                this._handleYes();
                this._handleYes = null;
            }
        });
    }

    /** 
     * 显示
     * @param text 文本
     * @param onYes 确认回调
     * @param onNo 取消回调
     */
    public show(text: string, onYes?: () => void, onNo?: () => void) {
        this.mTextContent.text = text;
        this._handleYes = onYes;
        this._handleNo = onNo;
        mw.UIService.showUI(this);
    }

    /** 
     * 隐藏 
     */
    public hide() {
        mw.UIService.hideUI(this);
    }
}
