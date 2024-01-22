
import { BuffData } from "module_buff";
import { oTrace, oTraceError } from "odin";
import EnumAttributeType = Attribute.EnumAttributeType;
import { Attribute } from "../../../PlayerModule/sub_attribute/AttributeValueObject";
import { BuffC_Base } from "../BuffC_Base";
import { BuffS_Base } from "../BuffS_Base";
import { MascotModuleS } from "../../../npc/mascotNpc/MascotModuleS";
import { EUnitState } from "../../../npc/UnitState";
import { EPlayerEvents_S } from "../../../../const/Enum";
import { EventManager } from "../../../../tool/EventManager";
import { EPlayerState } from "../../../PlayerModule/FSM/PlyerState";
// import { SceneUnitModuleS } from "../../../SceneUnitModule/SceneUnitModuleS";
// import SceneUnitModelBase from "../../../SceneUnitModule/model/SceneUnitModelBase";



// import SceneUnitModel_Normal from "../../../SceneUnitModule/model/SceneUnitModel_Normal";


/* 禁锢-BUFF 世界树枝（无法移动，可以攻击）
 * 释放后播放motion,对前方判定区内的敌人造成伤害并施加buff：- 无法移动，可以攻击，受到buff的敌人位置播放指定特效（可以调偏移大小旋转，挂点23）
 */
export class LockUpBuffC extends BuffC_Base {

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("LockUpBuffC constructor _id: ", _id, " configId: ", staticConfig.id, arg);
        super(_id, staticConfig, arg);
    }

    public init() {
        //oTrace("LockUpBuffC init");
        super.init();
        this.buff_LockUp(true)
    }

    /**
     * 销毁，清理
     */
    public destroy() {
        // oTrace("LockUpBuffC Destroy");
        super.destroy();
        this.buff_LockUp(false)
    }

    /**
      * 禁锢
      */
    private buff_LockUp(isCreated: boolean): void {
        //oTrace("buff_center:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
        if (isCreated) {
            if (Number(this.hostId) > 0) {
                if (this.hostId == Player.localPlayer.playerId) {
                    let player = Player.getPlayer(this.hostId)
                    //this.playerModuleC.changeState(EPlayerState.Stun)
                }
            } else {

            }
        } else {
            if (Number(this.hostId) > 0) {
                if (this.hostId == Player.localPlayer.playerId) {
                    let player = Player.getPlayer(this.hostId)
                    //this.playerModuleC.changeState(EPlayerState.Idle)
                }
            } else {

            }
        }
    }
}

export class LockUpBuffS extends BuffS_Base {
    /**怪模块*/
    // public sceneUnitModuleS: SceneUnitModuleS = null;

    /**缓存怪物巡逻移动速度*/
    private scenceUnitSpeed: number = 0;
    /**缓存怪物追击移动速度*/
    private scenceUnitspeedchach: number = 0;

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("LockUpBuffS constructor ", _id, staticConfig.id, arg);
        super(_id, staticConfig, arg);
    }

    public init() {
        //oTrace("LockUpBuffS init");
        super.init();
        // this.sceneUnitModuleS = ModuleService.getModule(SceneUnitModuleS);
        this.buff_LockUp(true);
    }

    /**
    * 销毁，清理
    */
    public destroy() {
        //oTrace("LockUpBuffS Destroy");
        super.destroy();
        this.buff_LockUp(false);
    }

    public onUpdate(dt: number): void {
        super.onUpdate(dt);
    }


    /**
      * 禁锢
      */
    private buff_LockUp(isCreated: boolean): void {

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
                    return
                }

                EventManager.instance.call(EPlayerEvents_S.PlayerEvent_ChangePlayerFSMState_S, t_pid, EPlayerState.TieUp);
                // player.character.movementEnabled = false
                // player.character.jumpEnabled = false
                //this.playerModules.addPlayerAttr(t_pid, EnumAttributeType.state, EPlayerState.Stun);
            } else {
                let player = Player.getPlayer(Number(t_pid));
                if (player == null) {
                    return
                }
                // player.character.movementEnabled = true
                // player.character.jumpEnabled = true
                EventManager.instance.call(EPlayerEvents_S.PlayerEvent_ChangePlayerFSMState_S, t_pid, EPlayerState.Idle);
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

