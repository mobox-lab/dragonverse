import { GameConfig } from "../../config/GameConfig";
import GameServiceConfig from "../../const/GameServiceConfig";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import Waterween from "../../depend/waterween/Waterween";
import JumpProgress_Generate from "../../ui-generate/subgame/JumpProgress_generate";

/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-01-16 14:42:38
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-01-16 15:38:52
 * @FilePath     : \dragon-verse\JavaScripts\gameplay\subgame\JumpGameTrigger.ts
 * @Description  : 跳游戏触发器
 */

const progressTag = "JumpProgress";
@Component
export default class JumpGameTrigger extends Script {
    private _trigger: Trigger;
    private _progressBar: ProgressBar;
    private _cnvProgressBar: Canvas;

    protected onStart(): void {
        if (SystemUtil.isClient()) {
            this._trigger = this.gameObject as Trigger;
            this._trigger.onEnter.add(this.onPlayerEnter.bind(this));
            this._trigger.onLeave.add(this.onPlayerLeave.bind(this));

        }
    }

    onProgressDone() {
        //跳游戏
        Log4Ts.log(this, "跳游戏");
        RouteService.enterNewGame(GameServiceConfig.PET_SIMULATOR_GAME_ID);
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
        let progressTask = actions.tween(this._progressBar).setTag(progressTag).to(GameServiceConfig.SCENE_JUMP_TO_SUBGAME_PROGRESS_DURATION, { percent: 1 }).call(() => {
            this.onProgressDone();
        });

        actions.tween(this._cnvProgressBar).setTag(progressTag).to(100, { renderOpacity: 1 }).call(() => {
            progressTask.start();
        }).start();
    }
}