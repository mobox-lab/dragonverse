/*
 * @Author       : dal
 * @Date         : 2023-11-14 10:15:32
 * @LastEditors  : dal
 * @LastEditTime : 2024-02-04 18:20:16
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\archive\ui\ArchiveItem.ts
 * @Description  : 
 */
import { GameConfig } from "../../../../config/GameConfig";
import { CommonUtils } from "../../../utils/CommonUtils";
import { GlobalSwitch } from "../../../utils/GlobalSwitch";
import TimeTransferUtil from "../../../utils/TimeTransferUtil";
import { DegreeType, StyleType } from "../../blackboard/BoardDefine";
import { INIT_LIFE_NUM } from "../../player/PlayerData";
import { ProcedureModuleC } from "../../procedure/ProcedureModuleC";
import { DegreeChoosePanel } from "../../procedure/ui/DegreeChoosePanel";
import { ArchiveData } from "../ArchiveHelper";
import { ArchivePanel } from "./ArchivePanel";
import { DeletePanel } from "./DeletePanel";

export default class ArchiveItem {

    /** 存档序号 */
    id: number = 0;

    /** 画面风格 */
    style: StyleType = StyleType.Cute;

    /** 数据 */
    private _data: ArchiveData;

    /** 是否初始化 */
    private _isInit: boolean = false;

    public constructor(public deleteBtn: Button, public degreeTxt: TextBlock, public lifeTxt: TextBlock,
        public dateTxt: TextBlock, public emptyTxt: TextBlock, public createDateTxt: TextBlock,
        public startBtn: Button, public startTxt: TextBlock) { }

    initButtons() {
        this.startBtn.onClicked.add(this.reqLoadGame.bind(this));

        this.deleteBtn.onClicked.add(() => {
            if (this._data && this._data.isInit) { UIService.show(DeletePanel, this.id) }
        });
    }

    private reqLoadGame() {
        UIService.hide(ArchivePanel);
        if (this._isInit) {
            ModuleService.getModule(ProcedureModuleC).loadGame(this._data.degree, this.style, this.id, true);
        } else {
            // 动态难度，将没有难度选择界面
            if (GlobalSwitch.isDynamicDegree()) {
                ModuleService.getModule(ProcedureModuleC).loadGame(DegreeType.Simple, this.style, this.id);
            }
            else {
                UIService.show(DegreeChoosePanel, this.style, this.id);
            }
        }
    }

    /**
     * 设置存档显示信息
     * @param data 存档数据
     */
    setInfo(data: ArchiveData) {
        this._isInit = data.isInit;
        this._data = data;
        this.emptyTxt.text = this._isInit ? "" : GameConfig.Language.procedure_3.Value;
        this.startTxt.text = this._isInit ? GameConfig.Language.procedure_1.Value : GameConfig.Language.procedure_2.Value;

        if (this._isInit) {
            this.deleteBtn.visibility = SlateVisibility.Visible;
        } else {
            this.deleteBtn.visibility = SlateVisibility.Collapsed;
        }

        if (GlobalSwitch.enableTimeSys()) {
            this.setTxt(this.degreeTxt, "");
        } else {
            this.setTxt(this.degreeTxt, getDegreeTxtByType(data.degree));
        }

        if (GlobalSwitch.enableTimeSys()) {
            this.setTxt(this.lifeTxt, CommonUtils.formatString(GameConfig.Language.procedure_4.Value, (data.aliveDay + 1)));
        } else {
            this.setTxt(this.lifeTxt, CommonUtils.formatString(GameConfig.Language.procedure_4.Value, (INIT_LIFE_NUM - data.lifeNum + 1)));
        }
        this.setTxt(this.dateTxt, CommonUtils.formatString(GameConfig.Language.procedure_5.Value, TimeTransferUtil.getDateStrByTimeMili(data.gameTime)));
        this.setTxt(this.createDateTxt, CommonUtils.formatString(GameConfig.Language.procedure_6.Value, TimeTransferUtil.getDateStr1ByTimeStamp(data.createTime)));
    }

    private setTxt(txt: TextBlock, str: string) {
        txt.text = this._isInit ? str : "";
    }
}

export function getDegreeTxtByType(type: DegreeType) {
    return GameConfig.Difficulty.getElement(type).name;
}