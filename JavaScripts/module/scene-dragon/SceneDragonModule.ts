import GToolkit from "../../util/GToolkit";
import SceneDragonBehavior from "./SceneDragonBehavior";
import SceneDragon from "./SceneDragon";
import MainPanel from "../../ui/main/MainPanel";
import GameObject = mw.GameObject;
import Regulator from "../../depend/regulator/Regulator";
import GameServiceConfig from "../../const/GameServiceConfig";
import Enumerable from "linq";
import { GameConfig } from "../../config/GameConfig";
import UUID from "pure-uuid";
import noReply = mwext.Decorator.noReply;

/**
 * 场景龙存在数据.
 */
class SceneDragonExistInfo {
    public behavior: SceneDragonBehavior;
    public object: GameObject;

    constructor(behaviorInfo: SceneDragonBehavior, object: GameObject) {
        this.behavior = behaviorInfo;
        this.object = object;
    }
}

export default class SceneDragonModuleData extends Subdata {
    //@Decorator.persistence()
    //public isSave: bool;
}

/**
 * SceneDragon Module.
 * 场景龙模块.
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
export class SceneDragonModuleC extends ModuleC<SceneDragonModuleS, SceneDragonModuleData> {
//#region Constant
    public static readonly PREFAB_MAP: Map<number, string> = new Map();

    static {
        this.PREFAB_MAP.set(1, "CA62F48046026D8E9EB0F2B9833CF516");
    }

    public static async sceneDragonPrefabFactory(
        item: SceneDragon) {
        if (!item.location) {
            GToolkit.error(SceneDragonModuleC, `generate item param location invalid.`);
            return null;
        }
        const assetId = this.PREFAB_MAP.get(item.id);
        if (GToolkit.isNullOrEmpty(assetId)) {
            GToolkit.error(SceneDragonModuleC, `prefab not set. id: ${item.id}`);
            return null;
        }
        const obj = await GameObjPool.asyncSpawn(
            assetId,
            GameObjPoolSourceType.Prefab,
        );
        const behavior = GToolkit.getFirstScript(obj, SceneDragonBehavior);
        behavior.init(item);
        obj.worldTransform.position = item.location;

        return new SceneDragonExistInfo(
            behavior,
            obj,
        );
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Member

    /**
     * 玩家私有全场景龙映射.
     *  - key sync key.
     *  - value SceneDragon.
     */
    public syncItemMap: Map<string, SceneDragonExistInfo> = new Map();

    /**
     * 待场景龙映射.
     */
    public collectCandidates: string[] = [];

    private _mainPanel: MainPanel;

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
//#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Method
    /**
     * 客户端 捕捉.
     * @param syncKey
     */
    public catch(syncKey: string) {
        GToolkit.log(SceneDragonModuleC, `try collect item.`);
        if (!this.syncItemMap.has(syncKey)) {
            GToolkit.log(SceneDragonModuleC, `item not exist in client when collect. syncKey: ${syncKey}`);
            return;
        }

        const item: SceneDragon = this.syncItemMap.get(syncKey).behavior.data;
        GToolkit.log(SceneDragonModuleC, item.info());
        if (!item.isCatchable) {
            GToolkit.warn(SceneDragonModuleC, `item un collectible. waiting for delete.`);
            return;
        }

        const success: boolean = GToolkit.randomWeight([SceneDragon.successRateAlgo(item.id)()], 1) === 0;
        if (!success) {
            GToolkit.log(SceneDragonModuleC, `collect fail`);
            return;
        }

        GToolkit.log(SceneDragonModuleC, `collect success. last collect count: ${item.hitPoint}`);
        this.server.net_catch(syncKey);
        item.catch();
    }

    private generate(syncKey: string, item: SceneDragon) {
        GToolkit.log(SceneDragonModuleC, `try generate item. ${item.info()}`);
        if (this.syncItemMap.get(syncKey)) {
            GToolkit.error(SceneDragonModuleC, `item already exist in client when generate. syncKey: ${syncKey}`);
            return;
        }

        SceneDragonModuleC.sceneDragonPrefabFactory(
            item,
        ).then((value) => {
            this.syncItemMap.set(syncKey, value);
        });
    }

    private destroy(syncKey: string) {
        GToolkit.log(SceneDragonModuleC, `try destroy item. ${this.syncItemMap.get(syncKey).behavior.data.info() ?? "null"}`);

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
            new SceneDragon()
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
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class SceneDragonModuleS extends ModuleS<SceneDragonModuleC, SceneDragonModuleData> {
//#region Member
    /**
     * 私有玩家场景龙存在映射.
     *  - key 玩家 PlayerId.
     *  - value 该玩家现存所有场景龙.
     */
    public existenceItemMap: Map<number, string[]> = new Map();

    /**
     * 全场景龙映射.
     *  - key sync key.
     *  - value SceneDragon.
     */
    public syncItemMap: Map<string, SceneDragon> = new Map();

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
     * 指定玩家 与 id 的场景龙最新生成时间.
     * @param playerId
     * @param id
     */
    private lastItemGenerateTime(playerId: number, id: number): number {
        return Enumerable
            .from(this.existenceItemMap.get(playerId))
            .select((syncKey) => this.syncItemMap.get(syncKey))
            .where((item) => item ? item.id === id : false)
            .defaultIfEmpty({generateTime: 0} as SceneDragon)
            .max((item) => item.generateTime);
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
            .from(GameConfig.Dragon.getAllElement())
            .forEach((item) => {
                for (let i = 0;
                     i < GameServiceConfig.MAX_SINGLE_GENERATE_TRIAL_COUNT &&
                     this.isGenerateEnable(playerId, item.id);
                     i++) {
                    GToolkit.log(SceneDragonModuleS, `checking generate.
                        playerId: ${playerId}.
                        id: ${item.id}.
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
        return this.lastItemGenerateTime(playerId, id) + SceneDragon.generationInterval(id) < Date.now();
    }

    /**
     * 注册 生成场景龙.
     * @desc 场景龙是私有的 场景龙的存在依赖 playerId 属性.
     * @param playerId
     * @param itemId
     */
    private generate(playerId: number, itemId: number) {
        GToolkit.log(SceneDragonModuleS, `try generate item, itemId: ${itemId}.`);

        const syncKey = new UUID(4).toString();
        const item = new SceneDragon();

        let array: string[] = this.existenceItemMap.get(playerId);
        if (!array) {
            array = [];
            this.existenceItemMap.set(playerId, array);
        }

        array.push(syncKey);
        this.syncItemMap.set(syncKey, item);

        item.generate(itemId);

        GToolkit.log(SceneDragonModuleS, `generate item success. syncKey: ${syncKey}`);

        item.autoDestroyTimerId = setTimeout(() => {
                this.destroy(playerId, syncKey);
            },
            SceneDragon.maxExistenceTime(itemId),
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
     * 注册 销毁场景龙.
     * @param playerId
     * @param syncKey
     * @private
     */
    private destroy(playerId: number, syncKey: string) {
        const item = this.syncItemMap.get(syncKey);
        if (!item) {
            GToolkit.error(SceneDragonModuleS, `destroy item is null`);
            return;
        }
        GToolkit.log(SceneDragonModuleS, () => `try destroy item, itemId: ${item.id}.`);
        GToolkit.log(SceneDragonModuleS, () => `    reason: ${(Date.now() - item.generateTime) > SceneDragon.maxExistenceTime(item.id) ? "time out" : "collected"}.`);

        if (item.autoDestroyTimerId) {
            clearTimeout(item.autoDestroyTimerId);
            item.autoDestroyTimerId = null;
        }

        let array: string[] = this.existenceItemMap.get(playerId);
        if (!array || !GToolkit.remove(array, syncKey)) {
            GToolkit.log(SceneDragonModuleS, `destroy Collectible Item ${item.id} whose generate time is ${item.generateTime},
             but it not exist in server`);
        }

        item.destroy();
        GToolkit.log(SceneDragonModuleS, `destroy item success. syncKey: ${syncKey}`);

        this.getClient(playerId).net_destroy(syncKey);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Net Method
    @noReply()
    public net_catch(syncKey: string) {
        const item = this.syncItemMap.get(syncKey);
        if (!item) {
            GToolkit.error(SceneDragonModuleS, `item not exist in server when collect. syncKey: ${syncKey} `);
            return;
        }
        GToolkit.log(SceneDragonModuleS, `try collect item. ${item.info()}`);
        item.catch();
        if (!item.isCatchable) {
            this.destroy(this.currentPlayerId, syncKey);
        }
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}