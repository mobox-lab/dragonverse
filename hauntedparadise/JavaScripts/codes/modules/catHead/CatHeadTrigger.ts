import { CommonUtils } from "../../utils/CommonUtils";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { CatHeadModuleC } from "./CatHeadModule";

@Component
export default class CatHeadTrigger extends Script {
    @Property({ displayName: "区域id" })
    public areaId: number = 0;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        return;
        const trigger = this.gameObject as Trigger
        trigger.onEnter.add((char: Character) => {
            if (!CommonUtils.isSelfChar(char)) {
                return;
            }
            ModuleService.getModule(CatHeadModuleC).enterCatArea(this.areaId);
        })
        trigger.onLeave.add((char: Character) => {
            if (!CommonUtils.isSelfChar(char)) {
                return;
            }
            ModuleService.getModule(CatHeadModuleC).leaveCatArea();
        })
    }
}