import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","contentNodeId","content","content_str","funcId","icon"],["","","","","",""],[1,2,"CharacterInteract0001",null,1,"324347"],[2,0,"Exit",null,0,"324358"],[3,7,"Dialogue0006",null,2,"324347"],[4,8,"Dialogue0007",null,0,"324347"],[5,0,"CharacterInteract0002",null,5,"324347"],[6,11,"CharacterInteract0001",null,1,"324347"],[7,27,"CharacterInteract0001",null,1,"324347"],[8,43,"CharacterInteract0001",null,1,"324347"],[9,50,"CharacterInteract0001",null,1,"324347"],[10,59,"CharacterInteract0001",null,1,"324347"],[11,68,"CharacterInteract0001",null,1,"324347"],[12,75,"CharacterInteract0001",null,1,"324347"],[13,83,"Dialogue0081",null,1,"324347"],[14,85,"Dialogue0083",null,1,"324347"],[15,88,"Dialogue0086",null,1,"324347"],[16,90,"Dialogue0088",null,1,"324347"],[17,93,"Dialogue0091",null,1,"324347"],[18,95,"Dialogue0093",null,1,"324347"],[19,98,"Dialogue0096",null,1,"324347"],[20,100,"Dialogue0098",null,1,"324347"],[21,103,"Dialogue0101",null,1,"324347"],[22,109,"Dialogue0107",null,1,"324347"],[23,105,"Dialogue0103",null,1,"324347"],[24,107,"Dialogue0105",null,1,"324347"],[25,112,"Dialogue0110",null,1,"324347"],[26,120,"Dialogue0118",null,1,"324347"],[27,114,"Dialogue0112",null,1,"324347"],[28,116,"Dialogue0114",null,1,"324347"],[29,118,"Dialogue0116",null,1,"324347"],[30,123,"Dialogue0121",null,1,"324347"],[31,125,"Dialogue0123",null,1,"324347"],[32,128,"Dialogue0126",null,1,"324347"],[33,2,"CharacterInteract0001",null,1,"324347"],[34,101,"CharacterInteract0001",null,1,"324347"],[35,110,"CharacterInteract0001",null,1,"324347"],[36,121,"CharacterInteract0001",null,1,"324347"],[37,81,"CharacterInteract0001",null,1,"324347"],[38,86,"CharacterInteract0001",null,1,"324347"],[39,96,"CharacterInteract0001",null,1,"324347"],[40,91,"CharacterInteract0001",null,1,"324347"],[41,126,"CharacterInteract0001",null,1,"324347"]];
export interface IDialogueInteractNodeElement extends IElementBase{
 	/**ID*/
	id:number
	/**对话内容节点 ID*/
	contentNodeId:number
	/**内容*/
	content:string
	/**VIEW_ONLY 不要更改或使用此列*/
	content_str:string
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