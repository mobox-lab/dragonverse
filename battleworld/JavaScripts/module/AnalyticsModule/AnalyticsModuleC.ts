import { EAnalyticsEvents } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { AnalyticsModuleData } from "./AnalyticsModuleData";
import { AnalyticsModuleS } from "./AnalyticsModuleS";
import { AnalyticsTool, ECoreStep, EFirstDo } from "./AnalyticsTool";


export class AnalyticsModuleC extends ModuleC<AnalyticsModuleS, AnalyticsModuleData> {

    protected onStart(): void {
        EventManager.instance.add(EAnalyticsEvents.firstDo, this.listen_firstDo, this);

        EventManager.instance.add(EAnalyticsEvents.coreStepStart, this.listen_coreStepStart, this);

        EventManager.instance.add(EAnalyticsEvents.coreStep, this.listen_coreStep, this);
        EventManager.instance.add(EAnalyticsEvents.coreStepEnd, this.listen_coreStepEnd, this);

        EventManager.instance.add(EAnalyticsEvents.guide_start, this.listen_guideStart, this);
        EventManager.instance.add(EAnalyticsEvents.guide_step, this.listen_guideStep, this);
        EventManager.instance.add(EAnalyticsEvents.guide_end, this.listen_guideEnd, this);



        // 进入游戏触发核心循环埋点
        this.listen_coreStepStart();
    }

    /**引导开始 */
    private listen_guideStart() {

        let key = "ts_tutorial_start";

        if (this.data.getRecords().includes(key)) {
            return;
        }
        this.data.addRecord(key);
        this.server.net_firstDo(key);

        AnalyticsTool.send_ts_tutorial_start();
    }

    /**
     * 新手引导的步骤埋点
     * @param guide 
     */
    private listen_guideStep(step: string) {

        let key = `ts_tutorial_step${step}`;

        if (StringUtil.isEmpty(key)) {
            return;
        }

        if (this.data.getRecords().includes(key)) return;

        this.data.addRecord(key);

        this.server.net_firstDo(key);

        AnalyticsTool.send_ts_tutorial_step(step);
    }

    /**新手引导结束 */
    private listen_guideEnd() {

        let key = `ts_tutorial_end`;

        if (StringUtil.isEmpty(key)) {
            return;
        }

        if (this.data.getRecords().includes(key)) return;

        this.data.addRecord(key);

        this.server.net_firstDo(key);

        AnalyticsTool.send_ts_tutorial_end();
    }



    private listen_coreStepStart() {
        if (this.data.getCoreRecords().includes(ECoreStep.coreStart)) {
            return;
        }

        AnalyticsTool.send_ts_coregameplay_start();

        this.data.addCoreRecord(ECoreStep.coreStart);
        this.server.net_coreStep(ECoreStep.coreStart);
    }

    private listen_coreStep(step: ECoreStep) {
        if (this.data.getCoreRecords().includes(step)) {
            return;
        }

        AnalyticsTool.send_ts_coregameplay_step(step);

        this.data.addCoreRecord(step);
        this.server.net_coreStep(step);
    }

    private listen_coreStepEnd() {
        if (this.data.getCoreRecords().includes(ECoreStep.coreEnd)) {
            return;
        }

        // 判断是否都满足了
        let records = this.data.getCoreRecords();
        let values = Object.values(ECoreStep);
        let isAllHas = true;
        for (let index = 0; index < values.length; index++) {
            const step = values[index];
            if (isNaN(Number(step))) {
                continue;
            }
            let tmpStep = Number(step);
            if (tmpStep <= 0) {
                continue;
            }

            if (records.includes(tmpStep) == false) {
                isAllHas = false;
                break;
            }
        }

        if (isAllHas == false) {
            return;
        }

        this.data.addCoreRecord(ECoreStep.coreEnd);
        this.server.net_coreStep(ECoreStep.coreEnd);
        AnalyticsTool.send_ts_coregameplay_end();
    }

    /**首次做某事 */
    private listen_firstDo(doNameEnum: EFirstDo) {


        let doName = EFirstDo[doNameEnum];

        if (StringUtil.isEmpty(doName)) {
            return;
        }

        if (this.data.getRecords().includes(doName)) return;

        this.data.addRecord(doName);

        this.server.net_firstDo(doName);

        AnalyticsTool.send_ts_action_firstdo(doName);
    }

    public net_firstDo(doName: string) {
        AnalyticsTool.send_ts_action_firstdo(doName);
    }

}