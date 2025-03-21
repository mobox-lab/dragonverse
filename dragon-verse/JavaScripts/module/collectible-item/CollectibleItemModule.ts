import Enumerable from "linq";
import UUID from "pure-uuid";
import { GameConfig } from "../../config/GameConfig";
import { EventDefine } from "../../const/EventDefine";
import GameServiceConfig from "../../const/GameServiceConfig";
import Log4Ts from "mw-log4ts";
import MainPanel from "../../ui/main/MainPanel";
import GToolkit, { Regulator } from "gtoolkit";
import { BagModuleS } from "../bag/BagModule";
import CollectibleItem from "./CollectibleItem";
import CollectibleItemTrigger from "./trigger/CollectibleItemTrigger";
import PlayerInteractCollectibleItemEventArgs from "./trigger/PlayerInteractCollectibleItemEventArgs";
import GameObject = mw.GameObject;
import GameObjPoolSourceType = mwext.GameObjPoolSourceType;
import EventListener = mw.EventListener;
import AreaManager from "../../depend/area/AreaManager";
import Gtk from "gtoolkit";
import { IPoint3 } from "../../depend/area/shape/base/IPoint";

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
    public static async CollectibleItemPrefabFactory(syncKey: string, id: number, location: Vector) {
        if (!location) {
            Log4Ts.error(CollectibleItemModuleC, `generate item param location invalid.`);
            return null;
        }
        const collectInfo = GameConfig.CollectibleItem.getElement(id);
        if (!collectInfo) {
            return;
        }
        const assetId = collectInfo.prefabGuid;
        if (GToolkit.isNullOrEmpty(assetId)) {
            Log4Ts.error(CollectibleItemModuleC, `prefab not set. id: ${id}`);
            return null;
        }
        const obj = await GameObjPool.asyncSpawn(assetId, GameObjPoolSourceType.Prefab);
        obj.worldTransform.position = location;
        const trigger = GToolkit.getFirstComponent(obj, CollectibleItemTrigger);
        if (!trigger) {
            Log4Ts.error(CollectibleItemModuleC, `there is no trigger in prefab. id: ${id}`);
            return obj;
        }
        trigger.init(syncKey);
        return obj;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Member

    /**
     * 玩家私有全采集物映射.
     *  - key sync key.
     *  - value CollectibleItem.
     */
    public syncItemMap: Map<string, { item: CollectibleItem; object: GameObject }> = new Map();

    /**
     * 待采集物映射.
     */
    public collectCandidates: string[] = [];

    private _mainPanel: MainPanel;

    private _eventListeners: EventListener[] = [];

    private _currentCollectResultSyncKey: string = null;

    /**
     * 当前采集结果.
     */
    public get currentCollectResultSyncKey(): string {
        return this._currentCollectResultSyncKey;
    }

    private _isCollecting: boolean = false;

    public get isCollecting(): boolean {
        return this._isCollecting;
    }

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
        this._eventListeners.push(
            Event.addLocalListener(EventDefine.EnterCollectibleItemRange, this.onEnterCollectibleItemRange),
        );
        this._eventListeners.push(
            Event.addLocalListener(EventDefine.LeaveCollectibleItemRange, this.onLeaveCollectibleItemRange),
        );
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
        this._eventListeners.forEach((value) => value.disconnect());
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Method
    /**
     * 尝试采集.
     * @param syncKey
     */
    public tryCollect(syncKey: string) {
        Log4Ts.log(CollectibleItemModuleC, `try collect item.`);
        if (!this.syncItemMap.has(syncKey)) {
            Log4Ts.log(CollectibleItemModuleC, `item not exist in client when collect. syncKey: ${syncKey}`);
            return;
        }
        this._currentCollectResultSyncKey = null;

        const item = this.syncItemMap.get(syncKey).item;
        Log4Ts.log(CollectibleItemModuleC, item.info());
        if (!item.isCollectible) {
            Log4Ts.warn(CollectibleItemModuleC, `item un collectible. waiting for delete.`);
            return;
        }

        this._isCollecting = true;

        this.server.net_tryCollectItem(syncKey).then((value) => {
            if (value) {
                this._currentCollectResultSyncKey = syncKey;
            } else {
                this._isCollecting = false;
            }
        });
    }

    /**
     * 接受采集.
     */
    public acceptCollect(): boolean {
        if (GToolkit.isNullOrEmpty(this._currentCollectResultSyncKey)) {
            Log4Ts.warn(CollectibleItemModuleC, `current collect result is null or wrong when accept catch.`);
            return;
        }

        const item = this.syncItemMap.get(this._currentCollectResultSyncKey).item;
        Log4Ts.log(CollectibleItemModuleC, item.info());
        if (!item.isCollectible) {
            Log4Ts.warn(CollectibleItemModuleC, `item un collectible. waiting for delete.`);
            return;
        }
        item.collect();
        this._isCollecting = false;
        this.server.net_acceptCollect(this._currentCollectResultSyncKey);
        this._currentCollectResultSyncKey = null;
    }

    private generate(syncKey: string, item: CollectibleItem) {
        Log4Ts.log(CollectibleItemModuleC, `try generate item. ${item.info()}`);
        if (this.syncItemMap.get(syncKey)) {
            Log4Ts.error(CollectibleItemModuleC, `item already exist in client when generate. syncKey: ${syncKey}`);
            return;
        }

        CollectibleItemModuleC.CollectibleItemPrefabFactory(syncKey, item.id, item.location).then((value) => {
            if (!value) return;

            this.syncItemMap.set(syncKey, {item: item, object: value});
        });
    }

    private destroy(syncKey: string) {
        Log4Ts.log(CollectibleItemModuleC, `try destroy item. ${this.syncItemMap.get(syncKey).item.info() ?? "null"}`);

        this.syncItemMap.get(syncKey)?.object.destroy();
        this.syncItemMap.delete(syncKey);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    public net_generate(syncKey: string, id: number, hitPoint: number, generateTime: number, location: Vector) {
        this.generate(syncKey, new CollectibleItem().sync(id, hitPoint, generateTime, location));
    }

    public net_destroy(syncKey: string) {
        this.destroy(syncKey);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Event Callback
    public onEnterCollectibleItemRange = (args: PlayerInteractCollectibleItemEventArgs) => {
        if (args.playerId === Player.localPlayer.playerId) {
            this.collectCandidates.push(args.syncKey);
        }
    };

    public onLeaveCollectibleItemRange = (args: PlayerInteractCollectibleItemEventArgs) => {
        if (args.playerId === Player.localPlayer.playerId) {
            GToolkit.remove(this.collectCandidates, args.syncKey);
        }
    };
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class CollectibleItemModuleS extends ModuleS<CollectibleItemModuleC, CollectibleItemModuleData> {
    //#region Member
    private _bagModuleS: BagModuleS;

    private _areaManager: AreaManager;

    private get aM() {
        if (!this._areaManager) {
            this._areaManager = AreaManager.getInstance();
        }
        return this._areaManager;
    }

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

    /**
     * 全采集物 资源锁.
     *  - key sync key.
     *  - value playerId.
     *      - 未上锁时为 null.
     */
    private _syncLocker: Map<string, number> = new Map();

    private _generateRegulator: Regulator = new Regulator(GameServiceConfig.TRY_GENERATE_INTERVAL);

    private _generatedLocations: Map<number, IPoint3[]> = new Map();

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
        this._bagModuleS = ModuleService.getModule(BagModuleS);
        //#endregion ------------------------------------------------------------------------------------------

        //#region Event Subscribe
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);

        if (this._generateRegulator.request()) {
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
        // this._generateLocationsMap.delete(player.playerId);
        this._generatedLocations.delete(player.playerId);
        this.removePrivateRecord(player.playerId);
    }

    protected onPlayerEnterGame(player: Player): void {
        super.onPlayerEnterGame(player);
        this._generatedLocations.set(player.playerId, []);
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
        return Enumerable.from(this.existenceItemMap.get(playerId))
            .select((syncKey) => this.syncItemMap.get(syncKey))
            .where((item) => (item ? item.id === id : false))
            .defaultIfEmpty({generateTime: 0} as CollectibleItem)
            .max((item) => item.generateTime);
    }

    /**
     * 指定玩家 与 id 的存在数量.
     * @param playerId
     * @param id
     */
    private getItemExistenceCount(playerId: number, id: number): number {
        return Enumerable.from(this.existenceItemMap.get(playerId)).count(
            (syncKey) => this.syncItemMap.get(syncKey)?.id === id ?? false,
        );
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

        Enumerable.from(GameConfig.CollectibleItem.getAllElement()).forEach((item) => {
            for (
                let i = 0;
                i < GameServiceConfig.MAX_SINGLE_GENERATE_TRIAL_COUNT && this.isGenerateEnable(playerId, item.id);
                i++
            ) {
                Log4Ts.log(
                    CollectibleItemModuleS,
                    `checking generate.`,
                    `playerId: ${playerId}.`,
                    `id: ${item.id}.`,
                    `current count: ${this.getItemExistenceCount(playerId, item.id)}.`,
                    `max count: ${CollectibleItem.maxExistenceCount(item.id)}.`,
                    `trial: ${i}.`,
                );
                this.generate(playerId, item.id);
            }
        });
    }

    /**
     * 移除私有记录.
     * @param playerId
     */
    private removePrivateRecord(playerId: number): void {
        Enumerable.from(this.existenceItemMap.get(playerId)).forEach((key) => {
            this.syncItemMap.delete(key);
            this._syncLocker.delete(key);
        });
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
        return (
            this.getItemExistenceCount(playerId, id) < CollectibleItem.maxExistenceCount(id) &&
            this.lastItemGenerateTime(playerId, id) + CollectibleItem.generationInterval(id) < Date.now()
        );
    }

    /**
     * 注册 生成采集物.
     * @desc 采集物是私有的 采集物的存在依赖 playerId 属性.
     * @param playerId
     * @param itemId
     * @param location
     */
    private generate(playerId: number, itemId: number, location: IPoint3 = undefined) {
        Log4Ts.log(
            CollectibleItemModuleS,
            `try generate item, itemId: ${itemId}.`,
            () => `current count: ${this.getItemExistenceCount(playerId, itemId)}.`,
            () => `max count: ${CollectibleItem.maxExistenceCount(itemId)}.`,
        );

        let config = GameConfig.CollectibleItem.getElement(itemId);
        if (!config) {
            Log4Ts.error(CollectibleItemModuleS, `CollectibleItem config not found.`);
            return;
        }

        let targetArea: number = undefined;
        let iTargetArea = Enumerable
            .from(config.areaIds)
            .select(areaId => {
                return ({
                    areaId,
                    space: this.aM.getAreaPointSetSize(areaId) -
                        Enumerable.from(this._generatedLocations.get(playerId))
                            .sum(p => this.aM.isPoint3DInAreaByPointSet(areaId, p) ? 1 : 0),
                });
            })
            .where(item => item.space > 0);
        if (iTargetArea.any()) {
            targetArea = iTargetArea.maxBy(item => item.space).areaId;
        }

        if (targetArea === undefined) {
            Log4Ts.log(CollectibleItemModuleS, `all area is full. playerId: ${playerId}.`);
            return;
        }
        if (location === undefined) location = this.aM.getRandomPoint(targetArea, this._generatedLocations.get(playerId)) as IPoint3;
        if (location === undefined) {
            Log4Ts.error(CollectibleItemModuleS, `generate location is null.`);
            return;
        }
        if (!("z" in location)) {
            Log4Ts.warn(CollectibleItemModuleS, `currently only support 3D point as spawn point.`);
            return;
        }

        const syncKey = new UUID(4).toString();
        const item = new CollectibleItem();

        this._generatedLocations.get(playerId)?.push(location);
        item.generate(itemId, new Vector(location.x, location.y, location.z));

        let array: string[] = this.existenceItemMap.get(playerId);
        if (!array) {
            array = [];
            this.existenceItemMap.set(playerId, array);
        }

        array.push(syncKey);
        this.syncItemMap.set(syncKey, item);

        Log4Ts.log(CollectibleItemModuleS, `generate item success. syncKey: ${syncKey}`, () => item.info());

        item.autoDestroyTimerId = setTimeout(() => {
            this.destroy(playerId, syncKey);
        }, CollectibleItem.maxExistenceTime(itemId));

        this.getClient(playerId).net_generate(syncKey, item.id, item.hitPoint, item.generateTime, item.location);
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
            Log4Ts.error(CollectibleItemModuleS, `destroy item is null`);
            return;
        }
        Log4Ts.log(
            CollectibleItemModuleS,
            `try destroy item, itemId: ${item.id}.`,
            () =>
                `reason: ${Date.now() - item.generateTime > CollectibleItem.maxExistenceTime(item.id) ? "time out" : "collected"}.`,
            () => `current count: ${this.getItemExistenceCount(playerId, item.id)}.`,
            () => `max count: ${CollectibleItem.maxExistenceCount(item.id)}.`,
        );

        if (item.autoDestroyTimerId) {
            clearTimeout(item.autoDestroyTimerId);
            item.autoDestroyTimerId = null;
        }

        let array: string[] = this.existenceItemMap.get(playerId);
        if (!array || !GToolkit.remove(array, syncKey)) {
            Log4Ts.log(
                CollectibleItemModuleS,
                `destroy Collectible Item ${item.id} whose generate time is ${item.generateTime},
             but it not exist in server`,
            );
        }

        const location = item.location;
        Gtk.remove(this._generatedLocations.get(playerId), location);
        item.destroy();
        Log4Ts.log(CollectibleItemModuleS, `destroy item success. syncKey: ${syncKey}`);

        this.syncItemMap.delete(syncKey);
        this._syncLocker.delete(syncKey);
        this.getClient(playerId).net_destroy(syncKey);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    public net_tryCollectItem(syncKey: string): Promise<boolean> {
        const currPlayerId = this.currentPlayerId;
        const item = this.syncItemMap.get(syncKey);
        if (!item) {
            Log4Ts.error(CollectibleItemModuleS, `item not exist in server when collect. syncKey: ${syncKey} `);
            return Promise.resolve(false);
        }
        Log4Ts.log(CollectibleItemModuleS, `try collect item. ${item.info()}`);
        const locker = this._syncLocker.get(syncKey);
        if (locker !== undefined) {
            Log4Ts.log(CollectibleItemModuleS, `item is already locked.`);
            return Promise.resolve(false);
        }

        const success: boolean = GToolkit.randomWeight([CollectibleItem.successRate(item.id)], 1) === 0;
        if (!success) {
            Log4Ts.log(CollectibleItemModuleC, `collect fail. failed the success rate check.`);
            return Promise.resolve(false);
        } else {
            Log4Ts.log(CollectibleItemModuleS, `item locked.`);
            this._syncLocker.set(syncKey, currPlayerId);
            return Promise.resolve(true);
        }
    }

    public net_acceptCollect(syncKey: string) {
        const currPlayerId = this.currentPlayerId;
        const item = this.syncItemMap.get(syncKey);
        if (!item) {
            Log4Ts.error(CollectibleItemModuleS, `item not exist in server when collect. syncKey: ${syncKey} `);
            return;
        }
        Log4Ts.log(CollectibleItemModuleS, `accept collect item.`, `syncKey: ${syncKey}`, `${item.info()}`);
        if (this._syncLocker.get(syncKey) !== currPlayerId) {
            Log4Ts.log(
                CollectibleItemModuleS,
                `item locker illegal.`,
                `current locker: ${this._syncLocker.get(syncKey)}.`,
                `request locker: ${syncKey}.`,
            );
            return;
        }
        this._syncLocker.delete(syncKey);

        item.collect();
        this._bagModuleS.addItem(currPlayerId, item.getBagConfig().id, 1);
        if (!item.isCollectible) {
            this.destroy(currPlayerId, syncKey);
        }
        return;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}
