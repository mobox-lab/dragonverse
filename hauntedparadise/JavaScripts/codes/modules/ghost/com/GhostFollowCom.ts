// import { BlackBoardModuleS } from "../../blackboard/BlackBoardModuleS";
// import { CatHeadModuleS } from "../../catHead/CatHeadModule";
// import { PlayerInterModuleS } from "../../inter/PlayerInterModule";
// import { GhostLogicState, GhostMoveState } from "../GhostDefine";
// import GhostInst from "../GhostInst";
// import { GhostComDefine } from "./GhostComDefine";
// import { BaseGhostCom } from "./base/IGhostCom";
//
// export class GhostNormalFollowCom extends BaseGhostCom {
//     private _updateTimer: number = 0;
//
//     public constructor(ctl: GhostInst) {
//         super(ctl);
//
//     }
//
//     onEnter() {
//         this.ctl.setChaseConfigs();
//         console.log("enter follow", this.ctl.targetId);
//         const player = Player.getPlayer(this.ctl.targetId);
//         this.ctl.logicStateTimer = this.ctl.targetData.cfg.existChaseTime;
//         setTimeout(() => {
//             let pos = ModuleService.getModule(PlayerInterModuleS).getPlayerPos(player.character);
//             Navigation.navigateTo(this.ctl.ghostChar, pos);
//         }, 1);
//
//         this.ctl.moveState = GhostMoveState.Follow;
//     }
//
//     onUpdate(dt: number) {
//         this._updateTimer += dt;
//         if (this._updateTimer < 0.4) {
//             return;
//         }
//         this._updateTimer = 0;
//         const player = Player.getPlayer(this.ctl.targetId);
//         if (!player) {
//             this.ctl.server_exitChase();
//             return;
//         }
//         let pos = ModuleService.getModule(PlayerInterModuleS).getPlayerPos(player.character);
//         Navigation.navigateTo(this.ctl.ghostChar, pos);
//         const dis = Vector.distance(pos, this.ctl.ghostChar.worldTransform.position);
//         if (dis < 100) {
//             console.log("已经达到了目标点")
//             this.ctl.server_exitChase();
//             if (!ModuleService.getModule(PlayerInterModuleS).getPlayerIsInter(player)) {
//                 return
//             }
//             this.ctl.cli_checkGhostCatch(player);
//         }
//     }
//
//     onExit() {
//         console.log("exit follow", this.ctl.targetId);
//         Navigation.stopFollow(this.ctl.ghostChar);
//         Navigation.stopNavigateTo(this.ctl.ghostChar);
//     }
// }
//
// /**
//  * 当被看到的时候不移动，未被指定客户端看到移动
//  */
// export class GhostVisFollowCom extends BaseGhostCom {
//     private _updateTimer: number = 0;
//
//     private _isCanMove: boolean = false;
//
//     public constructor(ctl: GhostInst) {
//         super(ctl);
//         GameObject.asyncFindGameObjectById(this.ctl._cfg.chaseParams[0]).then(go => {
//             let trigger = go as Trigger;
//             trigger.onEnter.add((char: GameObject) => {
//                 if (!(char instanceof Character) || !char.player) {
//                     return;
//                 }
//                 if (this.ctl.chaseArray.includes(char.player.playerId)) {
//                     return;
//                 }
//                 this.ctl.chaseArray.push(char.player.playerId);
//                 if (this.ctl.chaseArray.length == 1) {
//                     this.ctl.setEnable(true);
//                 }
//                 this.ctl.syncChaseArray(this.ctl.chaseArray);
//                 this.selecteChaseTarget();
//             })
//
//             trigger.onLeave.add((char: GameObject) => {
//                 if (!(char instanceof Character) || !char.player) {
//                     return;
//                 }
//                 let seeIndex = this.ctl.canSeeArray.indexOf(char.player.playerId);
//                 if (seeIndex != -1) {
//                     this.ctl.canSeeArray.splice(seeIndex, 1);
//                 }
//                 let index = this.ctl.chaseArray.indexOf(char.player.playerId)
//                 if (index == -1) {
//                     return;
//                 }
//                 this.ctl.chaseArray.splice(index, 1);
//                 this.ctl.syncChaseArray(this.ctl.chaseArray);
//                 this.selecteChaseTarget();
//             })
//         })
//         Player.onPlayerLeave.add(this.onPlayerLeave.bind(this))
//     }
//
//     onPlayerLeave(player: Player) {
//         try {
//             let chaseIndex = this.ctl.chaseArray.indexOf(player.playerId);
//             if (chaseIndex != -1) {
//                 this.ctl.chaseArray.splice(chaseIndex, 1);
//                 this.selecteChaseTarget();
//             }
//             let seeIndex = this.ctl.canSeeArray.indexOf(player.playerId);
//             if (seeIndex != -1) {
//                 this.ctl.canSeeArray.splice(seeIndex, 1);
//             }
//         } catch (error) {
//             console.error("error when player leave")
//         }
//     }
//
//     private selecteChaseTarget() {
//         if (this.ctl.chaseArray.length == 0) {
//             this.ctl.logicSM.switch(GhostLogicState.Casual);
//             return;
//         }
//         if (this.ctl.logicSM.getState() != GhostLogicState.Chase) {
//             this.ctl.logicSM.switch(GhostLogicState.Chase);
//             return;
//         }
//
//         let targetId = this.ctl.chaseArray[0]
//         if (targetId == this.ctl.targetId) {
//             return;
//         }
//         let player = Player.getPlayer(targetId);
//         if (!player) {
//             let index = this.ctl.chaseArray.indexOf(player.playerId)
//             if (index == -1) {
//                 return;
//             }
//             this.ctl.chaseArray.splice(index, 1);
//             this.selecteChaseTarget();
//             return;
//         }
//         this.ctl.targetId = targetId;
//         this.ctl.targetData.setData(player, ModuleService.getModule(BlackBoardModuleS).reqGetBoardValue(player.playerId), this.ctl._cfg.ghostId);
//         this.ctl.setChaseConfigs();
//         this._isCanMove = undefined;
//     }
//
//     onEnter() {
//         console.log("enter follow", this.ctl.targetId);
//         this.ctl.logicStateTimer = 9999;
//         this.ctl.moveState = GhostMoveState.Follow;
//         this.selecteChaseTarget();
//     }
//
//     onUpdate(dt: number) {
//         let curMoveAble = this.ctl.canSeeArray.length == 0;
//         if (curMoveAble != this._isCanMove) {
//             this._isCanMove = curMoveAble;
//             Navigation.stopNavigateTo(this.ctl.ghostChar);
//             console.log("目前鬼是否可以移动" + curMoveAble)
//         }
//         if (!this._isCanMove) {
//             return;
//         }
//         this._updateTimer += dt;
//         if (this._updateTimer < 0.4) {
//             return;
//         }
//         this._updateTimer = 0;
//         this.nav2TargetPos();
//     }
//
//     nav2TargetPos() {
//         const player = Player.getPlayer(this.ctl.targetId);
//         let pos = ModuleService.getModule(PlayerInterModuleS).getPlayerPos(player.character);
//         pos.z = this.ctl.ghostChar.worldTransform.position.z;
//         Navigation.navigateTo(this.ctl.ghostChar, pos, 20);
//         //console.log(pos);
//         const dis = Vector.distance(pos, this.ctl.ghostChar.worldTransform.position);
//         if (dis < 20) {
//             console.log("已经达到了目标点")
//             this.ctl.server_exitChase();
//             if (!ModuleService.getModule(PlayerInterModuleS).getPlayerIsInter(player)) {
//                 return
//             }
//             this.ctl.cli_checkGhostCatch(player);
//         }
//     }
//
//     onExit() {
//         console.log("exit follow", this.ctl.targetId);
//         Navigation.stopFollow(this.ctl.ghostChar);
//         Navigation.stopNavigateTo(this.ctl.ghostChar);
//     }
// }
//
// export class GhostCatHeadFollowCom extends BaseGhostCom {
//     private _updateTimer: number = 0;
//
//     public constructor(ctl: GhostInst) {
//         super(ctl);
//
//     }
//
//     onEnter() {
//         this.ctl.setChaseConfigs();
//         console.log("enter catHeadFollow", this.ctl.targetId);
//         const player = Player.getPlayer(this.ctl.targetId);
//         this.ctl.logicStateTimer = 9999;
//         setTimeout(() => {
//             let pos = ModuleService.getModule(PlayerInterModuleS).getPlayerPos(player.character);
//             Navigation.navigateTo(this.ctl.ghostChar, pos);
//         }, 1);
//
//         this.ctl.moveState = GhostMoveState.Follow;
//     }
//
//     onUpdate(dt: number) {
//         this._updateTimer += dt;
//         if (this._updateTimer < 0.4) {
//             return;
//         }
//         this._updateTimer = 0;
//         const player = Player.getPlayer(this.ctl.targetId);
//         /** if this player enter cat safe places */
//         if (ModuleService.getModule(CatHeadModuleS).getIsPlayerSafe(player.playerId)) {
//             this.ctl.server_exitChase();
//             return;
//         }
//         let pos = ModuleService.getModule(PlayerInterModuleS).getPlayerPos(player.character);
//         Navigation.navigateTo(this.ctl.ghostChar, pos);
//         const dis = Vector.distance(pos, this.ctl.ghostChar.worldTransform.position);
//         if (dis < 100) {
//             console.log("已经达到了目标点")
//             this.ctl.server_exitChase();
//             if (!ModuleService.getModule(PlayerInterModuleS).getPlayerIsInter(player)) {
//                 return
//             }
//             this.ctl.cli_checkGhostCatch(player);
//         }
//     }
//
//     onExit() {
//         console.log("exit follow", this.ctl.targetId);
//         Navigation.stopFollow(this.ctl.ghostChar);
//         Navigation.stopNavigateTo(this.ctl.ghostChar);
//     }
// }
//
// GhostComDefine.serverGhostFollowComMap.set(1, GhostNormalFollowCom);
// GhostComDefine.serverGhostFollowComMap.set(2, GhostVisFollowCom);
// GhostComDefine.serverGhostFollowComMap.set(3, GhostCatHeadFollowCom);
