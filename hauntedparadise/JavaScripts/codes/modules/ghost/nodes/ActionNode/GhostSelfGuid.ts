import { BehaviorType, BehaviorRet } from "../../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../../behavior3/BehaviorNode";
import { Environment } from "../../../../behavior3/BehaviorTree";
import { B3Define, NodeBase } from "../../../../behavior3/nodes/NodeBase";
import GhostBehavoirInst from "../../GhostBehavoir";

@regBehaviorNode()
class GhostSelfGuid extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "获取自身guid",
        `返回自己的guid`
    ).addOutput("自己的唯一id")

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        return [BehaviorRet.Success, inst.gameObject.gameObjectId];
    }
}
@regBehaviorNode()
class GhostTargetId extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "获取自身目标id",
        `返回自己的目标的id`
    ).addOutput("正在追逐的目标id")

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        return [BehaviorRet.Success, inst.targetId];
    }
}
@regBehaviorNode()
class GhostBindPlayerId extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "获取绑定的玩家id",
        `
        +返回绑定的玩家id
        +只有特定的游戏可以用（例如惊魂岛）
        `
    ).addOutput("正在追逐的目标id")

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        return [BehaviorRet.Success, inst.bindPlayerId];
    }
}
