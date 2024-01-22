// import { SpawnManager } from '../../Modified027Editor/ModifiedSpawn';
// import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
// import { IBagElement } from "../../config/Bag";
// import { GameConfig } from "../../config/GameConfig";
// import { IPropDropElement } from "../../config/PropDrop";
// import { EModule_Events, EModule_Events_S } from "../../const/Enum";
// import { Globaldata } from "../../const/Globaldata";
// import { EventManager } from "../../tool/EventManager";
// import { util } from "../../tool/Utils";

// @Component
// export default class DropSyncModel extends mw.Script {

//     @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_recycle" })
//     public recycle: boolean = false;
//     @mw.Property({ replicated: true, multicast: true })
//     public randomX: number = 0;
//     @mw.Property({ replicated: true, multicast: true })
//     public randomY: number = 0;
//     @mw.Property({ replicated: true, multicast: true })
//     public randomZ: number = 0;
//     @mw.Property({ replicated: true, multicast: true })
//     /**物品id */
//     public itemId: number = 0;


//     @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_dropItem" })
//     /**丢弃该物品的玩家id */
//     public dropPId: number = 0;

//     /**丢弃的物品数量 */
//     public discardCount: number = 0;

//     /**掉落物模型 */
//     private _client_dropModel: mw.GameObject = null;
//     private _client_trigger: mw.Trigger = null;

//     private _bagCfg: IBagElement = null;
//     private _dropCfg: IPropDropElement = null;


//     protected onStart(): void {

//         if (SystemUtil.isClient()) {
//             this._client_trigger = SpawnManager.modifyPoolSpawn("Trigger", mwext.GameObjPoolSourceType.Asset);
//             this._client_trigger.enabled = (false);
//             this._client_trigger.onEnter.add(this.listen_enter.bind(this));
//             this._client_trigger.onLeave.add(this.listen_leave.bind(this));

//             EventManager.instance.add(EModule_Events.drop_pickUpFromView, this.listen_pickUpFromView.bind(this));
//         }
//     }

//     private listen_pickUpFromView(triggerGuid: string) {
//         if (triggerGuid != this._client_trigger.gameObjectId) {
//             return;
//         }

//         this.pickUp();
//     }

//     private listen_enter(obj: mw.GameObject) {
//         if (PlayerManagerExtesion.isCharacter(obj) == false) {
//             return;
//         }

//         let chara = obj as mw.Character;
//         if (chara.player && chara.player.playerId !=
//             Player.localPlayer.playerId) {
//             return;
//         }

//         if (this._dropCfg == null) return;

//         switch (this._dropCfg.dropType) {
//             case 0:
//                 {
//                     this.pickUp();
//                 }
//                 break;
//             case 1:
//                 {
//                     EventManager.instance.call(EModule_Events.drop_pickUp2View, true, this._bagCfg.id, this._client_trigger.gameObjectId);
//                 }
//                 break;
//             default:
//                 break;
//         }

//     }
//     private listen_leave(obj: mw.GameObject) {
//         if (PlayerManagerExtesion.isCharacter(obj) == false) {
//             return;
//         }

//         let chara = obj as mw.Character;
//         if (chara.player == null) return;
//         if (chara.player.playerId !=
//             Player.localPlayer.playerId) {
//             return;
//         }
//         if (this._dropCfg == null) return;
//         switch (this._dropCfg.dropType) {
//             case 1:
//                 {
//                     EventManager.instance.call(EModule_Events.drop_pickUp2View, false, this._bagCfg.id, this._client_trigger.gameObjectId);
//                 }
//                 break;
//             default:
//                 break;
//         }

//     }


//     /**拾取物品 */
//     private pickUp() {

//         // let str = StringUtil.format(GameConfig.Language.Text19.Value,bagCfg.Name); //"拾取：{0}"
//         // Notice.showDownNotice(str) 

//         // 容错处理
//         this.client_call_recycle();


//         this.server_pickUp(Player.localPlayer.playerId);
//     }


//     private start_autoRecycle() {
//         this._client_trigger.enabled = (true);

//         let bagCfg = GameConfig.Bag.getElement(this.itemId);
//         if (bagCfg == null) {
//             return;
//         }
//         let dropCfg = GameConfig.PropDrop.getElement(bagCfg.DiscardAnimld);
//         if (dropCfg == null) {
//             return;
//         }

//     }


//     /**客户端掉落物品 */
//     private async client_call_dropItem() {

//         // 避免已经被拾取，后进入玩家又会显示
//         if (this.recycle) return;

//         if (this.itemId == 0 || this.dropPId == 0) {
//             return;
//         }


//         this._bagCfg = GameConfig.Bag.getElement(this.itemId);
//         if (this._bagCfg == null) {
//             return;
//         }

//         if (this._bagCfg.DiscardAnimld == 0) {
//             this._bagCfg.DiscardAnimld = 1;
//         }

//         this._dropCfg = GameConfig.PropDrop.getElement(this._bagCfg.DiscardAnimld);
//         if (this._dropCfg == null) {
//             return;
//         }

//         let player = await Player.asyncGetPlayer(this.dropPId);

//         // 检测是否回收了
//         if (this.recycle) {
//             this.check_isRecycle();
//             return;
//         }



//         let playerLoc = player.character.worldTransform.position;


//         this._client_trigger.enabled = (false);
//         this._client_trigger.worldTransform.scale = this._dropCfg.triggerScale;
//         this._client_dropModel = await GameObjPool
//             .asyncSpawn(this._dropCfg.dropGuid, mwext.GameObjPoolSourceType.Prefab);


//         // 检测是否回收了
//         if (this.recycle) {
//             this.check_isRecycle();
//             return;
//         }

