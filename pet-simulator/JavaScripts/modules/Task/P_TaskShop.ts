import { MapEx } from "odin";
import { GameConfig } from "../../config/GameConfig";
import { ITaskShopElement } from "../../config/TaskShop";
import TaskShop_Generate from "../../ui-generate/Task/TaskShop_generate";
import TaskShop_Itembig_Generate from "../../ui-generate/Task/TaskShop_Itembig_generate";
import TaskShop_Itemmid_Generate from "../../ui-generate/Task/TaskShop_Itemmid_generate";
import TaskShop_Itemmin_Generate from "../../ui-generate/Task/TaskShop_Itemmin_generate";
import TaskShop_ItemText_Generate from "../../ui-generate/Task/TaskShop_ItemText_generate";
import { utils } from "../../util/uitls";
import { TipsManager } from "../Hud/P_TipUI";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";

export class P_TaskShop extends TaskShop_Generate {

    private isInit: boolean = false;
    /**购买对应物品action */
    public buyAction: mw.Action1<number> = new mw.Action1<number>();
    /**所有uiItem */
    private uiItemArr: Map<number, P_TaskShop_Item> = new Map<number, P_TaskShop_Item>();

    public show(taskShopData: MapEx.MapExClass<number>, point: number, ...param): void {
        this.mText_Point.text = utils.Format(GameConfig.Language.Task_shop_19.Value, point);
        if (!this.isInit) {
            this.isInit = true;
            this.init(taskShopData);
        }
        super.show(...param);
        KeyOperationManager.getInstance().onKeyUp(Keys.Escape, this, () => {
            this.hide();
        });
    }

    private init(taskShopData: MapEx.MapExClass<number>) {
        let taskShopInfo = GameConfig.TaskShop.getAllElement();
        taskShopInfo.forEach((value) => {
            let count = MapEx.get(taskShopData, value.id);
            if (count == null) {
                count = 0;
            }
            let item = this.createItem(value);
            if (value.UponMuch != 0 && count >= value.UponMuch) {
                item.btnDisable();
            }
            this.mCanvas_List.addChild(item.rootCanvas);
        })
        this.mBtn_close.onClicked.add(() => {
            this.hide();
        })
    }

    /**购买达到上限 */
    public arrayUpper(id: number): void {
        let item = this.uiItemArr.get(id);
        if (item) {
            item.btnDisable();
        }
    }

    private createItem(data: ITaskShopElement): P_TaskShop_Item {
        let item: P_TaskShop_Item;
        switch (data.BasePlant) {
            case 1:
                item = mw.UIService.create(P_TaskBigItem);
                break;
            case 2:
                item = mw.UIService.create(P_TaskMidItem);
                break;
            case 3:
                item = mw.UIService.create(P_TaskMiniItem);
                break;
            case 4:
                item = mw.UIService.create(P_TaskTextItem);
                break;
        }
        item.init(data, this);
        this.uiItemArr.set(data.id, item);
        return item;
    }

    public hide(): void {
        super.hide();
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }

}

abstract class P_TaskShop_Item extends mw.UIScript {

    abstract isBtnEnable: boolean;

    public abstract init(data: ITaskShopElement, shopUI: P_TaskShop): void;

    abstract btnDisable(): void;

}


class P_TaskTextItem extends TaskShop_ItemText_Generate implements P_TaskShop_Item {

    isBtnEnable: boolean;

    public init(data: ITaskShopElement, shopUI: P_TaskShop): void {
        let layout = new mw.UIConstraintAnchors(mw.UIConstraintHorizontal.Center, mw.UIConstraintVertical.Center);
        this.rootCanvas.constraints = layout;
        this.mText_title.text = data.Name;
    }

    public btnDisable(): void { }

}

class P_TaskBigItem extends TaskShop_Itembig_Generate implements P_TaskShop_Item {
    isBtnEnable: boolean;

