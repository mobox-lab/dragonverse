import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","characterId","position","greetNodeId"],["","","",""],[1,1,null,1]];
export interface INpcElement extends IElementBase{
 	/**ID*/
	id:number
	/**角色 ID*/
	characterId:number
	/**初始位置*/
	position:mw.Vector
	/**招呼*/
	greetNodeId:number
 } 
export class NpcConfig extends ConfigBase<INpcElement>{
	constructor(){
		super(EXCELDATA);
	}

}