import { InterEvtNameDef, ObjInterDefine } from "../inter/ObjInterDefine";

export class CameraModuleC extends ModuleC<CameraModuleS, null> {

    private curCamera = mw.Camera.currentCamera;

    protected onStart(): void {

        this.curCamera = mw.Camera.currentCamera;
        this.regEvt();

    }

    private regEvt() {

        Event.addLocalListener(InterEvtNameDef.evt_setCamera, (guid: string, cameraGuid: string) => {

            let toCamera = mw.Camera.findGameObjectById(cameraGuid);
            mw.Camera.switch(toCamera as mw.Camera);

        })

        Event.addLocalListener(InterEvtNameDef.evt_resetCamera, (guid: string, cameraGuid: string) => {

            mw.Camera.switch(this.curCamera);


        })

    }

    /** 切换成另一个摄像机并锁定自己 */
    static shiftOtherCameraLockThis(camera: Camera) {
        if (!camera) { return; }
        Camera.switch(camera, 1);
        camera.lock(Player.localPlayer.character, {lockInterval: 1});
    }
}

export class CameraModuleS extends ModuleS<CameraModuleC, null> {



}