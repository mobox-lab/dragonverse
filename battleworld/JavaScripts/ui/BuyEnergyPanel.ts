/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-01-31 11:20:52
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-05-11 15:50:32
 * @FilePath     : \DragonVerse\battleworld\JavaScripts\ui\BuyEnergyPanel.ts
 * @Description  : 购买战斗次数
 */

import { GameConfig } from "../config/GameConfig";
import { Globaldata } from "../const/Globaldata";
import KeyOperationManager from "../controller/key-operation-manager/KeyOperationManager";
import { MouseLockController } from "../controller/MouseLockController";
import { EnergyModuleC } from "../module/Energy/EnergyModule";
import { ShopModuleC } from "../module/ShopModule/ShopModuleC";
import { MessageBox } from "../tool/MessageBox";
import Tips from "../tool/P_Tips";
import BuyPanel_Generate from "../ui-generate/Buy/BuyPanel_generate";
import ItemBuy_Generate from "../ui-generate/Buy/ItemBuy_generate";

export default class BuyEnergyPanel extends BuyPanel_Generate {
    private _selectButtons: Map<number, StaleButton> = new Map<number, StaleButton>();
    onStart() {
        let configs = GameConfig.GoodsTable.getAllElement();
        configs.forEach(item => {
            let goodsItem = UIService.create(ItemBuy_Generate);
            goodsItem.mItemName.text = item.title;
            goodsItem.price.text = `${item.price}`;
            goodsItem.count.text = `x${item.buyCount}`;
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
            this._selectButtons.set(item.id, goodsItem.mSelectBtn);
            this.mSelectList.addChild(goodsItem.uiObject);
        });

        this.mCollapsedBtn.onClicked.add(() => {
            UIService.hideUI(this);
        });

        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            UIService.hideUI(this);
        });
    }

    onShow() {
        this.mainCanvas.visibility = SlateVisibility.Visible;
        this.mCanvas_undo.visibility = SlateVisibility.Hidden;
        //计算下能不能买
        let currEnergy = ModuleService.getModule(EnergyModuleC).currEnergy();
        let configs = GameConfig.GoodsTable.getAllElement();
        configs.forEach(item => {
            let btn = this._selectButtons.get(item.id);
            if (!btn) return;
            if (currEnergy + item.buyCount > Globaldata.ENERGY_MAX) {
                btn.enable = false;
            } else {
                btn.enable = true;
            }
        });
        MouseLockController.getInstance().needMouseUnlock();
    }

    onHide() {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
        MouseLockController.getInstance().cancelMouseUnlock();
    }
}