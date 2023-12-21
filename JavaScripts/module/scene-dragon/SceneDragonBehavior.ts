import { GameConfig } from "../../config/GameConfig";
import { EventDefine } from "../../const/EventDefine";
import GameServiceConfig from "../../const/GameServiceConfig";
import { HeadUIController, HeadUIType } from "../../controller/HeadUIController";
import FiniteStateMachine, { Region, State } from "../../depend/finite-state-machine/FiniteStateMachine";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import Regulator from "../../depend/regulator/Regulator";
import { Yoact } from "../../depend/yoact/Yoact";
import i18n from "../../language/i18n";
import GToolkit from "../../util/GToolkit";
import SceneDragon from "./SceneDragon";
import Character = mw.Character;
import createYoact = Yoact.createYoact;
import bindYoact = Yoact.bindYoact;
import { DragonSyncKeyEventArgs } from "./SceneDragonModule";

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
     * 是否 存活.
     */
    public alive: boolean = true;

    /**
     * 是否 好动的.
     */
    public restless: boolean = false;

    /**
     * 寻路目的地.
     */
    public destination: Vector = null;

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
    private get character() {
        if (!this._character) {
            this._character = Player.localPlayer.character;
        }
        return this._character;
    }

    public state: SceneDragonBehaviorState = createYoact(new SceneDragonBehaviorState());

    private _machine: FiniteStateMachine<unknown>;

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onStart(): void {
        super.onStart();
        if (SystemUtil.isServer()) {
            Log4Ts.log(SceneDragonBehavior, `SceneDragonBehavior is running on server, please check!`);
            return;
        }

        this.useUpdate = true;
        let bagId = GameConfig.CharacterfulDragon.getElement(this.data.id).bagId;
        HeadUIController.getInstance().registerHeadUI(this.gameObject, HeadUIType.Dragon, i18n.lan(SceneDragon.nameStr(bagId)));

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

        if (this.regulator.ready() && !this.checkAlive()) {
            Log4Ts.log(SceneDragonBehavior, `dragon out of alive range. syncKey: ${this.syncKey}`);
            Event.dispatchToLocal(EventDefine.DragonOutOfAliveRange, this.syncKey);
        }

        this._machine?.update(dt);
        this.state.idleStamina += dt * SceneDragonBehaviorState.IDLE_STAMINA_RECOVERY;
    }

    protected onDestroy(): void {
        super.onDestroy();

        HeadUIController.getInstance().unregisterHeadUI(this.gameObject);
        this.state.alive = false;
        this.gameObject.destroy();

        //#region Event Unsubscribe
        this._eventListeners.forEach(value => value.disconnect());
        //#endregion ------------------------------------------------------------------------------------------
    }

    //#endregion

    //#region Init
    public init(syncKey: string, data: SceneDragon) {
        this.syncKey = syncKey;
        this.data = data;

        this.initStateMachine();
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Method
    private checkAlive(): boolean {
        return Vector.squaredDistance(this.gameObject.worldTransform.position, this.character.worldTransform.position) <
            GameServiceConfig.SQR_SCENE_DRAGON_MAX_LIVE_DISTANCE;
    }

    private initStateMachine() {
        const idleWait = new State<SceneDragonBehaviorState>(SceneDragonStates.IdleWait)
            .aE(() => {
                Log4Ts.log(SceneDragonBehavior,
                    `enter idle wait state.`,
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
                    `enter idle motion state.`,
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
                    `enter walk state.`,
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
            });
        const run = new State<SceneDragonBehaviorState>(SceneDragonStates.Run)
            .aE(() => {
                Log4Ts.log(SceneDragonBehavior,
                    `enter run state.`,
                    `key: ${this.syncKey}.`);
                (this.gameObject as Character).maxWalkSpeed = SceneDragon.RUN_SPEED;
                this.state.restless = false;
            })
            .aU((dt) => {
                this.tryMoveRandom();
                this.state.activeStamina += dt * SceneDragonBehaviorState.ACTIVE_STAMINA_RECOVERY_IN_RUNNING;
            });
        const death = new State<SceneDragonBehaviorState>(SceneDragonStates.Death)
            .aE(() => {
                Log4Ts.log(SceneDragonBehavior,
                    `enter death state.`,
                    `key: ${this.syncKey}.`);
            });

        const idle = new Region<SceneDragonBehaviorState>("idle").include(idleWait, idleMotion);
        const active = new Region<SceneDragonBehaviorState>("active").include(walk, run);
        const alive = new Region<SceneDragonBehaviorState>("alive").include(idleWait, idleMotion, walk, run);

        idleWait.when((arg) => arg.alive && arg.activeStamina < 100 && arg.idleStamina > 100).to(idleMotion);
        idleMotion.when((arg) => arg.idleStamina < 100).to(idleWait);
        idle.when(arg => arg.activeStamina > 50).to(walk);
        walk.when((arg) => arg.activeStamina > 100).to(run);
        run.when((arg) => arg.activeStamina < 0).to(idle);
        active.when(arg => arg.activeStamina < 0).to(idleWait);
        alive.when(arg => !arg.alive).to(death);

        this._machine = new FiniteStateMachine<SceneDragonBehaviorState>(idleWait);
        bindYoact(() => {
            this._machine.evaluate(this.state);
        });
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
                true,
            )?.position;
        if (randVec && GToolkit.hasValidPath(this.gameObject.worldTransform.position, randVec)) {
            return randVec;
        }
        return undefined;
    }

    private tryMoveRandom() {
        if (this.state.destination) {
            return;
        }

        this.state.destination = this.getRandomDestination();
        if (!this.state.destination) {
            return;
        }

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

    /**
     * 参选.
     */
    public elected() {
//TODO_LviatYi 参选.
    }

    /**
     * 退选.
     */
    public unElected() {
//TODO_LviatYi 退选.
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Event Callback

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}
