import { TipsUI } from "../../../ui/TipsUI";
import { MapEx } from "../../../utils/MapEx";
import Tips from "../../../utils/Tips";
import LevelBase from "../../Level/LevelBase";
import { ArchiveData } from "../../archive/ArchiveHelper";
import { BoardHelper } from "../../blackboard/BoardDefine";
import { HandTrigger } from "../HandTrigger";
import { InterEvtData, ObjInterDefine } from "../ObjInterDefine";
import { RotColorUI } from "./ui/RotColorUI";
@Serializable
export class RotLockData {
    @Property({ displayName: "相对偏移量", tooltip: "填写范围(0~360)" })
    public area: number = 0;
}



@Component
export default class RotLock extends LevelBase {
    @Property({ displayName: "控制目标", capture: true })
    public captrueTarget: string = "";

    @Property({ displayName: "旋转角度" })
    public rotRate: number = 45;

    @Property({ displayName: "目标旋转角度", tooltip: "填写范围（0~360）" })
    public targetRot: number = 0;

    @Property({ displayName: "旋转速度" })
    public rotSpeed: number = 45;

    @Property({ displayName: "正确角度范围(最多三个)" })
    public targetDataArr: RotLockData[] = [new RotLockData()];

    @Property({ group: "事件设置", displayName: "触发事件" })
    public evtDataArr: InterEvtData[] = [new InterEvtData()];

    public isUnlocked: boolean = false;

    protected onLevelStart(): void {
        if (SystemUtil.isServer()) {
            return;
        }
        this.addLocalListen(BoardHelper.BoardClearEvent, () => {
            this.isUnlocked = false;
        })
        this.addLocalListen("RotLock", (goId: string) => {
            if (goId != this.gameObject.gameObjectId) {
                return;
            }
            if (this.isUnlocked) {
                ObjInterDefine.dispatchClientByData(this.evtDataArr.filter(e => { return e.evtName != "showTips" }), this.gameObject.gameObjectId);
                return;
            }
            UIService.show(RotColorUI, this);
        })
    }

    onLoadData(data: ArchiveData) {
        let isUnlock = this.getSaveStatId(data);
        if (!isUnlock) {
            this.isUnlocked = false;
            return;
        }
        this.isUnlocked = true;
        ObjInterDefine.dispatchClientByData(this.evtDataArr, this.gameObject.gameObjectId);
    }
}