import {EventDefine} from "../../const/EventDefine";
import GameServiceConfig from "../../const/GameServiceConfig";
import {HeadUIController, HeadUIType} from "../../controller/HeadUIController";
import FiniteStateMachine, {Region, State} from "../../depend/finite-state-machine/FiniteStateMachine";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import {Yoact} from "../../depend/yoact/Yoact";
import i18n from "../../language/i18n";
import SceneDragon from "./SceneDragon";
import {DragonSyncKeyEventArgs} from "./SceneDragonModule";
import Character = mw.Character;
import createYoact = Yoact.createYoact;
import bindYoact = Yoact.bindYoact;
import EffectService = mw.EffectService;
import Effect = Yoact.Effect;
import stopEffect = Yoact.stopEffect;
import Animation = mw.Animation;
import Navigation = mw.Navigation;
import GameObject = mw.GameObject;
import GToolkit, {Regulator} from "gtoolkit";

class SceneDragonBehaviorState {
    //#region Constant
    /**
     * 闲置体力恢复速率. /s
     */
    public static readonly IDLE_STAMINA_RECOVERY = 10;

    /**
     * 闲置时 活跃体力恢复速率. /s
     */
    public static readonly ACTIVE_STAMINA_RECOVERY_IN_IDLE = 10;

    /**
     * 奔跑时 活跃体力恢复速率. /s
     */
    public static readonly ACTIVE_STAMINA_RECOVERY_IN_RUNNING = -10;

    /**
     * 行走时 活跃体力恢复速率. /s
     */
    public static readonly ACTIVE_STAMINA_RECOVERY_IN_WALKING = 5;

    /**
     * 坐立难安 中彩率.
     * @desc 当坐立难安时 {@link ACTIVE_STAMINA_RECOVERY_IN_WALKING} 作为正数使用.
     * @desc 否则 {@link ACTIVE_STAMINA_RECOVERY_IN_WALKING} 作为负数使用.
     */
    public static readonly RESTLESS_RATIO = 0.5;

    /**
     * 大笑体力恢复速率. /s
     */
    public static readonly LAUGH_STAMINA_RECOVERY = -100;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    /**
     * 闲置体力.
     * @desc 随时间回复.
     * @desc 决定待机动作.
     */
    public idleStamina: number;

    /**
     * 活跃体力.
     * @desc 随时间回复.
     * @desc 决定活跃动作.
     */
    public activeStamina: number;

    /**
     * 是否 恐惧.
     */
    public isFear: boolean = false;

    /**
     * 是否 存活.
     */
    public alive: boolean = true;

    /**
     * 是否 好动的.
     */
    public restless: boolean = false;

    /**
     * 大笑体力.
     */
    public laughStamina: number = 0;

    /**
     * 寻路目的地.
     */
    public destination: Vector = null;

    /**
     * 死亡动画已等待时间.
     */
    public deathAnimWait: number = 0;

    /**
     * 是否 自然死亡.
     */
    public naturalDeath: boolean = true;

    constructor(idleStamina: number = 0, activeStamina: number = 0) {
        this.idleStamina = idleStamina;
        this.activeStamina = activeStamina;
    }
}

enum SceneDragonStates {
    /**
     * 原地呼吸.
     */
    IdleWait = "idle wait",
    /**
     * 休闲动作.
     */
    IdleMotion = "idle motion",
    /**
     * 行走.
     */
    Walk = "walk",
    /**
     * 奔跑.
     */
    Run = "run",
    /**
     * 害怕.
     */
    Fear = "fear",
    /**
     * 大笑.
     */
    Laugh = "laugh",
    /**
     * 死亡.
     */
    Death = "death"
}

@Component
export default class SceneDragonBehavior extends mw.Script {

    //#region Member
    private _eventListeners: EventListener[] = [];

    public data: SceneDragon;

    public syncKey: string;

    private regulator: Regulator = new Regulator(GameServiceConfig.SCENE_DRAGON_ALIVE_CHECK_INTERVAL);

    private _character: Character;

    private _electEffectId: number = null;

    private _fearEffectId: number = null;

    private _isElected: boolean;

    private _fearAnim: Animation;

    private _laughAnim: Animation;

    private _deathStance: Stance;

    private _gameObject: GameObject;

    public wingEffect: mw.Effect;

    public get gameObject(): mw.GameObject {
        return this._gameObject;
    }

    public set gameObject(value: mw.GameObject) {
        super.gameObject = value;
        this._gameObject = value;
    }

