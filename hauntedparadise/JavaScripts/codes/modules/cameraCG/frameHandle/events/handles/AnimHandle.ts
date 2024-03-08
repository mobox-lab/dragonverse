import { EventsHandle } from "../EventsHandle";
import { registerCSEvent } from "../EventsHelper";
import { UICSAnimInfo } from "../ui/UICSAnimInfo";


export type AnimParams = {
    assetId: string,
    targetId: string,
    speed: number
    loopCount: number,
}

@registerCSEvent(AnimHandle.EVENT, "动画", UICSAnimInfo)
export class AnimHandle extends EventsHandle {

    static readonly EVENT = "CS.Anim";

    getDefParams(): AnimParams {
        return {
            assetId: "14625",
            targetId: "",
            speed: 1,
            loopCount: 1,
        };
    }

    onEvent(paramsText: string): void {
        const params = JSON.parse(paramsText) as AnimParams;
        AssetUtil.asyncDownloadAsset(params.assetId).then(async (asset) => {
            let char: Character = null;
            if (params.targetId || params.targetId != "") {
                char = (await GameObject.asyncFindGameObjectById(params.targetId)) as Character;
            } else {
                char = (await Player.asyncGetLocalPlayer()).character;
            }
            if (!char) return;
            const anim = char.loadAnimation(params.assetId);
            anim.speed = params.speed;
            anim.loop = params.loopCount;
            anim.play();
        });
    }

}
