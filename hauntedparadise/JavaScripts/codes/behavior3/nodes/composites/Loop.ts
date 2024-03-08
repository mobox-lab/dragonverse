
import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, B3Dec, B3Define, NodeBase } from "../NodeBase";
//TODO:验证
@regBehaviorNode()
class Loop extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Composite,
        "循环执行",
        "循环执行")
        .addInput("次数(int)?")

    public run(node: BehaviorNode, env: any, countString: string) {
        let count = Number(countString);
        const [resumeData, resumeRet] = node.resume(env);
        let lastI = 1;
        let lastJ = 1;

        if (resumeData) {
            lastI = resumeData[0];
            lastJ = resumeData[1];
            if (resumeRet === BehaviorRet.Running) {
                return;
            } else {
                lastJ++;
                if (lastJ > node.children.length) {
                    lastJ = 1;
                    lastI++;
                }
            }
        }

        for (let i = lastI; i <= count; i++) {
            for (let j = lastJ; j <= node.children.length; j++) {
                const child = node.children[j];
                const r = child.run(env);
                if (r === BehaviorRet.Running) {
                    return node.yield(env, [i, j]);
                }
            }
        }
        return BehaviorRet.Success;
    }

}