    public init(data: ITaskShopElement, shopUI: P_TaskShop): void {
        commonInit(data, this, shopUI);
        this.mPic_icon.imageGuid = data.Icon;
        data.Award ? this.petInit(data) : this.boardInit(data);
        //ui控件导出改了，get的时候才会去找控件对象，先提前get下
        this.mPic_pet1;
        this.mPic_pet2;
        this.mText_rate1;
        this.mText_rate2;
    }

    private petInit(data: ITaskShopElement) {
        this.mCanvas_boardinfo.visibility = mw.SlateVisibility.Collapsed;
        this.mCanvas_petinfo.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        let eggMachine = GameConfig.EggMachine.getElement(data.Award);
        let petArr = eggMachine.petArr;
        let rateArr = eggMachine.Weight;
        let sum = 0;
        rateArr.forEach((value) => {
            sum += value;
        })
        for (let i = 0; i <= 1; i++) {
            let petId = petArr[i];
            let rate = rateArr[i] / sum;
            if (petId) {
                let petData = GameConfig.PetARR.getElement(petId);
                (this["mPic_pet" + (i + 1)] as mw.Image).imageGuid = petData.uiGuid;
                (this["mText_rate" + (i + 1)] as mw.TextBlock).text = toFixed1(rate * 100) + "%";
            }
        }
    }

    private boardInit(data: ITaskShopElement) {
        this.mCanvas_boardinfo.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mCanvas_petinfo.visibility = mw.SlateVisibility.Collapsed;
        this.mText_info.text = data.Text;
    }

    /**按钮禁用 */
    public btnDisable(): void {
        commonDisable(this);
    }

}

class P_TaskMidItem extends TaskShop_Itemmid_Generate implements P_TaskShop_Item {
    isBtnEnable: boolean;

    public init(data: ITaskShopElement, shopUI: P_TaskShop): void {
        commonInit(data, this, shopUI);
        this.mText_Price.text = data.Price == 0 ? "???" : data.Price + "";
        this.mText_Info.text = data.Text;
        this.mPic_Icon.imageGuid = data.Icon;
    }

    /**按钮禁用 */
    public btnDisable(): void {
        commonDisable(this);
    }

}

class P_TaskMiniItem extends TaskShop_Itemmin_Generate implements P_TaskShop_Item {
    isBtnEnable: boolean;

    public init(data: ITaskShopElement, shopUI: P_TaskShop): void {
        commonInit(data, this, shopUI);
        this.mText_Info.text = utils.formatNumber(data.Award);
    }

    /**按钮禁用 */
    public btnDisable(): void {
        commonDisable(this);
    }

}

/**通用初始化 */
function commonInit(data: ITaskShopElement, item: P_TaskMiniItem | P_TaskMidItem | P_TaskBigItem, shopUI: P_TaskShop) {
    item.isBtnEnable = true;
    let layout = new mw.UIConstraintAnchors(mw.UIConstraintHorizontal.Center, mw.UIConstraintVertical.Center);
    item.rootCanvas.constraints = layout;
    item.mText_Name.text = data.Name;
    item.mText_Price.text = data.Price + "";
    item.mPic_Base.imageGuid = data.BaseIcon;
    item.mCanvas_undo.visibility = mw.SlateVisibility.Collapsed;
    item.mBtn.onClicked.add(() => {
        if (data.Price == 0) {
            TipsManager.instance.showTip(GameConfig.Language.Task_shop_15.Value);
            return;
        }
        if (!item.isBtnEnable) {
            return;
        }
        shopUI.buyAction.call(data.id);
    })
    item.mBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
}

/**通用禁用 */
function commonDisable(item: P_TaskMiniItem | P_TaskMidItem | P_TaskBigItem) {
    item.isBtnEnable = false;
    item.mCanvas_undo.visibility = mw.SlateVisibility.Visible;
}

/**保留一位小数 */
function toFixed1(num: number): number {
    return Math.round(num * 10) / 10;
}