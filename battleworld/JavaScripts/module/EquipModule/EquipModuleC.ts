import { MapEx, oTraceError } from "odin";
import { GameConfig } from "../../config/GameConfig";
import { EEquipPartType, EModule_Events } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { EquipModuleS } from "./EquipModuleS";
import { EquipModuleData } from "./EquipModuleData";
import { EquipManager } from "./EquipManager";



/**
 * 单端装备模块
 * 1. 注意其它玩家离开 注意清楚武器模型缓存
 */

export class EquipModuleC extends ModuleC<EquipModuleS, EquipModuleData>
{

    protected onStart(): void {

        EquipManager.instance.init();

        EventManager.instance.add(EModule_Events.equip_addEquip, this.listen_addEquip.bind(this));
        EventManager.instance.add(EModule_Events.equip_removeEquip, this.listen_removeEquip.bind(this));

    }



    /**添加装备 */
    private listen_addEquip(itemId: number) {
        this.server.net_addEquip(itemId);

        let equipCfg = GameConfig.Equip.getElement(itemId);
        if (equipCfg == null) {
            return;
        }
        this.data.changePartEquipId(equipCfg.type, itemId);
    }

    /**移除装备 */
    private listen_removeEquip(itemId: number) {

        this.server.net_removeEquip(itemId);

        let equipCfg = GameConfig.Equip.getElement(itemId);
        if (equipCfg == null) {
            return;
        }
        this.data.changePartEquipId(equipCfg.type, 0);
    }


    /**
     * 获取部位的装备id
     */
    public getPartEquipId(type: EEquipPartType) {

        if (MapEx.has(this.data.equipData, type) == false) {
            return 0
        }

        return MapEx.get(this.data.equipData, type);
    }

    /**是否使用该装备 */
    public isEquiped(itemId: number) {
        let equipCfg = GameConfig.Equip.getElement(itemId);
        if (equipCfg == null) {
            return false;
        }

        if (MapEx.has(this.data.equipData, equipCfg.type) == false) {
            return false
        }

        let useEquipId = MapEx.get(this.data.equipData, equipCfg.type);

        return useEquipId == itemId;
    }


}