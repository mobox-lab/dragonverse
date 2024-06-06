import { GameConfig } from '../../config/GameConfig';
import { GlobalEnum } from '../../const/Enum';
import { GlobalData } from '../../const/GlobalData';
import EnchantsPanel_Generate from '../../ui-generate/Enchants/EnchantsPanel_generate';
import Enchants_item_Generate from '../../ui-generate/Enchants/Enchants_item_generate';
import { oTraceError } from '../../util/LogManager';
import MessageBox from '../../util/MessageBox';
import { numberArrToString, utils } from '../../util/uitls';
import { P_PetHover } from '../PetCollect/P_Collect';
import { PlayerModuleC } from '../Player/PlayerModuleC';
import { BagTool } from './BagTool';
import { PetBagModuleData, petItemDataNew } from './PetBagModuleData';
import { AnalyModel, AnalyticsTool, Page } from '../Analytics/AnalyticsTool';
import { PetBagItem } from './P_Bag';

import { PetBag_Item } from './P_BagItem';
import KeyOperationManager from '../../controller/key-operation-manager/KeyOperationManager';
import { PetBagModuleC } from './PetBagModuleC';
import Gtk from '../../util/GToolkit';
import { IEnchantsElement } from '../../config/Enchants';

export enum EnchantPetState {
    IS_SAME_ENCHANT = 'is_same_enchant',
    IS_HAS_ENCHANT = 'is_has_enchant',
    HAS_NO_ENCHANT = 'has_no_enchant',
    NO_SELECTED_PET = 'no_selected_pet',
		// status
    NO_ENOUGH_DIAMOND = 'no_enough_diamond',
		SUCCESS = 'is_ok',
    FAILED = 'is_failed',
}
export class P_Enchants extends EnchantsPanel_Generate {
    /**是否第一次打开 */
    private isFirstOpen: boolean = true;
    /**特效 */
    private effect: mw.Effect;
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
    private enchantInterval: any;

    onStart() {	
				this.mButton.onClicked.add(() => {
					if (this.isEnchanting) {
							this.stopEnchant();
					}
					this.hide(); 
				});
        this.getEffect();
        this.mButton_Enchant.normalImageGuid = GlobalData.Enchant.enchantBtnGuid[0];
        this.mButton_Enchant.onClicked.add(this.onClickEnchant.bind(this));
        this.bagData = DataCenterC.getData(PetBagModuleData);
    }

    /**获取特效 */
    private getEffect() {
        GameObject.asyncFindGameObjectById(GlobalData.Enchant.effectGuid).then((eff) => {
            this.effect = eff as mw.Effect;
            // this.effect.loop = false;
            this.effect.duration = GlobalData.Enchant.effectDuration;
            this.effect.stop();
        });
    }

    /**播放特效 */
    private playEffect() {
        // this.effect.loopCount = GlobalData.Enchant.effectPlayTimes;
        this.onUpdateAc.call(true);
        setTimeout(() => {
            this.effect.play();
        }, 500);
        setTimeout(() => {
            this.onUpdateAc.call(false);
            this.showRes();
            this.effect.stop();
        }, 500 + GlobalData.Enchant.effectDuration * 1000);
        // this.effect.onFinish.clear();
        // this.effect.onFinish.add(() => {
        //     this.onUpdateAc.call(false);
        //     this.showRes(tarEnchant, petKeyArr);
        // });
    }

    public showPanel(petData: petItemDataNew[]) {
				PetBagItem.instance.UIPool.resetAll();
        if (this.isFirstOpen) {
            this.isFirstOpen = false;
            this.updateEnchantIntroPanel();
        }

				// this.selectPetKeys = [];
				this.selectPetKey = null;

        petData = this.filterMythical(petData);

        for (let i = 0; i < petData.length; i++) {
            const element = petData[i];
            let item = PetBagItem.instance.UIPool.get();
            item.init(element);

            item.setClickFun(this.onClickItem.bind(this), this);
            item.onHoverAC.clear();
            item.onHoverAC.add(this.showHoverUI.bind(this));
            item.uiObject.size = item.rootCanvas.size;
            this.mlistCanvas.addChild(item.uiObject);
            if (this.petItems.includes(item)) continue;
            this.petItems.push(item);
        }
        this.isCanClickBtn();
        this.show();
    }
 
