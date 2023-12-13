/** 
 * @Author       : zewei.zhang
 * @Date         : 2023-12-13 11:06:56
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2023-12-13 16:35:50
 * @FilePath     : \dragon-verse\JavaScripts\gameplay\quest\WaterDragonQuest.ts
 * @Description  : 获取水龙任务
 */

import { EventDefine } from "../../const/EventDefine";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { Quest } from "./Quest";



interface WaterDragonTaskInfo {
    complete: boolean;
}


export default class WaterDragonQuest extends Quest {
    @WaterDragonQuest.required
    private _cacheInfo: WaterDragonTaskInfo;

    protected get progress(): number {
        return this._cacheInfo.complete ? 1 : 0;
    }

    protected onInitialize(): void {
        super.onInitialize();
        Event.addLocalListener(EventDefine.PlayerEnterDestination, () => {
            this._cacheInfo.complete = true;
            this.updateTaskProgress(JSON.stringify(this._cacheInfo));
        });
    }
    protected onSerializeCustomData(customData: string): void {
        if (customData) {
            this._cacheInfo = JSON.parse(customData);
        } else {
            this._cacheInfo = {
                complete: false
            };
        }
    }


    onActivated(): void {
        Log4Ts.log(this, "waterDragonTaskActivated");
    }
    onComplete(): void {
        Log4Ts.log(this, "waterDragonTaskComplete");
        Event.dispatchToLocal(EventDefine.WaterDragonTaskComplete);
    }

}