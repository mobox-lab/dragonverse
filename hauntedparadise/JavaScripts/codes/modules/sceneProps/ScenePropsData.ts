import { CommonUtils } from "../../utils/CommonUtils";
import { DateTimeUtil } from "../../utils/DateTimeUtil";
import { MapEx } from "../../utils/MapEx";
import { ClueSaveData } from "../archive/ArchiveHelper";
import { ScenePropsRefreshMgr } from "./ScenePropsRefreshMgr";

export class ScenePropsData extends Subdata {
    @Decorator.persistence("ps")
    public propMap: MapEx.MapExClass<ClueSaveData> = {};// ClueSaveData[] = [];

    @Decorator.persistence("pt")
    public propsRefreshTime: number = 0;


    public getPropsData() {
        let isNeedRefresh = !DateTimeUtil.isSameDay(this.propsRefreshTime);
        if (isNeedRefresh) {
            this.propsRefreshTime = Date.now();
            let props = ScenePropsRefreshMgr.instance.refreshSceneProps(99);
            for (let index = 0; index < props.length; index++) {
                const val = props[index];
                const key = `CE${index}`
                MapEx.set(this.propMap, key, val);
            }
        }
        this.save(false);
        return this.propMap;
    }

    public delProp(key: string) {
        if (MapEx.has(this.propMap, key)) {
            MapEx.del(this.propMap, key);
        }
        this.save(false);
    }
}