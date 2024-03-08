import { CSTimePointUI_Generate } from "../generate/item/CSTimePointUI_generate";

/**
 * 时间刻度类型枚举
 */
export enum UITimePointState {
    Default,
    Long
}

/**
 * 计时条时间刻度UI
 */
export class UITimePoint extends CSTimePointUI_Generate {

    /** 默认大小 */
    private _defSize: mw.Vector2;

    /** 
     * UI初始化时调用，记录默认大小
     */
    protected onStart() {
        this._defSize = this.uiObject.size;
    }

    /** 
     * 设置状态
     * @param pos 位置
     * @param state 状态
     */
    public setData(pos: mw.Vector2, state: UITimePointState) {
        this.uiObject.position = pos;
        switch (state) {
            case UITimePointState.Default:
                this.uiObject.size = this._defSize.clone();
                this.mImgLine.size = this._defSize.clone();
                break;
            case UITimePointState.Long:
                this.uiObject.size = new mw.Vector2(this._defSize.x, this._defSize.y * 2);
                this.mImgLine.size = new mw.Vector2(this._defSize.x, this._defSize.y * 2);
                break;
        }
    }

}
