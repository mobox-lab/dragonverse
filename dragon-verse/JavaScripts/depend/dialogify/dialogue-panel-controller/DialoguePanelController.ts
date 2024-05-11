import ADialoguePanelController from "./ADialoguePanelController";
import ADialogifyConfigReader, {
    IDialogueContentNodeConfigElement,
    IDialogueInteractNodeConfigElement,
    IRelateEntityConfigElement,
} from "../dialogify-config-reader/ADialogifyConfigReader";
import DialoguePanel_Generate from "../../../ui-generate/dialogue/DialoguePanel_generate";
import InteractionNode from "../../../ui/dialogue/InteractionNode";
import KeyOperationManager from "../../../controller/key-operation-manager/KeyOperationManager";

export default class DialoguePanelController extends ADialoguePanelController<
    DialoguePanel_Generate,
    InteractionNode,
    IRelateEntityConfigElement,
    IDialogueContentNodeConfigElement,
    IDialogueInteractNodeConfigElement,
    ADialogifyConfigReader<
        IRelateEntityConfigElement,
        IDialogueContentNodeConfigElement,
        IDialogueInteractNodeConfigElement
    >
> {
    public constructor() {
        super();
        this.registerPanel(UIService.create(DialoguePanel_Generate));

        KeyOperationManager.getInstance().onKeyDown(
            this._panel,
            mw.Keys.Enter,
            () => this._panel.btnNext.onClicked.broadcast(),
        );
    }

    protected get interactorItemConstructor(): new () => InteractionNode {
        return InteractionNode;
    }
}
