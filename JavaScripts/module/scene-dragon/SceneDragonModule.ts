import Enumerable from "linq";
import UUID from "pure-uuid";
import { GameConfig } from "../../config/GameConfig";
import { EventDefine } from "../../const/EventDefine";
import { BagTypes } from "../../const/ForeignKeyIndexer";
import GameServiceConfig from "../../const/GameServiceConfig";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import Regulator from "../../depend/regulator/Regulator";
import AreaManager from "../../gameplay/area/AreaManager";
import GToolkit from "../../util/GToolkit";
import { IPoint3 } from "../../util/area/Shape";
import { BagModuleC, BagModuleS } from "../bag/BagModule";
import SceneDragon from "./SceneDragon";
import SceneDragonBehavior from "./SceneDragonBehavior";
import GameObject = mw.GameObject;
import noReply = mwext.Decorator.noReply;
import i18n from "../../language/i18n";
import UnifiedRoleController from "../role/UnifiedRoleController";
import { RoleModuleC } from "../role/RoleModule";
import Waterween from "../../depend/waterween/Waterween";
import Easing from "../../depend/easing/Easing";
import EffectService = mw.EffectService;
import { ThrowDragonBall } from "../../gameplay/archtype/action/ThrowDragonBall";
import GameplayCueSet = UE.GameplayCueSet;

/**
 * 场景龙 相关事件.
 */
