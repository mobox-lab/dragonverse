import BagMain_Generate from "../../ui-generate/bag/BagMain_generate";
import ScrollView from "../../depend/scroll-view/ScrollView";
import BagModuleData, { BagModuleC, DragonHandbookUnique } from "../../module/bag/BagModule";
import DragonHandbookItem from "./DragonHandbookItem";
import GToolkit from "../../util/GToolkit";
import { GameConfig } from "../../config/GameConfig";
import i18n from "../../language/i18n";
import { Yoact } from "../../depend/yoact/Yoact";
import ForeignKeyIndexer, { BagTypes } from "../../const/ForeignKeyIndexer";
import ModuleService = mwext.ModuleService;
import bindYoact = Yoact.bindYoact;
import stopEffect = Yoact.stopEffect;
import { CompanionModule_C } from "../../module/companion/CompanionModule_C";
import { MouseLockController } from "../../controller/MouseLockController";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import YoactArray from "../../depend/yoact/YoactArray";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import NewBag_Generate from "../../ui-generate/dragon-handbook/NewBag_generate";
import { DragonElemental } from "../../const/DragonElemental";
import Gtk from "../../util/GToolkit";
import { ElementalConfig } from "../../config/Elemental";

export default class DragonHandbook extends NewBag_Generate {
    //#region Constant
    public static readonly FOLLOW_BTN_IMG_GUID = "250170";
    public static readonly REST_BTN_IMG_GUID = "250175";
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Member
    private _bagModule: BagModuleC;
    private _dragonModule: CompanionModule_C;
    private _scrollViews: ScrollView<DragonHandbookUnique, DragonHandbookItem>[];

    private curSelectedDragon: DragonHandbookUnique | null;
    private _selectEffects: Yoact.Effect[] = [];
    public dragonHandbookYoact: YoactArray<DragonHandbookUnique> = new YoactArray<DragonHandbookUnique>();

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld UI Event

