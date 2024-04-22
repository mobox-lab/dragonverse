import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { IAreaDivideElement } from "../../config/AreaDivide";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import MessageBox from "../../util/MessageBox";
import { utils } from "../../util/uitls";
import AchievementModuleC from "../AchievementModule/AchievementModuleC";
import { AreaModuleC } from "../AreaDivide/AreaModuleC";
import { PlayerModuleC } from "../Player/PlayerModuleC";
import { InterBtn } from "./P_EggMachine";



/**传送门 */
export class TeleportationGate {

    private achievementModuleC: AchievementModuleC = null;
    private cfg: IAreaDivideElement = null;
    private trigger: mw.Trigger;

    private canTransfer: boolean = false;

    /**圆柱 */
    private cylinder: mw.GameObject;
    private worldUI: mw.UIWidget;
    private gameObject: mw.GameObject;

    constructor(public cfgID: number) {
        this.cfg = GameConfig.AreaDivide.getElement(this.cfgID);
        this.findObj();
        this.achievementModuleC = ModuleService.getModule(AchievementModuleC);
    }

    private async findObj() {
        this.gameObject = await GameObject.asyncFindGameObjectById(this.cfg.Guid);
        this.cylinder = this.gameObject.getChildByName("圆柱") as mw.GameObject;
        this.worldUI = this.gameObject.getChildByName("世界UI") as mw.UIWidget;
        let landName = this.gameObject.getChildByName("IslandName") as mw.UIWidget;
        let root = this.worldUI.getTargetUIWidget().rootContent
        let text = root.findChildByPath("Canvas/mText_Need") as mw.TextBlock;
        text.text = GameConfig.Language.World_3D_8.Value;
        text = landName.getTargetUIWidget().rootContent.findChildByPath("TextBlock") as mw.TextBlock;
        text.text = this.cfg.Name;
        this.setLockState(this.isUnlock());
    }



    /**是解锁中 */
    private isUnlock(): boolean {
        return ModuleService.getModule(AreaModuleC).isArealock(this.cfgID);
    }

    private initTrigger() {
        this.gameObject.getChildren().forEach((item) => {
            if (item.name.includes("触发器"))
                this.trigger = item as mw.Trigger;
        })
        this.trigger.onEnter.add(this.enterTrigger.bind(this));
        this.trigger.onLeave.add(this.exitTrigger.bind(this));
    }
    private enterTrigger(obj: mw.GameObject) {

        if (PlayerManagerExtesion.isCharacter(obj) == false) {
            return;
        }
        let char = obj as mw.Character;
        if (char != Player.localPlayer.character) return;
        setTimeout(() => {
            if (this.trigger.checkInArea(obj)) {
                if (this.canTransfer)
                    InterBtn.instance.show(this.cylinder, this.transfer.bind(this));
                else
                    InterBtn.instance.show(this.cylinder, this.checkCanBuy.bind(this));

            }
        }, 500);
    }
    private transfer() {
        if (!this.cfg) {
            MessageBox.showOneBtnMessage(GameConfig.Language.Portol_Tip_2.Value);
            return;
        }
        let char = Player.localPlayer.character;
        char.worldTransform.position = this.cfg.Loc.add(new mw.Vector(0, 0, 99));
        ModuleService.getModule(AreaModuleC).onTransmit.call(1);
    }

    private exitTrigger(obj: mw.GameObject) {
        if (PlayerManagerExtesion.isCharacter(obj) == false) {
            return;
        }
        let char = obj as mw.Character;
        if (char != Player.localPlayer.character) return;
        InterBtn.instance.hide();
    }

    private setCylinderVisible(visible: boolean) {
        if (this.cylinder == null) {
            return;
        }

        this.cylinder?.setVisibility(visible ? mw.PropertyStatus.On : mw.PropertyStatus.Off);
    }

    private setWorldUIVisible(visible: boolean) {
        if (this.worldUI == null) {
            return;
        }
        this.worldUI?.setVisibility(visible ? mw.PropertyStatus.On : mw.PropertyStatus.Off);
    }
    private initWorldUI() {
        let root = this.worldUI.getTargetUIWidget().rootContent;
        let text = root.findChildByPath("Canvas/mText_Money") as mw.TextBlock;
        let tips = root.findChildByPath("Canvas/mText_Need") as mw.TextBlock;
        tips.text = GameConfig.Language.World_3D_8.Value;
        if (!this.cfg) {
            text.text = GameConfig.Language.Portol_Tip_2.Value;
        } else {
            text.text = utils.Format(GameConfig.Language.Portol_Tip_1.Value, utils.formatNumber(this.cfg.Gold));
        }
    }

    private checkCanBuy() {
        if (!this.cfg) {
            MessageBox.showOneBtnMessage(GameConfig.Language.Portol_Tip_2.Value);
            return;
        }
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
        this.initTrigger();
        if (isLock) {
            this.canTransfer = false;
            this.setCylinderVisible(false);
            this.initWorldUI();
            this.setWorldUIVisible(true);
        } else {
            InterBtn.instance.hide();
            this.setCylinderVisible(true);
            this.setWorldUIVisible(false);
            this.canTransfer = true;
            this.worldUI.destroy();
            this.worldUI = null;
        }

        if (!this.cfg) {
            this.setCylinderVisible(false);
            this.initWorldUI();
            this.setWorldUIVisible(true);
        }
    }



}