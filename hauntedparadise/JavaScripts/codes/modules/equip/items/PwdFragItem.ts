import { IItemElement } from "../../../../config/Item";
import { Item, registerItem } from "./Item";

/**
 * 密码碎片
 */
@registerItem
export class PwdFragItem extends Item {

    public onHand(element: IItemElement): void {
    }

    public onRemoveHand(element: IItemElement): void {
    }

    protected onUse(element: IItemElement): boolean {
        return true;
    }

}
