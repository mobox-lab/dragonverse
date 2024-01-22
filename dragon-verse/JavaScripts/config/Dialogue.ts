import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","subIds","content","funcId","Icon"],["","","","",""],[1,[2,3],"Test1000001",0,null],[2,null,"Test1_100000001",0,null],[3,null,"Test1_200000002",0,null]];
export interface IDialogueElement extends IElementBase{
 	/**ID*/
	id:number
	/**子节点 ID*/
	subIds:Array<number>
	/**内容*/
	content:string
	/**对话节点功能 ID*/
	funcId:number
	/**图标*/
	Icon:string
 } 
export class DialogueConfig extends ConfigBase<IDialogueElement>{
	constructor(){
		super(EXCELDATA);
	}

}