import { GameConfig } from "../../config/GameConfig";
import Pet_item_Generate from "../../ui-generate/Pet/Pet_item_generate";
import { RankPanelItem } from "../Rank/P_Rank";
import { RankUIData } from "../Rank/RankModuleC";
import { BagUIBase } from "./BagUIBase";
import { IBagUI, Layout } from "./IBagUI";
import { PetBag_Item } from "./P_BagItem";
import { petItemDataNew } from "./PetBagModuleData";
import BagItemDataTest from "./PetItemDataTest";


export default class BagItemTest extends BagUIBase<BagItemDataTest, PetBag_Item>{


    /**初始化item数据 */
    initItem() {
        console.log("initItem");
        let conf = GameConfig.PetARR.getElement(this.data.I);
        // ui图片
        this.ui.mPic_Peticon.imageGuid = conf.uiGuid;
        // 点击事件
        this.ui.mButton_Equip.onPressed.add(this.onClickItem.bind(this));
    }


    onClickItem() {
        console.log("被点击了捏");
    }




}