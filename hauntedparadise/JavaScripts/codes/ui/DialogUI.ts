import Delarchive_UI_Generate from "../../ui-generate/ShareUI/procedure/Delarchive_UI_generate";
import { LanUtil } from "../utils/LanUtil";

export class DialogUI extends Delarchive_UI_Generate {
    private _onSure: Action1<boolean> = new Action1();

    onStart() {
        this.layer = UILayerSystem;
        this.btn_no.onClicked.add(() => {
            UIService.hideUI(this);
            this._onSure.call(false);
        })
        this.btn_yes.onClicked.add(() => {
            UIService.hideUI(this);
            this._onSure.call(true);
        })
    }

    show(title: string, onSure: (res: boolean) => void, sure?: string, cancel?: string) {
        this.text_question.text = title;
        this._onSure.clear();
        this._onSure.add(onSure);
        this.btn_yes.text = sure ? sure : LanUtil.getText("ReturnHall_02");
        this.btn_no.text = cancel ? cancel : LanUtil.getText("ReturnHall_03");
        UIService.showUI(this, this.layer);
    }
}