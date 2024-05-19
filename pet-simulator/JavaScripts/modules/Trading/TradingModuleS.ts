// import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
// import { GlobalEnum } from "../../const/Enum";
// import { oTraceError } from "../../util/LogManager";
// import { numberArrToString, stringToNumberArr, utils } from "../../util/uitls";
// import { BagTool } from "../PetBag/BagTool";
// import { PetBagModuleS } from "../PetBag/PetBagModuleS";
// import { PlayerModuleS } from "../Player/PlayerModuleS";
// import { Task_ModuleS } from "../Task/Task_ModuleS";
// import { PlayerNameManager } from "./PlayerNameManager";
// import { TradingModuleC } from "./TradingModuleC";
// import { TradingModuleData, tradeRecord } from "./TradingModuleData";
// import tradingScript, { petInfo } from "./TradingScript";
//
// export class TradingModuleS extends ModuleS<TradingModuleC, TradingModuleData>{
//
//     private playerMS: PlayerModuleS;
//     private bagMS: PetBagModuleS;
//
//     /**当前正在交易的玩家脚本 */
//     private tradingPlayerMap: Map<number, tradingScript> = new Map<number, tradingScript>();
//
//     protected onStart(): void {
//         this.playerMS = ModuleService.getModule(PlayerModuleS);
//         this.bagMS = ModuleService.getModule(PetBagModuleS);
//     }
//
//     protected onPlayerEnterGame(player: mw.Player): void {
//         this.createTradingScript(player.playerId);
//         //获取评价
//         //  this.getComment(player, player.userId);
//         this.getPlayerData(player).IsOpen;
//     }
//     protected onPlayerLeft(player: mw.Player): void {
//         try {
//             this.destroyTradingScript(player.playerId);
//             PlayerNameManager.instance.removePlayerName(player.playerId);
//         } catch (error) {
//             oTraceError(error);
//         }
//     }
//     /**玩家进入游戏 存名字 同步 */
//     async net_enterGame(name: string): Promise<void> {
//         PlayerNameManager.instance.addPlayerName(this.currentPlayerId, name);
//
//         let arr = [];
//         let players = Player.getAllPlayers();
//         for (let i = 0; i < players.length; i++) {
//             const element = players[i];
//             let name = await PlayerNameManager.instance.getPlayerName(element.playerId);
//             arr.push({ id: element.playerId, name: name })
//         }
//         if (arr.length == 0) return;
//         this.getAllClient().net_PlayerJoin(JSON.stringify(arr));
//     }
//
//
//
//     /**获取玩家数据 */
//     public async net_getPlayerData(): Promise<string> {
//         let arr = [];
//         let stateID: GlobalEnum.TradingState = GlobalEnum.TradingState.Reject;
//         let curPlayerID = this.currentPlayerId;
//         let players = Player.getAllPlayers();
//
//         for (let i = 0; i < players.length; i++) {
//             const element = players[i];
//             if (element.playerId == curPlayerID) continue;
//
//             if (this.tradingPlayerMap.has(element.playerId)) {
//                 stateID = this.tradingPlayerMap.get(element.playerId).getByPlayerState(curPlayerID);
//                 arr.push({
//                     id: element.playerId, name: await PlayerNameManager.instance.getPlayerName(element.playerId),
//                     state: stateID, petId: BagTool.getStrongestPetId(element.playerId)
//                 });
//             }
//
//         }
//         return JSON.stringify(arr);
//
//     }
//
//     /**发起玩家请求与目标玩家交易
//      * @param tarPlayerId 目标玩家ID
//      */
//     public net_requestTrading(tarPlayerId: number): boolean {
//         return this.isCanTrading(tarPlayerId);
//     }
//
//     /**是否可以交易 */
//     public isCanTrading(tarPlayerId: number): boolean {
//         let player = Player.getPlayer(tarPlayerId);
//
//         let script = this.tradingPlayerMap.get(tarPlayerId);
//
//         if (player) {
//             let isSuccess = script.isCanTrading(this.currentPlayerId);
//             return isSuccess;
//         }
//         return false;
//     }
//
//     /**
//      * 创建交易脚本
//      * @param sender 自己ID
//      */
//     public async createTradingScript(selfID: number) {
//         let script = await mw.Script.spawnScript(tradingScript, true);
//         script.onTradeAC.add(this.tradOver.bind(this));
//         script.onStateChangeAC.add((playerId: number, state: GlobalEnum.TradingState) => {
//             if (this.tradingPlayerMap.has(playerId))
//                 this.tradingPlayerMap.get(playerId).State = state;
//         });
//         script.setSelfID(selfID)
//         this.tradingPlayerMap.set(selfID, script);
//     }
//
//     /**销毁脚本 */
//     public destroyTradingScript(selfID: number) {
//         if (this.tradingPlayerMap.has(selfID)) {
//             let myScript = this.tradingPlayerMap.get(selfID);
//             myScript.playerQuit(selfID);
//             myScript.destroy();
//             this.tradingPlayerMap.delete(selfID);
//         }
//     }
//
//     /**交易结束 */
//     private async tradOver(str: string, sendPetArr: petInfo[], receiverArr: petInfo[]) {
//         let data = stringToNumberArr(str);//发送者id,发送者钻石、接受id,接转世、发送宠物、接受宠物
//         let senderID = data[0];
//         let senderGem = data[1];
//         let receiverID = data[2];
//         let receiveGem = data[3];
//
//         //发送
//         let value = receiveGem - senderGem;
//         this.playerMS.addDiamond(senderID, value);
//
//         let delKeyArr: number[] = [];
//         sendPetArr.forEach((pet) => {
//             delKeyArr.push(pet.key);
//         });
//         //复制数组
//         let receiverArrCopy = receiverArr.concat();
//         this.bagMS.deleteAddPet(senderID, delKeyArr, receiverArrCopy);
//
//         //接受
//         value = senderGem - receiveGem;
//         this.playerMS.addDiamond(receiverID, value);
//
//         delKeyArr.length = 0;
//         receiverArr.forEach((pet) => {
//             delKeyArr.push(pet.key);
//         });
//         this.bagMS.deleteAddPet(receiverID, delKeyArr, sendPetArr);
//
//
//
//         this.addTradingRecord(str, sendPetArr, receiverArr);
//         ModuleService.getModule(Task_ModuleS).trade(Player.getPlayer(senderID));
//         ModuleService.getModule(Task_ModuleS).trade(Player.getPlayer(receiverID));
//         // ModuleService.getModule(PassModuleS).onTaskUpdateAC.call(senderID, GlobalEnum.VipTaskType.PlayerTrading, 1);
//         // ModuleService.getModule(PassModuleS).onTaskUpdateAC.call(receiverID, GlobalEnum.VipTaskType.PlayerTrading, 1);
//     }
//
//     /**设置交易 */
//     public net_setTradeOption(IsOpen: boolean) {
//         this.currentData.setIsOpen(IsOpen);
//         this.tradingPlayerMap.get(this.currentPlayerId).State = IsOpen ? GlobalEnum.TradingState.CanTrading : GlobalEnum.TradingState.Reject;
//     }
//
//     /**添加交易记录 */
//     public async addTradingRecord(str: string, sendPetArr: petInfo[], receiverArr: petInfo[]) {
//         //发送者id,发送者钻石、接受id,接转世、发送宠物、接受宠物
//         let dataArr = stringToNumberArr(str);
//         let senderID = dataArr[0];
//         let receiverID = dataArr[2];
//
//         dataArr[0] = Number(Player.getPlayer(senderID).userId);
//         dataArr[2] = Number(Player.getPlayer(receiverID).userId);
//
//
//         let nameStr = await PlayerNameManager.instance.getPlayerName(senderID) + "," + await PlayerNameManager.instance.getPlayerName(receiverID);
//
//         let data: tradeRecord = { str: "", s: "", r: "", n: "", t: 0, c: "" };
//         data.str = numberArrToString(dataArr);
//         data.s = petInfoToString(sendPetArr);
//         data.r = petInfoToString(receiverArr);
//         data.n = nameStr;
//         data.t = utils.getTodayNumber();
//
//
//         this.getPlayerData(senderID).addTradingRecord(data);
//         this.getPlayerData(receiverID).addTradingRecord(data);
//
//     }
//
//     /**给玩家发送信息 */
//     net_sendMsg(tarPlayerID: number, str: string) {
//         this.getClient(tarPlayerID).net_receiveMsg(this.currentPlayerId, str);
//     }
//
//     /**评价 */
//     net_comment(is: boolean, userId: number, str: string) {
//
//         let data = JSON.parse(str) as tradeRecord;
//         this.currentData.commentOver(data, is);
//
//         let curPlayer: mw.Player = null;
//         let players = Player.getAllPlayers();
//         for (let i = 0; i < players.length; i++) {
//             const element = players[i];
//             if (Number(element.userId) == userId) {
//                 curPlayer = element;
//                 break;
//             }
//         }
//
//         if (curPlayer) {
//             this.getPlayerData(curPlayer).addComment(is);
//         }
//     }
//
// }
//
//
//
// /**数组转换为字符串 */
// function petInfoToString(array: petInfo[]): string {
//     let str = "";
//     array.forEach(element => {
//         str += element.id + "-" + element.attack + ",";
//     });
//     return str;
// }
//
// /**字符串转换为数组 */
// export function stringToPet(str: string): petInfo[] {
//     let array: petInfo[] = [];
//     let strs = str.split(",");
//     strs.forEach(element => {
//         let info = element.split("-");
//         if (info.length != 2) return;
//         array.push(new petInfo(1, Number(info[0]), Number(info[1])));
//     });
//     return array;
// }