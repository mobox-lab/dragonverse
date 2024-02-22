import { GameConfig } from "../../../config/GameConfig";
import { EAnalyticsEvents, EAttributeEvents_C, EEquipPartType, EModule_Events } from "../../../const/Enum";
import { Globaldata } from "../../../const/Globaldata";
import KeyOperationManager from "../../../controller/key-operation-manager/KeyOperationManager";
import { CameraManger } from "../../../tool/CameraManger";
import { EventManager } from "../../../tool/EventManager";
import { VList } from "../../../tool/NodeList";
import Tips from "../../../tool/P_Tips";
import { IItemRender, UIMultiScroller } from "../../../tool/UIMultiScroller";
import UIRole_Generate from "../../../ui-generate/Shop/UIDecorate/UIRole_generate";
import { AnalyticsTool, EFirstDo, EPageName } from "../../AnalyticsModule/AnalyticsTool";
import { EquipModuleC } from "../../EquipModule/EquipModuleC";
import { BattleWorldPlayerModuleData } from "../../PlayerModule/PlayerModuleData";
import ActionUI from "../../PlayerModule/UI/ActionUI";
import { Attribute } from "../../PlayerModule/sub_attribute/AttributeValueObject";
import { ShopModuleC } from "../ShopModuleC";
import { TabItem, Item } from "./ShopItem";

/**主界面*/
export class ShopView extends UIRole_Generate {
    /**模块 */
    private mShop: ShopModuleC = null;

    private _tabItem: TabItem = null;

    /**页签默认索引，从0开始，+1为对应的装备类型 */
    private _tabIndex: number = 0;

    private _tabScroll: VList.NodeList = null;

    /**item索引*/
    public static _Index: number = 0;

    /**每个页签当前选中的背包itemId */
    private _bagItemMap: Map<number, number> = new Map();

    /**当前选中的背包item对象 */
    private _bagItem: Item = null;

    private _contentScroll: UIMultiScroller = null;

    /**检验点击频率 */
    private mCheckClickTime: number = 0;

    /**item按钮cd */
    private _itemCd: number = 0;

    onStart() {
        this.mShop = ModuleService.getModule(ShopModuleC);
        // 页签
        this._tabScroll = new VList.NodeList(this.mCanvasRole, TabItem);
        this._tabScroll.InitCallback.add(this.onInitItem_tab, this);
        this._tabScroll.ItemCallback.add(this.onRefeshItem_tab, this);
        // 格子
        this._contentScroll = new UIMultiScroller(this.mScrollDec, this.mCanvasDec, Item);
        this._contentScroll.InitCallback.add(this.onInitItem, this);
        this._contentScroll.ItemCallback.add(this.onRefeshItem, this);

        this.mBtnClose1.onClicked.add(() => {
            mw.UIService.hideUI(this);
        });

        this.mCanvasWarn.visibility = mw.SlateVisibility.Collapsed;
        //购买
        this.mBtnGold.onClicked.add(this.click_glod.bind(this));
        //装扮
        this.mBtnDis.onClicked.add(this.click_equip.bind(this));
        this.updateMoney();
        /**玩家金币数量发生变化 */
        EventManager.instance.add(EAttributeEvents_C.Attribute_Money_Change_C, this.listen_goldChanged, this);

    }

    onShow() {
        this._tabIndex = 0;
        ShopView._Index = -1;
        //根据装备的物品设置预选中数据
        for (let i = 1; i <= Globaldata.shop_tap_language.length; i++) {
            let equipId = ModuleService.getModule(EquipModuleC).getPartEquipId(i);
            this._bagItemMap.set(i - 1, equipId);
        }

        CameraManger.instance.setCameraOffset(Globaldata.shop_camera_offset);
        EventManager.instance.call(EModule_Events.shop_hideShowUI, false);
        this.refresh_all();
        // 埋点
        AnalyticsTool.send_ts_page(EPageName.shop);
        KeyOperationManager.getInstance().onKeyUp(Keys.Escape, this, () => {
            UIService.hideUI(this);

        })

        UIService.getUI(ActionUI)?.setAbilitiesVisible(false);
    }

    onHide() {
        CameraManger.instance.setCameraOffset(new Vector(0, 0, 0));
        EventManager.instance.call(EModule_Events.shop_hideShowUI, true);
        //关闭界面时，清除预览，击杀特效类型特殊处理
        this._bagItemMap.forEach((value, key) => {
            if (key + 1 == EEquipPartType.killEff) {
                this.itemPreview(null, key);
                return;
            }
            if (!value || this.mShop.isEquip(value)) return;
            let equipId = ModuleService.getModule(EquipModuleC).getPartEquipId(key + 1);
            let pendantId = equipId ? GameConfig.Shop.getElement(equipId).pendantId : null;
            this.itemPreview(pendantId, key);
        })
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
        UIService.getUI(ActionUI)?.setAbilitiesVisible(true);
    }

