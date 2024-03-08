
/** 池元素构建类 */
export abstract class PoolFactory<T> {

    /** 对象池参数 */
    public param: any[];


    constructor(t: new (...arg: any[]) => T, ...arg: any[]) {
        this.param = arg;
    }

    /** 创建函数 */
    asyncCreate(...arg: any[]): Promise<T> { return null; };

    /** 创建函数 */
    create(): T { return null; };

    /** 池中元素基类 */
    abstract destroy(obj: T): void;

    /** 池中元素基类 */
    abstract show(obj: T, ...arg: any[]): void;

    /** 池中元素基类 */
    abstract hide(obj: T): void;
}

/** 池元素生命周期监听 */
export interface IPoolListener<T1, T2 extends PoolFactory<T1>> {

    /**
     * 元素生成后初始化回调
     * @description 仅在 asyncGet 时会调用
     */
    onCreate?: (pool: ObjectPool<T1, T2>, element: T1) => Promise<void>;

    /** 元素生成后初始化回调 */
    onInit?: (pool: ObjectPool<T1, T2>, element: T1) => void;

    /** 元素显示回调 */
    onShow?: (pool: ObjectPool<T1, T2>, element: T1, ...arg: any) => void;

    /** 元素隐藏回调 */
    onHide?: (pool: ObjectPool<T1, T2>, element: T1) => void;

    /** 元素销毁回调 */
    onDestroy?: (pool: ObjectPool<T1, T2>, element: T1) => void;

}

/** 池基类 */
export class ObjectPool<T1, T2 extends PoolFactory<T1>> {

    /** 池中元素基类 */
    private _factoryClass: T2;

    /** 池操作回调 */
    private _listener: IPoolListener<T1, T2>;

    /** 池显示对象的列表 */
    public showList: T1[] = [];

    /** 池中隐藏对象的列表 */
    public hideList: T1[] = [];

    /** 构造 */
    constructor(factory: T2, listener?: IPoolListener<T1, T2>, ...arg: any[]) {
        this._factoryClass = factory;
        this._listener = listener;
    }

    /** 
     * 获取对象
     */
    public async asyncGet(...arg: any[]): Promise<T1> {
        let it: T1
        if (this.hideList.length > 0) {
            it = this.hideList.pop();
        } else {
            it = await this._factoryClass.asyncCreate(...arg);
            if (this._listener?.onCreate) {
                await this._listener.onCreate(this, it);
            }

            // 将对象池保存到 it 中
            (<any>it)._f_pool = this;
            if (this._listener?.onInit) {
                this._listener.onInit(this, it);
            }
        }

        this.showList.push(it);
        await this._factoryClass.show(it, ...arg);
        if (this._listener?.onShow) {
            this._listener.onShow(this, it, ...arg);
        }

        return it;
    }

    /** 
     * 缓存对象
     */
    public async cache(count: number): Promise<void> {
        for (let i = 0; i < count; i++) {
            let it: T1 = await this._factoryClass.asyncCreate();
            if (this._listener?.onCreate) {
                await this._listener.onCreate(this, it);
            }

            // 将对象池保存到 it 中
            (<any>it)._f_pool = this;
            this._factoryClass.hide(it);
            if (this._listener?.onInit) {
                this._listener.onInit(this, it);
            }

            this.hideList.push(it);
        }
    }

    /**
     * 获取对象
     * @description 需要确定当前加载资源已经预加载好了
     */
    public get(...arg: any[]): T1 {
        let it: T1;
        if (this.hideList.length > 0) {
            it = this.hideList.pop();
        } else {
            it = this._factoryClass.create();
            // 将对象池保存到 it 中
            (<any>it)._f_pool = this;
            if (this._listener?.onCreate) {
                this._listener.onCreate(this, it);
            }
            if (this._listener?.onInit) {
                this._listener.onInit(this, it);
            }
        }

        this.showList.push(it);
        this._factoryClass.show(it, ...arg);
        if (this._listener?.onShow) {
            this._listener.onShow(this, it, ...arg);
        }

        return it;
    }

    /** 
     * 隐藏对象
     */
    public hide(obj: T1): void {
        this._factoryClass.hide(obj);

        let idx = this.hideList.indexOf(obj);
        if (idx == -1) {
            this.hideList.push(obj);
        }
        idx = this.showList.indexOf(obj);
        if (idx != -1) {
            this.showList.splice(idx, 1);
        }

        if (this._listener?.onHide) {
            this._listener.onHide(this, obj);
        }
    }

    /**
     * 删除物体
     * @param obj 被删除的物体
     */
    public delete(obj: T1): void {
        let onDestroy = this._listener?.onDestroy;
        let idx = this.hideList.indexOf(obj);
        if (idx != -1) {
            this.hideList.splice(idx, 1);
        }
        idx = this.showList.indexOf(obj);
        if (idx != -1) {
            this.showList.splice(idx, 1);
        }

        this._factoryClass.destroy(obj);
        if (onDestroy) {
            onDestroy(this, obj);
        }
    }

