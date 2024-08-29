 import CommonTips_Generate from "../../../ui-generate/Buy/CommonTips_generate";
import CommonTipsManagerUI, { IQueueTipsItemUI } from "./CommonTipsManagerUI";

/**
 * 普通弹出的提示框
 */
export default class P_CommonTips extends CommonTips_Generate implements IQueueTipsItemUI {
    /** 提示内容 */
    content: string;

    /** 淡入动画 */
    private _fadeInTween: mw.Tween<{ alpha: number }>;
    /** 淡出动画 */
    private _fadeOutTween: mw.Tween<{ alpha: number }>;
    /** 移动动画 */
    private _moveTween: mw.Tween<{ y: number }>;
    /** UI的Transform */
    private uiTrans: mw.UITransform = new mw.UITransform(0, 0, 0, 0);

    /**
     * 设置层级为UILayerSystem
     */
    protected onAwake(): void {
        this.layer = mw.UILayerSystem;
    }

    /**
     * 设置提示内容
     * @param content 提示内容
     */
    public setTips(content: string): void {
        if (this.text_Tip) {
            this.text_Tip.text = content;
        }
        this.content = content;
    }

    /**
     * 开始播放动画
     * @param start 开始位置
     * @param end 结束位置
     */
    public startAnim(start: Vector2, end: Vector2): void {
        if (!this.text_Tip) return;
        if (!this._fadeInTween) {
            //淡入淡出动画
            this._fadeOutTween = new mw.Tween<{ alpha: number }>({ alpha: 1 })
                .to({ alpha: 0 })
                .onUpdate(val => {
                    this.img_Bg.renderOpacity = val.alpha;
                    this.text_Tip.renderOpacity = val.alpha;
                })
                .onComplete(val => {
                    setTimeout(() => {
                        mw.UIService.getUI(CommonTipsManagerUI).despawnTips(this);
                    }, 100);
                })
                .duration(200);

            this._fadeInTween = new mw.Tween<{ alpha: number }>({ alpha: 0 })
                .to({ alpha: 1 })
                .onUpdate(val => {
                    this.img_Bg.renderOpacity = val.alpha;
                    this.text_Tip.renderOpacity = val.alpha;
                })
                .onComplete(_ => setTimeout(() => this._fadeOutTween.start(), 700))
                .duration(200);
        }
        if (!this._moveTween) {
            const temp = this.uiObject.transform;
            const mid = mw.getViewportSize().divide(mw.getViewportScale()).x / 2;
            this._moveTween = new mw.Tween<{ y: number }>({ y: start.y })
                .to({ y: end.y })
                .onUpdate(val => {
                    if (!this.uiObject) return;
                    this.uiTrans.position.x = mid - this.text_Tip.size.x / 2;
                    this.uiTrans.position.y = val.y;
                    // this.uiTrans.size.x = temp.size.x;
                    // this.uiTrans.size.y = temp.size.y;
                    this.uiObject.transform = this.uiTrans;
                })
                .duration(1400);
        }

        if (this._fadeInTween.isPlaying()) {
            this._fadeInTween.stop();
        }
        if (this._fadeOutTween.isPlaying()) {
            this._fadeOutTween.stop();
        }
        if (this._moveTween.isPlaying()) {
            this._moveTween.stop();
        }
        this._fadeInTween.start();
        this._moveTween.start();
    }
}