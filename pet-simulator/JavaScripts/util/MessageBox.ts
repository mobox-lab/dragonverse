
/** 
 * AUTHOR: 森林小巷少女与狐
 * TIME: 2022.11.15-03.49.31
 */

import { GameConfig } from "../config/GameConfig";
import KeyOperationManager from "../controller/key-operation-manager/KeyOperationManager";
import MessageBox_Generate from "../ui-generate/common/MessageBox_generate";
import TipsBox_Generate from "../ui-generate/common/TipsBox_generate";
import { utils } from "./uitls";

/**二次确认框*/
export default class MessageBox extends MessageBox_Generate {
    private static _instance: MessageBox;
    private resListener: Function;//保存的结果回调方法
    private hideListener: Function;//hide回调方法

    private static _oneMess: MessageOneBox;

    public static get oneMess(): MessageOneBox {
        if (MessageBox._oneMess == null) {
            MessageBox._oneMess = mw.UIService.getUI(MessageOneBox);
        }
        return MessageBox._oneMess;
    }

    public static get instance(): MessageBox {
        if (MessageBox._instance == null) {
            MessageBox._instance = mw.UIService.getUI(MessageBox);
            MessageBox._oneMess = mw.UIService.getUI(MessageOneBox);
        }
        return MessageBox._instance;
    }


    onStart() {

        this.layer = mw.UILayerTop;

        this.mYes_btn.onClicked.add(() => {
            this.hide();
            this.resListener(true);
        });
        this.mNo_btn.onClicked.add(() => {
            this.hide();
            this.resListener(false);
        });
    }
    public static hide() {
        MessageBox._oneMess.hide();
        MessageBox._instance.hide();
    }
    /**
     * 显示消息框（单个按钮）
     * @param title 标题
     * @param content 内容
     * @param confirmListener 确认回调
     */
    public static showOneBtnMessage(content: string, resListener?: () => void, okKey: number = 0) {
        MessageBox.instance.hide()
        let okStr = GameConfig.Language.button_11.Value;
        MessageBox.instance.showMsg1(content, resListener, okStr);
    }

    /**
     * 显示消息框（两个按钮）
     * @param title 标题
     * @param content 内容
     * @param yListener “是”回调事件
     * @param nListener “否”回调事件
     */
    public static showTwoBtnMessage(content: string, resListener: (res: boolean) => void, okKey: number = 0, noKey = 0, hideListener?: () => void) {
        MessageBox.instance.hide();
        MessageBox.instance.show();

        let yesStr = GameConfig.Language.button_12.Value;
        let noStr = GameConfig.Language.button_13.Value;

        MessageBox.instance.showMsg2(content, resListener, yesStr, noStr, hideListener);
    }
    /**
     * 显示消息框（单个按钮）
     * @param title 标题
     * @param content 内容
     * @param confirmListener 确认回调
     * @param okStr 确认按钮文字
     */
    public static showOneBtnMessageWithStr(content: string, resListener: () => void, okStr: string) {
        MessageBox.instance.hide()
        MessageBox.instance.showMsg1(content, resListener, okStr);
    }

    private showMsg1(content: string, resListener: () => void, okStr: string) {
        MessageBox._oneMess.showMsg(content, resListener, okStr);
    }

    private showMsg2(content: string, resListener: (res: boolean) => void, yesStr: string, noStr: string, hideListener?: () => void) {
        this.mContent_txt.text = (content);
        this.resListener = resListener;
        this.hideListener = hideListener;
        this.mYes_btn.text = (yesStr);
        this.mNo_btn.text = (noStr);
    }

    protected onShow(...params: any[]): void {
        utils.showUITween(this);

    }

    public show(...param: any[]): void {
        super.show(...param);
        KeyOperationManager.getInstance().onKeyUp(null, Keys.Escape, () => {
            this.hide();
        });
    }

    public hide(): void {
        super.hide();
        if(this.hideListener) this.hideListener?.();
        KeyOperationManager.getInstance().unregisterKey(null, Keys.Escape);
    }
}

export class MessageOneBox extends TipsBox_Generate {

    private resListener: Function;//保存的结果回调方法

    onStart() {
        this.mBtn_OK.onClicked.add(() => {
            if (this.resListener) this.resListener();
            this.hide();
        })
    }

    public showMsg(content: string, resListener: (res: boolean) => void, okStr?: string) {
        this.mText_message.text = content;
        this.resListener = resListener;
        if (okStr) this.mBtn_OK.text = okStr;

        this.show();
    }

    public show(...param: any[]): void {
        super.show(...param);
        KeyOperationManager.getInstance().onKeyUp(null, Keys.Escape, () => {
            this.hide();
        });
    }

    public hide(): void {
        super.hide();
        KeyOperationManager.getInstance().unregisterKey(null, Keys.Escape);
    }
}