// import { GameConfig } from "../../config/GameConfig";
// import { IVIPLVElement } from "../../config/VIPLV";
// import { GlobalData } from "../../const/GlobalData";
// import VIPItem_Generate from "../../ui-generate/PetVIP/VIPItem_generate";
// import VIPmain_Generate from "../../ui-generate/PetVIP/VIPmain_generate";
// import { oTraceError } from "../../utils/LogManager";
// import { utils } from "../../utils/uitls";

// export class P_PassTask extends VIPmain_Generate {

//     /**购买等级事件 */
//     public onBuyLv: Action = new Action();
//     /**购买大会员事件 */
//     public onBuyBigVip: Action = new Action();
//     /**点击按钮购买事件 */
//     public onBtnClickAC: Action2<number, boolean> = new Action2();

//     private items: Array<taskItem> = [];

//     onStart() {
//         this.mBtn_Close.onClicked.add(() => {
//             this.hide();
//         });
//         //购买等级
//         this.mBtn_Buy.onClicked.add(() => {
//             this.onBuyLv.call();
//         });
//         //购买大会员
//         this.mBtn_Unlock.onClicked.add(() => {
//             this.onBuyBigVip.call();
//         })
//     }


//     public showInfo(curLv: number, vipGetArr: number[] = null) {
//         GameConfig.VIPLV.getAllElement().forEach((cfg) => {
//             let item = mw.UIService.create(taskItem);
//             item.refresh(curLv, cfg, vipGetArr);
//             item.onBtnClick.add(this.onBtnClick.bind(this))
//             this.items.push(item);
//             item.uiObject.size = item.mCanvas.size;
//             this.mCanvas_1.addChild(item.uiObject);
//         });
//     }

//     /**按钮点击 */
//     private onBtnClick(cfgId: number, isVIP: boolean) {
//         this.onBtnClickAC.call(cfgId, isVIP);
//     }

//     /**设置星星数 */
//     public setStarCount(starCount: number) {
//         this.mStar_Text.text = starCount.toString();
//     }
//     /**购买成功 */
//     public successBuy(cfgId: number) {

//         let item = this.items.find((item) => {
//             return item.cfg.ID == cfgId;
//         });
//         if (item) {
//             item.refresh(cfgId, item.cfg);
//         }
//         item = this.items.find((item) => {
//             return item.cfg.ID == cfgId + 1;
//         });
//         if (item) {
//             item.refresh(cfgId, item.cfg);
//         }
//     }

//     private isInit: boolean = false;
//     protected onShow(...params: any[]): void {
//         if (!this.isInit) {
//             this.isInit = true;
//             this.showInfo(params[0], params[1]);
//         }
//     }

// }


// class taskItem extends VIPItem_Generate {

//     /**按钮点击事件
//      * @param cfgId 等级
//      * @param vipAfter 是否是vip
//      */
//     public onBtnClick: Action2<number, boolean> = new Action2();

//     public cfg: IVIPLVElement = null;

//     private vipAfter: boolean = false;

//     onStart() {
//         this.mBtn_Buy.onClicked.add(() => {
//             this.onBtnClick.call(this.cfg.ID, this.vipAfter);
//         })
//     }

//     public refresh(curLv: number, cfg: IVIPLVElement, vipGetArr: number[] = null) {
//         if (vipGetArr != null) {
//             this.vipAfter = true;
//         }
//         this.cfg = cfg;
//         let colors = GlobalData.PassTask.frameColors;
//         this.mImage_Icon.imageGuid = cfg.Icon;

//         this.mTextBlock_Level.text = cfg.ID.toString();
//         this.mTextBlock_Number.text = utils.formatNumber(cfg.Reward);

//         let isUnlock = curLv >= cfg.ID;

//         if (curLv + 1 == cfg.ID) {
//             //下一等级
//             this.mImage_Get.visibility = mw.SlateVisibility.Collapsed;
//             this.mTextBlock_StarNeed.text = cfg.StarCount.toString();
//             this.mBtn_Buy.setNormalImageColorByHex(colors[1]);
//             this.mImage_Up.visibility = mw.SlateVisibility.Collapsed;
//             this.mTextBlock_StarNeed.visibility = mw.SlateVisibility.SelfHitTestInvisible;
//             this.mTextBlock_Lock.visibility = mw.SlateVisibility.Collapsed;
//             this.mBtn_Buy.enable = true;
//         } else if (isUnlock) {
//             //解锁
//             this.mImage_Get.visibility = mw.SlateVisibility.SelfHitTestInvisible;
//             this.mTextBlock_StarNeed.visibility = mw.SlateVisibility.Collapsed;
//             this.mBtn_Buy.setNormalImageColorByHex(colors[2]);
//             this.mImage_Up.visibility = mw.SlateVisibility.Collapsed;
//             this.mTextBlock_Lock.visibility = mw.SlateVisibility.Collapsed;

//             if (this.vipAfter)
//                 this.mBtn_Buy.enable = true;
//             else
//                 this.mBtn_Buy.enable = false;

//             this.mImage_Star.visibility = mw.SlateVisibility.Collapsed;
//         } else {
//             //未解锁
//             this.mImage_Get.visibility = mw.SlateVisibility.Collapsed;
//             this.mImage_Up.visibility = mw.SlateVisibility.SelfHitTestInvisible;
//             this.mBtn_Buy.setNormalImageColorByHex(colors[0]);
//             this.mTextBlock_StarNeed.visibility = mw.SlateVisibility.Collapsed;
//             this.mTextBlock_Lock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
//             this.mBtn_Buy.enable = false;
//         }

//     }

// }

