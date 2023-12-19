import BagMain_Generate from "../../ui-generate/bag/BagMain_generate";
import ScrollView from "../../depend/scroll-view/ScrollView";
import { BagItemUnique, BagModuleC } from "../../module/bag/BagModule";
import BagPanelItem from "./BagPanelItem";
import GToolkit from "../../util/GToolkit";
import { GameConfig } from "../../config/GameConfig";
import i18n from "../../language/i18n";
import { Yoact } from "../../depend/yoact/Yoact";
import BagItemCluster, { BagTypes } from "../../module/bag/BagItemCluster";
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
            this._selectEffects.push(bindYoact(() => {
                this.mName.text = i18n.lan(GameConfig.BagItem.getElement(key).name);
            }));
            this._selectEffects.push(bindYoact(() => {
                this.mDesc.text = i18n.lan(GameConfig.BagItem.getElement(key).desc);
            }));
            this._selectEffects.push(bindYoact(() => {
                this.mNum.text = i18n.lan("数量") + `${data.count}`;
            }));

            if (BagItemCluster.getInstance().isType(data.id, BagTypes.Dragon)) {
                GToolkit.trySetVisibility(this.mBtnOpt, true);
                if (this._dragonModule.getCurrentShowupBagId() === data.id) {
                    this.showRestBtn(data.id);
                } else {
                    this.showFollowBtn(data.id);
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
    private showRestBtn(id: number) {
        if (this.mBtnOpt.normalImageGuid === BagPanel.REST_BTN_IMG_GUID) return;
        GToolkit.setButtonGuid(this.mBtnOpt, BagPanel.REST_BTN_IMG_GUID);
        this.mBtnOpt.text = i18n.lan(i18n.keyTable.Bag_005);
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

    private showFollowBtn(id: number) {
        if (this.mBtnOpt.normalImageGuid === BagPanel.FOLLOW_BTN_IMG_GUID) return;
        this.mBtnOpt.text = i18n.lan(i18n.keyTable.Bag_004);
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