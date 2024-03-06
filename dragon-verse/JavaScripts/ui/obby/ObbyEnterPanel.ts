/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-03-05 18:09:34
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-06 14:01:03
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\ui\obby\ObbyEnterPanel.ts
 * @Description  : 进入Obby确认Panel
 */
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import doubleconfirm_Generate from "../../ui-generate/subgame/doubleconfirm_generate";
import ObbyEnterFailPanel from "./ObbyEnterFailPanel";

export default class ObbyEnterPanel extends doubleconfirm_Generate {

    public isShowing: boolean = false;
    onStart() {
        this.codeButtonClose.onClicked.add(() => {
            UIService.hide(ObbyEnterPanel);
        });
        this.codeButtonNo.onClicked.add(() => {
            UIService.hide(ObbyEnterPanel);
        })
        this.codeButtonYes.onClicked.add(() => this.onClickYesCallBack());
    }

    public onClickYesCallBack: () => {};

    onShow() {
        KeyOperationManager.getInstance().onKeyUp(Keys.Escape, this, () => {
            UIService.hide(ObbyEnterPanel);
        })
        this.isShowing = true;
    }
    onHide() {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
        this.isShowing = false;
    }

}