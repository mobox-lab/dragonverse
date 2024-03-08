import { CommonUtils } from "../../utils/CommonUtils";
import { LanUtil } from "../../utils/LanUtil";
import Tips from "../../utils/Tips";
import { ArchiveData } from "../archive/ArchiveHelper";
import { InterEvtData, ObjInterDefine } from "../inter/ObjInterDefine";
import LevelBase from "./LevelBase";

@Component
export default class CandleCenter extends LevelBase {
    public static candleMap: Map<number, number> = new Map();

    @Property({ displayName: "蜡烛中心id" })
    candleId: number = 0;

    @mw.Property({ group: "事件设置", displayName: "触发事件" })
    public evtDataArr: InterEvtData[] = [new InterEvtData()];

    private _activeCount: number = 0;
    protected onStart(): void {
        super.onStart();

        Event.addLocalListener("CandleActive", (canId: number) => {
            if (canId != this.candleId) {
                return;
            }
            this._activeCount++;
            let maxCount = CandleCenter.candleMap.get(this.candleId);
            if (maxCount <= this._activeCount) {
                ObjInterDefine.dispatchClientByData(this.evtDataArr, this.gameObject.gameObjectId);
            }
        })

        Event.addLocalListener("CandleCenter", (goid: string, candleId: string) => {
            let id = Number(candleId);
            if (id != this.candleId) {
                return;
            }
            const needCount = CandleCenter.candleMap.get(this.candleId);
            const content = CommonUtils.formatString(LanUtil.getText("Door_Tips7"), needCount - this._activeCount);
            Tips.show(content);
        })
    }

    onReset(): void {
        this._activeCount = 0;
    }
}