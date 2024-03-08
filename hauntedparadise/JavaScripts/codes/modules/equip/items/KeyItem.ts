import { IItemElement } from "../../../../config/Item";
import { Item, registerItem } from "./Item";

/**
 * 钥匙类物品
 */
@registerItem
export class KeyItem extends Item {

    public onHand(element: IItemElement): void {
    }

    public onRemoveHand(element: IItemElement): void {
    }

    protected onUse(element: IItemElement): boolean {
        return true;
    }

}

@registerItem
export class NormalItem extends Item {
    protected onHand(element: IItemElement): void {
    }
    protected onRemoveHand(element: IItemElement): void {
    }
    protected onUse(element: IItemElement): boolean {
        return true;
    }
}