		/** 附魔成功后更新面板 UI */
    public updatePetPanelUI() { 
 				const petItems = this.petItems;
        for (let i = 0; i < petItems?.length; i++) {
					const ele = petItems[i];
					const newPet = this.bagData.bagItemsByKey(ele.petData.k)
					// console.log(
					// 	"======== updatePetPanelUI i ======="+i,
					// 	" id:" + ele?.petData?.I,
					// 	" newPetData id:" + newPet?.I,
					// 	" key:" + ele?.petData?.k,
					// 	" newPetData key:" + newPet?.k,
					// 	" name:" + ele?.petData?.p?.n,
					// 	" buff:" + ele?.petData?.p?.b,
					// 	" newPet buff:" + newPet?.p?.b,
					// 	" enchantCnt:" + ele?.petData?.enchantCnt
					// );
					ele.init(newPet);
				}
				const preSelectedPetKey = this.selectPetKey;
				const selectedItem = petItems.find((item) => item.petData.k === preSelectedPetKey);
				this.selectPetKey = null;
				this.updateSelectKey(selectedItem)
		}

    /**悬浮UI */
    private showHoverUI(isShow: boolean, item: PetBag_Item) {
        if (isShow) {
            let pos = item.uiObject.position;
            let loc = new mw.Vector2(
                pos.x + this.mCanvas.position.x + this.mlistCanvas.position.x,
                pos.y + this.mCanvas.position.y + this.mlistCanvas.position.y,
            );
            mw.UIService.getUI(P_PetHover).setPetInfoShow(item.petData, loc);
        } else {
            mw.UIService.getUI(P_PetHover).hide();
        }
    }

    /**过滤神话宠物 */
    private filterMythical(petData: petItemDataNew[]): petItemDataNew[] {
				return petData.filter((ele) => {
						let cfg = GameConfig.PetARR.getElement(ele.I);
						return cfg.QualityType !== GlobalEnum.PetQuality.Myth;
				});
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
					(pet) => pet.petData.k === this.selectPetKey
				);
				console.log(
					"======== updateEnchantIntroPanel curSelectPetInfo =======",
					" id:" + curSelectPetInfo?.petData?.I,
					" key:" + curSelectPetInfo?.petData?.k,
					" name:" + curSelectPetInfo?.petData?.p?.n,
					" buff:" + curSelectPetInfo?.petData?.p?.b,
					" enchantCnt:" + curSelectPetInfo?.petData?.enchantCnt
				);
				const buffIds = curSelectPetInfo?.petData?.p?.b;
				if (!curSelectPetInfo?.petData) {
					this.mPetInfo.visibility = mw.SlateVisibility.Collapsed;	
					return;
				} 
				const curPetData = curSelectPetInfo.petData;

				this.mPetInfo.visibility = mw.SlateVisibility.Visible;
        const cfg = GameConfig.PetARR.getElement(curPetData.I);
        this.mNameBig.text = cfg.petName;
        this.mNameSmall.text = curSelectPetInfo?.petData?.p?.n;
				Gtk.trySetVisibility(
          this.picLovelovelove,
          cfg.DevType === GlobalEnum.PetDevType.Love
            ? mw.SlateVisibility.Visible
            : mw.SlateVisibility.Collapsed
        );
				Gtk.trySetVisibility(
          this.picRainbowowow,
          cfg.DevType === GlobalEnum.PetDevType.Rainbow
            ? mw.SlateVisibility.Visible
            : mw.SlateVisibility.Collapsed
        );
				this.setPetInfoRarityUI(cfg.QualityType);
				
