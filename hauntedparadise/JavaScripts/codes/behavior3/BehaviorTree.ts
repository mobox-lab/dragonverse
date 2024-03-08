import { BehaviorRet } from './BehaviorDefine';
import { BehaviorNode } from './BehaviorNode';


export class Environment {
    // 内部变量
    innerVars: any = {};
    // 变量
    vars: any = {};
    // 行为节点栈
    stack: BehaviorNode[] = [];
    // 上次返回值
    lastRet: BehaviorRet = null;

    constructor(params: any) {
        for (const [k, v] of Object.entries(params)) {
            this[k] = v;
        }
    }

    getVar(k: string): any {
        return this.vars[k];
    }

    setVar(k: string, v: any): void {
        if (k === '') return;
        this.vars[k] = v;
    }

    getInnerVar(node: BehaviorNode, k: string): any {
        return this.innerVars[`${k}_${node.id}`];
    }

    setInnerVar(node: BehaviorNode, k: string, v: any): void {
        this.innerVars[`${k}_${node.id}`] = v;
    }

    pushStack(node: BehaviorNode): void {
        this.stack.push(node);
    }

    popStack(): BehaviorNode | undefined {
        const node = this.stack.pop();
        return node;
    }
}

export class BehaviorTree {
    public name: string;
    public tick: number;
    public root: BehaviorNode;

    constructor(name: string, treeData: any) {
        this.name = name;
        this.tick = 0;
        const data = treeData;
        this.root = new BehaviorNode(data.root, this);
    }

    run(env: Environment): void {
        if (env.stack.length > 0) {
            let lastNode = env.stack[env.stack.length - 1];
            while (lastNode) {
                const ret = lastNode.run(env);
                if (ret === BehaviorRet.Running) {
                    break;
                }
                lastNode = env.stack[env.stack.length - 1];
            }
        } else {
            this.root.run(env);
        }
        this.tick++;
    }

    interrupt(env: Environment): void {
        if (env.stack.length > 0) {
            env.innerVars = {};
            env.stack = [];
        }
    }
}

export interface BehaviorTreeInstance {
    tree: BehaviorTree;
    env: Environment;
    run: () => void;
    interrupt: () => void;
    is_running: () => boolean;
    set_env: (k: string, v: any) => void;
}

