/*
 * @Author       : chen.liang chen.liang@appshahe.com
 * @Date         : 2023-05-16 11:03:05
 * @FilePath: \nevergiveup\JavaScripts\Modules\globalRank\ui\UIGlobalRankItem.ts
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-21 17:34:53
 * @Description  : 
 */
import GlobalRankItem_Generate from "../../../ui-generate/module_globalRank/GlobalRankItem_generate";
import GlobalRankRow_Generate from "../../../ui-generate/module_globalRank/GlobalRankRow_generate";
import { RankInfoBase } from "../GlobalRankCustomData";
import Utils from '../../../Utils';
import { GameConfig } from "../../../config/GameConfig";

/**
 * ui格子,可以在ui中修改形式
 */
export class GlobalRankItem extends GlobalRankItem_Generate {

    public get txt_field() {
        return this.mTxt_Field;
    }
}
/**
 * ui 行,可以在ui中修改形式
 */
export class GlobalRankRow extends GlobalRankRow_Generate {

    private _items: GlobalRankItem[] = [];
    setData<Info extends RankInfoBase>(index: number, key: string, info: Info) {
        if (index >= 0) {
            this._items[0].txt_field.text = (index + 1).toString();
        }
        else {
            this._items[0].txt_field.text = GameConfig.Language.getElement("Text_Unranked").Value;
        }
        this._items[1].txt_field.text = Utils.truncateString(info.name, 13);
        this._items[2].txt_field.text = Utils.formatNumber(info.score);
    }

    setField(fields: string[], isSelf: boolean = false) {
        let i = 0
        for (; i < fields.length; i++) {
            if (!this._items[i]) {
                this._items[i] = UIService.create(GlobalRankItem);
                const size = this._items[i].uiObject.size;
                this.mContent.addChild(this._items[i].uiObject);
                this._items[i].uiObject.size = size;
            }
            this._items[i].txt_field.text = fields[i];
            if (isSelf) {
                this._items[i].txt_field.setFontColorByHex("#63FF00");
            }
        }
        for (; i < this._items.length; i++) {
            this._items[i].uiObject.visibility = SlateVisibility.Collapsed
        }
    }
}

