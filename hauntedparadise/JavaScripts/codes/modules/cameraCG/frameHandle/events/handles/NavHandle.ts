import { EventsHandle } from "../EventsHandle";
import { registerCSEvent } from "../EventsHelper";
import { UICSNavInfo } from "../ui/UICSNavInfo";


export type NavParams = {
    targetId: string,
    position: Vector,
    radius: number,
}

@registerCSEvent(NavHandle.EVENT, "寻路", UICSNavInfo)
export class NavHandle extends EventsHandle {

    static readonly EVENT = "CS.Nav";

    static resetPool = new Map<GameObject, Transform>();

    getDefParams(): NavParams {
        return {
            targetId: "",
            position: Vector.zero,
            radius: 0,
        };
    }

    onReSet(): void {
        NavHandle.resetPool.forEach((transform, obj) => {
            Navigation.stopFollow(obj);
            obj.worldTransform = transform.clone();
        })
        // NavHandle.resetPool.clear();
    }

    onEvent(paramsText: string): void {
        const params = JSON.parse(paramsText) as NavParams;
        params.position = new Vector(params.position.x, params.position.y, params.position.z);
        (async () => {
            let char: Character = null;
            if (params.targetId || params.targetId != "") {
                char = (await GameObject.asyncFindGameObjectById(params.targetId)) as Character;
            } else {
                char = (await Player.asyncGetLocalPlayer()).character;
            }
            if (!char) return;
            if (!NavHandle.resetPool.has(char)) {
                NavHandle.resetPool.set(char, char.worldTransform.clone());
            }
            Navigation.stopFollow(char);
            Navigation.navigateTo(char, params.position, params.radius);
        })()
    }

}
