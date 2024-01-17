import { AreaModuleC } from "../../module/AreaModule/AreaModuleC";





@Serializable
export class SoundParam {
    @mw.Property({ displayName: "内部半径(默认200)" })
    public innerRadius: number = 200;
    @mw.Property({ displayName: "衰减距离(默认600)" })
    public falloffDistance: number = 600;
}

export class RP_DestroyManager {

    private static _instance: RP_DestroyManager = null;

    public static get instance(): RP_DestroyManager {
        if (this._instance == null) {
            this._instance = new RP_DestroyManager();
        }
        return this._instance;
    }

    private saveAllDestroyGuid: Map<number, mw.GameObject[]> = new Map();

    private mArea: AreaModuleC = null;

    constructor() {
        this.saveAllDestroyGuid = new Map();
    }

    public save(areaID: number, destroyObj: mw.GameObject) {
        if (!this.saveAllDestroyGuid.has(areaID)) {
            this.saveAllDestroyGuid.set(areaID, []);
        }
        let arr = this.saveAllDestroyGuid.get(areaID);
        if (arr.indexOf(destroyObj) == -1) {
            arr.push(destroyObj);
        }
    }

    /**
     * 获取指定区域的可破坏交互物
     * @param areaID 区域id
     * @returns 可能为空
     */
    public getArrByAreaID(areaID: number): mw.GameObject[] {
        if (!this.saveAllDestroyGuid.has(areaID)) {
            return null;
        }
        return this.saveAllDestroyGuid.get(areaID);
    }

    /**
     * 获取当前区域的所有可破坏交互物
     * @returns 可能为空
     */
    public getCurAreaDestroys(): mw.GameObject[] {
        if (this.mArea == null) {
            this.mArea = ModuleService.getModule(AreaModuleC);
        }
        //这里目前的key只有-1，应该是还没处理这块的逻辑？
        return this.saveAllDestroyGuid.get(-1);
        // if (!this.saveAllDestroyGuid.has(this.mArea.curAreaId)) {
        //     return null;
        // }
        // return this.saveAllDestroyGuid.get(this.mArea.curAreaId);
    }
}