import GlobalRankPanel_Generate from "../../../../ui-generate/ShareUI/module_globalRank/GlobalRankPanel_generate";
import { DegreeType } from "../../blackboard/BoardDefine";
import { GlobalRankDataInfoBase, MaxRankItemViewLength } from "../GlobalRankData";
import { GlobalRankModuleC, rankDataTypeList } from "../GlobalRankModuleC";
import UIGlobalRankItem from "./UIGlobalRankItem";

class DegreeChooseItem {

    /** 选中的图片GUID */
    readonly pickedGuid: string = "230915";

    readonly unPickedGuid: string = "230901";

    /** 选中的颜色 */
    readonly pickedColor: LinearColor = LinearColor.colorHexToLinearColor("C6C6C6FF");

    readonly unPickedColor: LinearColor = LinearColor.colorHexToLinearColor("000000FF");

    public constructor(public shiftBtn: StaleButton, public txt: TextBlock, public degreeType: DegreeType) {
        this.unPicked();
    }

    picked() {
        this.shiftBtn.normalImageGuid = this.pickedGuid;
        this.txt.fontColor = this.pickedColor;
    }

    unPicked() {
        this.shiftBtn.normalImageGuid = this.unPickedGuid;
        this.txt.fontColor = this.unPickedColor;
    }
}

export default class UIGlobalRankPanel extends GlobalRankPanel_Generate {
    /** 排行榜中的item */
    private _rankItems: UIGlobalRankItem[] = [];

    /** 自己的item */
    private _selfItem: UIGlobalRankItem;

    /** 默认当前排行榜的经典模式的 */
    private _curDegree: DegreeType = DegreeType.Simple;

    public dciMap: Map<number, DegreeChooseItem> = new Map();

    public get curDegree() {
        return this._curDegree;
    }

    protected onAwake(): void {
        this.mClose_btn.onClicked.add(() => { mw.UIService.hideUI(this); });
        for (let index = 0; index < rankDataTypeList.length; index++) {
            let shiftBtn = this[`mBtn_Tab${index + 1}`];
            let txt = this[`textBlock${index + 1}`];
            let degreeType = rankDataTypeList[index];
            this.dciMap.set(degreeType, new DegreeChooseItem(shiftBtn, txt, degreeType));
            shiftBtn.onClicked.add(() => { this.shiftRankView(degreeType) });
        }
    }

    onStart() {
        this.initButtons();
        this.initRankItems();
        this.dciMap.get(this.curDegree).picked();
    }

    /** 初始化排行数据，包括自己的排行数据 */
    private initRankItems() {
        this._selfItem = UIService.create(UIGlobalRankItem);
        this._selfItem.setSelfStaticInfo();
        this.mCanvas_Self.addChild(this._selfItem.uiObject);
        for (let i = 0; i < MaxRankItemViewLength; i++) {
            const item = UIService.create(UIGlobalRankItem);
            item.setStaticInfo(i + 1);
            this._rankItems.push(item);
            this.mContent.addChild(item.uiObject);
        }
    }

    /** 切换排行榜视图 */
    public shiftRankView(key: DegreeType) {
        if (this._curDegree === key) { return; }
        this.dciMap.get(this.curDegree).unPicked();
        this._curDegree = key;
        this.dciMap.get(this.curDegree).picked();
        this.rankItemScrollBox.scrollToStart();
        this.onDataChange(this.globalRankModuleC.dataMap.get(this._curDegree));
    }

    private get globalRankModuleC() {
        return ModuleService.getModule(GlobalRankModuleC);
    }

    protected onShow(degree?: DegreeType) {
        if (degree && degree != this.curDegree) {
            this.shiftRankView(degree);
        }else {
            this.onDataChange(this.globalRankModuleC.dataMap.get(this.curDegree));
        }
    }

    private async onDataChange<Info extends GlobalRankDataInfoBase>(data: Info[]) {
        // 没显示，不更新
        if (!this.visible) { return; }
        if (data.length === 0) {
            this.canvas_nobody.visibility = SlateVisibility.Visible;
            this.rankItemScrollBox.visibility = SlateVisibility.Collapsed;
            this._selfItem.setSelfDataNotOnList(this.globalRankModuleC.reqGetSelfScore(this._curDegree));
            return;
        } else {
            this.canvas_nobody.visibility = SlateVisibility.Collapsed;
            this.rankItemScrollBox.visibility = SlateVisibility.Visible;
        }
        
        for (let i = 0; i < MaxRankItemViewLength; i++) {
            if (data[i]) {
                const info = data[i];
                let item = this._rankItems[i];
                item.setData(info);
                item.setVisible(true);
            }else {
                this._rankItems[i].setVisible(false);
            }
        }

        // 看自己在没在榜上，在榜上是多少名(当前时前五十名的数据，没在前五十名可能会在后950名)
        let id = data.findIndex(v => { return v.i === Player.localPlayer.userId });
        if (id === -1) {
            this._selfItem.setSelfDataNotOnList(this.globalRankModuleC.reqGetSelfScore(this._curDegree));
        } else {
            this._selfItem.setSelfDataOnList(data[id], id + 1);
        }
    }

    /**
     * 添加不同难度的排行榜
     * @param type 难度
     */
    public addDegree(type: DegreeType) {
        ModuleService.getModule(GlobalRankModuleC).addViewAction(type, this.onDataChange.bind(this));
    }
}