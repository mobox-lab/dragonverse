import { Singleton } from "../../depend/singleton/Singleton";
import { GameConfig } from "../../config/GameConfig";

export enum BagTypes {
    /**
     * 空置.
     */
    Null,
    /**
     * 收集物.
     */
    CollectibleItem,
    /**
     * 龙.
     */
    Dragon,
}

export default class BagItemCluster extends Singleton<BagItemCluster>() {
    private _clusterCache: Map<number, BagTypes> = new Map<number, BagTypes>();

    private _clusterSet: Map<BagTypes, Set<number>> = new Map<BagTypes, Set<number>>();

    protected onConstruct(): void {
        super.onConstruct();

        initCollectibleItemCluster();
        initDragonCluster();
    }

    /**
     * 类型查询.
     * memoize.
     * @param bagId
     */
    public queryType(bagId: number): BagTypes {
        let type = this._clusterCache.get(bagId);
        if (type !== undefined) {
            return type;
        }
        for (let [key, value] of this._clusterSet.entries()) {
            if (value.has(bagId)) {
                type = key;
                break;
            }
        }

        if (type === undefined) {
            return BagTypes.Null;
        }
        this._clusterCache.set(bagId, type);
        return type;
    }

    /**
     * 是否 指定类型.
     * @param bagId
     * @param type
     */
    public isType(bagId: number, type: BagTypes): boolean {
        return this.queryType(bagId) === type;
    }
}

function initCollectibleItemCluster() {
    const configs = GameConfig.CollectibleItem.getAllElement();
    const set = new Set<number>();
    for (const config of configs) {
        set.add(config.bagId);
    }

    this._clusterSet.set(BagTypes.CollectibleItem, set);
}

function initDragonCluster() {
    const configs = GameConfig.Dragon.getAllElement();
    const set = new Set<number>();
    for (const config of configs) {
        set.add(config.bagId);
    }

    this._clusterSet.set(BagTypes.Dragon, set);
}