import { BehaviorRet } from "./BehaviorDefine";
import { nodeDecorator } from "./BehaviorManager";
import { BehaviorTree, Environment } from "./BehaviorTree";
import { B3Dec } from "./nodes/NodeBase";

export class BehaviorNode {
    public static isOpenLog: boolean = false;

    public tree: BehaviorTree;
    public name: string;
    public id: string;
    public info: string;
    public data: any;
    public args: any[];
    public children: BehaviorNode[];

    constructor(nodeData: any, tree: BehaviorTree) {
        this.tree = tree;
        this.name = nodeData.name;
        this.id = nodeData.id;
        this.info = `node ${tree.name}.${this.id} ${this.name}`;

        this.data = nodeData;
        this.args = this.data.args || [];
        this.children = [];
        for (const childData of nodeData.children || []) {
            const child = new BehaviorNode(childData, tree);
            this.children.push(child);
        }
    }

    run(env: Environment): BehaviorRet {
        if (env.getInnerVar(this, "YIELD") == undefined) {
            env.pushStack(this);
        }

        let vars: any[] = [];
        for (let i = 0; i < (this.data.input || []).length; i++) {
            vars[i] = env.getVar(this.data.input[i]);
        }
        let ins = nodeDecorator.get(this.name)
        if (!ins) {
            console.error("有不存在的行为树节点" + this.name)
        }
        let out: any[] | BehaviorRet;
        ins.define["args"] && ins.define["args"].forEach(e => {
            ins[e.name] = this.args[e.name]
        });
        try {
            if (this.data.input) {
                out = ins.run(this, env, ...vars.slice(0, this.data.input.length));
            } else {
                out = ins.run(this, env, ...vars);
            }
        } catch (error) {
            out = BehaviorRet.Fail;
            console.error("行为树节点报错" + this.name + ":" + error.stack);
        }
        if (out instanceof Array) {
            if (!out) {
                throw new Error(this.info);
            }
        }
        const ret: BehaviorRet = (out instanceof Array) ? out[0] : out;

        if (ret !== BehaviorRet.Running) {
            env.setInnerVar(this, "YIELD", undefined);
            env.popStack();
        } else if (env.getInnerVar(this, "YIELD") == undefined) {
            env.setInnerVar(this, "YIELD", true);
        }

        for (let i = 0; i < (this.data.output || []).length; i++) {
            env.setVar(this.data.output[i], out[i + 1]);
        }

        env.lastRet = ret;

        this.data.debug = this.data.debug && BehaviorNode.isOpenLog;
        if (this.data.debug) {
            let varStr = '';
            for (const [k, v] of Object.entries(env.vars)) {
                varStr += `[${k}]=${v},`;
            }
            console.log(
                `[DEBUG] btree:${this.tree.name}, node:${this.id}, ret:${ret} vars:{${varStr}}`
            );
        }

        return ret;
    }

    yield(env: any, arg: any = false): any {
        env.setInnerVar(this, "YIELD", arg);
        return BehaviorRet.Running;
    }

    resume(env: any): [number, BehaviorRet] {
        return [env.getInnerVar(this, "YIELD"), env.lastRet];
    }
}
