import { CompanionStateEnum } from "../../simulate/planner/companion/CompanionStateEnum";
import { IState } from "../base/IState";

@mw.Serializable
export class CompanionState implements IState {

    clone(source?: CompanionState): CompanionState {
        let ret = source ? source : new CompanionState();
        ret.stateName = this.stateName;
        ret.switchTime = this.switchTime;
        ret.seed = this.seed;
        return ret;
    }

    equal(other: CompanionState): boolean {

        return other.stateName == this.stateName && other.switchTime === this.switchTime;
    }

    /**
     * 当前状态名
     */
    @mw.Property({ replicated: true })
    stateName: CompanionStateEnum


    /**
     * 当前状态进入时间
     */
    @mw.Property({ replicated: true })
    switchTime: number;


    /**
     * 随机种子
     */
    @mw.Property({ replicated: true })
    public seed: number;



    public static create(stateName: CompanionStateEnum) {

        const ret = new CompanionState();
        ret.switchTime = ret.seed = Date.now();
        ret.stateName = stateName
        return ret;
    }
}



