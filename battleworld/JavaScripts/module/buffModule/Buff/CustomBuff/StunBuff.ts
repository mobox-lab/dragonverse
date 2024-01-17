import { BuffData } from "module_buff";
import { oTrace, oTraceError } from "odin";
import EnumAttributeType = Attribute.EnumAttributeType;
import { EPlayerState } from "../../../PlayerModule/FSM/PlyerState";
import { Attribute } from "../../../PlayerModule/sub_attribute/AttributeValueObject";
import { BuffC_Base } from "../BuffC_Base";
import { BuffS_Base } from "../BuffS_Base";
import { MascotModuleS } from "../../../npc/mascotNpc/MascotModuleS";
import { EUnitState } from "../../../npc/UnitState";
// import { SceneUnitModuleS } from "../../../SceneUnitModule/SceneUnitModuleS";
// import SceneUnitModelBase from "../../../SceneUnitModule/model/SceneUnitModelBase";






/**
 * 眩晕BUFF 
 */
export class StunBuffC extends BuffC_Base {

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("ExampleBuffC constructor _id: ", _id, " configId: ", staticConfig.id, arg);
        super(_id, staticConfig, arg);

    }

    public init() {
        //oTrace("ExampleBuffC init");
        super.init();
        this.buff_buff_stun(true)
    }

    /**
     * 销毁，清理
     */
    public destroy() {
        //oTrace("ExampleBuffC Destroy");
        super.destroy();
        this.buff_buff_stun(false)
    }

    /**
      * buffStun
      */
    private buff_buff_stun(isCreated: boolean): void {
        //oTrace("buff_center:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
        if (isCreated) {
            if (Number(this.hostId) > 0) {
                if (this.hostId == Player.localPlayer.playerId) {
                    let player = Player.getPlayer(this.hostId)

                    this.playerModuleC.changeState(EPlayerState.Stun)
                }
            } else {

            }
        } else {
            if (Number(this.hostId) > 0) {
                if (this.hostId == Player.localPlayer.playerId) {
                    let player = Player.getPlayer(this.hostId)

                    this.playerModuleC.changeState(EPlayerState.Idle)
                }
            } else {

            }
        }
    }
}

export class StunBuffS extends BuffS_Base {
    /**怪模块*/
    // public sceneUnitModuleS: MascotModuleS = null;

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("ExampleBuffS constructor ", _id, staticConfig.id, arg);
        super(_id, staticConfig, arg);
    }

    public init() {
        //oTrace("ExampleBuffS init");
        super.init();
        // this.sceneUnitModuleS = ModuleService.getModule(SceneUnitModuleS);
        this.buff_stun(true);
    }

    /**
    * 销毁，清理
    */
    public destroy() {
        //oTrace("ExampleBuffS Destroy");
        super.destroy();
        this.buff_stun(false);
    }

    public onUpdate(dt: number): void {
        super.onUpdate(dt);
    }


    /**
      * buff 眩晕 
      */
    private buff_stun(isCreated: boolean): void {

        //oTrace("GameModuleS:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
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
                if (player == null) {
                    return;
                }
                player.character.movementEnabled = false
                player.character.jumpEnabled = false
                //this.playerModules.addPlayerAttr(t_pid, EnumAttributeType.state, EPlayerState.Stun);

            } else {
                let player = Player.getPlayer(Number(t_pid));
                if (player == null) {
                    return;
                }
                player.character.movementEnabled = true
                player.character.jumpEnabled = true
                //this.playerModules.reducePlayerAttr(t_pid, EnumAttributeType.state, EPlayerState.Stun);
            }
        } else {
            let mascotS = ModuleService.getModule(MascotModuleS);
            if (isCreated) {
                if (mascotS) {
                    mascotS.unitChangeState(t_pid, EUnitState.Stun);
                }
            } else {
                if (mascotS) {
                    mascotS.unitChangeState(t_pid, EUnitState.Path);
                }
            }
        }
    }
}

