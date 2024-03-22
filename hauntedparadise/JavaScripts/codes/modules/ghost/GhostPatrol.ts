// import { CeHuaDefines } from "../../CehuaDefines";
// import { WaitLoop } from "../../utils/AsyncTool";
//
// export class GhostPatrol {
//     private _effect: Effect;
//
//     private _timer: number = 0;
//
//     private _curScale: Vector = Vector.one;
//
//     private _enable: boolean = false;
//
//     public async init() {
//         this._effect = await GameObject.asyncSpawn(CeHuaDefines.GhostPatrol) as Effect;
//         this._effect.worldTransform.position = CeHuaDefines.GhostPatrolPosition;
//         this._effect.worldTransform.rotation = CeHuaDefines.GhostPatrolRotation;
//         this._effect.setCullDistance(999999999);
//         this._effect.setVisibility(PropertyStatus.Off, true);
//     }
//
//     async start(syncTime: number) {
//         if (syncTime > CeHuaDefines.GhostPatrolKeepTime) {
//             return;
//         }
//         this._timer = syncTime;
//         this._enable = true;
//         if (!this._effect) { await WaitLoop.loop(() => { return this._effect }, 1e2, 50) }
//         if (!this._effect) { return; }
//         this._effect.worldTransform.scale = CeHuaDefines.GhostPatrolStartScale;
//         this._effect.setVisibility(PropertyStatus.On, true);
//         this._effect.loop = true;
//         this._effect.play();
//     }
//
//     onupdate(dt: number) {
//         if (!this._enable) {
//             return;
//         }
//         this._timer += dt;
//         let percent = this._timer / CeHuaDefines.GhostPatrolScaleTime;
//         percent = Math.min(percent, 1);
//         this._effect.worldTransform.scale = Vector.lerp(CeHuaDefines.GhostPatrolStartScale, CeHuaDefines.GhostPatrolScale, percent, this._curScale);
//         percent = this._timer / CeHuaDefines.GhostPatrolKeepTime;
//         if (percent >= 1) {
//             this._enable = false;
//             this._effect.setVisibility(PropertyStatus.Off, true);
//         }
//     }
// }