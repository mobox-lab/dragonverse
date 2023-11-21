import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","bagId"],["",""],[1,"2"]];
export interface ICollectibleItemElement extends IElementBase{
 	/**采集物品 ID*/
	id:number
	/**背包物品 ID*/
	bagId:string
 } 
export class CollectibleItemConfig extends ConfigBase<ICollectibleItemElement>{
	constructor(){
		super(EXCELDATA);
	}

}