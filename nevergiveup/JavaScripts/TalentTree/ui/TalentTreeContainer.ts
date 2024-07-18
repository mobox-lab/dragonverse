import { TalentTree } from "./TalentTree";
import { TweenCommon } from "../../TweenCommon";
import TalentTreeContainer_Generate from "../../ui-generate/TalentTree/TalentTreeContainer_generate";
import Log4Ts from "../../depend/log4ts/Log4Ts";

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
        this.talentCanvas.addChild(talentTreeUI.uiObject);
        Log4Ts.log(TalentTreeContainer,`talent cnv clip: ${this.talentCanvas.clipEnable}`);
        // this.talentCanvas.size = talentTreeUI.uiObject.size;
    }
}