/*
 * @Author       : enyu.liu enyu.liu@appshahe.com
 * @Date         : 2023-10-16 13:11:49
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-22 16:23:39
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\procedure\ui\DegreeChoosePanel.ts
 * @Description  : 
 */
import { GlobalDefine } from "../../../../DefNoSubModule";
import { GameConfig } from "../../../../config/GameConfig";
import Diffi_UI_Generate from "../../../../ui-generate/ShareUI/Diffi_UI_generate";
import GameStart from "../../../GameStart";
import { WaitLoop } from "../../../utils/AsyncTool";
import MusicMgr from "../../../utils/MusicMgr";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { UIAniUtil } from "../../../utils/UIAniUtil";
import { getDegreeTxtByType as getDegreeTxtByType } from "../../archive/ui/ArchiveItem";
import { ArchivePanel } from "../../archive/ui/ArchivePanel";
import { DegreeType, StyleType } from "../../blackboard/BoardDefine";
import UIGlobalRankPanel from "../../globalRank/ui/UIGlobalRankPanel";
import ProcedureData from "../ProcedureData";
import { ProcedureModuleC } from "../ProcedureModuleC";
import { DiffRecordUI } from "./DiffRecordUI";
import { UnlockNewDegreePanel } from "./UnlockNewDegreePanel";

class DegreeItem {

    /** 角度 */
    angle: number = 0;

    btn: StaleButton;

    txt: TextBlock;

    img: Image;

    lock: Image;

    constructor(public degreeCan: Canvas, public degree: DegreeType) {
        this.btn = degreeCan.getChildAt(0) as StaleButton;
        this.txt = degreeCan.getChildAt(1) as TextBlock;
        this.img = degreeCan.getChildAt(2) as Image;
        if (degree >= 3) { this.lock = degreeCan.getChildAt(3) as Image; }
        this.img.visibility = SlateVisibility.Collapsed;
        this.angle = (360 / 5 * (6 - degree)) % 360;
        this.btn.onClicked.add(() => { UIService.getUI(DegreeChoosePanel).switchDegree(this.degree); });
    };

    setBtnState(canUse: boolean) {
        this.btn.enable = canUse;
    }

    setPickedState() {
        this.txt.fontColor = LinearColor.colorHexToLinearColor("FFFF00FF");
        this.txt.fontSize = 30;
    }

    setUnPickedState() {
        this.txt.fontColor = LinearColor.colorHexToLinearColor("#F4F4F4FF");
        this.txt.fontSize = 28;
    }

    /** 奖杯可见 */
    setImgVisible() {
        this.img.visibility = SlateVisibility.SelfHitTestInvisible;
    }

    /** 是否带锁 */
    isLocked: boolean = false;

    showLock() {
        if (!this.lock) { return; }
        this.lock.visibility = SlateVisibility.SelfHitTestInvisible;
        this.isLocked = true;
    }

    hideLock() {
        if (!this.lock) { return; }
        this.lock.visibility = SlateVisibility.Collapsed;
        this.isLocked = false;
    }
}

/** 难度选择延迟 */
export const DEGREE_DURATION = 5e2;

export class DegreeChoosePanel extends Diffi_UI_Generate {

    /** 难度 */
    private _degree: DegreeType = DegreeType.Simple;

    /** 画面风格 */
    private _style: StyleType = StyleType.Normal;

    /** 存档id */
    private _archiveId: number = 0;

    /** key是难度 */
    private _itemMap: Map<number, DegreeItem> = new Map();

    protected onAwake(): void {
        this.initButtons();
        this.btn_startgame.onClicked.add(() => {
            ModuleService.getModule(ProcedureModuleC).loadGame(this._degree, this._style, this._archiveId);
            mw.UIService.hide(DegreeChoosePanel);
        });

        this.btn_back.onClicked.add(() => {
            mw.UIService.hide(DegreeChoosePanel);
            mw.UIService.show(ArchivePanel);
        });

        this.btn_diffiswitch.onClicked.add(() => {
            let nextDegree = (this._degree + 1) % 6 != 0 ? (this._degree + 1) % 6 : 1;
            this.switchDegree(nextDegree);
        });

        this.btn_rankinglist.onClicked.add(() => { UIService.show(UIGlobalRankPanel, this._degree) })

        this.btn_record.onClicked.add(() => {
            UIService.show(DiffRecordUI)
        })
    }

    /** 设置所有难度选择按钮的可用状态 */
    private setAllSwitchBtnState(canUse: boolean) {
        this._itemMap.forEach((item) => { item.setBtnState(canUse) });
        this.btn_diffiswitch.enable = canUse;
    }

