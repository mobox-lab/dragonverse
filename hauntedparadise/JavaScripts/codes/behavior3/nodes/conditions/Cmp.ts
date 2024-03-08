import { BehaviorRet, BehaviorType } from "../../BehaviorDefine";
import { regBehaviorNode } from "../../BehaviorManager";
import { BehaviorNode } from "../../BehaviorNode";
import { Environment } from "../../BehaviorTree";
import { B3Arg, B3ArgType, B3Dec, B3Define, NodeBase } from "../NodeBase";

@regBehaviorNode()
class Cmp extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "比较值", "比较值"
    ).addInput("inputValue");

    @B3Dec.ArgDec("值", B3ArgType.Number)
    public eq: number

    @B3Dec.ArgDec("比较方式", B3ArgType.String)
    public cmpType: string;

    run(node: BehaviorNode, env: Environment, value: string | number): BehaviorRet {
        switch (this.cmpType) {
            case "=":
                if (this.eq == Number(value)) {
                    return BehaviorRet.Success;
                }
                break;
            case ">=":
                if (this.eq >= Number(value)) {
                    return BehaviorRet.Success;
                }
                break;
            case "<=":
                if (this.eq <= Number(value)) {
                    return BehaviorRet.Success;
                }
                break;
            case ">":
                if (this.eq > Number(value)) {
                    return BehaviorRet.Success;
                }
                break;
            case "<":
                if (this.eq < Number(value)) {
                    return BehaviorRet.Success;
                }
                break;
            default:
                break;
        }
        return BehaviorRet.Fail;
    }

}

@regBehaviorNode()
class Cmp2Val extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "比较值", "比较值"
    ).addInput("inputVal1").addInput("inputVal2");

    run(node: BehaviorNode, env: Environment, value1: any, value2: any): BehaviorRet {
        if (value1 == value2) {
            return BehaviorRet.Success;
        }
        return BehaviorRet.Fail;
    }
}