import Gtk from "gtoolkit";
import Log4Ts from "mw-log4ts";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import EnchantsPanel_Generate from "../../ui-generate/Enchants/EnchantsPanel_generate";
import Enchants_item_Generate from "../../ui-generate/Enchants/Enchants_item_generate";
import { oTraceError } from "../../util/LogManager";
import MessageBox from "../../util/MessageBox";
import { utils } from "../../util/uitls";
import { PetBagItem } from "./P_Bag";
import { PetBag_Item } from "./P_BagItem";
import { PetBagModuleC } from "./PetBagModuleC";
import { PetBagModuleData, petItemDataNew } from "./PetBagModuleData";

export enum EnchantPetState {
    IS_ALL_ENCHANT = "is_all_enchant", // 已经全部附魔 会重置其中一条
    IS_HAS_ENCHANT = "is_has_enchant",
    HAS_NO_ENCHANT = "has_no_enchant",
    NO_SELECTED_PET = "no_selected_pet",
    // status
    NO_ENOUGH_DIAMOND = "no_enough_diamond",
    SUCCESS = "is_ok",
    FAILED = "is_failed",
}

export class P_Enchants extends EnchantsPanel_Generate {
    /**是否第一次打开 */
    private isFirstOpen: boolean = true;
    /**特效 */
    private effect: mw.Effect;
    /**特效唯一标识 */
    private effectId: number;
    /**词条item */
    private enchantItems: EnchantItem[] = [];
    /**宠物item */
    private petItems: PetBag_Item[] = [];

    /**选中的宠物key*/
    private selectPetKey: number | null = null;
    /**选中的附魔词条 - 选中宠物已有俩词条时*/
    private selectEnchantId: number | null = null;
    /**左侧附魔信息面板*/
    private enchantItemsUI: EnchantItem[] = [];

    public onUpdateAc: Action1<boolean> = new Action1();

    /**是否正在附魔 */
    private isEnchanting: boolean = false;
    private bagData: PetBagModuleData;
    public msgUIShowing: boolean = false;
    onStart() {
        this.mButton.onClicked.add(() => {
            if (this.isEnchanting) {
                this.stopEnchant();
            }
            this.hide();
        });
        this.mButton_Enchant.normalImageGuid = GlobalData.Enchant.enchantBtnGuid[0];
        this.mButton_Enchant.onClicked.add(this.onClickEnchant.bind(this));
        this.bagData = DataCenterC.getData(PetBagModuleData);
    }
	
    /**播放特效 */
    private playEffect() {
		this.onUpdateAc.call(true);
		this.effectId = EffectService.playOnGameObject(GlobalData.Enchant.effectGuid, GameObject.findGameObjectById(GlobalData.Enchant.effectTargetGuid) , {
			position: new Vector(...GlobalData.Enchant.effectPos),
			scale: new Vector(...GlobalData.Enchant.effectScale)
		})
		EffectService.getEffectById(this.effectId).then((eff) => {
			this.effect = eff;
			this.effect.onFinish.clear();
			this.effect.onFinish.add(() => {
				this.onUpdateAc.call(false);
				this.onEnchantFinish();
			});
		})
    }

    public initPanel() {
        let petData = this.bagData.sortBag();
        PetBagItem.instance.UIPool.resetAll();

        this.selectPetKey = null;
        this.petItems = [];

        for (let i = 0; i < petData.length; i++) {
            const element = petData[i];
            let item = PetBagItem.instance.UIPool.get();
            item.init(element);

            item.setClickFun(this.onClickItem.bind(this), this);
            item.uiObject.size = item.rootCanvas.size;	
            this.mlistCanvas.addChild(item.uiObject);
            // if (this.petItems.includes(item)) continue;
            this.petItems.push(item);
        }

        this.isCanClickBtn();
    }

