import { CompanionState } from "../entity/CompanionState";
import { IContext } from "./IContext";
import { MovementContext } from "./MovementContext";





export class CompanionContext extends MovementContext implements IContext {







    /**
     * 网络同步状态
     */
    syncedState: CompanionState;





}