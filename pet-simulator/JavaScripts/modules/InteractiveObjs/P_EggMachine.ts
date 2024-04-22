import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import PetGet_Generate from "../../ui-generate/Pet/PetGet_generate";
import EggInfo_Generate from "../../ui-generate/WorldUI/EggInfo_generate";
import EggInteract_Generate from "../../ui-generate/WorldUI/EggInteract_generate";
import { cubicBezier } from "../../util/MoveUtil";
import { Singleton } from "../../util/uitls";
import { DollMachineModuleC } from "../DollMachine/DollMachineModuleC";
import { P_HudUI } from "../Hud/P_HudUI";


/**蛋信息 UI */
export class EggInfo extends EggInfo_Generate {


    public id: number;

    /**刷新ui */
    public refreshUI(cfgId: number, index: number) {
        let eggMachineCfg = GameConfig.EggMachine.getElement(cfgId);
        let eggCfg = GameConfig.PetARR.getElement(eggMachineCfg.petArr[index])
        this.id = eggCfg.id;
        this.setSpecial(eggCfg.id);

        if (eggMachineCfg.petArr.length - 1 == index && eggMachineCfg.Weight2) { //最后一个 显示？？
            this.mText.text = "??";
        } else {
            this.mText.text = (eggMachineCfg.Weight[index]) + "%";
        }

        this.mImage.imageGuid = eggCfg.uiGuid;

        this.mText.fontColor = mw.LinearColor.colorHexToLinearColor(this.setQuality(eggCfg.id))
    }


    public setBackVis(isVis: boolean) {
        this.mImage.setImageColorByHex(isVis ? GlobalData.EggMachine.unGetColor : "#FFFFFFFF")
    }
    /**特殊化 */
    private setSpecial(id: number) {
        const dev = GlobalEnum.PetDevType;
        let cfg = GameConfig.PetARR.getElement(id);
        if (cfg.DevType == dev.Normal) {
            //普通
            this.mPic_Heart.visibility = mw.SlateVisibility.Collapsed;
        }
        if (cfg.DevType == dev.Love) {
            //爱心化
            this.mPic_Heart.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        }
    }
    private setQuality(id: number) {
        let color = "";
        const quality = GlobalEnum.PetQuality;
        let colors = GlobalData.Bag.rareColor;

        let cfg = GameConfig.PetARR.getElement(id);
        let type = cfg.QualityType;
        if (type == quality.Normal) {
            color = colors[0];
        } else if (type == quality.Rare) {
            color = colors[1];
        } else if (type == quality.Epic) {
            color = colors[2];
        }
        else if (cfg.QualityType == quality.Legend) {//传说
            color = colors[3];
        } else if (cfg.QualityType == quality.Myth) { //神话
            color = colors[4];
        }
        return color;
    }

}

/**获得蛋ui */
export class P_EggGet extends PetGet_Generate {

    private flashTween: mw.Tween<{ alapr: number }> = null;
    private infoTween: mw.Tween<{ scale: number }> = null;

    onStart(): void {
        this.mCanvas.visibility = mw.SlateVisibility.Collapsed;
        let flashBezier = GlobalData.EggMachine.flashTweenBezier;
        this.flashTween = new mw.Tween<{ alapr: number }>({ alapr: 1 }).to({ alapr: 0 }, GlobalData.EggMachine.flashTweenTime).onUpdate((obj) => {
            this.mPic_Flash.renderOpacity = obj.alapr;
        }).onComplete(() => {
            this.flashEnd();
        }).easing(cubicBezier(flashBezier[0], flashBezier[1], flashBezier[2], flashBezier[3]));

        let infoBezier = GlobalData.EggMachine.petInfoTweenBezier;
        this.infoTween = new mw.Tween<{ scale: number }>({ scale: 0 }).to({ scale: 1 }, GlobalData.EggMachine.petInfoTweenTime).onUpdate((obj) => {
            this.mCanvas.renderScale = new mw.Vector2(obj.scale, obj.scale);
        }).onComplete(() => {
            this.infoEnd();
        }).easing(cubicBezier(infoBezier[0], infoBezier[1], infoBezier[2], infoBezier[3]));
    }