export interface DragonSyncKeyEventArgs {
    syncKey: string;
}

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
    public static async sceneDragonPrefabFactory(
        syncKey: string,
        item: SceneDragon) {
        if (!item.location) {
            Log4Ts.error(SceneDragonModuleC, `generate item param location invalid.`);
            return null;
        }
        const dragonInfo = item.getDragonConfig();
        let assetId = dragonInfo.avatar;
        if (GToolkit.isNullOrEmpty(assetId)) {
            Log4Ts.error(SceneDragonModuleC, `prefab not set. id: ${item.id}`);
            return null;
        }

        let obj = await mw.GameObject.asyncSpawn("Character") as mw.Character;
        obj.setDescription([assetId]);

        let behavior: SceneDragonBehavior = await mw.Script.spawnScript(SceneDragonBehavior, false);
        behavior.gameObject = obj;
        behavior.init(syncKey, item);
        item.location.z += 150;
        obj.worldTransform.position = item.location;
        obj.addMovement(mw.Vector.forward);
        obj.tag = "SceneDragon";
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

    private _eventListeners: EventListener[] = [];

    private _lockingSyncKey: string = null;

    private _lockTimerId: number = null;

    private _currentBall: ThrowDragonBall = null;

    private _currentCatchResultSyncKey: string = null;

    private _candidate: string = null;

    private _character: Character;

    private get character() {
        if (!this._character) {
            this._character = Player.localPlayer.character;
        }
        return this._character;
    }

    private _roleCtrlCache: UnifiedRoleController;

    private get roleCtrl(): UnifiedRoleController {
        if (!this._roleCtrlCache) {
            this._roleCtrlCache = ModuleService.getModule(RoleModuleC).controller;
        }
        return this._roleCtrlCache;
    }

    /**
     * 当前参选者.
     */
    public get candidate(): string {
        return this._candidate;
    }

    /**
     * 当前捕捉结果.
     */
    public get currentCatchResultSyncKey(): string {
        return this._currentCatchResultSyncKey;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onStart(): void {
        super.onStart();

        //#region Member init
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

        //#region Event Subscribe
        this._eventListeners.push(Event.addLocalListener(EventDefine.DragonOutOfAliveRange, this.onDragonOutOfAliveRange));
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);

        this.chooseCandidate();
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
    public lock() {
        Log4Ts.log(SceneDragonModuleC, `try lock on item. candidate syncKey: ${this._candidate}`);
        const item = this.syncItemMap.get(this._candidate);
        if (!item) Log4Ts.warn(SceneDragonModuleC, `lock item not exist in client.`);

        if (this._lockingSyncKey === this._candidate) {
            if (this._lockTimerId) {
                clearTimeout(this._lockTimerId);
                this._lockTimerId = null;
            }
            if (this._candidate) {
                this._lockTimerId = setTimeout(
                    () => this.acceptResult(),
                    GameServiceConfig.SCENE_DRAGON_MAX_PREPARE_CATCH_DURATION,
                );
            } else {
                this.unlockWithView();
            }
        } else {
            if (this._lockingSyncKey) {
                Log4Ts.log(SceneDragonModuleC, `already lock on another SceneDragon. origin syncKey: ${this._lockingSyncKey}`);
                if (this.syncItemMap.has(this._lockingSyncKey)) {
                    this.syncItemMap.get(this._lockingSyncKey).behavior.state.isFear = false;
                }
                this.unlockWithView();
            } else {
                this.roleCtrl.addMoveForbiddenBuff();
            }

            if (item) {
                Log4Ts.log(SceneDragonModuleC, `lock on SceneDragon. syncKey: ${this._candidate}`);
                item.behavior.state.isFear = true;
                this._currentCatchResultSyncKey = null;
                const position = this
                    .syncItemMap
                    .get(this._candidate)
                    .object
                    .worldTransform
                    .position
                    .clone();
                this.roleCtrl.lookAt(position);
                Waterween.to(
                    () => this.roleCtrl.character.worldTransform.rotation.toQuaternion(),
                    (val) => this.roleCtrl.character.worldTransform.rotation = val.toRotation(),
                    Quaternion.fromRotation(
                        Rotation.fromVector(
                            GToolkit.newWithZ(
                                position.subtract(this.character.worldTransform.position),
                                0))),
                    0.5e3,
                    undefined,
                    Easing.easeInOutSine,
                    Quaternion.slerp,
                ).autoDestroy();
                Event.dispatchToLocal(EventDefine.DragonOnLock, {syncKey: this._lockingSyncKey} as DragonSyncKeyEventArgs);
                this._lockTimerId = setTimeout(
                    () => this.acceptResult(),
                    GameServiceConfig.SCENE_DRAGON_MAX_PREPARE_CATCH_DURATION,
                );
            }
        }

        this._lockingSyncKey = this._candidate;
    }

    /**
     * 尝试捕捉.
     */
    public tryCatch() {
        const syncKey = this._lockingSyncKey;
        if (GToolkit.isNullOrEmpty(syncKey)) {
            Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, i18n.lan(i18n.keyTable.NonCandidateSceneDragon));
            Log4Ts.log(SceneDragonModuleC, `current locking sync key is null.`);
            return;
        }
        Log4Ts.log(SceneDragonModuleC, `try catch item.`);

        const item = this.syncItemMap.get(syncKey);
        if (!item?.behavior?.data) {
            Log4Ts.log(SceneDragonModuleC, `item not exist in client. syncKey: ${syncKey}`);
            return;
        }
        Log4Ts.log(SceneDragonModuleC, item.behavior.data.info());
        if (!item.behavior.data.isCatchable) {
            Log4Ts.warn(SceneDragonModuleC, `item un catchable. waiting for delete.`);
            return;
        }
        this.keepLockWithView();
        ModuleService.getModule(RoleModuleC).controller.playerPlayThrow(item.object.worldTransform.position);

        try {
            this._currentBall = new ThrowDragonBall(
                this.character,
                item.object.worldTransform.position,
                GameServiceConfig.DRAGON_BALL_THROW_DURATION,
            );
        } catch (e) {
            Log4Ts.error(SceneDragonModuleC, `prefab of dragon ball not set.`);
        }
        this._currentBall?.do();


        this.server.net_tryCatch(syncKey).then(
            (value) => {
                if (value) this._currentCatchResultSyncKey = syncKey;
            },
        );
    }

    /**
     * 接受捕捉.
     */
    public acceptResult(): boolean {
        if (GToolkit.isNullOrEmpty(this._currentCatchResultSyncKey)) {
            this._currentBall?.next(false);
            const item = this.syncItemMap.get(this._lockingSyncKey);
            if (!item) {
                Log4Ts.log(SceneDragonModuleC, `item not exist in client. syncKey: ${this._lockingSyncKey}`);
                return;
            }
            Log4Ts.log(SceneDragonModuleC, `accept failed result.`);
            item.behavior.state.isFear = false;
            this.unlockWithView();
            return;
        } else {
            this._currentBall?.next(true);
            this.unlockWithView();
            const item = this.syncItemMap.get(this._currentCatchResultSyncKey);
            const sceneDragon = item?.behavior?.data;
            if (!sceneDragon) {
                Log4Ts.log(SceneDragonModuleC, `item not exist in client. syncKey: ${this._currentCatchResultSyncKey}`);
                return;
            }
            Log4Ts.log(SceneDragonModuleC, `accept success result.`, sceneDragon.info());
            if (!sceneDragon.isCatchable) {
                Log4Ts.warn(SceneDragonModuleC, `item un catchable. waiting for delete.`);
                return;
            }
            EffectService.playAtPosition(
                GameServiceConfig.SMOKE_EFFECT_ID,
                item.object.worldTransform.position,
                {
                    loopCount: 1,
                },
            );
            sceneDragon.catch();
            this.server.net_acceptCatch(this._currentCatchResultSyncKey);
            this._currentCatchResultSyncKey = null;
        }
    }

    private generate(syncKey: string, item: SceneDragon) {
        Log4Ts.log(SceneDragonModuleC, `try generate item. ${item.info()}`);
        if (this.syncItemMap.get(syncKey)) {
            Log4Ts.error(SceneDragonModuleC, `item already exist in client when generate. syncKey: ${syncKey}`);
            return;
        }

        SceneDragonModuleC.sceneDragonPrefabFactory(
            syncKey,
            item,
        ).then((value) => {
            if (!value) return;

            this.syncItemMap.set(syncKey, value);
        });
    }

    private destroy(syncKey: string) {
        Log4Ts.log(SceneDragonModuleC, `try destroy item. ${this.syncItemMap.get(syncKey).behavior.data.info() ?? "?null"}`);

        this.syncItemMap.get(syncKey)?.object.destroy();
        this.syncItemMap.delete(syncKey);

        // this._mainPanel.removeSceneDragonInteractor(syncKey);
    }

    private unlockWithView() {
        this._lockingSyncKey = null;
        Event.dispatchToLocal(EventDefine.DragonOnUnlock, {syncKey: this._lockingSyncKey} as DragonSyncKeyEventArgs);
        if (this._lockTimerId !== null) {
            clearTimeout(this._lockTimerId);
            this._lockTimerId = null;
        }
    }

    private keepLockWithView() {
        if (this._lockTimerId) {
            clearTimeout(this._lockTimerId);
            this._lockTimerId = null;
        }
    }

    private getSceneDragonBySyncKey(syncKey: string): SceneDragon | null {
        return this.syncItemMap.get(syncKey)?.behavior?.data ?? null;
    }

    private chooseCandidate() {
        if (!this.character) return;
        if (!GToolkit.isNullOrEmpty(this._lockingSyncKey)) return;
        const sceneDragonCatchableDistance = GameServiceConfig.SCENE_DRAGON_CATCHABLE_DISTANCE;
        const sceneDragonCatchableDistanceSqr = sceneDragonCatchableDistance * sceneDragonCatchableDistance;
        const charPosition = this.character.worldTransform.position;

        let candidate: string = Enumerable
            .from(Array.from(this.syncItemMap.entries()))
            .where(item => {
                const itemPosition = item[1].object.worldTransform.position;
                return itemPosition.x - charPosition.x < sceneDragonCatchableDistance &&
                    itemPosition.y - charPosition.y < sceneDragonCatchableDistance &&
                    itemPosition.z - charPosition.z < sceneDragonCatchableDistance;
            })
            .select((item) => {
                const itemPosition = item[1].object.worldTransform.position;
                return {
                    syncKey: item[0],
                    existInfo: item[1],
                    distSqr: GToolkit.squaredEuclideanDistance(
                        [itemPosition.x, itemPosition.y, itemPosition.z],
                        [charPosition.x, charPosition.y, charPosition.z],
                    ),
                };
            })
            .where(item => item.distSqr < sceneDragonCatchableDistanceSqr)
            .defaultIfEmpty({syncKey: null, existInfo: null, distSqr: 0})
            .minBy(item => item.distSqr)
            .syncKey ?? null;

        if (this._candidate !== candidate) {
            this.syncItemMap.get(this._candidate)?.behavior.unElected();
            Event.dispatchToLocal(EventDefine.DragonOnCandidateChange, {syncKey: candidate} as DragonSyncKeyEventArgs);
            this._candidate = candidate;
        }
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

    // public net_createThrowBall(targetSyncKey: string, from: Vector, to: Vector) {
    //
    // }
    //
    // public net_nextThrowBall(targetSyncKey: string,result:boolean) {
    //
    // }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Event Callback
    private onDragonOutOfAliveRange = (syncKey: string) => {
        Log4Ts.log(SceneDragonModuleC, `;
        knows;
        dragon;
        out;
        of;
        alive;
        range.syncKey;
    : ${syncKey}
        `);
        this.server.net_destroy(syncKey);
    };

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class SceneDragonModuleS extends ModuleS<SceneDragonModuleC, SceneDragonModuleData> {
    //#region Constant
    private static readonly GENERATION_HOLDER_TAG = "scene-dragon-points";
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Member
    private _bagModuleS: BagModuleS;

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

    /**
     * 全场景龙 资源锁.
     *  - key sync key.
     *  - value playerId.
     *      - 未上锁时为 null.
     */
    private _syncLocker: Map<string, number> = new Map();

    private _generateRegulator: Regulator = new Regulator(GameServiceConfig.TRY_GENERATE_INTERVAL);

    /**
     * 生成位置表.
     * @desc 从制定标签锚点的子锚点收集.
     * @desc key id.
     * @desc value 生成位置.
     * @private
     */
    private _generateLocationsMap: Map<number, IPoint3[]>;

    private getValidGenerateLocation(id: number, playerId: number): IPoint3[] {
        if (!this._generateLocationsMap) {
            this._generateLocationsMap = AreaManager.getInstance().getGenerationPointMap(BagTypes.Dragon);
        }

        return this._generateLocationsMap.get(id);
    }

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
        this.removePrivateRecord(player.playerId);
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
            .from(GameConfig.CharacterfulDragon.getAllElement())
            .forEach((item) => {
                for (let i = 0;
                     i < GameServiceConfig.MAX_SINGLE_GENERATE_TRIAL_COUNT &&
                     this.isGenerateEnable(playerId, item.id);
                     i++) {
                    Log4Ts.log(SceneDragonModuleS,
                        `checking generate.`,
                        () => `playerId: ${playerId}.`,
                        () => `id: ${item.id}.`,
                        () => `trial: ${i}.`);
                    this.generate(playerId, item.id);
                }
            });
    }

    /**
     * 移除私有记录.
     * @param playerId
     */
    private removePrivateRecord(playerId: number): void {
        Enumerable
            .from(this.existenceItemMap.get(playerId))
            .forEach(key => {
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
        return this.lastItemGenerateTime(playerId, id) + SceneDragon.generationInterval(id) < Date.now();
    }

    /**
     * 注册 生成场景龙.
     * @desc 场景龙是私有的 场景龙的存在依赖 playerId 属性.
     * @param playerId
     * @param itemId
     */
    private generate(playerId: number, itemId: number) {
        Log4Ts.log(SceneDragonModuleS, `try generate item, itemId: ${itemId}.`);

        let location = GToolkit.randomArrayItem(this.getValidGenerateLocation(SceneDragon.getDragonConfig(itemId).id, playerId));
        if (location === null) {
            Log4Ts.error(SceneDragonModuleS, `generate location is null.`);
            return;
        }

        const syncKey = new UUID(4).toString();
        const item = new SceneDragon();
        item.generate(itemId, new Vector(location.x, location.y, location.z));

        const playerPosition = Player.getPlayer(playerId)?.character.worldTransform.position ?? null;
        if (playerPosition === null || Vector.squaredDistance(item.location, playerPosition) > GameServiceConfig.SQR_SCENE_DRAGON_MAX_LIVE_DISTANCE) {
            Log4Ts.log(SceneDragonModuleS,
                `generate item skipped.player is too far.`,
                `id: ${item.id}.`,
                `location: ${item.location}.`);
            return;
        }

        let array: string[] = this.existenceItemMap.get(playerId);
        if (!array) {
            array = [];
            this.existenceItemMap.set(playerId, array);
        }

        array.push(syncKey);
        this.syncItemMap.set(syncKey, item);
        this._syncLocker.set(syncKey, null);

        Log4Ts.log(SceneDragonModuleS, `generate item success. syncKey: ${syncKey}`);

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
            Log4Ts.error(SceneDragonModuleS, `;
        destroy;
        item;
        is;
        null`);
            return;
        }
        Log4Ts.log(SceneDragonModuleS,
            () => `;
        try
        destroy;
        item, itemId;
    : ${item.id}
    .
        `,
            () => `;
        reason: ${(Date.now() - item.generateTime) > SceneDragon.maxExistenceTime(item.id) ? "time out" : "collected"}.
        `);

        if (item.autoDestroyTimerId) {
            clearTimeout(item.autoDestroyTimerId);
            item.autoDestroyTimerId = null;
        }

        let array: string[] = this.existenceItemMap.get(playerId);
        if (!array || !GToolkit.remove(array, syncKey)) {
            Log4Ts.log(SceneDragonModuleS, `;
        destroy;
        Collectible;
        Item; ${item.id}
        whose;
        generate;
        time;
        is ${item.generateTime},
            but;
        it;
        not;
        exist in server`);
        }

        item.destroy();
        Log4Ts.log(SceneDragonModuleS, `;
        destroy;
        item;
        success.syncKey;
    : ${syncKey}
        `);

        this.syncItemMap.delete(syncKey);
        this._syncLocker.delete(syncKey);
        this.getClient(playerId).net_destroy(syncKey);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    public net_tryCatch(syncKey: string): Promise<boolean> {
        const currPlayerId = this.currentPlayerId;
        const item = this.syncItemMap.get(syncKey);
        if (!item) {
            Log4Ts.error(SceneDragonModuleS,
                `item not exist in server when catch.`,
                `syncKey: ${syncKey} `);
            return Promise.resolve(false);
        }
        Log4Ts.log(SceneDragonModuleS,
            `try catch item.`,
            `playerId: ${currPlayerId}`,
            `syncKey: ${syncKey}`,
            `${item.info()}`);
        if (!this._bagModuleS.hasDragonBall(currPlayerId)) {
            Log4Ts.warn(SceneDragonModuleS, `dragon ball is not enough.`);
            return Promise.resolve(false);
        }
        if (this._syncLocker.get(syncKey) !== null) {
            Log4Ts.log(SceneDragonModuleS, `item already locked.`);
            return Promise.resolve(false);
        }

        this._bagModuleS.addItem(currPlayerId, GameServiceConfig.DRAGON_BALL_BAG_ID, -1);
        const success: boolean = GToolkit.randomWeight([SceneDragon.successRateAlgo(item.id)()], 1) === 0;
        if (!success) {
            Log4Ts.log(SceneDragonModuleC, `catch fail. failed the success rate check.`);
            return Promise.resolve(false);
        } else {
            Log4Ts.log(SceneDragonModuleS, `item locked.`);
            this._syncLocker.set(syncKey, currPlayerId);
            return Promise.resolve(true);
        }
    }

    @noReply()
    public net_acceptCatch(syncKey: string) {
        const currPlayerId = this.currentPlayerId;
        const item = this.syncItemMap.get(syncKey);
        if (!item) {
            Log4Ts.error(SceneDragonModuleS,
                `item not exist in server when catch.`,
                `syncKey: ${syncKey} `);
            return;
        }
        Log4Ts.log(SceneDragonModuleS,
            `accept catch item.`,
            `syncKey: ${syncKey}`,
            `${item.info()}`);
        if (this._syncLocker.get(syncKey) !== currPlayerId) {
            Log4Ts.log(SceneDragonModuleS,
                `item locker illegal.`,
                `current locker: ${this._syncLocker.get(syncKey)}.`,
                `request locker: ${syncKey}`);
            return;
        }
        this._syncLocker.delete(syncKey);

        item.catch();
        this._bagModuleS.addItem(currPlayerId, item.getBagConfig().id, 1);
        if (!item.isCatchable) {
            this.destroy(currPlayerId, syncKey);
        }
        return;
    }

    @noReply()
    public net_destroy(syncKey: string) {
        const item = this.syncItemMap.get(syncKey);
        if (!item) {
            Log4Ts.error(SceneDragonModuleS, `;
        item;
        not;
        exist in server;
        when;
        destroy.syncKey;
    : ${syncKey}
        `);
            return;
        }
        Log4Ts.log(SceneDragonModuleS, `;
        try
        destroy;
        item.$;
        {
            item.info();
        }
        `);
        this.destroy(this.currentPlayerId, syncKey);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}