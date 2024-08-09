import { DragonBlessListUnique } from "../../Modules/dragonData/DragonDataModuleC";
import { GameConfig } from "../../config/GameConfig";
import IScrollViewItem from "../../depend/scroll-view/IScrollViewItem";
import BlessItem_Generate from "../../ui-generate/Bless/BlessItem_generate";
import { Yoact } from "../../depend/yoact/Yoact";
import bindYoact = Yoact.bindYoact;

export default class BlessItemUI extends BlessItem_Generate implements IScrollViewItem<DragonBlessListUnique>{
    //#region IScrollViewItem
    bindData(data: DragonBlessListUnique): void {
        bindYoact(() => {
            // this.img_Icon.renderOpacity = data.cnt ? 1 : 0.2;
            // this.textNumber_Count.text = data.cnt ? "x" + data.cnt.toString() : "";
        });
        const dragons = GameConfig.Dragon.getAllElement();
        const dragon = dragons?.find((d) => d.dragonPalId === data.id);
        this.img_Icon.imageGuid = dragon?.imgGuid;
    }

    get clickObj(): mw.StaleButton {
        return null;
    }

    onSetSelect(bool: boolean): void {
        // GToolkit.trySetVisibility(this.mImgSelect, bool);
    }
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}