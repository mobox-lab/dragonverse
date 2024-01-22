import Guide_Generate from "../../ui-generate/common/Guide_generate";
import { AnalyticsTool, ButtonAnaly } from "../Analytics/AnalyticsTool";

export class P_Guide extends Guide_Generate {

    private currentPick: number = 0;

    public pickPetAction: Action1<number> = new Action1<number>();

    onStart(): void {
        this.mBtn_OK.visibility = mw.SlateVisibility.Collapsed;
        this.mPic_check.visibility = mw.SlateVisibility.Collapsed;
        this.mPic_check2.visibility = mw.SlateVisibility.Collapsed;
        this.mBtn_cat.onClicked.add(() => {
            this.mPic_check.visibility = mw.SlateVisibility.Visible;
            this.mPic_check2.visibility = mw.SlateVisibility.Collapsed;
            this.mBtn_OK.visibility = mw.SlateVisibility.Visible;
            this.currentPick = 2;
        })
        this.mBtn_dog.onClicked.add(() => {
            this.mPic_check.visibility = mw.SlateVisibility.Collapsed;
            this.mBtn_OK.visibility = mw.SlateVisibility.Visible;
            this.mPic_check2.visibility = mw.SlateVisibility.Visible;
            this.currentPick = 1;
        })
        this.mBtn_OK.onClicked.add(() => {
            this.pickPetAction.call(this.currentPick);
            AnalyticsTool.action_click(ButtonAnaly.choose);
        });
    }

}