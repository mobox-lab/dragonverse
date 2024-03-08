/*
 * @Author       : dal
 * @Date         : 2023-11-29 16:56:04
 * @LastEditors  : dal
 * @LastEditTime : 2023-11-30 11:03:52
 * @FilePath     : \hauntedparadise\JavaScripts\modules\procedure\ui\NotebookPanel.ts
 * @Description  : 
 */
import { GameConfig } from "../../../../config/GameConfig";
import Notebook_UI_Generate from "../../../../ui-generate/ShareUI/Notebook_UI_generate";
import { MainUI } from "../../../ui/MainUI";
import ProcedureData from "../ProcedureData";
import { ProcedureModuleC } from "../ProcedureModuleC";

/** 最多规则数 */
const MaxRuleNum: number = 6;

/** 最大页数 */
const MaxPageNum: number = 6;

/** 笔记本和主界面UI不同存 */
export class NotebookPanel extends Notebook_UI_Generate {

    ruleList: TextBlock[] = [];

    pageBtnList: StaleButton[] = [];

    /** 红点列表 */
    dotList: Image[] = [];

    /** 这个页数代表下标 */
    curPageNum: number = 1;

    /** 圈圈选中的颜色 */
    readonly pickedColor: LinearColor = LinearColor.colorHexToLinearColor("FFFF00FF");

    /** 圈圈未选中的颜色 */
    readonly unpickedColor: LinearColor = LinearColor.colorHexToLinearColor("C6C6C6FF");

    /** 已读，字体颜色 */
    readonly readColor: LinearColor = LinearColor.colorHexToLinearColor("C6C6C6FF");

    /** 未读，字体颜色 */
    readonly unreadColor: LinearColor = LinearColor.colorHexToLinearColor("FFFF00FF");

    /** 未读规则列表 */
    public unreadRuleList: number[] = [];

    /** 未读的tab列表 */
    public unreadTabList: number[] = [];

    protected onAwake(): void {
        this.initButtons();
        this.init();
        this.btn_back.onClicked.add(() => { UIService.show(MainUI); });
        this.layer = UILayerTop;
    }

    protected onStart() {
        DataCenterC.ready().then(() => {
            DataCenterC.getData(ProcedureData).noteUnlockAction.add(noteId => {
                if (this.unreadRuleList.includes(noteId)) { console.error("DEBUG TypeError 不对头，已经有这个笔记的未读消息，怎么又来一个"); return; }
                this.unreadRuleList.push(noteId);
                let pageNum = this.getPageNumByCfgId(noteId);
                this.triggerDot(pageNum);
                !this.unreadTabList.includes(pageNum) && this.unreadTabList.push(pageNum);
            });
        })
    }

    /** 每次加载游戏的时候需要清理一下所有红点 */
    public clearAllDot() {
        this.unreadTabList.forEach((tab) => { this.hideDotByTab(tab); });
        this.unreadRuleList.length = 0;
        UIService.getUI(MainUI).img_point.visibility = SlateVisibility.Collapsed;
    }

    /** 新解锁的笔记激发红点 */
    private triggerDot(pageNum: number) {
        UIService.getUI(MainUI).img_point.visibility = SlateVisibility.SelfHitTestInvisible;
        this.showDotByTab(pageNum);
    }

    private showDotByTab(pageNum: number) {
        this.dotList[pageNum].visibility = SlateVisibility.SelfHitTestInvisible;
    }

    /** 隐藏红点，并且没有红点时，隐藏主界面的红点 */
    private hideDotByTab(pageNum: number) {
        if (!this.dotList[pageNum].visible) { return; }
        this.dotList[pageNum].visibility = SlateVisibility.Collapsed;
        this.unreadTabList.splice(this.unreadTabList.indexOf(pageNum), 1);
        if (!this.existUnreadNote()) { UIService.getUI(MainUI).img_point.visibility = SlateVisibility.Collapsed; }
    }

    /**
     * 根据笔记本配置表id拿页数下标 = tab - 1
     * @param cfgId 配置id
     * @returns 
     */
    private getPageNumByCfgId(cfgId: number) {
        return GameConfig.Notebook.getElement(cfgId).tab - 1;
    }

    /** 是否还存在未读note */
    private existUnreadNote() {
        return this.unreadTabList.length != 0;
    }

    /** 初始化 */
    private init() {
        for (let index = 0; index < MaxRuleNum; index++) {
            const ruleTxt = this[`text_${index + 1}`] as TextBlock;
            ruleTxt.text = "?";
            ruleTxt.fontColor = this.readColor;
            this.ruleList.push(ruleTxt);
        }
        for (let index = 0; index < MaxPageNum; index++) {
            const pageBtn = this[`btn_pageturning${index + 1}`];
            pageBtn.onClicked.add(() => { this.turnPage(index) });
            this.unPicked(pageBtn);
            this.pageBtnList.push(pageBtn);
            const redDot: Image = this[`img_point${index + 1}`];
            redDot.visibility = SlateVisibility.Collapsed;
            this.dotList.push(redDot);
        }
    }

    public picked(btn: StaleButton) {
        btn.normalImageColor = this.pickedColor;
    }

    public unPicked(btn: StaleButton) {
        btn.normalImageColor = this.unpickedColor;
    }

    /**
     * 翻页
     * @param pageNum 翻页的序号
     * @param isForce 是否强制翻页
     */
    private turnPage(pageNum: number, isForce: boolean = false) {
        if (!isForce && this.curPageNum === pageNum) { return; }
        this.unPicked(this.pageBtnList[this.curPageNum]);
        this.curPageNum = pageNum;
        this.picked(this.pageBtnList[this.curPageNum]);
        const pageCfgList = GameConfig.Notebook.getAllElement().filter((v) => { return v.tab === (this.curPageNum + 1) });
        pageCfgList.forEach((pageCfg, id) => {
            let isUnlock = ModuleService.getModule(ProcedureModuleC).noteIsUnlock(pageCfg.id);
            this.ruleList[id].text = isUnlock ? pageCfg.desc : "?";
            if (this.unreadRuleList.includes(pageCfg.id)) {
                this.ruleList[id].fontColor = this.unreadColor;
                this.unreadRuleList.splice(this.unreadRuleList.indexOf(pageCfg.id), 1);
            } else {
                this.ruleList[id].fontColor = this.readColor;
            }
        });
        this.hideDotByTab(pageNum);
    }

    protected onShow() {
        UIService.hide(MainUI);
        this.turnPage(0, true);
    }
}