/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-01-31 11:20:52
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-01-31 13:45:09
 * @FilePath     : \DragonVerse\battleworld\JavaScripts\ui\BuyEnergyPanel.ts
 * @Description  : 购买战斗次数
 */

import { GameConfig } from "../config/GameConfig";
import KeyOperationManager from "../controller/key-operation-manager/KeyOperationManager";
import { ShopModuleC } from "../module/ShopModule/ShopModuleC";
import { MessageBox } from "../tool/MessageBox";
import Tips from "../tool/P_Tips";
import BuyPanel_Generate from "../ui-generate/Buy/BuyPanel_generate";
import ItemBuy_Generate from "../ui-generate/Buy/ItemBuy_generate";

export default class BuyEnergyPanel extends BuyPanel_Generate {
    onStart() {
        let configs = GameConfig.GoodsTable.getAllElement();
        configs.forEach(item => {
            let goodsItem = UIService.create(ItemBuy_Generate);
            goodsItem.mItemName.text = item.title;
            goodsItem.price.text = `${item.price}`;
            goodsItem.count.text = `X${item.buyCount}`;
            goodsItem.mSelectBtn.onClicked.add(() => {
                this.mainCanvas.visibility = SlateVisibility.Hidden;
                //购买item
                MessageBox.showTwoBtnMessage(GameConfig.Language.Shop_btn_5.Value, GameConfig.Language.Buy_Confirm_Text.Value, (res) => {
                    if (res) {
                        //确认购买
                        this.mCanvas_undo.visibility = SlateVisibility.HitTestInvisible;
                        //请求
                        ModuleService.getModule(ShopModuleC).buyBattleTimes(item.id).then((res) => {
                            if (res) {
                                //购买成功
                                Tips.show(GameConfig.Language.Buy_Success_Text.Value);
                            } else {
                                Tips.show(GameConfig.Language.Buy_Fail_Text.Value);
                            }
                            UIService.hideUI(this);
                        });

                    } else {
                        UIService.showUI(this);
                    }
                });
            });
            this.mSelectList.addChild(goodsItem.uiObject);
        });

        this.mCollapsedBtn.onClicked.add(() => {
            UIService.hideUI(this);
        });

        KeyOperationManager.getInstance().onKeyUp(Keys.Escape, this, () => {
            UIService.hideUI(this);
        });
    }
    onShow() {
        this.mainCanvas.visibility = SlateVisibility.Visible;
        this.mCanvas_undo.visibility = SlateVisibility.Hidden;
    }

    onHide() {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }
}