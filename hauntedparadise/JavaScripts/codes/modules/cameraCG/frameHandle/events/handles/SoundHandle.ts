import { EventsHandle } from "../EventsHandle";
import { registerCSEvent } from "../EventsHelper";
import { UICSSoundInfo } from "../ui/UICSSoundInfo";


export type SoundParams = {
    assetId: string,
    targetId: string,
    loopCount: number,
    volume: number,
    keepTime: number
}

@registerCSEvent(SoundHandle.EVENT, "音效", UICSSoundInfo)
export class SoundHandle extends EventsHandle {

    static readonly EVENT = "CS.Sound";

    getDefParams(): SoundParams {
        return {
            assetId: "self",
            targetId: "",
            loopCount: 1,
            volume: 1,
            keepTime: 0
        };
    }

    onEvent(paramsText: string): void {
        const params = JSON.parse(paramsText) as SoundParams;
        AssetUtil.asyncDownloadAsset(params.assetId).then(async (asset) => {
            let go: GameObject = null;
            if (params.targetId && params.targetId != "") {
                go = (await GameObject.asyncFindGameObjectById(params.targetId)) as Character;
            } else {
                go = Camera.currentCamera
            }
            if (!go) return;
            let soundId = SoundService.play3DSound(params.assetId, go, params.loopCount, params.volume);
            if (params.keepTime > 0) {
                setTimeout(() => {
                    SoundService.stop3DSound(soundId);
                }, params.keepTime * 1000);
            }

        });
    }

}
