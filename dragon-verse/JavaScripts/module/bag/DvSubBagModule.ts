// import {JModuleC, JModuleData, JModuleS} from "../../depend/jibu-module/JModule";
// import Gtk from "gtoolkit";
// import Log4Ts from "mw-log4ts";
// import {Delegate} from "../../depend/delegate/Delegate";
// import SimpleDelegate = Delegate.SimpleDelegate;
//
// //#region GSC Sub Config
// export const DV_SUB_BAG_ITEM_ID_WOOD = 0;
// export const DV_SUB_BAG_ITEM_ID_STONE = 0;
// export const DV_SUB_BAG_ITEM_IDS = [
//     DV_SUB_BAG_ITEM_ID_WOOD,
//     DV_SUB_BAG_ITEM_ID_STONE
// ];
//
// //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
//
// /**
//  * DragonVerse Bag Module.
//  */
// interface IDvBag {
//     itemsMap: object;
// }
//
// class DvBagHelper {
//     /**
//      * 添加物品.
//      * 不会使结果 <0.
//      * @param itemsMap
//      * @param bagId
//      * @param count
//      */
//     public static addItem(itemsMap: object, bagId: number, count: number) {
//         if (!itemsMap[bagId]) {
//             itemsMap[bagId] = 0;
//         }
//         itemsMap[bagId] += count;
//         if (itemsMap[bagId] < 0) {
//             itemsMap[bagId] = 0;
//         }
//     }
//
//     /**
//      * 获取物品数量.
//      * @param {object} itemsMap
//      * @param {number} bagId
//      * @return {number}
//      */
//     public static getItemCount(itemsMap: object, bagId: number): number {
//         return itemsMap[bagId] ?? 0;
//     }
//
//     /**
//      * 是否能够支付.
//      * @param {object} itemsMap
//      * @param {[number, number][]} price
//      * @return {boolean}
//      */
//     public static afford(itemsMap: object, price: [number, number][]) {
//         for (const [id, count] of price) {
//             if (this.getItemCount(itemsMap, id) < count) return false;
//         }
//         return true;
//     }
// }
//
// export default class DvSubBagModuleData extends JModuleData {
//     //@Decorator.persistence()
//     //public isSave: bool;
// }
//
// /**
//  * DvSubBagModule Module.
//  *
//  * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
//  * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
//  * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
//  * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
//  * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
//  * @author LviatYi
//  * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
//  * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
//  */
// export class DvSubBagModuleC extends JModuleC<DvSubBagModuleS, DvSubBagModuleData> {
// //#region Member
//     private _eventListeners: EventListener[] = [];
//
//     private _resources: object;
//
//     public resourceUpdateAction: SimpleDelegate<object> = new SimpleDelegate<object>();
// //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
//
// //#region MetaWorld Event
//     protected onAwake(): void {
//         super.onAwake();
//
// //#region Inner Member init
// //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
//     }
//
//     protected onJStart(): void {
// //#region Member init
// //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
//
// //#region Event Subscribe
//         // this._eventListeners.push(Event.addLocalListener(EventDefine.EVENT_NAME, CALLBACK));
// //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
//     }
//
//     protected onUpdate(dt: number): void {
//         super.onUpdate(dt);
//     }
//
//     protected onEnterScene(sceneType: number): void {
//         super.onEnterScene(sceneType);
//     }
//
//     protected onDestroy(): void {
//         super.onDestroy();
// //#region Event Unsubscribe
//         this._eventListeners.forEach(value => value.disconnect());
// //#endregion ------------------------------------------------------------------------------------------
//     }
//
//     protected onExecute(type: number, ...params: any[]): void {
//         super.onExecute(type, ...params);
//     }
//
// //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
//
// //#region Method
//     public canAfford(price: [number, number][]): boolean {
//         return DvBagHelper.afford(this._resources, price);
//     }
//
// //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
//
// //#region Net Method
//     public net_acceptResourceInfo(resource: object) {
//         this._resources = resource;
//         this.resourceUpdateAction?.invoke(resource);
//     }
//
// //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
// }
//
// export class DvSubBagModuleS extends JModuleS<DvSubBagModuleC, DvSubBagModuleData> {
// //#region Member
//     private _eventListeners: EventListener[] = [];
//
//     private _playerResourceMaps: Map<string, IDvBag | null> = new Map();
// //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
//
// //#region MetaWorld Event
//     protected onAwake(): void {
//         super.onAwake();
//     }
//
//     protected onJStart(): void {
// //#region Member init
// //#endregion ------------------------------------------------------------------------------------------
//
// //#region Event Subscribe
//         // this._eventListeners.push(Event.addLocalListener(EventDefine.EVENT_NAME, CALLBACK));
// //#endregion ------------------------------------------------------------------------------------------
//     }
//
//     protected onUpdate(dt: number): void {
//         super.onUpdate(dt);
//     }
//
//     protected onDestroy(): void {
//         super.onDestroy();
// //#region Event Unsubscribe
//         this._eventListeners.forEach(value => value.disconnect());
// //#endregion ------------------------------------------------------------------------------------------
//     }
//
//     protected onExecute(type: number, ...params: any[]): void {
//         super.onExecute(type, ...params);
//     }
//
//     protected onPlayerJoined(player: Player): void {
//         super.onPlayerJoined(player);
//     }
//
//     protected onPlayerEnterGame(player: Player): void {
//         super.onPlayerEnterGame(player);
//         this.initPlayerDvBagData(player.userId).then(
//
//         );
//     }
//
//     protected onPlayerLeft(player: Player): void {
//         super.onPlayerLeft(player);
//         this.clearPlayerDvBagData(player.userId);
//     }
//
// //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
//
// //#region Method
//     private async initPlayerDvBagData(userId: string): Promise<void> {
//         Log4Ts.log(DvSubBagModuleS, `try query player dv bag data. userId: ${userId}.`);
//         const dataStr = await Gtk.querySceneGameModuleData("BagModuleData", userId, null);
//         if (Gtk.isNullOrEmpty(dataStr)) {
//             this._playerResourceMaps.set(userId, null);
//             Log4Ts.error(DvSubBagModuleS, `couldn't query player dv bag data. userId: ${userId}.`);
//         } else {
//             this._playerResourceMaps.set(userId, JSON.parse(dataStr) as IDvBag);
//             Log4Ts.log(DvSubBagModuleS, `query player dv bag data success. userId: ${userId}. data: ${dataStr}.`);
//         }
//         return;
//     }
//
//     /**
//      * 获取玩家背包数据 是否有效.
//      * @param {string} userId
//      * @return {boolean}
//      * @private
//      */
//     private isPlayerDvBagDataValid(userId: string): boolean {
//         return !Gtk.isNullOrUndefined(this._playerResourceMaps.get(userId));
//     }
//
//     /**
//      * 更新玩家背包数据.
//      * @param {string} userId
//      * @return {Promise<boolean>}
//      * @private
//      */
//     private async updatePlayerDvBagData(userId: string): Promise<boolean> {
//         Log4Ts.log(DvSubBagModuleS, `try update player dv bag data. userId: ${userId}.`);
//         const result = await Gtk.updateSceneGameModuleData("BagModuleData", userId, JSON.stringify({itemsMap: this._playerResourceMaps.get(userId)}));
//         Log4Ts.log(DvSubBagModuleS, `update player dv bag data ${result ? "success" : "failed."}. userId: ${userId}.`);
//         return result;
//     }
//
//     /**
//      * 清除玩家背包数据.
//      * @param {string} userId
//      * @private
//      */
//     private clearPlayerDvBagData(userId: string) {
//         this._playerResourceMaps.delete(userId);
//     }
//
//     /**
//      * 将数据同步到客户端.
//      * @param {number} playerId
//      * @private
//      */
//     private syncResourceToClient(playerId: number) {
//         const userId = Player.getPlayer(playerId)?.userId;
//         if (Gtk.isNullOrEmpty(userId)) return;
//         const resourceObj = {};
//         const data = this._playerResourceMaps.get(userId);
//         if (Gtk.isNullOrUndefined(data?.itemsMap ?? null)) return;
//         Object
//             .keys(data.itemsMap)
//             .forEach((key) => {
//                 if (DV_SUB_BAG_ITEM_IDS.includes(parseInt(key))) resourceObj[key] = this._playerResourceMaps.get(userId).itemsMap[key];
//             });
//
//         this.getClient(playerId)?.net_acceptResourceInfo(resourceObj);
//     }
//
//     /**
//      * 支付.
//      * @param {number} playerId
//      * @param {[number, number][]} price
//      * @return {boolean}
//      * @private
//      */
//     public paid(playerId: number, price: [number, number][]): boolean {
//         const userId = Player.getPlayer(playerId)?.userId;
//         if (Gtk.isNullOrEmpty(userId) ||
//             !this.isPlayerDvBagDataValid(userId)) return false;
//         const bag = this._playerResourceMaps.get(userId);
//         if (!DvBagHelper.afford(bag, price)) return false;
//         for (const [id, count] of price) DvBagHelper.addItem(bag, id, -count);
//         this.updatePlayerDvBagData(userId);
//         return true;
//     }
//
// //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
//
// //#region Net Method
// //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
// }