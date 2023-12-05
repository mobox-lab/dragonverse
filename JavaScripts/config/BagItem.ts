import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","desc","icon","achievable"],["","Language","Language","",""],[1,"BagItemName0001","BagItemDesc0001","37708",true],[2,"BagItemName0002","BagItemDesc0002","0",false],[3,"BagItemName0003","BagItemDesc0003","108377",true],[4,"DragonName00001","TestBagItemDesc0001","108377",true],[5,"DragonName00002","TestBagItemDesc0001","108377",true],[6,"DragonName00003","TestBagItemDesc0001","108377",true],[7,"DragonName00004","TestBagItemDesc0001","108377",true]];
export interface IBagItemElement extends IElementBase{
 	/**背包物品 ID*/
	id:number
	/**名称*/
	name:string
	/**描述*/
	desc:string
	/**图标*/
	icon:string
	/**可完成性*/
	achievable:boolean
 } 
export class BagItemConfig extends ConfigBase<IBagItemElement>{
	constructor(){
		super(EXCELDATA);
	}

}