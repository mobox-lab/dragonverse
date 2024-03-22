import { BuffData } from "module_buff";
import { oTraceError } from "odin";
import { BuffC_Base } from "../BuffC_Base";
import { EPlayerState } from "../../../PlayerModule/FSM/PlyerState";
import { BuffS_Base } from "../BuffS_Base";
import { GameConfig } from "../../../../config/GameConfig";
import { Globaldata } from "../../../../const/Globaldata";
import { IBuffElement } from "../../../../config/Buff";
import SceneUnit from "../../../npc/SceneUnit";
import { MascotModuleS } from "../../../npc/mascotNpc/MascotModuleS";
/**
 * 中心点汇聚BUFF  塞壬的羽毛
 * 玩家使用后，禁止玩家一切操作，使以玩家为中心半径x范围内的所有角色全部以速度v向该玩家旋转移动，效果持续期间被吸引到的角色无法操控移动摇杆，但可以施放技能和攻击。持续t秒或玩家死亡时停止。
 */
export class CenterBuffC extends BuffC_Base {


    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("CenterBuffC constructor _id: ", _id, " configId: ", staticConfig.id, arg);
        super(_id, staticConfig, arg);
    }

    public init() {
        //oTrace("CenterBuffC init");
        super.init();
        this.buff_center(true)
    }

    public onUpdate(dt: number): void {
        super.onUpdate(dt);
        //oTrace("CenterBuffC onUpdate");
    }

    /**
   * 销毁，清理
   */
    public destroy() {
        //oTrace("CenterBuffC Destroy");
        super.destroy();
        this.buff_center(false)
    }

    /**
     * 中心 todo
     */
    private buff_center(isCreated: boolean): void {
        //oTrace("buff_center:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
        if (isCreated) {
            if (Number(this.hostId) > 0) {
                if (this.hostId == Player.localPlayer.playerId) {
                    let player = Player.getPlayer(this.hostId)
                    Camera.currentCamera.positionLagEnabled = false
                    Camera.currentCamera.rotationLagEnabled = false
                    this.playerModuleC.changeState(EPlayerState.Center)
                    player.character.collisionWithOtherCharacterEnabled = false
                }
            } else {

            }
        } else {
            if (Number(this.hostId) > 0) {
                if (this.hostId == Player.localPlayer.playerId) {
                    let player = Player.getPlayer(this.hostId)
                    Camera.currentCamera.positionLagEnabled = true
                    Camera.currentCamera.rotationLagEnabled = false
                    this.playerModuleC.changeState(EPlayerState.Idle)
                    player.character.collisionWithOtherCharacterEnabled = true
                }
            } else {

            }
        }
    }
}

export class CenterBuffS extends BuffS_Base {

    /**怪模块*/
    // public sceneUnitModuleS: SceneUnitModuleS = null;

    private attackTime = 4    //飞到目标点时间
    private offectpos = 0.5   //偏移点[0-1]
    private offectDisx = 0    //偏移距离
    private offectDisy = 500  //偏移距离

    private p_cast: mw.Player;
    private ticker: number = 0;
    private fromPoint: mw.Vector = mw.Vector.zero; // 起始点
    private middlePoint: mw.Vector = mw.Vector.zero; // 中间点
    private endPoint: mw.Vector = mw.Vector.zero; // 终止点
    private speed: number = 0; //速度
    private dalte: number = 0.1//间隔
    private currPos: mw.Vector = mw.Vector.zero;//当前位置

    private cfg: IBuffElement = null;

