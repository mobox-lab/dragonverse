import { BuffData } from "module_buff";
import { oTrace, oTraceError } from "odin";
import { EModule_Events } from "../../../../const/Enum";
import { EventManager } from "../../../../tool/EventManager";
import { BuffC_Base } from "../BuffC_Base";
import { BuffS_Base } from "../BuffS_Base";
// import { SceneUnitModuleS } from "../../../SceneUnitModule/SceneUnitModuleS";
import { Tween } from "../../../../tool/Tween";
import { Globaldata } from "../../../../const/Globaldata";
// import { ISceneUnitBase } from "../../../SceneUnitModule/model/ISceneUnitBase";


/**
 * 切换自身的模型大小BUFF 巨人果实 
 * 玩家使用后会将其模型放大5倍，将其普工更改为一套新的适配巨大模型的动效 
 */
export class ChangeScaleBuffC extends BuffC_Base {

    /**玩家是否在变大状态*/
    public static isPlayerChangeScale: boolean = false;

    /**弹簧臂变化值*/
    private armLengthChange: number = 1000;

    /**缩放动画 */
    private scaleTween: Tween<any> = null;

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("ChangeScaleBuffC constructor _id: ", _id, " configId: ", staticConfig.id, arg[0]);
        super(_id, staticConfig, arg);

        let pid = Number(arg[0]);
        if (isNaN(pid) == false) {
            this.hostId = pid;
        } else {
            //oTraceError("AttributeBuffS isNaN(pid) ", arg);
        }

        if (this.param2_modle) {
            this.armLengthChange = this.param2_modle;
        }
    }

    public init() {
        //oTrace("ChangeScaleBuffC init");
        super.init();
        this.buff_ChangeScale(true)
    }

    /**
   * 销毁，清理
   */
    public destroy() {
        //oTrace("ChangeScaleBuffC Destroy");
        super.destroy();
        this.buff_ChangeScale(false)
    }

    /**
    * buff 切换自身的模型大小
    */
    private buff_ChangeScale(isCreated: boolean): void {
        //oTrace("ChangeScaleBuffC:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
        if (this.hostId < 0) {
            // let unit: ISceneUnitBase = this.sceneUnitModuleC.getSceneUnit(this.hostId)
            // if (unit) {
            //     let cfg = unit.unitCfg
            //     if (isCreated) {
            //         unit.model.worldTransform.scale = new mw.Vector(cfg.Scale * this.param1, cfg.Scale * this.param1, cfg.Scale * this.param1)
            //     } else {
            //         unit.model.worldTransform.scale = new mw.Vector(cfg.Scale, cfg.Scale, cfg.Scale)
            //     }
            //     //oTrace("unit=================", unit.unitCfg, this.param1, unit.model.worldTransform.scale)
            // }
        } else {
            if (this.hostId == Player.localPlayer.playerId) {
                let t_player = Player.localPlayer;

                let scaleStart = mw.Vector.one;
                let scaleEnd = new mw.Vector(this.param1, this.param1, this.param1);
                //oTrace("value=================scaleStart", scaleStart, scaleEnd)
                this.stopscaleTween();

                if (isCreated) {

                    Camera.currentCamera.springArm.length += this.armLengthChange
                    EventManager.instance.call(EModule_Events.buff_quickChange, this.param2);
                    ChangeScaleBuffC.isPlayerChangeScale = true;
                    //fix:下落
                    t_player.character.gravityScale = 0;
                    let addz = this.param1 * t_player.character.collisionExtent.z * 0.5;
                    t_player.character.worldTransform.position = new mw.Vector(t_player.character.worldTransform.position.x, t_player.character.worldTransform.position.y, t_player.character.worldTransform.position.z + addz);

                    this.scaleTween = new Tween({ scale: scaleStart }).to({ scale: scaleEnd }, 0.1 * 1000)
                        .onUpdate(value => {
                            t_player.character.worldTransform.scale = value.scale;
                            //oTrace("value=================1111111111", value.scale)
                        }).onComplete(() => {
                            t_player.character.gravityScale = Globaldata.dfgravityScale;
                        }).start();


                } else {
                    Camera.currentCamera.springArm.length -= this.armLengthChange
                    EventManager.instance.call(EModule_Events.buff_quickChange, this.param3);
                    ChangeScaleBuffC.isPlayerChangeScale = false;
                    //fix:下落
                    t_player.character.gravityScale = 0;
                    let addz = this.param1 * t_player.character.collisionExtent.z * 0.5;
                    t_player.character.worldTransform.position = new mw.Vector(t_player.character.worldTransform.position.x, t_player.character.worldTransform.position.y, t_player.character.worldTransform.position.z + addz);

                    this.scaleTween = new Tween({ scale: scaleEnd }).to({ scale: scaleStart }, 0.1 * 1000)
                        .onUpdate(scale => {
                            t_player.character.worldTransform.scale = scale.scale;
                            //oTrace("value=================22222222222", scale.scale)
                        }).onComplete(() => {
                            t_player.character.gravityScale = Globaldata.dfgravityScale;
                            let addz = this.param1 * t_player.character.collisionExtent.z * 0.5;
                            t_player.character.worldTransform.position = new mw.Vector(t_player.character.worldTransform.position.x, t_player.character.worldTransform.position.y, t_player.character.worldTransform.position.z + addz);
                        }).start();


                }

            }

            //oTrace("player_buff_ChangeScale=================", this.param2, this.param1)
        }
    }

    private stopscaleTween() {
        if (this.scaleTween) {
            this.scaleTween.stop()
            this.scaleTween = null
        }
    }
}

