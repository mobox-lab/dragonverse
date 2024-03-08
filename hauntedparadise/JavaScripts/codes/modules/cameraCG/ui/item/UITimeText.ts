import { CSTimeTextUI_Generate } from "../generate/item/CSTimeTextUI_generate";

/**
 * 计时条时间文本
 */
export class UITimeText extends CSTimeTextUI_Generate {

    /** 
     * 设置状态
     * @param pos 位置
     * @param second 秒数
     */
    public setData(pos: mw.Vector2, second: number) {
        this.uiObject.position = pos;
        const s = second % 60;
        const m = Math.floor(second / 60);
        this.mTextTime.text = `${m}:${(s < 10 ? '0' : '') + s}`;
    }

}
