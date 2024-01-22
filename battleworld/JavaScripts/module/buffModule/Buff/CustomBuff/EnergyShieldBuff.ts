import { SpawnManager } from '../../../../Modified027Editor/ModifiedSpawn';
import { BuffData } from "module_buff";
import { oTraceError } from "odin";
import { EPlayerState } from "../../../PlayerModule/FSM/PlyerState";
import { BuffC_Base } from "../BuffC_Base";
import { BuffS_Base } from "../BuffS_Base";
// import { SceneUnitModuleS } from "../../../SceneUnitModule/SceneUnitModuleS";
// import SceneUnitModelBase from "../../../SceneUnitModule/model/SceneUnitModelBase";

/**
 * 能量罩 BUFF  雅典娜圣盾 
 * 玩家使用后以玩家为中心生成一个护盾特效，使所有攻击判定均无法通过护盾，即护盾外的打不到护盾里的，护盾里的打不到护盾外的。护盾存在时玩家无法移动和进行其他操作，再次点击道具可收回护盾。
 */
export class EnergyShieldC extends BuffC_Base {

    /**球形触发检测物体Tag*/
    public static EnergyShieldTag: string = "EnergyShieldTag"

    //球形触发检测物体
    private triggerObj: mw.GameObject = null;

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("ExampleBuffC constructor _id: ", _id, " configId: ", staticConfig.id, arg);
        super(_id, staticConfig, arg);
    }

    public init() {
        //oTrace("ExampleBuffC init");
        super.init();
        this.buff_Energy(true)
    }

    /**
     * 销毁，清理
     */
    public destroy() {
        //oTrace("ExampleBuffC Destroy");
        super.destroy();
        this.buff_Energy(false)
    }

    /**
      * buff_Energy
      */
    private async buff_Energy(isCreated: boolean) {
        //oTrace("buff_center:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
        if (isCreated) {
            if (this.hostId > 0) {

                if (this.hostId == Player.localPlayer.playerId) {
                    this.playerModuleC.changeState(EPlayerState.EnergyShield)
                }

                let player = Player.getPlayer(this.hostId);
                if (player) {
                    // let location = player.character.worldTransform.position.clone().subtract(new mw.Vector(0, 0, player.character.capsuleHalfHeight));
                    //球壳物体处理子弹攻击   7675封闭半球    7725圆桶子  安全帽44290   伞 43599
                    let guid = this.param3.toString();
                    if (!AssetUtil.assetLoaded(guid)) {
                        await AssetUtil.asyncDownloadAsset(guid);
                    }
                    this.triggerObj = await SpawnManager.modifyPoolAsyncSpawn(guid)
                    this.triggerObj.tag = EnergyShieldC.EnergyShieldTag
                    player.character.attachToSlot(this.triggerObj, mw.HumanoidSlotType.Root);
                    this.triggerObj.localTransform.position = (new mw.Vector(0, 0, this.param2));
                    this.triggerObj.localTransform.rotation = (mw.Rotation.zero);
                    this.triggerObj.worldTransform.scale = new mw.Vector(this.param1, this.param1, this.param1)
                    this.triggerObj.setCollision(mw.CollisionStatus.QueryOnly)
                    this.triggerObj.setVisibility(mw.PropertyStatus.Off)

                    // if (util.gmSwitch) {
                    //     this.triggerObj.setVisibility(mw.PropertyStatus.On);
                    //     (this.triggerObj as mw.Model).setMaterial("69FF80CF40C486094852B2B047CD1FF6")
                    // }
                }


            } else {

            }
        } else {
            if (Number(this.hostId) > 0) {
                if (this.hostId == Player.localPlayer.playerId) {
                    this.playerModuleC.changeState(EPlayerState.Idle)
                }

                let player = Player.getPlayer(this.hostId)
                if (player) {
                    this.triggerObj.parent = null;
                }

                if (this.triggerObj) {
                    this.triggerObj.parent = null;
                    mwext.GameObjPool.despawn(this.triggerObj)
                    this.triggerObj = null
                }

            } else {

            }
        }
    }
}


export class EnergyShieldS extends BuffS_Base {

    /**怪模块*/
    // public static sceneUnitModuleS: SceneUnitModuleS = null;
    /**怪模块*/
    // public sceneUnitModuleS: SceneUnitModuleS = null;

