import { SpawnManager } from '../../../../Modified027Editor/ModifiedSpawn';
import { BuffData } from "module_buff";
import { oTrace, oTraceError } from "odin";
import EnumAttributeType = Attribute.EnumAttributeType;
import { Attribute } from "../../../PlayerModule/sub_attribute/AttributeValueObject";
import { BuffC_Base } from "../BuffC_Base";
import { BuffS_Base } from "../BuffS_Base";
import { PlayerModuleS } from "../../../PlayerModule/PlayerModuleS";
// import { SceneUnitModuleS } from "../../../SceneUnitModule/SceneUnitModuleS";
import { EnumDamageType } from "../../../PlayerModule/PlayerModuleData";
// import { ArenasModuleS } from "../../../Arenas/ArenasModuleS";
// import SceneUnitModelBase from "../../../SceneUnitModule/model/SceneUnitModelBase";
// import { ArenasWorld2ModuleS } from "../../../ArenasWrold2/ArenasWorld2ModuleS";
import { EWorldType, GlobalWorld } from "../../../../const/GlobalWorld";

/**
 * 恢复生命 千珏大招   阿斯克勒庇俄斯之杖
 * 玩家使用后播放一个motion,motion持续时间内判定区会持续生效，并对判定区内的所有人施加buff buff效果：所有角色不会死亡，包括怪，血量最低为1持续时间结束后，恢复区域内所有角色（包括怪））x%最大生命值血量。
 */

// 坐标Tick 方式
export class RecoveryLifeBuffC extends BuffC_Base {

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("RecoveryLifeBuffC constructor _id: ", _id, " configId: ", staticConfig.id, arg);
        super(_id, staticConfig,arg);
    }

    public init() {
        //oTrace("RecoveryLifeBuffC init");
        super.init();
        this.buff_RecoveryLife(true)
    }

    /**
     * 销毁，清理
     */
    public destroy() {
        //oTrace("RecoveryLifeBuffC Destroy");
        super.destroy();
        this.buff_RecoveryLife(false)
    }

    /**
      * buff 
      */
    private buff_RecoveryLife(isCreated: boolean): void {
        //oTrace("RecoveryLifeBuffC:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
        if (isCreated) {
        } else {
        }
    }
}

export class RecoveryLifeBuffS extends BuffS_Base {


    /**玩家模块*/
    public playerModules: PlayerModuleS = null;
    /**怪模块*/
    // public sceneUnitModuleS: SceneUnitModuleS = null;
    /**云顶模块*/
    // public arenasModuleS: ArenasModuleS = null;
    /**云顶模块*/
    // public arenasWorld2ModuleS: ArenasWorld2ModuleS = null;


    /**在恢复区中的玩家  key 玩家id  value:该玩家盾里的玩家ids*/
    public static InRangePlayer: Map<number, number[]> = new Map<number, number[]>()

    /**检查间隔*/
    private checkInterval: number = 1
    private timer: number = 0

    /**区域中心*/
    private centerPos: mw.Vector = null;

    /**附近的怪 */
    private unitIds: number[] = []

