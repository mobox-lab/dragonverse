import { GameConfig } from "../../../../config/GameConfig";
import { IShopElement } from "../../../../config/Shop";
import GiftItem_UI_Generate from "../../../../ui-generate/ShareUI/shop/GiftItem_UI_generate";
import Shop_UI_Generate from "../../../../ui-generate/ShareUI/shop/Shop_UI_generate";
import TipsBox_UI_Generate from "../../../../ui-generate/ShareUI/shop/TipsBox_UI_generate";
import { RouteDefine } from "../../route/RouteDefine";
import { UIPrizeTips } from "../../treasure/ui/UIPrizeTips";
import StoreData from "../StoreData";
import StoreModuleC, { EShopItemType } from "../StoreModuleC";
import { UIItemDetail } from "./UIItemDetail";
import { UIGiftItem } from "./UIGiftItem";
import { UIShopBuy } from "./UIShopBuy";
import { UIShopItem } from "./UIShopItem";
import { UIShopTips } from "./UIShopTips";
import { CommonUtils } from "../../../utils/CommonUtils";
import { CloseFloatWindow } from "../../../ui/CloseFloatWindow";

export default class UIShop extends Shop_UI_Generate {

    private _itemList: UIShopItem[] = [];

    private _curSelectedItem: IShopElement;

    private _isSortPanelOpen: boolean = false;

    private _shopData: IShopElement[] = [];

    /**触摸起始值 */
    private _startVal: number = 0;

    protected onStart(): void {
        this.btn_back.onClicked.add(() => {
            ModuleService.getModule(StoreModuleC).closeStore()
        })
        //购买
        this.btn_buy.onClicked.add(async () => {
            if (!this._curSelectedItem) return
            let money = await RouteDefine.getFearCoin(Player.localPlayer.userId)
            if (money < this._curSelectedItem.price) {
                UIService.show(UIShopTips, GameConfig.SubLanguage.shoptips_01.Value, GameConfig.SubLanguage.shoptips_05.Value, () => {

                })
                return
            }
            let limit = await ModuleService.getModule(StoreModuleC).reqGetBuyLimit(this._curSelectedItem.id)
            if (limit <= 0 && this._curSelectedItem.buyLimit != -1) {
                UIService.show(UIShopTips, GameConfig.SubLanguage.shoptips_01.Value, "道具已达持有上限", null)
            } else {
                UIService.show(UIShopBuy, this._curSelectedItem, limit);
            }
        })
        //想要
        this.btn_want.onClicked.add(() => {
            if (!this._curSelectedItem) return
            ModuleService.getModule(StoreModuleC).reqGetBuyLimit(this._curSelectedItem.id).then(val => {
                if (val <= 0) {
                    UIService.show(UIShopTips, GameConfig.SubLanguage.shoptips_01.Value, "道具已达持有上限", null)
                } else {
                    ModuleService.getModule(StoreModuleC).reqWantedItem(this._curSelectedItem.id);
                }
            })
        })

        //排序按钮
        this.btn_sort.onClicked.add(() => {
            this._isSortPanelOpen = !this._isSortPanelOpen;
            this.canvas_sortlist.visibility = this._isSortPanelOpen ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed
            this.img_sort.renderTransformAngle = this._isSortPanelOpen ? 180 : 0
        })
        //分类显示按钮
        for (let i = 0; i < 5; ++i) {
            this[`btn_tab${i}`].onClicked.add(() => {
                this.switchTab(i)
            })
        }
        //选择排序方式按钮
        for (let i = 1; i <= 5; i++) {
            this[`btn_category${i}`].onClicked.add(() => {
                this.reSort(i);
                this._isSortPanelOpen = false;
                this.img_sort.renderTransformAngle = 0
                this.canvas_sortlist.visibility = SlateVisibility.Collapsed
            })
        }
        this.btn_intro.onClicked.add(() => {
            this.canvas_tipsbox.visibility = SlateVisibility.Visible;
            UIService.show(CloseFloatWindow)
        })

        this.btn_free.onClicked.add(() => {
            let position = CommonUtils.getViewPosition(this.canvas_freemoney, this.canvas_freemoney.position)
            position.y += 50;
            UIService.show(UIItemDetail, GameConfig.Item.getElement(10200), position)
        })

        //创建所有道具item
        GameConfig.Shop.getAllElement().forEach(e => {
            let item = UIService.create(UIShopItem);
            item.setShopData(e);
            this.canvas_shopitems.addChild(item.rootCanvas);
            this._itemList.push(item)
        })
        //初始化货币显示
        RouteDefine.getFearCoin(Player.localPlayer.userId).then(val => {
            this.text_freenum.text = val.toString()
        })
        //监听货币变化
        RouteDefine.onFearCoinChangeAction.add((money: number) => {
            this.text_freenum.text = money.toString();
        })
        //初始化每日白嫖次数
        let storeData = DataCenterC.getData(StoreData);
        this.text_wantnum.text = storeData.wantTimes.toString();
        this.checkWantTimes(storeData.wantTimes);
        storeData.onWantTimeChange.add((times: number) => {
            this.text_wantnum.text = times.toString();
            this.checkWantTimes(times)
        })
        Event.addLocalListener("evt_shopItemSelected", this.selectItem.bind(this))
        this.initRollModel()
    }