    public showPanel(petData: petItemDataNew[]) {
        if (this.isFirstOpen) {
            this.isFirstOpen = false;
        }

        this.initPanel();
        this.updateEnchantIntroPanel();
        this.show();
    }

    /** 附魔成功后更新面板 UI */
    public updatePetPanelUI() {
        const preSelectedPetKey = this.selectPetKey;
        this.initPanel();
        const petItems = this.petItems;
        for (let i = 0; i < petItems?.length; i++) {
            const ele = petItems[i];
            const newPet = this.bagData.bagItemsByKey(ele.petData.k);
            ele.init(newPet);
        }
        const selectedItem = petItems.find(
            (item) => item.petData.k === preSelectedPetKey,
        );
        selectedItem.setLockVis(true);
        this.selectPetKey = preSelectedPetKey;
        this.isCanClickBtn();
        this.updateEnchantIntroPanel();
    }

    private setPetInfoRarityUI(type: number) {
        const quality = GlobalEnum.PetQuality;
        switch (type) {
            case quality.Normal: {
                this.textRarity.text = GameConfig.Language.PetARR_Quality_1.Value;
                this.picRarity.imageGuid = GlobalData.Enchant.enchantPetRarityGuid[0];
                return;
            }
            case quality.Rare: {
                this.textRarity.text = GameConfig.Language.PetARR_Quality_2.Value;
                this.picRarity.imageGuid = GlobalData.Enchant.enchantPetRarityGuid[1];
                return;
            }
            case quality.Epic: {
                this.textRarity.text = GameConfig.Language.PetARR_Quality_3.Value;
                this.picRarity.imageGuid = GlobalData.Enchant.enchantPetRarityGuid[2];
                return;
            }
            case quality.Legend: {
                this.textRarity.text = GameConfig.Language.PetARR_Quality_4.Value;
                this.picRarity.imageGuid = GlobalData.Enchant.enchantPetRarityGuid[3];
                return;
            }
            case quality.Myth: {
                this.textRarity.text = GameConfig.Language.PetARR_Quality_5.Value;
                this.picRarity.imageGuid = GlobalData.Enchant.enchantPetRarityGuid[4];
                return;
            }
            default: {
                this.textRarity.text = GameConfig.Language.PetARR_Quality_1.Value;
                this.picRarity.imageGuid = GlobalData.Enchant.enchantPetRarityGuid[0];
                return;
            }
        }
    }

