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

    @mw.Property({replicated: true, onChanged: UnifiedRoleController.prototype.registerInClient})
    private _playerId: number;

    public get playerId(): number {
        return this._playerId;
    }

    private _buffs: BuffContainer<UnifiedRoleController> = null;

    private _throwAnim: Animation = null;

    private _pickControllerInC: PickerController = null;

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

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Role State Member
    @mw.Property({replicated: true, onChanged: UnifiedRoleController.prototype.roleIsMove})
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

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
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
                mw.Script.spawnScript(PickerController, false, this.character).then(
                    (value) => this._pickControllerInC = value,
                );
                this._buffs = null;
                this._nolan = Nolan.getInstance();
                this.onControllerReadyInClient();
            }
        });
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
            !GameStart.instance.isRelease,
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
    };

    /**
     * 当 控制器于 Server 端就绪时 调用.
     */
    protected onControllerReadyInServer = (): void => {
    };

    /**
     * 当 控制器于 Client 端销毁时 调用.
     */
    protected onControllerDestroyInClient = (): void => {
    };

    /**
     * 当 控制器于 Server 端销毁时 调用.
     */
    protected onControllerDestroyInServer = (): void => {
    };

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}
