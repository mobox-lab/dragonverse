import ModuleC = mwext.ModuleC;
import ModuleS = mwext.ModuleS;
import Subdata = mwext.Subdata;
import createYoact = Yoact.createYoact;
import Enumerable from "linq";
import { IBagItemElement } from "../../config/BagItem";
import { GameConfig } from "../../config/GameConfig";
import ByteArray from "../../depend/byteArray/ByteArray";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import IUnique from "../../depend/yoact/IUnique";
import { Yoact } from "../../depend/yoact/Yoact";
import YoactArray from "../../depend/yoact/YoactArray";
import ForeignKeyIndexer, { BagTypes } from "../../const/ForeignKeyIndexer";
import { EventDefine } from "../../const/EventDefine";
import { AuthModuleS } from "../auth/AuthModule";
import GameStart from "../../GameStart";
import GameServiceConfig from "../../const/GameServiceConfig";

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

export class HandbookItemUnique implements IUnique {
    public id: number;
    public collected: boolean;

    public static arrayFromByteArray(data: BagModuleData): HandbookItemUnique[] {
        const result: HandbookItemUnique[] = [];
        for (let i = 1; i < data.handbook.count; ++i) {
            //#region 视图 筛除 不可收集物.
            if (!GameConfig.BagItem.getElement(i)?.achievable ?? false) {
                continue;
            }
            //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

            const collected = data.handbook.getValue(i) > 0;
            result.push(new HandbookItemUnique(
                i,
                collected));
        }
        return result;
    }

    constructor(id: number, collected: boolean) {
        this.id = id;
        this.collected = collected;
    }

//#region IUnique
    public move(updated: this): boolean {
        let changed: boolean = false;
        if (this.collected !== updated.collected) {
            changed = true;
            this.collected = updated.collected;
        }
        return changed;
    }

