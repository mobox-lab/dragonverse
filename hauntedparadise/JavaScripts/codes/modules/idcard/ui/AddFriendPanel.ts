import FriendRequest_UI_Generate from "../../../../ui-generate/ShareUI/card/FriendRequest_UI_generate";
import Tips from "../../../utils/Tips";

export default class AddFriendHud extends FriendRequest_UI_Generate {

    userId: string;

    closeTimer: any;

    protected onStart() {

        this.btn_yes.onClicked.add(() => {
            if (!this.userId) { return; }
            AccountService.isFriend((isSuccess: boolean, jsonData: string) => {
                if (!isSuccess) {
                    AccountService.addFriend((isSuccess) => {
                        if (isSuccess) {
                            this.canvas_friend1.visibility = SlateVisibility.Collapsed;
                            this.canvas_friend2.visibility = SlateVisibility.SelfHitTestInvisible;
                            this.closeTimer = setTimeout(() => {
                                UIService.hideUI(this);
                            }, 2e3);
                        }
                    }, this.userId, "请求添加你为好友！");
                } else {
                    Tips.show("已经是好友了！（记得接多语言）");
                }
            }, this.userId);
        });

        this.btn_no.onClicked.add(() => {
            UIService.hideUI(this);
        });
    }

    protected onHide() {
        this.userId = null;
        this.closeTimer && clearTimeout(this.closeTimer);
        this.closeTimer = null;
    }

    protected onShow(userId: string, nickName: string) {
        this.closeTimer && clearTimeout(this.closeTimer);
        this.canvas_friend1.visibility = SlateVisibility.SelfHitTestInvisible;
        this.canvas_friend2.visibility = SlateVisibility.Collapsed;
        this.userId = userId;
        this.text_friendRequest.text = StringUtil.format("向{0}发送好友申请？（记得接多语言）", nickName);
    }
}