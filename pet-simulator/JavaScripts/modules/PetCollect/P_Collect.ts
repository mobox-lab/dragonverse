import { GameConfig } from "../../config/GameConfig";
import { IPetARRElement } from "../../config/PetARR";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import PetCollectItem_Generate from "../../ui-generate/Pet/PetCollectItem_generate";
import PetCollectPanel_Generate from "../../ui-generate/Pet/PetCollectPanel_generate";
import PetHover_Generate from "../../ui-generate/Pet/PetHover_generate";
import { stringToBuff, utils } from "../../util/uitls";
import { BagTool } from "../PetBag/BagTool";
import { PetBagModuleData, petItemDataNew } from "../PetBag/PetBagModuleData";
import { CollectModuleC } from "./CollectModuleC";
import { IItemRender, List } from "./ScrollerView";

/**宠物item UI */
class petItem extends PetCollectItem_Generate implements IItemRender {

    index: number;

    setData(seq: string | number): void {
        let cfg = GameConfig.PetARR.getElement(seq as number);
        this.mPetImage.imageGuid = cfg.uiGuid;
        this.setSpecial(cfg);
    }

    setSelect(isSelect: boolean): void {
        throw new Error("Method not implemented.");
    }

    onclickSuccess: (idx: number) => void;

    /**特殊化 爱心彩虹 */
    private setSpecial(cfg: IPetARRElement): number {
        const dev = GlobalEnum.PetDevType;
        if (!cfg) return;
        if (cfg.DevType == dev.Normal) {
            //普通
            this.mPic_Heart.visibility = mw.SlateVisibility.Collapsed;
            this.mPic_Rainbow.visibility = mw.SlateVisibility.Collapsed;
            return 0;
        }

        if (cfg.DevType == dev.Love) {
            //爱心化
            this.mPic_Heart.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mPic_Rainbow.visibility = mw.SlateVisibility.Collapsed;
            return 1;
        }

        if (cfg.DevType == dev.Rainbow) {
            //彩虹化
            this.mPic_Heart.visibility = mw.SlateVisibility.Collapsed;
            this.mPic_Rainbow.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            return 2;
        }
        return null;

    }

}

export class P_Collect extends PetCollectPanel_Generate {
    private collectMC: CollectModuleC = null;
    public petArr: petItem[] = [];

    public onBtnAC: Action2<number, mw.Vector2> = new Action2();

    private list: List = null;

    protected onStart() {
        this.collectMC = ModuleService.getModule(CollectModuleC);
        // this.mBtn_unlock.visibility = mw.SlateVisibility.Collapsed;
        // this.mBtn_unlock.onClicked.add(() => {
        //     this.collectMC.setCurAddLevel();
        //     this.switchState(false);
        // });
        this.list = new List(this.mScrollBox, this.mListCanvas, petItem);

    }

    // /**图签状态切换 */
    // public switchState(isShow: boolean): void {
    //     if (isShow) {
    //         this.mBtn_unlock.visibility = mw.SlateVisibility.Visible;
    //         this.mProgressCanvas.visibility = mw.SlateVisibility.Collapsed;
    //     } else {
    //         this.mBtn_unlock.visibility = mw.SlateVisibility.Collapsed;
    //         this.mProgressCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
    //     }
    // }

    public initUI(arr: number[], level: number) {
        this.list.setDatas(arr);
        this.setCurHasCount(arr.length, level);

    }

    /**设置当前有个数 */
    public setCurHasCount(count: number, level: number) {
        // this.mHasText.text = utils.Format(GameConfig.Language.Page_UI_Tips_3.Value, count);
        // this.mbar_hp.currentValue = count / GlobalData.Collect.levelCount[level - 1];
        this.setLevel(level);
    }

    protected onShow(...params: any[]): void {
        //this.playColorTween();
        utils.showUITween(this);
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            this.mCloseBtn.onClicked.broadcast();
        });
    }

    public hide(): void {
        super.hide();
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }

    protected onHide() {

    }

    public setLevel(level: number) {
        // if (level > GlobalData.Collect.levelCount.length)
        //     this.mALLText.text = this.mHasText.text;
        // else
        //     this.mALLText.text = utils.Format(GameConfig.Language.Page_UI_Tips_3.Value, GlobalData.Collect.levelCount[level - 1]);
        // this.mText_level.text = utils.Format(GameConfig.Language.Page_UI_Tips_4.Value, level);
    }

}

// /**宠物悬停框 */
// export class P_PetHover extends PetHover_Generate {

//     private map: Map<mw.Widget, mw.Vector2[]> = new Map();

//     private collectMC: CollectModuleC;
//     private curLocBuff_1: mw.Vector2;
//     private curLocBuff_2: mw.Vector2;
//     private curLocBuff_3: mw.Vector2;
//     private isSpecialShow: boolean;

//     private size: mw.Vector2;

