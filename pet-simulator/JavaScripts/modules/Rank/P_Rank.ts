
import RankItem_Generate from "../../ui-generate/Rank/RankItem_generate";
import { GlobalData } from "../../const/GlobalData";
import { utils } from "../../utils/uitls";
import { RankUIData } from "./RankModuleC";
import { RankType } from "./RankModuleS";


export enum Filed {
    /**名称 */
    Name,
    /**数量 */
    Has,
    /**钻石 */
    Gem
}
/**事件名称 */
export enum EventNames {
    /**显示数量排行字段 */
    SetHas = "Has",
    /**显示钻石排行 */
    SetGem = "SetGem",
}



export class RankPanelItem extends RankItem_Generate {

    /**该item对应的排名 */
    public rank:number;
    /**item对应的playerid */
    public playerId: number;

    /**设置排行榜ItemUI数据 */
    public setData(uiData: RankUIData, type: RankType): void {

        let colors = GlobalData.Rank.nameColors;
        if (uiData.rank < 4) {
            this.mText_RankNum.setFontColorByHex(colors[uiData.rank - 1]);
        } else {
            this.mText_RankNum.setFontColorByHex("#FFFFFFFF");
        }

        this.mImage.imageGuid = GlobalData.Rank.itemImageGuids.get(type);
        this.mText_RankNum.text = "#" + uiData.rank;
        this.rank = uiData.rank;
        this.playerId = uiData.playerId;
        this.mText_Count.text = utils.formatNumber(uiData.value);
        this.mText_Username.text = uiData.name.toString();
    }

}

