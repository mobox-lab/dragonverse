import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import Tips from "../../../utils/Tips";
import { BoardHelper, BoardKeys } from "../../blackboard/BoardDefine";
import { SpecialItemStatEvt } from "../../inter/evtCom/SpecialItemStatEvt";
import { PlayerModuleC } from "../../player/PlayerModuleC";
import { Item, registerItem } from "./Item";

/**
 * 密码碎片
 */
@registerItem
export class MedicineItem extends Item {

    public onHand(element: IItemElement): void {
    }

    public onRemoveHand(element: IItemElement): void {
    }

    protected onUse(element: IItemElement): boolean {
        let degree = Number(BoardHelper.GetTargetKeyValue(BoardKeys.Degree));
        Event.dispatchToLocal(SpecialItemStatEvt.evtName, Player.localPlayer.character, element.useEffect[0][0], element.useEffect[0][degree + 1]);
        return true;
    }

}
