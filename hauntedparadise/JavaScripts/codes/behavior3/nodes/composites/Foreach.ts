
// import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
// import { regBehaviorNode } from "../../BehaviorManager";
// import { BehaviorNode } from "../../BehaviorNode";
// import { Environment } from "../../BehaviorTree";
// import { B3Arg, B3ArgType, NodeBase } from "../NodeBase";

// @regBehaviorNode()
// export class ForEachNode extends NodeBase {
//     name: 'ForEach';
//     type = BehaviorType.Composite;
//     desc: '遍历数组';
//     input = ["[{数组}]"]; // 假设输入参数为数组类型
//     output = ["{变量}"]; // 假设输出参数为变量类型
//     doc: `
//         + 每次执行子节点前会设置当前遍历到的变量
//         + 会执行所有子节点
//         + 永远返回成功/正在运行
//     `;

//     public run(node: BehaviorNode, env: any, arr: any[]) {
//         const [resumeData, resumeRet] = node.resume(env);
//         let lastI = 1;
//         let lastJ = 1;
//         if (resumeData) {
//             lastI = resumeData[0];
//             lastJ = resumeData[1];
//             if (resumeRet === BehaviorRet.Running) {
//                 return;
//             } else {
//                 lastJ++;
//                 if (lastJ > node.children.length) {
//                     lastJ = 1;
//                     lastI++;
//                 }
//             }
//         }

//         for (let i = lastI; i <= arr.length; i++) {
//             const varValue = arr[i];
//             env.setVar(node.args[0], varValue);
//             for (let j = lastJ; j <= node.children.length; j++) {
//                 const child = node.children[j];
//                 const r = child.run(env);
//                 if (r === BehaviorRet.Running) {
//                     return node.yield(env, [i, j]);
//                 }
//             }
//         }
//         return BehaviorRet.Success;
//     }

// }
