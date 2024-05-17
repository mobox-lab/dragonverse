import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { UIPool } from "../../Tools/UIPool";
import { IEggMachineElement } from "../../config/EggMachine";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import Gtk from '../../util/GToolkit';
import { oTraceError } from "../../util/LogManager";
import MessageBox from "../../util/MessageBox";
import { Singleton, utils } from "../../util/uitls";
import AchievementModuleC from "../AchievementModule/AchievementModuleC";
import { AnalyticsTool } from "../Analytics/AnalyticsTool";
import { AreaDivideManager } from "../AreaDivide/AreaDivideManager";
import { AreaModuleC } from "../AreaDivide/AreaModuleC";
import { AreaModuleData } from "../AreaDivide/AreaModuleData";
import { BagTool } from "../PetBag/BagTool";
import { PetBagModuleC } from "../PetBag/PetBagModuleC";
import { PetBagModuleS } from '../PetBag/PetBagModuleS';
import { CollectModuleData } from "../PetCollect/CollectModuleData";
import { PlayerModuleC } from "../Player/PlayerModuleC";
import { PetSimulatorPlayerModuleData } from "../Player/PlayerModuleData";
import { EggMachineTween } from "./EggMachineTween";
import { EggInfo, InterBtn } from "./P_EggMachine";


@Singleton()
class EggUIPool {
    public static instance: EggUIPool;
    private uiPool: UIPool<EggInfo> = new UIPool();
    constructor() {
        this.uiPool.setCreator(() => {
            let item = mw.UIService.create(EggInfo);
            return item;
        })
    }
    public get UIPool() {
        return this.uiPool;
    }
}
//扭蛋机
@Component
export default class EggMachine extends mw.Script {

    private eggM: EggM[] = [];

    onStart() {
        if (SystemUtil.isClient())
            this.init();
    }

    private async init() {
        await ModuleService.ready();

        DataCenterC.getData(AreaModuleData).onAreaUnLockAC.add(this.changeArea.bind(this));
        let hasArr = DataCenterC.getData(CollectModuleData).HasArr;
        AreaDivideManager.instance.onAreaChangeAC.add(this.onAreaChange.bind(this));

        this.initEggMachine();
        let cfgs = GameConfig.EggMachine.getAllElement();
        for (let index = 0; index < cfgs.length; index++) {
            let cfg = cfgs[index];
            if (!cfg.SceneID || cfg.SceneID.length == 0 || !cfg.Price) continue;
            let egg = new EggM(cfg.id, hasArr);
            this.eggM.push(egg);
            await TimeUtil.delaySecond(0.1);
        }

    }
    private onAreaChange(preId: number, curId: number) {
        if (curId > 1003)
            this.useUpdate = false;
        else {
            this.useUpdate = true;
        }
    }
    private changeArea(areaId: number, level: number) {
        if (level != 2) return;

        for (let id = 0; id < this.eggM.length; id++) {
            const element = this.eggM[id];
            element.cfg.AreaID == areaId ? element.setLockState(false) : null;
        }
    }


    onUpdate(dt: number): void {
        this.eggM.forEach((item) => {
            item.onUpdate(dt);
        })
    }
    private initEggMachine() {
        this.findObj("3ABC2966", GameConfig.Language.Egg_Areaname_1.Value);
        this.findObj("2DDFCD79", GameConfig.Language.Egg_Areaname_2.Value);
        this.findObj("35DAFF73", GameConfig.Language.Egg_Areaname_3.Value);
        this.findObj("25119D40", GameConfig.Language.Egg_Areaname_4.Value);
        this.findObj("3C86A2B4", GameConfig.Language.Egg_Areaname_5.Value);
        this.findObj("2BC4BD44", GameConfig.Language.Egg_Areaname_6.Value);
        this.findObj("3FA66445", GameConfig.Language.Egg_Areaname_7.Value);
        this.findObj("225E59A7", GameConfig.Language.Egg_Areaname_8.Value);
        this.findObj("20213BB3", GameConfig.Language.Egg_Areaname_9.Value);
        this.findObj("233B9953", GameConfig.Language.Egg_Areaname_10.Value);
        this.findObj("3E38B9C0", GameConfig.Language.Egg_Areaname_11.Value);
        this.findObj("3CE027E8", GameConfig.Language.Egg_Areaname_12.Value);
        this.findObj("07BAFB82", GameConfig.Language.Egg_Areaname_13.Value);
        this.findObj("07EC2A54", GameConfig.Language.Egg_Areaname_14.Value);
        this.findObj("25651355", GameConfig.Language.Egg_Areaname_15.Value);
        this.findObj("2F545D39", GameConfig.Language.Egg_Areaname_16.Value);
        this.findObj("2C36901C", GameConfig.Language.Egg_Areaname_17.Value);
        this.findObj("09C3B961", GameConfig.Language.Egg_Areaname_18.Value);
        this.findObj("2812C580", GameConfig.Language.Egg_Areaname_19.Value);
        this.findObj("3EE3B797", GameConfig.Language.Egg_Areaname_20.Value);
        this.findObj("046285AF", GameConfig.Language.Egg_Areaname_21.Value);
        this.findObj("2E81C2AB", GameConfig.Language.Egg_Areaname_22.Value);
        this.findObj("0AF55288", GameConfig.Language.Egg_Areaname_23.Value);
        this.findObj("32992B8C", GameConfig.Language.Egg_Areaname_24.Value);
        this.findObj("21FC3B0E", GameConfig.Language.Egg_Areaname_25.Value);
        this.findObj("0EF72798", GameConfig.Language.Egg_Areaname_26.Value);
        this.findObj("067EA765", GameConfig.Language.Egg_Areaname_27.Value);
    }
    private async findObj(guid: string, str: string) {
        GameObject.asyncFindGameObjectById(guid).then((obj) => {
            if (Gtk.isNullOrUndefined(obj)) return;
            let UIWidget = obj as mw.UIWidget;
            (UIWidget.getTargetUIWidget().rootContent.findChildByPath("TextBlock") as mw.TextBlock).text = str;
        })
    }
}


