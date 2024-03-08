import { CommonUtils } from "../../utils/CommonUtils";
import { CatHeadModuleC } from "./CatHeadModule";

@Component
export default class CatHeadSafeTrigger extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        return;
        const trigger = this.gameObject as Trigger
        trigger.onEnter.add((char: Character) => {
            if (!CommonUtils.isSelfChar(char)) {
                return;
            }
            ModuleService.getModule(CatHeadModuleC).setPlayerSafe(true);
        })
        trigger.onLeave.add((char: Character) => {
            if (!CommonUtils.isSelfChar(char)) {
                return;
            }
            ModuleService.getModule(CatHeadModuleC).setPlayerSafe(false);
        })
    }
}