import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","nextId","content","sourceId","interactNodeIds"],["","","","",""],[1,2,"Test1000001",0,null],[2,0,"Test1_100000001",0,[1,2]],[3,0,"Test1_200000002",0,null]];
export interface IDialogueContentNodeElement extends IElementBase{
 	/**ID*/
	id:number
	/**下条内容 ID*/
	nextId:number
	/**内容*/
	content:string
	/**来源角色 ID*/
	sourceId:number
	/**对话交互节点列表 IDs*/
	interactNodeIds:Array<number>
 } 
export class DialogueContentNodeConfig extends ConfigBase<IDialogueContentNodeElement>{
	constructor(){
		super(EXCELDATA);
	}

}