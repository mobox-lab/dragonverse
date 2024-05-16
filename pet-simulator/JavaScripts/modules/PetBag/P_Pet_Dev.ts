import {GameConfig} from "../../config/GameConfig";
import {GlobalEnum} from "../../const/Enum";
import {GlobalData} from "../../const/GlobalData";
import Dev_Generate from "../../ui-generate/Pet/Dev_generate";
import MessageBox from "../../util/MessageBox";
import {utils} from "../../util/uitls";
import AchievementModuleC from "../AchievementModule/AchievementModuleC";
import {AnalyticsTool} from "../Analytics/AnalyticsTool";
import {PlayerModuleC} from "../Player/PlayerModuleC";
import {PetBagItem} from "./P_Bag";
import {PetBagModuleC} from "./PetBagModuleC";
import {petItemDataNew} from "./PetBagModuleData";


import {PetBag_Item} from "./P_BagItem";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import { PetBagModuleS } from "./PetBagModuleS";

export class P_Pet_Dev extends Dev_Generate {
    private achievementModuleC: AchievementModuleC = null;
    /**当前容器中的所有item */
    private petItems: PetBag_Item[] = [];
    /**当前概率 */
    private curRate: number = 0;
    /**当前花费 */
    private curCost: number = 0;
    /**当前宠物id */
    private curPetId: number = 0;
    /**当前合并数量 */
    private curCount: number = 0;
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
        this.achievementModuleC = ModuleService.getModule(AchievementModuleC);
				mw.Event.addServerListener("P_PET_DEV_SHOW_FUSE_MESSAGE",
					 this.showFuseMessage
				);
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
						default: break;
				}
		}

    /**开始合成 */
    private async startDev() {
        let isSuccess = ModuleService.getModule(PlayerModuleC).isDiamondEnough(this.curCost);
        if (!isSuccess) {
            MessageBox.showOneBtnMessage(GameConfig.Language.Text_Fuse_UI_3.Value, () => {
                super.show();
            });
            return;
        }
        let keys: number[] = [];
        let petIds: number[] = [];
        this.curSelectPets.forEach(item => {
            keys.push(item.k);
            petIds.push(item.I);
        });
        //计算最早的获取时间
        let earliestObtainTime = this.curSelectPets[0].obtainTime;
        this.curSelectPets.forEach(item => {
            if (item.obtainTime < earliestObtainTime) {
                earliestObtainTime = item.obtainTime;
            }
        });

        let isCanDel = ModuleService
            .getModule(PetBagModuleC)
            .checkFuseAble(this.curSelectPets.map(item => item.k))

        this.curSelectPets.length = 0;

        if (!isCanDel) {
            MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_11.Value);
            return;
        }
        await ModuleService.getModule(PetBagModuleC).fuseDevPet(this.curPetId, this.isGold, this.curRate, earliestObtainTime, petIds);
    }

    public show(petItems: petItemDataNew[], isGold: boolean, ...param: any[]): void {
        PetBagItem.instance.UIPool.resetAll();

        this.curSelectPets.length = 0;
        this.isGold = isGold;
        this.mTextBlock_Intro.text = isGold ? GameConfig.Language.Dev_TextBlock_Intro_1.Value : GameConfig.Language.Dev_TextBlock_Intro_2.Value;
        this.mTextBlock_Explain.text = isGold ? GameConfig.Language.Dev_TextBlock_Explain_1.Value : GameConfig.Language.Dev_TextBlock_Explain_2.Value;

        this.petItems.length = 0;
        petItems.forEach(item => {
            let isSuccess: boolean = false;
            let info = GameConfig.PetARR.getElement(item.I);
            if (isGold) {
                isSuccess = info.DevType == 0;
            } else {
                isSuccess = info.DevType == 1;
            }
            if (!isSuccess) return;

            let petItem = PetBagItem.instance.UIPool.get();
            petItem.setClickFun(this.changeContainer.bind(this), this);
            petItem.onHoverAC.clear();
            this.mCanvas_List.addChild(petItem.uiObject);

            petItem.init(item);
            this.petItems.push(petItem);
        });
        this.curCount = 0;
        this.changeCost(this.curCount, 0);
        super.show(...param);
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            this.hide();
        });
    }

    /**改变目前容器展示 */
    public changeContainer(bagItem: PetBag_Item) {
        this.curPetId = bagItem.petData.I;
        bagItem.setLockVis(!bagItem.getLockVis());

        let isEquip = bagItem.getLockVis();
        isEquip ? this.curCount++ : this.curCount--;
        if (this.curCount <= 0) {
            this.curPetId = 0;
            this.curCount = 0;
            this.petItems.forEach(item => {
                item.setVisible(mw.SlateVisibility.SelfHitTestInvisible);
            });
        } else if (this.curCount == 1 && isEquip) {
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
        this.curCount > 0 ? this.curSelectPets.push(bagItem.petData) : this.curSelectPets.length = 0;
        this.changeCost(this.curCount, bagItem.petData.I);
    }

    /**改变花费 */
    public changeCost(count: number, petId: number) {
        if (count <= 0) {
            this.curCost = 0;
            this.curRate = 0;
            this.mTextBlock_Rate.text = "0%";
            this.mTextBlock_Diamond.text = "0";
            return;
        }
        let rates = GlobalData.Dev.goldProbability;
        let costs = this.isGold ? GlobalData.Dev.goldCost : GlobalData.Dev.rainbowCost;
        if (count > rates.length) count = rates.length;
        let rate = rates[count - 1];
        let cost = costs[count - 1];
        this.curCost = cost;
        this.curRate = rate;
        this.mTextBlock_Rate.text = rate + "%";
        this.mTextBlock_Diamond.text = cost + "";
        this.curPetId = petId;
    }

    protected onShow(...params: any[]): void {
        utils.showUITween(this);
    }

    public hide(): void {
        super.hide();
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }
}

