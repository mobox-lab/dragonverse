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
import GameServiceConfig from "../../const/GameServiceConfig";
import ObbyModuleData, { ObbyModuleS } from "../obby/ObbyModule";
import { JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";
import Gtk from "../../util/GToolkit";

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

type DataUpgradeMethod<SD extends mwext.Subdata> = (data: SD) => void;

export default class BagModuleData extends JModuleData {
    public static config(bagId: number): IBagItemElement {
        return GameConfig.BagItem.getElement(bagId);
    }

    /**
     * 版本升级办法.
     * UVM[n] : 从 RV[n] 升级到 RV[n+1] 的方法.
     */
    public static readonly UPDATE_VERSION_METHOD: DataUpgradeMethod<BagModuleData>[] = [
        // (data) => {
        // },
    ];

    @Decorator.persistence()
    public itemsMap: object = {};

    @Decorator.persistence()
    public handbookStr: string;

    @Decorator.persistence()
    public obbyCoin: number = 0;

    @Decorator.persistence()
    public obbyTicket: number = 0;

    @Decorator.persistence()
    public lastDailyObbyCoinDrawTime: number = 0;

    @Decorator.persistence()
    public lastDailyObbyTicketDrawTime: number = 0;

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
        this.initHandBook();
    }

    public save(syncToClient: boolean): this {
        this.handbookStr = this.handbook.toString();
        return super.save(syncToClient);
    }

    public get releasedVersions() {
        return [202312061339];
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
     * 设置物品.
     * @param {number} bagId
     * @param {number} count
     */
    public setItem(bagId: number, count: number) {
        this.itemsMap[bagId] = count;
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
        return this.getItemCount(bagId) > 0;
    }

    public removeItem(bagId: number) {
        delete this.itemsMap[bagId];
    }

    public removeAllItem() {
        this.itemsMap = {};
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

    /**
     * 添加 Obby Coin.
     * @param {number} count
     * @param {boolean} daily 是否 每日奖励.
     *      - true 进行每日奖励检查. 未到时间返回 false. 否则更新时间记录.
     *      - false default.
     * @return {boolean}
     */
    public addObbyCoin(count: number, daily: boolean = false): boolean {
        let result: boolean;
        if (daily) {
            const now = new Date();
            result = new Date(this.lastDailyObbyCoinDrawTime).toDateString() !== now.toDateString();
            if (result) this.lastDailyObbyCoinDrawTime = now.getTime();
            else return result;
        }
        this.obbyCoin += count;
        result = this.obbyCoin >= 0;
        if (!result) this.obbyCoin = 0;
        return result;
    }

    /**
     * 添加 Obby Ticket.
     * @param {number} count
     * @param {boolean} daily 是否 每日奖励.
     *      - true 进行每日奖励检查. 未到时间返回 false. 否则更新时间记录.
     *      - false default.
     * @return {boolean}
     */
    public addObbyTicket(count: number, daily: boolean = false): boolean {
        let result: boolean;
        if (daily) {
            const now = new Date();
            result = new Date(this.lastDailyObbyTicketDrawTime).toDateString() !== now.toDateString();
            if (result) this.lastDailyObbyTicketDrawTime = now.getTime();
            else return result;
        }
        this.obbyTicket += count;
        result = this.obbyTicket >= 0;
        if (!result) this.obbyTicket = 0;
        return result;
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
export class BagModuleC extends JModuleC<BagModuleS, BagModuleData> {
    //#region Member
    public bagItemYoact: YoactArray<BagItemUnique> = new YoactArray<BagItemUnique>();
    public handbookYoact: YoactArray<HandbookItemUnique> = new YoactArray<HandbookItemUnique>();

    public dragonBallYoact: { count: number } = createYoact({count: 0});
    public obbyCoinYoact: { count: number } = Yoact.createYoact({count: 0});
    public obbyTicketYoact: { count: number } = Yoact.createYoact({count: 0});

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onJStart(): void {
        super.onJStart();

        //#region Member init
        this.bagItemYoact.setAll(BagItemUnique.arrayFromObject(this.data));
        this.handbookYoact
            .setAll(HandbookItemUnique.arrayFromByteArray(this.data));
        this.dragonBallYoact.count = this.getItemCount(GameServiceConfig.DRAGON_BALL_BAG_ID);
        this.obbyCoinYoact.count = this.data.obbyCoin;
        this.obbyTicketYoact.count = this.data.obbyTicket;
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
     * 是否 玩家背包中具有 DragonBall.
     */
    public hasDragonBall() {
        return !(GameServiceConfig.isRelease || GameServiceConfig.isBeta) ||
            this.dragonBallYoact.count > 0;
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

            const handbookItem = count > 0 ?
                this.handbookYoact.getItem(bagId) :
                undefined;
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

    public net_setItems(data: [number, number][], autoRemove: boolean = true) {
        for (const [bagId, count] of data) {
            this.selfSetItem(bagId, autoRemove && !count ? null : count);
        }
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

    public net_setObbyCoin(count: number): void {
        Log4Ts.log(BagModuleC, `set obby coin from server. count: ${count}.`);
        this.data.obbyCoin = count;
        this.obbyCoinYoact.count = count;
    }

    public net_setObbyTicket(count: number): void {
        Log4Ts.log(BagModuleC, `set obby ticket from server. count: ${count}.`);
        this.data.obbyTicket = count;
        this.obbyTicketYoact.count = count;
    }

    public async consumeObbyTicket(): Promise<boolean> {
        return this.server.net_consumeObbyTicket();
    }

    public isObbyTicketEnough(): boolean {
        return this.data.obbyTicket > 0;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class BagModuleS extends JModuleS<BagModuleC, BagModuleData> {
    //#region Member
    private _authModuleS: AuthModuleS;

    private get authModuleS(): AuthModuleS | null {
        if (!this._authModuleS) this._authModuleS = ModuleService.getModule(AuthModuleS);
        return this._authModuleS;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onJStart(): void {
        super.onJStart();

        //#region Member init
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

    protected onPlayerJoined(player: Player): void {
        super.onPlayerJoined(player);
    }

    protected onPlayerEnterGame(player: Player): void {
        super.onPlayerEnterGame(player);
        this.dailyDrawObbyCoin(player.playerId);
        this.dailyDrawObbyTicket(player.playerId);

        Log4Ts.log(BagModuleS,
            `player entered. playerId: ${player.playerId}.`,
            `query user dragon ball...`);
        this.authModuleS
            ?.queryUserDragonBall(player.playerId)
            .then(value => {
                    Log4Ts.log(BagModuleS,
                        `query user dragon ball success.`,
                        `playerId: ${player.playerId}.`,
                        `value: ${JSON.stringify(value)}.`);
                    this.setItem(
                        player.playerId,
                        GameServiceConfig.DRAGON_BALL_BAG_ID,
                        value?.unUsed ?? 0);
                },
            );

        Log4Ts.log(undefined,
            `query user dragon...`);
        this.authModuleS.queryUserDragon(player.playerId)
            .then(value => {
                    Log4Ts.log(BagModuleS,
                        `query user dragon success.`,
                        `playerId: ${player.playerId}.`,
                        `value: ${JSON.stringify(value)}.`);

                    const data = Enumerable
                        .from(value?.DragonPalList ?? undefined)
                        .select(item => {
                            return {
                                dragonId: ForeignKeyIndexer
                                    .getInstance()
                                    .queryDragonByPalId(item.dragonPalId),
                                amount: item.amount,
                            };
                        })
                        .toArray();

                    this.resetDragonData(player.playerId, data);
                },
            );
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Method

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
        if (!this.checkPlayerExist(playerData)) return;
        Log4Ts.log(BagModuleS,
            () => `add item. playerId: ${playerId}. `,
            () => `id: ${bagId}. `,
            () => `current count: ${playerData.getItemCount(bagId)}. `,
            () => `target count: ${playerData.getItemCount(bagId) + count}.`,
            () => `autoRemove: ${autoRemove}.`,
        );

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
     * 设置物品.
     * @param {number} playerId
     * @param {number} bagId
     * @param {number} count
     * @param {boolean} autoRemove
     * @private
     */
    public setItem(playerId: number, bagId: number, count: number, autoRemove: boolean = true) {
        const playerData = this.getPlayerData(playerId);
        if (!this.checkPlayerExist(playerData)) return;
        Log4Ts.log(BagModuleS,
            () => `set item. playerId: ${playerId}. `,
            () => `id: ${bagId}. `,
            () => `current count: ${playerData.getItemCount(bagId)}. `,
            () => `target count: ${playerData.getItemCount(bagId) + count}.`,
            () => `autoRemove: ${autoRemove}.`,
        );

        if (!playerData.getItemCount(bagId) &&
            count > 0 &&
            playerData.recordItem(bagId)) {
            Log4Ts.log(BagModuleS, `record item. id: ${bagId}.`);
        }

        this.getClient(playerId).net_setRecord(bagId, playerData.handbook.getValue(bagId));

        playerData.setItem(bagId, count);
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
        if (!this.checkPlayerExist(playerData)) return;
        Log4Ts.log(BagModuleS, `add item`,
            () => `playerId: ${playerId}`,
            () => `id: ${bagId}`,
            () => `current count: ${playerData.getItemCount(bagId)}.`,
        );
        playerData.removeItem(bagId);
        playerData.save(false);

        this.getClient(playerId).net_setItem(
            bagId,
            playerData.getItemCount(bagId),
            true,
        );
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
     * 获取背包物品对应数量
     * @param playerId 玩家id
     * @param bagId 物品id
     * @return 数量
     */
    public getItemCount(playerId: number, bagId: number): number {
        const data = this.getPlayerData(playerId);
        return data.getItemCount(bagId);
    }

    /**
     * 重置玩家 背包龙数据.
     * @param playerId 玩家id
     * @param {{id: number, amount: number}[]} data
     */
    public resetDragonData(playerId: number, data: { dragonId: number, amount: number }[]) {
        const playerData = this.getPlayerData(playerId);
        if (!playerData) return;

        const map = new Map<number, number>();
        data.forEach(value => map.set(value.dragonId, (map.get(value.dragonId) ?? 0) + value.amount));

        const filledData = Enumerable.from(GameConfig.Dragon.getAllElement())
            .select(item => ([item.bagId, map.get(item.id) ?? 0] as [number, number]))
            .doAction(data => {
                if (data[1] <= 0)
                    playerData.removeItem(data[0]);
                else playerData.setItem(
                    data[0],
                    data[1]);
            })
            .toArray();

        playerData.save(false);
        this.getClient(playerId).net_setItems(filledData, true);
    }

    /**
     * 是否 玩家背包中具有 DragonBall.
     */
    public hasDragonBall(playerId: number) {
        return !(GameServiceConfig.isRelease || GameServiceConfig.isBeta) ||
            this.hasItem(playerId, GameServiceConfig.DRAGON_BALL_BAG_ID);
    }

    /**
     * 每日领取 Obby Coin.
     * @param {number} playerId
     * @return {boolean}
     */
    public dailyDrawObbyCoin(playerId: number): boolean {
        const playerData = this.getPlayerData(playerId);
        if (!playerData) return false;
        Log4Ts.log(BagModuleS, `daily draw obby coin. playerId: ${playerId}. count: ${GameServiceConfig.DAILY_OBBY_COIN_OBTAIN_COUNT}. player last get time: ${new Date(playerData.lastDailyObbyCoinDrawTime).toDateString()}.`);
        if (!playerData.addObbyCoin(GameServiceConfig.DAILY_OBBY_COIN_OBTAIN_COUNT, true)) {
            Log4Ts.log(BagModuleS, `failed.`);
            return false;
        }
        Log4Ts.log(BagModuleS, `success.`);
        playerData.save(false);
        this.getClient(playerId).net_setObbyCoin(playerData.obbyCoin);
        return true;
    }

    /**
     * 添加或删除 Obby Coin.
     * @param {number} playerId
     * @param {number} count
     */
    public addObbyCoin(playerId: number, count: number) {
        const playerData = this.getPlayerData(playerId);
        Log4Ts.log(BagModuleS, `add draw obby coin. playerId: ${playerId}. count: ${count}.`);
        playerData.addObbyCoin(count, false);
        playerData.save(false);
        this.getClient(playerId).net_setObbyCoin(playerData.obbyCoin);
    }

    /**
     * 消耗 Obby 金币
     * @param playerId
     * @param count
     */
    public consumeObbyCoin(playerId: number, count: number): boolean {
        const playerData = this.getPlayerData(playerId);
        if (playerData.obbyCoin >= count) {
            this.addObbyCoin(playerId, -count);
            return true;
        } else {
            return false;
        }
    }

    /**
     * 每日领取 Obby Ticket.
     * @param {number} playerId
     * @return {boolean}
     */
    public dailyDrawObbyTicket(playerId: number): boolean {
        const playerData = this.getPlayerData(playerId);
        if (!playerData) return false;
        Log4Ts.log(BagModuleS, `daily draw obby ticket. playerId: ${playerId}. count: ${GameServiceConfig.DAILY_OBBY_TICKET_OBTAIN_COUNT}. player last get time: ${new Date(playerData.lastDailyObbyTicketDrawTime).toDateString()}.`);
        if (!playerData.addObbyTicket(GameServiceConfig.DAILY_OBBY_TICKET_OBTAIN_COUNT, true)) {
            Log4Ts.log(BagModuleS, `failed.`);
            return false;
        }
        Log4Ts.log(BagModuleS, `success.`);
        playerData.save(false);
        this.getClient(playerId).net_setObbyTicket(playerData.obbyTicket);
        return true;
    }

    /**
     * 添加或删除 Obby Ticket.
     * @param {number} playerId
     * @param {number} count
     */
    public addObbyTicket(playerId: number, count: number) {
        const playerData = this.getPlayerData(playerId);
        Log4Ts.log(BagModuleS, `add draw obby ticket. playerId: ${playerId}. count: ${count}.`);
        playerData.addObbyTicket(count, false);
        playerData.save(false);
        this.getClient(playerId).net_setObbyTicket(playerData.obbyTicket);
    }

    /**
     * 是否 玩家具有 Obby Ticket.
     * @param {number} playerId
     * @return {boolean}
     */
    public hasObbyTicket(playerId: number): boolean {
        return (this.getPlayerData(playerId)?.obbyTicket ?? 0) > 0;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    public net_addItem(bagId: number, count: number, autoRemove: boolean = true) {
        this.addItem(this.currentPlayerId, bagId, count, autoRemove);
    }

    public net_removeItem(bagId: number) {
        this.removeItem(this.currentPlayerId, bagId);
    }

    /**
     * 消耗 Obby 入场券
     */
    public net_consumeObbyTicket(): Promise<boolean> {
        //判断需不需要消耗次数
        if (DataCenterS.getData(this.currentPlayerId, ObbyModuleData).leaveObbyByExitGame === true) {
            ModuleService.getModule(ObbyModuleS).enterObbyWithoutTicket(this.currentPlayerId);
            return Promise.resolve(true);
        } else {
            const playerData = this.getPlayerData(this.currentPlayerId);
            if (playerData.obbyTicket >= 1) {
                this.addObbyTicket(this.currentPlayerId, -1);
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        }
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Log
    private checkPlayerExist(player: mw.Player | mwext.Subdata): boolean {
        if (!player) {
            Log4Ts.warn(BagModuleS, `player not found.`);
            return false;
        }
        return true;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}
