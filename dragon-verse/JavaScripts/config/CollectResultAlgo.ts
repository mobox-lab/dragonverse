import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name"],["",""],[1,"TestAlgo"]];
export interface ICollectResultAlgoElement extends IElementBase{
 	/**采集结果算法 ID*/
	id:number
	/**名称*/
	name:string
 } 
export class CollectResultAlgoConfig extends ConfigBase<ICollectResultAlgoElement>{
	constructor(){
		super(EXCELDATA);
	}

}