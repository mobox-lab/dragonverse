import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name"],["",""]];
export interface IElementalElement extends IElementBase{
 	/**元素 ID*/
	id:number
	/**名称*/
	name:string
 } 
export class ElementalConfig extends ConfigBase<IElementalElement>{
	constructor(){
		super(EXCELDATA);
	}

}