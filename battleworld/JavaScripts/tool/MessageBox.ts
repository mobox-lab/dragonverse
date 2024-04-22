import KeyOperationManager from "../controller/key-operation-manager/KeyOperationManager";
import MessageBox_Generate from "../ui-generate/common/MessageBox_generate";


/**二次确认框*/
export class MessageBox extends MessageBox_Generate {
    private static _instance: MessageBox;
    private resListener: Function;//保存的结果回调方法

    public static get instance(): MessageBox {
        if (MessageBox._instance == null) {
            MessageBox._instance = mw.UIService.create(MessageBox);
        }
        return MessageBox._instance;
    }


    onStart() {

        this.layer = mw.UILayerTop;

        this.mOK_btn.onClicked.add(() => {

            if (this.resListener != null) {
                this.resListener();
            }

            mw.UIService.hideUI(this);
        });
        this.mYes_btn.onClicked.add(() => {

            this.resListener(true);
            mw.UIService.hideUI(this);
        });
        this.mNo_btn.onClicked.add(() => {

            this.resListener(false);
            mw.UIService.hideUI(this);
        });
    }
    /**
     * 显示消息框（单个按钮）
     * @param title 标题
     * @param content 内容
     * @param confirmListener 确认回调
     */
    public static showOneBtnMessage(title: string, content: string, resListener?: () => void, okKey: string = "YES", richText: string = "") {

        MessageBox.instance.show();
        MessageBox.instance.showMsg1(title, content, resListener, okKey, richText);
    }

    /**
     * 显示消息框（两个按钮）
     * @param title 标题
     * @param content 内容
     * @param yListener “是”回调事件
     * @param nListener “否”回调事件
     */
    public static showTwoBtnMessage(title: string, content: string,
        resListener: (res: boolean) => void, okKey: string = "YES", noKey: string = "NO", richText: string = "") {
        MessageBox.instance.show();

        MessageBox.instance.showMsg2(title, content, resListener, okKey, noKey, richText);
    }

    private showMsg1(title: string, content: string, resListener: () => void, okStr: string, richText: string = "") {
        this.mYes_btn.visibility = (mw.SlateVisibility.Collapsed);
        this.mNo_btn.visibility = (mw.SlateVisibility.Collapsed);
        this.mOK_btn.visibility = (mw.SlateVisibility.Visible);

        this.mTitle_txt.text = (title);
        this.mContent_txt.text = (content);
        this.resListener = resListener;
        this.mOK_btn.text = (okStr);

        this.mRichText.text = (richText);
    }

    private showMsg2(title: string, content: string, resListener: (res: boolean) => void, yesStr: string, noStr: string, richText: string = "") {
        this.mYes_btn.visibility = (mw.SlateVisibility.Visible);
        this.mNo_btn.visibility = (mw.SlateVisibility.Visible);
        this.mOK_btn.visibility = (mw.SlateVisibility.Collapsed);

        this.mTitle_txt.text = (title);
        this.mContent_txt.text = (content);
        this.resListener = resListener;
        this.mYes_btn.text = (yesStr);
        this.mNo_btn.text = (noStr);
        this.mRichText.text = (richText);
    }

    public show() {
        KeyOperationManager.getInstance().onKeyUp( this, Keys.Escape, () => {
            this.resListener(false);
            mw.UIService.hideUI(this);
        });
        mw.UIService.showUI(this, mw.UILayerSystem);
    }

    public hide() {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
        mw.UIService.hideUI(this);

    }
}