import { GhostBaseStateMachine } from "../../../utils/GhostStateMachine";

export enum CatHeadStatType {
    /** 冷却中 */
    Idle = 1,
    /** 预警中 */
    Pre = 2,
    /** 运行中 */
    Run = 3
}

export class CatHeadStateMachine extends GhostBaseStateMachine<CatHeadStatType> {

}
