import { GameConfig } from "../../config/GameConfig";
import Enumerable from "linq";
import CollectibleItem from "./CollectibleItem";
import GToolkit from "../../util/GToolkit";
import GameServiceConfig from "../../const/GameServiceConfig";
import Regulator from "../../depend/regulator/Regulator";
import UUID from "pure-uuid";
import noReply = mwext.Decorator.noReply;
import GameObject = mw.GameObject;
import GameObjPoolSourceType = mwext.GameObjPoolSourceType;
import CollectibleItemTrigger from "./trigger/CollectibleItemTrigger";
import { EventDefine } from "../../const/EventDefine";
import CharacterEnterCollectibleItemRangeEventArgs from "./trigger/CharacterEnterCollectibleItemRangeEventArgs";
import EventListener = mw.EventListener;
import MainPanel from "../../ui/main/MainPanel";

export default class CollectibleItemModuleData extends Subdata {
    //@Decorator.persistence()
    //public isSave: bool;
}

/**
 * CollectibleItem Module.
 * 采集物模块.
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
export class CollectibleItemModuleC extends ModuleC<CollectibleItemModuleS, CollectibleItemModuleData> {
//#region Constant
    public static readonly PREFAB_MAP: Map<number, string> = new Map();

    static {
        this.PREFAB_MAP.set(1, "19864DB9433C12B44D2F95BE76825159");
    }

    public static async collectibleItemPrefabFactory(
        syncKey: string,
        id: number,
        location: Vector) {
        const assetId = this.PREFAB_MAP.get(id);
        const obj = await GameObjPool.asyncSpawn(
            assetId,
            GameObjPoolSourceType.Prefab,
        );
        const trigger = GToolkit.getFirstScript(obj, CollectibleItemTrigger);
        trigger.init(syncKey);
        obj.worldTransform.position = location;
        return obj;
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Member

    /**
     * 玩家私有全采集物映射.
     *  - key sync key.
     *  - value CollectibleItem.
     */
    public syncItemMap: Map<string, { item: CollectibleItem, object: GameObject }> = new Map();

    /**
     * 待采集物映射.
     */
    public collectCandidates: string[] = [];

    private _mainPanel: MainPanel;

    private _eventListeners: EventListener[] = [];
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onStart(): void {
        super.onStart();

//#region Member init
        this._mainPanel = UIService.getUI(MainPanel);
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Event Subscribe
        this._eventListeners.push(Event.addLocalListener(EventDefine.EnterCollectibleItemRange, this.onEnterCollectibleItemRange));
        this._eventListeners.push(Event.addLocalListener(EventDefine.LeaveCollectibleItemRange, this.onLeaveCollectibleItemRange));
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    protected onEnterScene(sceneType: number): void {
        super.onEnterScene(sceneType);
    }

    protected onDestroy(): void {
        super.onDestroy();

//#region Event Unsubscribe
        this._eventListeners.forEach(value => value.disconnect());
//#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Method
    /**
     * 客户端 采集.
     * @param syncKey
     */
    public collect(syncKey: string) {
        GToolkit.log(CollectibleItemModuleC, `try collect item.`);
        if (!this.syncItemMap.has(syncKey)) {
            GToolkit.log(CollectibleItemModuleC, `item not exist in client when collect. syncKey: ${syncKey}`);
            return;
        }

        const item = this.syncItemMap.get(syncKey).item;
        GToolkit.log(CollectibleItemModuleC, item.toString());
        if (!item.isCollectible) {
            GToolkit.warn(CollectibleItemModuleC, `item un collectible. waiting for delete.`);
            return;
        }

        const success: boolean = GToolkit.randomWeight([CollectibleItem.successRate(item.id)], 1) === 0;
        if (!success) {
            GToolkit.log(CollectibleItemModuleC, `collect fail`);
            return;
        }

        GToolkit.log(CollectibleItemModuleC, `collect success. last collect count: ${item.hitPoint}`);
        this.server.net_collectItem(syncKey);
        item.collect();
    }

    private generate(syncKey: string, item: CollectibleItem) {
        GToolkit.log(CollectibleItemModuleC, `try generate item. ${item.toString()}`);
        if (this.syncItemMap.get(syncKey)) {
            GToolkit.error(CollectibleItemModuleC, `item already exist in client when generate. syncKey: ${syncKey}`);
            return;
        }

        const itemAsync = {item: item, object: null};

        this.syncItemMap.set(syncKey, itemAsync);

        CollectibleItemModuleC.collectibleItemPrefabFactory(
            syncKey,
            item.id,
            item.location,
        ).then((value) => {
            itemAsync.object = value;
        });
    }

    private destroy(syncKey: string) {
        GToolkit.log(CollectibleItemModuleC, `try destroy item. ${this.syncItemMap.get(syncKey).item.toString() ?? "null"}`);

        this.syncItemMap.get(syncKey)?.object.destroy();
        this.syncItemMap.delete(syncKey);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Net Method
    public net_generate(syncKey: string,
                        id: number,
                        hitPoint: number,
                        generateTime: number,
                        location: Vector) {
        this.generate(
            syncKey,
            new CollectibleItem()
                .sync(id,
                    hitPoint,
                    generateTime,
                    location));
    }

    public net_destroy(syncKey: string) {
        this.destroy(syncKey);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Event Callback
    public onEnterCollectibleItemRange = (args: CharacterEnterCollectibleItemRangeEventArgs) => {
        if (args.playerId === Player.localPlayer.playerId) {
            this.collectCandidates.push(args.itemSyncKey);
            this._mainPanel.addCollectibleItemInteractor(args.itemSyncKey);
        }
    };
    public onLeaveCollectibleItemRange = (args: CharacterEnterCollectibleItemRangeEventArgs) => {
        if (args.playerId === Player.localPlayer.playerId) {
            GToolkit.remove(this.collectCandidates, args.itemSyncKey);
            this._mainPanel.removeCollectibleItemInteractor(args.itemSyncKey);
        }
    };
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class CollectibleItemModuleS extends ModuleS<CollectibleItemModuleC, CollectibleItemModuleData> {
//#region Member
    /**
     * 私有玩家采集物存在映射.
     *  - key 玩家 PlayerId.
     *  - value 该玩家现存所有采集物.
     */
    public existenceItemMap: Map<number, string[]> = new Map();

    /**
     * 全采集物映射.
     *  - key sync key.
     *  - value CollectibleItem.
     */
    public syncItemMap: Map<string, CollectibleItem> = new Map();

    private _generateRegulator: Regulator = new Regulator(GameServiceConfig.TRY_GENERATE_INTERVAL);

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();

//#region Inner Member init
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onStart(): void {
        super.onStart();

//#region Member init
//#endregion ------------------------------------------------------------------------------------------ 

//#region Event Subscribe
//#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);

        if (this._generateRegulator.ready()) {
            this.tryGenerate();
        }
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
        this.removePlayerRecord(player.playerId);
    }

    protected onPlayerEnterGame(player: Player): void {
        super.onPlayerEnterGame(player);
        this.addPlayerRecord(player.playerId);
    }

    protected onPlayerJoined(player: Player): void {
        super.onPlayerJoined(player);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Method
    /**
     * 指定玩家 与 id 的采集物最新生成时间.
     * @param playerId
     * @param id
     */
    private lastItemGenerateTime(playerId: number, id: number): number {
        return Enumerable
            .from(this.existenceItemMap.get(playerId))
            .select((syncKey) => this.syncItemMap.get(syncKey))
            .where((item) => item ? item.id === id : false)
            .defaultIfEmpty({generateTime: 0} as CollectibleItem)
            .max((item) => item.generateTime);
    }

    /**
     * 指定玩家 与 id 的存在数量.
     * @param playerId
     * @param id
     */
    private getItemExistenceCount(playerId: number, id: number): number {
        return Enumerable
            .from(this.existenceItemMap.get(playerId))
            .count((syncKey) => this.syncItemMap.get(syncKey)?.id === id ?? false);
    }

    /**
     * 尝试生成.
     * @param playerId 指定的 playerId. 若无指定则全检查.
     * @private
     */
    private tryGenerate(playerId: number = undefined) {
        if (playerId === undefined) {
            for (const pId of this.existenceItemMap.keys()) {
                this.tryGenerate(pId);
            }
            return;
        }

        Enumerable
            .from(GameConfig.CollectibleItem.getAllElement())
            .forEach((item) => {
                for (let i = 0;
                     i < GameServiceConfig.MAX_SINGLE_GENERATE_TRIAL_COUNT &&
                     this.isGenerateEnable(playerId, item.id);
                     i++) {
                    GToolkit.log(CollectibleItemModuleS, `checking generate. 
                        playerId: ${playerId}. 
                        id: ${item.id}. 
                        current count: ${this.getItemExistenceCount(playerId, item.id)}. 
                        max count: ${CollectibleItem.maxExistenceCount(item.id)}.
                        trial: ${i}.`);
                    this.generate(playerId, item.id);
                }
            });
    }

    /**
     * 移除玩家.
     * @param playerId
     */
    private removePlayerRecord(playerId: number): void {
        this.existenceItemMap.delete(playerId);
    }

    /**
     * 加入玩家.
     * @param playerId
     * @private
     */
    private addPlayerRecord(playerId: number): void {
        this.existenceItemMap.set(playerId, []);
    }

    /**
     * 是否具备 生成条件.
     * @param playerId
     * @param id
     */
    private isGenerateEnable(playerId: number, id: number): boolean {
        return this.getItemExistenceCount(playerId, id) < CollectibleItem.maxExistenceCount(id) &&
            this.lastItemGenerateTime(playerId, id) + CollectibleItem.generationInterval(id) < Date.now();
    }

    /**
     * 注册 生成采集物.
     * @desc 采集物是私有的 采集物的存在依赖 playerId 属性.
     * @param playerId
     * @param itemId
     */
    private generate(playerId: number, itemId: number) {
        GToolkit.log(CollectibleItemModuleS, `try generate item, itemId: ${itemId}.`);
        GToolkit.log(CollectibleItemModuleS, () => `current count: ${this.getItemExistenceCount(playerId, itemId)}.`);
        GToolkit.log(CollectibleItemModuleS, () => `max count: ${CollectibleItem.maxExistenceCount(itemId)}.`);

        const syncKey = new UUID(4).toString();
        const item = new CollectibleItem();

        let array: string[] = this.existenceItemMap.get(playerId);
        if (!array) {
            array = [];
            this.existenceItemMap.set(playerId, array);
        }

        array.push(syncKey);
        this.syncItemMap.set(syncKey, item);

        item.generate(itemId);

        GToolkit.log(CollectibleItemModuleS, `generate item success. syncKey: ${syncKey}`);

        item.autoDestroyTimerId = setTimeout(() => {
                this.destroy(playerId, syncKey);
            },
            CollectibleItem.maxExistenceTime(itemId),
        );

        this.getClient(playerId).net_generate(
            syncKey,
            item.id,
            item.hitPoint,
            item.generateTime,
            item.location,
        );
    }

    /**
     * 注册 销毁采集物.
     * @param playerId
     * @param syncKey
     * @private
     */
    private destroy(playerId: number, syncKey: string) {
        const item = this.syncItemMap.get(syncKey);
        if (!item) {
            GToolkit.error(CollectibleItemModuleS, `destroy item is null`);
            return;
        }
        GToolkit.log(CollectibleItemModuleS, `try destroy item, itemId: ${item.id}.`);
        GToolkit.log(CollectibleItemModuleS, () => `  reason: ${(Date.now() - item.generateTime) > CollectibleItem.maxExistenceTime(item.id) ? "time out" : "collected"}.`);
        GToolkit.log(CollectibleItemModuleS, () => `  current count: ${this.getItemExistenceCount(playerId, item.id)}.`);
        GToolkit.log(CollectibleItemModuleS, () => `  max count: ${CollectibleItem.maxExistenceCount(item.id)}.`);

        if (item.autoDestroyTimerId) {
            clearTimeout(item.autoDestroyTimerId);
            item.autoDestroyTimerId = null;
        }

        let array: string[] = this.existenceItemMap.get(playerId);
        if (!array || !GToolkit.remove(array, syncKey)) {
            GToolkit.log(CollectibleItemModuleS, `destroy Collectible Item ${item.id} whose generate time is ${item.generateTime},
             but it not exist in server`);
        }

        item.destroy();
        GToolkit.log(CollectibleItemModuleS, `destroy item success. syncKey: ${syncKey}`);

        this.getClient(playerId).net_destroy(syncKey);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Net Method
    @noReply()
    public net_collectItem(syncKey: string) {
        const item = this.syncItemMap.get(syncKey);
        if (!item) {
            GToolkit.error(CollectibleItemModuleS, `item not exist in server when collect. syncKey: ${syncKey} `);
            return;
        }
        GToolkit.log(CollectibleItemModuleS, `try collect item. ${item.toString()}`);
        item.collect();
        if (!item.isCollectible) {
            this.destroy(this.currentPlayerId, syncKey);
        }
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}