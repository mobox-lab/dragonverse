export class GoPool {
    /** @internal */
    private constructor() {
        return;
    }
    // @internal
    private static instance: GoPool;
    // private static gameplayObjs: Array<string> = [];

    /**
     * @description 获取对象池全局实例
     * @effect 调用端生效
     * @returns 对象池全局实例
     */
    public static getInstance(): GoPool {
        if (GoPool.instance == null) {
            GoPool.instance = new GoPool();
        }
        return GoPool.instance;
    }

    /**
     * @description 销毁对象池全局实例
     * @effect 调用端生效
     */
    public destroy(): void {
        this.clearAll();
        GoPool.instance = null;
    }
    // @internal
    private readonly POOL_RES_TYPE: string = "POOL_RES_TYPE";// 对象类型，归还对象的时候使用
    // @internal
    private readonly POOL_RES_GUID: string = "POOL_RES_GUID";// 对象GUID，归还对象的时候使用

    // @internal
    private sceneSource: Map<string, GameObject> = new Map();// 场景中的原始资源
    // @internal
    private subPoolMap: Map<GameObjPoolSourceType, Map<string, Array<GameObject>>> = new Map();// [资源类型][guid][对象列表]

    private defTransform: Transform = new Transform(
        new Vector(0, 0, -2000),
        new Rotation(0, 0, 0),
        new Vector(1, 1, 1)
    );

    /**
     * @description 生成一个对象
     * @precautions 注意如果是资源库中的资源，需要把原始资源预加载
     * @effect 调用端生效
     * @param guid usage: 资源GUID
     * @param type usage: 资源类型 default: 资源库中的资源
     * @returns 生成的对象
     */
    public spawn<T extends GameObject>(guid: string, type: GameObjPoolSourceType = GameObjPoolSourceType.Asset): T {
        let obj: T = this.getFreeObj<T>(guid, type);
        if (obj == null) obj = this.spawnGo<T>(guid, type);
        this.resetObj(obj);
        return obj;
    }
    /**
     * @description 异步生成一个对象
     * @precautions 注意需要把原始资源预加载
     * @effect 调用端生效
     * @param guid usage: 资源GUID
     * @param type usage: 资源类型 default: 资源库中的资源
     * @returns 生成的对象
     */
    public async asyncSpawn<T extends GameObject>(guid: string, type: GameObjPoolSourceType = GameObjPoolSourceType.Asset): Promise<T> {
        let obj: T = this.getFreeObj<T>(guid, type);
        if (obj == null) obj = await this.asyncSpawnGo<T>(guid, type);
        this.resetObj(obj);
        return obj;
    }
    /**
     * @internal
     * 获取一个闲置的对象
     */
    private getFreeObj<T extends GameObject>(guid: string, type: GameObjPoolSourceType): T {
        const subPool = this.getSubPool(type, guid);
        if (subPool.length > 0) {
            const obj = subPool.pop();
            obj.setVisibility(PropertyStatus.On);
            return obj as T;
        }
        return null;
    }
    /**
     * @internal
     * 重置一个对象
     */
    private resetObj(go: GameObject) {
        if (go == null) return;
        if (go.parent != null) {
            // go.detachFromGameObject();
            go.parent = null;
        }
        go.setVisibility(PropertyStatus.On);
    }
    /**
     * @internal
     */
    private spawnGo<T extends GameObject>(guid: string, type: GameObjPoolSourceType): T {
        let obj = null;
        switch (type) {
            case GameObjPoolSourceType.Asset:
                obj = GameObject.spawn(guid, { transform: this.defTransform.clone(), replicates: false });
                if (obj == null) {
                    console.error("GoPool: The resource has no preloaded or non-existent guid! guid=" + guid);
                }
                break;
            case GameObjPoolSourceType.Prefab:
                obj = GameObject.spawn(guid, { transform: this.defTransform.clone(), replicates: false });
                if (obj == null) {
                    console.error("GoPool: Prefab of this guid does not exist! guid=" + guid);
                }
                break;
            case GameObjPoolSourceType.Scene:
                if (this.sceneSource.has(guid)) {
                    obj = this.sceneSource.get(guid).clone();
                } else {
                    obj = GameObject.findGameObjectById(guid);
                    if (obj != null) {
                        this.sceneSource.set(guid, obj);
                    } else {
                        console.error("GoPool: The gameObject of guid cannot be found in scene! guid=" + guid);
                    }
                }
                break;
            default:
                break;
        }
        if (obj != null) {
            obj.setVisibility(PropertyStatus.On);
            obj[this.POOL_RES_TYPE] = type;
            obj[this.POOL_RES_GUID] = guid;
        }
        return obj;
    }
    /**
     * @internal
     */
    private async asyncSpawnGo<T extends GameObject>(guid: string, type: GameObjPoolSourceType): Promise<T> {
        let obj = null;
        switch (type) {
            case GameObjPoolSourceType.Asset:
                if (!AssetUtil.assetLoaded(guid)) {
                    const isSuccess = await AssetUtil.asyncDownloadAsset(guid);
                    if (isSuccess) {
                        obj = await GameObject.asyncSpawn(guid, { transform: this.defTransform.clone(), replicates: false });
                    } else {
                        console.error("GoPool: Resource loading failed! guid=" + guid);
                    }
                } else {
                    obj = GameObject.spawn(guid, { transform: this.defTransform.clone(), replicates: false });
                }
                break;
            case GameObjPoolSourceType.Prefab:
                obj = await GameObject.asyncSpawn(guid, { transform: this.defTransform.clone(), replicates: false });
                if (obj == null) {
                    console.error("GoPool: Prefab of this guid does not exist! guid=" + guid);
                }
                break;
            case GameObjPoolSourceType.Scene:
                if (this.sceneSource.has(guid)) {
                    obj = this.sceneSource.get(guid).clone();
                } else {
                    obj = await GameObject.asyncFindGameObjectById(guid);
                    if (obj != null) {
                        this.sceneSource.set(guid, obj);
                    } else {
                        console.error("GoPool: The gameObject of guid cannot be found in scene! guid=" + guid);
                    }
                }
                break;
            default:
                break;
        }
        if (obj != null) {
            obj.setVisibility(PropertyStatus.On);
            obj[this.POOL_RES_TYPE] = type;
            obj[this.POOL_RES_GUID] = guid;
        }
        return obj;
    }
    /**
     * @internal
     * 获取一个子对象池
     */
    private getSubPool(type: GameObjPoolSourceType, guid: string): GameObject[] {
        if (!this.subPoolMap.has(type)) {
            this.subPoolMap.set(type, new Map());
        }
        if (!this.subPoolMap.get(type).has(guid)) {
            this.subPoolMap.get(type).set(guid, []);
        }
        return this.subPoolMap.get(type).get(guid);
    }
    /**
     * @description 归还一个对象
     * @effect 调用端生效
     * @param obj usage: 要归还的对象
     */
    public despawn(obj: GameObject): void {
        if (obj == null) return;
        const type: GameObjPoolSourceType = obj[this.POOL_RES_TYPE];
        const guid: string = obj[this.POOL_RES_GUID];
        if (guid == null || type == null) return;
        const subPool = this.getSubPool(type, guid);
        if (subPool.includes(obj)) return;
        subPool.push(obj);
        obj.worldTransform.position = new Vector(0, 0, -2000);
        // obj.detachFromGameObject();
        obj.setVisibility(PropertyStatus.Off);
    }
    /**
     * @description 清除对象池中该GUID对应的所有对象
     * @effect 调用端生效
     * @param guid usage: 资源GUID
     * @param type usage: 资源类型 default: 资源库中的资源
     */
    public clear(guid: string, type: GameObjPoolSourceType = GameObjPoolSourceType.Asset): void {
        const subPool = this.getSubPool(type, guid);
        for (let i = 0; i < subPool.length; i++) {
            subPool[i].destroy();
        }
        subPool.length = 0;
    }
    /**
     * @description 清除对象池里的所有对象
     * @effect 调用端生效
     */
    public clearAll(): void {
        this.subPoolMap.forEach((subPool) => {
            subPool.forEach((objArr) => {
                for (let i = 0; i < objArr.length; i++) {
                    objArr[i].destroy();
                }
            });
        });
        this.subPoolMap.clear();
    }
    /**
     * @description 找一个对象
     * @effect 调用端生效
     * @param name usage: 对象名
     * @returns 对象
     */
    // public find(name: string): GameObject {
    //     for (const go of GameObjectManager.gameObjectGuid.values()) {
    //         if (go.parent == null && go.name == name) {
    //             return go;
    //         }
    //     }
    //     return null;
    // }
}