class EggM {

    public cfg: IEggMachineElement = null;
    private petEgg: mw.GameObject = null;
    private unLockEgg: mw.GameObject = null;
    private worldUI_1: mw.UIWidget = null;
    private worldUI_2: mw.UIWidget = null;
    private trigger: mw.Trigger = null;

    private unlockEff: mw.Effect;
    private lockEff: mw.Effect;
    /**爱心特效 */
    private heartEff: mw.Effect = null;

    private hasArr: number[];

    private petArr: EggInfo[] = [];

    /**是否存在最小概率 */
    private hasSmallRate: boolean = false;
    private useUpdate: boolean = false;
    private gameObject: mw.GameObject;

    private achievementModuleC: AchievementModuleC = null;

    /**当前玩家金币 */
    private curGold: number = 0;
    private worldUIImg: mw.Widget;

    constructor(public cfgID: number, hasArr: number[]) {
        this.hasArr = hasArr;
        this.cfg = GameConfig.EggMachine.getElement(this.cfgID);
        this.achievementModuleC = ModuleService.getModule(AchievementModuleC);
        this.listenEggEvent();
        this.startFind();
    }
    private async startFind() {
        await this.findObj();
        if (this.islock()) {
            this.setLockState(true);
        } else {
            this.setLockState(false);
        }
    }


    /**监听扭蛋事件 */
    private listenEggEvent() {
        EggMachineTween.instance.onTweenAc.add((isStart: boolean) => {
            if (this.islock()) return;
            if (isStart) {
                this.petEgg.setVisibility(mw.PropertyStatus.Off);
                this.worldUI_1.setVisibility(mw.PropertyStatus.Off);
            }
            else {
                this.petEgg.setVisibility(mw.PropertyStatus.On);
                this.setEggState(false);
                this.playeEff(false);
            }
        })
        let playerModuleC = ModuleService.getModule(PlayerModuleC);

        let playerData = DataCenterC.getData(PetSimulatorPlayerModuleData);

        if (this.cfg.AreaID < 2000) {
            this.curGold = playerData.gold;
        } else if (this.cfg.AreaID < 3000) {
            this.curGold = playerData.gold2;
        }

        playerModuleC.onGoldChange.add((type: GlobalEnum.CoinType, gold) => {
            if (this.islock()) return;

            if (this.cfg.AreaID < 2000 && type == GlobalEnum.CoinType.FirstWorldGold) {
                this.curGold = gold;
                this.setFingerEff(true);
            } else if (this.cfg.AreaID < 3000 && type == GlobalEnum.CoinType.SecondWorldGold) {
                this.curGold = gold;
                this.setFingerEff(true);
            }
        });

    }
    /**价格ui显示 */
    private goldUIInit() {
        let priceUI = this.worldUI_2.getTargetUIWidget().rootContent;
        this.setWorldUIVis(this.worldUI_2, true);
        //设置价格
        let priceTxt = priceUI.findChildByPath("Canvas/mText_Price") as mw.TextBlock;
        let guid = this.cfg.Price[0];
        priceTxt.text = utils.formatNumber(guid)

    }
    public setLockState(isLock: boolean) {

        this.setEggState(isLock);
        this.playeEff(isLock);
        if (isLock) {
            this.setWorldUIVis(this.worldUI_2, false);
        } else {
            this.goldUIInit();
            this.useUpdate = true;
            this.trigger.onEnter.add(this.enterTrigger.bind(this));
            this.trigger.onLeave.add(this.exitTrigger.bind(this));
            if (!this.unLockEgg) {
                this.unLockEgg.destroy();
                this.unLockEgg = null;
                this.unlockEff = null;
            }
        }
    }

