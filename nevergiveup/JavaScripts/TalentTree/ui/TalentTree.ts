import { TalentItem } from "./TalentItem";
import { GameConfig } from "../../config/GameConfig";
import { TalentTreeActions } from "./TalentTreeContainer";
import { ITalentTreeElement } from "../../config/TalentTree";
import TalentTree_Generate from "../../ui-generate/TalentTree/TalentTree_generate";

export class TalentTree extends TalentTree_Generate {
    private _treeMap: Map<number, TalentItem> = new Map();

    protected onStart(): void {
        const trees = GameConfig.TalentTree.getAllElement();
        trees.forEach(item => this.createTalentItem(item));
        TalentTreeActions.onItemUpdated.add(id => this.updatedCompleted(id));
    }

    protected onShow(...params: any[]) {
        super.onShow(...params);
    }

    protected onHide(): void {
    }

    // 生成天赋
    private createTalentItem(data: ITalentTreeElement): void {
        const itemUI = UIService.create(TalentItem);
        itemUI.setData(data);
        this[data.slot].addChild(itemUI.uiObject);
        this._treeMap.set(itemUI.data.id, itemUI);
    }

    public getTalentItem(id: number) {
        return this._treeMap.get(id);
    }

    private updatedCompleted(id: number) {
        const item = this.getTalentItem(id);
        const level = item.level;
        item.setCurrentLevel(level + 1);
        const backTalentIds = item.data.backTalent;
        backTalentIds.forEach(id => {
            const backTalent = this.getTalentItem(id);
            backTalent.refreshCanActive();
        });
    }
}