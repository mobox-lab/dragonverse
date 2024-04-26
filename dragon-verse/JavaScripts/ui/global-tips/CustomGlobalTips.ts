
import { GameConfig } from "../../config/GameConfig";
import GameServiceConfig from "../../const/GameServiceConfig";
import GlobalTipsPanel from "../../depend/global-tips/example/GlobalTipsPanel";
import GlobalTips, { IContentSetter } from "../../depend/global-tips/GlobalTips";
import i18n from "../../language/i18n";
import tiptiptip_Generate from "../../ui-generate/tip/tiptiptip_generate";

export default class CustomGlobalTips extends tiptiptip_Generate implements IContentSetter {
    setContent(content: string, option?: void): void {
        this.textDescription.text = content;
    }
    // tipShow?(): void {
    //     throw new Error("Method not implemented.");
    // }
    // tipHidden?(): void {
    //     throw new Error("Method not implemented.");
    // }
}

const autoRegisterSelf = () => {
    TimeUtil.onEnterFrame.remove(autoRegisterSelf);
    GlobalTips.getInstance().setBubbleWidget(CustomGlobalTips);
    GlobalTips.getInstance().setGlobalTipsContainer(GlobalTipsPanel);
    let random = Math.floor(Math.random() * GameConfig.TipsPlaylist.getAllElement().length) + 1;
    let tips = GameConfig.TipsPlaylist.getElement(random);
    GlobalTips.getInstance().showGlobalTips(i18n.lan(tips.content), { duration: GameServiceConfig.TipsDuration });
};

if (mw.SystemUtil.isClient()) {
    TimeUtil.onEnterFrame.add(autoRegisterSelf);
}