    /** 切换难度 */
    switchDegree(degree: DegreeType, isPlayAni: boolean = true) {
        if (degree === this._degree) { return; }
        const toDegreeItem = this._itemMap.get(degree);
        this._itemMap.get(this._degree).setUnPickedState();
        this.setAllSwitchBtnState(false);
        this._degree = degree;
        this.setTipsInfo(degree);
        this.setDegreeTxtNum();

        if (!GameStart.IsAPackage) {
            if (toDegreeItem.isLocked) {
                this.canvas_diffiLock.visibility = SlateVisibility.Visible;
                this.text_diffiLock.text = StringUtil.format(GameConfig.Language["diffilock_01"].Value, GameConfig.Difficulty.getElement(this._degree - 1).name);
                this.img_lock0.visibility = SlateVisibility.Visible;
                this.btn_startgame.enable = false;
            }
            else {
                this.canvas_diffiLock.visibility = SlateVisibility.Collapsed;
                this.img_lock0.visibility = SlateVisibility.Collapsed;
                this.btn_startgame.enable = true;
            }
        }

        if (isPlayAni) {
            UIAniUtil.playAngleTurnAni(this.canvas_compass, toDegreeItem.angle, DEGREE_DURATION,
                () => {
                    this.setAllSwitchBtnState(true);
                    toDegreeItem.setPickedState();
                });
        }
        else {
            this.canvas_compass.renderTransformAngle = toDegreeItem.angle;
            this.setAllSwitchBtnState(true);
            toDegreeItem.setPickedState();
        }
    }

    /** 设置提示信息 */
    private setTipsInfo(degree: DegreeType) {
        const cfg = GameConfig.Difficulty.getElement(degree);
        if (!cfg) { console.error("没这个配置啊"); return; }
        // this.text_diff.text = getDegreeTxtByType(degree) + GameConfig.Language["text_diffi_title"].Value;
        this.text_diff.text = getDegreeTxtByType(degree);
        this.text_diffitips.text = cfg.desc;
    }

    protected onStart(): void {
        this.layer = UILayerTop;
        // 初始化五种难度item
        for (let index = 1; index <= 5; index++) { this._itemMap.set(index, new DegreeItem(this.canvas_compass.getChildAt(index) as Canvas, index)); }
        this._itemMap.get(this._degree).setPickedState();
        DataCenterC.ready().then(this.onDataReady.bind(this));
        this.setTipsInfo(this._degree);
    }

    /** 带着锁的难度 */
    private readonly degreeWithLock: DegreeType[] = [DegreeType.Difficult, DegreeType.Scary, DegreeType.MaxScary];

    private onDataReady() {
        WaitLoop.loop(() => { return DataCenterC.getData(ProcedureData) }).then((procedureData) => {
            procedureData.passedDegreesAction.add((degree) => {
                this._itemMap.get(degree).setImgVisible();
                
                if (!GameStart.IsAPackage) {
                    if (this.degreeWithLock.includes(degree + 1)) {
                        // 开锁
                        this._itemMap.get(degree + 1).hideLock();
                    }
                }
            });
            procedureData.passedDegrees.forEach((degree: number) => { this._itemMap.get(degree).setImgVisible(); });

            // 不是A包根据情况显示锁
            if (!GameStart.IsAPackage) {
                this.degreeWithLock.forEach((degree) => {
                    if (!procedureData.passedDegrees.includes(degree - 1)) {
                        // 把锁带上
                        this._itemMap.get(degree).showLock();
                    }
                });
            }
        });
    }

    protected onShow(style: StyleType, archiveId: number) {
        MusicMgr.instance.play(1004);
        GhostTraceHelper.uploadMGS("ts_action_open_box", "难度选择界面", { box_id: 2 });
        this._style = style;
        this._archiveId = archiveId;
        this._degree = DegreeType.Simple;
        this.setAllSwitchBtnState(true);
        this.setDegreeTxtNum();
        this.canvas_diffitips.visibility = SlateVisibility.SelfHitTestInvisible;
        this.switchDegree(GlobalDefine.defaultDegree, false);

        if (!GameStart.IsAPackage) {
            const procedureData = DataCenterC.getData(ProcedureData);
            if (procedureData.newDegreeList.length != 0) {
                let newDegree = procedureData.newDegreeList[0];
                UIService.show(UnlockNewDegreePanel, newDegree);
            }
        }
    }

    /** 设置通关人数 */
    private async setDegreeTxtNum() {
        let degreeNum = await ModuleService.getModule(ProcedureModuleC).reqPassNum(this._degree);
        this.text_passingnumber.text = degreeNum + "";
    }

    protected onHide() {
        this.canvas_compass.renderTransformAngle = 0;
        this.switchDegree(GlobalDefine.defaultDegree);
        UIService.hide(DiffRecordUI);
    }
}