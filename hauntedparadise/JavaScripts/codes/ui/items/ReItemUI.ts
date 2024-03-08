import { GameConfig } from "../../../config/GameConfig";
import { IItemElement } from "../../../config/Item";
import { IShopElement } from "../../../config/Shop";
import UseReItem_UI_Generate from "../../../ui-generate/ShareUI/props/UseReItem_UI_generate";
import { BagDefine, BagItemData } from "../../modules/bag/BagDefine";
import { BagModuleC } from "../../modules/bag/BagModuleC";
import { RelifeItem } from "../../modules/equip/items/RelifeItem";
import { UIBuyGiftBag } from "../../modules/store/ui/UIBuyGiftBag";
import { CommonUtils } from "../../utils/CommonUtils";
import { LanUtil } from "../../utils/LanUtil";
import Tips from "../../utils/Tips";

const tempLan = "使用         {0}  继续游戏？"

export class ReItemUI extends UseReItem_UI_Generate {
    private _relifeCfg: IItemElement;

    private _callBack: (res: boolean) => void;

    private _shopCfg: IShopElement;

    onStart() {
        this.layer = UILayerTop;
        this.btn_useItem.onClicked.add(() => {
            let count = this.getItemCount();

            if (count == 0) {
                if (this._shopCfg) {
                    UIService.show(UIBuyGiftBag, this._shopCfg.id);
                }
                else {
                    Tips.show(LanUtil.getText("hint_tips1"))
                }
            }
            else {
                let bagModC = ModuleService.getModule(BagModuleC);
                bagModC.reqChangeItemCount(-1, this._relifeCfg.id);
                UIService.hideUI(this);
                this._callBack(true);
            }

        })
        this.btn_escapeFailure.onClicked.add(() => {
            UIService.hideUI(this);
            this._callBack(false);
        })
        this._relifeCfg = GameConfig.Item.getAllElement().find(e => {
            return e.clazz == RelifeItem.name;
        })
        if (!this._relifeCfg) {
            console.error("ReItem:" + "卑职无能，不能找到复活卡")
        }
        else {
            this._shopCfg = GameConfig.Shop.getAllElement().find(e => {
                return e.itemID == this._relifeCfg.id;
            })
        }
        Event.addLocalListener(BagDefine.AddItemEvt, (itemData: BagItemData) => {
            if (!this.visible || !this._relifeCfg) {
                return;
            }

            if (itemData.cfgId == this._relifeCfg.id) {
                this.text_num.text = this.getItemCount().toFixed(0);
            }
        })
    }

    onShow(callback: (res: boolean) => void) {
        this._callBack = callback;
        if (!this._relifeCfg) {
            UIService.hideUI(this);
            this._callBack(false);
            return;
        }
        this.text_num.text = this.getItemCount().toFixed(0);
        this.img_icon2.imageGuid = this._relifeCfg.icon;
        this.img_icon1.imageGuid = this._relifeCfg.icon;
        this.text_question.text = CommonUtils.formatString("{0}", this._relifeCfg.name);
    }


    private getItemCount() {
        if (!this._relifeCfg) {
            console.error("没有提示卡道具配置！")
            return 0;
        }
        let itemNum = 0;
        let itemData = ModuleService.getModule(BagModuleC).getItemsById(this._relifeCfg.id);
        if (itemData) {
            for (let index = 0; index < itemData.length; index++) {
                const element = itemData[index];
                itemNum += element.count;
            }
        }

        return itemNum;
    }
}