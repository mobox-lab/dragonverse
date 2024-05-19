// import { GlobalData } from "../../const/GlobalData";
// import TradeReady_Generate from "../../ui-generate/Trade/TradeReady_generate";
// import { oTraceError } from "../../util/LogManager";
// import { PetBagModuleData, petItemDataNew } from "../PetBag/PetBagModuleData";
// import { P_PetHover } from "../PetCollect/P_Collect";
// import { PetSimulatorPlayerModuleData } from "../Player/PlayerModuleData";
// import { PlayerNameManager } from "./PlayerNameManager";
// import { petInfo } from "./TradingScript";
// import { GameConfig } from "../../config/GameConfig";
// import { utils } from "../../util/uitls";
// import { PetBagItem } from "../PetBag/P_Bag";
//
// import { PetBag_Item } from "../PetBag/P_BagItem";
//
// /**初始交易选则页面 */
// export class P_Trading extends TradeReady_Generate {
//     /**自己宠物数组 */
//     private itemMyArr: PetBag_Item[] = [];
//     /**其他人宠物 */
//     private itemOtherArr: PetBag_Item[] = [];
//
//     public curMyArrLen: number = 0;
//     public curOtherArrLen: number = 0;
//
//     private bagData: PetBagModuleData;
//
//     /**自己的选择 */
//     public onSelectAC: Action2<boolean, number> = new Action2();
//     /**设置钻石数事件 */
//     public onSetDiamondAC: Action1<number> = new Action1();
//     /**聊天事件 */
//     public onSendMsgAC: Action2<number, number> = new Action2();
//     private confirm: boolean = false;
//     private canelText: string;
//
//     onStart() {
//         DataCenterC.ready().then(() => {
//             this.bagData = DataCenterC.getData(PetBagModuleData);
//         });
//         this.canelText = this.mBtn_Cancel.text;
//         this.mBtn_Chat.normalImageGuid = "179453";
//         this.mInput_Diamond.text = "0";
//         this.mText_ReceiveDM.text = "0";
//         this.mText_already.visibility = mw.SlateVisibility.Collapsed;
//         this.mText_Otherready.visibility = mw.SlateVisibility.Collapsed;
//         this.mInput_Diamond.onTextChanged.add(this.onTextChanged.bind(this));
//     }
//
//     public addChatEvent() {
//         if (this.mBtn_Chat.normalImageGuid == "179453") {
//             this.mBtn_Chat.normalImageGuid = "179450";
//         } else {
//             this.mBtn_Chat.normalImageGuid = "179453"
//         }
//         this.setRedPointVis(false);
//     }
//
//     public showPanel(tarPlayerId: number) {
//         this.setPlayerName(tarPlayerId);
//         if (!this.bagData) {
//             this.bagData = DataCenterC.getData(PetBagModuleData);
//             oTraceError('lwj 背包数据为空');
//         }
//         this.setMyCanvasItem(this.bagData.sortBag());
//         this.setOtherCanvasItem([]);
//         this.show();
//     }
//
//     public clearData() {
//         this.confirm = false;
//         this.mText_Information.visibility = mw.SlateVisibility.SelfHitTestInvisible;
//         this.mText_already.visibility = mw.SlateVisibility.Collapsed;
//         this.mText_Otherready.visibility = mw.SlateVisibility.Collapsed;
//         this.mBtn_Chat.normalImageGuid = "179453";
//         this.mInput_Diamond.text = "0";
//         this.mText_ReceiveDM.text = "0";
//         this.mText_Count.text = "";
//         this.curMyArrLen = 0;
//         this.mInput_Diamond.readOnlyEnable = false;
//         this.mBtn_Ready.normalImageGuid = (GlobalData.Trading.confirmColor[1]);
//         //箭头颜色、框Guid 地板颜色
//         this.mImage_LJT.setImageColorByHex(GlobalData.Trading.arrowColor[1])
//         this.mImage_RJT.setImageColorByHex(GlobalData.Trading.arrowColor[1])
//         this.mImage_Rbox.imageGuid = (GlobalData.Trading.borderGuid[1])
//         this.mImage_Lbox.imageGuid = (GlobalData.Trading.borderGuid[1])
//         this.mImage_DMbox.imageGuid = (GlobalData.Trading.diamondBgGuid[1]);
//         this.mBtn_Ready.text = GameConfig.Language.button_11.Value;
//         this.mText_UserName.setFontColorByHex(GlobalData.Trading.nameColor[1])
//         this.mText_MyName.setFontColorByHex(GlobalData.Trading.nameColor[1])
//     }
//
//
//     /**设置对方的钻石数 */
//     public setDiamondCount(count: number) {
//         this.mText_ReceiveDM.text = count.toString();
//     }
//     /**设置按钮倒计时 */
//     public setBtnCountDown() {
//         if (this.confirm) return;
//         this.countDown(GlobalData.Trading.countDown);
//     }
//     /**设置准备按钮颜色 */
//     public setReadyState(isReady: boolean) {
//         this.mInput_Diamond.readOnlyEnable = isReady ? true : false;
//         this.mText_already.text = GameConfig.Language.button_14.Value;
//         this.mText_already.visibility = isReady ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
//         this.mImage_LJT.setImageColorByHex(isReady ? GlobalData.Trading.arrowColor[0] : GlobalData.Trading.arrowColor[1])
//         this.mImage_Lbox.imageGuid = (isReady ? GlobalData.Trading.borderGuid[0] : GlobalData.Trading.borderGuid[1])
//         this.mImage_DMbox.imageGuid = (isReady ? GlobalData.Trading.diamondBgGuid[0] : GlobalData.Trading.diamondBgGuid[1]);
//         this.mText_MyName.setFontColorByHex(isReady ? GlobalData.Trading.nameColor[0] : GlobalData.Trading.nameColor[1])
//         let color = GlobalData.Trading.confirmColor;
//         this.mBtn_Ready.normalImageGuid = (isReady ? color[0] : color[1]);
//         this.mBtn_Ready.text = isReady ? GameConfig.Language.Text_Trade_2.Value : GameConfig.Language.button_11.Value;
//     }
//     /**设置确认按钮颜色 */
//     public setConfirmState(isConfirm: boolean) {
//         if (this.confirm == false) {
//             this.confirm = true;
//             this.mInput_Diamond.readOnlyEnable = true
//             let color = GlobalData.Trading.confirmColor;
//             this.mBtn_Ready.normalImageGuid = (isConfirm ? color[0] : color[1]);
//             this.mBtn_Ready.text = isConfirm ? GameConfig.Language.Text_Trade_2.Value : GameConfig.Language.button_15.Value;
//             return;
//         }
//         this.mText_already.text = GameConfig.Language.button_14.Value;
//         this.mText_already.visibility = isConfirm ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
//
//         this.mImage_LJT.setImageColorByHex(isConfirm ? GlobalData.Trading.arrowColor[0] : GlobalData.Trading.arrowColor[1])
//         this.mImage_Lbox.imageGuid = (isConfirm ? GlobalData.Trading.borderGuid[0] : GlobalData.Trading.borderGuid[1])
//         this.mImage_DMbox.imageGuid = (isConfirm ? GlobalData.Trading.diamondBgGuid[0] : GlobalData.Trading.diamondBgGuid[1]);
//         this.mText_MyName.setFontColorByHex(isConfirm ? GlobalData.Trading.nameColor[0] : GlobalData.Trading.nameColor[1])
//         let color = GlobalData.Trading.confirmColor;
//         this.mBtn_Ready.normalImageGuid = (isConfirm ? color[0] : color[1]);
//         this.mBtn_Ready.text = isConfirm ? GameConfig.Language.Text_Trade_2.Value : GameConfig.Language.button_11.Value;
//     }
//
//     /**设置确认时UI的显示 */
//     public setConfirmUI() {
//         for (let id = 0; id < this.itemMyArr.length; id++) {
//             const element = this.itemMyArr[id];
//             if (!element.getLockVis()) {
//                 element.setItemVis(mw.SlateVisibility.Collapsed);
//             } else {
//                 this.curMyArrLen++;
//             }
//         }
//     }
//
//     /**设置宠物item显示 */
//     public setItemVis(isShow: boolean) {
//         this.confirm = isShow;
//         this.itemMyArr.forEach(element => {
//
//             if (!element.getLockVis() && isShow) {
//                 element.setItemVis(mw.SlateVisibility.Collapsed);
//             }
//             if (!isShow) {
//                 element.setItemVis(mw.SlateVisibility.SelfHitTestInvisible);
//             }
//
//         })
//
//     }
//
//     /**设置对方准备 */
//     public setOtherReady(isReady: boolean, isConfirm: boolean = false) {
//         if (isConfirm) {
//             this.mText_Otherready.text = GameConfig.Language.button_14.Value;
//             this.mText_Otherready.visibility = isReady ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
//         } else {
//             this.mText_Otherready.text = GameConfig.Language.button_9.Value;
//             this.mText_Otherready.visibility = isReady ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
//         }
//
//         this.mImage_Rbox.imageGuid = (isReady ? GlobalData.Trading.borderGuid[0] : GlobalData.Trading.borderGuid[1])
//         this.mImage_RJT.setImageColorByHex(isReady ? GlobalData.Trading.arrowColor[0] : GlobalData.Trading.arrowColor[1])
//         this.mText_UserName.setFontColorByHex(isReady ? GlobalData.Trading.nameColor[0] : GlobalData.Trading.nameColor[1])
//     }
//
//     private finalCountDown: any;
//     /**开始倒计时交换 */
//     public startExchange(isConfirm: boolean) {
//
//         if (!isConfirm && this.finalCountDown) {
//             this.clearFinalCountDown();
//             return;
//         }
//         this.mText_Information.visibility = mw.SlateVisibility.Collapsed;
//         let count = GlobalData.Trading.finalCountDown;
//         this.mText_CountDown.text = utils.Format(GameConfig.Language.Page_UI_Tips_5.Value, count);
//
//         this.mBtn_Cancel.text = this.canelText + "(" + count + ")";
//         this.finalCountDown = TimeUtil.setInterval(() => {
//             count--;
//             this.mBtn_Cancel.text = this.canelText + "(" + count + ")";
//             this.mText_CountDown.text = utils.Format(GameConfig.Language.Page_UI_Tips_5.Value, count);
//             if (count <= 0) {
//                 this.clearFinalCountDown();
//             }
//         }, 1)
//     }
//     private clearFinalCountDown() {
//         if (this.finalCountDown) {
//             this.mText_CountDown.text = "";
//             this.mBtn_Cancel.text = this.canelText;
//             TimeUtil.clearInterval(this.finalCountDown);
//             this.finalCountDown = null;
//         }
//     }
//
//     /**设置其他人的宠物显示 */
//     public setOtherCanvasItem(arr: petInfo[]) {
//         this.curOtherArrLen = arr.length;
//         this.itemOtherArr.forEach(element => {
//             element.setItemVis(mw.SlateVisibility.Collapsed);
//         })
//
//
//         for (let i = 0; i < arr.length; i++) {
//             const element = arr[i];
//             let item = PetBagItem.instance.UIPool.get();
//             let data = new petItemDataNew(element.key, element.id);
//             data.p.a = element.attack;
//             data.p.n = "";
//             item.init(data);
//             this.mCanvas_ReceivePet.addChild(item.uiObject);
//
//             if (this.itemOtherArr.indexOf(item) == -1)
//                 this.itemOtherArr.push(item)
//
//             item.setClickFun(() => { }, this)
//         }
//     }
//
//     /**设置自己的宠物显示 */
//     private setMyCanvasItem(arr: petItemDataNew[]) {
//         PetBagItem.instance.UIPool.resetAll();
//         this.itemMyArr.length = 0;
//
//         for (let i = 0; i < arr.length; i++) {
//             const element = arr[i];
//             let item = PetBagItem.instance.UIPool.get();
//
//             item.init(element);
//             this.mCanvas_SelectPet.addChild(item.uiObject);
//             item.onHoverAC.clear();
//             item.onHoverAC.add(this.showHoverUI.bind(this));
//             item.setClickFun(this.onClickItem.bind(this), this);
//             this.itemMyArr.push(item);
//         }
//
//     }
//
//     /**点击宠物item */
//     private onClickItem(item: PetBag_Item) {
//         if (this.confirm) {
//             return;
//         }
//         item.setLockVis(!item.getLockVis());
//         let isSelect = item.getLockVis();
//         this.onSelectAC.call(isSelect, item.petData.k);
//         this.setBtnCountDown();
//         this.curMyArrLen = 0;
//         for (let id = 0; id < this.itemMyArr.length; id++) {
//             const element = this.itemMyArr[id];
//             if (!element.getLockVis()) {
//             } else {
//                 this.curMyArrLen++;
//             }
//         }
//     }
//     /**悬浮UI */
//     private showHoverUI(isShow: boolean, item: PetBag_Item) {
//         if (isShow) {
//             let pos = item.uiObject.position;
//             let loc = new mw.Vector2(pos.x + this.mCanvas.position.x, pos.y + this.mCanvas.position.y)
//             mw.UIService.getUI(P_PetHover).setPetInfoShow(item.petData, loc);
//         } else {
//             mw.UIService.getUI(P_PetHover).hide();
//         }
//     }
//
//     private inputInter: any;
//
//     /**输入框改变 */
//     private onTextChanged(text: string) {
//         let count = Number(text);
//         if (!count || count <= 0) {
//             if (count == 0) {
//                 this.onSetDiamondAC.call(count);
//                 this.mInput_Diamond.text = "0";
//                 return;
//             }
//             this.mInput_Diamond.text = "";
//             return;
//         }
//
//
//         let allCount = DataCenterC.getData(PetSimulatorPlayerModuleData).diamond;
//
//         if (count > allCount) {
//             count = allCount - 1;
//             if (count < 0) {
//                 count = 0;
//                 this.mInput_Diamond.hintString = GameConfig.Language.Text_Fuse_UI_3.Value;
//             }
//             setTimeout(() => {
//                 this.mInput_Diamond.text = count.toFixed(0);
//             }, 200);
//         }
//         if (this.inputInter) {
//             clearTimeout(this.inputInter);
//         }
//         this.inputInter = setTimeout(() => {
//             this.onSetDiamondAC.call(count);
//         }, 500);
//     }
//
//     /**设置玩家名字 */
//     private async setPlayerName(playerID: number) {
//         this.mText_UserName.text = await PlayerNameManager.instance.getPlayerName(playerID);
//     }
//
//     private interval: any;
//
//     private curBtnStr: string;
//     /**计时 */
//     private countDown(count: number) {
//         this.clearCountDown();
//         this.mBtn_Ready.enable = false;
//         this.setReadyState(false);
//         this.curBtnStr = this.mBtn_Ready.text;
//         this.mBtn_Ready.text = "";
//         this.mText_Count.text = count.toString();
//         this.interval = TimeUtil.setInterval(() => {
//             count--;
//             this.mText_Count.text = count.toString();
//             if (count <= 0) {
//                 this.mBtn_Ready.enable = true;
//                 this.setReadyState(false);
//                 this.clearCountDown();
//             }
//         }, 1)
//     }
//     /**清除计时 */
//     private clearCountDown() {
//         if (this.interval) {
//             TimeUtil.clearInterval(this.interval);
//             this.interval = null;
//             this.mBtn_Ready.text = this.curBtnStr;
//             this.mText_Count.text = "";
//         }
//     }
//
//     /**设置红点显示 */
//     public setRedPointVis(isShow: boolean) {
//         this.mImage_Red.visibility = isShow ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
//     }
//
//
// }