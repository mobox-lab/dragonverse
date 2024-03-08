import { GameConfig } from "../../../../config/GameConfig";
import { CommonUtils } from "../../../utils/CommonUtils";
import { ArchiveDataType } from "../../archive/ArchiveHelper";
import ArchiveModuleC from "../../archive/ArchiveModuleC";
import { PlayerModuleC } from "../../player/PlayerModuleC";

@Component
export default class FallTransTrigger extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) {
            return;
        }
        const trigger = this.gameObject as Trigger;
        trigger.onEnter.add((char: Character) => {
            if (!CommonUtils.isSelfChar(char)) {
                return;
            }
            char.worldTransform.position = GameConfig.Global.StartPos.vector;
        })
    }
}