
// import { BuffData } from "module_buff";
// import { oTraceError } from "odin";
// import { BuffC_Base } from "../BuffC_Base";
// import { Attribute } from "../../../PlayerModule/sub_attribute/AttributeValueObject";
// import { BuffS_Base } from "../BuffS_Base";
// import SceneUnitModelBase from "../../../SceneUnitModule/model/SceneUnitModelBase";
// import { SecretAreaModuleC } from "../../../SecretArea/SecretAreaModuleC";
// import { ISceneUnitBase } from "../../../SceneUnitModule/model/ISceneUnitBase";
// import SecretAreaModel from "../../../SceneUnitModule/model/SecretAreaModel";
// import { IBuffElement } from "../../../../config/Buff";
// import { GameConfig } from "../../../../config/GameConfig";
// /**
//  * 中心点汇聚BUFF  塞壬的羽毛
//  * 玩家使用后，禁止玩家一切操作，使以玩家为中心半径x范围内的所有角色全部以速度v向该玩家旋转移动，效果持续期间被吸引到的角色无法操控移动摇杆，但可以施放技能和攻击。持续t秒或玩家死亡时停止。
//  */
// export class CenterBuff2C extends BuffC_Base {

//     /**秘境模块*/
//     public secretAreaModuleC: SecretAreaModuleC = null;

//     private attackTime = 4    //飞到目标点时间
//     private offectpos = 0.5   //偏移点[0-1]
//     private offectDisx = 0    //偏移距离
//     private offectDisy = 500  //偏移距离

//     private p_host: mw.Player | ISceneUnitBase;
//     private p_cast: mw.Player;
//     private ticker: number = 0;
//     private fromPoint: mw.Vector = mw.Vector.zero;; // 起始点
//     private middlePoint: mw.Vector = mw.Vector.zero;; // 中间点
//     private endPoint: mw.Vector = mw.Vector.zero; // 终止点
//     private speed: number = 0; //速度
//     private dalte: number = 0.1//间隔
//     private currPos: mw.Vector = mw.Vector.zero;//当前位置

//     /**当前配置*/
//     private cfg: IBuffElement = null;

//     /*创建坐标*/
//     private creatlocation: mw.Vector = null;

//     constructor(_id: number, staticConfig: BuffData, arg: any) {
//         super(_id, staticConfig, arg);
//         this.secretAreaModuleC = ModuleService.getModule(SecretAreaModuleC);
//         if(this.arg != null){
//             this.creatlocation = this.arg.pos;
//         }
//     }

//     public init() {
//         super.init();
//         this.buff_center(true)
//     }


//     /**
//    * 销毁，清理
//    */
//     public destroy() {
//         super.destroy();
//         this.buff_center(false)
//     }

//     /**
//      * 中心 todo
//      */
//     private buff_center(isCreated: boolean): void {
//         if (isCreated) {
//             this.ticker = 0;
//             this.attackTime = this.param1
//             this.p_cast = Player.localPlayer;
//             if (!this.p_cast) {
//                 oTraceError("error:buff_changeAttr_start p_cast == null ", this.hostId);
//                 return;
//             }
//             if (!this.p_cast.character) {
//                 oTraceError("error:buff_changeAttr_start p_cast.character == null ", this.hostId);
//                 return;
//             }

//             let forward = this.p_cast.character.localTransform.getForwardVector().multiply(200)

//             this.cfg = GameConfig.Buff.getElement(this.configId);
//             if (this.cfg == null) {
//                 return;
//             }

//             if (this.hostId > 0) {
//                 return;
//             }

//             this.p_host = this.secretAreaModuleC.getSceneUnitByID(this.hostId);
//             if (this.p_host && this.p_host.model) {

//                 this.fromPoint = this.p_host.model.worldTransform.position;

//                 if (this.cfg.param2 == 1) {
//                     this.endPoint = this.creatlocation == null ? mw.Vector.add(this.p_cast.character.worldTransform.position.clone(), forward, this.endPoint) : this.creatlocation;
//                 } else {
//                     if (this.cfg.param4) {
//                         this.endPoint = this.p_cast.character.localTransform.transformPosition(this.cfg.param4);
//                     } else {
//                         mw.Vector.add(this.p_cast.character.worldTransform.position.clone(), forward, this.endPoint);
//                     }
//                 }

//                 this.offectDisy = mw.Vector.distance(this.fromPoint, this.endPoint) / 2
//                 mw.Vector.add(this.fromPoint.clone()
//                     .add(this.endPoint.clone())
//                     .multiply(this.offectpos), new mw.Vector(this.offectDisx, this.offectDisy, 0), this.middlePoint);
//                 this.speed = this.p_host.getValue(Attribute.EnumAttributeType.speed)
//             }