//     onStart() {
//         //this.saveUIState();
//         this.size = this.mCanvas.size.clone();
//         this.curLocBuff_1 = this.mBuffText_2.position.clone();
//         this.curLocBuff_2 = this.mBuffText_3.position.clone();
//         this.curLocBuff_3 = this.mBuffText_1.position.clone();

//         this.collectMC = ModuleService.getModule(CollectModuleC);
//     }

//     public setPetInfoShow(item: petItemDataNew, loc: mw.Vector2) {
//         item = DataCenterC.getData(PetBagModuleData).bagItemsByKey(item.k);
//         if (!item) return;
//         this.show();
//         let cfg = GameConfig.PetARR.getElement(item.I);
//         if (cfg == null) return;
//         this.rootCanvas.position = new mw.Vector2(loc.x, loc.y % 579);
//         this.mNameText.text = cfg.petName;
//         this.setBtnColor(cfg.QualityType);
//         this.setHasCount(item.I);

//         let color = this.getSpecialColor(item.I);
//         if (color != null) {
//             this.mText_SpecialTips.text = cfg.Special;
//             this.mPic_SpecialTips.setImageColorByHex(color);
//             this.mText_SpecialTips.visibility = mw.SlateVisibility.Visible;
//             this.mPic_SpecialTips.visibility = mw.SlateVisibility.Visible;
//             this.isSpecialShow = true;
//         } else {
//             this.mText_SpecialTips.visibility = mw.SlateVisibility.Collapsed;
//             this.mPic_SpecialTips.visibility = mw.SlateVisibility.Collapsed;
//             this.isSpecialShow = false;
//         }

//         let str = BagTool.getStr(item);
//         let buff = stringToBuff(str);
//         switch (buff.length) {
//             case 1:
//                 this.setBuffText(this.getBuffText(buff[0]));
//                 break;
//             case 2:
//                 this.setBuffText(this.getBuffText(buff[0]), this.getBuffText(buff[1]));
//                 break;
//             case 3:
//                 this.setBuffText(this.getBuffText(buff[0]), this.getBuffText(buff[1]), this.getBuffText(buff[2]));
//                 break;
//             case 0:
//                 this.setBuffText();
//                 this.layer = mw.UILayerBottom;
//                 this.show();
//                 break;
//             default:
//                 break;
//         }
//         if (item.p.n == null)
//             this.mNiknameText.text = cfg.petName;
//         else {
//             let data = DataCenterC.getData(PetBagModuleData).bagItemsByKey(item.k);
//             this.mNiknameText.text = "\"" + data.p.n + "\"";
//         }
//     }

//     /**获取描述 */
//     public getBuffText(item: { id: number; level: number; }): string {
//         let between = GlobalData.Enchant.normalEnchantIdRange;
//         let cfg = GameConfig.Enchants.getElement(item.id);
//         let str: string;

//         let name = cfg.Name;
//         let color = cfg.Color;

//         let name_2 = "<color=#" + color + ">" + name + "</color>" + "-";

//         if (!cfg.Degree || cfg.Degree == 0) {
//             str = name_2 + cfg.Describe;
//         } else {
//             str = name_2 + utils.Format(cfg.Describe, cfg.Degree);
//         }
//         return str;
//     }

//     /**设置稀有度按钮颜色 */
//     private setBtnColor(type: number) {
//         const quality = GlobalEnum.PetQuality;
//         let colorArr = GlobalData.Bag.rareColor;
//         let color: string;
//         let str: string;
//         switch (type) {
//             case quality.Normal:
//                 color = colorArr[0];
//                 str = GameConfig.Language.PetARR_Quality_1.Value;
//                 break;
//             case quality.Rare:
//                 color = colorArr[1];
//                 str = GameConfig.Language.PetARR_Quality_2.Value;
//                 break;
//             case quality.Epic:
//                 color = colorArr[2];
//                 str = GameConfig.Language.PetARR_Quality_3.Value;
//                 break;
//             case quality.Legend:
//                 color = colorArr[3];
//                 str = GameConfig.Language.PetARR_Quality_4.Value;
//                 break;
//             case quality.Myth:
//                 color = colorArr[4];
//                 str = GameConfig.Language.PetARR_Quality_5.Value;
//                 break;
//             default:
//                 color = colorArr[0];
//                 break;
//         }
//         this.mBackImage.setImageColorByHex(color);
//         this.mQualityText.text = str;
//     }

//     /**特殊化颜色 */
//     private getSpecialColor(id: number) {
//         const dev = GlobalEnum.PetDevType;
//         let cfg = GameConfig.PetARR.getElement(id).DevType;
//         if (cfg == dev.Normal) {
//             //普通
//             return null;
//         }
//         if (cfg == dev.Love) {
//             //爱心化
//             return GlobalData.Bag.specialColor[0];
//         }
//         if (cfg == dev.Rainbow) {
//             //彩虹化
//             return GlobalData.Bag.specialColor[1];
//         }
//         return null;

//     }

