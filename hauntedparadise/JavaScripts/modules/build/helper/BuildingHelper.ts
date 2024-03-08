/*
 * @Author       : dal
 * @Date         : 2024-01-18 14:25:53
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-18 15:31:41
 * @FilePath     : \hauntedparadise\JavaScripts\modules\build\helper\BuildingHelper.ts
 * @Description  : 
 */
import { BuildingBase } from "../building/BuildingBase";
import { GameConfig } from "../../../config/GameConfig";
import { BuildModuleC } from "../BuildModuleC";
import { BuildModuleS } from "../BuildModuleS";


export namespace BuildingHelper {

    /**
     * 一次更新多少个建筑
    */
    export let UpdateMaxCount = 20;
    /**
     * 显示个数
     */
    export let ShowCount = 200;
    /**
     * 客户端显示距离
     */
    export let ClientShowDistance = 5000;
    /**
     * 服务器显示距离
     */
    export let ServerShowDistance = 5000;

    /**
     * 建筑下落速度
     */
    export let MoveSpeed = 10;

    /**
     * 根据建筑对象的guid获取建筑实例(性能不好)
     * @param guid 
     * @returns 
     */
    export function tryGetBuildingByGuid(guid: string) {
        let buildings: IterableIterator<BuildingBase>;

        if (SystemUtil.isServer()) {
            buildings = ModuleService.getModule(BuildModuleS).buildingMap.values();
        }
        else {
            buildings = ModuleService.getModule(BuildModuleC).buildingMap.values();
        }

        for (let building of buildings) {
            if (building.checkGuid(guid)) return building;
        }
    }

    /**
     * 更高性能的方法
     * @param go 
     * @returns 
     */
    export function tryGetBuildingByGO(go: GameObject) {
        if (!go["BuildingUUID"]) return;

        if (SystemUtil.isServer()) {
            return ModuleService.getModule(BuildModuleS).buildingMap.get(go["BuildingUUID"]);
        }
        else {
            return ModuleService.getModule(BuildModuleC).buildingMap.get(go["BuildingUUID"]);
        }
    }

    /**
     * 攻击建筑
     * @param go 
     * @param damage 
     * @returns 
     */
    export function tryHurtBuilding(go: GameObject, damage: number) {
        const building = tryGetBuildingByGO(go);
        if (!building) return false;
        if (SystemUtil.isServer()) {
            ModuleService.getModule(BuildModuleS).net_ChangeBuildingHP(building.info.uuid, damage);
        }
        else {
            ModuleService.getModule(BuildModuleC).reqHurt(building.info.uuid, damage);
        }
        return true;
    }

    export function getBuildCfgByItemId(itemId: number) {
        const itemCfg = GameConfig.Item.getElement(itemId);
        if (!itemCfg) {
            throw new Error("MyTypeError itemCfg not found ,id:" + itemId);
        }
        const buildId = Number.parseInt(itemCfg.clazzParam[0])
        const buildCfg = GameConfig.Building.getElement(buildId);
        if (!buildCfg) {
            throw new Error("MyTypeError buildCfg not found ,id:" + buildId);
        }
        return buildCfg;
    }
}