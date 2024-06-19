import IScrollViewItem from "../../depend/scroll-view/IScrollViewItem";
import { DragonHandbookUnique } from "../../module/bag/BagModule";
import { Yoact } from "../../depend/yoact/Yoact";
import bindYoact = Yoact.bindYoact;
import GToolkit from "../../util/GToolkit";
import { GameConfig } from "../../config/GameConfig";
import DragonHandbookItem_Generate from "../../ui-generate/dragon-handbook/DragonHandbookItem_generate";

export default class DragonHandbookItem extends DragonHandbookItem_Generate implements IScrollViewItem<DragonHandbookUnique> {
//#region IScrollViewItem
    bindData(data: DragonHandbookUnique): void {
        bindYoact(() => {
            this.rootCanvas.renderOpacity = data.cnt ? 1 : 0.2;
            this.textNumber_Count.text = data.cnt ? "x" + data.cnt.toString() : "";
        });
        this.imgHandbook_Icon.imageGuid = GameConfig.BagItem.getElement(data.id).icon;
    }

    get clickObj(): mw.StaleButton {
        return this.btnHandbook;
    }

    onSetSelect(bool: boolean): void {
        GToolkit.trySetVisibility(this.mImgSelect, bool);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}