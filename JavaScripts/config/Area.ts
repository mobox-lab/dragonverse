import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","points"],["","Language",""],[1,"TestAreaName0001",[[-1000,-1000,-1000,1000,1000,1000,1000,-1000]]]];
export interface IAreaElement extends IElementBase{
 	/**区域 ID*/
	id:number
	/**名称*/
	name:string
	/**点集*/
	points:Array<Array<number>>
 } 
export class AreaConfig extends ConfigBase<IAreaElement>{
	constructor(){
		super(EXCELDATA);
	}

}