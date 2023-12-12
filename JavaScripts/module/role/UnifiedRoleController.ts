import { RoleModuleC, RoleModuleS } from "./RoleModule";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { BuffContainer } from "../../depend/buff/BuffContainer";
import { CheckMoveBuff } from "../../buffs/CheckMoveBuff";
import { BuffBase, BuffType } from "../../depend/buff/Buff";
import { WetBuff } from "../../buffs/WetBuff";
import GameStart from "../../GameStart";
import { EventDefine } from "../../const/EventDefine";

/**
 * Unified Role State Controller.
 * 统一角色状态控制器.
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
export default class UnifiedRoleController extends mw.Script {
//#region Constant
    private static readonly EXPLODE_EFFECT_GUID = "29393";
    private static readonly STEAM_EFFECT_GUID = "89589";
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Member
    private _eventListeners: EventListener[] = [];

    private _playerId: number;

    public get playerId(): number {
        return this._playerId;
    }

    private _moduleC: RoleModuleC = null;

    private _moduleS: RoleModuleS = null;

    private _buffs: BuffContainer = null;

    public get buffs(): BuffContainer {
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
        if (SystemUtil.isClient()) {
            this._playerId = Player.localPlayer.playerId;
            this._moduleC = ModuleService.getModule<RoleModuleC>(RoleModuleC);
            if (!this._moduleC) Log4Ts.log(UnifiedRoleController, `Role Module C not valid.`);
            else this._moduleC.initController(this);
            this._buffs = null;
            this.onControllerReadyInClient();
        } else if (SystemUtil.isServer()) {
            this._moduleS = ModuleService.getModule<RoleModuleS>(RoleModuleS);
            if (!this._moduleS) Log4Ts.log(UnifiedRoleController, `Role Module S not valid.`);
            this._moduleS.addController(this.playerId, this);
            this._buffs = new BuffContainer();
            this.onControllerReadyInServer();
        }
//#endregion ------------------------------------------------------------------------------------------

//#region Widget bind
//#endregion ------------------------------------------------------------------------------------------

//#region Event Subscribe
        // this._eventListeners.push(Event.addLocalListener(EventDefine.EVENT_NAME, CALLBACK));
//#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
        if (SystemUtil.isServer()) this._buffs.update(dt);
    }

    protected onDestroy(): void {
        super.onDestroy();

//#region Event Unsubscribe
        this._eventListeners.forEach(value => value.disconnect());
//#endregion ------------------------------------------------------------------------------------------


        if (SystemUtil.isClient) {
            this.onControllerDestroyInClient();
        } else if (SystemUtil.isServer) {
            this._buffs.destroy();
            this.onControllerDestroyInServer();
        }
    }

//#endregion

//#region Init
    /**
     * 初始化.
     * @server 仅服务端.
     * @friend {@link RoleModuleS}
     */
    public initInServer(playerId: number) {
        this._playerId = playerId;
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Role Controller

    @mw.RemoteFunction(mw.Server)
    public addImpulse(character: mw.Character, impulse: mw.Vector): void {
        character.addImpulse(impulse, true);
    }

    private roleIsMove = (path: string[], value: unknown, oldVal: unknown): void => {
        if (value) {
            Log4Ts.log(UnifiedRoleController, `player is moving.`);
        } else {
            Log4Ts.log(UnifiedRoleController, `player stop moving.`);
        }
    };

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Buff Controller
    @RemoteFunction(mw.Server)
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
    @RemoteFunction(mw.Server)
    public addWetBuff(duration: number) {
        if (!this.buffs.refreshBuff<WetBuff>(BuffType.Wet, null, (buff) => {
            buff.survivalStrategy = duration;
        })) {
            let buff = new WetBuff(
                this,
                duration,
            );

            this._buffs.addBuff(buff);
            Log4Ts.log(UnifiedRoleController, `${this.character.player.playerId} add wet buff.`);
        } else {
            Log4Ts.log(UnifiedRoleController, `${this.character.player.playerId} refresh wet buff.`);
        }
    }

    /**
     * 触碰岩浆.
     * @param force
     * @param position
     * @return 是否 玩家带有 {@link BuffType.Wet} .
     */
    @RemoteFunction(mw.Server)
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
                UnifiedRoleController.STEAM_EFFECT_GUID,
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
                UnifiedRoleController.EXPLODE_EFFECT_GUID,
                hitResult.position,
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