export class ChangeScaleBuffS extends BuffS_Base {

    /**怪模块*/
    // public sceneUnitModuleS: SceneUnitModuleS = null;

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("ChangeScaleBuffS constructor ", _id, staticConfig.id, arg);
        super(_id, staticConfig, arg);
    }

    public init() {
        //oTrace("ChangeScaleBuffS init");
        super.init();
        // this.sceneUnitModuleS = ModuleService.getModule(SceneUnitModuleS);
        this.buff_ChangeScale(true)
    }

    /**
    * 销毁，清理
    */
    public destroy() {
        //oTrace("ChangeScaleBuffS Destroy");
        super.destroy();
        this.buff_ChangeScale(false)
    }

    public onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    /**
     * buff 切换自身的模型大小
     */
    private buff_ChangeScale(isCreated: boolean): void {
        //oTrace("buff_ChangeScale:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
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
            // let cfg = [1, 1, 1]  //GameConfig.Global.getElement(1).PlyerDefultScale;
            // let scale = mw.Vector.one;
            // if (isCreated) {
            //     scale = new mw.Vector(this.param1 * cfg[0], this.param1 * cfg[1], this.param1 * cfg[2]);
            // } else {
            //     scale = new mw.Vector(cfg[0], cfg[1], cfg[2]);
            // }
            // let t_player = Player.getPlayer(t_pid);
            // if (t_player) {
            //     t_player.character.worldTransform.scale = scale;
            // }
        } else {
            // let unit: ISceneUnitBase = this.sceneUnitModuleS.getSceneUnitByID(t_pid)
            // if (unit) {
            //     let cfg = unit.unitCfg
            //     let t_modelScale = cfg.Scale
            //     //TODO:先注掉，后续看需求再改
            //     if (isCreated) {
            //         // unit.defaultHeight = unit.bornLoc.z + t_modelScale * 100 * this.param1 * 0.5
            //         //unit.defaultHeight = cfg.CenterPoint.z + t_modelScale * 100 * this.param1 * 0.5
            //     } else {
            //         // unit.defaultHeight = unit.bornLoc.z + t_modelScale * 100
            //         //unit.defaultHeight = cfg.CenterPoint.z + t_modelScale * 100
            //     }
            //     // unit.height = unit.defaultHeight
            // }

        }

    }
}