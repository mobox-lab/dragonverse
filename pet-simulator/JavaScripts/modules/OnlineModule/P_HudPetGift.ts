import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import HUDpetGift_Generate from "../../ui-generate/hud/HUDpetGift_generate";
import PetStateItemUI_Generate from "../../ui-generate/hud/PetStateItemUI_generate";
import { utils } from "../../util/uitls";
import { P_HudPet2 } from "../Hud/P_HudPet2";
import { P_Bag, P_ReName } from "../PetBag/P_Bag";
import { PetBagModuleC } from "../PetBag/PetBagModuleC";
import { petItemDataNew } from "../PetBag/PetBagModuleData";
import { PetState } from "../Player/PetBehavior";
import { P_RewardPanel } from "./P_RewardPanel";

export class P_HudPetGift extends HUDpetGift_Generate {

    /**领取按钮 */
    public onBtnAC: Action = new Action();
    /**红点提示事件key */
    public onRedPointAC: Action1<number[]> = new Action1();
    /**打开背包事件 */
    public onOpenBagAC: Action1<number[]> = new Action();

    /**红点提示数组 */
    private redPointArr: number[] = [];

    onStart() {
        this.layer = mw.UILayerScene;
        this.mBtn_Gift.onClicked.add(() => {
            if (!UIService.getUI(P_RewardPanel, false) || !UIService.getUI(P_RewardPanel).visible) {
                this.onBtnAC.call();
            } else {
                UIService.getUI(P_RewardPanel).mBtn_Close.onClicked.broadcast();
            }
        });
        this.mBtn_Pet.onClicked.add(() => {
            this.onOpenBagAC.call(this.redPointArr);
        });

        this.mCanvas_Point.visibility = mw.SlateVisibility.Collapsed;
        this.onRedPointAC.add(this.addRedPoint, this);

        KeyOperationManager.getInstance().onKeyUp(this, Keys.B, () => {
            const bagUI = UIService.getUI(P_Bag);
            if(bagUI?.reNameUI?.visible) return;
            if(bagUI.visible) {
                bagUI.hide();
            } else ModuleService.getModule(PetBagModuleC).showBag();
        });
    }

    /**添加红点提示 */
    public addRedPoint(keys: number[]) {
        if(!keys?.length) return;
        this.redPointArr.push(...keys);
        if (this.mCanvas_Point.visible == false) {
            this.mCanvas_Point.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        }
        this.mText_Point.text = this.redPointArr.length.toString();
    }

    /**移除红点提示 */
    public removeRedPoint(keys: number[]) {
        keys.forEach(key => {
            if (this.redPointArr.indexOf(key) != -1) {
                this.redPointArr.splice(this.redPointArr.indexOf(key), 1);
            }
        });
        this.mText_Point.text = this.redPointArr.length.toString();
    }

    /**清空红点 */
    public clearRedPoint() {
        this.redPointArr.length = 0;
        if (this.mCanvas_Point.visible == true) {
            this.mCanvas_Point.visibility = mw.SlateVisibility.Collapsed;
        }
    }

    public setBagText(curPetCount: number, allCount: number) {
        this.mText_Pet.text = curPetCount + "/" + allCount;
        mw.UIService.getUI(P_HudPet2).mText_Pet.text = curPetCount + "/" + allCount;
    }

    public canGet() {
        this.mText_Gift.text = GameConfig.Language.Text_ItemUI_2.Value;
        this.mMaskPrograss_Gift.fanShapedValue = 1;
    }

    /**领完了 */
    public geted() {
        this.mText_Gift.text = GameConfig.Language.Text_ItemUI_8.Value;
        this.mMaskPrograss_Gift.fanShapedValue = 1;
    }

    private timeInter: any;

    /**当前事件 、总时间 */
    public updateTime(time: number, totalTime: number) {

        let startTime = totalTime - time;

        this.clearTimeInter();
        let strTime = "";

        this.timeInter = TimeUtil.setInterval(() => {
            if (time >= 0) {
                strTime = utils.parseTime(time);
                time--;
                this.mText_Gift.text = (strTime);
                startTime++;
                this.updateProgress(startTime, totalTime);
            } else {
                this.clearTimeInter();
                this.canGet();
            }
        }, 1);

    }

    /**更新进度条 */
    private updateProgress(curLevel: number, maxLevel: number) {
        this.mMaskPrograss_Gift.fanShapedValue = curLevel / maxLevel;
    }

    private clearTimeInter() {
        if (this.timeInter) {
            TimeUtil.clearInterval(this.timeInter);
            this.timeInter = null;
        }
    }

    private _lastAttackTarget: Map<number, number> = new Map();
    private _battlePetUIs: Map<number, PetStateItemUI_Generate> = new Map();
    private _petState: Map<number, PetState> = new Map();

