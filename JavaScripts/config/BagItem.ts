import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","desc","icon","achievable"],["","Language","Language","",""],[1,"BagItemName0001","BagItemDesc0001","267113",true],[2,"BagItemName0002","BagItemDesc0002","267114",false],[3,"BagItemName0003","BagItemDesc0003","267112",true],[4,"BoxingDragonName00001","BoxingDragonName00001","269400",true],[5,"BoxingDragonName00002","BoxingDragonName00002","269400",true],[6,"BoxingDragonName00003","BoxingDragonName00003","269400",true],[7,"BoxingDragonName00004","BoxingDragonName00004","269400",true],[8,"BoxingDragonName00005","BoxingDragonName00005","269400",true],[9,"BoxingDragonName00006","BoxingDragonName00006","269394",true],[10,"BoxingDragonName00007","BoxingDragonName00007","269394",true],[11,"BoxingDragonName00008","BoxingDragonName00008","269394",true],[12,"BoxingDragonName00009","BoxingDragonName00009","269394",true],[13,"BoxingDragonName00010","BoxingDragonName00010","269394",true],[14,"BoxingDragonName00011","BoxingDragonName00011","269398",true],[15,"BoxingDragonName00012","BoxingDragonName00012","269398",true],[16,"BoxingDragonName00013","BoxingDragonName00013","269398",true],[17,"BoxingDragonName00014","BoxingDragonName00014","269398",true],[18,"BoxingDragonName00015","BoxingDragonName00015","269398",true],[19,"BoxingDragonName00016","BoxingDragonName00016","269395",true],[20,"BoxingDragonName00017","BoxingDragonName00017","269395",true],[21,"BoxingDragonName00018","BoxingDragonName00018","269395",true],[22,"BoxingDragonName00019","BoxingDragonName00019","269395",true],[23,"BoxingDragonName00020","BoxingDragonName00020","269395",true],[24,"DragonName00005","DragonName00005","269396",true],[25,"DragonName00006","DragonName00006","269401",true],[26,"DragonName00007","DragonName00007","269397",true],[27,"DragonName00008","DragonName00008","269403",true],[28,"DragonName00009","DragonName00009","269402",true],[29,"DragonName00010","DragonName00010","269399",true]];
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