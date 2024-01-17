export module AntiCheatSystem {
    class MemoryCache {
        public _cache: Map<any, Map<string, any>> = new Map();
        public setCache(instance: any, key: string, value: any) {
            if (!this._cache.has(instance)) {
                this._cache.set(instance, new Map());
            }
            let cache = this._cache.get(instance);
            cache.set(key, value);
        }
        public getCache(instance: any, key: string) {
            let cache = this._cache.get(instance);
            if (!cache) {
                return null;
            }
            if (!cache.has(key)) {
                return null;
            }
            return cache.get(key);
        }
    }
    var _cache: MemoryCache = new MemoryCache();
    function setCacheValue(instance: any, key: string, value: any) {
        let newValue: any;
        //console.error("setCacheValue : " + key + " | " + value);
        let random = MathUtil.randomFloat(1000000, 2000000);
        if (!Number.isNaN(value)) {
            newValue = (value as number) + random;
        } else {
            newValue = value;
        }
        _cache.setCache(instance, key, { v1: newValue, randomFloat: random });
    }
    function getCacheValue(instance: any, key: string) {
        let info = _cache.getCache(instance, key);
        if (info == null) return null;
        if (!Number.isNaN(info.value)) {
            return info.v1 - info.randomFloat;
        }
        return info.v1;
    }
    var reWriteList: Map<any, Map<string, any>> = new Map();
    function addReCallSetter(instance: any, key: string, value: any) {
        if (!reWriteList.has(instance)) {
            reWriteList.set(instance, new Map());
        }
        let cache = reWriteList.get(instance);
        cache.set(key, value);
    }
    function reWriteCache() {
        _cache._cache.forEach((v, k, map) => {
            v.forEach((value, key, map) => {
                try {
                    if (!Number.isNaN(value.v1)) {
                        k[key];
                        k[key] = value.v1 - value.randomFloat;
                    } else {
                        k[key] = value.v1;
                    }
                } catch (ex) {
                }
            });
        });
    }
    function reWriteSeter() {
        reWriteList.forEach((v, k, map) => {
            v.forEach((value, key, map) => {
                try {
                    let curVal = k[key];
                    let val = getCacheValue(k, key);
                    k[key] = val + MathUtil.randomInt(1, 9) * 0.00001;
                    setCacheValue(k, key, val)
                } catch (ex) {
                }
            });
        })
    }
    setInterval(() => {
        reWriteSeter();
    }, 1000);
    setInterval(() => {
        reWriteCache();
    }, 1);
    var pingpongCheatPlayerMap: Map<number, number> = new Map();
    var pingpongIsStart: boolean = false;
    function addPlayerPingpong(playerId: number) {
        if (!pingpongCheatPlayerMap.has(playerId)) {
            pingpongCheatPlayerMap.set(playerId, Date.now());
            return;
        }
        let lastMilUnix = pingpongCheatPlayerMap.get(playerId);
        let curMilUnix = Date.now();
        if (curMilUnix - lastMilUnix >= 9 * 1000) {
            console.error("玩家 " + playerId + " 没有开加速挂 : " + (curMilUnix - lastMilUnix));
            pingpongCheatPlayerMap.set(playerId, curMilUnix);
        } else {
            //开加速挂了
            let player = mw.Player.getPlayer(playerId);
            if (player == null) {
                return;
            }
            RoomService.kick(player, "作弊检测");
            mw.Event.dispatchToClient(player, "pingpongCheat", "pingpongField", 9 * 1000 / (curMilUnix - lastMilUnix), 10 * 1000);
        }
    }
    /**
     * 检测加速器作弊行为
     * @example
     *      AntiCheatSystem.checkAccelerator();
     * @returns
     */
    export function checkAccelerator() {
        if (pingpongIsStart) return;
        pingpongIsStart = true;

        if (SystemUtil.isClient()) {
            console.error("cheatPingpong client start");
            var pid;
            pid = setInterval(() => {
                mw.Event.dispatchToServer("onPingpong", 1);
                console.error("onPingpong")
            }, 10000);
            mw.Event.addServerListener("pingpongCheat", (field, cheatValue, srcValue) => {
                console.error("pingpongCheat : " + field + " | " + cheatValue + " | " + srcValue);
                mw.Event.dispatchToLocal("onCheatCheck", field, cheatValue, srcValue);
                clearInterval(pid);
            });
        }
        if (SystemUtil.isServer()) {
            console.error("cheatPingpong");
            mw.Event.addClientListener("onPingpong", (player) => {
                addPlayerPingpong(player.playerId);
            })
        }
    }
    /**
     * 保护指定对象的字段成员变量，使用 getter 和 setter 控制访问和赋值权限。
     * @Tips 当前方法只支持 Number 类型的字段。
     * @example
     *      *@AntiCheatSystem.ProtectValue*
     *      public value1: number = 0;
     * @param target 要保护字段的目标对象。
     * @param key 字段的键名。
     */
    export function ProtectValue(target: any, key: string) {
        try {
            let currentValue = target[key];
            // 只在客户端环境下进行处理
            if (SystemUtil.isClient()) {
                // 重新定义属性的 getter 和 setter 方法
                Object.defineProperty(target, key, {
                    get: function () {
                        // 获取缓存的值
                        let cacheValue = getCacheValue(this, key);
                        // 如果缓存值不为空且与当前值的差异大于指定阈值，则返回缓存值，否则返回当前值
                        if (cacheValue != null && Math.abs(cacheValue - currentValue) > 0.0001) {
                            mw.Event.dispatchToLocal("onCheatCheck", key, currentValue, cacheValue);
                            return cacheValue;
                        }
                        return currentValue;
                    },
                    set: function (newValue) {
                        // 设置缓存值，并更新当前值
                        setCacheValue(this, key, newValue);
                        currentValue = newValue;
                    },
                });
            }
        } catch (error) {
            // 捕获异常并记录错误信息
            console.error(target);
            console.error(error);
        }
    }

    function ProtectGetterSetter(target: any, key: string) {
        try {
            let currentValue = target[key];
            const getter = target[`__get_${key}`] || target.__lookupGetter__(key);
            const setter = target[`__set_${key}`] || target.__lookupSetter__(key);
            // 保存原始的 get 和 set 方法
            target[`__get_${key}`] = getter;
            target[`__set_${key}`] = setter;
            const newGetter = function () {
                let cacheValue = getCacheValue(this, key);
                let curValue = getter.call(this);
                if (cacheValue != null && Math.abs(cacheValue - curValue) > 0.0001) {
                    mw.Event.dispatchToLocal("onCheatCheck", key, curValue, cacheValue);
                    let self = this;
                    addReCallSetter(this, key, () => {
                        setter.call(self, cacheValue + MathUtil.randomInt(1, 9) * 0.00001);
                    });
                    return cacheValue;
                }
                return curValue
            }
            const newSetter = function (newValue) {
                // 在设置新值之前执行你的自定义方法
                setCacheValue(this, key, newValue);
                let self = this;
                addReCallSetter(this, key, () => {
                    setter.call(self, newValue);
                });
                // 调用原始的 set 方法
                setter.call(this, newValue);
            };
            Object.defineProperty(target, key, {
                get: newGetter,
                set: newSetter,
                enumerable: true,
                configurable: true,
            });
        } catch (error) {
            console.error(target);
            console.error(error);
        }
    }
    /**
     * 保护对象实例的指定字段的 getter 和 setter 方法，防止未授权的访问。
     * @Tips 当前方法只支持 Number 类型的字段。
     * @TODO 该方法在保护MW对象的字段时，会频繁触发getter和setter，大量使用可能会带来性能风险。
     * @example
     *      AntiCheatSystem.ProtectGetterSetters(mw.Player.localPlayer.character, "maxWalkSpeed");
     * @param instance 要进行保护的对象实例。
     * @param fieldName 要保护的字段名称。
     */
    export function ProtectGetterSetters(instance: any, fieldName: string) {
        ProtectGetterSetter(instance, fieldName);
    }
    /**
     * 注册作弊检测的回调函数。
     * 该函数有可能会出现短暂误判，因此请通过持续一段时间的检测结果来判断玩家是否作弊。
     * @case 当fieldName 为 pingpongField 时，cheatValue 为加速倍率(当倍率>1时，则玩家进行了加速作弊)，srcValue 为pingpong的标准时间。
     * @example
     *      AntiCheatSystem.registerCheatDetectionCallback((field, cheatValue, srcValue) => {
     *          console.error("Player Cheat : " + field + " | " + cheatValue + " | " + srcValue);
     *      });
     * @param cheatCallback 作弊检测触发时的回调函数。
     *                      它接受三个参数：fieldName（字段名称）、cheatValue（作弊值）、originalValue（原始值）。
     */
    export function registerCheatDetectionCallback(cheatCallback: (fieldName: string, cheatValue: any, originalValue: any) => void) {
        mw.Event.addLocalListener("onCheatCheck", cheatCallback);
    }
}