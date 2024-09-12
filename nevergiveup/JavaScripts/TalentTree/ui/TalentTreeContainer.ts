import Gtk from "gtoolkit";
import { TalentTree } from "./TalentTree";
import { TalentItem } from "./TalentItem";
import { UITalentItem } from "./UITalentItem";
import { TweenCommon } from "../../TweenCommon";
import { ETalentBuffValue, ETalentType } from "../../const/enum";
import TalentModuleC from "../../Modules/talent/TalentModuleC";
import TalentTreeContainer_Generate from "../../ui-generate/TalentTree/TalentTreeContainer_generate";
import { GameConfig } from "../../config/GameConfig";
import { SoundUtil } from "../../tool/SoundUtil";

export const TalentTreeActions = {
    onItemSelected: new Action1<number>(),
    onItemUpdated: new Action1<number>(),
};

export class TalentTreeContainer extends TalentTreeContainer_Generate {
    private _tree: TalentTree;
    private _levelInfo: TextBlock[][] = [];
    private _selectedTalent: TalentItem; // 天赋树的Item
    private _selectedTalentUI: UITalentItem; // 下面弹出框的Item
    private _talentC: TalentModuleC;
    private _isLevelUpdating: boolean = false;

    private get talentC(): TalentModuleC | null {
        if (!this._talentC) this._talentC = ModuleService.getModule(TalentModuleC);
        return this._talentC;
    }

    protected onStart(): void {
        this.layer = UILayerTop;
        this.closeBtn.onClicked.add(() => this.hideTween());
        this.createTalentTree();
        TalentTreeActions.onItemSelected.add(this.onTalentSelected.bind(this));
        this._levelInfo = [
            [null, this.infoLevel1],
            [this.levelSlash1, this.infoLevel2],
            [this.levelSlash2, this.infoLevel3],
            [this.levelSlash3, this.infoLevel4],
            [this.levelSlash4, this.infoLevel5],
        ];

        this.infoBtn.onClicked.add(() => this.onTalentLevelUpClick());
    }

    protected onShow(...params: any[]) {
        super.onShow(...params);
        TweenCommon.popUpShow(this.uiObject);
    }

    protected onHide(): void {
    }

    /**
     * 生成天赋树
     * @private
     */
    private createTalentTree() {
        const talentTreeUI = UIService.create(TalentTree);
        this.talentTreeCanvas.addChild(talentTreeUI.uiObject);
        this.talentTreeCanvas.size = talentTreeUI.uiObject.size;
        this._tree = talentTreeUI;
    }

    private onTalentSelected(id: number) {
        const talent = this._tree.getTalentItem(id);
        // 初始化选择框 UI
        if (!this._selectedTalentUI) {
            this._selectedTalentUI = UIService.create(UITalentItem);
            this.talentItemCanvas.addChild(this._selectedTalentUI.uiObject);
        }
        if (this._selectedTalent) {
            Gtk.trySetVisibility(this._selectedTalent.mSelected, false);
        }
        Gtk.trySetVisibility(talent.mSelected, true);
        this._selectedTalent = talent;
        this._selectedTalentUI.bindTalent(talent);
        this.updateLevelInfo(talent);

        Gtk.trySetVisibility(this.infoCanvas, true);
    }

    private updateLevelInfo(talent: TalentItem) {
        const level = talent.level;
        const data = talent.buff.value;
        const type = talent.buff.valueType;
        this._levelInfo.forEach((info, index) => {
            if (index < data.length) {
                info[0] && Gtk.trySetVisibility(info[0], true);
                Gtk.trySetVisibility(info[1], true);
                info[1].text = type === ETalentBuffValue.Integer ? `${data[index]}` : `${data[index]}%`;
                info[1].setFontColorByHex("#FFFFFF");
                info[1].renderOpacity = 0.5;
                if (level - 1 === index || talent.type === ETalentType.Peak) {
                    info[1].setFontColorByHex("#FFCB1C");
                    info[1].renderOpacity = 1;
                }
            } else {
                info[0] && Gtk.trySetVisibility(info[0], false);
                Gtk.trySetVisibility(info[1], false);
            }
        });
        const value = talent.getCurrentBuffValue();
        const cost = talent.getUpdateLevelCost();
        this.goldTxt_1.text = `${cost[0] ?? "--"}`;
        this.techPointTxt_1.text = `${cost[1] ?? "--"}`;
        this.infoTxtDesc.text = StringUtil.format(GameConfig.Language.getElement(talent.data.desc).Value, value);
        this.infoBtn.enable = talent.canActive.status && talent.level < talent.maxLevel;
    }

    private onTalentLevelUpClick() {
        if (this._isLevelUpdating) return;
        this._isLevelUpdating = true;
        const item = this._selectedTalent;
        if (!item) return;
        this.talentC.tryTalentLevelUp(item.data.id).then(result => {
            this._isLevelUpdating = false;
            if (!result) return;
            SoundUtil.PlaySoundById(2004);
            TalentTreeActions.onItemUpdated.call(item.data.id);
            this._selectedTalentUI.refreshStatus();
            this.updateLevelInfo(item);
        }).catch(() => (this._isLevelUpdating = false));
    }

    /**
     * 关闭动画
     * @private
     */
    public hideTween() {
        TweenCommon.popUpHide(this.uiObject, () => UIService.hideUI(this));
    }
}