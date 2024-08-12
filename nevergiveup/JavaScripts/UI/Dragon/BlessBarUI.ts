import { DragonBlessListUnique } from "../../Modules/dragonData/DragonDataModuleC";
import { GameConfig } from "../../config/GameConfig";
import IScrollViewItem from "../../depend/scroll-view/IScrollViewItem";
import BlessItem_Generate from "../../ui-generate/Bless/BlessItem_generate";
import { Yoact } from "../../depend/yoact/Yoact";
import bindYoact = Yoact.bindYoact;
import { GlobalData } from "../../const/GlobalData";
import Gtk from "gtoolkit";
import BlessBar_Generate from "../../ui-generate/Bless/BlessBar_generate";

export enum BlessBarState {
    None = 0,
    Min = 1,
    Mid = 2,
    Max = 3
}
export default class BlessBarUI extends BlessBar_Generate{
    
    protected onAwake(): void {
        super.onAwake();
        this.initBlessBarUI(BlessBarState.None);
        //#endregion ------------------------------------------------------------------------------------------

        //#region Widget bind
        //#endregion ------------------------------------------------------------------------------------------

        //#region Event subscribe
        //#endregion ------------------------------------------------------------------------------------------
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    public initBlessBarUI(state: BlessBarState) {
        Gtk.trySetVisibility(this.img_min, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.img_mid, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.img_max, mw.SlateVisibility.Collapsed);
        switch (state) {
            case BlessBarState.Min: {
                Gtk.trySetVisibility(this.img_min, mw.SlateVisibility.Visible);
                break;                
            }
            case BlessBarState.Mid: {
                Gtk.trySetVisibility(this.img_mid, mw.SlateVisibility.Visible);
                break;
            }
            case BlessBarState.Max: {
                Gtk.trySetVisibility(this.img_max, mw.SlateVisibility.Visible);
                break;                
            }
            case BlessBarState.None:
            default: 
                break;
        }
    }
}