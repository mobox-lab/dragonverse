import { GameConfig } from "../../../config/GameConfig";
import { AuthModuleC } from "../../../module/auth/AuthModule";
import Log4Ts from "../../log4ts/Log4Ts";
import { DialogueNodeFuncTypes } from "../dialogue-node-func-type/DialogueFuncTypes";

/**
 * 对话交互构建器 enum.
 */
export enum InteractGeneratorTypes {
    /**
     * 空置.
     */
    Null,
    /**
     * 测试交互构建器.
     */
    TestFunc = 127,
    /**
     * 过code验证不显示对话
     */
    codeTest = 1,
}

/**
 * 对话交互构建器.
 * @param contentNodeId 对话内容节点 id.
 * @return number[] 对话内容节点.
 *
 */
export type InteractGenerator = (contentNodeId: number) => number[];

export default function InteractGeneratorFactory(type: InteractGeneratorTypes): InteractGenerator {
    switch (type) {
        case InteractGeneratorTypes.TestFunc:
            return testFunc;
        case InteractGeneratorTypes.codeTest:
            return codeTest;
        case InteractGeneratorTypes.Null:

        default:
            return normalDialogueFunc;
    }
}

export function normalDialogueFunc(contentNodeId: number): number[] {
    return [];
}

export function testFunc() {
    Log4Ts.log({ name: "DialogueFuncTypes" }, `test called.`);
    return [127];
}

export function codeTest(contentNodeId: number): number[] {
    let res = true;
    let config = GameConfig.DialogueContentNode.getElement(contentNodeId);

    if (res) {
        let nodes = Array.from(config.interactNodeIds);
        nodes.splice(nodes.indexOf(1), 1);
        return nodes;
    }
    return config.interactNodeIds;
}