    /**左侧附魔详情面板 */
    public updateEnchantIntroPanel() {
        this.mCanvas_Entrylist.removeAllChildren(); // 清除上一次的UI
        const curSelectPetInfo = this.petItems.find(
            (pet) => pet.petData.k === this.selectPetKey,
        );
        Log4Ts.log(
            P_Enchants,
            "======== updateEnchantIntroPanel curSelectPetInfo =======" +
            " id:" +
            curSelectPetInfo?.petData?.I +
            " key:" +
            curSelectPetInfo?.petData?.k +
            " name:" +
            curSelectPetInfo?.petData?.p?.n +
            " buff:" +
            curSelectPetInfo?.petData?.p?.b +
            " enchantCnt:" +
            curSelectPetInfo?.petData?.enchantCnt,
        );
        this.mTextBlock_Enchant.text = GameConfig.Language.Tips_Enchants_7.Value;
        if (!curSelectPetInfo?.petData?.I) {
            this.mPetInfo.visibility = mw.SlateVisibility.Collapsed;
            return;
        }
        const curPetData = curSelectPetInfo.petData;
        const buffIds = Array.from(curPetData.p.b);

        this.mPetInfo.visibility = mw.SlateVisibility.Visible;
        const cfg = GameConfig.PetARR.getElement(curPetData.I);
        this.mNameBig.text = cfg.petName;
        this.mNameSmall.text = curSelectPetInfo.petData.p.n;

        this.picLovelovelove.renderOpacity =
            cfg.DevType === GlobalEnum.PetDevType.Love ? 1 : 0.4;
        this.picRainbowowow.renderOpacity =
            cfg.DevType === GlobalEnum.PetDevType.Rainbow ? 1 : 0.4;

        this.setPetInfoRarityUI(cfg.QualityType);

        const isMyth = cfg.QualityType === GlobalEnum.PetQuality.Myth;

        if (isMyth) {
            const top = buffIds.pop();
            let item = mw.UIService.create(EnchantItem);
            item.setCfgId(top, true);
            item.uiObject.size = item.mCanvas.size;
            this.mCanvas_Entrylist.addChild(item.uiObject);
        }

        const len = buffIds?.length ?? 0; // 两词条则可选择一词条重铸
        const isReEnchant = len >= 2; // 两词条则可选择一词条重铸
        const items = [];
        for (let i = 0; i < len; i++) {
            const buffId = buffIds[i];
            let item = mw.UIService.create(EnchantItem);
            if (isReEnchant) {
                this.mTextBlock_Enchant.text = GameConfig.Language.Enchants_new006.Value;
                if (i === 0) { // 默认选择第一个词条
                    this.selectEnchantId = buffId;
                    item.setSelectState(true);
                }
                // 两词条则可选择一词条重铸
                item.onClickAc.add(() => {
                    const preId = this.selectEnchantId;
                    const isSelected = preId === buffId;
                    if (isSelected) return;
                    this.enchantItemsUI
                        .find((item) => item?.cfgId === preId)
                        ?.setSelectState(false); // 把原来的select取消
                    this.selectEnchantId = buffId;
                    item.setSelectState(true);
                });
            }
            item.uiObject.size = item.mCanvas.size;
            item.setCfgId(buffId);
            this.mCanvas_Entrylist.addChild(item.uiObject);
            items.push(item);
        }
        const emptyItemLen = len === 3 ? 0 : 2 - len; // 神话宠物可能有三个词条 
        if (emptyItemLen) {
			if(emptyItemLen === 2) this.selectEnchantId = null; // 
            // 不满两词条则空 item 补到两词条
            for (let i = 0; i < emptyItemLen; i++) {
                const emptyItem = mw.UIService.create(EnchantItem);
                emptyItem.uiObject.size = emptyItem.mCanvas.size;
                if (i === 0) emptyItem.setSelectState(true);
                else emptyItem.setUnlockUI();
                if (emptyItemLen === 1 && len === 1) emptyItem.setEmptyUI(1); // len === 1 的情况 
                this.mCanvas_Entrylist.addChild(emptyItem.uiObject);
            }
        }
        this.enchantItemsUI = items;
    }

    /**点击宠物item */
    private onClickItem(item: PetBag_Item) {
        if(this.msgUIShowing) return;
        if (this.isEnchanting) {
            oTraceError("正在附魔中");
            return;
        }
        this.updateSelectKey(item);
    }
    /**更新选择key */
    private updateSelectKey(item: PetBag_Item) {
        const isSelected = this.selectPetKey === item.petData.k;
        if (this.selectPetKey) {
            const preSelectPet = this.petItems.find((item) => item.petData.k === this.selectPetKey);
            preSelectPet.setLockVis(false);
            this.selectPetKey = null;
        }
        this.selectPetKey = isSelected ? null : item.petData.k;
        item.setLockVis(!isSelected);
        this.isCanClickBtn();
        this.updateEnchantIntroPanel();
    }

    /**判断是否可点击按钮 */
    private isCanClickBtn() {
        const canClick = !Gtk.isNullOrUndefined(this.selectPetKey);
        this.mButton_Enchant.enable = canClick;
        this.updateCost(this.selectPetKey);
        return canClick;
    }

    /**更新钻石花费 */
    private async updateCost(selectPetKey: number | null) {
        const petBagMC = ModuleService.getModule(PetBagModuleC);
        const cost = await petBagMC.getEnchantCost(selectPetKey);
        this.mTextBlock_Cost.text = utils.formatNumber(cost);
    }

