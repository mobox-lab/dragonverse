import { MainUI } from "../../ui/MainUI";
import { TipsUI } from "../../ui/TipsUI";
import { CommonUtils } from "../../utils/CommonUtils";
import { LanUtil } from "../../utils/LanUtil";
import MusicMgr from "../../utils/MusicMgr";
import { BoardHelper } from "../blackboard/BoardDefine";
import { ProcedureModuleC } from "../procedure/ProcedureModuleC";
import { EmProcedureState } from "../procedure/const/EmProcedureState";
import { StartProcedureStateClient } from "../procedure/state/ProcedureStateClient";
import TimeModuleC from "./TimeModuleC";
import TimeModuleS from "./TimeModuleS";
import { AllTimeSecond, DayTimeSecond } from "./timeConfig";

/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-12-21 14:11:41
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-08 11:21:35
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\time\TimeScript.ts
 * @Description  : 
 */

enum ETimeState {

    /** 白天 */
    DayLight = 0,

    /** 准备进入夜晚 */
    ReadyNight,

    /** 夜晚 */
    Night,
}

/** 不同时间状态对应的BGM音效配置id列表 */
const BGMSoundCfgIDList: number[] = [1000, 2002, 2001];

@Component
export default class TimeScript extends Script {

    @Property({ replicated: true, onChanged: "onTimeChanged" })
    private _timer: number = 0;

    private _isCallNightAction = false;

    /**当前游戏天数 */
    @Property({ replicated: true, onChanged: "onDayAdd" })
    private _dayTime: number = 1;

    @Property({ replicated: true, onChanged: "onTimeStateChange" })
    private timeState: ETimeState = ETimeState.DayLight;

    get time() {
        return this._timer;
    }

    get timeModuleC() {
        return ModuleService.getModule(TimeModuleC)
    }

    protected onStart(): void {
        this.useUpdate = true;
        if (SystemUtil.isClient()) {
            Fog.enabled = false;
            Event.addLocalListener(BoardHelper.BoardLoadingEvt, () => {
                this._cli_isEnable = true;
                Fog.enabled = this._cli_isInNight;
            })
            Event.addLocalListener(BoardHelper.BoardClearEvent, () => {
                Fog.enabled = false;
            })
        }
    }

    public addDayTime() {
        this._dayTime += 1;
    }

    public timeScale: number = 1;

    private _cli_isInNight: boolean = false;

    private _cli_isEnable: boolean = false;

    onUpdate(dt: number): void {
        this._timer += dt * this.timeScale;
        // 根据策划需求改
        if (SystemUtil.isServer()) {
            if (this._timer >= AllTimeSecond) {
                this._isCallNightAction = false
                ModuleService.getModule(TimeModuleS).dayAction.call();
                this._timer -= AllTimeSecond;
                this._dayTime++;
                this.timeState = ETimeState.DayLight;
            }

            // 入夜前十秒
            if (this._timer >= (DayTimeSecond - 10) && !this._isCallNightAction) {
                this.timeState = ETimeState.ReadyNight;
            }

            if (this._timer >= DayTimeSecond && !this._isCallNightAction) {
                this._isCallNightAction = true
                ModuleService.getModule(TimeModuleS).nightAction.call();
                this.timeState = ETimeState.Night;
            }
        }
    }

    public enterNight() {
        this._isCallNightAction = false;
        this._timer = DayTimeSecond;
    }


    private onTimeChanged() {
        if (!this.timeModuleC) {
            console.error("------等待Time模块加载-----");
            return;
        }
        this.timeModuleC.timer = this._timer;
        if (!this._cli_isEnable) {
            return;
        }
        let isInNight = this._timer >= DayTimeSecond;
        let lan = LanUtil.getText(isInNight ? "tips_show_12" : "tips_show_11");
        if (!isInNight) {
            let timeStr = CommonUtils.FormatTimeMS(DayTimeSecond - this._timer);
            UIService.getUI(TipsUI).showCatTips(CommonUtils.formatString(lan, timeStr));
        }
        else {
            UIService.getUI(TipsUI).showCatTips(lan);
        }

        if (isInNight != this._cli_isInNight) {
            this._cli_isInNight = isInNight;
            Fog.enabled = this._cli_isInNight;
        }
    }

    /** 时间状态改变 */
    private onTimeStateChange() {
        let bgmCfgId = BGMSoundCfgIDList[this.timeState];
        StartProcedureStateClient.BGMSoundItemCfgId = bgmCfgId;
        let pm = ModuleService.getModule(ProcedureModuleC);
        if (pm && pm.myScript && pm.myScript.state === EmProcedureState.Start) {
            MusicMgr.instance.play(bgmCfgId);
        }
    }

    /** 天数增加一天 */
    private onDayAdd() {
        // 游戏开始阶段，天数改变了的回调
        let pm = ModuleService.getModule(ProcedureModuleC);
        if (pm && pm.myScript && pm.myScript.state === EmProcedureState.Start) {
            UIService.getUI(MainUI).addAliveDay();
        }
    }

}