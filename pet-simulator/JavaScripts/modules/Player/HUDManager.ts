import { SpawnManager, SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import { ObjectPoolServices } from "../../Tools/ObjectPool";
import { GlobalData } from "../../const/GlobalData";
import { IPetARRElement } from "../../config/PetARR";
import { cubicBezier } from "../../utils/MoveUtil";
import { GameConfig } from "../../config/GameConfig";
import { PlayerManagerExtesion } from '../../Modified027Editor/ModifiedPlayer';



export class HUDManager {
    private static _instance: HUDManager;
    public static get instance(): HUDManager {
        if (!this._instance) {
            this._instance = new HUDManager();
        }
        return this._instance;
    }

    private hudInfoMap: Map<string, HUDInfo> = new Map();
    /**血条UI */
    private hpUIMap: Map<string, HpUI> = new Map();

    /**归还HP */
    public recHpUI(id: string) {
        if (!this.hpUIMap.has(id)) return;
        let hpUI = this.hpUIMap.get(id);
        ObjectPoolServices.getPool(HpUI).return(hpUI);
        hpUI.close();
        this.hpUIMap.delete(id);
    }
    /**获取HP */
    public async getHpUI(id: string, obj: mw.GameObject, count: string, name: string): Promise<HpUI> {
        if (this.hpUIMap.has(id)) {
            return this.hpUIMap.get(id);
        } else {
            let a = ObjectPoolServices.getPool(HpUI).spawn();
            await a.open(obj, count, name);
            this.hpUIMap.set(id, a);
            return a;
        }
    }

    /**归还HUD */
    public recHUDInfo(id: string) {
        if (!this.hudInfoMap.has(id)) return;
        let pInfo = this.hudInfoMap.get(id);
        ObjectPoolServices.getPool(HUDInfo).return(pInfo);
        pInfo.close();
        this.hudInfoMap.delete(id);
    }
    /**获取HUD */
    public async getHUDInfo(id: string, obj: mw.GameObject, count: string, name: string, info: IPetARRElement, dis: number): Promise<HUDInfo> {
        if (this.hudInfoMap.has(id)) {
            return this.hudInfoMap.get(id);
        } else {
            let a = ObjectPoolServices.getPool(HUDInfo).spawn();
            await a.open(obj, count, name, info, dis);
            this.hudInfoMap.set(id, a);
            return a;
        }
    }
}
/**世界UI资源id */
const UIWidgetID = "16037";
/**平面血条UI */
const plantUI = "7E5BBC4848AA5F53807F95BACE7218AC";

export class HUDInfo {
    private uiObj: mw.UIWidget = null;

    private txt_name: mw.TextBlock;
    private txt_count: mw.TextBlock;
    private speedCanvas: mw.Canvas;

    /**加速canvas出现高度 */
    private speedCanvasHeight: number = GlobalData.PetSpeedUp.height;
    /**加速canvas出现时间 */
    private speedCanvasTime: number = GlobalData.PetSpeedUp.tweenTime;
    /**加速canvas出现贝塞尔值 */
    private tweenBezier: number[] = GlobalData.PetSpeedUp.tweenBezier;
    /**加速canvas出现时的tween */
    private speedCanvasTween: mw.Tween<{ y: number, alpha: number }> = null;

    constructor() {

    }

    public async open(obj: mw.GameObject, count: string, name: string, info: IPetARRElement, dis: number): Promise<void> {
        if (!this.uiObj) {
            if (PlayerManagerExtesion.isCharacter(obj)) {
                this.uiObj = obj.overheadUI;
            } else {
                this.uiObj = SpawnManager.spawn({ guid: UIWidgetID }) as mw.UIWidget;
            }
        }
        this.uiObj.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
        this.uiObj.setUIbyID(plantUI);
        this.uiObj.headUIMaxVisibleDistance = dis;
        this.uiObj.occlusionEnable = true;
        this.uiObj.selfOcclusion = true;
        this.uiObj.worldTransform.position = mw.Vector.zero;
        this.uiObj.drawSize = GlobalData.worldUI.petHeadUISize;
        this.uiObj.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
        //是玩家
        if (PlayerManagerExtesion.isCharacter(obj)) {
            this.uiObj.localTransform.position = (new mw.Vector(0, 0, 85));
        } else if (obj instanceof Character) {
            //是npc
            this.uiObj.parent = obj;
            this.uiObj.localTransform.position = (new mw.Vector(0, 0, 150));
        } else {
            this.uiObj.parent = obj;
            let offset = GlobalData.worldUI.petHeadUIOffset;
            if (info.MoveWay == 2) offset = GlobalData.worldUI.flyPetHeadUIOffset;
            this.uiObj.localTransform.position = (offset);
        }

        let targetUI = this.uiObj.getTargetUIWidget();
        this.txt_name = targetUI.findChildByPath("Canvas/mCanvas_1/mTex_name") as mw.TextBlock;
        this.txt_count = targetUI.findChildByPath("Canvas/mCanvas_1/mTex_count") as mw.TextBlock;
        this.speedCanvas = targetUI.findChildByPath("Canvas/mCanvas_1/Canvas_1") as mw.Canvas;
        let text = targetUI.findChildByPath("Canvas/mCanvas_1/Canvas_1/mTex_speed") as mw.TextBlock;
        text.text = GameConfig.Language.World_3D_15.Value;
        this.speedCanvas.position = new mw.Vector2(0, this.speedCanvasHeight);
        this.speedCanvas.renderOpacity = 0;
        this.speedCanvas.visibility = mw.SlateVisibility.Collapsed;
        let id = info.QualityType - 1;
        if (id < 0) id = 0;
        this.txt_count.fontColor = mw.LinearColor.colorHexToLinearColor(GlobalData.Bag.rareColor[id]);
        this.updateInfo(count, name);
        this.uiObj.setVisibility(mw.PropertyStatus.On);
    }
    close(): void {
        if (!this.uiObj) return;
        this.speedCanvas.visibility = mw.SlateVisibility.Collapsed;
        this.speedCanvas.position = new mw.Vector2(0, this.speedCanvasHeight);
        this.speedCanvas.renderOpacity = 0;
        this.uiObj.setVisibility(mw.PropertyStatus.Off);
        this.uiObj.worldTransform.position = new mw.Vector(0, 0, -8000);
        this.uiObj.parent = null;
    }

    show(): void {
        this.uiObj.setVisibility(mw.PropertyStatus.On);
    }

    hide(): void {
        this.uiObj.setVisibility(mw.PropertyStatus.Off);
    }

    /**是否加速中 */
    private isSpeeding: boolean = false;

    /**开始加速 */
    startSpeed(): void {
        if (this.isSpeeding) return;
        this.isSpeeding = true;
        this.speedCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.moveToTarget(0, 1, true);
    }

    /**停止加速 */
    stopSpeed(): void {
        if (!this.isSpeeding) return;
        this.isSpeeding = false;
        this.moveToTarget(this.speedCanvasHeight, 0, false);
    }

    /**加速canvas移动至目标 */
    private moveToTarget(targetY: number, targetAlpha: number, isShow: boolean): void {
        let currentZ = this.speedCanvas.position.y;
        let currentAlpha = this.speedCanvas.renderOpacity;
        if (this.speedCanvasTween) {
            this.speedCanvasTween.stop();
        }
        this.speedCanvasTween = new mw.Tween<{ y: number, alpha: number }>({ y: currentZ, alpha: currentAlpha })
            .to({ y: targetY, alpha: targetAlpha }, this.speedCanvasTime * 1000)
            .easing(cubicBezier(this.tweenBezier[0], this.tweenBezier[1], this.tweenBezier[2], this.tweenBezier[3]))
            .onUpdate((obj) => {
                this.speedCanvas.position = new mw.Vector2(0, obj.y);
                this.speedCanvas.renderOpacity = obj.alpha;
            })
            .onComplete(() => {
                this.speedCanvas.visibility = isShow ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
            })
            .start();
    }

    /**更新信息 */
    updateInfo(count: string, name: string): void {
        this.txt_name.text = count;
        this.txt_count.text = name;
        this.uiObj.refresh();
    }

}

export class HpUI {
    private uiObj: mw.UIWidget = null;

    private txt_name: mw.TextBlock;
    private hp_progress: mw.ProgressBar;
    private txt_count: mw.TextBlock;

    constructor() {

    }

    public async open(obj: mw.GameObject, count: string, name: string) {
        if (PlayerManagerExtesion.isCharacter(obj)) {
            this.uiObj = obj.overheadUI;
        } else {
            this.uiObj = SpawnManager.spawn({ guid: UIWidgetID }) as mw.UIWidget;
        }
        this.uiObj.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
        this.uiObj.setUIbyID(plantUI);
        this.uiObj.headUIMaxVisibleDistance = GlobalData.worldUI.headUIMAxVisDistance;
        this.uiObj.occlusionEnable = true;
        this.uiObj.selfOcclusion = true;
        this.uiObj.worldTransform.position = mw.Vector.zero;
        this.uiObj.drawSize = new mw.Vector2(370, 200);
        this.uiObj.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
        if (PlayerManagerExtesion.isCharacter(obj)) {
            this.uiObj.localTransform.position = (new mw.Vector(0, 0, 85));
        } else {
            this.uiObj.parent = obj;
            this.uiObj.localTransform.position = (new mw.Vector(0, 0, 350));
        }

        let targetUI = this.uiObj.getTargetUIWidget();
        this.txt_name = targetUI.findChildByPath("Canvas/mCanvas_1/mTex_name") as mw.TextBlock;
        this.hp_progress = targetUI.findChildByPath("Canvas/mCanvas_1/mHpPro") as mw.ProgressBar;
        this.txt_count = targetUI.findChildByPath("Canvas/mCanvas_1/mTex_count") as mw.TextBlock;
        this.updateInfo(count, name);
        this.uiObj.setVisibility(mw.PropertyStatus.On);
    }
    close() {
        console.error("this.uiObjClose")
    }
    updateInfo(count: string, name: string) {
        this.txt_name.text = name ? name : "";
        this.txt_count.text = count;
        this.uiObj.refresh();
    }

}