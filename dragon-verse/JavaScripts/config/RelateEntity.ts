import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","originPainting","isSubjective"],["","","",""],[1,"Me",null,true],[2,"CharacterName0001",null,false],[3,"CharacterName0002",null,false],[4,"CharacterName0003",null,false],[5,"CharacterName0004",null,false],[6,"CharacterName0005",null,false],[7,"CharacterName0006",null,false],[8,"CharacterName0008",null,false],[9,"CharacterName0007",null,false],[10,"CharacterName0009",null,false],[11,"CharacterName0010",null,false],[12,"CharacterName0011",null,false],[13,"CharacterName0012",null,false],[14,"CharacterName0013",null,false],[15,null,null,null]];
export interface IRelateEntityElement extends IElementBase{
 	/**ID*/
	id:number
	/**名称*/
	name:string
	/**立绘*/
	originPainting:string
	/**是否主体*/
	isSubjective:boolean
 } 
export class RelateEntityConfig extends ConfigBase<IRelateEntityElement>{
	constructor(){
		super(EXCELDATA);
	}

}