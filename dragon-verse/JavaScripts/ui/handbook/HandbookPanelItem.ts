import HandbookPanelItem_Generate from "../../ui-generate/handbook/HandbookPanelItem_generate";
import IScrollViewItem from "../../depend/scroll-view/IScrollViewItem";
import { HandbookItemUnique } from "../../module/bag/BagModule";
import { Yoact } from "../../depend/yoact/Yoact";
import bindYoact = Yoact.bindYoact;
import { GameConfig } from "../../config/GameConfig";
import GToolkit from "gtoolkit";
import i18n from "../../language/i18n";

export default class HandbookPanelItem extends HandbookPanelItem_Generate implements IScrollViewItem<HandbookItemUnique> {
//#region IScrollViewItem
    public bindData(data: HandbookItemUnique): void {
        bindYoact(() => this.mTextName.text = i18n.lan(GameConfig.BagItem.getElement(data.id).name));
        bindYoact(() => this.mIconImage.imageGuid = GameConfig.BagItem.getElement(data.id).icon);
        bindYoact(() => GToolkit.trySetVisibility(this.mTextLevel, data.collected));
    }

    public get clickObj(): mw.StaleButton {
        return this.mBgBtn;
    }

    public onSetSelect(bool: boolean): void {
        return;
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}