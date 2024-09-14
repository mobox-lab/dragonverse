import { UIPool } from "../../Tools/UIPool";
import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import BagEmpty_Generate from "../../ui-generate/Pet/BagEmpty_generate";
import PetBagPanel_Generate from "../../ui-generate/Pet/PetBagPanel_generate";
import ReName_Generate from "../../ui-generate/Pet/ReName_generate";
import MessageBox from "../../util/MessageBox";
import { Singleton, stringToBuff, utils } from "../../util/uitls";
import { PetBagModuleData, petItemDataNew } from "./PetBagModuleData";

import { PetBag_Item } from "./P_BagItem";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import { PetBagModuleC } from "./PetBagModuleC";
import { P_BagHoverNum2 } from "./P_BagHoverNum2";
import { P_BagHoverNum3 } from "./P_BagHoverNum3";
import { GlobalEnum } from "../../const/Enum";
import { P_FusePanel } from "./P_FusePanel";
import { P_Pet_Dev } from "./P_Pet_Dev";
import { P_Enchants } from "./P_Enchants";

export class P_Bag extends PetBagPanel_Generate {

    /**背包item */
    private itemArr: PetBag_Item[] = [];
    private itemBackArr: UIPool<BagEmpty_Generate>;
    /**动画item数组 */
    private itemTweenArr: PetBag_Item[] = [];

    /**是否在改名字 */
    private isReName: boolean = false;
    /**改名字ui */
    public reNameUI: P_ReName = null;
    /**改名字事件 */
    public onReNameAC: Action2<number, string> = new Action2();

    /**是否在删除item */
    private isDel: boolean = false;
    /**删除数组 */
    private delArr: number[] = [];
    /**删除事件 */
    public onDelAC: Action1<number[]> = new Action1();

    public showAC: Action = new Action();
    public hideAC: Action = new Action();

    private data: PetBagModuleData = null;

    /**true:装备，false:卸下 */
    public onEquipAC: Action2<boolean, number[]> = new Action2();

    onStart() {

        this.mCloseBtn.onClicked.add(() => {
            this.hide();
        });
        this.mReNameBtn.onClicked.add(() => {
            this.setReNameUI();
        });
        this.mDelBtn.onClicked.add(() => {
            this.setDelUI();
        });
        this.mSureDelBtn.onClicked.add(() => {
            this.sureDel();
        });
        this.mSureDelBtn_Cancel.onClicked.add(() => {
            this.cancelDel();
        });
        this.mEquipBtn.onClicked.add(() => {
            this.autoEquip();
        });

        this.itemBackArr = new UIPool<BagEmpty_Generate>();
        this.itemBackArr.setCreator(() => {
            let item = mw.UIService.create(BagEmpty_Generate);
            item.uiObject.size = item.rootCanvas.size;
            return item;
        });

        this.mSureDelBtn.visibility = mw.SlateVisibility.Collapsed;
        this.mSureDelBtn_Cancel.visibility = mw.SlateVisibility.Collapsed;

        this.data = DataCenterC.getData(PetBagModuleData);
    }

    /**
     * 设置背包item
     * @param dataArr 数据
     * @param equipKeys 已经装备的key
     * @param tipsArr 需要提示的key
     */
    public setCanvasItem(dataArr: petItemDataNew[], equipKeys: number[], tipsArr: number[] = []) {
        console.log("刷新~~~~");
        if (this.mTextBlock_Num.text != dataArr.length.toString()) {
            this.mTextBlock_Num.text = utils.Format(GameConfig.Language.Info_pet_1.Value, dataArr.length, this.data.BagCapacity);
            this.mTextBlock_Num.fontColor = dataArr.length >= this.data.BagCapacity ? LinearColor.colorHexToLinearColor("#FF0000") : LinearColor.colorHexToLinearColor("#FFFFFF");
        }
        // this.itemArr.length = 0;
        // PetBagItem.instance.UIPool.resetAll();
        // 高帧率播放UI刷新动画

        if (utils.frameCount > 20) {
            // 播放UI动画，为防止动画播放过程中点击，设置动画中不可点击
            this.mListCanvas.visibility = mw.SlateVisibility.HitTestInvisible;
            this.playUIAnimation(dataArr, this.itemArr, equipKeys);
            setTimeout(() => {
                this.mListCanvas.visibility = mw.SlateVisibility.Visible;
            }, 420);
        }
        // 低帧率直接设置UI
        else {
            this.refreshItem(dataArr, this.itemArr, equipKeys);
        }

        this.createBagEmptyItem(this.data.BagCapacity, dataArr.length);
        //  判断装备按钮显示
        let isHas = this.isIncludeKey(dataArr, equipKeys);
        this.setEquipBtnVis(isHas);

        this.tipsTween(tipsArr);
    }

