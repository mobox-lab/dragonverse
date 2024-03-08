import { Handler, THandler } from './Handler';

type AnyFunction = (...args: unknown[]) => unknown;

type Fn<T extends any[]> = (...args: T) => any

type InferFnArgs<T> = T extends Fn<infer A> ? A : any

export class InferAction<T extends AnyFunction = AnyFunction>{


    private _handlers: THandler<T>[] = []

    /**
     * 
     * @param thisArg 
     * @param callBack 
     * @param args 默认参数 会随着回调函数传递回去
     */
    add(thisArg: unknown, callBack: T, ...args: unknown[]) {
        this._handlers.push(Handler.create(thisArg, callBack, args, false))
    }


    broadCast(...args: InferFnArgs<T>) {
        for (const handler of this._handlers.concat()) {
            handler.runWith(...args);
        }
    }

    clear() {

        for (const handler of this._handlers) {
            handler.recover();
        }
        this._handlers.length = 0;
    }

    remove(thisArg: unknown, call: T) {
        const index = this._handlers.findIndex((v) => {
            if (v.method === call && v.caller === thisArg) {
                return true
            }
            return false
        })
        if (index === -1) {
            return
        }
        const handler = this._handlers[index];
        handler.recover();
        this._handlers.splice(index, 1);
    }


    removeByTarget(thisArg: unknown) {

        const length = this._handlers.length;

        for (let i = length - 1; i >= 0; i--) {
            const handler = this._handlers[i];
            if (handler.caller === thisArg) {
                handler.recover();
                this._handlers.splice(i, 1);
            }
        }

    }

}
