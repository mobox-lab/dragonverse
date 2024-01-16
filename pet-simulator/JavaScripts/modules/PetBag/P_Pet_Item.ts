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


    /**品质 */
    public setQuality(id: number) {
        const quality = GlobalEnum.PetQuality;
        let cfg = GameConfig.PetARR.getElement(id);
        if (cfg.QualityType == quality.Normal) {
            this.setStarNum(0);

        } else if (cfg.QualityType == quality.Rare) {
            this.setStarNum(0);

        } else if (cfg.QualityType == quality.Epic) {
            this.setStarNum(1);
        }
        else if (cfg.QualityType == quality.Legend) {//传说
            this.setStarNum(2);

        } else if (cfg.QualityType == quality.Myth) { //神话
            this.setStarNum(3);
        }

    }

    /**设置星星数 */
    public setStarNum(num: number) {
        switch (num) {
            case 0:
                this.mPic_star1.visibility = mw.SlateVisibility.Collapsed;
                this.mPic_star2.visibility = mw.SlateVisibility.Collapsed;
                this.mPic_star3.visibility = mw.SlateVisibility.Collapsed;
                break;
            case 1:
                this.mPic_star1.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mPic_star2.visibility = mw.SlateVisibility.Collapsed;
                this.mPic_star3.visibility = mw.SlateVisibility.Collapsed;
                break;
            case 2:
                this.mPic_star1.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mPic_star2.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mPic_star3.visibility = mw.SlateVisibility.Collapsed;
                break;
            case 3:
                this.mPic_star1.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mPic_star2.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mPic_star3.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            default:
                break;
        }
    }

}