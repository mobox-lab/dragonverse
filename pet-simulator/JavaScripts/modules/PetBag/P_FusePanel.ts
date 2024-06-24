import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import Fusepanel_Generate from "../../ui-generate/Fuse/Fusepanel_generate";
import MessageBox from "../../util/MessageBox";
import { utils } from "../../util/uitls";
import AchievementModuleC from "../AchievementModule/AchievementModuleC";
import { PlayerModuleC } from "../Player/PlayerModuleC";
import { PetBagItem } from "./P_Bag";
import { PetBagModuleC } from "./PetBagModuleC";
import { petItemDataNew } from "./PetBagModuleData";

import { PetBag_Item } from "./P_BagItem";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import { P_BagHoverNum3 } from "./P_BagHoverNum3";
import { P_BagHoverNum2 } from "./P_BagHoverNum2";

export class P_FusePanel extends Fusepanel_Generate {
    /**当前容器中的所有item */
    private petItems: PetBag_Item[] = [];
    /**当前选中的所有宠物 */
    private curSelectPets: petItemDataNew[] = [];
    /**显示事件 */
    public onShowAC: Action = new Action();

    onStart(): void {
        this.mBtn_Close.onClicked.add(() => {
            this.hide();
        });
        this.mBtn_Fuse.onClicked.add(() => {
            this.onClickFuse();
        });
    }

    /**悬浮UI */
    private showNewPetHoverUI(isShow: boolean, item: PetBag_Item) {
        const buffNum = item.petData.p.b.length ?? 0;
        if (isShow) {
            let pos = item.uiObject.position;
            let loc = new mw.Vector2(pos.x + this.mCanvas.position.x + 100 + GlobalData.Bag.itemHoverOffsetX, pos.y + this.mCanvas.position.y - 40 - this.mScrollBox.scrollOffset + GlobalData.Bag.itemHoverOffsetY);
            buffNum > 2 ? mw.UIService.getUI(P_BagHoverNum3).setPetInfoShow(item.petData, loc) : mw.UIService.getUI(P_BagHoverNum2).setPetInfoShow(item.petData, loc);
        } else {
            buffNum > 2 ? mw.UIService.getUI(P_BagHoverNum3).hide() : mw.UIService.getUI(P_BagHoverNum2).hide();
        }
    }

    public show(petItems: petItemDataNew[], ...param: any[]): void {
        PetBagItem.instance.UIPool.resetAll();
        this.petItems.length = 0;
        petItems.forEach(item => {
            // let petInfo = GameConfig.PetARR.getElement(item.I);
            // if (!petInfo.IfFuse) return;
            let petItem = PetBagItem.instance.UIPool.get();
            petItem.setClickFun(this.changeContainer.bind(this), this);

            this.mListCanvas.addChild(petItem.uiObject);

            petItem.init(item);
            petItem.onHoverAC.clear();
            petItem.setEnableHover(true);
            petItem.onHoverAC.add(this.showNewPetHoverUI.bind(this));
            if (petItem.getLockVis()) {
                petItem.setLockVis(false);
            }
            this.petItems.push(petItem);
        });
        this.curSelectPets.length = 0;
        this.changeCost();
        super.show(...param);
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            this.hide();
        });
    }

    public hide(): void {
        super.hide();
        this.petItems.forEach(item => item.setEnableHover(false));
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }

    /**获取当前是否可继续点击 */
    public get isCanClick() {
        return this.curSelectPets.length < GlobalData.Fuse.maxFuseCount;
    }

    /**改变目前容器展示 */
    public changeContainer(petItem: PetBag_Item) {
        petItem.setLockVis(!petItem.getLockVis());
        if (petItem.getLockVis()) {
            if (this.isCanClick)
                this.curSelectPets.push(petItem.petData);
            else
                petItem.setLockVis(false);
        } else {
            let index = this.curSelectPets.indexOf(petItem.petData);
            if (index >= 0) {
                this.curSelectPets.splice(index, 1);
            }
        }
        this.changeCost();
    }

    /**点击按钮进行合成 */
    private onClickFuse() {
        if (this.curSelectPets.length < GlobalData.Fuse.minFuseCount) return;

        if (!ModuleService
            .getModule(PlayerModuleC)
            .isDiamondEnough(GlobalData.Fuse.cost)) {
            this.hide();
            MessageBox.showOneBtnMessage(
                GameConfig.Language.Text_Fuse_UI_3.Value,
                () => super.show());
            return;
        }

        this.hide();
        MessageBox.showTwoBtnMessage(
            GameConfig.Language.Text_Fuse_UI_2.Value,
            async (res: boolean) => {
                if (res) {
                    const curSelectKeys = this.curSelectPets.map(item => item.k);
                    if (!ModuleService
                        .getModule(PetBagModuleC)
                        .checkFuseAble(curSelectKeys)) {
                        MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_11.Value);
                        return;
                    }

                    if (await ModuleService
                        .getModule(PetBagModuleC)
                        .fusePet(curSelectKeys, this._earliestObtainTime)) {
                        this.curSelectPets.length = 0;
                    }
                    this.changeCost();
                    setTimeout(() => this.onShowAC.call(), 500);
                } else super.show();
            });
    }

    private _earliestObtainTime: number = 0;

    /**删除选中宠物 */
    private delSelectPet(): number[] {
        return this.curSelectPets.map(item => item.k);
        // return await ModuleService.getModule(PetBagModuleC).checkFuseAble(keys);
    }

    /**改变花费 */
    private changeCost() {
        let count = this.curSelectPets.length;
        this.mText_Money.text = utils.formatNumber(GlobalData.Fuse.cost);
        if (count < GlobalData.Fuse.minFuseCount) {
            this.mText_Number.text = utils.Format(GameConfig.Language.Page_UI_Tips_13.Value, count);
            this.probabilityCanvas.visibility = SlateVisibility.Hidden;
        } else {
            this.mText_Number.text = utils.Format(GameConfig.Language.Text_Fuse_UI_1.Value, count);
            this.probabilityCanvas.visibility = SlateVisibility.SelfHitTestInvisible;

            let specialCount = 0;
            this.curSelectPets.forEach(item => {
                let type = GameConfig.PetARR.getElement(item.I).DevType;
                if (type === GlobalEnum.PetDevType.Love || type === GlobalEnum.PetDevType.Rainbow) {
                    specialCount++;
                }
            });

            //普通宠物的权重
            let normalWeight = -10 * count + 80;
            if (normalWeight < 0) normalWeight = 0;
            //黄金宠物的权重
            let goldWeight = -4 * count + 52;
            if (goldWeight < 0) goldWeight = 0;
            //彩虹宠物的权重
            // let rainbowWeight = -2 * count + 32;
            let rainbowWeight = 14 * count - 32 + 5 * specialCount;
            if (rainbowWeight < 0) rainbowWeight = 0;
            let totalWeight = normalWeight + goldWeight + rainbowWeight;

            this.mText_Normal_Probability.text = `${Math.round(normalWeight / totalWeight * 100)}%`;
            this.mText_Love_Probability.text = `${Math.round(goldWeight / totalWeight * 100)}%`;
            this.mText_Rainbow_Probability.text = `${100 - Math.round(goldWeight / totalWeight * 100) - Math.round(normalWeight / totalWeight * 100)}%`;
        }
    }
}
