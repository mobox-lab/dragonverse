import Log4Ts from "../../depend/log4ts/Log4Ts";
import CodeVerifyPanel from "../auth/CodeVerifyPanel";

/**
 * 对话节点功能 enum.
 */
export enum DialogueFuncTypes {
    /**
     * 空置.
     */
    Null,
    /**
     * 测试节点功能.
     */
    TestFunc,
    /**
     * 显示 Code 验证面板.
     */
    ShowCodePanel
}

export type DialogueFunc = () => void;

export function DialogueFuncFactory(type: DialogueFuncTypes): DialogueFunc {
    switch (type) {
        case DialogueFuncTypes.TestFunc:
            return testFunc;
        case DialogueFuncTypes.ShowCodePanel:
            return showCodePanel;
        case DialogueFuncTypes.Null:
        default:
            return normalDialogueFunc;
    }
}

export function normalDialogueFunc() {
    Log4Ts.log(normalDialogueFunc, `called.`);
}

export function testFunc() {
    Log4Ts.log(testFunc, `called.`);
}

export function showCodePanel() {
    UIService.show(CodeVerifyPanel);
}