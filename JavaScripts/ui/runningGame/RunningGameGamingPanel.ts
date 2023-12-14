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

    private onTimeChange = (time: number) => {

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
    }

    private onScoreChange = (score: number) => {
        this.mScoreText.text = score.toString();

    }


}