    /** 附魔后刷新宠物战力值颜色等 */
    public updateEnchantItemsUI(key: number) {
        const itemUI = this.itemArr.find((item) => item.petData.k === key);
        if (!itemUI) return;
        const data = this.data.bagItemsByKey(itemUI.petData.k);
        itemUI.init(data);
    }

    /**装备或卸载宠物时播放的过渡动画 */
    private playUIAnimation(newData: petItemDataNew[], oldList: PetBag_Item[], equipKeys: number[]) {
        let len = newData.length;

        let delArr: PetBag_Item[] = [];
        // 已经被删除的item，逐渐消失
        for (let uiItem of oldList) {
            let include = false;
            for (let i = 0; i < newData.length; i++) {
                const data = newData[i];
                if (data.k == uiItem.petData.k) {
                    include = true;
                    break;
                }
            }
            // 如果新数据不包含该item，逐渐消失并删除
            if (!include) {
                delArr.push(uiItem);
            }
        }
        delArr.forEach(item => {
            item.itemFadeOutTween(this.itemArr);
        });

        // 遍历新数据，如果是新增加的item，播放淡入动画，如果是已经存在的item，播放平移动画
        for (let i = 0; i < len; i++) {
            const data = newData[i];
            let dataCount = i + 1;
            let include = false;
            let itemUI: PetBag_Item = null;
            for (let i = 0; i < oldList.length; i++) {
                if (oldList[i].petData.k == data.k) {
                    include = true;
                    itemUI = oldList[i];
                    break;
                }
            }
            // 说明是本次刷新后新增加的item
            if (!include) {
                itemUI = this.addItem(data, i + 1);
                itemUI.itemFadeInTween(i + 1);
            }
            // 本次和上次都有的item，未变动则不变，变动则平移
            else {
                let equipChange = (equipKeys.indexOf(data.k) != -1) != itemUI.isEquip;
                // 位置变动
                if (dataCount != itemUI.count) {
                    // 播放平移动画
                    itemUI.itemMoveTween(itemUI.count, dataCount, equipChange);
                }
                // 位置未变动
                else {
                    // 播放原地缩放动画
                    if (equipChange) {
                        itemUI.itemEquipTween();
                    }
                }
            }
            // 设置装备态UI
            itemUI.setLockVis(equipKeys.indexOf(data.k) != -1);
        }
    }

    /**直接刷新UI */
    private refreshItem(newData: petItemDataNew[], oldList: PetBag_Item[], equipKeys: number[]) {
        let len = newData.length;
        // 直接刷新UI
        let delArr: PetBag_Item[] = [];
        // 已经被删除的item，逐渐消失
        for (let uiItem of oldList) {
            let include = false;
            for (let i = 0; i < newData.length; i++) {
                const data = newData[i];
                if (data.k == uiItem.petData.k) {
                    include = true;
                    break;
                }
            }
            // 如果新数据不包含该item，删除
            if (!include) {
                delArr.push(uiItem);
            }
        }
        delArr.forEach(item => {
            oldList.splice(oldList.indexOf(item), 1);
            item.destroy();
        });

        // 遍历新数据，如果是新增加的item，播放淡入动画，如果是已经存在的item，播放平移动画
        for (let i = 0; i < len; i++) {
            const data = newData[i];
            let dataCount = i + 1;
            let include = false;
            let itemUI: PetBag_Item = null;
            for (let i = 0; i < oldList.length; i++) {
                if (oldList[i].petData.k == data.k) {
                    include = true;
                    itemUI = oldList[i];
                    break;
                }
            }
            // 说明是本次刷新后新增加的item
            if (!include) {
                itemUI = this.addItem(data, i + 1);
                itemUI.uiObject.position = this.calcuItemPos(dataCount);
            }
            // 本次和上次都有的item
            else {
                itemUI.uiObject.position = this.calcuItemPos(dataCount);
            }
            // 设置装备态UI
            itemUI.setLockVis(equipKeys.indexOf(data.k) != -1);
        }
    }

