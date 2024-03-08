import { CommonUtils } from "../../utils/CommonUtils";
import { GhostModuleC } from "../ghost/GhostModuleC";

@Component
export default class SafeTrigger extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) {
            return;
        }
        let trigger = this.gameObject as Trigger;

        trigger.onEnter.add((char: Character) => {
            if (CommonUtils.isSelfChar(char))
                ModuleService.getModule(GhostModuleC).protectedPlayer(true);
        })
        trigger.onLeave.add((char: Character) => {
            if (CommonUtils.isSelfChar(char))
                ModuleService.getModule(GhostModuleC).protectedPlayer(false);
        })
    }
}