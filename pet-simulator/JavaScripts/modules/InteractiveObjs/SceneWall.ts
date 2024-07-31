import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { IAreaDivideElement } from "../../config/AreaDivide";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from '../../const/GlobalData';
import WallInteract_Generate from "../../ui-generate/WorldUI/WallInteract_generate";
import MessageBox from "../../util/MessageBox";
import { utils } from "../../util/uitls";
import AchievementModuleC from "../AchievementModule/AchievementModuleC";
import { AreaModuleC } from "../AreaDivide/AreaModuleC";
import { PlayerModuleC } from "../Player/PlayerModuleC";


export class SceneWall {


    private achievementModuleC: AchievementModuleC = null;
    private cfg: IAreaDivideElement = null;
    private trigger: mw.Trigger = null;
    private worldUI: mw.UIWidget = null;
    private wall: mw.GameObject = null;
    private wallObjs: mw.GameObject[] = [];// 场景中的解锁后也展示的墙，解锁后高度变矮
    private canInter: boolean = false;
    private gameObj: mw.GameObject;

    constructor(public cfgID: number) {
        this.cfg = GameConfig.AreaDivide.getElement(cfgID);
        this.findObj();
        this.achievementModuleC = ModuleService.getModule(AchievementModuleC);
    }

    private async findObj() {
        this.gameObj = await GameObject.asyncFindGameObjectById(this.cfg.Guid);
        if (this.gameObj == null) {
            return;
        }
        this.wall = this.gameObj.getChildByName("墙") as mw.GameObject;
        this.worldUI = this.gameObj.getChildByName("世界UI") as mw.UIWidget;
        this.wallObjs = [this.gameObj.getChildByName("平面") as mw.GameObject, this.gameObj.getChildByName("平面-1") as mw.GameObject]

        this.setLockState(this.isLock());
    }

    /**是锁住的 */
    private isLock(): boolean {
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
    private setWallObjIsLock(isLock: boolean) {
        if (!this.wallObjs?.length || isLock) return;
        const newScaleY = isLock ? GlobalData.TransferPoint.wallLockScale : GlobalData.TransferPoint.wallUnlockScale;
        if(this.wallObjs[0]) {
            const preScale = this.wallObjs[0].worldTransform.scale;
            this.wallObjs[0].worldTransform.scale = new Vector( preScale.x, newScaleY, preScale.z);
        }
        if(this.wallObjs[1]) {
            const preScale = this.wallObjs[1].worldTransform.scale;
            this.wallObjs[1].worldTransform.scale = new Vector( preScale.x, newScaleY, preScale.z);
        }
    }


    private checkCanBuy() {
            if(!this.isLock()) return;
        let mgs = "";
        if (this.cfg.Gold > 0) {
            mgs = utils.Format(GameConfig.Language.Text_messagebox_3.Value, utils.formatNumber(this.cfg.Gold));
        }
        MessageBox.showTwoBtnMessage(mgs, (res) => {
            if (res)
                this.buyWorld();
        })
    }

    private async buyWorld() {
        let isCan: boolean = true;
				const cfgID = this.cfgID;
        isCan = await ModuleService.getModule(PlayerModuleC).buyWorld(cfgID);

        if (!isCan) {
            MessageBox.showOneBtnMessage(GameConfig.Language.Text_tips_4.Value);
            return;
        }

        ModuleService.getModule(AreaModuleC).addWorldArea(cfgID);
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
        this.setWallObjIsLock(isLock); 
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
                this.trigger.destroy();
            }, 1000);
        }
    }
}