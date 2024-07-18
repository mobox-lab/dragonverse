import Gtk from "gtoolkit";
import { ETalentType } from "../../const/enum";
import { Yoact } from "../../depend/yoact/Yoact";
import { GameConfig } from "../../config/GameConfig";
import { ITalentTreeElement } from "../../config/TalentTree";
import { ITalentBuffElement } from "../../config/TalentBuff";
import TalentItem_Generate from "../../ui-generate/TalentTree/TalentItem_generate";

export class TalentItem extends TalentItem_Generate {
    private _currentLevel = Yoact.createYoact({count: 0});
    private _maxLevel = Yoact.createYoact({count: 0});
    private _talentType: ETalentType = ETalentType.Base;
    public data: ITalentTreeElement;
    public buff: ITalentBuffElement;

    protected onStart(): void {
        Yoact.bindYoact(() => {
            const currentLevel = this._currentLevel.count;
            const maxLevel = this._maxLevel.count;
            Gtk.trySetText(this.textTalentLevel, `${currentLevel}/${maxLevel}`);
        });
    }

    protected onShow(...params: any[]) {
        super.onShow(...params);
    }

    protected onHide(): void {
    }

    public setData(data: ITalentTreeElement): void {
        this.data = data;
        this._talentType = data.type;
        this.textTalentName.text = data.nameCN;
        this.mItem.normalImageGuid = data.icon;
        this.buff = GameConfig.TalentBuff.getElement(data.buffId);
        this._maxLevel.count = this.buff.value.length;
    }
}