import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","desc","icon","achievable"],["","Language","Language","",""],[1,"BagItemName0001","BagItemDesc0001","267113",true],[2,"BagItemName0002","BagItemDesc0002","267114",false],[3,"BagItemName0003","BagItemDesc0003","267112",true],[4,"DragonName00001","DragonName00001","108377",true],[5,"DragonName00001","DragonName00001","108377",true],[6,"DragonName00001","DragonName00001","108377",true],[7,"DragonName00001","DragonName00001","108377",true],[8,"DragonName00001","DragonName00001","108377",true],[9,"DragonName00002","DragonName00002","108377",true],[10,"DragonName00002","DragonName00002","108377",true],[11,"DragonName00002","DragonName00002","108377",true],[12,"DragonName00002","DragonName00002","108377",true],[13,"DragonName00002","DragonName00002","108377",true],[14,"DragonName00003","DragonName00003","108377",true],[15,"DragonName00003","DragonName00003","108377",true],[16,"DragonName00003","DragonName00003","108377",true],[17,"DragonName00003","DragonName00003","108377",true],[18,"DragonName00003","DragonName00003","108377",true],[19,"DragonName00004","DragonName00004","108377",true],[20,"DragonName00004","DragonName00004","108377",true],[21,"DragonName00004","DragonName00004","108377",true],[22,"DragonName00004","DragonName00004","108377",true],[23,"DragonName00004","DragonName00004","108377",true]];
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