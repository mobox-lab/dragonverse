import Gtk from "gtoolkit";
import { Yoact } from "../../depend/yoact/Yoact";
import TalentItem_Generate from "../../ui-generate/TalentTree/TalentItem_generate";
import { TalentItem } from "./TalentItem";
import { ETalentType } from "../../const/enum";
import { GameConfig } from "../../config/GameConfig";

export class UITalentItem extends TalentItem_Generate {
    private _talent: TalentItem;
    public canActive = Yoact.createYoact({status: false});

    protected onStart(): void {
        Gtk.trySetVisibility(this.mLocked, false);
        Gtk.trySetVisibility(this.textTalentName, false);

        this.textTalentLevel.size = new Vector2(80, 15);
        this.textTalentLevel.position = new Vector2(0, 70);

        Yoact.bindYoact(() => {
            if (this.canActive.status) {
                Gtk.trySetVisibility(this.mNotActive, false);
                this.textTalentLevel.fontColor = LinearColor.white;
                this.textTalentLevel.setOutlineColorByHex(this._talent?.data.outlineColor);
            } else {
                Gtk.trySetVisibility(this.mNotActive, true);
                this.textTalentLevel.setFontColorByHex("#6D6D6D");
                this.textTalentLevel.setOutlineColorByHex("#BDBDBD");
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
        this.textTalentName.text = GameConfig.Language.getElement(this._talent.data.name).Value;
        this.mItem.normalImageGuid = this._talent.data.icon;
        this.mNotActive.imageGuid = this._talent.data.iconGray;

        this.mItem.size = new Vector2(this._talent.data.infoSize, this._talent.data.infoSize);
        this.mItem.position = new Vector2(this._talent.data.infoPos[0], this._talent.data.infoPos[1]);
        this.mNotActive.size = new Vector2(this._talent.data.infoSize, this._talent.data.infoSize);
        this.mNotActive.position = new Vector2(this._talent.data.infoPos[0], this._talent.data.infoPos[1]);

        this.canActive.status = this._talent.canActive.status;
        const level = this._talent.level;
        const maxLevel = this._talent.maxLevel;
        if (this._talent.type === ETalentType.Base) {
            Gtk.trySetText(this.textTalentLevel, `${level}/${maxLevel}`);
        } else {
            Gtk.trySetText(this.textTalentLevel, `${level ? level : ""}`);
        }
    }
}