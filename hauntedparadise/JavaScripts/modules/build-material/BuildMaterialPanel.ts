import ScrollView from "../../depend/scroll-view/ScrollView";
import {Yoact} from "../../depend/yoact/Yoact";
import Building_UI_Generate from "../../ui-generate/ShareUI/Building/Building_UI_generate";
import {BuildingTypes, BuildMaterialModuleC, BuildMaterialUnique} from "./BuildMaterialModule";
import BuildMaterialPanelItem from "./BuildMaterialPanelItem";
import stopEffect = Yoact.stopEffect;
import {GameConfig} from "../../config/GameConfig";
import {BuildingHelper} from "../build/helper/BuildingHelper";
import Gtk from "../../utils/GToolkit";

export default class BuildMaterialPanel extends Building_UI_Generate {
//#region Constant
    public static readonly ENOUGH_BTN_IMG_GUID = "267192";
    public static readonly NOT_ENOUGH_BTN_IMG_GUID = "267193";
    private static readonly CATEGORY_CHOSEN_IMG_GUID = "250187";
    private static readonly CATEGORY_NOT_CHOSEN_IMG_GUID = "250194";

    private static readonly MIN_CLICK_INTERVAL = 1e3;
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Member
    private _buildMaterialModule: BuildMaterialModuleC;
    private _scrollView: ScrollView<BuildMaterialUnique, BuildMaterialPanelItem>;

    private _waitBtnHoldId: number = null;

    private _selectEffects: Yoact.Effect[] = [];
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region MetaWorld UI Event

    protected onAwake(): void {
        super.onAwake();
        this.canUpdate = true;

//#region Member init
        this._buildMaterialModule = ModuleService.getModule(BuildMaterialModuleC);

//#endregion ------------------------------------------------------------------------------------------

//#region Widget bind
        this.mBtnClose.onClicked.add(
            () => UIService.hide(BuildMaterialPanel),
        );
        this.btn1.onClicked.add(() => this.setCategory(BuildingTypes.Building));
        this.btn2.onClicked.add(() => this.setCategory(BuildingTypes.Furniture));
        this._scrollView = new ScrollView<BuildMaterialUnique, BuildMaterialPanelItem>(
            this._buildMaterialModule.buildMaterialYoact,
            BuildMaterialPanelItem,
            this.mScrollBox,
            this.mContent,
            true,
        ).listenOnItemSelect((key: number) => {
            if (key === null) {
                Gtk.trySetVisibility(this.infoCanvas, false);
                return;
            }
            Gtk.trySetVisibility(this.infoCanvas, true);
            this.judgeEnough(key);
            // const data = this._buildMaterialModule.buildMaterialYoact.getItem(key);
            for (const effect of this._selectEffects) {
                stopEffect(effect);
            }
            this._selectEffects.length = 0;
            this.mName.text = GameConfig.Language[GameConfig.Item.getElement(key).name] ?? "";
            this.mDesc.text = GameConfig.Language[GameConfig.Item.getElement(key).description] ?? "";
            // this.mIcon.imageGuid = GameConfig.BagItem.getElement(key).icon;
            // this._selectEffects.push(bindYoact(() => {
            //     this.mNum.text = i18n.lan(i18n.lanKeys.Bag_006) + ` ${data.count}`;
            // }));

            // if (ForeignKeyIndexer.getInstance().isBagItemType(data.id, BagTypes.Dragon)) {
            //     Gtk.trySetVisibility(this.mBtnOpt, true);
            //     if (this._dragonModule.getCurrentShowupBagId() === data.id) {
            //         this.showRestBtn(data.id, true);
            //     } else {
            //         this.showFollowBtn(data.id, true);
            //     }
            // } else {
            //     Gtk.trySetVisibility(this.mBtnOpt, false);
            // }
        });

        Gtk.trySetVisibility(this.infoCanvas, false);
//#endregion ------------------------------------------------------------------------------------------

//#region Event subscribe
//#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate() {
    }

    protected onShow() {
        this._scrollView.resetSelect();
    }

    protected onHide() {
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Init
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region UI Behavior
    /**
     *
     * @param id
     * @param force 是否 执行强制刷新 否则将根据当前按钮图片 guid 判断是否需要刷新.
     * @private
     */
    private showEnoughBtn(id: number, force: boolean = false) {
        if (!force && this.mBtnOpt.normalImageGuid === BuildMaterialPanel.NOT_ENOUGH_BTN_IMG_GUID) return;
        Gtk.setButtonGuid(this.mBtnOpt, BuildMaterialPanel.NOT_ENOUGH_BTN_IMG_GUID);
        this.mBtnOpt.enable = true;
        this.mBtnOpt.onClicked.clear();
        this.mBtnOpt.onClicked.add(
            () => {
                this._waitBtnHoldId = mw.setTimeout(
                    () => this.judgeEnough(id),
                    BuildMaterialPanel.MIN_CLICK_INTERVAL
                );
                //TODO_LviatYi Buy
                this.showNotEnoughBtn();
            },
        );
    }

    /**
     *
     * @param force 是否 执行强制刷新 否则将根据当前按钮图片 guid 判断是否需要刷新.
     * @private
     */
    private showNotEnoughBtn(force: boolean = false) {
        if (!force && this.mBtnOpt.normalImageGuid === BuildMaterialPanel.ENOUGH_BTN_IMG_GUID) return;
        Gtk.setButtonGuid(this.mBtnOpt, BuildMaterialPanel.ENOUGH_BTN_IMG_GUID);
        this.mBtnOpt.enable = false;
        this.mBtnOpt.clickMethod;
    }

    /**
     * 判断是否足够支付以刷新控件.
     * @param {number} id item id.
     * @private
     */
    private judgeEnough(id: number) {
        if (this._waitBtnHoldId) {
            clearTimeout(this._waitBtnHoldId);
        }
        //TODO_LviatYi 判断是否足够支付
        if (Math.random() > 0.5) {
            this.showEnoughBtn(id);
        } else {
            this.showNotEnoughBtn();
        }
    }

    private setCategory(type: BuildingTypes) {
        this._buildMaterialModule.buildMaterialYoact
            .filter((item) =>
                BuildingHelper.getBuildCfgByItemId(item.id).buildType === type);
        switch (type) {
            case BuildingTypes.Building:
                Gtk.setButtonGuid(this.btn1, BuildMaterialPanel.CATEGORY_CHOSEN_IMG_GUID);
                Gtk.setButtonGuid(this.btn2, BuildMaterialPanel.CATEGORY_NOT_CHOSEN_IMG_GUID);
                break;
            case BuildingTypes.Furniture:
                Gtk.setButtonGuid(this.btn2, BuildMaterialPanel.CATEGORY_CHOSEN_IMG_GUID);
                Gtk.setButtonGuid(this.btn1, BuildMaterialPanel.CATEGORY_NOT_CHOSEN_IMG_GUID);
                break;
            default:
                Gtk.setButtonGuid(this.btn2, BuildMaterialPanel.CATEGORY_NOT_CHOSEN_IMG_GUID);
                Gtk.setButtonGuid(this.btn1, BuildMaterialPanel.CATEGORY_NOT_CHOSEN_IMG_GUID);
                break;
        }
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Event Callback
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠  ⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄1
}