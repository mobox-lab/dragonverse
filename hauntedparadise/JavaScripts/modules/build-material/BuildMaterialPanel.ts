import ScrollView from "../../depend/scroll-view/ScrollView";
import GToolkit from "../../utils/GToolkit";
import {Yoact} from "../../depend/yoact/Yoact";
import Building_UI_Generate from "../../ui-generate/ShareUI/Building/Building_UI_generate";
import {BuildMaterialModuleC, BuildMaterialUnique} from "./BuildMaterialModule";
import BuildMaterialPanelItem from "./BuildMaterialPanelItem";
import stopEffect = Yoact.stopEffect;

export default class BuildMaterialPanel extends Building_UI_Generate {
//#region Constant
    public static readonly FOLLOW_BTN_IMG_GUID = "250170";
    public static readonly REST_BTN_IMG_GUID = "250175";
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Member
    private _buildMaterialModule: BuildMaterialModuleC;
    private _scrollView: ScrollView<BuildMaterialUnique, BuildMaterialPanelItem>;

    private _selectEffects: Yoact.Effect[] = [];
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region MetaWorld UI Event

    protected onAwake(): void {
        super.onAwake();
        this.canUpdate = true;

//#region Member init
        this.mBtnClose.onClicked.add(
            () => UIService.hide(BuildMaterialPanel),
        );
        this._buildMaterialModule = ModuleService.getModule(BuildMaterialModuleC);
        this._scrollView = new ScrollView<BuildMaterialUnique, BuildMaterialPanelItem>(
            this._buildMaterialModule.buildMaterialYoact,
            BuildMaterialPanelItem,
            this.mScrollBox,
            this.mContent,
            true,
        ).listenOnItemSelect((key: number) => {
            if (key === null) {
                GToolkit.trySetVisibility(this.infoCanvas, false);
                return;
            }
            GToolkit.trySetVisibility(this.infoCanvas, true);
            const data = this._buildMaterialModule.buildMaterialYoact.getItem(key);
            for (const effect of this._selectEffects) {
                stopEffect(effect);
            }
            this._selectEffects.length = 0;
            // this.mName.text = i18n.lan(GameConfig.BagItem.getElement(key).name);
            // this.mDesc.text = i18n.lan(GameConfig.BagItem.getElement(key).desc);
            // this.mIcon.imageGuid = GameConfig.BagItem.getElement(key).icon;
            // this._selectEffects.push(bindYoact(() => {
            //     this.mNum.text = i18n.lan(i18n.lanKeys.Bag_006) + ` ${data.count}`;
            // }));

            // if (ForeignKeyIndexer.getInstance().isBagItemType(data.id, BagTypes.Dragon)) {
            //     GToolkit.trySetVisibility(this.mBtnOpt, true);
            //     if (this._dragonModule.getCurrentShowupBagId() === data.id) {
            //         this.showRestBtn(data.id, true);
            //     } else {
            //         this.showFollowBtn(data.id, true);
            //     }
            // } else {
            //     GToolkit.trySetVisibility(this.mBtnOpt, false);
            // }
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
//     /**
//      *
//      * @param id
//      * @param force 是否 执行强制刷新 否则将根据当前按钮图片 guid 判断是否需要刷新.
//      * @private
//      */
//     private showRestBtn(id: number, force: boolean = false) {
//         if (!force && this.mBtnOpt.normalImageGuid === BuildMaterialPanel.REST_BTN_IMG_GUID) return;
//         GToolkit.setButtonGuid(this.mBtnOpt, BuildMaterialPanel.REST_BTN_IMG_GUID);
//         // this.mBtnOpt.text = i18n.lan(i18n.lanKeys.Bag_005);
//         this.mBtnOpt.onClicked.clear();
//         this.mBtnOpt.onClicked.add(
//             () => {
//                 this._dragonModule.showUpCompanion(id, false).then((value) => {
//                         if (this._scrollView.currentSelectId === value) {
//                             this.showRestBtn(this._scrollView.currentSelectId);
//                         } else {
//                             this.showFollowBtn(this._scrollView.currentSelectId);
//                         }
//                     },
//                 );
//                 this.showFollowBtn(id);
//             },
//         );
//     }

    // /**
    //  *
    //  * @param id
    //  * @param force 是否 执行强制刷新 否则将根据当前按钮图片 guid 判断是否需要刷新.
    //  * @private
    //  */
    // private showFollowBtn(id: number, force: boolean = false) {
    //     if (!force && this.mBtnOpt.normalImageGuid === BuildMaterialPanel.FOLLOW_BTN_IMG_GUID) return;
    //     // this.mBtnOpt.text = i18n.lan(i18n.lanKeys.Bag_004);
    //     GToolkit.setButtonGuid(this.mBtnOpt, BuildMaterialPanel.FOLLOW_BTN_IMG_GUID);
    //     this.mBtnOpt.onClicked.clear();
    //     this.mBtnOpt.onClicked.add(
    //         () => {
    //             this._dragonModule.showUpCompanion(id, true).then((value) => {
    //                 if (this._scrollView.currentSelectId === value) {
    //                     this.showRestBtn(this._scrollView.currentSelectId);
    //                 } else {
    //                     this.showFollowBtn(this._scrollView.currentSelectId);
    //                 }
    //             });
    //             this.showRestBtn(id);
    //         },
    //     );
    // }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Event Callback
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}