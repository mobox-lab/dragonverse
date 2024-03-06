import Log4Ts from "../../depend/log4ts/Log4Ts";
import Gtk from "../../util/GToolkit";
import GameObject = mw.GameObject;
import GameServiceConfig from "../../const/GameServiceConfig";
import FiniteStateMachine, {State} from "../../depend/finite-state-machine/FiniteStateMachine";
import {Yoact} from "../../depend/yoact/Yoact";
import Waterween from "../../depend/waterween/Waterween";
import Easing from "../../depend/easing/Easing";
import TweenTaskGroup from "../../depend/waterween/TweenTaskGroup";
import createYoact = Yoact.createYoact;
import bindYoact = Yoact.bindYoact;
import stopEffect = Yoact.stopEffect;
import {EventDefine} from "../../const/EventDefine";
import {ObbyModuleS} from "../../module/obby/ObbyModule";
import AudioController from "../../controller/audio/AudioController";

enum ObbyStarStates {
    Idle = "idle",
    Flying = "flying",
    Hidden = "hidden"
}

class ObbyStarBehaviorStates {
    sqrDist: number = Number.MAX_VALUE;

    isFlying: boolean = false;

    isAlive: boolean = true;

    flySpeed: number = 0;
}

/**
 * DragonVerse Obby Star Behavior.
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
@Component
export default class ObbyStar extends mw.Script {
//#region Constant
    private static readonly BLOCK_MAGMA_MATERIAL_ASSET_ID = "6EAB7AFB42853BE6F1B1989C46D3ED77";

    private static readonly BLOCK_WATER_MATERIAL_ASSET_ID = "197999";

    private static readonly GAME_OBJECT_MESH_NAME = "mesh";

    private static readonly GAME_OBJECT_TRIGGER_NAME = "obbyStarTrigger";

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Member

    @Property({displayName: "隶属关卡", group: "Level"})
    public level: number = 0;

    private _trigger: Trigger;

    private _clientCharacter: mw.Character;

    private _serverUsedMap: Map<number, boolean> = new Map();

    private _originPosition: Vector;

    public state: ObbyStarBehaviorStates = createYoact(new ObbyStarBehaviorStates());

    private _machine: FiniteStateMachine<unknown>;

    private _machineEffect: Yoact.Effect;

    private _floatTask: TweenTaskGroup;

    private _obbyModuleS: ObbyModuleS;

    private _touchedInClient: boolean = false;

    private get obbyModuleS(): ObbyModuleS | null {
        if (!this._obbyModuleS) this._obbyModuleS = ModuleService.getModule(ObbyModuleS);
        return this._obbyModuleS;
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//region MetaWorld Event
    protected onStart(): void {
        super.onStart();
        this.useUpdate = true;

//region Member init
        this._originPosition = this.gameObject.worldTransform.position;
        this._trigger = Gtk.getFirstGameObject(this.gameObject, ObbyStar.GAME_OBJECT_TRIGGER_NAME) as Trigger;
        if (!this._trigger) {
            Log4Ts.error(ObbyStar, `there is no trigger under this game object.`);
        } else {
            this._trigger.onEnter.add(this.onObjectEnter);
        }
        if (SystemUtil.isServer()) {
            Event.addLocalListener(EventDefine.ObbyStarReset, (player: mw.Player) => this.serverReset(player));
            Event.addLocalListener(EventDefine.ObbyStarCollectLevel, (player: Player, level: number) => {
                if (this.level === level && !this._serverUsedMap.get(player.playerId)) {
                    this.collect(player);
                }
            });
        } else if (SystemUtil.isClient()) {
            Event.addServerListener(EventDefine.ObbyStarReset, (player: mw.Player) => this.clientReset(player));
            this._clientCharacter = Player.localPlayer.character;
            this.initStateMachine();
        }
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
        this._machine?.update(dt);
    }

//endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//region Widget bind
//endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//region Event subscribe
//endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    protected onDestroy(): void {
        this._floatTask.destroy();
        stopEffect(this._machineEffect);
        super.onDestroy();
    }

//endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Method
    @RemoteFunction(Client)
    public flyToPlayer(player: mw.Player) {
        this.state.isFlying = true;
    }

    @RemoteFunction(Client)
    public clientReset(player: mw.Player) {
        if (this.state.isAlive) return;
        this.state.isAlive = true;
        this._touchedInClient = false;
        this.gameObject.setVisibility(true);
    }

    @RemoteFunction(Server)
    public serverReset(player: mw.Player) {
        if (this._serverUsedMap.get(player.playerId)) {
            this.clientReset(player);
        }
        this._serverUsedMap.set(player.playerId, false);
    }

    private initStateMachine() {
        const idle = new State<ObbyStarBehaviorStates>(ObbyStarStates.Idle)
            .aE(() => {
                Log4Ts.log(ObbyStar, `enter ${idle.name} state.`);
                this.gameObject.worldTransform.position = this._originPosition;
                this.gameObject.setVisibility(true);
                if (this._floatTask) {
                    this._floatTask.continue();
                } else {
                    this._floatTask = Waterween.group(
                        () => {
                            return {
                                motionZ: this.gameObject.worldTransform.position.z - this._originPosition.z
                            };
                        },
                        (val) => {
                            this.gameObject.worldTransform.position = Gtk.newWithZ(this.gameObject.worldTransform.position, this._originPosition.z + val.motionZ);
                        },
                        [
                            {
                                duration: GameServiceConfig.OBBY_STAR_FLOAT_STAGE_DURATION,
                                dist: {motionZ: GameServiceConfig.OBBY_STAR_FLOAT_MAX_DIST},
                                easing: Easing.easeInOutCubic
                            },
                            {
                                duration: GameServiceConfig.OBBY_STAR_FLOAT_STAGE_DURATION,
                                dist: {motionZ: 0},
                                easing: Easing.easeInOutCubic
                            }])
                        .repeat()
                        .continue();
                }
            })
            .aU((dt) => {
                this.gameObject.worldTransform.rotation =
                    Gtk.newWithZ(this.gameObject.worldTransform.rotation, this.gameObject.worldTransform.rotation.z + GameServiceConfig.OBBY_STAR_SELF_ROTATION_SPEED * dt);
            })
            .aEx(() => {
                this._floatTask?.pause();
            });

        const fly = new State<ObbyStarBehaviorStates>(ObbyStarStates.Flying)
            .aE(() => {
                Log4Ts.log(ObbyStar, `enter ${idle.name} state.`);
            })
            .aU((dt) => {
                this.gameObject.worldTransform.rotation =
                    Gtk.newWithZ(this.gameObject.worldTransform.rotation, this.gameObject.worldTransform.rotation.z + GameServiceConfig.OBBY_STAR_SELF_ROTATION_SPEED * dt);
                const direction = this._clientCharacter.worldTransform.position.subtract(this.gameObject.worldTransform.position).normalize();
                this.state.flySpeed = Math.min(this.state.flySpeed + GameServiceConfig.OBBY_STAR_FLY_ACCELERATED * dt, GameServiceConfig.OBBY_STAR_FLY_MAX_SPEED);
                const displacement = direction.multiply(this.state.flySpeed * dt);
                const distDisplacement = displacement.sqrLength;
                const distPlayerStar = this.gameObject.worldTransform.position.squaredDistanceTo(this._clientCharacter.worldTransform.position);
                this.gameObject.worldTransform.position = this.gameObject.worldTransform.position.add(distDisplacement < distPlayerStar ?
                    displacement :
                    this.gameObject.worldTransform.position.clone().subtract(this._clientCharacter.worldTransform.position));
                this.state.sqrDist = this.gameObject.worldTransform.position.squaredDistanceTo(this._clientCharacter.worldTransform.position);
            })
            .aEx((arg) => {
                EffectService.playAtPosition(
                    GameServiceConfig.OBBY_STAR_COLLECT_EFFECT_GUID,
                    this.gameObject.worldTransform.position,
                );
                AudioController.getInstance().play(
                    GameServiceConfig.OBBY_STAR_COLLECT_SOUND_ID,
                    this.gameObject.worldTransform.position,
                );
                this.state.isFlying = false;
                this.state.flySpeed = 0;
                this.state.isAlive = false;
            });

        const hidden = new State<ObbyStarBehaviorStates>(ObbyStarStates.Hidden)
            .aE(() => {
                Log4Ts.log(ObbyStar, `enter ${idle.name} state.`);
                this.state.sqrDist = Number.MAX_VALUE;
                this.gameObject.setVisibility(false);
            });

        idle.when((state) => state.isFlying).to(fly);
        fly.when((state) => state.sqrDist < 100 || state.sqrDist > 2500).to(hidden);
        hidden.when((state) => state.isAlive).to(idle);

        this._machine = new FiniteStateMachine(idle);
        this._machineEffect = bindYoact(() => {
            this._machine.evaluate(this.state);
        });
    }

    /**
     * 收集.
     * @param {Player} player
     */
    private collect(player: Player) {
        this.flyToPlayer(player);
        this._serverUsedMap.set(player.playerId, true);
        this.obbyModuleS.addPlayerStarCount(player.playerId);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//region Event Callback
    private onObjectEnter = (obj: GameObject): void => {
        if (Gtk.isCharacter(obj)) {
            if (SystemUtil.isServer()) {
                const player = obj.player;
                if (!this._serverUsedMap.get(player.playerId)) {
                    this.collect(player);
                }
            } else if (SystemUtil.isClient()) {
                if (this._touchedInClient) return;
                this._touchedInClient = true;
                EffectService.playAtPosition(
                    GameServiceConfig.OBBY_STAR_TOUCH_EFFECT_GUID,
                    this.gameObject.worldTransform.position,
                    {
                        scale: GameServiceConfig.OBBY_STAR_TOUCH_EFFECT_SCALE
                    });
            }
        }
    };

//endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}