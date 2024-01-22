/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-14 17:54:20
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-15 15:35:22
 * @FilePath: \DragonVerse\JavaScripts\ui\runningGame\RunningGameGamingPanel.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { EventDefine } from "../../const/EventDefine";
import RGGameUI_Generate from "../../ui-generate/runningGame/RGGameUI_generate";


export class RunningGameGamingPanel extends RGGameUI_Generate {


    protected onAwake(): void {
        super.onAwake();

        Event.addLocalListener(EventDefine.OnRunningGameTimeChange, this.onTimeChange)
        Event.addLocalListener(EventDefine.OnRunningGameScoreChange, this.onScoreChange)
        Event.addLocalListener(EventDefine.OnRunningGameInfoChange, this.onInfoChange)

    }



    onShow() {
        this.mScoreFly.text = "";
        this.mTimeFly.text = "";
        this.info.text = "";
        this.mScoreText.text = "0";
        //this.onTimeChange(40);
    }

    private onInfoChange = (str: string) => {
        let text = this.info.text;

        if (text.length > 0) {
            text += "\n";
        }
        text += this.mCountDown.text + str;
        this.info.text = text;
        this.mScrollBox.scrollToEnd();

    }

    private _timeTween: Tween<any>;

    private onTimeChange = (time: number, val: number) => {

        let min = Math.floor(time / 60);
        let sec = time % 60;

        let minStr = min.toString();
        if (min < 10) {
            minStr = "0" + minStr;
        }

        let secStr = sec.toString();
        if (sec < 10) {
            secStr = "0" + secStr;
        }
        this.mCountDown.text = minStr + ":" + secStr;

        if (val) {
            if (this._timeTween) {
                this._timeTween.stop();
            }
            this.mTimeFly.text = "+" + val;
            let pos = this.mTimeFly.position.clone();

            this._timeTween = new Tween({ y: this.mTimeCanvas.size.y })
                .to({ y: 0 })
                .duration(300)
                .onUpdate(val => {
                    pos.y = val.y;
                    this.mTimeFly.position = pos;
                })
                .start()
                .onComplete(() => {
                    this.mTimeFly.text = "";
                    this._timeTween = null;
                })
        }
    }

    private _scoreTween: Tween<any>;

    private onScoreChange = (score: number) => {
        if (this._scoreTween) {
            this._scoreTween.stop();
        }
        let beforeScore = Number(this.mScoreText.text);
        const durScore = score - beforeScore;

        this.mScoreFly.text = "+" + durScore;
        let pos = this.mScoreFly.position.clone();

        this._scoreTween = new Tween({ y: this.mScoreCanvas.size.y })
            .to({ y: 0 })
            .duration(300)
            .onUpdate(val => {
                pos.y = val.y;
                this.mScoreFly.position = pos;
            })
            .start()
            .onComplete(() => {
                this.mScoreFly.text = "";
                this._scoreTween = null;
            })

        this.mScoreText.text = score.toString();

    }


}