import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { IAreaDivideElement } from "../../config/AreaDivide";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import WallInteract_Generate from "../../ui-generate/WorldUI/WallInteract_generate";
import MessageBox from "../../utils/MessageBox";
import { utils } from "../../utils/uitls";
import AchievementModuleC from "../AchievementModule/AchievementModuleC";
import { AreaModuleC } from "../AreaDivide/AreaModuleC";
import { PlayerModuleC } from "../Player/PlayerModuleC";


export class SceneWall {


    private achievementModuleC: AchievementModuleC = null;
    private cfg: IAreaDivideElement = null;
    private trigger: mw.Trigger = null;
    private worldUI: mw.UIWidget = null;
    private wall: mw.GameObject = null;

    private canInter: boolean = false;
    private gameObj: mw.GameObject;

    constructor(public cfgID: number) {
        this.cfg = GameConfig.AreaDivide.getElement(cfgID);
        this.findObj();
        this.achievementModuleC = ModuleService.getModule(AchievementModuleC);
    }

    private async findObj() {
        this.gameObj = await GameObject.asyncFindGameObjectById(this.cfg.Guid);
        this.wall = this.gameObj.getChildByName("墙") as mw.GameObject;
        this.worldUI = this.gameObj.getChildByName("世界UI") as mw.UIWidget;

        this.setLockState(this.isUnlock());
    }

    /**是解锁中 */
    private isUnlock(): boolean {
        return ModuleService.getModule(AreaModuleC).isArealock(this.cfgID);
    }

    private initTrigger() {
        this.trigger = this.gameObj.getChildByName("触发器") as mw.Trigger;
        this.trigger.onEnter.add(this.enterTrigger.bind(this));
        this.trigger.onLeave.add(this.exitTrigger.bind(this));
    }
    private enterTrigger(obj: mw.GameObject) {
        if (!this.canInter) return;
        if (PlayerManagerExtesion.isCharacter(obj) == false) {
            return;
        }
        let char = obj as mw.Character;
        if (char != Player.localPlayer.character) return;
        mw.UIService.getUI(WallInteract_Generate).mBtn_Interact.onClicked.add(() => {
            this.checkCanBuy();
        })
        // InterBtn.instance.show(this.gameObj, this.checkCanBuy.bind(this));
        mw.UIService.getUI(WallInteract_Generate).show();
    }

    private exitTrigger(obj: mw.GameObject) {
        if (!this.canInter) return;
        if (PlayerManagerExtesion.isCharacter(obj) == false) {
            return;
        }
        let char = obj as mw.Character;
        if (char != Player.localPlayer.character) return;
        mw.UIService.getUI(WallInteract_Generate).mBtn_Interact.onClicked.clear();
        mw.UIService.getUI(WallInteract_Generate).hide();
        //InterBtn.instance.hide();
    }

    private initWorldUI() {

        let root = this.worldUI.getTargetUIWidget().rootContent;
        let priceImg = root.findChildByPath("mPic_coins") as mw.Image;
        let priceText = root.findChildByPath("mText_Coin") as mw.TextBlock;
        let tipsText = root.findChildByPath("TextBlock_1") as mw.TextBlock;
        tipsText.text = GameConfig.Language.World_3D_8.Value;
        let areaCfg = GameConfig.AreaDivide.getElement(this.cfgID);
        let coinType = GameConfig.Coins.getElement(areaCfg.Type);
        priceImg.imageGuid = coinType.Icon2;
        priceText.text = utils.formatNumber(areaCfg.Gold);
        // tipsText = root.findChildByPath("mText_AreaNum") as mw.TextBlock;

        // if (areaCfg.id > 1000 && areaCfg.id < 2000) {
        //     tipsText.text = (areaCfg.id - 1001).toString();
        // } else if (areaCfg.id > 2000) {
        //     tipsText.text = (areaCfg.id - 2002).toString();
        // }

    }

    private setWoldUIVisible(visible: boolean) {
        if (this.worldUI == null) {
            return;
        }
        this.worldUI.setVisibility(visible ? mw.PropertyStatus.On : mw.PropertyStatus.Off);
    }

    private checkCanBuy() {

        let mgs = "";
        if (this.cfg.Gold > 0) {
            mgs = utils.Format(GameConfig.Language.Text_messagebox_3.Value, utils.formatNumber(this.cfg.Gold));
        }
        MessageBox.showTwoBtnMessage(mgs, (res) => {
            if (res)
                this.buyWorld(this.cfg.Gold);
        })
    }
    /**判断几世界的金币 */
    private judgeGold() {
        let coinType = GlobalEnum.CoinType;

        let goldType = coinType.FirstWorldGold;

        if (this.cfgID < 2000) {
            goldType = coinType.FirstWorldGold;
        } else if (this.cfgID < 3000) {
            goldType = coinType.SecondWorldGold;
        } else if (this.cfgID < 4000) {
            goldType = coinType.ThirdWorldGold;
        }
        return goldType;
    }

    private async buyWorld(value: number) {
        let isCan: boolean = true;
        isCan = await ModuleService.getModule(PlayerModuleC).reduceGold(value, this.judgeGold());

        if (!isCan) {
            MessageBox.showOneBtnMessage(GameConfig.Language.Text_tips_4.Value);
            return;
        }

        ModuleService.getModule(AreaModuleC).addWolrdArea(this.cfgID);
        this.achievementModuleC.onExecuteAchievementAction.call(GlobalEnum.AchievementType.AreaOpenNum, 1);//区域开放数
    }
    //解锁世界后，解锁对应的扭蛋机
    public changeArea(areaId: number, level: number) {
        if (level == 2 && this.cfgID == areaId) {
            this.setLockState(false)
        }
    }
    /**设置是否解锁状态 */
    private setLockState(isLock: boolean) {

        if (isLock) {
            this.canInter = true;
            this.initTrigger();
            this.initWorldUI();
            this.setWoldUIVisible(true);
        } else {
            mw.UIService.getUI(WallInteract_Generate).hide();
            this.canInter = false;
            if (this.trigger) {
                this.trigger.onEnter.remove(this.enterTrigger.bind(this))
                this.trigger.onLeave.remove(this.exitTrigger.bind(this))
            }
            setTimeout(() => {
                this.wall.destroy();
                this.worldUI.destroy();
                this.gameObj.destroy();
            }, 1000);
        }
    }
}