    /*创建坐标*/
    private creatlocation: mw.Vector = null;

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        super(_id, staticConfig, arg);
        if (this.arg != null) {
            this.creatlocation = this.arg.pos;
        }
    }

    public init() {
        //oTraceError("CenterBuffS===== init", this.hostGuid, this.castPId);
        super.init();
        // this.sceneUnitModuleS = ModuleService.getModule(SceneUnitModuleS);
        this.buff_center(true)
    }

    /**
    * 销毁，清理
    */
    public destroy() {
        //oTraceError("CenterBuffS===== Destroy");
        super.destroy();
        this.buff_center(false)
    }

    /**
     * 中心 todo
     */
    private buff_center(isCreated: boolean): void {

        console.error("====buff_center ", isCreated);

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

        if (isCreated) {
            this.ticker = 0;
            this.attackTime = this.param1
            this.p_cast = Player.getPlayer(Number(this.castPId));
            if (!this.p_cast) {
                oTraceError("error:buff_changeAttr_start p_cast == null ", this.hostGuid);
                return;
            }
            if (!this.p_cast.character) {
                oTraceError("error:buff_changeAttr_start p_cast.character == null ", this.hostGuid);
                return;
            }

            let forward = this.p_cast.character.localTransform.getForwardVector().multiply(200)
            this.cfg = GameConfig.Buff.getElement(this.configId);
            if (this.cfg == null) {
                return;
            }

            if (Number(this.hostGuid) > 0) {
                let p_host = Player.getPlayer(Number(this.hostGuid));
                if (p_host && p_host.character && p_host.character.worldTransform) {
                    this.fromPoint = p_host.character.worldTransform.position.clone();
                    //参数2分类 自动爆点
                    if (this.cfg.param2 == 1) {
                        this.endPoint = this.creatlocation == null ? mw.Vector.add(this.p_cast.character.worldTransform.position.clone(), forward, this.endPoint) : this.creatlocation;
                    } else {
                        if (this.cfg.param4 == null) {
                            if (this.creatlocation) {
                                this.endPoint = this.creatlocation;
                            } else {
                                this.endPoint = this.p_cast.character.worldTransform.position;
                            }
                        } else {
                            this.endPoint = this.p_cast.character.localTransform.transformPosition(this.cfg.param4);
                        }
                    }

                    this.offectDisy = mw.Vector.distance(this.fromPoint, this.endPoint) / 2
                    mw.Vector.add(this.fromPoint.clone()
                        .add(this.endPoint.clone())
                        .multiply(this.offectpos), new mw.Vector(this.offectDisx, this.offectDisy, 0), this.middlePoint);

                    p_host.character.movementEnabled = false
                    p_host.character.gravityScale = 0
                }
            } else {

                let p_host = ModuleService.getModule(MascotModuleS).getUnit(t_pid);
                if (p_host && p_host.getModel()) {
                    // this.p_host.isCenter = true
                    this.fromPoint = p_host.getModel().worldTransform.position;

                    //参数2分类 自动爆点位置
                    if (this.cfg.param2 == 1) {
                        this.endPoint = this.creatlocation == null ? mw.Vector.add(this.p_cast.character.worldTransform.position.clone(), forward, this.endPoint) : this.creatlocation;
                    } else {
                        if (this.cfg.param4 == null) {
                            if (this.creatlocation) {
                                this.endPoint = this.creatlocation;
                            } else {
                                this.endPoint = this.p_cast.character.worldTransform.position;
                            }
                        } else {
                            this.endPoint = this.p_cast.character.localTransform.transformPosition(this.cfg.param4);
                        }
                    }

                    this.offectDisy = mw.Vector.distance(this.fromPoint, this.endPoint) / 2
                    mw.Vector.add(this.fromPoint.clone()
                        .add(this.endPoint.clone())
                        .multiply(this.offectpos), new mw.Vector(this.offectDisx, this.offectDisy, 0), this.middlePoint);

                    // this.speed = this.p_host.getValue(Attribute.EnumAttributeType.speed)
                    //oTrace("unit=================", this.p_host.isCenter)

                    let character = (p_host as SceneUnit).gameObject as mw.Character;
                    character.gravityScale = 0;
                }
            }

        } else {

            if (Number(this.hostGuid) > 0) {

                // 容错
                let p_host = Player.getPlayer(Number(this.hostGuid));
                if (p_host) {
                    let character = (p_host as mw.Player).character;
                    if (character) {
                        character.movementEnabled = true
                        character.gravityScale = Globaldata.dfgravityScale;
                    }
                }
            } else {

                let p_host = ModuleService.getModule(MascotModuleS).getUnit(t_pid);
                if (p_host && p_host.getModel()) {
                    let character = (p_host as SceneUnit).gameObject as mw.Character;
                    character.gravityScale = Globaldata.npc_gravityScale;
                }

                //oTrace("unit=================", this.p_host.isCenter)
            }

        }

    }



    public onUpdate(dt: number): void {

        super.onUpdate(dt);

        if (this.hostGuid == null || isNaN(Number(this.hostGuid))) {
            oTraceError("error:onUpdate uff.hostGuid == null ", this.hostGuid);
            return;
        }

        // //怪霸体不吸附
        // if (Number(this.hostGuid) < 0) {
        //     this.p_host = this.p_host as SceneUnitModelBase
        //     if (!this.p_host) {
        //         return;
        //     }
        //     // if (this.p_host.unitCfg.Stoic) {
        //     //     return;
        //     // }
        // }

        this.ticker += dt
        let t = this.ticker / this.attackTime;  // 这里是计算当前已用时间占计划用时间的百分比，当作增量t

        //距离太近不移动
        // oTrace("diistance====pint",mw.Vector.distance(this.fromPoint,this.endPoint));
        // let percentmove = MathUtil.clamp(mw.Vector.distance(this.fromPoint,this.endPoint)/1000,0, 0.8);

        t = MathUtil.clamp(t, 0, 0.8); //1


        if (this.fromPoint == null || this.middlePoint == null || this.endPoint == null) {
            return;
        }

        this.GetCurvePoint(this.fromPoint, this.middlePoint, this.endPoint, t, this.currPos);
        //oTrace("currPos=================", this.currPos, this.fromPoint, this.middlePoint, this.endPoint)

        if (this.currPos == null) {
            return;
        }
        if (this.currPos.z == null) {
            return;
        }

        if (t == 1) {
            // oTraceError("到达目标点");
        }

        if (Number(this.hostGuid) > 0) {
            let p_host = Player.getPlayer(Number(this.hostGuid));
            if (!p_host) {
                return;
            }
            let character = (p_host as mw.Player).character;
            if (!character) {
                return;
            }
            if (character.worldTransform == null) {
                return;
            }
            if (!character.worldTransform.position) {
                return;
            }
            if (!character.worldTransform.position.z) {
                return;
            }

            if (character.worldTransform.position.z > this.currPos.z) {
                this.currPos.z = character.worldTransform.position.z
            } else {

            }
            character.worldTransform.position = this.currPos;

        } else {
            let p_host = ModuleService.getModule(MascotModuleS).getUnit(Number(this.hostGuid));
            if (!p_host) {
                return;
            }
            if (!p_host.getModel()) {
                return;
            }
            if (!p_host.getModel().worldTransform.position) {
                return;
            }
            if (!p_host.getModel().worldTransform.position.z) {
                return;
            }
            if (p_host.getModel().worldTransform.position.z > this.currPos.z) {
                this.currPos.z = p_host.getModel().worldTransform.position.z
            }
            p_host.getModel().worldTransform.position = this.currPos;
        }


    }

    /// <summary>
    /// 返回曲线在某一时间t上的点
    /// </summary>
    /// <param name="_p0">起始点</param>
    /// <param name="_p1">中间点</param>
    /// <param name="_p2">终止点</param>
    /// <param name="t">当前时间t(0.0~1.0)</param>
    /// <returns></returns>
    public GetCurvePoint(_p0: mw.Vector, _p1: mw.Vector, _p2: mw.Vector, t: number, outVector: mw.Vector) {
        t = MathUtil.clamp(t, 0, 1);
        let x = ((1 - t) * (1 - t)) * _p0.x + 2 * t * (1 - t) * _p1.x + t * t * _p2.x;
        let y = ((1 - t) * (1 - t)) * _p0.y + 2 * t * (1 - t) * _p1.y + t * t * _p2.y;
        let z = ((1 - t) * (1 - t)) * _p0.z + 2 * t * (1 - t) * _p1.z + t * t * _p2.z;
        //let pos = new mw.Vector(x, y, z);
        outVector.x = x
        outVector.y = y
        outVector.z = z
    }
}