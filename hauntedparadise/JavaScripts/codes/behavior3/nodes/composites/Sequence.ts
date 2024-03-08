import { BehaviorType, BehaviorRet } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Define, NodeBase } from "../NodeBase";


@regBehaviorNode()
class Sequence extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Composite,
        "顺序执行",
        "顺序执行"
    )

    run(node: BehaviorNode, env: Environment): [BehaviorRet] {
        let [lastIndex, lastRet] = node.resume(env);

        if (lastIndex != undefined) {
            if (lastRet == BehaviorRet.Fail || lastRet == BehaviorRet.Running) {
                return [lastRet];
            } else if (lastRet == BehaviorRet.Success) {
                lastIndex = lastIndex + 1;
            } else {
                throw new Error('wrong ret');
            }
        } else {
            lastIndex = 0;
        }

        for (let i = lastIndex; i < node.children.length; i++) {
            const child = node.children[i];
            const r = child.run(env);

            if (r == BehaviorRet.Running) {
                return [node.yield(env, i)];
            }

            if (r == BehaviorRet.Fail) {
                //console.log("Sequence Fail")
                return [r];
            }
        }

        return [BehaviorRet.Success];
    }

}