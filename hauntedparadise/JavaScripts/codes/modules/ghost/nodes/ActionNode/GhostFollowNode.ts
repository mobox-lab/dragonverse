// import { GameConfig } from "../../../../../config/GameConfig";
// import GameStart, { EGameTheme } from "../../../../GameStart";
// import { BehaviorType, BehaviorRet } from "../../../../behavior3/BehaviorDefine";
// import { regBehaviorNode } from "../../../../behavior3/BehaviorManager";
// import { BehaviorNode } from "../../../../behavior3/BehaviorNode";
// import { Environment } from "../../../../behavior3/BehaviorTree";
// import { B3Define, NodeBase } from "../../../../behavior3/nodes/NodeBase";
// import { PlayerInterModuleS } from "../../../inter/PlayerInterModule";
// import GhostBehavoirInst from "../../GhostBehavoir";
//
// @regBehaviorNode()
// class GhostChaseTarget extends NodeBase {
//     define: B3Define = new B3Define(
//         BehaviorType.Action,
//         "追逐目标",
//         `将会追逐这个目标,直接返回true`
//     ).addInput("追逐的目标")
//
//     public run(node: BehaviorNode, env: Environment, target: number) {
//         if (!Player.getPlayer(target)) {
//             return BehaviorRet.Success;
//         }
//         let inst = env["inst"] as GhostBehavoirInst;
//         let timer = env.getInnerVar(node, "interval");
//
//         if (timer >= TimeUtil.elapsedTime()) {
//             return BehaviorRet.Success;
//         }
//         timer = env.setInnerVar(node, "interval", TimeUtil.elapsedTime() + 0.4);
//         const player = Player.getPlayer(target);
//         if (!player) {
//             return BehaviorRet.Success;
//         }
//         let pos = ModuleService.getModule(PlayerInterModuleS).getPlayerPos(player.character);
//         let dis = inst._cfg.attackMode <= 0 ? 80 : 10;
//         let predir = inst.bindDir;
//         let presuc = env.getInnerVar(node, "presuc");
//         env.setInnerVar(node, "presuc", true);
//         const ghostcharpos = inst.ghostChar.worldTransform.position;
//         if (pos.z - ghostcharpos.z > 100) {
//             ghostcharpos.z = pos.z;
//             inst.ghostChar.worldTransform.rotation = Vector.subtract(pos, ghostcharpos).toRotation();
//             if (Vector.squaredDistance(ghostcharpos, pos) < 25000) {
//                 inst.moveProxy.jump(inst.ghostChar);
//             }
//         }
//         if (GameStart.GameTheme == EGameTheme.Graveyard) {
//             inst.moveProxy.failFunc(inst.ghostChar);
//         }
//         Navigation.navigateTo(inst.ghostChar, pos, dis, () => {
//             inst.bindDir = null;
//             if (Vector.distance(inst.ghostChar.worldTransform.position, pos) >= 200) {
//                 inst.moveProxy.failFunc(inst.ghostChar);
//             }
//         }, () => {
//             let newDir = Vector.subtract(player.character.worldTransform.position, inst.ghostChar.worldTransform.position);
//             newDir.z = 0;
//             inst.bindDir = newDir.toRotation();
//             env.setInnerVar(node, "presuc", false);
//         });
//         if (!presuc) {
//             inst.bindDir = predir;
//         }
//         return BehaviorRet.Success;
//     }
// }
//
// @regBehaviorNode()
// class GhostClearTarget extends NodeBase {
//     define: B3Define = new B3Define(
//         BehaviorType.Action,
//         "退出追逐",
//         `将会停止追逐目标,直接返回true`
//     )
//
//     public run(node: BehaviorNode, env: Environment) {
//         let inst = env["inst"] as GhostBehavoirInst;
//         inst.server_exitChase();
//         return BehaviorRet.Success;
//     }
// }
//
//
//
// @regBehaviorNode()
// class GhostAttackTarget extends NodeBase {
//     define: B3Define = new B3Define(
//         BehaviorType.Action,
//         "攻击技能释放",
//         `将会释放攻击技能，并造成伤害，直接返回true,释放成功后会处于PlayMelee状态`
//     ).addInput("技能id", "朝向的目标")
//
//     public run(node: BehaviorNode, env: Environment, skillId: number, targetid: number | Vector) {
//         if (!skillId) {
//             return;
//         }
//         let inst = env["inst"] as GhostBehavoirInst;
//         let cfg = GameConfig.GhostAttack.getElement(skillId);
//         if (!cfg) {
//             return BehaviorRet.Success;
//         }
//         if (typeof (targetid) == "number") {
//             let player = Player.getPlayer(targetid);
//             if (!player) {
//                 return BehaviorRet.Success;
//             }
//             let dir = Vector.subtract(player.character.worldTransform.position, inst.ghostChar.worldTransform.position);
//             dir.z = 0;
//             inst.ghostChar.worldTransform.rotation = dir.toRotation();
//             inst.ser_attack(skillId);
//             return BehaviorRet.Success;
//         }
//         else {
//             let dir = Vector.subtract(targetid, inst.ghostChar.worldTransform.position);
//             dir.z = 0;
//             inst.ghostChar.worldTransform.rotation = dir.toRotation();
//             inst.ser_attack(skillId);
//             return BehaviorRet.Success;
//         }
//
//     }
// }
//
