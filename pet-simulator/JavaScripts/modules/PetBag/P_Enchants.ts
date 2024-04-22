
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import EnchantsPanel_Generate from "../../ui-generate/Enchants/EnchantsPanel_generate";
import Enchants_item_Generate from "../../ui-generate/Enchants/Enchants_item_generate";
import { oTraceError } from "../../util/LogManager";
import MessageBox from "../../util/MessageBox";
import { numberArrToString, utils } from "../../util/uitls";
import { P_PetHover } from "../PetCollect/P_Collect";
import { PlayerModuleC } from "../Player/PlayerModuleC";
import { BagTool } from "./BagTool";
import { PetBagModuleData, petItemDataNew } from "./PetBagModuleData";
import { AnalyModel, AnalyticsTool, Page } from "../Analytics/AnalyticsTool";
import { PetBagItem } from "./P_Bag";



import { PetBag_Item } from "./P_BagItem";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";

export class P_Enchants extends EnchantsPanel_Generate {

    /**是否第一次打开 */
    private isFirstOpen: boolean = true;
    /**特效 */
    private effect: mw.Effect;
    /**词条item */
    private enchantItems: EnchantItem[] = [];
    /**宠物item */
    private petItems: PetBag_Item[] = [];
    /**选中的宠物key数组 */
    private selectPetKeys: number[] = [];

