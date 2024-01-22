import { UIPool } from "../../Tools/UIPool";
import { GlobalData } from "../../const/GlobalData";
import MsgItem_Generate from "../../ui-generate/Trade/MsgItem_generate";
import MsgPanel_Generate from "../../ui-generate/Trade/MsgPanel_generate";
import { ChatMsg } from "../../utils/ChatMsg";
import { P_Trading } from "./P_Trading";

export class P_Msg extends MsgPanel_Generate {

    /**发送聊天事件 */
    public onSendMsgAC: Action1<string> = new Action1();

    private uiPool: UIPool<msgItem>;

    private msgCount: number = 0;
    private curPlayerId: number;

    onStart() {
        this.initItemPool();
        this.mBtn_Send.onClicked.add(this.sendMsg.bind(this));
        ChatMsg.onEnqueueAC.add(this.msgChange.bind(this));
        this.curPlayerId = Player.localPlayer.playerId;
    }

    protected onShow(...params: any[]): void {

    }

    /**初始化itemPool */
    private initItemPool() {
        this.uiPool = new UIPool<msgItem>();
        this.uiPool.setCreator(() => {
            let item = mw.UIService.create(msgItem);
            item.uiObject.autoSizeEnable = true;
            return item;
        })
    }
    /**清除聊天 */
    public clearMsg() {
        this.msgCount = 0;
        this.uiPool.resetAll();
        this.hide();
    }

    onHide() {
        mw.UIService.getUI(P_Trading).setRedPointVis(false);
    }

    private sendMsg() {
        let msg = this.mInputBox_Msg.text.trim();
        if (msg.length > 0) {
            this.onSendMsgAC.call(msg);
            this.mInputBox_Msg.text = "";
        }
    }


    /**聊天信息改变 */
    private msgChange() {
        let msgItem = ChatMsg.dequeue();

        let item = this.uiPool.get();
        item.setText(msgItem.msg);
        this.mScrollBox.addChild(item.uiObject);

        if (msgItem.playerID == this.curPlayerId) {
            this.addMyMsg(item);
        } else {
            this.addOtherMsg(item);
        }
        this.msgCount++;

    }

    /**添加自己的消息 */
    private addMyMsg(item: msgItem) {
        let loc = new mw.Vector2(GlobalData.Chat.selfItemOffsetX, GlobalData.Chat.topItemOffsetY + this.msgCount * GlobalData.Chat.betweenOffsetY);
        item.uiObject.position = loc;
        item.setImgColor(GlobalData.Chat.chatBgColor[0]);

    }
    /**添加其他玩家的消息 */
    private addOtherMsg(item: msgItem) {
        let loc = new mw.Vector2(GlobalData.Chat.otherItemOffsetX, GlobalData.Chat.topItemOffsetY + this.msgCount * GlobalData.Chat.betweenOffsetY);
        item.uiObject.position = loc;
        item.setImgColor(GlobalData.Chat.chatBgColor[1]);
    }




}


export class msgItem extends MsgItem_Generate {

    /**设置文本 */
    public setText(str: string) {
        this.mText_Msg.text = str;
    }
    /**设置图片颜色 */
    public setImgColor(color: string) {
        this.mImage_Back.setImageColorByHex(color);
    }

}