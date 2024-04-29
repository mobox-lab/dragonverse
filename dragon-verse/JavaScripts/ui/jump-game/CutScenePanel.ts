/**
 * AUTHOR: 泪染倾城（找闺）
 * TIME: 2023.08.30-13.42.55
 */

import CutSceneUI_Generate from "../../ui-generate/jumpGame/CutSceneUI_generate";

/**
 * 开始传送时，黑幕遮挡住的UI
 */
export default class CutScenePanel extends CutSceneUI_Generate {
    /** 展示动画的tween */
    private _showTween;
    /** 回调，外部可指定 */
    private _callback: () => void;
    /** 打开的动画tween */
    private _openTween: mw.Tween<{ percent: number }>;

    private _tempVector2: Vector2 = Vector2.zero;

    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    protected onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerSystem;

        this.showCanvas.renderScale = this._tempVector2.set(1, 1);
        this.maskImg.renderOpacity = 0;
        this._openTween = new mw.Tween({ percent: 0.03 })
            .to({ percent: 1 }, 0.8 * 1000)
            .delay(0.5 * 1000)
            .onUpdate((obj) => {
                this.showCanvas.renderScale = this._tempVector2.set(obj.percent, obj.percent);
            })
            .easing(TweenUtil.Easing.Quintic.In)
            .onComplete(() => {
                mw.UIService.hideUI(this);
            })
            .onStart(() => {
                this.maskImg.renderOpacity = 0;
            });
        this._showTween = new mw.Tween({ percent: 1 })
            .to({ percent: 0.01 }, 0.9 * 1000)
            .onUpdate((obj) => {
                this.showCanvas.renderScale = this._tempVector2.set(obj.percent, obj.percent);
            })
            .easing(TweenUtil.Easing.Quintic.Out)
            .onComplete(async () => {
                this._callback && (await this._callback());
                this._openTween.start();
            })
            .onStart(() => {
                setTimeout(() => {
                    this.maskImg.renderOpacity = 1;
                }, 0.6 * 1000);
            });
    }

    /**
     * 设置显示时触发
     * @param callback 回调
     */
    protected onShow(callback?: () => void) {
        this._callback = callback;
        this._showTween.start();
    }
}
