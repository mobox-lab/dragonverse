// import { EModule_Events_S } from "../../const/Enum";
// import { EventManager } from "../../tool/EventManager";
// import DropSyncModel from "./DropSyncModel";
// import { DropModuleC } from "./DropModuleC";









// /**掉落记录 */
// interface IDropRecord {
//     itemId: number,
//     time: number,
// }

// export class DropModuleS extends ModuleS<DropModuleC, null>{

//     private _dropSyncModelPool: DropSyncModel[] = [];

//     private _dropRecordMap: Map<number, IDropRecord> = new Map();

//     protected onStart(): void {
//         // 5分钟检测一次 销毁掉落物脚本对象
//         //TimeUtil.setInterval(this.check_destroyDrop.bind(this), 5 * 60);
//     }

//     protected onPlayerLeft(player: mw.Player): void {
//         let pId = player.playerId;
//         if (this._dropRecordMap.has(pId) == false) {
//             return;
//         }

//         this._dropRecordMap.delete(pId);
//     }

//     /**周期性检测掉落物对象销毁 */
//     private check_destroyDrop() {
//         // 获取当前房间玩家数量，最多缓存玩家数量*2个掉落物对象
//         let players = Player.getAllPlayers();
//         if (this._dropSyncModelPool.length > players.length * 2) {

//         }

//     }


//     /**拾取物品 */
//     public net_pickUpItem(itemId: number, fromId: number) {
//         EventManager.instance.call(EModule_Events_S.drop_pickUp, this.currentPlayerId, itemId, fromId);
//     }

//     /**丢弃物品 */
//     public net_discard_item(itemId: number, count: number = 1) {

//         if (this._dropRecordMap.has(this.currentPlayerId) == false) {
//             let data: IDropRecord = {
//                 itemId: itemId,
//                 time: Date.now()
//             }
//             this._dropRecordMap.set(this.currentPlayerId, data);
//         } else {
//             let data = this._dropRecordMap.get(this.currentPlayerId);

//             let time = Date.now() - data.time;

//             // 避免玩家卡bug
//             if (time < 100) {
//                 return;
//             }

//             data.itemId = itemId;
//             data.time = Date.now();
//         }


//         EventManager.instance.call(EModule_Events_S.bag_subItem, this.currentPlayerId, itemId, count);
//         this.discard_item(this.currentPlayerId, itemId, count);
//     }


//     /**
//      * 丢弃服务器双端物品
//      * @param pId 玩家id
//      * @param itemId 物品id
//      * @param count 数量
//      */
//     public async discard_item(pId: number, itemId: number, count: number) {

//         let dropModel: DropSyncModel = null;

//         for (let index = 0; index < this._dropSyncModelPool.length; index++) {
//             const model = this._dropSyncModelPool[index];
//             if (model.recycle) {
//                 dropModel = model;
//                 break;
//             }
//         }

//         if (dropModel == null) {
//             dropModel = await mw.Script.spawnScript(DropSyncModel, true);
//             this._dropSyncModelPool.push(dropModel);
//         }
//         dropModel.server_init(pId, itemId, count);
//     }

// }