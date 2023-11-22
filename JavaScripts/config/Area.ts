import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","range"],["","Language",""]];
export interface IAreaElement extends IElementBase{
 	/**区域 ID*/
	id:number
	/**名称*/
	name:string
	/**范围*/
	range:Array<Array<number>>
 } 
export class AreaConfig extends ConfigBase<IAreaElement>{
	constructor(){
		super(EXCELDATA);
	}

}