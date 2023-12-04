import DialoguePanel_Generate from "../../ui-generate/dialogue/DialoguePanel_generate";
import { IDialogueContentNodeElement } from "../../config/DialogueContentNode";
import GToolkit from "../../util/GToolkit";
import Waterween from "../../depend/waterween/Waterween";
import { AdvancedTweenTask } from "../../depend/waterween/tweenTask/AdvancedTweenTask";
import DialogueContext = UE.DialogueContext;
import { GameConfig } from "../../config/GameConfig";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import InteractNodePanel from "./InteractNodePanel";
import GameServiceConfig from "../../const/GameServiceConfig";

export default class DialoguePanel extends DialoguePanel_Generate {
//#region Member
    private _nextArrowJumpTask: AdvancedTweenTask<unknown>;

    public nextArrowShown: boolean = true;
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region MetaWorld UI Event

    protected onAwake(): void {
        super.onAwake();
        this.canUpdate = true;

//#region Member init
        this._nextArrowJumpTask =
            Waterween
                .to(() => {
                        return {posY: this.imgNext.position.y, opacity: this.imgNext.renderOpacity};
                    },
                    (val) => {
                        this.imgNext.position = new mw.Vector2(this.imgNext.position.x, val.posY);
                        this.imgNext.renderOpacity = val.opacity;
                    },
                    {posY: 265, opacity: 0},
                    0.5,
                    {posY: 240, opacity: 1})
                .repeat(true)
                .restart(true);
//#endregion ------------------------------------------------------------------------------------------

//#region Widget bind
//#endregion ------------------------------------------------------------------------------------------

//#region Event subscribe
//#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate() {
    }

    protected onShow() {
    }

    protected onHide() {
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Init
    /**
     * 绘制节点.
     * @param config
     */
    public refresh(config: IDialogueContentNodeElement) {
        if (!config) {
            Log4Ts.error(DialoguePanel, `config is null.`);
            this.shutDown();
            return;
        }

        const content = config.content;
        if (GToolkit.isNullOrEmpty(content) &&
            hasNextId(config)) {
            Log4Ts.error(DialoguePanel, `配置了一行无意义的 DialogueContentNode. id: ${config.id}`);
            this.shutDown();
            return;
        }

        this.btnDialogueContent.onClicked.clear();
        const options = config.interactNodeIds ?? [];
        if (options.length > GameServiceConfig.CNV_OPTIONS_MAX_CAPACITY) {
            Log4Ts.error(DialoguePanel, `count of options exceeds the recommended capacity.`,
                `id: ${config.id}`,
                `count: ${options.length}`,
                `recommended capacity: ${GameServiceConfig.CNV_OPTIONS_MAX_CAPACITY}`);
            options.length = GameServiceConfig.CNV_OPTIONS_MAX_CAPACITY;
        }
        this.showInteractOptions(options);
        if (hasNextId(config)) {
            this.btnDialogueContent.onClicked.add(
                () => this.refresh(GameConfig.DialogueContentNode.getElement(config.nextId)),
            );
        } else if (GToolkit.isNullOrEmpty(options)) {
            this.btnDialogueContent.onClicked.add(() => this.shutDown());
        }

        if (GToolkit.isNullOrEmpty(content)) {
            GToolkit.trySetVisibility(this.cnvContentNode, false);
        } else {
            GToolkit.trySetVisibility(this.cnvContentNode, true);
            this.txtSourceName.text = config.sourceId.toString();
            this.txtContent.text = content;
            this.showNextArrow(hasNextId(config));
        }
    }

    public shutDown() {
        UIService.hide(DialoguePanel);
    }

    /**
     * 显隐 「下一个」 提示箭头.
     * @param shown 是否显示.
     * @private
     */
    private showNextArrow(shown: boolean) {
        if (shown === this.nextArrowShown) return;
        this.nextArrowShown = shown;
        if (this.nextArrowShown) {
            this._nextArrowJumpTask.restart();
        } else {
            this._nextArrowJumpTask.fastForwardToEnd().pause();
        }
        GToolkit.trySetVisibility(this.imgNext, shown);
    }

    /**
     * 显隐 交互选项.
     * @param options
     * @private
     */
    private showInteractOptions(options: number[]) {
        this.cnvOptions.removeAllChildren();
        if (GToolkit.isNullOrEmpty(options)) return;

        options.forEach((interactNodeId) => {
            const node = GameConfig.DialogueInteractNode.getElement(interactNodeId);
            if (!node) return;

            this.cnvOptions.addChild(UIService
                .create(InteractNodePanel)
                .init(node)
                .uiObject,
            );
        });
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region UI Behavior
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Event Callback
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export function hasNextId(config: IDialogueContentNodeElement | number): boolean {
    if (typeof config === "number") config = GameConfig.DialogueContentNode.getElement(config);

    return !(GToolkit.isNullOrUndefined(config.nextId) || config.nextId === 0);
}