import { ZwtTween } from "../../ZwtTween";
import LastWave_Generate from "../../ui-generate/Tips/LastWave_generate";

/** 
 * @Author       : xiaohao.li
 * @Date         : 2024-01-02 18:25:27
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-04 18:51:23
 * @FilePath     : \nevergiveup\JavaScripts\UI\Tips\LastWaveTipsUI.ts
 * @Description  : 修改描述
 */


export class LastWaveTipsUI extends LastWave_Generate {
    protected _tween: ZwtTween;
    onShow(message: string, size: number, cb = () => { }) {
        // 最后一波
        // 强力的怪物正在接近...
        this.uiObject.renderOpacity = 0;
        this.uiObject.renderScale = new Vector2(3);
        this.txt_hint.fontSize = size;
        this.txt_hint.text = message;
        if (this._tween) {
            this._tween.clear();
            this._tween = null;
        }

        // pvz style last wave tips
        this._tween = new ZwtTween(this.uiObject)
            .UIOpacityTo(1, 0.3, mw.TweenUtil.Easing.Linear.None, true)
            .scaleTo(new Vector2(1), 0.5, false, mw.TweenUtil.Easing.Back.Out, true)
            .delay(2)
            .call(() => {
                cb();
            })
            .start();
    }
}