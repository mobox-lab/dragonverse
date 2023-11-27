import { GameConfig } from "../../config/GameConfig";
import { IBagItemElement } from "../../config/BagItem";
import { Yoact } from "../../depend/yoact/Yoact";
import IUnique from "../../depend/yoact/IUnique";
import YoactArray from "../../depend/yoact/YoactArray";
import createYoact = Yoact.createYoact;
import GToolkit from "../../util/GToolkit";
import CollectibleItem from "../collectible-item/CollectibleItem";

export default class BagModuleData extends Subdata {
    //@Decorator.persistence()
    //public isSave: bool;

    public static config(bagId: number): IBagItemElement {
        return GameConfig.BagItem.getElement(bagId);
    }

    @Decorator.persistence()
    public itemsMap: object = {};

    @Decorator.persistence()
    public gold: number = 0;

    protected initDefaultData(): void {
        this.itemsMap = {};
        this.gold = 0;
    }

    /**
     * 添加物品.
     * 不会使结果 <0.
     * @param bagId
     * @param count
     */
    public addItem(bagId: number, count: number) {
        if (!this.itemsMap[bagId]) {
            this.itemsMap[bagId] = 0;
        }
        this.itemsMap[bagId] += count;
        if (this.itemsMap[bagId] < 0) {
            this.itemsMap[bagId] = 0;
        }
    }

    /**
     * 查询 背包指定物品数量.
     * 当不存在时 返回 0.
     * @param bagId
     */
    public getItemCount(bagId: number) {
        return this.itemsMap[bagId] ?? 0;
    }

    public removeItem(bagId: number) {
        delete this.itemsMap[bagId];
    }

    public removeAllItem() {
        this.itemsMap = {};
    }

    public getGold() {
        return this.gold;
    }

    public addGold(count: number): boolean {
        if (count > 0) {
            this.gold += count;
            return true;
        } else {
            const target = this.gold - count;
            this.gold = target >= 0 ? target : 0;
            return target >= 0;
        }
    }

    /**
     * 是否 可以支付.
     * @param price
     */
    public isAfford(price: number) {
        return this.gold >= price;
    }
}

export class BagItemUnique implements IUnique {
    public id: number;
    public count: number;

    public static arrayFromObject(data: BagModuleData): BagItemUnique[] {
        const result: BagItemUnique[] = [];
        for (const key in data.itemsMap) {
            const element = data.itemsMap[key] as number;
            result.push(new BagItemUnique(
                Number(key),
                element));
        }
        return result;

    }

    constructor(id: number, count: number) {
        this.id = id;
        this.count = count;
    }

//#region IUnique
    public move(updated: this): boolean {
        let changed: boolean = false;
        if (this.count !== updated.count) {
            changed = true;
            this.count = updated.count;
        }

        return changed;
    }

    public primaryKey = (): number => this.id;

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

/**
 * Bag Module.
 *
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
export class BagModuleC extends ModuleC<BagModuleS, BagModuleData> {
//#region Member
    public bagItemYoact: YoactArray<BagItemUnique> = new YoactArray<BagItemUnique>();

    public goldYoact: { count: number } = createYoact({count: 0});
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onStart(): void {
        super.onStart();

//#region Member init
        this.bagItemYoact.setAll(BagItemUnique.arrayFromObject(this.data));
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Event Subscribe
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    protected onEnterScene(sceneType: number): void {
        super.onEnterScene(sceneType);
    }

    protected onDestroy(): void {
        super.onDestroy();
//#region Event Unsubscribe
        //TODO_LviatYi 
//#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Method
    /**
     * 查询 背包指定物品数量.
     * @param bagId
     */
    public getItemCount(bagId: number): number {
        return this.bagItemYoact.getItem(bagId)?.count ?? 0;
    }

    /**
     * 添加或删除指定数量的 BagItem.
     * @param bagId BagItem id.
     * @param count 数量.
     * @param autoRemove 自动移除. 当使得物品数量为 0 时, 是否自动移除.
     */
    public addItem(bagId: number, count: number, autoRemove: boolean = true) {
        const setCount = this.getItemCount(bagId) + count;
        GToolkit.log(BagModuleC, () => {
            return `add item.
    playerId: ${this.localPlayerId}. 
    id: ${bagId}. 
    current count: ${this.getItemCount(bagId)}. 
    target count: ${setCount}.
    autoRemove: ${autoRemove}.`;
        });
        this.selfSetItem(bagId, autoRemove && !setCount ? null : setCount);
        this.server.net_addItem(bagId, count, autoRemove);
    }

