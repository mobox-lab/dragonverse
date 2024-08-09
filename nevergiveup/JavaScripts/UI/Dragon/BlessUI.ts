import { DragonBlessListUnique, DragonDataModuleC } from "../../Modules/dragonData/DragonDataModuleC";
import ScrollView from "../../depend/scroll-view/ScrollView";
import { Yoact } from "../../depend/yoact/Yoact";
import BlessMain_Generate from "../../ui-generate/Bless/BlessMain_generate";
import BlessItemUI from "./BlessItemUI";
import { DragonElemental } from "../../const/enum";
import Log4Ts from "mw-log4ts";

export default class BlessUI extends BlessMain_Generate {
    private _scrollViews: ScrollView<DragonBlessListUnique, BlessItemUI>[];
    private _dragonDataModule: DragonDataModuleC;

    protected onAwake(): void {
        super.onAwake();

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
                return {scrollBox: this.scr_FireDragon, container: this.can_Fire}; // 火
            case DragonElemental.Water:
                return {scrollBox: this.scr_WaterDragon, container: this.can_Water}; // 水
            case DragonElemental.Wood:
                return {scrollBox: this.scr_WoodDragon, container: this.can_Wood}; // 木
            case DragonElemental.Earth:
                return {scrollBox: this.scr_SoilDragon, container: this.can_Soil}; // 土
            case DragonElemental.Light:
                return {scrollBox: this.scr_LightDragon, container: this.can_Light}; // 光
            case DragonElemental.Dark:
                return {scrollBox: this.scr_DarkDragon, container: this.can_Dark}; // 暗
            default:
                return undefined;
        }
    }
    public initBlessUI() {
        const categoryIds = Object.values(DragonElemental).filter((v) => Number(v) >= 0).map((v) => Number(v) as DragonElemental);
        this._scrollViews = categoryIds.map((cid, idx) => {
            const dragonHandbookYoact = this._dragonDataModule.dragonBlessListYoactArr[cid - 1];
            Log4Ts.log(BlessUI, " initBlessUI cid:" + cid + " this._dragonDataModule.dragonBlessListYoactArr[cid-1]" + JSON.stringify(dragonHandbookYoact.getAll()));
            const {scrollBox, container} = this.getCidEle(cid);
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