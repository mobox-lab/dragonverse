import Log4Ts from "mw-log4ts";
import { PromotTips } from "../../ui/common/PromotTips";
import GameServiceConfig from "../../const/GameServiceConfig";
import JumpProgress_Generate from "../../ui-generate/subgame/JumpProgress_generate";

const progressTag = "JumpProgress";
@Component
export default class JumpGameTrigger extends Script {
    private _trigger: Trigger;
    private _progressBar: ProgressBar;
    private _cnvProgressBar: Canvas;

    @mw.Property({displayName: "要跳转的游戏", enumType: {"PetSimulator": 1, "BattleWorld": 2, "NeverGiveUp": 3}})
    private _jumpGameType: number = 1;

    protected onStart(): void {
        Log4Ts.log(JumpGameTrigger, ``);
        if (SystemUtil.isClient()) {
            this._trigger = this.gameObject as Trigger;
            this._trigger.onEnter.add(this.onPlayerEnter.bind(this));
            this._trigger.onLeave.add(this.onPlayerLeave.bind(this));
            Event.addServerListener("onJumpGameFailed", (msg: string) => {
                PromotTips.showTips(msg);
                Log4Ts.log(this, "onJumpGameFailed", msg);
            });
        }
    }

    onProgressDone() {
        //跳游戏
        Log4Ts.log(this, "跳游戏", this.getJumpSceneName(this._jumpGameType));
        this.jumpGame(Player.localPlayer.userId);
    }

    @RemoteFunction(Server)
    jumpGame(userId: string) {
        const onFailed = (result: mw.TeleportResult) => {
            // 将错误信息发给所有参与的客户端
            const player = Player.getPlayer(userId);
            if (player) {
                Event.dispatchToClient(player, "onJumpGameFailed", result.message);
                Log4Ts.log(this, "onJumpGameFailed", result.message);
            }
        };

        TeleportService.asyncTeleportToScene(this.getJumpSceneName(this._jumpGameType), [userId],).then(() => {
        }, onFailed);
    }

    onPlayerEnter(other: GameObject) {
        if (other instanceof Character) {
            Player.asyncGetLocalPlayer().then((player) => {
                if (player.character === other) {
                    //跳子游戏，播进度条
                    let ui = UIService.show(JumpProgress_Generate);
                    this._progressBar = ui.progressBar;
                    this._cnvProgressBar = ui.cnvProgressBar;
                    this._progressBar.percent = 0;
                    this._cnvProgressBar.renderOpacity = 0;
                    this.playProgress();
                }
            });
        }
    }

    onPlayerLeave(other: GameObject) {
        if (other instanceof Character) {
            Player.asyncGetLocalPlayer().then((player) => {
                if (player.character === other) {
                    //关闭进度条
                    actions.tweens.stopAllByTag(progressTag);
                    UIService.hide(JumpProgress_Generate);
                }
            });
        }
    }

    /**
     * 播放 Progress 动画.
     */
    public playProgress() {
        let progressTask = actions.tween(this._progressBar).setTag(progressTag).to(GameServiceConfig.SUB_GAME_SCENE_JUMP_PROGRESS_DURATION, {percent: 1}).call(() => {
            this.onProgressDone();
        });

        actions.tween(this._cnvProgressBar).setTag(progressTag).to(100, {renderOpacity: 1}).call(() => {
            progressTask.start();
        }).start();
    }

    getJumpSceneName(id: number): string {
        switch (id) {
            case 1:
                return "pet-simulator";
            case 2:
                return "battleworld";
            case 3:
                return "nevergiveup";
            default:
                return "dragon-verse";
        }
    }
}