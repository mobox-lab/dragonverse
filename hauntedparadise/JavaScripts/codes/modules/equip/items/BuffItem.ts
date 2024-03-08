import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import { DialogUI } from "../../../ui/DialogUI";
import { BuffModuleC } from "../../buff/BuffModule";
import { EquipModuleC } from "../EquipModuleC";
import { Item, registerItem } from "./Item";

@registerItem
export class BuffItem extends Item {

    public onHand(element: IItemElement, go: GameObject, ownerId: number): void {

    }

    public onRemoveHand(element: IItemElement): void {

    }

    protected onUse(element: IItemElement, useCount: number): boolean {
        const buffCfg = GameConfig.Buff.getElement(element.clazzParam[0]);
        const module = ModuleService.getModule(BuffModuleC);
        const checkConflict = module.checkValConflict(buffCfg.type, buffCfg.value);
        if (checkConflict) {
            UIService.getUI(DialogUI).show(StringUtil.format("已经生效了同种类型的{0}, 是否取代（记得接多语言）", element.name), (res: boolean) => {
                if (res) {
                    if (ModuleService.getModule(EquipModuleC).removeItem(Player.localPlayer.playerId, useCount)) {
                        module.reqAddBuff(buffCfg.id, useCount);
                    }
                }
            })
        } else {
            module.reqAddBuff(buffCfg.id, useCount);
        }
        return !checkConflict;
    }
}