    /**辅助显示 */
    private rangeObj: mw.GameObject = null

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("RecoveryLifeBuffS constructor ", _id, staticConfig.id, arg);
        super(_id, staticConfig,arg);
    }

    public init() {
        //oTrace("RecoveryLifeBuffS init");
        super.init();
        this.playerModules = ModuleService.getModule(PlayerModuleS);
        // this.sceneUnitModuleS = ModuleService.getModule(SceneUnitModuleS);
        // this.arenasModuleS = ModuleService.getModule(ArenasModuleS);
        // this.arenasWorld2ModuleS = ModuleService.getModule(ArenasWorld2ModuleS);
        this.buff_RecoveryLife(true);
    }

    /**
    * 销毁，清理
    */
    public destroy() {
        //oTrace("RecoveryLifeBuffS Destroy");
        super.destroy();
        this.buff_RecoveryLife(false);
    }

    public onUpdate(dt: number): void {
        super.onUpdate(dt);
        this.timer += dt
        if (this.timer >= this.checkInterval) {
            this.timer = 0
            this.updateRangeUnit()
        }
    }

    /**
      * buff 
      */
    private buff_RecoveryLife(isCreated: boolean): void {

        //oTrace("RecoveryLifeBuffS:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
        if (this.hostGuid == null) {
            oTraceError("error:RecoveryLifeBuffS uff.hostGuid == null ", this.hostGuid);
            return;
        }

        let t_pid = Number(this.hostGuid);
        if (isNaN(t_pid)) {
            oTraceError("error:RecoveryLifeBuffS sNaN(t_pid) ", this.hostGuid);
            return;
        }

        //所有人加buff
        if (t_pid > 0) {
            if (isCreated) {
                //自己产生区域 
                if (this.castPId == t_pid) {
                    let player = Player.getPlayer(t_pid);
                    if (player) {
                        let playerLocation = player.character.worldTransform.position.clone();
                        let location = new mw.Vector(playerLocation.x, playerLocation.y, playerLocation.z - player.character.collisionExtent.z)
                        this.creatRange(t_pid, location, true)
                    }
                }
            } else {
                //自己产生区域 
                if (this.castPId == t_pid) {
                    let player = Player.getPlayer(t_pid);
                    if (player) {
                        this.creatRange(t_pid, null, false)
                    }
                }
            }
        } else {

        }

    }

    /** 
     * 创建区域
     * @param hostId
     * @param location
     * @param isCreated
     */
    private creatRange(hostId: number, location: mw.Vector, isCreated: boolean) {

        if (isCreated) {
            this.centerPos = location;
            //默认附近的怪
            // this.unitIds = this.sceneUnitModuleS.getClampSceneUnit(location, 50 * 100);

            this.updateRangeUnit();

        } else {

            this.updateRangeUnit();
            
            let host = Player.getPlayer(hostId);
            if(!host){
                oTrace("宿主掉线__________________")
                return;
            }
            if(!host.character){
                oTrace("宿主掉线__________________")
                return;
            }

            // //云顶怪不恢复血
            // let isInArenas = false;
            // if(GlobalWorld.worldType == EWorldType.world1){
            //     isInArenas = this.arenasModuleS.isPlayerInArenas(hostId);
            // }
            // if(GlobalWorld.worldType == EWorldType.world2){
            //     isInArenas = this.arenasWorld2ModuleS.isPlayerInArenas(hostId);
            // }
       
            //恢复血量
            let players: number[] = RecoveryLifeBuffS.InRangePlayer.get(hostId)
            //oTrace("恢复血量————————————————————————", players)
            if (players) {
                for (let index = 0; index < players.length; index++) {
                    const element = players[index];
                    if (element > 0) {
                        let player = Player.getPlayer(element)
                        if (player) {
                            let maxhp = this.playerModules.getPlayerAttr(element, EnumAttributeType.maxHp);
                            let percent = this.param2 / 100; //5/100; 
                            let value = maxhp * percent;
                            this.playerModules.addPlayerAttr(element, EnumAttributeType.hp, value)
                            this.playerModules.dispatchSceneUnitInjure(element, [{ from: hostId, target: element, value: -value, type: EnumDamageType.normal }], [element])
                        }
                    } else {
                        // if(!isInArenas){
                        //     let unit: SceneUnitModelBase = this.sceneUnitModuleS.getSceneUnitByID(element)
                        //     if (unit) {
                        //         let maxhp = this.sceneUnitModuleS.getSceneUnitAttr(element, EnumAttributeType.maxHp);
                        //         let percent = this.param2 / 100;  //5/100;
                        //         let value = maxhp * percent;
                        //         this.sceneUnitModuleS.addSceneUnitAttr(element, EnumAttributeType.hp, value)
                        //         this.playerModules.dispatchSceneUnitInjure(hostId, [{ from: hostId, target: element, value: -value, type: EnumDamageType.normal }], [element])
                        //     }
                        // }
                    }
                }
            }
 
            if(RecoveryLifeBuffS.InRangePlayer.has(hostId)){
                RecoveryLifeBuffS.InRangePlayer.delete(hostId);
            }
            this.centerPos = null;
        }

        this.showRangeObj(isCreated)
    }

    /**
     * 检查区域玩家
     */
    private updateRangeUnit() {

        if(!this.centerPos){
            oTrace("检查区域玩家 centerPos 为空")
            return;
        }

        let t_pid = Number(this.hostGuid);

        let host = Player.getPlayer(t_pid);
        if(!host){
            oTrace("宿主掉线__________________")
            return;
        }
        if(!host.character){
            oTrace("宿主掉线__________________")
            return;
        }
        
        //玩家 
        let result: number[] = []
        for (let player of Player.getAllPlayers()) {
            if(!player||!player.character){
                continue
            }
            //oTrace("检查区域玩家",player.character.worldTransform.position,this.centerPos)
            if (mw.Vector.squaredDistance(player.character.worldTransform.position, this.centerPos) < Math.pow(this.param1 * 100,2)) {
                result.push(player.playerId)
            }
        }
        // //怪物 
        // let result2: number[] = [];
        // //result2 = this.sceneUnitModuleS.getClampSceneUnit(this.centerPos, this.param1 * 100);
        // result2 = this.getClampSceneUnit(this.centerPos, this.param1 * 100)
        // result = result.concat(result2)
        // //oTrace("RecoveryLifeBuffS___________result", result)

        RecoveryLifeBuffS.InRangePlayer.set(t_pid, result);

    }

    /**
     * 检查是否在恢复区
     * @param beHurtPlayerId 被攻击玩家id
     * @retun  
     */
    public static recoveryLifeCheck(beHurtPlayerId: number): boolean {
        let isIn = false
        for (const [key, value] of RecoveryLifeBuffS.InRangePlayer) {
            isIn = value.includes(beHurtPlayerId)
            if (isIn) {
                break;
            }
        }
        //oTrace("检查是否在恢复区______________________________________________", beHurtPlayerId, isIn)
        return isIn
    }


    //  // 获取距离以内范围的怪物
    //  private getClampSceneUnit(pos: mw.Vector, clamp: number): number[] {
    //     let result: number[] = []
    //     for (let unitId of this.unitIds) {
    //         let unit = this.sceneUnitModuleS.getSceneUnitByID(unitId)
    //         if(unit == null) continue
    //         if (unit.getValue(Attribute.EnumAttributeType.hp) <= 0) continue
    //         if (unit.modelLocaction == null) continue
    //         let dis = mw.Vector.distance(unit.modelLocaction, pos);
    //         if (dis <= clamp) {
    //             result.push(unit.sceneId)
    //         }
    //     }
    //     return result
    // }  

    /**辅助显示显示范围 */
    private async showRangeObj(isShow: boolean) {
        if(!SystemUtil.isPIE){
            return
        }
        if(isShow){
            if (!AssetUtil.assetLoaded("7675")) {
                await AssetUtil.asyncDownloadAsset("7675");
            }
            this.rangeObj = SpawnManager.spawn({guid:"7675"}) 
            this.rangeObj.worldTransform.position = this.centerPos;
            this.rangeObj.worldTransform.scale = new mw.Vector(this.param1,this.param1,0.1)
        }else{
            if(this.rangeObj){
                this.rangeObj.destroy()
                this.rangeObj = null
            }
        }

    }

}


 