    /**
     * 移除物品.
     * @param bagId
     */
    public removeItem(bagId: number) {
        GToolkit.log(BagModuleC, () => {
            return `remove item.
    playerId: ${this.localPlayerId}. 
    id: ${bagId}. 
    current count: ${this.getItemCount(bagId)}.`;
        });
        this.selfSetItem(bagId);
        this.server.net_removeItem(bagId);
    }

    /**
     * 是否 可以支付.
     * @param price
     */
    public isAfford(price: number): boolean {
        return this.data.isAfford(price);
    }

    /**
     * 设定 Client BagItem 数量.
     * @param bagId
     * @param count
     *      - >=0 设定数量.
     *      - null default. 移除物品.
     * @private
     */
    private selfSetItem(bagId: number, count: number = null) {
        const item = this.bagItemYoact.getItem(bagId);
        if (item) {
            if (count === null) {
                this.bagItemYoact.removeItem(bagId);
            } else {
                item.count = count;
            }
        } else {
            if (count === null) return;
            this.bagItemYoact.addItem(new BagItemUnique(bagId, count));
        }
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Net Method
    public net_setItem(bagId: number, count: number, autoRemove: boolean = true) {
        this.selfSetItem(bagId, autoRemove && !count ? null : count);
    }

    public net_setGold(count: number) {
        this.goldYoact.count = count;
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class BagModuleS extends ModuleS<BagModuleC, BagModuleData> {
//#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onStart(): void {
        super.onStart();

//#region Member init     
//#endregion ------------------------------------------------------------------------------------------ 

//#region Event Subscribe
//#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    protected onDestroy(): void {
        super.onDestroy();
//#region Event Unsubscribe
        //TODO_LviatYi 
//#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

    protected onPlayerLeft(player: Player): void {
        super.onPlayerLeft(player);
    }

    protected onPlayerEnterGame(player: Player): void {
        super.onPlayerEnterGame(player);
    }

    protected onPlayerJoined(player: Player): void {
        super.onPlayerJoined(player);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Method
    /**
     * 添加金币.
     * @param playerId
     * @param count
     */
    public addGold(playerId: number, count: number) {
        const playerData = this.getPlayerData(playerId);
        playerData.addGold(count);
        playerData.save(false);
        this.getClient(playerId).net_setGold(playerData.getGold());
    }

    /**
     添加或删除指定数量的 BagItem.
     * @param playerId 玩家 id.
     * @param bagId BagItem id.
     * @param count 数量.
     * @param autoRemove 自动移除. 当使得物品数量为 0 时, 是否自动移除.
     *      true default.
     */
    public addItem(playerId: number, bagId: number, count: number, autoRemove: boolean = true) {
        const playerData = this.getPlayerData(playerId);
        GToolkit.log(BagModuleS, () => {
            return `add item.
    playerId: ${playerId}. 
    id: ${bagId}. 
    current count: ${playerData.getItemCount(bagId)}. 
    target count: ${playerData.getItemCount(bagId) + count}.
    autoRemove: ${autoRemove}.`;
        });

        playerData.addItem(bagId, count);
        if (autoRemove && playerData.getItemCount(bagId) === 0) {
            playerData.removeItem(bagId);
        }
        playerData.save(false);

        this.getClient(playerId).net_setItem(
            bagId,
            playerData.getItemCount(bagId),
            autoRemove);
    }

    /**
     * 移除物品
     * @param playerId
     * @param bagId
     */
    public removeItem(playerId: number, bagId: number) {
        const playerData = this.getPlayerData(playerId);
        GToolkit.log(BagModuleS, () => {
            return `add item.
    playerId: ${playerId}. 
    id: ${bagId}. 
    current count: ${playerData.getItemCount(bagId)}.`;
        });
        playerData.removeItem(bagId);
        playerData.save(false);
    }


//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Net Method
    public net_addItem(bagId: number, count: number, autoRemove: boolean = true) {
        this.addItem(this.currentPlayerId, bagId, count, autoRemove);
    }

    public net_removeItem(bagId: number) {
        this.removeItem(this.currentPlayerId, bagId);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}