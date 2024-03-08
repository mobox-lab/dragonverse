import { GameConfig } from "../../../config/GameConfig";
import { UtilEx } from "../../../utils/UtilEx";
import { BuildModuleS } from "../BuildModuleS";
import { BuildingInfo } from "../building/BuildingInfo";
import { BuildingEditorHelper } from "../helper/BuildingEditorHelper";
import { BuildingHelper } from "../helper/BuildingHelper";
import { BuildingItem } from "../building/BuildingItem";

export class BuildingSpawner {
    private timer = 0;
    private buildingSet = new Set<string>();

    constructor(private spawnTime: number, private maxCount: number, private cfgIds: number[], private trigger: Trigger) {
        this.timer = 1;
    }

    /**
     * 距离多久产生下一个水果
     */
    public get restTime() {
        return this.timer;
    }

    /**
     * 是否停产中
     */
    public get isStopSpawn() {
        return this.spawnTime == this.timer;
    }

    show() {
        ModuleService.getModule(BuildModuleS).spawner.add(this);
        if (this.cfgIds.length == 1 && this.cfgIds[0] == 1) {
            ModuleService.getModule(BuildModuleS).fruitArr.push(this);
        }
    }
    hide() {
        ModuleService.getModule(BuildModuleS).spawner.delete(this);
    }
    checkRemove(uuid: string) {
        this.buildingSet.delete(uuid);
    }
    checkSpawn(dt: number) {
        if (!this.trigger) return;
        if (this.buildingSet.size >= this.maxCount) {
            return;
        }
        this.timer -= dt;
        if (this.timer <= 0) {
            this.timer = this.spawnTime;

            const size = this.trigger.getBoundingBoxExtent()
            const center = this.trigger.worldTransform.position;
            const startPos = new Vector(center.x + UtilEx.MathEx.rangeFloat(-size.x, size.x), center.y + UtilEx.MathEx.rangeFloat(-size.y, size.y), center.z + UtilEx.MathEx.rangeFloat(-size.z, size.z));
            const res = QueryUtil.lineTrace(startPos.clone().add(Vector.down.multiply(-100)), startPos.clone().add(Vector.down.multiply(4000)), true, true);
            for (let hit of res) {
                if (BuildingEditorHelper.defaultExclude(hit.gameObject)) continue;

                const itemId = UtilEx.MathEx.rangeItem(this.cfgIds, false);
                const itemCfg = GameConfig.Item.getElement(itemId);
                // 检测是否为道具
                if (itemCfg.clazz != BuildingItem.name) {
                    break;
                }
                const buildingCfg = BuildingHelper.getBuildCfgByItemId(itemId);
                // 生成建筑
                const info = new BuildingInfo();
                info.itemId = itemId;
                info.pos = hit.impactPoint;
                info.rot = hit.impactNormal.toRotation().add(new Rotation(0, -90, 0));
                info.hp = buildingCfg.hp;
                info.creatorId = "";

                const hitBuilding = BuildingHelper.tryGetBuildingByGO(hit.gameObject);
                if (hitBuilding && StringUtil.isEmpty(hitBuilding.info.ownerId) == false) {
                    break;
                }
                if (hitBuilding) {
                    info.parentUUID = hitBuilding.info.uuid;
                }
                ModuleService.getModule(BuildModuleS).net_createBuilding([info], Math.random().toString());
                // console.log("BuildingSpawner", info.uuid, info.itemId, info.pos, info.rot);
                this.buildingSet.add(info.uuid);
                break;
            }
        }


    }
}
/**
 * 建筑生成触发器
 */
@Component
export default class BuildingSpawnTrigger extends Script {

    @Property({ group: "设置", displayName: "生成道具(itemId)" })
    spawnCfgIds = [1];

    @Property({ group: "设置", displayName: "生成时间" })
    spawnTime = 1;

    @Property({ group: "设置", displayName: "最大数量" })
    maxCount = 2;

    /**
     * 已生成的info
     */
    infoArr: BuildingInfo[] = [];
    protected onStart(): void {
        if (SystemUtil.isServer()) {
            ModuleService.ready().then(() => {
                new BuildingSpawner(this.spawnTime, this.maxCount, this.spawnCfgIds, this.gameObject as Trigger).show();
            });
        }
    }





}