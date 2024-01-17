import { SpawnManager,SpawnInfo, } from '../../../../Modified027Editor/ModifiedSpawn';
 
// import { BuffData } from "module_buff";
// import { oTrace, oTraceError } from "odin";
 
// import EnumAttributeType = Attribute.EnumAttributeType;
// import { Attribute } from "../../../PlayerModule/sub_attribute/AttributeValueObject";
// import { BuffC_Base } from "../BuffC_Base";
// import { BuffS_Base } from "../BuffS_Base";
// import { PlayerModuleS } from "../../../PlayerModule/PlayerModuleS";
// import { SceneUnitModuleS } from "../../../SceneUnitModule/SceneUnitModuleS";
// import { util } from "../../../../tool/Utils";
// import { EnumDamageType } from "../../../PlayerModule/PlayerModuleData";
// import { ArenasModuleS } from "../../../Arenas/ArenasModuleS";
 
//    
//    
//    
// import SceneUnitModelBase from "../../../SceneUnitModule/model/SceneUnitModelBase";
// import { SecretAreaModuleC } from "../../../SecretArea/SecretAreaModuleC";

// /**
//  * 恢复生命 千珏大招   阿斯克勒庇俄斯之杖
//  * 玩家使用后播放一个motion,motion持续时间内判定区会持续生效，并对判定区内的所有人施加buff buff效果：所有角色不会死亡，包括怪，血量最低为1持续时间结束后，恢复区域内所有角色（包括怪））x%最大生命值血量。
//  */

// // 坐标Tick 方式
// export class RecoveryLifeBuff2C extends BuffC_Base {
 
//     /**秘境模块*/
//     public secretAreaModuleC: SecretAreaModuleC = null;
 
//     /**在恢复区中的玩家  key 玩家id  value:该玩家盾里的玩家ids*/
//     public static InRangePlayer: Map<number, number[]> = new Map<number, number[]>()

//     /**检查间隔*/
//     private checkInterval: number = 1
//     private timer: number = 0

//     /**区域中心*/
//     private centerPos: mw.Vector = null;

//     /**附近的怪 */
//     private unitIds: number[] = []

//     /**辅助显示 */
//     private rangeObj: mw.GameObject = null

    
//     constructor(_id: number, staticConfig: BuffData, arg: any) {
//         oTrace("RecoveryLifeBuffC constructor _id: ", _id, " configId: ", staticConfig.id, arg);
//         super(_id, staticConfig,arg);
//     }

//     public init() {
//         oTrace("RecoveryLifeBuffC init");
//         super.init();
//         this.secretAreaModuleC = ModuleService.getModule(SecretAreaModuleC);
//         this.buff_RecoveryLife(true);
//     }

//     /**
//      * 销毁，清理
//      */
//     public destroy() {
//         oTrace("RecoveryLifeBuffC Destroy");
//         super.destroy();
//         this.buff_RecoveryLife(false)
//     }

//     public onUpdate(dt: number): void {
//         super.onUpdate(dt);
//         this.timer += dt
//         if (this.timer >= this.checkInterval) {
//             this.timer = 0
//             this.updateRangeUnit()
//         }
//     }

//     /**
//       * buff 
//       */
//     private buff_RecoveryLife(isCreated: boolean): void {
 
//         //所有人加buff
//         if (this.hostId > 0) {
//             if (isCreated) {
//                 //自己产生区域 
//                 if (this.castPId == t_pid) {
//                     let player = Player.getPlayer(t_pid);
//                     if (player) {
//                         let playerLocation = player.character.worldTransform.position.clone();
//                         let location = new mw.Vector(playerLocation.x, playerLocation.y, playerLocation.z - player.character.capsuleHalfHeight)
//                         this.creatRange(t_pid, location, true)
//                     }
//                 }
//             } else {
//                 //自己产生区域 
//                 if (this.castPId == t_pid) {
//                     let player = Player.getPlayer(t_pid);
//                     if (player) {
//                         this.creatRange(t_pid, null, false)
//                     }
//                 }
//             }
//         } else {

//         }

//     }

//     /** 
//      * 创建区域
//      * @param hostId
//      * @param location
//      * @param isCreated
//      */
//     private creatRange(hostId: number, location: mw.Vector, isCreated: boolean) {

//         if (isCreated) {
//             this.centerPos = location;
//             //默认附近的怪
//             this.unitIds = this.sceneUnitModuleS.getClampSceneUnit(location, 50 * 100);

//             this.updateRangeUnit();

//         } else {

//             this.updateRangeUnit();
            
//             let host = Player.getPlayer(hostId);
//             if(!host){
//                 oTrace("宿主掉线__________________")
//                 return;
//             }
//             if(!host.character){
//                 oTrace("宿主掉线__________________")
//                 return;
//             }