    /** 
     * 获取元素的对象池
     */
    public static getPool(obj: any): ObjectPool<any, any> {
        return obj._f_pool;
    }

    /** 
     * 隐藏已经绑定过对象池的对象
     */
    public static delete(obj: any): void {
        let pool = obj._f_pool;
        if (!pool) {
            pool.delete(obj);
        }
        obj._f_pool = null
    }

    /** 
     * 隐藏已经绑定过对象池的对象
     */
    public static hide(obj: any): void {
        let pool = obj._f_pool;
        pool?.hide(obj);

        let idx = pool.hideList.indexOf(obj);
        if (idx == -1) {
            pool.hideList.push(obj);
        }
        idx = pool.showList.indexOf(obj);
        if (idx != -1) {
            pool.showList.splice(idx, 1);
        }

        if (pool._listener?.onHide) {
            pool._listener.onHide(pool, obj);
        }
    }

    /** 
     * 销毁已经绑定过对象池的对象
     */
    public static destroyFromPool(obj: any): void {
        let pool = obj._f_pool;
        pool.delete(obj);
    }


    /** 
     * 隐藏所有对象
     */
    public hideAll(): void {
        let ls = this.showList, len = ls.length, it, onHide = this._listener && this._listener.onHide;
        for (let i = 0; i < len; i++) {
            it = ls[i]
            this._factoryClass.hide(it);
            this.hideList.push(it);
            if (onHide) {
                onHide(this, it);
            }
        }

        this.showList.length = 0;
    }

    /** 销毁对象池 */
    public destroy(): void {
        let ls = this.showList, len = ls.length, it;
        let onDestroy = this._listener?.onDestroy;
        for (let i = 0; i < len; i++) {
            it = ls[i]
            this._factoryClass.destroy(it);
            if (onDestroy) {
                onDestroy(this, it);
            }
        }

        ls = this.hideList, len = ls.length;
        for (let i = 0; i < len; i++) {
            it = ls[i]
            this._factoryClass.destroy(it);
            if (onDestroy) {
                onDestroy(this, it);
            }
        }

        this.showList.length = 0;
        this.hideList.length = 0;
    }

}

// /////// 特例化 /////////
/** mw.UIBehaviour 元素 */
export class PoolViewFactory<T extends mw.UIScript> extends PoolFactory<T> {

    /** 元素的 guid */
    protected viewClass: (new (...arg) => T);

    /** 父节点 */
    private _parent: mw.PanelWidget;

    /** 隐藏父节点 */
    private _hideCanvas: mw.PanelWidget;

    constructor(viewClass: new (...arg) => T, parent: mw.PanelWidget, hideCanvas?: mw.PanelWidget) {
        super(viewClass);

        this.viewClass = viewClass;
        this._parent = parent;
        this._hideCanvas = hideCanvas;
    }

    /** 创建元素 */
    public create(): T {
        const view = mw.UIService.create(this.viewClass);
        if (this._parent) {
            this._parent.addChild(view.uiObject);
        }
        (view as any)._f_size = view.rootCanvas.size.clone();
        view.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        return view;
    }

    /** 销毁元素 */
    public destroy(obj: mw.UIScript): void {
        obj.uiObject.destroyObject();
    }

    /** 显示元素 */
    public show(obj: mw.UIScript): void {
        // mw.UIService.showUI(obj);
        // obj.uiObject.visibility = mw.SlateVisibility.Visible;
        obj.rootCanvas.visibility = mw.SlateVisibility.Visible;
        // obj.uiObject.zOrder = 1;
        // obj.uiObject.zOrder = 0;
        this._parent?.addChild(obj.uiObject);
        obj.uiObject.size = (obj as any)._f_size.clone();
    }

    /** 隐藏元素 */
    public hide(obj: mw.UIScript): void {
        // mw.UIService.hideUI(obj);
        // obj.uiObject.visibility = mw.SlateVisibility.Collapsed;
        obj.rootCanvas.visibility = mw.SlateVisibility.Collapsed;
        this._hideCanvas?.addChild(obj.uiObject);
    }

}

/** mw.UIBehaviour 元素池 */
export class PoolView<T extends mw.UIScript> extends ObjectPool<T, PoolViewFactory<T>>{

    /** 创建 mw.UIBehaviour 池对象 */
    public static create<T extends mw.UIScript>(viewClass: new (...arg: any[]) => T, parent?: mw.PanelWidget, hideCanvas?: mw.PanelWidget, action?: IPoolListener<T, PoolViewFactory<T>>): ObjectPool<T, any> {
        let element = new PoolViewFactory((<any>viewClass), parent, hideCanvas);
        return new ObjectPool((<any>element), action);
    }

}

/////// GameObject /////////
/** 场景元素 */
export class PoolGameObjectFactory extends PoolFactory<mw.GameObject> {

    /** 元素的 guid */
    protected guid: string;

    constructor(guid: string) {
        super(mw.GameObject);

        this.guid = guid;
    }

