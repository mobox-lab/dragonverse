import { BuffData } from "module_buff";
import { oTrace, oTraceError } from "odin";
import { BuffC_Base } from "../BuffC_Base";
import { BuffS_Base } from "../BuffS_Base";
import { PlayerModuleS } from "../../../PlayerModule/PlayerModuleS";
// import { SceneUnitModuleS } from "../../../SceneUnitModule/SceneUnitModuleS";
// import { ISceneUnitBase } from "../../../SceneUnitModule/model/ISceneUnitBase";






/**
 *   火弓箭手的1技能 
 *   我给自己上了一个持续10秒的火焰附魔buff，期间我造成的伤害可以对敌人产生灼烧效果，10秒过后我所有攻击就又恢复了，
 *   然后这个灼烧可能需要配每次的次数和间隔
 */
export class CauterizeSelfBuffC extends BuffC_Base {

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("CauterizeSelfBuffC constructor _id: ", _id, " configId: ", staticConfig.id);
        super(_id, staticConfig, arg);
    }

    public init() {
        //oTrace("CauterizeSelfBuffC init");
        super.init();
        //this.buff_Cauterize(true)
    }

    public async destroy() {
        //oTrace("CauterizeSelfBuffC Destroy");
        super.destroy();
        // this.buff_Cauterize(false)
    }


    public onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    /**
    * 灼烧 
    */
    private buff_Cauterize(isCreated: boolean): void {

        //oTrace("GameModuleS:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
        if (this.hostGuid == null) {
            oTraceError("error:CauterizeSelfBuffS uff.hostGuid == null ", this.hostGuid);
            return;
        }

        let t_pid = Number(this.hostGuid);
        if (isNaN(t_pid)) {
            oTraceError("error:CauterizeSelfBuffS sNaN(t_pid) ", this.hostGuid);
            return;
        }

        if (t_pid > 0) {
            if (isCreated) {
                let player = Player.getPlayer(Number(t_pid));
                if (player == null) {
                    return
                }
            } else {
                let player = Player.getPlayer(Number(t_pid));
                if (player == null) {
                    return
                }
            }
        } else {
            // let unit: ISceneUnitBase = this.sceneUnitModuleC.getSceneUnit(t_pid);
            // if (isCreated) {
            //     if (unit) {
            //     }
            //     //oTrace("unit=====CauterizeSelfBuffS============true")
            // } else {
            //     if (unit) {
            //     }
            //     //oTrace("unit=======CauterizeSelfBuffS==========false")
            // }
        }
    }

}

export class CauterizeSelfBuffS extends BuffS_Base {
    /**玩家模块*/
    public playerModules: PlayerModuleS = null;
    /**怪模块*/
    // public sceneUnitModuleS: SceneUnitModuleS = null;

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("CauterizeSelfBuffS constructor ", _id, staticConfig.id, arg);
        super(_id, staticConfig, arg);
    }

    public init() {
        //oTrace("CauterizeSelfBuffS init");
        super.init();
        this.playerModules = ModuleService.getModule(PlayerModuleS);
        // this.sceneUnitModuleS = ModuleService.getModule(SceneUnitModuleS);
        //this.buff_Cauterize(true);
    }


    /**
    * 销毁，清理
    */
    public async destroy() {
        //oTrace("CauterizeSelfBuffS Destroy");
        super.destroy();
        //this.buff_Cauterize(true);
    }

    public onUpdate(dt: number): void {
        super.onUpdate(dt);
    }


    /**
     * 灼烧 
     */
    private buff_Cauterize(isCreated: boolean): void {

        //oTrace("GameModuleS:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
        if (this.hostGuid == null) {
            oTraceError("error:CauterizeSelfBuffS uff.hostGuid == null ", this.hostGuid);
            return;
        }

        let t_pid = Number(this.hostGuid);
        if (isNaN(t_pid)) {
            oTraceError("error:CauterizeSelfBuffS sNaN(t_pid) ", this.hostGuid);
            return;
        }

        if (t_pid > 0) {
            if (isCreated) {
                let player = Player.getPlayer(Number(t_pid));
                if (player == null) {
                    return
                }
            } else {
                let player = Player.getPlayer(Number(t_pid));
                if (player == null) {
                    return
                }
            }
        } else {
            // let unit: ISceneUnitBase = this.sceneUnitModuleS.getSceneUnitByID(t_pid)
            // if (isCreated) {
            //     if (unit) {
            //     }
            //     //oTrace("unit=====CauterizeSelfBuffS============true")
            // } else {
            //     if (unit) {
            //     }
            //     //oTrace("unit=======CauterizeSelfBuffS==========false")
            // }
        }
    }
}







