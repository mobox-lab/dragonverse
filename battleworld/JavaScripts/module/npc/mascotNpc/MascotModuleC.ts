import { SpawnManager } from "../../../Modified027Editor/ModifiedSpawn";
import { GameConfig } from "../../../config/GameConfig";
import { EAreaId } from "../../../const/Enum";
import { AreaModuleC } from "../../AreaModule/AreaModuleC";
import PlayerHeadUI from "../../PlayerModule/UI/PlayerHeadUI";
import { Attribute } from "../../PlayerModule/sub_attribute/AttributeValueObject";
import SceneUnit from "../SceneUnit";
import { UnitManager } from "../UnitManager";
import { MascotModuleS } from "./MascotModuleS";

/** 
 * @Author       : fengqi.han
 * @Date         : 2023-11-28 13:38:56
 * @LastEditors  : fengqi.han
 * @LastEditTime : 2023-12-26 14:51:38
 * @FilePath     : \battleworld\JavaScripts\module\npc\mascotNpc\MascotModuleC.ts
 * @Description  : 修改描述
 */
export class MascotModuleC extends ModuleC<MascotModuleS, null> {


    /**
     * 获取怪物即时属性
     * @param sceneID 
     * @param type 
     * @param isAdd 
     * @returns 
     */
    public getSceneUnitAttr(unitID: number, type: Attribute.EnumAttributeType, isAdd: boolean = true) {
        let vo = UnitManager.instance.getUnit(unitID);

        if (vo == null) {
            console.error("logicerror====getSceneUnitAttr " + unitID);
            return;
        }

        return vo.getValue(type, isAdd);
    }

}