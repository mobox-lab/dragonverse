/*
 * @Author       : 梁宸 chen.liang@appshahe.com
 * @Date         : 2022-07-25 13:06:30
 * @FilePath     : \JavaScripts\utils\MapEx.ts
 * @LastEditors  : senyu sen.yu@appshahe.com
 * @LastEditTime : 2022-07-28 14:56:47
 * @Description  : 
 */
/**
 * MapEx(可序列化)
 */
export namespace MapEx {

    export type MapExClass<T> = {
        [key: string | number]: T
    }

    /**
     * 获取对象
     * @param map 
     * @param key 
     * @returns 
     */
    export function get<T>(map: MapExClass<T>, key: string | number): T {

        if (map[key] != null) {
            return map[key];
        }

        return null;

    }

    /**
     * 设置对象
     * @param map 
     * @param key 
     * @param val 
     */
    export function set<T>(map: MapExClass<T>, key: string | number, val: T) {
        map[key] = val;
    }

    /**
     * 删除对象
     * @param map 
     * @param key 
     * @returns 成功/失败
     */
    export function del<T>(map: MapExClass<T>, key: string | number): boolean {
        if (map[key] != null) {
            delete map[key];
            return true;
        }
        return false;
    }

    /**
     * 是否有指定对象
     * @param map 
     * @param key 
     * @returns 
     */
    export function has<T>(map: MapExClass<T>, key: string | number): boolean {

        let has = false;
        Object.keys(map).forEach((e) => {
            if (e == key && map[e] != null && map[e] != undefined) {
                has = true;
            }
        });

        return has;
    }

    /**
     * 获取count数量
     * @param map 
     * @param key 
     * @returns 
     */
    export function count<T>(map: MapExClass<T>): number {
        let res = 0;
        forEach(map, e => {
            ++res;
        })
        return res;
    }

    /**
     * 遍历map
     * @param map 
     * @param callback 
     */
    export function forEach<T>(map: MapExClass<T>, callback: (key: string | number, element: T) => void) {
        for (let key in map) {
            if (map[key] != null && map[key] != undefined) {
                callback(key, map[key]);
            }
        }
    }

    /**
     * 拷贝，Val还是引用出来的，只是Map换了
     * @param map 
     * @returns 
     */
    export function copy<T>(map: MapExClass<T>): MapExClass<T> {
        let res = {};
        for (let key in map) {
            res[key] = map[key];
        }
        return res;
    }

    export function isNull<T>(obj: T) {
        return obj == null;
    }

}