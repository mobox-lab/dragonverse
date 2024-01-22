import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import Fusepanel_Generate from "../../ui-generate/Fuse/Fusepanel_generate";
import MessageBox from "../../utils/MessageBox";
import { utils } from "../../utils/uitls";
import AchievementModuleC from "../AchievementModule/AchievementModuleC";
import { AnalyticsTool } from "../Analytics/AnalyticsTool";
import { PlayerModuleC } from "../Player/PlayerModuleC";
import { PetBagItem } from "./P_Bag";
import { PetBagModuleC } from "./PetBagModuleC";
import { petItemDataNew } from "./PetBagModuleData";




import { PetBag_Item } from "./P_BagItem";
export class P_FusePanel extends Fusepanel_Generate {
    private achievementModuleC: AchievementModuleC = null;

    /**当前容器中的所有item */
    private petItems: PetBag_Item[] = [];
    /**当前选中的所有宠物 */
    private curSelectPets: petItemDataNew[] = [];
    /**显示事件 */
    public onShowAC: Action = new Action();

    onStart(): void {
        this.mBtn_Close.onClicked.add(() => {
            this.hide();
        })
        this.mBtn_Fuse.onClicked.add(() => {
            this.onClickFuse();
        })
        this.achievementModuleC = ModuleService.getModule(AchievementModuleC);
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
            petItem.onHoverAC.clear()
            if (petItem.getLockVis()) {
                petItem.setLockVis(false);
            }
            this.petItems.push(petItem);
        })
        this.curSelectPets.length = 0;
        this.changeCost();
        super.show(...param);
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
        let isDiamondEnough = ModuleService.getModule(PlayerModuleC).isDiamondEnough(GlobalData.Fuse.cost);
        if (!isDiamondEnough) {
            this.hide();
            MessageBox.showOneBtnMessage(GameConfig.Language.Text_Fuse_UI_3.Value, () => {
                super.show();
            });
            return;
        }
        this.hide();
        MessageBox.showTwoBtnMessage(GameConfig.Language.Text_Fuse_UI_2.Value, async (res: boolean) => {
            if (res) {
                let isSuccess = await ModuleService.getModule(PlayerModuleC).reduceDiamond(GlobalData.Fuse.cost);
                if (!isSuccess) {
                    MessageBox.showOneBtnMessage(GameConfig.Language.Text_Fuse_UI_3.Value);
                    return;
                }
                let isCanDel = await this.delSelectPet();

                if (!isCanDel) {
                    this.curSelectPets.length = 0;
                    return;
                }
                await this.fusePet();
                this.changeCost();
                setTimeout(() => {
                    this.onShowAC.call();
                }, 500);
            } else {
                super.show();
            }
        })
    }

    /**合成宠物 */
    private async fusePet() {
        /**最多相同id的宠物数量 */
        let maxSameIdCount = 0;
        /**所有宠物攻击力的合 */
        let allPetAtk = 0;
        let countMap = new Map<number, number>();
        let devType = this.judgePetType();
        let allLength = this.curSelectPets.length;
        for (let i = 0; i < this.curSelectPets.length; i++) {
            let pet = this.curSelectPets[i];
            if (!countMap.has(pet.I)) {
                countMap.set(pet.I, 1);
            } else {
                let count = countMap.get(pet.I);
                countMap.set(pet.I, count + 1);
                if (count + 1 > maxSameIdCount) {
                    maxSameIdCount = count + 1;
                }
            }
            allPetAtk += pet.p.a;
        }
        if (maxSameIdCount == 0) maxSameIdCount = 1;
        let minAtk = allPetAtk / GlobalData.Fuse.minDamageRate;
        let maxAtk = allPetAtk / GlobalData.Fuse.maxDamageRate;
        let allPetIds: number[] = [];
        /**与最大攻击力差值 */
        //获取ts最大整数数值
        let max = Number.MAX_VALUE;
        let allMaxAtkDiff = max;
        /**攻击力差值最小的宠物id */
        let allMinAtkDiffPetId = 1;
        /**稀有度相同的最大攻击力差值 */
        let sameMaxAtkDiff = max;
        /**稀有度相同的攻击力差值最小的宠物id */
        let sameMinAtkDiffPetId = 0;
        GameConfig.PetARR.getAllElement().forEach(item => {
            if (item.IfFuse) {
                let atks = item.PetAttack;
                let min = atks[0];
                let max = atks[1];
                if (min >= minAtk && max <= maxAtk && item.DevType == devType) {
                    allPetIds.push(item.id);
                }
                let diff = Math.abs(max - maxAtk);
                if (diff < allMaxAtkDiff) {
                    allMaxAtkDiff = diff;
                    allMinAtkDiffPetId = item.id;
                }
                if (item.DevType == devType) {
                    if (diff < sameMaxAtkDiff) {
                        sameMaxAtkDiff = diff;
                        sameMinAtkDiffPetId = item.id;
                    }
                }
            }
        })
        if (allPetIds.length == 0) {
            let minAtkDiffPetId = sameMinAtkDiffPetId == 0 ? allMinAtkDiffPetId : sameMinAtkDiffPetId;
            allPetIds.push(minAtkDiffPetId);
        }
        let endPetId = this.getPetByAtkWeight(allPetIds, maxSameIdCount);
        AnalyticsTool.action_buy_pet(allLength, endPetId);
        this.achievementModuleC.broadcastAchievementBlendType(endPetId);
        await ModuleService.getModule(PetBagModuleC).addPet(endPetId, GlobalEnum.PetGetType.Fusion, this._earliestObtainTime);
    }

    /**根据各宠物攻击力权重获得宠物 */
    private getPetByAtkWeight(allPetIds: number[], maxCount: number): number {
        let count = maxCount / 2;
        let allPetAtk = 0;
        let petAtkWeights: number[] = [];
        allPetIds.forEach(id => {
            let pet = GameConfig.PetARR.getElement(id);
            let wight = pet.PetAttack[0] * count;
            allPetAtk += wight;
            petAtkWeights.push(wight);
        })
        let random = Math.random() * allPetAtk;
        let totalWeight = 0;
        for (let i = 0; i < petAtkWeights.length; i++) {
            totalWeight += petAtkWeights[i];
            if (random < totalWeight) {
                return allPetIds[i];
            }
        }
    }

    /**判断获得的宠物类型 普通0 黄金1 彩虹2 */
    private judgePetType(): number {
        let count = this.curSelectPets.length;
        //普通宠物的权重
        let normalWeight = -10 * count + 80;
        if (normalWeight < 0) normalWeight = 0;
        //黄金宠物的权重
        let goldWeight = -4 * count + 52;
        if (goldWeight < 0) goldWeight = 0;
        //彩虹宠物的权重
        let rainbowWeight = -2 * count + 32;
        if (rainbowWeight < 0) rainbowWeight = 0;
        let totalWeight = normalWeight + goldWeight + rainbowWeight;
        let random = Math.random() * totalWeight;
        if (random < normalWeight) {
            return 0;
        }
        if (random < normalWeight + goldWeight) {
            return 1;
        }
        return 2;
    }
    private _earliestObtainTime: number = 0;
    /**删除选中宠物 */
    private async delSelectPet() {
        let keys = [];
        this.curSelectPets.forEach(item => {
            keys.push(item.k);
        })

        this._earliestObtainTime = this.curSelectPets[0].obtainTime;
        this.curSelectPets.forEach(item => {
            if (item.obtainTime < this._earliestObtainTime) {
                this._earliestObtainTime = item.obtainTime;
            }
        });
        return await ModuleService.getModule(PetBagModuleC).fuseEvent(keys);
    }

    /**改变花费 */
    private changeCost() {
        let count = this.curSelectPets.length;
        this.mText_Money.text = utils.formatNumber(GlobalData.Fuse.cost);
        if (count < GlobalData.Fuse.minFuseCount) {
            this.mText_Number.text = utils.Format(GameConfig.Language.Page_UI_Tips_13.Value, count);
        } else {
            this.mText_Number.text = utils.Format(GameConfig.Language.Text_Fuse_UI_1.Value, count);
        }
    }

}
