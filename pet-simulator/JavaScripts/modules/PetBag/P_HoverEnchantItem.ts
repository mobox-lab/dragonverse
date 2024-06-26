import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import Hover_item_Generate from "../../ui-generate/Hover_Bag/Hover_item_generate";
import Gtk from "../../util/GToolkit";
import { utils } from "../../util/uitls";


/**词条item */
export class P_HoverEnchantItem extends Hover_item_Generate {
    public cfgId: number = 0;
    private isChoose: boolean = false;
    public onClickAc: Action = new Action();

    onStart() {
        this.setEmptyUI();
        if (this.isChoose) this.picSelect.visibility = mw.SlateVisibility.Visible;
        else this.picSelect.visibility = mw.SlateVisibility.Hidden;
        this.mButton_Entry.onClicked.add(() => {
            this.onClickAc.call();
        });
    }

    // idx 0 槽位1， idx 1 槽位2
    public setEmptyUI(idx?: number) {
        this.mButton_Entry.normalImageGuid = GlobalData.Enchant.enchantItemGuid[3];
        Gtk.trySetVisibility(this.can_SlotText, mw.SlateVisibility.Visible);
        this.text_Slot.text = idx ? GameConfig.Language.Enchants_new008.Value : GameConfig.Language.Enchants_new004.Value;
        Gtk.trySetVisibility(this.mTextBlock_Entry, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.textEnhanceName, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.textScoreNumber, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.textScoreUp, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.picScore, mw.SlateVisibility.Collapsed);
    }

    public setUnlockUI() {
        this.mButton_Entry.normalImageGuid = GlobalData.Enchant.enchantItemGuid[4]; // 未解锁
        Gtk.trySetVisibility(this.can_SlotText, mw.SlateVisibility.Visible);
        this.text_Slot.text = GameConfig.Language.Enchants_new005.Value;
        Gtk.trySetVisibility(this.mTextBlock_Entry, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.textEnhanceName, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.textScoreNumber, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.textScoreUp, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.picScore, mw.SlateVisibility.Collapsed);
    }

    private getBgImageGuid(cfgId: number) {
        if (
            cfgId >= GlobalData.Enchant.mythEnchantIdRange[0] &&
            cfgId <= GlobalData.Enchant.mythEnchantIdRange[1]
        ) {
            return GlobalData.Enchant.enchantItemGuid[2];
        }
        if (
            cfgId >= GlobalData.Enchant.specialEnchantIdRange[0] &&
            cfgId <= GlobalData.Enchant.specialEnchantIdRange[1]
        ) {
            return GlobalData.Enchant.enchantItemGuid[1];
        }
        return GlobalData.Enchant.enchantItemGuid[0];
    }

    /**设置配置id */
    public setCfgId(cfgId: number, isLock?: boolean) {
        this.cfgId = cfgId;
        const cfg = GameConfig.Enchants.getElement(cfgId);
        if (!cfg) return;
        this.mButton_Entry.normalImageGuid = this.getBgImageGuid(cfgId);
        this.textEnhanceName.text = cfg.Name;
        this.mTextBlock_Entry.text = utils.Format(cfg.Describe, cfg.Degree);
        this.textScoreNumber.text = utils.formatNumber(cfg.RankScore ?? 0);
        Gtk.trySetVisibility(this.can_SlotText, mw.SlateVisibility.Collapsed);
        Gtk.trySetVisibility(this.picScore, mw.SlateVisibility.HitTestInvisible);
        Gtk.trySetVisibility(this.textEnhanceName, mw.SlateVisibility.HitTestInvisible);
        Gtk.trySetVisibility(this.mTextBlock_Entry, mw.SlateVisibility.HitTestInvisible);
        Gtk.trySetVisibility(this.textScoreNumber, mw.SlateVisibility.HitTestInvisible);
        Gtk.trySetVisibility(this.textScoreUp, mw.SlateVisibility.HitTestInvisible);
        if (isLock) {
            Gtk.trySetVisibility(this.picSelect, mw.SlateVisibility.Visible);
            this.picSelect.imageGuid = GlobalData.Enchant.enchantSelectIconGuid[1];
        }
    }

    /**选中态 */
    public get SelectState(): boolean {
        return this.isChoose;
    }

    public setSelectState(isChoose: boolean) {
        this.isChoose = isChoose;
        if (this.isChoose) this.picSelect.visibility = mw.SlateVisibility.Visible;
        else this.picSelect.visibility = mw.SlateVisibility.Hidden;
    }
}
