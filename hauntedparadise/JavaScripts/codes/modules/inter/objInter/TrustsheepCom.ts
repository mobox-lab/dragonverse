import { MainUI } from "../../../ui/MainUI";
import { UtilEx } from "../../../utils/UtilEx";
import { BoardHelper } from "../../blackboard/BoardDefine";
import { CameraModuleC } from "../../camera/CameraModule";
import { InterEvtData, ObjInterDefine } from "../ObjInterDefine";
import { InterSafeEvt } from "../evtCom/InterSafeEvt";
import ObjInterScript from "./ObjInterScript";


/** 托管组件 */
@Component
export default class TrustSheepCom extends Script {

    @Property({ displayName: "托管摄像机guid", capture: true })
    public lockCameraGuid: string = "";

    @mw.Property({ group: "事件设置", displayName: "交互成功后触发事件" })
    public evtDataArr: InterEvtData[] = [new InterEvtData()];

    /** 其他的摄像机 */
    otherCamera: Camera;

    protected override onStart(): void {
        //this.gameObject["interTag"] = "inter";
        Event.addLocalListener("evt_interact", async (go: string) => {
            if (go != this.gameObject.gameObjectId) { return; }
            //(this.gameObject as Model).setCollision(PropertyStatus.Off, true);
            ObjInterDefine.dispatchClientByData(this.evtDataArr, this.gameObject.gameObjectId);
            UIService.hide(MainUI);
            this.otherCamera && CameraModuleC.shiftOtherCameraLockThis(this.otherCamera);
        });

        Event.addLocalListener(BoardHelper.BoardLoadingEvt, async () => {
            this.otherCamera = await Camera.asyncFindGameObjectById(this.lockCameraGuid) as Camera;
        })
    }
}