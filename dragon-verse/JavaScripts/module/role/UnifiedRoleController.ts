import Log4Ts from "../../depend/log4ts/Log4Ts";
import { AddBuffResult, BuffContainer } from "../../depend/buff/BuffContainer";
import { CheckMoveBuff } from "../../buffs/CheckMoveBuff";
import { WetBuff } from "../../buffs/WetBuff";
import GameStart from "../../GameStart";
import { EventDefine } from "../../const/EventDefine";
import BuffBase from "../../depend/buff/Buff";
import { BuffType } from "../../buffs/BuffType";
import GToolkit from "../../util/GToolkit";
import Nolan from "../../depend/nolan/Nolan";
import { ChatBuff } from "../../buffs/ChatBuff";
import { MoveForbiddenBuff } from "../../buffs/MoveForbiddenBuff";
import AreaManager from "../../gameplay/area/AreaManager";
import RemoteFunction = mw.RemoteFunction;
import Server = mw.Server;
import GameServiceConfig from "../../const/GameServiceConfig";
import PickerController from "../../gameplay/interactive/PickerController";
import FiniteStateMachine, { State } from "../../depend/finite-state-machine/FiniteStateMachine";
import { Yoact } from "../../depend/yoact/Yoact";
import Effect = Yoact.Effect;
import bindYoact = Yoact.bindYoact;
import createYoact = Yoact.createYoact;
import stopEffect = Yoact.stopEffect;
import MainPanel from "../../ui/main/MainPanel";
import Waterween from "../../depend/waterween/Waterween";
import AudioController from "../../controller/audio/AudioController";
import { RoleModuleS } from "./RoleModule";
import GlobalProperty from "../../GlobalProperty";


