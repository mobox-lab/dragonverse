import InputDialog_Generate from "../../../../ui-generate/ShareUI/common/InputDialog_generate";
import { CommonUtils } from "../../../utils/CommonUtils";
import { LanUtil } from "../../../utils/LanUtil";
import Tips from "../../../utils/Tips";

export class DialogUI extends InputDialog_Generate {

    /**
     * 初始化UI，添加点击事件，设置UI层级，设置输入框文本变化事件
     */
    protected onStart() {
        this.layer = mw.UILayerTop;
        this.btn_quit.onClicked.add(() => {
            this.hide();
        });
    }
    /**
     * 显示UI，设置标题，内容，输入内容，是否能输入年龄，文本长度限制，接受回调，接受文本，拒绝回调，拒绝文本
     * @param title 标题 
     * @param content 内容
     * @param inputContent 输入内容
     * @param isInputAge 是否能输入年龄
     * @param textLengthLimit 文档长度限制
     * @param yes 接受回调
     * @param yesText 接受文本
     * @param no 拒绝回调
     * @param noText 拒绝文本
     */
    show(title: string, content: string, inputContent: string, isInputAge: boolean, textLengthLimit: number, yes: (inputText: string) => void, yesText?: string, no?: (inputText: string) => void, noText?: string) {
        this.in_value.textLengthLimit = textLengthLimit;
        this.txt_title.text = title;
        this.txt_content.text = content;
        this.in_value.text = inputContent;
        this.btn_getName.visibility = mw.SlateVisibility.Collapsed;
        this.adImage.visibility = mw.SlateVisibility.Collapsed;
        this.btn_cancel.visibility = mw.SlateVisibility.Visible;
        this.btn_confirm.visibility = mw.SlateVisibility.Visible;
        /**Btn*/
        this.btn_confirm.onClicked.clear();
        this.btn_cancel.onClicked.clear();
        this.btn_confirm.text = yesText || LanUtil.getText("UI_Dialog_1");
        this.btn_confirm.onClicked.add(() => {
            StringUtil.maskWordCheck(this.in_value.text).then((result) => {
                if (result.result) {
                    if (yes) {
                        yes(this.in_value.text);
                    }
                    yes = null;
                    this.hide();
                } else {
                    Tips.show(LanUtil.getText("UI_Dialog_11"));
                }
            });
        });
        this.btn_cancel.text = noText || LanUtil.getText("UI_Dialog_2");
        this.btn_cancel.onClicked.add(() => {
            if (no) {
                no(this.in_value.text);
            }
            this.hide();
        });
        mw.UIService.showUI(this, this.layer);
    }

    /**
     * 隐藏界面
     */
    hide() {
        mw.UIService.hideUI(this);
    }
}