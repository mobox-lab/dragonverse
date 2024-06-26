import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import Pet_item_Generate from "../../ui-generate/Pet/Pet_item_generate";

export class P_Pet_Item extends Pet_item_Generate {

    onStart() {

    }

    protected changeAllChild(isShow: boolean) {
        let visibility = isShow ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
        this.mPic_Equip.visibility = visibility;
        this.mPic_Equip_3.visibility = visibility;
        this.mPic_Peticon.visibility = visibility;
        this.mText_Value.visibility = visibility;
        this.mPic_Rainbow.visibility = visibility;
        this.mPic_Heart.visibility = visibility;
        this.mPic_delete.visibility = visibility;
        this.mPic_Effect.visibility = visibility;
        this.mPic_Equip_2.visibility = visibility;
        this.mButton_Equip.visibility = visibility;
    }
}