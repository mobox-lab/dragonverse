import { RankInfoBase } from "./GlobalRankCustomData";



export class GlobalRankDataHelper extends Subdata {
    /**
     *  排序函数
     * @param a 
     * @param b 
     * @returns 
     */
    static sortFunc(a: RankInfoBase, b: RankInfoBase, key: string): number {
        return b.score - a.score;
    }
    /**
     * 这里缓存自身的数据
     */
    @Decorator.persistence("selfData")
    private _selfDataMap = {};

    protected get dataName() {
        return "GlobalRankData";
    }

    public getData(key: string): RankInfoBase {
        return this._selfDataMap[key] ?? new RankInfoBase();
    }

    public setData(key: string, data: RankInfoBase) {
        this._selfDataMap[key] = data;
        this.save(true);
    }

}