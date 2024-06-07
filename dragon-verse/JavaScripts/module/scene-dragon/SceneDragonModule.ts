import Enumerable from "linq";
import UUID from "pure-uuid";
import { EventDefine } from "../../const/EventDefine";
import ForeignKeyIndexer, { BagTypes } from "../../const/ForeignKeyIndexer";
import GameServiceConfig from "../../const/GameServiceConfig";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import GToolkit, { Expression, RandomGenerator, Regulator } from "../../util/GToolkit";
import { BagModuleS } from "../bag/BagModule";
import SceneDragon from "./SceneDragon";
import SceneDragonBehavior from "./SceneDragonBehavior";
import GameObject = mw.GameObject;
import noReply = mwext.Decorator.noReply;
import i18n from "../../language/i18n";
import UnifiedRoleController from "../role/UnifiedRoleController";
import Waterween from "../../depend/waterween/Waterween";
import Easing from "../../depend/easing/Easing";
import EffectService = mw.EffectService;
import { ThrowDragonBall } from "../../gameplay/archtype/action/ThrowDragonBall";
import GlobalTips from "../../depend/global-tips/GlobalTips";
import AreaManager from "../../depend/area/AreaManager";
import { GameConfig } from "../../config/GameConfig";
import Gtk from "../../util/GToolkit";
import { IPoint3 } from "../../depend/area/shape/base/IPoint";
import { AddGMCommand } from "module_gm";
import { AuthModuleS } from "../auth/AuthModule";
import { addGMCommand } from "mw-god-mod";

AddGMCommand(
    "生成 场景龙",
    undefined,
    (player, value: string) => {
        let id = Gtk.isNullOrEmpty(value) ? undefined : Number(value);
        if (isNaN(id)) id = undefined;

        ModuleService.getModule(SceneDragonModuleS)["generate"](
            player.playerId,
            id ?? Gtk.randomArrayItem(GameConfig.Dragon.getAllElement()).id,
            0,
            player.character.worldTransform.position.add(
                new RandomGenerator()
                    .randomCircle()
                    .handle((v) => v * 200)
                    .toVector3(500)
            ),
            new UUID(4).toString()
        );
    },
    "Spawn"
);
AddGMCommand(
    "销毁 场景龙",
    undefined,
    (player, syncKey: string) => {
        let id = Number(syncKey);
        if (isNaN(id)) id = undefined;
        ModuleService.getModule(SceneDragonModuleS)["destroy"](player.playerId, syncKey, false);
    },
    "Spawn"
);

addGMCommand(
    "生成 场景龙",
    "string",
    undefined,
    (player, value: string) => {
        let id = Gtk.isNullOrEmpty(value) ? undefined : Number(value);
        if (isNaN(id)) id = undefined;

        ModuleService.getModule(SceneDragonModuleS)["generate"](
            player.playerId,
            id ?? Gtk.randomArrayItem(GameConfig.Dragon.getAllElement()).id,
            0,
            player.character.worldTransform.position.add(
                new RandomGenerator()
                    .randomCircle()
                    .handle((v) => v * 200)
                    .toVector3(500)
            ),
            new UUID(4).toString()
        );
    },
    undefined,
    "Spawn"
);