//             //云顶怪不恢复血
//             let isInArenas = this.arenasModuleS.isPlayerInArenas(hostId);
//             //恢复血量
//             let players: number[] = RecoveryLifeBuffS.InRangePlayer.get(hostId)
//             oTrace("恢复血量————————————————————————", players)
//             if (players) {
//                 for (let index = 0; index < players.length; index++) {
//                     const element = players[index];
//                     if (element > 0) {
//                         let player = Player.getPlayer(element)
//                         if (player) {
//                             let maxhp = this.playerModules.getPlayerAttr(element, EnumAttributeType.maxHp);
//                             let percent = this.param2 / 100; //5/100; 
//                             let value = maxhp * percent;
//                             this.playerModules.addPlayerAttr(element, EnumAttributeType.hp, value)
//                             this.playerModules.dispatchSceneUnitInjure(element, [{ from: hostId, target: element, value: -value, type: EnumDamageType.normal }], [element])
//                         }
//                     } else {
//                         if(!isInArenas){
//                             let unit: SceneUnitModelBase = this.sceneUnitModuleS.getSceneUnitByID(element)
//                             if (unit) {
//                                 let maxhp = this.sceneUnitModuleS.getSceneUnitAttr(element, EnumAttributeType.maxHp);
//                                 let percent = this.param2 / 100;  //5/100;
//                                 let value = maxhp * percent;
//                                 this.sceneUnitModuleS.addSceneUnitAttr(element, EnumAttributeType.hp, value)
//                                 this.playerModules.dispatchSceneUnitInjure(hostId, [{ from: hostId, target: element, value: -value, type: EnumDamageType.normal }], [element])
//                             }
//                         }
//                     }
//                 }
//             }
 
//             if(RecoveryLifeBuffS.InRangePlayer.has(hostId)){
//                 RecoveryLifeBuffS.InRangePlayer.delete(hostId);
//             }
//             this.centerPos = null;
//         }

//         this.showRangeObj(isCreated)
//     }

//     /**
//      * 检查区域玩家
//      */
//     private updateRangeUnit() {

//         if(!this.centerPos){
//             oTrace("检查区域玩家 centerPos 为空")
//             return;
//         }

//         let t_pid = Number(this.hostGuid);

//         let host = Player.getPlayer(t_pid);
//         if(!host){
//             oTrace("宿主掉线__________________")
//             return;
//         }
//         if(!host.character){
//             oTrace("宿主掉线__________________")
//             return;
//         }
        
//         //玩家 
//         let result: number[] = []
//         for (let player of Player.getAllPlayers()) {
//             if(!player||!player.character){
//                 continue
//             }
//             oTrace("检查区域玩家",player.character.worldTransform.position,this.centerPos)
//             if (mw.Vector.squaredDistance(player.character.worldTransform.position, this.centerPos) < Math.pow(this.param1 * 100,2)) {
//                 result.push(player.playerId)
//             }
//         }
//         //怪物 
//         let result2: number[] = [];
//         //result2 = this.sceneUnitModuleS.getClampSceneUnit(this.centerPos, this.param1 * 100);
//         result2 = this.getClampSceneUnit(this.centerPos, this.param1 * 100)
//         result = result.concat(result2)
//         oTrace("RecoveryLifeBuffS___________result", result)

//         RecoveryLifeBuffS.InRangePlayer.set(t_pid, result);

//     }

//     /**
//      * 检查是否在恢复区
//      * @param beHurtPlayerId 被攻击玩家id
//      * @retun  
//      */
//     public static recoveryLifeCheck(beHurtPlayerId: number): boolean {
//         let isIn = false
//         for (const [key, value] of RecoveryLifeBuffS.InRangePlayer) {
//             isIn = value.includes(beHurtPlayerId)
//             if (isIn) {
//                 break;
//             }
//         }
//         oTrace("检查是否在恢复区______________________________________________", beHurtPlayerId, isIn)
//         return isIn
//     }


//      // 获取距离以内范围的怪物
//      private getClampSceneUnit(pos: mw.Vector, clamp: number): number[] {
//         let result: number[] = []
//         for (let unitId of this.unitIds) {
//             let unit = this.sceneUnitModuleS.getSceneUnitByID(unitId)
//             if(unit == null) continue
//             if (unit.getValue(Attribute.EnumAttributeType.hp) <= 0) continue
//             if (unit.modelLocaction == null) continue
//             let dis = mw.Vector.distance(unit.modelLocaction, pos);
//             if (dis <= clamp) {
//                 result.push(unit.sceneId)
//             }
//         }
//         return result
//     }  

//     /**辅助显示显示范围 */
//     private async showRangeObj(isShow: boolean) {
//         if(!SystemUtil.isPIE){
//             return
//         }
//         if(isShow){
//             if (!AssetUtil.assetLoaded("7675")) {
//                 await AssetUtil.asyncDownloadAsset("7675");
//             }
//             this.rangeObj = SpawnManager.spawn({guid:"7675"}) 
//             this.rangeObj.worldTransform.position = this.centerPos;
//             this.rangeObj.worldTransform.scale = new mw.Vector(this.param1,this.param1,0.1)
//         }else{
//             if(this.rangeObj){
//                 this.rangeObj.destroy()
//                 this.rangeObj = null
//             }
//         }

//     }
// }






// export class RecoveryLifeBuff2S extends BuffS_Base {
 
//     constructor(_id: number, staticConfig: BuffData, arg: any) {
//         oTrace("RecoveryLifeBuffS constructor ", _id, staticConfig.id, arg);
//         super(_id, staticConfig,arg);
//     }

//     public init() {
//         oTrace("RecoveryLifeBuffS init");
//         super.init();

//     }

//     /**
//     * 销毁，清理
//     */
//     public destroy() {
//         oTrace("RecoveryLifeBuffS Destroy");
//         super.destroy();
//     }

// }
