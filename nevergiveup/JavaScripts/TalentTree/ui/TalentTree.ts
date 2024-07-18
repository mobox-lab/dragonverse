import { TalentItem } from "./TalentItem";
import { GameConfig } from "../../config/GameConfig";
import { ITalentTreeElement } from "../../config/TalentTree";
import PlayerModuleC from "../../Modules/PlayerModule/PlayerModuleC";
import TalentTree_Generate from "../../ui-generate/TalentTree/TalentTree_generate";

export class TalentTree extends TalentTree_Generate {
    private _playC: PlayerModuleC;

    private get playC(): PlayerModuleC | null {
        if (!this._playC) this._playC = ModuleService.getModule(PlayerModuleC);
        return this._playC;
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

    private createTalentItem(data: ITalentTreeElement): void {
        const itemUI = UIService.create(TalentItem);
        itemUI.setData(data);
        this[data.slot].addChild(itemUI.uiObject);
    }
}