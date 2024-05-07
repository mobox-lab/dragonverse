import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","name_trs","originPainting","isSubjective"],["","","","",""],[1,"Me",null,null,true],[2,"CharacterName0001",null,null,false],[3,"CharacterName0002",null,null,false],[4,"CharacterName0003",null,null,false],[5,"CharacterName0004",null,null,false],[6,"CharacterName0005",null,null,false],[7,"CharacterName0006",null,null,false],[8,"CharacterName0008",null,null,false],[9,"CharacterName0007",null,null,false],[10,"CharacterName0009",null,null,false],[11,"CharacterName0010",null,null,false],[12,"CharacterName0011",null,null,false],[13,"CharacterName0012",null,null,false],[14,"CharacterName0013",null,null,false],[127,"TestMe",null,null,true],[128,"TestOther",null,null,false]];
export interface IRelateEntityElement extends IElementBase{
 	/**ID*/
	id:number
	/**名称*/
	name:string
	/**VIEW_ONLY 不要更改或使用此列*/
	name_trs:string
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