//         } else {
//             if (this.hostId > 0) {
//                 return;
//             }
//             this.p_host = this.secretAreaModuleC.getSceneUnitByID(this.hostId)
//             if (this.p_host) {

//             }
//         }
//     }

//     // private isRemove :boolean = false
//     public onUpdate(dt: number): void {
//         // oTrace("CenterBuffC onUpdate");
//         super.onUpdate(dt);

//         // //客户端不会自动销毁
//         // if(this.isRemove)
//         // {
//         //     return;
//         // }
//         // if(this.dead){
//         //     BuffManagerC.instance.removeBuffById(this.id);
//         //     return;
//         // }

//         if (this.hostId == null || isNaN(Number(this.hostId))) {
//             oTraceError("error:onUpdate uff.hostId == null ", this.hostId);
//             return;
//         }

//         //怪霸体不吸附
//         if (Number(this.hostId) < 0) {
//             this.p_host = this.p_host as SceneUnitModelBase
//             if (!this.p_host) {
//                 return;
//             }
//             // if (this.p_host.unitCfg.Stoic) {
//             //     return;
//             // }
//         }

//         this.ticker += dt
//         let t = this.ticker / this.attackTime;  // 这里是计算当前已用时间占计划用时间的百分比，当作增量t

//         //距离太近不移动
//         // oTrace("diistance====pint",mw.Vector.distance(this.fromPoint,this.endPoint));
//         // let percentmove = MathUtil.clamp(mw.Vector.distance(this.fromPoint,this.endPoint)/1000,0, 0.8);

//         t = MathUtil.clamp(t, 0, 0.8); //1

//         if (this.fromPoint == null || this.middlePoint == null || this.endPoint == null) {
//             return;
//         }

//         this.GetCurvePoint(this.fromPoint, this.middlePoint, this.endPoint, t, this.currPos);
//         // oTrace("currPos=================", this.currPos, this.fromPoint, this.middlePoint, this.endPoint)

//         if (this.currPos == null) {
//             return;
//         }

//         if (t == 1) {
//             //oTraceError("到达目标点");
//         }

//         if (Number(this.hostId) > 0) {
//             if (!this.p_host) {
//                 return;
//             }
//             let character = (this.p_host as mw.Player).character;
//             if (!character) {
//                 return;
//             }

//             character.movementEnabled = false
//             this.currPos.z = character.worldTransform.position.z
//             character.worldTransform.position = this.currPos;

//         } else {
//             this.p_host = this.p_host as SecretAreaModel;
//             if (!this.p_host) {
//                 return;
//             }
//             if (!this.p_host.model) {
//                 return;
//             }

//             this.currPos.z = this.p_host.model.worldTransform.position.z
//             this.p_host.model.worldTransform.position = this.currPos;
//         }


//     }

//     /// <summary>
//     /// 返回曲线在某一时间t上的点
//     /// </summary>
//     /// <param name="_p0">起始点</param>
//     /// <param name="_p1">中间点</param>
//     /// <param name="_p2">终止点</param>
//     /// <param name="t">当前时间t(0.0~1.0)</param>
//     /// <returns></returns>
//     public GetCurvePoint(_p0: mw.Vector, _p1: mw.Vector, _p2: mw.Vector, t: number, outVector: mw.Vector) {
//         t = MathUtil.clamp(t, 0, 1);
//         let x = ((1 - t) * (1 - t)) * _p0.x + 2 * t * (1 - t) * _p1.x + t * t * _p2.x;
//         let y = ((1 - t) * (1 - t)) * _p0.y + 2 * t * (1 - t) * _p1.y + t * t * _p2.y;
//         let z = ((1 - t) * (1 - t)) * _p0.z + 2 * t * (1 - t) * _p1.z + t * t * _p2.z;
//         //let pos = new mw.Vector(x, y, z);
//         outVector.x = x
//         outVector.y = y
//         outVector.z = z
//     }
// }



// export class CenterBuff2S extends BuffS_Base {

//     constructor(_id: number, staticConfig: BuffData, arg: any) {
//         //oTraceError("CenterBuffS===== constructor ", _id, staticConfig.id, arg);
//         super(_id, staticConfig, arg);
//     }

//     public init() {

//         super.init();

//         this.buff_center(true)
//     }

//     /**
//     * 销毁，清理
//     */
//     public destroy() {
//         //oTraceError("CenterBuffS===== Destroy");
//         super.destroy();
//         this.buff_center(false)
//     }

//     /**
//      * 中心 todo
//      */
//     private buff_center(isCreated: boolean): void {

//     }

// }