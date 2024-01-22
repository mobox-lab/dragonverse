// import { SpawnManager } from '../../Modified027Editor/ModifiedSpawn';
// import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
// import { IBagElement } from "../../config/Bag";
// import { GameConfig } from "../../config/GameConfig";
// import { IPropDropElement } from "../../config/PropDrop";
// import { EModule_Events } from "../../const/Enum";
// import { Globaldata } from "../../const/Globaldata";
// import { EventManager } from "../../tool/EventManager";
// import { Notice } from "../../tool/Notice";
// import { util } from "../../tool/Utils";
// import { ERedPointPath } from "../RedPointModule/RedPointModuleC";



// export class DropItem {

//     private bagConfig: IBagElement;
//     private dropDisplayCfg: IPropDropElement;

//     private model: mw.GameObject;

//     public isUse: boolean;

//     private trigger: mw.Trigger;

//     private fromId: number = 0;

//     private pickKey: any = null;

//     private towerEndCfgId: Set<number> = new Set<number>([202, 203]);

//     public async init() {
//         this.trigger = await SpawnManager.modifyPoolAsyncSpawn("Trigger");
//         this.trigger.enabled = (false);
//         this.trigger.onEnter.add(this.onEnter.bind(this));
//         this.trigger.onLeave.add(this.onLeave.bind(this));

//         // EventManager.instance.add(EModule_Events.onMatchStateChange, this.listen_onMatchStateChange.bind(this));
//         EventManager.instance.add(EModule_Events.drop_pickUpFromView, this.listen_pickUpFromView.bind(this));
//     }

//     // /**
//     //  * 监听比赛状态 
//     //  * 处理：最终塔玩家不捡起来自动进入玩家背包
//     //  */
//     // private async listen_onMatchStateChange(state: EMatchState) {

//     //     if (this.isUse == false) {
//     //         return;
//     //     }

//     //     switch (state) {
//     //         case EMatchState.none:
//     //             {
//     //                 let unit: ISceneUnitBase = ModuleService.getModule(SceneUnitModuleC).getSceneUnit(this.fromId);
//     //                 if (unit && unit instanceof SceneUnitModel_Tower) {
//     //                     let team = unit.team;
//     //                     if (team == null) {
//     //                         return;
//     //                     }
//     //                     let cfgID = unit.cfgID;
//     //                     if (cfgID == null) {
//     //                         return;
//     //                     }
//     //                     if (team != EMatchTeam.none && this.towerEndCfgId.has(unit.cfgID)) {
//     //                         this.pickUp();
//     //                     }
//     //                 }
//     //             }
//     //             break;
//     //         case EMatchState.ready:
//     //             {

//     //             }
//     //             break;
//     //         case EMatchState.gaming:
//     //             {

//     //             }
//     //             break;
//     //         case EMatchState.settle:
//     //             {

//     //             }
//     //             break;
//     //         default:
//     //             break;
//     //     }
//     // }

//     private listen_pickUpFromView(triggerGuid: string) {
//         if (triggerGuid != this.trigger.gameObjectId) {
//             return;
//         }


//         this.pickUp();
//     }


//     public async init_start(itemId: number, startLoc: mw.Vector, sceneID: number) {

//         this.fromId = sceneID;


//         this.bagConfig = GameConfig.Bag.getElement(itemId);

//         if (this.bagConfig == null) {
//             Notice.showDownNotice("掉落物道具配置表不存在" + itemId);
//             this.recycle();
//             return;
//         }

//         this.dropDisplayCfg = GameConfig.PropDrop.getElement(this.bagConfig.dropAnimId);
//         this.model = await SpawnManager.modifyPoolAsyncSpawn(this.dropDisplayCfg.dropGuid, GameObjPoolSourceType.Prefab);

//         this.model.parent = (this.trigger);
//         this.trigger.worldTransform.position = startLoc;
//         this.trigger.worldTransform.scale = this.dropDisplayCfg.triggerScale;

//         //
//         Globaldata.tmpVector.x = 0;
//         Globaldata.tmpVector.y = 0;
//         Globaldata.tmpVector.z = 0;
//         this.model.localTransform.position = (Globaldata.tmpVector);
//         this.model.setVisibility(mw.PropertyStatus.On);
//         this.model.setCollision(mw.CollisionStatus.Off, true);
//         this.model.worldTransform.scale = mw.Vector.one;

//         this.trigger.enabled = (false);

//         this.moveDrop(startLoc);