    /**向itemList中添加item */
    private addItem(uiData: petItemDataNew, count: number): PetBag_Item {
        let itemUI = mw.UIService.create(PetBag_Item);
        itemUI.count = count;
        this.mListCanvas.addChild(itemUI.uiObject);
        itemUI.init(uiData);

        itemUI.setClickFun(this.onClickItem.bind(this), this);
        itemUI.onHoverAC.add(this.showNewPetHoverUI.bind(this));
        this.itemArr.push(itemUI);
        return itemUI;
    }

    /**item设置位置 */
    private setItemPos(item: mw.Widget, count: number): number {
        //距离左边的偏移量
        let offX = GlobalData.Bag.itemOffset[0];
        //距离上边的偏移量
        let offY = GlobalData.Bag.itemOffset[1];
        //每个item的间隔
        let space = GlobalData.Bag.itemSpace;
        //每行的个数
        let row = 4;
        //每个item的宽度
        let itemWidth = GlobalData.Bag.itemSize.x;
        //每个item的高度
        let itemHeight = GlobalData.Bag.itemSize.y;
        //计算出每个item的位置
        let index_x: number = count % row;
        if (index_x == 0) {
            index_x = row;
        }
        let x = (index_x - 1) * (itemWidth + space) + offX;  // 1* (200 + 90) + 50
        let y = Math.floor((count - 1) / row) * (itemHeight + space) + offY; // 0 * (200 + 90) + 50
        item.position = new mw.Vector2(x, y);
        return y;
    }

    /**item设置位置 */
    private calcuItemPos(count: number): Vector2 {
        //距离左边的偏移量
        let offX = GlobalData.Bag.itemOffset[0];
        //距离上边的偏移量
        let offY = GlobalData.Bag.itemOffset[1];
        //每个item的间隔
        let space = GlobalData.Bag.itemSpace;
        //每行的个数
        let row = 4;
        //每个item的宽度
        let itemWidth = GlobalData.Bag.itemSize.x;
        //每个item的高度
        let itemHeight = GlobalData.Bag.itemSize.y;
        //计算出每个item的位置
        let index_x: number = count % row;
        if (index_x == 0) {
            index_x = row;
        }
        let x = (index_x - 1) * (itemWidth + space) + offX;  // 1* (200 + 90) + 50
        let y = Math.floor((count - 1) / row) * (itemHeight + space) + offY; // 0 * (200 + 90) + 50
        // item.position = new mw.Vector2(x, y);
        return new mw.Vector2(x, y);
    }

    /**ui提示显隐动画 */
    public tipsTween(keys: number[]) {
        keys.forEach((key) => {

            let item = this.itemArr.find((item) => {
                return item.petData.k == key;
            });
            if (item) {
                item.tipsTween();
                this.itemTweenArr.push(item);
            }
        });
    }

    /**创建背包空item */
    private createBagEmptyItem(capacity: number, count: number) {
        this.itemBackArr.resetAll();

        for (let i = 0; i < capacity - count; i++) {
            let item = this.itemBackArr.get();
            this.mListCanvas.addChild(item.uiObject);
            this.setItemPos(item.uiObject, this.itemArr.length + i + 1);
        }
        let size = this.mListCanvas.size.clone();
        if (count > capacity)
            capacity = count;
        let y = Math.floor((capacity - 1) / 4) * (GlobalData.Bag.itemSize.y + GlobalData.Bag.itemSpace) + GlobalData.Bag.itemOffset[1];
        this.mListCanvas.size = new mw.Vector2(size.x, y + 200);

    }

