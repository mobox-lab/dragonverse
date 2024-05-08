import { Singleton } from "../depend/singleton/Singleton";
import { GameConfig } from "../config/GameConfig";

/**
 * 背包类型枚举.
 * @flag
 */
export enum BagTypes {
    /**
     * 空置.
     */
    Null = 0,
    /**
     * 收集物.
     */
    CollectibleItem = 1 << 1,
    /**
     * 龙.
     */
    Dragon = 1 << 2,
}

/**
 * 角色类型枚举.
 */
export enum CharacterTypes {
    /**
     * 空置.
     */
    Null = 0,
    /**
     * 主角.
     */
    MainRole = 1 << 1,
    /**
     * Npc
     */
    Npc = 1 << 2,
}

export default class ForeignKeyIndexer extends Singleton<ForeignKeyIndexer>() {
    private _bagItemIndexCache: Map<number, BagTypes> = new Map<number, BagTypes>();

    private _bagItemTypeSet: Map<BagTypes, Set<number>> = new Map<BagTypes, Set<number>>();

    private _bagItemForDragonIndexCache: Map<number, number> = new Map();

    private _dragonHabitatMap: Map<number, number[]> = new Map();

    private _characterIndexCache: Map<number, CharacterTypes> = new Map<number, CharacterTypes>();

    private _characterTypeSet: Map<CharacterTypes, Set<number>> = new Map<CharacterTypes, Set<number>>();

    protected onConstruct(): void {
        super.onConstruct();

        this.initCollectibleItemIndexer();
        this.initDragonIndexer();
        this.initNpcIndexer();
    }

    /**
     * 背包物 类型查询.
     * memoize.
     * @param bagId
     */
    public queryBagItemType(bagId: number): BagTypes {
        let type = this._bagItemIndexCache.get(bagId);
        if (type !== undefined) {
            return type;
        }
        for (let [key, value] of this._bagItemTypeSet.entries()) {
            if (value.has(bagId)) {
                type = key;
                break;
            }
        }

        if (type === undefined) {
            return BagTypes.Null;
        }
        this._bagItemIndexCache.set(bagId, type);
        return type;
    }

    /**
     * 查询背包物对应的龙.
     * @param {number} bagId
     * @return {number}
     */
    public queryDragonByBagId(bagId: number): number | undefined {
        return this._bagItemForDragonIndexCache.get(bagId);
    }

    /**
     * 是否 背包物是指定类型.
     * @param bagId
     * @param type
     */
    public isBagItemType(bagId: number, type: BagTypes): boolean {
        return (this.queryBagItemType(bagId) & type) > 0;
    }

    /**
     * 角色 类型查询.
     * memoize.
     * @param characterId
     */
    public queryCharacterType(characterId: number): CharacterTypes {
        let type = this._characterIndexCache.get(characterId);
        if (type !== undefined) {
            return type;
        }
        for (let [key, value] of this._characterTypeSet.entries()) {
            if (value.has(characterId)) {
                type = key;
                break;
            }
        }

        if (type === undefined) {
            return CharacterTypes.Null;
        }
        this._characterIndexCache.set(characterId, type);
        return type;
    }

    /**
     * 查询 栖居地 所拥有龙.
     * @param {number} habitatId
     * @return {number[]}
     */
    public queryDragonOfHabitat(habitatId: number): number[] {
        return [...this._dragonHabitatMap.get(habitatId)];
    }

    /**
     * 是否 角色是指定类型.
     * @param bagId
     * @param type
     */
    public isCharacterType(bagId: number, type: CharacterTypes): boolean {
        return (this.queryBagItemType(bagId) & type) > 0;
    }

    private initCollectibleItemIndexer() {
        const configs = GameConfig.CollectibleItem.getAllElement();
        const set = new Set<number>();
        for (const config of configs) {
            set.add(config.bagId);
        }

        this._bagItemTypeSet.set(BagTypes.CollectibleItem, set);
    }

    private initDragonIndexer() {
        const configs = GameConfig.Dragon.getAllElement();
        const set = new Set<number>();
        for (const config of configs) {
            set.add(config.bagId);
            this._bagItemForDragonIndexCache.set(config.bagId, config.id);

            for (const habitatId of config.dragonHabitatIds) {
                if (this._dragonHabitatMap.has(habitatId)) {
                    this._dragonHabitatMap
                        .get(habitatId)
                        .push(config.id);
                } else this._dragonHabitatMap.set(habitatId, [config.id]);
            }
        }

        this._bagItemTypeSet.set(BagTypes.Dragon, set);
    }

    private initNpcIndexer() {
        const configs = GameConfig.Npc.getAllElement();
        const set = new Set<number>();
        for (const config of configs) {
            set.add(config.characterId);
        }

        this._characterTypeSet.set(CharacterTypes.Npc, set);
    }
}