import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name"],["",""]];
export interface ISuccessRateAlgoElement extends IElementBase{
 	/**捕捉成功率算法 ID*/
	id:number
	/**名称*/
	name:string
 } 
export class SuccessRateAlgoConfig extends ConfigBase<ISuccessRateAlgoElement>{
	constructor(){
		super(EXCELDATA);
	}

}