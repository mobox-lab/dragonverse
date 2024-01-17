import { BuffData } from "module_buff";
import { oTraceError } from "odin";
import { EBagSkillEvents, EModule_Events_S } from "../../../../const/Enum";
import { EventManager } from "../../../../tool/EventManager";
import { BuffC_Base } from "../BuffC_Base";
import { BuffS_Base } from "../BuffS_Base";
// import { SceneUnitModuleS } from "../../../SceneUnitModule/SceneUnitModuleS";
import { ChangeScaleBuffC } from "./ChangeScaleBuff";
import { BuffManagerS, } from "module_buff";
import { Tween } from "../../../../tool/Tween";
import { Globaldata } from "../../../../const/Globaldata";
// import SceneUnitModelBase from "../../../SceneUnitModule/model/SceneUnitModelBase";
// import { ISceneUnitBase } from "../../../SceneUnitModule/model/ISceneUnitBase";

/**
 * 切换为V1类型怪物，并且有自己的释放技能   卸下---切换职业卡了
 */
export class ChangeV1MonsterBuffC extends BuffC_Base {

    /**玩家是否在切换为V1类型怪物 状态*/
    public static isPlayerChangeChangeV1: boolean = false;

    /**玩家选择角色id*/
    private selectJobId: number = -1;

    /**是否切换过背包*/
    private ischangeBagSkill: boolean = false;

    /**弹簧臂变化值*/
    private armLengthChange: number = 1000

    /**缩放动画 */
    private scaleTween: Tween<any> = null;

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("ChangeV1MonsterBuffC constructor _id: ", _id, " configId: ", staticConfig.id, arg[0]);
        super(_id, staticConfig, arg);

        let pid = Number(arg[0]);
        if (isNaN(pid) == false) {
            this.hostId = pid;
        } else {
            //oTraceError("ChangeV1MonsterBuffC isNaN(pid) ", arg);
        }

