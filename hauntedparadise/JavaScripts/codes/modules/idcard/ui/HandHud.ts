import CardHand_UI_Generate from "../../../../ui-generate/ShareUI/card/CardHand_UI_generate";
import IDCardPanel from "./IDCardPanel";

export default class HandHud extends CardHand_UI_Generate {

    ownerId: string;

    protected onStart() {
        this.btn_cardHand.onClicked.add(() => {
            if (!this.ownerId) { return; }
            UIService.show(IDCardPanel, this.ownerId);
        });
    }

    public setData(ownerId: string) {
        this.ownerId = ownerId;
    }
}