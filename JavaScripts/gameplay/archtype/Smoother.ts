

export class Smoother {

    public count: number;

    private _history: mw.Vector[];

    private _slot: number;

    constructor(count = 10) {
        this.count = count;

        this._history = [];
        this._slot = 0;

        for (let i = 0; i < count; i++) {
            this._history.push(new mw.Vector());
        }
    }

    /**
     * 通过给定的平均值平滑目标结果
     * @param value 要平滑的值
     * @return averge 最终结果
     */
    calculate(value: mw.Vector, average: mw.Vector) {

        average.set(0, 0, 0);

        if (this._slot === this.count) {

            this._slot = 0;

        }


        this._history[this._slot].set(value);
        this._slot++;

        for (let i = 0; i < this.count; i++) {
            average.add(this._history[i]);
        }

        average.divide(this.count);

        return average;

    }
}