import { MapEx } from "odin";
import { EEquipPartType } from "../../const/Enum";
import { Globaldata } from "../../const/Globaldata";


/**装备数据 */
export class EquipModuleData extends Subdata {

    public get dataName() {
        return "EquipModuleData";
    }

    /**玩家背包装备数据 */
    @Decorator.persistence()
    public equipData: MapEx.MapExClass<number> = {}

    protected initDefaultData() {
        this.equipData = {};
    }

    //当前最新的版本号(默认是1，升级数据需要重写)
    protected override get version() {
        return 2;
    }

    protected onDataInit(): void {
        if (!this.currentVersion) {
            this.currentVersion = 1;
        }
        let checkCount = 10;
        while (this.version != this.currentVersion) {
            checkCount--;
            if (checkCount <= 0) break;
            switch (this.currentVersion) {
                case 1:
                    this.currentVersion = 2;//设置当前版本
                    //删掉上线的测试数据
                    if (MapEx.has(this.equipData, 3) && MapEx.get(this.equipData, 3) == 101021) {
                        MapEx.del(this.equipData, 3);
                    }
                    break;
                default:
                    console.log("未处理的数据版本~");
            }
        }
    }

    /**
     * 修改部位的装备
     */
    public changePartEquipId(partType: EEquipPartType, equipId: number) {

        if (equipId > 0) {
            MapEx.set(this.equipData, partType, equipId);
            return;
        }

        if (MapEx.has(this.equipData, partType) == false) {
            return;
        }

        MapEx.del(this.equipData, partType);
    }


}