import GameServiceConfig from "../../const/GameServiceConfig";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import InteractNode_Generate from "../../ui-generate/dialogue/InteractNode_generate";

export default class InteractionNode extends InteractNode_Generate {
    onStart(): void {
        super.onStart();
        KeyOperationManager.getInstance().onWidgetEnter(this.uiObject, () => {
            this.btnMain.normalImageGuid = GameServiceConfig.DIALOGUE_PANEL_OPTION_ON_HOVER_IMG_GUID;
        });

        KeyOperationManager.getInstance().onWidgetLeave(this.uiObject, () => {
            this.btnMain.normalImageGuid = GameServiceConfig.DIALOGUE_PANEL_OPTION_NORMAL_IMG_GUID;
        });
    }

    onDestroy(): void {
        KeyOperationManager.getInstance().unregisterMouse(this.uiObject);
        console.log("destroy");
    }
}
