import LevelBase from "../../Level/LevelBase";
import { ArchiveData } from "../../archive/ArchiveHelper";
import { InterEvtData, ObjInterDefine } from "../ObjInterDefine";
import { RecColorUI } from "./ui/RecColorUI";
@Serializable
export class ReckLockData {
    @Property({ displayName: "目标区域", tooltip: "填写范围(0~360)" })
    public area: Vector2 = new Vector2(30, 60);

    @Property({ displayName: "控制显隐的特效(1~3)" })
    public goId: string = "";
}


@Component
export default class ReckLock extends LevelBase {
    @Property({ displayName: "正确角度范围" })
    public targetDataArr: ReckLockData[] = [new ReckLockData()];

    @Property({ displayName: "旋转速度" })
    public rotSpeed: number = 45;

    @Property({ group: "事件设置", displayName: "成功事件" })
    public sucEvtDataArr: InterEvtData[] = [new InterEvtData()];

    @Property({ group: "事件设置", displayName: "单步骤成功事件" })
    public sucOnceEvtDataArr: InterEvtData[] = [new InterEvtData()];

    @Property({ group: "事件设置", displayName: "失败事件" })
    public failEvtDataArr: InterEvtData[] = [new InterEvtData()];

    public isUnlocked: boolean = false;

    protected onLevelStart(): void {
        if (SystemUtil.isServer()) {
            return;
        }
        this.addLocalListen("RecLock", (goId: string) => {
            if (goId != this.gameObject.gameObjectId) {
                return;
            }
            if (this.isUnlocked) {
                ObjInterDefine.dispatchClientByData(this.sucEvtDataArr.filter(e => { return e.evtName != "showTips" }), this.gameObject.gameObjectId);
                return;
            }
            UIService.show(RecColorUI, this);
        })
    }

    onLoadData(data: ArchiveData) {
        let isUnlock = this.getSaveStatId(data);
        if (!isUnlock) {
            this.isUnlocked = false;
            return;
        }
        this.isUnlocked = true;
        ObjInterDefine.dispatchClientByData(this.sucEvtDataArr, this.gameObject.gameObjectId);
    }
}