addGMCommand(
    "销毁 场景龙",
    "string",
    undefined,
    (player, syncKey: string) => {
        let id = Number(syncKey);
        if (isNaN(id)) id = undefined;
        ModuleService.getModule(SceneDragonModuleS)["destroy"](player.playerId, syncKey, false);
    },
    undefined,
    "Spawn"
);

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
    public static async sceneDragonPrefabFactory(syncKey: string, item: SceneDragon): Promise<SceneDragonExistInfo> {
        if (!item.location) {
            Log4Ts.error(SceneDragonModuleC, `generate item param location invalid.`);
            return Promise.resolve(null);
        }
        const dragonInfo = item.getConfig();
        let assetId = dragonInfo.avatar;
        if (GToolkit.isNullOrEmpty(assetId)) {
            Log4Ts.error(SceneDragonModuleC, `avatar not set. id: ${item.id}`);
            return Promise.resolve(null);
        }

        const createSceneDragonExistInfo = async () => {
            EffectService.playAtPosition(GameServiceConfig.SCENE_DRAGON_BIRTH_EXPLODE_EFFECT_ID, item.location);
            const obj: Character = await mw.GameObject.asyncSpawn("Character");
            GToolkit.safeSetDescription(obj, assetId);

            const behavior = await mw.Script.spawnScript(SceneDragonBehavior, false);

            behavior.gameObject = obj;
            behavior.init(syncKey, item);
            obj.worldTransform.position = item.location;
            obj.addMovement(mw.Vector.forward);
            obj.tag = "SceneDragon";

            //添加翅膀
            let wingGuid = dragonInfo.wingGuid;
            let wingTransform = dragonInfo.wingTransform;
            if (wingGuid && wingTransform) {
                const wing = await mw.GameObject.asyncSpawn(wingGuid);
                behavior.wingEffect = wing as Effect;
                let transform = new Transform(
                    new Vector(wingTransform[0][0], wingTransform[0][1], wingTransform[0][2]),
                    new Rotation(wingTransform[1][0], wingTransform[1][1], wingTransform[1][2]),
                    new Vector(wingTransform[2][0], wingTransform[2][1], wingTransform[2][2])
                );
                obj.attachToSlot(wing, HumanoidSlotType.BackOrnamental);
                TimeUtil.delayExecute(() => {
                    (wing as Effect).play();
                    wing.localTransform = transform;
                }, 10);
            }

            return Promise.resolve(new SceneDragonExistInfo(behavior, obj));
        };

        const existInfo = await this.playBirthEffect(item.location, createSceneDragonExistInfo);
        return Promise.resolve(existInfo);
    }

    private static async playBirthEffect(
        position: Vector,
        onBirth: Expression<Promise<SceneDragonExistInfo>>
    ): Promise<SceneDragonExistInfo> {
        const effect = await EffectService.getEffectById(
            EffectService.playAtPosition(GameServiceConfig.SCENE_DRAGON_BIRTH_LIGHT_EFFECT_ID, position, {
                scale: GameServiceConfig.SCENE_DRAGON_BIRTH_EFFECT_START_SCALE,
                loopCount: 0,
            })
        );

        if (!effect) {
            Log4Ts.warn(SceneDragonModuleC, `effect is invalid. generate directly.`);
            return Promise.resolve(onBirth());
        }

        return await new Promise((resolve) => {
            const task = Waterween.group(
                () => effect.worldTransform.scale,
                (val) => (effect.worldTransform.scale = new Vector(val.x, val.y, val.z)),
                [
                    {
                        dist: GameServiceConfig.SCENE_DRAGON_BIRTH_EFFECT_STAGE_1_SCALE,
                        duration: GameServiceConfig.SCENE_DRAGON_BIRTH_EFFECT_DURATION_1,
                        onDone: (param) => {
                            if (!param) resolve(onBirth());
                        },
                    },
                    { duration: GameServiceConfig.SCENE_DRAGON_BIRTH_EFFECT_DURATION_2 },
                    {
                        dist: GameServiceConfig.SCENE_DRAGON_BIRTH_EFFECT_STAGE_3_SCALE,
                        duration: GameServiceConfig.SCENE_DRAGON_BIRTH_EFFECT_DURATION_3,
                    },
                    {
                        dist: GameServiceConfig.SCENE_DRAGON_BIRTH_EFFECT_START_SCALE,
                        duration: GameServiceConfig.SCENE_DRAGON_BIRTH_EFFECT_DURATION_3,
                        onDone: (param) => {
                            if (!param) effect.stop();
                        },
                    },
                ],
                GameServiceConfig.SCENE_DRAGON_BIRTH_EFFECT_START_SCALE,
                Easing.linear
            ).autoDestroy();
            task.continue();
        });
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

    private _lastTryCatchTime: number = null;

    private _candidate: string = null;

    private _character: Character;

    private get character() {
        if (!this._character) {
            this._character = Player.localPlayer.character;
        }
        return this._character;
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
        this._eventListeners.forEach((value) => value.disconnect());
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Method
    public lock() {
        Log4Ts.log(SceneDragonModuleC, `try lock on item. candidate syncKey: ${this._candidate}`);
        if (
            this._lastTryCatchTime &&
            Date.now() - this._lastTryCatchTime < GameServiceConfig.SCENE_DRAGON_CATCH_PROGRESS_DURATION
        )
            return;

        if (this._lockingSyncKey === this._candidate) {
            if (this._candidate) {
                this.clearTimeOutForAutoCatch();
                this.setTimeOutForAutoCatch();
            } else {
                this.unlockWithView();
            }
        } else {
            if (this._lockingSyncKey) {
                Log4Ts.log(
                    SceneDragonModuleC,
                    `already lock on another SceneDragon. origin syncKey: ${this._lockingSyncKey}`
                );
                if (this.syncItemMap.has(this._lockingSyncKey)) {
                    this.syncItemMap.get(this._lockingSyncKey).behavior.state.isFear = false;
                }
                this.unlockWithView();
            } else {
                Player.localPlayer.getPlayerState(UnifiedRoleController)?.addMoveForbiddenBuff();
            }

            if (this._candidate) {
                const item = this.syncItemMap.get(this._candidate);
                if (!item) {
                    Log4Ts.warn(SceneDragonModuleC, `lock item not exist in client.`);
                } else {
                    Log4Ts.log(SceneDragonModuleC, `lock on SceneDragon. syncKey: ${this._candidate}`);
                    item.behavior.state.isFear = true;
                    this.playLockViewToCandidateAnim();
                    this.lockWithView(this._candidate);
                    this.setTimeOutForAutoCatch();
                }
            }
        }
    }

    /**
     * 尝试捕捉.
     */
    public tryCatch() {
        const now = Date.now();
        if (
            this._lastTryCatchTime &&
            now - this._lastTryCatchTime < GameServiceConfig.SCENE_DRAGON_CATCH_PROGRESS_DURATION
        )
            return;

        //#region Check
        const syncKey = this._lockingSyncKey;
        if (GToolkit.isNullOrEmpty(syncKey)) {
            GlobalTips.getInstance().showGlobalTips(i18n.lan(i18n.lanKeys.NonCandidateSceneDragon));
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
        //#endregion

        this.clearTimeOutForAutoCatch();
        this._lastTryCatchTime = now;
        this._currentCatchResultSyncKey = null;

        //#region Throw Behavior
        Player.localPlayer.getPlayerState(UnifiedRoleController)?.playerPlayThrow();
        try {
            this._currentBall = new ThrowDragonBall(
                this.character,
                item.object.worldTransform.position.clone(),
                GameServiceConfig.SCENE_DRAGON_CATCH_PROGRESS_DURATION
            );
        } catch (e) {
            Log4Ts.error(SceneDragonModuleC, `prefab of dragon ball not set.`);
        }
        this._currentBall?.do();
        //#endregion

        this.server.net_tryCatch(syncKey, now).then((value) => {
            if (value) this._currentCatchResultSyncKey = syncKey;
        });
    }

    /**
     * 接受捕捉.
     */
    public acceptResult() {
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
            EffectService.playAtPosition(GameServiceConfig.SMOKE_EFFECT_ID, item.object.worldTransform.position, {
                loopCount: 1,
            });
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

        SceneDragonModuleC.sceneDragonPrefabFactory(syncKey, item).then((value) => {
            if (!value) return;

            this.syncItemMap.set(syncKey, value);
        });
    }

    private destroy(syncKey: string, natural: boolean = true) {
        Log4Ts.log(
            SceneDragonModuleC,
            `try destroy item. ${this.syncItemMap.get(syncKey).behavior.data.info() ?? "?null"}`
        );
        const item = this.syncItemMap.get(syncKey);
        if (!item) {
            Log4Ts.warn(SceneDragonModuleC, `item not exist in client when destroy. syncKey: ${syncKey}`);
            return;
        }
        if (natural) {
            item.behavior.death();
        } else {
            item.behavior.catch();
        }
        this.syncItemMap.delete(syncKey);
    }

    private lockWithView(candidate: string) {
        this._lockingSyncKey = candidate;
        Event.dispatchToLocal(EventDefine.DragonOnLock, { syncKey: this._lockingSyncKey } as DragonSyncKeyEventArgs);
    }

    private unlockWithView() {
        this._lockingSyncKey = null;
        this.clearTimeOutForAutoCatch();
        Event.dispatchToLocal(EventDefine.DragonOnUnlock, { syncKey: this._lockingSyncKey } as DragonSyncKeyEventArgs);
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

        let candidate: string =
            Enumerable.from(Array.from(this.syncItemMap.entries()))
                .where((item) => {
                    const itemPosition = item[1].object.worldTransform.position;
                    return (
                        itemPosition.x - charPosition.x < sceneDragonCatchableDistance &&
                        itemPosition.y - charPosition.y < sceneDragonCatchableDistance &&
                        itemPosition.z - charPosition.z < sceneDragonCatchableDistance
                    );
                })
                .select((item) => {
                    const itemPosition = item[1].object.worldTransform.position;
                    return {
                        syncKey: item[0],
                        existInfo: item[1],
                        distSqr: GToolkit.squaredEuclideanDistance(
                            [itemPosition.x, itemPosition.y, itemPosition.z],
                            [charPosition.x, charPosition.y, charPosition.z]
                        ),
                    };
                })
                .where((item) => item.distSqr < sceneDragonCatchableDistanceSqr)
                .defaultIfEmpty({ syncKey: null, existInfo: null, distSqr: 0 })
                .minBy((item) => item.distSqr).syncKey ?? null;

        if (this._candidate !== candidate) {
            this.syncItemMap.get(this._candidate)?.behavior.unElected();
            Event.dispatchToLocal(EventDefine.DragonOnCandidateChange, {
                syncKey: candidate,
            } as DragonSyncKeyEventArgs);
            this._candidate = candidate;
        }
    }

    private setTimeOutForAutoCatch() {
        this._lockTimerId = setTimeout(
            () => this.acceptResult(),
            GameServiceConfig.SCENE_DRAGON_MAX_PREPARE_CATCH_DURATION
        );
    }

    private clearTimeOutForAutoCatch() {
        if (this._lockTimerId) {
            clearTimeout(this._lockTimerId);
            this._lockTimerId = null;
        }
    }

    private playLockViewToCandidateAnim() {
        const position = this.syncItemMap.get(this._candidate).object.worldTransform.position.clone();
        Player.localPlayer.getPlayerState(UnifiedRoleController)?.lookAt(position);
        Waterween.to(
            () => this.character.worldTransform.rotation.toQuaternion(),
            (val) => (this.character.worldTransform.rotation = val.toRotation()),
            Quaternion.fromRotation(
                Rotation.fromVector(GToolkit.newWithZ(position.subtract(this.character.worldTransform.position), 0))
            ),
            0.5e3,
            undefined,
            Easing.easeInOutSine,
            Quaternion.slerp
        ).autoDestroy();
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    public net_generate(syncKey: string, id: number, hitPoint: number, generateTime: number, location: Vector) {
        this.generate(syncKey, new SceneDragon().sync(id, hitPoint, generateTime, location));
    }

    public net_destroy(syncKey: string, natural: boolean = true) {
        this.destroy(syncKey, natural);
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
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class SceneDragonModuleS extends ModuleS<SceneDragonModuleC, SceneDragonModuleData> {
    //#region Constant
    private static readonly GENERATION_HOLDER_TAG = "scene-dragon-points";
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Member
    private _authModuleS: AuthModuleS;

    private get authModuleS(): AuthModuleS | null {
        if (!this._authModuleS) this._authModuleS = ModuleService.getModule(AuthModuleS);
        return this._authModuleS;
    }

    private _bagModuleS: BagModuleS;

    private get bagModuleS(): BagModuleS | null {
        if (!this._bagModuleS) this._bagModuleS = ModuleService.getModule(BagModuleS);
        return this._bagModuleS;
    }

    private _areaManager: AreaManager;

    private get aM() {
        if (!this._areaManager) {
            this._areaManager = AreaManager.getInstance();
        }
        return this._areaManager;
    }

    /**
     * 私有玩家场景龙存在映射.
     *  - key 玩家 PlayerId.
     *  - value 该玩家现存所有场景龙映射.
     *      - key habitat id
     *      - value syncKeys
     */
    public existenceItemMap: Map<number, Map<number, string[]>> = new Map();

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
    }

    protected onDestroy(): void {
        super.onDestroy();
        //#region Event Unsubscribe
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
     * 移除私有记录.
     * @param playerId
     */
    private removePrivateRecord(playerId: number): void {
        Enumerable.from(this.existenceItemMap.get(playerId)?.values())
            .selectMany((arr) => arr)
            .forEach((key) => {
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
        this.existenceItemMap.set(playerId, new Map());
    }

    /**
     * 栖居地生成场景龙.
     * @param {number} habitatId
     * @param {number} playerId
     */
    public habitatGenerate(habitatId: number, playerId: number) {
        const record = this.existenceItemMap.get(playerId);
        if (!record) {
            Log4Ts.error(SceneDragonModuleS, `player record not exist in server. playerId: ${playerId}`);
            return;
        }

        const habitat = GameConfig.Scene.getElement(habitatId);
        if (!habitat) {
            Log4Ts.error(SceneDragonModuleS, `habitat not exist. habitatId: ${habitatId}`);
            return;
        }

        let generateCount = habitat.capacity - (record.get(habitatId)?.length ?? 0);
        if (generateCount <= 0) {
            Log4Ts.warn(SceneDragonModuleS, `habitat is full. habitatId: ${habitatId}`);
            return;
        }

        let candidateDragonTypes = ForeignKeyIndexer.getInstance().queryDragonOfHabitat(habitatId);

        let candidate: number[] = [];
        while (generateCount > 0) {
            candidate.push(Gtk.randomArrayItem(candidateDragonTypes));
            --generateCount;
        }

        let candidatePoints = Gtk.randomShuffleArray(
            Enumerable.from(habitat.areaIds)
                .selectMany((areaId) => this.aM.getAreaPointSet(areaId))
                .toArray()
        );

        let i = 0;
        for (; i < candidate.length && i < candidatePoints.length; ++i) {
            let dragonId = candidate[i];
            let birthPoint = candidatePoints[i];
            this.generate(playerId, dragonId, habitatId, birthPoint, new UUID(4).toString());
        }

        if (i < candidate.length) Log4Ts.log(SceneDragonModuleS, `candidate dragon is more than birth point.`);
    }

    /**
     * 栖居地销毁场景龙.
     * @param {number} habitatId
     * @param {number} playerId
     */
    public habitatDestroy(habitatId: number, playerId: number) {
        const record = this.existenceItemMap.get(playerId);
        if (!record) {
            Log4Ts.error(SceneDragonModuleS, `player record not exist in server. playerId: ${playerId}`);
            return;
        }

        let dragonSyncKeys = record.get(habitatId);
        if (Gtk.isNullOrEmpty(dragonSyncKeys)) {
            Log4Ts.log(SceneDragonModuleS, `there is not dragon in habitat. habitatId: ${habitatId}`);
            return;
        }

        for (const syncKey of dragonSyncKeys) {
            this.destroy(playerId, syncKey, false);
        }
    }

    /**
     * 生成场景龙.
     * @desc 场景龙是私有的 场景龙的存在依赖 playerId 属性.
     * @param playerId
     * @param itemId
     * @param habitat
     * @param location 生成位置.
     * @param syncKey 同步键.
     */
    private generate(
        playerId: number,
        itemId: number,
        habitat: number,
        location: IPoint3,
        syncKey: string
    ): SceneDragon {
        Log4Ts.log(SceneDragonModuleS, `try generate item, itemId: ${itemId}.`);

        let config = GameConfig.Dragon.getElement(itemId);
        if (!config) {
            Log4Ts.error(SceneDragonModuleS, `item config not exist. itemId: ${itemId}`);
            return;
        }

        const item = new SceneDragon();
        item.generate(itemId, new Vector(location.x, location.y, location.z));

        Log4Ts.log(SceneDragonModuleS, `generate item success. syncKey: ${syncKey}`);
        Gtk.tryGet(this.existenceItemMap.get(playerId), habitat, Array).push(syncKey);
        this.syncItemMap.set(syncKey, item);
        this._syncLocker.set(syncKey, null);
        this.getClient(playerId).net_generate(syncKey, item.id, item.hitPoint, item.generateTime, item.location);
    }

    /**
     * 销毁场景龙.
     * @param playerId
     * @param syncKey
     * @param natural 是否 因玩家退出栖居地销毁.
     * @private
     */
    private destroy(playerId: number, syncKey: string, natural: boolean = true) {
        const item = this.syncItemMap.get(syncKey);
        if (!item) {
            Log4Ts.error(SceneDragonModuleS, `destroy item is null`);
            return;
        }

        let record = this.existenceItemMap.get(playerId);
        if (!record) {
            Log4Ts.error(SceneDragonModuleS, `player record not exist in server. playerId: ${playerId}`);
            return;
        }
        let removed = false;
        for (const habitatDragon of record.values()) {
            if (GToolkit.remove(habitatDragon, syncKey)) {
                removed = true;
            }
        }
        if (!removed) {
            Log4Ts.log(
                SceneDragonModuleS,
                `destroy Collectible Item; ${item.id} whose generate time is ${item.generateTime},but it not exist in server`
            );
        }

        item.destroy();
        Log4Ts.log(SceneDragonModuleS, `destroy item success.syncKey : ${syncKey}`);

        this.syncItemMap.delete(syncKey);
        this._syncLocker.delete(syncKey);
        this.getClient(playerId).net_destroy(syncKey, natural);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    public async net_tryCatch(syncKey: string, catchTime: number): Promise<boolean> {
        const currPlayerId = this.currentPlayerId;
        const item = this.syncItemMap.get(syncKey);
        if (!item) {
            Log4Ts.error(SceneDragonModuleS, `item not exist in server when catch.`, `syncKey: ${syncKey} `);
            return Promise.resolve(false);
        }
        Log4Ts.log(
            SceneDragonModuleS,
            `try catch item.`,
            `playerId: ${currPlayerId}`,
            `syncKey: ${syncKey}`,
            `${item.info()}`
        );
        if (!(this.bagModuleS?.hasDragonBall(currPlayerId) ?? false)) {
            Log4Ts.warn(SceneDragonModuleS, `dragon ball is not enough.`);
            return Promise.resolve(false);
        }
        if (this._syncLocker.get(syncKey) !== null) {
            Log4Ts.log(SceneDragonModuleS, `item already locked.`);
            return Promise.resolve(false);
        }

        const randomSuccess: boolean = GToolkit.randomWeight([SceneDragon.successRateAlgo(item.id)()], 1) === 0;
        if (!randomSuccess) {
            Log4Ts.log(SceneDragonModuleC, `catch fail. failed the success rate check.`);
            return Promise.resolve(false);
        }

        Log4Ts.log(SceneDragonModuleS, `request catch scene dragon in p12...`);

        const [result, currentCount] = await this.authModuleS.requestWebCatchDragon(
            currPlayerId,
            item.getConfig().dragonPalId,
            catchTime
        );

        if (result && !Gtk.isNullOrUndefined(currentCount?.unUsed))
            this.bagModuleS?.setItem(currPlayerId, GameServiceConfig.DRAGON_BALL_BAG_ID, currentCount?.unUsed ?? 0);

        if (result) {
            Log4Ts.log(SceneDragonModuleS, `catch success. item locked.`);
            this._syncLocker.set(syncKey, currPlayerId);
            return Promise.resolve(true);
        } else {
            Log4Ts.log(SceneDragonModuleC, `catch fail. failed the web request.`);
            return Promise.resolve(false);
        }
    }

    @noReply()
    public net_acceptCatch(syncKey: string) {
        const currPlayerId = this.currentPlayerId;
        const item = this.syncItemMap.get(syncKey);
        if (!item) {
            Log4Ts.error(SceneDragonModuleS, `item not exist in server when catch.`, `syncKey: ${syncKey} `);
            return;
        }
        Log4Ts.log(SceneDragonModuleS, `accept catch item.`, `syncKey: ${syncKey}`, `${item.info()}`);
        if (this._syncLocker.get(syncKey) !== currPlayerId) {
            Log4Ts.log(
                SceneDragonModuleS,
                `item locker illegal.`,
                `current locker: ${this._syncLocker.get(syncKey)}.`,
                `request locker: ${syncKey}`
            );
            return;
        }
        this._syncLocker.delete(syncKey);

        item.catch();
        this.bagModuleS?.addItem(currPlayerId, item.getBagConfig().id, 1);
        if (!item.isCatchable) {
            this.destroy(currPlayerId, syncKey, false);
        }
        return;
    }

    @noReply()
    public net_destroy(syncKey: string, natural: boolean = true) {
        const item = this.syncItemMap.get(syncKey);
        if (!item) {
            Log4Ts.error(SceneDragonModuleS, `item not exist in server when destroy.syncKey: ${syncKey}`);
            return;
        }
        Log4Ts.log(SceneDragonModuleS, `try destroy item.${item.info()}`);
        this.destroy(this.currentPlayerId, syncKey, natural);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}
