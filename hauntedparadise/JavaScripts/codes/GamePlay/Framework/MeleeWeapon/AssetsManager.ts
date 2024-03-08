import { MapEx } from "../../../utils/MapEx";
import { LoadMgr } from "../Tools/LoadManager";

export class AssetsManager {

    // 资源池
    public static assetsPool: MapEx.MapExClass<mw.GameObject[]> = {};

    /**
     * 释放一个资源到对象池
     * @param go 
     */
    public static releaseGameObject2Pool<T extends mw.GameObject>(go: T) {

        if (go instanceof mw.GameObject) {
            if (!MapEx.has(AssetsManager.assetsPool, go.assetId)) {
                MapEx.set(AssetsManager.assetsPool, go.assetId, []);
            }
            MapEx.get(AssetsManager.assetsPool, go.assetId).push(go);
            go.setVisibility(mw.PropertyStatus.Off, true);
        }

    }

    /**
     * 创建gameobject
     * @param guid 
     * @param bInReplicates 
     * @returns 
     */
    public static async getGameObject<T extends mw.GameObject>(guid: string, bInReplicates?: boolean): Promise<T> {

        if (MapEx.has(AssetsManager.assetsPool, guid)) {
            let cache = MapEx.get(AssetsManager.assetsPool, guid);
            if (cache.length > 0) {
                let res = cache.shift() as T;
                res.setVisibility(mw.PropertyStatus.On, true);
                return res;
            }
        }
        if (mw.AssetUtil.assetLoaded(guid)) {
            return LoadMgr.asyncSpawn(guid, { replicates: bInReplicates }) as unknown as T;
        } else {
            let res = await mw.AssetUtil.asyncDownloadAsset(guid)
            if (res) {
                if (mw.AssetUtil.assetLoaded(guid)) {
                    return LoadMgr.asyncSpawn(guid, { replicates: bInReplicates }) as unknown as T;
                }
            }
        }
        return null;
    }
}