				const len = buffIds?.length ?? 0; // 两词条则可选择一词条重铸
				const isReEnchant = len >= 2; // 两词条则可选择一词条重铸
				const items = [];
				for (let i = 0; i < len; i++) {
					const buffId = buffIds[i];
					let item = mw.UIService.create(EnchantItem);
					if (isReEnchant) {
						if(i === 0) { // 默认选择第一个词条
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
				if (len < 2) {
          // 不满两词条则空 item 补到两词条
          for (let i = 0; i < 2 - len; i++) {
            const emptyItem = mw.UIService.create(EnchantItem);
            emptyItem.uiObject.size = emptyItem.mCanvas.size;
						if(i === 0) emptyItem.setSelectState(true);
            this.mCanvas_Entrylist.addChild(emptyItem.uiObject);
          }
        }
        this.enchantItemsUI = items;
    }

    // private initEnchantItem() {
    //     let cfgs = GameConfig.Enchants.getAllElement();
    //     cfgs.sort((a, b) => {
    //         return a.Order - b.Order;
    //     });
    //     for (let index = 0; index < cfgs.length; index++) {
    //         let cfg = cfgs[index];
    //         if (cfg.QualityType == 1 || GlobalData.Enchant.filterIds.includes(cfg.id)) {
    //             continue;
    //         }
    //         let item = mw.UIService.create(EnchantItem);
    //         item.onClickAc.add(() => {
    //             this.isCanClickBtn();
    //             AnalyticsTool.action_enchant(AnalyModel.choose, 0);
    //         });
    //         item.uiObject.size = item.mCanvas.size;
    //         this.mCanvas_Entrylist.addChild(item.uiObject);
    //         this.enchantItems.push(item);
    //         item.setCfgId(cfg.id);
    //     }
    // }

    /**点击宠物item */
    private onClickItem(item: PetBag_Item) {
        if (this.isEnchanting) {
            oTraceError('正在附魔中');
            return;
        }
        this.updateSelectKey(item);
    }
 
    /**更新选择key */
    private updateSelectKey(item: PetBag_Item) {
			const isSelected = this.selectPetKey === item.petData.k;
			if(this.selectPetKey) {
				const preSelectPet = this.petItems.find((item) => item.petData.k === this.selectPetKey);
				preSelectPet.setLockVis(false);
				this.selectPetKey = null;
			}
			this.selectPetKey = isSelected ? null: item.petData.k;
			item.setLockVis(!isSelected);
			this.isCanClickBtn();
			this.updateEnchantIntroPanel();
    }

    /**判断是否可点击按钮 */
    private isCanClickBtn() {
        const canClick = !Gtk.isNullOrUndefined(this.selectPetKey)
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
        const selectedEnchantIds: number[] = this.getSelectEnchant();
        const petBagMC = ModuleService.getModule(PetBagModuleC);
        const enchantPetState = await petBagMC.getPetEnchantState(
          selectedEnchantIds,
          this.selectPetKey
        );

        const startEnchantFn = async (isOK: boolean) => {
						if (!isOK) return;
						const res = await petBagMC.enchant(
								this.selectPetKey,
								this.selectEnchantId
						);
						if (res === EnchantPetState.NO_ENOUGH_DIAMOND) {
								MessageBox.showOneBtnMessage(
										GameConfig.Language.Text_Fuse_UI_3.Value,
										() => {
												super.show();
										}
								);
								return;
						}
						if (res === EnchantPetState.FAILED) {
								console.error("附魔出错");
								return;
						}
						this.startEnchant(); // 特效等
        };

        switch (enchantPetState) {
          case EnchantPetState.IS_SAME_ENCHANT: {
            MessageBox.showOneBtnMessage(
              GameConfig.Language.Tips_Enchants_3.Value
            );
            break;
          }
          case EnchantPetState.IS_HAS_ENCHANT: {
            MessageBox.showTwoBtnMessage(
              GameConfig.Language.Tips_Enchants_2.Value,
              startEnchantFn
            );
            break;
          }
          default: {
            MessageBox.showTwoBtnMessage(
              GameConfig.Language.Tips_Enchants_1.Value,
              startEnchantFn
            );
            break;
          }
        }
    }

    /**获取当前选择的附魔 */
    private getSelectEnchant(): number[] {
        let result: number[] = [];
        for (let index = 0; index < this.enchantItems.length; index++) {
            let element = this.enchantItems[index];
            if (element.SelectState) {
                result.push(element.cfgId);
            }
        }
        return result;
    }

    /**开始附魔
     * @param tarEnchant 目标附魔数组
     * @param petKeyArr 宠物key数组
     */
    private async startEnchant() {
        if (!this.isEnchanting) {
						this.setEnchantBtnClickState(false);
        }
        this.enchantProgress();
        this.moveUI(false);
    }

    /**停止附魔 */
    private stopEnchant() {
        this.onUpdateAc.call(false);
        this.effect.onFinish?.clear();
        clearTimeout(this.enchantInterval);
        this.setEnchantBtnClickState(true);
    }

    /**当前附魔进度 */
    private enchantProgress() {
        // if (tarEnchant.length == 0) {
        //     let ids = GlobalData.Enchant.normalEnchantId;
        //     for (let i = ids[0]; i < ids[1]; i++) {
        //         if (!GlobalData.Enchant.filterIds.includes(i)) tarEnchant.push(i);
        //     }
        // }
        // //词条个数
        // let enchantNum = 1;
        // let index = BagTool.calculateWeight(GlobalData.Enchant.singleDoubleWeight);
        // if (index == 0) {
        //     enchantNum = 1;
        // } else {
        //     enchantNum = 2;
        // }

        // let del: number[] = [];
        // let curIdStr: string[] = [];

        // //宠物循环
				// const element = this.selectPetKey;
				// //词条个数循环
				// let curId: number[] = [];
				// for (let j = 0; j < enchantNum; j++) {
				// 		let curID = BagTool.randomEnchantId();
				// 		curId.push(curID);
				// 		if (tarEnchant.includes(curID)) {
				// 				//如果目标附魔中包含随机附魔id,删除
				// 				del.push(element);
				// 		}
				// }
				// curIdStr.push(numberArrToString(curId));

        // this.enchantAc.call([this.selectPetKey], curIdStr);

        this.playEffect();
    }

    /**展示结果 */
    private showRes() {
        this.moveUI(true); 
				//附魔结束
				this.setEnchantBtnClickState(true);
				this.updatePetPanelUI();
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
 				if(this.isChoose) this.picSelect.visibility = mw.SlateVisibility.Visible;
				else this.picSelect.visibility = mw.SlateVisibility.Hidden;
        this.mButton_Entry.onClicked.add(() => {
            this.onClickAc.call();
        });
    }
		public setEmptyUI() {
			this.mButton_Entry.normalImageGuid = GlobalData.Enchant.enchantItemGuid[0];
			this.textEnhanceName.text = GameConfig.Language.Enchants_new001.Value;
			this.mTextBlock_Entry.text = GameConfig.Language.Enchants_new002.Value;
			this.textScoreNumber.visibility = mw.SlateVisibility.Collapsed;
			this.textScoreUp.visibility = mw.SlateVisibility.Collapsed;
			this.picScore.visibility = mw.SlateVisibility.Collapsed;
		}
		
		private getBgImageGuid(cfgId: number) {
			if(cfgId >= GlobalData.Enchant.mythEnchantIdRange[0] && cfgId <= GlobalData.Enchant.mythEnchantIdRange[1]) {
				return GlobalData.Enchant.enchantItemGuid[3]; 
			}
			if(cfgId >= GlobalData.Enchant.specialEnchantIdRange[0] && cfgId <= GlobalData.Enchant.specialEnchantIdRange[1]) {
				return GlobalData.Enchant.enchantItemGuid[2]; 
			}
			return GlobalData.Enchant.enchantItemGuid[1];  
		}
    /**设置配置id */
    public setCfgId(cfgId: number) {
        this.cfgId = cfgId;
        const cfg = GameConfig.Enchants.getElement(cfgId);
				if(!cfg) return;
				this.mButton_Entry.normalImageGuid = this.getBgImageGuid(cfgId);
        this.textEnhanceName.text = cfg.Name;
				this.mTextBlock_Entry.text = utils.Format(cfg.Describe, cfg.Degree);
				this.textScoreNumber.text = utils.formatNumber(cfg.RankScore ?? 0);
				this.textScoreNumber.visibility = mw.SlateVisibility.Visible; 
				this.textScoreUp.visibility = mw.SlateVisibility.Visible;
				this.picScore.visibility = mw.SlateVisibility.Visible;
    }

    /**选中态 */
    public get SelectState(): boolean {
        return this.isChoose;
    }

    public setSelectState(isChoose: boolean) {
        this.isChoose = isChoose;
				if(this.isChoose) this.picSelect.visibility = mw.SlateVisibility.Visible;
				else this.picSelect.visibility = mw.SlateVisibility.Hidden;
    }
}
