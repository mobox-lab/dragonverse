// import GhostDistance_UI_Generate from "../../../../ui-generate/ShareUI/GhostDistance_UI_generate";
// import { GeneralManager } from "../../../Modified027Editor/ModifiedStaticAPI";
// import { CommonUtils } from "../../../utils/CommonUtils";
// import { LanUtil } from "../../../utils/LanUtil";
// import MusicMgr from "../../../utils/MusicMgr";
// import GhostBehavoirInst from "../GhostBehavoir";
// import { GhostSettings } from "../GhostDefine";
//
// export class GhostDistanceUI extends GhostDistance_UI_Generate {
//     /**角色 */
//     private _char: mw.Character;
//     /**玩家 */
//     private _player: mw.Player;
//     /**目标位置 */
//     private _targetLoc: Vector = Vector.zero;
//     /**屏幕外的位置 */
//     private _outScreenPos: Vector2 = Vector2.zero;
//     /**临时方向向量 */
//     private _tempDirVec: Vector = Vector.zero;
//     /** Y 轴旋转角度 */
//     private _rotY: number = 0;
//     /** 追随的目标 */
//     private _target: Character
//
//     private _inst: GhostBehavoirInst;
//
//
//     /** 叫声的计时器，到0就会叫一下，目前仅提供服务给墓地 */
//     private _soundInterval: number = 0;
//
//     /**
//      * UI初始化，设置界面层级
//      */
//     onStart() {
//         this.layer = mw.UILayerTop;
//     }
//
//     /**
//      * 设置目标位置，功能为：初始化玩家和角色，设置目标位置，开启每帧更新
//      * @param loc 目标位置
//      */
//     public setTargetLoc(target: Character, bindIns: GhostBehavoirInst) {
//         this._inst = bindIns;
//         mw.UIService.showUI(this);
//         if (!this._char) {
//             this._player = Player.localPlayer;
//             this._char = this._player.character;
//         }
//         this._target = target;
//         this.canUpdate = true;
//     }
//
//     /**
//      * 咆哮
//      * @param dt
//      */
//     private shoot(dt: number) {
//         this._soundInterval -= dt;
//         if (this._soundInterval <= 0) {
//             let interval = GhostSettings.soundKeepTime;
//             this._soundInterval = MathUtil.randomFloat(interval.x, interval.y);
//             let soundids = GhostSettings.chaseSoundIds;
//             let soundId = soundids[MathUtil.randomInt(0, soundids.length)];
//             MusicMgr.instance.play(soundId, this._char);
//         }
//     }
//
//     /**
//      * 每帧执行的方法，功能为：根据玩家当前位置和目标位置，计算出任务引导箭头的方向，当玩家与目标位置距离不足1时，关闭每帧执行
//      * @param dt 时间间隔
//      */
//     onUpdate(dt: number) {
//         if (!this._inst.bindPlayerId || !this._target.worldTransform) {
//             UIService.hideUI(this);
//             return;
//         }
//         this.shoot(dt);
//         this._targetLoc.set(this._target.getSlotWorldPosition(HumanoidSlotType.Head));
//         if (!this._char || !this._char.worldTransform || !this._char.worldTransform.position) { this.canUpdate = false; return; }
//         let dis = Vector.distance(this._char.worldTransform.position, this._targetLoc) / 100;
//         // this._rotY += dt * 120;
//         // if (this._rotY > 360) {
//         //     this._rotY = 0;
//         // }
//
//         let playerPos = this._char.worldTransform.position.clone();
//         const sizeY = this.rootCanvas.size.y - 180;
//         const sizeX = this.rootCanvas.size.x - 360;
//         if (GeneralManager.modifyProjectWorldLocationToWidgetPosition(Player.localPlayer, this._targetLoc, this._outScreenPos, false)) {
//             this._outScreenPos.subtract(new Vector2(90, 160));
//             this._outScreenPos.x = MathUtil.clamp(this._outScreenPos.x, 0, sizeX)
//             this._outScreenPos.y = MathUtil.clamp(this._outScreenPos.y, 0, sizeY)
//             this.mCav.position = this._outScreenPos;
//         } else {
//
//             const vec2Offset = new Vector2(this._targetLoc.x, this._targetLoc.y)
//                 .subtract(playerPos)
//                 .normalize()
//             const forwardVec = Camera.currentCamera.worldTransform.getForwardVector()
//             const vec2Forward = new Vector2(forwardVec.x, forwardVec.y)
//             const dotResult = vec2Forward.x * vec2Offset.x + vec2Forward.y * vec2Offset.y
//
//             const rad = Math.acos(dotResult)
//             const relativeVec = new Vector2(100 * Math.cos(rad), 100 * Math.sin(rad))
//             const crossResult = this.V3Cross(new Vector(vec2Offset.x, vec2Offset.y, 0), new Vector(-forwardVec.x, -forwardVec.y, 0))
//             if (crossResult.z > 0) {
//                 relativeVec.x = 1920 - relativeVec.x
//             }
//
//             let playerScreenPos = mw.Vector2.zero
//             GeneralManager.modifyProjectWorldLocationToWidgetPosition(Player.localPlayer, playerPos, playerScreenPos, false)
//             const guideUIPos = relativeVec.add(playerScreenPos)
//             guideUIPos.x = MathUtil.clamp(guideUIPos.x, 0, sizeX)
//             guideUIPos.y = MathUtil.clamp(guideUIPos.y, 0, sizeY)
//
//             this.mCav.position = guideUIPos
//         }
//         if (dis >= 1000) {
//             this.text_distance.text = CommonUtils.formatString(LanUtil.getText("GhostDistance_01"), (dis / 1000).toFixed(2) + "km")
//         }
//         else {
//             this.text_distance.text = CommonUtils.formatString(LanUtil.getText("GhostDistance_01"), dis.toFixed(0) + "m")
//         }
//
//         // if (dis < 1) {
//         //     mw.UIService.hideUI(this);
//         //     this.canUpdate = false;
//         // }
//     }
//
//     /**
//      * 计算两个向量的叉积
//      * @param v1 向量 1
//      * @param v2 向量 2
//      * @returns 叉积结果
//      */
//     public V3Cross(v1: mw.Vector, v2: mw.Vector) {
//         let x = v1.y * v2.z - v1.z * v2.y
//         let y = v2.x * v1.z - v1.x * v2.z
//         let z = v1.x * v2.y - v1.y * v2.x
//         return new mw.Vector(x, y, z)
//     }
//
//     public clearTarget() {
//         UIService.hideUI(this);
//     }
// }