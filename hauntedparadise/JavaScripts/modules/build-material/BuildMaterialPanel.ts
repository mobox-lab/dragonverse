import ScrollView from "../../depend/scroll-view/ScrollView";
import {Yoact} from "../../depend/yoact/Yoact";
import Building_UI_Generate from "../../ui-generate/ShareUI/Building/Building_UI_generate";
import {BuildingTypes, BuildMaterialModuleC, BuildMaterialUnique} from "./BuildMaterialModule";
import BuildMaterialPanelItem from "./BuildMaterialPanelItem";
import {GameConfig} from "../../config/GameConfig";
import {BuildingHelper} from "../build/helper/BuildingHelper";
import Gtk from "../../utils/GToolkit";
import stopEffect = Yoact.stopEffect;
import Log4Ts from "../../depend/log4ts/Log4Ts";
import {BagModuleC} from "../../codes/modules/bag/BagModuleC";
import BuildMaterialItemPanel from "./BuildMaterialItemPanel";
import {BuildPanel} from "../build/ui/BuildPanel";
import {BuildingEditorHelper} from "../build/helper/BuildingEditorHelper";

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

    private _bagModuleC: BagModuleC;

    private _resourceItems: BuildMaterialItemPanel[] = [];

    private get bagModuleC(): BagModuleC | null {
        if (!this._bagModuleC) this._bagModuleC = ModuleService.getModule(BagModuleC);
        return this._bagModuleC;
    }

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
        this.setCategory(BuildingTypes.Building);
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
            this.judgeEnough(key);
            Gtk.trySetVisibility(this.infoCanvas, true);
            // const data = this._buildMaterialModule.buildMaterialYoact.getItem(key);
            for (const effect of this._selectEffects) {
                stopEffect(effect);
            }
            this._selectEffects.length = 0;

            try {
                const config = GameConfig.Item.getElement(key);
                const buildingConfig = BuildingHelper.getBuildCfgByItemId(key);
                this.mName.text = GameConfig.Language[config.name] ?? config.name;
                this.mDesc.text = GameConfig.Language[config.description] ?? config.description;
                let i = 0;
                for (; i < this._resourceItems.length && i < (buildingConfig.buildMaterial?.length ?? 0); ++i) {
                    this._resourceItems[i].setVisible(true);
                    this._resourceItems[i].init(buildingConfig.buildMaterial[i][0], buildingConfig.buildMaterial[i][1]);
                }
                for (; i < this._resourceItems.length || i < (buildingConfig.buildMaterial?.length ?? 0); ++i) {
                    if (i < this._resourceItems.length) {
                        this._resourceItems[i].setVisible(false);
                    } else {
                        const newItem = UIService.create(BuildMaterialItemPanel).init(buildingConfig.buildMaterial[i][0], buildingConfig.buildMaterial[i][1]);
                        this.materialCanvas.addChild(newItem.uiObject);
                        this._resourceItems.push(newItem);
                    }
                }
            } catch (e) {
                Log4Ts.error(BuildMaterialPanel, `config not found for item id: ${key}.`);
            }
        });
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
     * @private
     */
    private showEnoughBtn(id: number) {
        if (this.infoCanvas.visible && this.mBtnOpt.normalImageGuid === BuildMaterialPanel.ENOUGH_BTN_IMG_GUID) return;
        Gtk.setButtonGuid(this.mBtnOpt, BuildMaterialPanel.ENOUGH_BTN_IMG_GUID);
        this.mBtnOpt.enable = true;
        this.mBtnOpt.onClicked.clear();
        let config = BuildingHelper.getBuildCfgByItemId(id);
        if (!config) {
            Log4Ts.log(BuildMaterialPanel, `cant query build config of item id: ${id}.`);
            return;
        }

        this.mBtnOpt.onClicked.add(
            () => {
                this._waitBtnHoldId = mw.setTimeout(
                    () => this.judgeEnough(id),
                    BuildMaterialPanel.MIN_CLICK_INTERVAL
                );

                UIService.hide(BuildMaterialPanel);
                BuildingEditorHelper
                    .instance
                    .openEdit(id)
                    .then(() => {
                        UIService.show(BuildPanel, id);
                    });
                this.showNotEnoughBtn();
            },
        );
    }

    /**
     *
     * @private
     */
    private showNotEnoughBtn() {
        if (this.infoCanvas.visible && this.mBtnOpt.normalImageGuid === BuildMaterialPanel.NOT_ENOUGH_BTN_IMG_GUID) return;
        Gtk.setButtonGuid(this.mBtnOpt, BuildMaterialPanel.NOT_ENOUGH_BTN_IMG_GUID);
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
        let show = true;
        let config = BuildingHelper.getBuildCfgByItemId(id);
        if (!config) {
            Log4Ts.log(BuildMaterialPanel, `cant query build config of item id: ${id}.`);
            show = false;
        }
        if (show) {
            show = show && this.bagModuleC.afford((config.buildMaterial ?? [])
                .map(item => [item[0] ?? -1, item[1] ?? 0] as [number, number])
                .filter(item => item[0] !== -1));
        }
        if (show) {
            this.showEnoughBtn(id);
        } else {
            this.showNotEnoughBtn();
        }
    }

    private setCategory(type: BuildingTypes) {
        this._buildMaterialModule.buildMaterialYoact
            .filter((item) => {
                    let config = BuildingHelper.getBuildCfgByItemId(item.id);
                    if (config) return BuildingHelper.getBuildCfgByItemId(item.id).buildType === type;
                    Log4Ts.log(BuildMaterialPanel, `cant query build config of item id: ${item.id}.`);
                    return false;
                }
            );
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