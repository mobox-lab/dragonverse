import { DragonBlessListUnique } from "../../Modules/dragonData/DragonDataModuleC";
import { GameConfig } from "../../config/GameConfig";
import IScrollViewItem from "../../depend/scroll-view/IScrollViewItem";
import BlessItem_Generate from "../../ui-generate/Bless/BlessItem_generate";
import { Yoact } from "../../depend/yoact/Yoact";
import bindYoact = Yoact.bindYoact;
import { GlobalData } from "../../const/GlobalData";
import Gtk from "gtoolkit";

export default class BlessItemUI extends BlessItem_Generate implements IScrollViewItem<DragonBlessListUnique>{
    //#region IScrollViewItem
    bindData(data: DragonBlessListUnique): void {
        bindYoact(() => {
            this.rootCanvas.renderOpacity = data.cnt ? 1 : 0.4;
            Gtk.trySetVisibility(this.txt_Percent, data.cnt ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed);
        });
        const dragons = GameConfig.Dragon.getAllElement();
        const dragon = dragons?.find((d) => d.dragonPalId === data.id);
        this.img_Icon.imageGuid = dragon?.imgGuid;
        this.img_IconBg.imageGuid = GlobalData.Bless.blessItemBgGuid[(dragon?.tdElemetType || 1) - 1];
        this.img_Corner.imageGuid = GlobalData.Shop.shopItemCornerIconGuid[(dragon?.tdElemetType || 1) - 1];
    }

    get clickObj(): mw.StaleButton {
        return null;
    }

    onSetSelect(bool: boolean): void {
        // GToolkit.trySetVisibility(this.mImgSelect, bool);
    }
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}