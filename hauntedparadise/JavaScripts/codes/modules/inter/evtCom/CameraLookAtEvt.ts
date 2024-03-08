import { CommonUtils } from "../../../utils/CommonUtils";
import { IEvtCom, RegisterEvt } from "./IEvtCom";


@RegisterEvt
export class CameraLookAtEvt implements IEvtCom {
    evtName: string = "CameraLookAtEvt";

    onGetCall(goid: string, offsetStr: string = "0|0|0") {
        let go = GameObject.findGameObjectById(goid);
        if (offsetStr == undefined || offsetStr == null || offsetStr == "") {
            offsetStr = "0|0|0";
        }
        if (go) {
            const offset = CommonUtils.string2Vec(offsetStr)
            Camera.currentCamera.rotationLagEnabled = true;
            Camera.currentCamera.lookAt(go.worldTransform.position.add(offset));
            let lastRot = Camera.currentCamera.worldTransform.rotation.clone();
            let interval = setInterval(() => {
                if (Camera.currentCamera.worldTransform.rotation.equals(lastRot, 0.1)) {
                    Camera.currentCamera.rotationLagEnabled = false;
                    interval && clearInterval(interval);
                    interval = null;
                }
                lastRot = Camera.currentCamera.worldTransform.rotation.clone();
            }, 1)
            setTimeout(() => {
                Camera.currentCamera.rotationLagEnabled = false;
                interval && clearInterval(interval);
            }, 5000);
        }
    }
}
