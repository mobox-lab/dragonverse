import CodeVerifyPanel from "../../../ui/auth/CodeVerifyPanel";
import NpcInteractionPanel from "../../../ui/npc-interaction/NpcInteractionPanel";
import Log4Ts from "../../log4ts/Log4Ts";

/**
 * 对话节点功能 enum.
 */
export enum DialogueNodeFuncTypes {
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
    ShowCodePanel,
    /**
     * 交互动作
     */
    Action = 5
}

export type DialogueFunc = () => void;

export function DialogueFuncFactory(type: DialogueNodeFuncTypes): DialogueFunc {
    switch (type) {
        case DialogueNodeFuncTypes.TestFunc:
            return testFunc;
        case DialogueNodeFuncTypes.ShowCodePanel:
            return showCodePanel;
        case DialogueNodeFuncTypes.Action:
            return showActionPanel;
        case DialogueNodeFuncTypes.Null:
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

export function showActionPanel() {
    UIService.show(NpcInteractionPanel);
}