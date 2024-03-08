import { BehaviorTree, BehaviorTreeInstance, Environment } from "./BehaviorTree";
import { B3Dec, B3Define, NodeBase } from "./nodes/NodeBase";

/** 节点实例 */
export const nodeDecorator: Map<string, NodeBase> = new Map<string, NodeBase>();

const deportDecorator: Map<string, B3Define> = new Map();

/** 
 * 节点装饰器
 */
export function regBehaviorNode() {
    return function <T extends { new(...args: any[]): NodeBase }>(constructor: T): T {
        console.log("add node2:" + constructor.name)
        const node = new constructor();
        console.log("add node3:" + constructor.name)
        if (!node.define) {
            console.error("节点没有定义define:" + constructor.name);
            return;
        }
        node.define["name"] = constructor.name;
        if (nodeDecorator.get(node.define["name"])) {
            console.error("睁大你的眼~节点名字重复了" + node.define["name"] + ":" + constructor.name)
            node.define["name"] = node.define["name"] + "_";
        }
        node.define["args"] = B3Dec.serMap.get(constructor.name);
        nodeDecorator.set(node.define["name"], node);
        deportDecorator.set(node.define["name"], node.define);
        return constructor;
    }
}

function newTree(name: string, treeData: any): BehaviorTree {
    const tree = new BehaviorTree(name, treeData);
    trees[name] = tree;
    return tree;
}

const trees: { [key: string]: BehaviorTree } = {};

export const BehaviorTreeManager = {
    new(name: string, treeData: any, envParams: any): BehaviorTreeInstance {
        const env = new Environment(envParams);
        const tree = trees[name] || newTree(name, treeData);
        return {
            env: env,
            tree,
            run: () => tree.run(env),
            interrupt: () => tree.interrupt(env),
            is_running: () => env.stack.length > 0,
            set_env: (k, v) => {
                if (k === '') return;
                env[k] = v;
            },
        };
    },
};

if (SystemUtil.isPIE && SystemUtil.isServer()) {
    setTimeout(() => {
        let res = [];
        deportDecorator.forEach(e => {
            res.push(e);
        })

        console.log("[Behavior3Manager] OutputNodes " + JSON.stringify(res).length);
        DataStorage.asyncSetData("_BehaviorTreeNodes", res);
    }, 1)
}
