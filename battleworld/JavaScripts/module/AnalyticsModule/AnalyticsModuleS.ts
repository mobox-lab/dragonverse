import { EAnalyticsEvents_S } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { AnalyticsModuleC } from "./AnalyticsModuleC";
import { AnalyticsModuleData } from "./AnalyticsModuleData";
import { ECoreStep, EFirstDo } from "./AnalyticsTool";

export class AnalyticsModuleS extends ModuleS<AnalyticsModuleC, AnalyticsModuleData>
{
    protected onStart(): void {

        EventManager.instance.add(EAnalyticsEvents_S.firstDo_S, this.listen_firstDo, this);
    }

    /**首次做某事 */
    private listen_firstDo(pId: number, doNameEnum: EFirstDo) {
        let doName = EFirstDo[doNameEnum];

        if (StringUtil.isEmpty(doName)) {
            return;
        }

        let pData = this.getPlayerData(pId);
        if (pData == null) return;

        if (pData.getRecords().includes(doName)) return;

        pData.addRecord(doName);

        this.getClient(pId).net_firstDo(doName);
    }

    @Decorator.noReply()
    public net_firstDo(doName: string) {
        this.currentData.addRecord(doName);
    }

    @Decorator.noReply()
    public net_coreStep(step: ECoreStep) {
        this.currentData.addCoreRecord(step);
    }
}