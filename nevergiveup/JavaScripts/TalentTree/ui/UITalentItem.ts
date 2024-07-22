import Gtk from "gtoolkit";
import { Yoact } from "../../depend/yoact/Yoact";
import { GameConfig } from "../../config/GameConfig";
import { ITalentBuffElement } from "../../config/TalentBuff";
import { ITalentTreeElement } from "../../config/TalentTree";
import TalentItem_Generate from "../../ui-generate/TalentTree/TalentItem_generate";
import { TalentItem } from "./TalentItem";

export class UITalentItem extends TalentItem_Generate {
    private _currentLevel = Yoact.createYoact({count: 0});
    private _maxLevel = Yoact.createYoact({count: 0});
    private _talent: TalentItem;

    public canActive = Yoact.createYoact({status: false});

    protected onStart(): void {
        Gtk.trySetVisibility(this.mLocked, false);

        Yoact.bindYoact(() => {
            const currentLevel = this._currentLevel.count;
            const maxLevel = this._maxLevel.count;
            Gtk.trySetText(this.textTalentLevel, `${currentLevel}/${maxLevel}`);
        });
        Yoact.bindYoact(() => {
            if (this.canActive.status) {
                Gtk.trySetVisibility(this.mNotActive, false);
                this.textTalentLevel.fontColor = LinearColor.white;
                this.textTalentLevel.outlineColor = LinearColor.black;
                this.textTalentName.fontColor = LinearColor.white;
                this.textTalentName.outlineColor = LinearColor.black;
            } else {
                Gtk.trySetVisibility(this.mNotActive, true);
                this.textTalentLevel.setFontColorByHex("#6D6D6D");
                this.textTalentLevel.setOutlineColorByHex("#BDBDBD");
                this.textTalentName.setFontColorByHex("#6D6D6D");
                this.textTalentName.setOutlineColorByHex("#BDBDBD");
            }
        });
    }

    public bindTalent(talent: TalentItem) {
        this._talent = talent;
        this.refreshStatus();
    }

    /**
     * 刷新状态
     */
    public refreshStatus() {
        this.textTalentName.text = this._talent.data.nameCN;
        this.mItem.normalImageGuid = this._talent.data.icon;
        this.canActive.status = this._talent.canActive.status;
        this._currentLevel.count = this._talent.level;
        this._maxLevel.count = this._talent.maxLevel;
    }
}