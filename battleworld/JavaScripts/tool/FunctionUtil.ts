
//单例的装饰器
const SINGLETON_KEY = Symbol();
export function Singleton() {
    return function (type: { new(), instance: any }) {
        const proxyType = new Proxy(type, {
            // this will hijack the constructor
            construct(target, argsList, newTarget) {
                // we should skip the proxy for children of our target class
                if (target.prototype !== newTarget.prototype) {
                    return Reflect.construct(target, argsList, newTarget);
                }
                // if our target class does not have an instance, create it
                if (!target[SINGLETON_KEY]) {
                    target[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget);
                }
                return target[SINGLETON_KEY];
            },

        })
        Reflect.defineProperty(proxyType, "instance", {
            get() {
                if (!this[SINGLETON_KEY]) {
                    new this();
                }
                return this[SINGLETON_KEY];
            },
            set(next) {
                this[SINGLETON_KEY] = next;
            }
        })
        return proxyType
    }
}