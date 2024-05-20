import { EEquipPartType } from "../../../const/Enum";
import GameServiceConfig from "../../../const/GameServiceConfig";
import Log4Ts from "../../../depend/log4ts/Log4Ts";
import { IItemRender } from "../../../tool/UIMultiScroller";
import { util } from "../../../tool/Utils";
import UIDecItem_Generate from "../../../ui-generate/Shop/UIDecorate/UIDecItem_generate";
import UITabItem_Generate from "../../../ui-generate/Shop/UIDecorate/UITabItem_generate";
import { ShopModuleC } from "../ShopModuleC";
import { ShopView } from "./ShopView";

/**
 * 物品item数据
 */
export class IItemData {
    /**物品id */
    public id: number = 0;
    /**物品金币价格 */
    public price: number = 0;
    /**资源guid */
    public guid: string = "";
    /**图片guid */
    public icon: string = "";
    /**物品描述 */
    public des: string = "";
    /**物品对应挂件表id */
    public pendantId: number[] = [];
    /**物品类型 */
    public type: number = 0;
    /**物品名字 */
    public name: string = "";
    /** 构造 */
    constructor(id: number, price: number, guid: string, icon: string, des: string, pendantId: number[], name: string, type: number) {
        this.id = id;
        this.price = price;
        this.guid = guid;
        this.icon = icon;
        this.des = des;
        this.pendantId = pendantId;
        this.name = name;
        this.type = type;
    }
}


/**
 * 页签item
 */
export class TabItem extends UITabItem_Generate implements IItemRender {

    public realIndex: number;

    public isSelected: boolean = false;
    /** 当前页签选中的itemId */
    public curItemId: number = 0;

    onStart() {
        this.mBtnPlace1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        // this.mBtnPlace1.text = "";
    }

    setData(data: any): void {
        this.mTextPlace1.text = util.getLanguageByKey(data);
    }
    get clickObj(): mw.Button {
        return this.mBtnPlace1;
    }

    setSelect(bool: boolean): void {
        this.isSelected = bool;

        let renderOpacity = bool ? 1 : 0;
        // this.mBtnPlace1.renderOpacity = renderOpacity;

        // let imageColort = bool ? mw.LinearColor.black : mw.LinearColor.white;
        // this.mImgBg.imageColor = imageColort;

        let imageGuid = bool ? GameServiceConfig.SHOP_TAB_SELECTED_GUID : GameServiceConfig.SHOP_TAB_NORMAL_GUID;
        this.mImgBg.imageGuid = imageGuid;
    }

    updateData(): void {

    }

}

/**
 * 商品格子ui
 */
export class Item extends UIDecItem_Generate implements IItemRender {

    private mshop: ShopModuleC = null;

    public realIndex: number;

    public isSelected: boolean = false;

    public itemData: IItemData = null;

    get clickObj(): mw.Button {
        return this.mBtnDec;
    }

    onStart() {
        this.mshop = ModuleService.getModule(ShopModuleC);
        this.mBtnDec.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mImgDes.visibility = mw.SlateVisibility.Collapsed;
        this.mImgGift.visibility = mw.SlateVisibility.Collapsed;
        this.mImgRed5.visibility = mw.SlateVisibility.Collapsed;
    }


    setData(data: IItemData): void {
        this.itemData = data;
        this.refresh_view();
    }

    setSelect(bool: boolean): void {
        this.isSelected = bool;
        if (this.mImgSelect.visible == bool) return;
        let visibility = bool ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        this.mImgSelect.visibility = visibility;
        this.mImgDes.visibility = visibility;
    }

    updateData(): void {
        this.refresh_view();
    }


    /**
     * 刷新item
     */
    public refresh_view() {
        Log4Ts.log({ name: "ShopItem" },
            `商店 item id: ${this.itemData.id}`,
            `商店 item 特效 Guid: ${this.itemData.guid}`,
            `realIndex: ${this.realIndex}`,
        );
        if (this.itemData.price) {
            this.mImgNeed.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mTextNeed.text = this.itemData.price.toString();
        }
        else {
            this.mImgNeed.visibility = mw.SlateVisibility.Collapsed;
            this.mTextNeed.text = this.itemData.name;
        }
        if (this.itemData.icon) {
            this.mImgIcon.imageGuid = this.itemData.icon;
        }
        else {
            // 获得资源Icon信息
            let res = mw.getAssetIconDataByAssetID(this.itemData.guid);
            if (res) {
                Log4Ts.log({ name: "ShopItem" },
                    `商店 item id: ${this.itemData.id}`,
                    `商店 item 特效 Guid: ${this.itemData.guid}`,
                    `商店 item resource icon assetId: ${res.assetID}`,
                    `realIndex: ${this.realIndex}`,
                );
                this.mImgIcon.setImageByAssetIconData(res);
            }
        }

        let isHave = this.mshop.isHave(this.itemData.id);

        this.mCanvasNeed.visibility = isHave ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.Visible;
        this.setSelect(this.realIndex == ShopView._Index);
    }
}