    /**附魔事件 key,词条id数组*/
    public enchantAc: Action2<number[], string[]> = new Action2();

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
        })
        this.getEffect();
        this.mButton_Enchant.normalImageGuid = GlobalData.Enchant.enchantBtnGuid[0];
        this.mButton_Enchant.onClicked.add(this.onClickEnchant.bind(this));
        this.bagData = DataCenterC.getData(PetBagModuleData);
    }

    /**获取特效 */
    private getEffect() {
        GameObject.asyncFindGameObjectById(GlobalData.Enchant.effectGuid).then((eff) => {
            this.effect = eff as mw.Effect;
            this.effect.loop = false;
        })
    }
    /**播放特效 */
    private playEffect(tarEnchant: number[], petKeyArr: number[]) {
        this.effect.loopCount = GlobalData.Enchant.effectPlayTimes;
        this.onUpdateAc.call(true);
        setTimeout(() => {
            this.effect.play();
        }, 500);
        this.effect.onFinish.clear();
        this.effect.onFinish.add(() => {
            this.onUpdateAc.call(false);
            this.showRes(tarEnchant, petKeyArr);
        })
    }

    public showPanel(petData: petItemDataNew[]) {
        AnalyticsTool.page(Page.enchants);
        PetBagItem.instance.UIPool.resetAll();
        if (this.isFirstOpen) {
            this.isFirstOpen = false;
            this.initEnchantItem();
        }

        this.selectPetKeys = []
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
    /**悬浮UI */
    private showHoverUI(isShow: boolean, item: PetBag_Item) {
        if (isShow) {
            let pos = item.uiObject.position;
            let loc = new mw.Vector2(pos.x + this.mCanvas.position.x + this.mlistCanvas.position.x, pos.y + this.mCanvas.position.y + this.mlistCanvas.position.y)
            mw.UIService.getUI(P_PetHover).setPetInfoShow(item.petData, loc);
        } else {
            mw.UIService.getUI(P_PetHover).hide();
        }
    }
    /**过滤神话宠物 */
    private filterMythical(petData: petItemDataNew[]): petItemDataNew[] {
        let result: petItemDataNew[] = [];
        petData.forEach((element) => {
            let cfg = GameConfig.PetARR.getElement(element.I);
            if (cfg.QualityType != GlobalEnum.PetQuality.Myth) {
                result.push(element);
            }
        })
        return result;
    }


    private initEnchantItem() {
        let cfgs = GameConfig.Enchants.getAllElement();
        cfgs.sort((a, b) => {
            return a.Order - b.Order;
        })
        for (let index = 0; index < cfgs.length; index++) {
            let cfg = cfgs[index];
            if (cfg.QualityType == 1 || GlobalData.Enchant.filterIds.includes(cfg.id)) {
                continue;
            }
            let item = mw.UIService.create(EnchantItem);
            item.onClickAc.add(() => {
                this.isCanClickBtn();
                AnalyticsTool.action_enchant(AnalyModel.choose, 0);
            })
            item.uiObject.size = item.mCanvas.size;
            this.mCanvas_Entrylist.addChild(item.uiObject);
            this.enchantItems.push(item);
            item.setCfgId(cfg.id);
        }
    }

    /**点击宠物item */
    private onClickItem(item: PetBag_Item) {
        if (this.selectPetKeys.length >= GlobalData.Enchant.maxEnchantNum && !item.getLockVis()) {
            oTraceError('lwj 最大附魔数量');
            return;
        }
        if (this.isEnchanting) {
            if (this.selectPetKeys.includes(item.petData.k)) {
                oTraceError('lwj 正在附魔中，已经选择了该宠物');
                this.stopEnchant();
                this.updateSelectKey(item);
            }
            return;
        }
        this.updateSelectKey(item);
    }
    /**更新选择key */
    private updateSelectKey(item: PetBag_Item) {
        item.setLockVis(!item.getLockVis());
        let isSelect = item.getLockVis();
        let index = this.selectPetKeys.findIndex((value) => {
            return value == item.petData.k;
        })
        if (index == -1 && isSelect) {
            this.selectPetKeys.push(item.petData.k);
        }
        else if (index != -1 && !isSelect) {
            this.selectPetKeys.splice(index, 1);
        }
        this.isCanClickBtn()
    }
    /**判断是否可点击按钮 */
    private isCanClickBtn() {
        this.updateCost();
        if (this.selectPetKeys.length > 0) {
            this.mButton_Enchant.enable = true;
            return true;
        }
        this.mButton_Enchant.enable = false;
        return false;
    }
    /**更新钻石花费 */
    private updateCost() {
        this.mTextBlock_Cost.text = utils.formatNumber(this.selectPetKeys.length * GlobalData.Enchant.diamondCost);
    }

    /**点击附魔按钮 */
    private onClickEnchant() {
        if (this.isEnchanting) {
            //正在附魔
            this.stopEnchant()
            AnalyticsTool.action_enchant(AnalyModel.stop2, 0)
            return;
        }
        AnalyticsTool.action_enchant(AnalyModel.enchants_times, 0)
        this.isCanEnchant();
    }


    /**判断附魔条件 */
    private isCanEnchant() {

        let isHasEnchant = false;//是否有附魔
        let isSameEnchant = true;//是否是同一种附魔

        let selcetEnchant = this.getSelectEnchant();
        let playerMC = ModuleService.getModule(PlayerModuleC);

        for (let index = 0; index < this.selectPetKeys.length; index++) {
            let data = this.bagData.bagItemsByKey(this.selectPetKeys[index]);
            if (!data || !data.p) continue;
            isSameEnchant = isSameEnchant && this.isSameEnchant(selcetEnchant, data.p.b);

            if (data.p?.b && data.p.b?.length > 0) {
                isHasEnchant = true;
            } else {
                isHasEnchant = false;
                break;
            }
        }
        if (isHasEnchant) {
            //有附魔
            if (isSameEnchant) {
                //同一种附魔
                MessageBox.showOneBtnMessage(GameConfig.Language.Tips_Enchants_3.Value, () => { });
                return;
            }
            MessageBox.showTwoBtnMessage(GameConfig.Language.Tips_Enchants_2.Value, async (res: boolean) => {
                if (res) {
                    let isSuccess = await playerMC.reduceDiamond(this.selectPetKeys.length * GlobalData.Enchant.diamondCost);
                    if (!isSuccess) {
                        MessageBox.showOneBtnMessage(GameConfig.Language.Text_Fuse_UI_3.Value, () => {
                            super.show();
                        });
                        return;
                    } else {
                        this.startEnchant(selcetEnchant, this.selectPetKeys);
                    }
                }
            })
        } else {

            MessageBox.showTwoBtnMessage(GameConfig.Language.Tips_Enchants_1.Value, async (res: boolean) => {
                if (res) {
                    let isSuccess = await playerMC.reduceDiamond(this.selectPetKeys.length * GlobalData.Enchant.diamondCost);
                    if (!isSuccess) {
                        MessageBox.showOneBtnMessage(GameConfig.Language.Text_Fuse_UI_3.Value, () => {
                            super.show();
                        });
                        return;
                    } else {
                        this.startEnchant(selcetEnchant, this.selectPetKeys);
                    }
                }
            })
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
    /**获取当前选择的宠物数组 */
    private getSelectPetCount(): number[] {
        let petArr: number[] = [];
        for (let index = 0; index < this.petItems.length; index++) {
            let element = this.petItems[index];
            if (element.getLockVis()) {
                petArr.push(element.petData.k);
            }
        }
        return petArr;
    }
    /**判断是否是同一种附魔
     * @param tarEnchant 目标附魔
     * @param petEnchant 当前宠物附魔
     */
    private isSameEnchant(tarEnchant: number[], petEnchant: number[]): boolean {
        if (!petEnchant) return false;
        if (tarEnchant.length == 0) return false;

        for (let index = 0; index < tarEnchant.length; index++) {
            let element = tarEnchant[index];
            if (petEnchant.indexOf(element) == -1) {
                return false;
            }
        }
        return true;
    }

    /**开始附魔 
       * @param tarEnchant 目标附魔数组
       * @param petKeyArr 宠物key数组
      */
    private async startEnchant(tarEnchant: number[], petKeyArr: number[]) {
        if (!this.isEnchanting) {
            this.setEnchantBtnClickState(false);
        }
        this.enchantProgress(tarEnchant, petKeyArr);
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
    private enchantProgress(tarEnchant: number[], petKeyArr: number[]) {
        if (tarEnchant.length == 0) {
            let ids = GlobalData.Enchant.normalEnchantId;
            for (let i = ids[0]; i < ids[1]; i++) {
                if (!GlobalData.Enchant.filterIds.includes(i))
                    tarEnchant.push(i);
            }
        }
        //词条个数
        let enchantNum = 1;
        let index = BagTool.calculateWeight(GlobalData.Enchant.singleDoubleWeight);
        if (index == 0) {
            enchantNum = 1;
        } else {
            enchantNum = 2;
        }

        let del: number[] = [];
        let curIdStr: string[] = [];

        //宠物循环
        for (let i = 0; i < petKeyArr.length; i++) {
            const element = petKeyArr[i];
            //词条个数循环
            let curId: number[] = [];
            for (let j = 0; j < enchantNum; j++) {
                let curID = BagTool.randomEnchantId();
                curId.push(curID);
                AnalyticsTool.action_enchant(0, curID)
                if (tarEnchant.includes(curID)) {
                    //如果目标附魔中包含随机附魔id,删除
                    del.push(element);
                }
            }
            curIdStr.push(numberArrToString(curId));
        }

        this.enchantAc.call(petKeyArr, curIdStr);
        del.forEach((element) => {
            let index = petKeyArr.indexOf(element);
            if (index != -1)
                petKeyArr.splice(index, 1);
        });
        this.playEffect(tarEnchant, petKeyArr);

    }

    /**展示结果 */
    private showRes(tarEnchant: number[], petKeyArr: number[]) {
        this.moveUI(true);
        if (petKeyArr.length == 0) {
            //附魔结束
            this.setEnchantBtnClickState(true);
            this.selectPetKeys = this.getSelectPetCount();
            this.isCanClickBtn()
            AnalyticsTool.action_enchant(AnalyModel.enchants, 0)
            return;
        }
        //开始倒计时
        this.enchantInterval = setTimeout(() => {
            this.moveUI(false);
            this.enchantProgress(tarEnchant, petKeyArr);

        }, GlobalData.Enchant.stopTime * 1000);
    }


    /**设置附魔按钮点击态 */
    private setEnchantBtnClickState(isCan: boolean) {
        this.isEnchanting = !isCan;
        let char = Player.localPlayer.character
        char.movementEnabled = isCan;
        char.jumpEnabled = isCan;
        this.mTextBlock_Enchant.text = isCan ? GameConfig.Language.Tips_Enchants_7.Value : GameConfig.Language.Tips_Enchants_8.Value;
        this.mButton_Enchant.normalImageGuid = isCan ? GlobalData.Enchant.enchantBtnGuid[0] : GlobalData.Enchant.enchantBtnGuid[1];
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
        this.petItems.forEach((element) => {
            element.clearPressedInterval()
        })

        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }
    protected onShow(...params: any[]): void {
        this.isCanClickBtn();
        KeyOperationManager.getInstance().onKeyUp(Keys.Escape, this, () => {
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
        this.mButton_Entry.normalImageGuid = this.isChoose ? GlobalData.Enchant.enchantitemGuid[1] : GlobalData.Enchant.enchantitemGuid[0];
        this.mButton_Entry.onClicked.add(() => {
            this.isChoose = !this.isChoose;
            this.onClickAc.call();
            this.mButton_Entry.normalImageGuid = this.isChoose ? GlobalData.Enchant.enchantitemGuid[1] : GlobalData.Enchant.enchantitemGuid[0];
        });
    }

    /**设置配置id */
    public setCfgId(cfgId: number) {
        this.cfgId = cfgId;

        let cfg = GameConfig.Enchants.getElement(cfgId);
        this.mTextBlock_Entry.text = cfg.Name;
    }

    /**选中态 */
    public get SelectState(): boolean {
        return this.isChoose;
    }

    public setSelectState(isChoose: boolean) {
        this.isChoose = isChoose;
        this.mButton_Entry.normalImageGuid = this.isChoose ? GlobalData.Enchant.enchantitemGuid[1] : GlobalData.Enchant.enchantitemGuid[0];
    }
}