    /**点击附魔按钮 */
    private async onClickEnchant() {
        if (this.isEnchanting) {
            //正在附魔 不允许点击
            oTraceError("正在附魔中");
            return;
        }
        const petBagMC = ModuleService.getModule(PetBagModuleC);
        const enchantPetState = await petBagMC.getPetEnchantState(this.selectPetKey);
        
        const startEnchantFn = async (isOK: boolean) => { 
            this.msgUIShowing = false;
            if (!isOK) return;
            const res = await petBagMC.enchant(this.selectPetKey, this.selectEnchantId);
            if (res === EnchantPetState.NO_ENOUGH_DIAMOND) {
                this.msgUIShowing = true;
                MessageBox.showOneBtnMessage(GameConfig.Language.Text_Fuse_UI_3.Value, () => {
                    super.show();
                }, 0, () => { this.msgUIShowing = false });
                return;
            }
            if (res === EnchantPetState.FAILED) {
                console.error("附魔出错"); 
                return;
            }
            this.startEnchant(); // 特效等
        };
        
        const hideFn = () => {
            this.msgUIShowing = false;
        };

        this.msgUIShowing = true; 
        switch (enchantPetState) {
            case EnchantPetState.IS_ALL_ENCHANT: {
                MessageBox.showTwoBtnMessage(GameConfig.Language.Tips_Enchants_2.Value, startEnchantFn, 0, 0, hideFn);
                break;
            }
            case EnchantPetState.HAS_NO_ENCHANT:
            case EnchantPetState.IS_HAS_ENCHANT: {
                MessageBox.showTwoBtnMessage(GameConfig.Language.Tips_Enchants_1.Value, startEnchantFn, 0, 0, hideFn);
                break;
            }
            default:
                this.msgUIShowing = false;
                break;
        }
    }

    /**开始附魔
     * @param tarEnchant 目标附魔数组
     * @param petKeyArr 宠物key数组
     */
    private async startEnchant() {
        if(this.isEnchanting) return;
        this.setEnchantBtnClickState(false);
        this.moveUI(false);
        this.playEffect();
    }

    /**停止附魔 */
    private stopEnchant() {
		this.onEnchantFinish();
	}

    /**展示结果 */
    private onEnchantFinish() {
		this.onUpdateAc.call(false);
		this.effect.onFinish?.clear(); 
        this.moveUI(true);
        //附魔结束
        this.setEnchantBtnClickState(true);
    }

    /**设置附魔按钮点击态 */
    private setEnchantBtnClickState(isCan: boolean) {
        this.isEnchanting = !isCan;
        let char = Player.localPlayer.character;
        char.movementEnabled = isCan;
        char.jumpEnabled = isCan;
        this.mTextBlock_Enchant.text = isCan
            ? GameConfig.Language.Tips_Enchants_7.Value
            : GameConfig.Language.Tips_Enchants_8.Value;
        this.mButton_Enchant.normalImageGuid = isCan
            ? GlobalData.Enchant.enchantBtnGuid[0]
            : GlobalData.Enchant.enchantBtnGuid[1];
    }

    /**移走ui */
    private moveUI(isMoveShow: boolean) {
        if (isMoveShow) {
            this.rootCanvas.position = new mw.Vector2(0, 0);
        } else {
            this.rootCanvas.position = new mw.Vector2(-2000, 0);
        }
    }

    onHide() {
        PetBagItem.instance.UIPool.resetAll();
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }

    protected onShow(...params: any[]): void {
        this.isCanClickBtn();
        this.msgUIShowing = false;
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            if (this.isEnchanting) {
                this.stopEnchant();
            }
            this.hide();
        });
    }
}

/**词条item */
class EnchantItem extends Enchants_item_Generate {
    public cfgId: number = 0;
    private isChoose: boolean = false;
    public onClickAc: Action = new Action();

