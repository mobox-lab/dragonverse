import BagItemIcon_Generate from "../../ui-generate/bag/BagItemIcon_generate";
import IScrollViewItem from "../../depend/scroll-view/IScrollViewItem";
import { DragonHandbookUnique } from "../../module/bag/BagModule";
import { Yoact } from "../../depend/yoact/Yoact";
import bindYoact = Yoact.bindYoact;
import GToolkit from "../../util/GToolkit";
import { GameConfig } from "../../config/GameConfig";

export default class DragonHandbookItem extends BagItemIcon_Generate implements IScrollViewItem<DragonHandbookUnique> {
//#region IScrollViewItem
    bindData(data: DragonHandbookUnique): void {
        // bindYoact(() => this.mItemNum.text = data.count.toString());
        this.mImgIcon.imageGuid = GameConfig.BagItem.getElement(data.id).icon;
    }

    get clickObj(): mw.StaleButton {
        return this.mItemBtn;
    }

    onSetSelect(bool: boolean): void {
        GToolkit.trySetVisibility(this.mImgSelect, bool);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}