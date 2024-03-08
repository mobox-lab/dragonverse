import { GameConfig } from "../../../../config/GameConfig";
import { IPassEndingElement } from "../../../../config/PassEnding";
import DiffiRecord_UI_Generate from "../../../../ui-generate/ShareUI/DiffiRecord_UI_generate";
import Record_UI_Generate from "../../../../ui-generate/ShareUI/Record_UI_generate";
import { CommonUtils } from "../../../utils/CommonUtils";
import { GridContainer } from "../../../utils/UIPool";
import GlobalRankData from "../../globalRank/GlobalRankData";
import PlayerRankData, { PlayerPassDataItem } from "../../globalRank/PlayerRankData";
import { DegreeChoosePanel } from "./DegreeChoosePanel";

export class DiffRecordUI extends DiffiRecord_UI_Generate {
    private _container: GridContainer<DiffRecordRow>;

    onStart() {
        this.layer = UILayerDialog;
        this._container = new GridContainer<DiffRecordRow>(this.containCav, DiffRecordRow);
        this.btn_introduce.onClicked.add(() => {
            UIService.hideUI(this);
        })
    }

    onShow() {
        UIService.getUI(DegreeChoosePanel).canvas_diffitips.visibility = SlateVisibility.Collapsed;
        this._container.removeAllNode();
        let cfgs = GameConfig.PassEnding.getAllElement();
        cfgs.forEach(e => {
            let node = this._container.addNode();
            node.setData(e);
        })
    }

    onHide() {
        UIService.getUI(DegreeChoosePanel).canvas_diffitips.visibility = SlateVisibility.SelfHitTestInvisible;
    }
}

export class DiffRecordRow extends Record_UI_Generate {
    private _itemArr: TrophyItemUI[] = [];

    onStart() {
        for (let index = 0; index < 5; index++) {
            const element = this[`canvas_trophy1_${index + 1}`]
            this._itemArr.push(new TrophyItemUI(element));
        }
    }

    setData(cfg: IPassEndingElement) {
        let dataHelper = DataCenterC.getData(PlayerRankData);
        let isClear = dataHelper.isClearEnd(cfg.id);
        if (isClear) {
            this.text_ed1.text = cfg.title;
            const dataItem = dataHelper.getEndData(cfg.id);
            for (let index = 0; index < this._itemArr.length; index++) {
                const element = this._itemArr[index];
                let score = PlayerPassDataItem.getRankScore(dataItem, index + 1);
                if (score != -1) {
                    element.setAsTrophy(score);
                }
                else {
                    element.setAsShadow();
                }
            }
        }
        else {
            this.text_ed1.text = GameConfig.Language.Ending_Title0.Value;
            for (let index = 0; index < this._itemArr.length; index++) {
                const element = this._itemArr[index];
                element.setAsShadow();
            }
        }
    }
}

export class TrophyItemUI {
    private _shadow: Image;
    private _trophy: Image;
    private _title: TextBlock;
    private _time: TextBlock;

    public constructor(cav: Canvas) {
        this._shadow = cav.getChildByName("Shadow");
        this._trophy = cav.getChildByName("Trophy");
        this._title = cav.getChildByName("Diff_Txt");
        this._time = cav.getChildByName("Time_Txt");
        this.initLanguage(this._title);
    }

    public setAsShadow() {
        this._shadow.visibility = SlateVisibility.SelfHitTestInvisible;
        this._trophy.visibility = SlateVisibility.Collapsed;
        this._title.visibility = SlateVisibility.Collapsed;
        this._time.visibility = SlateVisibility.Collapsed;
    }

    public setAsTrophy(time: number) {
        this._shadow.visibility = SlateVisibility.Collapsed;
        this._trophy.visibility = SlateVisibility.SelfHitTestInvisible;
        this._title.visibility = SlateVisibility.SelfHitTestInvisible;
        this._time.visibility = SlateVisibility.SelfHitTestInvisible;
        this._time.text = CommonUtils.FormatTime(time);
    }

    private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
}
