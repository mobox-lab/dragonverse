import BuffBase from "../depend/buff/Buff";
import UnifiedRoleController from "../module/role/UnifiedRoleController";
import Log4Ts from "mw-log4ts";
import HumanoidSlotType = mw.HumanoidSlotType;
import EffectService = mw.EffectService;
import { BuffType } from "./BuffType";

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
export class WetBuff extends BuffBase<UnifiedRoleController> {
//#region Constant
    private static readonly WET_EFFECT_GUID = "113914";

    private static readonly WET_EFFECT_SLOT = HumanoidSlotType.Buttocks;

    private static get WET_EFFECT_POSITION() {
        return new Vector(-4, 0, 15);
    };

    private static get WET_EFFECT_ROTATION() {
        return new Rotation(4.11, 6.84, -7.49);
    };

    private static get WET_EFFECT_SCALE() {
        return new Vector(1.1, 1.1, 1.1);
    };

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
            WetBuff.WET_EFFECT_GUID,
            char,
            {
                duration: this.survivalStrategy / 1e3,
                slotType: WetBuff.WET_EFFECT_SLOT,
                position: WetBuff.WET_EFFECT_POSITION,
                rotation: WetBuff.WET_EFFECT_ROTATION,
                scale: WetBuff.WET_EFFECT_SCALE,
            },
        );
    }
}