//         Globaldata.tmpVector.x = this.randomX;
//         Globaldata.tmpVector.y = this.randomY;
//         Globaldata.tmpVector.z = this.randomZ;

//         //this._client_dropModel.setVisibility(mw.PropertyStatus.On, true);
//         this.foreach_prefab(this._client_dropModel);

//         this._client_dropModel.setCollision(mw.PropertyStatus.Off, true);
//         this._client_dropModel.parent = (this._client_trigger);
//         this._client_dropModel.localTransform.position = (mw.Vector.zero);


//         let maxZ = Globaldata.tmpVector.z + this._dropCfg.rewardFly;

//         let dis = mw.Vector.distance(playerLoc, Globaldata.tmpVector);

//         mw.Vector.subtract(Globaldata.tmpVector, playerLoc, Globaldata.tmpVector1);
//         Globaldata.tmpVector1.normalize();

//         mw.Vector.multiply(Globaldata.tmpVector1, dis / 2, Globaldata.tmpVector1);
//         mw.Vector.add(playerLoc, Globaldata.tmpVector1, Globaldata.tmpVector1)

//         let tween1 = new mw.Tween({ x: playerLoc.x, y: playerLoc.y, z: playerLoc.z }).to({
//             x: Globaldata.tmpVector1.x, y: Globaldata.tmpVector1.y, z: maxZ
//         }, this._dropCfg.upTime * 1000).onUpdate((data) => {
//             Globaldata.tmpVector2.x = data.x;
//             Globaldata.tmpVector2.y = data.y;
//             Globaldata.tmpVector2.z = data.z;
//             this._client_trigger.worldTransform.position = Globaldata.tmpVector2;
//         })
//         let tween2 = new mw.Tween({ x: Globaldata.tmpVector1.x, y: Globaldata.tmpVector1.y, z: maxZ }).to({
//             x: Globaldata.tmpVector.x, y: Globaldata.tmpVector.y, z: Globaldata.tmpVector.z
//         }, this._dropCfg.fallTime * 1000).onUpdate((data) => {
//             Globaldata.tmpVector2.x = data.x;
//             Globaldata.tmpVector2.y = data.y;
//             Globaldata.tmpVector2.z = data.z;
//             this._client_trigger.worldTransform.position = Globaldata.tmpVector2;
//         }).onComplete(() => {

//             // 检测是否回收了
//             if (this.recycle) {
//                 this.check_isRecycle();
//                 return;
//             }

//             this.start_autoRecycle();
//         })

//         tween1.chain(tween2);

//         tween1.start();
//     }

//     private foreach_prefab(prefab: mw.GameObject) {
//         if (prefab.getVisibility() == false) {
//             prefab.setVisibility(mw.PropertyStatus.On);
//         }
//         if (prefab instanceof mw.Effect) {
//             prefab.loop = true;
//             prefab.play();
//         }

//         let childs = prefab.getChildren();
//         for (let index = 0; index < childs.length; index++) {
//             const child = childs[index];
//             this.foreach_prefab(child);
//         }
//     }

//     /**检测是否回收了 */
//     private check_isRecycle() {
//         this.client_call_recycle();
//     }


//     private client_call_recycle() {

//         if (this.recycle == false) return;

//         if (this._client_trigger) {
//             this._client_trigger.enabled = (false);
//         }


//         if (this._client_dropModel == null) {
//             return;
//         }
//         this._client_dropModel.setVisibility(mw.PropertyStatus.Off);
//         this._client_dropModel.parent = null;
//         GameObjPool.despawn(this._client_dropModel);
//         this._client_dropModel = null;
//     }

//     /**---------------------------------------------------------------------------------------- */

//     @RemoteFunction(mw.Server)
//     private server_pickUp(pId: number) {

//         if (this.recycle) {
//             return;
//         }

//         let plaeyr = Player.getPlayer(pId);


//         this.server_recycle();


//         if (plaeyr == null) {
//             return;
//         }

//         EventManager.instance.call(EModule_Events_S.drop_pickUp, pId, this.itemId, this.dropPId, this.discardCount);

//     }



//     private _autoRecycleKey: any = null;

//     /**
//      * 服务器初始化掉落信息
//      * @param itemId 物品id
//      * @param dropPId 从玩家id掉落
//      */
//     public server_init(dropPId: number, itemId: number, count: number) {
//         let player = Player.getPlayer(dropPId);

//         let bagCfg = GameConfig.Bag.getElement(itemId);

//         if (bagCfg.DiscardAnimld == 0) {
//             bagCfg.DiscardAnimld = 1;
//         }
//         let dropCfg = GameConfig.PropDrop.getElement(bagCfg.DiscardAnimld);
//         if (dropCfg == null) {
//             return;
//         }
//         let pLoc = player.character.worldTransform.position;
//         pLoc.z -= player.character.collisionExtent.z;
//         let loc = util.getCircleBorderPoint(pLoc, dropCfg.rewardMove);
//         loc.z = loc.z + dropCfg.rewardOffsetZ;

//         this.randomX = loc.x;
//         this.randomY = loc.y;
//         this.randomZ = loc.z;

//         this.recycle = false;
//         this.itemId = itemId;
//         this.discardCount = count;

//         this.dropPId = dropPId;

//         if (dropCfg.overTime <= 0) return;

//         this._autoRecycleKey = setTimeout(() => {
//             this._autoRecycleKey = null;
//             this.server_recycle();
//         }, dropCfg.overTime * 1000);
//     }

//     private server_recycle() {

//         this.recycle = true;
//         this.dropPId = 0;
//         if (this._autoRecycleKey) {
//             clearTimeout(this._autoRecycleKey);
//         }
//         this._autoRecycleKey = null;

//     }

// }