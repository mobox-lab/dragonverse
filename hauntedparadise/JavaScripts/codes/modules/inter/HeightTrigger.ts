import { CommonUtils } from "../../utils/CommonUtils";
import LevelBase from "../Level/LevelBase";
import { PlayerModuleC } from "../player/PlayerModuleC";

@Component
export default class HeightTrigger extends LevelBase {

    private _time: number = 0;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onLevelStart(): void {
        let tri = this.gameObject as Trigger
        tri.onEnter.add((char: Character) => {
            if (!CommonUtils.isSelfChar(char)) {
                return;
            }
            let cur = TimeUtil.elapsedTime();
            if (cur - this._time <= 2) {
                return;
            }
            this._time = cur;
            ModuleService.getModule(PlayerModuleC).refreshHeight();
        })
    }
}