        if (this.param2_modle) {
            this.armLengthChange = this.param2_modle;
        }
        EventManager.instance.add(EBagSkillEvents.change_bagSkill, this.listen_changeBagSkill.bind(this));
    }

    public init() {
        //oTrace("ChangeV1MonsterBuffC init");
        super.init();
        this.buff_ChangeV1Monster(true)
        this.buff_ChangeScale(true)
    }

    /**
   * 销毁，清理
   */
    public destroy() {
        //oTrace("ChangeV1MonsterBuffC Destroy");
        super.destroy();
        this.buff_ChangeV1Monster(false)
        this.buff_ChangeScale(false)
        EventManager.instance.remove(EBagSkillEvents.change_bagSkill, this.listen_changeBagSkill.bind(this), this);
    }

    /**
     * buff 切换自身的模型大小
   */
    private async buff_ChangeV1Monster(isCreated: boolean): Promise<void> {
        //oTrace("ChangeV1MonsterBuffC:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
        if (this.hostId < 0) {
            // let unit: ISceneUnitBase = this.sceneUnitModuleC.getSceneUnit(this.hostId)
            // if (unit) {
            //     let cfg = unit.unitCfg
            //     if (isCreated) {

            //     } else {

            //     }
            //     //oTrace("unit=================", unit.unitCfg, this.param1, unit.model.worldTransform.scale)
            // }
        } else {
            if (isCreated) {
                if (this.hostId == Player.localPlayer.playerId) {
                    ChangeV1MonsterBuffC.isPlayerChangeChangeV1 = true;
                }
            } else {
                if (this.hostId == Player.localPlayer.playerId) {
                    ChangeV1MonsterBuffC.isPlayerChangeChangeV1 = false;
                }
            }
            //oTrace("ChangeV1MonsterBuffC=================", isCreated, this.ischangeBagSkill, this.param1)
        }
    }

    /**
     * 快捷栏选项修改
     */
    private listen_changeBagSkill(bagSkillId: number) {
        // oTrace("ChangeV1MonsterBuffC_____________________________", bagSkillId, this.param1, this.selectJobId);
        if (bagSkillId == this.param1) {
            return;
        }

        if (bagSkillId == this.selectJobId) {
            return;
        }

        this.ischangeBagSkill = true;
        ChangeV1MonsterBuffC.isPlayerChangeChangeV1 = false;
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
            //     // let t_capsuleScale = cfg.CustomScale
            //     if (isCreated) {
            //         unit.model.worldTransform.scale = new mw.Vector(cfg.Scale * this.param3, cfg.Scale * this.param3, cfg.Scale * this.param3)

            //     } else {
            //         unit.model.worldTransform.scale = new mw.Vector(cfg.Scale, cfg.Scale, cfg.Scale)
            //     }
            //     //oTrace("unit=================", unit.unitCfg, this.param1, unit.model.worldTransform.scale)
            // }
        } else {
            if (isCreated) {
                if (this.hostId == Player.localPlayer.playerId) {
                    let player = Player.getPlayer(this.hostId)
                    Camera.currentCamera.springArm.length += this.armLengthChange
                    // EventManager.instance.call(EModule_Events.buff_quickChange, this.param2);
                    ChangeScaleBuffC.isPlayerChangeScale = true;
                }
            } else {
                if (this.hostId == Player.localPlayer.playerId) {
                    let player = Player.getPlayer(this.hostId)
                    Camera.currentCamera.springArm.length -= this.armLengthChange
                    // EventManager.instance.call(EModule_Events.buff_quickChange, this.param3);
                    ChangeScaleBuffC.isPlayerChangeScale = false;
                }
            }

            if (this.hostId == Player.localPlayer.playerId) {
                let t_player = Player.localPlayer;

                let scaleStart = mw.Vector.one;
                let scaleEnd = new mw.Vector(this.param3, this.param3, this.param3);
                //oTrace("value=================scaleStart", scaleStart, scaleEnd)
                this.stopscaleTween();

                if (isCreated) {
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

                    // if (t_player) {
                    //     t_player.character.worldTransform.scale = scaleEnd;
                    // }
                } else {
                    //fix:下落
                    t_player.character.gravityScale = 0;
                    let addz = this.param1 * t_player.character.collisionExtent.z * 0.5;
                    t_player.character.worldTransform.position = new mw.Vector(t_player.character.worldTransform.position.x, t_player.character.worldTransform.position.y, t_player.character.worldTransform.position.z + addz);

                    this.scaleTween = new Tween({ scale: scaleEnd }).to({ scale: scaleStart }, 0.1 * 1000)
                        .onUpdate(scale => {
                            t_player.character.worldTransform.scale = scale.scale;
                            //oTrace("value=================22222222222", scale.scale)
                        }).onComplete(() => {
                            let addz = this.param1 * t_player.character.collisionExtent.z * 0.5;
                            t_player.character.worldTransform.position = new mw.Vector(t_player.character.worldTransform.position.x, t_player.character.worldTransform.position.y, t_player.character.worldTransform.position.z + addz);
                            t_player.character.gravityScale = Globaldata.dfgravityScale;
                        }).start();

                    // if (t_player) {
                    //     t_player.character.worldTransform.scale = scaleStart;
                    // }
                }

            }
            //oTrace("player_buff_ChangeScale=================", this.param2, this.param3)
        }
    }

    private stopscaleTween() {
        if (this.scaleTween) {
            this.scaleTween.stop()
            this.scaleTween = null
        }
    }

}

export class ChangeV1MonsterBuffS extends BuffS_Base {

    /**怪模块*/
    // public sceneUnitModuleS: SceneUnitModuleS = null;
    /**是否切换过背包*/
    private ischangeBagSkill: boolean = false;


    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("ChangeV1MonsterBuffS constructor ", _id, staticConfig.id, arg);
        super(_id, staticConfig, arg);

