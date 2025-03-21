/**
 * Delegate.
 *
 * @desc provide some useful delegate.
 * @desc ---
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 * @version 2.1.3b
 */
export namespace Delegate {
    interface IDelegate<P, Func extends Function> {
        /**
         * add a delegate.
         * @param func
         * @param alive call times.
         *      default = -1. 无限制.
         * @return boolean
         *      - true success.
         *      - false already exist.
         */
        add(func: Func, alive: number): boolean;

        /**
         * add a delegate. can be only invoke once.
         * behaves the same as add(func, 1)
         * @param func
         * @return boolean
         *      - true success.
         *      - false already exist.
         */
        once(func: Func): boolean;

        /**
         * add a delegate as the only alive callback.
         * @desc remove all and add this.
         * @param func
         */
        only(func: Func): boolean;

        /**
         * invoke delegate.
         * @desc you should not rely on the add order.
         * @param param
         */
        invoke(param: P): void;

        /**
         * remove a delegate.
         * @param func
         * @return boolean
         *      - true success.
         *      - false already exist.
         */
        remove(func: Func): boolean;

        /**
         * remove all delegate.
         */
        clear(): void;
    }

    export type SimpleDelegateFunction<P> = (param: P) => void;

    export type ConditionDelegateFunction<P> = (param: P) => boolean;

    abstract class DelegateInfo {
        callback: Function;
        hitPoint: number;

        protected constructor(callback: Function, hitPoint: number) {
            this.callback = callback;
            this.hitPoint = hitPoint;
        }
    }

    class SimpleDelegateInfo<T> extends DelegateInfo {
        declare callback: SimpleDelegateFunction<T>;

        constructor(callback: SimpleDelegateFunction<T>, hitPoint: number) {
            super(callback, hitPoint);
        }
    }

    class ConditionDelegateInfo<T> extends DelegateInfo {
        declare callback: ConditionDelegateFunction<T>;

        constructor(callback: ConditionDelegateFunction<T>, hitPoint: number) {
            super(callback, hitPoint);
            this.callback = callback;
        }
    }

    /**
     * Simple Delegate.
     * 简单委托.
     *
     * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
     * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
     * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
     * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
     * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
     * @author LviatYi
     * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
     * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
     */
    export class SimpleDelegate<P> implements IDelegate<P, SimpleDelegateFunction<P>> {
        private _callbackInfo: SimpleDelegateInfo<P>[] = [];

        public add(func: SimpleDelegateFunction<P>, alive: number = -1): boolean {
            if (this.getIndex(func) !== -1) {
                return false;
            }
            this._callbackInfo.push(new SimpleDelegateInfo(func, alive));
        }

        public once(func: SimpleDelegateFunction<P>): boolean {
            return this.add(func, 1);
        }

        public only(func: SimpleDelegateFunction<P>): boolean {
            this.clear();
            return this.add(func);
        }

        public invoke(param?: P): void {
            for (let i = this._callbackInfo.length - 1; i >= 0; --i) {
                const callbackInfo = this._callbackInfo[i];

                try {
                    if (callbackInfo.hitPoint !== 0) {
                        callbackInfo.callback(param);
                    }
                    if (callbackInfo.hitPoint > 0) --callbackInfo.hitPoint;
                    if (callbackInfo.hitPoint === 0) this.removeByIndex(i);
                } catch (e) {
                    console.error(e);
                }
            }
        }

        public remove(func: SimpleDelegateFunction<P>): boolean {
            const index: number = this.getIndex(func);
            if (index !== -1) {
                this._callbackInfo.splice(index, 1);
                return true;
            }
            return false;
        }

        public clear(): void {
            this._callbackInfo.length = 0;
        }

        /**
         * try to get the index of an existing delegate.
         * @param func
         * @return index func index. -1 not exist.
         * @private
         */
        private getIndex(func: SimpleDelegateFunction<P>): number {
            return this._callbackInfo.findIndex(item => {
                return item.callback === func;
            });
        }

        /**
         * remove Func by index.
         * @param index
         * @private
         */
        private removeByIndex(index: number): void {
            this._callbackInfo.splice(index, 1);
        }
    }

    /**
     * Condition Delegate
     * 条件委托.
     *
     * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
     * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
     * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
     * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
     * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
     * @author LviatYi
     * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
     * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
     */
    export class ConditionDelegate<P> implements IDelegate<P, ConditionDelegateFunction<P>> {
        private _callbackInfo: ConditionDelegateInfo<P>[] = [];

        public add(func: ConditionDelegateFunction<P>, alive: number = -1): boolean {
            if (this.getIndex(func) !== -1) {
                return false;
            }
            this._callbackInfo.push(new ConditionDelegateInfo(func, alive));
        }

        public once(func: ConditionDelegateFunction<P>): boolean {
            return this.add(func, 1);
        }

        public only(func: ConditionDelegateFunction<P>): boolean {
            throw new Error("Method not implemented.");
        }

        public invoke(param: P): void {
            for (let i = this._callbackInfo.length - 1; i >= 0; --i) {
                const callbackInfo = this._callbackInfo[i];
                let ret: boolean;
                if (callbackInfo.hitPoint !== 0) {
                    ret = callbackInfo.callback(param);
                }

                if (callbackInfo.hitPoint > 0) {
                    --callbackInfo.hitPoint;
                }

                if (callbackInfo.hitPoint === 0) {
                    this.removeByIndex(i);
                }
            }
        }

        public remove(func: ConditionDelegateFunction<P>): boolean {
            const index: number = this.getIndex(func);
            if (index !== -1) {
                this._callbackInfo.splice(index, 1);
                return true;
            }
            return false;
        }

        public clear(): void {
            this._callbackInfo.length = 0;
        }

        private getIndex(func: ConditionDelegateFunction<P>): number {
            return this._callbackInfo.findIndex(item => {
                return item.callback === func;
            });
        }

        private removeByIndex(index: number): void {
            this._callbackInfo.splice(index, 1);
        }
    }
}