//     /**设置拥有个数 */
//     public setHasCount(id: number) {
//         let count = this.collectMC.getCollectCount(id);
//         if (count == 0) {
//             count = 1;
//         }

//         this.mValueText.text = utils.Format(GameConfig.Language.Page_UI_Tips_11.Value, utils.formatNumber(count));
//     }

//     /**设置ui高度 */
//     public setUIHeight(width: number) {
//         const UIData = GlobalData.BuffUI;
//         this.mCanvas.size = new mw.Vector2(this.mCanvas.size.clone().x, width);
//         this.mFrameImg.size = new mw.Vector2(this.mFrameImg.size.clone().x, width);
//     }

//     /**设置buff文本 */
//     public setBuffText(buff_1: string = "", buff_2: string = "", buff_3: string = "") {
//         let offY = 0; //Y偏移

//         if (!this.isSpecialShow) {
//             offY = this.mPic_SpecialTips.size.y;
//         }
//         if (buff_3 != "") {
//             this.mBuffText_1.text = buff_3;
//             this.mBuffText_1.position = new mw.Vector2(this.curLocBuff_3.x, this.curLocBuff_3.y - offY);
//             this.autoSetUI(this.mBuffText_3, 0);
//             this.mBuffText_1.visibility = mw.SlateVisibility.SelfHitTestInvisible;
//         } else {
//             offY += this.mBuffText_1.size.y;
//             this.mBuffText_1.visibility = mw.SlateVisibility.Collapsed;
//         }

//         this.mBuffText_2.position = new mw.Vector2(this.curLocBuff_1.x, this.curLocBuff_1.y - offY);

//         if (buff_1 != "") {
//             this.mBuffText_2.text = buff_1;
//         } else {
//             this.mBuffText_2.text = GameConfig.Language.Tips_Enchants_9.Value;
//         }
//         this.mBuffText_3.position = new mw.Vector2(this.curLocBuff_2.x, this.curLocBuff_2.y - offY);

//         if (buff_2 != "") {
//             this.mBuffText_3.text = buff_2;
//             this.autoSetUI(this.mBuffText_3, 0);
//         } else {
//             this.mBuffText_3.text = GameConfig.Language.Tips_Enchants_9.Value;
//         }
//         this.setUIHeight(this.size.y - offY + 10);
//         this.show();
//     }

//     /**是否有正在调整大小的ui */
//     public isHasAutoUI: boolean = false;

//     /**自动调整ui大小 */
//     public autoSetUI(ui: mw.TextBlock, addVal: number) {
//         // let height = ui.textHeight;

//         // const addX = 50;
//         // if (height > GlobalData.BuffUI.textHeightLimit) {
//         //     let curSize = ui.size.clone();

//         //     ui.size = new mw.Vector2(curSize.x + addX, curSize.y);
//         //     ui.textHorizontalLayout = mw.UITextHorizontalLayout.AutoWarpText;
//         //     addVal += addX;
//         //     this.isHasAutoUI = true;
//         //     ui.position = new mw.Vector2(ui.position.x - addX / 2, ui.position.y);

//         //     setTimeout(() => {
//         //         ui.text = ui.text;
//         //         ui.invalidateLayoutAndVolatility();
//         //         this.autoSetUI(ui, addVal);
//         //     }, 50);
//         // } else {

//         //     if (addVal == 0) {
//         //         if (!this.isHasAutoUI) {
//         //             this.layer = mw.UILayerBottom;
//         //             this.show();
//         //         }
//         //         return;
//         //     }
//         //     ui.text = ui.text;
//         //调整canvas大小
//         // let canvasSize = this.mFrameImg.size.clone();
//         // this.mFrameImg.size = new mw.Vector2(canvasSize.x + addVal / 2, canvasSize.y);
//         // for (let i = 1; i < this.mCanvas.getChildrenCount(); i++) {
//         //     const element = this.mCanvas.getChildAt(i);
//         //     this.setUILoc(element, addVal / 4);
//         // }
//         // this.layer = mw.UILayerBottom;
//         // this.show();

//         // }
//     }

//     private setUILoc(ui: mw.Widget, addX: number) {
//         let curloc = ui.position.clone();
//         ui.position = new mw.Vector2(curloc.x + addX, curloc.y);
//     }

//     /**保存ui状态 */
//     public saveUIState() {
//         // this.map.set(this.mCanvas, [this.mCanvas.position.clone(), this.mCanvas.size.clone()])
//         for (let i = 0; i < this.mCanvas.getChildrenCount(); i++) {
//             const element = this.mCanvas.getChildAt(i);
//             this.map.set(element, [element.position.clone(), element.size.clone()]);
//         }
//     }

//     /**恢复ui状态 */
//     public recoverUIState() {
//         this.map.forEach((val, key) => {
//             key.position = val[0];
//             key.size = val[1];
//         });
//     }

//     onHide() {
//         this.isHasAutoUI = false;
//         // this.recoverUIState();
//     }

// }