    /**
      * 初始化tab页签
      * @param index
      * @param renderItem
      */
    private onInitItem_tab(index: number, renderItem: IItemRender) {
        renderItem.setSelect(false);
        if (renderItem instanceof TabItem) {
            renderItem.mBtnPlace1.onClicked.add(() => {
                let clickIndex = renderItem.realIndex;
                if (clickIndex == this._tabIndex) return;

                this.setTabSelect(renderItem);
                this._tabIndex = clickIndex;
                this.refresh_bagList();
            });
        }
    }

    /**
     * 选择tab页签
     * @param renderItem 
     */
    private setTabSelect(renderItem: TabItem) {

        if (this._tabItem && this._tabItem.isSelected) {
            this._tabItem.setSelect(false);
            this._tabItem = null;
        }
        this._tabItem = renderItem;
        this._tabItem.setSelect(true);
    }


    /**
     * 刷新tab页签数据
     * @param index
     * @param renderItem
     */
    private onRefeshItem_tab(index: number, renderItem: IItemRender) {
        renderItem.setData(Globaldata.shop_tap_language[index]);

        if (index == this._tabIndex && renderItem instanceof TabItem) {
            this.setTabSelect(renderItem);
        }

    }

    /**刷新tab页签 */
    private refresh_tab() {
        this._tabScroll.setData(Globaldata.shop_tap_language);
    }

    /**
     * 初始化item
     * @param index
     * @param renderItem
     */
    private onInitItem(index: number, renderItem: IItemRender) {
        renderItem.setSelect(false);
        if (renderItem instanceof Item) {
            renderItem.mBtnDec.onClicked.add(() => {
                if (Date.now() - this._itemCd < 500) {
                    Tips.show(GameConfig.Language.Shop_tips_3.Value);
                    return;
                }
                this._itemCd = Date.now();
                let clickIndex = renderItem.realIndex;
                if (clickIndex == ShopView._Index) return;
                if (renderItem.itemData.type == 0) {
                    ShopView._Index = -1;
                    this.itemReset();
                }
                else {
                    ShopView._Index = clickIndex;
                }
                this.setItemSelect(renderItem);
            });
        }
    }
    /**
     * 设置item选中状态
     * @param renderItem item
     */
    private setItemSelect(renderItem: Item) {
        //还原上个选中
        this.resetItemSelect();
        //重置按钮
        if (renderItem.itemData.type == 0) return;
        renderItem.setSelect(true);
        this.mDes.text = renderItem.itemData.des;

        this.itemPreview(renderItem.itemData.pendantId, this._tabIndex);
        let id = renderItem.itemData.id;
        if (!renderItem.itemData.price) {
            this.lockBtn();
        }
        if (this.mShop.isEquip(id)) {
            this.equipBtn();
        }
        else if (this.mShop.isHave(id)) {
            this.ownBtn();
        }
        this._bagItemMap.set(this._tabIndex, id);
        this._bagItem = renderItem;
    }
    /**
     * 重置item选中状态
     */
    private resetItemSelect() {
        if (this._bagItem && this._bagItem.isSelected) {

            this._bagItem.setSelect(false);
            this._bagItem = null;
            this.mDes.text = "";
            this.normalBtn();
        }
    }

    /**
     * 物品预览
     */
    private itemPreview(pendantId: number[], tabIndex: number) {
        //清除上次预览
        let lastId = this._bagItemMap.get(tabIndex);
        if (lastId) {
            let pendantId = GameConfig.Shop.getElement(lastId).pendantId;
            pendantId.forEach((value) => {
                EventManager.instance.call(EModule_Events.equip_removePendant, Player.localPlayer.playerId, value);
            });
        }
        //装备预览
        if (pendantId && pendantId.length > 0) {
            pendantId.forEach((value) => {
                EventManager.instance.call(EModule_Events.equip_addPendant, Player.localPlayer.playerId, value);
            });
        }
    }
    /**
     * 物品重置
     */
    private itemReset() {
        let id = this._bagItemMap.get(this._tabIndex);
        if (id) {
            let pendantId = GameConfig.Shop.getElement(id).pendantId;
            EventManager.instance.call(EModule_Events.equip_removePendant, Player.localPlayer.playerId, pendantId);
            let equipId = ModuleService.getModule(EquipModuleC).getPartEquipId(this._tabIndex + 1);
            if (this.mShop.isEquip(equipId)) {
                EventManager.instance.call(EModule_Events.equip_removeEquip, equipId);
            }
        }
        this._bagItemMap.set(this._tabIndex, 0);
    }

