import TalentTree_Generate from "../../ui-generate/TalentTree/TalentTree_generate";
import { TalentItem } from "./TalentItem";

export class TalentTree extends TalentTree_Generate {

    public data: any;

    protected onStart(): void {
        this.createTalentItem();
    }

    protected onShow(...params: any[]) {
        super.onShow(...params);
    }

    protected onHide(): void {
    }

    private createTalentItem(): void {
        const item = UIService.create(TalentItem);
        this.talentItemCanvas_1.addChild(item.uiObject);
    }

    public setData(data: any): void {
        this.data = data;
    }
}