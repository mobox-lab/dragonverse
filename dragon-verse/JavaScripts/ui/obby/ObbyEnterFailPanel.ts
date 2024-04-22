/**
 * @Author       : zewei.zhang
 * @Date         : 2024-03-05 18:09:52
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-06 14:01:40
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\ui\obby\ObbyEnterFailPanel.ts
 * @Description  : obby游戏次数不足Panel
 */

import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import doublecheck_Generate from "../../ui-generate/subgame/doublecheck_generate";

export default class ObbyEnterFailPanel extends doublecheck_Generate {
    public isShowing: boolean = false;

    onStart() {
        this.codeButtonClose.onClicked.add(() => {
            UIService.hide(ObbyEnterFailPanel);
        });

        this.codeButtonYes.onClicked.add(() => {
            UIService.hide(ObbyEnterFailPanel);
        });
    }

    onShow() {
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            UIService.hide(ObbyEnterFailPanel);
        });
        this.isShowing = true;
    }

    onHide() {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
        this.isShowing = false;
    }
}