import { Singleton } from "../../depend/singleton/Singleton";
import { GameConfig } from "../../config/GameConfig";

export enum BagType {
    /**
     * 空置.
     */
    Null,
    CollectibleItem,
    Dragon,
}

export default class BagItemCluster extends Singleton<BagItemCluster>() {
    private _clusterCache: Map<number, BagType> = new Map<number, BagType>();

    private _clusterSet: Map<BagType, Set<number>> = new Map<BagType, Set<number>>();

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
    public queryType(bagId: number) {
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
            return BagType.Null;
        }
        this._clusterCache.set(bagId, type);
        return type;
    }
}

function initCollectibleItemCluster() {
    const configs = GameConfig.CollectibleItem.getAllElement();
    const set = new Set<number>();
    for (const config of configs) {
        set.add(config.bagId);
    }

    this._clusterSet.set(BagType.CollectibleItem, set);
}

function initDragonCluster() {
    const configs = GameConfig.Dragon.getAllElement();
    const set = new Set<number>();
    for (const config of configs) {
        set.add(config.bagId);
    }

    this._clusterSet.set(BagType.Dragon, set);
}