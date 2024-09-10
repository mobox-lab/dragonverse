import { DragonBlessListUnique, DragonDataModuleC } from "../../Modules/dragonData/DragonDataModuleC";
import ScrollView from "../../depend/scroll-view/ScrollView";
import { Yoact } from "../../depend/yoact/Yoact";
import BlessMain_Generate from "../../ui-generate/Bless/BlessMain_generate";
import BlessItemUI from "./BlessItemUI";
import { DragonElemental } from "../../const/enum";
import Log4Ts from "mw-log4ts";
import BlessBarUI, { BlessBarState } from "./BlessBarUI";
import bindYoact = Yoact.bindYoact;
import YoactArray from "../../depend/yoact/YoactArray";
import { GlobalData } from "../../const/GlobalData";

export default class BlessUI extends BlessMain_Generate {
    private _scrollViews: ScrollView<DragonBlessListUnique, BlessItemUI>[];
    private _dragonDataModule: DragonDataModuleC;
    private _blessBars: BlessBarUI[];

    protected onAwake(): void {
        super.onAwake();
        this.layer = UILayerTop;
        //#region Member init
        this.mBtnClose.onClicked.add(
            () => UIService.hide(BlessUI),
        );
        this._dragonDataModule = ModuleService.getModule(DragonDataModuleC);
        this.initBlessUI();
        //#endregion ------------------------------------------------------------------------------------------

        //#region Widget bind
        //#endregion ------------------------------------------------------------------------------------------

        //#region Event subscribe
        //#endregion ------------------------------------------------------------------------------------------
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    //#region Init
    private getCidEle(cid: DragonElemental) {
        switch (cid) {
            case DragonElemental.Fire:
                return {scrollBox: this.scr_FireDragon, container: this.can_Fire, bar: this.bar_Fire}; // 火
            case DragonElemental.Water:
                return {scrollBox: this.scr_WaterDragon, container: this.can_Water, bar: this.bar_Water}; // 水
            case DragonElemental.Wood:
                return {scrollBox: this.scr_WoodDragon, container: this.can_Wood, bar: this.bar_Wood}; // 木
            case DragonElemental.Earth:
                return {scrollBox: this.scr_SoilDragon, container: this.can_Soil, bar: this.bar_Soil}; // 土
            case DragonElemental.Light:
                return {scrollBox: this.scr_LightDragon, container: this.can_Light, bar: this.bar_Light}; // 光
            case DragonElemental.Dark:
                return {scrollBox: this.scr_DarkDragon, container: this.can_Dark, bar: this.bar_Dark}; // 暗
            default:
                return undefined;
        }
    }
    public initBlessUI() {
        this._blessBars = [];
        const categoryIds = Object.values(DragonElemental).filter((v) => Number(v) >= 0).map((v) => Number(v) as DragonElemental);
        this._scrollViews = categoryIds.map((cid) => {
            const dragonHandbookYoact = this._dragonDataModule.dragonBlessListYoactArr[cid - 1];
            Log4Ts.log(BlessUI, " initBlessUI cid:" + cid + " this._dragonDataModule.dragonBlessListYoactArr[cid-1]" + JSON.stringify(dragonHandbookYoact.getAll()));
            const {scrollBox, container, bar} = this.getCidEle(cid);
            bindYoact(() => {
                bar.removeAllChildren();
                const barUI = UIService.create(BlessBarUI);
                const blessList = dragonHandbookYoact.getAll().filter(item => item.cnt > 0);
                if(blessList?.length) {
                    const progress = GlobalData.Bless.blessProgress[blessList.length-1]; // 3 / 6 / 10
                    switch(progress) {
                        case 3: barUI.initBlessBarUI(BlessBarState.Min); break;
                        case 6: barUI.initBlessBarUI(BlessBarState.Mid); break;
                        case 10: barUI.initBlessBarUI(BlessBarState.Max); break;
                        default: barUI.initBlessBarUI(BlessBarState.None);
                    }
                } else barUI.initBlessBarUI(BlessBarState.None);
                bar.addChild(barUI.uiObject);
                this._blessBars.push(barUI);
            });
            return new ScrollView<DragonBlessListUnique, BlessItemUI>(
                dragonHandbookYoact,
                BlessItemUI,
                scrollBox,
                container,
                true,
            );
        });
    }
    //#endregion
}