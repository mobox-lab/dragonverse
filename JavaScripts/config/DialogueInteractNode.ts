import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","contentNodeId","content","funcId","icon"],["","","","",""],[1,3,"CharacterInteract0001",1,null],[2,0,"Exit",0,null],[3,7,"Dialogue0006",2,null],[4,8,"Dialogue0007",0,null],[5,0,"CharacterInteract0002",5,null],[6,11,"CharacterInteract0001",1,null],[7,27,"CharacterInteract0001",1,null],[8,43,"CharacterInteract0001",1,null],[9,50,"CharacterInteract0001",1,null],[10,59,"CharacterInteract0001",1,null],[11,68,"CharacterInteract0001",1,null],[12,75,"CharacterInteract0001",1,null]];
export interface IDialogueInteractNodeElement extends IElementBase{
 	/**ID*/
	id:number
	/**对话内容节点 ID*/
	contentNodeId:number
	/**内容*/
	content:string
	/**对话节点功能 ID*/
	funcId:number
	/**图标*/
	icon:string
 } 
export class DialogueInteractNodeConfig extends ConfigBase<IDialogueInteractNodeElement>{
	constructor(){
		super(EXCELDATA);
	}

}