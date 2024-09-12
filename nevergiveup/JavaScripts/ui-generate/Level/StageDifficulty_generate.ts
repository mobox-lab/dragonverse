/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */

import { SoundUtil } from "../../tool/SoundUtil";

@UIBind("UI/Level/StageDifficulty.ui")
export default class StageDifficulty_Generate extends UIScript {
    private mDifficultyImg_Internal: mw.Image;
    public get mDifficultyImg(): mw.Image {
        if (!this.mDifficultyImg_Internal && this.uiWidgetBase) {
            this.mDifficultyImg_Internal = this.uiWidgetBase.findChildByPath(
                "RootCanvas/Canvas/mDifficultyImg"
            ) as mw.Image;
        }
        return this.mDifficultyImg_Internal;
    }
    private mSelected_Internal: mw.Image;
    public get mSelected(): mw.Image {
        if (!this.mSelected_Internal && this.uiWidgetBase) {
            this.mSelected_Internal = this.uiWidgetBase.findChildByPath(
                "RootCanvas/Canvas/Canvas_2/mSelected"
            ) as mw.Image;
        }
        return this.mSelected_Internal;
    }
    private mDifficulty_Internal: mw.StaleButton;
    public get mDifficulty(): mw.StaleButton {
        if (!this.mDifficulty_Internal && this.uiWidgetBase) {
            this.mDifficulty_Internal = this.uiWidgetBase.findChildByPath(
                "RootCanvas/Canvas/Canvas_2/mDifficulty"
            ) as mw.StaleButton;
        }
        return this.mDifficulty_Internal;
    }
    private mdifficultly_Internal: mw.TextBlock;
    public get mdifficultly(): mw.TextBlock {
        if (!this.mdifficultly_Internal && this.uiWidgetBase) {
            this.mdifficultly_Internal = this.uiWidgetBase.findChildByPath(
                "RootCanvas/Canvas/mdifficultly"
            ) as mw.TextBlock;
        }
        return this.mdifficultly_Internal;
    }
    private mRecommandedLevel_Internal: mw.TextBlock;
    public get mRecommandedLevel(): mw.TextBlock {
        if (!this.mRecommandedLevel_Internal && this.uiWidgetBase) {
            this.mRecommandedLevel_Internal = this.uiWidgetBase.findChildByPath(
                "RootCanvas/Canvas/mRecommandedLevel"
            ) as mw.TextBlock;
        }
        return this.mRecommandedLevel_Internal;
    }

    protected onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    protected initButtons() {
        //按钮添加点击

        this.mDifficulty.onClicked.add(() => {
            SoundUtil.PlaySoundById(2012);
            Event.dispatchToLocal("PlayButtonClick", "mDifficulty");
        });
        this.initLanguage(this.mDifficulty);
        this.mDifficulty.touchMethod = mw.ButtonTouchMethod.PreciseTap;

        //按钮添加点击

        //按钮多语言

        //文本多语言

        this.initLanguage(this.mdifficultly);

        this.initLanguage(this.mRecommandedLevel);

        //文本多语言
    }
    private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    protected onShow(...params: any[]): void {}

    public show(...param): void {
        UIService.showUI(this, this.layer, ...param);
    }

    public hide(): void {
        UIService.hideUI(this);
    }
}
