/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-03-01 11:30:29
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-05-13 13:34:08
 * @FilePath     : \DragonVerse\battleworld\JavaScripts\ui\jump-game\JumpGamePanel.ts
 * @Description  : 跳房间界面
 */

import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import { MouseLockController } from "../../controller/MouseLockController";
import { JumpRoomModuleC } from "../../module/jump-room/JumpRoomModule";
import JumpGamePanel_Generate from "../../ui-generate/jumpGame/JumpGamePanel_generate";
import GToolkit from "../../util/GToolkit";

export class JumpGamePanel extends JumpGamePanel_Generate {
    public isShowing: boolean = false;
    onStart() {
        this.jumpButtonVerify.onClicked.add(() => {
            if (!GToolkit.isNullOrEmpty(this.roomIdInputBox.text)) {
                ModuleService.getModule(JumpRoomModuleC).jumpRoom(this.roomIdInputBox.text);
            }
        })
        this.codeButtonClose.onClicked.add(() => {
            UIService.hide(JumpGamePanel);
        });
    }
    onShow() {
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            UIService.hide(JumpGamePanel);
        });
        MouseLockController.getInstance().needMouseUnlock();
        this.isShowing = true;
    }

    onHide() {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
        MouseLockController.getInstance().cancelMouseUnlock();
        this.isShowing = false;
    }
}