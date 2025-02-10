import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import Fusepanel_Generate from "../../ui-generate/Fuse/Fusepanel_generate";
import MessageBox from "../../util/MessageBox";
import { utils } from "../../util/uitls";
import AchievementModuleC from "../AchievementModule/AchievementModuleC";
import { PlayerModuleC } from "../Player/PlayerModuleC";
import { P_Bag, PetBagItem } from "./P_Bag";
import { PetBagModuleC } from "./PetBagModuleC";
import { PetBagModuleData, petItemDataNew } from "./PetBagModuleData";

import { PetBag_Item } from "./P_BagItem";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import { P_BagHoverNum3 } from "./P_BagHoverNum3";
import { P_BagHoverNum2 } from "./P_BagHoverNum2";
import { P_Enchants } from "./P_Enchants";
import { P_Pet_Dev } from "./P_Pet_Dev";
import { TimerModuleUtils } from "../TimeModule/time";
import { PetBagModuleS } from "./PetBagModuleS";

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

    public show(petItems: petItemDataNew[], ...param: any[]): void {
        PetBagItem.instance.UIPool.resetAll();
        UIService.getUI(P_Bag).hideWhenBagOpen();
        UIService.getUI(P_Enchants).hideWhenBagOpen();
        UIService.getUI(P_Pet_Dev).hideWhenBagOpen();
        this.petItems = [];
        petItems.forEach(item => {
            let petItem = PetBagItem.instance.UIPool.get();
            petItem.setClickFun(this.changeContainer.bind(this), this);

            this.mListCanvas.addChild(petItem.uiObject);

            petItem.init(item);
            petItem.setLockVis(false)
            this.petItems.push(petItem);
        });
        this.curSelectPets = [];
        this.changeUIText();
        super.show(...param);
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            this.hide();
        });
    }
    public hideWhenBagOpen() {
        this.hide();
    }
    public hide(): void {
        super.hide();
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }

    /**获取当前是否可继续点击 */
    public get isCanClick() {
        return this.curSelectPets.length < GlobalData.Fuse.maxFuseCount;
    }

    /**改变目前容器展示 */
    public changeContainer(petItem: PetBag_Item) {
        petItem.setLockVis(!petItem.getLockVis());
  
        let isEquip = petItem.getLockVis();

        if (isEquip) {
            if (this.isCanClick) this.curSelectPets.push(petItem.petData);
            else petItem.setLockVis(false);
        } else {
            this.curSelectPets = this.curSelectPets.filter((item) => item.k != petItem.petData.k);
        }
        this.changeUIText();
    }

    /**点击按钮进行合成 */
    private onClickFuse() {
        if (this.curSelectPets.length < GlobalData.Fuse.minFuseCount) return;
        const data = DataCenterC.getData(PetBagModuleData);
        const cost = utils.fuseCostCompute(data?.fuseNumToday ?? 0);
        if (!ModuleService
            .getModule(PlayerModuleC)
            .isDiamondEnough(cost)) {
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
                    this.changeUIText();
                    setTimeout(() => this.onShowAC.call(), 500);
                } else super.show();
            });
    }

    private _earliestObtainTime: number = 0;

    /**改变花费 */
    private changeUIText() {
        let count = this.curSelectPets.length;
        const data = DataCenterC.getData(PetBagModuleData);
        const userId = Player.localPlayer.userId;
        data.clearFuseTodayIfNewDay({ userId })
        let fuseNumToday = data?.fuseNumToday ?? 0;
        const cost = utils.fuseCostCompute(fuseNumToday);

        this.mText_Money.text = utils.formatNumber(cost);
        this.text_FuseNum.text = `${count}/` + utils.Format(GameConfig.Language.Pet_NewBuy007.Value, GlobalData.Fuse.maxFuseCount);
        this.text_CumulativeNum.text = utils.Format(GameConfig.Language.Pet_NewBuy006.Value, fuseNumToday);
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
