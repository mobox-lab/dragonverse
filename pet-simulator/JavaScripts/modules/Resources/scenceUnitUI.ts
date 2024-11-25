import { SpawnManager, SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';

import { oTraceError } from "odin";
import { GameConfig } from "../../config/GameConfig";
import ResourceScript, { } from "./Resource";
import { Singleton, utils } from "../../util/uitls";
import { GlobalData } from "../../const/GlobalData";

enum barColor {
    blue,
    orange,
    red,
}

export class ResourceUIPool {

    private static _instance: ResourceUIPool;
    public static get instance(): ResourceUIPool {
        if (!this._instance) {
            this._instance = new ResourceUIPool();
        }
        return this._instance;
    }

    private resourceUIMap: Map<string, resourceUI> = new Map<string, resourceUI>();

    /**世界UI上限 */
    private maxCount: number = 6;

    /**获得UI */
    public getUI(resGuid: string, cfgId: number, curHp: number, rate: number): resourceUI {
        let ui = this.resourceUIMap.get(resGuid);
        if (!ui) {
            if (this.resourceUIMap.size >= this.maxCount) {
                let first = this.resourceUIMap.keys().next().value;
                ui = this.resourceUIMap.get(first);
                this.resourceUIMap.delete(first);
                ui.reset();
            } else {
                ui = new resourceUI();
            }
            this.resourceUIMap.set(resGuid, ui);
        }
        ui.bindObj(resGuid, cfgId, curHp, rate);
        return ui;
    }

    /**回收UI */
    public recycleUI(resGuid: string) {
        let ui = this.resourceUIMap.get(resGuid);
        if (ui) {
            ui.reset();
            this.resourceUIMap.delete(resGuid);
        }
    }

}


export class resourceUI {

    ui: mw.UIWidget;

    private bar_hp: mw.ProgressBar;
    private bloodText: mw.TextBlock;
    private rateText: mw.TextBlock;
    private bar_Type: barColor = barColor.blue;

    private curResGuid: string;
    timer: any;

    constructor() {
        this.ui = SpawnManager.spawn({ guid: "UIWidget" }) as mw.UIWidget;
        this.ui.setUIbyID("E1E49A4D4A7EB8A4E243BB8A4AC9F988");
        this.ui.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
        this.ui.occlusionEnable = false;
        this.ui.headUIMaxVisibleDistance = GlobalData.worldUI.headUIMAxVisDistance;
        let uiRoot = this.ui.getTargetUIWidget().rootContent;
        uiRoot.size = uiRoot.size
        this.ui.drawSize = uiRoot.size
        this.ui.refresh();

        this.bar_hp = uiRoot.findChildByPath("bar_hp") as mw.ProgressBar;
        this.bloodText = uiRoot.findChildByPath("mText_Blood") as mw.TextBlock;
        this.rateText = uiRoot.findChildByPath("TextBlock_1") as mw.TextBlock;
        this.bar_hp.visibility = mw.SlateVisibility.HitTestInvisible;

        this.ui.setVisibility(mw.PropertyStatus.Off);
    }
    reset(): void {
        this.bar_Type = null;
        this.ui.parent = null;
        // this.ui.setVisibility(mw.PropertyStatus.Off);
        this.ui.destroy()
    }

    public bindObj(resGuid: string, cfgId: number, curHp: number, rate: number) {
        this.curResGuid = resGuid;
        let gameObject = GameObject.findGameObjectById(resGuid);

        let cfg = GameConfig.SceneUnit.getElement(cfgId)
        if (rate != 1) {
            this.rateText.text = StringUtil.format(GameConfig.Language.Plaza_Text_12.Value, `${rate}x`);
        } else {
            this.rateText.text = "";
        }

        this.updateHP(cfgId, curHp);

        if (gameObject) {
            this.ui.parent = gameObject;
            this.ui.localTransform.position = (cfg.skewing);
        }

        this.ui.localTransform.rotation = (new mw.Rotation(0, 0, 0));

        this.ui.setVisibility(mw.PropertyStatus.On);
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.timer = 0;
            ResourceUIPool.instance.recycleUI(resGuid);
        }, 1 * 1000);

    }

    updateHP(cfgId: number, curHp: number) {
        //资源类 更新血条
        let maxHp = GameConfig.SceneUnit.getElement(cfgId).HP

        this.bar_hp.currentValue = curHp / maxHp;
        this.bloodText.text = utils.formatNumber(curHp);

        if (curHp <= maxHp * 1 / 3 && this.bar_Type != barColor.red) {
            this.bar_hp.fillImageColor = mw.LinearColor.colorToLinearColor(217, 67, 77);
            this.bar_Type = barColor.red;
            return;
        } else if (curHp > maxHp * 1 / 3 && curHp <= maxHp * 2 / 3 && this.bar_Type != barColor.orange) {
            this.bar_hp.fillImageColor = mw.LinearColor.colorToLinearColor(217, 142, 114);
            this.bar_Type = barColor.orange;
            return;
        } else if (this.bar_Type != barColor.blue && curHp <= maxHp && curHp > maxHp * 2 / 3) {
            this.bar_hp.fillImageColor = mw.LinearColor.colorToLinearColor(76, 208, 217);
            this.bar_Type = barColor.blue;
        }


    }
}

@Singleton()
export class BonusUI {

    public static instance: BonusUI;

    private uiArr: mw.UIWidget[] = [];

    private tempCube: mw.GameObject;

    constructor() {
        const arr = GlobalData.SceneResource.critWorldUI;
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            GameObject.asyncFindGameObjectById(element).then((ui) => {
                this.uiArr.push(ui as mw.UIWidget);
            });
        }
        this.tempCube = SpawnManager.spawn({ guid: "7669" });
        this.tempCube.setVisibility(mw.PropertyStatus.Off);
        this.tempCube.setCollision(mw.PropertyStatus.Off)

    }

    public showBonusUI(res: ResourceScript) {
        let cfg = GameConfig.SceneUnit.getElement(res.cfgId)

        let ui = this.getUI();
        if (ui == null) {
            oTraceError("BonusUI ui is null");
            return;
        }
        this.tempCube.worldTransform.position = res.Obj.worldTransform.position;
        ui.parent = this.tempCube;
        ui.localTransform.position = (cfg.skewing);
        ui.setVisibility(mw.PropertyStatus.On)
        let uiRoot = ui.getTargetUIWidget().rootContent;

        const time = GlobalData.SceneResource.critWorldUITime;
        const up = GlobalData.SceneResource.critWorldUIHeight;

        let loc = ui.localTransform.position.clone();

        let tween = new mw.Tween({ o: 1, z: loc.z }).to({ o: 0.1, z: loc.z + up }, time).onUpdate((obj) => {
            uiRoot.renderOpacity = obj.o;
            ui.localTransform.position = (new mw.Vector(loc.x, loc.y, obj.z));
        }).onComplete(() => {
            uiRoot.renderOpacity = 1;
            ui.parent = null;
            this.recycleUI(ui);
        })
        tween.start();

    }

    /**获取一个ui */
    private getUI(): mw.UIWidget {
        if (this.uiArr.length == 0) {
            oTraceError("BonusUI uiArr is empty");
            return null;
        }
        return this.uiArr.pop();
    }

    /**回收一个ui */
    private recycleUI(ui: mw.UIWidget) {
        ui.worldTransform.position = new mw.Vector(0, 0, 0);
        ui.setVisibility(mw.PropertyStatus.Off)
        this.uiArr.push(ui);
    }

}