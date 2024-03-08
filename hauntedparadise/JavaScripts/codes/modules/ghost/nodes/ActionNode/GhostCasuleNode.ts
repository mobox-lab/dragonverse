import { BehaviorType, BehaviorRet } from "../../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../../behavior3/BehaviorNode";
import { Environment } from "../../../../behavior3/BehaviorTree";
import { B3ArgType, B3Dec, B3Define, NodeBase } from "../../../../behavior3/nodes/NodeBase";
import { BlackBoardModuleS } from "../../../blackboard/BlackBoardModuleS";
import GhostBehavoirInst from "../../GhostBehavoir";
import { GhostNodeStat } from "../const/GhostNodeStat";

@regBehaviorNode()
class GhostStartChaseTarget extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "设置仇恨",
        `将会追逐这个目标,直接返回true`
    ).addInput("追逐的目标")

    public run(node: BehaviorNode, env: Environment, target: number) {
        if (!Player.getPlayer(target)) {
            return BehaviorRet.Success;
        }
        let inst = env["inst"] as GhostBehavoirInst;
        const degree = ModuleService.getModule(BlackBoardModuleS).reqGetBoardValue(target);
        inst.server_startChase(target, degree);
        return BehaviorRet.Success;
    }
}

/**
 * 播放动画
 */
@regBehaviorNode()
class GhostPlayPatrolAni extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "播放巡逻动画",
        `
        +播放巡逻动画，并置于巡逻状态中`
    );

    @B3Dec.ArgDec("播放的时长", B3ArgType.Number)
    public keepTime: number;

    public run(node: BehaviorNode, env: Environment, arr: any[]) {
        let inst = env["inst"] as GhostBehavoirInst;

        inst.playAni("watchAni")
        env[GhostNodeStat.PatrolStat] = TimeUtil.elapsedTime() + this.keepTime;
        return BehaviorRet.Success;
    }
}

@regBehaviorNode()
class GhostRandomFindPlayer extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "随机找玩家",
        `
        +并置为巡逻状态`
    );

    @B3Dec.ArgDec("持续时间", B3ArgType.Number)
    public keepTime: number

    public run(node: BehaviorNode, env: Environment, arr: any[]) {
        let players = Player.getAllPlayers();
        if (players.length == 0) {
            return BehaviorRet.Fail;
        }
        let inst = env["inst"] as GhostBehavoirInst;

        let rd = MathUtil.randomInt(0, players.length);
        let targetPlayer = players[rd];
        env[GhostNodeStat.IsMoving] = false;
        env[GhostNodeStat.PatrolStat] = TimeUtil.elapsedTime() + this.keepTime;
        Navigation.stopFollow(inst.ghostChar);
        Navigation.follow(inst.ghostChar, targetPlayer.character, 200, () => {
            env[GhostNodeStat.PatrolFinish] = TimeUtil.elapsedTime() + 0.1;
        })
        if (node.data.debug) {
            console.log("目前随机找了一个人跟随" + targetPlayer.playerId);
        }
        return BehaviorRet.Success;
    }
}

@regBehaviorNode()
class GhostRandomPartol extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "随机找巡逻点",
        `寻找一个巡逻点`
    );

    public run(node: BehaviorNode, env: Environment, arr: any[]) {
        let inst = env["inst"] as GhostBehavoirInst;
        let charPos = inst.ghostChar.worldTransform.position;
        let cachePosArr = env.getInnerVar(node, "cachePosArr")
        let prePos = env.getInnerVar(node, "prePos")
        if (!cachePosArr) {
            cachePosArr = inst._insCfg.patrols.slice(0);
        }
        cachePosArr.forEach(e => {
            e["charDis"] = Vector.distance(e, charPos);
        })
        cachePosArr.sort((a, b) => {
            return a["charDis"] - b["charDis"];
        });
        let min = Math.min(15, cachePosArr.length);
        let rd = MathUtil.randomInt(0, min);
        if (prePos) {
            cachePosArr.push(prePos);
        }

        prePos = cachePosArr[rd];

        if (cachePosArr.length > 1) {
            cachePosArr.splice(rd, 1);
            env.setInnerVar(node, "prePos", prePos)
            env.setInnerVar(node, "cachePosArr", cachePosArr);
        }
        if (node.data.debug) {
            console.log("目前随机找了一个点去巡逻");
        }
        env[GhostNodeStat.IsMoving] = true;
        Navigation.stopFollow(inst.ghostChar);
        Navigation.navigateTo(inst.ghostChar, prePos, 50, () => {
            env.setInnerVar(node, "failCount", 0);
            env[GhostNodeStat.IsMoving] = false;
            env[GhostNodeStat.PatrolFinish] = TimeUtil.elapsedTime() + 0.1;
        }, () => {
            let failCount = env.getInnerVar(node, "failCount") || 0;
            env.setInnerVar(node, "failCount", failCount + 1);
            if (failCount >= 4) {
                inst.ghostChar.worldTransform.position = Vector.add(inst._insCfg.patrols[0], Vector.up.multiply(50));
            }
            env[GhostNodeStat.IsMoving] = false;
            env[GhostNodeStat.PatrolStat] = TimeUtil.elapsedTime() + 3;
            console.error("[GhostChar]不能移动到目标点位" + inst._insCfg.id + ":" + prePos)
            let dir = Vector.subtract(prePos, inst.ghostChar.worldTransform.position);
            dir.z = 0;
            dir.normalize();
            inst.bindDir = dir.toRotation();
        });

        return BehaviorRet.Success;
    }
}