    private get localCharacter() {
        if (!this._character) {
            this._character = Player.localPlayer.character;
        }
        return this._character;
    }

    public state: SceneDragonBehaviorState = createYoact(new SceneDragonBehaviorState());

    private _machine: FiniteStateMachine<unknown>;

    private _machineEffect: Effect;

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onStart(): void {
        super.onStart();
        if (SystemUtil.isServer()) {
            Log4Ts.log(SceneDragonBehavior, `SceneDragonBehavior is running on server, please check!`);
            return;
        }
        this.useUpdate = true;

        const asCharacter = this.gameObject as Character;
        if (asCharacter) {
            this._fearAnim = asCharacter.loadAnimation(GameServiceConfig.SCENE_DRAGON_FEAR_ANIM_ID);
            this._fearAnim.loop = 0;
            this._laughAnim = asCharacter.loadAnimation(GameServiceConfig.SCENE_DRAGON_LAUGH_ANIM_ID);
            this._laughAnim.loop = 2;
            this._deathStance = asCharacter.loadStance(GameServiceConfig.SCENE_DRAGON_DEATH_STANCE_ID);
        }

        HeadUIController.getInstance()
            .registerHeadUI(
                this.gameObject,
                HeadUIType.NPC,
                i18n.lan(SceneDragon.nameStr(this.data.id)),
                new mw.Vector(0, 0, GameServiceConfig.HEAD_UI_HEIGHT));

        //#region Member init
        this._eventListeners.push(Event.addLocalListener(EventDefine.DragonOnCandidateChange, (eventArgs) => {
            const eventArg = eventArgs as DragonSyncKeyEventArgs;
            if (this.syncKey === eventArg.syncKey) this.elected();
        }));
        //#endregion ------------------------------------------------------------------------------------------

        //#region Widget bind
        //#endregion ------------------------------------------------------------------------------------------

        //#region Event Subscribe
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);

