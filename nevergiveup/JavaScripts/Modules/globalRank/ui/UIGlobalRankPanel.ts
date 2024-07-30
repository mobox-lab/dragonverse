/*
 * @Author       : chen.liang chen.liang@appshahe.com
 * @Date         : 2023-05-16 11:02:07
 * @FilePath: \globalRank\JavaScripts\modules\globalRank\ui\UIGlobalRankPanel.ts
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2023-12-19 10:04:23
 * @Description  : 
 */

// import { AddGMCommand } from "module_gm";
import GlobalRankPanel_Generate from "../../../ui-generate/module_globalRank/GlobalRankPanel_generate";
import { RankInfoBase } from "../GlobalRankCustomData";
import { GlobalRankModuleC } from "../GlobalRankModuleC";
import { GlobalRankRow } from "./UIGlobalRankItem";

// AddGMCommand("showRank", (player, params) => {
//     UIService.show(UIGlobalRankPanel);
// }, null, "gm");

/**
 * 全局排行榜面板,下面有具体使用实例
 */
class UIGlobalRankPanelBase extends GlobalRankPanel_Generate {

    private _currentKey: string;
    private _rows: GlobalRankRow[] = [];
    private _selfRow: GlobalRankRow;
    private _fieldRow: GlobalRankRow;
    private _currField: string[] = [];

    private onSelfDataChange<Info extends RankInfoBase>(key: string, index: number, data: Info) {
        if (key != this._currentKey) return;
        this.setSelfData(index, data);
    }
    private onDataChange<Info extends RankInfoBase>(key, data: Info[]) {
        if (key != this._currentKey) return;
        if (!data) {
            this._rows.forEach((item) => {
                item.uiObject.visibility = SlateVisibility.Collapsed;
            })
            if (this._selfRow) {
                this._selfRow.uiObject.visibility = SlateVisibility.Collapsed;
            }
            return;
        }
        const userId = Player.localPlayer.userId;
        if (!this._fieldRow) {
            this._fieldRow = UIService.create(GlobalRankRow);
            this.mFieldName.addChild(this._fieldRow.uiObject);
        }
        this._fieldRow.setField(this._currField);
        let i = 0;
        for (; i < data.length; i++) {
            if (!this._rows[i]) {
                this._rows[i] = UIService.create(GlobalRankRow);
                this.mContent.addChild(this._rows[i].uiObject);
            }
            this._rows[i].setField(this._currField);
            this._rows[i].setData(i, this._currentKey, data[i]);
            this._rows[i].uiObject.visibility = SlateVisibility.Visible;
            if (data[i].id === userId) {
                this.setSelfData(i, data[i]);
            }
        }
        for (; i < this._rows.length; i++) {
            this._rows[i].uiObject.visibility = SlateVisibility.Collapsed;
        }
    }

    private setSelfData<Info extends RankInfoBase>(index: number, data: Info) {
        if (!this._selfRow) {
            this._selfRow = UIService.create(GlobalRankRow);
            this.mCanvas_Self.addChild(this._selfRow.uiObject);
            this._selfRow.setField(this._currField, true);
        }
        this._selfRow.setData(index, this._currentKey, data);
    }
    /**
     * 初始化排行榜
     * @param btn tab按钮
     * @param key   排行榜key
     * @param title     标题
     * @param isDefault  是否默认显示(default: false)
     * @param field     字段(default: ["排名", "昵称", "分数"])
     */
    initRank(key: string, title: string, isDefault: boolean = false, field: string[] = ["排名", "昵称", "分数"]) {

        ModuleService.getModule(GlobalRankModuleC).onDataChanged(key, this.onDataChange.bind(this));
        ModuleService.getModule(GlobalRankModuleC).onSelfDataChanged(key, this.onSelfDataChange.bind(this));
        if (isDefault) {
            this._currentKey = key;
            this.mTitle_txt.text = title;
            this._currField = field;
            this.onDataChange(key, ModuleService.getModule(GlobalRankModuleC).dataMap.get(key));
        }
    }

}

export class GlobalRankPanel extends UIGlobalRankPanelBase {
    onStart() {
    }
}