    onStart() {
        this.setEmptyUI();
        if (this.isChoose) this.picSelect.visibility = mw.SlateVisibility.Visible;
        else this.picSelect.visibility = mw.SlateVisibility.Hidden;
        this.mButton_Entry.onClicked.add(() => {
            this.onClickAc.call();
        });
    }

    // idx 0 槽位1， idx 1 槽位2
    public setEmptyUI(idx?: number) {
        this.mButton_Entry.normalImageGuid = GlobalData.Enchant.enchantItemGuid[3];
        Gtk.trySetVisibility(this.can_SlotText, mw.SlateVisibility.Visible);
        this.text_Slot.text = idx ? GameConfig.Language.Enchants_new008.Value : GameConfig.Language.Enchants_new004.Value;
        Gtk.trySetVisibility(this.mTextBlock_Entry, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.textEnhanceName, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.textScoreNumber, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.textScoreUp, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.picScore, mw.SlateVisibility.Collapsed);
    }

    public setUnlockUI() {
        this.mButton_Entry.normalImageGuid = GlobalData.Enchant.enchantItemGuid[4]; // 未解锁
        Gtk.trySetVisibility(this.can_SlotText, mw.SlateVisibility.Visible);
        this.text_Slot.text = GameConfig.Language.Enchants_new005.Value;
        Gtk.trySetVisibility(this.mTextBlock_Entry, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.textEnhanceName, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.textScoreNumber, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.textScoreUp, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.picScore, mw.SlateVisibility.Collapsed);
    }

    private getBgImageGuid(cfgId: number) {
        if (
            cfgId >= GlobalData.Enchant.mythEnchantIdRange[0] &&
            cfgId <= GlobalData.Enchant.mythEnchantIdRange[1]
        ) {
            return GlobalData.Enchant.enchantItemGuid[2];
        }
        if (
            cfgId >= GlobalData.Enchant.specialEnchantIdRange[0] &&
            cfgId <= GlobalData.Enchant.specialEnchantIdRange[1]
        ) {
            return GlobalData.Enchant.enchantItemGuid[1];
        }
        return GlobalData.Enchant.enchantItemGuid[0];
    }

    /**设置配置id */
    public setCfgId(cfgId: number, isLock?: boolean) {
        this.cfgId = cfgId;
        const cfg = GameConfig.Enchants.getElement(cfgId);
        if (!cfg) return;
        this.mButton_Entry.normalImageGuid = this.getBgImageGuid(cfgId);
        this.textEnhanceName.text = cfg.Name;
        this.mTextBlock_Entry.text = utils.Format(cfg.Describe, cfg.Degree);
        this.textScoreNumber.text = utils.formatNumber(cfg.RankScore ?? 0);
        Gtk.trySetVisibility(this.can_SlotText, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.picScore, mw.SlateVisibility.HitTestInvisible);
        Gtk.trySetVisibility(this.textEnhanceName, mw.SlateVisibility.HitTestInvisible);
        Gtk.trySetVisibility(this.mTextBlock_Entry, mw.SlateVisibility.HitTestInvisible);
        Gtk.trySetVisibility(this.textScoreNumber, mw.SlateVisibility.HitTestInvisible);
        Gtk.trySetVisibility(this.textScoreUp, mw.SlateVisibility.HitTestInvisible);
        if (isLock) {
            Gtk.trySetVisibility(this.picSelect, mw.SlateVisibility.Visible);
            this.picSelect.imageGuid = GlobalData.Enchant.enchantSelectIconGuid[1];
        }
    }

    /**选中态 */
    public get SelectState(): boolean {
        return this.isChoose;
    }

    public setSelectState(isChoose: boolean) {
        this.isChoose = isChoose;
        if (this.isChoose) this.picSelect.visibility = mw.SlateVisibility.Visible;
        else this.picSelect.visibility = mw.SlateVisibility.Hidden;
    }
}
