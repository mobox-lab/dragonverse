import { GameConfig } from "../../../../../config/GameConfig";
import { BehaviorType, BehaviorRet } from "../../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../../behavior3/BehaviorNode";
import { Environment } from "../../../../behavior3/BehaviorTree";
import { B3Define, NodeBase } from "../../../../behavior3/nodes/NodeBase";
import { BlackBoardModuleS } from "../../../blackboard/BlackBoardModuleS";
import { PlayerInterModuleS } from "../../../inter/PlayerInterModule";
import GhostBehavoirInst from "../../GhostBehavoir";
import { GhostSettings } from "../../GhostDefine";
import { GhostModuleS } from "../../GhostModuleS";

@regBehaviorNode()
class GhostSightCheckNode extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "检测视野范围内是否有有效玩家",
        `返回是否检测到正确的玩家`
    ).addOutput("玩家id")

    public run(node: BehaviorNode, env: Environment, arr: any[]) {
        let inst = env["inst"] as GhostBehavoirInst;
        let targetId: number = 0;
        let curTime = TimeUtil.elapsedTime();
        let timer = env.getInnerVar(node, "interval");
        if (timer >= TimeUtil.elapsedTime()) {
            return [BehaviorRet.Fail, 0];
        }
        timer = env.setInnerVar(node, "interval", TimeUtil.elapsedTime() + 0.5);
        let ghostCharPos = inst.ghostChar.worldTransform.position;
        let ghostCharFor = inst.ghostChar.worldTransform.getForwardVector();
        let allPlayers = Player.getAllPlayers();
        for (let index = 0; index < allPlayers.length; index++) {
            const e = allPlayers[index];

            if (!e.character) {
                continue;
            }
            const plyaerId = e.playerId;
            if (!ModuleService.getModule(GhostModuleS).checkCanKill(e.playerId)) {
                continue;
            }
            const charLoc = e.character.worldTransform.position;
            const degree = ModuleService.getModule(BlackBoardModuleS).reqGetBoardValue(e.playerId);
            let cfg = inst.cfgMap.get(degree);
            if (!cfg) {
                continue;
            }

            let curSafe: string = ModuleService.getModule(PlayerInterModuleS).getPlayerInterStat(e);
            if (curSafe && cfg.safePlace && cfg.safePlace.includes(curSafe)) {
                console.log("检测到玩家正在安全的地方躲避");
                continue;
            }

            let lastFindTime = inst.lastFindMap.get(e.playerId) || 0;
            let isInSage = lastFindTime + cfg.chaseCD > curTime;
            const sightParam = isInSage ? cfg.sightRangeInCD : cfg.sightRange;
            // 范围检测
            const dist = mw.Vector.distance(ghostCharPos, charLoc);
            if (dist > sightParam[0]) continue;
            // 角度检测
            if (!MathUtil.angleCheck(
                ghostCharPos,
                ghostCharFor,
                charLoc, sightParam[1])) {
                continue;
            }
            // 射线检测
            let hitResult = QueryUtil.lineTrace(ghostCharPos, charLoc,
                true, GhostSettings.openDebug, [], false, false, inst.ghostChar);

            hitResult = hitResult.filter((hit) => {
                return !(hit.gameObject instanceof mw.Trigger) && !hit.gameObject["ghostIgnore"];
            })
            if (hitResult.length > 0 && hitResult[0].gameObject == e.character) {
                targetId = plyaerId
                break;
            }
        }
        if (!targetId) {
            return [BehaviorRet.Fail, 0];
        }
        return [BehaviorRet.Success, targetId];
    }
}

@regBehaviorNode()
class GhostRandomFindNode extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "随机找到一个有效的玩家",
        `返回是否找到了合法有效的玩家`
    ).addOutput("玩家id")

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        let targetId: number = 0;
        let allPlayers = Player.getAllPlayers();
        let ghostModule = ModuleService.getModule(GhostModuleS);

        allPlayers = allPlayers.filter(e => {
            if (!ghostModule.checkCanKill(e.playerId)) {
                return false;
            }
            const degree = ModuleService.getModule(BlackBoardModuleS).reqGetBoardValue(e.playerId);
            let cfg = inst.cfgMap.get(degree);
            if (!cfg) {
                return false;
            }
            return true;
        })
        if (allPlayers.length == 0) {
            return [BehaviorRet.Fail, 0];
        }
        let rd = MathUtil.randomInt(0, allPlayers.length);
        let targetPlayer = allPlayers[rd];
        targetId = targetPlayer.playerId;
        if (!targetId) {
            return [BehaviorRet.Fail, 0];
        }
        return [BehaviorRet.Success, targetId];
    }
}


@regBehaviorNode()
class GhostCheckAttackNode extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "检查攻击",
        `
        +随机找到一与对应玩家或者位置有效的攻击资源
        +返回是否找到了有效的攻击资源`
    ).addInput("玩家id").addOutput("技能id")

    public run(node: BehaviorNode, env: Environment, targetId: number | Vector) {
        let inst = env["inst"] as GhostBehavoirInst;
        let targetPos: Vector;
        if (typeof (targetId) == "number") {
            let player = Player.getPlayer(targetId);
            if (!player) {
                return BehaviorRet.Fail;
            }
            targetPos = player.character.worldTransform.position;
        }
        else {
            targetPos = targetId
        }

        const dis = Vector.distance(targetPos, inst.ghostChar.worldTransform.position);
        let curTime = TimeUtil.elapsedTime();
        let skillNodes = inst._insCfg.skills || [];
        skillNodes = skillNodes.filter(e => {
            let endTime = inst.skillCdMap.get(e) || 0;
            if (curTime < endTime) {
                return false;
            }
            let cfg = GameConfig.GhostAttack.getElement(e);
            if (!cfg) {
                return false;
            }
            return cfg.dis >= dis;
        })
        if (skillNodes.length == 0) {
            return BehaviorRet.Fail;
        }
        return [BehaviorRet.Success, skillNodes[MathUtil.randomInt(0, skillNodes.length)]];
    }
}

