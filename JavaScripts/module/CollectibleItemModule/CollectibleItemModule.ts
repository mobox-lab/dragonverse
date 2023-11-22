import { GameConfig } from "../../config/GameConfig";
import Enumerable from "linq";
import CollectibleItem from "./CollectibleItem";
import GToolkit from "../../util/GToolkit";
import GameServiceConfig from "../../const/GameServiceConfig";
import Regulator from "../../depend/regulator/Regulator";

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
//#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onStart(): void {
        super.onStart();

//#region Member init
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
        //TODO_LviatYi 
//#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Method
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Net Method
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class CollectibleItemModuleS extends ModuleS<CollectibleItemModuleC, CollectibleItemModuleData> {
//#region Member
    /**
     * 私有玩家采集物存在映射.
     *  - key 玩家 PlayerId.
     *  - value 该玩家现存所有采集物.
     */
    public existenceItemMap: Map<number, CollectibleItem[]> = new Map();

    private _regulator: Regulator = new Regulator(GameServiceConfig.TRY_GENERATE_INTERVAL);

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

        if (this._regulator.ready()) {
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
            .where((item) => item.id === id)
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
            .count((item) => item.id === id);
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
        GToolkit.log(CollectibleItemModuleS, `try generate collectible item in server, itemId: ${itemId}.`);
        GToolkit.log(CollectibleItemModuleS, () => `current count: ${this.getItemExistenceCount(playerId, itemId)}.`);
        GToolkit.log(CollectibleItemModuleS, () => `max count: ${CollectibleItem.maxExistenceCount(itemId)}.`);

        const item = new CollectibleItem();

        let array: CollectibleItem[] = this.existenceItemMap.get(playerId);
        if (!array) {
            array = [];
            this.existenceItemMap.set(playerId, array);
        }

        array.push(item);

        item.generate(itemId);

        item.autoDestroyTimerId = setTimeout(() => {
                this.destroy(playerId, item);
            },
            CollectibleItem.maxExistenceTime(itemId),
        );
    }

    /**
     * 注册 销毁采集物.
     * @param playerId
     * @param item
     * @private
     */
    private destroy(playerId: number, item: CollectibleItem) {
        GToolkit.log(CollectibleItemModuleS, `try destroy collectible item in server, itemId: ${item.id}.`);
        GToolkit.log(CollectibleItemModuleS, () => `reason: ${(Date.now() - item.generateTime) > CollectibleItem.maxExistenceTime(item.id) ? "time out" : "collected"}.`);
        GToolkit.log(CollectibleItemModuleS, () => `current count: ${this.getItemExistenceCount(playerId, item.id)}.`);
        GToolkit.log(CollectibleItemModuleS, () => `max count: ${CollectibleItem.maxExistenceCount(item.id)}.`);
        if (item.autoDestroyTimerId) {
            clearTimeout(item.autoDestroyTimerId);
            item.autoDestroyTimerId = null;
        }

        let array: CollectibleItem[] = this.existenceItemMap.get(playerId);
        if (!array || !GToolkit.remove(array, item)) {
            GToolkit.log(CollectibleItemModuleS, `destroy Collectible Item ${item.id} whose generate time is ${item.generateTime},
             but it not exist in server`);
        }

        item.destroy();
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Net Method
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}