import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import Dev_Generate from "../../ui-generate/Pet/Dev_generate";
import MessageBox from "../../util/MessageBox";
import { utils } from "../../util/uitls";
import { PlayerModuleC } from "../Player/PlayerModuleC";
import { P_Bag, PetBagItem } from "./P_Bag";
import { PetBagModuleC } from "./PetBagModuleC";
import { PetBagModuleData, petItemDataNew } from "./PetBagModuleData";
import { PetBag_Item } from "./P_BagItem";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import Log4Ts from "mw-log4ts";
import { P_FusePanel } from "./P_FusePanel";
import { P_Enchants } from "./P_Enchants";

export class P_Pet_Dev extends Dev_Generate {
    /**当前容器中的所有item */
    private petItems: PetBag_Item[] = [];
    /**当前概率 */
    private curRate: number = 0;
    /**当前花费 */
    private curCost: number = 0;
    /**当前宠物id */
    private curPetId: number = 0;
    /**当前是否处于黄金化 */
    private isGold: boolean = true;
    /**当前选中的所有宠物 */
    private curSelectPets: petItemDataNew[] = [];

    onStart(): void {
        this.mButton_Close.onClicked.add(() => {
            this.hide();
        });
        this.mStaleButton_Ok.onClicked.add(() => {
            this.onClickDev();
        });
        mw.Event.addServerListener("P_PET_DEV_SHOW_FUSE_MESSAGE",
            this.showFuseMessage,
        );
        mw.Event.addServerListener("P_PET_DEV_CHANGE_PANEL_UI",
            this.changePanelUI,
        );
    }

    public hideWhenBagOpen() {
        this.hide();
    }
    /**点击按钮进行合成 */
    private onClickDev() {
        if (this.curSelectPets.length <= 0) return;
        this.hide();
        MessageBox.showTwoBtnMessage(utils.Format(GameConfig.Language.Page_UI_Tips_2.Value, this.curRate, this.curCost), (res: boolean) => {
            if (res) {
                this.startDev();
            } else {
                super.show();
            }
        });
    }