    getPetBgGuid(quality: GlobalEnum.PetQuality) {
        switch (quality) {
            case GlobalEnum.PetQuality.Normal:
                return GlobalData.pet.petStatePetRarityGuid[0];
            case GlobalEnum.PetQuality.Rare:
                return GlobalData.pet.petStatePetRarityGuid[1];
            case GlobalEnum.PetQuality.Epic:
                return GlobalData.pet.petStatePetRarityGuid[2];
            case GlobalEnum.PetQuality.Legend:
                return GlobalData.pet.petStatePetRarityGuid[3];
            case GlobalEnum.PetQuality.Myth:
                return GlobalData.pet.petStatePetRarityGuid[4];
        }
    }

    setBattlePets(keys: number[], petArr: petItemDataNew[]) {
        this.petStateCanvas.removeAllChildren();
        this._battlePetUIs.clear();
        this._petState.clear();
        this._lastAttackTarget.clear();
        petArr.forEach((pet, index) => {
            //petId是宠物表的id，keys存了对应宠物的唯一id
            let petStateItem = UIService.create(PetStateItemUI_Generate);
            const petCfg = GameConfig.PetARR.getElement(pet.I);
            if (petCfg) {
                petStateItem.petImg.imageGuid = petCfg.uiGuid;
                petStateItem.textAttack.text = utils.formatNumber(pet.p.a)

                const enchantNum = pet.p.b?.length ?? 0; // 拥有的附魔词条数目
                if (enchantNum) {
                    petStateItem.textEnhancenum.text = utils.formatNumber(enchantNum);
                    petStateItem.imgEnhance.visibility = mw.SlateVisibility.Visible;
                } else petStateItem.imgEnhance.visibility = mw.SlateVisibility.Collapsed;

                const devType = petCfg.DevType;
                if (devType === GlobalEnum.PetDevType.Love || devType === GlobalEnum.PetDevType.Rainbow) {
                    petStateItem.imgLoveRainbow.visibility = mw.SlateVisibility.Visible;
                    petStateItem.imgLoveRainbow.imageGuid = devType === GlobalEnum.PetDevType.Love ? GlobalData.Bag.itemSpecialIconGuid[0] : GlobalData.Bag.itemSpecialIconGuid[1];
                } else petStateItem.imgLoveRainbow.visibility = mw.SlateVisibility.Collapsed;

                // 2024.06.21 攻击力不需要变颜色了， 始终按照设计稿的白色即可。
                // const buffIds = pet?.p?.b ?? [];
                // const maxBuffId = buffIds?.length ? Math.max(...buffIds) : null;
                // if (maxBuffId) { // 设置颜色
                //     const color = GameConfig.Enchants.getElement(maxBuffId).Color;
                //     petStateItem.textAttack.contentColor = mw.LinearColor.colorHexToLinearColor(color);
                // } else petStateItem.textAttack.setFontColorByHex("#FFFFFFFF");
            }
            petStateItem.attackImg.visibility = mw.SlateVisibility.Collapsed;
            petStateItem.img_Background.imageGuid = this.getPetBgGuid(petCfg.QualityType as GlobalEnum.PetQuality);
            petStateItem.mBtn_Pet.onHovered.add(() => {
                petStateItem.itemCanvas.renderScale = GlobalData.pet.petStateImgHoverScale;
            });
            petStateItem.mBtn_Pet.onUnhovered.add(() => {
                petStateItem.itemCanvas.renderScale = GlobalData.pet.petStateImgNormalScale;
            });
            petStateItem.mBtn_Pet.onClicked.add(() => {
                //只检查上次攻击的目标存不存在，内部会检查是否存在资源
                //是否正在攻击
                if (this._petState.get(keys[index]) === PetState.Idle && this._lastAttackTarget.has(keys[index])) {
                    //攻击目标
                    let attackTarget = this._lastAttackTarget.get(keys[index]);
                    if (attackTarget) Event.dispatchToLocal(GlobalEnum.EventName.PetAttack, Player.localPlayer.playerId, keys[index], attackTarget);
                } else if (this._petState.get(keys[index]) === PetState.Attack) {
                    Event.dispatchToLocal(GlobalEnum.EventName.CancelPetAttack, Player.localPlayer.playerId, keys[index]);
                }
            });

            this.petStateCanvas.addChild(petStateItem.uiObject);
            this._battlePetUIs.set(keys[index], petStateItem);
            this._petState.set(keys[index], PetState.Idle);
        });
    }

    private _clearTimeout: any;

    changePetState(key: number, state: PetState, attackTarget?: number) {
        if (!this._battlePetUIs.has(key)) return;
        let ui = this._battlePetUIs.get(key);
        switch (state) {
            case PetState.Attack:
                ui.attackImg.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this._lastAttackTarget.set(key, attackTarget);
                //开始计时
                if (this._clearTimeout) {
                    //如果有清除上一次的计时器，重新开始计时
                    clearTimeout(this._clearTimeout);
                    this._clearTimeout = null;
                }
                this._clearTimeout = setTimeout(() => {
                    this._lastAttackTarget.set(key, null);
                }, 30e3);
                break;
            case PetState.Idle:
                ui.attackImg.visibility = mw.SlateVisibility.Collapsed;
                break;
        }
        this._petState.set(key, state);
    }

}   