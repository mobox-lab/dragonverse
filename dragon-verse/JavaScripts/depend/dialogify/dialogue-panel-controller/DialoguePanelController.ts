import ADialoguePanelController from "./ADialoguePanelController";
import ADialogifyConfigReader, {
    IDialogueContentNodeConfigElement,
    IDialogueInteractNodeConfigElement,
    IRelateEntityConfigElement,
} from "../dialogify-config-reader/ADialogifyConfigReader";
import DialoguePanel_Generate from "../../../ui-generate/dialogue/DialoguePanel_generate";
import InteractionNode from "../../../ui/dialogue/InteractionNode";

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
    }

    protected get interactorItemConstructor(): new () => InteractionNode {
        return InteractionNode;
    }
}
