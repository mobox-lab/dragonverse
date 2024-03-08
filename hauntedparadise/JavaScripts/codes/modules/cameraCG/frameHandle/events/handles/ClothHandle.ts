import { EventsHandle } from "../EventsHandle";
import { registerCSEvent } from "../EventsHelper";
import { UICSAnimInfo } from "../ui/UICSAnimInfo";


export type ClothParams = {
    assetId: string,
    targetId: string
}

@registerCSEvent(AnimHandle.EVENT, "换装", UICSAnimInfo)
export class AnimHandle extends EventsHandle {

    static readonly EVENT = "CS.ChangeCloth";

    getDefParams(): ClothParams {
        return {
            assetId: "self",
            targetId: "guid"
        };
    }

    onEvent(paramsText: string): void {
        const params = JSON.parse(paramsText) as ClothParams;
        AssetUtil.asyncDownloadAsset(params.assetId).then(async (asset) => {
            let char: Character = null;
            if (params.targetId || params.targetId != "") {
                char = (await GameObject.asyncFindGameObjectById(params.targetId)) as Character;
            } else {
                char = (await Player.asyncGetLocalPlayer()).character;
            }
            if (!char) return;

            if (params.assetId != "self") {
                char.setDescription([params.assetId])
            }
            else {
                let player = Player.localPlayer;
                if (!player || !player.character || !player.character.worldTransform) return;
                let des = player.character.getDescription();
                char.setDescription(des);
            }
        });
    }

}
