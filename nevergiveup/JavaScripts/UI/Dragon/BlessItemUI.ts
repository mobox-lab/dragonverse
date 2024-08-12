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
            this.canvas_inner.renderOpacity = data.cnt ? 1 : 0.4;
            switch (data.index) {
                case 0: {
                    Gtk.trySetVisibility(this.txt_Percent, mw.SlateVisibility.Visible);
                    Gtk.trySetText(this.txt_Percent,  "3%");
                    this.txt_Percent.setFontColorByHex(data.cnt ? "#FFDB1E": "#FFFFFF");
                    break;
                }
                case 2: {
                    Gtk.trySetVisibility(this.txt_Percent, mw.SlateVisibility.Visible);
                    Gtk.trySetText(this.txt_Percent,  "6%");
                    this.txt_Percent.setFontColorByHex(data.cnt ? "#FFDB1E": "#FFFFFF");
                    break;
                }
                case 6: {
                    Gtk.trySetVisibility(this.txt_Percent, mw.SlateVisibility.Visible);
                    Gtk.trySetText(this.txt_Percent,  "10%");
                    this.txt_Percent.setFontColorByHex(data.cnt ? "#FFDB1E": "#FFFFFF");
                    break;
                }
                default: {
                    Gtk.trySetVisibility(this.txt_Percent, mw.SlateVisibility.Collapsed);
                    break;
                }
            }            
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