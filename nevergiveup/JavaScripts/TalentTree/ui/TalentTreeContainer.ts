import { TalentTree } from "./TalentTree";
import { TweenCommon } from "../../TweenCommon";
import TalentTreeContainer_Generate from "../../ui-generate/TalentTree/TalentTreeContainer_generate";

export class TalentTreeContainer extends TalentTreeContainer_Generate {
    protected onStart(): void {
        this.layer = UILayerTop;
        this.closeBtn.onClicked.add(() => this.hideTween());

        this.createTalentTree();
    }

    protected onShow(...params: any[]) {
        super.onShow(...params);
        TweenCommon.popUpShow(this.uiObject);
    }

    protected onHide(): void {
    }

    /**
     * 关闭动画
     * @private
     */
    private hideTween() {
        TweenCommon.popUpHide(this.uiObject, () => UIService.hideUI(this));
    }

    /**
     * 生成天赋树
     * @private
     */
    private createTalentTree() {
        const talentTreeUI = UIService.create(TalentTree);
        this.talentTreeCanvas.addChild(talentTreeUI.uiObject);
        this.talentTreeCanvas.size = talentTreeUI.uiObject.size;
    }
}