    /**
     * 刷新item数据
     * @param index
     * @param renderItem
     */
    private onRefeshItem(index: number, renderItem: IItemRender) {
        //获取页签数据，设置item
        let datas = this.mShop.getDataByTab(this._tabIndex + 1);
        renderItem.setData(datas[index]);
        //默认选中已装备或第一个item
        let id = this._bagItemMap.get(this._tabIndex);
        id = id ? id : datas[1].id;
        if (datas[index].id == id) {
            this.setItemSelect(renderItem as Item);
        }
    }


    /**
     * 刷新背包列表
     */
    public refresh_bagList(isReset: boolean = true) {

        if (isReset) {
            ShopView._Index = -1;
        }

        let datas = this.mShop.getDataByTab(this._tabIndex + 1);
        if (datas == null) {
            this._contentScroll.setData([]);

        } else {
            this._contentScroll.setData(datas, isReset);
        }

    }

    /**
     * 刷新所有
     */
    private refresh_all(bagRest: boolean = true) {
        this.refresh_tab();
        this.refresh_bagList(bagRest);
    }

    /**
     * item未购买状态下按钮表现
     */
    private normalBtn() {
        this.mCanvasGold.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mCanvasDisBg.visibility = mw.SlateVisibility.Collapsed;
    }
    /**
     * item未解锁状态下按钮表现
     */
    public lockBtn() {
        this.mCanvasGold.visibility = mw.SlateVisibility.Collapsed;
        this.mCanvasDisBg.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mTextDis.visibility = mw.SlateVisibility.Collapsed;
        this.mTextDis2.visibility = mw.SlateVisibility.Collapsed;
        this.mTextDis3.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mBtnDis.enable = false;
    }
    /**
     * item已购买状态下按钮表现
     */
    public ownBtn() {
        this.mCanvasGold.visibility = mw.SlateVisibility.Collapsed;
        this.mCanvasDisBg.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mTextDis.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mTextDis2.visibility = mw.SlateVisibility.Collapsed;
        this.mTextDis3.visibility = mw.SlateVisibility.Collapsed;
        this.mBtnDis.enable = true;
    }
    /**
     * item已装扮状态下按钮表现
     */
    public equipBtn() {
        this.mCanvasGold.visibility = mw.SlateVisibility.Collapsed;
        this.mCanvasDisBg.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mTextDis.visibility = mw.SlateVisibility.Collapsed;
        this.mTextDis2.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mTextDis3.visibility = mw.SlateVisibility.Collapsed;
        this.mBtnDis.enable = false;
        if (this._bagItem) {
            this._bagItem.refresh_view();
        }
    }
    /**
     * 主动更新金币数量
     */
    private updateMoney() {
        let curMoney = DataCenterC.getData(BattleWorldPlayerModuleData).getAttrValue(Attribute.EnumAttributeType.money);
        this.mGold.text = curMoney.toString();
    }
    /** 
     * 监听金币修改，修改文本
     * @param value 金币数量
     */
    private listen_goldChanged(value: number) {
        this.mGold.text = value.toString();
    }
    /**
     * 点击购买按钮
     */
    private click_glod() {
        let id = this._bagItemMap.get(this._tabIndex);
        if (!id) return;
        this.mShop.buyItem(id);

        // 埋点
        EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.buy);

        // 埋点
        AnalyticsTool.send_ts_action_buy_item(id);
    }

    private click_equip() {

        // 避免频繁点击
        let clickTimeu = Date.now() - this.mCheckClickTime;
        if (clickTimeu < 1000) {
            return;
        }
        this.mCheckClickTime = Date.now();
        let id = this._bagItemMap.get(this._tabIndex);
        if (!id) return;
        this.mShop.equipItem(id);
    }


    /**刷新背包当前item的数据  不会重新计算item位置 */
    public refresh_bagAllItemData() {
        this._contentScroll.updateItemData();
    }

    /** 商店购买提示 */
    public showBuyTips(isSuccess: boolean) {
        if (isSuccess) {
            this.mCanvasWarn.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mTextWarn.text = GameConfig.Language.Shop_tips_1.Value;
        }
        else {
            this.mCanvasWarn.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mTextWarn.text = GameConfig.Language.Shop_tips_2.Value;
        }
        setTimeout(() => {
            this.mCanvasWarn.visibility = mw.SlateVisibility.Collapsed;
        }, 2000);
    }

}