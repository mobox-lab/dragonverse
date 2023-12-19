import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","nextId","content","sourceId","interactNodeIds"],["","","","",""],[1,2,"1",0,null],[2,3,"Dialogue0001",2,[1,2,5]],[3,4,"Dialogue0002",1,null],[4,5,"Dialogue0003",2,null],[5,6,"Dialogue0004",1,null],[6,0,"Dialogue0005",2,[3,4]],[7,0,"Dialogue0006",1,null],[8,0,"Dialogue0007",1,null],[9,0,"Dialogue0008",2,[2]]];
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