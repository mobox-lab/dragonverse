import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name"],["",""],[1,"ElementalName0001"],[2,"ElementalName0002"],[3,"ElementalName0003"],[4,"ElementalName0004"],[5,"ElementalName0005"],[6,"ElementalName0006"]];
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