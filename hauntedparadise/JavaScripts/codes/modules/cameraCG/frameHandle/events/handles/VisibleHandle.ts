import { EventsHandle } from "../EventsHandle";
import { registerCSEvent } from "../EventsHelper";
import { UICSVisibleInfo } from "../ui/UICSVisibleInfo";


export type VisibleParams = {
    targetId: string,
    visible: boolean
}

@registerCSEvent(VisibleHandle.EVENT, "显隐", UICSVisibleInfo)
export class VisibleHandle extends EventsHandle {

    static readonly EVENT = "CS.Visible";

    static resetPool = new Map<GameObject, boolean>();

    getDefParams(): VisibleParams {
        return {
            targetId: "",
            visible: true
        };
    }


    onReSet(): void {
        VisibleHandle.resetPool.forEach((visibility, obj) => {
            obj.setVisibility(visibility);
        })
    }

    onEvent(paramsText: string): void {
        const params = JSON.parse(paramsText) as VisibleParams;
        GameObject.asyncFindGameObjectById(params.targetId).then((obj) => {
            if (obj) {
                if (!VisibleHandle.resetPool.has(obj)) {
                    VisibleHandle.resetPool.set(obj, obj.getVisibility());
                }
                obj.setVisibility(params.visible);
            }
        });
    }

}