    // /**触发器中的玩家  key 玩家id  value:该玩家盾里的玩家ids*/
    // public static InRangePlayer: Set<number> = new Set<number>();
    // //球形触发器
    // private trigger: mw.Trigger = null;
    // //球形触发检测物体
    // private triggerObj: mw.GameObject = null;


    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("ExampleBuffS constructor ", _id, staticConfig.id, arg);
        super(_id, staticConfig, arg);
    }

    public init() {
        //oTrace("ExampleBuffS init");
        super.init();
        // this.sceneUnitModuleS = ModuleService.getModule(SceneUnitModuleS);
        this.buff_Energy(true);
    }

    /**
    * 销毁，清理
    */
    public destroy() {
        //oTrace("ExampleBuffS Destroy");
        super.destroy();
        this.buff_Energy(false);
    }

    public onUpdate(dt: number): void {
        super.onUpdate(dt);
    }


    /**
      * buff 能量罩 
      */
    private buff_Energy(isCreated: boolean): void {

        //woTrace("GameModuleS:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
        if (this.hostGuid == null) {
            oTraceError("error:buff_changeAttr_start uff.hostGuid == null ", this.hostGuid);
            return;
        }

        let t_pid = Number(this.hostGuid);
        if (isNaN(t_pid)) {
            oTraceError("error:buff_changeAttr_start sNaN(t_pid) ", this.hostGuid);
            return;
        }

        if (t_pid > 0) {
            if (isCreated) {
                let player = Player.getPlayer(Number(t_pid));
                if (!player) {
                    return;
                }
                player.character.movementEnabled = false
                player.character.jumpEnabled = false

            } else {
                let player = Player.getPlayer(Number(t_pid));
                if (!player) {
                    return;
                }
                player.character.movementEnabled = true
                player.character.jumpEnabled = true
            }

            // this.buff_Trigger_player(t_pid, isCreated);
        } else {
            // let unit: SceneUnitModelBase = this.sceneUnitModuleS.getSceneUnitByID(t_pid)
            // if (isCreated) {
            //     if (unit) {
            //         unit.isEnergyShield = true
            //     }
            // } else {
            //     if (unit) {
            //         unit.isEnergyShield = false
            //     }
            // }

        }
    }


    // /**
    //  * 触发器检查玩家 buff_Trigger_player  
    //  */
    // private async buff_Trigger_player(t_pid: number, isCreated: boolean) {
    //     oTrace("buff_Trigger_player_______________ ", this.buffEffectType, this.hostGuid);
    //     if (isCreated) {
    //         if (t_pid > 0) {

    //             let player = Player.getPlayer(t_pid);
    //             let location = player.character.worldTransform.position.clone().subtract(new mw.Vector(0, 0, player.character.capsuleHalfHeight));

    //             //球形触发器
    //             this.trigger = SpawnManager.modifyPoolSpawn("113") as mw.Trigger;
    //             this.trigger.worldTransform.position = (location)
    //             this.trigger.localTransform.rotation = (mw.Rotation.zero);
    //             this.trigger.worldTransform.scale = new mw.Vector(this.param1, this.param1, this.param1)
    //             if (this.trigger.shape == TriggerShapeType.Box == true) {
    //                 this.trigger.toggleTriggerShape();
    //             }
    //             this.trigger.onEnter.add((obj: mw.GameObject) => {
    //                 // oTrace("onEnter__________________")
    //                 let addplayer = (id: number) => {
    //                     if (!EnergyShieldS.InRangePlayer.has(t_pid)) {
    //                         EnergyShieldS.InRangePlayer.add(id)
    //                     }
    //                 }
    //                 if ((obj instanceof mw.Pawn) == false) {
    //                     return;
    //                 }

    //                 if ((PlayerManagerExtesion.isCharacter(obj))) {
    //                     let id = obj.player.playerId
    //                     oTrace("onEnter__________________Player", id)
    //                     addplayer(id);
    //                 }

    //                 // if (PlayerManagerExtesion.isNpc(obj)) {
    //                 //     let unit = ModuleService.getModule(SceneUnitModuleC).getSceneUnitByGuid(obj.guid);
    //                 //     if (unit) {
    //                 //         addplayer(unit.sceneID);
    //                 //         oTrace("onEnter__________________NPC", unit.sceneID)
    //                 //     }
    //                 // }

    //             })

    //             this.trigger.onLeave.add((obj: mw.GameObject) => {
    //                 // oTrace("onLeave__________________")
    //                 let romveplayer = (id: number) => {
    //                     if (EnergyShieldS.InRangePlayer.has(t_pid)) {
    //                         EnergyShieldS.InRangePlayer.delete(id)
    //                     }
    //                 }

    //                 if ((obj instanceof mw.Pawn) == false) {
    //                     return;
    //                 }

    //                 if ((PlayerManagerExtesion.isCharacter(obj))) {
    //                     let id = obj.player.playerId
    //                     oTrace("onLeave__________________Player", id)
    //                     romveplayer(id)
    //                 }

    //                 // if (PlayerManagerExtesion.isNpc(obj)) {
    //                 //     let unit = ModuleService.getModule(SceneUnitModuleC).getSceneUnitByGuid(obj.guid);
    //                 //     if (unit) {
    //                 //         oTrace("onLeave__________________NPC", unit.sceneID)
    //                 //         romveplayer(unit.sceneID)
    //                 //     }
    //                 // }
    //             })



    //             //球壳物体处理子弹攻击   7675封闭半球    7725圆桶子  安全帽44290   伞 43599
    //             if (!AssetUtil.assetLoaded("43599")) {
    //                 await AssetUtil.asyncDownloadAsset("43599");
    //             }
    //             this.triggerObj = SpawnManager.modifyPoolSpawn("43599")
    //             this.triggerObj.tag = EnergyShieldC.EnergyShieldTag

    //             player.character.attachToSlot(this.triggerObj, SlotType.Root);
    //             //this.triggerObj.worldTransform.position = (location)
    //             this.triggerObj.localTransform.position = (new mw.Vector(0, 0,-1110));
    //             this.triggerObj.localTransform.rotation = (mw.Rotation.zero);
    //             //this.triggerObj.worldTransform.scale = new mw.Vector(this.param1, this.param1, this.param1)
    //             this.triggerObj.worldTransform.scale = new mw.Vector(2.5,2.5,2.5)
    //             this.triggerObj.setCollision(mw.CollisionStatus.QueryOnly)
    //             this.triggerObj.setVisibility(mw.PropertyStatus.On);

    //         } else {

    //         }
    //     } else {
    //         if (t_pid > 0) {
    //             mwext.GameObjPool.despawn(this.trigger)
    //             this.trigger = null


    //             this.triggerObj.parent = null;
    //             mwext.GameObjPool.despawn(this.triggerObj)
    //             this.triggerObj = null

    //         } else {

    //         }
    //     }
    // }


    // /**
    //  * 能量盾检查
    //  * 1.判断距离，小于距离攻击生效 return true
    //  * 2.大于距离，判断攻击者是否在盾内，攻击者在盾内攻击生效 return false
    //  * @param releaserId 
    //  * @param beHurtId 
    //  * @returns 攻击是否可以生效
    //  */
    // public static energyCheck(releaserId: number, beHurtId: number): boolean {

    //     if( EnergyShieldS.sceneUnitModuleS == null){
    //         EnergyShieldS.sceneUnitModuleS = ModuleService.getModule(SceneUnitModuleS);
    //     }

    //     let realser: mw.Character | SceneUnitModel = null
    //     let relasePos: mw.Vector = null
    //     if (releaserId > 0) {
    //         realser = Player.getPlayer(releaserId).character;
    //         relasePos = realser.worldTransform.position.clone();
    //     } else {
    //         realser = EnergyShieldS.sceneUnitModuleS.getSceneUnitByID(releaserId);
    //         relasePos = realser.Location.clone();
    //     }

    //     let beHurter: mw.Character | SceneUnitModel = null
    //     let beHurterPos: mw.Vector = null
    //     if (beHurtId > 0) {
    //         beHurter = Player.getPlayer(beHurtId).character;
    //         beHurterPos = beHurter.worldTransform.position.clone();
    //     } else {
    //         beHurter = EnergyShieldS.sceneUnitModuleS.getSceneUnitByID(beHurtId);
    //         beHurterPos = beHurter.Location.clone();
    //     }

    //     if (realser && beHurter) {
    //         let ishitEnergy = false

    //         let hitResults = QueryUtil.lineTrace(relasePos, beHurterPos, true, true);
    //         if (hitResults && hitResults.length > 0) {
    //             ishitEnergy = hitResults.some((element, index, array) => {
    //                 return element.gameObject.tag == EnergyShieldC.EnergyShieldTag;
    //             })
    //         }

    //         oTrace("energyCheck——————————————————————————", ishitEnergy, EnergyShieldS.InRangePlayer.has(beHurtId),hitResults);

    //         //没有打到能量盾 
    //         if (!ishitEnergy) {
    //             return true
    //         } else {
    //             //打到能量盾  但是被攻击者在能量盾内
    //             if (EnergyShieldS.InRangePlayer.has(beHurtId)) {
    //                 return false
    //             }
    //             //打到能量盾  但是被攻击者不在能量盾内
    //             else {
    //                 return true
    //             }
    //         }

    //     } else {
    //         oTraceError("error:energyCheck——————————————————————————releaserId, beHurtId == null", releaserId, beHurtId);
    //         return false
    //     }

    // }




}

