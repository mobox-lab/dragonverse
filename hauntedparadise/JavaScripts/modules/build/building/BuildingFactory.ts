import { BuildingBase, DamageBuilding, Fruit, NoFuncBuilding, Spawner, Trampoline } from "./BuildingBase";
import { EmBuildingType } from "../const/EmBuildingType";
import { BuildingHelper } from "../helper/BuildingHelper";
import { BuildingInfo } from "./BuildingInfo";

/**
 * 建筑类工厂
 */
export namespace BuildingFactory {

    export async function createBuilding(info: BuildingInfo): Promise<BuildingBase> {
        const cfg = BuildingHelper.getBuildCfgByItemId(info.itemId);
        let CLz: TypeName<BuildingBase>;
        // 根据配置创建不同的建筑
        switch (cfg.type) {
            case EmBuildingType.Damage:
                CLz = DamageBuilding;
                break;
            case EmBuildingType.Trampoline:
                CLz = Trampoline;
                break;
            case EmBuildingType.Fruit:
                CLz = Fruit;
                break;
            case EmBuildingType.Spawner:
                CLz = Spawner;
                break;
            default:
                CLz = NoFuncBuilding;
                break;
        }
        const building = new CLz();
        building.init(info);
        return building;
    }


}