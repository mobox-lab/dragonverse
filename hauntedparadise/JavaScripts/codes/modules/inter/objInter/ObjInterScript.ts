/*
 * @Author       : dal
 * @Date         : 2023-12-25 18:28:36
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-08 15:45:05
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\inter\objInter\ObjInterScript.ts
 * @Description  : 
 */
import { PlayerManagerExtension } from "../../../Modified027Editor/ModifiedPlayer";
import { WaitLoop } from "../../../utils/AsyncTool";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { UtilEx } from "../../../utils/UtilEx";
import { BoardHelper } from "../../blackboard/BoardDefine";
import { InterEvtData, ObjInterDefine } from "../ObjInterDefine";
import { PlayerInterModuleC } from "../PlayerInterModule";
import { InterSafeEvt } from "../evtCom/InterSafeEvt";

@Component
export default class ObjInterScript extends Script {
    @Property({ displayName: "是否单人享用" })
    public isSingle: boolean = false;

    @Property({ displayName: "交互姿态" })
    public interactStance: string = "86093";

    @Property({ displayName: "安全类型" })
    public safeStat: string = "";

    @Property({ displayName: "出来后的相对位置" })
    public releasePos: Vector = new Vector(100, 0, 0);

    @Property({ displayName: "交互插槽", enumType: HumanoidSlotType })
    public interSlot: HumanoidSlotType = HumanoidSlotType.Root;

    @Property({ displayName: "是否旋转摄像头" })
    public isRotateCamera: boolean = true;

    @mw.Property({ group: "事件设置", displayName: "交互成功后触发事件" })
    public evtDataArr: InterEvtData[] = [new InterEvtData()];

    @mw.Property({ group: "事件设置", displayName: "交互退出后触发事件" })
    public exitEvtDataArr: InterEvtData[] = [new InterEvtData()];

    protected onStart(): void {
        this.gameObject["interTag"] = "inter";
        Event.addLocalListener("evt_interact", async (go: string) => {
            if (!this.gameObject) await WaitLoop.loop(() => { return this.gameObject });
            if (go != this.gameObject.gameObjectId) {
                return;
            }
            let res = await ModuleService.getModule(PlayerInterModuleC).reqInter(this);
            if (res) {
                (this.gameObject as Model).setCollision(PropertyStatus.Off, true);
                Event.dispatchToLocal(InterSafeEvt.evtName, this.gameObject.gameObjectId, this.safeStat)
                ObjInterDefine.dispatchClientByData(this.evtDataArr, this.gameObject.gameObjectId);
            }
            GhostTraceHelper.interTrace(2, this.safeStat == "bed" ? 0 : 1, this.gameObject.gameObjectId, res);
        });
        Event.addLocalListener(BoardHelper.BoardLoadingEvt, () => {
            UtilEx.asyncLoadAsset(this.interactStance);
        })
    }

    public leave() {
        (this.gameObject as Model).setCollision(PropertyStatus.On, true);
        Event.dispatchToLocal(InterSafeEvt.evtName, this.gameObject.gameObjectId, "");
        ObjInterDefine.dispatchClientByData(this.exitEvtDataArr, this.gameObject.gameObjectId);
    }
}