
import { BuffS, BuffData, buffArgs } from "module_buff";
import { oTraceError } from "odin";

// import { PlayerModuleS } from "../../PlayerModule/PlayerModuleS";
// import { SceneUnitModuleS } from "../../SceneUnitModule/SceneUnitModuleS";


export class BuffS_Base extends BuffS {

    //?????编译报错todo
    // /**玩家模块*/
    // public playerModules: PlayerModuleS = null;
    // /**怪模块*/
    // public sceneUnitModuleS: SceneUnitModuleS = null;

    /** 释放者的guid，SkillBaseActor.guid/GameObject.guid , 如果不存在表示该buff位于世界位置上 */
    public _castPId: number = 0;
    /**buff释放者 pid */
    public get castPId(): number {
        return this._castPId;
    }

    /**参数*/
    public arg: buffArgs = null;

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("BuffS_Base constructor ", _id, staticConfig.id, arg);
        super(_id, staticConfig);

        let pid = Number(arg[0]);
        if (isNaN(pid) == false) {
            this._castPId = pid;
        } else {
            oTraceError("BuffS_Base isNaN(pid) ", arg);
        }

        this.arg = arg[1];
    }

    public init() {
        //oTrace("BuffS_Base init");
        super.init();
        // this.playerModules = ModuleService.getModule(PlayerModuleS);
        // this.sceneUnitModuleS = ModuleService.getModule(SceneUnitModuleS);
    }

    /**
    * 销毁，清理
    */
    public destroy() {
        // oTrace("BuffS_Base Destroy");
        super.destroy();

    }

    public onUpdate(dt: number): void {
        super.onUpdate(dt);
    }



}
