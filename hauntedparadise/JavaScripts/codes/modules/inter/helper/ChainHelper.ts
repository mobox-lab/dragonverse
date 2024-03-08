import LevelBase from "../../Level/LevelBase";
import { InterEvtData } from "../ObjInterDefine";

export class ChainHelper {
    public static instance: ChainHelper = new ChainHelper();

    private chainMap: Map<string, InterEvtData[]> = new Map();

    private _evtMap: Map<string, LevelBase[]> = new Map();

    public addChain(parent: string, childs: InterEvtData[]) {

    }

    public addevt(key: string, script: LevelBase) {
        if (!this._evtMap.has(key)) {
            this._evtMap.set(key, []);
        }
        this._evtMap.get(key).push(script);
    }

    public checkChain<T extends LevelBase>(childsArr: InterEvtData[], checkEvt: string) {
        for (let index = 0; index < childsArr.length; index++) {
            const element = childsArr[index];
            if (checkEvt == element.evtName) {
                let find = this._evtMap.get(checkEvt).find(e => {
                    return e.gameObject.gameObjectId == element.targetGuid;
                });
                return find as T;
            }
        }
    }
}