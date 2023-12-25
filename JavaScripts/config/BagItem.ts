import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","desc","icon","achievable"],["","Language","Language","",""],[1,"BagItemName0001","BagItemDesc0001","267113",true],[2,"BagItemName0002","BagItemDesc0002","267114",false],[3,"BagItemName0003","BagItemDesc0003","267112",true],[4,"DragonName00001","DragonName00001","269400",true],[5,"DragonName00001","DragonName00001","269400",true],[6,"DragonName00001","DragonName00001","269400",true],[7,"DragonName00001","DragonName00001","269400",true],[8,"DragonName00001","DragonName00001","269400",true],[9,"DragonName00002","DragonName00002","269394",true],[10,"DragonName00002","DragonName00002","269394",true],[11,"DragonName00002","DragonName00002","269394",true],[12,"DragonName00002","DragonName00002","269394",true],[13,"DragonName00002","DragonName00002","269394",true],[14,"DragonName00003","DragonName00003","269398",true],[15,"DragonName00003","DragonName00003","269398",true],[16,"DragonName00003","DragonName00003","269398",true],[17,"DragonName00003","DragonName00003","269398",true],[18,"DragonName00003","DragonName00003","269398",true],[19,"DragonName00004","DragonName00004","269395",true],[20,"DragonName00004","DragonName00004","269395",true],[21,"DragonName00004","DragonName00004","269395",true],[22,"DragonName00004","DragonName00004","269395",true],[23,"DragonName00004","DragonName00004","269395",true],[24,"DragonName00005","DragonName00005","269396",true],[25,"DragonName00006","DragonName00006","269401",true],[26,"DragonName00007","DragonName00007","269397",true],[27,"DragonName00008","DragonName00008","269403",true],[28,"DragonName00009","DragonName00009","269402",true],[29,"DragonName00010","DragonName00010","269399",true]];
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