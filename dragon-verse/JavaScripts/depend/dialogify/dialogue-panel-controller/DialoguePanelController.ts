import ADialoguePanelController from "./ADialoguePanelController";
import ADialogifyConfigReader, {
    IDialogueContentNodeConfigElement,
    IDialogueInteractNodeConfigElement,
    IRelateEntityConfigElement,
} from "../dialogify-config-reader/ADialogifyConfigReader";
import DialoguePanel_Generate from "../../../ui-generate/dialogue/DialoguePanel_generate";
import InteractNode_Generate from "../../../ui-generate/dialogue/InteractNode_generate";
import GameServiceConfig from "../../../const/GameServiceConfig";
import KeyOperationManager from "../../../controller/key-operation-manager/KeyOperationManager";
import GToolkit from "../../../util/GToolkit";

export default class DialoguePanelController extends ADialoguePanelController<
    DialoguePanel_Generate,
    InteractNode_Generate,
    IRelateEntityConfigElement,
    IDialogueContentNodeConfigElement,
    IDialogueInteractNodeConfigElement,
    ADialogifyConfigReader<IRelateEntityConfigElement, IDialogueContentNodeConfigElement, IDialogueInteractNodeConfigElement>> {

    public constructor() {
        super();
        this.registerPanel(UIService.create(DialoguePanel_Generate));
    }

    protected get interactorItemConstructor(): new () => InteractNode_Generate {
        return InteractNode_Generate;
    }

    protected showInteractOptions(options: number[]): void {
        for (let i = 0; i < this._panel.cnvOptions.getChildrenCount(); i++) {
            KeyOperationManager.getInstance().unregisterMouse(this._panel.cnvOptions.getChildAt(i));
        }
        KeyOperationManager.getInstance().debug(false);
        this._panel.cnvOptions.removeAllChildren();
        if (GToolkit.isNullOrEmpty(options)) return;

        KeyOperationManager.getInstance().debug(true);
        options.forEach((interactNodeId) => {
            const interactNode = this.configReader.getDialogueInteractNodeConfig(interactNodeId);
            if (!interactNode) return;

            const nodeUi = UIService.create(this.interactorItemConstructor);
            this.initInteractNode(nodeUi, interactNode);
            this._panel.cnvOptions.addChild(nodeUi.uiObject);


            KeyOperationManager.getInstance().onWidgetEntered(nodeUi.uiObject, () => {
                nodeUi.btnMain.normalImageGuid = GameServiceConfig.DIALOGUE_PANEL_OPTION_ON_HOVER_IMG_GUID;
            });

            KeyOperationManager.getInstance().onWidgetLeave(nodeUi.uiObject, () => {
                nodeUi.btnMain.normalImageGuid = GameServiceConfig.DIALOGUE_PANEL_OPTION_NORMAL_IMG_GUID;
            });

        });
    }

    public shutDown(): boolean {

        //会不走showOptions，要在这里清一下
        for (let i = 0; i < this._panel.cnvOptions.getChildrenCount(); i++) {
            KeyOperationManager.getInstance().unregisterMouse(this._panel.cnvOptions.getChildAt(i));
        }

        return super.shutDown();
    }
}