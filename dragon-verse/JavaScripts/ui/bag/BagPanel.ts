import BagMain_Generate from "../../ui-generate/bag/BagMain_generate";
import ScrollView from "../../depend/scroll-view/ScrollView";
import { BagItemUnique, BagModuleC } from "../../module/bag/BagModule";
import BagPanelItem from "./BagPanelItem";
import GToolkit from "../../util/GToolkit";
import { GameConfig } from "../../config/GameConfig";
import i18n from "../../language/i18n";
import { Yoact } from "../../depend/yoact/Yoact";
import ForeignKeyIndexer, { BagTypes } from "../../const/ForeignKeyIndexer";
import ModuleService = mwext.ModuleService;
import bindYoact = Yoact.bindYoact;
import stopEffect = Yoact.stopEffect;
import { CompanionModule_C } from "../../module/companion/CompanionModule_C";

export default class BagPanel extends BagMain_Generate {
    //#region Constant
    public static readonly FOLLOW_BTN_IMG_GUID = "250170";
    public static readonly REST_BTN_IMG_GUID = "250175";
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Member
    private _bagModule: BagModuleC;
    private _dragonModule: CompanionModule_C;
    private _scrollView: ScrollView<BagItemUnique, BagPanelItem>;

    private _selectEffects: Yoact.Effect[] = [];
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld UI Event

    protected onAwake(): void {
        super.onAwake();
        this.canUpdate = true;

        //#region Member init
        this.mBtnClose.onClicked.add(
            () => UIService.hide(BagPanel),
        );
        this._bagModule = ModuleService.getModule(BagModuleC);
        this._dragonModule = ModuleService.getModule(CompanionModule_C);
        this._scrollView = new ScrollView<BagItemUnique, BagPanelItem>(
            this._bagModule.bagItemYoact,
            BagPanelItem,
            this.mScrollBox,
            this.mContent,
            true,
        ).listenOnItemSelect((key: number) => {
            if (key === null) {
                GToolkit.trySetVisibility(this.infoCanvas, false);
                return;
            }
            GToolkit.trySetVisibility(this.infoCanvas, true);
            const data = this._bagModule.bagItemYoact.getItem(key);
            for (const effect of this._selectEffects) {
                stopEffect(effect);
            }
            this._selectEffects.length = 0;
            this.mName.text = i18n.lan(GameConfig.BagItem.getElement(key).name);
            this.mDesc.text = i18n.lan(GameConfig.BagItem.getElement(key).desc);
            this.mIcon.imageGuid = GameConfig.BagItem.getElement(key).icon;
            this._selectEffects.push(bindYoact(() => {
                this.mNum.text = i18n.lan(i18n.lanKeys.Bag_006) + ` ${data.count}`;
            }));

            if (ForeignKeyIndexer.getInstance().isBagItemType(data.id, BagTypes.Dragon)) {
                GToolkit.trySetVisibility(this.mBtnOpt, true);
                if (this._dragonModule.getCurrentShowupBagId() === data.id) {
                    this.showRestBtn(data.id, true);
                } else {
                    this.showFollowBtn(data.id, true);
                }
            } else {
                GToolkit.trySetVisibility(this.mBtnOpt, false);
            }
        });
        //#endregion ------------------------------------------------------------------------------------------

        //#region Widget bind
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
    private showRestBtn(id: number, force: boolean = false) {
        if (!force && this.mBtnOpt.normalImageGuid === BagPanel.REST_BTN_IMG_GUID) return;
        GToolkit.setButtonGuid(this.mBtnOpt, BagPanel.REST_BTN_IMG_GUID);
        this.mBtnOpt.text = i18n.lan(i18n.lanKeys.Bag_005);
        this.mBtnOpt.onClicked.clear();
        this.mBtnOpt.onClicked.add(
            () => {
                this._dragonModule.showUpCompanion(id, false).then((value) => {
                    if (this._scrollView.currentSelectId === value) {
                        this.showRestBtn(this._scrollView.currentSelectId);
                    } else {
                        this.showFollowBtn(this._scrollView.currentSelectId);
                    }
                },
                );
                this.showFollowBtn(id);
            },
        );
    }

    /**
     *
     * @param id
     * @param force 是否 执行强制刷新 否则将根据当前按钮图片 guid 判断是否需要刷新.
     * @private
     */
    private showFollowBtn(id: number, force: boolean = false) {
        if (!force && this.mBtnOpt.normalImageGuid === BagPanel.FOLLOW_BTN_IMG_GUID) return;
        this.mBtnOpt.text = i18n.lan(i18n.lanKeys.Bag_004);
        GToolkit.setButtonGuid(this.mBtnOpt, BagPanel.FOLLOW_BTN_IMG_GUID);
        this.mBtnOpt.onClicked.clear();
        this.mBtnOpt.onClicked.add(
            () => {
                this._dragonModule.showUpCompanion(id, true).then((value) => {
                    if (this._scrollView.currentSelectId === value) {
                        this.showRestBtn(this._scrollView.currentSelectId);
                    } else {
                        this.showFollowBtn(this._scrollView.currentSelectId);
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