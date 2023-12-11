import { BuffBase, BuffType } from "../depend/buff/Buff";
import UnifiedRoleController from "../module/role/UnifiedRoleController";
import Event = mw.Event;

interface CheckMoveBuffEventArgs {
    playerId: number,
    isMoving: boolean
}

/**
 * 检测玩家移动状态的 Buff.
 * @desc 当移动状态改变时，向本地及客户端发送事件.
 * @desc    事件名：{@link CheckMoveBuff.BuffMovePlayerChangeMoveState} "__BUFF_MOVE_PLAYER_CHANGE_MOVE_STATE__"
 * @desc    事件参数：{@link CheckMoveBuffEventArgs}
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
export class CheckMoveBuff extends BuffBase {
//#region Constant
    public static readonly BuffMovePlayerChangeMoveState = "__BUFF_MOVE_PLAYER_CHANGE_MOVE_STATE__";
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    type: BuffType = BuffType.CHECK_MOVE;

    constructor(
        caster: UnifiedRoleController,
        target: UnifiedRoleController,
        intervalTime: number) {
        super(caster,
            target,
            undefined,
            intervalTime,
            false);
    }

    public onInterval = () => {
        const moving = this.checkMove();
        if (this.target.isMove === moving) {
            return;
        }

        Event.dispatchToLocal(CheckMoveBuff.BuffMovePlayerChangeMoveState, {
            playerId: this.target.playerId,
            isMoving: this.target.isMove,
        });
        Event.dispatchToClient(Player.getPlayer(this.target.playerId), CheckMoveBuff.BuffMovePlayerChangeMoveState, {
            playerId: this.target.playerId,
            isMoving: this.target.isMove,
        });
    };

    private checkMove() {
        if (!this.target.character) return false;

        return this.target.character.isMoving || this.target.character.isJumping;
    }
}