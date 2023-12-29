import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","contentNodeId","content","funcId","icon"],["","","","",""],[1,3,"CharacterInteract0001",1,null],[2,0,"Exit",0,null],[3,7,"Dialogue0006",2,null],[4,8,"Dialogue0007",0,null],[5,0,"CharacterInteract0002",5,null],[6,11,"CharacterInteract0001",1,null],[7,27,"CharacterInteract0001",1,null],[8,43,"CharacterInteract0001",1,null],[9,50,"CharacterInteract0001",1,null],[10,59,"CharacterInteract0001",1,null],[11,68,"CharacterInteract0001",1,null],[12,75,"CharacterInteract0001",1,null],[13,83,"Dialogue0081",1,null],[14,85,"Dialogue0083",1,null],[15,88,"Dialogue0086",1,null],[16,90,"Dialogue0088",1,null],[17,93,"Dialogue0091",1,null],[18,95,"Dialogue0093",1,null],[19,98,"Dialogue0096",1,null],[20,100,"Dialogue0098",1,null]];
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