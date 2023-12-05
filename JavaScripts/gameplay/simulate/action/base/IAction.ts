import { IContext } from "../../context/IContext";
import { ActionStatus } from "./ActionStatus";

export interface IAction {
    /**唯一行为标识符 */
    get nameId(): string;
    /**行为经过的时间 */
    get elapsedTime(): number;
    /**冷却时间 */
    get coolDown(): number;
    /**是否处于冷却时间,当正在冷却时 返回true */
    get inCoolDown(): boolean;
    /**行为状态 */
    get actionStatus(): ActionStatus;
    /**AI Action 执行函数 */
    execute(context: IContext): void;

}