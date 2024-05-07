import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","areaIds","capacity"],["","",""],[1,null,0]];
export interface IDragonHabitatElement extends IElementBase{
 	/**ID*/
	id:number
	/**所含区域 ID*/
	areaIds:Array<number>
	/**承载容量*/
	capacity:number
 } 
export class DragonHabitatConfig extends ConfigBase<IDragonHabitatElement>{
	constructor(){
		super(EXCELDATA);
	}

}