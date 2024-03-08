import { IItemElement } from "../../../../config/Item";
import { Item, registerItem } from "./Item";

@registerItem
export class RelifeItem extends Item {
    protected onHand(element: IItemElement, itemIns: mw.GameObject, ownerId: number): void {
    }
    protected onRemoveHand(element: IItemElement, ownerId: number): void {
    }
    protected onUse(element: IItemElement, useCount?: number): boolean {
        return false;
    }
}