    /**是否正锁 */
    private islock(): boolean {
        if (!this.cfg) return true;
        return ModuleService.getModule(AreaModuleC).isArealock(this.cfg.AreaID);
    }
    /**设置蛋状态 */
    private async setEggState(isLock: boolean) {
        if (isLock) {
            this.unLockEgg.setVisibility(mw.PropertyStatus.On);
            this.petEgg.setVisibility(mw.PropertyStatus.Off);
        } else {
            this.unLockEgg?.setVisibility(mw.PropertyStatus.Off);
            this.petEgg.setVisibility(mw.PropertyStatus.On);
        }
    }
    /**特效状态 */
    private playeEff(isLock: boolean) {
        if (isLock) {
            this.setFingerEff(false);
            this.unlockEff.play();
        } else {
            this.setFingerEff(true);
            if (this.heartEff) {
                this.heartEff.loop = true
                this.heartEff.loopCount = 0;
                this.heartEff.play();
            }
            this.unlockEff?.forceStop();
        }
    }
    /**设置手指特效显示 */
    private setFingerEff(isVis: boolean) {
        if (isVis && this.curGold >= this.cfg.Price[0]) {
            this.lockEff.play();
        } else {
            this.lockEff?.stop();
        }
    }

    private async findObj() {
        this.petEgg = await GameObject.asyncFindGameObjectById(this.cfg.SceneID[1]);

        this.gameObject = this.petEgg.parent.getChildByName("扭蛋交互")

        this.trigger = this.gameObject.getChildByName("触发器") as mw.Trigger;
        this.worldUI_1 = await GameObject.asyncFindGameObjectById(GlobalData.EggMachine.probabilityWorldUI) as mw.UIWidget;
        this.worldUIImg = this.worldUI_1.getTargetUIWidget().rootContent.findChildByPath("Image");
        this.worldUI_2 = this.gameObject.getChildByName("价格世界UI") as mw.UIWidget;
        this.setPriceIcon();
        this.getHeatEff(this.petEgg);
        this.unLockEgg = await GameObject.asyncFindGameObjectById(this.cfg.SceneID[0]);
        this.unlockEff = this.unLockEgg.getChildByName("禁锢Buff") as mw.Effect;
        this.lockEff = this.gameObject.getChildByName("手指") as mw.Effect;
    }
    private getHeatEff(obj: mw.GameObject) {
        let len = this.petEgg.getChildren();
        for (let i = 0; i < len.length; i++) {
            if (len[i].name.includes("爱心")) {
                this.heartEff = len[i] as mw.Effect;
                break;
            }
        }
    }
    /**附加世界ui  */
    private async attachObj() {
        this.worldUI_1.parent = this.gameObject;
        this.worldUI_1.localTransform.position = (new mw.Vector(5, 0, 190));
        this.worldUI_1.localTransform.rotation = (this.worldUI_2.localTransform.rotation);
    }

    /**分离世界ui */
    private async detachObj() {
        this.worldUI_1.parent = null;
    }

    /**设置价格ui图标 */
    private setPriceIcon() {

        let priceUI = this.worldUI_2.getTargetUIWidget().rootContent;
        let icon = priceUI.findChildByPath("Canvas/mPic_Coin") as mw.Image;
        if (this.cfgID < 2000) {
            icon.imageGuid = GameConfig.Coins.getElement(1).Icon1;
        } else if (this.cfgID < 3000)
            icon.imageGuid = GameConfig.Coins.getElement(3).Icon1;
        else if (this.cfgID < 4000)
            icon.imageGuid = GameConfig.Coins.getElement(4).Icon1;
    }


    /**概率ui刷新 */
    private rateUIRefresh() {
        this.attachObj();
        this.petArr.length = 0;
        let panel = this.worldUI_1.getTargetUIWidget().rootContent;

        //设置宠物集合
        EggUIPool.instance.UIPool.resetAll();
        let petCanvas = panel.findChildByPath("Canvas") as mw.Canvas;

        this.cfg.petArr.forEach((item, index) => {
            let perfab = EggUIPool.instance.UIPool.get();
            perfab.refreshUI(this.cfgID, index);
            this.petArr.push(perfab);
            perfab.uiObject.size = perfab.mImage.size;
            petCanvas.addChild(perfab.uiObject);

            this.checkIsGet(item) ? perfab.setBackVis(false) : perfab.setBackVis(true);
        });

        let worldUISize = GlobalData.EggMachine.probabilityWorldUISize;
        let offY = GlobalData.EggMachine.probabilityWorldUIOffsetY;

        let count = this.cfg.petArr.length;
        let yCount = Math.ceil(count / 3);//一行3个
        let yLen = yCount * (70 + 12) + 10;  //大小 + 间隔 + 上下间隔
        if (yLen > worldUISize.y) {
            yLen = offY + yLen;
            this.worldUIImg.size = new mw.Vector(this.worldUIImg.size.x, yLen);
        } else {
            this.worldUIImg.size = new mw.Vector(worldUISize.x, worldUISize.y + offY);
        }
        this.worldUI_1.refresh();
    }

