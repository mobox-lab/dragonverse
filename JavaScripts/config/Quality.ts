import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name"],["",""]];
export interface IQualityElement extends IElementBase{
 	/**品质 ID*/
	id:number
	/**名称*/
	name:string
 } 
export class QualityConfig extends ConfigBase<IQualityElement>{
	constructor(){
		super(EXCELDATA);
	}

}