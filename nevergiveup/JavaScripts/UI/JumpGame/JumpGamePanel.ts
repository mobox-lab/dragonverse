import GToolkit from "gtoolkit";
import { JumpRoomModuleC } from "../../Modules/JumpRoom/JumpRoomModule";
import JumpGamePanel_Generate from "../../ui-generate/jumpGame/JumpGamePanel_generate";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";

export class JumpGamePanel extends JumpGamePanel_Generate {
    public isShowing: boolean = false;

    onStart() {
        this.jumpButtonVerify.onClicked.add(() => {
            if (!GToolkit.isNullOrEmpty(this.roomIdInputBox.text)) {
                ModuleService.getModule(JumpRoomModuleC).jumpRoom(this.roomIdInputBox.text);
            }
        });
        this.codeButtonClose.onClicked.add(() => {
            UIService.hide(JumpGamePanel);
        });
    }

    onShow() {
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            UIService.hide(JumpGamePanel);
        });
        this.isShowing = true;
    }

    onHide() {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
        this.isShowing = false;
    }
}