    //解锁世界后，解锁对应的扭蛋机
    private changeArea(areaId: number, level: number) {
        if (level == 2 && this.cfg.AreaID == areaId) {
            this.setLockState(false)
        }
    }

    private enterTrigger(obj: mw.GameObject) {
        if (PlayerManagerExtesion.isCharacter(obj) == false) {
            return;
        }
        let char = obj as mw.Character;
        if (char != Player.localPlayer.character) return;
        this.setFingerEff(false);
        setTimeout(() => {
            if (this.trigger.checkInArea(obj)) {
                InterBtn.instance.show(this.petEgg, this.checkCanBuy.bind(this));
                this.rateUIRefresh();
                this.setWorldUIVis(this.worldUI_1, true);
            }
        }, 500);


    }

    private exitTrigger(obj: mw.GameObject) {
        if (PlayerManagerExtesion.isCharacter(obj) == false) {
            return;
        }
        let char = obj as mw.Character;
        if (char != Player.localPlayer.character) return;

        this.setFingerEff(true);
        InterBtn.instance.hide();
        this.setWorldUIVis(this.worldUI_1, false);
        this.detachObj();
    }

    private setWorldUIVis(ui: mw.UIWidget, isVis: boolean) {
        ui.setVisibility(isVis ? mw.PropertyStatus.On : mw.PropertyStatus.Off);
    }





    private checkCanBuy() {
        let price = this.cfg.Price[0];
        let mgs = "";
        if (price > 0) {
            mgs = utils.Format(GameConfig.Language.Text_messagebox_3.Value, utils.formatNumber(price));
        }
        MessageBox.showTwoBtnMessage(mgs, (res) => {
            if (res)
                this.buyEgg(price);
        })
    }


    private async buyEgg(price: number) {

        let petMC = ModuleService.getModule(PetBagModuleC);

        if (petMC.getCurPetNum() >= petMC.getBagCapacity()) {
            MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_4.Value);
            return;
        }

        let res = await petMC.buyEgg(this.cfgID);
        if (res !== null) {
            this.hasArr.push(res);
            this.getEgg(res);
            EggMachineTween.instance.startTween(this.petEgg, res, this.cfg.id);
            AnalyticsTool.action_buy_item(this.cfgID);
            this.broadcastExecuteAchievement(res);
        } else {
            MessageBox.showOneBtnMessage(GameConfig.Language.Text_tips_4.Value);
        }
    }

    /**广播成就 (开蛋次数|孵化出稀有宠物|孵化出稀有宠物|孵化出传说宠物|孵化出神话宠物)*/
    private broadcastExecuteAchievement(id: number) {
        oTraceError("开蛋成功一次");
        this.achievementModuleC.onExecuteAchievementAction.call(GlobalEnum.AchievementType.OpenEggNum, 1);

        let achievementType: GlobalEnum.AchievementType = null;
        let cfg = GameConfig.PetARR.getElement(id);
        switch (cfg.QualityType) {
            case GlobalEnum.PetQuality.Rare:
                achievementType = GlobalEnum.AchievementType.HatchRarePetNum;
                break;
            case GlobalEnum.PetQuality.Epic:
                achievementType = GlobalEnum.AchievementType.HatchEpicPetNum;
                break;
            case GlobalEnum.PetQuality.Legend:
                achievementType = GlobalEnum.AchievementType.HatchLegendPetNum;
                break;
            case GlobalEnum.PetQuality.Myth:
                achievementType = GlobalEnum.AchievementType.HatchMythPetNum;
                break;
            default:
                break;
        }
        if (achievementType == null) return;
        this.achievementModuleC.onExecuteAchievementAction.call(achievementType, 1);
    }

    private getEgg(id: number) {
        let pet = this.petArr.find((item) => {
            return item.id == id
        });
        if (pet)
            pet.setBackVis(false);
    }

    /**判断是否获得 */
    private checkIsGet(id: number): boolean {

        if (this.hasArr.indexOf(id) != -1) {
            return true;
        }

        return false;
    }

    /**中间旋转值 */
    private tempRotate: mw.Rotation = new mw.Rotation(0, 0, 0);

    public onUpdate(dt: number): void {
        if (!this.useUpdate) return;
        if (this.petEgg != null) {
            this.tempRotate.z += 1;
            this.tempRotate.z %= 360;
            this.petEgg.worldTransform.rotation = (this.tempRotate);
        }
    }


}
