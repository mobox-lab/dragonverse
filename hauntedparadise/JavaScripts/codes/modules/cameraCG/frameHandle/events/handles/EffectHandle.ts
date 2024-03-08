import { EventsHandle } from "../EventsHandle";
import { registerCSEvent } from "../EventsHelper";
import { UICSEffectInfo } from "../ui/UICSEffectInfo";


export type EffectParams = {
    targetId?: string,
    assetId: string,
    position: Vector,
    loopCount: number,
    rotation: Rotation;
    scale: Vector;
}

@registerCSEvent(EffectHandle.EVENT, "特效", UICSEffectInfo)
export class EffectHandle extends EventsHandle {

    static readonly EVENT = "CS.Effect";

    getDefParams(): EffectParams {
        return {
            assetId: "14335",
            position: Vector.zero,
            loopCount: 1,
            rotation: Rotation.zero,
            scale: Vector.one
        };
    }

    onEvent(paramsText: string): void {
        const params = JSON.parse(paramsText) as EffectParams;
        params.position = new Vector(params.position.x, params.position.y, params.position.z);
        params.rotation = new Rotation(params.rotation.x, params.rotation.y, params.rotation.z);
        params.scale = new Vector(params.scale.x, params.scale.y, params.scale.z);

        AssetUtil.asyncDownloadAsset(params.assetId).then((asset) => {
            if (params.targetId || params.targetId != "") {
                GameObject.asyncFindGameObjectById(params.targetId).then((obj) => {
                    if (!obj) return;
                    EffectService.playOnGameObject(params.assetId, obj, {
                        position: params.position,
                        loopCount: params.loopCount,
                        rotation: params.rotation,
                        scale: params.scale
                    });
                });
            } else {
                EffectService.playAtPosition(params.assetId, params.position, {
                    loopCount: params.loopCount,
                    rotation: params.rotation,
                    scale: params.scale
                });
            }
        });

    }

}
