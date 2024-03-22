// import { BoardHelper, BoardKeys } from "../../blackboard/BoardDefine";
// import { GhostLogicState, GhostSettings } from "../GhostDefine";
// import GhostInst from "../GhostInst";
// import { GhostComDefine } from "./GhostComDefine";
// import { BaseGhostCheckCom } from "./base/IGhostCom";
//
// /**
//  * 鬼的视线检测组件
//  */
// export class ClientCheckCom extends BaseGhostCheckCom {
//     onUpdate(dt: number): void {
//         if (this.ctl.logicState == GhostLogicState.Chase) return;
//         let curSafe: string = BoardHelper.GetTargetKeyValue(BoardKeys.PlayerSafeStat);
//         if (curSafe && this.ctl._cfg.safePlace && this.ctl._cfg.safePlace.includes(curSafe)) {
//             console.log("检测到玩家正在安全的地方躲避")
//             return;
//         }
//         if (BoardHelper.GetTargetKeyValue(BoardKeys.PlayerInvincible)) {
//             // console.log("检测到玩家无敌状态");
//             return;
//         }
//
//         let itemStat = BoardHelper.GetTargetKeyValue(BoardKeys.SpeicialItemStat);
//         if (this.ctl._cfg.goodMed && itemStat && itemStat != "" && this.ctl._cfg.goodMed.includes(itemStat)) {
//             console.log("检测到玩家嗑药了,但是它磕的是好药");
//             return;
//         }
//         const sightParam = this.ctl.isInSage ? this.ctl._cfg.sightRangeInCD : this.ctl._cfg.sightRange;
//         // 范围检测
//         const dist = mw.Vector.distance(this.ctl.ghostChar.worldTransform.position, this.ctl._clientChar.worldTransform.position);
//         if (dist > sightParam[0]) return;
//         // 角度检测
//         if (!MathUtil.angleCheck(this.ctl.ghostChar.worldTransform.position,
//             this.ctl.ghostChar.worldTransform.getForwardVector(),
//             this.ctl._clientChar.worldTransform.position, sightParam[1])) {
//             return;
//         }
//         //console.log("开始尝试检测玩家")
//         // 射线检测
//         let hitResult = QueryUtil.lineTrace(this.ctl.ghostChar.worldTransform.position, this.ctl._clientChar.worldTransform.position,
//             true, GhostSettings.openDebug, [], false, false, this.ctl.ghostChar);
//
//         hitResult = hitResult.filter((hit) => {
//             return !(hit.gameObject instanceof mw.Trigger) && !hit.gameObject["ghostIgnore"];
//         })
//         if (hitResult.length > 0 && hitResult[0].gameObject == Player.localPlayer.character) {
//             this.ctl.server_startChase(this.ctl._clientPlayer.playerId, Number(BoardHelper.GetTargetKeyValue(BoardKeys.Degree)));
//             console.log("这个玩家被鬼看到了，要被鬼追。")
//         }
//     }
// }
// GhostComDefine.clientGhostCheckComMap.set(1, ClientCheckCom);
//
// /**
//  * 嗑药的环形检测
//  */
// export class ClientCircleCheckCom extends BaseGhostCheckCom {
//     private _itemStat: string = "";
//     private _sightParam: number = 1000;
//
//     public constructor(ctl: GhostInst) {
//         super(ctl);
//     }
//
//     onEnter(index: number): void {
//         let params = this.ctl._cfg.specialCheck[index];
//         if (!params) {
//             return;
//         }
//         this._itemStat = params[0].toString();
//         this._sightParam = params[1];
//     }
//
//     onUpdate(dt: number): void {
//         if (this.ctl.logicState == GhostLogicState.Chase) {
//             return;
//         }
//         let itemStat = BoardHelper.GetTargetKeyValue(BoardKeys.SpeicialItemStat);
//         if (itemStat != this._itemStat) {
//             return;
//         }
//         console.log("检测到玩家嗑药了，要尝试追它");
//         let curSafe: string = BoardHelper.GetTargetKeyValue(BoardKeys.PlayerSafeStat);
//         if (curSafe && this.ctl._cfg.safePlace && this.ctl._cfg.safePlace.includes(curSafe)) {
//             console.log("检测到玩家正在安全的地方躲避");
//             return;
//         }
//         // 范围检测
//         const dist = mw.Vector.distance(this.ctl.ghostChar.worldTransform.position, this.ctl._clientChar.worldTransform.position);
//         if (dist > this._sightParam) {
//             return;
//         }
//         this.ctl.server_startChase(this.ctl._clientPlayer.playerId, Number(BoardHelper.GetTargetKeyValue(BoardKeys.Degree)));
//         console.log("检测到玩家嗑药了，要让服务器追它");
//     }
// }
// GhostComDefine.clientGhostCheckComMap.set(2, ClientCircleCheckCom);
//
// /**
//  * 视野检测
//  */
// export class ScreenPosCheck extends BaseGhostCheckCom {
//     private _preIsCanSee: boolean = undefined;
//
//     public get updateInterval(): number {
//         return 0.2;
//     }
//
//     onUpdate(dt: number): void {
//         if (!this.ctl["_petAniCtl"]) {
//             return;
//         }
//         this.ctl["_petAniCtl"].setIsStop2Play();
//         if (this.ctl.logicState != GhostLogicState.Chase) {
//             this._preIsCanSee = undefined;
//             return;
//         }
//         if (!this.ctl.chaseArray.includes(Player.localPlayer.playerId)) {
//             this._preIsCanSee = undefined;
//             return;
//         }
//         let projectRes = InputUtil.projectWorldPositionToWidgetPosition(this.ctl.ghostChar.worldTransform.position);
//         let ghostPos = projectRes.screenPosition.multiply(getViewportScale());
//         let viewPos = getViewportSize();
//         //console.log(viewPos + ":" + ghostPos);
//         let isCanSee = false;
//         if (ghostPos.x > 0 && ghostPos.y > 0 && (ghostPos.x < viewPos.x || ghostPos.y < viewPos.y)) {
//             isCanSee = true;
//         }
//         else {
//             isCanSee = false;
//         }
//         if (isCanSee == this._preIsCanSee) {
//             return;
//         }
//         this._preIsCanSee = isCanSee;
//         if (this._preIsCanSee) {
//             this.ctl["_petAniCtl"].pauseAnimation();
//             this.ctl.server_setClientSee(this.ctl._clientPlayer.playerId, true, 0);
//             console.log("检测到玩家看到鬼了，要停止服务器的移动");
//         }
//         else {
//             //this.ctl["_petAniCtl"].continueAnimation();
//             this.ctl.server_setClientSee(this.ctl._clientPlayer.playerId, false, Number(BoardHelper.GetTargetKeyValue(BoardKeys.Degree)));
//             console.log("检测到玩家没有看到鬼，要让服务器追它");
//         }
//     }
// }
//
// GhostComDefine.clientGhostCheckComMap.set(3, ScreenPosCheck);
// export const GhostBananeEvt = "GhostBananeEvt";
// /**
//  * 香蕉检测
//  */
// export class BananeCheck extends BaseGhostCheckCom {
//     private _itemId: number = 0;
//
//     onEnter(index: number): void {
//         console.log("初始化了香蕉检测")
//         Event.addLocalListener(GhostBananeEvt, this.checkBananeGo.bind(this));
//         let params = this.ctl._cfg.specialCheck[index];
//         if (!params) {
//             return;
//         }
//         this._itemId = params[0];
//     }
//
//     private checkBananeGo(go: GameObject, isEffectChase: boolean, cfgId: number) {
//         if (this._itemId != cfgId) {
//             return;
//         }
//         let goPos = go.worldTransform.position.clone();
//         let hitRes = QueryUtil.lineTrace(this.ctl.ghostChar.worldTransform.position, goPos, true, true);
//         console.log("开始检测香蕉");
//         hitRes = hitRes.filter(e => {
//             if (e.gameObject instanceof Trigger || e.gameObject instanceof Character || e.gameObject["ghostIgnore"]) {
//                 return false;
//             }
//             return true;
//         })
//         if (hitRes.length == 0) {
//             return;
//         }
//         const dis = Vector.distance(hitRes[0].position, go.worldTransform.position)
//         console.log("bananeDis" + dis);
//         if (hitRes[0].gameObject.gameObjectId == go.gameObjectId || dis < 100) {
//             console.log("检测到了香蕉")
//             this.ctl.lead2Pos(goPos, isEffectChase);
//         }
//
//     }
// }
//
// GhostComDefine.clientGhostCheckComMap.set(4, BananeCheck);