    public showFuseMessage = (type: "devFuseSuccess" | "devFuseFailed") => {
        switch (type) {
            case "devFuseSuccess": {
                MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_5.Value);
                break;
            }
            case "devFuseFailed": {
                MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_6.Value);
                break;
            }
            default:
                break;
        }
    };

    /**开始合成 */
    private async startDev() {
        if (!ModuleService
            .getModule(PlayerModuleC)
            .isDiamondEnough(this.curCost)) {
            MessageBox.showOneBtnMessage(
                GameConfig.Language.Text_Fuse_UI_3.Value,
                () => super.show());
            return;
        }
        const curSelectKeys = this.curSelectPets.map(item => item.k);

        Log4Ts.log(
            P_Pet_Dev,
            "startDev curSelectPets:" +
            JSON.stringify(this.curSelectPets) +
            " curCost:" +
            this.curCost +
            " curPetId:" +
            this.curPetId,
        );

        if (!ModuleService
            .getModule(PetBagModuleC)
            .checkFuseAble(curSelectKeys)) {
            MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_11.Value);
            return;
        }

        this.hide();
        this.curSelectPets.length = 0;

        await ModuleService
            .getModule(PetBagModuleC)
            .fuseDevPet(curSelectKeys,
                this.curPetId,
                this.isGold);
    }
    public init(isGold: boolean) {
        PetBagItem.instance.UIPool.resetAll();
        this.isGold = isGold;
        this.mTextBlock_Intro.text = isGold ? GameConfig.Language.Dev_TextBlock_Intro_1.Value : GameConfig.Language.Dev_TextBlock_Intro_2.Value;
        this.mTextBlock_Explain.text = isGold ? GameConfig.Language.Dev_TextBlock_Explain_1.Value : GameConfig.Language.Dev_TextBlock_Explain_2.Value;

        const petData = DataCenterC.getData(PetBagModuleData);
        this.petItems = [];
        petData.sortBag().forEach(pet => {
            let isSuccess: boolean = false;
            let info = GameConfig.PetARR.getElement(pet.I);
            if (isGold) {
                isSuccess = info.DevType == 0;
            } else {
                isSuccess = info.DevType == 1;
            }
            if (!isSuccess) return;

            let petItem = PetBagItem.instance.UIPool.get();
            petItem.setClickFun(this.changeContainer.bind(this), this);
            this.mCanvas_List.addChild(petItem.uiObject);

            petItem.init(pet);
            this.petItems.push(petItem);
        });

        this.curSelectPets = [];
        this.curPetId = 0;
        this.changeCost(0);
    }
    public show(petItems: petItemDataNew[], isGold: boolean, ...param: any[]): void {
        UIService.getUI(P_Bag).hideWhenBagOpen();
        UIService.getUI(P_Enchants).hideWhenBagOpen();
        UIService.getUI(P_FusePanel).hideWhenBagOpen();
        this.init(isGold);
        super.show(...param);
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            this.hide();
        });
    }

    /**改变目前容器展示 */
    public changeContainer(bagItem: PetBag_Item) {
        bagItem.setLockVis(!bagItem.getLockVis());

        let isEquip = bagItem.getLockVis();

        Log4Ts.log(
            P_Pet_Dev,
            "changeContainer init isEquip:" +
            isEquip +
            " curPetId:" +
            this.curPetId +
            " curSelectPets:" +
            JSON.stringify(this.curSelectPets) +
            " bagItem.petData:" +
            JSON.stringify(bagItem.petData),
        );

        if (isEquip) {
            this.curSelectPets.push(bagItem.petData);
            this.curPetId = bagItem.petData.I;
        } else this.curSelectPets = this.curSelectPets.filter((item) => item.k != bagItem.petData.k);

        if (!this.curSelectPets?.length) { // 当前没有选中宠物
            this.curPetId = 0;
            this.curSelectPets = [];
            this.petItems.forEach(item => {
                item.setVisible(mw.SlateVisibility.SelfHitTestInvisible);
            });
        } else if (this.curSelectPets.length === 1 && isEquip) { // 选中该宠物 只显示该宠物的 items
            let maxCount = GlobalData.Dev.maxLevel;
            let count = 1;
            for (let i = 0; i < this.petItems.length; i++) {
                let item = this.petItems[i];
                if (item == bagItem) continue;
                if (count >= maxCount) {
                    item.setItemVis(mw.SlateVisibility.Collapsed);
                    continue;
                }
                if (item.petData.I == bagItem.petData.I) {
                    count++;
                    item.setItemVis(mw.SlateVisibility.SelfHitTestInvisible);
                } else {
                    item.setItemVis(mw.SlateVisibility.Collapsed);
                }
            }
        }

        Log4Ts.log(
            P_Pet_Dev,
            "changeContainer end isEquip:" +
            isEquip +
            " curPetId:" +
            this.curPetId +
            " curSelectPets:" +
            JSON.stringify(this.curSelectPets) +
            " bagItem.petData:" +
            JSON.stringify(bagItem.petData),
        );

        this.changeCost(this.curSelectPets.length);
    }

    /**改变花费 */
    public changePanelUI = (cost: number, rate: number) => {
        this.curCost = cost;
        this.curRate = rate;
        this.mTextBlock_Diamond.text = cost + "";
        this.mTextBlock_Rate.text = rate + "%";
    };

    /** 更改显示的花费 */
    public changeCost(count: number) {
        if (count <= 0) {
            this.changePanelUI(0, 0);
            return;
        }
        let rates = GlobalData.Dev.goldProbability;
        let costs = this.isGold ? GlobalData.Dev.goldCost : GlobalData.Dev.rainbowCost;
        if (count > rates.length) count = rates.length;
        let rate = rates[count - 1];
        let cost = costs[count - 1];
        this.changePanelUI(cost, rate);
    }

    protected onShow(...params: any[]): void {
        utils.showUITween(this);
    }

    public hide(): void {
        super.hide();
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }
}

