import { Globaldata } from "../../../const/Globaldata";
import SpiderEffect_Generate from "../../../ui-generate/common/SpiderEffect_generate";

export class SpiderEffect extends SpiderEffect_Generate {

    private intervalKey: number = 0;


    // 模式 变大 -- 0 or 变小 -- 1
    private mode: number = 0;
    onShow() {

        this.clear_intervalKey();
        this.intervalKey = TimeUtil.setInterval(() => {

            if (this.mode == 0) {
                this.mPic_BG.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mPic_BG_1.visibility = mw.SlateVisibility.Collapsed;
                this.mode = 1;
            } else {
                this.mPic_BG.visibility = mw.SlateVisibility.Collapsed;
                this.mPic_BG_1.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mode = 0;
            }
        }, Globaldata.flyUIEffectInterval);

    }

    private clear_intervalKey() {
        if (this.intervalKey != 0) {
            TimeUtil.clearInterval(this.intervalKey);
            this.intervalKey = 0;
        }
    }

    onHide() {
        this.clear_intervalKey();
    }

}