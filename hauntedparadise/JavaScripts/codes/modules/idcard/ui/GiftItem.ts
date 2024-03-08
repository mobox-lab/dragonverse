import { IGiftElement } from "../../../../config/Gift";
import CardGiftItem_UI_Generate from "../../../../ui-generate/ShareUI/card/CardGiftItem_UI_generate";
import Giftrecord_UI_Generate from "../../../../ui-generate/ShareUI/card/Giftrecord_UI_generate";

export class GiftItem extends Giftrecord_UI_Generate {

    public onSelect: Action;
    public isSelected: boolean;

    public onStart() {
        this.onSelect = new Action();
    }

    public setSelected(isTrue: boolean) {
    }

    public cfgId: number;

    public init(cfgId: number, imgGuid: string) {
        this.cfgId = cfgId;
        this.img.imageGuid = imgGuid;
        this.setCount(0);
    }

    public setCount(count: number) {
        this.txt.text = count + "";
    }

    public setAsEmpty() {
    }
}

export class GiftSendItem extends CardGiftItem_UI_Generate {

    public onSelect: Action;
    public isSelected: boolean;

    public onStart() {
        this.onSelect = new Action();
    }

    public setSelected(isTrue: boolean) {
    }

    private cfg: IGiftElement;

    public init(cfg: IGiftElement) {
        this.cfg = cfg;
    }

    public setData(cfg: IGiftElement) {
        
    }

    public setAsEmpty() {
    }
}