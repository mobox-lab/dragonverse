import { ProcedureModuleS } from "../../../codes/modules/procedure/ProcedureModuleS";
import { WaitLoop } from "../../../codes/utils/AsyncTool";
import { UtilEx } from "../../../utils/UtilEx";
import { HomeModuleS } from "../../home/HomeModuleS";
import { BuildModuleS } from "../BuildModuleS";
import { BuildingInfo } from "../building/BuildingInfo";

/**
 * 建筑数据
 */
export class BuildingHomeData {

    private userId: string;
    private archiveId: number;
    needSave = false;
    private buildingInfoMap: UtilEx.MapEx.MapExClass<BuildingInfo> = {};

    /**
     * 初始化建筑信息
     */
    async initBuildings(userId: string) {
        this.userId = userId;

        // 等到存档初始化好
        let archiveId: number = ProcedureModuleS.getScriptByUserID(userId).archiveID;
        if (!archiveId || archiveId === -1) {
            await WaitLoop.loop(() => { return ProcedureModuleS.getScriptByUserID(userId).archiveID != -1 }, 1e2, 30);
            archiveId = ProcedureModuleS.getScriptByUserID(userId).archiveID;
        }
        if (archiveId === -1) {
            console.error(`DEBUG MyTypeError>>> 建筑初始化可能有问题，存档错误，archiveId: ${archiveId}`);
        }

        if (archiveId === null || archiveId === undefined) {
            console.error(`DEBUG MyTypeError>>> 建筑初始化出错，读档错误，archiveId是空`);
            return;
        }

        this.archiveId = archiveId;

        const resData = await this.readDS(this.buildingKey);
        if (resData == "fail") {
            return;
        }
        else {
            console.log(`DEBUG>>> Init Building Success ${resData}`);
            // 创建建筑
            this.buildingInfoMap = JSON.parse(resData);
            const homeS = ModuleService.getModule(HomeModuleS);
            // 等家园分配好再说
            await WaitLoop.loop(() => { return homeS.homeMap.get(userId) }, 10, 1000)
            const home = homeS.homeMap.get(this.userId);
            if (!home) {
                console.error("initBuildings fail,not found home");
                return;
            }
            const infos = [];
            const homeTrans = home.gameObject.worldTransform;
            UtilEx.MapEx.forEach(this.buildingInfoMap, (k, v) => {
                v.homePos = new Vector(v.homePos.x, v.homePos.y, v.homePos.z);
                const rot = homeTrans.rotation;
                const realPos = rot.rotateVector(v.homePos);
                v.pos = homeTrans.position.clone().add(realPos);
                v.rot = homeTrans.rotation.clone().add(v.homeRot);
                infos.push(v);
            });
            ModuleService.getModule(BuildModuleS).homeCreateBuildings(infos);
        }
    }

    public async onLeave() {
        // 保存建筑信息
        this.saveBuildings();
        // 通知服务端删除建筑
        const uuids = [];
        UtilEx.MapEx.forEach(this.buildingInfoMap, (k, v) => {
            uuids.push(v.uuid);
        });
        ModuleService.getModule(BuildModuleS).homeRemoveBuildings(uuids);

    }

    private get buildingKey() {
        return this.userId + "_build_" + this.archiveId;
    }

    public clearHomeBuilding(archiveId: number) {
        const key = this.userId + "_build_" + archiveId;
        this.buildingInfoMap = {};
        this.writeDS(key, JSON.stringify(this.buildingInfoMap));
        this.needSave = true;
    }

    /**
     * 保存建筑信息
     */
    public async saveBuildings() {
        if (!this.userId) return;
        this.needSave = false;
        const json = JSON.stringify(this.buildingInfoMap);
        const key = this.buildingKey;
        this.writeDS(key, json);
    }

    /**
     * 添加家园建筑
     * @param info 
     */
    public addBuilding(info: BuildingInfo) {
        UtilEx.MapEx.set(this.buildingInfoMap, info.uuid, info);
        this.needSave = true;
    }

    /**
     * 删除建筑
     * @param uuid 
     */
    public removeBuilding(uuid: string) {
        UtilEx.MapEx.del(this.buildingInfoMap, uuid);
        this.needSave = true;
    }

    private async readDS(key: string) {
        var res = await DataStorage.asyncGetData(key)
        if (res.code != DataStorageResultCode.Success) {
            console.error("DEBUG MyTypeError>>> readDS fail", key, res.code, res.data);
            return "fail";
        }
        return res.data ? res.data : "{}";
    }

    private async writeDS(key: string, value: any) {
        return await DataStorage.asyncSetData(key, value)
    }
}

