import Log4Ts from "../../depend/log4ts/Log4Ts";

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
    TestFunc
}

export type DialogueFunc = () => void;

export function DialogueFuncFactory(type: DialogueFuncTypes): DialogueFunc {
    switch (type) {
        case DialogueFuncTypes.TestFunc:
            return testFunc;
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