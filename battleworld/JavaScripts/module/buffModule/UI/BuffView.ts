import { Globaldata } from "../../../const/Globaldata";
import P_buffview_Generate from "../../../ui-generate/buffModule/P_buffview_generate";
 
export default class BuffView extends P_buffview_Generate {

    // private _activityCanvas: mw.Canvas = null;

    onStart() {
        // this._activityCanvas = this.mBuffCanvas.getChildAt(0) as mw.Canvas;
        // if (this._activityCanvas) {
        //     this._activityCanvas.visibility = mw.SlateVisibility.Collapsed;
        // }
        // this.setActivityOpen(Globaldata.activity_apocalypseCome);
    }

    // /**显示天降福林UI */
    // public setActivityOpen(open: boolean) {
    //     if (this._activityCanvas == null) return;
    //     let visi = open ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
    //     this._activityCanvas.visibility = visi;
    // }

}