    /**子元素点击事件 */
    private onClickItem(item: PetBag_Item) {
        console.warn(`lwj 点击了宠物item`);
        if (this.isDel) {
            if (item.getDelImageVis()) { //已经点击过了
                item.setDelImgVis(false);
                item.setDelBackVis(true);
                this.delArr.splice(this.delArr.indexOf(item.petData.k), 1);
            } else {
                item.setDelImgVis(true);
                item.setDelBackVis(false);
                this.delArr.push(item.petData.k);
            }
            this.setDelBtn();

            return;
        }

        if (this.isReName) {//改名字
            item.onHoverShow(false);
            this.onReName(item);
            return;
        }

        //判断是否装备满了
        if (this.isEquipFull() && !item.getLockVis()) {
            MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_12.Value);
            return;
        }

        if (item.isEquip) {
            console.warn(`lwj 点击了宠物item  ${item.petData.k} 装备卸载`);
            // 卸载
            this.onEquipAC.call(false, [item.petData.k]);
        } else {
            // 装备
            this.onEquipAC.call(true, [item.petData.k]);
        }

    }

    /**判断是否装备满了 */
    private isEquipFull(): boolean {
        if (this.data.CurPetFollowCount >= this.data.MaxFollowCount) {
            return true;
        }
        return false;
    }

    /**设置改名字UI样式 */
    private setReNameUI() {
        this.isReName = !this.isReName;

        if (this.isReName) {
            this.mReNameBtn.normalImageGuid = "174996";
        } else {
            this.mReNameBtn.normalImageGuid = "174820";
        }
    }

    /**改名字 */
    private onReName(item: PetBag_Item) {
        if (this.reNameUI == null) {
            this.reNameUI = mw.UIService.create(P_ReName);
            this.reNameUI.onReNameAC.add((itemData: petItemDataNew, name: string) => {
                this.onReNameAC.call(itemData.k, name);
            });
        }

        this.hide();
        this.reNameUI.showCurName(item);
    }

    /**设置删除UI样式 */
    private setDelUI() {
        this.isDel = !this.isDel;

        this.itemArr.forEach((item) => {
            item.setDelBackVis(this.isDel);
            item.setDelImgVis(false);
        });
        if (this.isDel && this.isReName) { //在改名字时，点击删除
            this.setReNameUI();
        }
        if (this.isDel) {
            this.setCancelBtn();
            this.mReNameBtn.visibility = mw.SlateVisibility.Collapsed;
            this.mEquipBtn.visibility = mw.SlateVisibility.Collapsed;
            this.mEquip.visibility = mw.SlateVisibility.Collapsed;
        } else {
            this.mDelBtn.normalImageGuid = "174835";
            this.mSureDelBtn_Cancel.visibility = mw.SlateVisibility.Collapsed;
            if (this.mSureDelBtn.visible)
                this.mSureDelBtn.visibility = mw.SlateVisibility.Collapsed;
            this.mReNameBtn.visibility = mw.SlateVisibility.Visible;
            this.mEquipBtn.visibility = mw.SlateVisibility.Visible;
            this.mEquip.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        }

    }

    /**设置取消按钮样式 */
    private setCancelBtn() {
        this.mDelBtn.normalImageGuid = "174991";
        this.mSureDelBtn_Cancel.visibility = mw.SlateVisibility.Visible;
        this.mSureDelBtn.visibility = mw.SlateVisibility.Collapsed;
    }

    /**设置删除按钮样式 */
    private setDelBtn() {
        this.mSureDelBtn_Cancel.visibility = mw.SlateVisibility.Collapsed;
        this.mSureDelBtn.visibility = mw.SlateVisibility.Visible;

        if (this.delArr.length == 0) {
            this.setCancelBtn();
        }
    }

    /**点击 删除 按钮 */
    private sureDel() {

        MessageBox.showTwoBtnMessage(GameConfig.Language.Text_messagebox_13.Value, (res) => {
            if (res) {
                this.onDelAC.call(this.delArr);
            }
            this.hide();
        });
    }

    /**取消按钮*/
    public cancelDel() {
        this.setDelUI();
    }

    public hideWhenBagOpen() {
        this.hide();
    }

    protected onShow(...params: any[]): void {
        this.itemArr.forEach((item) => {
			item.setEnableHover(true);
		})
        UIService.getUI(P_FusePanel).hideWhenBagOpen();
        UIService.getUI(P_Enchants).hideWhenBagOpen();
        UIService.getUI(P_Pet_Dev).hideWhenBagOpen();
        this.showAC.call();
        this.isReName = false;
        if (this.delArr.length > 0) {
            this.delArr.length = 0;
        }
        utils.showUITween(this);
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            this.hide();
        });
    }

    protected onHide(): void {
        this.hideAC.call();
        if (this.isDel)
            this.setDelUI();
        if (this.isReName)
            this.setReNameUI();
        this.itemTweenArr.forEach((item) => {
            item.stopTipsTween();
        });
        this.itemArr.forEach((item) => {
            this.showNewPetHoverUI(false, item);
            item.onHoverShow(false);
			item.setEnableHover(false);
            if (item.isEquip) {
                try {
                    item.setLockVis(false);
                } catch (error) {
                }
            }
        });
        PetBagItem.instance.UIPool.resetAll();
        this.itemTweenArr.length = 0;

        // mw.UIService.getUI(P_PetHover).hide();
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }

    // /**悬浮UI */
    // private showHoverUI(isShow: boolean, item: PetBag_Item) {
    //     if (isShow) {
    //         let pos = item.uiObject.position;
    //         let loc = new mw.Vector2(pos.x + this.mCanvas.position.x, pos.y + this.mCanvas.position.y);
    //         mw.UIService.getUI(P_PetHover).setPetInfoShow(item.petData, loc);
    //     } else {
    //         mw.UIService.getUI(P_PetHover).hide();
    //     }
    // }

    /**悬浮UI */
    private showNewPetHoverUI(isShow: boolean, item: PetBag_Item) {
        const buffNum = item.petData.p.b.length ?? 0;
        if (isShow) {
			const cfg = GameConfig.PetARR.getElement(item.petData.I);
			item.mPic_Equip_4.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			item.mPic_Equip_4.setImageColorByHex(GlobalData.Bag.itemHoverLineColor[cfg.QualityType as GlobalEnum.PetQuality - 1]);
            let pos = item.uiObject.position;
            let loc = new mw.Vector2(pos.x + this.mCanvas.position.x + 125 + GlobalData.Bag.itemHoverOffsetX, pos.y + this.mCanvas.position.y - this.mScrollBox.scrollOffset + GlobalData.Bag.itemHoverOffsetY);
            buffNum > 2 ? mw.UIService.getUI(P_BagHoverNum3).setPetInfoShow(item.petData, loc) : mw.UIService.getUI(P_BagHoverNum2).setPetInfoShow(item.petData, loc);
        } else {
			item.mPic_Equip_4.visibility = mw.SlateVisibility.Collapsed;
            buffNum > 2 ? mw.UIService.getUI(P_BagHoverNum3).hide() : mw.UIService.getUI(P_BagHoverNum2).hide();
        }
    }

    /**设置装备按钮样式 */
    private setEquipBtnVis(isHas: boolean) {
        if (isHas) {
            this.mEquip.text = GameConfig.Language.button_1.Value;
        } else {
            this.mEquip.text = GameConfig.Language.button_2.Value;
        }
    }

    private autoEquip() {
        if (this.mEquip.text == GameConfig.Language.button_1.Value) {

            this.onEquipAC.call(false, this.data.CurFollowPets);
        } else {
            let str = this.getNeedEquipKey(this.data.sortBag(), this.data.CurFollowPets).split(",");

            let needArr = str[0] ? str[0].split(" ") : [];
            let unEquipArr = str[1] ? str[1].split(" ") : [];

            let arr: number[] = [];
            for (let i = 0; i < needArr.length; i++) {
                const element = Number(needArr[i]);
                if (element == 0) continue;
                arr.push(element);
            }
            if (arr.length > 0) {
                this.onEquipAC.call(true, arr);
            }

            arr.length = 0;
            for (let i = 0; i < unEquipArr.length; i++) {
                const element = Number(unEquipArr[i]);
                if (element == 0) continue;
                arr.push(element);
            }
            if (arr.length > 0) {
                this.onEquipAC.call(false, arr);
            }
        }
    }

    /**装备卸载完后，判断按钮显示 */
    private equipBtnShow() {
        if (this.data.CurFollowPets.length == 0) {
            this.setEquipBtnVis(false);
            return;
        }
        let tempARR = [];
        for (let i = 0; i < this.data.CurFollowPets.length; i++) {
            const element = this.data.CurFollowPets[i];
            tempARR.push(element);
        }
        let str = this.getNeedEquipKey(this.data.sortBag(), tempARR);
        let needArr = str[0] ? str[0].split(" ") : [];

        this.setEquipBtnVis(needArr.length == 0 ? true : false);

    }

    /**是否包含 */
    private isIncludeKey(arr: petItemDataNew[], keys: number[]) {
        if (arr.length == 0) return false;
        if (arr.length == keys.length) return true;

        arr.sort((a, b) => {
            let index_1 = this.data.CurFollowPets.findIndex((value) => {
                return value == a.k;
            });
            let index_2 = this.data.CurFollowPets.findIndex((value) => {
                return value == b.k;
            });
            if (index_1 > 0) {
                index_1 = 0;
            }
            if (index_2 > 0) {
                index_2 = 0;
            }
            return index_2 - index_1;
        });
        let isHas = true;
        let len = arr.length >= this.data.MaxFollowCount ? this.data.MaxFollowCount : arr.length;
        for (let i = 0; i < len; i++) {
            if (keys.indexOf(arr[i].k) == -1) {
                isHas = false;
                break;
            }
        }
        return isHas;
    }

    /**获取 以,分隔，需要装备 删除的 */
    private getNeedEquipKey(bagArr: petItemDataNew[], curEquip: number[]): string {
        let Equip = "";
        let len = bagArr.length >= this.data.MaxFollowCount ? this.data.MaxFollowCount : bagArr.length;
        for (let i = 0; i < len; i++) {
            if (curEquip.indexOf(bagArr[i].k) == -1) {
                Equip += bagArr[i].k + " ";
            } else {
                curEquip.splice(curEquip.indexOf(bagArr[i].k), 1);
            }

        }
        if (curEquip.length > 0)
            Equip += "," + curEquip.join(" ");
        return Equip;
    }

    /**设置装备数量 */
    public setEquipNum(num: number) {
        this.mTextBlock_Petequipnum.text = utils.Format(GameConfig.Language.Page_UI_Tips_1.Value, num);
    }

}