        this._machine?.update(dt);
        this.state.idleStamina += dt * SceneDragonBehaviorState.IDLE_STAMINA_RECOVERY;
    }

    protected onDestroy(): void {
        super.onDestroy();
        //#region Event Unsubscribe
        this._eventListeners.forEach(value => value.disconnect());
        //#endregion ------------------------------------------------------------------------------------------
        //有翅膀的话销毁
        if (this.wingEffect) this.wingEffect.destroy();
        stopEffect(this._machineEffect);
        HeadUIController.getInstance().unregisterHeadUI(this.gameObject);
        this.gameObject?.destroy();
    }

    //#endregion

    //#region Init
    public init(syncKey: string, data: SceneDragon) {
        this.syncKey = syncKey;
        this.data = data;

        this.initStateMachine();
    }

    private initStateMachine() {
        const idleWait = new State<SceneDragonBehaviorState>(SceneDragonStates.IdleWait)
            .aE(() => {
                Log4Ts.log(SceneDragonBehavior,
                    `enter ${idleWait.name} state.`,
                    `key: ${this.syncKey}.`);
                if (this.state.destination) {
                    this.state.destination = null;
                    Navigation.stopNavigateTo(this.gameObject);
                }
            })
            .aU((dt) => this.state.activeStamina += dt * SceneDragonBehaviorState.ACTIVE_STAMINA_RECOVERY_IN_IDLE);
        const idleMotion = new State<SceneDragonBehaviorState>(SceneDragonStates.IdleMotion)
            .aE(() => {
                Log4Ts.log(SceneDragonBehavior,
                    `enter ${idleMotion.name} state.`,
                    `key: ${this.syncKey}.`);
                if (this.state.destination) {
                    this.state.destination = null;
                    Navigation.stopNavigateTo(this.gameObject);
                }
                setTimeout(
                    () => this.state.idleStamina -= 100,
                    1e3,
                );
            });
        const walk = new State<SceneDragonBehaviorState>(SceneDragonStates.Walk)
            .aE(() => {
                Log4Ts.log(SceneDragonBehavior,
                    `enter ${walk.name} state.`,
                    `key: ${this.syncKey}.`);
                (this.gameObject as Character).maxWalkSpeed = SceneDragon.WALK_SPEED;
                this.state.restless = Math.random() < SceneDragonBehaviorState.RESTLESS_RATIO;
            })
            .aU((dt) => {
                this.tryMoveRandom();
                this.state.activeStamina +=
                    dt
                    * (this.state.restless ? 1 : -1)
                    * (SceneDragonBehaviorState.ACTIVE_STAMINA_RECOVERY_IN_WALKING);
            })
            .aEx(() => this.pauseMove());
        const run = new State<SceneDragonBehaviorState>(SceneDragonStates.Run)
            .aE(() => {
                Log4Ts.log(SceneDragonBehavior,
                    `enter ${run.name} state.`,
                    `key: ${this.syncKey}.`);
                (this.gameObject as Character).maxWalkSpeed = SceneDragon.RUN_SPEED;
                this.state.restless = false;
            })
            .aU((dt) => {
                this.tryMoveRandom();
                this.state.activeStamina += dt * SceneDragonBehaviorState.ACTIVE_STAMINA_RECOVERY_IN_RUNNING;
            })
            .aEx(() => this.pauseMove());
        const fear = new State<SceneDragonBehaviorState>(SceneDragonStates.Fear)
            .aE(() => {
                Log4Ts.log(SceneDragonBehavior,
                    `enter ${fear.name} state.`,
                    `key: ${this.syncKey}.`);
                this.fear(true);
            })
            .aEx(() => this.fear(false));
        const laugh = new State<SceneDragonBehaviorState>(SceneDragonStates.Laugh)
            .aE(() => {
                Log4Ts.log(SceneDragonBehavior,
                    `enter ${laugh.name} state.`,
                    `key: ${this.syncKey}.`);
                this.state.laughStamina = 100;
                this.laugh(true);
            })
            .aU(dt =>
                this.state.laughStamina += dt * SceneDragonBehaviorState.LAUGH_STAMINA_RECOVERY)
            .aEx(() => this.laugh(false));
        const death = new State<SceneDragonBehaviorState>(SceneDragonStates.Death)
            .aE(() => {
                Log4Ts.log(SceneDragonBehavior,
                    `enter ${death.name} state.`,
                    `key: ${this.syncKey}.`);

                if (!this.state.naturalDeath) {
                    this.destroy();
                    return;
                }
                const obj = this.gameObject;
                if (!obj) {
                    this.destroy();
                    return;
                }

                this.state.deathAnimWait = 0;
                this._deathStance.play();
                EffectService.playAtPosition(
                    GameServiceConfig.SCENE_DRAGON_DEATH_WAIT_LIGHT_EFFECT_ID,
                    GToolkit.detectGameObjectVerticalTerrain(obj, undefined, undefined, !GameServiceConfig.isRelease)?.position
                    ?? obj.worldTransform.position.clone()
                        .add(GameServiceConfig.SCENE_DRAGON_DEATH_WAIT_LIGHT_EFFECT_LOCATION_OFFSET),
                    {
                        duration: GameServiceConfig.SCENE_DRAGON_DEATH_EFFECT_DURATION,
                    });
            })
            .aU((dt) => {
                this.state.deathAnimWait += dt;
                const obj = this.gameObject;
                if (!obj) {
                    this.destroy();
                    return;
                }
                obj.worldTransform.position = GToolkit.newWithZ(
                    obj.worldTransform.position,
                    obj.worldTransform.position.z + GameServiceConfig.SCENE_DRAGON_DEATH_FLOAT_SPEED * dt,
                );
                if (this.state.deathAnimWait > GameServiceConfig.SCENE_DRAGON_DEATH_EFFECT_DURATION) {
                    EffectService.playAtPosition(
                        GameServiceConfig.SCENE_DRAGON_DEATH_DESTROY_LIGHT_EFFECT_ID,
                        GToolkit.detectGameObjectVerticalTerrain(obj, undefined)?.position
                        ?? obj.worldTransform.position.clone()
                            .add(GameServiceConfig.SCENE_DRAGON_DEATH_DESTROY_LIGHT_EFFECT_LOCATION_OFFSET),
                        {
                            loopCount: 1,
                        },
                    );
                    EffectService.playAtPosition(
                        GameServiceConfig.SCENE_DRAGON_DEATH_DESTROY_EXPLODE_EFFECT_ID,
                        obj.worldTransform.position,
                        {
                            loopCount: 1,
                        },
                    );
                    this.destroy();
                }
            });

        const idle = new Region<SceneDragonBehaviorState>("idle").include(idleWait, idleMotion);
        const active = new Region<SceneDragonBehaviorState>("active").include(walk, run);
        const alive = new Region<SceneDragonBehaviorState>("alive").include(idleWait, idleMotion, walk, run, fear, laugh);
        const unfear = new Region<SceneDragonBehaviorState>("unfear").include(idleWait, idleMotion, walk, run);

        idleWait.when(arg => arg.alive && arg.activeStamina < 100 && arg.idleStamina > 100 && !arg.isFear && arg.laughStamina < 0).to(idleMotion);
        idleMotion.when(arg => arg.idleStamina < 100).to(idleWait);
        idle.when(arg => arg.activeStamina > 50).to(walk);
        walk.when(arg => arg.activeStamina > 100).to(run);
        run.when(arg => arg.activeStamina < 0).to(idle);
        active.when(arg => arg.activeStamina < 0).to(idleWait);
        unfear.when(arg => arg.isFear).to(fear);
        fear.when(arg => !arg.isFear).to(laugh);
        laugh.when(arg => arg.laughStamina < 0).to(unfear);
        alive.when(arg => !arg.alive).to(death);

        this._machine = new FiniteStateMachine<SceneDragonBehaviorState>(idleWait);
        this._machineEffect = bindYoact(() => {
            this._machine.evaluate(this.state);
        });
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Method
    private checkAlive(): boolean {
        return Vector.squaredDistance(this.gameObject.worldTransform.position, this.localCharacter.worldTransform.position) <
            GameServiceConfig.SQR_SCENE_DRAGON_MAX_LIVE_DISTANCE;
    }

    private getRandomDestination(): mw.Vector | undefined {
        let randDist: number = GToolkit.random(SceneDragon.NAVIGATION_RANDOM_MIN_DISTANCE, SceneDragon.NAVIGATION_RANDOM_MAX_DISTANCE);
        let randVec = Vector.rotateZ(Vector.forward, Vector.zero, GToolkit.random(0, Math.PI * 2)).multiply(randDist).add(this.gameObject.worldTransform.position);

        randVec =
            GToolkit.detectVerticalTerrain(
                GToolkit.newWithZ(randVec, this.gameObject.worldTransform.position.z + 500),
                3000,
                this.gameObject,
                undefined,
                false,
            )?.position;
        if (randVec && GToolkit.hasValidPath(this.gameObject.worldTransform.position, randVec)) {
            return randVec;
        }
        return undefined;
    }

    private tryMoveRandom() {
        if (this.state.destination) return;

        this.state.destination = this.getRandomDestination();
        if (!this.state.destination) return;

        Log4Ts.log(SceneDragonBehavior, `navigating now.`,
            `key: ${this.syncKey}`,
            `destination: ${this.state.destination}`,
        );
        Navigation.navigateTo(
            this.gameObject,
            this.state.destination,
            undefined,
            () => Log4Ts.log(SceneDragonBehavior, `navigate success`),
            () => Log4Ts.log(SceneDragonBehavior, `navigate fail`),
        );
    }

    private pauseMove() {
        if (!this.state.destination) return;
        Navigation.stopNavigateTo(this.gameObject);
        this.state.destination = null;
    }

    /**
     * 参选.
     */
    public elected() {
        if (this._isElected) return;
        this._isElected = true;
        this._electEffectId = EffectService.playOnGameObject(
            GameServiceConfig.SELECTED_EFFECT_ID,
            this.gameObject,
            {
                loopCount: 0,
                position: new Vector(0, 0, 150),
                scale: new Vector(1.2, 1.2, 1.2),
                rotation: new Rotation(180, 0, 0),
            });
    }

    /**
     * 退选.
     */
    public unElected() {
        if (!this._isElected) return;
        this._isElected = false;
        if (this._electEffectId !== null) {
            EffectService.stop(this._electEffectId);
            this._electEffectId = null;
        }
    }

    /**
     * 恐惧.
     * @param enable
     */
    public fear(enable: boolean) {
        if (enable) {
            this._fearAnim?.play();
            this._fearEffectId = EffectService.playOnGameObject(
                GameServiceConfig.ASTOUNDED_EFFECT_ID,
                this.gameObject,
                {
                    loopCount: 0,
                    position: new Vector(0, 0, 100),
                    scale: new Vector(2, 2, 2),
                });
        } else {
            this._fearAnim?.stop();
            if (this._fearEffectId !== null) {
                EffectService.stop(this._fearEffectId);
                this._fearEffectId = null;
            }
        }
    }

    /**
     * 大笑.
     */
    public laugh(enable: boolean) {
        if (enable) {
            this._laughAnim?.play();
        } else {
            this._laughAnim?.stop();
        }
    }

    /**
     * 死亡并销毁.
     */
    public death() {
        this.state.alive = false;
    }

    /**
     * 捕捉并销毁.
     */
    public catch() {
        this.state.naturalDeath = false;
        this.state.alive = false;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Event Callback
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}
