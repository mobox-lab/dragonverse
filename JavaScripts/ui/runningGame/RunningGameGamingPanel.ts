import { EventDefine } from "../../const/EventDefine";
import RGGameUI_Generate from "../../ui-generate/runningGame/RGGameUI_generate";


export class RunningGameGamingPanel extends RGGameUI_Generate {


    protected onAwake(): void {
        super.onAwake();

        Event.addLocalListener(EventDefine.OnRunningGameTimeChange, this.onTimeChange)
        Event.addLocalListener(EventDefine.OnRunningGameScoreChange, this.onScoreChange)

    }



    onShow() {

        //this.onTimeChange(40);
    }


    private onTimeChange(time: number) {
        let min = time / 60;
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

    private onScoreChange(score: number) {
        this.mScoreText.text = score.toString();

    }


}