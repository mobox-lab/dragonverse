import { Singleton } from "./depend/singleton/Singleton";

/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-01-15 18:08:35
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-04 16:11:20
 * @FilePath     : \dragon-verse\JavaScripts\GlobalProperty.ts
 * @Description  : 全局属性,GameStart里提出来，防止循环引用
 */
export default class GlobalProperty extends Singleton<GlobalProperty>() {
    public isRelease: boolean;

    protected onConstruct(): void {

    }
}