    /**
     * closeGiftTips
     */
    public closeGiftTips() {
        this.canvas_tipsbox.visibility = SlateVisibility.Hidden;
        UIService.hide(UIItemDetail)
    }

    /**
     * 初始化滑动模型转动事件
     */
    private initRollModel() {
        this.progress.sliderButtonPressDelegate.add((curValue: number) => {
            this._startVal = curValue
        })
        this.progress.onSliderValueChanged.add((curValue: number) => {
            let delta = curValue - this._startVal;
            ModuleService.getModule(StoreModuleC).rotateModel(delta > 0)
            this._startVal = curValue;
        })
    }

    private checkWantTimes(times: number) {
        if (times <= 0) {
            this.btn_want.onClicked.clear();
            this.btn_want.onClicked.add(() => {
                UIService.show(UIShopTips, GameConfig.SubLanguage.shoptips_01.Value, GameConfig.SubLanguage.shoptips_06.Value, null);
            })
            this.btn_want.setNormalImageColorByHex("#404040FF");
        }
    }

    private reSort(index: number) {
        this.text_sort.text = this[`text_category${index}`].text;
        let data: IShopElement[] = []
        switch (index) {
            case 1:
                data = GameConfig.Shop.getAllElement().sort((a, b) => { return a.weight - b.weight })
                break;
            case 2:
                data = GameConfig.Shop.getAllElement().sort((a, b) => { return a.price - b.price })
                break;
            case 3:
                data = GameConfig.Shop.getAllElement().sort((a, b) => { return b.price - a.price })
                break;
            case 4:
                data = GameConfig.Shop.getAllElement().sort((a, b) => { return Number(a.listingTime) - Number(b.listingTime) })
                break;
            case 5:
                data = GameConfig.Shop.getAllElement().sort((a, b) => { return Number(b.listingTime) - Number(a.listingTime) })
                break;
            default:
                console.log("排序方式错误！！！！！");
        }
        for (let i = 0; i < data.length; ++i) {
            this._itemList[i].setShopData(data[i]);
        }
    }

    public selectItem(data: IShopElement) {
        this._curSelectedItem = data;
        ModuleService.getModule(StoreModuleC).selectItem(this._curSelectedItem.id);
        let itemData = GameConfig.Item.getElement(this._curSelectedItem.itemID)
        if (data.type == EShopItemType.Gift) {//礼包
            this.canvas_details.visibility = SlateVisibility.Collapsed;
            this.canvas_giftDetails.visibility = SlateVisibility.Visible;
            this.canvas_giftItem.removeAllChildren();
            if (!data.giftList || data.giftList.length == 0) return;

            for (let i = 0; i < data.giftList.length; ++i) {
                for (let k = 0; k < data.giftList[i].length; ++k) {
                    let item = UIService.create(UIGiftItem)
                    let itemData = GameConfig.Item.getElement(data.giftList[i][k])
                    item.setData(itemData, data.giftNum[i][k])
                    this.canvas_giftItem.addChild(item.rootCanvas);
                }
            }

            this.text_giftDetail.text = itemData.description
            this.gift_name.text = itemData.name
        } else {
            this.canvas_giftDetails.visibility = SlateVisibility.Collapsed;
            this.canvas_details.visibility = SlateVisibility.Visible;
            this.text_name.text = itemData.name
            this.text_itemdetail.text = itemData.description
            this.text_itemdetail.visibility = SlateVisibility.Visible;
        }
        this.text_money.text = this._curSelectedItem.price.toString();
    }

    public switchTab(index: number) {
        this.img_tabSelected.position = this[`canvas_tab${index}`].position;
        let firstItem = index == 0 ? this._shopData[0] : this._shopData.find(e => e.type == index)
        Event.dispatchToLocal("evt_shopItemSelected", firstItem)
        this._itemList.forEach(e => {
            e.setVisibilityByType(index)
        })
    }

    onShow(shopID: number) {
        this._itemList.forEach(e => {
            e.myRootCanvas.visibility = e.data.shopID == shopID ? SlateVisibility.Visible : SlateVisibility.Collapsed
        })
        this._shopData = GameConfig.Shop.getAllElement().filter(e => e.shopID == shopID)
        Event.dispatchToLocal("evt_shopItemSelected", this._shopData[0])
        this.reSort(1)
    }

    onHide() {
        this.canvas_tipsbox.visibility = SlateVisibility.Hidden;
    }

}