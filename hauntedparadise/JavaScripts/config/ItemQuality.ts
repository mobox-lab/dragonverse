import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","backUp","imgGuid"],["","",""],[1,"默认(或者空格子)","163413"],[2,"普通","228508"],[3,"稀有","157218"],[4,"珍贵","157217"],[5,"神话","180111"]];
export interface IItemQualityElement extends IElementBase{
 	/**id*/
	id:number
	/**备注*/
	backUp:string
	/**品质图片guid*/
	imgGuid:string
 } 
export class ItemQualityConfig extends ConfigBase<IItemQualityElement>{
	constructor(){
		super(EXCELDATA);
	}

}