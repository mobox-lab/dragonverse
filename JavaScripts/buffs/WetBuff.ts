import { BuffBase, BuffType } from "../depend/buff/Buff";
import UnifiedRoleController from "../module/role/UnifiedRoleController";
import Log4Ts from "../depend/log4ts/Log4Ts";
import HumanoidSlotType = mw.HumanoidSlotType;
import EffectService = mw.EffectService;
import { RpcAuxModuleS } from "../module/rpc-aux/RpcAuxModule";
import Effect = mw.Effect;

/**
 * 湿 Buff.
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
export class WetBuff extends BuffBase {
//#region Constant
    private static readonly WetEffectGuid = "113914";
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    public type: BuffType = BuffType.Wet;

    private _effectId: number;

    constructor(
        target: UnifiedRoleController,
        survivalStrategy: number) {
        super(null,
            target,
            survivalStrategy,
            undefined,
            false);
    }

    public onStart: () => void = () => {
        this.replayEffect();
        return;
    };

    public onRemove: () => void = () => {
        EffectService.stop(this._effectId);
        return;
    };


    public onRefresh: () => void = () => {
        this.replayEffect();
    };

    private replayEffect() {
        const char = this.target.character;
        if (!char) {
            Log4Ts.error(WetBuff, `character in target is null`);
            return;
        }
        EffectService.stop(this._effectId);
        this._effectId = EffectService.playOnGameObject(
            WetBuff.WetEffectGuid,
            char,
            {
                duration: this.survivalStrategy / 1e3,
                slotType: HumanoidSlotType.Root,
            },
        );
    }
}