
import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import { EquipModuleC } from "../EquipModuleC";
import { EquipModuleS } from "../EquipModuleS";

/** 道具注册器 */
export function registerItem<T extends { new(...args: any[]): Item }>(constructor: T): T {
    if (SystemUtil.isClient()) {
        const instance = new constructor();
        ModuleService.ready().then(() => {
            console.error("注册道具类 : " + instance.constructor.name);
            ModuleService.getModule(EquipModuleC).clazzMap.set(instance.constructor.name, instance);
        });
        return constructor;
    }
    if (SystemUtil.isServer()) {
        return constructor;
    }
}

/** 道具注册器 */
export function registerItemS<T extends { new(...args: any[]): ItemS }>(constructor: T): T {
    if (SystemUtil.isServer()) {
        const instance = new constructor();
        ModuleService.ready().then(() => {
            console.error("注册道具类 : " + instance.constructor.name);
            ModuleService.getModule(EquipModuleS).clazzMap.set(instance.constructor.name, instance);
        });
        return constructor;
    }
    if (SystemUtil.isClient()) {
        return constructor;
    }
}


/** 道具基类 */
export abstract class Item {

    constructor() {
        ModuleService.ready().then(() => {
            this.onReg();
        })
    }

    protected onReg(): void { };

    protected isOwner(pid: number) {
        return pid === Player.localPlayer.playerId;
    }

    // /** 手持合法性验证 */
    // public async handVerify(): Promise<boolean> {
    //     return true;
    // }

    // /** 使用合法性验证 */
    // public async useVerify(): Promise<boolean> {
    //     return true;
    // }

    /** 手持触发效果 */
    public hand(element: IItemElement, itemIns: GameObject, ownerId: number): void { this.onHand(element, itemIns, ownerId); }

    /** 移除手持 */
    public removeHand(element: IItemElement, ownerId: number): void { this.onRemoveHand(element, ownerId); }

    /** 触发道具效果 */
    public use(element: IItemElement, useCount: number): boolean { return this.onUse(element, useCount); };

    protected abstract onHand(element: IItemElement, itemIns: GameObject, ownerId: number): void;

    protected abstract onRemoveHand(element: IItemElement, ownerId: number): void;

    protected abstract onUse(element: IItemElement, useCount?: number): boolean;

    public setText(itemIns: GameObject, txt: string) {

    };

}

export abstract class ItemS {

    constructor() {
        ModuleService.ready().then(() => {
            this.onReg();
        })
    }

    public hand(playerId: number, itemId: number): void {
        let element = GameConfig.Item.getElement(itemId);
        this.onHand(playerId, element);
    }

    public removeHand(playerId: number, itemId: number): void {
        let element = GameConfig.Item.getElement(itemId);
        this.onRemoveHand(playerId, element);
    }

    protected abstract onReg(): void;

    protected abstract onHand(playerId: number, element: IItemElement): void;

    protected abstract onRemoveHand(playerId: number, element: IItemElement): void;

}
