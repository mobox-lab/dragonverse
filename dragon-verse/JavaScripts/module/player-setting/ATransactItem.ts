import Log4Ts from "mw-log4ts";

/**
 * 事务原子 抽象类.
 *
 * @desc 事务原子 是一种可回退、不可分割的操作.
 * @desc 其能够执行操作 并可返回到执行操作前的状态.
 */
export abstract class ATransactItem<T> {
    private _cache: T = null;

    private _setVal: T = null;

    /**
     * 缓存值.
     */
    public get cache(): T {
        return this._cache;
    }

    /**
     * 待设值.
     */
    public get setVal(): T {
        return this._setVal;
    }

    /**
     * 准备设定值.
     * @param val
     */
    public hold(val: T): this {
        const cache = this.get();
        if (cache === val) return this;

        this._cache = cache;
        this._setVal = val;
        return this;
    }

    /**
     * 预览结果.
     */
    public preview(): this {
        if (!this.previewEnable) return this;
        if (!this.setValValid()) return this;

        this.set(this._setVal);
        return this;
    };

    /**
     * 提交.
     */
    public commit(): this {
        if (!this.setValValid()) return this;
        if (this.get() === this._setVal) return this;

        this.set(this._setVal);
        return this;
    }

    /**
     * 撤销.
     */
    public cancel(): this {
        if (!this.cacheValid()) return this;
        if (this.get() === this._cache) return this;

        this.set(this._cache);
        return this;
    }

    /**
     * 完结.
     * @desc 将遗忘缓存值与设定值.
     */
    public finish() {
        this._cache = null;
        this._setVal = null;
    }

    public readonly abstract previewEnable: boolean;

    /**
     * 当前值.
     */
    public abstract get(): T;

    /**
     * 事务执行行为.
     * @protected
     */
    protected abstract set(val: T): void;

    /**
     * 缓存值有效性.
     * @protected
     */
    protected cacheValid(): boolean {
        return this._cache !== null;
    }

    /**
     * 待设值有效性.
     * @desc 当未发生改动时 待设值为 null 因此无效.
     * @protected
     */
    public setValValid(): boolean {
        return this._setVal !== null;
    }
}

/**
 * 事务.
 * @desc 原子操作序列.
 * @desc 允许提交 与 回退.
 */
export class Transact extends Array<ATransactItem<unknown>> {
    constructor(arrayLength: number = 0) {
        super(arrayLength);
    }

    /**
     * 应用.
     */
    public commit() {
        const done: ATransactItem<unknown>[] = [];
        let error = false;
        while (this.length > 0) {
            try {
                done.push(this.shift().commit());
            } catch (e) {
                Log4Ts.error(Transact, `commit failed`);
                for (let item of done) {
                    item.cancel();
                }
                error = true;
            }
        }

        if (!error) {
            for (const item of done) {
                item.finish();
            }
        }
    }

    /**
     * 取消.
     */
    public cancel() {
        while (this.length > 0) {
            this.pop().cancel().finish();
        }
    }
}