    /**闪屏结束 */
    public flashEnd(): void {
        this.mPic_Flash.renderOpacity = 0;
        this.mCanvas.visibility = mw.SlateVisibility.Visible;
        this.flashTween.stop();
        this.infoTween.start();
    }

    /**缩放结束 */
    public infoEnd(): void {
        this.mCanvas.renderScale = mw.Vector2.one;
        this.infoTween.stop();
    }

    public setInfo(id: number) {
        let cfg = GameConfig.PetARR.getElement(id);
        this.mImage.imageGuid = cfg.uiGuid;
        this.mNameText.text = cfg.petName;
        this.setBtnColor(cfg.QualityType);
        let qId = cfg.QualityType - 1;
        if (id < 0) qId = 0;
        this.mQualityText.fontColor = mw.LinearColor.colorHexToLinearColor(GlobalData.Bag.rareColor[qId]);
        this.mPic_Flash.renderOpacity = 1;
        this.mCanvas.visibility = mw.SlateVisibility.Collapsed;
        this.show();
    }

    protected onShow(...params: any[]): void {
        this.flashTween.start();
    }
    private setBtnColor(type: number) {
        const quality = GlobalEnum.PetQuality
        let str: string;
        if (type == quality.Normal) {
            str = GameConfig.Language.PetARR_Quality_1.Value;
        } else if (type == quality.Rare) {
            str = GameConfig.Language.PetARR_Quality_2.Value;
        } else if (type == quality.Epic) {
            str = GameConfig.Language.PetARR_Quality_3.Value;
        }
        else if (type == quality.Legend) {//传说
            str = GameConfig.Language.PetARR_Quality_4.Value;
        } else if (type == quality.Myth) { //神话
            str = GameConfig.Language.PetARR_Quality_5.Value;
        }
        this.mQualityText.text = str;
    }

}
@Singleton()
export class InterBtn {
    public root: mw.UserWidgetPrefab = null;
    private btn: mw.StaleButton = null;
    private callBack: Function = null;
    private obj: mw.GameObject = null;
    private inter: any;
    private offset: mw.Vector2;
    public static instance: InterBtn;

    constructor() {
        this.root = mw.createUIByName("WorldUI/EggInteract");
        this.root.size = new mw.Vector(100, 100);
        this.btn = (this.root.findChildByPath("RootCanvas/Button")) as mw.StaleButton;
        mw.UIService.getUI(P_HudUI, false).rootCanvas.addChild(this.root);
        this.btn.onClicked.add(() => {
            this.callBack();
        });
        this.hide();
    }


    public show(obj: mw.GameObject, callBack: Function, offset = new mw.Vector2(0, 0)): void {
        this.offset = offset;
        this.obj = obj;
        this.callBack = callBack;
        this.clear();
        this.inter = TimeUtil.setInterval(this.update.bind(this), 0.05);
        this.root.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        //挂null上的key是全局的，先把娃娃机的取消掉
        KeyOperationManager.getInstance().unregisterKey(null, Keys.F);
        KeyOperationManager.getInstance().onKeyUp(Keys.F, null, () => {
            this.callBack();
        });

    }

    private update() {
        let pos = mw.InputUtil.projectWorldPositionToWidgetPosition(this.obj.worldTransform.position, false).screenPosition;
        this.root.position = pos.subtract(this.root.size.multiply(0.5).add(this.offset));
    }
    private clear() {
        if (this.inter == null) return;
        TimeUtil.clearInterval(this.inter);
        this.inter = null;
    }

    public hide(): void {
        this.clear();
        this.root.visibility = (mw.SlateVisibility.Collapsed);
        KeyOperationManager.getInstance().unregisterKey(null, Keys.F);
        //由于都是f键绑在null上，需要把娃娃机的f键再注册上
        ModuleService.getModule(DollMachineModuleC).setDollMachineShortcutKey();
    }
}