/**宠物item对象池 */
@Singleton()
export class PetBagItem {
    public static instance: PetBagItem;
    private uiPool: UIPool<PetBag_Item> = new UIPool();

    constructor() {
        this.uiPool.setCreator(() => {
            let item = mw.UIService.create(PetBag_Item);
            item.uiObject.size = item.rootCanvas.size;
            return item;
        });
    }

    public get UIPool() {
        return this.uiPool;
    }
}

export class P_ReName extends ReName_Generate {

    public onReNameAC: Action2<petItemDataNew, string> = new Action2();

    private preName: string = "";
    private item: petItemDataNew;

    onStart() {
        this.mSureBtn.onClicked.add(async () => {
            try {
                let res = await StringUtil.maskWordCheck(this.mNameInputBox.text);
                if (!res.result) {
                    this.hide();
                    return;
                }
            } catch (error) {
                return;
            }

            if (this.preName != this.mNameInputBox.text)
                this.onReNameAC.call(this.item, this.mNameInputBox.text);

            this.hide();
        });

        this.mBtn_Random.onClicked.add(() => {
            let name = utils.GetUIText(utils.GetRandomNum(1, 201));
            this.mNameInputBox.text = name;
        });

    }

    public showCurName(item: PetBag_Item) {
        let k = item.petData.k;
        this.item = ModuleService.getModule(PetBagModuleC)["data"].bagItemsByKey(k);
        let name = this.item.p.n;
        if (!name) {
            name = GameConfig.PetARR.getElement(item.petData.I).petName;
        }
        this.mNameInputBox.text = name;
        this.preName = name;
        this.show();
    }
}


