import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { GameConfig } from "../../config/GameConfig";
import { IPetARRElement } from "../../config/PetARR";
import { GlobalData } from "../../const/GlobalData";
import { oTraceError } from "../../util/LogManager";
import { AreaDivideManager } from "../AreaDivide/AreaDivideManager";
import { CollectModuleC } from "../PetCollect/CollectModuleC";
import { CollectModuleData } from "../PetCollect/CollectModuleData";
import { P_Collect } from "../PetCollect/P_Collect";

/**收集 交互物 */
export default class Collect extends mw.Script {

    private worldUI: mw.UIWidget = null;
    private trigger: mw.Trigger = null;

    //UI相关
    private petImage: mw.Image;
    private undenfinImg: mw.Image;
    private curPet: mw.TextBlock;
    private curPercent: mw.TextBlock;


    private cfgs: IPetARRElement[];

    private hasArr: number[] = [];

    protected async onStart(): Promise<void> {
        await ModuleService.ready();

        if (!GlobalData.Global.isOpenCollectMachine) {
            return;
        }

        this.cfgs = GameConfig.PetARR.getAllElement();

        ModuleService.ready().then(() => {

            ModuleService.getModule(CollectModuleC).collectCountAC.add(this.setInfo.bind(this));
            this.hasArr = DataCenterC.getData(CollectModuleData).HasArr;
            this.setInfo(this.hasArr.length);
            this.startShow();
        });

        AreaDivideManager.instance.onAreaChangeAC.add(this.onAreaChange.bind(this));

        this.worldUI = this.gameObject.getChildByName("世界UI") as mw.UIWidget;
        this.trigger = this.gameObject.getChildByName("触发器") as mw.Trigger;
        this.trigger.onEnter.add(this.enterTrigger.bind(this));
        this.trigger.onLeave.add(this.exitTrigger.bind(this));

        this.initUI();
    }
    private enterTrigger(obj: mw.GameObject) {
        if (PlayerManagerExtesion.isCharacter(obj) == false) {
            return;
        }
        let char = obj as mw.Character;
        if (char != Player.localPlayer.character) return;
        ModuleService.getModule(CollectModuleC).showCollectUI();
    }

    private exitTrigger(obj: mw.GameObject) {
        if (PlayerManagerExtesion.isCharacter(obj) == false) {
            return;
        }
        let char = obj as mw.Character;
        if (char != Player.localPlayer.character) return;
        let collectUI = mw.UIService.getUI(P_Collect);
        // if (collectUI && collectUI.visible)
        //     mw.UIService.getUI(P_Collect).hide();
    }

    private onAreaChange(preId: number, curId: number) {
        if (preId < 3000 && curId > 3000) {
            this.setPos(1);
        } else if (preId > 2000 && curId < 2000) {
            this.setPos(0);
        }
        if (curId == 1001 || curId == 3002)
            this.startShow();
        else {
            this.clearImgInterval();
        }
    }
    /**设置机器位置 */
    protected setPos(index: number) {
        this.gameObject.worldTransform.position = GlobalData.Collect.CollectPos[index];
        this.gameObject.worldTransform.rotation = GlobalData.Collect.CollectRot[index];
    }


    private initUI() {
        let root = this.worldUI.getTargetUIWidget().rootContent;
        this.petImage = root.findChildByPath("Canvas/PetImage") as mw.Image;
        this.undenfinImg = root.findChildByPath("Canvas/undefImage") as mw.Image;
        this.curPet = root.findChildByPath("Canvas/curPetText") as mw.TextBlock;
        this.curPercent = root.findChildByPath("Canvas/curPercentText") as mw.TextBlock;
    }

    private setInfo(num: number) {
        this.curPet.text = num.toString() + "Pets";
        this.curPercent.text = (num / this.cfgs.length * 100).toFixed(1) + "%";
        this.hasArr = DataCenterC.getData(CollectModuleData).HasArr;
    }

    /**
     * 设置图片显示
     * @param guid guid
     * @param isHas   是否拥有
     */
    private setPetImage(guid: string, isHas: boolean) {
        this.undenfinImg.visibility = !isHas ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
        this.petImage.imageColor = !isHas ? mw.LinearColor.colorHexToLinearColor("#000000FF") : mw.LinearColor.colorHexToLinearColor("#FFFFFFFF");
        this.imgMoveTween();

        if (!this.petImage.visible) {
            this.petImage.visibility = mw.SlateVisibility.Visible;
        }

        this.petImage.imageGuid = guid;

    }

    private imgInterval: any;

    private startShow() {
        let i = 0;
        this.clearImgInterval();
        this.imgInterval = TimeUtil.setInterval(() => {
            if (this.hasArr.length == 0) return;
            let cfg = GameConfig.PetARR.getElement(this.hasArr[i]);

            this.setPetImage(cfg.uiGuid, true);
            setTimeout(() => {
                this.petImage.visibility = mw.SlateVisibility.Collapsed;
                if (this.undenfinImg.visible) {
                    this.undenfinImg.visibility = mw.SlateVisibility.Collapsed;
                }
            }, 2500);

            i++;
            i = i % this.hasArr.length;
        }, 3)

    }


    private clearImgInterval() {
        if (this.imgInterval) {
            TimeUtil.clearInterval(this.imgInterval);
            this.imgInterval = null;
        }
    }

    private imgMoveTween() {
        let pos = this.petImage.position.clone();
        let tween = new mw.Tween({ x: pos.x }).to({ x: pos.x + 12 }, 100).onUpdate((obj) => {
            this.petImage.position = new mw.Vector2(obj.x, pos.y);
        }).easing((x) => {

            const n1 = 7.5625;
            const d1 = 2.75;

            if (x < 1 / d1) {
                return n1 * x * x;
            } else if (x < 2 / d1) {
                return n1 * (x -= 1.5 / d1) * x + 0.75;
            } else if (x < 2.5 / d1) {
                return n1 * (x -= 2.25 / d1) * x + 0.9375;
            } else {
                return n1 * (x -= 2.625 / d1) * x + 0.984375;
            }
        }).yoyo(true).repeat(1).start();
    }


}
