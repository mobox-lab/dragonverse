import { Singleton } from "../../depend/singleton/Singleton";
import { GameConfig } from "../../config/GameConfig";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import Enumerable from "linq";

export default class DialogueManager extends Singleton<DialogueManager>() {
    /**
     * 获取所有子节点.
     * 当不存在任何子节点时 返回空数组.
     * @param nodeId
     */
    public nextNodes(nodeId: number) {
        const currNode = GameConfig.Dialogue.getElement(nodeId);
        if (!currNode) {
            Log4Ts.log(DialogueManager,
                `currNode is null`,
                `node id: ${nodeId}`);
            return [];
        }

        return Enumerable
            .from(currNode.subIds)
            .select(id => GameConfig.Dialogue.getElement(id))
            .where(item => item !== null && item !== undefined)
            .toArray();
    }
}