// // 客户端触发器方式 todo (等NPC 改为服务端后)
// export class RecoveryLifeBuffC extends BuffC {

//     /**在恢复区中的玩家  key 玩家id  value:该玩家盾里的玩家ids*/
//     public static InRangePlayer: Map<number, number[]> = new Map<number, number[]>()
//     //球形触发器
//     private trigger: mw.Trigger = null;
//     /**宿主id*/
//     private hostId: number = null
//     /**玩家模块*/
//     private playerModuleC: PlayerModuleC = null;

//     constructor(_id: number, staticConfig: BuffData, arg: any) {
//         oTrace("ExampleBuffC constructor _id: ", _id, " configId: ", staticConfig.id, arg);
//         super(_id, staticConfig);

//         let pid = Number(arg[0]);
//         if (isNaN(pid) == false) {
//             this.hostId = pid;
//         } else {
//             oTraceError("AttributeBuffS isNaN(pid) ", arg);
//         }
 
//     }

//     public init() {
//         oTrace("RecoveryLifeBuffC init");
//         this.playerModuleC = ModuleService.getModule(PlayerModuleC);
//         super.init();
//         this.buff_RecoveryLife(true)
//     }

//     /**
//      * 销毁，清理
//      */
//     public destroy() {
//         oTrace("RecoveryLifeBuffC Destroy");
//         super.destroy();
//         this.buff_RecoveryLife(false)
//     }

//     /**
//       * buff 
//       */
//     private buff_RecoveryLife(isCreated: boolean): void {
//         oTrace("RecoveryLifeBuffC:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
//         if (isCreated) {
//             if (Number(this.hostId) > 0) {

//                 let player = Player.getPlayer(Number(this.hostId));
//                 let location = player.character.worldTransform.position.clone().subtract(new mw.Vector(0, 0, player.character.capsuleHalfHeight));

//                 //球形触发器
//                 this.trigger = SpawnManager.modifyPoolSpawn("113") as mw.Trigger;
//                 this.trigger.worldTransform.position = (location)
//                 this.trigger.localTransform.rotation = (mw.Rotation.zero);
//                 this.trigger.worldTransform.scale = new mw.Vector(this.param1, this.param1, this.param1)
//                 if (this.trigger.shape == TriggerShapeType.Box == true) {
//                     this.trigger.toggleTriggerShape();
//                 }
//                 this.trigger.onEnter.add((obj: mw.GameObject) => {
//                     // oTrace("onEnter__________________")
//                     let addplayer = (id: number) => {
//                         if (RecoveryLifeBuffC.InRangePlayer.has(Number(this.hostId))) {
//                             let rangePlayer = RecoveryLifeBuffC.InRangePlayer.get(Number(this.hostId))
//                             if(rangePlayer.includes(id) == false){
//                                 rangePlayer.push(id)
//                             }
//                             RecoveryLifeBuffC.InRangePlayer.set(Number(this.hostId), rangePlayer)
//                         }else{
//                             let rangePlayer = []
//                             rangePlayer.push(id)
//                             RecoveryLifeBuffC.InRangePlayer.set(Number(this.hostId), rangePlayer)
//                         }
//                     }
//                     if ((obj instanceof mw.Pawn) == false) {
//                         return;
//                     }

