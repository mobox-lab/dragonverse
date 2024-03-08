import { FrameType } from "../../model/FrameType";
import { GridSelectContainerItem } from "../../utils/UIPool";
import { CSKeyFrameUI_Generate } from "../generate/item/CSKeyFrameUI_generate";

/**
 * 计时条关键帧UI
 */
export class UIKeyFrame extends CSKeyFrameUI_Generate implements GridSelectContainerItem {

    /** 选中时回调 */
    onSelect: Action;
    /** 是否选中 */
    isSelected: boolean;

    /** 保有当前在动画中的位置索引 */
    public index: number;

    /** 
     * UI初始化时调用，初始化相关变量
     */
    protected override onAwake(): void {
        super.onAwake();
        this.onSelect = new Action();
        this.mBtn.onClicked.add(() => {
            this.onSelect.call();
        })
    }

    /** 
     * 设置状态
     * @param pos 位置
     * @param index 索引
     * @param type 类型
     */
    public setData(pos: mw.Vector2, index: number, type: FrameType = FrameType.Camera) {
        this.uiObject.position = pos;
        this.index = index;

        const color = colors.get(type);
        this.mBtn.normalImageColor = LinearColor.colorHexToLinearColor(color.normal);
        this.mBtn.pressedImageColor = LinearColor.colorHexToLinearColor(color.pressed);
        this.mBtn.disableImageColor = LinearColor.colorHexToLinearColor(color.disable);
    }

    /** 
     * 设置选中状态
     * @param isTrue 是否选中
     */
    public setSelected(isTrue: boolean) {
        if (isTrue) {
            this.mImgSelect.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        } else {
            this.mImgSelect.visibility = mw.SlateVisibility.Hidden;
        }
    }

}

const colors: Map<FrameType, { normal: string, pressed: string, disable: string }> = new Map([
    [FrameType.Camera, { normal: "#00ff79", pressed: "#00cc60", disable: "#007f3b" }],
    [FrameType.Events, { normal: "#ff9a2f", pressed: "#ea812c", disable: "#9e571e" }],
    [FrameType.UpdateEvents, { normal: "#05c6ff", pressed: "#049ecc", disable: "#02627e" }],
]);
