import Gtk from "gtoolkit";
import { ETalentType } from "../../const/enum";
import { Yoact } from "../../depend/yoact/Yoact";
import { GameConfig } from "../../config/GameConfig";
import { ITalentTreeElement } from "../../config/TalentTree";
import { ITalentBuffElement } from "../../config/TalentBuff";
import TalentItem_Generate from "../../ui-generate/TalentTree/TalentItem_generate";
import { TalentTreeActions } from "./TalentTreeContainer";

/**
 * 基础天赋
 */
export class TalentItem extends TalentItem_Generate {
    private _currentLevel = Yoact.createYoact({count: 0});
    private _maxLevel = Yoact.createYoact({count: 0});
    public data: ITalentTreeElement;
    public buff: ITalentBuffElement;
    public isActive = Yoact.createYoact({status: false});
    public canActive = Yoact.createYoact({status: false});

    public get level() {
        return this._currentLevel.count;
    }

    protected onStart(): void {
        this.mLocked.renderOpacity = 0.4;
        this.mItem.onHovered.add(() => {
            this.mLocked.renderOpacity = 0.2;
        });
        this.mItem.onUnhovered.add(() => {
            this.mLocked.renderOpacity = 0.4;
        });
        this.mItem.onClicked.add(() => {
            TalentTreeActions.onItemSelected.call(this.data.id);
        });
        Yoact.bindYoact(() => {
            const currentLevel = this._currentLevel.count;
            const maxLevel = this._maxLevel.count;
            Gtk.trySetText(this.textTalentLevel, `${currentLevel}/${maxLevel}`);
        });
        Yoact.bindYoact(() => {
            if (this.isActive.status) {
                Gtk.trySetVisibility(this.mLocked, false);
                Gtk.trySetVisibility(this.mNotActive, false);
                this.textTalentLevel.fontColor = LinearColor.white;
                this.textTalentLevel.outlineColor = LinearColor.black;
                this.textTalentName.fontColor = LinearColor.white;
                this.textTalentName.outlineColor = LinearColor.black;
            }
            if (!this.isActive.status && this.canActive.status) {
                Gtk.trySetVisibility(this.mLocked, true);
                Gtk.trySetVisibility(this.mNotActive, false);
            }
            if (!this.isActive.status && !this.canActive.status) {
                Gtk.trySetVisibility(this.mLocked, false);
                Gtk.trySetVisibility(this.mNotActive, true);
            }
        });
    }

    protected onShow(...params: any[]) {
        super.onShow(...params);
    }

    protected onHide(): void {
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
        if (index > 0) {
            this.isActive.status = true;
        }
    }

    /**
     * 获取当前 buff等级 的数值
     * @returns {number}
     */
    public getCurrentBuffValue(): number {
        return this.buff.value[this._currentLevel.count - 1] ?? 0;
    }
}