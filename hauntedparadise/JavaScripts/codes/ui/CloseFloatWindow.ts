import CloseFloatUI_Generate from "../../ui-generate/ShareUI/common/CloseFloatUI_generate";
import UIShop from "../modules/store/ui/UIShop";
import { UIPrizeTips } from "../modules/treasure/ui/UIPrizeTips";



export class CloseFloatWindow extends CloseFloatUI_Generate {
    onStart() {
        this.btn_close.onClicked.add(() => {
            UIService.hide(CloseFloatWindow);
            UIService.hide(UIPrizeTips);
            UIService.getUI(UIShop).closeGiftTips()
        })
    }
}