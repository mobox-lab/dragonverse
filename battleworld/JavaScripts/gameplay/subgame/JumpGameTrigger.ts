
/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-01-16 14:42:38
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-01-17 18:05:22
 * @FilePath     : \DragonVerse\battleworld\JavaScripts\gameplay\subgame\JumpGameTrigger.ts
 * @Description  : 跳游戏触发器
 */

import { Globaldata } from "../../const/Globaldata";
import JumpProgress_Generate from "../../ui-generate/subgame/JumpProgress_generate";

const progressTag = "JumpProgress";


@Component
export default class JumpGameTrigger extends Script {
    private _trigger: Trigger;
    private _progressBar: ProgressBar;
    private _cnvProgressBar: Canvas;

    @mw.Property({ displayName: "要跳转的游戏", selectOptions: { "DragonVerse": Globaldata.dragonverseGameId, "PetSimulator": Globaldata.petSimulatorGameId } })
    private _jumpGameId: string = Globaldata.dragonverseGameId;

    protected onStart(): void {
        if (SystemUtil.isClient()) {
            this._trigger = this.gameObject as Trigger;
            this._trigger.onEnter.add(this.onPlayerEnter.bind(this));
            this._trigger.onLeave.add(this.onPlayerLeave.bind(this));

        }
    }

    onProgressDone() {
        //跳游戏
        console.log(this, "跳游戏");
        RouteService.enterNewGame(this._jumpGameId);
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
        let progressTask = actions.tween(this._progressBar).setTag(progressTag).to(Globaldata.jumpGameProgressDuration, { percent: 1 }).call(() => {
            this.onProgressDone();
        });

        actions.tween(this._cnvProgressBar).setTag(progressTag).to(100, { renderOpacity: 1 }).call(() => {
            progressTask.start();
        }).start();
    }
}