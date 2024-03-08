import { BehaviorRet, BehaviorType } from "../BehaviorDefine";
import { BehaviorNode } from "../BehaviorNode";
import { Environment } from "../BehaviorTree";

export abstract class NodeBase {
    abstract define: B3Define;

    node: BehaviorNode;

    abstract run(node: BehaviorNode, env: Environment, ...params: any[]): any[] | BehaviorRet;
}

export class B3Define {

    /** 输入值 */
    public input: string[];
    /** 输出值 */
    public output: string[];

    public constructor(
        /** 类型 */
        public type: BehaviorType,
        /** 描述 */
        public desc: string,
        /** 备注 */
        public doc: string
    ) {
    }

    addInput(...inputs: string[]) {
        if (!this.input) {
            this.input = []
        }
        this.input.push(...inputs);
        return this;
    }

    addOutput(...output: string[]) {
        if (!this.output) {
            this.output = []
        }
        this.output.push(...output);
        return this;
    }

}


export namespace B3Dec {
    export const serMap: Map<string, B3Arg[]> = new Map();

    export function ArgDec(desc: string, type: B3ArgType) {
        let fun = (target: NodeBase, propertyKey: string) => {
            if (!serMap.has(target.constructor.name)) {
                serMap.set(target.constructor.name, []);
            }
            serMap.get(target.constructor.name).push(
                new B3Arg(
                    propertyKey,
                    type,
                    desc));
        }
        return fun;
    }
}


export function regBehaviorArg() {
    return function (constructor: Function) {

    }
}

export class B3Arg {

    public constructor(
        public name: string = "",
        public type: B3ArgType,
        public desc: string = "描述") {

    }
}

export enum B3ArgType {
    Number = "int",
    String = "string",
}
