/*
 * @Author       : dal
 * @Date         : 2024-01-12 14:04:47
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-23 10:25:16
 * @FilePath     : \hauntedparadise\JavaScripts\modules\build\building\BuildingItem.ts
 * @Description  : 
 */
import { Item, registerItem } from "../../../codes/modules/equip/items/Item";
import { IItemElement } from "../../../config/Item";
import { BuildingEditorHelper } from "../helper/BuildingEditorHelper";
import { BuildPanel } from "../ui/BuildPanel";
import { MainUI } from "../../../codes/ui/MainUI";
import { BuildingHelper } from "../helper/BuildingHelper";
import { EmBuildingType } from "../const/EmBuildingType";
import { PlayerModuleC } from "../../../codes/modules/player/PlayerModuleC";
import PickHud from "../../../codes/modules/inter/ui/PickHud";
import Tips from "../../../codes/utils/Tips";
import { GameConfig } from "../../../config/GameConfig";
import MusicMgr from "../../../codes/utils/MusicMgr";



@registerItem
export class BuildingItem extends Item {
    protected onHand(element: IItemElement, itemIns: mw.GameObject, ownerId: number): void {
        if (ownerId != Player.localPlayer.playerId) return;
        console.log("BuildingItem onHand", element.id, ownerId);
        const hud = UIService.getUI(MainUI);
        hud.setHandVisible(false, 9);
        hud.banHandUIVisible = true;
        UIService.hide(PickHud);
        BuildingEditorHelper.instance.openEdit(element.id).then(() => {
            // 打开建造界面
            UIService.show(BuildPanel, Number(element.clazzParam[0]));
        });
    }
    protected onRemoveHand(element: IItemElement, ownerId: number): void {
        if (ownerId != Player.localPlayer.playerId) return;
        const hud = UIService.getUI(MainUI);
        hud.banHandUIVisible = false;
        BuildingEditorHelper.instance.cancelEdit()
        // 关闭建造界面
        UIService.hide(BuildPanel);

    }
    protected onUse(element: IItemElement): boolean {
        const cfg = BuildingHelper.getBuildCfgByItemId(element.id);
        if (!cfg) return false;
        switch (cfg.type) {
            case EmBuildingType.Fruit: {
                MusicMgr.instance.play(2005);
                if (ModuleService.getModule(PlayerModuleC).isHealthy()) {
                    Tips.show(GameConfig.Language["medicineTips_01"].Value);
                    setTimeout(() => {
                        MusicMgr.instance.play(2007);
                    }, 3e2);
                    return false;
                } else {
                    Tips.show(GameConfig.Language["medicineTips_02"].Value);
                    ModuleService.getModule(PlayerModuleC).changeHp(Number(cfg.dataEx[0]));
                    return true;
                }
            }
            default: return false;
        }
    }

}