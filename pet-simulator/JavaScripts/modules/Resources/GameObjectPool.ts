
import { resourceUI } from "./scenceUnitUI";

export interface IGameObjectPool {
    /**重置对象 */
    reset(): void;
}


class GameObjectPool<T extends IGameObjectPool>{

    private _pool: T[] = [];

    constructor(private cls: { new(): T }, private count: number = 5, private time: number = 0.5) {

        this.initPool(count);
    }

    private initPool(count: number) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this._pool.push(new this.cls());
            }, this.time * 1000);

        }
    }

    get(): T {
        if (this._pool.length > 0) {
            let item = this._pool.pop();
            if (this._pool.length <= 1) {
                this.initPool(this.count);
            }
            return item;
        } else {
            return new this.cls();
        }
    }

    returnItem(item: T) {
        item.reset();
        this._pool.push(item);
    }

}
//对象工厂
export class GameObjectFactory {
    private static _instance: GameObjectFactory;
    public static get instance(): GameObjectFactory {
        if (!this._instance) {
            this._instance = new GameObjectFactory();
        }
        return this._instance;
    }
    constructor() {
        if (SystemUtil.isServer()) {

        } else {
            this._uiPool = new GameObjectPool(resourceUI);
        }
    }
    private _uiPool: GameObjectPool<resourceUI>;

    getUI(): resourceUI {
        return this._uiPool.get();
    }
    returnUI(item: resourceUI) {
        this._uiPool.returnItem(item);
    }
}