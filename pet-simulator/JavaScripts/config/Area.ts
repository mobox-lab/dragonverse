import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Price","Guid"],["","",""],[1,10000,"38F3D4A6"]];
export interface IAreaElement extends IElementBase{
 	/**ID*/
	id:number
	/**金币*/
	Price:number
	/**场景Guid*/
	Guid:string
 } 
export class AreaConfig extends ConfigBase<IAreaElement>{
	constructor(){
		super(EXCELDATA);
	}

}