import Gtk from "gtoolkit";
import { ETalentType } from "../../const/enum";
import { Yoact } from "../../depend/yoact/Yoact";
import { GameConfig } from "../../config/GameConfig";
import { ITalentTreeElement } from "../../config/TalentTree";
import { ITalentBuffElement } from "../../config/TalentBuff";
import TalentItem_Generate from "../../ui-generate/TalentTree/TalentItem_generate";
import { TalentTreeActions } from "./TalentTreeContainer";
import TalentModuleC from "../../Modules/talent/TalentModuleC";

/**
 * 基础天赋
 */
export class TalentItem extends TalentItem_Generate {
    private _talentC: TalentModuleC;
    private _level: number = 0;
    private _maxLevel: number = 0;
    public type: ETalentType = ETalentType.Base;
    public data: ITalentTreeElement;
    public buff: ITalentBuffElement;
    public isActive = Yoact.createYoact({status: false});
    public canActive = Yoact.createYoact({status: false});

    private get talentC(): TalentModuleC | null {
        if (!this._talentC) this._talentC = ModuleService.getModule(TalentModuleC);
        return this._talentC;
    }

    public get level() {
        return this._level;
    }

    public get maxLevel() {
        return this._maxLevel;
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
                this.textTalentLevel.fontColor = LinearColor.white;
                this.textTalentLevel.outlineColor = LinearColor.black;
                this.textTalentName.fontColor = LinearColor.white;
                this.textTalentName.outlineColor = LinearColor.black;
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
        this.type = data.type;
        this._maxLevel = data.maxLevel;
        this.buff = GameConfig.TalentBuff.getElement(data.buffId);
        const currentLevel = this.talentC.getTalentIndex(data.id);
        this.setCurrentLevel(currentLevel);
        this.refreshCanActive();

        this.textTalentName.text = GameConfig.Language.getElement(data.name).Value;
        this.mItem.normalImageGuid = data.icon;
        this.mNotActive.imageGuid = data.iconGray;
        this.mItem.size = new Vector2(data.iconSize, data.iconSize);
        this.mLocked.size = new Vector2(data.iconSize, data.iconSize);
        this.mNotActive.size = new Vector2(data.iconSize, data.iconSize);
        this.mSelected.size = new Vector2(data.selectedSize, data.selectedSize);
        this.mItem.position = new Vector2(data.iconPos[0], data.iconPos[1]);
        this.mLocked.position = new Vector2(data.iconPos[0], data.iconPos[1]);
        this.mNotActive.position = new Vector2(data.iconPos[0], data.iconPos[1]);
        this.mSelected.position = new Vector2(data.selectedPos[0], data.selectedPos[1]);
    }

    public setCurrentLevel(index: number) {
        this._level = index;
        if (this._level > 0) {
            this.isActive.status = true;
        }
        if (this.type === ETalentType.Base) {
            Gtk.trySetText(this.textTalentLevel, `${this._level}/${this._maxLevel}`);
        } else {
            Gtk.trySetText(this.textTalentLevel, `${this._level ? this._level : ""}`);
        }
    }

    /**
     * 获取当前 buff等级 的数值
     * @returns {number}
     */
    public getCurrentBuffValue(): number {
        // 巅峰天赋累加数值
        if (this.type === ETalentType.Peak) return this.buff.value[0] * this._level;
        return this.buff.value[this._level - 1] ?? 0;
    }

    public refreshCanActive() {
        if (this.data.frontTalent?.length) {
            const frontLevels = this.data.frontTalent.map(id => this.talentC.getTalentIndex(id));
            if (frontLevels.every(n => n > 0)) {
                this.canActive.status = true;
            }
        } else {
            this.canActive.status = true;
        }
    }

    /**
     * 获取升级消耗
     * @returns {[number | null, number | null]} -- [金币,科技点]
     */
    public getUpdateLevelCost(): [number | null, number | null] {
        if (!this.data || this._level >= this._maxLevel) return [null, null];
        const cost = this.data.cost;
        if (this.type === ETalentType.Peak) return [cost[0][1], cost[1][1]];
        return [cost[0][this._level + 1], cost[0][this._level + 1]];
    }
}