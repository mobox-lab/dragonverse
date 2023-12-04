import { Singleton } from "../../depend/singleton/Singleton";
import { GameConfig } from "../../config/GameConfig";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import Enumerable from "linq";
import DialoguePanel from "../../ui/dialogue/DialoguePanel";
import { EventDefine } from "../../const/EventDefine";

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

        Event.addLocalListener(EventDefine.PlayerEnterDialogue, this.onPlayerEnterDialogue);
        Event.addLocalListener(EventDefine.PlayerEnterDialogue, this.onPlayerLeaveDialogue);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    /**
     * 招呼.
     * 显示对话框. 但不锁定视角. 直到调用 {@link lockViewAngle}.
     * @param nodeId
     */
    public greet(nodeId: number) {
        const config = GameConfig.DialogueContentNode.getElement(nodeId);
        if (!config) {
            Log4Ts.error(DialogueManager, `config invalid. id: ${nodeId}`);
            return;
        }

        this.dialoguePanel.refresh(config);
        UIService.showUI(this.dialoguePanel);
    }

    /**
     * 锁定视角.
     * //TODO_LviatYi 锁定视角. 可能移至开始对话时机.
     */
    private lockViewAngle() {
        if (this._lockView) return;

//#region Exist for Test
        Log4Ts.log(DialogueManager, `try lock view angle`);
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    /**
     * 释放视角.
     * //TODO_LviatYi 释放视角. 可能移至结束对话时机.
     */
    private releaseViewAngle() {
        if (!this._lockView) return;

//#region Exist for Test
        Log4Ts.log(DialogueManager, `try release view angle`);
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    private onPlayerEnterDialogue = () => {
        if (this._isDialoguing) return;
        this.lockViewAngle();
    };

    private onPlayerLeaveDialogue = () => {
        if (!this._isDialoguing) return;
        this.releaseViewAngle();
    };
}