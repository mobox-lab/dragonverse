import { IEvtCom, RegisterEvt } from "./IEvtCom";

@RegisterEvt
export class SoundEvt implements IEvtCom {
    evtName: string = "playersound";

    onGetCall(goid: string,soundId: string,volStr: string,lengthStr: string) {
        let go = GameObject.findGameObjectById(goid);
        let soundArr = soundId.split("|");
        let vol = 1;
        if (volStr) { 
            vol = Number(volStr);
        }
        const id = SoundService.play3DSound(soundArr[MathUtil.randomInt(0,soundArr.length)], go.worldTransform.position, 1, vol);
        if (lengthStr) {
            let length = Number(lengthStr);
            setTimeout(() => {
                SoundService.stop3DSound(id);
            }, length * 1000);
        }
    } 
}
