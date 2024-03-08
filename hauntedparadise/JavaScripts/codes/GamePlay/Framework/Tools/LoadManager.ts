/** 是否打开调试log */
const openLowLog: boolean = true;

class LoadItem {
    public assid: string = "";
    public callback: (value: any) => void;
    public failCount: number = 0;
    public promise: Promise<any>;
    public resolve: (value: any) => void;

    public set(callback: (value: any) => void) {
        this.callback = callback;
    }

    public reset() {
        this.failCount = 0;
    }
}

class GoResLoader {
    /** 同时下载的数目 */
    public loadCount: number = 1;
    /** 下载失败的重试次数 */
    public loadRetryCount: number = 3;

    private _curLoadCount: number = 0;
    private _loadList: LoadItem[] = [];

    public async loadAssets(assid: string, proity: number): Promise<boolean> {
        if (AssetUtil.assetLoaded(assid)) {
            return true;
        }
        let find = this._loadList.find(e => { return e.assid == assid });
        if (find) {
            openLowLog && console.log("[LowLog]寻找了相同的加载需求")
            await find.promise;
            return AssetUtil.assetLoaded(assid);
        }
        let item = new LoadItem()
        item.reset();
        item.assid = assid;
        return await this.load(assid, proity, item);
    }

    private async load(assid: string, proity: number, item: LoadItem): Promise<boolean> {
        item.promise = new Promise((resolve) => {
            item.resolve = resolve;
        });
        await new Promise((resolve) => {
            item.set(resolve);
            this._loadList.push(item)
        });
        if (AssetUtil.assetLoaded(assid)) {
            openLowLog && console.log("[LowLog]需求资源已经下载" + assid)
            return true;
        }
        this._curLoadCount++;
        const res = await AssetUtil.asyncDownloadAsset(assid);
        this._curLoadCount--;
        if (res) {
            item.resolve(true);
            openLowLog && console.log("[LowLog]下载资源成功" + assid)
            return true;
        }
        openLowLog && console.log("[LowLog]下载资源失败" + assid + "重试次数" + item.failCount)
        if (item.failCount >= this.loadRetryCount) {
            item.resolve(false);
            return false;
        }
        item.failCount++;
        return await this.load(assid, proity, item);
    }

    public onUpdate() {
        if (this._loadList.length == 0) {
            return;
        }
        for (let index = this._curLoadCount; index < this.loadCount; index++) {
            if (this._loadList.length == 0) {
                return;
            }
            let item = this._loadList.shift();
            item.callback(true);
        }
    }
}

class GoSpawner {
    /** 每次生成的数目 */
    public spawnCount: number = 1;
    /** 每次生成间隔开的帧数 */
    public spawnInterval: number = 1;
    /** 每次生成的重试次数 */
    public spawnRetryCount: number = 3;

    private _loadList: LoadItem[] = [];
    private _spawnTimer: number = 0;

    public async spawnGo(assid: string, goInfo?: mw.GameObjectInfo) {
        let item = new LoadItem()
        item.reset();
        item.assid = assid;
        return await this.spawn(assid, item, goInfo);
    }

    private async spawn(assid: string, item: LoadItem, goInfo?: mw.GameObjectInfo) {
        await new Promise((resolve) => {
            item.set(resolve);
            this._loadList.push(item)
        })
        const res = await GameObject.asyncSpawn(assid, goInfo);
        if (res && res.worldTransform) {
            openLowLog && console.log("[LowLog]生成物体成功" + assid)
            return res;
        }
        openLowLog && console.log("[LowLog]生成物体失败" + assid + "重试次数" + item.failCount)
        if (item.failCount >= this.spawnRetryCount) {
            return res;
        }
        item.failCount++;
        return await this.spawn(assid, item, goInfo);
    }

    public onUpdate() {
        this._spawnTimer++;
        if (this.spawnInterval > this._spawnTimer) {
            return;
        }
        this._spawnTimer = 0;
        if (this._loadList.length == 0) {
            return;
        }
        for (let index = 0; index < this.spawnCount; index++) {
            if (this._loadList.length == 0) {
                return;
            }
            let item = this._loadList.shift();
            item.callback(true);
        }
    }
}

class LoadManager {
    public static get instance(): LoadManager {
        if (!this._instance) {
            this._instance = new LoadManager();
        }
        return this._instance;
    }
    private static _instance: LoadManager;

    public isOpenLog: boolean = false;

    private _loader: GoResLoader;

    private _spanwer: GoSpawner;

    public constructor() {
        this._loader = new GoResLoader();
        this._spanwer = new GoSpawner();
        TimeUtil.onEnterFrame.add(() => {
            this._loader.onUpdate();
            this._spanwer.onUpdate();
        })
    }
    /**
     * 设置下载资源的参数
     * @param loadCount 同时下载的数目
     * @param loadRetryCount 下载失败的重试次数
     */
    public setLoadParams(loadCount: number, loadRetryCount: number) {
        this._loader.loadCount = loadCount;
        this._loader.loadRetryCount = loadRetryCount
    }

    /**
     * 设置生成物体的参数
     * @param spawnCount 每次生成的数目
     * @param spawnInterval 每次生成间隔开的帧数
     * @param retryCount 每次生成的重试次数
     */
    public setSpawnParams(spawnCount: number, spawnInterval: number, retryCount: number) {
        this._spanwer.spawnCount = spawnCount;
        this._spanwer.spawnInterval = spawnInterval;
        this._spanwer.spawnRetryCount = retryCount;
    }

    /**
     * 生成物体
     * @param assid 物品id
     * @param info 物品的信息
     * @returns 生成的示例，失败会返回null
     */
    public async asyncSpawn<T extends GameObject>(assid: string, info?: mw.GameObjectInfo): Promise<T> {
        let loadRes = await this._loader.loadAssets(assid, 0);
        if (!loadRes) {
            console.error("[LoadManager]加载资源失败" + assid)
            return null;
        }
        let go = await this._spanwer.spawnGo(assid, info);
        return go as T;
    }
}

export const LoadMgr = LoadManager.instance;
