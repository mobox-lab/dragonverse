import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA: Array<Array<any>> = [["id", "nextId", "content", "sourceId", "interactNodeIds"], ["", "", "", "", ""], [1, 2, "Test1000001", 0, null], [2, 3, "Dialogue0001", 1, [1, 2, 5]], [3, 4, "Dialogue0002", 0, null], [4, 5, "Dialogue0003", 0, null], [5, 6, "Dialogue0004", 0, null], [6, 0, "Dialogue0005", 0, [3, 4]], [7, 0, "Dialogue0006", 0, null], [8, 0, "Dialogue0007", 0, null], [9, 0, "Dialogue0008", 0, [2]]];
export interface IDialogueContentNodeElement extends IElementBase {
	/**ID*/
	id: number
	/**下条内容 ID*/
	nextId: number
	/**内容*/
	content: string
	/**来源角色 ID*/
	sourceId: number
	/**对话交互节点列表 IDs*/
	interactNodeIds: Array<number>
}
export class DialogueContentNodeConfig extends ConfigBase<IDialogueContentNodeElement>{
	constructor() {
		super(EXCELDATA);
	}

}