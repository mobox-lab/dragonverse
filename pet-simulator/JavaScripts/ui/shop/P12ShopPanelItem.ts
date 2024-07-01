import { P12ShopItem } from "./P12ShopConfig";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import Online_shopItem_Generate from "../../ui-generate/Onlineshop/Online_shopItem_generate";

export class P12ShopPanelItem extends Online_shopItem_Generate {
    // 配置数据
    public data: P12ShopItem;

    protected onStart(): void {
        this.btn_Up.onClicked.add(() => {
            Log4Ts.log(P12ShopPanelItem, "Add");
        });

        this.btn_Item.onHovered.add(() => {});
        this.btn_Item.onUnhovered.add(() => {});
    }

    public setData(data: P12ShopItem) {
        this.data = data;
        this.text_Describe.text = data.name;
        this.text_MoboxNumber.text = data.value;
    }
}