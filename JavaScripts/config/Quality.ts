import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name"],["","Language"],[1,"QualityName0001"],[2,"QualityName0002"],[3,"QualityName0003"],[4,"QualityName0004"],[5,"QualityName0005"],[6,"QualityName0006"]];
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