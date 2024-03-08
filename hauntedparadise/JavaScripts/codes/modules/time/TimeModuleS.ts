/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-12-21 13:35:33
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-08 11:26:38
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\time\TimeModuleS.ts
 * @Description  : 
 */
import { AddGMCommand } from "module_gm";
import TimeModuleC from "./TimeModuleC";
import TimeScript from "./TimeScript";
import GameStart from "../../GameStart";

AddGMCommand("增加一天存活时间", null, () => {
    ModuleService.getModule(TimeModuleS).timeScript.addDayTime();
}, "默认");

export default class TimeModuleS extends ModuleS<TimeModuleC, null> {
    /**控制游戏时间的核心/S */
    private _timeScript: TimeScript = null;

    public nightAction: Action = new Action()

    public dayAction: Action = new Action()

    get timer() {
        return this._timeScript.time;
    }

    public get timeScript() {
        return this._timeScript;
    }

    public isInNight: boolean = false;

    protected onStart(): void {
        this.initTimer();
        this.nightAction.add(() => {
            this.isInNight = true;
            //this.getAllClient().net_tips(0);
        })
        this.dayAction.add(() => {
            this.isInNight = false;
            //this.getAllClient().net_tips(1);
        })
    }

    async initTimer() {
        //脚本
        this._timeScript = await Script.spawnScript(TimeScript, true);
    }

}