        EventManager.instance.add(EModule_Events_S.prop_change_propId, this.listen_change_propId, this);
    }

    public onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    /**
     * 初始化
     */
    public init() {
        //oTrace("ChangeV1MonsterBuffS init");
        super.init();
        // this.sceneUnitModuleS = ModuleService.getModule(SceneUnitModuleS);
        this.buff_ChangeV1Monster(true)
        this.buff_ChangeScale(true)
    }
    /**
    * 销毁，清理
    */
    public destroy() {
        //oTrace("ChangeV1MonsterBuffS Destroy");
        super.destroy();
        this.buff_ChangeV1Monster(false)
        this.buff_ChangeScale(false)
        EventManager.instance.remove(EBagSkillEvents.change_bagSkill, this.listen_change_propId.bind(this), this);
    }

    /**
    * buff 切换自身的模型大小
    */
    private async buff_ChangeV1Monster(isCreated: boolean): Promise<void> {
        //oTrace("ChangeV1MonsterBuffC:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
        if (this.hostGuid == null) {
            oTraceError("error:ChangeV1MonsterBuffC uff.hostGuid == null ", this.hostGuid);
            return;
        }

        let t_pid = Number(this.hostGuid);
        if (isNaN(t_pid)) {
            oTraceError("error:ChangeV1MonsterBuffC sNaN(t_pid) ", this.hostGuid);
            return;
        }

        if (t_pid < 0) {

        } else {
            if (isCreated) {
                EventManager.instance.call(EModule_Events_S.prop_change_propId, t_pid, this.param1);
            } else {
                if (this.ischangeBagSkill == false) {
                    //oTrace("ischangeBagSkill================????=", isCreated, this.ischangeBagSkill, this.param1, this.param2)
                    EventManager.instance.call(EModule_Events_S.prop_change_propId, t_pid, this.param2);
                }
            }
            //oTrace("ChangeV1MonsterBuffC=================", isCreated, this.ischangeBagSkill, this.param1, this.param2)
        }
    }


    /**
    * 玩家快捷栏道具变更
    */
    private listen_change_propId(pId: number, itemId: number) {

        //oTrace("listen_change_propId__________________________", pId, itemId, this.hostGuid);

        if (pId != Number(this.hostGuid)) {
            return
        }

        if (itemId == this.param1) {
            return;
        }

        if (itemId == this.param2) {
            return;
        }

        this.ischangeBagSkill = true;

        //销毁buff
        BuffManagerS.instance.removeBuffsById([this.id]);
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
            //     scale = new mw.Vector(this.param3 * cfg[0], this.param3 * cfg[1], this.param3 * cfg[2]);
            // } else {
            //     scale = new mw.Vector(cfg[0], cfg[1], cfg[2]);
            // }
            // let t_player = Player.getPlayer(t_pid);
            // if (t_player) {
            //     t_player.character.worldTransform.scale = scale;
            // }
        } else {
            // let unit: SceneUnitModelBase = this.sceneUnitModuleS.getSceneUnitByID(t_pid)
            // if (unit) {
            //     let cfg = unit.unitCfg
            //     let t_modelScale = cfg.Scale
            //     if (isCreated) {
            //         if (unit.modelLocaction == null) {
            //             return;
            //         }
            //         let hight = unit.bornLoc.z + t_modelScale * 100 * this.param3 * 0.5
            //         unit.modelLocaction = new mw.Vector(unit.modelLocaction.x, unit.modelLocaction.y, hight);
            //     } else {
            //         if (unit.modelLocaction == null) {
            //             return;
            //         }
            //         let hight = unit.bornLoc.z + t_modelScale * 100
            //         unit.modelLocaction = new mw.Vector(unit.modelLocaction.x, unit.modelLocaction.y, hight);
            //     }
            // }
            //oTrace("unit=================", unit.height)
        }

    }

}