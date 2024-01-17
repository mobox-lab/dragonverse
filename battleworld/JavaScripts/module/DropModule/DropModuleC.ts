// import { GameConfig } from "../../config/GameConfig";
// import { EModule_Events } from "../../const/Enum";
// import { EventManager } from "../../tool/EventManager";
// import { PlayerManager } from "../PlayerModule/PlayerManager";
// import { DropItem } from "./DropItem";
// import { DropModuleS } from "./DropModuleS";
// import { PDrop } from "./PDrop";

// export class DropModuleC extends ModuleC<DropModuleS, null>{

//     /**物品拾取UI */
//     private _PDrop: PDrop = null;

//     private dropItemPool: DropItem[] = [];

//     protected onStart(): void {

//         this._PDrop = mw.UIService.create(PDrop);


//         EventManager.instance.add(EModule_Events.drop_discard, this.listen_drop_discard.bind(this));
//         EventManager.instance.add(EModule_Events.drop_pickUp, this.listen_pickUp.bind(this));
//         EventManager.instance.add(EModule_Events.drop_createClientDrop, this.listen_createClientDrop.bind(this));
//     }

//     /**监听单端物品掉落 */
//     private listen_createClientDrop(itemId: number, startLoc: mw.Vector, sceneID: number) {
//         this.create_clientDrop(itemId, startLoc, sceneID);
//     }

//     /**监听拾取 */
//     private listen_pickUp(itemId: number, fromId: number) {
//         this.server.net_pickUpItem(itemId, fromId);
//     }

//     /**双端丢弃物品 */
//     private listen_drop_discard(itemId: number, count: number = 1) {
//         this.discard_item(itemId, count);
//     }

//     /**双端丢弃物品 */
//     public discard_item(itemId: number, count: number) {

//         let bagCfg = GameConfig.Bag.getElement(itemId);


//         switch (bagCfg.DiscardType) {
//             case 0:
//                 {
//                     this.server.net_discard_item(itemId, count);
//                 }
//                 break;
//             case 1:
//                 {
//                     let playerLoc = PlayerManager.instance.getPlayerLoc();

//                     let loc = playerLoc.clone();
//                     loc.z -= this.localPlayer.character.collisionExtent.z;
//                     this.create_clientDrop(itemId, loc, this.localPlayerId);
//                 }
//                 break;
//             default:
//                 break;
//         }


//     }


//     private async getDropItem() {
//         for (let index = 0; index < this.dropItemPool.length; index++) {
//             const element = this.dropItemPool[index];
//             if (element.isUse == false) {
//                 return element;
//             }
//         }

//         let dropItem = new DropItem();

//         await dropItem.init();

//         return dropItem;
//     }

//     /**创建单端掉落物对象 */
//     public async create_clientDrop(itemId: number, startLoc: mw.Vector, sceneID: number) {

//         let dropItem = await this.getDropItem();
//         dropItem.init_start(itemId, startLoc, sceneID);
//     }

// }