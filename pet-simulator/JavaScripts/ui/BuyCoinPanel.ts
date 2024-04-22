/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-01-24 17:39:11
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-01-29 09:59:42
 * @FilePath     : \DragonVerse\pet-simulator\JavaScripts\ui\BuyCoinPanel.ts
 * @Description  : 商店界面
 */

import { GameConfig } from "../config/GameConfig";
import BuyUI_Generate from "../ui-generate/Buy/BuyUI_generate";

import MessageBox from "../util/MessageBox";
import KeyOperationManager from "../controller/key-operation-manager/KeyOperationManager";
import { PlayerModuleC } from "../modules/Player/PlayerModuleC";
import { TipsManager } from "../modules/Hud/P_TipUI";
import Buyitem_Generate from "../ui-generate/Buy/Buyitem_generate";

export default class BuyCoinPanel extends BuyUI_Generate {
    onStart() {

        GameConfig.GoodsTable.getAllElement().forEach(item => {
            let buyItem = UIService.create(BuyCoinItem);
            buyItem.initUI(item.title, item.buyCount, item.price, () => {
                MessageBox.showTwoBtnMessage(GameConfig.Language.BuyDollCoin_Text_1.Value, (res) => {
                    if (res) {
                        this.mCanvas_undo.visibility = SlateVisibility.HitTestInvisible;
                        //请求
                        ModuleService.getModule(PlayerModuleC).buyDollCoin(item.id).then((res) => {
                            if (res) {
                                //购买成功
                                TipsManager.instance.showTip(GameConfig.Language.BuyDollCoin_Success_Text_1.Value);

                            } else {
                                TipsManager.instance.showTip(GameConfig.Language.BuyDollCoin_Fail_Text_1.Value);
                            }
                            this.hide();
                        });
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

    protected onShow(...params: any[]): void {
        super.onShow(...params);
        this.mCanvas_undo.visibility = SlateVisibility.Hidden;
    }

    public hide(): void {
        super.hide();
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }
}

class BuyCoinItem extends Buyitem_Generate {
    initUI(title: string, count: number, price: number, clickCallBack: () => void) {
        this.mText_Name.text = title;
        this.mText_Info.text = `X${count}`;
        this.mText_Price.text = `${price}`;

        this.mBtn.onClicked.add(clickCallBack);
    }
}