//         if (this.dropDisplayCfg.overTime > 0) {
//             this.pickKey = setTimeout(() => {
//                 this.pickKey = null;
//                 this.recycle();
//             }, this.dropDisplayCfg.overTime * 1000);
//         }
//     }


//     public async moveDrop(startLoc: mw.Vector) {
//         this.isUse = true;

//         let maxZ = startLoc.z + this.dropDisplayCfg.rewardFly;

//         let endLoc = util.getCircleBorderPoint(startLoc, this.dropDisplayCfg.rewardMove);
//         endLoc.z = startLoc.z + this.dropDisplayCfg.rewardOffsetZ;

//         let dis = mw.Vector.distance(startLoc, endLoc);

//         mw.Vector.subtract(endLoc, startLoc, Globaldata.tmpVector);
//         Globaldata.tmpVector.normalize();

//         mw.Vector.multiply(Globaldata.tmpVector, dis, Globaldata.tmpVector);
//         mw.Vector.add(startLoc, Globaldata.tmpVector, Globaldata.tmpVector)

//         let tween1 = new mw.Tween({ x: startLoc.x, y: startLoc.y, z: startLoc.z }).to({
//             x: Globaldata.tmpVector.x, y: Globaldata.tmpVector.y, z: maxZ
//         }, this.dropDisplayCfg.upTime * 1000).onUpdate((data) => {
//             Globaldata.tmpVector.x = data.x;
//             Globaldata.tmpVector.y = data.y;
//             Globaldata.tmpVector.z = data.z;
//             this.trigger.worldTransform.position = Globaldata.tmpVector;
//         }).onComplete(() => {
//             tween2.start();
//         }).easing(TweenUtil.Easing.Cubic.Out);

//         let tween2 = new mw.Tween({ x: Globaldata.tmpVector.x, y: Globaldata.tmpVector.y, z: maxZ }).to({
//             x: endLoc.x, y: endLoc.y, z: endLoc.z
//         }, this.dropDisplayCfg.fallTime * 1000).onUpdate((data) => {
//             Globaldata.tmpVector.x = data.x;
//             Globaldata.tmpVector.y = data.y;
//             Globaldata.tmpVector.z = data.z;
//             this.trigger.worldTransform.position = Globaldata.tmpVector;
//         }).onComplete(() => {
//             this.trigger.enabled = (true);
//         }).easing(TweenUtil.Easing.Cubic.In);

//         tween1.start();
//     }

//     /**拾取物品 */
//     private pickUp() {
//         let str = StringUtil.format(util.getLanguageByKey("Text19"), this.bagConfig.Name);
//         Notice.showDownNotice(str)
//         this.recycle();
//         EventManager.instance.call(EModule_Events.drop_pickUp, this.bagConfig.id, this.fromId);
//         EventManager.instance.call(EModule_Events.changeRedDotNum, ERedPointPath.mPic_Props, 1);
//     }

//     private onEnter(obj: mw.GameObject) {

//         if (!obj || !(PlayerManagerExtesion.isCharacter(obj))) return;
//         let char = obj as mw.Character;
//         if (char.player.playerId != Player.localPlayer.playerId) return;


//         switch (this.dropDisplayCfg.dropType) {
//             case 0:
//                 {
//                     this.pickUp();
//                 }
//                 break;
//             case 1:
//                 {
//                     EventManager.instance.call(EModule_Events.drop_pickUp2View, true, this.bagConfig.id, this.trigger.gameObjectId);
//                 }
//                 break;
//             default:
//                 break;
//         }

//     }

//     private onLeave(obj: mw.GameObject) {
//         if (!obj || !(PlayerManagerExtesion.isCharacter(obj))) return;
//         let char = obj as mw.Character;
//         if (char.player.playerId != Player.localPlayer.playerId) return;

//         switch (this.dropDisplayCfg.dropType) {
//             case 1:
//                 {
//                     EventManager.instance.call(EModule_Events.drop_pickUp2View, false, this.bagConfig.id, this.trigger.gameObjectId);
//                 }
//                 break;
//             default:
//                 break;
//         }

//     }

//     private recycle() {

//         this.clear_pickKey();

//         this.isUse = false;

//         if (this.trigger) {
//             this.trigger.enabled = (false);
//         }

//         if (this.model) {
//             this.model.setVisibility(mw.PropertyStatus.Off);
//             this.model.setCollision(mw.CollisionStatus.Off);
//             GameObjPool.despawn(this.model);
//             this.model = null;
//         }

//     }

//     private clear_pickKey() {
//         if (this.pickKey) {
//             clearTimeout(this.pickKey);
//         }
//         this.pickKey = null;
//     }



// }