import { TimerTool } from "../../../tool/TimerTool";
import DoubleKillPanel_Generate from "../../../ui-generate/notice/DoubleKillPanel_generate";

/**
 * 连杀UI
 */
export class DoubleKillPanel extends DoubleKillPanel_Generate {

    private delayCloseKey: any = null;

    onStart() {

    }


    onShow(...param: any[]) {
        let mgs = param[0];
        this.mText.text = mgs;
        this.clear_delayCloseKey();
        this.delayCloseKey = TimerTool.setTimeout(() => {
            this.delayCloseKey = null;
            UIService.hide(DoubleKillPanel);
        }, 2 * 1000);
    }

    private clear_delayCloseKey() {
        if (this.delayCloseKey) {
            TimerTool.clearTimeout(this.delayCloseKey);
            this.delayCloseKey = null;
        }
    }

    onHide() {
        this.clear_delayCloseKey();
    }


}