/**
 * Unified Role State Controller.
 * 统一角色状态控制器.
 * @desc Buffs 工作于 Server 端.
 * @desc ---
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
export default class UnifiedRoleController extends mw.PlayerState {
    //#region Member
    private _eventListeners: EventListener[] = [];

    @mw.Property({ replicated: true, onChanged: UnifiedRoleController.prototype.registerInClient })
    private _playerId: number;

    public get playerId(): number {
        return this._playerId;
    }

    private _buffs: BuffContainer<UnifiedRoleController> = null;

    private _throwAnim: Animation = null;

    private _pickControllerInC: PickerController = null;

    private _velocity: mw.Vector = mw.Vector.zero;

    /**
     * pick controller.
     * only valid in client.
     */
    public get pickController(): PickerController {
        return this._pickControllerInC;
    }

    public get buffs(): BuffContainer<UnifiedRoleController> {
        if (SystemUtil.isServer()) {
            return this._buffs;
        }
        Log4Ts.warn(UnifiedRoleController, `you should not visit buffs in places except server.`);
        return null;
    }

    private _character: Character = null;

    public get character(): Character | null {
        if (!this._character) {
            this._character = Player.getPlayer(this.playerId)?.character ?? null;
        }

        return this._character;
    }

    private _nolan: Nolan = null;

    private _movementStateMachine: FiniteStateMachine<RoleMovementState>;

    private _movementStateMachineEffect: Effect;

    private _movementState: RoleMovementState;

    /**
     * 移动速率状态.
     * 仅客户端.
     */
    public get movementState(): RoleMovementState {
        return this._movementState;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Role State Member
    @mw.Property({ replicated: true, onChanged: UnifiedRoleController.prototype.roleIsMove })
    isMove: boolean = false;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onStart(): void {
        super.onStart();
        this.useUpdate = true;
        //#region Member init
        //#endregion ------------------------------------------------------------------------------------------

        //#region Widget bind
        //#endregion ------------------------------------------------------------------------------------------

        //#region Event Subscribe
        // this._eventListeners.push(Event.addLocalListener(EventDefine.EVENT_NAME, CALLBACK));
        //#endregion ------------------------------------------------------------------------------------------
    }

    /**右脚是否落地 */
    private _rightFootOnLand: boolean = true;
    /**执行一次标识符 */
    private _canRightExecute: boolean = false;
    /**左脚是否落地 */
    private _leftFootOnLand: boolean = true;
    /**执行一次标识符 */
    private _canLeftExecute: boolean = false;
    /**上次落地的脚 0左脚，1右脚*/
    private _lastOnLandFoot: number = -1;

    private onEnterFrame(dt: number): void {


        // const keyBoard = KeyboardManager.getInstance();

        // keyBoard.isKewDown(mw.Keys.W) && this._velocity.x++;
        // keyBoard.isKewDown(mw.Keys.S) && this._velocity.x--;
        // keyBoard.isKewDown(mw.Keys.A) && this._velocity.y--;
        // keyBoard.isKewDown(mw.Keys.D) && this._velocity.y++;
        // mw.Player.localPlayer.character.addMovement(this._velocity);w

        //判断脚步是否落地
        if (Player.localPlayer.character.isMoving && Player.localPlayer.character.movementMode == MovementMode.Walk) {
            let rightFootWorldPos = Player.localPlayer.character.getSlotWorldPosition(HumanoidSlotType.RightFoot);
            let leftFootWorldPos = Player.localPlayer.character.getSlotWorldPosition(HumanoidSlotType.LeftFoot);
            let rightResults = QueryUtil.lineTrace(rightFootWorldPos, rightFootWorldPos.clone().add(new Vector(0, 0, -100)), true, false, null, null, false, Player.localPlayer.character);
            let leftResults = QueryUtil.lineTrace(leftFootWorldPos, leftFootWorldPos.clone().add(new Vector(0, 0, -100)), true, false, null, null, false, Player.localPlayer.character);
            //找到排除触发器的第一个射到的go
            rightResults = rightResults.filter(result => !(result.gameObject instanceof Trigger));
            if (rightResults[0] && rightResults[0].distance < 10) {
                this._rightFootOnLand = true;
            } else {
                this._rightFootOnLand = false;
                //可以执行
                this._canRightExecute = true;
            }

            leftResults = leftResults.filter(result => !(result.gameObject instanceof Trigger));
            if (leftResults[0] && leftResults[0].distance < 10) {
                this._leftFootOnLand = true;
            } else {
                this._leftFootOnLand = false;
                //可以执行
                this._canLeftExecute = true;
            }
        }

        if (this._canRightExecute && this._rightFootOnLand && this._lastOnLandFoot !== 1) {
            this._canRightExecute = false;
            AudioController.getInstance().play(28);
            this._lastOnLandFoot = 1;
        }
        if (this._canLeftExecute && this._leftFootOnLand && this._lastOnLandFoot !== 0) {
            this._canLeftExecute = false;
            AudioController.getInstance().play(28);
            this._lastOnLandFoot = 0;
        }
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
        if (SystemUtil.isClient()) this._movementStateMachine?.update(dt);
        if (SystemUtil.isServer()) this._buffs?.update(dt);
    }

    public onDestroy(): void {
        super.onDestroy();

        //#region Event Unsubscribe
        this._eventListeners.forEach(value => value.disconnect());
        //#endregion ------------------------------------------------------------------------------------------

        if (SystemUtil.isClient()) {
            this.onControllerDestroyInClient();
        } else if (SystemUtil.isServer()) {
            this._buffs.destroy();
            this.onControllerDestroyInServer();
        }
    }

    //#endregion

    //#region Init

    private registerInClient() {
        if (!SystemUtil.isClient()) {
            return;
        }
        Log4Ts.log(UnifiedRoleController, `register in client.`);
        Player.asyncGetLocalPlayer().then(value => {
            if (value.playerId !== this._playerId) {
                this.destroy();
            } else {
                this._pickControllerInC = this.character.addComponent(PickerController, false);
                this._buffs = null;
                this._nolan = Nolan.getInstance();
                this.onControllerReadyInClient();
            }
        });
        this.initMovementStateMachine();
        this.character.onMovementModeChange.add(
            mode => {
                switch (mode) {
                    case mw.MovementMode.Walk:
                        break;
                    case mw.MovementMode.Swim:
                    case mw.MovementMode.Fly:
                        this._movementState.isSprint = false;
                        break;
                }
            },
        );
    }

    /**
     * 外部初始化.
     * @server 仅服务端.
     * @friend {@link RoleModuleS}
     */
    public initInServer(playerId: number) {
        Log4Ts.log(UnifiedRoleController, `init in Server.`);
        this._playerId = playerId;

        this._buffs = new BuffContainer();
        this._throwAnim = this.character?.loadAnimation(GameServiceConfig.THROW_STANCE_GUID);
        this.onControllerReadyInServer();
    }

    /**
     * 初始化移动管理状态机.
     */
    private initMovementStateMachine() {
        this._movementState = createYoact(new RoleMovementState());
        const walk = new State<RoleMovementState>(RoleMovementStates.Walk)
            .aE(() => {
                if (!this.character) return;
                Log4Ts.log(UnifiedRoleController, `enter ${walk.name} state.`);
                this.character.maxWalkSpeed = GameServiceConfig.ROLE_MAX_WALK_SPEED;
                this.character.maxAcceleration = GameServiceConfig.ROLE_MAX_WALK_ACCURATE;
            })
            .aU((dt) => {
                this._movementState.stamina = Math.min(this._movementState.stamina + RoleMovementState.STAMINA_RECOVERY * dt, RoleMovementState.STAMINA_MAX_COUNT);
            });
        const sprint = new State<RoleMovementState>(RoleMovementStates.Sprint)
            .aE(() => {
                if (!this.character) return;
                Log4Ts.log(UnifiedRoleController, `enter ${sprint.name} state.`);
                this.character.maxWalkSpeed = GameServiceConfig.ROLE_MAX_SPRINT_SPEED;
                this.character.maxAcceleration = GameServiceConfig.ROLE_MAX_SPRINT_ACCURATE;
                this._movementState.sprintEffectId = EffectService.playOnGameObject(
                    GameServiceConfig.ROLE_SPRINT_EFFECT_GUID,
                    this.character, {
                    slotType: GameServiceConfig.ROLE_SPRINT_EFFECT_SLOT_TYPE,
                    loopCount: 0,
                    scale: GameServiceConfig.ROLE_SPRINT_EFFECT_SCALE,
                    position: GameServiceConfig.ROLE_SPRINT_EFFECT_POSITION_OFFSET,
                });
                UIService.getUI(MainPanel)?.showSprintUiEffect(true);
            })
            .aU((dt) => {
                this._movementState.stamina -= RoleMovementState.STAMINA_CONSUME * dt;
            })
            .aEx(() => {
                const effectId = this._movementState.sprintEffectId;
                EffectService.getEffectById(effectId).then(
                    (effect) =>
                        Waterween.to(
                            () => effect.worldTransform.scale,
                            (val) => effect.worldTransform.scale = new Vector(val.x, val.y, val.z),
                            Vector.zero,
                            GameServiceConfig.ROLE_SPRINT_EFFECT_RESIDUAL_DURATION)
                            .autoDestroy()
                            .onDone.add(arr => EffectService.stop(effectId)),
                );
                UIService.getUI(MainPanel)?.showSprintUiEffect(false);
            });

        walk.when(arg => arg.stamina > GameServiceConfig.ROLE_SPRINT_STAMINA_THRESHOLD && arg.isSprint).to(sprint);
        sprint.when(arg => !arg.isSprint || arg.stamina <= 0).to(walk);

        this._movementStateMachine = new FiniteStateMachine<RoleMovementState>(walk);
        this._movementStateMachineEffect = bindYoact(() => {
            this._movementStateMachine.evaluate(this._movementState);
        });
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Role Controller

    @RemoteFunction(Server)
    public addImpulse(character: mw.Character, impulse: mw.Vector): void {
        character.addImpulse(impulse, true);
    }

    private roleIsMove = (path: unknown, value: unknown, oldVal: unknown): void => {
        if (value) {
            Log4Ts.log(UnifiedRoleController, `player is moving.`);
        } else {
            Log4Ts.log(UnifiedRoleController, `player stop moving.`);
            if (this.movementState) {
                this.movementState.isSprint = false;
            }
        }
    };

    @RemoteFunction(Client)
    public lookAt(position: Vector) {
        this._nolan.lookAt(position, true, true);
    }

    @RemoteFunction(Server)
    public respawn() {
        const position = GToolkit.randomArrayItem(AreaManager.getInstance().getRespawnArea());
        this.character.worldTransform.position = new Vector(position.x, position.y, position.z);
    }

    @RemoteFunction(Server)
    public playerPlayThrow() {
        this._throwAnim.play();
    }

    /**
     * 尝试冲刺.
     * @param enable
     */
    public trySprint(enable: boolean = true) {
        this._movementState.isSprint = enable && this.isSprintAble();
    }

    /**
     * 是否允许冲刺.
     * {@link UnifiedRoleController.character} not null && {@link MovementMode.Walk} && 非跳跃 && 非蹲伏
     * @private
     */
    private isSprintAble() {
        return this.character && this.character.isMoving && this.character.movementMode === MovementMode.Walk && !this.character.isJumping && !this.character.isCrouching;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Buff Controller
    @RemoteFunction(Server)
    public addCheckMoveBuff() {
        Log4Ts.log(UnifiedRoleController, `${this.character.player.playerId} add check move buff.`);
        let buff = new CheckMoveBuff(
            this,
            this,
            BuffBase.NORMAL_INTERVAL,
        );

        this._buffs.addBuff(buff);
    }

    /**
     * 添加 湿润 buff.
     * @param duration 持续时间 ms.
     */
    @RemoteFunction(Server)
    public addWetBuff(duration: number) {
        const result = this._buffs.addBuff(
            {
                type: BuffType.Wet,
                caster: null,
                refresher: (buff) => {
                    buff.survivalStrategy = duration;
                },
                buffCreator: () => {
                    return new WetBuff(
                        this,
                        duration,
                    );
                },
            },
        );

        switch (result) {
            case AddBuffResult.Added:
                Log4Ts.log(UnifiedRoleController, `${this.character.player.playerId} add wet buff.`);
                break;
            case AddBuffResult.Refreshed:
                Log4Ts.log(UnifiedRoleController, `${this.character.player.playerId} refresh wet buff.`);
                break;
            default:
                Log4Ts.log(UnifiedRoleController, `${this.character.player.playerId} add wet buff failed.`);
                break;
        }
    }

    /**
     * 触碰岩浆.
     * @param force
     * @param position
     * @param guid
     * @return 是否 玩家带有 {@link BuffType.Wet}.
     */
    @RemoteFunction(Server)
    public touchMagma(force: number, position: Vector, guid: string) {
        if (!this.character) {
            Log4Ts.error(UnifiedRoleController, `character is null.`);
            return;
        }

        if (this.buffs.hasBuff(BuffType.Wet)) {
            Log4Ts.log(UnifiedRoleController,
                `player touch magma. player id: ${this.character.player.playerId}`,
                `player is wet.`);
            EffectService.playAtPosition(
                GameServiceConfig.STEAM_EFFECT_GUID,
                position,
            );

            const player = Player.getPlayer(this.playerId);
            if (player) {
                Event.dispatchToClient(player, EventDefine.PlayerDestroyMagma, guid);
            }
            return;
        }

        Log4Ts.log(UnifiedRoleController,
            `player touch magma. player id: ${this.character.player.playerId}`,
            `player is not wet.`);

        const charPosition = this.character.worldTransform.position;
        const hitResult = QueryUtil.lineTrace(
            position,
            charPosition,
            false,
            !GlobalProperty.getInstance().isRelease,
            undefined,
            false,
            false)[0] ?? null;
        if (hitResult) {
            EffectService.playAtPosition(
                GameServiceConfig.EXPLODE_EFFECT_GUID,
                hitResult.position,
                {
                    scale: GameServiceConfig.EXPLODE_EFFECT_SCALE,
                },
            );
        } else {
            Log4Ts.error(UnifiedRoleController, `there is no hit result.`);
        }

        this.character.addImpulse(
            this.character
                .worldTransform
                .position
                .clone()
                .subtract(position)
                .normalized
                .multiply(force),
            true);

        const player = Player.getPlayer(this.playerId);
        if (player) {
            Event.dispatchToClient(player, EventDefine.PlayerHurtByMagma, position);
        }
    }

    @RemoteFunction(mw.Server)
    public addChatBuff(location: Vector) {
        this._buffs.addBuff(new ChatBuff(
            location,
            this));
    }

    @RemoteFunction(mw.Server)
    public removeChatBuff() {
        this._buffs.removeBuff(BuffType.Chat);
    }

    @RemoteFunction(mw.Server)
    public addMoveForbiddenBuff() {
        this._buffs.addBuff(new MoveForbiddenBuff(this));
    }

    @RemoteFunction(mw.Server)
    public removeMoveForbiddenBuff() {
        this._buffs.removeBuff(BuffType.MoveForbidden);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Event Callback

    /**
     * 当 控制器于 Client 端就绪时 调用.
     */
    protected onControllerReadyInClient = (): void => {
        this.addCheckMoveBuff();
        TimeUtil.onEnterFrame.add(this.onEnterFrame, this);
    };

    public playerJump() {
        if (!(Player.localPlayer.character.movementMode === MovementMode.Swim)) {
            mw.Player.localPlayer.character.jump();
        } else {
            actions.tween(Player.localPlayer.character.worldTransform).to(10,
                { position: Player.localPlayer.character.worldTransform.position.clone().add(new Vector(0, 0, 100)) }).call(() => {
                    Player.localPlayer.character.jump();
                }).start();
        }
    }

    /**
     * 当 控制器于 Server 端就绪时 调用.
     */
    protected onControllerReadyInServer = (): void => {
    };

    /**
     * 当 控制器于 Client 端销毁时 调用.
     */
    protected onControllerDestroyInClient = (): void => {
        stopEffect(this._movementStateMachineEffect);
    };

    /**
     * 当 控制器于 Server 端销毁时 调用.
     */
    protected onControllerDestroyInServer = (): void => {
    };

    public changeVelocityX(x: number) {
        this._velocity.set(0, 0, 0);
        this._velocity.x += x;
        mw.Player.localPlayer.character.addMovement(this._velocity);
    }

    public changeVelocityY(y: number) {
        this._velocity.set(0, 0, 0);
        this._velocity.y += y;
        mw.Player.localPlayer.character.addMovement(this._velocity);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

enum RoleMovementStates {
    /**
     * 正常行走.
     */
    Walk = "walk",
    /**
     * 冲刺.
     */
    Sprint = "sprint",
}

export class RoleMovementState {
    //#region Constant
    /**
     * 体力恢复速率. /s
     */
    public static readonly STAMINA_RECOVERY = 10;

    /**
     * 体力消耗速率. /s
     */
    public static readonly STAMINA_CONSUME = 5;

    /**
     * 体力最大值.
     */
    public static readonly STAMINA_MAX_COUNT = 100;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    /**
     * 体力.
     * @desc 随时间回复.
     * @desc 决定待机动作.
     */
    public stamina: number;

    /**
     * 是否 冲刺.
     */
    public isSprint: boolean = false;

    /**
     * 冲刺特效 id.
     */
    public sprintEffectId: number = null;

    constructor(idleStamina: number = RoleMovementState.STAMINA_MAX_COUNT) {
        this.stamina = idleStamina;
    }
}