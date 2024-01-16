import PetBagPanel_Generate from "../../ui-generate/Pet/PetBagPanel_generate";
import Rankmain_Generate from "../../ui-generate/Rank/Rankmain_generate";
import { BagDataBase } from "./BagDataBase";
import BagItemTest from "./BagItemTest";
import BagPanelBase from "./BagPanelBase";
import { BagUIBase } from "./BagUIBase";
import { PetBag_Item } from "./P_BagItem";
import { petItemDataNew } from "./PetBagModuleData";
import BagItemDataTest from "./PetItemDataTest";


export default class BagPanelTest extends BagPanelBase<BagItemDataTest, PetBag_Item> {
    
    public onAddItem(key: string, data: BagItemDataTest): BagUIBase<BagItemDataTest, PetBag_Item> {
        let ui = mw.UIService.create(PetBag_Item);

        this.canvas.addChild(ui.uiObject);
        let item = new BagItemTest(data, ui,this);
        item.initItem();
        this.itemMap.set(key, item);
        console.log("添加完毕，大小为：" + this.itemMap.size);
        
        return item;
    }


    /**一个item刷新完后的回调 */
    protected afterOneItemRefresh(item: BagUIBase<BagItemDataTest, PetBag_Item>): void {
        
    }

    /**背包刷新完后的回调 */
    protected afterRefresh(): void {
        
    }


}