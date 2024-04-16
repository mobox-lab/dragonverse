type LoadProgress = (cur: number, total: number) => void;

class RuntimeAssetManager extends lighter.assets.AssetsManager {


    constructor() {

        super();
    }



    startLoad(progress?: LoadProgress) {
        let legacyCacheAssetPool = (globalThis as any).legacyCacheAssetPool || Object.create(null);

        for (const key of Object.keys(legacyCacheAssetPool)) {
            const asset = legacyCacheAssetPool[key];
            this.loadAsset(JSON.parse(asset));
        }
        (globalThis as any).legacyCacheAssetPool = {};
        this.loadAssetsComplete();
        progress?.call(null, 1, 1);
    }
}

(lighter.asset as any) = new RuntimeAssetManager();
lighter.asset.startLoad();
export { };

