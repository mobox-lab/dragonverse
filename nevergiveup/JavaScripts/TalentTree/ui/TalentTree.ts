import { TalentItem } from "./TalentItem";
import { GameConfig } from "../../config/GameConfig";
import { ITalentTreeElement } from "../../config/TalentTree";
import TalentModuleC from "../../Modules/talent/TalentModuleC";
import TalentTree_Generate from "../../ui-generate/TalentTree/TalentTree_generate";

export class TalentTree extends TalentTree_Generate {
    private _talentC: TalentModuleC;
    private _treeMap: Map<number, TalentItem> = new Map();

    private get talentC(): TalentModuleC | null {
        if (!this._talentC) this._talentC = ModuleService.getModule(TalentModuleC);
        return this._talentC;
    }

    protected onStart(): void {
        const trees = GameConfig.TalentTree.getAllElement();
        trees.forEach(item => this.createTalentItem(item));
    }

    protected onShow(...params: any[]) {
        super.onShow(...params);
    }

    protected onHide(): void {
    }

    // 生成天赋
    private createTalentItem(data: ITalentTreeElement): void {
        const currentLevel = this.talentC.getTalentIndex(data.id);
        const itemUI = UIService.create(TalentItem);
        itemUI.setData(data);
        itemUI.setCurrentLevel(currentLevel);
        if (data.frontTalent?.length) {
            const parentsLevel = data.frontTalent.map(id => this.talentC.getTalentIndex(id));
            if (parentsLevel.every(n => n > 0)) {
                itemUI.canActive.status = true;
            }
        } else {
            itemUI.canActive.status = true;
        }
        this[data.slot].addChild(itemUI.uiObject);
        this._treeMap.set(itemUI.data.id, itemUI);
    }
}