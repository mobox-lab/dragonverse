import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","characterId","position","rotation","greetNodeId"],["","","","",""],[1,1,new mw.Vector(4620,-18620,1500),new mw.Vector(0,0,175),1]];
export interface INpcElement extends IElementBase{
 	/**ID*/
	id:number
	/**角色 ID*/
	characterId:number
	/**初始位置*/
	position:mw.Vector
	/**初始旋转*/
	rotation:mw.Vector
	/**招呼*/
	greetNodeId:number
 } 
export class NpcConfig extends ConfigBase<INpcElement>{
	constructor(){
		super(EXCELDATA);
	}

}