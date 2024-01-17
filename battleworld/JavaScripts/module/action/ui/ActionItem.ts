import { IActionElement } from "../../../config/Action";
import ActionItem_Generate from "../../../ui-generate/action/ActionItem_generate";
 
export class ActionItem extends ActionItem_Generate {

    // 配置数据
    public data: IActionElement;
    // 按钮事件
    public onClick: Action1<ActionItem> = new Action1<ActionItem>();

    onStart() {
        this.mBtn.onClicked.add(() => {
            if (this.data != null) {
                this.onClick.call(this);
            }
        });
    }

    public setData(data: IActionElement) {
        this.data = data;
        this.mNametxt.text = data.name;
        this.mBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
    }
}