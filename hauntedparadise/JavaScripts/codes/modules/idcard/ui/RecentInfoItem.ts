import GiftName_UI_Generate from "../../../../ui-generate/ShareUI/card/GiftName_UI_generate";
import Giftrecord_UI_Generate from "../../../../ui-generate/ShareUI/card/Giftrecord_UI_generate";
import LikeName_UI_Generate from "../../../../ui-generate/ShareUI/card/LikeName_UI_generate";
import { GiftInfo, RecentGiftInfo, RecentLikeInfo } from "../IDCardConst";
import IDCardPanel from "./IDCardPanel";

export class RecentLikeInfoItem extends LikeName_UI_Generate {

    public onSelect: Action;
    public isSelected: boolean;

    public setSelected(isTrue: boolean) {
    }

    protected onStart() {
        this.onSelect = new Action();
        this.btn_likeName.onClicked.add(() => {
            UIService.show(IDCardPanel, this.userId);
        })
    }

    private userId: string;

    public setData(recentLikeInfo: RecentLikeInfo) {
        this.userId = recentLikeInfo.userId;
        this.text_likeName.text = "玩家" + "：" + recentLikeInfo.nickName.substring(0, 16) + "（最多字数16）";
    }
}

export class RecentGiftInfoItem extends GiftName_UI_Generate {

    public onSelect: Action;
    public isSelected: boolean;

    public setSelected(isTrue: boolean) {
    }

    protected onStart() {
        this.onSelect = new Action();
        this.btn_giftName.onClicked.add(() => {
            UIService.show(IDCardPanel, this.userId);
        })
    }

    private userId: string;

    public setData(userId: string, nickname: string, giftInfo: RecentGiftInfo) {
        this.userId = userId;
        this.text_giftName.text = "玩家" + "：" + nickname.substring(0, 16) + "（最多字数16）";
        // this.img_giftItem.imageGuid = giftInfo.id;
        this.text_giftNum1.text = "✖" + giftInfo.count;
    }
}