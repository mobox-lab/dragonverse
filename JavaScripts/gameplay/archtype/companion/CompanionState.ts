import seedrandom from "seedrandom";
import { CompanionStateEnum } from "../../simulate/planner/companion/CompanionStateEnum";
import { IState } from "../base/IState";
@mw.Serializable
export class CompanionState implements IState {

    clone(source?: CompanionState): CompanionState {
        let ret = source ? source : new CompanionState();
        Object.assign(ret, this);
        return ret;
    }

    equal(other: CompanionState): boolean {
        return other.stateName == this.stateName && other.switchTime === this.switchTime;
    }

    /**
     * 当前状态名
     */
    @mw.Property({ replicated: true })
    stateName: CompanionStateEnum = 0;


    /**
     * 当前状态进入时间
     */
    @mw.Property({ replicated: true })
    switchTime: number = 0;


    /**
     * 随机种子
     */
    @mw.Property({ replicated: true })
    public seed: number = 0;


    /**
     * 起始位置
     */
    @mw.Property({ replicated: true })
    public start: mw.Vector = mw.Vector.zero;



    public static create(stateName: CompanionStateEnum) {

        const ret = new CompanionState();
        ret.switchTime = ret.seed = Date.now();
        ret.stateName = stateName;
        return ret;
    }


    public random(min: number = undefined, max: number = undefined, integer: boolean = true): number {

        if (min === undefined) {
            min = 0;
        }
        if (max === undefined) {
            max = min + 1;
        }

        this.seed++;
        let rng = seedrandom(this.seed.toString());

        let result = rng() * (max - min) + min;
        return integer ? Math.floor(result) | 0 : result;
    }
}




