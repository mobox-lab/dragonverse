import GuideDialog_Generate from "../../../ui-generate/guideModule/GuideDialog_generate";

export class GuideDialog extends GuideDialog_Generate {

    private mDialogMsgs: string[] = [];
    private mDialogCall: Function = null;
    private dialogIndex: number = 0

    onStart() {
        this.layer = mw.UILayerDialog;
        this.rootCanvas.visibility = mw.SlateVisibility.Visible;

        this.mGuideBtn.onClicked.add(() => {
            this.refresh_nextDialogText();
        });
    }

    /**
     * 显示对话框
     *
     * @param param 参数列表
     * @param param[0] 对话框消息
     * @param param[1] 对话框回调
     */
    onShow(...param: any[]) {
        this.mDialogMsgs = param[0];
        this.mDialogCall = param[1];

        this.dialogIndex = 0;
        this.refresh_dialogTxt();
    }


    private refresh_dialogTxt() {
        let dialogTxt = this.mDialogMsgs[this.dialogIndex];
        if (dialogTxt == null) {
            return;
        }

        this.mGuideText.text = dialogTxt;
    }

    /**刷新下个提示信息 */
    private refresh_nextDialogText() {
        this.dialogIndex++;

        if (this.dialogIndex >= this.mDialogMsgs.length) {
            UIService.hideUI(this);
            if (this.mDialogCall) {
                this.mDialogCall();
            }
            return;
        }
        this.refresh_dialogTxt();
    }

}