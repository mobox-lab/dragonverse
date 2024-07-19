import Gtk from "gtoolkit";
import { Yoact } from "../../depend/yoact/Yoact";
import { GameConfig } from "../../config/GameConfig";
import { ITalentBuffElement } from "../../config/TalentBuff";
import { ITalentTreeElement } from "../../config/TalentTree";
import TalentItem_Generate from "../../ui-generate/TalentTree/TalentItem_generate";

export class UITalentItem extends TalentItem_Generate {
    private _currentLevel = Yoact.createYoact({count: 0});
    private _maxLevel = Yoact.createYoact({count: 0});
    public data: ITalentTreeElement;
    public buff: ITalentBuffElement;

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
                Gtk.trySetVisibility(this.mNotActive, false);
                this.textTalentLevel.setFontColorByHex("#6D6D6D");
                this.textTalentLevel.setOutlineColorByHex("#BDBDBD");
                this.textTalentName.setOutlineColorByHex("#6D6D6D");
                this.textTalentName.setOutlineColorByHex("#BDBDBD");
            }
        });
    }

    public setData(data: ITalentTreeElement): void {
        this.data = data;
        this.textTalentName.text = data.nameCN;
        this.mItem.normalImageGuid = data.icon;
        this.buff = GameConfig.TalentBuff.getElement(data.buffId);
        this._maxLevel.count = this.buff.value.length;
    }

    public setCurrentLevel(index: number) {
        this._currentLevel.count = index;
    }
}