    public primaryKey(): number {
        return this.id;
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export default class BagModuleData extends Subdata {
    //@Decorator.persistence()
    //public isSave: bool;

    public static config(bagId: number): IBagItemElement {
        return GameConfig.BagItem.getElement(bagId);
    }

    /**
     * 已经发布的正式数据版本号.
     * RV.
     */
    public static readonly RELEASE_VERSIONS: number[] = [
        202312061339,
    ];

    /**
     * 版本升级办法.
     * UVM[n] : 从 RV[n] 升级到 RV[n+1] 的方法.
     */
    public static readonly UPDATE_VERSION_METHOD: (() => void)[] = [
        // () => {
        // },
    ];

    @Decorator.persistence()
    public itemsMap: object = {};

    @Decorator.persistence()
    public gold: number = 0;

    @Decorator.persistence()
    public handbookStr: string;

    private _handbook: ByteArray = null;

    public get handbook(): ByteArray {
        if (this._handbook === null) {
            this._handbook = ByteArray.from(this.handbookStr);
        }
        return this._handbook;
    };

//#region Sub data
    protected initDefaultData(): void {
        this.currentVersion = this.version;
        this.itemsMap = {};
        this.gold = 0;
        this.initHandBook();
    }

    protected onDataInit(): void {
        super.onDataInit();
        this.checkVersion();
    }

    public save(syncToClient: boolean): this {
        this.handbookStr = this.handbook.toString();
        return super.save(syncToClient);
    }

    /**
     * 定义为最新版本号.
     * 为什么不做成只读属性而是个 getter 呢.
     */
    public get version(): number {
        return BagModuleData.RELEASE_VERSIONS[BagModuleData.RELEASE_VERSIONS.length - 1];
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Data init
    /**
     * 初始化 图鉴.
     * @private
     */
    private initHandBook() {
        const maxBagId = Enumerable
            .from(GameConfig.BagItem.getAllElement())
            .max(item => item.id);

        this.handbookStr = new ByteArray(maxBagId + 1).toString();
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    /**
     * 数据版本检查.
     */
    public checkVersion() {
        if (this.currentVersion === this.version) return;

        Log4Ts.log(BagModuleData,
            `数据准备升级`,
            () => `当前版本: ${this.currentVersion}`,
            () => `最新版本: ${this.version}.`,
        );

        const startIndex = BagModuleData.RELEASE_VERSIONS.indexOf(this.currentVersion);
        if (startIndex < 0) {
            Log4Ts.error(
                BagModuleData,
                `数据号版本异常`,
                `不是已发布的版本号`,
                () => `当前版本: ${this.currentVersion}.`);
            return;
        }

        for (let i = startIndex; i < BagModuleData.UPDATE_VERSION_METHOD.length - 1; ++i) {
            BagModuleData.UPDATE_VERSION_METHOD[i]();
            this.currentVersion = BagModuleData.RELEASE_VERSIONS[i + 1];
        }
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

    /**
     * 是否 背包存在物品.
     * @param bagId
     */
    public hasItem(bagId: number): boolean {
        return this.itemsMap[bagId] > 0;
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

    /**
     * 记录收集.
     */
    public recordItem(bagId: number): boolean {
        if (this.handbook.getValue(bagId)) {
            return false;
        }
        this.handbook.setValue(bagId, true);
        return true;
    }
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
    public handbookYoact: YoactArray<HandbookItemUnique> = new YoactArray<HandbookItemUnique>();

    public goldYoact: { count: number } = createYoact({count: 0});
    public dragonBallYoact: { count: number } = createYoact({count: 0});

    private _isReady: boolean = false;

    public get isReady() {
        return this._isReady;
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onStart(): void {
        super.onStart();

        //#region Member init
        this.bagItemYoact.setAll(BagItemUnique.arrayFromObject(this.data));
        this.handbookYoact
            .setAll(HandbookItemUnique.arrayFromByteArray(this.data));
        this.dragonBallYoact.count = this.getItemCount(GameServiceConfig.DRAGON_BALL_BAG_ID);
        this._isReady = true;
        // this.goldYoact.count=this.getItemCount(GameServiceConfig.GOLD_BAG_ID);
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

        //#region Event Subscribe
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    protected onEnterScene(sceneType: number): void {
        super.onEnterScene(sceneType);

        Event.dispatchToLocal(EventDefine.BagModuleClientReady);
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
        const currCount = this.getItemCount(bagId);
        const setCount = currCount + count;
        Log4Ts.log(BagModuleC,
            `add item`,
            () => `playerId: ${this.localPlayerId}`,
            () => `id: ${bagId}`,
            () => `current count: ${this.getItemCount(bagId)}`,
            () => `target count: ${setCount}`,
            () => `autoRemove: ${autoRemove}.`,
        );
        this.selfSetItem(bagId, autoRemove && !setCount ? null : setCount);
        this.server.net_addItem(bagId, count, autoRemove);
    }

    /**
     * 移除物品.
     * @param bagId
     */
    public removeItem(bagId: number) {
        Log4Ts.log(BagModuleC,
            `remove item`,
            () => `playerId: ${this.localPlayerId}`,
            () => `id: ${bagId}`,
            () => `current count: ${this.getItemCount(bagId)}.`,
        );
        this.selfSetItem(bagId);
        this.server.net_removeItem(bagId);
    }

    /**
     * 是否 可以支付.
     * @param price
     */
    public isAfford(price: number): boolean {
        return isAfford(this.data, price);
    }

    /**
     * 是否 玩家背包中具有 DragonBall.
     */
    public hasDragonBall() {
        return !GameStart.instance.isRelease || this.dragonBallYoact.count > 0;
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

            const handbookItem = this.handbookYoact.getItem(bagId);
            if (handbookItem && !handbookItem.collected) {
                handbookItem.collected = true;
                Log4Ts.log(BagModuleC, `record item. id: ${bagId}.`);
            }

            this.bagItemYoact.addItem(new BagItemUnique(bagId, count));
        }

        if (bagId === GameServiceConfig.DRAGON_BALL_BAG_ID) {
            this.dragonBallYoact.count = this.getItemCount(GameServiceConfig.DRAGON_BALL_BAG_ID);
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

    public net_setRecord(bagId: number, value: number) {
        const handbookItem = this.handbookYoact.getItem(bagId);
        if (!handbookItem) return;
        const v = value > 0;
        if (handbookItem.collected === v) {
            Log4Ts.log(BagModuleC, `${v ? "" : "un"}record item. id: ${bagId}.`);
            handbookItem.collected = v;
        }
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class BagModuleS extends ModuleS<BagModuleC, BagModuleData> {
//#region Member
    private _authModule: AuthModuleS;
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onStart(): void {
        super.onStart();

        //#region Member init
        ModuleService.ready().then(() => this._authModule = ModuleService.getModule(AuthModuleS));
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
        Log4Ts.log(BagModuleS,
            () => `add item. playerId: ${playerId}. `,
            () => `id: ${bagId}. `,
            () => `current count: ${playerData.getItemCount(bagId)}. `,
            () => `target count: ${playerData.getItemCount(bagId) + count}.`,
            () => `autoRemove: ${autoRemove}.`,
        );

        if (GameStart.instance.isRelease && (!this._authModule?.enableEnter(playerId) ?? true)) {
            Log4Ts.warn(BagModuleS,
                `has no auth permission when add item. rejected.`,
                `playerId: ${playerId}`,
            );
            return;
        }

        if (!playerData.getItemCount(bagId) &&
            count > 0 &&
            playerData.recordItem(bagId)) {
            Log4Ts.log(BagModuleS, `record item. id: ${bagId}.`);
        }

        this.getClient(playerId).net_setRecord(bagId, playerData.handbook.getValue(bagId));

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
        Log4Ts.log(BagModuleS, `add item`,
            () => `playerId: ${playerId}`,
            () => `id: ${bagId}`,
            () => `current count: ${playerData.getItemCount(bagId)}.`,
        );
        playerData.removeItem(bagId);
        playerData.save(false);
    }

    /**
     * 是否 玩家具有物品.
     * @param playerId 玩家 id.
     * @param bagId 背包物品 Id.
     * @param asType 指定类型.
     *      default {@link BagTypes.Null}. 不进行检查
     */
    public hasItem(playerId: number, bagId: number, asType: BagTypes = BagTypes.Null): boolean {
        if (asType) return ForeignKeyIndexer.getInstance().isBagItemType(bagId, asType);

        const playerData = this.getPlayerData(playerId);
        return playerData.hasItem(bagId);
    }

    /**
     * 是否 玩家背包中具有 DragonBall.
     */
    public hasDragonBall(playerId: number) {
        return !GameStart.instance.isRelease || this.hasItem(playerId, GameServiceConfig.DRAGON_BALL_BAG_ID);
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

function isAfford(data: BagModuleData, price: number) {
    return data.isAfford(price);
}