    protected onAwake(): void {
        super.onAwake();
        this.canUpdate = true;

        //#region Member init
        this.mBtnClose.onClicked.add(
            () => UIService.hide(DragonHandbook),
        );
        this._bagModule = ModuleService.getModule(BagModuleC);
        this._dragonModule = ModuleService.getModule(CompanionModule_C);
        this.initHandbook();
        //#endregion ------------------------------------------------------------------------------------------

        //#region Widget bind
        //#endregion ------------------------------------------------------------------------------------------

        //#region Event subscribe
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate() {
    }

    protected onShow() {
        // this._scrollView.resetSelect();
        this._scrollViews.forEach(_scrollView => _scrollView.resetSelect());
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            this.mBtnClose.onClicked.broadcast();
        });
        MouseLockController.getInstance().needMouseUnlock();
    }

    protected onHide() {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
        MouseLockController.getInstance().cancelMouseUnlock();
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

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

    private initHandbook() {
        bindYoact(() => {
            const ballCnt = this._bagModule.dragonBallYoact.count;
            this.text_BallNum.text = ballCnt ? ballCnt.toString() : "0";
        });
        this.curSelectedDragon = null;
        const categoryIds = GameConfig.Elemental.getAllElement().map((cfg) => cfg.id);
        this._scrollViews = categoryIds.map((cid, idx) => {
            const dragonHandbookYoact = this._bagModule.dragonHandbookYoactArr[cid - 1];
            Log4Ts.log(DragonHandbook, " initHandbook cid:" + cid + " this._bagModule.dragonHandbookYoactArr[cid]" + JSON.stringify(dragonHandbookYoact.getAll()));
            const {scrollBox, container} = this.getCidEle(cid);
            return new ScrollView<DragonHandbookUnique, DragonHandbookItem>(
                dragonHandbookYoact,
                DragonHandbookItem,
                scrollBox,
                container,
                true,
            ).listenOnItemSelect((key: number) => {
                if (key === null) {
                    GToolkit.trySetVisibility(this.infoCanvas, false);
                    return;
                }
                const dragonHandbookYoact = this._bagModule.dragonHandbookYoactArr[cid - 1];
                const curSelectedDragon = dragonHandbookYoact.getItem(key);
                this.curSelectedDragon = curSelectedDragon;

                this.resetAllScrollViewSelectExclude(idx);
                GToolkit.trySetVisibility(this.infoCanvas, true);
                for (const effect of this._selectEffects) {
                    stopEffect(effect);
                }
                this._selectEffects.length = 0;
                this.mName.text = i18n.lan(GameConfig.BagItem.getElement(key).name);
                this.mDesc.text = i18n.lan(GameConfig.BagItem.getElement(key).desc);
                this.mIcon.imageGuid = GameConfig.BagItem.getElement(key).icon;
                this.mNum.text = i18n.lan(i18n.lanKeys.Bag_006) + ` ${curSelectedDragon.cnt}`;
                this._selectEffects.push(bindYoact(() => {
                    const curDragon = dragonHandbookYoact.getItem(key);
                    this.mNum.text = i18n.lan(i18n.lanKeys.Bag_006) + ` ${curDragon.cnt ? curDragon.cnt : 0}`;
                    Gtk.trySetVisibility(this.mBtnOpt, curDragon.cnt > 0 ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed);
                }));

                if (ForeignKeyIndexer.getInstance().isBagItemType(curSelectedDragon.id, BagTypes.Dragon)) {
                    GToolkit.trySetVisibility(this.mBtnOpt, true);
                    if (this._dragonModule.getCurrentShowupBagId() === curSelectedDragon.id) {
                        this.showRestBtn(curSelectedDragon.id, true);
                    } else {
                        this.showFollowBtn(curSelectedDragon.id, true);
                    }
                } else {
                    GToolkit.trySetVisibility(this.mBtnOpt, false);
                }
            });
        });
    }

    public resetAllScrollViewSelectExclude(excludeIndex: number) {
        this._scrollViews.forEach((sv, i) => i !== excludeIndex && sv.resetSelect());
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region UI Behavior
    /**
     *
     * @param id
     * @param force 是否 执行强制刷新 否则将根据当前按钮图片 guid 判断是否需要刷新.
     * @private
     */
    private showRestBtn(id: number, force: boolean = false) {
        if (!force && this.mBtnOpt.normalImageGuid === DragonHandbook.REST_BTN_IMG_GUID) return;
        GToolkit.setButtonGuid(this.mBtnOpt, DragonHandbook.REST_BTN_IMG_GUID);
        this.mBtnOpt.text = i18n.lan(i18n.lanKeys.Bag_005);
        this.mBtnOpt.onClicked.clear();
        this.mBtnOpt.onClicked.add(
            () => {
                this._dragonModule.showUpCompanion(id, false).then((value) => {
                        if (this.curSelectedDragon.id === value) {
                            this.showRestBtn(this.curSelectedDragon.id);
                        } else {
                            this.showFollowBtn(this.curSelectedDragon.id);
                        }
                    },
                );
                this.showFollowBtn(id);
            },
        );
    }

    // /**
    //  *
    //  * @param id
    //  * @param force 是否 执行强制刷新 否则将根据当前按钮图片 guid 判断是否需要刷新.
    //  * @private
    //  */
    private showFollowBtn(id: number, force: boolean = false) {
        if (!force && this.mBtnOpt.normalImageGuid === DragonHandbook.FOLLOW_BTN_IMG_GUID) return;
        this.mBtnOpt.text = i18n.lan(i18n.lanKeys.Bag_004);
        GToolkit.setButtonGuid(this.mBtnOpt, DragonHandbook.FOLLOW_BTN_IMG_GUID);
        this.mBtnOpt.onClicked.clear();
        this.mBtnOpt.onClicked.add(
            () => {
                this._dragonModule.showUpCompanion(id, true).then((value) => {
                    if (this.curSelectedDragon.id === value) {
                        this.showRestBtn(this.curSelectedDragon.id);
                    } else {
                        this.showFollowBtn(this.curSelectedDragon.id);
                    }
                });
                this.showRestBtn(id);
            },
        );
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Event Callback
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