    /** 异步创建元素 */
    public async asyncCreate(): Promise<mw.GameObject> {
        let go = await mw.GameObject.asyncSpawn(this.guid);
        if (!go) {
            console.warn("create go failed:" + this.guid)
        }

        let ready = go.asyncReady();
        if (ready.then) {
            await ready;
        }

        go.setVisibility(mw.PropertyStatus.On, true);
        return go;
    }

    /**
     * 创建元素
     * @description 确保资源已经加载进内存中了
     */
    public create(): mw.GameObject {
        let go = mw.GameObject.spawn(this.guid);
        go.setVisibility(mw.PropertyStatus.On, true);

        return go;
    }

    /** 销毁元素 */
    public destroy(obj: mw.GameObject): void {
        obj.destroy();
    }

    /** 显示元素 */
    public show(obj: mw.GameObject): void {
        obj.setVisibility(mw.PropertyStatus.On, true);
    }

    /** 隐藏元素 */
    public hide(obj: mw.GameObject): void {
        obj.setVisibility(mw.PropertyStatus.Off, true);
    }

}

/** 场景元素池 */
export class PoolGameObject extends ObjectPool<mw.GameObject, PoolGameObjectFactory> {

    /**
     * 创建一个场景元素池
     * @param guid: 克隆的元素的 guid
     * @param action: 池操作回调
     */
    public static create(guid: string, action?: IPoolListener<mw.GameObject, PoolGameObjectFactory>): ObjectPool<mw.GameObject, PoolGameObjectFactory> {
        let petElement = new PoolGameObjectFactory(guid);
        return new ObjectPool(petElement, action);
    }

}

export class PoolGoMap {

    /** 单例 */
    public static instance = new PoolGoMap();

    /** 场景元素池 */
    private _poolMap: Map<string, PoolGameObject> = new Map();

    /** 
     * 获取对象
     * @param guid: 场景元素的 guid
     */
    public async asyncGet(guid: string): Promise<mw.GameObject> {
        let pool = this._poolMap.get(guid);
        if (!pool) {
            pool = PoolGameObject.create(guid);
            (pool as any)._f_map = this;
            this._poolMap.set(guid, pool);
        }

        return await pool.asyncGet();
    };
}

//////// 脚本包含 GameObject /////////
/**
 * 默认类
 */
export class IScriptGoBase {

    /** 物品模型 */
    public go: mw.GameObject;

    /**
     * 元素生成后初始化回调
     * @description 仅在 asyncGet 时会调用
     */
    public onCreate() { };

    /** 元素生成后初始化回调 */
    public async onInit() { };

    /** 元素显示回调 */
    public onShow(...arg: any[]) { };

    /** 元素隐藏回调 */
    public onHide() { };

    /** 元素销毁回调 */
    public onDestroy() { };

}

/** 脚本包含 gameObject 的池 */
export class ScriptGoFactory<T extends IScriptGoBase> extends PoolFactory<T> {

    /** 含 go 成员的类 */
    protected cls: new (...arg: any) => T;

    /** go 的 guid */
    protected goGuid: string;

    constructor(goGuid: string, cls: (new () => T | null)) {
        cls = cls || (IScriptGoBase as new () => T);
        super(cls);

        this.cls = cls;
        this.goGuid = goGuid;
    }

    /** 异步创建元素 */
    public async asyncCreate(...arg: any): Promise<T> {
        let go = new this.cls(...arg);
        go.go = await mw.GameObject.asyncSpawn(this.goGuid);
        await go.go;
        go.onCreate();
        await go.onInit();
        return go;
    }

    /**
     * 创建元素
     * @description 确保资源已经加载进内存中了
     */
    public create(): T {
        let go = new this.cls();
        go.go = mw.GameObject.spawn(this.goGuid);
        go.onCreate();
        go.onInit();
        return go;
    }

    /** 销毁元素 */
    public destroy(obj: T) {
        if (obj.go) {
            obj.onDestroy();
            obj.go.destroy();
        }
    }

    /** 显示元素 */
    public show(obj: T, ...arg: any[]) {
        if (obj.go) {
            obj.go.setVisibility(mw.PropertyStatus.On, true);
            obj.onShow(...arg);
        }
    }

    /** 隐藏元素 */
    public hide(obj: T) {
        if (obj.go) {
            obj.go.setVisibility(mw.PropertyStatus.Off, true);
            obj.onHide();
        }
    }

}

/** 脚本对象池 */
export class ScriptGoPool<T1 extends IScriptGoBase> extends ObjectPool<T1, ScriptGoFactory<T1>> {

    /**
     * 创建一个场景元素池
     * @param guid: 克隆的元素的 guid
     * @param action: 池操作回调
     */
    public static create<T3 extends IScriptGoBase>(goGuid: string, cls?: new (...arg: any) => T3, action?: IPoolListener<T3, PoolFactory<T3>>, ...arg: any[]): ScriptGoPool<T3> {
        let element = new ScriptGoFactory(goGuid, cls);
        return new ScriptGoPool(element, action, ...arg);
    }

}
