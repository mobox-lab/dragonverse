/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-01-24 17:39:11
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-01-25 10:32:26
 * @FilePath     : \DragonVerse\pet-simulator\JavaScripts\ui\BuyCoinPanel.ts
 * @Description  : 商店界面
 */

import { MapEx } from "odin";
import { GameConfig } from "../config/GameConfig";
import BuyUI_Generate from "../ui-generate/Buy/BuyUI_generate";
import { BuffItem } from "../modules/buff/ui/BuffItem";

import MessageBox from "../utils/MessageBox";
import KeyOperationManager from "../controller/key-operation-manager/KeyOperationManager";
import BuyItem_Generate from "../ui-generate/Buy/BuyItem_generate";



export default class BuyCoinPanel extends BuyUI_Generate {
    onStart() {
        this.mCanvas_undo.visibility = SlateVisibility.Hidden;
        GameConfig.GoodsTable.getAllElement().forEach(item => {
            let buyItem = UIService.create(BuyCoinItem);
            buyItem.initUI(item.title, item.buyCount, item.price, () => {
                MessageBox.showTwoBtnMessage(GameConfig.Language.BuyDollCoin_Text_1.Value, (res) => {
                    if (res) {
                        this.mCanvas_undo.visibility = SlateVisibility.HitTestInvisible;
                        //请求
                        console.log(item.buyCount);
                    }
                });
            });
            this.mCanvas_List.addChild(buyItem.uiObject);
        })

        this.mBtn_close.onClicked.add(() => {
            this.hide();
        })

        KeyOperationManager.getInstance().onKeyUp(Keys.Escape, this, () => {
            this.hide();
        })
    }

    public hide(): void {
        super.hide();
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }
}

class BuyCoinItem extends BuyItem_Generate {
    initUI(title: string, count: number, price: number, clickCallBack: () => void) {
        this.mText_Name.text = title;
        this.mText_Info.text = `X${count}`;
        this.mText_Price.text = `${price}`;

        this.mBtn.onClicked.add(clickCallBack);
    }
}