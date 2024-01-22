import { IAction } from "./IAction";

export interface IActionCollection {
    /**添加行为 */
    add(action: IAction): boolean;
    /**  移除行为*/
    remove(actionId: string): boolean;
    /**  是否包含行为*/
    contains(actionId: string): boolean;
    /** 清空行为*/
    clear(): void;

}