//                     if ((PlayerManagerExtesion.isCharacter(obj))) {
//                         let id = obj.player.playerId
//                         oTrace("onEnter__________________Player",id)
//                         addplayer(id);
//                     }

//                     if (PlayerManagerExtesion.isNpc(obj)) {
//                         let unit = ModuleService.getModule(SceneUnitModuleC).getSceneUnitByGuid(obj.guid);
//                         if (unit) {
//                             addplayer(unit.sceneID);
//                             oTrace("onEnter__________________NPC",unit.sceneID)
//                         }
//                     }

//                 })

//                 this.trigger.onLeave.add((obj: mw.GameObject) => {
//                     // oTrace("onLeave__________________")
//                     let romveplayer = (id: number) => {
//                         if (RecoveryLifeBuffC.InRangePlayer.has(Number(this.hostId))) {
//                             let rangePlayer = RecoveryLifeBuffC.InRangePlayer.get(Number(this.hostId))
//                             let index = rangePlayer.indexOf(id)
//                             if(index!= -1){
//                                 rangePlayer.splice(index, 1)
//                             }
//                             RecoveryLifeBuffC.InRangePlayer.set(Number(this.hostId), rangePlayer)
//                         }
//                     }

//                     if ((obj instanceof mw.Pawn) == false) {
//                         return;
//                     }

//                     if ((PlayerManagerExtesion.isCharacter(obj))) {
//                         let id = obj.player.playerId
//                         oTrace("onLeave__________________Player",id)
//                         romveplayer(id)
//                     }

//                     if (PlayerManagerExtesion.isNpc(obj)) {
//                         let unit = ModuleService.getModule(SceneUnitModuleC).getSceneUnitByGuid(obj.guid);
//                         if (unit) {
//                             oTrace("onLeave__________________NPC",unit.sceneID)
//                             romveplayer(unit.sceneID)
//                         }
//                     }
//                 })

//             } else {

//             }
//         } else {
//             if (Number(this.hostId) > 0) {
//                 //恢复血量
//                 if(Number(this.hostId) == Player.localPlayer.playerId){
//                     let players: number[] = RecoveryLifeBuffC.InRangePlayer.get(Number(this.hostId))
//                     oTrace("恢复血量————————————————————————", players)
//                     if(players&& players.length>0){
//                         ModuleService.getModule(BuffModuleC).addscenceUintOrPlayerHp(players,this.param2);
//                     }
//                 }

//                 mwext.GameObjPool.despawn(this.trigger)
//                 this.trigger = null
 
//             } else {

//             }
//         }
//     }


// }

// export class RecoveryLifeBuffS extends BuffS {

//     /** 释放者的guid，SkillBaseActor.guid/GameObject.guid , 如果不存在表示该buff位于世界位置上 */
//     private _castPId: number = 0;
//     /**buff释放者 pid */
//     public get castPId(): number {
//         return this._castPId;
//     }
 
//     constructor(_id: number, staticConfig: BuffData, arg: any) {
//         oTrace("RecoveryLifeBuffS constructor ", _id, staticConfig.id, arg);

//         super(_id, staticConfig);

//         let pid = Number(arg); //[0]
//         if (isNaN(pid) == false) {
//             this._castPId = pid;
//         } else {
//             oTraceError("RecoveryLifeBuffS isNaN(pid) ", arg);
//         }
 
//     }

//     public init() {
//         oTrace("RecoveryLifeBuffS init");
//         super.init();
 
//         this.buff_RecoveryLife(true);
//     }

//     /**
//     * 销毁，清理
//     */
//     public destroy() {
//         oTrace("RecoveryLifeBuffS Destroy");
//         super.destroy();
//         this.buff_RecoveryLife(false);
//     }

//     public onUpdate(dt: number): void {
//         super.onUpdate(dt);
//     }

//     /**
//       * buff 
//       */
//     private buff_RecoveryLife(isCreated: boolean): void {

//         oTrace("RecoveryLifeBuffS:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
//         if (this.hostGuid == null) {
//             oTraceError("error:RecoveryLifeBuffS uff.hostGuid == null ", this.hostGuid);
//             return;
//         }

//         let t_pid = Number(this.hostGuid);
//         if (isNaN(t_pid)) {
//             oTraceError("error:RecoveryLifeBuffS sNaN(t_pid) ", this.hostGuid);
//             return;
//         }
//     }
 
// }
