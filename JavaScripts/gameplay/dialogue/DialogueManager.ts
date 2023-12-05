import { Singleton } from "../../depend/singleton/Singleton";
import { GameConfig } from "../../config/GameConfig";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import Enumerable from "linq";
import DialoguePanel from "../../ui/dialogue/DialoguePanel";
import { EventDefine } from "../../const/EventDefine";
import { IDialogueContentNodeElement } from "../../config/DialogueContentNode";
import GToolkit from "../../util/GToolkit";
import DialogueEventArgs from "./DialogueEventArgs";

export default class DialogueManager extends Singleton<DialogueManager>() {
//#region Member
    private _dialoguePanel: DialoguePanel;

    private _lockView: boolean = false;

    private _isDialoguing: boolean = false;

    /**
     * 是否 正在对话.
     */
    public get isDialoguing() {
        return this._isDialoguing;
    }

    private get dialoguePanel() {
        if (!this._dialoguePanel) this._dialoguePanel = UIService.getUI(DialoguePanel);

        return this._dialoguePanel;
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Singleton

    protected onConstruct(): void {
        super.onConstruct();

        Event.addLocalListener(EventDefine.EnterDialogue, this.onPlayerEnterDialogue);
        Event.addLocalListener(EventDefine.LeaveDialogue, this.onPlayerLeaveDialogue);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    /**
     * 交谈.
     * @param config
     * @param greet 是否锁定视角.
     *      - true 不锁定视角.
     *      - false default 锁定视角.
     */
    public chat(config: number | IDialogueContentNodeElement, greet: boolean = false) {
        if (typeof config === "number") config = GameConfig.DialogueContentNode.getElement(config);
        if (!config) {
            Log4Ts.error(DialogueManager, `config null. id: ${config}`);
            return;
        }

        this.dialoguePanel.refresh(config);
        UIService.showUI(this.dialoguePanel);

        if (!greet) this.lockViewAngle();
    }

    /**
     * 退出对话.
     */
    public exit(id: number = undefined) {
        this._dialoguePanel.shutDown(id);
        this.releaseViewAngle();
    }

    /**
     * 锁定视角.
     */
    private lockViewAngle() {
        if (this._lockView) return;
        this._lockView = true;

//#region Exist for Test
        Log4Ts.log(DialogueManager, `try lock view angle`);
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    /**
     * 释放视角.
     */
    private releaseViewAngle() {
        if (!this._lockView) return;
        this._lockView = false;

//#region Exist for Test
        Log4Ts.log(DialogueManager, `try release view angle`);
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    private onPlayerEnterDialogue = (args: DialogueEventArgs) => {
        this.chat(args.config);
    };

    private onPlayerLeaveDialogue = (args: DialogueEventArgs) => {
        if (!args) {
            this.exit();
            return;
        }
        const id = typeof args.config === "number" ? args.config : args.config.id ?? undefined;
        this.exit(id);
    };
}

export function isDialogueContentNodeHasNextId(config: IDialogueContentNodeElement | number): boolean {
    if (typeof config === "number") config = GameConfig.DialogueContentNode.getElement(config);

    return !(GToolkit.isNullOrUndefined(config.nextId) || config.nextId === 0);
}

/**
 * 有效的对话节点 Id.
 * @param id
 */
export function validDialogueContentNodeId(id: number): boolean {
    return !(GToolkit.isNullOrUndefined(id) || id === 0);
}