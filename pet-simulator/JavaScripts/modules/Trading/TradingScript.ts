// import { GlobalData } from "../../const/GlobalData";
// import MessageBox from "../../util/MessageBox";
// import { numberArrToString, utils } from "../../util/uitls";
// import { AnalyticsTool } from "../Analytics/AnalyticsTool";
// import { PetBagModuleData } from "../PetBag/PetBagModuleData";
// import { P_Msg } from "./P_Msg";
// import { P_Trading } from "./P_Trading";
// import { PlayerNameManager } from "./PlayerNameManager";
// import { GameConfig } from "../../config/GameConfig";
// import { P_HudUI } from "../Hud/P_HudUI";
// import { P_HudPetGift } from "../OnlineModule/P_HudPetGift";
// import { GlobalEnum } from "../../const/Enum";
// import { TradingModuleS } from "./TradingModuleS";
//
//
// export class petInfo {
//     key: number = 0;
//     id: number = 0;
//     attack: number = 0;
//
//     constructor(key: number, id: number, attack: number) {
//         this.key = key;
//         this.id = id;
//         this.attack = attack;
//     }
// }
//
// @Component
// export default class tradingScript extends mw.Script {
//
//     /**拒绝的玩家 */
//     private refusePlayerArr: number[] = [];
//
//     /**当前状态 */
//     private curState: GlobalEnum.TradingState = GlobalEnum.TradingState.CanTrading;
//
//     /**状态改变事件 发送者id */
//     public onStateChangeAC: Action2<number, GlobalEnum.TradingState> = new Action2();
//
//     /**发送者id */
//     @mw.Property({ replicated: true, onChanged: "onSendIdChanged" })
//     private senderID: number = 0;
//
//     /**发送者宠物 */
//     @mw.Property({ replicated: true, onChanged: "onSendPetChanged" })
//     private senderPetStr: string = "";
//     /**接受者宠物 */
//     @mw.Property({ replicated: true, onChanged: "onReceivePetChanged" })
//     private receiverPetStr: string = "";
//
//     /**接受者id 就是自己 */
//     @mw.Property({ replicated: true })
//     private receiverID: number;
//
//     /**发送者宠物 */
//     private sendPetArr: petInfo[] = [];
//     /**接受者宠物 */
//     private receivePetArr: petInfo[] = [];
//
//     /**发送者是否装备 */
//     private sendReady: boolean = false;
//     /**接受者是否装备 */
//     private receiveReady: boolean = false;
//     /**发送者是否确认 */
//     private sendConfirm: boolean = false;
//     /**接受者是否确认 */
//     private receiveConfirm: boolean = false;
//     /**发送者钻石 */
//     private sendDiamond: number = 0;
//     /**接受者钻石 */
//     private receiveDiamond: number = 0;
//
//     public onTradeAC: Action3<string, petInfo[], petInfo[]> = new Action3();
//
//
//
//     //-----------------------------服务器交互---------------------------------
//
//     public get State(): GlobalEnum.TradingState {
//         return this.curState;
//     }
//     public set State(value: GlobalEnum.TradingState) {
//         this.curState = value;
//     }
//
//     /**设置自己id */
//     public setSelfID(playerID: number) {
//         this.receiverID = playerID;
//     }
//
//
//     /**获取与他的状态*/
//     public getByPlayerState(playerID: number): GlobalEnum.TradingState {
//         //判断是否在拒绝列表中
//         let isHas = this.refusePlayerArr.findIndex((playerId) => {
//             return playerId == playerID;
//         })
//         if (isHas != -1) return GlobalEnum.TradingState.Cooling;
//         return this.State;
//     }
//
//     /**脚本入口 */
//     public isCanTrading(playerID: number): boolean {
//         let state = this.getByPlayerState(playerID);
//         if (state == GlobalEnum.TradingState.CanTrading) {
//             this.setSenderID(playerID);
//             return true;
//         } else {
//             return false;
//         }
//     }
//
//     /**设置发起方id，脚本启动点 */
//     private setSenderID(playerID: number) {
//         this.senderID = playerID;
//     }
//
//     /**设置是否接受请求 */
//     @RemoteFunction(mw.Server)
//     private net_setRefusePlayer(senderID: number, isAgree: boolean) {
//         if (!isAgree) {
//             this.agreeState(Player.getPlayer(senderID), false);
//             this.refusePlayerArr.push(senderID);
//             this.clearData();
//             setTimeout(() => {
//                 this.refusePlayerArr.splice(0, 1);
//             }, GlobalData.Trading.refuseTradingTime * 1000)
//         } else {
//             let isCan = ModuleService.getModule(TradingModuleS).isCanTrading(senderID);
//             if (!isCan) {
//                 this.tradingState(Player.getPlayer(this.receiverID));
//                 return;
//             }
//             this.agreeState(Player.getPlayer(senderID), true);
//             this.agreeState(Player.getPlayer(this.receiverID), true);
//             this.curState = GlobalEnum.TradingState.Trading;
//             this.onStateChangeAC.call(senderID, this.curState);
//         }
//     }
//
//
//
//     /**设置宠物 */
//     @RemoteFunction(mw.Server)
//     private net_setPet(playerId: number, key: number) {
//
//         let bagData = DataCenterS.getData(playerId, PetBagModuleData);
//         let data = bagData.bagItemsByKey(key);
//
//         let pet = new petInfo(data.k, data.I, data.p.a);
//
//         //是发送者
//         if (this.senderID == playerId) {
//             //添加到发送者宠物
//
//             this.sendPetArr.push(pet);
//             this.senderPetStr = arrayToString(this.sendPetArr);
//         }
//
//         //是接受者
//         if (this.receiverID == playerId) {
//             //添加到接受者宠物
//
//             this.receivePetArr.push(pet);
//             this.receiverPetStr = arrayToString(this.receivePetArr);
//         }
//         this.receiveReady = false;
//         this.sendReady = false;
//     }
//
//     /**取消选择宠物 */
//     @RemoteFunction(mw.Server)
//     private net_cancelPet(playerId: number, key: number) {
//
//         //是发送者
//         if (this.senderID == playerId) {
//             //从发送者宠物移除
//             this.sendReady = false;
//             this.sendPetArr.splice(this.sendPetArr.findIndex((value) => {
//                 return value.key == key;
//             }), 1);
//             this.senderPetStr = arrayToString(this.sendPetArr);
//         }
//
//         //是接受者
//         if (this.receiverID == playerId) {
//             //从接受者宠物移除
//             this.receiveReady = false;
//             this.receivePetArr.splice(this.receivePetArr.findIndex((value) => {
//                 return value.key == key;
//             }), 1);
//             this.receiverPetStr = arrayToString(this.receivePetArr);
//         }
//
//
//     }
//
//     /**设置钻石数 */
//     @RemoteFunction(mw.Server)
//     private net_setDiamondCount(playerId: number, count: number) {
//         //是发送者
//         if (this.senderID == playerId) {
//             this.sendDiamond = count;
//             this.setDiamond(Player.getPlayer(this.receiverID), count)
//         }
//
//         //是接受者
//         if (this.receiverID == playerId) {
//             this.receiveDiamond = count;
//             this.setDiamond(Player.getPlayer(this.senderID), count)
//         }
//     }
//
//     /**取消交易 */
//     @RemoteFunction(mw.Server)
//     private cancelTradingS(playerId: number) {
//         //是发送者
//
//         if (this.senderID == playerId) {
//             this.cancalTrade(Player.getPlayer(this.receiverID), playerId);
//         } else if (this.receiverID == playerId) {
//             this.cancalTrade(Player.getPlayer(this.senderID), playerId);
//         } else {
//             return;
//         }
//         this.clearData();
//         this.clearFinalCountDown();
//     }
//
//     /**开始交易 */
//     private confirmTrading() {
//         let arr = [this.senderID, this.sendDiamond, this.receiverID, this.receiveDiamond];
//         let str = numberArrToString(arr);
//         this.onTradeAC.call(str, this.sendPetArr, this.receivePetArr);//发送者id,发送者钻石、接受id,接转世、发送宠物、接受宠物
//
//         this.tradeOver(Player.getPlayer(this.receiverID));
//         this.tradeOver(Player.getPlayer(this.senderID))
//         this.clearData();
//
//     }
//
//     /**确认 */
//     @RemoteFunction(mw.Server)
//     private net_confirm(playerId: number, isReady: boolean) {
//         //是发送者
//         if (this.senderID == playerId) {
//             this.sendConfirm = isReady;
//             this.setConfirm(Player.getPlayer(this.receiverID), isReady);
//         } else {
//             this.receiveConfirm = isReady;
//             this.setConfirm(Player.getPlayer(this.senderID), isReady);
//         }
//
//         //都确认了
//         if (this.sendConfirm && this.receiveConfirm) {
//             this.startExchange();
//             this.allConfirm(Player.getPlayer(this.senderID), true);
//             this.allConfirm(Player.getPlayer(this.receiverID), true);
//         }
//         if (!isReady && this.finalCountDown) {
//             this.clearFinalCountDown();
//             this.allConfirm(Player.getPlayer(this.senderID), false);
//             this.allConfirm(Player.getPlayer(this.receiverID), false);
//         }
//     }
//     /**准备 */
//     @RemoteFunction(mw.Server)
//     private net_ready(playerId: number, isReady: boolean) {
//         //是发送者
//         if (this.senderID == playerId) {
//             this.sendReady = isReady;
//             this.setReady(Player.getPlayer(this.receiverID), isReady);
//         } else {
//             this.receiveReady = isReady;
//             this.setReady(Player.getPlayer(this.senderID), isReady);
//         }
//         //都准备了
//         if (this.sendReady && this.receiveReady) {
//             this.allReady(Player.getPlayer(this.senderID));
//             this.allReady(Player.getPlayer(this.receiverID));
//         }
//     }
//
//     private finalCountDown: any;
//     /**开始倒计时交换 */
//     public startExchange() {
//         let count = GlobalData.Trading.finalCountDown;
//         this.finalCountDown = TimeUtil.setInterval(() => {
//             count--;
//             if (count <= 0) {
//                 this.confirmTrading();
//                 this.clearFinalCountDown();
//             }
//         }, 1)
//     }
//     private clearFinalCountDown() {
//         if (this.finalCountDown) {
//             TimeUtil.clearInterval(this.finalCountDown);
//             this.finalCountDown = null;
//         }
//     }
//
//     /**清空本次数据 */
//     private clearData() {
//         if (this.State != GlobalEnum.TradingState.Reject)
//             this.curState = GlobalEnum.TradingState.CanTrading;
//         this.onStateChangeAC.call(this.senderID, GlobalEnum.TradingState.CanTrading);
//         this.senderID = 0;
//         this.senderPetStr = "";
//         this.receiverPetStr = "";
//         this.sendPetArr = [];
//         this.receivePetArr = [];
//         this.sendDiamond = 0;
//         this.receiveDiamond = 0;
//         this.sendConfirm = false;
//         this.receiveConfirm = false;
//         this.sendReady = false;
//         this.receiveReady = false;
//     }
//     /**玩家退出游戏 */
//     public playerQuit(playerId: number): void {
//         if (this.curState == GlobalEnum.TradingState.Trading) {
//             if (playerId == this.senderID) {
//                 this.cancalTrade(Player.getPlayer(this.receiverID), this.senderID);
//                 this.onStateChangeAC.call(this.receiverID, GlobalEnum.TradingState.CanTrading);
//             }
//         }
//     }
//
//
//
//     //-----------------------------客户端接收事件---------------------------------
//
//     /**设置对方确认 */
//     @RemoteFunction(mw.Client)
//     private setConfirm(player: mw.Player, isConfirm: boolean) {
//         if (!this.tradingUI) return;
//         this.tradingUI.setOtherReady(isConfirm, true);
//     }
//     /**设置对方准备 */
//     @RemoteFunction(mw.Client)
//     private setReady(player: mw.Player, isConfirm: boolean) {
//         this.tradingUI.setOtherReady(isConfirm);
//     }
//
//     /**是否同意 */
//     @RemoteFunction(mw.Client)
//     private async agreeState(player: mw.Player, isAgree: boolean) {
//         if (isAgree) {
//             mw.UIService.getUI(P_Msg).clearMsg();
//             this.showTradingUI()
//         } else {
//             //发送者弹出拒绝ui
//             let name = await PlayerNameManager.instance.getPlayerName(this.receiverID);
//             MessageBox.showOneBtnMessage(utils.Format(GameConfig.Language.Text_messagebox_17.Value, name));
//         }
//     }
//     /**正在交易提示 */
//     @RemoteFunction(mw.Client)
//     private tradingState(player: mw.Player) {
//         MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_16.Value);
//     }
//
//     /**发送者 id 改变 */
//     async onSendIdChanged() {
//         if (this.senderID == 0) return;
//
//         //接受者 判断是不是自己
//         if (this.curPlayer && (this.receiverID != this.curPlayer.playerId)) return;
//
//
//         //获取发送者信息 弹出ui
//         let name = await PlayerNameManager.instance.getPlayerName(this.senderID);
//
//         MessageBox.showTwoBtnMessage(utils.Format(GameConfig.Language.Text_messagebox_7.Value, name), (res) => {
//             if (res) {
//                 //同意
//                 this.net_setRefusePlayer(this.senderID, true);
//                 AnalyticsTool.action_sell(0, 1, 0)
//             } else {
//                 //拒绝
//                 this.net_setRefusePlayer(this.senderID, false);
//                 AnalyticsTool.action_sell(0, 2, 0)
//             }
//         });
//
//     }
//
//     /**发送者宠物改变 */
//     onSendPetChanged() {
//         if (!this.curPlayer) return;
//         if (this.curPlayer.playerId == this.senderID) {
//             this.btnState = false;
//         }
//
//         //只有接收者才执行
//         if (this.curPlayer.playerId != this.receiverID) return;
//         if (this.btnState) {
//             let petInfoArr = stringToArray(this.senderPetStr);
//             this.tradingUI.setOtherCanvasItem(petInfoArr);
//             return;
//         }
//         // this.btnState = false;
//         let petInfoArr = stringToArray(this.senderPetStr);
//         this.tradingUI.setOtherCanvasItem(petInfoArr);
//
//         this.tradingUI.setBtnCountDown();
//     }
//
//     /**接受者宠物改变 */
//     onReceivePetChanged() {
//         //只有发送者才执行
//         if (!this.curPlayer) return;
//         if (this.curPlayer.playerId == this.receiverID) {
//             this.btnState = false;
//         }
//         if (this.curPlayer.playerId != this.senderID) return;
//
//
//         if (this.btnState) {
//             let petInfoArr = stringToArray(this.receiverPetStr);
//             this.tradingUI.setOtherCanvasItem(petInfoArr);
//             return;
//         }
//         // this.btnState = false;
//         let petInfoArr = stringToArray(this.receiverPetStr);
//         this.tradingUI.setOtherCanvasItem(petInfoArr);
//         this.tradingUI.setBtnCountDown();
//     }
//     /**取消交易 */
//     @RemoteFunction(mw.Client)
//     private async cancalTrade(player: mw.Player, playerID: number, isClict: boolean = false) {
//         if (!this.tradingUI || !this.tradingUI.visible) return;
//         if (!isClict) {
//             let name = await PlayerNameManager.instance.getPlayerName(playerID);
//             MessageBox.showOneBtnMessage(utils.Format(GameConfig.Language.Text_messagebox_18.Value, name));
//             AnalyticsTool.action_sell(0, 0, 4)
//         }
//         this.btnState = false;
//         if (!this.tradingUI) return
//         this.tradingUI.hide();
//         this.tradingUI.clearData();
//         this.tradingUI.onSelectAC.clear();
//         this.tradingUI.onSetDiamondAC.clear();
//         this.tradingUI.mBtn_Ready.onClicked.clear();
//         this.tradingUI.mBtn_Cancel.onClicked.clear();
//         this.tradingUI.mBtn_Chat.onClicked.clear();
//
//     }
//
//     /**主动取消交易 */
//     public cancalTradeBySelf() {
//         //  this.cancelTradingS(this.curPlayer.playerId);
//         Event.dispatchToServer("Cancel");
//         this.btnState = false;
//         if (!this.tradingUI) return
//         this.tradingUI.hide();
//         this.tradingUI.clearData();
//         this.tradingUI.onSelectAC.clear();
//         this.tradingUI.onSetDiamondAC.clear();
//         this.tradingUI.mBtn_Ready.onClicked.clear();
//         this.tradingUI.mBtn_Cancel.onClicked.clear();
//         this.tradingUI.mBtn_Chat.onClicked.clear();
//     }
//
//     /**设置钻石 */
//     @RemoteFunction(mw.Client)
//     private setDiamond(player: mw.Player, count: number) {
//         this.tradingUI.setDiamondCount(count);
//     }
//
//     /**都准备了 */
//     @RemoteFunction(mw.Client)
//     private allReady(player: mw.Player) {
//
//         this.btnState = false;
//         this.tradingUI.setConfirmUI();
//         this.tradingUI.setReadyState(false);
//         this.tradingUI.setConfirmState(false);
//         this.tradingUI.setOtherReady(false);
//     }
//     /**都确认了 */
//     @RemoteFunction(mw.Client)
//     private allConfirm(player: mw.Player, isConfirm: boolean) {
//
//         this.tradingUI.startExchange(isConfirm);
//     }
//
//     /**交易完成 */
//     @RemoteFunction(mw.Client)
//     private tradeOver(player: mw.Player) {
//         mw.UIService.getUI(P_Msg).clearMsg();
//         MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_8.Value);
//
//         this.cancalTrade(player, 0, true)
//         AnalyticsTool.action_sell(0, 0, 3)
//     }
//
//
//     //-----------------------------客户端交互---------------------------------
//
//
//     private curPlayer: mw.Player;
//     private tradingUI: P_Trading;
//
//     private btnState: boolean = false;
//
//     /**弹出交易ui */
//     private showTradingUI() {
//         MessageBox.hide();
//         this.tradingUI = mw.UIService.getUI(P_Trading);
//         if (this.tradingUI.onSelectAC.includes(this.onClickItem, this) == false) {
//             this.tradingUI.onSelectAC.add(this.onClickItem, this);
//             this.tradingUI.onSetDiamondAC.add(this.setDiamondCount.bind(this));
//             this.tradingUI.mBtn_Ready.onClicked.add(this.onClickReadyBtn.bind(this));
//             this.tradingUI.mBtn_Cancel.onClicked.add(this.onClickCancelBtn.bind(this));
//             this.tradingUI.mBtn_Chat.onClicked.add(() => {
//                 this.tradingUI.addChatEvent();
//                 this.tradingUI.onSendMsgAC.call(this.senderID, this.receiverID);
//             });
//         }
//         if (this.senderID == this.curPlayer.playerId)
//             this.tradingUI.showPanel(this.receiverID);
//         else
//             this.tradingUI.showPanel(this.senderID);
//     }
//
//     /**设置点击了那些ui */
//     public onClickItem(isEquip: boolean, key: number) {
//         if (isEquip) {
//
//             if (this.curPlayer.playerId == this.senderID || this.curPlayer.playerId == this.receiverID) {
//                 this.net_setPet(this.curPlayer.playerId, key);
//             }
//
//         } else {
//             if (this.curPlayer.playerId == this.senderID || this.curPlayer.playerId == this.receiverID) {
//                 this.net_cancelPet(this.curPlayer.playerId, key);
//             }
//
//         }
//         this.net_confirm(this.curPlayer.playerId, false);
//
//     }
//
//     /**点击取消按钮 */
//     private onClickCancelBtn() {
//         if (this.tradingUI.visible) {
//             this.tradingUI.hide();
//             mw.UIService.getUI(P_HudUI).setVis(false);
//             mw.UIService.getUI(P_HudPetGift).hide();
//         }
//         MessageBox.showTwoBtnMessage(GameConfig.Language.Text_messagebox_9.Value, (res) => {
//             if (res) {
//                 //同意
//                 this.cancalTradeBySelf();
//                 AnalyticsTool.action_sell(0, 0, 4)
//                 return;
//             }
//             if (!this.tradingUI.visible) {
//                 this.tradingUI.show();
//             }
//         })
//     }
//     /**点击准备\确认按钮 */
//     private onClickReadyBtn() {
//
//         if (!this.btnState) {
//             let str = "";
//             if (this.tradingUI.curMyArrLen == 0 && this.tradingUI.mInput_Diamond.text == "0") {
//                 str = GameConfig.Language.Text_messagebox_22.Value;
//             } else if (this.tradingUI.curOtherArrLen == 0 && this.tradingUI.mText_ReceiveDM.text == "0") {
//                 str = GameConfig.Language.Text_messagebox_21.Value;
//             } else {
//                 str = GameConfig.Language.Text_messagebox_23.Value;
//             }
//             if (this.tradingUI.visible) {
//                 this.tradingUI.hide();
//                 mw.UIService.getUI(P_HudUI).setVis(false);
//                 mw.UIService.getUI(P_HudPetGift).hide();
//             }
//             MessageBox.showTwoBtnMessage(str, (res) => {
//                 if (res) {
//                     this.btnState = !this.btnState;
//                     this.tradingUI.setItemVis(true);
//                     this.tradingUI.setReadyState(this.btnState);
//                     this.net_confirm(this.curPlayer.playerId, this.btnState);
//                 }
//                 if (!this.tradingUI.visible) {
//                     this.tradingUI.show();
//                 }
//             });
//         } else {
//             this.btnState = !this.btnState;
//             this.tradingUI.setItemVis(false);
//             this.tradingUI.setReadyState(this.btnState);
//             this.net_confirm(this.curPlayer.playerId, this.btnState);
//         }
//         return;
//
//         // this.btnState = !this.btnState;
//         // this.tradingUI.setReadyState(this.btnState);
//         //this.tradingUI.setConfirmState(this.btnState);
//         //  this.net_ready(this.curPlayer.playerId, this.btnState);
//     }
//     /**设置钻石数 */
//     public setDiamondCount(count: number) {
//         this.net_setDiamondCount(this.curPlayer.playerId, count);
//     }
//
//
//
//
//
//
//     //-----------------------------生命周期---------------------------------
//
//     protected onStart(): void {
//
//
//         if (SystemUtil.isClient()) {
//             Player.asyncGetLocalPlayer().then((player) => {
//                 this.curPlayer = player;
//
//             })
//
//         } else {
//             Event.addClientListener("Cancel", (player) => {
//                 this.cancelTradingS(player.playerId);
//             });
//         }
//
//     }
//
// }
//
// /**数组转换为字符串 */
// function arrayToString(array: petInfo[]): string {
//     let str = "";
//     array.forEach(element => {
//         str += element.key + "-" + element.id + "-" + element.attack + ",";
//     });
//     return str;
// }
//
// /**字符串转换为数组 */
// export function stringToArray(str: string): petInfo[] {
//     let array: petInfo[] = [];
//     let strs = str.split(",");
//     strs.forEach(element => {
//         let info = element.split("-");
//         if (info.length != 3) {
//
//         } else
//             array.push(new petInfo(Number(info[0]), Number(info[1]), Number(info[2])));
//     });
//     return array;
// }